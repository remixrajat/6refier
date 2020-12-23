import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetectRTC from 'detectrtc';
import axios from 'axios';

import { authenticateUser, addRtcInfoToEvent } from '../../WebinarPage/conditionalcomponents/action';
import LiveConferenceController from '../../LiveConference/conditionalComponents/LiveConferenceController';

import { SOCKETURL, OPENVIDU_SECRET } from '../../GlobalConstants';


class LiveSessionsController extends Component {
    constructor(props) {
        super(props);

        this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
            ? this.props.openviduServerUrl
            : SOCKETURL;
        this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret ? this.props.openviduSecret : OPENVIDU_SECRET;
        this.eventid = this.props.match.params.eventid;
        this.profileuserid = this.props.match.params.profileuserid;
        this.ROLE = {
            'viewer': 'SUBSCRIBER',
            'moderator':'SUBSCRIBER',
            'presenter':'PUBLISHER',
            'presenter_moderator':'PUBLISHER',
            'presenter_participant':'PUBLISHER'
        }

        this.state = {
            myUserName: '',
            myUserId: undefined
        }

        this.getToken = this.getToken.bind(this)
        this.createSession = this.createSession.bind(this)
        this.createToken = this.createToken.bind(this)
    }

    componentWillMount() {
        let user_params = { eventid: this.eventid, profileuserid: this.profileuserid }
        //console.log("LiveBroadcast::componentWillMount::", user_params);
        this.props.dispatch(authenticateUser(user_params));
        if (this.props.token) {
            // console.log("LiveBroadcast::componentWillMount:: this.props.token", this.props.event_details);
            // this.usertype = this.props.event_details.usertype;
            // this.createConnection(this.props.token);
        }

        let _this = this
        this.detectRTC = null;
        DetectRTC.load(() => {
            _this.props.dispatch(addRtcInfoToEvent(_this.eventid, DetectRTC))
            this.detectRTC = DetectRTC
            // console.log("Detect RTC :: ", DetectRTC);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userprofiledata) {
            const first_name = nextProps.userprofiledata.first_name;
            const last_name = nextProps.userprofiledata.last_name;
            let name = first_name;
            if (last_name) {
                name = name + ' ' + last_name;
            }
            this.setState({ myUserName: name, myUserId: nextProps.userprofiledata.pk })
        }
    }

    componentWillUnmount() {
        this.props.dispatch({ type: 'SESSION_UNMOUNT' })
    }

    render() {
        // console.log(' LiveSessionsController :: ', this.props);

        if (!this.props.event_details) {
            return null;
        }
        return (
            <LiveConferenceController profileuserid={this.profileuserid}
                usertype={this.props.event_details.usertype}
                userRole={this.ROLE[this.props.event_details.usertype] || this.ROLE.viewer}
                getToken={this.getToken}
                event_details={this.props.event_details}
                event_config={this.props.event_config}
                myUserId={this.state.myUserId}
                myUserName={this.state.myUserName}
                systemDetails={this.detectRTC}
                pageId={this.eventid}
                
            />
        );

    }

    /**
    * --------------------------
    * SERVER-SIDE RESPONSIBILITY
    * --------------------------
    * These methods retrieve the mandatory user token from OpenVidu Server.
    * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
    * the API REST, openvidu-java-client or openvidu-node-client):
    *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
    *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
    *   3) The token must be consumed in Session.connect() method
    */

    getToken(mySessionId) {
        return this.createSession(mySessionId)
            .then((sessionId) => this.createToken(sessionId));
    }

    createSession(sessionId) {
        let self = this;
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId, recordingMode: self.props.event_config.recording});
            console.log("SessionConfig : ", data, );
            axios
                .post(this.OPENVIDU_SERVER_URL + 'api/sessions/', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    // console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {

                    var error = Object.assign({}, response);
                    // console.log('CREATE SESION :: ', response, error);
                    if (error.response && error.response.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to Refier Server.'
                        );
                        alert('Cannot connect to Refier Server. No Internet Connection!')
                        reject();
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            let options;
            options = { session: sessionId }
            if (this.props.event_details) {
                if(this.ROLE.hasOwnProperty(this.props.event_details.usertype)){
                    options.role = this.ROLE[this.props.event_details.usertype]
                }else{
                    options.role = this.ROLE.viewer
                }
                
            }
            console.log('TOKEN', options);
            let data = JSON.stringify(options);
            axios
                .post(this.OPENVIDU_SERVER_URL + 'api/tokens', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    // console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }


}



var mapStateToProps = (store) => {
    return {
        userprofiledata: store.userProfileReducer.profileFields,
        token: store.webinarPageReducer.token,
        event_details: store.webinarPageReducer.event_details,
        event_config: store.webinarPageReducer.event_config        
    }
}


export default connect(mapStateToProps)(LiveSessionsController);