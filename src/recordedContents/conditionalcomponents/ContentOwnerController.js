import React, {Component} from "react";
import ContentPage from "../presentationalcomponents/ContentsPage"
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
    getContentDetails, getContentAccess, getContentURL, likeOrDislikeContents,
    getContentLikesDislikesMapping, getContentStats, submitVideoViewStat
} from "./actions"
import ContentListOwner from '../presentationalcomponents/ContentListOwner'


class ContentOwnerController extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.getContentURL = this.getContentURL.bind(this);
    }


    getContentURL(content_id){
        this.props.dispatch(getContentURL(content_id));
    }

    render(){
        // console.log("ContentOwnerController: props", this.props);
        return (
            <div>
                <ContentListOwner
                    contentDetails={this.props.contentList}
                    getContentURL={this.getContentURL}
                    contentUrls={this.props.contentUrls}/>
                </div>
            )
    }
}

var mapStateToProps = (store) => {
    // console.log(store);
    return {
            mentorDetails : store.dashboardDataReducer.mentorDetails,
            contentDetails: store.recordedContentPageReducer.contentDetails,
            contentUrls : store.recordedContentPageReducer.contentUrls,
            contentAccess : store.recordedContentPageReducer.contentAccess,
            contentStats : store.recordedContentPageReducer.contentStats,
            contentLikesMapping : store.recordedContentPageReducer.contentLikesMapping,
            userCredits: store.userProfileReducer.credits
        };
}   

export default  connect(mapStateToProps)(ContentOwnerController);