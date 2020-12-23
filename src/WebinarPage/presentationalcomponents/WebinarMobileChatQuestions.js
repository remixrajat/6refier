
import React, { Component } from 'react';
import { Button, Modal, Col, Grid, Tabs, Tab } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ChatBoxController from '../conditionalcomponents/ChatBoxController';
import RaiseHandController from '../../WebinarPage/conditionalcomponents/RaiseHandController';
import AttendeesController from '../../WebinarPage/conditionalcomponents/AttendeesController';


class WebinarMobileChatQuestions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal show={this.props.showMobileChatPopup} onHide={this.props.close}
                className={this.props.isPresenter ? "custom-mobile-modal" : null}
                bsSize={this.props.size ? this.props.size : null}>
                <Modal.Header className={this.props.headingStyle}
                    style={this.props.isAttendee ? {
                            backgroundColor: "white",
                            color: "#797979",
                            borderBottomWidth: "0px",
                            paddingTop: '30px',
                            paddingBottom: '10px'
                        } : {
                            backgroundColor: "white",
                            color: "#797979",
                            borderBottomWidth: "0px",
                            paddingTop: '40px',
                            paddingBottom: '30px'
                    }}>
                    <div className={this.props.isPresenter ? "container" : "container-fluid"}>
                        <Col xs={8} className="refier_modal_header_dark_content"
                            style={{ textAlign: "left", fontWeight: 'bold' }}>
                            {this.props.isAttendee ? "Attendee List" : "Chat Box"}
                        </Col>
                        <Col xs={4} style={{ textAlign: "right" }}>
                            <Button onClick={this.props.close}
                                style={{ "fontWeight": 600 }}
                                className="refier_custom_button_save">
                                <FontAwesome
                                    name="close"
                                    style={{ "display": "inline-block", "marginLeft": 0 }} />
                            </Button>
                        </Col>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ overflow: "auto", backgroundColor: 'white' }}>
                    <div className="webinar-mobile-popup-body-wrapper">
                        <div style={{width: '90%', margin: '0 auto'}} className="webinar-mobile-tab-button">
                        {this.props.isAttendee ?
                            <AttendeesController 
                                {...this.props}
                            />
                            :
                            <ChatBoxController
                                userName={this.props.userName}
                                fromConference={true}
                                mobileView={true}
                                eventid={this.props.eventid}
                                ws={this.props.ws}
                            />
                        }
                        </div>
                        {/* <Tabs defaultActiveKey="chat" bsStyle='pills'>
                            <Tab eventKey="chat" title="Chat">
                                <div style={{width: '90%', margin: '0 auto'}} tabClassName="webinar-mobile-tab-button">
                                    <ChatBoxController
                                        userName={this.props.userName}
                                        fromConference={true}
                                        mobileView={true}
                                        eventid={this.props.eventid}
                                        ws={this.props.ws}
                                    />
                                </div>
                            </Tab>
                            <Tab eventKey="question" title="Ask Question" tabClassName="webinar-mobile-tab-button">
                                <div style={{marginTop: '10px'}}>
                                    <RaiseHandController
                                        fromConference={true}
                                        mobileView={true}
                                        eventid={this.props.eventid}
                                        isPresenter={this.props.isPresenter}
                                        ws={this.props.ws}
                                    />
                                </div>
                            </Tab>
                        </Tabs> */}
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}


export default WebinarMobileChatQuestions;