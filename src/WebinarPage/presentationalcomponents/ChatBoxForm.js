import React, { Component } from 'react'
import { Form, FormControl, Button, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';


export default class Class extends Component {

    render() {
        return (
            <div style={this.props.fromConference ?
                { "borderTop": "1px solid #CCCCCC" } :
                { "borderTop": "1px solid #CCCCCC" }}>
                <div className="write">
                    <input type="text"
                        placeholder="Your message here..."
                        onChange={this.props.onMessageType}
                        value={this.props.messageBoxVal}
                        onKeyPress={(e) => { if (e.key == 'Enter') { this.props.sendmessage(e); } }} />
                    <div onClick={this.props.sendmessage} style={{ "cursor": "pointer" }}>
                        <FontAwesome
                            name="paper-plane"
                            className="write-link send"
                            title="Send Message"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
