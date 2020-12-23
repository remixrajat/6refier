import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import { MEDIA_URL_TEXT } from '../../GlobalConstants'

import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";


export default class MyCalendarEventCardForList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightRow: false
        }
    }

    componentWillMount() {
        if (this.props.eventDetail && this.props.eventDetail.start_date_time) {
            const startTime = new Date(this.props.eventDetail.start_date_time).getTime();
            const timeNow = new Date(new Date().toDateString()).getTime() - (6 * 60 * 60 * 1000);
            const time24 = timeNow + (30 * 60 * 60 * 1000);
            if (timeNow <= startTime && startTime <= time24) {
                this.setState({ highlightRow: true });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.removeHighlight) {
            setTimeout(() => this.setState({ highlightRow: false }), 2000);
        }
    }

    createEventUrl(event_url, eventid, userId) {
        let uri = "/userDashboard/" + event_url + "/" + eventid + "/" + userId;
        return uri;
    }

    render() {
        // console.log("MyCalendarEventCardForList : props", this.props)

        let name = this.props.eventDetail.mentor_id.last_name &&
            this.props.eventDetail.mentor_id.last_name !== "Null" &&
            this.props.eventDetail.mentor_id.last_name !== "None" ?
            this.props.eventDetail.mentor_id.first_name + " " +
            this.props.eventDetail.mentor_id.last_name :
            this.props.eventDetail.mentor_id.first_name

        if (this.props.profileId === this.props.eventDetail.mentor_id.id) {
            name = "You"
        }

        let photo = this.props.eventDetail.mentor_id.profile_photo

        let topic = this.props.eventDetail.topic

        let imgChar = topic ? topic.charAt(0) : name.charAt(0)

        let date = formatdatefunction(this.props.eventDetail.start_date_time, "long")
        let time = formatdatefunction(this.props.eventDetail.start_date_time, "time")

        let tagValues = this.props.eventDetail.tag_values

        let colorIndex = (this.props.index + tagValues.length) % 4

        return (
            <Row
                style={
                    this.state.highlightRow ?
                        {
                            padding: "10px 10px",
                            textAlign: "left",
                            background: 'rgba(248, 146, 18, 0.12)'
                        } :
                        {
                            padding: "10px 10px",
                            textAlign: "left"
                        }
                }
                className="custom-item-border">
                <Col xs={3} style={{ textAlign: "right" }}>
                    <p className={"custom-list-char-image-" + colorIndex}>
                        {imgChar}
                    </p>
                </Col>
                <Col xs={9} style={{ textAlign: "left" }}>
                    <Link style={{ wordWrap: "normal" }}
                        to={"/userDashboard/webinarinfo/" + this.props.session_id}
                        className="custom-link">
                        {this.props.eventDetail.topic}
                    </Link>
                    <div
                        className="custom-list-sub-content-highlighted"
                        style={{ marginTop: "5px", marginBottom: "5px" }}>
                        <span>
                            <img src={
                                photo ||
                                    photo !== "" ?
                                    MEDIA_URL_TEXT +
                                    photo : imageSrc}
                                alt="userprofilepic"
                                className="custom-card-img-small" />
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                            {name}
                        </span>
                    </div>
                    <div className="custom-list-sub-content"
                        style={{ margin: '7px auto' }}>
                        {this.props.fromMyCalendar ? <b style={{ color: '#555', letterSpacing: '0.015em' }}>{time}</b> : time}
                        &nbsp;on&nbsp;
                        {!this.props.fromMyCalendar ? <b style={{ color: '#555', letterSpacing: '0.015em' }}>{date}</b> : date}
                    </div>
                    {
                        this.props.isToday ?
                            <div className="custom-list-sub-content" style={{marginTop: '10px', marginBottom: '5px'}}>
                                {
                                    this.props.fromMyCalendar ?
                                        <ComplementaryButton
                                            redirect={true}
                                            redirectAddress={
                                                this.createEventUrl(
                                                    this.props.eventDetail.event_url, 
                                                    this.props.session_id, 
                                                    this.props.profileId)
                                            }
                                            buttonText={
                                                this.props.profileId === this.props.eventDetail.mentor_id.id ? 
                                                    "Start Session" : 
                                                    "Join Session"
                                            }
                                        /> :
                                        <Link to={this.createEventUrl(this.props.eventDetail.event_url, this.props.session_id, this.props.profileId)}
                                            className="custom-link">
                                            {this.props.profileId === this.props.eventDetail.mentor_id.id
                                                ? "Start Session" : "Join Session"}</Link>
                                }
                            </div> :
                            null
                    }
                </Col>
            </Row>
        );
    }
}