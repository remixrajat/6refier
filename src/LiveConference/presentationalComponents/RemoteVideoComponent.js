import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Loader from 'react-loader-advanced';

export default class RemoteVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMuted: true,
            isHover: false,
            showVideoPreloader: true,
            videoElement: null
        }
        this.switchMainPresenter = this.switchMainPresenter.bind(this);
        // this.exitFullscreenEscapeKey = this.exitFullscreenEscapeKey.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.addCssAndListner = this.addCssAndListner.bind(this);
        this.userChangedSignalHandler = this.userChangedSignalHandler.bind(this);
    }

    componentDidMount() {
        let self = this;
        if (this.props && this.props.user && this.props.user.streamManager && !!this.refs.conference_ref) {
            console.log('RemoteVideoComponent ::componentDidMount',this.props.user.getStreamManager())
            // let isVideoAdded = this.props.user.getStreamManager().addVideoElement(this.refs.conference_ref);
            let videoElement = this.props.user.getStreamManager().createVideoElement(this.refs.conference_ref);
            self.addCssAndListner(videoElement);
            this.setState({ isMuted: this.refs.conference_ref.muted });
            // setTimeout(() => {
                if (videoElement) {
                    self.setState({
                        showVideoPreloader: false
                    })
                }
            // }, 1000)

        }

        // this.setState({ isMuted: this.refs.conference_ref.muted });


        if (this.props && this.props.user.streamManager.session && this.props.user && !!this.refs.conference_ref) {
            this.props.user.streamManager.session.on('signal:userChanged', this.userChangedSignalHandler);
        }
    }

    addCssAndListner(videoElement) {
        videoElement.style.width = "250px";
        videoElement.style.objectFit = "contain";
        videoElement.addEventListener('click', this.switchMainPresenter);
        this.setState({ videoElement: videoElement });
    }

    userChangedSignalHandler(event){
        if(event.from.connectionId !== this.props.user.connectionId){
            return;
        }
        console.log('RemoteVideoComponent :: signal:userChanged', event, this.refs.conference_ref, this.props.user.getStreamManager());
        if (this.refs.conference_ref) {
            let videoElement = this.props.user.getStreamManager().createVideoElement(this.refs.conference_ref);
            this.addCssAndListner(videoElement);
            this.setState({
                showVideoPreloader: false
            })
        }
        
    }

    componentWillUnmount() {
        try{
            console.log('RemoteVideoComponent :: componentWillUnmount');
            if(this.props.user && this.props.user.getStreamManager() && this.props.user.getStreamManager().session){
                this.props.user.getStreamManager().session.off('signal:userChanged', this.userChangedSignalHandler);
            }
        }catch(error){
            console.log(error);
        }   
    }



    switchMainPresenter() {
        let connectionId = this.props.user.connectionId;
        this.props.switchMainPresenter(connectionId);
    }

    toggleFullscreen() {
        console.log('toggleFullscreen')
        const document = window.document;
        const fs = this.state.videoElement;

        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }

        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    toggleMute() {
        this.refs.conference_ref.muted = !this.refs.conference_ref.muted;
        this.setState({ isMuted: this.refs.conference_ref.muted })
    }

    mouseOver() {
        this.setState({ isHover: true });
    }

    mouseOut() {
        this.setState({ isHover: false });
    }


    render() {
        // console.log('RemoteVideoComponent::PROPS ', this.props);
        // onMouseOver={this.mouseOver} onMouseLeave={this.mouseOut}
        let spinner = (<span className="dual-ring-preloader" style={{ position: 'relative', top: '20px' }}></span>)
        return (
            <Loader show={this.state.showVideoPreloader} message={spinner}>
                <span className="nickname">{this.props.user.getNickname() }</span>
                <div ref="conference_ref">


                    {/* <video
                    onClick={this.switchMainPresenter}
                    autoPlay={true}
                    id={'video-' + this.props.user.getStreamManager().stream.streamId}
                    ref="conference_ref"
                    muted={this.props.mutedSound}
                    title="Click to bring in focus"
                    style={this.props.fullScreenStatus ?
                        {} :
                        {
                            width: '350px',
                            objectFit: 'contain'
                        }}
                /> */}
                </div>
                <div style={this.state.showVideoPreloader ? { display: "none" } : {
                    position: 'absolute',
                    // bottom: '46px',
                    bottom: '20%',
                    left: '20%'
                }} >
                    <div onClick={this.toggleFullscreen} className='conference-small-button'>
                        <FontAwesome
                            title="Full Screen"
                            name="expand"
                        />
                    </div>
                    <div onClick={this.toggleMute} className='conference-small-button'>
                        <FontAwesome
                            title="Mute this participant"
                            name={this.state.isMuted ? "volume-off" : "volume-up"}
                        />
                    </div>
                </div>
            </Loader>
        );
    }
}