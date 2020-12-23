import React, { Component } from 'react';
//import CommunityImg from '../../images/mentor_dashboard_page/community_placeholder-3_u237.png';
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import { Row, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import { URL_TEXT, MEDIA_URL_TEXT, REFIER_OPEN_COMMUNITY, REFIER_OPEN_COMMUNITY_NICKNAME } from '../../GlobalConstants'
import { Link } from 'react-router-dom'
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import TagController from '../../shared/Tags/conditionalcomponents/TagController'
import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";


export default class EventCardForList extends Component {

    createEventUrl(event_url, eventid, userId) {
        let uri = "/userDashboard/" + event_url + "/" + eventid + "/" + userId;
        return uri;
    }

    render() {
        //console.log("EventCardForList : props", this.props)

        let name = this.props.eventDetail.mentor_id.last_name &&
            this.props.eventDetail.mentor_id.last_name != "Null" &&
            this.props.eventDetail.mentor_id.last_name != "None" ?
            this.props.eventDetail.mentor_id.first_name + " " +
            this.props.eventDetail.mentor_id.last_name :
            this.props.eventDetail.mentor_id.first_name
        
        if(this.props.userProfileFields &&
            this.props.userProfileFields.pk == this.props.profileId
            && this.props.eventDetail.mentor_id.id == this.props.profileId) {
            name = "You"
        }
        
        let photo = this.props.eventDetail.mentor_id.profile_photo


        let topic = this.props.eventDetail.topic

        let mapping, event_receiver
        if (this.props.eventDetail.mapping) {
            mapping = JSON.parse(this.props.eventDetail.mapping)
            if (mapping.length > 0) {
                for (let i = 0; i < mapping.length; i++) {
                    if (mapping[i].length > 0) {
                        if (mapping[i][0].fields.school_community_id) {
                            let event_receivers = JSON.parse(mapping[i][0].fields.school_community_id)
                            let community = event_receivers[0].fields.entity_name == REFIER_OPEN_COMMUNITY ?
                                REFIER_OPEN_COMMUNITY_NICKNAME:event_receivers[0].fields.entity_name
                            event_receiver = (event_receiver ? event_receiver + " , " : "") +
                                community
                        }
                        if (mapping[i][0].fields.user_id) {
                            let event_receivers = JSON.parse(mapping[i][0].fields.user_id)
                            event_receiver = (event_receiver ? event_receiver + " , " : "") +
                                event_receivers[0].fields.first_name + (event_receivers[0].fields.last_name ? event_receivers[0].fields.last_name != "None" ? event_receivers[0].fields.last_name : "" : "")
                        }
                    }
                }
            }
        }

        let imgChar = topic ? topic.charAt(0) : name.charAt(0)

        let date = formatdatefunction(this.props.eventDetail.start_date_time, "long")
        let time = formatdatefunction(this.props.eventDetail.start_date_time, "time")
        let tagValues = this.props.eventDetail.tag_values
        // tagValues = JSON.parse(tagValues)
        // let tags = []
        // for (let i = 0; i < tagValues.length; i++) {
        //     let index = this.props.index ? this.props.index + i : i
        //     index = index % 4
        //     tags.push(
        //         <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
        //             className={"custom-list-tag-" + index}>
        //             {tagValues[i].fields.tag_name}</span>)
        // }

        let colorIndex = (this.props.index + tagValues.length) % 4

        return (
            <Row style={{ padding: "10px 10px", textAlign: "left" }} className="custom-item-border"
            >
                <Col xs={3} style={{ textAlign: "right" }}>
                    <p className={"custom-list-char-image-" + colorIndex}>
                        {imgChar}
                    </p>
                </Col>
                <Col xs={9} style={{ textAlign: "left" }}>
                        <Link style={{marginLeft:"10px"}}
                            to={"/userDashboard/webinarinfo/" + this.props.session_id}
                            style={{
                                "wordWrap": "normal"
                        }}
                        className="custom-link">
                        {this.props.eventDetail.topic}</Link>
                        <div
                        className="custom-list-sub-content-highlighted"
                        style={{marginTop:"5px", marginBottom:"5px"}}>
                        <span>
                        <img src={
                            photo || 
                            photo !== ""? 
                                MEDIA_URL_TEXT +
								photo:imageSrc}
                                className="custom-card-img-small" />
                        </span>
                        <span style={{marginLeft:"10px"}}>
                            {name}
                        </span>
                    </div>
                    <div
                        className="custom-list-sub-content">
                        {date} {time}</div>
                    <div
                        className="custom-list-sub-content" style={{paddingTop:"5px"}}>
                        {event_receiver}</div>
                    <div
                        className="custom-list-sub-content" style={{paddingTop:"5px"}}>
                        {this.props.eventDetail.description}</div>

                    {this.props.userProfileFields ?
                        this.props.userProfileFields.pk == this.props.profileId
                            && this.props.eventDetail.mentor_id.id == this.props.profileId ?
                            <div className="custom-list-sub-content" style={{paddingTop:"5px"}}>
                                <Link to={this.createEventUrl
                                    (this.props.eventDetail.event_url,
                                    this.props.isMySessions ? this.props.session_id :
                                        this.props.eventDetail.session_id,
                                    this.props.profileId)}
                                    className="custom-link">
                                    Start Session</Link></div>
                            :
                            this.props.applicationDetail ?
                                this.props.applicationDetail.application_status == "Accepted" ?
                                    <div className="custom-list-sub-content" style={{paddingTop:"5px"}}>
                                        <Link to={this.createEventUrl
                                            (this.props.eventDetail.event_url,
                                            this.props.isMySessions ? this.props.session_id :
                                                this.props.eventDetail.session_id,
                                            this.props.userProfileFields.pk)}
                                            className="custom-link">
                                            Join Session</Link></div>
                                    :
                                    null
                                :
                                null
                        :
                        null
                    }
                    <div>
                        {/* {tags} */}

                        <TagController tagValues={tagValues}
                            index={this.props.index}
                            userId={this.props.profileId} />
                    </div>
                </Col>
            </Row>
        );
    }
}