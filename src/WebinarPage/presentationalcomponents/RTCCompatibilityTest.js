import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
var DetectRTC = require('detectrtc');

import firefox from '../../images/mentor_dashboard_page/firefox.jpg'
import chrome from '../../images/mentor_dashboard_page/chrome.jpg'
import permission_step1 from '../../images/mentor_dashboard_page/permission_step1.png'
import permission_step2 from '../../images/mentor_dashboard_page/permission_step2.png'


export default class RTCCompatibilityTest extends Component{
    constructor(props){
        super(props);
        this.state = {statusChanged : false}
        
        let OV = new OpenVidu();
        this.isSystemRequirementFulfilled = OV.checkSystemRequirements();
        this.isScreenSharingCapabilities = OV.checkScreenSharingCapabilities();
        this.checkIfRecommendedBrowser = this.checkIfRecommendedBrowser.bind(this)
        this.checkMicrophonePermissions = this.checkMicrophonePermissions.bind(this)
        this.checkCameraPermissions = this.checkCameraPermissions.bind(this)
        this.allowMic = this.allowMic.bind(this)
        this.allowCamera = this.allowCamera.bind(this)
    }

    checkIfRecommendedBrowser(browser, osName) {
        if( browser.isChrome ||
            browser.isFirefox ||
            browser.isSafari ){
                return true
            }else {
                return false
            }
    }

    allowMic() {
        let that = this
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            console.log('Mic Access Allowed!', that)
            that.setState({statusChanged: !that.state.statusChanged})
        })
        .catch(function(err) {
            console.log('No mic access given!', err)
        });
    }

    allowCamera() {
        let that = this
        var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
        var constraints = {
            audio: false,
            video: {
                facingMode: facingMode
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
        .then(function success(stream) {
            console.log('Camera Access Allowed!', that)
            that.setState({statusChanged: !that.state.statusChanged})
            // video.srcObject = stream;
        })
        .catch(function(err) {
            console.log('No camera access given!', err)
        });
    }

    checkMicrophonePermissions(browser) {
        navigator.permissions.query(
            { name: 'microphone' }
        ).then(function(permissionStatus) {
            // granted, denied, prompt
            console.log(permissionStatus.state); 

            let message = null

            if(permissionStatus.state === 'granted') {
                message = null
            } else if (permissionStatus.state === 'denied') {
                message = (
                    `<div class="custom-warning-alert" style="margin-top: 10px; font-size: 1em; display: flex; flex-direction: column">
                        The browser has blocked access to Microphone. Refer to steps below to allow use of microphone. 
                    </div>`
                )
            } else {
                message = (
                    `<div class="custom-warning-alert" style="margin-top: 20px; font-size: 1em; display: flex; flex-wrap: wrap">
                        Please allow Microphone Access to the site. 
                        <button style="margin-left: 15px; cursor: pointer;" class="refier_custom_button_save">
                            Allow Mic Access</button>
                    </div>`
                )
            }

            let micMessageElement = document.querySelector('.microphone-message')
            if(micMessageElement)
                micMessageElement.innerHTML = message

            permissionStatus.onchange = function(){
                console.log("Permission changed to " + this.state);
            }
        })
    }

    checkCameraPermissions(browser) {
        navigator.permissions.query(
            { name: 'camera' }
        ).then(function(permissionStatus) {
            // granted, denied, prompt
            console.log(permissionStatus.state); 

            let message = null

            if(permissionStatus.state === 'granted') {
                message = null
            } else if (permissionStatus.state === 'denied') {
                message = (
                    `<div class="custom-warning-alert" style="margin-top: 10px; font-size: 1em; display: flex; flex-direction: column">
                        The browser has blocked access to Camera. Refer to steps below to allow use of Camera. 
                    </div>`
                )
            } else {
                message = (
                    `<div class="custom-warning-alert" style="margin-top: 20px; font-size: 1em; display: flex; flex-wrap: wrap">
                        Please allow Camera Access to the site. 
                        <button class="refier_custom_button_save" style="margin-left: 15px; cursor: pointer;">
                            Allow Camera Access</button>
                    </div>`
                )
            }

            let cameraMessageElement = document.querySelector('.camera-message')
            if(cameraMessageElement)
                cameraMessageElement.innerHTML = message

            permissionStatus.onchange = function(){
                console.log("Permission changed to " + this.state);
            }
        })
    }

    getCompatibilityInfo() {
        DetectRTC.load(function () {
        });
        console.log("isSystemRequirementFulfilled::", this.isSystemRequirementFulfilled);
        console.log("isScreenSharingCapabilities::", this.isScreenSharingCapabilities);

        let CompatibilityInfo = []
        
        if(!this.checkIfRecommendedBrowser(DetectRTC.browser, DetectRTC.osName)) { 
            CompatibilityInfo.push(
                <div style={this.props.fromWebinar ? 
                    { margin: "5px", fontSize: '16px' } : { margin: "5px"}}
                    className="custom-warning-alert">Please use the recommended browser to view webinar. Open the provided link in either 
                        <br/><br/>
                        <img src={chrome} style={{width: '60px', height: '60px', marginRight: '10px'}} alt="chrome_logo" />
                        <b>Chrome</b> or 
                        <br/><br/>
                        <img src={firefox} style={{width: '60px', height: '60px', marginRight: '10px'}} alt="firefox_logo" />
                        <b>Firefox</b> browser.
                </div>)

            return CompatibilityInfo
        }

        if (DetectRTC.isWebRTCSupported === false) {
            CompatibilityInfo.push(<div key={0} style={this.props.fromWebinar ? 
                { margin: "5px", fontSize: '16px' } : { margin: "5px"}}
                className="custom-warning-alert">Please use Chrome or Firefox (Scroll down to check the versions we support.). If you are already using one, Please UPDATE.</div>)
        }
        else {
            if(this.props.isPresenter) {
                if(DetectRTC.hasWebcam === false) {
                    CompatibilityInfo.push(<div style={this.props.fromWebinar ? 
                        { margin: "5px", fontSize: '16px' } : { margin: "5px"}}
                        className="custom-warning-alert">Please install an external webcam device.</div>)
                }
    
                if (DetectRTC.hasMicrophone === false) {
                    CompatibilityInfo.push(<div style={this.props.fromWebinar ? 
                        { margin: "5px", fontSize: '16px' } : { margin: "5px"}}
                        className="custom-warning-alert">Please install an external microphone device.</div>)
                }
    
                if (DetectRTC.hasSpeakers === false && (DetectRTC.browser.name === 'Chrome' || DetectRTC.browser.name === 'Edge')) {
                    CompatibilityInfo.push(<div style={this.props.fromWebinar ? 
                        { margin: "5px", fontSize: '16px' } : { margin: "5px"}}
                        className="custom-warning-alert">Oops, your system can not play audios.</div>)
                }
    
                if (DetectRTC.hasMicrophone === true && DetectRTC.isWebsiteHasMicrophonePermissions === false) {
                    CompatibilityInfo.push(<div style={this.props.fromWebinar ? 
                        { margin: "5px", fontSize: '16px' } : { margin: "5px"}}
                        className="microphone-message" onClick={() => this.allowMic()}>
                            {this.checkMicrophonePermissions(DetectRTC.browser)}
                        </div>)
                }
    
                if (DetectRTC.hasWebcam === true && DetectRTC.isWebsiteHasWebcamPermissions === false) {
                    CompatibilityInfo.push(<div style={this.props.fromWebinar ? 
                        { margin: "5px", fontSize: '16px' } : { margin: "5px"}}
                        className="camera-message" onClick={() => this.allowCamera()}>
                            {this.checkCameraPermissions(DetectRTC.browser)}
                        </div>)
                }
            }

            if(!this.checkIfRecommendedBrowser(DetectRTC.browser, DetectRTC.osName)) { 
                CompatibilityInfo.push(<div style={this.props.fromWebinar ? 
                    { margin: "5px", fontSize: '16px' } : { margin: "5px"}}
                    className="custom-warning-alert">Please use Chrome or Firefox browser to view the webinar.</div>)
            }

        }

        if (CompatibilityInfo.length == 0) {
            CompatibilityInfo.push(<div key={6}  style={this.props.fromWebinar ? 
                { margin: "5px", fontSize: '16px' } : { margin: "5px"}}
                    className="custom-info-alert">Your device is compatible for Webinar. Click "Proceed" button to continue</div>)
        } else {
            CompatibilityInfo.push(<div style={this.props.fromWebinar ? 
                { margin: "5px", fontSize: '16px' } : { margin: "5px"}}
                className="refier-tech-support-message">
                    <div style={{fontFamily: 'Roboto', marginTop: '30px'}}>
                        Steps to provide permission to camera/microphone or both:
                        <br/><br/>1. Click on the <b>"Lock"</b> icon located on the right most side of address bar
                        <br/><br/>
                        <img src={permission_step1} style={{width: '100%', height: 'auto', marginRight: '10px'}} 
                            alt="Allow Mic/Cam Permission Steps" />
                        <br/><br/><br/>
                        2. Check under permissions, if it says <b>blocked</b>, kindly change that to <b>allow</b>
                        <br/><br/>
                        <img src={permission_step2} style={{width: '100%', height: 'auto', marginRight: '10px'}} 
                            alt="Allow Mic/Cam Permission Steps" />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', fontFamily: 'Roboto', marginTop: '30px'}}>
                        <span>
                            If you still face issues, message us on our <b>Whatsapp Tech Support Group</b> for quick problem resolution or <b>email us at info@refier.com</b>
                        </span>
                        <a style={{margin: '0 auto', padding: '8px 12px', marginTop: '20px',
                            borderRadius: '30px', border: 'solid 1px', textAlign: 'center'}} 
                            href="https://chat.whatsapp.com/LFmDrV7ldgTH6PYUf2QSZU" target="__blank"> 
                            Click here to message our Tech Support 
                        </a>
                    </div>
                </div>)
        }

        return CompatibilityInfo
    }

    render() {

        return (
            <div>{this.getCompatibilityInfo()}</div>
        )
    }
}