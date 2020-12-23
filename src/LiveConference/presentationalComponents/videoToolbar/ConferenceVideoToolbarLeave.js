import React from "react";
import { Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { isXsDevice, isMobileDevice } from '../../../GlobalConstants';



export default class ConferenceVideoToolbarLeave extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let leaveDiv = (
            <div
                className="conference-toolbar-control"
                onClick={() => {
                    if (this.props.isLiveVideo) {
                        this.props.leaveSession();
                    }
                }}>
                <FontAwesome
                    title="Disconnect"
                    name="power-off"
                    className={this.props.isLiveVideo ?
                        "conference-toolbar-icons" :
                        "conference-toolbar-icons-disabled"
                    }
                />
                <p style={{ marginTop: '5px' }}>Leave</p>
            </div>
        )

        if (isXsDevice() || isMobileDevice()) {
            return (
                <div>
                    <div>{leaveDiv}</div>
                </div>
            )
        }

        return (
            <div>{leaveDiv}</div>
        );
    }
}
