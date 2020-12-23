import React from 'react'
import { Alert } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

export default class Alerts extends React.Component {
    render() {
        return (
            <div>
                <Alert bsStyle="warning">
                    <span>
                        <FontAwesome
                            name="exclamation-triangle"
                            
                        />
                    </span>
                    <span style={{"paddingLeft":"10px"}}>
                        <strong>{this.props.strongText ? this.props.strongText : null}</strong>
                        {this.props.lightText ? this.props.lightText : null}
                    </span>
                </Alert>
            </div>
        )
    }
}