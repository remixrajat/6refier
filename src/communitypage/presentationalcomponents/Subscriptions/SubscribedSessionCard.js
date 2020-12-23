import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Grid } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import TagController from '../../../shared/Tags/conditionalcomponents/TagController'

import { URL_TEXT, MEDIA_URL_TEXT } from '../../../GlobalConstants'
import { formatdatefunction } from '../../../HelperFunctions/formatDateFunction'

import CommunityImg from '../../../images/mentor_dashboard_page/community_avatar.png';


export default class SubscribedSessionCard extends Component {

    render() {
        // console.log("SubscribedSessionCard : props", this.props)

        let name = this.props.eventDetail.mentor_first_name ?
            (this.props.eventDetail.mentor_first_name + " ") +
            (this.props.eventDetail.mentor_last_name &&
            this.props.eventDetail.mentor_last_name != "Null" &&
            this.props.eventDetail.mentor_last_name != "None" ?
                this.props.eventDetail.mentor_last_name : " ")
            :
            null

        let topic = this.props.eventDetail.topic

        let imgChar = topic ? topic.charAt(0) : name.charAt(0)

        let date = this.props.eventDetail.start_date_time ?
            formatdatefunction(this.props.eventDetail.start_date_time, "long"):null
        let time = this.props.eventDetail.start_date_time ?
            formatdatefunction(this.props.eventDetail.start_date_time, "time"):null

        // let tagValues = JSON.parse(this.props.tag_values)


        // let colorIndex = (this.props.index + tagValues.length) % 4

        return (
            <Col xs={12} sm={6} md={4} style={{ textAlign: "middle", margin:"10px", padding:"10px" }}
                className="custom-item-border">
                    <div
                        className="custom-list-content">
                        {topic}</div>
                    <div
                        className="custom-list-sub-content-highlighted">
                        {name}</div>
                    <div
                    className="custom-list-sub-content" style={{marginTop:"5px"}}>
                        {date} {time}</div>
                    <div>
                    {this.props.isFutureEvent ?
                        <div
                        className="custom-list-sub-content-highlighted">
                        Session will be scheduled
                        </div>
                        :
                        <div className="custom-list-sub-content">
                        <Link to="/userDashboard/user_service"
                            className="custom-link">
                            Go to Session</Link></div>
                    }
                    </div>


                    <div>{this.props.tag_values ?
                        <TagController tagValues={this.props.tag_values}
                            index={this.props.index}
                            userId={this.props.profileId}
                        />
                        :
                        null
                    }
                    </div>
                </Col>
        );
    }
}