import React, { Component } from 'react'
import quizImageSrc from "../../images/mentor_dashboard_page/quiz.jpg";
import contentImageSrc from "../../images/mentor_dashboard_page/refier_generic.jpg";
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { Grid, Col, Row, FormControl, Image, Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import UserIndividualResource from
    '../../reporting/presentationalcomponents/UserIndividualResource'
import Preloader from '../../shared/Preloader/PreLoader'
import {Link} from 'react-router-dom'
import '../../styles/scss/cards.css'
import CourseImg from '../../images/course/course.jpg';

export default class MemberResources extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        console.log("MemberResources :: props : ", this.props)

        let myResources = this.props.myCommunityLearningPathAndReport ?
        this.props.myCommunityLearningPathAndReport : undefined

        let test_ids = []
        let content_ids = []
        let tests = []
        let contents = []
        let session_ids = []
        let sessions = []
        let document_ids = []
        let documents = []
        let memberActivityList

        let package_name = ""
        let package_desc = ""

        let activity = []
        if (myResources && myResources.length>0) {
            memberActivityList = []
            let individualActivity
            for (let j = 0; j < myResources.length; j++){
                // console.log("MemberLearningPath ::j :: ",j)
                // console.log("MemberLearningPath ::myLearningPath:: ",j,
                // myResources[j])
                if (myResources[j].type == "Test") {
                    individualActivity = myResources[j].test[0]
                    let testpackage = []
                    for (let k = 0; k < myResources[j].test.length; k++) {
                        let individualTest = myResources[j].test[k]
                        let packageDef = JSON.parse(individualTest.package.fields.package_definition)
                        testpackage.push(packageDef[0].fields.package_name)
                        package_name = packageDef[0].fields.package_name
                        package_desc = packageDef[0].fields.package_description
                    }

                    let test = {}
                    // console.log("MemberLearningPath :: individualActivity ",
                    //     individualActivity)
                    let indexOfTest = -1
                    if (test_ids.length > 0)
                        indexOfTest = test_ids.indexOf(individualActivity.test_id)
                    // console.log("SubscribedActivityReport :: indexOfTest ",
                    //             indexOfTest)
                    if (indexOfTest == -1) {
                        test["id"] = individualActivity.test_id
                        test["name"] = individualActivity.test_name
                        test["packages"] = testpackage
                        test["session_date_time"] = []
                        test["session_analysis"] = []
                        // console.log("SubscribedActivityReport :: user_test ",
                        //     memberActivityReports[i].activity[j].user_test)
                        // console.log("SubscribedActivityReport :: test :: ", test)
                        if (myResources[j].user_test &&
                            myResources[j].user_test.fields) {
                            test["session_date_time"].push
                                (myResources[j].user_test.fields.creation_time)
                            // console.log("SubscribedActivityReport :: test1 :: ", test)
                        }
                        if (myResources[j].analysis) {
                            test["session_analysis"].push
                                (myResources[j].analysis)
                            // console.log("SubscribedActivityReport :: test2 :: ", test)
                        }
                        tests.push(test)
                        // console.log("MemberLearningPath :: tests :: ", tests)
                        test_ids.push(individualActivity.test_id)
                        // console.log("SubscribedActivityReport :: test_ids :: ", test_ids)
                    }
                    else {
                        if (myResources[j].user_test &&
                            myResources[j].user_test.fields) {
                            // console.log("SubscribedActivityReport :: tests1 :: ", tests)
                            tests[indexOfTest].session_date_time.push
                                (myResources[j].user_test.fields.creation_time)
                            
                            // console.log("MemberLearningPath :: tests11 :: ", tests)
                        }
                        if (myResources[j].analysis) {
                            tests[indexOfTest].session_analysis.push
                                (myResources[j].analysis)
                            
                            // console.log("MemberLearningPath :: tests2 :: ", tests)
                        }
                    }
                }
                else if (myResources[j].type == "Content") {
                    individualActivity = myResources[j].content[0]
                    let contentpackage = []
                    for (let k = 0; k < myResources[j].content.length; k++) {
                        let individualContent = myResources[j].content[k]
                        let packageDef = JSON.parse(individualContent.package.fields.package_definition)
                        contentpackage.push(packageDef[0].fields.package_name)
                        package_name = packageDef[0].fields.package_name
                        package_desc = packageDef[0].fields.package_description
                    }
                    let content = {}
                    let indexOfContent = -1
                    if (content_ids.length > 0)
                        indexOfContent = content_ids.indexOf(individualActivity.id)
                    //   console.log("SubscribedActivityReport :: indexOfContent :: ", indexOfContent)
                    if (indexOfContent == -1) {
                        content["id"] = individualActivity.id
                        content["name"] = individualActivity.title
                        content["packages"] = contentpackage
                        content["photo"] = individualActivity.poster_thumbnail
                        content["author"] = {}
                        content["author"]["id"] = individualActivity.author_profile.id
                        content["author"]["first_name"] = individualActivity.author_profile.first_name
                        content["author"]["last_name"] = individualActivity.author_profile.last_name
                        content['last_update_time'] = []
                        content['number_of_full_view'] = []
                        content['percentage_view'] = []

                        // console.log("SubscribedActivityReport :: content :: ", content)
                        if (myResources[j].viewed_content &&
                            myResources[j].viewed_content.fields) {
                            content['last_update_time'].push(myResources[j].
                                viewed_content.fields.last_update_time)
                            content['number_of_full_view'].push(myResources[j].
                                viewed_content.fields.number_of_full_view)
                            content['percentage_view'].push(myResources[j].
                                viewed_content.fields.percentage_view)
                            // console.log("SubscribedActivityReport :: content1 :: ", content)
                            
                        }
                        contents.push(content)
                        // console.log("MemberLearningPath :: contents :: ", contents)
                        content_ids.push(individualActivity.id)
                        // console.log("SubscribedActivityReport :: content_ids :: ", content_ids)
                    }
                    else {
                        if (myResources[j].viewed_content &&
                            myResources[j].viewed_content.fields) {

                            // console.log("SubscribedActivityReport :: content11 :: ", contents)
                            contents[indexOfContent].last_update_time.push(myResources[j].
                                viewed_content.fields.last_update_time)
                        

                            contents[indexOfContent].number_of_full_view.push(myResources[j].
                                viewed_content.fields.number_of_full_view)
                        

                            contents[indexOfContent].percentage_view.push(myResources[j].
                                viewed_content.fields.percentage_view)
                            
                        
                            
                            // console.log("MemberLearningPath :: content12 :: ", contents)
                            
                        }
                    }
                }
                else if (myResources[j].type == "Session") {
                    individualActivity = myResources[j].session[0]
                    let sessionpackage = []
                    for (let k = 0; k < myResources[j].session.length; k++) {
                        let individualSession = myResources[j].session[k]
                        let packageDef = JSON.parse(individualSession.package.fields.package_definition)
                        sessionpackage.push(packageDef[0].fields.package_name)
                        package_name = packageDef[0].fields.package_name
                        package_desc = packageDef[0].fields.package_description
                    }   
                    let session = {}
                    let indexOfSession = -1
                    if (session_ids.length > 0)
                        indexOfSession = session_ids.indexOf(individualActivity.session_id)
                    //   console.log("SubscribedActivityReport :: indexOfContent :: ", indexOfContent)
                    if (indexOfSession == -1) {
                        session["id"] = individualActivity.session_id
                        session["name"] = individualActivity.topic
                        session["packages"] = sessionpackage
                        session["start_time"] = individualActivity.start_date_time
                        session["end_time"] = individualActivity.end_date_time
                        session["status"] = individualActivity.status
                        session["description"] = individualActivity.description

                        sessions.push(session)
                        session_ids.push(individualActivity.session_id)
                    }
                    else {
                        let packages = sessions[indexOfSession].packages
                        sessions[indexOfSession]["packages"] = packages.concat(sessionpackage)
                    }
                }
                else if (myResources[j].type == "Document") {
                    individualActivity = myResources[j].document[0]
                    let documentPackage = []
                    for (let k = 0; k < myResources[j].document.length; k++) {
                        let individualDocument = myResources[j].document[k]
                        let packageDef = JSON.parse(individualDocument.package.fields.package_definition)
                        documentPackage.push(packageDef[0].fields.package_name)
                        package_name = packageDef[0].fields.package_name
                        package_desc = packageDef[0].fields.package_description
                    }   
                    let document = {}
                    let indexOfDocument = -1
                    if (document_ids.length > 0)
                        indexOfDocument = document_ids.indexOf(individualActivity.id)
                    //   console.log("SubscribedActivityReport :: indexOfContent :: ", indexOfContent)
                    if (indexOfDocument == -1) {
                        document["id"] = individualActivity.id
                        document["name"] = individualActivity.title
                        document["packages"] = documentPackage
                        document["url"] = individualActivity.document_url
                        document["description"] = individualActivity.description

                        document['last_update_time'] = []
                        document['number_of_full_view'] = []
                        document['percentage_view'] = []

                        if (myResources[j].viewed_document && 
                            myResources[j].viewed_document.fields) {
                                document['last_update_time'].push(myResources[j].
                                    viewed_document.fields.update_time)
                                document['number_of_full_view'].push(myResources[j].
                                    viewed_document.fields.number_of_full_view)
                                document['percentage_view'].push(myResources[j].
                                    viewed_document.fields.percentage_view)
                        }

                        documents.push(document)
                        document_ids.push(individualActivity.id)
                    }
                    else {
                        let packages = documents[indexOfDocument].packages
                        documents[indexOfDocument]["packages"] = packages.concat(documentPackage)

                        if (myResources[j].viewed_document &&
                            myResources[j].viewed_document.fields) {
                            documents[indexOfDocument].last_update_time.push(myResources[j].
                                viewed_document.fields.update_time)
                            documents[indexOfDocument].number_of_full_view.push(myResources[j].
                                viewed_document.fields.number_of_full_view)
                            documents[indexOfDocument].percentage_view.push(myResources[j].
                                viewed_document.fields.percentage_view)
                        }
                    }
                }
            }

            if (tests.length > 0) {
                activity.push(
                    <Grid fluid>
                    <div style={{marginTop:"20px", marginLeft:"10px"}}>
                        <span className="refier_custom_light_panel_title" >
                            Quiz
                        </span>
                    </div>
                    </Grid>
                )
            }
            let testActivity = []
            for (let j = 0; j < tests.length; j++){
                testActivity.push(
                    <Col xs={12} sm={6} md={4}>
                    <UserIndividualResource
                        key={j}
                        type={"test"}
                        test={tests[j]}
                            userProfileId={this.props.userProfileId} />
                    </Col>
                )
            }
            activity.push(
                <Grid fluid>
                    {testActivity}
                    </Grid>
            )

            if (contents.length > 0) {
                activity.push(
                    <Grid fluid>
                    <div style={{marginTop:"30px", marginLeft:"10px"}}>
                        <span className="refier_custom_light_panel_title" >
                            Video Contents
                        </span>
                        </div>
                        </Grid>
                )
            }
            let contentActivity = []
            for (let j = 0; j < contents.length; j++){
                // console.log("MemberLearningPath :: activity contents :: ", contents[j])
                contentActivity.push(
                    <Col xs={12} sm={6} md={4}>
                <UserIndividualResource
                    key={tests.length + j}
                    type={"content"}
                    content={contents[j]}
                            userProfileId={this.props.userProfileId} />
                        </Col>
                )
            }
            activity.push(
                <Grid fluid>
                    {contentActivity}
                    </Grid>
            )

            // if (sessions.length > 0) {
            //     activity.push(
            //         <div style={{marginTop:"20px"}}>
            //             <span className="refier_custom_light_panel_title" >
            //                 Webinars
            //             </span>
            //         </div>
            //     )
            // }
            // for (let j = 0; j < sessions.length; j++){
            //     activity.push(
            //         <UserIndividualResource
            //             key={tests.length + contents.length + j}
            //             type={"session"}
            //             session={sessions[j]}
            //             userProfileId={this.props.userProfileId}/>
            //     )
            // }

            if (documents.length > 0) {
                activity.push(
                    <Grid fluid>
                    <div style={{marginTop:"30px", marginLeft:"10px"}}>
                        <span className="refier_custom_light_panel_title" >
                            Documents
                        </span>
                        </div>
                        </Grid>
                )
            }
            let documentActivity = []
            for (let j = 0; j < documents.length; j++){
                documentActivity.push(
                    <Col xs={12} sm={6} md={4}>
                    <UserIndividualResource
                        key={tests.length + contents.length + sessions.length + j}
                        type={"document"}
                        document={documents[j]}
                            userProfileId={this.props.userProfileId} />
                    </Col>
                )
            }
            activity.push(
                <Grid fluid>
                    {documentActivity}
                    </Grid>
            )
            
            
            memberActivityList.push(
                <div>
                    <Grid fluid>
                        <Row>
                            <Col xs={12}>
                                <div
                                    style={{ marginTop: "10px" }}>
                                    {activity}
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            )
        }
        else if(myResources && myResources.length == 0){
            memberActivityList = []
        }

        return( memberActivityList ?
            memberActivityList.length > 0 ?
            <div style={{marginBottom:"50px"}}>
                    {memberActivityList}
                </div>
                    :
                    <div style={{textAlign:"center", marginTop:"20px"}}>
                        <div className="custom-list-content" style={{textAlign:"center"}}>
                            No Resources has been assigned yet.
                            </div>
                    </div>
                :
                <div style={{textAlign:"center", marginTop:"20px"}}>
                    <Preloader/>
            </div>
        )
    }
}