import React,{Component} from 'react';
import 'redux'
import { connect } from 'react-redux'
import CommunityProfile from '../../communitypage/presentationalcomponents/CommunityProfile/CommunityProfile';
import StudentDetailsModal from '../../communitypage/presentationalcomponents/CommunityProfile/StudentDetailsModal';
import TeacherDetailsModal from '../../communitypage/presentationalcomponents/CommunityProfile/TeacherDetailsModal';
import AddStudentModel from '../../communitypage/presentationalcomponents/CommunityProfile/AddStudentModal';
import AddTeacherModal from '../../communitypage/presentationalcomponents/CommunityProfile/AddTeacherModal';
import UploadFilesModal from '../../communitypage/presentationalcomponents/CommunityProfile/UploadFilesModal';
import {searchEntitiesInTree} from '../../HelperFunctions/searchEntititesInTree';
import EditStudentDetailsModal from '../../communitypage/presentationalcomponents/CommunityProfile/EditStudentDetailsModal';
import RemoveCommunityMemberModal from '../../communitypage/presentationalcomponents/CommunityProfile/RemoveCommunityMemberModal';

import {getCommunityBasicDetails , getInternalCounsellorDetails, getStudentDetails, getExternalMentorDetails, getClassDetails,
getSubjectDetails, getTeacherDetails, getCommunityMemberDetails,uploadExcelTemplates, 
fetchAutoSuggestAllUsersData, addUpdateCommunityMembers, fetchAutoSuggestSubEntitiesData, changeMemberClsSecEntity,
removeMemberFromCommunityEntity, resendInviteToMember} from './action'


class CommunityProfileController extends Component{
	constructor(props)
	{
	  super(props);
	  this.state={showModalStudent:false, showTeachers:false, addStudents:false,
			addTeachers: false, uploadFilesModal: false, showModalEditStudent: false,
			showDeleteMemberModal: false,
			resendMailRow: null,
			resendingMailStatus:0,

		};
	  this.close=this.close.bind(this);
	  this.open=this.open.bind(this);
	  this.closeTeacher=this.closeTeacher.bind(this);
	  this.viewTeachers=this.viewTeachers.bind(this);
	  this.openAddStudents=this.openAddStudents.bind(this);
	  this.closeAddStudents=this.closeAddStudents.bind(this);
	  this.openAddTeachers=this.openAddTeachers.bind(this);
	  this.closeAddTeachers=this.closeAddTeachers.bind(this);
	  this.openUploadFilesModal=this.openUploadFilesModal.bind(this);
	  this.closeUploadFilesModal=this.closeUploadFilesModal.bind(this);
	}
	close() {
	    this.setState({ showModalStudent: false });
	}

	open() {
	    this.setState({ showModalStudent: true });
	}
	closeTeacher() {
		this.setState({ showTeachers: false});
	}

	viewTeachers() {
	    this.setState({ showTeachers: true });
	}

	openAddStudents() {
		this.setState({ addStudents: true });
	}

	closeAddStudents() {
		this.setState({ addStudents: false,
						enteredUserState : null, enteredUserMobile : null, 
						enteredUserEmail : null, enteredUserName : null, selectedSubentityForStudent:null,
        				modalResponseState : null , modalResponseTypeState : null, modalFreeze : false });
	}

	openAddTeachers() {
		this.setState( {addTeachers:true} );
	}

	closeAddTeachers() {
		this.setState( {addTeachers:false,
						enteredUserState : null, enteredUserMobile : null, 
						enteredUserEmail : null, enteredUserName : null, 
        				modalResponseState : null , modalResponseTypeState : null, modalFreeze : false } );
	}

	openUploadFilesModal() {
		this.setState( {uploadFilesModal:true} );
	}

	closeUploadFilesModal() {
		this.setState( {uploadFilesModal:false} );
	}

	uploadExcelTemplate(paramsFormData,url){
		if(paramsFormData===null||url === null){
			return null
		}
		paramsFormData.append('communityId', this.props.match.params.communityId);
		return uploadExcelTemplates(paramsFormData,url, this.props.match.params.communityId, this.props.dispatch);
	}

  onchangeDynamicFetchAllUsers(newValue){
    if(newValue != null && newValue != ""){
      this.props.dispatch(fetchAutoSuggestAllUsersData(newValue));
	}
	this.setState({enteredUserEmail : newValue, enteredUserState:null});
  }

  onSuggestionSelectedAllUsers(suggestionValue){
	this.setState({enteredUserState : suggestionValue, enteredUserMobile : suggestionValue.mobile, 
		enteredUserEmail : suggestionValue.value, enteredUserName : suggestionValue.name,
        modalResponseState : null , modalResponseTypeState : null, modalFreeze : false });
  }

  onChangeTeacherName(e){
	  let newName = e.target.value;
	  this.setState({enteredUserName : newName , enteredUserState:null});
  }

   onChangeTeacherMobile(e){
	  let newMobile = e.target.value;
	  this.setState({enteredUserMobile : newMobile , enteredUserState:null});
	 }
	
	onResendingMemberInvite(val, e) {
		let commId = this.props.match.params.communityId;
		this.setState({resendMailRow:val, resendingMailStatus: 2})
		let returnPromise = this.props.dispatch(resendInviteToMember
			(commId, val));
		let self = this
		returnPromise.then(function (data) {
			console.log("onResendingMemberInvite :: Response :", data);
			if (data === "Success") {
				self.setState({resendingMailStatus: 1})
			}
			else {
				self.setState({resendingMailStatus: -1})
			}
		})
	}

  onSubmitUserDetails(val,e){
	let userId = null;
	let userEmail = null;
	let userName = null;
	let userMobile = null;
	let userSubEntity = this.state.selectedSubentityForStudent;
	let commId = this.props.match.params.communityId;
	if(this.state.enteredUserState){
		userId = this.state.enteredUserState.id;
	}
	else{
		userEmail = this.state.enteredUserEmail;
		userName = this.state.enteredUserName;
		userMobile = this.state.enteredUserMobile;
	}
	
	if(!(userId) && !(userEmail && userName)){
		this.setState({modalResponseState : "Error : Please select or enter a user!!", modalResponseTypeState : "error"});
      	return false;
	}

	let returnPromise = this.props.dispatch(addUpdateCommunityMembers(userId,userEmail,userName,userMobile,val,commId, userSubEntity));

	returnPromise.then((response) => {
      let modalResponseType = response;

      if(response === "success"){
        this.setState({modalResponseState : "Data Successfully Changed." , modalResponseTypeState : modalResponseType, 
                        modalFreeze:true});
      }
      else{
        //console.log("error response", response.response,response.response.data.length);
        let errorText = "";
        if(response.response.data.length < 200){
          errorText = response.response.data;
        }
        else{
          errorText = response.response.statusText;
        }
        this.setState({modalResponseState : "Error : " + errorText,
                      modalResponseTypeState : modalResponseType});
      }
    })
    .catch((err) => {
      //console.log("caught error is ", err);
    })
  }

  onchangeDynamicFetchSubEntities(newValue){
    if(newValue != null && newValue != ""){
			let treeStructure = this.props.treeStructureJson;
			// console.log("Community Profile Controller :: onchangeDynamicFetchSubEntities : treeStructure, newValue",
			// 	treeStructure, newValue)
			if (treeStructure) {
				let searchSet = searchEntitiesInTree(treeStructure["student_list"], newValue);
				this.setState({ subEntitiesAutoSuggestProps: searchSet });
			}
	}
  }

  onSuggestionSelectedSubEntities(suggestionValue){
	  this.setState({selectedSubentityForStudent : suggestionValue});
  }

  openEditStudentDetailsModal(e,row){
	  this.setState({
		showModalStudent : false,
		showModalEditStudent : true,
		selectedStudentToEdit : row
	  })
  }

  closeEditStudentDetailsModal(){
	this.setState({
	  showModalEditStudent : false,
	  selectedStudentToEdit : null,
	  modalResponseState : null , modalResponseTypeState : null, modalFreeze : false
	})
}

closeBackEditStudentDetailsModal(){
	this.setState({
	  showModalStudent : true,
	  showModalEditStudent : false,
	  selectedStudentToEdit : null,
	  modalResponseState : null , modalResponseTypeState : null, modalFreeze : false
	})
}

onChangeUserClsSecEntity(val,e){
	let userId = this.state.selectedStudentToEdit.fields.community_member.id;
	let userSubEntity = this.state.selectedSubentityForStudent;
	let commId = this.props.match.params.communityId;
	let oldSubEntity = this.state.selectedStudentToEdit.fields.community_name;
	let membershipId = this.state.selectedStudentToEdit.pk;
	
	let returnPromise = this.props.dispatch(changeMemberClsSecEntity(userId,val,commId, userSubEntity, membershipId));

	returnPromise.then((response) => {
      let modalResponseType = response;

      if(response === "success"){
        this.setState({modalResponseState : "Data Successfully Changed." , modalResponseTypeState : modalResponseType, 
                        modalFreeze:true});
      }
      else{
        //console.log("error response", response.response,response.response.data.length);
        let errorText = "";
        if(response.response.data.length < 200){
          errorText = response.response.data;
        }
        else{
          errorText = response.response.statusText;
        }
        this.setState({modalResponseState : "Error : " + errorText,
                      modalResponseTypeState : modalResponseType});
      }
    })
    .catch((err) => {
      //console.log("caught error is ", err);
    })
  }

  openDeleteMemberModal(e,row,designation){
	if(designation === "teacher"){
		this.setState({
		  showTeachers : false
		})
	}
	else if(designation === "student"){
	  this.setState({
		  showModalStudent : false
		})
	}
	this.setState({
	  showDeleteMemberModal : true,
	  selectedStudentToDelete : row,
	  selectedMemberDesignation : designation
	})
}

closeDeleteMemberModal(){
  this.setState({
	showDeleteMemberModal : false,
	selectedStudentToDelete : null,
	selectedMemberDesignation : null,
	modalResponseState : null , modalResponseTypeState : null, modalFreeze : false
  })
}

closeBackDeleteMemberModal(){
  if(this.state.selectedMemberDesignation === "teacher"){
	  this.setState({
		showTeachers : true
	  })
  }
  else if(this.state.selectedMemberDesignation === "student"){
	this.setState({
		showModalStudent : true
	  })
  }
	this.setState({
	showDeleteMemberModal : false,
	selectedStudentToDelete : null,
	selectedMemberDesignation : null,
	modalResponseState : null , modalResponseTypeState : null, modalFreeze : false
  })
}


onRemoveMemberFromCommunity(e){
	let userId = this.state.selectedStudentToDelete.fields.community_member.id;
	let commId = this.props.match.params.communityId;
	let membershipId = this.state.selectedStudentToDelete.pk;
	let val = this.state.selectedMemberDesignation;
	let returnPromise = this.props.dispatch(removeMemberFromCommunityEntity(userId,val,commId, membershipId, false));

	returnPromise.then((response) => {
      let modalResponseType = response;

      if(response === "success"){
        this.setState({modalResponseState : "Data Successfully Changed." , modalResponseTypeState : modalResponseType, 
                        modalFreeze:true});
      }
      else{
        //console.log("error response", response.response,response.response.data.length);
        let errorText = "";
        if(response.response.data.length < 200){
          errorText = response.response.data;
        }
        else{
          errorText = response.response.statusText;
        }
        this.setState({modalResponseState : "Error : " + errorText,
                      modalResponseTypeState : modalResponseType});
      }
    })
    .catch((err) => {
      //console.log("caught error is ", err);
    })
  }

	onRemoveMemberFromIndividualCommunity(profileId, subCommunityId, memberId, designation){
	let userId = profileId
	let commId = subCommunityId
	let membershipId = memberId
	let val = designation;
	let returnPromise = this.props.dispatch(removeMemberFromCommunityEntity(userId,val,commId, membershipId, true));

	returnPromise.then((response) => {
			let modalResponseType = response;

			if(response === "success"){
				this.setState({modalResponseState : "Data Successfully Changed." , modalResponseTypeState : modalResponseType, 
												modalFreeze:true});
			}
			else{
				//console.log("error response", response.response,response.response.data.length);
				let errorText = "";
				if(response.response.data.length < 200){
					errorText = response.response.data;
				}
				else{
					errorText = response.response.statusText;
				}
				this.setState({modalResponseState : "Error : " + errorText,
											modalResponseTypeState : modalResponseType});
			}
		})
		.catch((err) => {
			//console.log("caught error is ", err);
		})
	}


render()
	{   
		

		return (
			<div>
				<CommunityProfile open={this.open} {...this.props} viewTeachers={this.viewTeachers} 
									openAddStudents={this.openAddStudents} 
									openAddTeachers={this.openAddTeachers}
									openUploadFilesModal={this.openUploadFilesModal}/>

				<StudentDetailsModal close={this.close} showModal={this.state.showModalStudent} {...this.props}
					openEditStudentDetailsModal={this.openEditStudentDetailsModal.bind(this)}
					openDeleteMemberModal={this.openDeleteMemberModal.bind(this)}
					resendInviteToMember={this.onResendingMemberInvite.bind(this)}
					resendingMailStatus={this.state.resendingMailStatus}
					resendMailRow={this.state.resendMailRow}
									/>
				
				<EditStudentDetailsModal close={this.closeEditStudentDetailsModal.bind(this)} showModal={this.state.showModalEditStudent}
					{...this.props} {...this.state}
					onChangeUserClsSecEntity={this.onChangeUserClsSecEntity.bind(this)}
					selectedStudentToEdit={this.state.selectedStudentToEdit}
					onchangeDynamicFetchSubEntities={this.onchangeDynamicFetchSubEntities.bind(this)}
					onSuggestionSelectedSubEntities={this.onSuggestionSelectedSubEntities.bind(this)}
					closeBackEditStudentDetailsModal={this.closeBackEditStudentDetailsModal.bind(this)}
					onRemoveMemberFromIndividualCommunity={this.onRemoveMemberFromIndividualCommunity.bind(this)}				
				/>
								
				<RemoveCommunityMemberModal close={this.closeDeleteMemberModal.bind(this)} showModal={this.state.showDeleteMemberModal}
						{...this.props} {...this.state}
						closeBackDeleteMemberModal = {this.closeBackDeleteMemberModal.bind(this)}
						onRemoveMemberFromCommunity = {this.onRemoveMemberFromCommunity.bind(this)}
				/>

				<TeacherDetailsModal close={this.closeTeacher} showModal={this.state.showTeachers} {...this.props}
				                 openDeleteMemberModal = {this.openDeleteMemberModal.bind(this)}/>

				<AddStudentModel close={this.closeAddStudents} showModal={this.state.addStudents} {...this.props} {...this.state}
								onchangeDynamicFetch = {this.onchangeDynamicFetchAllUsers.bind(this)}
								onSuggestionSelected = {this.onSuggestionSelectedAllUsers.bind(this)} doNotReset={true}
								onChangeTeacherName={this.onChangeTeacherName.bind(this)}
								onSubmitUserDetails = {this.onSubmitUserDetails.bind(this)}
								onchangeDynamicFetchSubEntities = {this.onchangeDynamicFetchSubEntities.bind(this)}
								onSuggestionSelectedSubEntities = {this.onSuggestionSelectedSubEntities.bind(this)}
								/>

				<AddTeacherModal close={this.closeAddTeachers} showModal={this.state.addTeachers} {...this.props} {...this.state}
								  onchangeDynamicFetch = {this.onchangeDynamicFetchAllUsers.bind(this)}
								  onSuggestionSelected = {this.onSuggestionSelectedAllUsers.bind(this)} doNotReset={true}
								  onChangeTeacherName={this.onChangeTeacherName.bind(this)}
								  onChangeTeacherMobile={this.onChangeTeacherMobile.bind(this)}
								  onSubmitUserDetails = {this.onSubmitUserDetails.bind(this)}/>

				<UploadFilesModal close={this.closeUploadFilesModal} showModal={this.state.uploadFilesModal}
								  uploadExcelTemplate={this.uploadExcelTemplate.bind(this)} {...this.props}/>
			</div>
		);
		
	}
}
let mapStateToProps = (store) => {
	return {communityBasicDataState : store.communityPageDataReducer.communityBasicDataState,
		    InternalCounsellorDataState : store.communityPageDataReducer.internalmentor,
		    communityStudentDataState : store.communityPageDataReducer.student,
			communityExtMentorDataState : store.communityPageDataReducer.externalmentor,
			communityClassDataState : store.communityPageDataReducer.communityClassDataState,
			communitySubjectDataState : store.communityPageDataReducer.communitySubjectDataState,
			communityTeacherDataState : store.communityPageDataReducer.teacher,
			treeStructureJson : store.communityPageDataReducer.instituteTreeState,
			allUsersAutoSuggestProps : store.communityPageDataReducer.allUsersAutoSuggestState
	        }

}

export default connect(mapStateToProps)(CommunityProfileController);