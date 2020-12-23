import React, { Component } from "react";
import "redux";
import { connect } from "react-redux";
import { Grid, Col, Row,Button } from "react-bootstrap";

import EventApplicationForm from '../presentationcomponents/EventApplicationForm'
import UserServiceTemplateController from './UserServiceTemplateController'
import { setUpcomingEvent,insertUserApplication, updateSessionStatus, getAllPackageValidityMappingForEvents } from "./action";

import ComponentsModal from "../../shared/CommonModal";


class UserServicePage extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            showModal: false,
            appTextStatus : "Hi, I am interested for this event !",
            eventId : "",
            confirmSessionComplete : false,
            inProgress: -1,
        };
        this.completedSessions;
        this.applyForEvent = this.applyForEvent.bind(this);
        this.openApplyModal = this.openApplyModal.bind(this);
        this.closeApplyModal = this.closeApplyModal.bind(this);
        this.setEventId = this.setEventId.bind(this);
        this.submitApplicationText = this.submitApplicationText.bind(this);
        this.changeApplicationText = this.changeApplicationText.bind(this);
        this.markCompleteSession = this.markCompleteSession.bind(this);
        this.closeApplyApplicationModal = this.closeApplyApplicationModal.bind(this)
        this.setInProgress = this.setInProgress.bind(this)
        this.unsetInProgress = this.unsetInProgress.bind(this)
        this.completedProgress = this.completedProgress.bind(this)
        this.confirmModalBody = (
            <div>
                <p>Are you sure?</p>
                <div className="pull-right" style={{padding:"0 10px"}}>
                    <Row >
                        <Button className="refier_custom_button_dark" style={{margin:"0 10px"}} bsStyle="primary" onClick={this.markCompleteSession}>Yes</Button>
                        <Button className="refier_custom_button_dark" style={{margin:"0 10px"}} bsStyle="primary" onClick={this.onCancelConfirmModal.bind(this)}>Cancel</Button>
                    </Row>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.dispatch(setUpcomingEvent());
        this.props.dispatch(getAllPackageValidityMappingForEvents());
    }

    onCancelConfirmModal(e){
        this.setState({showModal:false});
        this.setState({confirmSessionComplete:false})
        this.completedSessions = null;
    }

    openApplyModal(event){
        this.setEventId(event)
        this.setState({showModal:true})
    }

    closeApplyApplicationModal(){
        this.setState({showModal:false, })
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

    closeApplyModal(){
        this.setState({showModal:false})
        this.setState({confirmSessionComplete:false})
    }

    applyForEvent(row,e){
        this.props.dispatch(insertUserApplication(row));
        
    }

    changeApplicationText(e){
        this.setState({
            appTextStatus : e.target.value
        })
    }

    setEventId(event){
        this.setState(
            {eventId:event}
        )
    }

    submitApplicationText(){
        this.setInProgress()
        let applicationText = this.state.appTextStatus;
        //console.log("Sending Request",this.state.eventId,applicationText)
        let returnPromise = this.props.dispatch(insertUserApplication(this.state.eventId,applicationText))
        returnPromise.then((response) => {
            // let eventData = setEventDataStateUser(data);
            this.completedProgress()
            this.props.dispatch({ type: "setUpcomingEvent", data: response});
            this.closeApplyApplicationModal()
            this.unsetInProgress()
                })
    }

    markCompleteSession(){
        // console.log("confirmSessionComplete", this.completedSessions);
        let _this = this;
        this.props.dispatch(updateSessionStatus(_this.completedSessions))
            .then(function(data){
                _this.setState({confirmSessionComplete:false});
                _this.props.dispatch(setUpcomingEvent());
            });
    }

    confirmSessionComplete(formdata){
        this.setState({confirmSessionComplete:true})
        this.completedSessions = formdata;
    }


    render() {
        // console.log("previous upcoming event", this.props);
        let modalBodyState = <EventApplicationForm onChange = {this.changeApplicationText}
                    appTextStatus={this.state.appTextStatus} 
                    submitApplicationText = {this.submitApplicationText}
                    inProgress = {this.state.inProgress}/>

        return (
            <div>
                <UserServiceTemplateController 
                    eventLists={this.props.events ? this.props.events : null}
                    packageValiditymappingForEvents={this.props.packageValiditymappingForEvents}
                    userId={this.props.userId}
                    confirmSessionComplete={this.confirmSessionComplete.bind(this)}
                    applyForEvent={this.openApplyModal}/>

                <ComponentsModal
                    showModal={this.state.showModal}
                    close={this.closeApplyModal}
                    modalHeading={"Apply for an Event or Session"}
                    modalBody={modalBodyState}
                    />

                <ComponentsModal
                    showModal={this.state.confirmSessionComplete}  
                    close={this.closeApplyModal}
                    modalHeading={"Change Session Status"}
                    modalBody={ this.confirmModalBody}
                    hideFooter={true}
                />
            </div>
        );
    }
}

var mapStateToProps = store => {
    return { 
        events: store.userServicePageReducer.upcomingEventData,
        packageValiditymappingForEvents: store.userServicePageReducer.packageValiditymappingForEvents,
        userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null)
    };
};

export default connect(mapStateToProps)(UserServicePage);
