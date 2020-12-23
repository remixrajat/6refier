import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import { Col } from 'react-bootstrap';
import ConferenceSidebarController from './ConferenceSidebarController';
import OpenViduLayout from '../presentationalComponents/VideoRoomLayout';
import UserModel from '../UserModel';
import SocketConnection from '../../WebinarPage/SocketConnection';
import DialogExtensionComponent from '../presentationalComponents/dialog-extension/DialogExtension'
import ConferenceVideoToolbar from '../presentationalComponents/ConferenceVideoToolbar';
import VideoGridBoxController from './VideoGridBoxController';
import SessionErrorDialogBox from '../presentationalComponents/SessionErrorDialogBox';
import { PRESENTER, PRESENTER_PARTICIPANT, PRESENTER_MODERATOR, VIEWER, MODERATOR } from './action';
import { syncEventJoinedParticipants, 
    update_participats_details_of_ongoing_events,
    add_participants_to_ongoing_events } 
from '../../WebinarPage/conditionalcomponents/action';

import { DEV_ENV_FRONTEND,REFIER_SCREENSHARE_EXTENSION_URL, playNotificationSound } from '../../GlobalConstants';


class LiveConferenceController extends Component {
    constructor(props) {
        super(props);

        this.hasBeenUpdated = false;
        this.layout = new OpenViduLayout();
        let sessionName = this.props.sessionName ? this.props.sessionName : 'Session';
        this.ws = null;
        this.webRtcPeer = { webcam: null, screenshare: null };
        this.MEDIA = { WEBCAM: "webcam", SCREENSHARE: "screenshare", ALL: "all" }
        this.eventid = this.props.event_details.event_id;
        this.profileuserid = this.props.profileuserid;
        this.usertype = this.props.event_details && this.props.event_details.usertype;
        this.ADDUSEREVENT = "addedusertoevent";
        this.PUBLISHER = 'PUBLISHER';
        this.SUBSCRIBER = 'SUBSCRIBER';
        this.timeout = null
        this.intervalFunc = null
        this.localUser = new UserModel();
        this.ACTION = { SWITCH_CAMERA: 'switch-camera', SCREENSHARE: 'screenshare', SESSION_END: 'session-end' }
        this.CONNECTION_INTERUPPTED = {
            1: { status: "RECONNECTING", msg: "Slow Internet speed. Trying to reconnect ...", header: "Connection Interrupted" },
            2: { status: "DISCONNECTED", msg: "Unstable Network. Trying to reconnect ...", header: "Connection Lost" },
            5: { status: "RECONNECTED", msg: "Session Connected.", header: "Connection Status" },
        }
        // this.videoSourceId = true;
        this.devices = null;
        this.ASKTOSPEAK = "askquestion"

        this.state = {
            mySessionId: this.eventid,
            mySessionName: sessionName,
            session: undefined,
            localUser: undefined,
            subscribers: [],
            chatDisplay: 'none',
            fullScreenStatus: false,
            isLiveVideo: false,
            mainPresenterId: undefined,
            showExtensionDialog: false,
            connectionInterrupted: 0,
            showWebinarTour: false,
            isSubscriberPropsChanged: false,
            allPresenters: {},
            joinSessionButtonDisabled: false,
            videoSourceId: null,
            maxPresenterParticipants: 16,
            maxPresenterModerators: 2,
            isCamOn:false,
            isMicOn:false,
            isCamDisabled:true,
            isMicDisabled:true,
            isRaiseHandAllowed: true,
            speakQueue: [],
            speakWaitingQueue: [],
            maxParticipantSpeak: 4,
            queueUpdated: false,
            isUserInSpeakQueue: false,
            notificationMessage: '',
            showParticipantVideoOption: false,
            showActionBar: false,
            showChat: false,
            showAttendees: true,
            presenterParticipantList: [],
            currentSpeakerId: '',
            isLightOff: false,
            disableLightSwitch: false,
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.nicknameChanged = this.nicknameChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.closeDialogExtension = this.closeDialogExtension.bind(this);
        this.checkNotification = this.checkNotification.bind(this);
        this.connectWebCam = this.connectWebCam.bind(this);
        this.createConnection = this.createConnection.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.ws_onmessagehandler = this.ws_onmessagehandler.bind(this);
        this.videoContainerInFocus = this.videoContainerInFocus.bind(this);
        this.videoContainerOutOfFocus = this.videoContainerOutOfFocus.bind(this);
        this.getActionBarState = this.getActionBarState.bind(this);
        this.toggleActionBarState = this.toggleActionBarState.bind(this);
        this.subscribeToSessionDisconnected = this.subscribeToSessionDisconnected.bind(this);
        this.closeWebinarTour = this.closeWebinarTour.bind(this);
        this.addSessionSubscriberToPresenters = this.addSessionSubscriberToPresenters.bind(this);
        this.switchCamera = this.switchCamera.bind(this);

        this.setMaxPresenterParticipants = this.setMaxPresenterParticipants.bind(this);
        this.setMaxPresenterModerators = this.setMaxPresenterModerators.bind(this);
        this.setCamOn = this.setCamOn.bind(this);
        this.setCamOff = this.setCamOff.bind(this);
        this.setMicOn = this.setMicOn.bind(this);
        this.setMicOff = this.setMicOff.bind(this);
        this.setMicDisabled = this.setMicDisabled.bind(this);
        this.setMicEnabled = this.setMicEnabled.bind(this);
        this.setCamEnabled = this.setCamEnabled.bind(this);
        this.setCamDisabled = this.setCamDisabled.bind(this);
        this.allowRaiseHand = this.allowRaiseHand.bind(this);
        this.disallowRaiseHand = this.disallowRaiseHand.bind(this);
        this.addParticipantToSpeakQueue = this.addParticipantToSpeakQueue.bind(this);
        this.addParticipantToSpeakWaitQueue = this.addParticipantToSpeakWaitQueue.bind(this);
        this.givePermissionToSpeak = this.givePermissionToSpeak.bind(this);
        this.askToSpeakReceiver = this.askToSpeakReceiver.bind(this);
        this.sendNotification = this.sendNotification.bind(this);
        this.startAudioForParticipant = this.startAudioForParticipant.bind(this);
        this.setMaxParticipantSpeak = this.setMaxParticipantSpeak.bind(this);
        this.removeFromSpeakQueue = this.removeFromSpeakQueue.bind(this);
        this.switchLightOn = this.switchLightOn.bind(this);
        this.switchLightOff = this.switchLightOff.bind(this);
        this.muteAllParticipants = this.muteAllParticipants.bind(this);
        this.unmuteAllParticipants = this.unmuteAllParticipants.bind(this);
        this.allowCamAccess = this.allowCamAccess.bind(this);
        this.revokeCamAccess = this.revokeCamAccess.bind(this);

        if(this.props.token) {
            this.ws = SocketConnection.getConnectionInstance(this.props.token);

            this.ws.off(this.ASKTOSPEAK);
            this.ws.on(this.ASKTOSPEAK, this.askToSpeakReceiver);
        }
    }

    componentWillMount() {
        if (this.props.token) {
            // this.usertype = this.props.event_details && this.props.event_details.usertype;
            this.createConnection(this.props.token);
        }

        let nav = window.navigator;
        let conn = "";
        
        if (nav.connection) {
            conn = {
                downlink: nav.connection.downlink,
                effectiveType: nav.connection.effectiveType,
                rtt: nav.connection.rtt,
            }
        }
        const browser = {
            appVersion: nav.appVersion,
            connection: conn,
            language: nav.language,
            platform: nav.platform,
            userAgent: nav.userAgent,

        }

        let params = { eventid: this.eventid, browser , userType : this.props.usertype }
        this.props.dispatch(add_participants_to_ongoing_events(params));
        this.props.dispatch(syncEventJoinedParticipants(params)); // get all joined participants

        if(this.props.event_details && this.props.event_details['externalURL'] 
            && this.props.event_details['externalURL'].trim() !== '') {
            window.location.href = this.props.event_details['externalURL'];
        }

        this.setState({
            mySessionName: this.props.event_details.sessionTitle,
        })
        // this.usertype = this.props.event_details.usertype;
        /*
        event_config
        {
            is_cam_on_presenter_moderater: true
            is_cam_on_presenter_participant: false
            is_mic_on_presenter_moderater: true
            is_mic_on_presenter_participant: true
            is_participants_controlled: true
            is_raise_hand_allowed: true
            is_recording: true
            max_presenter_moderator: 2
            max_presenter_participant: 20
            recording: "MANUAL"
        }
        
            'viewer': 'SUBSCRIBER',
            'moderator':'SUBSCRIBER',
            'presenter':'PUBLISHER',
            'presenter_moderator':'PUBLISHER',
            'presenter_participant':'PUBLISHER'
        
        */

        this.setMaxPresenterModerators(this.props.event_config.max_presenter_moderator);
        this.setMaxPresenterParticipants(this.props.event_config.max_presenter_participant);
        
        if(this.props.event_details.usertype === VIEWER || this.props.event_details.usertype === MODERATOR){
            if(!this.props.event_config){
                return;
            }
            // this.setCamOff();
            this.setCamDisabled();
            // this.setMicOff();
            this.setMicDisabled();    
            console.log("componentWillMount : ", this.props.event_details.usertype,1);    
        }else if(this.props.event_details.usertype === PRESENTER){
            if(!this.props.event_config){
                return;
            }
            this.setCamOn();
            this.setMicOn();
            this.setCamEnabled();
            this.setMicEnabled();
            console.log("componentWillMount : ", this.props.event_details.usertype,2);
        }else if(this.props.event_details.usertype === PRESENTER_PARTICIPANT){
            if(!this.props.event_config){
                return;
            }
            this.setMicDisabled();
            // this.setCamDisabled();
            if(this.props.event_config.is_cam_on_presenter_participant){
                this.setCamEnabled();
            } else {
                this.setCamDisabled();

            }
            console.log("componentWillMount : ", this.props.event_details.usertype,3, this.props.event_config);

        }else if(this.props.event_details.usertype === PRESENTER_MODERATOR){
            if(!this.props.event_config){
                return;
            }
            if(this.props.event_config.is_mic_on_presenter_moderater){
                this.setMicOn();
                this.setMicEnabled();
            }else{
                this.setMicDisabled();
            }
            if(this.props.event_config.is_cam_on_presenter_participant){
                this.setCamOn();
                this.setCamEnabled();
            }else{
                this.setCamDisabled();
            }
            console.log("componentWillMount : ", this.props.event_details.usertype,4);
        }
    }

    componentDidMount() {
        const openViduLayoutOptions = {
            maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
            minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
            fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
            bigClass: 'OV_big', // The class to add to elements that should be sized bigger
            bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
            bigFixedRatio: false, // fixedRatio for the big ones
            bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
            bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
            bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
            animate: true, // Whether you want to animate the transitions
        };

        // this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
        window.addEventListener('beforeunload', this.onbeforeunload);
        document.addEventListener('fullscreenchange', this.exitFullscreenEscapeKey);
        document.addEventListener('webkitfullscreenchange', this.exitFullscreenEscapeKey);
        document.addEventListener('mozfullscreenchange', this.exitFullscreenEscapeKey);
        document.addEventListener('MSFullscreenChange', this.exitFullscreenEscapeKey);

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.event_details && nextProps.event_details['externalURL']
            && nextProps.event_details['externalURL'].trim() !== '') {
            window.location.href = nextProps.event_details['externalURL'];
        }

        if(nextProps.eventAttendeesSpeakQueue && nextProps.eventAttendeesSpeakQueue.length > 0) {
            if(this.state.speakQueue && this.state.speakQueue.length === 0) {
                let speakQueue = nextProps.eventAttendeesSpeakQueue
                this.setState({ speakQueue })
            } 
        }
    }

    componentWillUnmount() {
        this.ws.off("message");
        this.ws.off(this.ADDUSEREVENT);
        this.ws.off("reconnect");
        this.ws.off('connect_error');
        window.removeEventListener('beforeunload', this.onbeforeunload);
        this.leaveSession();
        SocketConnection.closeSocketConnection();
        this.ws = null;
        console.log("Unmounting LiveConferenceController");
    }

    setMaxPresenterParticipants(count) {
        this.setState({maxPresenterParticipants: count})
    }

    setMaxPresenterModerators(count) {
        this.setState({maxPresenterModerators: count})
    }

    setMaxParticipantSpeak(count) {
        this.setState({maxParticipantSpeak: count})
    }

    switchLightOff(isStart=false) {
        if(!isStart) {
            let msg = {eventid: this.eventid, userId: this.props.myUserId, isLightOff: true}
            this.ws.emit(this.ASKTOSPEAK, JSON.stringify(msg));
        } else {
            this.props.dispatch({ type: 'SWITCH_LIGHT_OFF', data: true })
            this.setState({isLightOff: true, disableLightSwitch: true}, () => {
                let elem = document.querySelector('.conference-screen-wrapper')
                let i = 0;
    
                this.intervalFunc = window.setInterval(() => {
                    if(i <= 0.6) {
                        i = i + 0.01
                        elem.style.background = `rgba(0, 0, 0, ${i})`
                    } else {
                        clearInterval(this.intervalFunc)
                        this.intervalFunc = null
                        this.setState({disableLightSwitch: false})
                    }
                }, 50)
            })
        }
    }

    switchLightOn(isStart=false) {
        if(!isStart) {
            let msg = {eventid: this.eventid, userId: this.props.myUserId, isLightOn: true}
            this.ws.emit(this.ASKTOSPEAK, JSON.stringify(msg));
        } else {
            this.props.dispatch({ type: 'SWITCH_LIGHT_OFF', data: false })
            this.setState({isLightOff: false, disableLightSwitch: true}, () => {
                let elem = document.querySelector('.conference-screen-wrapper')
                let i = 0.6;

                this.intervalFunc = window.setInterval(() => {
                    if(i >= 0) {
                        i = i - 0.01
                        elem.style.background = `rgba(0, 0, 0, ${i})`
                        // elem.style.background = `rgba(248, 248, 248, ${i})`
                    } else {
                        clearInterval(this.intervalFunc)
                        this.intervalFunc = null
                        this.setState({disableLightSwitch: false})
                    }
                }, 50)
            })
        }
    }

    setCamOn() {
        this.setState({isCamOn: true})
    }

    setCamOff() {
        this.setState({isCamOn: false})
    }

    setMicOn() {
        this.setState({isMicOn: true})
    }

    setMicOff() {
        this.setState({isMicOn: false})
    }

    setCamEnabled(){
        this.setState({isCamDisabled: false})
    }

    setCamDisabled(){
        this.setState({isCamDisabled: true, isCamOn: false})
    }


    setMicDisabled(){
        this.setState({isMicDisabled: true, isMicOn:false})
    }

    setMicEnabled(){
        this.setState({isMicDisabled: false})
    }

    allowRaiseHand() {
        this.setState({isRaiseHandAllowed: true})
    }

    disallowRaiseHand() {
        this.setState({isRaiseHandAllowed: false})
    }


    onbeforeunload(event) {
        this.leaveSession();
    }

    createConnection(token) {
        // check case for when new token comes in newprops
        // should it create a new connection with new token?
        this.ws = SocketConnection.getConnectionInstance(token)
        console.log('LiveConference::ws', this.ws)

        this.ws.on("connect", () => {
            this.setState({ errorMsg: [] });
        })

        this.ws.off("message");
        this.ws.off("reconnect");
        this.ws.off('connect_error');
        this.ws.off('leaveSessionResponse');
        this.ws.on("message", this.ws_onmessagehandler.bind(this));
        this.ws.on("reconnect", (attemptNumber) => { this.setState({ errorMsg: [] }) });
        let _errorhandler = this.errorhandler
        this.ws.on('connect_error', function (err) {
            console.error(err);
            // _errorhandler("Connecting ...");
        });
        this.ws.on('leaveSessionResponse', this.leaveSession);
    }

    async joinSession(force = false) {
        this.setState({ joinSessionButtonDisabled: true })
        if (this.OV && !force) {
            this.setState({ joinSessionButtonDisabled: false })
            return;
        }
        let self = this;
        if (!this.OV) {
            this.OV = new OpenVidu();
        }

        this.OV.setAdvancedConfiguration(
            {
                screenShareChromeExtension: REFIER_SCREENSHARE_EXTENSION_URL,
                publisherSpeakingEventsOptions: {
                    interval: 100,   // Frequency of the polling of audio streams in ms
                    threshold: -50  // Threshold volume in dB
                }
            }
        );
        if (!DEV_ENV_FRONTEND){
            this.OV.enableProdMode();
        }
        
        if (!this.devices) {
            this.devices = await this.OV.getDevices()
            console.log("joinSession device choose ", this.devices);
            for (let i = 0; i < this.devices.length; i++) {
                if (this.devices[i].kind.toLowerCase() === "videoinput" && this.devices[i].kind.toLowerCase() !== 'screen-capture-recorder') {
                    this.setState({ videoSourceId: this.devices[i] })
                    break;
                }
            }
        }



        this.setState(
            {
                session: this.OV.initSession(),
                connectionInterrupted: 0,
                subscribers: [],
            },
            () => {
                console.log('Usertype :: ', this.usertype)
                this.connectToSession();
                this.subscribeToStreamCreated();
            },
        );
    }

    connectToSession() {
        this.props.getToken(this.state.mySessionId).then((token) => {
            console.log('token received: ', token);
            this.connect(token);
        }).catch((error) => {
            if (this.props.error) {
                this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
            }
            this.setState({ joinSessionButtonDisabled: false })
        });
    }

    connect(token) {
        this.state.session
            .connect(
                token,
                {
                    clientData: this.props.myUserName,
                    clientUserId: this.props.myUserId,
                    userType: this.props.usertype
                },
            )
            .then(() => {
                this.setState({ joinSessionButtonDisabled: false })
                // this.addSessionSubscriberToPresenters()
                this.connectWebCam();
            })
            .catch((error) => {
                if (this.props.error) {
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                this.setState({ joinSessionButtonDisabled: false })
                alert('There was an error connecting to the session:', error.message);
                console.error('There was an error connecting to the session:', error.code, error.message);
            });
    }

    addSessionSubscriberToPresenters() {
        let subscribers = this.state.subscribers;
        let allPresenters = this.state.allPresenters;

        for (let subscriber of subscribers) {
            const userData = subscriber.streamManager.stream.connection.data.split('%')[0];
            allPresenters[JSON.parse(userData).clientUserId] = subscriber;
        }

        this.setState({ allPresenters })
    }

    connectWebCam() {
        console.log('connectWebCam :: ', this.state.session, this.props.usertype,
        this.props.userRole, this.props.presenter,this.state);
        let publisher = this.localUser.getStreamManager();

        if (this.props.userRole === this.PUBLISHER) {
            let publisherConstraints = {
                audioSource: true, 
                videoSource: this.props.usertype === PRESENTER 
                                ? this.state.videoSourceId.deviceId || undefined
                                : this.props.usertype === PRESENTER_PARTICIPANT && !this.state.isCamDisabled 
                                    ? undefined
                                    : null,
                publishAudio: this.state.isMicDisabled ? false : this.localUser.isAudioActive(),
                publishVideo: this.state.isCamDisabled ? false : this.localUser.isVideoActive(),
                resolution: '800x600',
                frameRate: 15,
                insertMode: 'APPEND',
                mirror: false,
                // facingMode: { exact: "user" }
            }

            console.log("publisherConstraints :: ", publisherConstraints)
            if (!publisher) {
                publisher = this.OV.initPublisher(undefined, publisherConstraints);

                console.log("publisherConstraints :: ", publisher, this.state.session.capabilities.publish)
                if(!publisher.accessAllowed && publisher.accessDenied){
                    console.log('accessDenied :: ', this.state.session.capabilities.publish, this.state.session );
                }
                publisher.off('accessAllowed');
                publisher.off('accessDenied');
                publisher.on('accessAllowed', (e)=>{
                    console.log('accessAllowed for camera and microphone',e);
                    
                    if(!this.state.isCamDisabled && this.props.usertype === PRESENTER_PARTICIPANT) {
                        this.camStatusChanged()
                        this.localUser.setAudioActive(false);
                        this.localUser.getStreamManager().publishAudio(this.localUser.isAudioActive());
                        this.sendSignalUserChanged({ isAudioActive: this.localUser.isAudioActive() });
                    } if(this.props.usertype === PRESENTER_PARTICIPANT) {
                        this.localUser.setAudioActive(false);
                        this.localUser.setVideoActive(false);
                        this.localUser.getStreamManager().publishAudio(this.localUser.isAudioActive());
                        this.sendSignalUserChanged({ isAudioActive: this.localUser.isAudioActive() });
                    }
                });
                publisher.on('accessDenied', (e)=>{
                    console.log('accessDenied for camera and microphone',e);
                    alert("Error  : Camera and Microphone access denied by user.")
                });

                // publisher.on('streamAudioVolumeChange', (event) => {
				// 	console.log('Publisher audio volume change from ' + event.value.oldValue + ' to' + event.value.newValue);
				// });
				
				// session.publish(publisher);
                            
                if (this.state.session.capabilities.publish) {
                    this.state.session.publish(publisher).then((e) => {
                        if (this.props.joinSession) {
                            this.props.joinSession();
                        }
                        try {
                            let audioTrack  = publisher.stream.getMediaStream() &&
                                                publisher.stream.getMediaStream().getAudioTracks() && 
                                                publisher.stream.getMediaStream().getAudioTracks()[0]
                            if(audioTrack) {
                                audioTrack.applyConstraints( {
                                    autoGainControl:false,
                                    echoCancellation: true,
                                    noiseSuppression:true,
                                    googEchoCancellation: false,
                                    googAutoGainControl: false,
                                    googAutoGainControl2: false,
                                    googNoiseSuppression: false,
                                    googHighpassFilter: false,
                                    googTypingNoiseDetection: false,  
                                }).catch((e)=>{
                                    console.log("failed to apply audio constraints")
                                })
                            }
                            console.log("publisher Audio Constraints :: ", audioTrack.getConstraints())
                        } catch(e) {
                            console.error("Error while applying constraints", e);
                        }
                    })
                }
                this.localUser.setStreamManager(publisher);
            } else {
                this.OV
                    .getUserMedia(publisherConstraints)
                    .then(mediaStream => {
                        return publisher.replaceTrack(mediaStream.getVideoTracks()[0]);
                    })
                    .catch((error) => console.error("Error while replacing camera track", error))

            }
        }
        this.localUser.setNickname(this.props.myUserName);
        this.localUser.setConnectionId(this.state.session.connection.connectionId);
        this.localUser.setScreenShareActive(false);
        this.localUser.setUserType(this.props.usertype);
        this.localUser.setUserId(this.props.profileuserid);
        this.subscribeToUserChanged();
        this.subscribeToPresenterParticipantChanged();
        this.subscribeToStreamDestroyed();
        this.subscribeToSessionDisconnected();
        
        this.sendSignalUserChanged({ isScreenShareActive: this.localUser.isScreenShareActive() });
        // if(this.props.usertype !== 'presenter' && this.props.usertype !== 'viewer') {
        //     this.localUser.setAudioActive(false);
        //     this.localUser.getStreamManager().publishAudio(this.localUser.isAudioActive());
        //     this.sendSignalUserChanged({ isAudioActive: this.localUser.isAudioActive() });
            // if(!this.state.isCamDisabled){
            //     // this.camStatusChanged()
            //     // this.localUser.setVideoActive(false);
            //     // this.localUser.getStreamManager() && this.localUser.getStreamManager().publishVideo(this.localUser.isVideoActive());
            //     // try {
            //     //     this.localUser.getStreamManager().publishVideo(false);
            //     // } catch(e) {
            //     //     console.error("Error while video publishing", e);
            //     // }

            //     // this.sendSignalUserChanged({ isVideoActive: this.localUser.isVideoActive() });
            // }
        // }
        
        // let allPresenters = this.state.allPresenters;
        // allPresenters[this.props.myUserId] = this.localUser;

        if (this.props.userRole === this.PUBLISHER) {
            this.setState({
                localUser: this.localUser,
                isLiveVideo: this.state.isCamOn,
                mainPresenterId: this.localUser.getStreamManager().stream.streamId,
                // allPresenters: allPresenters
            });
        } 
        this.setState({ isLiveVideo: true })
    }

    leaveSession(action = null) {
        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
            if (action === this.ACTION.SESSION_END) {
                this.emitLeaveEvent();
            }
        }

        if(this.localUser.getUserType() === PRESENTER_PARTICIPANT && 
            !(action !== null && action !== this.ACTION.SWITCH_CAMERA)) {
            // this.localUser.setAudioActive(false);
            // this.localUser.getStreamManager().publishAudio(this.localUser.isAudioActive());
            // this.sendSignalUserChanged({ isAudioActive: this.localUser.isAudioActive() });
            this.setState({ isUserInSpeakQueue: false, isMicDisabled: true });
            let msg = { eventid: this.eventid, userId: this.profileuserid, removeFromQueue: true }
            this.ws.emit(this.ASKTOSPEAK, JSON.stringify(msg));
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: null,
            subscribers: [],
            presenterParticipantList: [],
            localUser: null,
            isLiveVideo: false,
            allPresenters: {},
            isSubscriberPropsChanged: !this.state.isSubscriberPropsChanged,
            speakQueue: [],
            speakWaitingQueue: []
        });
        this.localUser.setStreamManager(null);
        this.localUser.setNickname(null);
        this.localUser.setScreenShareActive(false);
        this.localUser.setUserType(null);
        this.localUser.setUserId(null);
        this.localUser.setAudioActive(true);
        this.localUser.setVideoActive(true);
    }

    emitLeaveEvent() {
        if (this.props.userRole !== this.PUBLISHER) {
            return;
        }
        this.ws.emit('leaveSession', JSON.stringify({ eventid: this.state.mySessionId }));
    }

    camStatusChanged() {
        this.localUser.setVideoActive(!this.localUser.isVideoActive());
        this.localUser.getStreamManager().publishVideo(this.localUser.isVideoActive());
        this.sendSignalUserChanged({ isVideoActive: this.localUser.isVideoActive() });
        this.setState({ localUser: this.localUser });
    }

    micStatusChanged() {
        this.localUser.setAudioActive(!this.localUser.isAudioActive());
        this.localUser.getStreamManager().publishAudio(this.localUser.isAudioActive());
        this.sendSignalUserChanged({ isAudioActive: this.localUser.isAudioActive() });
        this.setState({ localUser: this.localUser });
    }

    nicknameChanged(nickname) {
        let localUser = this.state.localUser;
        localUser.setNickname(nickname);
        this.setState({ localUser: localUser });
        this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
    }

    deleteSubscriber(stream) {
        // let allPresenters = this.state.allPresenters
        // const userData = stream.connection.data.split('%')[0];
        // allPresenters[JSON.parse(userData).clientUserId] = undefined;

        let remoteUsers = this.state.subscribers;
        let userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            if(remoteUsers.length === 0) {
                let params = { eventid: this.eventid, user_id: this.profileuserid, add_to_speak_queue: false }
                let updateDetailPromise = this.props.dispatch(update_participats_details_of_ongoing_events(params))
                this.setState({
                    subscribers: remoteUsers,
                    isMicDisabled: true,
                    isMicOn: false,
                    isUserInSpeakQueue: false               
                });
            } else {
                this.setState({ subscribers: remoteUsers });
            }
        }
    }

    deleteParticipant(stream) {
        let remoteUsers = this.state.presenterParticipantList;
        let userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            this.setState({
                presenterParticipantList: remoteUsers,
            });
        }
    }

    subscribeToStreamCreated() {
        this.state.session.off('streamCreated');
        this.state.session.on('streamCreated', (event) => {
            console.log('streamCreated :: playing', event);
            const subscriber = this.state.session.subscribe(event.stream, undefined);
            let subscribers = this.state.subscribers;
            let presenterParticipantList = this.state.presenterParticipantList;
            // let allPresenters = this.state.allPresenters;

            subscriber.on('streamPlaying', (e) => {
                this.checkSomeoneShareScreen();
                this.setState({ connectionInterrupted: 0, isSubscriberPropsChanged: !this.state.isSubscriberPropsChanged })
                subscriber.videos[0].video.parentElement.classList.remove('custom-class');
            });

            const newUser = new UserModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setAudioActive(event.stream.audioActive);
            // newUser.setVideoActive(event.stream.videoActive);
            newUser.setType('remote');
            const connectionObj = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(connectionObj).clientData);
            newUser.setUserId(JSON.parse(connectionObj).clientUserId);
            newUser.setUserType(JSON.parse(connectionObj).userType);

            if(newUser.getUserType() === PRESENTER_PARTICIPANT)
                presenterParticipantList.push(newUser)
            else {
                playNotificationSound();
                subscribers.push(newUser);
            }

            // allPresenters[JSON.parse(connectionObj).clientUserId] = newUser;

            // this.setState({ subscribers: subscribers, allPresenters: allPresenters });
            this.setState({ 
                subscribers: subscribers, 
                presenterParticipantList
            });
        });

        
        this.state.session.off('publisherStartSpeaking');
        // this.state.session.off('publisherStopSpeaking');

        try {
            this.state.session.on('publisherStartSpeaking', (event) => {
                console.log('Publisher ' + event.connection.connectionId + ' start speaking');
                let userData = event.connection.data
                let parsedUserData = JSON.parse(userData)
                // console.log('currentspeaker', parsedUserData, this.state.currentSpeakerId)

                if(parsedUserData.clientUserId !== this.state.currentSpeakerId) {
                    this.setState({currentSpeakerId: parsedUserData.clientUserId})
                    let message = parsedUserData.clientData + " is speaking..."
                    this.sendNotification(message, 2000)
                }

            });
        } catch(e) {
            console.log('publisherStartSpeaking:: error', e)
        }

        // try {
        //     this.state.session.on('publisherStopSpeaking', (event) => {
        //         // console.log('Publisher ' + event.connection.connectionId + ' stop speaking');
        //     });
        // } catch(e) {
        //     console.log('publisherStopSpeaking :: error', e)
        // }
    }

    subscribeToStreamDestroyed() {
        // On every Stream destroyed...
        this.state.session.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            this.deleteSubscriber(event.stream);
            this.deleteParticipant(event.stream);
            this.setState({ isSubscriberPropsChanged: !this.state.isSubscriberPropsChanged })
            // setTimeout(() => {
            //     this.checkSomeoneShareScreen();
            // }, 20);
            event.preventDefault();
        });
    }

    subscribeToUserChanged() {
        this.state.session.on('signal:userChanged', (event) => {
            let remoteUsers = this.state.subscribers;
            // let allPresenters = this.state.allPresenters;

            if (!remoteUsers) {
                console.error('error occurred :: signal:userChanged :: ', event);
                return
            }

            console.log('remote', remoteUsers)

            remoteUsers.forEach((user) => {
                if (user.getConnectionId() === event.from.connectionId) {
                    const data = JSON.parse(event.data);
                    console.log('EVENTO REMOTE: ', event.data);
                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                    if (data.isScreenShareActive !== undefined) {
                        user.setScreenShareActive(data.isScreenShareActive);
                    }

                    // const userData = user.streamManager.stream.connection.data.split('%')[0];
                    // allPresenters[JSON.parse(userData).clientUserId] = user;
                }
            });
            this.setState(
                {
                    subscribers: remoteUsers,
                    isSubscriberPropsChanged: !this.state.isSubscriberPropsChanged,
                    // allPresenters: allPresenters
                },
                () => this.checkSomeoneShareScreen(),
            );
        });
    }

    subscribeToPresenterParticipantChanged() {
        this.state.session.on('signal:userChanged', (event) => {
            let remotePresenterParticipant = this.state.presenterParticipantList;

            if (!remotePresenterParticipant) {
                console.error('error occurred :: signal:userChanged :: ', event);
                return
            }
            remotePresenterParticipant.forEach((user) => {
                if (user.getConnectionId() === event.from.connectionId) {
                    console.log({ user })
                    const data = JSON.parse(event.data);
                    console.log('EVENTO REMOTE: ', event.data);
                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                    if (data.isScreenShareActive !== undefined) {
                        user.setScreenShareActive(data.isScreenShareActive);
                    }
                }
            });
            this.setState(
                {
                    presenterParticipantList: remotePresenterParticipant,
                    isSubscriberPropsChanged: !this.state.isSubscriberPropsChanged,
                },
                () => this.checkSomeoneShareScreen(),
            );
        });
    }

    subscribeToSessionDisconnected() {
        let self = this;

        this.state.session.on('sessionDisconnected', (event) => {
            console.log('sessionDisconnected emmited', event);
            if (event.reason === 'disconnect') {
                return;
            } else if (event.reason === 'networkDisconnect') {
                console.warn('Lost connection to the session');
                self.setState({ connectionInterrupted: 2 });
                self.leaveSession(); //change this to reconnect
                setTimeout(self.joinSession, 3000);
                return;
            } else if (event.reason === "openviduServerStopped") {
                console.error('You lost your connection to Refier Webinar');
            }
            self.leaveSession();
            self.setState({ connectionInterrupted: 2 });
        })


        this.state.session.on('reconnecting', (e) => {
            console.warn('Oops! Trying to reconnect to the session');
            self.setState({ connectionInterrupted: 1 });

        })
        this.state.session.on('reconnected', (e) => {
            console.log('Hurray! You successfully reconnected to the session');
            self.setState({ connectionInterrupted: 5 });
            setTimeout(() => self.setState({ connectionInterrupted: 0 }), 1500);
        })

    }


    sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        this.state.session.signal(signalOptions);
    }

    screenShare() {
        const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';

        let publisher = this.localUser.getStreamManager();

        this.OV.getUserMedia({
            videoSource: videoSource,
            publishAudio: this.localUser.isAudioActive(),
            resolution: '1280x980',
            mirror: false,
        }).then(mediaStream => {
            let videoTrack = mediaStream.getVideoTracks()[0];
            return videoTrack;
        }).then((track) => {
            console.log("this.localUser.getStreamManager()", this.localUser.getStreamManager());
            console.log("this.localUser.getStreamManager()", track);
            track.applyConstraints({ 
                frameRate: { ideal: 6, max: 10 },
                
            }).catch((e)=>{console.error("Failed toapply screenshare constaints")})
            track.onended = this.stopScreenShare
            return publisher.replaceTrack(track);
        }).then((event) => {
            this.localUser.setScreenShareActive(true);

            if(!this.localUser.videoActive)
                this.camStatusChanged()
            
            this.setState({ localUser: this.localUser }, () => {
                this.sendSignalUserChanged({ isScreenShareActive: this.localUser.isScreenShareActive() });
            });

        }).catch((error) => {
            console.error("Error while sharing screen", error);
            if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                this.setState({ showExtensionDialog: true });
            } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
                alert('Your browser does not support screen sharing. You can only screen share in desktop Chrome, Firefox or Opera');
            } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
                alert('Please enable screen sharing extension. If screen sharing extension is already enabled, please REFRESH the page.');
            } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
                alert('You have cancelled screen share. Please choose a window or application to share screen.');
            }
        })

        publisher.off('streamPlaying');

        publisher.on('streamPlaying', () => {
            publisher.videos[0].video.parentElement.classList.remove('custom-class');
            this.setState({ connectionInterrupted: 0 });
        });
    }

    closeDialogExtension() {
        this.setState({ showExtensionDialog: false });
    }

    stopScreenShare() {
        if(!this.localUser.videoActive)
            this.camStatusChanged()
        this.connectWebCam();
    }

    checkSomeoneShareScreen() {
        let isScreenShared;
        // return true if at least one passes the test
        isScreenShared = this.state.subscribers.some((user) => user.isScreenShareActive()) || this.localUser.isScreenShareActive();
        // const openviduLayoutOptions = {
        //     maxRatio: 3 / 2,
        //     minRatio: 9 / 16,
        //     fixedRatio: isScreenShared,
        //     bigClass: 'OV_big',
        //     bigPercentage: 0.8,
        //     bigFixedRatio: false,
        //     bigMaxRatio: 3 / 2,
        //     bigMinRatio: 9 / 16,
        //     bigFirst: true,
        //     animate: true,
        // };
        // this.layout.setLayoutOptions(openviduLayoutOptions);
        return isScreenShared;
    }


    checkNotification(event) {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }

    sendMessage(message) {
        let jsonMessage = JSON.stringify(message);
        this.ws.send(jsonMessage);
    }

    ws_onmessagehandler(message) {
        let webinarOptions = {
            usertype: this.usertype,
            profileuserid: this.profileuserid,
            eventid: this.eventid,
            id: 'connection'
        };
        let parsedMessage = JSON.parse(message);

        console.log('parsedMessage', parsedMessage)

        if (parsedMessage === undefined) {
            return;
        }

        switch (parsedMessage.id) {
            case 'connection':
                this.sendMessage(webinarOptions);
                break;
        }
    }

    videoContainerInFocus() {
        clearTimeout(this.timeout);
        document.getElementById('conference_stop_button').style.display = 'block'
    }

    videoContainerOutOfFocus() {
        this.timeout = setTimeout(() => {
            document.getElementById('conference_stop_button').style.display = 'none'
        }, 2000)
    }


    getActionBarState() {
        return this.state.showActionBar;
    }

    toggleActionBarState(toggleComponent) {
        if(toggleComponent === 'chat') {
            this.setState({
                showActionBar: this.state.showAttendees ? true : !this.getActionBarState(),
                showChat: true,
                showAttendees: false
            })
        } else if (toggleComponent === 'attendees') {
            this.setState({
                showActionBar: this.state.showChat ? true : !this.getActionBarState(),
                showAttendees: true,
                showChat: false
            })
        } else {
            this.setState({ 
                showActionBar: !this.getActionBarState(),
                showAttendees: false,
                showChat: false 
            })
        }
    }

    closeWebinarTour() {
        this.setState({ showWebinarTour: false })
    }

    switchCamera() {
        if (!this.devices) {
            return;
        }
        console.log("switchCamera ", this.devices);
        let self = this;
        for (let i = 0; i < this.devices.length; i++) {
            if (this.devices[i].kind.toLowerCase() === "videoinput" && this.devices[i].kind.toLowerCase() !== 'screen-capture-recorder') {
                console.log('changing device from ', this.state.videoSourceId, ' to ', this.devices[i]);
                if (this.state.videoSourceId.deviceId === this.devices[i].deviceId) {
                    continue;
                }
                console.log('changing device from 2 ', this.state.videoSourceId, ' to ', this.devices[i]);
                this.setState({ videoSourceId: this.devices[i] }, () => {
                    self.leaveSession(this.ACTION.SWITCH_CAMERA)
                    self.joinSession(true)
                });
                break;
            }
        }
    }

    startAudioForParticipant() {
        this.joinSession();
    }

    sendNotification(message, displayTime = 5000) {
        this.setState({notificationMessage: message}, 
            () => {
                setTimeout(() => this.setState({notificationMessage: ''}), displayTime)
            })
        // this.setMicEnabled();
    }
    
    givePermissionToSpeak(profileid) {
        let msg = { eventid: this.eventid, userId: profileid, 
                    allowSpeak: true, acknowledgement: true }

        this.ws.emit(this.ASKTOSPEAK, JSON.stringify(msg));
    }
    
    muteAllParticipants() {
        let msg = { eventid: this.eventid, userId: this.props.profileuserid, muteAudio: true }
        this.ws.emit(this.ASKTOSPEAK, JSON.stringify(msg));
    }
    
    unmuteAllParticipants() {
        let msg = { eventid: this.eventid, userId: this.props.profileuserid, unmuteAudio: true }
        this.ws.emit(this.ASKTOSPEAK, JSON.stringify(msg));
    }
    
    allowCamAccess(userId, camAllowed=false) {
        if(camAllowed) {
            let remoteUsers = this.state.presenterParticipantList;
            let remoteUsersSubs = this.state.subscribers;
            let userStream = remoteUsers.filter((user) => user.getUserId() === userId)[0];
            let index = remoteUsers.indexOf(userStream, 0);
            let videoUser = null

            if (index > -1) {
                videoUser = remoteUsers.splice(index, 1);
                remoteUsersSubs.push(videoUser[0])

                this.setState({
                    presenterParticipantList: remoteUsers,
                    subscribers: remoteUsersSubs,
                });
                // this.setCamEnabled();
                // this.connectWebCam()
            }
        } else {
            let msg = { eventid: this.eventid, userId: userId, allowCam: true }
            this.ws.emit(this.ASKTOSPEAK, JSON.stringify(msg));
        }
    }
    
    revokeCamAccess(userId, camRevoked=false) {
        if(camRevoked) {
            let remoteUsers = this.state.presenterParticipantList;
            let remoteUsersSubs = this.state.subscribers;
            let userStream = remoteUsersSubs.filter((user) => user.getUserId() === userId)[0];
            let index = remoteUsersSubs.indexOf(userStream, 0);
            let videoUser = null

            if (index > -1) {
                videoUser = remoteUsersSubs.splice(index, 1);
                remoteUsers.push(videoUser[0])

                this.setState({
                    presenterParticipantList: remoteUsers,
                    subscribers: remoteUsersSubs,
                });
                // this.setCamEnabled();
                // this.connectWebCam()
            }
        } else {
            let msg = { eventid: this.eventid, userId: userId, revokeCam: true }
            this.ws.emit(this.ASKTOSPEAK, JSON.stringify(msg));
        }
    }

    askToSpeakReceiver(event) {
        // console.log("askToSpeak ", event);

        let parsedMessage = JSON.parse(event);
        console.log("askToSpeak parsedMessage", {parsedMessage});

        if (parsedMessage.eventid !== this.props.pageId) {
            console.warn("Wrong Event Id.")
            return;
        }

        if(parsedMessage.acknowledgement) {
            if(parsedMessage.userId === this.profileuserid) {
                if(parsedMessage.allowSpeak) {
                    this.sendNotification('Presenter has allowed your use of audio. Use "Mic On/Off" from the toolbar below to mute (Mic Off) and speak (Mic On).')
                    this.localUser.setAudioActive(true);
                    this.localUser.getStreamManager().publishAudio(this.localUser.isAudioActive());
                    this.sendSignalUserChanged({ isAudioActive: this.localUser.isAudioActive() });
                    this.setState({ isMicDisabled: false, isMicOn: true, localUser: this.localUser });
                }
            }
        } else if (parsedMessage.revokeAudio) {
            let params = { eventid: this.eventid, user_id: parsedMessage.userId, add_to_speak_queue: false }
            let updateDetailPromise = this.props.dispatch(update_participats_details_of_ongoing_events(params))

            if(parsedMessage.userId === this.profileuserid) {
                this.sendNotification('Presenter has switched off your use of audio.')
                this.localUser.setAudioActive(false);
                this.localUser.getStreamManager().publishAudio(this.localUser.isAudioActive());
                this.sendSignalUserChanged({ isAudioActive: this.localUser.isAudioActive() });
                this.setState({ isUserInSpeakQueue: false, isMicDisabled: true, isMicOn: false, localUser: this.localUser });
            }
            if(this.usertype === PRESENTER) {
                let speakList = this.state.speakQueue
                let index = speakList.indexOf(parsedMessage.userId);

                if (index > -1) {
                    speakList.splice(index, 1);

                    // revoke speak permissions for removed participant
                    this.setState({ speakQueue: speakList })
                }
            }
        } else if (parsedMessage.removeFromQueue) {
            this.removeFromSpeakQueue(parsedMessage.userId)
        } else if (parsedMessage.isLightOff) {
            this.switchLightOff(true)
        } else if (parsedMessage.isLightOn) {
            this.switchLightOn(true)
        } else if (parsedMessage.muteAudio) {
            if(this.usertype === PRESENTER) {
                this.sendNotification('Participants have been muted')
                return true
            }

            if(this.usertype !== PRESENTER)
                this.sendNotification('Presenter has switched off your use of audio.')
                
            // mute only participants in queue
            // if(this.state.isUserInSpeakQueue) {
            //     this.localUser.setAudioActive(false);
            //     this.localUser.getStreamManager().publishAudio(this.localUser.isAudioActive());
            //     this.sendSignalUserChanged({ isAudioActive: this.localUser.isAudioActive() });
            // }

            // mute all participants
            // make common function for audio manipulation use try catch
            try{

                this.localUser.setAudioActive(false);
                this.localUser.getStreamManager().publishAudio(this.localUser.isAudioActive());
                this.sendSignalUserChanged({ isAudioActive: this.localUser.isAudioActive() });
            }catch(e) {
                console.log("error for user:: ", this.profileuserid, " :: ", e)
            }
            
            this.setState({ isMicDisabled: true, isMicOn: false, localUser: this.localUser, isRaiseHandAllowed: false });
        } else if (parsedMessage.unmuteAudio) {
            if(this.usertype === PRESENTER) {
                this.sendNotification('Participants have been unmuted')
                return true
            }

            this.sendNotification('Presenter has switched on your use of audio.')
            if(this.state.isUserInSpeakQueue) {
                this.localUser.setAudioActive(true);
                this.localUser.getStreamManager().publishAudio(this.localUser.isAudioActive());
                this.sendSignalUserChanged({ isAudioActive: this.localUser.isAudioActive() });
            }
            this.setState({ isMicDisabled: false, isMicOn: true, localUser: this.localUser, isRaiseHandAllowed: true });
        } else if (parsedMessage.allowCam) {
            if(parsedMessage.userId === this.profileuserid) {
                this.sendNotification('Presenter has switched on your use of Camera. Please allow use of Camera')
                if(!this.localUser.isVideoActive())
                    this.camStatusChanged()
                // this.setState({isCamDisabled: false}, () => {
                //     this.leaveSession(this.ACTION.SWITCH_CAMERA)
                //     this.joinSession(true)
                // })

                // this.setCamEnabled();




                // this.leaveSession(this.ACTION.SWITCH_CAMERA)
                // this.joinSession(true)

                
                // this.connectWebCam();
                // this.leaveSession(this.ACTION.SWITCH_CAMERA)
                // this.joinSession(true)
                // this.joinSession(true);
                // this.joinSession()
                // this.localUser.getStreamManager().publishVideo(true);
                // this.sendSignalUserChanged({ isVideoActive: true });
                // this.setState({localUser: this.localUser})
                // this.switchCamera();

                
                // this.state.session.unpublish(this.localUser.getStreamManager());
                // this.localUser.setStreamManager(null);
                // this.setState({isCamDisabled: false}, ()=>{
                    
                //     // this.leaveSession(this.ACTION.SWITCH_CAMERA)
                //     // this.joinSession(true)
                    
                    
                //     // this.joinSession(true);




                //     let publisherConstraints = {
                //         audioSource: true, 
                //         videoSource: undefined,
                //         publishAudio: true,
                //         publishVideo: true,
                //         resolution: '800x600',
                //         frameRate: 15,
                //         insertMode: 'APPEND',
                //         mirror: false,
                //         // facingMode: { exact: "user" }
                //     }




                //     let publisher = this.OV.initPublisher(undefined, publisherConstraints);
                //     if (this.state.session.capabilities.publish) {
                //         console.log('refier :: session publish')
                //         this.state.session.publish(publisher)
                //     }
                    
                //     this.OV
                //         .getUserMedia(publisherConstraints)
                //         .then(mediaStream => {
                //             return publisher.replaceTrack(mediaStream.getVideoTracks()[0]);
                //         })
                    
                //     this.localUser.setStreamManager(publisher);
                //     this.localUser.getStreamManager().publishVideo(true);
                //     this.sendSignalUserChanged({ isVideoActive: true });
                //     this.setState({localUser: this.localUser})
                //     // this.switchCamera();
                // })
            } else {
                this.allowCamAccess(parsedMessage.userId, true)
            }
        } else if (parsedMessage.revokeCam) {
            if(parsedMessage.userId === this.profileuserid) {
                this.sendNotification('Presenter has switched off your use of Camera.')
                if(this.localUser.isVideoActive())
                    this.camStatusChanged()
            } else {
                this.revokeCamAccess(parsedMessage.userId, true)
            }
        }
        else {
            this.addParticipantToSpeakWaitQueue(parsedMessage.userId, false)
        }
    }

    removeFromSpeakQueue(participantId) {
        let msg = { eventid: this.eventid, userId: participantId, revokeAudio: true }
        this.ws.emit(this.ASKTOSPEAK, JSON.stringify(msg));
    }

    addParticipantToSpeakQueue(participantId=null, addNextBatch=false) {
        // if queue has not reached max, then add participant to queue. 
        // Else kick first participant/batch and add new participant
        
        if(addNextBatch) {
            let speakQueue = []
            let maxLength = this.state.maxParticipantSpeak <= this.state.speakWaitingQueue.length
                                ? this.state.maxParticipantSpeak
                                : this.state.speakWaitingQueue.length

            let removeQueue = this.state.speakQueue

            let params = { eventid: this.eventid, user_id_list: this.state.speakQueue, add_to_speak_queue: false }
            this.props.dispatch(update_participats_details_of_ongoing_events(params))
            
            for(let i = 0; i < removeQueue.length; i++) {
                let removeUserId = removeQueue[i]
                this.removeFromSpeakQueue(removeUserId)
            }

            let params2 = { eventid: this.eventid, user_id_list: this.state.speakWaitingQueue.slice(0, maxLength), 
                            add_to_speak_queue: true }
            this.props.dispatch(update_participats_details_of_ongoing_events(params2))

            for(let i = 0; i < maxLength ; i++) {
                let userId = this.state.speakWaitingQueue.shift()
                speakQueue.push(userId)
                this.givePermissionToSpeak(userId)
            }

            this.setState({speakQueue})
        } else {
            if(participantId) {
                if(this.state.speakQueue.length < this.state.maxParticipantSpeak) {
                    let params = { eventid: this.eventid, user_id: participantId, add_to_speak_queue: true }
                    let updateDetailPromise = this.props.dispatch(update_participats_details_of_ongoing_events(params))

                    this.state.speakQueue.push(participantId)
                } else {
                    let shiftedParticipant = this.state.speakQueue.shift()
                    let params1 = { eventid: this.eventid, user_id: shiftedParticipant, add_to_speak_queue: false }
                    this.props.dispatch(update_participats_details_of_ongoing_events(params1))
                    // console.log("AudioQueueModal:: shift:: participantID ", shiftedParticipant)
                    
                    let params2 = { eventid: this.eventid, user_id: participantId, add_to_speak_queue: true }
                    this.props.dispatch(update_participats_details_of_ongoing_events(params2))
                    this.state.speakQueue.push(participantId)
                }

                this.givePermissionToSpeak(participantId)
            } else {
                let userId = this.state.speakWaitingQueue.shift()

                if(this.state.speakQueue.length < this.state.maxParticipantSpeak) {
                    let params = { eventid: this.eventid, user_id: userId, add_to_speak_queue: true }
                    this.props.dispatch(update_participats_details_of_ongoing_events(params))
                    this.state.speakQueue.push(userId)
                } else {
                    let shiftedParticipant = this.state.speakQueue.shift()
                    let params1 = { eventid: this.eventid, user_id: shiftedParticipant, add_to_speak_queue: false }
                    this.props.dispatch(update_participats_details_of_ongoing_events(params1))
                    // console.log("AudioQueueModal:: shift:: userID ", shiftedParticipant)
                    
                    let params2 = { eventid: this.eventid, user_id: userId, add_to_speak_queue: true }
                    this.props.dispatch(update_participats_details_of_ongoing_events(params2))
                    this.state.speakQueue.push(userId)
                }

                this.givePermissionToSpeak(userId)
            }
        }

        if(this.state.speakQueue.indexOf(this.profileuserid) > -1)
            this.setState({isUserInSpeakQueue: true})
        else {
            if(!this.state.isUserInSpeakQueue)
                this.setState({isUserInSpeakQueue: false})
            if(!this.state.isMicDisabled)
                this.setMicDisabled();
        }
        this.setState({queueUpdated: !this.state.queueUpdated})
    }

    addParticipantToSpeakWaitQueue(participantId) {
        if(this.state.speakQueue.length < this.state.maxParticipantSpeak) {
            this.addParticipantToSpeakQueue(participantId)
        } else {
            this.state.speakWaitingQueue.push(participantId)
            if(this.state.speakWaitingQueue.indexOf(this.profileuserid) > -1)
                this.setState({isUserInSpeakQueue: true})
            else {
                if(!this.state.isUserInSpeakQueue)
                    this.setState({isUserInSpeakQueue: false})
                // if(!this.state.isMicDisabled)
                //     this.setMicDisabled();
            }
            this.setState({queueUpdated: !this.state.queueUpdated})
        }
    }


    render() {
        console.log('LiveConferenceController:: props', this.props, this.state);

        return (
            <div className="conference-screen-wrapper" style={{ overflow: 'hidden auto' }}>
                <Col className={this.state.showActionBar ?
                    'conference-action-bar col-sm-3 hidden-xs' :
                    'conference-action-bar col-sm-1 hidden-xs'
                }
                    style={this.state.showActionBar ?
                        {
                            paddingLeft: 0,
                            background: 'white',
                            // height: '89vh',
                            height: '85.7vh',
                            overflow: 'hidden auto',
                            boxShadow: '-4px -48px 9px 0px grey',
                            borderRadius: '6px'
                        } :
                        { paddingLeft: 0 }}>
                    <ConferenceSidebarController {...this.state} {...this.props}
                        userName={this.props.myUserName}
                        usertype={this.usertype}
                        showAttendeesPanel={this.showAttendeesPanel}
                        showAskQuestionPanel={this.showAskQuestionPanel}
                        showReactionPanel={this.showReactionPanel}
                        toggleActionBarState={this.toggleActionBarState}
                        event_details={this.props.event_details}
                        isPresenter={this.props.userRole === this.PUBLISHER}
                        isSubscriberPropsChanged={this.state.isSubscriberPropsChanged}
                        setMaxPresenterParticipants={this.setMaxPresenterParticipants}
                        setMaxPresenterModerators={this.setMaxPresenterModerators} 
                        setCamOn={this.setCamOn}
                        setCamOff={this.setCamOff}
                        setMicOn={this.setMicOn}
                        setMicOff={this.setMicOff}
                        setMaxParticipantSpeak={this.setMaxParticipantSpeak}
                        allowRaiseHand={this.allowRaiseHand}
                        disallowRaiseHand={this.disallowRaiseHand}
                        eventid={this.state.mySessionId}
                        removeFromSpeakQueue={this.removeFromSpeakQueue}
                        muteAllParticipants={this.muteAllParticipants}
                        unmuteAllParticipants={this.unmuteAllParticipants}
                        allowCamAccess={this.allowCamAccess}
                        revokeCamAccess={this.revokeCamAccess}
                        addParticipantToSpeakWaitQueue={this.addParticipantToSpeakWaitQueue}
                        addParticipantToSpeakQueue={this.addParticipantToSpeakQueue}
                        speakQueueLength={this.state.speakQueue.length}
                    />
                </Col>
                <Col className={this.state.showActionBar ? 'col-sm-9 conference-container' : 'col-sm-11 conference-container'}
                    id="conference_container">
                    <VideoGridBoxController
                        subscribers={this.state.subscribers}
                        presenterParticipants={this.state.presenterParticipantList}
                        // subscribers={this.state.allPresenters}
                        subscriberCount={this.state.subscribers.length}
                        presenterParticipantsCount={this.state.presenterParticipantList.length}
                        fullScreenStatus={this.state.fullScreenStatus}
                        localUser={this.state.localUser}
                        mySessionId={this.state.mySessionId}
                        mySessionName={this.state.mySessionName}
                        isLiveVideo={this.state.isLiveVideo}
                        joinSessionButtonDisabled={this.state.joinSessionButtonDisabled}
                        switchMainPresenter={this.switchMainPresenter}
                        joinSession={this.joinSession}
                        isPresenter={this.props.userRole === this.PUBLISHER}
                        isSubscriberPropsChanged={this.state.isSubscriberPropsChanged}
                        isUserInSpeakQueue={this.state.isUserInSpeakQueue}
                        browserDetails={this.props.systemDetails ? this.props.systemDetails.browser : null}
                        isCamDisabled={this.state.isCamDisabled}
                    />
                </Col>
                <Col className={this.state.showActionBar ?
                    'col-sm-9 conference-toolbar-wrapper' : 'col-sm-offset-1 col-sm-11 conference-toolbar-wrapper'}>
                    <ConferenceVideoToolbar {...this.props} {...this.state}
                        usertype={this.usertype}
                        userName={this.props.myUserName}
                        eventid={this.state.mySessionId}
                        user={this.state.localUser}
                        micStatusChanged={this.micStatusChanged}
                        screenShare={this.screenShare}
                        stopScreenShare={this.stopScreenShare}
                        toggleFullscreen={this.toggleFullscreen}
                        leaveSession={this.leaveSession}
                        camStatusChanged={this.camStatusChanged}
                        switchCamera={this.switchCamera}
                        isPresenter={this.props.userRole === this.PUBLISHER}
                        systemDetails={this.props.systemDetails}
                        userId={this.profileuserid}
                        token={this.props.token}
                        addParticipantToSpeakWaitQueue={this.addParticipantToSpeakWaitQueue}
                        addParticipantToSpeakQueue={this.addParticipantToSpeakQueue}
                        removeFromSpeakQueue={this.removeFromSpeakQueue}
                        startAudioForParticipant={this.startAudioForParticipant}
                        toggleActionBarState={this.toggleActionBarState}
                        subscribersLength={this.state.subscribers.length}
                        switchLightOff={this.switchLightOff}
                        switchLightOn={this.switchLightOn}
                        event_details={this.props.event_details}
                        muteAllParticipants={this.muteAllParticipants}
                        unmuteAllParticipants={this.unmuteAllParticipants}
                        allowCamAccess={this.allowCamAccess}
                        revokeCamAccess={this.revokeCamAccess}
                        speakQueueLength={this.state.speakQueue.length}
                    />
                </Col>
                <DialogExtensionComponent
                    showDialog={this.state.showExtensionDialog}
                    cancelClicked={this.closeDialogExtension}
                />
                <SessionErrorDialogBox connectionInterrupted={this.state.connectionInterrupted}
                    CONNECTION_INTERUPPTED={this.CONNECTION_INTERUPPTED}
                />
                {this.state.notificationMessage !== '' ?
                    <div className="webinar-floating-notification">
                        { this.state.notificationMessage }
                    </div>
                    : null
                }
            </div>
        );
    }
}


var mapStateToProps = (store) => {
    return {
        token: store.webinarPageReducer.token,
        event_details: store.webinarPageReducer.event_details,
        event_config: store.webinarPageReducer.event_config,
        isQuestionAsked: store.webinarPageReducer.isQuestionAsked,
        isChatNotification: store.webinarPageReducer.isChatNotification,
        newChatCount: store.webinarPageReducer.newChatCount,
        newAskedQuestionCount: store.webinarPageReducer.newAskedQuestionCount,
        eventAttendeesObject: store.webinarPageReducer.eventAttendeesObject,
        eventAttendeesSpeakQueue: store.webinarPageReducer.eventAttendeesSpeakQueue,
    };
};


export default connect(mapStateToProps)(LiveConferenceController);