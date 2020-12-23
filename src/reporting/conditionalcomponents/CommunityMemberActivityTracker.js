import React, { Component } from "react";
import "redux";
import { connect } from "react-redux";

import { getCommunitySubscriptionReport, getUserActivityReport} from './action'
import CommunityMembersActivityReport from '../presentationalcomponents/CommunityMembersActivityReport'


class CommunityMemberActivityTracker extends Component {

    componentWillMount() {
        this.props.dispatch(getCommunitySubscriptionReport(this.props.communityId))
        // this.props.dispatch(getUserActivityReport(this.props.communityId))
    }

    render() {
        // console.log("CommunityMemberActivityTracker :: props ", this.props)

        return (
            <CommunityMembersActivityReport {...this.props}/>
        )
    }
}


var mapStateToProps =  (store, ownProps) => {
    return {
        communityActivityReport: store.communityPageDataReducer.communityAcitivityReports,
    };
};
  
export default connect(mapStateToProps)(CommunityMemberActivityTracker);