import React from 'react'

const LongCard = (props) => {

    return (
        <div className="preloader-long-card">
            <div className="preloader-line-container">
                <div className="preloader-lines preloader-shimmer"></div>
                <div className="preloader-lines preloader-shimmer"></div>
            </div>
            <div style={{margin: "20px 0"}}></div>
            <div className="preloader-line-container">
                <div className="preloader-lines preloader-shimmer"></div>
                <div className="preloader-lines preloader-shimmer"></div>
            </div>
        </div>
    );
}

export default LongCard;