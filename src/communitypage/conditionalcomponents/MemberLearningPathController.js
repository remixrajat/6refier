import React, { Component } from "react";
import "redux";
import { connect } from "react-redux";
import { getMyCommunityLearningPathAndReport} from './action'
import { Tab, Grid, Tabs } from 'react-bootstrap';
import MemberLearningPath from '../presentationalcomponents/MemberLearningPath'

class MemberLearningPathController extends Component {

    componentWillMount() {
        if (this.props.communityBasicDataState && this.props.communityBasicDataState.length>0) {
            this.props.dispatch(getMyCommunityLearningPathAndReport
                ("all", this.props.communityBasicDataState[0].pk))
            return
        }
    }

    render() {
        return (
            <MemberLearningPath {...this.props}/>
        )
    }
}


var mapStateToProps =  (store, ownProps) => {
    return {
        myCommunityLearningPathAndReport: store.communityPageDataReducer.myCommunityLearningPathAndReport,
		userProfileId: store.userProfileReducer.userId
    };
  };
  
  export default connect(mapStateToProps)(MemberLearningPathController);