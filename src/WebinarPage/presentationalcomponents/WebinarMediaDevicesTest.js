
import React, { Component } from 'react';
import { Button, Modal, Col, Grid } from 'react-bootstrap';

import CameraTest from './CameraTest'
import AudioMeter from './AudioMeter'
import GetDevices from './GetDevices.js'
import CheckScreenSharePlugin from '../conditionalcomponents/CheckScreenSharePlugin';
import SupportedBrowserInfo from './SupportedBrowserInfo';
import RTCCompatibilityTest from './RTCCompatibilityTest';
import FontAwesome from 'react-fontawesome';


class WebinarMediaDevicesTestModal extends Component {
    constructor(props) {
        super(props)
        this.state = { deviceList: {} }
        this.getDeviceListDropDown = this.getDeviceListDropDown.bind(this);
        this.enumerateDevices = this.enumerateDevices.bind(this);
        
    }

    componentDidMount(){
        this.enumerateDevices();
    }

    getDeviceListDropDown(deviceList) {
        let self = this;
        console.log("getMediaTestModal 2 :: ", deviceList)
        let isDeviceListAvailable = false;
        if(!deviceList){
            return (
                <select className="form-control">
                    <option disabled={true} selected={true}>Please allow camera and microphone access for webinar( Click on Test Camera)</option>
                </select>
            )
        }
        let options = deviceList.map((device, i) => {
                if(!device.label && !device.deviceId){
                    return null;
                }
                isDeviceListAvailable = true;
                return (
                    <option key={i} style={{ 'color': 'black', backgroundColor: 'white' }} name={device.deviceId} >{device.label}</option>
                )
        })
        if(isDeviceListAvailable){
            return (
                <select className="form-control">
                    {options}
                </select>
            )
        }else{
            return (
                <select className="form-control">
                    <option disabled={true} selected={true}>Please allow camera and microphone access for webinar</option>
                </select>
            )
        }
        
    }

    enumerateDevices() {
        let self = this;
        GetDevices.getDevices()
            .then(function (data) {
                self.setState({ deviceList: data })
            })
    }

    getMediaTestModal() {
        return (
            <div className={this.props.isPresenter ? 
                "container settings-modal" : "container-fluid settings-modal"}>
                <div style={{marginTop: '20px'}}>
                    <p className="webinar-test-modal-subtitle">
                        <span style={{ background: "#ffffff" }}>Webinar Compatibility</span>
                    </p>
                    <RTCCompatibilityTest isPresenter={this.props.isPresenter} fromWebinar={true}/>
                </div>
                {this.props.isPresenter ?
                    <div style={{marginTop: '50px'}}>
                        <br />
                        <p className="webinar-test-modal-subtitle">
                            <span style={{ background: "#ffffff", fontWeight: 900 }}>
                                <span>{"  Step 1 : "}</span>
                                Camera Settings

                            </span>
                        </p>
                        <CameraTest getDeviceListDropDown={this.getDeviceListDropDown}
                            cameraDeviceList={this.state.deviceList ? this.state.deviceList.videoInputDevices : null}
                            enumerateDevices={this.enumerateDevices}>
                        </CameraTest>
                    </div>
                    :
                    null}
                {this.props.isPresenter ?
                    <div style={{marginTop: '30px'}}>
                        <br />
                        <p className="webinar-test-modal-subtitle">
                            <span style={{ background: "#ffffff", fontWeight: 900 }}>
                                <span>{"  Step 2 : "}</span>
                                Audio Settings

                            </span>
                        </p>
                        <AudioMeter audioInputDeviceList={this.state.deviceList ? this.state.deviceList.audioInputDevices : null}
                            audioOutputDeviceList={this.state.deviceList ? this.state.deviceList.audioOutputDevices : null}
                            getDeviceListDropDown={this.getDeviceListDropDown}
                            enumerateDevices={this.enumerateDevices}
                        ></AudioMeter>
                    </div>
                    :
                    null}
                {this.props.isPresenter ?
                    <div style={{marginTop: '30px'}}>
                        <br />
                        <p className="webinar-test-modal-subtitle">
                            <span style={{ background: "#ffffff", fontWeight: 900 }}>
                                <span>{"  Step 3 :  "}</span>
                                Screenshare Settings
                            </span>
                        </p>
                        <br />
                        <CheckScreenSharePlugin fromSettings={true} />
                    </div>
                    :
                    null}
                <br />
                <div style={{marginTop: '30px'}}>
                    <p className="webinar-test-modal-subtitle">
                        <span style={{ background: "#ffffff" }}>Browser Compatibility</span>
                    </p>
                    <SupportedBrowserInfo />
                </div>
            </div>
        )
    }

    render() {
        return (
            <Modal show={this.props.showSettingModal} onHide={this.props.close}
                className={this.props.isPresenter ? "custom-map-modal" : null}
                bsSize={this.props.size ? this.props.size : null}>
                <Modal.Header className={this.props.headingStyle ? 
                    this.props.headingStyle : "settings-modal-header"}>
                    <div className={this.props.isPresenter ? "container" : "container-fluid"}>
                        <Col xs={5} sm={8} className="refier_modal_header_dark_content"
                            style={{ textAlign: "left", fontWeight: 'bold' }}>
                            Settings</Col>
                        <Col xs={6} sm={4} style={{ textAlign: "right" }}>
                            <Button onClick={this.props.close}
                                style={{ "fontWeight": 600 }}
                                className="refier_custom_button_save">
                                {this.props.isPresenter ? "Proceed" : null}
                                <FontAwesome
                                    name={this.props.isPresenter ? "arrow-right" : "close"}
                                    style={{ "display": "inline-block", 
                                                "marginLeft": this.props.isPresenter ? "10px" : 0 }} />
                            </Button>
                        </Col>
                    </div>
                    <div className={this.props.isPresenter ? "container" : "container-fluid"}
                        style={{marginTop:"5px"}}>
                    <Col xs={8}>
                        <a href={"https://sites.google.com/view/refierhelp/home"} 
                            target="_blank" className="refier_custom_link">
                            Facing an issue? Click to check the help document.
                        </a>
                    </Col>
                    </div>
                </Modal.Header>
                {/* <Modal.Body style={{ maxHeight: "80vh", overflow: "auto", backgroundColor: 'white' }}> */}
                <Modal.Body style={{ overflow: "auto", backgroundColor: 'white' }} className="settings-modal-wrapper">
                    {this.getMediaTestModal()}
                </Modal.Body>
                {/* {this.props.hideFooter ? null :
                    <Modal.Footer style={{ borderTop: "1px solid #f2f2f2" }}>
                        
                    </Modal.Footer>
                } */}
            </Modal>
        );
    }
}


export default WebinarMediaDevicesTestModal;