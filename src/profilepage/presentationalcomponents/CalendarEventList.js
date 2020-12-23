import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import EventCardForList from './EventCardForList';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import Preloader from '../../shared/Preloader/PreLoader'

export default class CalendarEventList extends Component {
    render() {
        //console.log("Profile Info", this.props.userProfileFields)
        let eventList;
        if (this.props.eventDetails && this.props.mySessions) {
            eventList = []
            if (this.props.isReadOnly) {
                for (let i = 0; i < this.props.mySessions.length; i++) {
                    eventList.push(
                        <div>
                            <EventCardForList 
                                index={i}
                                eventDetail={this.props.mySessions[i].fields}
                                applicationDetail = {this.props.mySessions[i].fields.application}
                                profileId={this.props.profileId}
                                userProfileFields={this.props.userProfileFields}
                                session_id = {this.props.mySessions[i].pk}
                                isMySessions = {true}  /></div>
                    )
                }
            }
            else{
                for (let i = 0; i < this.props.mySessions.length; i++) {
                    eventList.push(
                        <div>
                            <EventCardForList 
                                index={i}
                                eventDetail={this.props.mySessions[i].fields}
                                applicationDetail = {this.props.mySessions[i].fields.application}
                                session_id = {this.props.mySessions[i].pk}
                                profileId={this.props.profileId}
                                userProfileFields={this.props.userProfileFields}
                                isMySessions = {true} /></div>
                    )
                }
                for (let i = 0; i < this.props.eventDetails.length; i++) {
                    eventList.push(
                        <div>
                            <EventCardForList 
                                index={i}
                                session_id = {this.props.eventDetails[i].fields.session_id.session_id}
                                eventDetail={this.props.eventDetails[i].fields.session_id}
                                applicationDetail = {this.props.eventDetails[i].fields.application}
                                profileId={this.props.profileId}
                                userProfileFields={this.props.userProfileFields}
                                isMySessions = {false} /></div>
                    )
                }

            }
        }

        return (
            <div>
                {this.props.isReadOnly ? 
                    null : 
                    <Row className="custom-tab-title-gray">My Calendar</Row>}
                {!eventList ?
                    <Preloader copies={5} placeholder="short_card" shimmer={true} /> :
                    eventList.length == 0 ?
                        <div className="custom-list-sub-content">No upcoming sessions</div>
                        :
                        <div>
                            {eventList}
                        </div>
                }
            </div>
        )

    }
}
