import React, { Component } from 'react'
import "redux";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import TestListForTopic from '../../topicpage/presentationalcomponents/TestListForTopic'
import ContentOwnerController from '../../recordedContents/conditionalcomponents/ContentOwnerController'
import SubscribedSessions from '../../communitypage/presentationalcomponents/Subscriptions/SubscribedSessions'
import DocumentController from '../../documents/conditionalcomponents/DocumentController';
import { getPackageSubscriptionReport } from '../../reporting/conditionalcomponents/action'
import CourseActivityReport from '../../reporting/presentationalcomponents/CourseActivityReport'

import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
 

class MyLearningModule extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            showTest: false,
            showContent: true,
            showSession: false,
            showDocuments: false,
            isExpanded : false,
            isProgressExpanded: false
        }
 
        this.clickContentTab = this.clickContentTab.bind(this)
        this.clickTestTab = this.clickTestTab.bind(this)
        this.clickSessionTab = this.clickSessionTab.bind(this)
        this.clickDocumentsTab = this.clickDocumentsTab.bind(this)

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
 
    clickTestTab() {
        this.setState({ showTest: true, showContent: false, showSession:false,showDocuments:false })
    }
 
    clickContentTab() {
        this.setState({ showTest: false, showContent: true, showSession: false,showDocuments:false })
    }
 
    clickSessionTab() {
        this.setState({ showTest:false, showContent:false, showSession:true,showDocuments:false})
    }
 
    clickDocumentsTab() {
        this.setState({showTest:false,showContent:false,showSession:false,showDocuments:true})
    }
 
    render() {
        // console.log("MyLearningModule::props", this.props)

        let content = []
        let test = []
        let documents = []
        let packageDef = []
        let sessions = []
        let futureSessions = []
        let packageValidities = []
        let packageId
        let packageMappings = []
        let self = this
        let isCourse = false

        if (this.props.communityPackage) {
            packageValidities = JSON.parse(this.props.communityPackage.fields.package_validity)
            packageMappings = this.props.communityPackage.fields.package_entity_mapping
            test = JSON.parse(this.props.communityPackage.fields.tests_list)
            content = JSON.parse(this.props.communityPackage.fields.content_list)
            documents = JSON.parse(this.props.communityPackage.fields.document_list)
            // packageDef = JSON.parse(this.props.communityPackage.fields.package_definition)
            sessions = this.props.communityPackage.fields.session_list ?
                JSON.parse(this.props.communityPackage.fields.session_list) : []
            futureSessions = this.props.communityPackage.fields.future_session_list ?
                JSON.parse(this.props.communityPackage.fields.future_session_list) : []
            packageId = this.props.communityPackage.pk
            isCourse = this.props.communityPackage.fields.is_course
            // console.log("MyLearningModule::test", test)
            // console.log("MyLearningModule::content", content)
        }

        let assigned = []
        let assigned_package = []
        let assigned_iscurrent = []
        let assigned_date = []
        let assigned_user_entity = {}
        
        let assigned_monitoring_permissions = []
        let assigned_admin_permissions = []
        let purchased = []
        let purchased_iscurrent = []
        let purchased_date = []

        for (let i = 0; i < packageMappings.length; i++) {
            if (packageMappings[i].is_assigned) {
                assigned.push(packageMappings[i].entity_name)
                assigned_package.push(packageMappings[i].pk)
                if (packageMappings[i].fields.user) {
                    if (packageMappings[i].fields.packageValidity in assigned_user_entity) {
                        assigned_user_entity[packageMappings[i].fields.packageValidity].push
                        (packageMappings[i].fields.user)
                    }
                    else {
                        assigned_user_entity[packageMappings[i].fields.packageValidity] = []
                        assigned_user_entity[packageMappings[i].fields.packageValidity].push
                        (packageMappings[i].fields.user)
                    }
                    
                }
                if (packageMappings[i].fields.entity) {
                    if (packageMappings[i].fields.packageValidity in assigned_user_entity) {
                        assigned_user_entity[packageMappings[i].fields.packageValidity].push
                        (packageMappings[i].fields.entity)
                    }
                    else {
                        assigned_user_entity[packageMappings[i].fields.packageValidity] = []
                        assigned_user_entity[packageMappings[i].fields.packageValidity].push
                        (packageMappings[i].fields.entity)
                    }
                }
                assigned_iscurrent.push(packageMappings[i].fields.is_current)
                assigned_date.push(packageMappings[i].fields.package_start_date)
                let permissions = packageMappings[i].management_permissions
                let monitoring_permissions = []
                let admin_permissions = []

                for (let i = 0; i < permissions.length; i++) {
                    if (permissions[i].fields.is_admin) {
                        admin_permissions.push(
                            permissions[i].fields.user
                        )
                    } else {
                        monitoring_permissions.push(
                            permissions[i].fields.user
                        )
                    }
                }
                assigned_monitoring_permissions.push(monitoring_permissions)
                assigned_admin_permissions.push(admin_permissions)
            }
            if(packageMappings[i].is_purchased) {
                purchased.push(packageMappings[i].entity_name)
                purchased_iscurrent.push(packageMappings[i].fields.is_current)
                purchased_date.push(packageMappings[i].fields.package_start_date)
            }
        }
        // console.log("MyLearningModule : assigned_user_entity : ",assigned_user_entity)
 
        let selfValidity = []
        let othersValidity = []

        for (let i = 0; i < packageValidities.length; i++) {
            if (packageValidities[i].fields.for_self) {
                let cost = packageValidities[i].fields.cost_of_package_in_credits
                let validity = packageValidities[i].fields.validity
                let validityId = packageValidities[i].pk
                let assigned_members = []
                if (validityId in assigned_user_entity) {
                    assigned_members = assigned_user_entity[validityId]
                }
                // console.log("MyLearningModule : assigned_members :validityId ",assigned_members,validityId)
                if (cost == 0) {
                    selfValidity.push (
                        <div className="custom-list-sub-content" >
                            <div style={{ marginTop: "5px", textTransform: "none" }}>
                                Free for {validity} days</div>
                                <Button className="refier_custom_button_save"
                                    style={{ marginTop: "5px", marginBottom:"10px" }}
                                    onClick={() => {
                                        // console.log("MyLearningModule : On click : assigned_members :validityId "
                                            // , assigned_members, validityId)
                                        self.props.openAssignModal
                                            (packageValidities[i].pk,
                                                assigned_members)
                                
                                    }}
                                >Assign ({assigned_members.length})</Button>
                        </div>)
                } else {
                    selfValidity.push (
                        <div className="custom-list-sub-content"> 
                           <div style={{ marginTop: "5px", textTransform: "none" }}>
                                {cost} Credits for {validity} days</div>
                                <Button className="refier_custom_button_save"
                                    style={{ marginTop: "5px", marginBottom:"10px" }}
                                    onClick={() => {
                                        // console.log("MyLearningModule : On click : assigned_members :validityId "
                                            // , assigned_members, validityId)
                                        self.props.openAssignModal
                                            (packageValidities[i].pk,
                                                assigned_members)
                                    
                                }}
                                >Assign ({assigned_members.length})</Button>
                        </div>)
                }
            }
            if (packageValidities[i].fields.for_others) {
                let cost = packageValidities[i].fields.cost_of_package_in_credits
                let validity = packageValidities[i].fields.validity
                if (cost == 0) {
                    othersValidity.push (
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "5px", textTransform: "none" }}>
                            Free for {validity} days</div>)
                } else {
                    othersValidity.push (
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "5px", textTransform: "none" }}>
                            {cost} Credits for {validity} days</div>)
                }
            }
        }

        
        let assignedBody, purchasedBody
        let assignedText = []
        let previousAssignedText = []
        let purchasedText = []
        let previousPurchasedText = []
        
        if (assigned.length > 0) {
            for (let i = 0; i < assigned.length; i++){
                if (assigned_iscurrent[i]) {
                    assignedText.push(
                        <div style={{marginTop:"10px"}} className="custom-list-sub-content">
                            <div 
                        style={{ textTransform: "none" }}><span>{assigned[i]}</span>
                        </div>
                            <div className="custom-list-sub-content"  style={{ textTransform: "none" }}>
                                {formatdatefunction(assigned_date[i], "long")}
                            </div>
                            <Button className="refier_custom_button_save"
                                style={{ marginTop: "5px", marginBottom:"10px" }}
                            onClick={() => {
                                self.props.dispatch(getPackageSubscriptionReport(assigned_package[i],
                                    this.props.communityId))
                                self.showProgressExpanded()
                            }}>Track Progress</Button>
                            <Button className="refier_custom_button_save"
                                style={{ marginTop: "5px", marginBottom:"10px" }}
                                onClick={() => {
                                    self.props.openMonitoringModal(assigned_package[i],
                                        assigned_monitoring_permissions[i])
                                }}
                            >Set Monitoring Permissions ({assigned_monitoring_permissions[i].length})</Button>
                            <Button className="refier_custom_button_save"
                                style={{ marginTop: "5px", marginBottom:"10px" }}
                                onClick={() => {
                                    self.props.openAdminModal(assigned_package[i],
                                        assigned_admin_permissions[i])
                                }}
                            >Set Experts ({assigned_admin_permissions[i].length})</Button>
                            {this.props.courseActivityReport ?
                                this.props.courseActivityReport.length>0?
                                this.props.courseActivityReport[0].pk == assigned_package[i]?
                                this.state.isProgressExpanded ?
                                <span
                                    className="custom-list-status"
                                    >Scroll down for Activity Report!</span> : null: null: null:null}
                            </div>)
                } else {
                    previousAssignedText.push(<div style={{ marginTop: "10px" }}
                        className="custom-list-sub-content">
                            <div 
                        style={{ textTransform: "none" }}><span>{assigned[i]}</span></div>
                            <div className="custom-list-sub-content"  style={{ textTransform: "none" }}>
                                {formatdatefunction(assigned_date[i], "long")}
                        </div>
                        
                        <Button className="refier_custom_button_save"
                            style={{ marginTop: "5px", marginBottom:"10px" }}
                            onClick={() => {
                                self.props.dispatch(getPackageSubscriptionReport(assigned_package[i],
                                    this.props.communityId))
                                self.showProgressExpanded()
                            }}
                        >Track Progress</Button>
                            </div>)
                }
            }
            assignedBody =
                <div>
                {assignedText.length>0?
                    <div><div className="custom-list-content"
                        style={{ textTransform: "none" }}>
                        Currently Assigned to </div>
                        {assignedText}
                    </div>
                    :
                    null
                }
                {previousAssignedText.length>0?
                    <div style={{ marginTop: "20px" }}><div className="custom-list-content"
                        style={{ textTransform: "none" }}>
                        Previously Assigned to </div>
                        {previousAssignedText}
                    </div>
                    :
                    null
                }

                </div>
        }

        if (purchased.length > 0) {
            for (let i = 0; i < purchased.length; i++) {
                if (purchased_iscurrent[i]) {
                    purchasedText.push(
                        <div style={{ marginTop: "10px" }} >
                            <div className="custom-list-sub-content"
                                style={{ textTransform: "none" }}><span>
                                    {purchased[i]}</span>
                            <span
                            style={{ marginLeft: "20px" }} className="custom-list-sub-content">
                                {formatdatefunction(purchased_date[i], "long")}
                            </span></div>
                        </div>)
                }
                else {
                    previousPurchasedText.push(
                        <div style={{ marginTop: "10px" }}>
                            <div className="custom-list-sub-content"
                                style={{ textTransform: "none" }}><span>
                                    {purchased[i]}</span>
                                    <span
                            style={{ marginLeft: "20px" }} className="custom-list-sub-content">
                                {formatdatefunction(purchased_date[i], "long")}
                                </span>
                                </div>
                        </div>)
                }
            }
            purchasedBody = <div>
                {purchasedText.length>0?
                    <div className="custom-item-border"><div className="custom-list-content"
                        style={{ textTransform: "none" }}>
                        Currently Subscribed by </div>
                        {purchasedText}
                    </div>
                    :
                    null
                }
                {previousPurchasedText.length>0?
                    <div style={{ marginTop: "20px" }}><div className="custom-list-content"
                        style={{ textTransform: "none" }}>
                        Previously Subscribed by </div>
                        {previousPurchasedText}
                    </div>
                    :
                    null
                }
                    </div>
        }

        let expandedBody = <Col xs={12} md={12}>
           <Grid fluid style={{ marginTop:"10px"}}>
               <Row className="refier_custom_panel_light_gray">
                   <Col xs={10} >
                        <div style={{ padding: "10px 10px" }}>
                        <div className="custom-list-content" style={{fontWeight:"600", marginBottom:"15px"}}>
                            {isCourse?"Course":"Content Resource"}
                        </div>
                           <div className="custom-list-title-content" >
                               {this.props.communityPackage.fields.package_name}
                           </div>
                           <div className="custom-list-sub-content" 
                               style={{ marginTop: "10px", textTransform:"none" }}>
                               {this.props.communityPackage.fields.package_description}
                           </div>
                        </div>
                        <div className="custom-item-border">
                            <Grid fluid>
                            <Col xs={12} md={6}>
                       <div style={{ padding: "10px 10px" }}>
                           {selfValidity.length > 0 ?
                                <div className="custom-list-content" style={{textTransform:"none"}}>
                                   For self learners
                           </div>
                               :
                               null}
                           {selfValidity}
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                       <div style={{ padding: "10px 10px" }}>
                           {othersValidity.length > 0 ?
                               <div className="custom-list-content" style={{textTransform:"none"}}>
                                   For other learners
                           </div>
                               :
                               null}
                           {othersValidity}
                                </div>
                                </Col>
                            </Grid>
                        </div>
                        <div>
                            <Grid fluid style={{marginTop:"15px"}}>
                        <Col xs={12} md={6}>
                        {assignedBody ?
                            <div style={{ padding: "10px 10px" }}>
                                {assignedBody}
                            </div>
                                    : null}
                            </Col>
                            <Col xs={12} md={6}>
                        {purchasedBody ?
                            <div style={{ padding: "10px 10px" }}>
                                {purchasedBody}
                                    </div> : null}
                                </Col>
                        </Grid>
                        </div>
                    </Col>
                    <Col xs={2} style={{textAlign:"right"}}>
                    <div>
                            <span className="refier_custom_link"
                                onClick={this.showCollapsed} style={{textTransform:"None"}}
                                >Show Less</span>
                        </div>
                    </Col>
                    <Col xsOffset={0} xs={12} style={{marginTop:"20px"}}>
                        <Col xs={3} className={this.state.showContent ?
                           "custom-tab-icon-active-light" : "custom-tab-icon-light"}
                           onClick={this.clickContentTab}>
                           <div>
                               <FontAwesome
                                    name="play-circle"
                                   
                               />
                           </div>
                           <div style={{ fontSize: "0.65em" }}>
                               {"Expert Videos"}
                           </div>
                        </Col>
                        <Col xs={3} className={this.state.showTest ?
                           "custom-tab-icon-active-light" : "custom-tab-icon-light"}
                           onClick={this.clickTestTab}>
                           <div>
                               <FontAwesome
                                   name="line-chart"
                                   
                               />
                           </div>
                           <div style={{ fontSize: "0.65em" }}>
                               {"Tests"}
                           </div>
                        </Col>
                        <Col xs={3} className={this.state.showSession ?
                           "custom-tab-icon-active-light" : "custom-tab-icon-light"}
                           onClick={this.clickSessionTab}>
                           <div>
                               <FontAwesome
                                   name="trophy"
                                   
                               />
                           </div>
                           <div style={{ fontSize: "0.65em" }}>
                               {"Expert Sessions"}
                           </div>
                        </Col>
                        <Col xs={3} className={this.state.showDocuments ?
                           "custom-tab-icon-active-light" : "custom-tab-icon-light"}
                           onClick={this.clickDocumentsTab}>
                           <div>
                               <FontAwesome
                                   name="file"
                                   
                               />
                           </div>
                           <div style={{ fontSize: "0.65em" }}>
                               {"Documents"}
                           </div>
                        </Col>
                    </Col>
                </Row>
                <Row className="refier-card-style" style={{minHeight:"30vh"}}>
                   {this.state.showContent ?
                       <ContentOwnerController
                           contentList={content}/>
                           :
                           this.state.showTest ?
                               <TestListForTopic testListOfTopic={test}
                                   profileId={this.props.userId} 
                                   fromCommunityProfile={this.props.fromCommunityProfile}/>
                               :
                               this.state.showSession?
                               <SubscribedSessions
                                   isOwner={true}
                                   events={sessions}
                                   futureSessions={futureSessions}
                                   profileId={this.props.userId}
                                   fromCommunityProfile={this.props.fromCommunityProfile}/>
                               // null
                                   :
                               this.state.showDocuments ?
                               <DocumentController fromOtherPage={true}
                                   contentListFromOtherPage={documents}
                                       profileId={this.props.userId}
                                       fromCommunityProfile={this.props.fromCommunityProfile}/>
                               :
                                   null
                                   
                       }
                    
                </Row>
                <Row className="refier-card-style">
                {
                    this.state.isProgressExpanded ?
                        <div>
                            <div
                                className="custom-list-title-content"
                                style={{
                                    textAlign: "center",
                                    marginTop: "30px", 
                                }}>
                                Activity Report
                            </div>
                            <CourseActivityReport
                                courseActivityReport={this.props.courseActivityReport} />
                        </div>
                        :
                        null
                    }
                </Row>
           </Grid>
        </Col>
        
        let collapsedBody = <Col xs={12} md={6} lg={4}>
        <Grid fluid style={{ marginTop:"10px"}}>
            <Row className="refier_custom_panel_light_gray">
                <Col xsOffset={0} xs={12} >
                        <div style={{ padding: "10px 10px" }}>
                        <div className="custom-list-content" style={{fontWeight:"600", marginBottom:"15px"}}>
                            {isCourse?"Course":"Content Resource"}
                        </div>
                        <div className="custom-list-title-content">
                            {this.props.communityPackage.fields.package_name}
                        </div>
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "10px", textTransform:"none" }}>
                            {this.props.communityPackage.fields.package_description}
                        </div>
                        </div>
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "10px", marginLeft:"10px",textTransform:"none" }}>
                            Videos - {content.length}
                        </div>
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "5px", marginLeft:"10px", textTransform:"none" }}>
                            Quizzes - {test.length}
                        </div>

                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "5px", marginLeft:"10px", textTransform:"none" }}>
                            Sessions - {sessions.length + futureSessions.length}
                        </div>
                        <div className="custom-item-border custom-list-sub-content" 
                            style={{ marginTop: "5px", marginLeft:"10px", textTransform:"none" }}>
                            Documents - {documents.length}
                        </div>

                        {assigned.length>0?
                            <div className="custom-list-sub-content"
                                style={{ marginTop: "15px", marginLeft: "10px", textTransform: "none" }}>
                                Assigned to -  {assigned.length} Sub-Communities
                        </div>
                            :
                            null
                        }
                        {purchased.length > 0 ?
                            <div className="custom-list-sub-content"
                                style={{ marginTop: "5px", marginLeft: "10px", textTransform: "none" }}>
                                Subscribed by -  {purchased.length} Communities
                        </div>
                            :
                            null
                        }
                        <div style={{ padding: "10px 10px" }}>
                            <span className="refier_custom_link"
                            onClick={this.showExpanded}  style={{textTransform:"None"}}
                                >Show More</span>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </Col>
 
        if(this.props.communityPackage) {
            return ( this.state.isExpanded ?
                        expandedBody :
                        collapsedBody
                    )
        }
    }
}

var mapStateToProps =  (store, ownProps) => {
    return {
        courseActivityReport: store.communityPageDataReducer.courseAcitivityReports
    };
  };
  
  export default connect(mapStateToProps)(MyLearningModule);