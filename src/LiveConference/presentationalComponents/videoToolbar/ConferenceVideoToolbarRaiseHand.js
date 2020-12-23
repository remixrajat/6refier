import React from "react";
import { Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { VIEWER, MODERATOR, PRESENTER, PRESENTER_MODERATOR } from "../../conditionalComponents/action";


export default class ConferenceVideoToolbarAudioQueue extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let usertype = this.props.usertype;
        let isPresenter = this.props.isPresenter;
        let isCamDisabled = this.props.isCamDisabled;
        let isCamOn = this.props.isCamOn;

        if (usertype === VIEWER || usertype === MODERATOR || usertype === PRESENTER || usertype === PRESENTER_MODERATOR) {
            return null;
        }


        return (
            <div>
                <div className="conference-toolbar-control"
                    onClick={() => {
                        if ( this.props.user && 
                            this.props.user.getStreamManager() &&
                            !this.props.isUserInSpeakQueue &&
                            this.props.isRaiseHandAllowed)
                            if(this.props.subscribersLength > 0)
                                this.props.askPresenterToSpeak()
                            else
                                alert('Presenter has not yet joined or has disabled your use of audio.')
                    }}>
                    <FontAwesome
                        title="Raise Hand"
                        name="hand-o-up"
                        className={
                            this.props.user && 
                            this.props.user.getStreamManager() &&
                            this.props.subscribersLength > 0 &&
                            !this.props.isUserInSpeakQueue &&
                            this.props.isRaiseHandAllowed
                                ? "conference-toolbar-icons"
                                : "conference-toolbar-icons-disabled"
                        }
                    />
                    <p style={{ marginTop: '5px' }}>Ask To Speak?</p>
                </div>
            </div>

        );
    }
}
