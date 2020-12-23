import React from "react";
import { Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { VIEWER, MODERATOR, PRESENTER_PARTICIPANT } from "../../conditionalComponents/action";



export default class ConferenceVideoToolbarScreenShare extends React.Component {
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
                <div
                    className="conference-toolbar-control"
                    onClick={() => {
                        if (this.props.user !== 'undefined' && this.props.user && !this.props.user.screenShareActive) {
                            this.props.screenShare();
                        } else if (this.props.user !== 'undefined' && this.props.user && this.props.user.screenShareActive) {
                            this.props.stopScreenShare();
                        }
                    }}>
                    <FontAwesome
                        title="Start Screen Share"
                        name="laptop"
                        className={this.props.user && this.props.user.getStreamManager() 
                            ? "conference-toolbar-icons" 
                            : "conference-toolbar-icons-disabled"
                        }
                    />
                    <p style={{ marginTop: '5px' }}>
                        {
                            this.props.user !== 'undefined' && this.props.user &&
                                this.props.user.screenShareActive ?
                                "Stop Screen" :
                                "Share Screen"
                        }
                    </p>
                </div>
            </div>
        );
    }
}
