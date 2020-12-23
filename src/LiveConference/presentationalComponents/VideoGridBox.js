import React, { Component } from 'react';

import VideoContainer from './VideoContainer';


export default class VideoGridBox extends Component {

    render() {
        // console.log('VideoGridBox:: props', this.props);

        if (!this.props.user) {
            return null;
        }
        
        return (
            <VideoContainer 
                // user={Array.isArray(this.props.user) ? this.props.user[0] : this.props.user}
                user={this.props.user}
                index={this.props.index}
                isLocalUser={this.props.isLocalUser}
                fullScreenStatus={this.props.fullScreenStatus}
                switchMainPresenter={this.props.switchMainPresenter}
                resetMainPresenter={this.props.resetMainPresenter}
                isSubscriberPropsChanged={this.props.isSubscriberPropsChanged}
                subscriberCount={this.props.subscriberCount}
                browserDetails={this.props.browserDetails}  
                isParticipantPresenter={this.props.isParticipantPresenter}  
                isSmallDevice={this.props.isSmallDevice}  
            />
        );
    }
}