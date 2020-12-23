import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import EventCardForTopic from './EventCardForTopic';

import Preloader from '../../shared/Preloader/PreLoader'


export default class CalendarEventListForTopic extends Component {
    render() {
        // console.log("CalendarEventListForTopic", this.props)

        let eventList;
        if (this.props.sessionsOfTopic) {
            
            let applications = this.props.sessionsOfTopic["Apply For Sessions"]?
                    this.props.sessionsOfTopic["Apply For Sessions"]:[]
            let mySessions = this.props.sessionsOfTopic["My Sessions"]?
                    this.props.sessionsOfTopic["My Sessions"]:[]
            let otherEvents = this.props.sessionsOfTopic["Other Events"]?
                    this.props.sessionsOfTopic["Other Events"]:[]
            let pendingApplications = this.props.sessionsOfTopic["Pending Applications"]?
                    this.props.sessionsOfTopic["Pending Applications"]:[]
            let previousSessions = this.props.sessionsOfTopic["Previous Sessions"]?
                    this.props.sessionsOfTopic["Previous Sessions"]:[]
            let upcomingSessions = this.props.sessionsOfTopic["Upcoming Sessions"]?
                    this.props.sessionsOfTopic["Upcoming Sessions"]:[]

            eventList = []
            for (let i = 0; i < mySessions.length; i++) {
                eventList.push(
                    <Col xs={12} md={6} lg={4}
                        key={mySessions[i].pk}
                        style={{marginLeft: '15px'}}
                        className="generic-post-card">
                        <EventCardForTopic
                            index={i}
                            eventDetail={mySessions[i].fields}
                            applicationDetail={mySessions[i].fields.application}
                            session_id={mySessions[i].pk}
                            profileId={this.props.userProfileData?JSON.parse(this.props.userProfileData.profile)[0].pk:""}
                            isMySessions={true} />
                    </Col>
                )
            }
            for (let i = 0; i < applications.length; i++) {
                eventList.push(
                    <Col xs={12} md={6} lg={4} 
                        style={{marginLeft: '15px'}}
                        className="generic-post-card">
                        <EventCardForTopic
                            index={i}
                            eventDetail={applications[i].fields.session_id}
                            applicationDetail={applications[i].fields.application}
                            profileId={this.props.userProfileData?JSON.parse(this.props.userProfileData.profile)[0].pk:""}
                            isMySessions={false}
                            isApplications={true} />
                    </Col>
                )
            }
            for (let i = 0; i < otherEvents.length; i++) {
                eventList.push(
                    <Col xs={12} md={6} lg={4}
                        style={{marginLeft: '15px'}}
                        className="generic-post-card">
                        <EventCardForTopic
                            index={i}
                            eventDetail={otherEvents[i].fields.session_id}
                            applicationDetail={otherEvents[i].fields.application}
                            profileId={this.props.userProfileData?JSON.parse(this.props.userProfileData.profile)[0].pk:""}
                            isMySessions={false}
                            isOtherEvents={true} /></Col>
                )
            }
            for (let i = 0; i < pendingApplications.length; i++) {
                eventList.push(
                    <Col xs={12} md={6} lg={4}
                        style={{marginLeft: '15px'}}
                        className="generic-post-card">
                        <EventCardForTopic
                            index={i}
                            eventDetail={pendingApplications[i].fields.session_id}
                            applicationDetail={pendingApplications[i].fields.application}
                            profileId={this.props.userProfileData?JSON.parse(this.props.userProfileData.profile)[0].pk:""}
                            isMySessions={false}
                            isPending={true} /></Col>
                )
            }
            for (let i = 0; i < previousSessions.length; i++) {
                eventList.push(
                    <Col xs={12} md={6} lg={4}
                        style={{marginLeft: '15px'}}
                        className="generic-post-card">
                        <EventCardForTopic
                            index={i}
                            eventDetail={previousSessions[i].fields.session_id}
                            applicationDetail={previousSessions[i].fields.application}
                            profileId={this.props.userProfileData?JSON.parse(this.props.userProfileData.profile)[0].pk:""}
                            isMySessions={false}
                            isPrevious={true} /></Col>
                )
            }
            for (let i = 0; i < upcomingSessions.length; i++) {
                eventList.push(
                    <Col xs={12} md={6} lg={4}
                        style={{marginLeft: '15px'}}
                        className="generic-post-card">
                        <EventCardForTopic
                            index={i}
                            eventDetail={upcomingSessions[i].fields.session_id}
                            applicationDetail={upcomingSessions[i].fields.application}
                            profileId={this.props.profileId}
                            isMySessions={false}
                            isUpcoming={true} />
                    </Col>
                )
            }
        }

        return (
            <div>
                {!eventList ?
                    <div style={{ "textAlign": "center", marginTop: "30px" }}>
                        <Preloader />
                    </div>
                    :
                    eventList.length == 0 ?
                        <div style={{padding: '10px', width: '90%'}} 
                            className="custom-list-content generic-post-card">
                            No Sessions are avaiable yet
                        </div>
                        :
                        <div>
                            {eventList}
                        </div>}
            </div>
        )

    }
}
