import React from "react";
import { Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
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


        if (usertype === VIEWER || usertype === MODERATOR|| usertype === PRESENTER_PARTICIPANT) {
            return null;
        }

        return (
            <div>
                <div
                    className="conference-toolbar-control"
                    onClick={() => {
                        this.props.openAudioQueueModal();
                    }}>
                    <FontAwesome
                        title="Audio Queue"
                        name="user"
                        className="conference-toolbar-icons"
                    />
                    <p style={{ marginTop: '5px' }}>Audio Queue</p>
                </div>
            </div>
        );
    }
}
