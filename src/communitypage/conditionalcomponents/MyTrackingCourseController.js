import React, { Component } from 'react';
import 'redux'
import { connect } from 'react-redux'

// import {setMonitoringPermissionsForModule, assignMembersToCourse } from './action'
// import MonitoringPermission from '../presentationalcomponents/MonitoringPermission'
import { COMMUNITY_LABEL } from '../../GlobalConstants';
// import ComponentsModal from "../../shared/CommonModal";
import MyTrackingCourse from "../presentationalcomponents/MyTrackingCourse"


class MyTrackingCourseController extends Component {

	constructor(props) {
		super(props);
		this.state = {
            assignModal: false,
            monitoringModal: false,
            monitoringMembers: [],
            assignedMembers: [],
            assignedTo: [],
            statusOfRequest: 0,
            moduleId: null,
            packageValidityId: null,
			communitylabels: COMMUNITY_LABEL.school 
		}
		this.openAssignModal = this.openAssignModal.bind(this)
        this.closeAssignModal = this.closeAssignModal.bind(this)

        this.openMonitoringModal = this.openMonitoringModal.bind(this)
        this.closeMonitoringModal = this.closeMonitoringModal.bind(this)

        this.RequestStatusFailed = this.RequestStatusFailed.bind(this)
        this.RequestStatusInProgress = this.RequestStatusInProgress.bind(this)
        this.RequestStatusReset = this.RequestStatusReset.bind(this)
        this.RequestStatusSuccessful = this.RequestStatusSuccessful.bind(this)
	}

	componentDidMount() {
		this.setCommunityLabel(this.props.communityGenericType);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.communityGenericType != nextProps.communityGenericType) {
			this.setCommunityLabel(nextProps.communityGenericType);
		}
	}

    openAssignModal( packageValidityId, members) {
        // console.log("Opening assign modal")
		this.setState({assignModal:true, assignedMembers: members, packageValidityId: packageValidityId})
	}

	closeAssignModal() {
		this.setState({assignModal:false})
	}

	openMonitoringModal(packageId, members) {
        // console.log("Opening monitoring modal")
		this.setState({monitoringModal:true, moduleId: packageId, monitoringMembers: members})
	}

	closeMonitoringModal() {
		this.setState({monitoringModal:false})
	}

    RequestStatusSuccessful() {
        this.setState({statusOfRequest:1})
    }

    RequestStatusFailed() {
        this.setState({statusOfRequest:-1})
    }

    RequestStatusInProgress() {
        this.setState({statusOfRequest:2})
    }

    RequestStatusReset() {
        this.setState({statusOfRequest:0})
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
		} else if ("training" === communityType.toLowerCase()) {
		  this.setState({ communitylabels: COMMUNITY_LABEL.training })
	  	} else if ("community" === communityType.toLowerCase()) {
		  this.setState({ communitylabels: COMMUNITY_LABEL.community })
		}
	}

	

	render() {
		// console.log("MyTrackingCourseController :: props : ", this.props)

        let myLearningModules = null
        if (this.props.communityBasicDataState) {
            myLearningModules =
            <MyTrackingCourse
				communityPackage={this.props.communityPackage}
				userId={this.props.userId}
				openAssignModal={this.openAssignModal}
				openMonitoringModal={this.openMonitoringModal}
				{...this.props}
			/>       
        }
        
		return (
			<div>
				{myLearningModules}
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
		communityTreeStructureState: store.serviceDataReducer.studentTreeStructureState,
		teacherStructureState: store.serviceDataReducer.teacherTreeStructureState,
		communityGenericType: community_generic_type,
		communityName: community_name
	}
}


export default connect(mapStateToProps)(MyTrackingCourseController);

