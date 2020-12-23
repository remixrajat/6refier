import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        // this.camStatusChanged = this.camStatusChanged.bind(this);
        // this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        // this.toggleChat = this.toggleChat.bind(this);
    }


    // micStatusChanged() {
    //     this.props.micStatusChanged();
    // }

    // camStatusChanged() {
    //     this.props.camStatusChanged();
    // }

    screenShare() {
        this.props.screenShare();
    }

    stopScreenShare() {
        this.props.stopScreenShare();
    }

    toggleFullscreen() {
        this.props.toggleFullscreen();
    }

    leaveSession() {
        this.props.leaveSession();
    }

    // toggleChat() {
    //     this.props.toggleChat();
    // }

    render() {
        const localUser = this.props.user;
        
        return (
            <div className="conference-toolbar" id="conference-toolbar-header">
                <Row style={{display: 'flex', alignItems: 'center'}}>
                    <Col xs={12}>
                        {/* <Col xs={2} onClick={this.camStatusChanged}>
                            {localUser !== undefined && localUser.isVideoActive() ? (
                                <div className="conference-toolbar-buttons">
                                    <FontAwesome 
                                        title="Stop Video Camera"
                                        name="video-camera"
                                        
                                        style={{cursor: 'pointer'}}
                                    />
                                    <p>Cam Off</p>
                                </div>
                            ) : (
                                <div className="conference-toolbar-buttons">
                                    <FontAwesome 
                                        title="Start Video Camera"
                                        name="stop"
                                        
                                        style={{cursor: 'pointer'}}
                                    />
                                    <p>Cam On</p>
                                </div>
                            )}
                        </Col> */}

                        <Col xs={4}>
                            {localUser !== undefined && localUser.isScreenShareActive() ? 
                                <div className="conference-toolbar-buttons" onClick={this.stopScreenShare}>
                                    <FontAwesome 
                                        title="Stop Screen Share"
                                        name="laptop"
                                        
                                        style={{cursor: 'pointer'}}
                                    />
                                    <p>Stop Share</p>
                                </div> : 
                                <div className="conference-toolbar-buttons" onClick={this.screenShare}>
                                    <FontAwesome 
                                        title="Start Screen Share"
                                        name="laptop"
                                        
                                        style={{cursor: 'pointer'}}
                                    />
                                    <p>Share Screen</p>
                                </div>
                            }
                        </Col>

                        <Col xs={4} onClick={this.toggleFullscreen}>
                            {localUser !== undefined && this.props.fullScreenStatus ? 
                                <div className="conference-toolbar-buttons">
                                    <FontAwesome 
                                        title="Normal View"
                                        name="compress"
                                        
                                        style={{cursor: 'pointer'}}
                                    />
                                    <p>Normal View</p>
                                </div> : 
                                <div className="conference-toolbar-buttons">
                                    <FontAwesome 
                                        title="Full Screen"
                                        name="expand"
                                        
                                        style={{cursor: 'pointer'}}
                                    />
                                    <p>Fullscreen</p>
                                </div>
                            }
                        </Col>

                        <Col xs={4} onClick={this.leaveSession}>
                            <div className="conference-toolbar-buttons">
                                <FontAwesome 
                                    title="Disconnect"
                                    name="power-off"
                                    
                                    style={{cursor: 'pointer'}}
                                />
                                <p>Leave</p>
                            </div>
                        </Col>

                    </Col>
                </Row>
            </div>
        );
    }
}
