import React, { Component } from 'react';
import { Col, Row, Grid, Button } from 'react-bootstrap'
import 'redux';
import Slider from 'react-slick';
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';

import { getCourseForDashboard } from './action';
import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton'
import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';

import { URL_TEXT, MEDIA_URL_TEXT, isXsDevice, isMobileDevice } from '../../GlobalConstants'
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import UserImg from '../../images/mentor_dashboard_page/avatardp.png';


class LearningPanelController extends Component{
    constructor(props){
        super(props)
        this.state = {
            body:[],
            isOwner: false,
            isLearner: false,
            isOwnerAndLearner: false,
            isExpert: false,
        }
        this.getCourse = this.getCourse.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(getCourseForDashboard());
        if (this.props.courseForDashboard) {
            this.getCourse(this.props.courseForDashboard)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.courseForDashboard) {
            this.getCourse(nextProps.courseForDashboard)
            return
        }
        if (nextProps.courseForDashboard) {
            if (nextProps.courseForDashboard.length != this.props.courseForDashboard) {
                this.getCourse(nextProps.courseForDashboard)
                return
            }
        }
    }

    getCourse(courses) {
        // console.log("LearningPanelController :: courses : ", courses)
        let course_list = []
        let isOwner = false
        let isLearner = false
        let isOwnerAndLearner = false
        let isOwnerCount = 0
        let totalCount = 0

        let isExpert = false
        let isMonitor = false
        
        if (courses) {
            let count = 0
            for (let i = 0; i < courses.length; i++) {
                
                let community = JSON.parse(courses[i].community)
                let packages = (courses[i].packages)

                if (courses[i].designation == "owner") {
                    if (packages.length > 0) {
                        isOwnerAndLearner = true
                        isOwnerCount = isOwnerCount + 1
                        totalCount = totalCount + 1
                    }
                }
                else if (courses[i].designation == "internal_mentor" ||
                    courses[i].designation == "external_mentor") {
                    isExpert = true
                }
                else {
                    if (packages.length > 0) {
                        isLearner = true
                        totalCount = totalCount + 1
                    }
                }

                // console.log("LearningPanelController :: designation, community, packages,  : ",
                //     courses[i].designation, community, packages)
                for (let j = 0; j < packages.length; j++) {
                    // isMonitor = false
                    isMonitor = packages[j].fields.isPermissionToMonitor
                    if(courses[i].designation == "internal_mentor" ||
                        courses[i].designation == "external_mentor") {
                        if (!isMonitor) {
                            continue
                        }
                    }

                    let package_admins
                    let admins = []
                    if (packages[j].fields.admin) {
                        package_admins = JSON.parse(packages[j].fields.admin)
                        // console.log("Learning Panel Controller :: package admin : ", package_admins)
                        let expert_count = 0
                        let photo, name, id
                        for (let k = 0; k < package_admins.length; k++){
                            if (package_admins[k].fields.user) {
                                expert_count = expert_count + 1
                                name = package_admins[k].fields.user.last_name === "" ?
                                    (package_admins[k].fields.user.first_name) :
                                    (package_admins[k].fields.user.first_name + " " +
                                        package_admins[k].fields.user.last_name)
                                photo = 
                                package_admins[k].fields.user.profile_photo ? MEDIA_URL_TEXT +
                                        package_admins[k].fields.user.profile_photo : UserImg
                                id =  package_admins[k].fields.user.id
                                
                            }
                        }
                        if (name) {
                            admins.push(
                                <div style={{ textAlign: "left", marginTop: "5px" }}>
                                    <Link to={"/userDashboard/profile/" + id}>
                                        <span>
                                            <img
                                                src={photo}
                                                className="custom-list-img" />
                                            <span className="custom-list-sub-content" style={{ marginLeft: "10px" }}>
                                                {name}{expert_count > 1 ? (" +" + (expert_count - 1) + "more") : ""}
                                            </span></span>
                                    </Link>
                                </div>
                            )
                        }
                    }
                    // isMonitor = packages[j].fields.isPermissionToMonitor
                    count = count + 1
                    let index = count > 3 ? count % 4 : count
                    let refierpackage = JSON.parse(packages[j].fields.package)
                    // console.log("LearningPanelController :: index : ", index)
                    if (refierpackage.length > 0) {
                        let imageUrl = 
                            community.length>0?
                        community[0].fields.profile_photo ? MEDIA_URL_TEXT +
                                community[0].fields.profile_photo : CommunityImg : UserImg
                        
                        let course =
                            <div
                                className="generic-post-card refier_custom_panel_window"
                                // className={"custom-gradient-" + index}
                                style={{ margin: "10px", padding: "10px" }} key={count}>
                                    <div className="custom-list-title-content custom-item-border"
                                        style={{
                                            color:"#049cdb",
                                            fontWeight: 600, paddingTop: "10px",
                                            paddingBottom: "10px"
                                        }}>
                                        {refierpackage[0].fields.package_name}
                                    </div>
                                
                                    <div className="custom-list-sub-content"
                                        style={{ margin: "5px 0", paddingTop:"10px", fontWeight:"600" }}>
                                        <Col>
                                            <span>
                                            <img
                                            src={imageUrl}
                                            className="custom-list-img" />
                                        <span style={{marginLeft:"5px"}}>
                                            {packages[j].fields.community_name}
                                            </span>
                                        </span>
                                        </Col>
                                        { courses[i].designation == "owner" || isMonitor?
                                            <div style={{ marginTop: "5px" }}>
                                                {packages[j].fields.learners ? (
                                                    packages[j].fields.learners + " Learners" ): null}
                                            </div>
                                            :
                                            null
                                    }
                                    </div>
                                {
                                    // community.length > 0 ?
                                        courses[i].designation == "owner" || isMonitor ?
                                            <div style={{margin:"20px 0"}}>
                                                <PrimaryButton 
                                                    buttonText="Check Learners Progress"
                                                    redirect="true"
                                                    redirectAddress={
                                                        "/userDashboard/course/"
                                                        + packages[j].pk
                                                    }
                                                    style={{whiteSpace: 'normal'}}
                                                />
                                            </div> :
                                            <div style={{margin:"20px 0"}}>
                                                <PrimaryButton 
                                                    buttonText="Click for Learning"
                                                    redirect="true"
                                                    redirectAddress={
                                                        "/userDashboard/myLearnings/"
                                                        + packages[j].pk
                                                    }
                                                    style={{whiteSpace: 'normal'}}
                                                />
                                        </div> 
                                            // :
                                        // null
                                        }
                                </div>
                            
                            // console.log("LearningPanelController :: course : ", course)
                            course_list.push(course)
                    }
                }
            }
            if (isOwnerCount == totalCount && totalCount != 0) {
                isOwner = true
            }
        }
        // console.log("LearningPanelController :: course_list : ", course_list)
        this.setState({
            body: course_list, isOwner: isOwner,
            isLearner: isLearner, isOwnerAndLearner: isOwnerAndLearner,
            isExpert: isExpert
        })
    }


    render() {
        // console.log("LearningPanelController :: state : ", this.state, this.props)

        var settings = {
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows : true,
            infinite:false,
            responsive :[{
                breakpoint:480,
                settings :{
                    slidesToShow : 1
                }
            },
            {
                breakpoint:768,
                settings:{
                    slidesToShow: 2
                }
            },
            {
                breakpoint:1200,
                settings:{
                    slidesToShow: 3
                }
            }
            ]
        };
        
        let slickSliderElement = null;
        if(this.state.body.length > 0){
            slickSliderElement = <Slider {...settings}>{this.state.body}</Slider>
        }

        return (
            <div>
                {slickSliderElement ?
                    <div className="learning-panel-wrapper">
                        <div id="section-subtitle">
                            {this.state.isOwner ?
                                "Your Courses for Learners"
                                        :
                                        this.state.isExpert ?
                                            "Courses to Track Progress":
                                this.state.isOwnerAndLearner ?
                                "Your Courses and Learner's Progress"
                                :
                                this.state.isLearner ?
                                    "Your ongoing Courses"
                                        : null   }
                        </div>
                        <div className="learning-panel-slick-container">
                            {slickSliderElement}
                        </div>
                    </div >
                    :
                    null
                }
            </div>
        )
    }
}

var mapStateToProps = (store) => {
    return {
        courseForDashboard: store.appDataReducer.courseForDashboard,
        is_mentor: (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.is_mentor : false),
            
    };
}

export default connect(mapStateToProps)(LearningPanelController);