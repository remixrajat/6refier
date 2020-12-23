import React from 'react'

const VideoCard = (props) => {

    return (
        <div className="preloader-video-card">
            <div className="preloader-video-card-photo  preloader-shimmer"></div>
            <div className="preloader-line-container" style={{marginTop: "20px"}}>
                <div className="preloader-lines preloader-shimmer"></div>
                <div className="preloader-lines preloader-shimmer"></div>
            </div>
            <div className="preloader-line-container">
                <div className="preloader-lines preloader-shimmer"></div>
                <div className="preloader-lines preloader-shimmer"></div>
            </div>
        </div>
    );
}

export default VideoCard;