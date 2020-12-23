import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';

var DetectRTC = require('detectrtc');


export default class CameraTest extends Component {
    constructor(props) {
        super(props);
        this.msg = "";
        this.state = {
            streamUri: "",
            temp: false
        }
        this.mediaStream = null;
        this.stopCameraTest = this.stopCameraTest.bind(this);
        this.getLocalCameraStream = this.getLocalCameraStream.bind(this);
        this.cameraSettingVid = null;
    }

    componentWillUnmount(){
        this.stopCameraTest();
    }

    stopCameraTest() {
        if (!this.state.streamUri) {
            return;
        }
        if (this.mediaStream) {
            if (this.mediaStream.getAudioTracks().length > 0) {
                this.mediaStream.getAudioTracks()[0].stop();
            }
            if (this.mediaStream.getVideoTracks().length > 0) {
                this.mediaStream.getVideoTracks()[0].stop();
            }
            this.mediaStream = null;
        }
        this.setState({ streamUri: null });
    }

    getLocalCameraStream() {
        if (this.state.streamUri) {
            this.stopCameraTest();
            return;
        }
        
        if (!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
            console.log("Webinar can't be stated on this device.No media found.")
            return;
        }
        if (this.msg) {
            this.msg = "";
            this.setState({ temp: !this.state.temp })
        }

        // console.log("Webinar Camera Test");
        let constraints = { audio: true, video: true }
        let _this = this;
        window.navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
                _this.mediaStream = stream;
                _this.setState({ streamUri: stream })
                _this.props.enumerateDevices();
            })
            .catch(function (error) {
                console.log("Error in fetching camera stream", error, error.name);
                _this.msg = "Your Browser does not have support for camera or Camera is being used by other Application, please close that application."
                if (error.name === 'NotAllowedError') {
                    _this.msg = "Please allow access to camera and microphone to start webinar session."
                }
                
                _this.setState({ temp: !_this.state.temp })
            })
    }

    

    render() {
        return (
            <div style={{textAlign:"center"}}>
                {this.props.getDeviceListDropDown(this.props.cameraDeviceList)}
                {   
                    this.state.streamUri ?
                        <div>
                            <ReactPlayer 
                                controls={false}
                                width={320}
                                height={240}
                                volume={0}
                                url={this.state.streamUri}
                                playing={true}
                                style={{margin:"10px auto"}}
                            />
                        </div>
                        :
                        <div 
                            style={{ backgroundColor: "#333", width: "320", height: "240", color: "white", margin:"10px auto" }}>
                            {this.msg}
                        </div>
                }
                <Button style={{margin:"10px auto", display: "block" }}
                    className="refier_custom_button_new_selected_2" 
                    onClick={this.getLocalCameraStream}>
                    {this.state.streamUri ? "Stop" : "Test Camera"}
                </Button>
            </div>
        );
    }
}


