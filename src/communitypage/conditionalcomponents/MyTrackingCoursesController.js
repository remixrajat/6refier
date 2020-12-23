import React, { Component } from 'react';
import 'redux'
import { connect } from 'react-redux'

// import {checkIfCommunityOwner, checkIfCommunityMember
// } from '../../communitypage/conditionalcomponents/action'
// import MyLearningModulesList from '../presentationalcomponents/MyLearningModulesList'
// import MonitoringPermission from '../presentationalcomponents/MonitoringPermission'
import { COMMUNITY_LABEL } from '../../GlobalConstants';
import { getMyTrackingCourses } from './action'
import MyLearningModulesList from './MyTrackingCourseList'


class MyTrackingCoursesController extends Component {
	constructor(props) {
		super(props);
		this.state = {
			communitylabels: COMMUNITY_LABEL.school 
		}
	}

	componentDidMount() {
        this.setCommunityLabel(this.props.communityGenericType);
        this.props.dispatch(getMyTrackingCourses(this.props.match.params.communityId));
	  }

	componentWillReceiveProps(nextProps) {
		if (this.props.communityGenericType != nextProps.communityGenericType) {
			this.setCommunityLabel(nextProps.communityGenericType);
		}
	}


	setCommunityLabel(communityType) {
		if ("school" === communityType.toLowerCase()) {
			this.setState({ communitylabels: COMMUNITY_LABEL.school });
		} else if ("ngo" === communityType.toLowerCase()) {
			this.setState({ communitylabels: COMMUNITY_LABEL.ngo })
		} else if ("college" === communityType.toLowerCase()) {
			this.setState({ communitylabels: COMMUNITY_LABEL.college })
		} else if ("institute" === communityType.toLowerCase()) {
			this.setState({ communitylabels: COMMUNITY_LABEL.institutions })
		} else if ("corporate" === communityType.toLowerCase()) {
			this.setState({ communitylabels: COMMUNITY_LABEL.corporate })
		}else if ("training" === communityType.toLowerCase()) {
		  this.setState({ communitylabels: COMMUNITY_LABEL.training })
	  }else if ("community" === communityType.toLowerCase()) {
		  this.setState({ communitylabels: COMMUNITY_LABEL.community })
		}
	}
	

	render() {
		// console.log("MyTrackingCoursesController :: props : ", this.props)

		return (
			<div>
				{this.props.communityBasicDataState?
					<MyLearningModulesList
						communityBasicDataState={this.props.communityBasicDataState}
						communityId={this.props.match.params.communityId}
						communityOwnershipStateValue={this.props.communityOwnershipState[this.props.communityId]}
						communityMembershipStateValue={this.props.communityMembershipState[this.props.communityId]}
						userId={this.props.userId}
						communityPackagesAsOwner={this.props.communityCourseTracker}
						communityTreeStructure={
							this.props.communityTreeStructureState ?
								this.props.communityTreeStructureState : null
						}
						teacherStructureState={
							this.props.teacherStructureState ?
								this.props.teacherStructureState : null
						}
					/> :
					null
				}
			</div>

		);
	}
}

var mapStateToProps = (store, ownProps) => {
	let community_generic_type = "school";
	let community_name = ""
	
    for (let communityList in store.appDataReducer.communityListStateMemberOnly) {
        if (ownProps.communityId === store.appDataReducer.communityListStateMemberOnly[communityList].pk) {
            // console.log("MyLearningModulesController :: generic_type", store.appDataReducer.communityListStateMemberOnly[communityList].fields.generic_type);
          community_generic_type = store.appDataReducer.communityListStateMemberOnly[communityList].fields.generic_type;
          community_name = store.appDataReducer.communityListStateMemberOnly[communityList].fields.entity_name
        }
	}
	
	return {
		communityBasicDataState: store.communityPageDataReducer.communityBasicDataState,
		communityOwnershipState: store.communityOwnershipReducer,
		communityMembershipState: store.communityMembershipReducer,
		userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
		communityCourseTracker: store.communityPageDataReducer.communityCourseTracker,
		communityTreeStructureState: store.serviceDataReducer.studentTreeStructureState,
		teacherStructureState: store.serviceDataReducer.teacherTreeStructureState,
		communityGenericType: community_generic_type,
		communityName: community_name
	}
}


export default connect(mapStateToProps)(MyTrackingCoursesController);

