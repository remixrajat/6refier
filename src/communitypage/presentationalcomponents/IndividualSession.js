import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Grid, Button } from 'react-bootstrap'

import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'

import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";


export default class IndividualSession extends Component {
    createEventUrl(event_url, eventid, userId) {
        let uri = "/userDashboard/" + event_url + "/" + eventid + "/" + userId;
        return uri;
    }

    render() {
        // console.log("IndividualSession : props", this.props)

        let name = this.props.eventDetail.mentor_id.last_name &&
            this.props.eventDetail.mentor_id.last_name != "Null" &&
            this.props.eventDetail.mentor_id.last_name != "None" ?
            this.props.eventDetail.mentor_id.first_name + " " +
            this.props.eventDetail.mentor_id.last_name :
            this.props.eventDetail.mentor_id.first_name
        
        let photo = this.props.eventDetail.mentor_id.profile_photo

        let topic = this.props.eventDetail.topic

        let imgChar = topic ? topic.charAt(0) : name.charAt(0)

        let statusOfApplication
        if (this.props.memberApplication.length > 0) {
            statusOfApplication = this.props.memberApplication[0].fields.application_status
        }

        let date = formatdatefunction(this.props.eventDetail.start_date_time, "long")
        let time = formatdatefunction(this.props.eventDetail.start_date_time, "time")

        return (
            <div className="generic-post-card refier_custom_panel_window"
                style={{ margin: "10px", padding: "10px" }}>
                <div className="custom-list-title-content custom-item-border"
                    style={{
                        color:"#049cdb",
                        fontWeight: 600, paddingTop: "10px",
                        paddingBottom: "10px"
                    }}>
                    <Link style={{marginLeft:"10px"}}
                            to={"/userDashboard/webinarinfo/" + this.props.eventDetail.session_id}
                            style={{
                                "wordWrap": "normal"
                        }}
                        className="custom-link">
                        {topic}</Link>
                </div>
                
                <div className="custom-list-sub-content"
                    style={{ margin: "5px 0", paddingTop:"10px", fontWeight:"600" }}>
                    <div><img src={
                            (photo && 
                            photo !== "")? 
                                MEDIA_URL_TEXT +
								photo:imageSrc}
                                className="custom-card-img-small" />
                    </div>
                    <div style={{marginTop:"5px"}}>
                        {name}
                    </div>
                    <div
                        className="custom-list-sub-content">
                        {date} {time}</div>
                    {
                        statusOfApplication ?
                            statusOfApplication == "Pending" ?
                            <div className="custom-list-sub-content">
                                    Pending</div> :
                                statusOfApplication == "Accepted" ?
                                <div className="custom-list-sub-content">
                                <Link to={this.createEventUrl
                                    (this.props.eventDetail.event_url,
                                    this.props.eventDetail.session_id,
                                    this.props.profileId)}
                                            // className="custom-link"
                                        >
                                            <Button className="refier_custom_button_save"
                                                style={{marginTop:"5px"}}>
                                    {this.props.profileId == this.props.eventDetail.mentor_id.id
                                        ? "Start Session" : "Join Session"}</Button></Link>
                                    </div>
                                    :
                                    null:
                        this.props.accepted_applications_count < this.props.count_of_participants ?
                            <div>
                            <div className="custom-list-sub-content">
                               {this.props.count_of_participants-this.props.accepted_applications_count} seats left</div>
                                <div className="custom-list-sub-content">
                                    <Link to={"/userDashboard/webinarinfo/" + this.props.eventDetail.session_id}>
                                        <Button className="refier_custom_button_save"
                                                // onClick={() => this.props.openApplyModal(this.props.pk)}
                                                style={{marginTop:"5px"}}>
                                            Apply for Session
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                                :
                                
                            <div className="custom-list-sub-content">
                                Seats Filled</div>

                    }
                </div>
            </div>
        );
    }
}