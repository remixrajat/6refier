import React from 'react'

const PostCard = (props) => {

    return (
        <div className="preloader-post-card">
            <div className="preloader-post-header">
                <div className="preloader-photo-container">
                    <div className="preloader-photo preloader-shimmer"></div>
                </div>
                <div className="preloader-line-container">
                    <div className="preloader-lines preloader-shimmer"></div>
                    <div className="preloader-lines preloader-shimmer"></div>
                </div>
            </div>
            <div className="preloader-post-body preloader-shimmer"></div>
        </div>
    );
}

export default PostCard;