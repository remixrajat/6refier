import React from "react";
import { Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { isXsDevice, isMobileDevice} from '../../../GlobalConstants';



export default class ConferenceVideoToolbarTestWebinarCompatibility extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){      

        let testDiv = (
            <div className="conference-toolbar-control"
                onClick={() => this.props.toggleSettingsModal()}>
                <FontAwesome
                    title="Test Webinar Compatibility"
                    name="wrench"
                    className={"conference-toolbar-icons"}
                />
                <p style={{ marginTop: '5px' }}>Settings</p>
            </div>
        );

        if (isXsDevice() || isMobileDevice()){
            return (
                <div>
                    <div>{testDiv}</div>                
                </div>
            )
        }
        
        return (
            <div>{testDiv}</div>
            
        );
    }
}
