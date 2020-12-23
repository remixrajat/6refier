import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import AtendeesComponent from '../presentationalcomponents/AtendeesComponent.js';
import { syncEventJoinedParticipants, add_participants_to_ongoing_events, addEventParticipants } from './action.js'
import AudioQueueModal from '../presentationalcomponents/AudioQueueModal';
import SocketConnection from '../SocketConnection.js';
import { PRESENTER } from '../../LiveConference/conditionalComponents/action';


class AttendeesController extends Component {
    constructor(props) {
        super(props);
        
        this.ADDUSEREVENT = "addedusertoevent";
        this.ADDUSEREVENT_ID = "addeduser";
        this.PRESENTER = 1;
        this.USER_STATUS = 'user_status';
        this.PRESENTER_STATUS = 'presenter_status'
        
        this.ws = this.ws = SocketConnection.getConnectionInstance();
        this.sendAddedUserToEventGroup = this.sendAddedUserToEventGroup.bind(this);
        this.addUserMessageHandler = this.addUserMessageHandler.bind(this);
    }

    componentWillMount() {
        let nav = window.navigator;
        let conn = "";
        
        if (nav.connection) {
            conn = {
                downlink: nav.connection.downlink,
                effectiveType: nav.connection.effectiveType,
                rtt: nav.connection.rtt,
            }
        }
        const browser = {
            appVersion: nav.appVersion,
            connection: conn,
            language: nav.language,
            platform: nav.platform,
            userAgent: nav.userAgent,

        }
        let params = { eventid: this.props.event_details.event_id, browser , userType : this.props.usertype }
        this.props.dispatch(add_participants_to_ongoing_events(params)); // add participants 
        this.props.dispatch(syncEventJoinedParticipants(params)); // get all joined participants
    }

    componentDidMount() {
        this.ws.on(this.ADDUSEREVENT, this.addUserMessageHandler);
    }

    sendAddedUserToEventGroup(message, eventid) {
        message = { id: this.ADDUSEREVENT_ID, addeduser: message, eventid: eventid };
        // console.log("sendAddedUserToEventGroup", message, JSON.stringify(message) );
        this.ws.emit(this.ADDUSEREVENT + "server", JSON.stringify(message));
    }

    addUserMessageHandler(eventmessage) {
        let parsedMessage = JSON.parse(eventmessage);
        // console.log("Received Message::addUserMessageHandler ",parsedMessage , parsedMessage.id);
        switch (parsedMessage.id) {
            case this.ADDUSEREVENT_ID:
                // console.log("Received Message::ADDUSEREVENT_ID ");
                this.props.dispatch(addEventParticipants(parsedMessage));
                break;
            case this.USER_STATUS:
                this.props.dispatch({type:"WEBINARPARTICIPANTS",data: JSON.parse(parsedMessage.users)})
                break;
            case this.PRESENTER_STATUS:
                if(this.usertype === this.PRESENTER){
                    return;
                }
                // console.log('presenterAvailable :: is setting to ', parsedMessage.is_presenter_present , parsedMessage);
                this.setState({ 
                    is_webinar_started_by_presenter: parsedMessage.is_webinar_started || false,
                    is_webinar_ended: parsedMessage.is_webinar_ended || false
                });
                if(parsedMessage.hasOwnProperty('is_presenter_present') ){
                    this.setState({
                        presenterAvailable: parsedMessage.is_presenter_present,
                    })
                }
                if(parsedMessage.is_presenter_present === false){
                    this.stop(this.MEDIA.WEBCAM, 'presenterDisconnected')
                }
                break;
            default:
                console.warn("Unrecognised message::addUserMessageHandler", parsedMessage);
        }
    }

    render() {
        // console.log("AttendeesController:: props", this.props)

        return (
            this.props.usertype === PRESENTER ?
                <div className="conference-toolbar-attendees-tab-wrap">
                    <Tabs id="attendee-queue" defaultActiveKey="attendees" bsStyle='pills'>
                        <Tab eventKey="attendees" title="Attendees" tabClassName="webinar-mobile-tab-button">
                            <div style={{marginTop: '10px'}}>
                                <AtendeesComponent {...this.props}
                                    sendAddedUserToEventGroup={this.sendAddedUserToEventGroup}
                                    eventid={this.props.event_details.event_id} />
                            </div>
                        </Tab>
                        <Tab eventKey="audioQueue" title="Audio Queue" tabClassName="webinar-mobile-tab-button">
                            <div style={{marginTop: '20px'}}>
                                <AudioQueueModal
                                    isPresenter={this.props.isPresenter}
                                    isCamEnabled={this.props.event_config 
                                                    && this.props.event_config.is_cam_on_presenter_participant 
                                                    || false}
                                    speakQueue={this.props.speakQueue}
                                    speakWaitingQueue={this.props.speakWaitingQueue}
                                    attendeesList={this.props.eventAttendeesObject}
                                    addParticipantToSpeakQueue={this.props.addParticipantToSpeakQueue}
                                    removeFromSpeakQueue={this.props.removeFromSpeakQueue}
                                    muteAllParticipants={this.props.muteAllParticipants}
                                    unmuteAllParticipants={this.props.unmuteAllParticipants}
                                    allowCamAccess={this.props.allowCamAccess}
                                    revokeCamAccess={this.props.revokeCamAccess}
                                />
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                
                :

                <AtendeesComponent {...this.props}
                    sendAddedUserToEventGroup={this.sendAddedUserToEventGroup}
                    eventid={this.props.event_details.event_id} />
        );

    }
}

let mapStateToProps = (store) => {
    return {
        profileFields: store.userProfileReducer.profileFields,
        attendeesList: store.webinarPageReducer.eventAttendees,
        attendee_self: store.webinarPageReducer.eventAttendees_self,
        attendeesList_extended: store.webinarPageReducer.eventAttendeesExtended
    }
}

export default connect(mapStateToProps)(AttendeesController);
