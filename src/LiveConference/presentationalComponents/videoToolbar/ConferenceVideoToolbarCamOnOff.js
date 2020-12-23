import React from "react";
import { Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { VIEWER, MODERATOR, PRESENTER_PARTICIPANT } from "../../conditionalComponents/action";



export default class ConferenceVideoToolbarCamOnOff extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let usertype = this.props.usertype;
        let isPresenter = this.props.isPresenter;
        let isCamDisabled = this.props.isCamDisabled;
        let isCamOn = this.props.isCamOn;

        if (isCamDisabled) {
            return null;
        }

        if (usertype === VIEWER 
            || usertype === MODERATOR
            || (usertype === PRESENTER_PARTICIPANT  && !this.props.isUserInSpeakQueue)) {
            return null;
        }


        return (
            <div>
                {this.props.user &&
                    this.props.user.isVideoActive() ?
                    <div
                        className="conference-toolbar-control"
                        onClick={() => {
                            if (this.props.user &&
                                this.props.user.getStreamManager()) {
                                this.props.camStatusChanged();
                            }
                        }}>
                        <FontAwesome
                            title="Cam On/Off"
                            name="video-camera"
                            className={
                                this.props.user &&
                                    this.props.user.getStreamManager() ?
                                    "conference-toolbar-icons" :
                                    "conference-toolbar-icons-disabled"
                            }
                        />
                        <p style={{ marginTop: '5px' }}>Cam On</p>
                    </div> :
                    <div
                        className="conference-toolbar-control"
                        onClick={() => {
                            if (this.props.user &&
                                this.props.user.getStreamManager()) {
                                this.props.camStatusChanged();
                            }
                        }}>
                        <FontAwesome
                            title="Cam On/Off"
                            name="video-camera"
                            className={
                                this.props.user &&
                                    this.props.user.getStreamManager() ?
                                    "conference-toolbar-icons" :
                                    "conference-toolbar-icons-disabled"
                            }
                        />
                        <p style={{ marginTop: '5px' }}>Cam Off</p>
                    </div>
                }
            </div>
        );
    }
}
