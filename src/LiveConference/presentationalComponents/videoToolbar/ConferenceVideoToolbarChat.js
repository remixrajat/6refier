import React from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { isXsDevice, isMobileDevice } from '../../../GlobalConstants';



export default class ConferenceVideoToolbarChat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let usertype = this.props.usertype;
        let isPresenter = this.props.isPresenter;
        let isCamDisabled = this.props.isCamDisabled;
        let isCamOn = this.props.isCamOn;

        // if (!isXsDevice() && !isMobileDevice()) {
        //     return null;
        // }

        return (
            <div>
                <div className="conference-toolbar-control"
                    onClick={() => {
                        if(isXsDevice() || isMobileDevice()) {
                            this.props.openChatModal()
                        } else {
                            this.props.toggleActionBarState('chat')
                        }
                    }}>
                    {
                        this.props.isChatNotification ?
                            <FontAwesome
                                title="Chat"
                                name="comments"
                                className="conference-toolbar-icons"
                            /> :
                            <FontAwesome
                                title="Chat"
                                name="comments"
                                className="conference-toolbar-icons"
                            />
                    }

                    {
                        this.props.isChatNotification ?
                            <span className="custom-badge"
                                style={{
                                    position: "absolute",
                                    // top: "-5px",
                                    // right: "15px",
                                    marginRight: "-25px",
                                    marginTop: "-45px",
                                    borderRadius: '50%',
                                }}>
                                {this.props.newChatCount && this.props.newChatCount > 0 ?
                                    this.props.newChatCount :
                                    null 
                                }
                            </span> :
                            null
                    }

                    <p style={{ marginTop: '5px' }}>
                        {
                            this.props.isChatNotification ?
                                "Chat" :
                                this.props.isQuestionAsked ?
                                    "Question" :
                                    "Chat"
                        }
                    </p>
                </div>
            </div>
        );
    }
}
