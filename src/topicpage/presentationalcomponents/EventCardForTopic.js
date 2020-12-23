import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'


export default class EventCardForTopic extends Component {
    createEventUrl(event_url, eventid, userId) {
        let uri = "/userDashboard/" + event_url + "/" + eventid + "/" + userId;
        return uri;
    }

    createApplyUrl() {
        let uri = "/userDashboard/user_service"
        return uri;
    }

    render() {
        // console.log("EventCardForTopic : props", this.props)

        let name = this.props.eventDetail.mentor_id.last_name &&
            this.props.eventDetail.mentor_id.last_name != "Null" &&
            this.props.eventDetail.mentor_id.last_name != "None" ?
            this.props.eventDetail.mentor_id.first_name + " " +
            this.props.eventDetail.mentor_id.last_name :
            this.props.eventDetail.mentor_id.first_name

        let topic = this.props.eventDetail.topic

        let imgChar = topic ? topic.charAt(0) : name.charAt(0)

        let date = formatdatefunction(this.props.eventDetail.start_date_time, "long")
        let time = formatdatefunction(this.props.eventDetail.start_date_time, "time")
        let tagValues = this.props.eventDetail.tag_values
        tagValues = JSON.parse(tagValues)
        let tags = []
        for (let i = 0; i < tagValues.length; i++) {
            let index = this.props.index ? this.props.index + i : i
            index = index % 4
            tags.push(
                <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                    className={"custom-list-tag-" + index}>
                    {tagValues[i].fields.tag_name}</span>)
        }

        let colorIndex = (this.props.index + tagValues.length) % 4

        let isLink = this.props.isMySessions || this.props.isUpcoming? true : false
        let isApply = this.props.isApplications?true:false
        let linkText
        let statusText
        let applyText = "Apply for Session"
        if(isLink){
            if(this.props.isMySessions){
                if(this.props.eventDetail.status == "Scheduled"){
                    linkText = "Start Session"
                }
            }
            else if(this.props.isUpcoming){
                if(this.props.eventDetail.mentor_id.id == this.props.profileId){
                    if(this.props.eventDetail.status == "Scheduled"){
                        linkText = "Start Session"
                    }
                }
                else{
                    if(this.props.eventDetail.status == "Scheduled"){
                        linkText = "Join Session"
                    }
                }
            }
        }
        else{
            if(this.props.isPending){
                statusText = "Application Pending"
            }
            else if(this.props.isPrevious){
                statusText = "Completed"
            }
            else if(this.props.isOtherEvents){
                statusText = ""
            }
        }

        return (
            <Row style={{ padding: "10px 10px", textAlign: "left" }}
            >
                <Col xs={3} style={{ textAlign: "right" }}>
                    <p className={"custom-list-char-image-" + colorIndex}>
                        {imgChar}
                    </p>
                </Col>
                <Col xs={9} style={{ textAlign: "left" }}>
                    <Link style={{marginLeft:"10px"}}
                            to={"/userDashboard/webinarinfo/" + this.props.eventDetail.session_id}
                            style={{
                                "wordWrap": "normal"
                        }}
                        className="custom-link">
                        {this.props.eventDetail.topic}</Link>
                    <div
                        className="custom-list-sub-content-highlighted">
                        {name}</div>
                    <div
                        className="custom-list-sub-content">
                        {date} {time}</div>
                    <div
                        className="custom-list-sub-content">
                        {this.props.eventDetail.description}</div>
                    {isLink?
                            <div className="custom-list-sub-content">
                                <Link to={this.createEventUrl
                                    (this.props.eventDetail.event_url,
                                    this.props.isMySessions ? this.props.session_id :
                                        this.props.eventDetail.session_id,
                                    this.props.profileId)}
                                    className="custom-link">
                                    {linkText}</Link></div>
                            :
                            isApply?
                                <div className="custom-list-sub-content">
                                    <Link to="/userDashboard/user_service"
                                        className="custom-link">
                                        {applyText}
                                    </Link>
                                </div>
                                : <div className="custom-list-status">{statusText}</div>
                            
                    }
                </Col>
            </Row>
        );
    }
}