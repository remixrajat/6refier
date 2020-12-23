import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import SubscribedSessionCard from './SubscribedSessionCard';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Preloader from '../../../shared/Preloader/PreLoader'


export default class SubscribedSessions extends Component {
    render() {
        // console.log("SubscribedSessions:Props", this.props)

        let key = "Apply For Sessions"
        let eventList, futureEventsList;
        if (this.props.events) {
            eventList = []
            
            for (let i = 0; i < this.props.events.length; i++) {
                // if (this.props.events[i][0].fields.session_id.mentor_id.id !=
                //     this.props.profileId) {
                eventList.push(<SubscribedSessionCard
                    isOwner={this.props.isOwner}
                    index={i}
                    eventDetail={this.props.events[i].fields}
                    tag_values={this.props.events[i].fields.tag_values} />
                )
                // }
            }
        }

        if (this.props.futureSessions) {
            futureEventsList = []
            for (let i = 0; i < this.props.futureSessions.length; i++){
                futureEventsList.push(
                    <SubscribedSessionCard
                        isOwner={this.props.isOwner}
                        index={i}
                        eventDetail={this.props.futureSessions[i].fields}
                        tag_values={this.props.futureSessions[i].fields.tag_values ?
                            this.props.futureSessions[i].fields.tag_values:null}
                        isFutureEvent={true}/>
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
                    eventList.length == 0 && futureEventsList.length==0?
                        <div className="custom-list-content">This Package does not contain any Sessions.</div>
                        :
                        <Grid fluid>
                            {eventList}
                            {futureEventsList}
                        </Grid>}
            </div>
        )

    }
}
