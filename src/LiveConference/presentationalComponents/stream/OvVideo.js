import React, { Component } from 'react';

import './StreamComponent.css';


export default class OvVideoComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props && this.props.user.streamManager && !!this.refs.conference_ref) {
            this.props.user.getStreamManager().addVideoElement(this.refs.conference_ref);
        }

        if (this.props && this.props.user.streamManager.session && this.props.user && !!this.refs.conference_ref) {
            this.props.user.streamManager.session.on('signal:userChanged', (event) => {
                const data = JSON.parse(event.data);
                if (data.isScreenShareActive !== undefined) {
                    this.props.user.getStreamManager().addVideoElement(this.refs.conference_ref);
                }
            });
        }
    }

    componentDidUpdate(props) {
        if (props && !!this.refs.conference_ref && this.props.user) {
            this.props.user.getStreamManager().addVideoElement(this.refs.conference_ref);
        }
    }


    render() {
        // console.log('OvVideoComponent::PROPS ', this.props);

        return (
            <video
                autoPlay={true}
                id={'video-' + this.props.user.getStreamManager().stream.streamId}
                ref="conference_ref"
                muted={this.props.mutedSound}
            />
        );
    }
}
