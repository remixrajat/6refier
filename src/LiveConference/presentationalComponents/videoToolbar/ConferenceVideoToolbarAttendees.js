import React from "react";
import { Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { PRESENTER } from "../../conditionalComponents/action";
import { isXsDevice, isMobileDevice } from '../../../GlobalConstants';


export default class ConferenceVideoToolbarAttendees extends React.Component {
    render() {
        let { usertype } = this.props 

        // if (usertype !== PRESENTER) {
        //     return null;
        // }

        return (
            <div>
                <div
                    className="conference-toolbar-control"
                    onClick={() => {
                        if(isXsDevice() || isMobileDevice()) {
                            this.props.openAttendeeModal()
                        } else {
                            this.props.toggleActionBarState('attendees')
                        }
                    }}>
                    <FontAwesome
                        title="Start Screen Share"
                        name="users"
                        className={"conference-toolbar-icons"}
                    />
                    <p style={{ marginTop: '5px' }}>
                        Attendees
                    </p>
                </div>
            </div>
        );
    }
}
