import React, { Component } from 'react';
import SchoolHeader from '../presentationalcomponents/schoolheader.js'
import { getSchoolName, getCommunitySubscriptions } from './action.js'
import 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, button, Image, imageShapeInstance, imageResponsiveInstance, Thumbnail } from 'react-bootstrap';
import {
  getCommunityBasicDetails, checkIfCommunityOwner, checkIfCommunityMember, fetchPendingJoiningRequests,
  changeCommunityRequestStatus, uploadImageOrFile, checkIfInternalExpert, checkIfExternalExpert
} from './action.js'
import Request from '../presentationalcomponents/CommunityProfile/Requests'
import RequestsToJoin from '../presentationalcomponents/CommunityProfile/RequestsToJoin.js';

class SchoolHeaderController extends Component {

  constructor(props) {
    super(props);
    this.state = { showRequestsModal: false };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ showRequestsModal: false });
  }

  open() {
    this.setState({ showRequestsModal: true });
  }

  componentDidMount() {
    this.props.dispatch(getCommunityBasicDetails(this.props.match.params.communityId));
    this.props.dispatch(getCommunitySubscriptions(this.props.match.params.communityId));

    if (this.props.communityOwnershipState[this.props.match.params.communityId] == null) {
      this.props.dispatch(checkIfCommunityOwner(this.props.match.params.communityId));
      this.props.dispatch(checkIfCommunityMember(this.props.match.params.communityId));
      this.props.dispatch(checkIfInternalExpert(this.props.match.params.communityId));
      this.props.dispatch(checkIfExternalExpert(this.props.match.params.communityId));
    }
    else {
      this.props.dispatch(fetchPendingJoiningRequests(this.props.match.params.communityId));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.communityId != nextProps.match.params.communityId) {
      this.props.dispatch(getCommunityBasicDetails(nextProps.match.params.communityId));

      if (this.props.communityOwnershipState[nextProps.match.params.communityId] == null) {
        this.props.dispatch(checkIfCommunityOwner(nextProps.match.params.communityId));
        this.props.dispatch(checkIfCommunityMember(nextProps.match.params.communityId));
        this.props.dispatch(checkIfInternalExpert(nextProps.match.params.communityId));
        this.props.dispatch(checkIfExternalExpert(nextProps.match.params.communityId));
      }
      else {
        this.props.dispatch(fetchPendingJoiningRequests(nextProps.match.params.communityId));
      }
    }
    else if (nextProps.communityOwnershipState[nextProps.match.params.communityId] &&
      !this.props.communityOwnershipState[nextProps.match.params.communityId]) {
      this.props.dispatch(fetchPendingJoiningRequests(nextProps.match.params.communityId));
    }
  }

  changeCommunityApplicationStatus(applicationId, status, e) {
    let commId = this.props.match.params.communityId;
    this.props.dispatch(changeCommunityRequestStatus(commId, status, applicationId));
  }
  submitEntityProfilePicture(formdata) {
    if (this.props.communityOwnershipState && this.props.communityOwnershipState[this.props.match.params.communityId]) {
      formdata.append('entityid', this.props.match.params.communityId);
      this.props.dispatch(uploadImageOrFile(formdata, "updateCommunityPicture/"));
    }
  }

  render() {

    // console.log("SchoolHeaderController:props", this.props)
    let schoolNameRenderElement = null;

    if (this.props.communityBasicDataState) {
      schoolNameRenderElement =
        <SchoolHeader
          communityBasicDataState={this.props.communityBasicDataState}
          communityId={this.props.match.params.communityId}
          communityOwnershipStateValue={this.props.communityOwnershipState[this.props.match.params.communityId]}
          openRequestsModal={this.open} {...this.props} submitProfilePicture={this.submitEntityProfilePicture.bind(this)}
          communitySubscriptions={this.props.communitySubscriptions}
          openRequestToJoin={this.openRequestToJoin}
        />
    }

    return (
      <div>
        <div>
          {schoolNameRenderElement}
        </div>
        <Request close={this.close} showModal={this.state.showRequestsModal} {...this.props}
          changeCommunityApplicationStatus={this.changeCommunityApplicationStatus.bind(this)} />
        <RequestsToJoin close={this.closeRequestToJoin}
          showModal={this.state.showRequestToJoinModal} {...this.props} />
      </div>

    );
  }
}

var mapStateToProps = (store) => {
  return {
    communityBasicDataState: store.communityPageDataReducer.communityBasicDataState,
    communityOwnershipState: store.communityOwnershipReducer,
    pendingRequestState: store.communityPageDataReducer.pendingRequestState,
    userId: (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
    communitySubscriptions: store.communityPageDataReducer.communitySubscriptionsState,
    owners: store.communityPageDataReducer.owner,
  }

}


export default connect(mapStateToProps)(SchoolHeaderController);

