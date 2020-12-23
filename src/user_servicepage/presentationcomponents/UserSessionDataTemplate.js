/*jshint esversion: 6 */
import React, { Component } from "react";
import { Grid, Col, Row, Tabs } from "react-bootstrap";
import PreLoader from "../../shared/Preloader/PreLoader"
import { Link } from 'react-router-dom'
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'

export default class UserSessionDataTemplate extends Component {
    createEventUrl(event_url, eventid, userId) {
        let uri = "/userDashboard/" + event_url + "/" + eventid + "/" + userId;
        return uri;
    }

    render() {
        let mySessions
        if (this.props.mySessionData) {
            if (this.props.mySessionData.length > 0) {
                mySessions = []
                for (let i = 0; i < this.props.mySessionData.length; i++) {
                    let name = this.props.mySessionData[i].fields.mentor_id.last_name &&
                        this.props.mySessionData[i].fields.mentor_id.last_name != "None" &&
                        this.props.mySessionData[i].fields.mentor_id.last_name != "Null" ?
                        this.props.mySessionData[i].fields.mentor_id.first_name + " " +
                        this.props.mySessionData[i].fields.mentor_id.last_name :
                        this.props.mySessionData[i].fields.mentor_id.first_name

                    let date = formatdatefunction(this.props.mySessionData[i].fields.start_date_time, "long")
                    let time = formatdatefunction(this.props.mySessionData[i].fields.start_date_time, "time")

                    let tagValues = this.props.mySessionData[i].fields.tag_values
                    tagValues = JSON.parse(tagValues)
                    let tags = []
                    for (let j = 0; j < tagValues.length; j++) {
                        let index = i + j
                        index = index % 4
                        tags.push(
                            <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                                className={"custom-list-tag-" + index}>
                                {tagValues[j].fields.tag_name}</span>)
                    }

                    mySessions.push(
                        // <Col xs={12} className="vertical-align-col-components"
                        // style={{ padding: "10px 10px", textAlign: "center" }}>
                        <div style={{ padding: "10px 10px" }}>
                            <div
                                className="custom-list-content" style={{ textAlign: "center" }}>
                                {this.props.mySessionData[i].fields.topic}</div>
                            {/* <div
                                className="custom-list-sub-content-highlighted" style={{ textAlign: "center" }}>
                                {name}</div> */}
                            <div
                                className="custom-list-sub-content" style={{ textAlign: "center" }}>
                                {date} {time}</div>
                            <div
                                className="custom-list-sub-content" style={{ textAlign: "center" }}>
                                {this.props.mySessionData[i].fields.description}</div>

                            {this.props.mySessionData[i].fields.status == "Scheduled" ?
                                <div className="custom-list-sub-content" style={{ textAlign: "center" }}>
                                    <Link to={this.createEventUrl
                                        (this.props.mySessionData[i].fields.event_url,
                                        this.props.mySessionData[i].pk,
                                        this.props.userId)}
                                        className="custom-link">
                                        Start Session</Link></div>
                                :
                                null
                            }
                            <div>
                                {tags}
                            </div>
                        </div>
                        // </Col>
                    )

                }
            }
            else {
                mySessions = <div style={{ padding: "10px 10px" }}
                    className="vertical-align-col-components custom-list-content"
                    style={{ textAlign: "center" }}>
                    No Sessions Present
        </div>
            }
        }
        else {
            mySessions = <div style={{ padding: "10px 10px" }}
                className="vertical-align-col-components custom-list-content"
                style={{ textAlign: "center" }}>
                <PreLoader />
            </div>
        }

        return (
            <div>
                <Col xs={12} style={{ textAlign: "center" }}>
                    {mySessions}
                </Col>
            </div>

        )

    }
}