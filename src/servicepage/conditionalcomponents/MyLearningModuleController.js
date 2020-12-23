import React, { Component } from 'react';
import 'redux'
import { connect } from 'react-redux'

import MonitoringPermission from '../presentationalcomponents/MonitoringPermission'
import MyLearningModule from "../presentationalcomponents/MyLearningModule"
import AssignCourse from '../presentationalcomponents/AssignCourse';
import AdminPermissions from '../presentationalcomponents/AdminPermissions'
import {setMonitoringPermissionsForModule, assignMembersToCourse, setAdminPermissionsForModule } from './action'

import ComponentsModal from "../../shared/CommonModal";
import { COMMUNITY_LABEL } from '../../GlobalConstants';


class MyLearningModuleController extends Component {
	constructor(props) {
		super(props);
		this.state = {
            assignModal: false,
            monitoringModal: false,
            adminModal: false,
            monitoringMembers: [],
            assignedMembers: [],
            adminMembers : [],
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

        this.openAdminModal = this.openAdminModal.bind(this)
        this.closeAdminModal = this.closeAdminModal.bind(this)

        this.setMonitoringPermissionForCourse = this.setMonitoringPermissionForCourse.bind(this)
        this.setMembersForCourse = this.setMembersForCourse.bind(this)
        this.setAdminPermissionForCourse = this.setAdminPermissionForCourse.bind(this)

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

	openAdminModal(packageId, members) {
        // console.log("Opening monitoring modal")
		this.setState({adminModal:true, moduleId: packageId, adminMembers: members})
	}

	closeAdminModal() {
		this.setState({adminModal:false})
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
                this.addNodeIdAndTypeToObject(node.children[i], nodeIdNameObject)
            }
		}
		nodeIdNameObject[node.value] = node.type
	}
	
	addNodeIdAndMemberTypeToObject(node, nodeIdNameObject) {
		if (node.children != null) {
            for (let i = 0; i < node.children.length; i++) {
                this.addNodeIdAndMemberTypeToObject(node.children[i], nodeIdNameObject)
            }
		}
		nodeIdNameObject[node.value] = node.member_type
    }
    
    setMonitoringPermissionForCourse(checkedStudentMembers,checkedTeacherMembers, nodeIdTypeObject ) {
        // console.log("setMonitoringPermissionForCourse :: \
        //         checkedStudentMembers, checkedTeacherMembers  : ",
        //     checkedStudentMembers, checkedTeacherMembers, nodeIdTypeObject)
        let members = []
        // members = checkedStudentMembers.concat(checkedTeacherMembers)
        for (let i = 0; i < checkedStudentMembers.length; i++){
            if (checkedStudentMembers[i] in nodeIdTypeObject) {
                // console.log("setMonitoringPermissionForCourse :: \
                //  found member : ", checkedStudentMembers[i], nodeIdTypeObject[checkedStudentMembers[i]])
                if(nodeIdTypeObject[checkedStudentMembers[i]] == "Student" || 
                    nodeIdTypeObject[checkedStudentMembers[i]] == "Owner" || 
                        nodeIdTypeObject[checkedStudentMembers[i]] == "Counsellor"||
                        nodeIdTypeObject[checkedStudentMembers[i]] == "Teacher"  ) {
                    members.push(checkedStudentMembers[i])
                    }
            }
        }
        for (let i = 0; i < checkedTeacherMembers.length; i++){
            if (checkedTeacherMembers[i] in nodeIdTypeObject) {
                // console.log("setMonitoringPermissionForCourse :: \
                //  found member : ", checkedTeacherMembers[i], nodeIdTypeObject[checkedTeacherMembers[i]])
                if(nodeIdTypeObject[checkedTeacherMembers[i]] == "Student" || 
                    nodeIdTypeObject[checkedTeacherMembers[i]] == "Owner" || 
                        nodeIdTypeObject[checkedTeacherMembers[i]] == "Counsellor"||
                        nodeIdTypeObject[checkedTeacherMembers[i]] == "Teacher"  ) {
                    members.push(checkedTeacherMembers[i])
                    }
            }
        }
        let commId = this.props.communityId
        let packageId = this.state.moduleId
        // console.log("setMonitoringPermissionForCourse :: \
        // members, commId, packageId  : ",
        // members, commId, packageId)
        this.RequestStatusInProgress()
        let returnPromise = this.props.dispatch(setMonitoringPermissionsForModule(members,
            commId, packageId))
        returnPromise.then((response) => {
            console.log("Response of setting Monitoring Permission :: ", response)
            if (response == "Success") {
                this.RequestStatusSuccessful()
            } else {
                this.RequestStatusFailed()
            }
            setTimeout(() => {
                this.RequestStatusReset()
                this.closeMonitoringModal(); 
            }, 1000) 
        })
    }

    setAdminPermissionForCourse(checkedStudentMembers,checkedTeacherMembers, nodeIdTypeObject ) {
        // console.log("setMonitoringPermissionForCourse :: \
        //         checkedStudentMembers, checkedTeacherMembers  : ",
        //     checkedStudentMembers, checkedTeacherMembers, nodeIdTypeObject)
        let members = []
        // members = checkedStudentMembers.concat(checkedTeacherMembers)
        for (let i = 0; i < checkedStudentMembers.length; i++){
            if (checkedStudentMembers[i] in nodeIdTypeObject) {
                // console.log("setMonitoringPermissionForCourse :: \
                //  found member : ", checkedStudentMembers[i], nodeIdTypeObject[checkedStudentMembers[i]])
                if(nodeIdTypeObject[checkedStudentMembers[i]] == "Student" || 
                    nodeIdTypeObject[checkedStudentMembers[i]] == "Owner" || 
                        nodeIdTypeObject[checkedStudentMembers[i]] == "Counsellor"||
                        nodeIdTypeObject[checkedStudentMembers[i]] == "Teacher"  ) {
                    members.push(checkedStudentMembers[i])
                    }
            }
        }
        for (let i = 0; i < checkedTeacherMembers.length; i++){
            if (checkedTeacherMembers[i] in nodeIdTypeObject) {
                // console.log("setMonitoringPermissionForCourse :: \
                //  found member : ", checkedTeacherMembers[i], nodeIdTypeObject[checkedTeacherMembers[i]])
                if(nodeIdTypeObject[checkedTeacherMembers[i]] == "Student" || 
                    nodeIdTypeObject[checkedTeacherMembers[i]] == "Owner" || 
                        nodeIdTypeObject[checkedTeacherMembers[i]] == "Counsellor"||
                        nodeIdTypeObject[checkedTeacherMembers[i]] == "Teacher"  ) {
                    members.push(checkedTeacherMembers[i])
                    }
            }
        }
        let commId = this.props.communityId
        let packageId = this.state.moduleId
        // console.log("setMonitoringPermissionForCourse :: \
        // members, commId, packageId  : ",
        // members, commId, packageId)
        this.RequestStatusInProgress()
        let returnPromise = this.props.dispatch(setAdminPermissionsForModule(members,
            commId, packageId))
        returnPromise.then((response) => {
            console.log("Response of setting Admin Permission :: ", response)
            if (response == "Success") {
                this.RequestStatusSuccessful()
            } else {
                this.RequestStatusFailed()
            }
            setTimeout(() => {
                this.RequestStatusReset()
                this.closeAdminModal(); 
            }, 1000) 
        })
    }
    

    setMembersForCourse(checkedStudentMembers, nodeIdTypeObject ) {
        console.log("setMembersForCourse :: \
                checkedStudentMembers  : ",
            checkedStudentMembers, nodeIdTypeObject)
        let members = []
        // members = checkedStudentMembers.concat(checkedTeacherMembers)
        for (let i = 0; i < checkedStudentMembers.length; i++){
            // if (checkedStudentMembers[i] in nodeIdTypeObject) {
            //     // console.log("setMonitoringPermissionForCourse :: \
            //     //  found member : ", checkedStudentMembers[i], nodeIdTypeObject[checkedStudentMembers[i]])
            //     if(nodeIdTypeObject[checkedStudentMembers[i]] == "Student" || 
            //         nodeIdTypeObject[checkedStudentMembers[i]] == "Owner" || 
            //             nodeIdTypeObject[checkedStudentMembers[i]] == "Counsellor"||
            //             nodeIdTypeObject[checkedStudentMembers[i]] == "Teacher"  ) {
            //         members.push(checkedStudentMembers[i])
            //         }
            // }
            members.push(checkedStudentMembers[i])
        }

        let commId = this.props.communityId
        let packageValidityId = this.state.packageValidityId
        this.RequestStatusInProgress()
        let returnPromise = this.props.dispatch(assignMembersToCourse(members,
            commId, nodeIdTypeObject, packageValidityId))
        returnPromise.then((response) => {
            console.log("Response of setting Monitoring Permission :: ", response)
            if (response == "Success") {
                this.RequestStatusSuccessful()
            } else {
                this.RequestStatusFailed()
            }
            setTimeout(() => {
                this.RequestStatusReset()
                this.closeAssignModal(); 
                
            }, 1000) 
        })
    }
	

	render() {
		// console.log("MyLearningModulesController :: props : ", this.props)
		
		let eventMembers = []
		let nodeIdNameObject = {}
        let nodeIdTypeObject = {}
        let nodeIdStudentTypeObject = {}
        
		if (this.props.communityTreeStructureState) {
		for (let i = 0; i < this.props.communityTreeStructureState.length; i++) {
			this.addKeyValuesToObject(this.props.communityTreeStructureState[i], nodeIdNameObject)
			this.addNodeIdAndTypeToObject(this.props.communityTreeStructureState[i], nodeIdTypeObject)
			this.addNodeIdAndTypeToObject(this.props.communityTreeStructureState[i], nodeIdStudentTypeObject)
		}
		}
		if (this.props.teacherStructureState) {
		for (let i = 0; i < this.props.teacherStructureState.length; i++) {
			this.addKeyValuesToObject(this.props.teacherStructureState[i], nodeIdNameObject)
			this.addNodeIdAndMemberTypeToObject(this.props.teacherStructureState[i], nodeIdTypeObject)
		}
		}
        
        // console.log("MyLearningModulesController :: nodeIdNameObject : ", nodeIdNameObject)
        // console.log("MyLearningModulesController :: nodeIdTypeObject : ", nodeIdTypeObject)

        let myLearningModules = null
        if (this.props.communityBasicDataState) {
            myLearningModules =
                <MyLearningModule
                    communityPackage={this.props.communityPackage}
                    userId={this.props.userId}
                    openAssignModal={this.openAssignModal}
                    openMonitoringModal={this.openMonitoringModal}
                    openAdminModal = {this.openAdminModal}
                    {...this.props}
                />       
		}
		
        let modalBodyState = <MonitoringPermission members={this.state.monitoringMembers}
            communityTreeStructure={
                this.props.communityTreeStructureState ?
                    this.props.communityTreeStructureState : null
            }
            teacherStructureState={
                this.props.teacherStructureState ?
                    this.props.teacherStructureState : null
            }
            nodeIdNameObject={nodeIdNameObject}
            nodeIdTypeObject={nodeIdTypeObject}
            // onAddSelected={this.onAddSelected}
            // onNotify={this.onNotify}
            // isAddMembersClicked={this.state.isAddMembersClicked}
            // countOfMembers={this.state.countOfMembers}
            // event_status={this.state.event_status}
            communitylabels={this.state.communitylabels}
            setMonitoringPermissionForCourse={this.setMonitoringPermissionForCourse}
            statusOfRequest={this.state.statusOfRequest}
        />

        let adminmodalBodyState = <AdminPermissions members={this.state.adminMembers}
            communityTreeStructure={
                this.props.communityTreeStructureState ?
                    this.props.communityTreeStructureState : null
            }
            teacherStructureState={
                this.props.teacherStructureState ?
                    this.props.teacherStructureState : null
            }
            nodeIdNameObject={nodeIdNameObject}
            nodeIdTypeObject={nodeIdTypeObject}
            // onAddSelected={this.onAddSelected}
            // onNotify={this.onNotify}
            // isAddMembersClicked={this.state.isAddMembersClicked}
            // countOfMembers={this.state.countOfMembers}
            // event_status={this.state.event_status}
            communitylabels={this.state.communitylabels}
            setAdminPermissionForCourse={this.setAdminPermissionForCourse}
            statusOfRequest={this.state.statusOfRequest}
        />

        let assignModalBodyState = <AssignCourse members={this.state.assignedMembers}
            communityTreeStructure={
                this.props.communityTreeStructureState ?
                    this.props.communityTreeStructureState : null
            }
            teacherStructureState={
                this.props.teacherStructureState ?
                    this.props.teacherStructureState : null
            }
            nodeIdNameObject={nodeIdNameObject}
            nodeIdTypeObject={nodeIdStudentTypeObject}
            // onAddSelected={this.onAddSelected}
            // onNotify={this.onNotify}
            // isAddMembersClicked={this.state.isAddMembersClicked}
            // countOfMembers={this.state.countOfMembers}
            // event_status={this.state.event_status}
            communitylabels={this.state.communitylabels}
            setMembersForCourse={this.setMembersForCourse}
            statusOfRequest={this.state.statusOfRequest}
        />
		return (
			<div>
				{myLearningModules}
				<ComponentsModal
					showModal={this.state.monitoringModal}
					close={this.closeMonitoringModal}
					modalHeading={"Monitoring Permission"}
					modalBody={modalBodyState}
					/>
                <ComponentsModal
                    showModal={this.state.assignModal}
                    close={this.closeAssignModal}
                    modalHeading={"Assign Course"}
                    modalBody={assignModalBodyState}
                    />
                <ComponentsModal
                    showModal={this.state.adminModal}
                    close={this.closeAdminModal}
                    modalHeading={"Set Experts"}
                    modalBody={adminmodalBodyState}
                    />
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


export default connect(mapStateToProps)(MyLearningModuleController);

