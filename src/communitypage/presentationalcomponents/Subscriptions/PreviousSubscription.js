import React, { Component } from 'react'
import TestListForTopic from '../../../topicpage/presentationalcomponents/TestListForTopic'
import ContentPageController from '../../../recordedContents/conditionalcomponents/ContentPageController'
import { formatdateFunction } from '../../../HelperFunctions/formatDateFunction'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import { formatdatefunction } from "../../../HelperFunctions/formatDateFunction"
import TagController from '../../../shared/Tags/conditionalcomponents/TagController'

export default class PreviousSubscription extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showTest: false,
            showContent: true,
            showSession: false
        }

        this.clickContentTab = this.clickContentTab.bind(this)
        this.clickTestTab = this.clickTestTab.bind(this)
        this.clickSessionTab = this.clickSessionTab.bind(this)
    }

    clickTestTab() {
        this.setState({ showTest: true, showContent: false, showSession: false })
    }

    clickContentTab() {
        this.setState({ showTest: false, showContent: true, showSession: false })
    }

    clickSessionTab() {
        this.setState({ showTest: false, showContent: false, showSession: true })
    }

    render() {
        // console.log("Subscription::props", this.props)
        let content = []
        let test = []
        let packageDef = []
        let sessions = []
        let body, expertContent, expertQuiz, packageId, expertSession
        if (this.props.communitySubscription) {
            let packageServices = JSON.parse(this.props.communitySubscription.fields.package_services)
            test = JSON.parse(this.props.communitySubscription.fields.tests_list)
            content = JSON.parse(this.props.communitySubscription.fields.content_list)
            packageDef = JSON.parse(this.props.communitySubscription.fields.package_definition)
            sessions = this.props.communitySubscription.fields.sessions ?
                JSON.parse(this.props.communitySubscription.fields.sessions) : []
            packageId = this.props.communitySubscription.pk
            expertContent = []
            expertQuiz = []
            expertSession = []
            if (content.length == 0) {
                expertContent.push(
                    <div style={{ margin: "10px 10px" }}>
                        <div className="custom-list-content" style={{ marginTop: "5px" }}>
                            No Expert Content in this Subscription</div>
                    </div>)
            }
            if (test.length == 0) {
                expertQuiz.push(
                    <div style={{ margin: "10px 10px" }}>
                        <div className="custom-list-content" style={{ marginTop: "5px" }}>
                            No Quiz in this Subscription</div>
                    </div>)
            }
            if (sessions.length == 0) {
                expertSession.push(
                    <div style={{ margin: "10px 10px" }}>
                        <div className="custom-list-content" style={{ marginTop: "5px" }}>
                            No Expert Sessions in this Subscription</div>
                    </div>)
            }
            for (let i = 0; i < content.length; i++) {
                let tagValues = content[i].fields.tag_values
                expertContent.push(
                    <div style={{ margin: "20px 20px" }}>
                        <div className="custom-list-content" style={{ marginTop: "5px" }}>
                            {content[i].fields.title}</div>
                        <div className="custom-list-sub-content" style={{ marginTop: "5px" }}>
                            {content[i].fields.author.first_name + " " +
                                content[i].fields.author.last_name}</div>
                        <TagController tagValues={tagValues}
                            index={i}
                            userId={this.props.userId}
                        />
                    </div>)
            }
            for (let i = 0; i < test.length; i++) {
                let tagValues = test[i].fields.tags
                expertQuiz.push(
                    <div style={{ margin: "20px 20px" }}>
                        <div className="custom-list-content" style={{ marginTop: "5px" }}>
                            {test[i].fields.test_name}</div>
                        <div className="custom-list-sub-content" style={{ marginTop: "5px" }}>
                            {test[i].fields.description}</div>
                        <TagController tagValues={tagValues}
                            index={i}
                            userId={this.props.userId}
                        />
                    </div>)
            }
            for (let i = 0; i < sessions.length; i++) {
                let tagValues = sessions[i][0].fields.tag_values
                let date = formatdatefunction(sessions[i][0].fields.session_id.start_date_time, "long")
                let time = formatdatefunction(sessions[i][0].fields.session_id.start_date_time, "time")
                expertSession.push(
                    <div style={{ margin: "20px 20px" }}>
                        <div className="custom-list-content" style={{ marginTop: "5px" }}>
                            {sessions[i][0].fields.session_id.mentor_id.first_name + " "} {
                                sessions[i][0].fields.session_id.mentor_id.last_name ?
                                    sessions[i][0].fields.session_id.mentor_id.last_name
                                    :
                                    ""}</div>
                        <div className="custom-list-sub-content" style={{ marginTop: "5px" }}>
                            {sessions[i][0].fields.session_id.topic}</div>
                        <div
                            className="custom-list-sub-content">
                            {date} {time}</div>
                        <TagController tagValues={tagValues}
                            index={i}
                            userId={this.props.userId}
                        />
                    </div>)
            }

        }
        return (
            <Col xs={12}>
                {this.props.communitySubscription ?
                    <Grid fluid style={{ marginTop: "10px" }}>
                        <Row className="refier_custom_panel_light_gray">
                            <Col xsOffset={0} xs={12} >
                                <div style={{ padding: "10px 10px" }}>
                                    <div style={{ fontWeight: "400" }}>
                                        {packageDef[0].fields.package_name}
                                    </div>
                                    <div className="custom-list-sub-content"
                                        style={{ marginTop: "10px", textTransform: "none" }}>
                                        {packageDef[0].fields.package_description}
                                    </div>
                                    <div className="custom-list-sub-content"
                                        style={{ marginTop: "10px", textTransform: "none" }}>
                                        {"Expired on " +
                                            formatdatefunction(
                                                this.props.communitySubscription.fields.package_end_date, "short")}
                                    </div>
                                    <div>
                                        {(this.props.requestedForInvoice &&
                                            this.props.requestedForInvoice.indexOf(packageId) != -1) ?
                                            <span className="refier_custom_link"
                                                style={{ marginTop: "10px", textTransform: "none" }}>
                                                Your request for invoice have been submitted
                                        </span>
                                            :
                                            (this.props.requestingForInvoice &&
                                                this.props.requestingForInvoice.indexOf(packageId) != -1) ?
                                                <span className="refier_custom_link"
                                                    style={{ marginTop: "10px", textTransform: "none" }}>
                                                    Requesting...
                                        </span>
                                                :
                                                <Button className="refier_custom_link"
                                                    style={{ marginTop: "10px", textTransform: "none" }}
                                                    onClick={()=>{this.props.makeRequestForInvoice( packageId)} }>
                                                    Request for Invoice
                                        </Button>
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col xsOffset={0} xs={12} >
                                <Col xs={4} className={this.state.showContent ?
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
                                <Col xs={4} className={this.state.showTest ?
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
                                <Col xs={4} className={this.state.showSession ?
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
                            </Col>
                        </Row>
                        <Row className="refier-card-style">
                            {this.state.showContent ?
                                expertContent
                                :
                                this.state.showTest ?
                                    expertQuiz
                                    :
                                    this.state.showSession?
                                        expertSession
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