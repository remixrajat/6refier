import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

import ParticipantsList from './ParticipantsList';


export default class AtendeesComponent extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.attendee_self) {
            if (nextProps.attendee_self !== this.props.attendee_self) {
                //console.log("attendee_self::1",nextProps.attendee_self)
                this.props.sendAddedUserToEventGroup(nextProps.attendee_self, this.props.eventid);
            } else if (this.props.attendee_self === undefined) {
                //console.log("attendee_self::2",nextProps.attendee_self)
                this.props.sendAddedUserToEventGroup(nextProps.attendee_self, this.props.eventid);
            }

        }
    }

    render() {
        let isSmallScreen = "yes" === this.props.isSmallScreen
        let attendeesList = [];
        
        if (this.props.attendeesList && this.props.attendeesList.length > 0) {
            attendeesList = attendeesList.concat(this.props.attendeesList)
        }

        if (this.props.attendeesList_extended && this.props.attendeesList_extended.length > 0) {
            attendeesList = attendeesList.concat(this.props.attendeesList_extended)
        }
        

        return (
            <Col xs={12} style={{
                maxHeight: isSmallScreen ? "20vh" : "",
                overflow: 'hidden', 
                background: "white",
                height: '60vh',
                padding: 0,
                overflowY: 'auto'
            }}>
                <ParticipantsList 
                    allPresenters={this.props.allPresenters} 
                    header={"PRESENTERS"} 
                    userType={"Presenters"} 
                    type={"presenter"} 
                    attendeesList={attendeesList} />
                <ParticipantsList 
                    allPresenters={this.props.allPresenters} 
                    header={"PARTICIPANTS"} 
                    userType={"Participants"} 
                    type={"viewer"} 
                    attendeesList={attendeesList} />
            </Col>
        )
    }
}
