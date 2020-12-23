import React, { Component } from "react";
import ReactPlayer from 'react-player'
import { Media, Col, Modal, Button, Grid } from "react-bootstrap";
import { Link } from "react-router-dom";
import FontAwesome from 'react-fontawesome';

import { Event } from '../../actionTracking/actionTracking'
import IsUsefulButton from '../../shared/TextDisplayPanels/presentationalcomponents/IsUsefulButton'
import Preloader from '../../shared/Preloader/PreLoader'


class PlayerModal extends Component {
    constructor(props) {
        super(props);

        this.state = { video_title: "Video", video_url: "" }
        this.timeWatched = undefined
        this.onVideoProgress = this.onVideoProgress.bind(this);
        this.onVideoPlay = this.onVideoPlay.bind(this);
        this.removeVideoStatUploadInterval = this.removeVideoStatUploadInterval.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.videoStatUploadInterval = null;
    }

    componentWillMount() {
        // console.log('getcontenturl', this.props.contentId)
        this.props.getContentURL(this.props.contentId);
    }

    componentWillUnmount() {
        Event(
            "VIDEO_ANALYTICS", 
            "Video Watch Time", 
            this.props.content.title + "-" + this.props.contentId, 
            this.timeWatched || 0
        )
    }

    onVideoPlay() {
        if(this.timeWatched === undefined || this.timeWatched === "0") {
            if(this.props.isVideoPage)
                Event("VIDEO_PAGE", "Click Video Start", this.props.content.title + "-" + this.props.contentId)
            else 
                Event("OTHER_PAGE", "Click Video Start", this.props.content.title + "-" + this.props.contentId)
        }

        if (!this.videoStatUploadInterval) {
            let _this = this;
            this.videoStatUploadInterval = setInterval(() => {
                _this.props.saveProgress(_this.currentVideoProgress, _this.props.contentId)
            }, 5000);
        }
    }

    removeVideoStatUploadInterval() {
        if (!this.videoStatUploadInterval) {
            return
        }
        this.props.saveProgress(this.currentVideoProgress, this.props.contentId)
        clearInterval(this.videoStatUploadInterval);
        this.videoStatUploadInterval = null;
    }

    onVideoProgress(progressStat) {
        // this.timeWatched = Math.round(progressStat['playedSeconds']).toString()
        this.timeWatched = Math.round(progressStat['playedSeconds'])
        this.currentVideoProgress = progressStat;
    }

    closeModal() {
        this.props.onClose(); 
        this.removeVideoStatUploadInterval();
    }

    render_video_player() {
        let video_player = (<div>
            <ReactPlayer onClick={this.playpause}
                //onKeyUp={this.onLeavingFullScreen.bind(this)}
                //onKeyDown={this.onLeavingFullScreen.bind(this)}
                ref={player => { this.player = player }}
                controls={true}
                width={"100%"}
                height={"50vh"}
                onProgress={this.onVideoProgress}
                onPlay={this.onVideoPlay}
                onPause={this.removeVideoStatUploadInterval}
                onEnded={this.removeVideoStatUploadInterval}
                url={this.props.contentUrl.content_url + "?t=" + this.props.content.start_from}
            />
            <Media>
                <Media.Body>
                    <Grid fluid>
                        <Col xs={12} style={{ textAlign: 'left', marginBottom: '10px' }}>
                            <IsUsefulButton is_useful_count={this.props.is_useful_count}
                                is_not_useful_count={this.props.is_not_useful_count}
                                liked_or_not={this.props.liked_or_not}
                                addLikeOrDislike={this.props.addLikeOrDislike} />
                        </Col>
                    </Grid>
                </Media.Body>
            </Media>
        </div>)

        return video_player;
    }

    render() {
        // console.log("PlayerModal::props", this.props)

        return (
            <Modal show={this.props.showModal} onHide={this.props.onClose}
                dialogClassName={this.props.dialogClassName} className="custom-map-modal"
                bsSize={this.props.size ? this.props.size : null}>
                <Modal.Header>
                    <Grid fluid>
                        {/* <Col xs={8} className="refier_modal_header_dark_content"
                            style={{ textAlign: "left" }}>{this.props.content.title}
                        </Col> */}
                        <Col xs={12} style={{ textAlign: "right" }}>
                            <Button onClick={this.closeModal}
                                // className="refier_modal_header_cancel">
                                className="refier_modal_header_cancel_alt">
                                <FontAwesome
                                    name="close"
                                    style={{"display": "inline-block"}} />
                            </Button>
                        </Col>
                    </Grid>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "90vh", padding: "0px" }}>
                    {this.props.contentUrl 
                        ? this.render_video_player() 
                        : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Preloader />
                        </div>}
                </Modal.Body>
            </Modal>
        )
    }
}

export default PlayerModal;

