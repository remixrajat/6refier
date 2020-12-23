/*global chrome*/
import React, { Component } from 'react';
import kurentoUtils from 'kurento-utils'
import { connect } from 'react-redux';
import { notify } from 'reapop';
import WebinarComponent from '../presentationalcomponents/main.js';
import SocketConnection from '../SocketConnection' 
import { addReceivedMessage, addEventParticipants } from './action.js';


class LiveBroadcast extends Component {
    constructor(props) {
        super(props);
        this.ws = null;
        this.webRtcPeer = { webcam: null, screenshare: null };
        this.MEDIA = { WEBCAM: "webcam", SCREENSHARE: "screenshare", ALL: "all" }
        this.eventid = this.props.event_details.event_id;
        this.profileuserid = this.props.profileuserid;
        this.usertype = 2;
        this.state = {
            broadcastWebcamStreamURI: "",
            broadcastScreenShareStreamURI: "",
            isScreenSharing: false,
            isLiveVideo: false,
            isCaptureOnlyAudio: false,
            presenterAvailable: false,
            errorMsg: [],
            statusHistory: [],
            numberOfAttendees: 0,
            is_webinar_started_by_presenter: false
        }
        // this.createObjectURL = window.URL.createObjectURL;
        this.PRESENTER = 1;
        this.defaultMsg = "CLICK 'START SESSION' TO START WEBINAR";
        this.screenshareStartMsg = "STARTING SCREENSHARE. PLEASE WAIT ... ";
        this.webcamStopMsg = "SESSION ENDED. YOU CAN RESTART BY CLICKING 'START SESSION'."
        this.screenshareStopMsg = "SCREENSHARE STOPPED."
        this.displayMsg = this.defaultMsg
        //console.log("webinarrouter",this.props.match.params);
        this.createConnectionInterval = null;
        this.peercon = null;
        this.mediaStream = { webcam: null, screenshare: null };
        this.createConnection = this.createConnection.bind(this);
        this.errorhandler = this.errorhandler.bind(this);
        this.ADDUSEREVENT = "addedusertoevent";
        this.ADDUSEREVENT_ID = "addeduser";
        this.startPresenterOrViewer = this.startPresenterOrViewer.bind(this)
        this.setIsLiveVideo = this.setIsLiveVideo.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.onOfferPresenter = this.onOfferPresenter.bind(this);

        this.startOrStopSession=this.startOrStopSession.bind(this);
        this.startOrStopScreenshare=this.startOrStopScreenshare.bind(this);
        this.sendAddedUserToEventGroup=this.sendAddedUserToEventGroup.bind(this);
        this.getIsPresenterAvailable=this.getIsPresenterAvailable.bind(this);
        this.getIsWebinarStartedByPresenter=this.getIsWebinarStartedByPresenter.bind(this);
        this.STOP_PRESENTER_MESSAGE =  {
            viewerStopped:"Thanks. You have left the session oe session eneded. Reconnect the ongoing session by clicking on 'JOIN SESSION'",
            presenterDisconnected:"Presenter is disconnected. Please wait for presenter to come online",
            presenterStopped:" Webinar has ended. Thanks",
            noPresenterStream:"Webinar not yet started by presenter. Please wait",
            presenterStreamRejected:"Error in starting the webinar. Please refresh and start session.",
        }


        // "usertype": "presenter", "profileuserid":,"id":"connection","eventid":"abc123" }; 
    }

    createConnection(token) {
        //console.log("Websocket::Creating websocket connection");
        // this.ws = io.connect(SOCKETURL, {
        //     path: '/webinar/socket.io',
        //     // path: '/socket.io',
        //     query: 'token=' + token
        // });
        this.ws = SocketConnection.getConnectionInstance(token)
        // console.log("LiveBroadcast::this.ws ", this.ws);
        this.ws.on("connect", () => {
            //console.log("LiveBroadcast::this.ws ", this.ws);
            this.setState({ errorMsg: [] });
        })
        this.ws.off("message");
        this.ws.off(this.ADDUSEREVENT);
        this.ws.off("reconnect");
        this.ws.off('connect_error');
        this.ws.on("message", this.ws_onmessagehandler.bind(this));
        this.ws.on(this.ADDUSEREVENT, this.addUserMessageHandler.bind(this));
        this.ws.on("reconnect", (attemptNumber) => { this.setState({ errorMsg: [] }) });
        let _errorhandler = this.errorhandler
        this.ws.on('connect_error', function (err) {
            _errorhandler("Connecting ...");
        });
    }

    updateStatusHistory(msg) {
        let temp = [];
        if (this.state.statusHistory.length > 0) {
            temp = this.state.statusHistory;
        }
        temp.push(msg);
        //console.log("LiveBroadcast::StatusHistory::msg ",msg,
        //              "this.state.isLiveVideo::" ,this.state.isLiveVideo, 
        //               "this.state.isScreenSharing", this.state.isScreenSharing);
        let self = this
        this.setState({ statusHistory: temp }, () => { console.log("LiveBroadcast::StatusHistory :: ", self.state.statusHistory) });
    }

    componentWillMount() {
        // let user_params = { eventid: this.eventid, profileuserid: this.profileuserid }
        console.log("LiveBroadcast::componentWillMount::", this.props.token);
        // this.props.dispatch(authenticateUser(user_params));
        if (this.props.token) {
            console.log("LiveBroadcast::componentWillMount:: this.props.token", this.props.event_details);
            this.usertype = this.props.event_details.usertype;
            this.createConnection(this.props.token);
        }

        // let _this= this
        // DetectRTC.load(function () {
        //     _this.props.dispatch(add_rtc_info_to_event(_this.eventid,DetectRTC))
        //     console.log("Detect RTC :: " ,DetectRTC);
        // });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token && nextProps.token !== this.props.token) {
            console.log("LiveBroadcast::componentWillReceiveProps::nextProps.token", nextProps.token, nextProps.event_details);
            this.usertype = nextProps.event_details.usertype;
            this.createConnection(nextProps.token);
        }

    }

    componentDidMount() {
        //console.log("LiveBroadcast::componentDidMount::" );
        // this.video = document.getElementById("broadcastvideo");
        window.onbeforeunload = function () {
            if (this.ws) {
                this.ws.close();
            }
        }

        if(this.props.match.params.webview){
            this.props.dispatch({type:"IS_WEBVIEW", data:true})
        }

    }

    addNotification(status, message, title, dismissAfter) {
        this.props.dispatch(notify({
            title: title || '<h4 style="color:black">Webinar Session Status</h4>',
            message: message,
            status: status,
            position: 'tc',
            allowHTML: true,
            dismissible: true,
            dismissAfter: dismissAfter || 3000
        }));
    }

    componentWillUnmount() {
        this.ws.off("message");
        this.ws.off(this.ADDUSEREVENT);
        this.ws.off("reconnect");
        this.ws.off('connect_error');
        SocketConnection.closeSocketConnection()
    }

    setScreenshare() {
        //console.log("LiveBroadcast :: setScreenshare",this.state );
        if (!this.state.isLiveVideo) {
            this.setState({ errorMsg: ["Please Clisck on Start session first"] });
            return;
        }
        if (this.state.isScreenSharing) {
            this.setState({ errorMsg: [] });
        }
        this.setState({ isScreenSharing: !this.state.isScreenSharing }, () => { this.startPresenterOrViewer(this.MEDIA.SCREENSHARE) });
    }

    setIsLiveVideo(mediatype = this.MEDIA.ALL) {
        //console.log("LiveBroadcast :: setIsLiveVideo",this.state, this.state.isLiveVideo, !this.state.isLiveVideo );
        // if(this.state.isScreenSharing){
        //     this.errorhandler("Cannot start webcam. Please stop Sreen Sharing! ");
        //     return;
        // }
        if (this.PRESENTER === this.usertype) {
            //console.log("LiveBroadcast :: setIsLiveVideo starting  WEBCAM for presenter");
            this.setState({ isLiveVideo: !this.state.isLiveVideo }, () => { this.startPresenterOrViewer(this.MEDIA.WEBCAM) });
        } else if (this.MEDIA.WEBCAM === mediatype) {
            //console.log("LiveBroadcast :: setIsLiveVideo starting WEBCAM for viewer")
            this.setState({ isLiveVideo: !this.state.isLiveVideo }, () => { this.startPresenterOrViewer(this.MEDIA.WEBCAM) });

        } else if (this.MEDIA.SCREENSHARE === mediatype && this.state.isLiveVideo) {
            //console.log("LiveBroadcast :: setIsLiveVideo starting for SCREENSHARE viewer")
            this.setState({ isScreenSharing: !this.state.isScreenSharing }, () => { this.startPresenterOrViewer(this.MEDIA.SCREENSHARE) });

        } else if (this.PRESENTER !== this.usertype && this.state.isLiveVideo && this.MEDIA.ALL === mediatype) {
            //console.log("LiveBroadcast :: setIsLiveVideo starting all::webcam for viewer")
            this.setState({ isLiveVideo: !this.state.isLiveVideo }, () => { this.startPresenterOrViewer(this.MEDIA.WEBCAM) });
            // //console.log("LiveBroadcast :: setIsLiveVideo starting all::SCREENSHARE for viewer")
            // this.setState({isScreenSharing: !this.state.isScreenSharing} ,()=>{ this.startPresenterOrViewer(this.MEDIA.SCREENSHARE)});
        }
        else if (this.MEDIA.ALL === mediatype) {
            //console.log("LiveBroadcast :: setIsLiveVideo starting all::webcam for viewer")
            this.setState({ isLiveVideo: !this.state.isLiveVideo }, () => { this.startPresenterOrViewer(this.MEDIA.WEBCAM) });
            //console.log("LiveBroadcast :: setIsLiveVideo starting all::SCREENSHARE for viewer")
            this.setState({ isScreenSharing: !this.state.isScreenSharing }, () => { this.startPresenterOrViewer(this.MEDIA.SCREENSHARE) });
        }


    }

    setCaptureOnlyAudio() {
        this.setState({ isCaptureOnlyAudio: !this.state.isAudio })
    }

    startOrStopSession(e) {
        if (!this.ws.connected) {
            this.errorhandler("Error in Connection. Cannot start the Session!");
            return;
        }
        this.setIsLiveVideo();
    }

    startOrStopScreenshare() {

        if (!this.ws.connected) {
            this.errorhandler("Error in Connection. Cannot start the Session!");
            return;
        }

        this.setScreenshare();
    }

    startPresenterOrViewer(mediatype) {
        // if(this.state.isScreenSharing){
        //     this.setState({isLiveVideo: false});
        //     this.stopPresenting();
        // }
        if (this.MEDIA.SCREENSHARE === mediatype && !this.state.isScreenSharing) {
            this.stop(mediatype);
            //console.log ("LiveBroadcast :: startPresenterOrViewer()::webinaroptions:: stopping::",this.state, mediatype);
            return;
        }

        if (this.MEDIA.WEBCAM === mediatype && !this.state.isLiveVideo) {
            this.stop(mediatype);
            //console.log ("LiveBroadcast :: startPresenterOrViewer()::webinaroptions::stopping",this.state, mediatype);
            return;
        }

        if (this.webRtcPeer.webcam !== null && this.webRtcPeer.screenshare !== null) {
            this.stop(mediatype);
            //console.log ("LiveBroadcast ::startPresenterOrViewer() :: webinaroptions",this.state, mediatype);
            return;
        }
        //console.log ("LiveBroadcast :: webinaroptions",this.state, mediatype);
        if (this.state.isLiveVideo || this.state.isScreenSharing) {
            if (!this.mediaStream.webcam || !this.mediaStream.screenshare) {
                let webinarOptions = {
                    usertype: this.usertype,
                    media: mediatype,
                    profileuserid: this.profileuserid,
                    eventid: this.eventid,
                    id: 'connection'
                };
                this.sendMessage(webinarOptions);
                //console.log ("LiveBroadcast :: webinaroptions",webinarOptions,this.props.userprofiledata);
            }

            if (this.PRESENTER === this.usertype) {
                this.presenter(mediatype);
            } else {
                this.viewer(mediatype);
            }
        } else {
            this.stop(mediatype);
            //console.log ("LiveBroadcast :: webinaroptions",this.state, mediatype);
            // this.stopPresenting();
        }
    }



    errorhandler(msg = null) {
        //console.log("LiveBroadcast::errorhandler",msg);
        let errmsglist = this.state.errorMsg;
        let errmsg = msg;
        if (errmsglist.indexOf(errmsg) !== -1) {
            this.setState({ errorMsg: errmsglist });
            return;
        }
        errmsglist.push(errmsg)
        //console.log("LiveBroadcast::erroehandler::",errmsglist);
        this.setState({ errorMsg: errmsglist });
    }


    presenterResponse(message) {
        if (message.response !== 'accepted') {
            let errorMsg = message.message ? message.message : 'Unknown error';
            console.warn('Call not accepted for the following reason: ', errorMsg);
            this.dispose(message.media, 'presenterStreamRejected');
        } else {
            if (this.MEDIA.SCREENSHARE == message.media) {
                this.webRtcPeer.screenshare.processAnswer(message.sdpAnswer);
            }
            if (this.MEDIA.WEBCAM == message.media) {
                this.webRtcPeer.webcam.processAnswer(message.sdpAnswer);
            }
        }
    }

    viewerResponse(message) {
        if (message.response !== 'accepted') {
            let errorMsg = message.message ? message.message : 'Unknow error';
            console.warn('Call not accepted for the following reason: ' , errorMsg, 'for :: ', message.media, message );
            if (this.MEDIA.WEBCAM === message.media) {
                this.setState({ isLiveVideo: false });
            }
            if (this.MEDIA.SCREENSHARE === message.media) {
                this.setState({ isScreenSharing: false });
            }
            this.dispose(message.media, 'noPresenterStream');
        } else {
            //console.log('LiveBroadcast::viewerResponse()' , message);
            if (this.MEDIA.SCREENSHARE === message.media) {
                this.webRtcPeer.screenshare.processAnswer(message.sdpAnswer);
            }
            if (this.MEDIA.WEBCAM === message.media) {
                this.webRtcPeer.webcam.processAnswer(message.sdpAnswer);
            }
        }
    }



    setPresenterBroadcastStreamURL(wertcpeerobj, mediatype) {
        let _onOfferPresenter = this.onOfferPresenter;
        let onOfferPresenter = (error, offerSdp) => { _onOfferPresenter(error, offerSdp, mediatype); }
        let localMediaStream = wertcpeerobj.getLocalStream();
        // console.log("LiveBroadcast::presenter:: out", wertcpeerobj, localMediaStream);
        let refreshIntervalId;

        function setStreamURLL() {
            if (localMediaStream) {
                let uri = localMediaStream;
                try{
                    uri = window.URL.createObjectURL(localMediaStream)
                }catch(e){
                    uri = localMediaStream;
                }
                
                //console.log("LiveBroadcast::presenter/viewer:: interval clearing interval",uri);
                if (this.MEDIA.WEBCAM === mediatype) {
                    this.displayMsg = null;
                    this.setState({ broadcastWebcamStreamURI: uri });
                    this.mediaStream.webcam = localMediaStream;
                }
                if (this.MEDIA.SCREENSHARE === mediatype) {
                    this.displayMsg = null;
                    this.setState({ broadcastScreenShareStreamURI: uri });
                    this.mediaStream.screenshare = localMediaStream;
                    // console.log("LiveBroadcast::presenter:: out :: creating another offer :: ");
                    // let audioObj = Object.assign({}, );
                    this.mediaStream.screenshare.addTrack(this.mediaStream.webcam.getAudioTracks()[0]);
                    this.webRtcPeer.screenshare.peerConnection.addStream(this.mediaStream.screenshare);
                    // this.webRtcPeer.screenshare.peerConnection.createOffer();
                    this.webRtcPeer.screenshare.generateOffer(onOfferPresenter);
                    // console.log("LiveBroadcast::presenter:: out :: creating another offer :: ", wertcpeerobj, localMediaStream);
                }
                clearInterval(refreshIntervalId);
            } else {
                localMediaStream = wertcpeerobj.getLocalStream();
                // //console.log("LiveBroadcast::presenter/viewer:: interval not yet cleared ",localMediaStream, wertcpeerobj);
            }
        }

        refreshIntervalId = setInterval(setStreamURLL.bind(this), 1000);
        wertcpeerobj.peerConnection.onremovestream = this.setScreenshare.bind(this);
        if (this.state.isScreenSharing && this.usertype === this.PRESENTER) {
            localMediaStream.getVideoTracks()[0].onended = this.setScreenshare.bind(this);
        }
        //console.log("LiveBroadcast::presenter/viewer:: out" ,wertcpeerobj, localMediaStream);


    }




    webrtcPeerSendonly = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly;



    presenter(mediatype) {
        // if (!this.webRtcPeer) {
        // this.showSpinner(this.video);
        let _this = this;
        let _onOfferPresenter = this.onOfferPresenter;
        let onOfferPresenter = (error, offerSdp) => { _onOfferPresenter(error, offerSdp, mediatype); }
        let _onIceCandidate = this.onIceCandidate.bind(this);
        let onIceCandidate = (candidate) => { _onIceCandidate(candidate, mediatype) }
        let options = {
            mediaConstraints: {
                audio: true,
                video: {
                    width: {
                        min: "640",
                        max: "1223"
                    },
                    height: {
                        min: "480",
                        max: "720"
                    }
                }
            },
            onicecandidate: onIceCandidate,
            // configuration : {
            //     iceServers : _this.getIceServers()
            // }
        }
        this.displayMsg = this.defaultMsg;
        let notification_message;
        if (this.state.isScreenSharing) {
            let constraints = {
                audio: false,
                video: true
            };
            options = Object.assign({}, options, { mediaConstraints: constraints, sendSource: "screen" });
            this.displayMsg = '';
            notification_message = '<p style="color:#536fac;">' + this.screenshareStartMsg + '</p>'
        } else {
            notification_message = '<p style="color:#536fac;">Starting Webinar Session.</p><p> Please Wait ...</p>'

        }
        this.addNotification('info', notification_message,null ,1000)

        let setlocalstreamurl = this.setPresenterBroadcastStreamURL.bind(this);
        let _addNotification = this.addNotification
        let webRtcPeer = this.webrtcPeerSendonly(options, function (error) {
            // console.log("LiveBroadcast::webrtcPeerSendonly", options, error)
            if (error) {
                console.log("LiveBroadcast::presenter::" ,error,options);
                let notification_message = error;
                if ("permission-denied" === error) {
                    notification_message = '<p style="color:#536fac;">You have cancelled screenshare. Please Click on Share to Start Screenshare</p>'
                }
                if ("not-installed" === error) {
                    notification_message = '<p style="color:#536fac;">Screen share plugin not installed. Please install the plugin.</p>'
                }
                if ("installed-disabled" === error) {
                    notification_message = '<p style="color:#536fac;">Please refresh the page and start screenshare.</p>'
                }
                _addNotification('error', notification_message, null, 10123456000)
                if ("screen" === options.sendSource) {
                    _this.setState({ isScreenSharing: false })
                    _this.webRtcPeer.screenshare = null;
                } else {
                    _this.setState({ isLiveVideo: false })
                }
                return;
            }

            if (_this.MEDIA.WEBCAM === mediatype) {
                this.generateOffer(onOfferPresenter);
            }

            setlocalstreamurl(this, mediatype);
            //console.log("LiveBroadcast::presenter::webrtcPeerSendonly" , this)
        });
        if (this.MEDIA.WEBCAM === mediatype) {
            this.webRtcPeer.webcam = webRtcPeer;
        }
        if (this.MEDIA.SCREENSHARE === mediatype) {
            this.webRtcPeer.screenshare = webRtcPeer;
        }
        // }
    }

    onOfferPresenter(error, offerSdp, mediatype) {
        if (error) {
            //console.log("LiveBroadcast::onOfferPresenter::" ,error);
            return;
        }
        //console.log("LiveBroadcast::onOfferPresenter::",mediatype );
        let message = {
            id: 'presenter',
            sdpOffer: offerSdp,
            media: mediatype,
            profileuserid: this.profileuserid,
            eventid: this.eventid
        };
        this.sendMessage(message);
    }

    setBroadcastStreamURL(event, mediatype) {
        //console.log("LiveBroadcast::viewer::" ,event, mediatype);
        let uri = event.stream;
        try{
            uri = window.URL.createObjectURL(event.stream)
        }catch(e){
            uri = event.stream;
        }
        //console.log("LiveBroadcast::viewer:: uri" ,uri);
        if (this.MEDIA.WEBCAM === mediatype) {
            this.displayMsg = null;
            this.setState({ broadcastWebcamStreamURI: uri });
            this.mediaStream.webcam = event.stream;
            this.setState({ is_webinar_started_by_presenter: true  });
        }
        if (this.MEDIA.SCREENSHARE === mediatype) {
            this.displayMsg = null;
            this.setState({ broadcastScreenShareStreamURI: uri });
            this.mediaStream.screenshare = event.stream;
        }
    }

    webrtcPeerRecvonly = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly;

    viewer(mediatype) {
        // if (!this.webRtcPeer) {
        // this.showSpinner(this.video);
        let _onIceCandidate = this.onIceCandidate.bind(this);
        let onIceCandidate = function (candidate) { _onIceCandidate(candidate, mediatype) }
        let options = {
            // remoteVideo: this.video,
            onicecandidate: onIceCandidate
        }
        let _onOfferViewer = this.onOfferViewer.bind(this);
        let onOfferViewer = function (error, offerSdp) { _onOfferViewer(error, offerSdp, mediatype); }

        // let setRemoteStreamURL = this.setBroadcastStreamURL.bind(this);
        let _setRemoteStreamURL = this.setBroadcastStreamURL.bind(this);
        let setRemoteStreamURL = function (event) { _setRemoteStreamURL(event, mediatype) };

        let _webRtcPeer = this.webrtcPeerRecvonly(options, function (error) {
            if (error) {
                //console.log("LiveBroadcast::viewer::" ,error);
                return;
            }
            //console.log("LiveBroadcast::viewer::WebRtcPeerRecvonly" );
            this.generateOffer(onOfferViewer);
            this.peerConnection.onaddstream = setRemoteStreamURL;
            //console.log("LiveBroadcast::viewer::webrtcPeerRecvonly" , this)
        });
        if (this.MEDIA.WEBCAM === mediatype) {
            this.webRtcPeer.webcam = _webRtcPeer;
        }
        if (this.MEDIA.SCREENSHARE === mediatype) {
            this.webRtcPeer.screenshare = _webRtcPeer;
        }

        // }
    }

    onOfferViewer(error, offerSdp, mediatype) {
        if (error) {
            //console.log("LiveBroadcast::onOfferViewer::" ,error);
            return;
        }
        //console.log("LiveBroadcast::onOfferViewer::",mediatype );
        let message = {
            id: 'viewer',
            media: mediatype,
            sdpOffer: offerSdp,
            profileuserid: this.profileuserid,
            eventid: this.eventid
        }
        this.sendMessage(message);
    }

    onIceCandidate(candidate, mediatype) {
        //console.log('Local candidate' + JSON.stringify(candidate));

        let message = {
            id: 'onIceCandidate',
            media: mediatype,
            candidate: candidate,
            eventid: this.eventid
        }
        this.sendMessage(message);
    }


    // stopPresenting(mediatype){
    //     if(this.usertype === this.PRESENTER){
    //         this.sendMessage({id:"bye",usertype:this.usertype, media:mediatype});
    //     }
    //     //console.log("LiveBroadcast :: webinaroptions",this.state,this.mediaStream);
    //     // if(this.mediaStream && !this.state.isLiveVideo){
    //     //     //console.log("LiveBroadcast :: webinaroptions","stopPresenting" );
    //     //     this.mediaStream.getAudioTracks()[0].stop();
    //     //     this.mediaStream.getVideoTracks()[0].stop();
    //     // }
    //     // this.webRtcPeer = null;

    // }

    stop(mediatype, stopType) {
        // if(this.usertype === this.PRESENTER){
        let message = {
            id: 'stop',
            media: mediatype,
            eventid: this.eventid,
            usertype: this.usertype
        }
        this.sendMessage(message);
        //console.log("LiveBroadcast::stop ::", this.usertype , message);
        // }
        this.updateStatusHistory("Recieved command to stop :: " + mediatype);
        this.dispose(mediatype, stopType);
    }

    disposeWebcam(mediatype, stopType) {
        console.log("LiveBroadcast::stop ::", stopType);
        if (this.MEDIA.WEBCAM === mediatype && this.webRtcPeer.webcam) {

            if (this.mediaStream.webcam) {
                this.mediaStream.webcam.getAudioTracks()[0].stop();
                this.mediaStream.webcam.getVideoTracks()[0].stop();
            }
            this.webRtcPeer.webcam.dispose();
            this.webRtcPeer.webcam = null;
            let self = this;
            this.setState({ isLiveVideo: false }, () => { self.updateStatusHistory("Disposing Webcam"); });
            if (this.PRESENTER !== this.usertype) {
                if (stopType === 'presenterStopped'){
                    this.webcamStopMsg = this.STOP_PRESENTER_MESSAGE.presenterStopped
                }else if(stopType === 'presenterDisconnected'){
                    this.webcamStopMsg = this.STOP_PRESENTER_MESSAGE.presenterDisconnected
                }else if(stopType === 'presenterStreamRejected'){
                    this.webcamStopMsg = this.STOP_PRESENTER_MESSAGE.presenterStreamRejected
                }else if(stopType === 'noPresenterStream'){
                    this.webcamStopMsg = this.STOP_PRESENTER_MESSAGE.noPresenterStream
                }else{
                    this.webcamStopMsg = this.STOP_PRESENTER_MESSAGE.viewerStopped
                }
                // this.webcamStopMsg = "Thanks. You have left the session. Reconnect the ongoing session by clicking on 'JOIN SESSION'"
            }
            this.props.dispatch(notify({
                title: '<h4 style="color:black">Webinar Session Status</h4>',
                message: '<p style="color:#536fac;">' + this.webcamStopMsg + '</p>',
                status: 'info',
                position: 'tc',
                allowHTML: true,
                dismissible: true,
                dismissAfter: 5000
            }));
            this.setState({ broadcastWebcamStreamURI: null })
            // this.updateStatusHistory("Disposing Webcam");
        }
    }

    disposeScreenshare(mediatype) {
        if (this.MEDIA.SCREENSHARE === mediatype && this.webRtcPeer.screenshare) {
            if (this.mediaStream.screenshare && this.mediaStream.screenshare.getVideoTracks().length >= 1) {
                this.mediaStream.screenshare.getVideoTracks()[0].stop();
            }
            // this.webRtcPeer.screenshare.dispose();
            this.webRtcPeer.screenshare = null;
            let self = this;
            // this.displayMsg = this.screenshareStopMsg;
            if (this.PRESENTER !== this.usertype) {
                this.screenshareStopMsg = "You have left the session. Reconnect the ongoing session by clicking on 'JOIN SESSION'"
            }
            if (this.PRESENTER === this.usertype) {
                this.props.dispatch(notify({
                    title: '<h4 style="color:black">Webinar Session Status</h4>',
                    message: '<p style="color:#536fac;">' + this.screenshareStopMsg + '</p>',
                    status: 'info',
                    position: 'tc',
                    allowHTML: true,
                    dismissible: true,
                    dismissAfter: 3000
                }));
            }
            this.setState({ isScreenSharing: false, broadcastScreenShareStreamURI : null}, () => { self.updateStatusHistory("Disposing Screenshare"); });
            
        }
    }

    dispose(mediatype,stopType) {
        if (this.MEDIA.WEBCAM === mediatype) {
            if (this.webRtcPeer.screenshare && this.PRESENTER === this.usertype) {
                this.errorhandler("Screen is being shared. Please stop before ending session.");
                this.setState({ isLiveVideo: !this.state.isLiveVideo });
                return;
            }
            if (this.PRESENTER !== this.usertype) {
                this.disposeScreenshare(this.MEDIA.SCREENSHARE);
            }
        }
        this.disposeWebcam(mediatype,stopType);
        this.disposeScreenshare(mediatype);
        // this.hideSpinner(this.video);
    }

    sendMessage(message) {
        let jsonMessage = JSON.stringify(message);
        //console.log('Sending message: ' + jsonMessage);
        this.ws.send(jsonMessage);
    }

    showSpinner() {
        // for (let i = 0; i < arguments.length; i++) {
        //     arguments[i].poster = logo;
        //     arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
        // }
    }

    hideSpinner() {
        // for (let i = 0; i < arguments.length; i++) {
        //     arguments[i].src = '';
        //     arguments[i].poster = './img/webrtc.png';
        //     arguments[i].style.background = '';
        // }
    }




    ws_onmessagehandler(message) {
        let webinarOptions = {
            usertype: this.usertype,
            profileuserid: this.profileuserid,
            eventid: this.eventid,
            id: 'connection'
        };
        let parsedMessage = JSON.parse(message);
        console.info('Received message: ', message);
        console.log('parsedMessage', parsedMessage)
        if (parsedMessage === undefined) {
            return;
        }
        
        switch (parsedMessage.id) {
            case 'presenterResponse':
                this.updateStatusHistory("Presenter session initiation is :: " + parsedMessage.response);
                this.presenterResponse(parsedMessage);
                break;
            case 'viewerResponse':
                this.updateStatusHistory("Viewer session initiation is :: " + parsedMessage.response + " for :: "+ parsedMessage.media);
                this.viewerResponse(parsedMessage);
                break;
            case 'stopCommunication':
                this.dispose(parsedMessage.media);
                break;
            case 'iceCandidate':
                if (this.MEDIA.WEBCAM === parsedMessage.media && this.webRtcPeer.webcam) {
                    // console.log("Adding Ice candidate for webcam", this.webRtcPeer.webcam)
                    let peerConc = this.webRtcPeer.webcam
                    this.webRtcPeer.webcam.addIceCandidate(parsedMessage.candidate, function(e){
                        // console.log("Added Ice candidate for webcam", e,peerConc.peerConnection.iceConnectionState ,peerConc)
                    });
                }
                if (this.MEDIA.SCREENSHARE === parsedMessage.media && this.webRtcPeer.screenshare) {
                    // console.log("Adding Ice candidate for screeshare", this.webRtcPeer.screenshare)
                    this.webRtcPeer.screenshare.addIceCandidate(parsedMessage.candidate);
                }
                break;
            case 'bye':
                this.stopPresenting();
            case 'stop':
                if (this.PRESENTER !== this.usertype) {
                    this.updateStatusHistory("Presenter has stopped the presenting :: " + parsedMessage.media);
                    this.stop(parsedMessage.media, 'presenterStopped');
                }
                this.setState({ is_webinar_started_by_presenter: parsedMessage.is_webinar_started || false });
                break;
            case 'connection':
                this.sendMessage(webinarOptions);
                //     //console.log ("LiveBroadcast :: webinaroptions",webinarOptions,this.props.userprofiledata);
                //     if ( PRESENTER === this.usertype  ){
                //         this.presenter();
                //     }else{
                //         this.viewer();
                //     }

                break;
            case 'joined':
                // if(parsedMessage.joined_usertype === this.PRESENTER){
                //     this.setState({ presenterAvailable: parsedMessage.is_mentor_available, numberOfAttendees: parsedMessage.number_of_member})
                // }
                if(this.usertype === this.PRESENTER){
                    console.log('presenterAvailable :: is setting to true');
                    this.setState({
                        presenterAvailable: true,
                        numberOfAttendees: parsedMessage.number_of_member
                    });
                    return;
                }
                if(parsedMessage.joined_usertype === this.PRESENTER){
                    console.log('presenterAvailable :: is setting to true');
                    this.setState({
                        presenterAvailable: true,
                    });
                }
                this.setState({
                    numberOfAttendees: parsedMessage.number_of_member
                });

                break;
            case 'media':
                if (this.usertype !== this.PRESENTER) {
                    this.updateStatusHistory("Presenter has started the " + parsedMessage.type + " session ");
                    let _setIsLiveVideo = this.setIsLiveVideo
                    setTimeout(() => { _setIsLiveVideo(parsedMessage.type) }, 1000)
                }
                // this.setState({ is_webinar_started_by_presenter: parsedMessage.is_webinar_started || false });

                break;
            case 'disconnected':
                if (this.usertype !== this.PRESENTER && parsedMessage.joined_usertype === this.PRESENTER) {
                    console.log('presenterAvailable :: is setting to false');
                    this.setState({ presenterAvailable: false })
                }
                break;
            case 'user_status':
                this.props.dispatch({type:"WEBINARPARTICIPANTS",data: JSON.parse(parsedMessage.users)})
                break;
            case 'presenter_status':
                if(this.usertype === this.PRESENTER){
                    return;
                }
                console.log('presenterAvailable :: is setting to ', parsedMessage.is_presenter_present , parsedMessage);
                this.setState({ 
                    is_webinar_started_by_presenter: parsedMessage.is_webinar_started || false,
                    is_webinar_ended: parsedMessage.is_webinar_ended || false
                });
                if(parsedMessage.hasOwnProperty('is_presenter_present') ){
                    this.setState({
                        presenterAvailable: parsedMessage.is_presenter_present,
                    })
                }
                if(parsedMessage.is_presenter_present === false){
                    this.stop(this.MEDIA.WEBCAM, 'presenterDisconnected')
                }
                break;
            default:
                // console.error('Unrecognized message', parsedMessage);
        }
    }

    sendAddedUserToEventGroup(message, eventid) {
        message = { id: this.ADDUSEREVENT_ID, addeduser: message, eventid: eventid }
        //console.log("sendAddedUserToEventGroup", message, JSON.stringify(message) )
        this.ws.emit(this.ADDUSEREVENT + "server", JSON.stringify(message));
    }

    addUserMessageHandler(eventmessage) {
        let parsedMessage = JSON.parse(eventmessage);
        //console.log("Received Message::addUserMessageHandler ", parsedMessage , parsedMessage.id);
        switch (parsedMessage.id) {
            case this.ADDUSEREVENT_ID:
                this.props.dispatch(addEventParticipants(parsedMessage));
                break;
            default:
                console.warn("Unrecognised message::addUserMessageHandler", parsedMessage);
        }
    }

    getIsPresenterAvailable() {
        console.log('presenterAvailable :: ', this.state.presenterAvailable);
        return this.state.presenterAvailable;
    }

    getIsWebinarStartedByPresenter() {
        return this.state.is_webinar_started_by_presenter;
    }

    render() {
        console.log(' LiveBroadcast :: ', this.props);
        return (
            <WebinarComponent webcamstreamuri={this.state.broadcastWebcamStreamURI}
                screensharestreamuri={this.state.broadcastScreenShareStreamURI} eventid={this.eventid}
                startOrStopSessionHandler={this.startOrStopSession}
                startOrStopScreenshareHandler={this.startOrStopScreenshare}
                isLiveVideo={this.state.isLiveVideo} isScreenSharing={this.state.isScreenSharing}
                errorMsg={this.state.errorMsg} isPresenter={this.usertype === this.PRESENTER}
                sendAddedUserToEventGroup={this.sendAddedUserToEventGroup}
                presenterAvailable={this.getIsPresenterAvailable}
                getIsWebinarStartedByPresenter={this.getIsWebinarStartedByPresenter}
                displayMsg={this.displayMsg}
                event_details={this.props.event_details}
                userprofiledata={this.props.userprofiledata}
            />
        )
    }




}

var mapStateToProps = (store) => {
    return {
        userprofiledata: store.userProfileReducer.profileFields,
        token: store.webinarPageReducer.token,
        event_details: store.webinarPageReducer.event_details
    };
};


export default connect(mapStateToProps)(LiveBroadcast);