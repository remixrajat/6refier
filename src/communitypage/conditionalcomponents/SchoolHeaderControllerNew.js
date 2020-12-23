import React, { Component } from 'react';
import 'redux'
import { connect } from 'react-redux'
import { 
	Grid, Row, Col, button, Image, imageShapeInstance, imageResponsiveInstance, Thumbnail,
	Form, FormGroup, FormControl, Checkbox, Button, ControlLabel
} from 'react-bootstrap';

import {
	getCommunityBasicDetails, checkIfCommunityOwner, checkIfCommunityMember, 
	fetchPendingJoiningRequests, changeCommunityRequestStatus, uploadImageOrFile, 
	getCommunitySubscriptions, getApplicationStatus, submitDiscussionRoom, checkIfExternalExpert,
	checkIfInternalExpert
} from './action.js'
import SchoolHeaderNew from '../presentationalcomponents/SchoolHeaderNew'
import Request from '../presentationalcomponents/CommunityProfile/Requests'
import RequestsToJoin from '../presentationalcomponents/CommunityProfile/RequestsToJoin'

import PreLoader from '../../shared/Preloader/PreLoader'
import CommonModal from '../../shared/CommonModal'
import { NonPriorityWhiteButton } from '../../shared/RefierComponents/NonPriorityWhiteButton.js';


class SchoolHeaderControllerNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showRequestsModal: false,
			showRequestToJoinModal: false,
			showRoomModal: false, 
			groupName: '',
			groupDesc: '',
			groupMemberCount: 100,
			groupIsPrivate: false,
			roomCreateLoader: 0,
			requestaction: 0,
			applicationId: "",
			imageUploadProgress: 0, 
		};
		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.closeRequestToJoin = this.closeRequestToJoin.bind(this)
		this.openRequestToJoin = this.openRequestToJoin.bind(this)
		this.createDiscussionRoom = this.createDiscussionRoom.bind(this)
		this.closeRoomModal = this.closeRoomModal.bind(this)
		this.submitRoom = this.submitRoom.bind(this)

		this.imageUploadFailed = this.imageUploadFailed.bind(this)
		this.imageUploadProgress = this.imageUploadProgress.bind(this)
		this.imageUploadSuccess = this.imageUploadSuccess.bind(this)
		this.imageUploadReset = this.imageUploadReset.bind(this)
	}
	
	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.communityId !== nextProps.match.params.communityId) {
			this.props.dispatch(getCommunityBasicDetails(nextProps.match.params.communityId));

			if (this.props.communityOwnershipState[nextProps.match.params.communityId] == null) {
				this.props.dispatch(checkIfCommunityOwner(nextProps.match.params.communityId));
				this.props.dispatch(checkIfCommunityMember(nextProps.match.params.communityId));
				this.props.dispatch(checkIfInternalExpert(nextProps.match.params.communityId));
				this.props.dispatch(checkIfExternalExpert(nextProps.match.params.communityId));
			}
			if (nextProps.communityOwnershipState[nextProps.match.params.communityId]) {
				this.props.dispatch(fetchPendingJoiningRequests(nextProps.match.params.communityId));
			}
		}
		else if (nextProps.communityOwnershipState[nextProps.match.params.communityId] &&
			!this.props.communityOwnershipState[nextProps.match.params.communityId]) {
			this.props.dispatch(fetchPendingJoiningRequests(nextProps.match.params.communityId));
		}
	}
	
	componentWillMount() {
		this.props.dispatch(getCommunityBasicDetails(this.props.match.params.communityId));
		this.props.dispatch(getCommunitySubscriptions(this.props.match.params.communityId));

		if (!this.props.communityOwnershipState[this.props.match.params.communityId] ) {
			this.props.dispatch(checkIfCommunityOwner(this.props.match.params.communityId));
			this.props.dispatch(checkIfCommunityMember(this.props.match.params.communityId));
			this.props.dispatch(checkIfInternalExpert(this.props.match.params.communityId));
			this.props.dispatch(checkIfExternalExpert(this.props.match.params.communityId));
			if (this.props.communityOwnershipState[this.props.match.params.communityId]) {
				this.props.dispatch(fetchPendingJoiningRequests(this.props.match.params.communityId));
			}
			this.props.dispatch(getApplicationStatus(this.props.match.params.communityId));
		}

	}

	imageUploadReset(){
		this.setState({imageUploadProgress:0})
	}

	imageUploadFailed(){
		this.setState({imageUploadProgress:-1})
	}

	imageUploadSuccess(){
		this.setState({imageUploadProgress:1})
	}

	imageUploadProgress(){
		this.setState({imageUploadProgress:2})
	}

	close() {
		this.setState({ showRequestsModal: false });
	}

	open() {
		this.setState({ showRequestsModal: true });
	}

	closeRequestToJoin() {
		this.setState({ showRequestToJoinModal: false })
	}

	openRequestToJoin() {
		this.setState({ showRequestToJoinModal: true })
	}

	createDiscussionRoom() {
		this.setState({ showRoomModal: true });
	}

	closeRoomModal() {
		this.setState({ showRoomModal: false });
	}

	submitRoom(e) {
		e.preventDefault();
		if(this.state.groupDesc.length > 500 || this.state.groupName.length > 200)
			return;
		const formData = {
			"room_name": this.state.groupName,
			"room_desc": this.state.groupDesc,
			"room_member_count": this.state.groupMemberCount,
			"room_is_private": this.state.groupIsPrivate,
			"community_id": this.props.match.params.communityId
		}
		let roomPromise = this.props.dispatch(submitDiscussionRoom(formData));
		this.setState({ roomCreateLoader: 2 })               
        roomPromise.then((resp) => {
                // console.log("******Response from server for isUserFollows: ", resp);
                let status = 0

                if(typeof resp == "undefined")  status = -1;
                else if(resp === 1) status = 1;

                this.setState({ roomCreateLoader: status })             
				setTimeout(() => {
					this.setState({ roomCreateLoader: 0 });
					this.closeRoomModal(); 
				}, 1000)                  
        })
	}

	validateName() {
		const length = this.state.groupName.length;
		if(length < 1) return 'null'
		else if(length < 200) return 'success'
		else if(length > 200) return 'error'
		return null;
	}

	validateDescription() {
		const length = this.state.groupDesc.length;
		if(length < 1) return 'null'
		else if(length < 500) return 'success'
		else if(length > 500) return 'error'
		return null;
	}

	changeCommunityApplicationStatus(applicationId, status, e) {
		let commId = this.props.match.params.communityId;
		let roomPromise = this.props.dispatch(changeCommunityRequestStatus(commId, status, applicationId));
		this.setState({ requestaction: 2, applicationId: applicationId})  
		roomPromise.then((resp) => {
			console.log("******Response from server for changeCommunityApplicationStatus: ", resp);
			let status = 0

			if (typeof resp == undefined)
				status = -1;
			else
				status = 1;

			this.setState({ requestaction: status })             
			                
		})
	}

	submitEntityProfilePicture(formdata) {
		if (this.props.communityOwnershipState && this.props.communityOwnershipState[this.props.match.params.communityId]) {
			formdata.append('entityid', this.props.match.params.communityId);
			this.props.dispatch(uploadImageOrFile(formdata, "updateCommunityPicture/"))
		}
	}


	render() {
		// console.log("SchoolHeaderControllerNew:props", this.props)

		let schoolNameRenderElement = null;

		if (this.props.communityBasicDataState) {
			schoolNameRenderElement =
				<SchoolHeaderNew
					communityBasicDataState={this.props.communityBasicDataState}
					communityId={this.props.match.params.communityId}
					communityOwnershipStateValue={this.props.communityOwnershipState[this.props.match.params.communityId]}
					communityMembershipStateValue={this.props.communityMembershipState[this.props.match.params.communityId]}
					communityMemberShipRequestValue={this.props.communityMemberShipRequest[this.props.match.params.communityId]}
					openRequestsModal={this.open} {...this.props} 
					submitProfilePicture={this.submitEntityProfilePicture.bind(this)}
					openRequestToJoin={this.openRequestToJoin}
					userId={this.props.userId}
					communitySubscriptions={this.props.communitySubscriptions}
					createDiscussionRoom={this.createDiscussionRoom}
					imageUploadProgress={this.state.imageUploadProgress}
					imageUploadReset={this.imageUploadReset}
				/>
		}

		let modalBody = ( <Form horizontal onSubmit={this.submitRoom} className="group-discussion-form">
							<FormGroup controlId="formHorizontalName" validationState={this.validateName()}>
								<Col sm={3}>
									<ControlLabel>Group Name</ControlLabel>
								</Col>
								<Col sm={9}>
									<FormControl 
										state={this.state.groupName}
										onChange={(e) => this.setState({groupName: e.target.value})}
										type="text" 
										required
										autoFocus
										placeholder="Group Name..." />
								</Col>
								<FormControl.Feedback />
							</FormGroup>
						
							<FormGroup controlId="formHorizontalDesc" validationState={this.validateDescription()}>
								<Col sm={3}>
									<ControlLabel>Group Description</ControlLabel>
								</Col>
								<Col sm={9}>
									<FormControl
										state={this.state.groupDesc}
										onChange={(e) => this.setState({groupDesc: e.target.value})} 
										componentClass="textarea" 
										placeholder="Group Description..." />
								</Col>
								<FormControl.Feedback />
							</FormGroup>

							{/* <FormGroup controlId="formHorizontalMember">
								<Col sm={3}>
									<ControlLabel>Maximum Members</ControlLabel>
								</Col>
								<Col sm={9}>
									<FormControl 
										value={this.state.groupMemberCount}
										onChange={(e) => this.setState({groupMemberCount: e.target.value})}
										type="text"/>
								</Col>
							</FormGroup> */}
						
							<FormGroup>
								<Col smOffset={3} sm={9}>
									<Checkbox
										value={this.state.groupIsPrivate}
										onChange={(e) => this.setState({groupIsPrivate: !this.state.groupIsPrivate})}>
										Is Private
									</Checkbox>
								</Col>
							</FormGroup>	

							<FormGroup>
								{
									this.state.roomCreateLoader === 2 ? 
										<Col smOffset={3} sm={9}>
											<PreLoader />
										</Col> :
										<div>
											<Col smOffset={3} sm={2}>
												<Button 
													className="refier_custom_button_new_selected_2" 
													type="submit">Submit
												</Button>
											</Col>
											<Col sm={2}>
												<NonPriorityWhiteButton 
													onButtonClick={this.closeRoomModal}
													buttonText="Close"
												/>
											</Col>
										</div>
								}
							</FormGroup>	

							<FormGroup>
								<Col smOffset={3} sm={9}>
									{
										this.state.roomCreateLoader === 1 ? 
											<span className="form-status-success">Success</span> :
											this.state.roomCreateLoader === -1 ?
												<span className="form-status-fail">request failed</span> :
												''
									}
								</Col>
							</FormGroup>

				
						</Form> );

		return (
			<div>
				<div>
					{schoolNameRenderElement}
				</div>
				<Request close={this.close} showModal={this.state.showRequestsModal} {...this.props}
					changeCommunityApplicationStatus={this.changeCommunityApplicationStatus.bind(this)}
					requestaction={this.state.requestaction}
					applicationId={this.state.applicationId}/>
				<RequestsToJoin close={this.closeRequestToJoin}
					showModal={this.state.showRequestToJoinModal} {...this.props} />
				<CommonModal
					showModal={this.state.showRoomModal}
					modalHeading="Create a New Discussion Room"
					hideFooter={true}
					modalBody={modalBody}
				/>
			</div>

		);
	}
}

var mapStateToProps = (store) => {
	return {
		communityBasicDataState: store.communityPageDataReducer.communityBasicDataState,
		communityOwnershipState: store.communityOwnershipReducer,
		communityMembershipState: store.communityMembershipReducer,
		communityMemberShipRequest: store.communityMembershipRequestReducer,
		pendingRequestState: store.communityPageDataReducer.pendingRequestState,
		userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
		communitySubscriptions : store.communityPageDataReducer.communitySubscriptionsState,
		owners: store.communityPageDataReducer.owner,
	}

}


export default connect(mapStateToProps)(SchoolHeaderControllerNew);

