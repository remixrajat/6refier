import React, { Component } from "react";
import "redux";
import { connect } from "react-redux";
import { getCommunitySubscriptionReport, getUserActivityReport} from './action'
import { Tab, Grid, Tabs } from 'react-bootstrap';
import UserActivityReport from '../presentationalcomponents/UserActivityReport'

class UserActivityTracker extends Component {

    componentWillMount() {
        if (this.props.match.params) {
            if (this.props.match.params.package && this.props.match.params.package != "all") {
                this.props.dispatch(getUserActivityReport(this.props.match.params.package))
                return
            }
        }
        this.props.dispatch(getUserActivityReport("all"))
    }

    render() {

        // console.log("UserActivityTracker :: props ", this.props)
        return (
            <UserActivityReport {...this.props}
                package={this.props.match.params?this.props.match.params.package:null}/>
        )
    }
}


var mapStateToProps =  (store, ownProps) => {
    return {
        userActivityReport: store.appDataReducer.userActivityReport,
		userProfileId: store.userProfileReducer.userId
    };
  };
  
  export default connect(mapStateToProps)(UserActivityTracker);