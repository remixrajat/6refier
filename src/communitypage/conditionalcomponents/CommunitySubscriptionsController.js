import React, { Component } from 'react';
import 'redux'
import { connect } from 'react-redux'

import {
	getCommunityBasicDetails, checkIfCommunityOwner, checkIfCommunityMember, fetchPendingJoiningRequests,
	getCommunitySubscriptions
} from './action.js'
import CommunitySubscriptions from '../presentationalcomponents/Subscriptions/CommunitySubscriptions'


class CommunitySubscriptionsController extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(getCommunityBasicDetails(this.props.match.params.communityId));
		this.props.dispatch(getCommunitySubscriptions(this.props.match.params.communityId));

		// if (this.props.communityOwnershipState[this.props.match.params.communityId] == null) {
			this.props.dispatch(checkIfCommunityOwner(this.props.match.params.communityId));
			this.props.dispatch(checkIfCommunityMember(this.props.match.params.communityId));
		// }
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.communityId != nextProps.match.params.communityId) {
			this.props.dispatch(getCommunityBasicDetails(nextProps.match.params.communityId));
            this.props.dispatch(getCommunitySubscriptions(this.props.match.params.communityId));

			// if (this.props.communityOwnershipState[nextProps.match.params.communityId] == null) {
				this.props.dispatch(checkIfCommunityOwner(nextProps.match.params.communityId));
				this.props.dispatch(checkIfCommunityMember(nextProps.match.params.communityId));
			// }
		}
	}


	render() {
		// console.log("CommunitySubscriptionsController:props",this.props)

		let schoolNameRenderElement = null;

		if (this.props.communityBasicDataState) {
			schoolNameRenderElement =
				<CommunitySubscriptions
					communityBasicDataState={this.props.communityBasicDataState}
					communityId={this.props.match.params.communityId}
					communityOwnershipStateValue={this.props.communityOwnershipState[this.props.match.params.communityId]}
					communityMembershipStateValue={this.props.communityMembershipState[this.props.match.params.communityId]}
					userId={this.props.userId}
					communitySubscriptions={this.props.communitySubscriptions}
					fromCommunityProfile={this.props.fromCommunityProfile ? this.props.fromCommunityProfile : false}
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
		communitySubscriptions : store.communityPageDataReducer.communitySubscriptionsState,
	}

}


export default connect(mapStateToProps)(CommunitySubscriptionsController);

