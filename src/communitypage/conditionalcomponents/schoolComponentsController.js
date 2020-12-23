import React, { Component } from 'react';
import SchoolComponents from '../presentationalcomponents/schoolComponents.js';
import {getCommunityMemberDetails, getCommunitySubscriptions} from './action.js'
import 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, button, Image, imageShapeInstance, imageResponsiveInstance, Thumbnail } from 'react-bootstrap';
import {getCommunitySessionsData} from '../../servicepage/conditionalcomponents/action'

class SchoolComponentsController extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(getCommunityMemberDetails(this.props.match.params.communityId));
    this.props.dispatch(getCommunitySessionsData(this.props.match.params.communityId));
  }

  componentWillReceiveProps(nextProps){
    if(this.props.match.params.communityId != nextProps.match.params.communityId){
      this.props.dispatch(getCommunityMemberDetails(nextProps.match.params.communityId));
      this.props.dispatch(getCommunitySessionsData(this.props.match.params.communityId));
    }
  }

  render() {
    let schoolComponentsRenderElement = null

    schoolComponentsRenderElement =
      <div>
        <SchoolComponents {...this.props} />
      </div>

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
          communityMembershipState: store.communityMembershipReducer,
  }
}

export default connect(mapStateToProps)(SchoolComponentsController);
