import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import Panel from 'react-bootstrap/lib/Panel'
import { Col, Row, Nav, NavItem } from 'react-bootstrap';

import { isXsDevice } from '../../GlobalConstants';
import ChatBoxController from '../conditionalcomponents/ChatBoxController';
import AttendeesController from '../conditionalcomponents/AttendeesController';
import QuestionsController from '../conditionalcomponents/QuestionHolderController';


export default class WebinarBottomBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChat: false,
            isQueries: false,
            isAttendees: false,
        };
        
        this.handleBottomSelect = this.handleBottomSelect.bind(this)
        this.showQueryList = this.showQueryList.bind(this);
        this.showChats = this.showChats.bind(this);
        this.showAttendeesList = this.showAttendeesList.bind(this);
        this.closeTabs = this.closeTabs.bind(this)
        this.getSelectedPanel = this.getSelectedPanel.bind(this)
    }

    showChats() {
        this.setState(
            {
                isChat: true,
                isQueries: false,
                isAttendees: false,
            }
        );
    }

    showQueryList() {
        this.setState(
            {
                isChat: false,
                isQueries: true,
                isAttendees: false,
            }
        );
    }

    showAttendeesList() {
        this.setState(
            {
                isChat: false,
                isQueries: false,
                isAttendees: true,
            }
        );
    }

    handleBottomSelect(selectedKey) {
        if (selectedKey === 1) {
            this.showChats()
        }
        else if (selectedKey === 2) {
            this.showQueryList()
        }
        else if (selectedKey === 3) {
            this.showAttendeesList()
        }
    }

    closeTabs() {
        this.setState(
            {
                isChat: false,
                isQueries: false,
                isAttendees: false,
            }
        );
    }

    getSelectedPanel() {
        let conversationTitle = 'Conversation'
        let queriesTitle = 'Queries'
        let attendeesTitle = 'Attendees'
        let title 
        let section=null
        if (this.state.isChat ) {
            title = conversationTitle
            section = (
                <ChatBoxController eventid={this.props.eventid}
                    sendChatMessage={this.props.sendChatMessage}
                    chatMessageHandler={this.props.chatMessageHandler}  isSmallScreen={"yes"}/>
            )
        }
        else if (this.state.isQueries) {
            title = queriesTitle
            section = (
                <QuestionsController eventid={this.props.eventid} isSmallScreen={"yes"} />
            )
        }
        else if (this.state.isAttendees) {
            title = attendeesTitle
            section = (
                
                <AttendeesController eventid={this.props.eventid} isSmallScreen={"yes"}
                                        sendAddedUserToEventGroup={this.props.sendAddedUserToEventGroup} />
            )
        }
        return (
            <Panel className="custom-bottom-panel">
                <Panel.Heading>{title}
                    <span style={{ float: "right" }} title="Click to close" onClick={this.closeTabs}>
                    <FontAwesome
                        name="chevron-down"
                    />
                    </span>
                </Panel.Heading>
                <Panel.Body style={{ padding: "0px"}}>{section}</Panel.Body>
            </Panel>
        )
    }

    render() {
        console.log("WebinarBottomBar:props", this.props);
        // if (!isXsDevice() || !isMobileDevice() || !isSmDevice()) {
        //     return null;
        // }
        return (
            <div>
                {!this.state.isChat && !this.state.isAttendees && !this.state.isQueries ?
                    <div style={{ textAlign: "center" }}>
                        <Nav className="custom-bottom-navbar" justified
                            onSelect={key => this.handleBottomSelect(key)} >
                            <NavItem eventKey={1} href="#" className={this.state.isChat ? "active" : ""}>
                                <div>
                                    <FontAwesome
                                        name="comments"
                                    />
                                </div>
                                <div style={{ fontSize: "0.65em", fontWeight: 600 }}>
                                    CHAT
                            </div>
                            </NavItem>
                            <NavItem eventKey={2} href="#" className={this.state.isQueries ? "active" : ""}>
                                <div>
                                    <FontAwesome
                                        name="question-circle"
                                    />
                                </div>
                                <div style={{ fontSize: "0.65em", fontWeight: 600 }}>
                                    Queries
                            </div>
                            </NavItem>
                            <NavItem eventKey={3} href="#" className={this.state.isAttendees ? "active" : ""}>
                                <div>
                                    <FontAwesome
                                        name="users"
                                    />
                                </div>
                                <div style={{ fontSize: "0.65em", fontWeight: 600 }}>
                                    Attendees
                            </div>
                            </NavItem>
                        </Nav>
                    </div>
                    : 
                    <Col xs={12} className="bottom-panel-sheet">
                        <Row  >
                            {this.getSelectedPanel()}
                        </Row>
                    </Col>
                }
            </div>
        )
    }
}