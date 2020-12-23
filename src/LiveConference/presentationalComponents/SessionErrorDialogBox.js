import React, { Component } from 'react';
import { Row } from 'react-bootstrap';


import './dialog-extension/DialogExtension.css';


export default class SessionErrorDialogBox extends Component {

    render() {
        return (
            <div>
                {this.props.connectionInterrupted !== 0 ? (
                    <Row id="errorDialogExtension">
                        <Row>
                            <p style={{ fontWeight: '700', fontSize: '1.1em', textAlign: 'center' }}>
                                {this.props.CONNECTION_INTERUPPTED[this.props.connectionInterrupted].header}
                            </p>
                        </Row>
                        <Row>
                            <p>{this.props.CONNECTION_INTERUPPTED[this.props.connectionInterrupted].msg}</p>
                        </Row>

                    </Row>
                ) :
                    null}
            </div>
        );
    }
}
