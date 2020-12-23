import React, { Component } from 'react';
import 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, button, Image, imageShapeInstance, imageResponsiveInstance, Thumbnail } from 'react-bootstrap';

import {
	checkIfCommunityOwner, checkIfCommunityMember
} from '../../communitypage/conditionalcomponents/action'
import MyLearningModulesList from '../presentationalcomponents/MyLearningModulesList'
import MonitoringPermission from '../presentationalcomponents/MonitoringPermission'

import { COMMUNITY_LABEL } from '../../GlobalConstants';
import ComponentsModal from "../../shared/CommonModal";


class MyLearningModulesController extends Component {

	constructor(props) {
		super(props);
		this.state = {
			communitylabels: COMMUNITY_LABEL.school 
		}
	}

	componentDidMount() {
		this.setCommunityLabel(this.props.communityGenericType);
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

	addKeyValuesToObject(node, nodeIdNameObject) {
		if (node.children != null) {
		  for (let i = 0; i < node.children.length; i++) {
			this.addKeyValuesToObject(node.children[i], nodeIdNameObject)
		  }
		}
		nodeIdNameObject[node.value] = node.path
	}
	
	addNodeIdAndTypeToObject(node, nodeIdNameObject) {
		if (node.children != null) {
		  for (let i = 0; i < node.children.length; i++) {
			this.addKeyValuesToObject(node.children[i], nodeIdNameObject)
		  }
		}
		nodeIdNameObject[node.value] = node.type
	}
	

	render() {
		// console.log("MyLearningModulesController :: props : ", this.props)
		
		let eventMembers = []
		let nodeIdNameObject = {}
		let nodeIdTypeObject = {}
		if (this.props.communityTreeStructureState) {
		for (let i = 0; i < this.props.communityTreeStructureState.length; i++) {
			this.addKeyValuesToObject(this.props.communityTreeStructureState[i], nodeIdNameObject)
			this.addNodeIdAndTypeToObject(this.props.communityTreeStructureState[i], nodeIdTypeObject)
		}
		}
		if (this.props.teacherStructureState) {
		for (let i = 0; i < this.props.teacherStructureState.length; i++) {
			this.addKeyValuesToObject(this.props.teacherStructureState[i], nodeIdNameObject)
		}
		}
        
        let myLearningModules = null
        if (this.props.communityBasicDataState) {
            myLearningModules = <MyLearningModulesList
				communityBasicDataState={this.props.communityBasicDataState}
				communityId={this.props.communityId}
				communityOwnershipStateValue={this.props.communityOwnershipState[this.props.communityId]}
				communityMembershipStateValue={this.props.communityMembershipState[this.props.communityId]}
				userId={this.props.userId}
				communityPackagesAsOwner={this.props.communityPackagesAsOwner}
				
				communityTreeStructure={
					this.props.communityTreeStructureState ?
						this.props.communityTreeStructureState : null
				}
				teacherStructureState={
					this.props.teacherStructureState ?
						this.props.teacherStructureState : null
				}
            />        
		}
		
		// let modalBodyState = <MonitoringPermission members={eventMembers}
		// 	communityTreeStructure={
		// 		this.props.communityTreeStructureState ?
		// 		this.props.communityTreeStructureState : null
		// 	}
		// 	teacherStructureState={
		// 		this.props.teacherStructureState ?
		// 		this.props.teacherStructureState : null
		// 	}
		// 	nodeIdNameObject={nodeIdNameObject}
		// 	// onAddSelected={this.onAddSelected}
		// 	// onNotify={this.onNotify}
		// 	// isAddMembersClicked={this.state.isAddMembersClicked}
		// 	// countOfMembers={this.state.countOfMembers}
		// 	// event_status={this.state.event_status}
		// 	communitylabels={this.state.communitylabels} />
		return (
			<div>
				{myLearningModules}
				{/* <ComponentsModal
					showModal={this.state.assignModal}
					close={this.closeAssignModal}
					modalHeading={"Monitoring Permission"}
					modalBody={modalBodyState}
					/> */}
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
		communityPackagesAsOwner: store.serviceDataReducer.communityPackagesAsOwner,
		communityTreeStructureState: store.serviceDataReducer.studentTreeStructureState,
		teacherStructureState: store.serviceDataReducer.teacherTreeStructureState,
		communityGenericType: community_generic_type,
		communityName: community_name
	}

}


export default connect(mapStateToProps)(MyLearningModulesController);

