import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import RTCCompatibilityTest from '../../WebinarPage/presentationalcomponents/RTCCompatibilityTest'
import CameraTest from '../../WebinarPage/presentationalcomponents/CameraTest'
import AudioMeter from '../../WebinarPage/presentationalcomponents/AudioMeter'
import CheckScreenSharePlugin from '../../WebinarPage/conditionalcomponents/CheckScreenSharePlugin';
import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';


export default class WebinarTour extends Component {

    render() {
        console.log('WebinarTour:: props', this.props);
        
        return (
            <div className="refier-introform" style={{marginTop: '60px', paddingBottom: '50px'}}>
                <Grid>
                    <Row>
                        <p  style={{textAlign: 'center', marginTop: '30px', fontSize: '24px'}}
                            className="intro_form_modal_heading_title">
                            Welcome {this.props.userName}!
                            <p className="intro_form_modal_heading_desc" 
                                style={{textAlign: 'center'}}>
                                Let's test your device's compatibility for Webinar
                            </p>
                        </p>
                    </Row>
                    <Row style={{marginTop: '30px'}}>
                        <Col xs={12} style={{marginBottom: '20px'}}>
                            <div style={{background: '#fff', padding: '20px'}}>
                                <p className="rtc-text-box">
                                    <span>Webinar Compatibility</span>
                                </p>
                                <RTCCompatibilityTest fromWebinar={true}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div style={{background: '#fff', padding: '20px'}}>
                                <p className="rtc-text-box">
                                    <span>Test Your Camera</span>
                                </p>
                                <CameraTest getDeviceListDropDown={this.props.getDeviceListDropDown}
                                    cameraDeviceList={this.props.deviceList ? 
                                        this.props.deviceList.videoInputDevices : null}
                                    enumerateDevices={this.props.enumerateDevices}
                                    fromWebinar={true} >
                                </CameraTest>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div style={{background: '#fff', padding: '20px'}}>
                                <p className="rtc-text-box">
                                    <span>Test Your Audio</span>
                                </p>
                                {this.props.getDeviceListDropDown(this.props.deviceList ? 
                                    this.props.deviceList.audioInputDevices : null)}
                                <AudioMeter 
                                    audioInputDeviceList={this.props.deviceList ? 
                                        this.props.deviceList.audioInputDevices : null}
                                    audioOutputDeviceList={this.props.deviceList ? 
                                        this.props.deviceList.audioOutputDevices : null}
                                    getDeviceListDropDown={this.props.getDeviceListDropDown}
                                    enumerateDevices={this.props.enumerateDevices}>
                                </AudioMeter>
                            </div>
                            <div style={{background: '#fff', padding: '20px', marginTop: '25px'}}>
                                <p className="rtc-text-box">
                                    <span>Screensharing Test</span>
                                </p>
                                <CheckScreenSharePlugin fromSettings={true} />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div>
                            
                        </div>
                        <div>
                            <PrimaryButton
                                onButtonClick={this.props.close}
                                buttonText="Close"
                            />
                        </div>
                    </Row>
                </Grid>
            </div>
        );
    }
}