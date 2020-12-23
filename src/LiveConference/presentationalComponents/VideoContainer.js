import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import avatarPic from '../../images/mentor_dashboard_page/avatardp.png'


export default class VideoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videoAspectRatio: 1.3,
            videoHeight: undefined,
            videoWidth: undefined,
            showVideoPreloader: true,
            videoElement: null,
            flag: false,
            controlIconsTop: null,
            isMuted: this.props.browserDetails && this.props.browserDetails.isSafari ? true : false
        }

        this.refElement = null;

        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.reInitalize = this.reInitalize.bind(this);
        this.populateVideos = this.populateVideos.bind(this);
        this.userChangedSignalHandler = this.userChangedSignalHandler.bind(this);
        this.streamDestroyedHandler = this.streamDestroyedHandler.bind(this);
        this.streamCreatedHandler = this.streamCreatedHandler.bind(this);
        this.setVideoRef = this.setVideoRef.bind(this);
    }

    componentDidMount() {
        this.populateVideos(this.props);

        if (this.props && this.props.user && this.props.user.streamManager && !!this.refs.conference_ref) {
            console.log('VideoContainer ::componentDidMount', this.props.user.getStreamManager())
            let videoElement = this.props.user.getStreamManager().addVideoElement(this.refs.conference_ref);
            // this.setState({ isMuted: this.refs.conference_ref.muted, videoElement });
            // if (videoElement) {
            this.setState({
                showVideoPreloader: false
            })
            // }
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log("VideoContainer:: nextProps:: videogrid", nextProps);

        if (!nextProps.user) {
            return;
        }

        if (this.refs.conference_ref) {
            let controlIconsTop = this.refs.conference_ref.offsetHeight + this.refs.conference_ref.offsetTop - 35
            // console.log('VideoContainer:: nextProps:: videogrid:: in:: ', controlIconsTop)
            this.setState({ controlIconsTop })
        }

        let currentStreamId = this.props.user ? this.props.user.getStreamManager().stream.streamId : null;
        let incomingStreamId = nextProps.user.getStreamManager().stream.streamId;
        if ((!incomingStreamId || (currentStreamId === incomingStreamId))) {
            // console.log('VideoContainer :: componentWillReceiveProps :: rejecting video update ',currentStreamId , incomingStreamId);
            return;
        }
        // console.log('VideoContainer :: componentWillReceiveProps :: not rejecting video update ',currentStreamId , incomingStreamId);
        this.populateVideos(nextProps);
    }

    setVideoRef(element) {
        // console.log('VideoContainer:: set:: videogrid::', element, this.refs);
        this.refElement = element

        if (element) {
            let controlIconsTop = element.offsetHeight + element.offsetTop - 35
            // console.log('VideoContainer:: set:: videogrid::', controlIconsTop)
            this.setState({ controlIconsTop })
        }
        // console.log('VideoContainer:: set:: videogrid::', this.refElement);
    }


    populateVideos(param) {
        if (param.user && param.user.streamManager && this.refs.conference_ref) {
            param.user.getStreamManager().addVideoElement(this.refs.conference_ref);
        }

        if (param.user && param.user.streamManager && param.user.streamManager.session && !!this.refs.conference_ref) {
            let self = this;
            param.user.streamManager.session.on('signal:userChanged', this.userChangedSignalHandler);

            param.user.streamManager.session.on('streamDestroyed', this.streamDestroyedHandler);

            param.user.streamManager.session.on('streamCreated', this.streamCreatedHandler);
        }
    }

    userChangedSignalHandler(event) {
        if (!event) {
            return;
        }
        console.log('VideoContainer :: signal:userChanged 1', event, this.props.user.getConnectionId());
        if (event.from.connectionId !== this.props.user.connectionId) {
            return;
        }
        let isVideoAdded;
        this.setState({ showVideoPreloader: true })
        try {
            isVideoAdded = this.props.user.getStreamManager().addVideoElement(this.refs.conference_ref);
        } catch (e) {
            console.warn("Caught Exception : ", e);
        }

        setTimeout(() => {
            this.setState({
                showVideoPreloader: false,
                flag: false
            })
        }, 500)

    }

    streamDestroyedHandler(event) {
        if (event.reason === "disconnect") {
            console.log('StreamDestroyed Event thrown', event, event.stream.connection.connectionId);
            // this.props.resetMainPresenter(event.stream.connection.connectionId);
        } else if (event.reason === "unpublish") {
            this.setState({ showVideoPreloader: true })

            setTimeout(() => {
                this.setState({
                    showVideoPreloader: false,
                })
            }, 2000)
        }
        else {
            console.log('StreamDestroyed Event thrown doing nothing', event.stream.connection.connectionId, this.props.user.connectionId);
        }
    }

    streamCreatedHandler(event) {
        if (event.stream.connection.connectionId === this.props.user.getConnectionId()) {
            console.log('StreamCreated Event thrown for current vid', event, this.props);
        } else {
            console.log('StreamCreated Event thrown for different vid', event, this.props);
        }
        // self.userChangedSignalHandler();
    }

    componentWillUnmount() {
        try {
            if (this.props.user && this.props.user.streamManager && this.props.user.streamManager.session) {
                this.props.user.streamManager.session.off('signal:userChanged', this.userChangedSignalHandler);
            }
        } catch (error) {
            console.log('Caught Exception', error);
        }

        try {
            if (this.props.user && this.props.user.streamManager && this.props.user.streamManager.session) {
                this.props.user.streamManager.session.off('streamDestroyed', this.streamDestroyedHandler);
            }

        } catch (error) {
            console.log('Caught Exception', error);
        }

        try {
            if (this.props.user && this.props.user.streamManager && this.props.user.streamManager.session) {
                this.props.user.streamManager.session.off('streamCreated', this.streamCreatedHandler);
            }
        } catch (error) {
            console.log('Caught Exception : ', error);
        }
    }

    toggleFullscreen() {
        // console.log('toggleFullscreen')

        const document = window.document;
        const fs = this.refs.conference_ref;
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
        fs.removeAttribute("controls");
    }

    toggleMute() {
        this.setState({ isMuted: !this.state.isMuted })
    }

    reInitalize() {
        // console.log("VideoContainer:: nextProps:: reinit:: outide")
        if (!this.state.flag) {
            // console.log("VideoContainer:: nextProps:: reinit:: inside")
            setTimeout(() => {
                if (this.refs.conference_ref) {
                    let controlIconsTop = this.refs.conference_ref.offsetHeight
                        + this.refs.conference_ref.offsetTop
                        - 35
                    // console.log('VideoContainer:: nextProps:: videogrid:: in:: ', controlIconsTop)
                    this.setState({ controlIconsTop, flag: true })
                }
            }, 2000)
        }
    }



    render() {
        // console.log('VideoContainer:: props:: VideoGridBox', this.props, this.state);

        if (this.props.user && this.props.user.streamManager &&
            this.props.user.streamManager.remote && this.refs.conference_ref) {
            this.refs.conference_ref.muted = this.props.user.getStreamManager().remote ? false : true;
        }

        let spinner = (
            <div className="video-spinner-wrapper">
                <span className="dual-ring-preloader"></span>
            </div>
        )

        let micOff = (
            <FontAwesome
                title="Mic Off"
                name="microphone-slash"
                className="video-box-microphone"
            />
        )

        let micOn = (
            <FontAwesome
                title="Mic On"
                name="microphone"
                className="video-box-microphone"
            />
        )

        let camOff = (
            <img src={avatarPic} className="video-box-avatar" alt="Camera Off" title="User camera is turned off" />
        )

        return (
            this.props.isParticipantPresenter ?
                <div className={this.props.isSmallDevice ? 
                    "participant-audio-container mobile-audio-container" : "participant-audio-container"}>
                    <div className={"participant-bubble-wrap participant-bubble-wrap-" + (this.props.index % 4)}>
                        <video
                            autoPlay={true}
                            playsinline={true}
                            muted={this.state.isMuted ? true : false}
                            id={'video-' + this.props.user && this.props.user.getStreamManager() ? this.props.user.getStreamManager().stream.streamId : ""}
                            // ref={this.setVideoRef}
                            ref="conference_ref"
                            className="conference-video"
                        />
                    </div>
                    {
                        this.props.user && !this.props.user.audioActive ?
                            <div className="participant-mic" title="Mic Off">{micOff}</div>
                            : 
                            <div className="participant-mic" title="Mic On">{micOn}</div>
                    }
                    <div className="participant-nickname">
                        {this.props.user.getNickname()}
                    </div>
                </div>

                :

                <div className="video-grid-box" style={{ position: 'relative' }}>
                    {
                        this.state.showVideoPreloader ? spinner : null
                    }
                    {
                        this.props.user && !this.props.user.videoActive ? camOff : null
                    }
                    {/* {
                        this.props.user && !this.props.user.audioActive ? micOff : null
                    } */}

                    <video
                        autoPlay={true}
                        playsinline={true}
                        muted={this.state.isMuted ? true : false}
                        id={'video-' + this.props.user && this.props.user.getStreamManager() ? this.props.user.getStreamManager().stream.streamId : ""}
                        // ref={this.setVideoRef}
                        ref="conference_ref"
                        className="conference-video"
                    />
                    {
                        this.props.isLocalUser !== 'undefined' &&
                            !this.props.isLocalUser ?
                            <div style={this.state.showVideoPreloader ?
                                { display: "none" } :
                                { top: this.state.controlIconsTop - 10 }}
                                className="video-user-controls">
                                {
                                    this.props.user && !this.props.user.audioActive ?
                                        <div style={{ background: '#797979', marginRight: '10px' }}
                                            title="Mic Off">{micOff}</div>
                                        : null
                                }
                                <div className="video-user-name align-middle">{this.props.user.getNickname()}</div>
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
                            </div> :
                            <div style={this.state.showVideoPreloader ?
                                { display: "none" } :
                                {
                                    display: 'flex',
                                    position: 'absolute',
                                    top: this.state.controlIconsTop,
                                    fontSize: '16px'
                                }} >
                                {
                                    this.props.user && !this.props.user.audioActive ?
                                        <div title="Mic Off" style={{ background: '#797979' }}>{micOff}</div> : null
                                }
                                <div className="video-user-name align-middle">{this.props.user.getNickname()}</div>
                            </div>
                    }
                    {
                        this.reInitalize()
                    }
                </div>
        );
    }
}