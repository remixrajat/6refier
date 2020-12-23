import React, { Component } from "react";
import "redux";
import { connect } from "react-redux";
import { getMyCommunityPackageAndReport} from './action'
import { Tab, Grid, Tabs } from 'react-bootstrap';
import MemberResources from '../presentationalcomponents/MemberResources'

class MemberResourceAccessController extends Component {

    componentWillMount() {
        if (this.props.communityBasicDataState && this.props.communityBasicDataState.length>0) {
            this.props.dispatch(getMyCommunityPackageAndReport
                ("all", this.props.communityBasicDataState[0].pk))
            return
        }
    }

    render() {
        return (
            <MemberResources {...this.props}/>
        )
    }
}


var mapStateToProps =  (store, ownProps) => {
    return {
        myCommunityLearningPathAndReport: store.communityPageDataReducer.myCommunityPackageAndReport,
		userProfileId: store.userProfileReducer.userId
    };
  };
  
  export default connect(mapStateToProps)(MemberResourceAccessController);