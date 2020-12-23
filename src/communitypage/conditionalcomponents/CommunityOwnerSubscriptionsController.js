import React, { Component } from 'react';
import SchoolHeaderNew from '../presentationalcomponents/SchoolHeaderNew'
import { getSchoolName, getCommunitySubscriptions, getCommunityAllSubscriptions } from './action.js'
import 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, button, Image, imageShapeInstance, imageResponsiveInstance, Thumbnail } from 'react-bootstrap';
import {
	getCommunityBasicDetails, checkIfCommunityOwner, checkIfCommunityMember, fetchPendingJoiningRequests,
	changeCommunityRequestStatus, uploadImageOrFile, requestForInvoice
} from './action.js'
import CommunitySubscriptions from '../presentationalcomponents/Subscriptions/CommunitySubscriptions'

class CommunitySubscriptionsController extends Component {

	constructor(props) {
		super(props);
		this.state={
			isInvoiceRequesting:[],
			isInvoiceRequested:[]
		}

		this.requestingForInvoice = this.requestingForInvoice.bind(this)
		this.requestedForInvoice = this.requestedForInvoice.bind(this)
		this.makeRequestForInvoice = this.makeRequestForInvoice.bind(this)
		this.failedRequestForInvoice = this.failedRequestForInvoice.bind(this)
	}

	componentDidMount() {
		if(this.props.communityId){
			// console.log("CommunitySubscriptionsController :: componentDidMount")
			this.props.dispatch(getCommunityAllSubscriptions(this.props.communityId));
			this.props.dispatch(checkIfCommunityOwner(this.props.communityId));
			this.props.dispatch(checkIfCommunityMember(this.props.communityId));

		}
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.communitySubscriptions) {
			// console.log("CommunitySubscriptionsController :: componentWillReceiveProps :: getCommunityAllSubscriptions")
            this.props.dispatch(getCommunityAllSubscriptions(nextProps.communityId));
		}
		if(!nextProps.communityBasicDataState){
			// console.log("CommunitySubscriptionsController :: componentWillReceiveProps :: getCommunityBasicDetails")
			this.props.dispatch(getCommunityBasicDetails(nextProps.communityId));
		}
	}

	requestingForInvoice(pk){
		let requests = this.state.isInvoiceRequesting
		requests.push(pk)
		this.setState({isInvoiceRequesting:requests})
	}

	requestedForInvoice(pk){
		let requests = this.state.isInvoiceRequested
		requests.push(pk)
		this.setState({isInvoiceRequested:requests})
	}

	failedRequestForInvoice(pk){
		let requests = this.state.isInvoiceRequesting
		requests.pull(pk)
		this.setState({isInvoiceRequesting:requests})
	}

	makeRequestForInvoice(pk){
		this.requestingForInvoice(pk)
		let returnPromise = this.props.dispatch(requestForInvoice(pk))
        returnPromise.then((response) => {
			// console.log("makeRequestForInvoice", response)
			if(response == "Success"){
				this.requestedForInvoice(pk)
			}
        }) 
	}


	render() {

		let schoolNameRenderElement = null;
		// console.log("CommunitySubscriptionsOwnerController:props",this.props)

		if (this.props.communityBasicDataState) {
			schoolNameRenderElement =
				<CommunitySubscriptions
					communityBasicDataState={this.props.communityBasicDataState}
					communityId={this.props.communityId}
					communityOwnershipStateValue={this.props.communityOwnershipState[this.props.communityId]}
					communityMembershipStateValue={this.props.communityMembershipState[this.props.communityId]}
					userId={this.props.userId}
					communitySubscriptions={this.props.communitySubscriptions}
					makeRequestForInvoice={this.makeRequestForInvoice}
					requestedForInvoice={this.state.isInvoiceRequested}
					requestingForInvoice={this.state.isInvoiceRequesting}
				/>
		}

		return (
			<div>
				<div>
					{schoolNameRenderElement}
				</div>
			</div>

		);
	}
}

var mapStateToProps = (store) => {
	return {
		communityBasicDataState: store.communityPageDataReducer.communityBasicDataState,
		communityOwnershipState: store.communityOwnershipReducer,
		communityMembershipState: store.communityMembershipReducer,
		userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
		communitySubscriptions : store.communityPageDataReducer.communityAllSubscriptionsState,
	}

}


export default connect(mapStateToProps)(CommunitySubscriptionsController);

