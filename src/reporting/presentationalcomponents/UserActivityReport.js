import React, { Component } from 'react'
import quizImageSrc from "../../images/mentor_dashboard_page/quiz.jpg";
import contentImageSrc from "../../images/mentor_dashboard_page/refier_generic.jpg";
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { Grid, Col, Row, FormControl, Image, Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import UserIndividualActivityReport from './UserIndividualActivityReport'
import Preloader from '../../shared/Preloader/PreLoader'
import {Link} from 'react-router-dom'
import '../../styles/scss/cards.css'
import CourseImg from '../../images/course/course.jpg';
import UserImg from '../../images/mentor_dashboard_page/avatardp.png';


export default class UserActivityReport extends Component{
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        // console.log("UserActivityReport :: this.props :: ", this.props)

        let userActivityReports = this.props.userActivityReport ?
            this.props.userActivityReport : undefined
    
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
        let package_admins = []

        let activity = []
        if (userActivityReports && userActivityReports.length>0) {
            memberActivityList = []
            let individualActivity
            // console.log("SubscribedActivityReport ::memberActivityReports[i].activity.length :: ",
            // memberActivityReports[i].activity.length)
            for (let j = 0; j < userActivityReports.length; j++){
                // console.log("SubscribedActivityReport ::j :: ",j)
                // console.log("SubscribedActivityReport ::memberActivityReports[i].activity[j].type :: ",
                // memberActivityReports[i].activity[j].type)
                if (userActivityReports[j].type == "Test") {
                    individualActivity = userActivityReports[j].test[0]
                    let testpackage = []
                    let testpackageIds = []
                    for (let k = 0; k < userActivityReports[j].test.length; k++) {
                        let individualTest = userActivityReports[j].test[k]
                        let packageDef = JSON.parse(individualTest.package.fields.package_definition)
                        package_admins = JSON.parse(individualTest.package.fields.package_admins)
                        testpackage.push(packageDef[0].fields.package_name)
                        package_name = packageDef[0].fields.package_name
                        package_desc = packageDef[0].fields.package_description
                        testpackageIds.push(individualTest.package.pk)
                    }

                    let test = {}
                    // console.log("SubscribedActivityReport :: individualActivity ",
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
                        test["package_ids"] = testpackageIds
                        test["session_date_time"] = []
                        test["session_analysis"] = []
                        // console.log("SubscribedActivityReport :: user_test ",
                        //     memberActivityReports[i].activity[j].user_test)
                        // console.log("SubscribedActivityReport :: test :: ", test)
                        if (userActivityReports[j].user_test &&
                            userActivityReports[j].user_test.fields) {
                            test["session_date_time"].push
                                (userActivityReports[j].user_test.fields.creation_time)
                            // console.log("SubscribedActivityReport :: test1 :: ", test)
                        }
                        if (userActivityReports[j].analysis) {
                            test["session_analysis"].push
                                (userActivityReports[j].analysis)
                            // console.log("SubscribedActivityReport :: test2 :: ", test)
                        }
                        tests.push(test)
                        // console.log("SubscribedActivityReport :: tests :: ", tests)
                        test_ids.push(individualActivity.test_id)
                        // console.log("SubscribedActivityReport :: test_ids :: ", test_ids)
                    }
                    else {
                        if (userActivityReports[j].user_test &&
                            userActivityReports[j].user_test.fields) {
                            // console.log("SubscribedActivityReport :: tests1 :: ", tests)
                            tests[indexOfTest].session_date_time.push
                                (userActivityReports[j].user_test.fields.creation_time)
                            
                            // console.log("SubscribedActivityReport :: tests11 :: ", tests)
                        }
                        if (userActivityReports[j].analysis) {
                            tests[indexOfTest].session_analysis.push
                                (userActivityReports[j].analysis)
                            
                            // console.log("SubscribedActivityReport :: tests2 :: ", tests)
                        }
                    }
                }
                else if (userActivityReports[j].type == "Content") {
                    individualActivity = userActivityReports[j].content[0]
                    let contentpackage = []
                    let contentpackageIds = []
                    for (let k = 0; k < userActivityReports[j].content.length; k++) {
                        let individualContent = userActivityReports[j].content[k]
                        let packageDef = JSON.parse(individualContent.package.fields.package_definition)
                        package_admins = JSON.parse(individualContent.package.fields.package_admins)
                        contentpackage.push(packageDef[0].fields.package_name)
                        package_name = packageDef[0].fields.package_name
                        package_desc = packageDef[0].fields.package_description
                        contentpackageIds.push(individualContent.package.pk)
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
                        content["package_ids"] = contentpackageIds
                        content["photo"] = individualActivity.poster_thumbnail
                        content["author"] = {}
                        content["author"]["id"] = individualActivity.author_profile.id
                        content["author"]["first_name"] = individualActivity.author_profile.first_name
                        content["author"]["last_name"] = individualActivity.author_profile.last_name
                        content['last_update_time'] = []
                        content['number_of_full_view'] = []
                        content['percentage_view'] = []

                        // console.log("SubscribedActivityReport :: content :: ", content)
                        if (userActivityReports[j].viewed_content &&
                            userActivityReports[j].viewed_content.fields) {
                            content['last_update_time'].push(userActivityReports[j].
                                viewed_content.fields.last_update_time)
                            content['number_of_full_view'].push(userActivityReports[j].
                                viewed_content.fields.number_of_full_view)
                            content['percentage_view'].push(userActivityReports[j].
                                viewed_content.fields.percentage_view)
                            // console.log("SubscribedActivityReport :: content1 :: ", content)
                            
                        }
                        contents.push(content)
                        // console.log("SubscribedActivityReport :: contents :: ", contents)
                        content_ids.push(individualActivity.id)
                        // console.log("SubscribedActivityReport :: content_ids :: ", content_ids)
                    }
                    else {
                        if (userActivityReports[j].viewed_content &&
                            userActivityReports[j].viewed_content.fields) {

                            // console.log("SubscribedActivityReport :: content11 :: ", contents)
                            contents[indexOfContent].last_update_time.push(userActivityReports[j].
                                viewed_content.fields.last_update_time)
                        

                            contents[indexOfContent].number_of_full_view.push(userActivityReports[j].
                                viewed_content.fields.number_of_full_view)
                        

                            contents[indexOfContent].percentage_view.push(userActivityReports[j].
                                viewed_content.fields.percentage_view)
                            
                        
                            
                            // console.log("SubscribedActivityReport :: content12 :: ", contents)
                            
                        }
                    }
                }
                else if (userActivityReports[j].type == "Session") {
                    individualActivity = userActivityReports[j].session[0]
                    let sessionpackage = []
                    let sessionpackageIds = []
                    for (let k = 0; k < userActivityReports[j].session.length; k++) {
                        let individualSession = userActivityReports[j].session[k]
                        let packageDef = JSON.parse(individualSession.package.fields.package_definition)
                        package_admins = JSON.parse(individualSession.package.fields.package_admins)
                        sessionpackage.push(packageDef[0].fields.package_name)
                        package_name = packageDef[0].fields.package_name
                        package_desc = packageDef[0].fields.package_description
                        sessionpackageIds.push(individualSession.package.pk)
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
                        session["package_ids"] = sessionpackageIds
                        session["start_time"] = individualActivity.start_date_time
                        session["end_time"] = individualActivity.end_date_time
                        session["status"] = individualActivity.status
                        session["description"] = individualActivity.description

                        sessions.push(session)
                        session_ids.push(individualActivity.session_id)
                    }
                    else {
                        let packages = sessions[indexOfSession].packages
                        let sessionpackages = sessions[indexOfSession].package_ids
                        sessions[indexOfSession]["packages"] = packages.concat(sessionpackage)
                        sessions[indexOfSession]["package_ids"] = sessionpackages.concat(sessionpackageIds)
                    }
                }
                else if (userActivityReports[j].type == "Document") {
                    individualActivity = userActivityReports[j].document[0]
                    let documentPackage = []
                    let documentPackageIds = []
                    for (let k = 0; k < userActivityReports[j].document.length; k++) {
                        let individualDocument = userActivityReports[j].document[k]
                        let packageDef = JSON.parse(individualDocument.package.fields.package_definition)
                        package_admins = JSON.parse(individualDocument.package.fields.package_admins)
                        documentPackage.push(packageDef[0].fields.package_name)
                        package_name = packageDef[0].fields.package_name
                        package_desc = packageDef[0].fields.package_description
                        documentPackageIds.push(individualDocument.package.pk)
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
                        document["package_ids"] = documentPackageIds
                        document["url"] = individualActivity.document_url
                        document["description"] = individualActivity.description
                        document['last_update_time'] = []
                        document['number_of_full_view'] = []
                        document['percentage_view'] = []

                        if (userActivityReports[j].viewed_document && 
                            userActivityReports[j].viewed_document.fields) {
                                document['last_update_time'].push(userActivityReports[j].
                                    viewed_document.fields.update_time)
                                document['number_of_full_view'].push(userActivityReports[j].
                                    viewed_document.fields.number_of_full_view)
                                document['percentage_view'].push(userActivityReports[j].
                                    viewed_document.fields.percentage_view)
                        }

                        documents.push(document)
                        document_ids.push(individualActivity.id)
                    }
                    else {
                        let packages = documents[indexOfDocument].packages
                        let documentpackagesIds = documents[indexOfDocument].package_ids
                        documents[indexOfDocument]["packages"] = packages.concat(documentPackage)
                        documents[indexOfDocument]["package_ids"] = documentpackagesIds.concat(documentPackageIds)

                        if (userActivityReports[j].viewed_document &&
                            userActivityReports[j].viewed_document.fields) {
                            documents[indexOfDocument].last_update_time.push(userActivityReports[j].
                                viewed_document.fields.update_time)
                            documents[indexOfDocument].number_of_full_view.push(userActivityReports[j].
                                viewed_document.fields.number_of_full_view)
                            documents[indexOfDocument].percentage_view.push(userActivityReports[j].
                                viewed_document.fields.percentage_view)
                        }
                    }
                }
            }

            if (tests.length > 0) {
                activity.push(
                    <div style={{marginTop:"20px"}}>
                        <span className="refier_custom_light_panel_title" >
                            Quiz
                        </span>
                    </div>
                )
            }
            for (let j = 0; j < tests.length; j++){
                activity.push(
                    <UserIndividualActivityReport
                        key={j}
                        type={"test"}
                        test={tests[j]}
                        userProfileId={this.props.userProfileId}/>
                )
            }

            if (contents.length > 0) {
                activity.push(
                    <div style={{marginTop:"30px"}}>
                        <span className="refier_custom_light_panel_title" >
                            Video Contents
                        </span>
                    </div>
                )
            }
            for (let j = 0; j < contents.length; j++){
                // console.log("SubscribedActivityReport :: activity contents :: ", contents[j])
                activity.push(
                <UserIndividualActivityReport
                    key={tests.length + j}
                    type={"content"}
                    content={contents[j]}
                    userProfileId={this.props.userProfileId} />
                )
            }

            if (sessions.length > 0) {
                activity.push(
                    <div style={{marginTop:"20px"}}>
                        <span className="refier_custom_light_panel_title" >
                            Webinars
                        </span>
                    </div>
                )
            }
            for (let j = 0; j < sessions.length; j++){
                activity.push(
                    <UserIndividualActivityReport
                        key={tests.length + contents.length + j}
                        type={"session"}
                        session={sessions[j]}
                        userProfileId={this.props.userProfileId}/>
                )
            }

            if (documents.length > 0) {
                activity.push(
                    <div style={{marginTop:"20px"}}>
                        <span className="refier_custom_light_panel_title" >
                            Documents
                        </span>
                    </div>
                )
            }
            for (let j = 0; j < documents.length; j++){
                activity.push(
                    <UserIndividualActivityReport
                        key={tests.length + contents.length + sessions.length + j}
                        type={"document"}
                        document={documents[j]}
                        userProfileId={this.props.userProfileId}/>
                )
            }
            
            
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
        else if(userActivityReports && userActivityReports.length == 0){
            memberActivityList = []
        }


        console.log("UserActivityReport :: memberActivityList :: ", memberActivityList)

        if (this.props.package) {
            let admins = []
            console.log("UserActivityReport :: package_admins :: ", package_admins)
            for (let i = 0; i < package_admins.length; i++){
                if (package_admins[i].fields.user) {
                    let name = package_admins[i].fields.user.last_name === "" ?
                        (package_admins[i].fields.user.first_name) :
                        (package_admins[i].fields.user.first_name + " " +
                            package_admins[i].fields.user.last_name)
                    let photo = 
                    package_admins[i].fields.user.profile_photo ? MEDIA_URL_TEXT +
                            package_admins[i].fields.user.profile_photo : UserImg
                    admins.push(
                        <Grid fluid>
                            <Col xsOffset={2} style={{ textAlign: "left", marginTop: "10px" }}>
                            <Link to={"/userDashboard/profile/" +  package_admins[i].fields.user.id}>
                            <span>
                            <img
                                src={photo}
                                    className="custom-list-img" />
                                    <span className="custom-list-sub-content-white" style={{marginLeft:"10px"}}>
                                    {name}
                                        </span></span>
                            </Link>
                        </Col>
                        </Grid>
                    )
                }
            }
            return (
                <Grid fluid>
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
                            {package_name}
                            </div>
                                <div>
                                    <div className="refier_custom_desc_white"
                                                        style={{ "textAlign": "center", margin: "10px" }}>
                                    <span>
                                    {package_desc}
                                    </span>
                                </div>
                                </div>
                                {admins.length > 0 ?
                                    <Grid fluid>
                                    <Col xsOffset={2} style={{textAlign:"left"}}>
                                <div className="custom-list-content-white"
                                    style={{ marginTop: "20px", paddingLeft:"10px", fontWeight:"600" }}>
                                            Experts
                                </div>
                                    </Col>
                                    </Grid>
                                                :
                                                null
                                            }
                                <div>
                                    {admins}
                                </div>                
                            
                            </div>

                                    </div>
                                </div>
                                </div>
                        </div>
                                
                        </div>
                        </Col> 
                    <Col xsOffset={1} xs={10} lgOffset={0} lg={9}>
                    {memberActivityList ?
                        memberActivityList.length > 0 ?
                        <div style={{marginBottom:"50px"}}>
                                {memberActivityList}
                                </div>
                            :
                            <div style={{textAlign:"center", marginTop:"20px"}}>
                                <div className="custom-list-content" style={{textAlign:"center"}}>
                                    Sorry, There are no learning content in Queue.
                                    
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                    <Link to={"/userDashboard/subscriptions"} target="blank">
                                        <Button bsStyle="primary"
                                            className="refier_custom_button_new_selected_2"
                                            >Explore Courses</Button>
                                    </Link>
                                </div> 
                            </div>
                        :
                        <div style={{textAlign:"center", marginTop:"20px"}}>
                            <Preloader/>
                        </div>
                }
                    </Col>
            </Grid>
            )
        }
        return (
            <Grid fluid>
                            <Col xsOffset={2} xs={8} style={{}}>
                                <div style={{ marginTop: "10px" }}>
                                    <span className="refier_custom_panel_title_black" >
                                        My Learnings
                                </span>
                                </div>
                                <div style={{ border: "1px solid #f2f2f2", marginTop: "15px" }}>
                                    <FormControl
                                        autofocus
                                        componentClass="textarea"
                                        placeholder="Search ..."
                                        className="custom-search-area"
                                    // onChange={this.props.setBlogTitle}
                                    // value={ this.props.blogTitle }
                                    />
                                </div>
                            </Col>
                <Col xsOffset={1} xs={10}>
                    {memberActivityList ?
                        memberActivityList.length > 0 ?
                        <div style={{marginBottom:"50px"}}>
                                {memberActivityList}
                                </div>
                            :
                            <div style={{textAlign:"center", marginTop:"20px"}}>
                                <div className="custom-list-content" style={{textAlign:"center"}}>
                                    Sorry, There are no learning content in Queue.
                                    Either join a community or subscribe to learning packages
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                    <Link to={"/userDashboard/subscriptions"} target="blank">
                                        <Button bsStyle="primary"
                                            className="refier_custom_button_new_selected_2"
                                            >Explore Packages</Button>
                                    </Link>
                                </div> 
                            </div>
                        :
                        <div style={{textAlign:"center", marginTop:"20px"}}>
                            <Preloader/>
                        </div>
                }
                    </Col>
            </Grid>
        )
    }
}