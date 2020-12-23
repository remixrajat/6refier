import React, { Component } from "react";
import ReactPlayer from 'react-player'
import { Media, Col, Modal, Button, Grid, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { findDOMNode } from 'react-dom'
import FontAwesome from 'react-fontawesome';

import Preloader from '../../shared/Preloader/PreLoader'


class DocumentPlayer extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            video_title: "Videos Dummy", 
            video_url: null,
            playing: true,
            controls: false,
            duration: 0,
            played: 0,
            playedSeconds: 0,
            duration: 0,
            fullscreen: false
        }

        this.onVideoProgress = this.onVideoProgress.bind(this);
        this.onVideoPlay = this.onVideoPlay.bind(this);
        this.removeVideoStatUploadInterval = this.removeVideoStatUploadInterval.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onDuration = this.onDuration.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.fullscreenMode = this.fullscreenMode.bind(this);
        this.exitHandler = this.exitHandler.bind(this);
        this.videoStatUploadInterval = null;
    }

    componentDidMount() {
        document.addEventListener('fullscreenchange', this.exitHandler);
        document.addEventListener('webkitfullscreenchange', this.exitHandler);
        document.addEventListener('mozfullscreenchange', this.exitHandler);
        document.addEventListener('MSFullscreenChange', this.exitHandler);
    }

    exitHandler() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            ///fire your event
            this.setState({fullscreen: false})
        }
    }  

    playPause() {
        this.setState({ playing: !this.state.playing })
    }

    stop() {
        this.setState({ url: null, playing: false })
    }

    onPause = () => {
        // console.log('onPause')
        this.setState({ playing: false })
    }

    onVideoPlay() {
        // console.log('onPlay')
        this.setState({ playing: true })
        this.player.seekTo(1, 'seconds')
        this.setState({ playing: false })

        if (!this.videoStatUploadInterval) {
            let _this = this;
            this.videoStatUploadInterval = setInterval(() => {
                if (_this.props.document.documentId) {
                    console.log("_this.props.saveProgress()",_this.currentVideoProgress, _this.props.document.documentId)
                    _this.props.saveProgress(_this.currentVideoProgress, _this.props.document.documentId)
                }
                else {
                    console.log("_this.props.saveProgress()",_this.currentVideoProgress, _this.props.document.id)
                    _this.props.saveProgress(_this.currentVideoProgress, _this.props.document.id)
                }
            }, 5000);
        }
    }

    removeVideoStatUploadInterval() {
        if (!this.videoStatUploadInterval) {
            return
        }
        if (this.props.document.documentId) {
            this.props.saveProgress(this.currentVideoProgress, this.props.document.documentId)
        } else if (this.props.document.id) {
            this.props.saveProgress(this.currentVideoProgress, this.props.document.id)
        }
        clearInterval(this.videoStatUploadInterval);
        this.videoStatUploadInterval = null;
    }

    onVideoProgress(progressStat) {
        this.currentVideoProgress = progressStat;
    }

    closeModal() {
        this.props.onClose(); 
        this.removeVideoStatUploadInterval();
    }

    nextPage() {
        if(this.state.playedSeconds)
            this.player.seekTo(this.state.playedSeconds + this.props.nextPrevTimeAdd, 'seconds')
    }

    previousPage() {
        if(this.state.playedSeconds && this.state.playedSeconds > 1)
            this.player.seekTo(this.state.playedSeconds - this.props.nextPrevTimeAdd, 'seconds')
    }

    onDuration(duration) {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    onProgress(state) {
        console.log('onProgress', state)
        this.currentVideoProgress = state;
        this.setState(state)
    }
    
    fullscreenMode() {
        this.setState({fullscreen: true})
        const elem = document.getElementById("refier-document-player")

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    render_video_player() {
        let url = this.props.document.document_url ? this.props.document.document_url :
            this.props.document.url ? this.props.document.url : null
        
        // console.log(ReactPlayer.canPlay(url))
        if (!ReactPlayer.canPlay(url)) {
            let progressObject = {}
            let contentProgress = {}
            contentProgress['played'] = 1
            contentProgress['playedSeconds'] = 10
            progressObject['contentProgressDetails'] = contentProgress
            this.props.saveProgress(contentProgress, this.props.document.id)
            this.props.openInNewTab(url)
            this.closeModal();
        }

        let video_player = (<div id="refier-document-player">
            <ReactPlayer 
                ref={player => { this.player = player }}
                controls={this.state.controls}
                playing={this.state.playing}
                width={"100%"}
                height={this.state.fullscreen ? "100vh" : "80vh"}
                onProgress={this.onVideoProgress}
                onStart={() => this.player.seekTo(1, 'seconds')}
                onPlay={this.onVideoPlay}
                url={this.props.document.document_url ? this.props.document.document_url :
                    this.props.document.url?this.props.document.url : null}
                onDuration={this.onDuration}
                onProgress={this.onProgress}
            />
            <Media
                style={this.state.fullscreen ? {position: 'fixed', bottom: '10%'} : {}} >
                <Media.Body>
                    <Grid fluid>
                        <Row>
                            <div 
                                style={{marginTop: '5px', marginBottom: '5px', display: 'flex', justifyContent: 'center'}}>
                                <Button onClick={() => this.previousPage()}
                                    disabled={this.state.playedSeconds <= 1}
                                    style={this.state.fullscreen ? 
                                        {   background: '#404040', 
                                            color: '#f1f1f1', 
                                            marginRight: '10px', 
                                            position: 'fixed', 
                                            top: '49%', 
                                            left: '10%'} :
                                        {marginRight: '10px'}}
                                    className="refier_modal_header_cancel">
                                    <FontAwesome
                                        name="backward"
                                        style={{"display": "inline-block"}} />
                                </Button>
                                {/* <Button onClick={() => this.playPause()}
                                    style={{marginRight: '10px'}}
                                    className="refier_modal_header_cancel">
                                    {this.state.playing ? 
                                        <FontAwesome
                                            title="Pause"
                                            name="pause"
                                            style={{"display": "inline-block"}} /> :
                                        <FontAwesome
                                            title="Play"
                                            name="play"
                                            style={{"display": "inline-block"}} />
                                    }
                                </Button> */}
                                <Button onClick={() => this.nextPage()}
                                    disabled={this.state.playedSeconds + this.props.nextPrevTimeAdd >= this.state.duration}
                                    style={this.state.fullscreen ? 
                                        {   background: '#404040', 
                                            color: '#f1f1f1', 
                                            marginRight: '10px', 
                                            position: 'fixed', 
                                            top: '49%', 
                                            right: '10%'} :
                                        {marginRight: '10px'}}
                                    className="refier_modal_header_cancel">
                                    <FontAwesome
                                        name="forward"
                                        style={{"display": "inline-block"}} />
                                </Button>
                                {
                                    !this.state.fullscreen ? 
                                        <Button onClick={() => this.fullscreenMode()}
                                            style={{marginRight: '10px'}}
                                            className="refier_modal_header_cancel">
                                            <FontAwesome
                                                name="expand"
                                                style={{"display": "inline-block"}} />
                                        </Button> :
                                        null
                                }
                            </div>
                        </Row>
                    </Grid>
                </Media.Body>
            </Media>
        </div>)

        return video_player;
    }

    render() {
        // console.log("DocumentPlayer::props", this.props, this.state)

        let url = this.props.document ? 
                    this.props.document.document_url ? 
                        this.props.document.document_url :
                            this.props.document.url ? 
                                this.props.document.url : 
                        null
                    : null

        return (
            <Modal show={this.props.showModal} onHide={this.props.onClose}
                keyboard={false}
                dialogClassName={this.props.dialogClassName} className="custom-map-modal"
                bsSize={this.props.size ? this.props.size : null}>
                {
                    !this.state.fullscreen ?
                        <Modal.Header
                            style={{
                                backgroundColor: "white",
                                color: "#797979",
                                borderBottomWidth: "0px"
                            }} >
                            <Grid fluid>
                                <Col xs={8} className="refier_modal_header_dark_content"
                                    style={{ textAlign: "left" }}>
                                    {this.props.document.title ? this.props.document.title :
                                    this.props.document.name?this.props.document.name:""}
                                </Col>
                                <Col xs={4} style={{ textAlign: "right" }}>
                                    <Button onClick={this.closeModal}
                                        className="refier_modal_header_cancel">
                                        <FontAwesome
                                            name="close"
                                            style={{"display": "inline-block"}} />
                                    </Button>
                                </Col>
                            </Grid>
                        </Modal.Header> :
                        null
                }
                <Modal.Body 
                    style={this.state.fullscreen ? 
                        { maxHeight: "99vh", padding: "0px" } : 
                        { maxHeight: '90vh', padding: '0px'}
                    } >
                    {url ? 
                        this.render_video_player() : <Preloader />}
                </Modal.Body>
            </Modal>
        )
    }
}

export default DocumentPlayer;