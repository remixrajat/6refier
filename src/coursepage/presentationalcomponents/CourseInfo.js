import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import { formatdatefunction } from "../../HelperFunctions/formatDateFunction";

import { MEDIA_URL_TEXT, isLgDevice } from '../../GlobalConstants';
import Preloader from '../../shared/Preloader/PreLoader'
import userImg from '../../images/mentor_dashboard_page/avatardp.png'
import courseDummyImg from '../../images/course/course.jpg'


class CourseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLargeScreen: isLgDevice()
        }

        this.onSessionClick = this.onSessionClick.bind(this);
    }

    componentWillMount() {
        window.addEventListener("resize", this.isLgScreen.bind(this));
    }
    
    isLgScreen() {
        this.setState({isLargeScreen: isLgDevice()})
    }

    onSessionClick(e) {
        // if this function is not working, classNeeded variable is hardcoded
        // console.log(e.target)
        let classList = e.target.classList
        let classNeeded = classList[1]
        let sectionToToggle = document.getElementsByClassName(classNeeded + "-section")
        let sectionToToggleArrow = document.getElementsByClassName(classNeeded + "-arrow")
        let displayValue = sectionToToggle[0].style.display

        if(displayValue === 'block') {
            sectionToToggle[0].style.display = "none"
            sectionToToggleArrow[0].innerText = '>'
        } else if(displayValue === 'none') {
            sectionToToggle[0].style.display = "block"
            sectionToToggleArrow[0].innerText = '^'
        }
    }


    render() {
        // console.log("CourseInfo:: this.props :: ", this.props)

        let body =  <div style={{ textAlign: "center" }}>    
                        <Preloader shimmer={true} copies={2} placeholder="box_and_lines" />
                    </div>
        let courseAccess = false, isOwner = false

        if(this.props.courseInfoAccess) {
            courseAccess = this.props.courseInfoAccess.is_added_to_cart
            isOwner = this.props.courseInfoAccess.is_owner
        }

        if(this.props.courseInfo) {
            const { courseInfo } = this.props
            let topic = courseInfo.package_name
            let desc = courseInfo.package_description
            let startdatetime = courseInfo.start_date_time
            let name = courseInfo.entity_name
            let community_photo = courseInfo.community_pic
            let course_pic = ''
            let communityId = courseInfo.community_id
            let course_credits = courseInfo.cost_of_package_in_credits
            let package_validity_id = courseInfo.package_validity_id

            let eventBody = []
            let services = courseInfo.services
            if (services.events.length > 0) {
                let i = 0;
                for(let event of services.events) {
                    let infoBody = [];
                    for(let info of event.event_description_list) {
                        infoBody.push (
                            <div key={i++} style={{marginBottom: "40px"}}>
                                <ul>
                                    <li>
                                        <a style={{display: 'block', marginBottom: '5px'}}
                                            href={info.info_url}>
                                            {info.info_url_text}</a>
                                        {info.info_thumbnail ?
                                            <div style={{marginTop: '15px', marginBottom: "15px"}}>
                                                <img src={info.info_thumbnail} alt={info.info_url_text} />
                                            </div>
                                            : null
                                        }
                                        <p style={{marginBottom: "10px"}}>{info.info}</p>
                                    </li>
                                </ul>
                            </div>
                        )
                    }

                    let headerBody = []
                    for(let header of event.event_info) {
                        let topicBody = []

                        for(let topic of header.topics) {
                            let topicDetails = []

                            for(let detail of topic.details) {
                                topicDetails.push (
                                    <li key={i++} style={{marginBottom: "10px"}}>
                                        <a style={{display: 'block', marginBottom: "5px"}}
                                        href={detail.details_url}>
                                            {detail.details_url_text}</a>
                                        <p className="webinar-details" 
                                            style={{marginBottom: "10px", fontSize: '1em'}}>{detail.detail}</p>
                                    </li>
                                )
                            }

                            topicBody.push (
                                <li key={i++} style={{marginLeft: '30px'}}>
                                    <div style={{marginBottom: '10px'}}>
                                        <p className="webinar-subheader" 
                                            style={{fontSize: '1em', marginBottom: '10px'}}>
                                            {topic.scheduled_topic}
                                        </p>
                                        <a href={topic.topic_url} style={{display: "block", marginBottom: "10px"}}>
                                            {topic.topic_url_text}</a>
                                        <ul style={{padding: "0 20px 0 20px"}}>
                                            {topicDetails}
                                        </ul>
                                    </div>
                                </li>
                            )
                        }

                        headerBody.push (
                            <div key={i++} style={{marginBottom: "30px"}}>
                                <p className="webinar-subheader" 
                                    style={{fontSize: "1.2em", marginBottom: "15px"}}>{header.info_header}</p>
                                <ul>{topicBody}</ul>
                            </div>
                        )
                    }

                    eventBody.push (
                        <div key={i++}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div onClick={(e) => this.onSessionClick(e)} 
                                    style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <p data-session-id={event.event_id} 
                                        className={"service-toggle" + i + "-arrow service-toggle" + i}
                                        style={{cursor: "pointer", marginBottom: "15px", transform: "rotate(90deg)"}}>></p>
                                    <p id={event.event_id} className={"webinar-subheader service-toggle" + i} 
                                        style={{cursor: 'pointer', paddingLeft: '20px', marginBottom: "15px"}}>
                                        {event.topic}</p>
                                </div>
                                {isOwner ?
                                    <div>
                                        <Link className="btn btn-block refier_custom_button_new_selected_2"
                                            to={"/userDashboard/webinarinfo/" + event.event_id}
                                            target="_blank">
                                            Go To Session
                                        </Link>
                                    </div>
                                    : null
                                }
                            </div>
                            <div style={{display: 'none'}} 
                                className={"service-toggle" + i + "-section webinar-toggle-section"}>
                                <div style={{marginBottom: '5px'}}>
                                    On: <b>{formatdatefunction(event.start_date_time, "long")}</b>
                                </div>
                                <div style={{marginBottom: '10px'}}>
                                    At: <b>{formatdatefunction(event.start_date_time, "time")} IST</b>
                                </div>
                                <div>{infoBody}</div>
                                {headerBody}
                            </div>
                        </div>
                    )
                }
            }

            return (
                <Grid fluid style={{marginBottom: '75px'}}>
                    <Col xs={12} mdOffset={1} md={10} style={{backgroundColor:"white", padding:"20px"}}>
                        <Row>
                            <Col xs={12} md={7}>
                                <div className="webinar-topic"
                                    style={{marginTop: '10px', marginBottom: '20px'}}>{topic}</div>
                                </Col>
                        </Row>
                        <Row style={{marginBottom: '30px'}}>
                            <Col xs={12}  md={7}>
                                <div>
                                    <img 
                                        alt="Course"
                                        src={(course_pic && course_pic !== "") ?
                                                MEDIA_URL_TEXT + course_pic : courseDummyImg}
                                        style={{display :"inline", width: "100%", maxHeight: '400px'}}
                                    />
                                </div>
                                <div className="generic-post-card-left-text">  
                                    <img 
                                        alt="Community"
                                        style={{objectFit: 'contain'}}
                                        src={community_photo || community_photo !== ""? 
                                                MEDIA_URL_TEXT + community_photo : userImg}
                                        className={this.state.isLargeScreen ? "webinar-mentor-image" :
                                            "webinar-mentor-image-small"} 
                                    />
                                    <h4 className={this.state.isLargeScreen ?
                                            "webinar-mentor" : "webinar-mentor-small"} 
                                        style={{
                                            "marginTop": "10px", "marginBottom": "20px",
                                                }}>
                                                <Link to={"/userDashboard/community/" + communityId}>
                                                    {name}
                                                </Link>
                                            </h4>       
                                </div>
                            </Col>
                            <Col xs={12} md={5}>
                                <div className="webinar-optionbox" 
                                    style={{padding: "10px", display: 'flex'}}>
                                    <span className="custom-list-sub-content" 
                                        style={{flex: '0.3', display: 'flex', 
                                            justifyContent: 'center', alignItems: 'center'}}>Starts On</span> 
                                    <span style={{flex: '0.7', textAlign: 'center'}}>
                                        {formatdatefunction(startdatetime, "long")}
                                    </span>
                                </div>
                                <div className="webinar-optionbox" 
                                    style={{padding: "10px", display: 'flex'}}>
                                    <span className="custom-list-sub-content"
                                        style={{flex: '0.3', display: 'flex', 
                                            justifyContent: 'center', alignItems: 'center'}}>At</span>
                                    <span style={{flex: '0.7', textAlign: 'center'}}>
                                        {formatdatefunction(startdatetime, "time")} IST
                                    </span>
                                </div>
                                {isOwner ?
                                    null :
                                    <div className="webinar-optionbox"
                                        style={{
                                            padding: "20px", paddingTop: "35px", paddingBottom: "35px",
                                            borderTop:"2px solid white"}}>
                                        { this.props.addToCartProgress ?
                                            <span className="btn btn-block refier_custom_button_cancel">
                                                <Preloader />
                                            </span> :
                                            courseAccess ?
                                                <span className="btn btn-block refier_custom_button_cancel">
                                                    ADDED TO CART
                                                </span> :
                                                <span className="btn btn-block refier_custom_button_new_selected_2" 
                                                    onClick={() => this.props.addToCart(course_credits, package_validity_id)}>
                                                    ADD TO CART
                                                </span>
                                        }
                                    </div>
                                }
                            </Col>
                        </Row>
                        <Row style={{marginBottom: '30px'}}>
                            <Col xs={12} md={7}>
                                <div className="webinar-header" style={{marginBottom: '20px'}}>About this Course</div>
                                <p className="webinar-details" style={{fontFamily: 'Raleway'}}>
                                    {courseInfo.package_tagline}
                                </p>
                                <p className="webinar-details" style={{fontSize: '14px'}}>{desc}</p>
                                <p className="webinar-details" style={{fontSize: '14px'}}>
                                    {courseInfo.validity_description}
                                </p>
                            </Col>
                        </Row>
                        {courseInfo.services ? 
                            <Row style={{marginBottom: '30px'}}>
                                <Col xs={12} md={7}>
                                    <div className="webinar-header" style={{marginBottom: '20px'}}>
                                        This Course Includes
                                    </div>
                                    {courseInfo.services.events ?
                                        <div className="webinar-details">
                                            &#9679;&nbsp;&nbsp;{courseInfo.services.events.length} online sessions
                                        </div>
                                        : null
                                    }
                                    {courseInfo.services.contents ?
                                        <div className="webinar-details">
                                            &#9679;&nbsp;&nbsp;{courseInfo.services.contents.length} videos
                                        </div>
                                        : null
                                    }
                                    {courseInfo.services.documents ?
                                        <div className="webinar-details">
                                            &#9679;&nbsp;&nbsp;{courseInfo.services.documents.length} documents
                                        </div>
                                        : null
                                    }
                                </Col>
                            </Row>
                            : null
                        }
                        { eventBody.length > 0 ?
                            <Row>
                                <Col xs={12} md={7}>
                                    <div className="webinar-header" style={{marginBottom: '20px'}}>
                                        Session Details
                                    </div>
                                    <div>{eventBody}</div>
                                </Col>
                            </Row>
                            :
                            null
                        }
                    </Col>
                </Grid>
            )
        }

        return(
            <div>{body}</div>
        )
    }
}

export default CourseInfo;