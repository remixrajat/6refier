import React from "react";
import { Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { isXsDevice, isMobileDevice, } from '../../../GlobalConstants';
import { VIEWER, MODERATOR, PRESENTER_PARTICIPANT } from "../../conditionalComponents/action";



export default class ConferenceVideoToolbarSwitchCamera extends React.Component {
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


        let switchCameraDiv = (
            <div className= "conference-toolbar-control"
                    onClick={this.props.user && this.props.user.getStreamManager() 
                        ? this.props.switchCamera 
                        : null}>
                    <FontAwesome
                        title="Switch Camera"
                        name="camera"
                        className={this.props.user && this.props.user.getStreamManager() 
                            ? "conference-toolbar-icons" 
                            : "conference-toolbar-icons-disabled"
                        }
                    />
                    <p style={{ marginTop: '5px' }}>Switch Camera</p>
                </div>
        );
        if (isXsDevice() || isMobileDevice()) {
            return (
                <Col xs={2}>{switchCameraDiv}</Col>
            )
        }
        return (
            <div>{switchCameraDiv}</div> 
        );
    }
}
