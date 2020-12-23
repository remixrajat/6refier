import React, { Component } from "react";
import "redux";
import { connect } from "react-redux";

import SubscribedActivityReport from '../presentationalcomponents/SubscribedActivityReport'


class CommunityContentTracker extends Component {
    render() {
        // console.log("CommunityContentTracker :: props ", this.props)

        return (
            <SubscribedActivityReport {...this.props}/>
        )
    }
}


var mapStateToProps =  (store, ownProps) => {
    return {
        communityActivityReport: store.communityPageDataReducer.communityAcitivityReports,
    };
};
  
export default connect(mapStateToProps)(CommunityContentTracker);