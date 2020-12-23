import React, { Component } from 'react'
import TestListForTopic from '../../../topicpage/presentationalcomponents/TestListForTopic'
import ContentPageController from '../../../recordedContents/conditionalcomponents/ContentPageController'
import { formatdateFunction } from '../../../HelperFunctions/formatDateFunction'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import SubscribedSessions from './SubscribedSessions'
import DocumentController from '../../../documents/conditionalcomponents/DocumentController';
 
export default class Subscription extends Component {
 
    constructor(props) {
        super(props)
        this.state = {
            showTest: false,
            showContent: true,
            showSession: false,
            showDocuments: false,
            
        }
 
        this.clickContentTab = this.clickContentTab.bind(this)
        this.clickTestTab = this.clickTestTab.bind(this)
        this.clickSessionTab = this.clickSessionTab.bind(this)
        this.clickDocumentsTab = this.clickDocumentsTab.bind(this)
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
        // console.log("Subscription::props", this.props)
        let content = []
        let test = []
        let documents = []
        let packageDef = []
        let sessions = []
        let futureSessions = []
        let packageId
        if (this.props.communitySubscription) {
            let packageServices = JSON.parse(this.props.communitySubscription.fields.package_services)
            test = JSON.parse(this.props.communitySubscription.fields.tests_list)
            content = JSON.parse(this.props.communitySubscription.fields.content_list)
            documents = JSON.parse(this.props.communitySubscription.fields.document_list)
            packageDef = JSON.parse(this.props.communitySubscription.fields.package_definition)
            sessions = this.props.communitySubscription.fields.sessions?
                JSON.parse(this.props.communitySubscription.fields.sessions) : []
            
            futureSessions = this.props.communitySubscription.fields.future_session_list?
                JSON.parse(this.props.communitySubscription.fields.future_session_list):[]
            packageId = this.props.communitySubscription.pk
            // console.log("Subscription::test", test)
            // console.log("Subscription::content", content)
        }
 
        let invoiceBody
        if (this.props.communityOwnershipStateValue) {
            if (this.props.requestedForInvoice) {
                if (this.props.requestedForInvoice.indexOf(packageId) != -1) {
                    invoiceBody =
                        <span className="refier_custom_link" 
                        style={{ marginTop: "10px", textTransform:"none" }}>
                        Your request for invoice have been submitted
                        </span>
                }
            }
            else if (this.props.requestingForInvoice) {
                if (this.props.requestingForInvoice.indexOf(packageId) != -1) {
                    invoiceBody = <span className="refier_custom_link" 
                    style={{ marginTop: "10px", textTransform:"none" }}>
                        Requesting...
                </span>
                }
            }
            else {
                invoiceBody = <Button className="refier_custom_link" 
                style={{ marginTop: "10px", textTransform:"none" }}
                onClick={this.props.makeRequestForInvoice.bind(this,packageId)}>
                    Request for Invoice
            </Button>
            }
        }
 
        return (
            <Col xs={12} md={12}>
                {this.props.communitySubscription ?
                    <Grid fluid style={{ marginTop:"10px"}}>
                        <Row className="refier_custom_panel_light_gray">
                            <Col xsOffset={0} xs={12} >
                                <div style={{ padding: "10px 10px" }}>
                                    <div style={{ fontWeight: "600" }}>
                                        {packageDef[0].fields.package_name}
                                    </div>
                                    <div className="custom-list-sub-content" 
                                        style={{ marginTop: "10px", textTransform:"none" }}>
                                        {packageDef[0].fields.package_description}
                                    </div>
                                    <div className="custom-list-sub-content" 
                                    style={{ marginTop: "10px", textTransform:"none" }}>
                                        {"Expiring in " + this.props.communitySubscription.fields.days_left + " days"}
                                    </div>
                                    <div>
                                        {invoiceBody}
                                    </div>
                                </div>
                            </Col>
                            <Col xsOffset={0} xs={12} >
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
                            <Row className="refier-card-style">
                                {this.state.showContent ?
                                    <ContentPageController fromOtherPage={true}
                                        contentListFromOtherPage={content}
                                        profileId={this.props.userId} 
                                        fromCommunityProfile={this.props.fromCommunityProfile}/>
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
                    </Grid>
                        :
                        null
                    }
            </Col>
        )
                }
}