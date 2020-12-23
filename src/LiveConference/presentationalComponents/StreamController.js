import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import OvVideoComponent from '../presentationalComponents/OvVideoComponent'
import RemoteVideoComponent from '../presentationalComponents/RemoteVideoComponent'


export default class StreamController extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.user || !this.props.user.getStreamManager()) {
            return null
        }
        return (
            this.props.remoteUser ?
                <RemoteVideoComponent
                    user={this.props.user}
                    fullScreenStatus={this.props.fullScreenStatus}
                    switchMainPresenter={this.props.switchMainPresenter}/> :
                <OvVideoComponent
                    user={this.props.user}

                    fullScreenStatus={this.props.fullScreenStatus}
                    switchMainPresenter={this.props.switchMainPresenter}
                    resetMainPresenter={this.props.resetMainPresenter}
                />

        );
    }
}