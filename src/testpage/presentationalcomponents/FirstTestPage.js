import React, { Component } from 'react'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import Preloader from '../../shared/Preloader/PreLoader'
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import TestPackageController from '../conditionalcomponents/TestPackageController'
import SubscriptionPackageValidityController from '../../SubscriptionsPage/conditionalcomponents/SubscriptionPackageValidityController'
import TagController from '../../shared/Tags/conditionalcomponents/TagController'

export default class FirstTestPage extends Component {

    componentDidMount() {
        if (this.props.testEnrollmentDetail) {
            let enrollment = this.props.testEnrollmentDetail.enrollment_details
            enrollment = JSON.parse(enrollment)
            console.log("componentDidMount::enrollment", enrollment)
            this.props.setTestSessionId(enrollment[0].pk)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.testEnrollmentDetail) {
            if (nextProps.testEnrollmentDetail) {
                let enrollment = nextProps.testEnrollmentDetail.enrollment_details
                enrollment = JSON.parse(enrollment)
                console.log("componentWillReceiveProps::enrollment", enrollment)
                this.props.setTestSessionId(enrollment[0].pk)
            }
        }
    }

    render() {
        console.log("FirstTestPage::props", this.props)
        console.log("FirstTestPage::analysisUserAllAttempts", this.props.analysisUserAllAttempts)
        let analysisList
        let analysisDiv
        let firstCol = []
        let secondCol = []
        let thirdCol = []
        if (this.props.analysisUserAllAttempts) {
            let analysis = this.props.analysisUserAllAttempts.analysis
            if (analysis != "No Attempts") {
                if (analysis != "Invalid") {
                    analysisList = []
                    if (analysis.length > 0) {
                        let count = -1

                        // Offset to maintain the sequence from first to third column
                        // let offset = 3 - (analysis.length - 1) % 3
                        // count = count + offset
                        
                        for (let i = analysis.length - 1; i >= 0; i--) {
                            let testAnalysis = JSON.parse(analysis[i].fields.analysis)
                            console.log("FirstTestPage :: testAnalysis : ",testAnalysis)
                            if ((testAnalysis.test_type == "isAnalysis" && testAnalysis.analysis.length > 0)
                                || 
                                (testAnalysis.test_type == "isParametricAnalysis")) {
                                count = count + 1
                                let analysisBody
                                let date = formatdatefunction(analysis[i].fields.creation_time, "long")
                                let time = formatdatefunction(analysis[i].fields.creation_time, "time")
                                analysisBody = []
                                let index
                                if (testAnalysis.test_type == "isAnalysis") {
                                    index = testAnalysis.bin?  testAnalysis.bin: i% 4
                                    analysisBody.push(
                                        <div>
                                            <div>{testAnalysis.analysis}</div>
                                            <div>{testAnalysis.percentage}%</div>
                                        </div>)
                                }
                                else if (testAnalysis.test_type == "isParametricAnalysis") {

                                    let bin_total = 0
                                    let percentage_total = 0
                                    let count=0
                                    for (let key in testAnalysis.analysis) {
                                        count = count+1
                                        analysisBody.push(
                                            <div>
                                                <div style={{
                                                    marginTop: "15px", fontSize: "0.9em"
                                                      , fontWeight:"600"  }} className="">
                                                    {key}
                                                </div>
                                                <div style={{ marginTop: "5px", fontSize:"0.8em" }}>
                                                    {testAnalysis.analysis[key]}    
                                                </div>    
                                            </div>
                                            
                                        )
                                        bin_total = bin_total +
                                            (testAnalysis.bin ?
                                                testAnalysis.bin[key] : 0)
                                        percentage_total = percentage_total +
                                            (testAnalysis.percentage ?
                                                testAnalysis.percentage[key] : 0)
                                    }
                                    index = Math.ceil(bin_total / count)
                                    let percentage = Math.ceil(percentage_total / count) 
                                    analysisBody.push(
                                        <div>
                                            <div style={{
                                                marginTop: "15px", fontSize: "0.9em"
                                                , fontWeight: "600"
                                            }} className="">{percentage}%
                                            </div>
                                            </div>
                                                )
                                }

                                // analysisList.push(
                                //     <Col xs={12} sm={5} md={4}
                                //         style={{ padding: "20px 20px" }}>
                                //         <div className={"custom-panel-" + index}>
                                //             <div className="custom-list-sub-content-white"
                                //                 style={{ textAlign: "center", color:"white" }}>{date}  {time}</div>
                                //             <div className="custom-list-content-white"
                                //                 style={{ marginTop: "10px", textAlign: "center" }}
                                //             >{analysisBody}</div></div>
                                //     </Col>)
                                let columnNumber = count % 3
                                switch (columnNumber) {
                                    case 0:
                                        firstCol.push(
                                            <div
                                                style={{ padding: "20px 20px" }}>
                                                <div className={"custom-panel-" + index}>
                                                    <div className="custom-list-sub-content-white"
                                                        style={{ textAlign: "center", color: "white" }}>{date}  {time}</div>
                                                    <div className="custom-list-content-white"
                                                        style={{ marginTop: "10px", textAlign: "center" }}
                                                    >{analysisBody}</div>
                                                </div>
                                            </div>
                                        )
                                        break;
                                    case 1:
                                        secondCol.push(
                                            <div
                                                style={{ padding: "20px 20px" }}>
                                                <div className={"custom-panel-" + index}>
                                                    <div className="custom-list-sub-content-white"
                                                        style={{ textAlign: "center", color: "white" }}>{date}  {time}</div>
                                                    <div className="custom-list-content-white"
                                                        style={{ marginTop: "10px", textAlign: "center" }}
                                                    >{analysisBody}</div></div>
                                            </div>
                                        )
                                        break;
                                    case 2:
                                        thirdCol.push(
                                            <div
                                                style={{ padding: "20px 20px" }}>
                                                <div className={"custom-panel-" + index}>
                                                    <div className="custom-list-sub-content-white"
                                                        style={{ textAlign: "center", color: "white" }}>{date}  {time}</div>
                                                    <div className="custom-list-content-white"
                                                        style={{ marginTop: "10px", textAlign: "center" }}
                                                    >{analysisBody}</div></div>
                                            </div>
                                        )
                                        break;
                                    
                                }
                            }
                        }
                    }  
                    analysisDiv = 
                        <div style={{marginTop:"10px"}}>
                        <Col xs={12} sm={5} md={4}>
                            {firstCol}    
                        </Col>
                        <Col xs={12} sm={5} md={4}>
                            {secondCol}    
                        </Col>  
                        <Col xs={12} sm={5} md={4}>
                            {thirdCol}    
                        </Col>      
                        </div>
                }
            }
        }

        let total_credits = 0
        if (this.props.userCredits) {
            total_credits = this.props.userCredits[0].fields.total_credits
        }

        let test_name, desc, expected_minutes, pendingMessage, tags, tagValues,
            subscribed_packages, purchase_packages, entity_mapping_id
        let is_purchase_package = false
        if (this.props.testDetail) {
            let details = this.props.testDetail.test_details
            console.log("FirstTestPage:::details", details)
            details = JSON.parse(details)
            console.log("FirstTestPage:::details", details)
            test_name = details[0].fields.test_name
            desc = details[0].fields.description
            expected_minutes = details[0].fields.expected_time_in_minutes
            tagValues = details[0].fields.tags
            // tagValues = JSON.parse(details[0].fields.tags)
            // tags = []
            // for (let i = 0; i < tagValues.length; i++) {
            //     let index = this.props.index ? this.props.index + i : i
            //     index = index % 4
            //     tags.push(
            //         <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
            //             className={"custom-list-tag-" + index}>
            //             {tagValues[i].fields.tag_name}</span>)
            // }
            let user_sessions = JSON.parse(details[0].fields.user_sessions)
            for (let i = 0; i < user_sessions.length; i++) {
                if (user_sessions[i].fields.status == "Pending") {
                    pendingMessage = "Looks Like, You have a Pending Test to Complete."
                }
            }

            let packages = JSON.parse(details[0].fields.subscriptions_packages)
            let all_subscriptions_packages = packages.SubscribedPackages
            console.log("subscriptions_packages all", all_subscriptions_packages)
            if (all_subscriptions_packages) {
                if (all_subscriptions_packages.length > 0) {
                    subscribed_packages = []
                    for (let m = 0; m < all_subscriptions_packages.length; m++) {
                        let subscriptions_packages = JSON.parse(all_subscriptions_packages[m])
                        console.log("subscriptions_packages", subscriptions_packages)
                        if (subscriptions_packages) {
                            if (subscriptions_packages.length > 0) {
                                
                                for (let i = 0; i < subscriptions_packages.length; i++) {
                                    if (subscriptions_packages[i].fields.user) {
                                        if (!entity_mapping_id) {
                                            entity_mapping_id = subscriptions_packages[i].pk
                                        }
                                        subscribed_packages.push(<span
                                            style={{ display: "inline-block" }}
                                            className="custom-border custom-test-package">
                                            Subscribed -- {subscriptions_packages[i].fields.days_left} Days Left
                                    </span>)
                                    }
                                    else if (subscriptions_packages[i].fields.entity) {
                                        entity_mapping_id = subscriptions_packages[i].pk
                                        subscribed_packages.push(<span
                                            style={{ display: "inline-block" }}
                                            className="custom-border custom-test-package">
                                            {subscriptions_packages[i].fields.entity} Subscription -- {subscriptions_packages[i].fields.days_left} Days Left
                                    </span>)
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (!subscribed_packages) {
                is_purchase_package = true
                packages = JSON.parse(details[0].fields.subscriptions_packages)
                let available_packages = packages.AvailablePackages
                console.log("available_packages", available_packages)
                if (available_packages) {
                    if (available_packages.length > 0) {
                        available_packages = JSON.parse(available_packages[0])
                        console.log("available_packages", available_packages)
                        if (available_packages) {
                            if (available_packages.length > 0) {
                                purchase_packages = []
                                for (let i = 0; i < available_packages.length; i++) {
                                    if (available_packages[i].fields.cost_of_package == 0) {
                                        is_purchase_package = false
                                        purchase_packages = []
                                        purchase_packages.push(<span
                                            style={{
                                                display: "inline-block",
                                            }}
                                            className="custom-border custom-test-package">
                                            Free
                                        </span>)
                                        break
                                    }
                                    else {
                                        purchase_packages.push(
                                            <SubscriptionPackageValidityController
                                                available_package={available_packages[i]}
                                                total_credits={total_credits}
                                                refresh={this.props.refresh} 
                                                product_type="Test_Single_Package"
                                            />

                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }





        let body
        let message
        if (this.props.testDetail) {
            if (this.props.isTestExists == true) {
                if (this.props.isEntitled == false) {
                    body = <div>OOPS!! Seems like You doesn't have access to the test</div>
                }
            }
            else {
                body = <div>OOPS!! Seems like the test you are trying to access doesn't exist</div>
            }
        }
        else {
            body = <Preloader loaderMessage="Loading Test Details..." />
        }

        // console.log("this.props.isProgress,this.props.isEntitled,this.props.isTestExists ::",this.props.isProgress,this.props.isEntitled,this.props.isTestExists )
        return (
            <Grid fluid>
                {!this.props.isProgress ?
                    this.props.isEntitled && this.props.isTestExists ?
                        <Row>
                            {/* {console.log("Is entitled as well as isTestExists",test_name,desc,tags,expected_minutes,pendingMessage,analysisList)} */}
                            <Col xsOffset={1} xs={10}
                                // className="refier-card-style"
                                className="generic-post-card" style={{
                                    padding: "20px"}}
                            >
                                <div style={{ padding: "10px 20px" }}>
                                    <div className="custom-test-title ">
                                        {test_name}
                                    </div>
                                    <div className="custom-test-desc" style={{ marginTop: "20px" }}>
                                        {desc}
                                    </div>
                                    {subscribed_packages}
                                    <div style={{ marginTop: "10px" }}>
                                        {/* {tags} */}

                                        <TagController tagValues={tagValues}
                                            index={this.props.index}
                                            userId={this.props.profileId}
                                        />
                                    </div>
                                    <div className="custom-test-time" style={{ marginTop: "20px" }}>
                                        Estimated Time : {expected_minutes} Minutes
                                    </div>
                                    {pendingMessage ?
                                        <div className="custom-tag-message" style={{ marginTop: "20px" }}>
                                            {pendingMessage}
                                        </div>
                                        :
                                        null
                                    }
                                    {purchase_packages}
                                    {
                                        this.props.isEnrollButton ?
                                            !is_purchase_package ?
                                                <div style={{ marginTop: "10px" }}>
                                                    <Button onClick={this.props.onClickForEnrollment.bind(this, entity_mapping_id)}
                                                        className='refier_custom_button_save'>Enroll
                                                </Button>
                                                </div>
                                                :
                                                null
                                            :
                                            this.props.isStartButton ?
                                                <div style={{ marginTop: "10px" }}>
                                                    <Button onClick={this.props.onClickForStartTest.bind(this)}
                                                        className='refier_custom_button_save'> Start Test
                                                </Button>
                                                </div>
                                                :
                                                null
                                    }
                                </div>
                            </Col>
                            <Col xsOffset={1} xs={10} style={{ textAlign: "left", marginTop: "40px" }}>
                                {
                                    analysisList ? analysisList.length > 0 ?
                                        <Col xs={12}
                                            style={{ padding: "20px 20px" }}>
                                            <div className="custom-test-analysis-title">
                                                Analysis of your previous attempts
                                    </div>
                                        </Col> :
                                        null
                                        :
                                        null
                                }
                                {analysisDiv}
                                {/* <div style={{ marginTop: "10px" }}>
                                    {analysisList}
                                </div> */}
                            </Col>
                        </Row>
                        :
                        <Col xs={12} style={{ textAlign: "center" }}>
                            {/* {console.log("Is not entitled as well as isTestExists")} */}
                            <div className={this.props.testDetail ? "custom-tag-desc" : ""}>
                                {body}
                            </div>
                        </Col>
                    :
                    <Col xs={12} style={{ textAlign: "center" }}>
                        <Preloader loaderMessage="Enrolling..." />
                    </Col>
                }
            </Grid>
        )
    }
}