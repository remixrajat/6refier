import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import "redux";

import SubscribedSessions from '../../communitypage/presentationalcomponents/Subscriptions/SubscribedSessions'
import DocumentController from '../../documents/conditionalcomponents/DocumentController';
import CourseActivityReport from '../../reporting/presentationalcomponents/CourseActivityReport'
import TestListForTopic from '../../topicpage/presentationalcomponents/TestListForTopic'
import ContentOwnerController from '../../recordedContents/conditionalcomponents/ContentOwnerController'
import { getPackageSubscriptionReport } from '../../reporting/conditionalcomponents/action'

import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';
import CourseImg from '../../images/course/course.jpg';
import '../../styles/scss/cards.css'


export default class CoursePage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isExpanded : false,
            isProgressExpanded: false
        }

        this.showCollapsed = this.showCollapsed.bind(this)
        this.showExpanded = this.showExpanded.bind(this)
        this.showProgressCollapsed = this.showProgressCollapsed.bind(this)
        this.showProgressExpanded = this.showProgressExpanded.bind(this)
    }

    showExpanded() {
        this.setState({isExpanded:true})
    }

    showCollapsed() {
        this.setState({isExpanded:false})
    }

    showProgressExpanded() {
        this.setState({isProgressExpanded:true})
    }

    showProgressCollapsed() {
        this.setState({isProgressExpanded:false})
    }
 

    render() {
        // console.log("CoursePage :: runningCourseDetails : ", this.props.runningCourseDetails)

        let runningCourseDetails, body
        if (this.props.runningCourseDetails.length>0) {
            runningCourseDetails = this.props.runningCourseDetails[0]
            let content = []
            let test = []
            let documents = []
            let packageDef = []
            let sessions = []
            let futureSessions = []
            let packageValidities = []
            let packageId
            let packageMappings = []
            let communityId
            packageValidities = JSON.parse(runningCourseDetails.fields.package_validity)
            packageMappings = runningCourseDetails.fields.package_entity_mapping
            test = JSON.parse(runningCourseDetails.fields.tests_list)
            content = JSON.parse(runningCourseDetails.fields.content_list)
            documents = JSON.parse(runningCourseDetails.fields.document_list)
            sessions = runningCourseDetails.fields.session_list?
                JSON.parse(runningCourseDetails.fields.session_list):[]
            futureSessions = runningCourseDetails.fields.future_session_list?
                JSON.parse(runningCourseDetails.fields.future_session_list):[]
            packageId = runningCourseDetails.pk
            communityId = runningCourseDetails.fields.package_owner_entity
            // console.log("CoursePage::test", test)
            // console.log("CoursePage::content", content)

            let selfValidity = []
            let othersValidity = []
            for (let i = 0; i < packageValidities.length; i++){
                if (packageValidities[i].fields.for_self) {
                    let cost = packageValidities[i].fields.cost_of_package_in_credits
                    let validity = packageValidities[i].fields.validity
                    if (cost == 0) {
                        selfValidity.push(
                            <div className="custom-list-sub-content" 
                                style={{ marginTop: "10px", textTransform: "none" }}>
                                Free for {validity} days</div>)
                    } else {
                        selfValidity.push(
                            <div className="custom-list-sub-content" 
                                style={{ marginTop: "10px", textTransform: "none" }}>
                                {cost} Credits for {validity} days</div>)
                    }
                }
                if (packageValidities[i].fields.for_others) {
                    let cost = packageValidities[i].fields.cost_of_package_in_credits
                    let validity = packageValidities[i].fields.validity
                    if (cost == 0) {
                        othersValidity.push(
                            <div className="custom-list-sub-content" 
                                style={{ marginTop: "10px", textTransform: "none" }}>
                                Free for {validity} days</div>)
                    } else {
                        othersValidity.push(
                            <div className="custom-list-sub-content" 
                                style={{ marginTop: "10px", textTransform: "none" }}>
                                {cost} Credits for {validity} days</div>)
                    }
                }
            }

            let assigned = []
            let assigned_package = []
            let purchased = []
            for (let i = 0; i < packageMappings.length; i++){
                    if (packageMappings[i].entity_name)
                        assigned.push(packageMappings[i].entity_name)
                    else
                        assigned.push(packageMappings[i].user_name)
                        
                    assigned_package.push(packageMappings[i].pk)
            }
            let assignedBody, purchasedBody
            let assignedText = []
            let purchasedText = ""
            if (assigned.length > 0) {
                let self = this
                for (let i = 0; i < assigned.length; i++){
                    assignedText.push(
                        <div className="refier_custom_desc_white" 
                            style={{ textTransform: "none" }}>
                            <span style={{fontWeight:"600"}}>{assigned[i]}</span>
                            <div style={{marginTop: '15px'}}>
                                <ComplementaryButton
                                    buttonId="ask_question_button"
                                    isBlock={true}
                                    onButtonClick={() => {
                                        self.props.dispatch(getPackageSubscriptionReport(assigned_package[i],
                                            communityId))
                                        self.showProgressExpanded()
                                    }}
                                    buttonText="Track Progress"
                                />
                            </div>
                        </div>
                    )
                }

                assignedBody = (
                    <div>
                        <div className="refier_custom_desc_white" 
                            style={{ textTransform: "none" }}>
                            Running for 
                        </div>
                        {assignedText}
                    </div>
                )
            }

            body = 
            <Grid fluid style={{ marginTop:"10px"}}>
                <Col xs={12} lg={3}>
                    <div className="refier_custom_panel_window" 
			            style={{ textAlign: "left", backgroundColor:"white", marginTop:"20px" }}>
			            <div>
                            <div className={"refier_image_panel"} 
                                style={{ cursor: "default", width:"100%", transform:"none", margin:"0px" }}>
                                <div className="refier_image">
                                    <img 
                                        style={{objectFit:"cover"}}
                                    src={CourseImg}
                                    />
                                    </div>
                                    <div>
                                        <div className="refier_image_panel_element"
                                            style={{
                                                    padding: "5px",
                                                    // marginTop: "-40px"
                                                }}>
                                            <div
                                                style={{
                                                    "paddingTop": "10px", paddingBottom: "20px",
                                                    "textAlign": "center", "marginTop": "20px"
                                                }}>
                                                <div className="refier_custom_title_white">
                                                    {runningCourseDetails.fields.package_name}
                                                </div>
                                                <div>
                                                    <div className="refier_custom_desc_white"
                                                        style={{ "textAlign": "center", margin: "10px" }}>
                                                        <span>
                                                            {runningCourseDetails.fields.package_description}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                {assignedBody ?
                                                    <div style={{ padding: "10px 10px" }}>
                                                        {assignedBody}
                                                    </div>
                                                            : null}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
				            </div>
                        <div>
                    </div>
                </div>
            </Col>
            <Col xs={12} lg={9}>
            {
                this.state.isProgressExpanded ?
                    <div style={{
                    marginTop: "30px", 
                    marginBottom: "30px", 
                }}>
                        <div
                            id="section-title"
                            >
                            Activity Report
                        </div>
                    <CourseActivityReport
                            courseActivityReport={this.props.courseActivityReport} />
                    </div>
                    :
                    null
            }
                <div
                    style={{ marginTop: "20px", marginLeft: "20px", marginBottom: "10px" }}
                    id="section-title" >
                    Videos
                </div>
                <div>
                    <ContentOwnerController
                        contentList={content}
                        isSlider={false}/>
                </div>
                <div
                    style={{ marginTop: "20px", marginLeft: "20px", marginBottom: "10px" }}
                    id="section-title" >
                    Tests
                </div>
                <div>
                    <TestListForTopic testListOfTopic={test}
                        profileId={this.props.userId} 
                        fromCommunityProfile={this.props.fromCommunityProfile} />
                </div>
                <div
                    style={{ marginTop: "20px", marginLeft: "20px", marginBottom: "10px" }}
                    id="section-title" >
                    Webinars
                </div>
                <div style={{marginLeft: "20px"}}>
                    <SubscribedSessions
                        isOwner={true}
                        events={sessions}
                        futureSessions={futureSessions}
                        profileId={this.props.userId}
                        fromCommunityProfile={this.props.fromCommunityProfile}/>
                </div>
                <div
                    style={{ marginTop: "20px", marginLeft: "20px", marginBottom: "10px" }}
                    id="section-title" >
                    Documents
                </div>
                <div style={{margin:"10px", marginLeft:"20px"}}>
                    <DocumentController fromOtherPage={true}
                        contentListFromOtherPage={documents}
                        profileId={this.props.userId}
                        fromCommunityProfile={this.props.fromCommunityProfile} />
                </div>
            </Col>
        </Grid>
        }

        return (
            <div>{
                runningCourseDetails ?
                    body
                    :
                    <div className="custom-list-content"
                        style={{textAlign:"center", margin:"20px"}}>Course Not Found</div>
            }</div>
        )
    }
}