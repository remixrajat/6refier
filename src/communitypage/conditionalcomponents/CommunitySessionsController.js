import React, { Component } from 'react';
import 'redux'
import { connect } from 'react-redux'

import {getCommunitySessionsData} from '../../servicepage/conditionalcomponents/action'
import CommunitySessions from '../presentationalcomponents/CommunitySessions';


class CommunitySessionsController extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getCommunitySessionsData(this.props.match.params.communityId));
  }

  componentWillReceiveProps(nextProps){
    if(this.props.match.params.communityId != nextProps.match.params.communityId) {
      this.props.dispatch(getCommunitySessionsData(this.props.match.params.communityId));
    }
  }

  render() {
    // console.log("CommunitySessionsController :: props : ", this.props)

    let schoolComponentsRenderElement = null
    schoolComponentsRenderElement = <CommunitySessions {...this.props} />

    return (
      schoolComponentsRenderElement
    );
  }

}

var mapStateToProps = (store , ownProps) => {
  return {
    InternalCounsellorDataState : store.communityPageDataReducer.internalmentor,
    communityStudentDataState : store.communityPageDataReducer.student,
    communityExtMentorDataState : store.communityPageDataReducer.externalmentor,
    communityTeacherDataState : store.communityPageDataReducer.teacher,
    communitySessions: store.serviceDataReducer.communitySessionsState,
    userProfileId: store.userProfileReducer.userId
  }
}

export default connect(mapStateToProps)(CommunitySessionsController);
