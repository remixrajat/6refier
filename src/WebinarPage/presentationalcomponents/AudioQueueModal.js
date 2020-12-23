
import React, { Component } from 'react';
import { Button, Modal, Col, Grid, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import AvatarCard from './AvatarCard'
import UserImg from '../../images/mentor_dashboard_page/avatardp.png'

class AudioQueueModal extends Component {
    render() {
        // console.log("AudioQueueModal:: this.props:: ", this.props)

        let speakBody = (
            <div className="custom-list-sub-content">Queue is Empty</div>
        ), speakWaitBody = (
            <div className="custom-list-sub-content">Queue is Empty</div>
        );

        if(this.props.speakQueue && 
            this.props.speakQueue.length > 0 && 
            this.props.attendeesList) {
            let speakList = [], index = 0
            let { attendeesList } = this.props
            
            for(let speak of this.props.speakQueue) {
                let tempBody = null

                if(attendeesList.hasOwnProperty(speak)) {
                    let attendeeInfo = attendeesList[speak]['participants']
                    let name = attendeeInfo['first_name']

                    if(attendeeInfo['last_name']) {
                        name = name + " " + attendeeInfo['last_name']
                    }

                    tempBody = (
                        <Col key={index++} xs={4} md={3} sm={4} style={{textAlign: 'center'}}>
                            <AvatarCard
                                profile={attendeeInfo['profile_photo']}
                                defaultPhoto={UserImg}
                                name={name}
                                fromAttendeesList={true}
                            />
                            <div>
                                <div className="custom-list-sub-content attendees-viewer-name-tags" 
                                    style={{left: '0'}} title={name}>
                                    {name}
                                </div>
                                {this.props.isCamEnabled 
                                    ? <div className="audio-queue-user-controls" style={{marginTop: '5px'}}>
                                        <div className="audio-queue-allow-cam" 
                                            onClick={() => this.props.allowCamAccess(speak)}>
                                            <FontAwesome name="check" /><FontAwesome name="camera" /> 
                                        </div>
                                        <div className="audio-queue-disallow-cam" 
                                            onClick={() => this.props.revokeCamAccess(speak)}
                                            style={{marginBottom: '10px'}}>
                                            <FontAwesome name="times" /><FontAwesome name="camera" />
                                        </div>
                                    </div>
                                    : null
                                }
                                <div title="Remove from Queue" 
                                    className={this.props.isCamEnabled 
                                                    ? "remove-from-queue-button-1" 
                                                    : "remove-from-queue-button-2"}
                                    onClick={() => {
                                        this.props.removeFromSpeakQueue(speak)
                                        this.props.revokeCamAccess(speak)
                                    }}>
                                    <FontAwesome name="times" />
                                </div>
                            </div>
                        </Col>
                    )    
                }

                speakList.push(tempBody)
            }

            speakBody = (
                <Row>
                    {speakList}
                </Row>
            )
        }

        if(this.props.speakWaitingQueue && 
            this.props.speakWaitingQueue.length > 0 && 
            this.props.attendeesList) {
            let speakList = [], index = 0
            let { attendeesList } = this.props
            
            for(let speak of this.props.speakWaitingQueue) {
                let tempBody = null

                if(attendeesList.hasOwnProperty(speak)) {
                    let attendeeInfo = attendeesList[speak]['participants']
                    let name = attendeeInfo['first_name']

                    if(attendeeInfo['last_name']) {
                        name = name + " " + attendeeInfo['last_name']
                    }

                    tempBody = (
                        <Col key={index++} xs={4} md={3} sm={4} style={{textAlign: 'center'}}>
                            <AvatarCard
                                profile={attendeeInfo['profile_photo']}
                                defaultPhoto={UserImg}
                                name={name}
                                fromAttendeesList={true}
                            />
                            <div>
                                <div className="custom-list-sub-content attendees-viewer-name-tags" title={name}>
                                    {name}
                                </div>
                            </div>
                        </Col>
                    )    
                }

                speakList.push(tempBody)
            }

            speakWaitBody = (
                <Row>
                    {speakList}
                </Row>
            )
        }

        return (
            <Grid fluid>
                <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px'}}>
                    <Button 
                        onClick={() => this.props.muteAllParticipants()}
                        style={{ "fontWeight": 600, marginBottom: '10px' }}
                        className="refier_custom_button_save">
                        Mute Participants
                    </Button>
                    <Button 
                        onClick={() => this.props.unmuteAllParticipants()}
                        style={{ "fontWeight": 600 }}
                        className="refier_custom_button_save">
                        Unmute Participants
                    </Button>
                </div>
                <div>
                    <p className="webinar-test-modal-subtitle">
                        <span style={{ background: "#ffffff" }}>
                            Participants with Speak Privileges
                        </span>
                    </p>
                    <div>
                        {speakBody}
                    </div>
                </div>
                {this.props.speakWaitingQueue && 
                    this.props.speakWaitingQueue.length > 0 ?
                    <div style={{marginTop: '50px'}}>
                        <p className="webinar-test-modal-subtitle">
                            <span style={{ background: "#ffffff" }}>
                                Participants waiting for Speak Privileges
                            </span>
                        </p>
                        <div style={{marginTop: '15px', marginBottom: '25px', 
                                        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                            <Button onClick={() => this.props.addParticipantToSpeakQueue(null, false)}
                                style={{ "fontWeight": 600, marginBottom: '10px' }}
                                className="refier_custom_button_save">
                                Allow Next Participant
                            </Button>
                            <Button onClick={() => this.props.addParticipantToSpeakQueue(null, true)}
                                style={{ "fontWeight": 600 }}
                                className="refier_custom_button_save">
                                Allow Next Batch
                            </Button>
                        </div>
                        <div>
                            {speakWaitBody}
                        </div>
                    </div>
                    :
                    null
                }
            </Grid>
            // <Modal show={this.props.showQueueModal} onHide={this.props.close}
            //     bsSize={this.props.size ? this.props.size : null}>
            //     <Modal.Header className={this.props.headingStyle}
            //         style={{
            //             backgroundColor: "white",
            //             color: "#797979",
            //             borderBottomWidth: "0px",
            //             paddingTop: '40px',
            //             paddingBottom: '30px'
            //         }}>
            //         <Grid fluid>
            //             <Col xs={8} className="refier_modal_header_dark_content"
            //                 style={{ textAlign: "left", fontWeight: 'bold' }}>
            //                 Participant Speak Queue
            //             </Col>
            //             <Col xs={4} style={{ textAlign: "right" }}>
            //                 <Button onClick={this.props.close}
            //                     style={{ "fontWeight": 600 }}
            //                     className="refier_custom_button_save">
            //                     <FontAwesome
            //                         name="close"
            //                         style={{ "display": "inline-block", "marginLeft": 0 }} />
            //                 </Button>
            //             </Col>
            //         </Grid>
            //     </Modal.Header>
            //     <Modal.Body style={{ overflow: "auto", backgroundColor: 'white', padding: '10px 30px 30px 30px' }}>
            //         <Grid fluid>
            //             <div>
            //                 <p className="webinar-test-modal-subtitle">
            //                     <span style={{ background: "#ffffff" }}>
            //                         Participants with Speak Privileges
            //                     </span>
            //                 </p>
            //                 <div>
            //                     {speakBody}
            //                 </div>
            //             </div>
            //             {this.props.speakWaitingQueue && 
            //              this.props.speakWaitingQueue.length > 0 ?
            //                 <div style={{marginTop: '50px'}}>
            //                     <p className="webinar-test-modal-subtitle">
            //                         <span style={{ background: "#ffffff" }}>
            //                             Participants waiting for Speak Privileges
            //                         </span>
            //                     </p>
            //                     <div style={{marginTop: '15px', marginBottom: '25px', 
            //                                     display: 'flex', justifyContent: 'space-between'}}>
            //                         <Button onClick={() => this.props.addParticipantToSpeakQueue(null, false)}
            //                             style={{ "fontWeight": 600 }}
            //                             className="refier_custom_button_save">
            //                             Allow Next Participant
            //                         </Button>
            //                         <Button onClick={() => this.props.addParticipantToSpeakQueue(null, true)}
            //                             style={{ "fontWeight": 600 }}
            //                             className="refier_custom_button_save">
            //                             Allow Next Batch
            //                         </Button>
            //                     </div>
            //                     <div>
            //                         {speakWaitBody}
            //                     </div>
            //                 </div>
            //                 :
            //                 null
            //             }
            //         </Grid>
            //     </Modal.Body>
            // </Modal>
        );
    }
}


export default AudioQueueModal;