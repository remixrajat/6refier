import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ChatBoxController from '../../WebinarPage/conditionalcomponents/ChatBoxController';
import RaiseHandController from '../../WebinarPage/conditionalcomponents/RaiseHandController';
import ReactionsController from '../../WebinarPage/conditionalcomponents/ReactionsController';
import AttendeesController from '../../WebinarPage/conditionalcomponents/AttendeesController';
import { addReceivedMessage } from '../../WebinarPage/conditionalcomponents/action.js';
import SocketConnection from '../../WebinarPage/SocketConnection';
import SessionConfig from './SessionConfig'

import { playNotificationSound } from '../../GlobalConstants';


class ConferenceSidebarController extends Component {
    constructor(props) {
        super(props);

        this.CHATEVENT = "chatConversation";
        this.CHATEVENT_CONVERSATION_ID = "chat";

        this.ASKQUESTIONEVENT = "askquestion"
        this.ASKQUESTIONEVENT_SERVER = "askquestionserver"

        this.state = {
            showChat: false,
            showAskQuestion: false,
            showAttendees: false,
            showReactions: false,
            showSettingsStatus: false
        }

        this.showChatBox = this.showChatBox.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.showReactionPanel = this.showReactionPanel.bind(this);
        this.showAttendeesPanel = this.showAttendeesPanel.bind(this);
        this.showAskQuestionPanel = this.showAskQuestionPanel.bind(this);
        this.chatMessageHandler = this.chatMessageHandler.bind(this);
        this.askQuestionHandler = this.askQuestionHandler.bind(this);

        if(this.props.token) {
            this.ws = SocketConnection.getConnectionInstance(this.props.token);

            this.ws.off(this.CHATEVENT);
            this.ws.on(this.CHATEVENT, this.chatMessageHandler);
            
            // this.ws.off(this.ASKQUESTIONEVENT);
            // this.ws.on(this.ASKQUESTIONEVENT, this.askQuestionHandler);
        }
    }

    componentWillMount() {
        this.props.dispatch({ type: "NEW_CHAT_COUNT", data: 0 })
        this.props.dispatch({ type: "NEW_ASKED_QUESTION_COUNT", data: 0 })
    }
    
    componentWillUnmount() {
        this.ws.off(this.CHATEVENT);
        // this.ws.off(this.ASKQUESTIONEVENT);
    }

    chatMessageHandler(eventmessage) {
        let parsedMessage = JSON.parse(eventmessage);
        // console.log("Sidebar::Received Message::chatMessageHandler ", 
        //     parsedMessage , parsedMessage.id);
        
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

    showChatBox() {
        this.setState({ 
            showChat: true,
            showReactions: false,
            showAskQuestion: false,
            showAttendees: false,
            showSettingsStatus: false
        })
    }

    showSettings() {
        this.setState({ 
            showChat: false,
            showReactions: false,
            showAskQuestion: false,
            showAttendees: false,
            showSettingsStatus: true
        })
    }

    showAskQuestionPanel() {
        this.setState({ 
            showChat: false,
            showReactions: false,
            showAskQuestion: true,
            showAttendees: false,
            showSettingsStatus: false
        })
    }

    showReactionPanel() {
        this.setState({ 
            showChat: false,
            showReactions: true,
            showAskQuestion: false,
            showAttendees: false,
            showSettingsStatus: false
        })
    }

    showAttendeesPanel() {
        this.setState({ 
            showChat: false,
            showReactions: false,
            showAskQuestion: false,
            showAttendees: true,
            showSettingsStatus: false
        })
    }

    showRenderedOption() {
        // console.log('showRenderedOption ', this.props);
        if (this.props.showChat) {
            return (
                <ChatBoxController
                    userName={this.props.userName}
                    fromConference={true}
                    eventid={this.props.eventid}
                    ws={this.ws}
                    usertype={this.props.usertype}
                />
            )
        } else if (this.state.showAskQuestion) {
            return (
                <RaiseHandController
                    fromConference={true}
                    eventid={this.props.eventid}
                    isPresenter={this.props.isPresenter}
                    ws={this.ws}
                />
            )
        } else if (this.state.showReactions) {
            return (
                <ReactionsController
                    event_details={this.props.event_details}
                    userprofiledata={this.props.userprofiledata} />
            )
        } else if (this.props.showAttendees) {
            return (
                <AttendeesController 
                    {...this.props}
                    isSubscriberPropsChanged={this.props.isSubscriberPropsChanged}
                    allPresenters={this.props.allPresenters} 
                    event_details={this.props.event_details} 
                    usertype={this.props.usertype} />
            );
        } else if (this.state.showSettingsStatus) {
            return (
                <SessionConfig 
                    usertype={this.props.usertype} 
                    setMaxPresenterParticipants={this.props.setMaxPresenterParticipants}
                    setMaxPresenterModerators={this.props.setMaxPresenterModerators} 
                    setCamOn={this.props.setCamOn}
                    setCamOff={this.props.setCamOff}
                    setMicOn={this.props.setMicOn}
                    setMicOff={this.props.setMicOff}
                    allowRaiseHand={this.props.allowRaiseHand}
                    disallowRaiseHand={this.props.disallowRaiseHand}
                    maxPresenterParticipants={this.props.maxPresenterParticipants}
                    maxPresenterModerators={this.props.maxPresenterModerators}
                    isCamOn={this.props.isCamOn}
                    isMicOn={this.props.isMicOn}
                    isRaiseHandAllowed={this.props.isRaiseHandAllowed}
                    setMaxParticipantSpeak={this.props.setMaxParticipantSpeak}
                    maxParticipantSpeak={this.props.maxParticipantSpeak}
                />
            );
        }
        else return null;
    }

    render() {
        // console.log('ConferenceSidebarController:: props', this.props, this.ws);

        let horizontalActionBarGrid = (<div className="conference-toolbar" style={{ height: '100%' }}>
            {/* <div>
                <FontAwesome
                    onClick={() => this.props.toggleActionBarState()}
                    name="times"
                    className="conference-toolbar-close"
                />
            </div> */}
            {/* <Grid fluid className="conference-toolbar-controls-container"> */}
                {/* <Row>
                    <Col xs={4}>
                        <div
                            style={{position: 'relative'}}
                            className={this.state.showChat ?
                                "conference-toolbar-control control-highlighted" :
                                "conference-toolbar-control"}
                            onClick={this.showChatBox}>
                            <FontAwesome
                                name="comments"
                                className="conference-toolbar-icons"
                            />
                            {
                                this.props.isChatNotification ? 
                                    <span className="custom-badge"
                                        style={{
                                            position: "absolute",
                                            top: "-8px",
                                            right: "0px",
                                            borderRadius: '50%',
                                        }}
                                    >{this.props.newChatCount && this.props.newChatCount > 0 ?
                                        this.props.newChatCount :
                                        null
                                    }</span> :
                                    null
                            }
                            <p style={{ marginTop: '5px' }}>Chat</p>
                        </div>
                    </Col>
                    {this.props.isPresenter ?
                        <Col xs={4}>
                            <div
                                style={{position: 'relative'}}
                                className={this.state.showSettingsStatus ?
                                    "conference-toolbar-control control-highlighted" :
                                    "conference-toolbar-control"}
                                onClick={this.showSettings}>
                                <FontAwesome
                                    name="cog"
                                    className="conference-toolbar-icons"
                                />
                                <p style={{ marginTop: '5px' }}>Settings</p>
                            </div>
                        </Col>
                        : null
                    } */}
                    {/* <Col xs={4}>
                        <div
                            style={{position: 'relative'}}
                            className={this.state.showAskQuestion ?
                                "conference-toolbar-control control-highlighted" :
                                "conference-toolbar-control"}
                            onClick={this.showAskQuestionPanel}>
                            <FontAwesome
                                name="question"
                                className="conference-toolbar-icons"
                            />
                            {
                                this.props.isQuestionAsked ? 
                                    <span className="custom-badge"
                                        style={{
                                            position: "absolute",
                                            top: "-8px",
                                            right: "0px",
                                            borderRadius: '50%',
                                        }}
                                    >{this.props.newAskedQuestionCount && this.props.newAskedQuestionCount > 0 ?
                                        this.props.newAskedQuestionCount :
                                        null
                                    }</span> :
                                    null
                            }
                            <p style={{ marginTop: '5px' }}>Ask Question</p>
                        </div>
                    </Col> */}
                    {/* <Col xs={3}>
                        <div
                            className={this.state.showReactions ?
                                "conference-toolbar-control control-highlighted" :
                                "conference-toolbar-control"}
                            onClick={this.showReactionPanel}>
                            <FontAwesome
                                name="smile-o"
                                className="conference-toolbar-icons"
                            />
                            <p style={{ marginTop: '5px' }}>Reaction</p>
                        </div>
                    </Col> */}
                    {/* <Col xs={4}>
                        <div
                            className={this.state.showAttendees ?
                                "conference-toolbar-control control-highlighted" :
                                "conference-toolbar-control"}
                            onClick={this.showAttendeesPanel}>
                            <FontAwesome
                                title="Attendees List"
                                name="users"
                                className="conference-toolbar-icons"
                            />
                            <p style={{ marginTop: '5px' }}>Attendees</p>
                        </div>
                    </Col>
                </Row>
            </Grid> */}
            <div className="conference-displayed-control">
                {this.showRenderedOption()}
            </div>
        </div>);
        

        return (
            <div>
                <div>
                { this.props.event_details && this.props.showActionBar ? 
                    <p className="custom-list-title-content custom-item-border" style={{
                        color:"#049cdb",
                        fontWeight: 600, padding: "10px 30px"
                    }} >
                        {this.props.event_details.sessionTitle}{"  by  "}{this.props.event_details.sessionMentorName} 
                    </p>
                    : null
                }
                </div>
                {this.props.showActionBar ? horizontalActionBarGrid : null } 
            </div>
        );
    }

}


var mapStateToProps = (store) => {
    return {
        userprofiledata: store.userProfileReducer.profileFields,
        event_details: store.webinarPageReducer.event_details,
        isQuestionAsked: store.webinarPageReducer.isQuestionAsked,
        isChatNotification: store.webinarPageReducer.isChatNotification,
        newChatCount: store.webinarPageReducer.newChatCount,
        newAskedQuestionCount: store.webinarPageReducer.newAskedQuestionCount,
        token: store.webinarPageReducer.token,
    };
};


export default connect(mapStateToProps)(ConferenceSidebarController);