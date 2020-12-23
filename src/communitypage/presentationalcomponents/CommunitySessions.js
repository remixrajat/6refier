import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import EventApplicationForm from '../../user_servicepage/presentationcomponents/EventApplicationForm'
import { insertUserApplication } from "../../user_servicepage/conditionalcomponents/action";

import { PrimaryWhiteButton } from '../../shared/RefierComponents/PrimaryWhiteButton'
import Preloader from '../../shared/Preloader/PreLoader'
import CommonModal from '../../shared/CommonModal'
import IndividualSession from './IndividualSession'


export default class CommunitySessions extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            showModal: false,
            appTextStatus : "Hi, I am interested for this event !",
            eventId : "",
            inProgress: -1,
        };

        this.openApplyModal = this.openApplyModal.bind(this)
        this.closeApplyModal = this.closeApplyModal.bind(this)
        this.changeApplicationText = this.changeApplicationText.bind(this)
        this.submitApplicationText = this.submitApplicationText.bind(this)
        this.setInProgress = this.setInProgress.bind(this)
        this.unsetInProgress = this.unsetInProgress.bind(this)
        this.completedProgress = this.completedProgress.bind(this)
    }

    openApplyModal(eventId) {
        this.setState({ 
            eventId,
            showModal: true
        })
    }

    closeApplyModal() {
        this.setState({ showModal: false })
    }

    changeApplicationText(e){
        this.setState({ appTextStatus : e.target.value })
    }

    submitApplicationText(){
        this.setInProgress()
        let applicationText = this.state.appTextStatus;
        // console.log("Sending Request",this.state.eventId,applicationText)
        let returnPromise = this.props.dispatch(insertUserApplication(this.state.eventId,applicationText))
        returnPromise.then((response) => {
            // let eventData = setEventDataStateUser(data);
            this.completedProgress()
            this.props.dispatch({ type: "setUpcomingEvent", data: response});
            this.closeApplyModal()
            this.unsetInProgress()
        })
    }

    setInProgress(){
        this.setState({inProgress:0})
    }

    unsetInProgress(){
        this.setState({inProgress:-1})
    }

    completedProgress(){
        this.setState({inProgress:1})
    }

    render() {
        // console.log("CommunitySessions:Props", this.props)

        let eventList;
        if (this.props.communitySessions) {
                let communitySessions = this.props.communitySessions.CommunitySessions
            eventList = []
            let firstCol = [], secondCol = []
            for (let i = 0; i < communitySessions.length; i++) {
                if (i % 2 == 0) {
                    firstCol.push(
                        <div key={i} style={{marginBottom: '10px'}}>
                            <IndividualSession
                                index={i}
                                eventDetail={communitySessions[i].fields.session_id}
                                accepted_applications_count=
                                {communitySessions[i].fields.accepted_applications_count}
                                count_of_participants={communitySessions[i].fields.count_of_participants}
                                pk={communitySessions[i].pk}
                                profileId={this.props.userProfileId}
                                openApplyModal={this.openApplyModal}
                                memberApplication={communitySessions[i].fields.member_application} />
                        </div>)
                }
                else {
                    secondCol.push(
                        <div key={i} style={{marginBottom: '10px'}}>
                            <IndividualSession
                                index={i}
                                eventDetail={communitySessions[i].fields.session_id}
                                accepted_applications_count=
                                {communitySessions[i].fields.accepted_applications_count}
                                count_of_participants={communitySessions[i].fields.count_of_participants}
                                pk={communitySessions[i].pk}
                                profileId={this.props.userProfileId}
                                openApplyModal={this.openApplyModal}
                                memberApplication={communitySessions[i].fields.member_application} />
                        </div>)
                }
            }
            eventList.push(
                <Grid fluid style={{padding: 0, margin: '20px 0px'}}>
                    <Col xs={12} md={6}>
                        {firstCol}
                    </Col>
                    <Col xs={12} md={6}>
                        {secondCol}
                    </Col>
                </Grid>
            )
        }

        let modalBodyState = <EventApplicationForm 
                                onChange = {this.changeApplicationText}
                                appTextStatus={this.state.appTextStatus} 
                                submitApplicationText = {this.submitApplicationText}
                                inProgress = {this.state.inProgress}/>
        //console.log("UpcomingSessionsList :: eventList", eventList)

        return (
            <div>
                {/* <Row
                    className="custom-tab-title">Upcoming Sessions</Row> */}
                {!eventList ?
                    <div style={{ "textAlign": "center", marginTop: "30px" }}>
                        <Preloader />
                    </div>
                    :
                    eventList.length == 0 ?
                        <div style={{textAlign:"center", marginTop:"20px"}}>
                            <div className="custom-list-content" style={{textAlign:"center"}}>
                                No Webinars are Scheduled
                            </div>
                        </div>
                        :
                        <div>
                            {eventList}
                            <CommonModal
                                showModal={this.state.showModal}
                                close={this.closeApplyModal}
                                modalHeading={"Apply for an Event or Session"}
                                modalBody={modalBodyState} />
                        </div>
                }
            </div>
        )

    }
}
