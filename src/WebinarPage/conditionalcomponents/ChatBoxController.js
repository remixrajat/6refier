import React, { Component } from 'react'
import { Col, Row, Grid } from 'react-bootstrap'
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import ChatBoxBody from '../presentationalcomponents/ChatBoxBody';
import ChatBoxForm from '../presentationalcomponents/ChatBoxForm';
import { ReactionsController } from './ReactionsController';
import { syncEventConversation, addReceivedMessage } from './action.js';


class ChatBoxComponent extends Component {
    constructor(props) {
        super(props);

        this.CHATEVENT = "chatConversation";
        this.CHATEVENT_CONVERSATION_ID = "chat";

        this.state = { messagerecv: [], messageBoxVal: "" };

        this.sendChatMessage = this.sendChatMessage.bind(this);
        this.sendQueryMessage = this.sendQueryMessage.bind(this)
    }

    componentWillMount() {
        let params = { eventid: this.props.eventid }
        if (!this.props.chatMessages || this.props.chatMessages.length === 0) {
            this.props.dispatch(syncEventConversation(params));
        }

        setTimeout(() => {
            this.props.dispatch({ type: "IS_CHAT_NOTIFICATION", data: false })
            this.props.dispatch({ type: "NEW_CHAT_COUNT", data: 0 })
        }, 2000)
    }

    sendChatMessage(message) {
        // console.log("ChatBoxComponent::sendChatMessage", this.props.ws, message)
        this.props.ws.emit(this.CHATEVENT, message);
    }

    sendQueryMessage(event) {
        event.preventDefault();
        var message = this.state.messageBoxVal;
        if (message.trim().length === 0) {
            return;
        }

        let msg = {
            id: "chat",
            senderName: this.props.profileFields.first_name,
            profile_photo: this.props.profileFields.profile_photo,
            text: message,
            senderId: this.props.profileFields.pk,
            eventid: this.props.eventid,
            usertype: this.props.usertype
        }
        this.sendChatMessage(JSON.stringify(msg));
        this.setState({ messageBoxVal: "" })
    }

    onMessageType(e) {
        this.setState({ messageBoxVal: e.target.value })
    }


    render() {
        // console.log("ChatBoxController::this.props", this.props)

        return (
            <Col xs={12}
                style={{ margin: "0px", padding: "0px", height: '100%' }}>
                <Grid
                    fluid
                    style={this.props.fromConference ?
                        {
                            background: "white",
                            padding: "10px 0px 0px 0px",
                            margin: "0px",
                            height: '100%'
                        } :
                        { background: "white", padding: "10px 0px 0px 0px", margin: "0px" }}>
                    {
                        !this.props.mobileView ?
                            <div className="webinar-chat-header" >
                                <span style={{ "marginRight": "10px" }}>
                                    <FontAwesome
                                        name='comments-o'
                                        style={{ "display": "inline-block" }}
                                    />
                                </span>
                                Chat
                            </div> :
                            null
                    }
                    <div>
                        <ChatBoxBody
                            fromConference={this.props.fromConference}
                            message={this.props.chatMessages}
                            profileFields={this.props.profileFields} />
                        <ChatBoxForm
                            fromConference={this.props.fromConference}
                            sendmessage={this.sendQueryMessage.bind(this)}
                            onMessageType={this.onMessageType.bind(this)}
                            messageBoxVal={this.state.messageBoxVal} />
                    </div>
                </Grid>
            </Col>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        profileFields: store.userProfileReducer.profileFields,
        userId: store.userProfileReducer.userId,
        chatMessages: store.webinarPageReducer.eventConversation,
        token: store.webinarPageReducer.token,
    }
}

export default connect(mapStateToProps)(ChatBoxComponent);
