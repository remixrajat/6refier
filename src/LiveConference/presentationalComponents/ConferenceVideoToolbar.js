import React from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import WebinarMediaDevicesTestModal from '../../WebinarPage/presentationalcomponents/WebinarMediaDevicesTest';
import WebinarMobileChatQuestions from '../../WebinarPage/presentationalcomponents/WebinarMobileChatQuestions';
import AudioQueueModal from '../../WebinarPage/presentationalcomponents/AudioQueueModal';
import ReactionsController from "../../WebinarPage/conditionalcomponents/ReactionsController";
import SocketConnection from "../../WebinarPage/SocketConnection";
import { addReceivedMessage } from '../../WebinarPage/conditionalcomponents/action.js';

import { isXsDevice, isMobileDevice, isSmDevice, playNotificationSound } from '../../GlobalConstants'
import ConferenceVideoToolbarTestWebinarCompatibility from "./videoToolbar/ConferenceVideoToolbarTestWebinarCompatibility";
import ConferenceVideoToolbarSwitchCamera from "./videoToolbar/ConferenceVideoToolbarSwitchCamera";
import ConferenceVideoToolbarCamOnOff from "./videoToolbar/ConferenceVideoToolbarCamOnOff";
import ConferenceVideoToolbarMicOnOff from "./videoToolbar/ConferenceVideoToolbarMicOnOff";
import ConferenceVideoToolbarScreenShare from "./videoToolbar/ConferenceVideoToolbarScreenShare";
import ConferenceVideoToolbarChat from "./videoToolbar/ConferenceVideoToolbarChat";
import ConferenceVideoToolbarRaiseHand from "./videoToolbar/ConferenceVideoToolbarRaiseHand";
import ConferenceVideoToolbarAudioQueue from "./videoToolbar/ConferenceVideoToolbarAudioQueue";
import ConferenceVideoToolbarLeave from "./videoToolbar/ConferenceVideoToolbarLeave";
import ConferenceVideoToolbarAttendees from "./videoToolbar/ConferenceVideoToolbarAttendees";
import ConferenceVideoToolbarLightOff from "./videoToolbar/ConferenceVideoToolbarLightOff";


class ConferenceVideoToolbar extends React.Component {
    constructor(props) {
        super(props);

        this.ws = null 

        this.CHATEVENT = "chatConversation";
        this.CHATEVENT_CONVERSATION_ID = "chat";

        this.ASKTOSPEAK = "askquestion"
        // this.ASKQUESTIONEVENT = "askquestion"
        // this.ASKQUESTIONEVENT_SERVER = "askquestionserver"
        
        this.state = {
            showSettingModal: true,
            showAskQuestion: false,
            showChat: false,
            showMobileChatPopup: false,
            isAudioQueueModalOpen: false,
            isAttendeeModalOpen: false
        }
        
        this.closeSettingsModal = this.closeSettingsModal.bind(this);
        this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
        this.getSettingsModalState = this.getSettingsModalState.bind(this);
        this.chatMessageHandler = this.chatMessageHandler.bind(this);
        this.askQuestionHandler = this.askQuestionHandler.bind(this);
        this.openChatModal = this.openChatModal.bind(this);
        this.closeChatModal = this.closeChatModal.bind(this);
        this.askPresenterToSpeak = this.askPresenterToSpeak.bind(this);
        // this.askToSpeakReceiver = this.askToSpeakReceiver.bind(this);
        this.openAudioQueueModal = this.openAudioQueueModal.bind(this);
        this.closeAudioQueueModal = this.closeAudioQueueModal.bind(this);
        this.openAttendeeModal = this.openAttendeeModal.bind(this);

        if(this.props.token ) {
            this.ws = SocketConnection.getConnectionInstance(this.props.token);

            // if(isXsDevice() || isMobileDevice()) {
                this.ws.off(this.CHATEVENT);
                this.ws.on(this.CHATEVENT, this.chatMessageHandler);
            // }

            // this.ws.off(this.ASKTOSPEAK);
            // this.ws.on(this.ASKTOSPEAK, this.askToSpeakReceiver);
            // this.ws.off(this.ASKQUESTIONEVENT);
            // this.ws.on(this.ASKQUESTIONEVENT, this.askQuestionHandler);
        }
    }

    componentWillMount() {
        if(isXsDevice() || isMobileDevice()) {
            this.props.dispatch({ type: "NEW_CHAT_COUNT", data: 0 })
            this.props.dispatch({ type: "NEW_ASKED_QUESTION_COUNT", data: 0 })
        }
    }

    componentWillUnmount() {
        if(isXsDevice() || isMobileDevice()) {
            this.ws.off(this.CHATEVENT);
        }
    }

    chatMessageHandler(eventmessage) {
        let parsedMessage = JSON.parse(eventmessage);
        
        switch (parsedMessage.id) {
            case this.CHATEVENT_CONVERSATION_ID:
                if (!Array.isArray(parsedMessage)) {
                    parsedMessage = Array(parsedMessage)
                }
                // console.log({parsedMessage})
                this.props.dispatch(addReceivedMessage(parsedMessage));
                !this.state.showChat && this.props.dispatch({ type: "IS_CHAT_NOTIFICATION", data: true })
                this.props.dispatch({ type: "NEW_CHAT_COUNT", data: this.props.newChatCount + 1 })
                
                break;

            default:
                console.warn("Unrecognised message::chatMessageHandler", parsedMessage);
        }
    }

    askQuestionHandler(event) {
        // console.log("askQuestionHandler ", event);
        let parsedMessage = JSON.parse(event);
        // console.log("askQuestionHandler parsedMessage", {parsedMessage});
        if (parsedMessage.eventid !== this.props.eventid) {
            console.warn("Wrong Event Id.")
            return;
        }
        this.props.dispatch({ type: "WEBINARQUESTIONS", data: parsedMessage.data })
        !this.state.showAskQuestion && this.props.dispatch({ type: "IS_QUESTION_ASKED", data: true })
        this.props.dispatch({ type: "NEW_ASKED_QUESTION_COUNT", data: this.props.newAskedQuestionCount + 1 })

        if(this.props.isPresenter) {
            playNotificationSound();
        }
    }

    openAudioQueueModal() {
        this.setState({isAudioQueueModalOpen: true})
    }

    closeAudioQueueModal() {
        this.setState({isAudioQueueModalOpen: false})
    }

    closeSettingsModal() {
        this.setState({ showSettingModal: false });
    }

    toggleSettingsModal() {
        this.setState({ showSettingModal: !this.getSettingsModalState() });
    }

    getSettingsModalState() {
        return this.state.showSettingModal;
    }

    openChatModal() {
        this.setState({ showMobileChatPopup: true });
    }

    openAttendeeModal() {
        this.setState({ isAttendeeModalOpen: true });
    }

    closeChatModal() {
        this.setState({ showMobileChatPopup: false, isAttendeeModalOpen: false });
    }

    askPresenterToSpeak() {
        let msg = { eventid: this.props.eventid, userId: this.props.userId, allowStatus: false }
        // if(this.props.userId === null) {
        //     alert("Profile id cannot be null. Contact Refier Support.")
        // }
        this.ws.emit(this.ASKTOSPEAK, JSON.stringify(msg));
    }

    
    render() {
        // console.log("ConferenceVideoToolbar::props", this.props)

        return (
            <div className="conference-toolbar-controls-bar">
                {/* <AudioQueueModal
                    close={this.closeAudioQueueModal}
                    showQueueModal={this.state.isAudioQueueModalOpen}
                    isPresenter={this.props.isPresenter}
                    speakQueue={this.props.speakQueue}
                    speakWaitingQueue={this.props.speakWaitingQueue}
                    attendeesList={this.props.eventAttendeesObject}
                    addParticipantToSpeakQueue={this.props.addParticipantToSpeakQueue}
                    removeFromSpeakQueue={this.props.removeFromSpeakQueue}
                /> */}
                <WebinarMediaDevicesTestModal
                    close={this.closeSettingsModal}
                    showSettingModal={this.state.showSettingModal}
                    isPresenter={this.props.isPresenter}
                />
                <WebinarMobileChatQuestions {...this.props}
                    close={this.closeChatModal}
                    showMobileChatPopup={this.state.showMobileChatPopup || this.state.isAttendeeModalOpen}
                    // userName={this.props.userName}
                    // eventid={this.props.eventid}
                    // ws={isXsDevice() || isMobileDevice() ? this.ws : null}
                    isChat={this.state.showMobileChatPopup}
                    isAttendee={this.state.isAttendeeModalOpen}
                    ws={this.ws}
                    // isPresenter={this.props.isPresenter}
                    // event_details={this.props.event_details}
                    // usertype={this.props.usertype}
                />
                <Grid fluid style={{display: 'flex', alignItems: 'center'}}>
                    <ConferenceVideoToolbarChat {...this.props} openChatModal={this.openChatModal} />
                    <ConferenceVideoToolbarAttendees {...this.props} openAttendeeModal={this.openAttendeeModal} />
                    <ConferenceVideoToolbarSwitchCamera {...this.props} switchCamera={this.props.switchCamera}/>
                    <ConferenceVideoToolbarTestWebinarCompatibility {...this.props} toggleSettingsModal={this.toggleSettingsModal}/>
                    <ConferenceVideoToolbarMicOnOff {...this.props} />
                    <ConferenceVideoToolbarCamOnOff {...this.props} />
                    <ConferenceVideoToolbarScreenShare {...this.props} />
                    <ConferenceVideoToolbarRaiseHand {...this.props} askPresenterToSpeak={this.askPresenterToSpeak} />
                    <ConferenceVideoToolbarLightOff {...this.props} />
                    {/* <ConferenceVideoToolbarAudioQueue {...this.props} openAudioQueueModal={this.openAudioQueueModal} /> */}
                    <ConferenceVideoToolbarLeave {...this.props} />
                </Grid>
            </div>
        );
    }
}

export default ConferenceVideoToolbar;