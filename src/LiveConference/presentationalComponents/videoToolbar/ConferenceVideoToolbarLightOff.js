import React from "react";
import { Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { PRESENTER } from "../../conditionalComponents/action";


export default class ConferenceVideoToolbarLightOff extends React.Component {
    render() {
        if(this.props.usertype !== PRESENTER) {
            return null
        }

        return (
            <div>
                <div
                    className="conference-toolbar-control"
                    onClick={() => {
                        if(!this.props.disableLightSwitch) {
                            if(this.props.isLightOff)
                                this.props.switchLightOn()
                            else this.props.switchLightOff()
                        }
                    }}>
                    <FontAwesome
                        title="Light Off"
                        name="lightbulb-o"
                        className={!this.props.disableLightSwitch 
                            ? "conference-toolbar-icons" 
                            : "conference-toolbar-icons-disabled"
                        }
                    />
                    <p style={{ marginTop: '5px' }}>
                        {this.props.isLightOff ? "Light On" : "Light Off"} 
                    </p>
                </div>
            </div>
        );
    }
}