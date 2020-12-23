import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import { connect } from "react-redux";

import DocumentPage from "../presentationalcomponents/DocumentPage";
import { submitDocumentViewStat } from "./actions"


class DocumentController extends Component{
    constructor(props){
        super(props);
    }

    saveProgress(contentProgressDetails, content_id){
        if(!content_id){
            return;
        }
        let statDetails= {
            contentProgressDetails,
            content_id
        }
        // console.log("saveProgress :: ",statDetails)
        this.props.dispatch(submitDocumentViewStat(statDetails))
    }

    render() {
        // console.log("DocumentController:: props", this.props)

        return(
            <DocumentPage 
                mentorDetails={this.props.mentorDetails}
                contentDetails={this.props.fromOtherPage ?
                    this.props.contentListFromOtherPage :
                    this.props.contentDetails}
                fromOtherPage={this.props.fromOtherPage ? true : false}
                userCredits={this.props.userCredits}
                saveProgress={this.saveProgress}/>
        );
    }
}

var mapStateToProps = (store) => {
    // console.log(store);
    return {
        mentorDetails : store.dashboardDataReducer.mentorDetails,
        userCredits: store.userProfileReducer.credits
    };
}   

export default  connect(mapStateToProps)(DocumentController);