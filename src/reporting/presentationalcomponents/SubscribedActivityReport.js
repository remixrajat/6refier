import React, { Component } from 'react'
import { Grid, Col, Row, FormControl, Image} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import ContentActivityReport from './ContentActivityReport'

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import contentImageSrc from "../../images/mentor_dashboard_page/refier_generic.jpg";
import quizImageSrc from "../../images/mentor_dashboard_page/quiz.jpg";


export default class SubscribedActivityReport extends Component{
    constructor(props) {
        super(props)
        this.state = {
           searchText: "" 
        }

        this.onEditSearch = this.onEditSearch.bind(this)
    }

    onEditSearch(e) {
        let value = e.target.value
        // console.log("Search text : ",e.target.value)
        this.setState({searchText: value})
    }

    render() {
        // console.log("SubscribedActivityReport :: this.props :: ", this.props)

        let memberActivityReports = this.props.communityActivityReport ?
            this.props.communityActivityReport.activity_report : undefined
    
        let test_ids = []
        let content_ids = []
        let tests = []
        let contents = []
        let memberActivityList = []

        let activity = []
        if (memberActivityReports) {
            for (let i = 0; i < memberActivityReports.length; i++){
                // console.log("SubscribedActivityReport :: member report :: ", memberActivityReports[i])
                let communityMemberJson = JSON.parse(memberActivityReports[i].community_member)
                // let name = communityMemberJson.last_name ? (communityMemberJson.last_name != 'None'
                //     || communityMemberJson.last_name != '') ? (communityMemberJson.first_name + ' ' + 
                //         communityMemberJson.last_name) : communityMemberJson.first_name :
                //     communityMemberJson.first_name
                
                // let profile_photo = communityMemberJson.profile_photo
                
                
                let individualActivity

                // console.log("SubscribedActivityReport ::memberActivityReports[i].activity.length :: ",
                // memberActivityReports[i].activity.length)
                for (let j = 0; j < memberActivityReports[i].activity.length; j++){
                    // console.log("SubscribedActivityReport ::j :: ",j)
                    // console.log("SubscribedActivityReport ::memberActivityReports[i].activity[j].type :: ",
                    // memberActivityReports[i].activity[j].type)
                    if (memberActivityReports[i].activity[j].type == "Test") {
                        individualActivity = (memberActivityReports[i].activity[j].test[0])
                        let test = {}
                        // console.log("SubscribedActivityReport :: individualActivity ",
                        //     individualActivity)
                        let indexOfTest = -1
                        if(test_ids.length>0)
                            indexOfTest = test_ids.indexOf(individualActivity.test_id)
                        // console.log("SubscribedActivityReport :: indexOfTest ",
                        //             indexOfTest)
                        if (indexOfTest == -1) {
                            test["id"] = individualActivity.test_id
                            test["name"] = individualActivity.test_name
                            test["session_date_time"] = []
                            test["session_analysis"] = []
                            test["member_id"] = []
                            test["member_json"] = []
                            // console.log("SubscribedActivityReport :: user_test ",
                            //     memberActivityReports[i].activity[j].user_test)
                                // console.log("SubscribedActivityReport :: test :: ", test)
                            if (memberActivityReports[i].activity[j].user_test &&
                                memberActivityReports[i].activity[j].user_test.fields) {
                                test["session_date_time"].push
                                    (memberActivityReports[i].activity[j].user_test.fields.creation_time)
                                    // console.log("SubscribedActivityReport :: test1 :: ", test)
                                test["member_id"].push(communityMemberJson.id)
                                test["member_json"].push(communityMemberJson)
                            }
                            if (memberActivityReports[i].activity[j].analysis) {
                                test["session_analysis"].push
                                    (memberActivityReports[i].activity[j].analysis)
                                    // console.log("SubscribedActivityReport :: test2 :: ", test)
                            }
                            tests.push(test)
                            // console.log("SubscribedActivityReport :: tests :: ", tests)
                            test_ids.push(individualActivity.test_id)
                            // console.log("SubscribedActivityReport :: test_ids :: ", test_ids)
                        }
                        else {
                            if (memberActivityReports[i].activity[j].user_test &&
                                memberActivityReports[i].activity[j].user_test.fields) {
                                // console.log("SubscribedActivityReport :: tests1 :: ", tests)
                                    tests[indexOfTest].session_date_time.push
                                        (memberActivityReports[i].activity[j].user_test.fields.creation_time)
                                
                                // console.log("SubscribedActivityReport :: tests11 :: ", tests)
                                tests[indexOfTest].member_id.push(communityMemberJson.id)
                                tests[indexOfTest].member_json.push(communityMemberJson)
                            }
                            if (memberActivityReports[i].activity[j].analysis) {
                                    tests[indexOfTest].session_analysis.push
                                        (memberActivityReports[i].activity[j].analysis)
                                
                                // console.log("SubscribedActivityReport :: tests2 :: ", tests)
                            }
                        }
                    }
                    else if (memberActivityReports[i].activity[j].type == "Content") {
                        individualActivity = (memberActivityReports[i].activity[j].content[0])
                        let content = {}
                        let indexOfContent = -1
                        if (content_ids.length>0)
                          indexOfContent = content_ids.indexOf(individualActivity.id)
                        //   console.log("SubscribedActivityReport :: indexOfContent :: ", indexOfContent)
                        if (indexOfContent == -1) {
                            content["id"] = individualActivity.id
                            content["name"] = individualActivity.title
                            content["photo"] = individualActivity.poster_thumbnail
                            content['last_update_time'] = []
                            content['number_of_full_view'] = []
                            content['percentage_view'] = []

                            content["member_id"] = []
                            content["member_json"] = []
                            // console.log("SubscribedActivityReport :: content :: ", content)
                            if (memberActivityReports[i].activity[j].viewed_content &&
                                memberActivityReports[i].activity[j].viewed_content.fields)
                            {
                                content['last_update_time'].push(memberActivityReports[i].activity[j].
                                    viewed_content.fields.last_update_time)
                                content['number_of_full_view'].push(memberActivityReports[i].activity[j].
                                    viewed_content.fields.number_of_full_view)
                                content['percentage_view'].push(memberActivityReports[i].activity[j].
                                    viewed_content.fields.percentage_view)
                                    // console.log("SubscribedActivityReport :: content1 :: ", content)
                                
                                content["member_id"].push(communityMemberJson.id)
                                content["member_json"].push(communityMemberJson)
                            }
                            contents.push(content)
                            // console.log("SubscribedActivityReport :: contents :: ", contents)
                            content_ids.push(individualActivity.id)
                            // console.log("SubscribedActivityReport :: content_ids :: ", content_ids)
                        }
                        else {
                            if (memberActivityReports[i].activity[j].viewed_content &&
                                memberActivityReports[i].activity[j].viewed_content.fields)
                            {

                                // console.log("SubscribedActivityReport :: content11 :: ", contents)
                                contents[indexOfContent].last_update_time.push(memberActivityReports[i].activity[j].
                                    viewed_content.fields.last_update_time)
                            

                                contents[indexOfContent].number_of_full_view.push(memberActivityReports[i].activity[j].
                                    viewed_content.fields.number_of_full_view)
                            

                                contents[indexOfContent].percentage_view.push(memberActivityReports[i].activity[j].
                                        viewed_content.fields.percentage_view)
                                
                                
                                contents[indexOfContent].member_id.push(communityMemberJson.id)
                                contents[indexOfContent].member_json.push(communityMemberJson)
                                
                                // console.log("SubscribedActivityReport :: content12 :: ", contents)
                                
                            }
                        }
                    }
                }
            }

            if (tests.length > 0) {
                activity.push(
                    <div style={{marginTop:"20px"}}  key={1}>
                    <span className="refier_custom_light_panel_title" >
                        Quiz
                                </span>
                    </div>
                )
            }
            for (let j = 0; j < tests.length; j++){
                if (this.state.searchText == "") {
                    let text=""
                    activity.push(
                        <ContentActivityReport
                            key={2+j}
                            type={"test"}
                            test={tests[j]}
                            coloredText={text} />
                    )
                }
                else {
                    let name = tests[j].name.toLowerCase()
                    let text = this.state.searchText.toLowerCase()
                    if (name.indexOf(text) != -1) {
                        activity.push(
                        <ContentActivityReport
                            key={2+j}
                            type={"test"}
                            test={tests[j]}
                                coloredText={text} />
                        )
                    }
                }
                // activity.push(
                //     <Grid fluid style={{ marginTop: "10px", padding:"0px" }}
                //         className="refier-card-style">
                //         <Col xs={4} md={2} style={{ padding: "0px" }}>
                //             
                //             <div>
                //                 <Image src={quizImageSrc} responsive/>
                //             </div>
                //         </Col>
                //         <Col xs={8} md={10} style={{padding:"20px"}}>
                //             <div  className="custom-list-content">
                //                 {tests[j].name}
                //             </div>
                //             <div  className="custom-list-sub-content">
                //                 {tests[j].session_date_time ?
                //                 (tests[j].session_date_time.length + " Times Completed"):"No Attempts"}
                //             </div>
                //             <div style={{marginTop:"10px"}}>
                //                 <span>
                //                     <FontAwesome
                //                         name="caret-right"
                //                     />
                //                 </span>
                //                 <span style={{ marginLeft: "10px" }} className="refier_custom_link">
                //                     Details
                //                 </span>
                //             </div>
                //         </Col>
                //     </Grid>
                // )
            }

            if (contents.length > 0) {
                activity.push(
                    <div style={{ marginTop: "30px" }} key={3 + tests.length}>
                    <span className="refier_custom_light_panel_title" >
                        Video Contents
                    </span>
                        </div>
                )
            }
            for (let j = 0; j < contents.length; j++){
                // console.log("SubscribedActivityReport :: activity contents :: ", contents[j])
                if (this.state.searchText == "") {
                    let text= ""
                    activity.push(
                        <ContentActivityReport
                            key={4 + tests.length + j}
                            type={"content"}
                            content={contents[j]}
                            coloredText={text}/>
                    )
                }
                else {
                    let name = contents[j].name.toLowerCase()
                    let text = this.state.searchText.toLowerCase()
                    if (name.indexOf(text) != -1) {
                        activity.push(
                        <ContentActivityReport
                            key={4 + tests.length + j}
                            type={"content"}
                            content={contents[j]}
                                coloredText={text} />
                        )
                    }
                }


                // activity.push(
                //     <Grid fluid
                //     className="refier-card-style" style={{ marginTop: "10px", padding:"0px"}}>
                //         <Col xs={4} md={2} style={{padding:"0px"}}>
                //             <div>
                //                 <Image src={contents[j].photo || 
                //                     contents[j].photo != ""? 
                //                         MEDIA_URL_TEXT +
                //                         contents[j].photo:contentImageSrc} responsive/>
                //             </div>
                //         </Col>
                //         <Col xs={8} md={10} style={{padding:"20px"}}>
                            
                //             <div className="custom-list-content">
                //                 {contents[j].name}
                //             </div>
                //             <div  className="custom-list-sub-content">
                //             {contents[j].number_of_full_view?
                //                     (contents[j].number_of_full_view.length + " Views")
                //                     : "No Views"
                //                 }
                //             </div>
                //             <div style={{marginTop:"10px"}}>
                //                 <span>
                //                     <FontAwesome
                //                         name="caret-right"
                //                     />
                //                 </span>
                //                 <span style={{ marginLeft: "10px" }} className="refier_custom_link">
                //                     Details
                //                 </span>
                //             </div>
                //         </Col>
                //     </Grid>
                // )
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

        return (
            <Grid fluid>
                <Col xsOffset={2} xs={8} style={{marginTop:"30px"}}>
                    <div style={{border:"1px solid #f2f2f2"}}>
                        <FormControl 
                            autofocus
                            componentClass="textarea"
                            placeholder="Search ..." 
                            className="custom-search-area"
                            onChange={this.onEditSearch}
                        />
                    </div>
                </Col>
                <Col xsOffset={0} xs={12}>
                    {memberActivityList}
                </Col>
            </Grid>
        )
    }
}