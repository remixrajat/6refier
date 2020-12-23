import React from "react";
import { Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { VIEWER, MODERATOR, PRESENTER_PARTICIPANT } from "../../conditionalComponents/action";



export default class ConferenceVideoToolbarMicOnOff extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let usertype = this.props.usertype;
        let isPresenter = this.props.isPresenter;
        let isMicDisabled = this.props.isMicDisabled;
        let isMicOn = this.props.isMicOn;

        if (usertype === PRESENTER_PARTICIPANT && isMicDisabled) {
            return null;
        }

        if (usertype === VIEWER || usertype === MODERATOR) {
            return null;
        }


        return (
            <div>
                {this.props.user && this.props.user.isAudioActive() ?
                    <div
                        className="conference-toolbar-control"
                        onClick={() => {
                            if (this.props.user !== undefined &&
                                this.props.user.getStreamManager()) {
                                this.props.micStatusChanged();
                            }
                        }}>
                        <FontAwesome
                            title="Cam On/Off"
                            name="microphone"
                            className={
                                this.props.user &&
                                    this.props.user.getStreamManager() ?
                                    "conference-toolbar-icons" :
                                    "conference-toolbar-icons-disabled"
                            }
                        />
                        <p style={{ marginTop: '5px' }}>Mic On</p>
                    </div> :
                    <div
                        className="conference-toolbar-control"
                        onClick={() => {
                            if (this.props.user &&
                                this.props.user.getStreamManager()) {
                                this.props.micStatusChanged();
                            }
                        }}>
                        <FontAwesome
                            title="Cam On/Off"
                            name="microphone-slash"
                            className={
                                this.props.user &&
                                    this.props.user.getStreamManager() ?
                                    "conference-toolbar-icons" :
                                    "conference-toolbar-icons-disabled"
                            }
                        />
                        <p style={{ marginTop: '5px' }}>Mic Off</p>
                    </div>
                }
            </div>

        );
    }
}
