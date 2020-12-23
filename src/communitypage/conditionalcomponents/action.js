import axios from 'axios';
import {URL_TEXT, getCookie, getCSRFHeader} from '../../GlobalConstants'


export var uploadExcelTemplates = (uploadData,url, schoolId, dispatch) => {
	//console.log("******Calling:uploadExcelTemplates",uploadData,url)
	let flagValue = uploadData.get("flag");

	uploadData.append('csrfmiddlewaretoken', getCookie('csrftoken'))
	const config = {
            headers: { 'content-type': 'multipart/form-data' }
		}
	return axios.post(URL_TEXT+url,uploadData,config)
		.then(function (response) {
			//console.log("******Response from server:uploadExcelTemplates", response);
			if(flagValue == "classsection"){
				dispatch(updateAndFetchTreeStructureSubject(schoolId));
			}
			else if(flagValue == "studentdetails"){
				dispatch(updateAndFetchTreeStructureStudent(schoolId, true));
				// dispatch(getCommunityMemberDetails(schoolId, "student"));
			}
			else if(flagValue == "teacherdetails"){
				dispatch(getCommunityMemberDetails(schoolId, "teacher"));
				dispatch(updateAndFetchTreeStructureStudent(schoolId));
			}
			
			return response;
		})
		.catch(function (error) {
			//console.log(error);
			return false;
		});
	
}

export var checkIfCommunityOwner =(commId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'checkifcommunityowner/', {
			params : {
				communityId : commId
			}
		}) 
			.then(function (response) {
				// console.log("******checkIfCommunityOwner : Response from server:", response);
				return response.data;
			}).then(function (data) {
				//  console.log("checkIfOwner: ", data);
				 if(data == "True"){
					 dispatch({type : "setCommunityOwnership" , data : {[commId] : true}})
				 }
				else{
					 dispatch({type : "setCommunityOwnership" , data : {[commId] : false}})
					 }
             
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var checkIfCommunityMember =(commId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'checkifcommunitymember/', {
			params : {
				communityId : commId
			}
		}) 
			.then(function (response) {
				// console.log("******checkIfCommunityMember : Response from server:", response);
				return response.data;
			}).then(function (data) {
				//  console.log("checkIfMember: ", data);
				 if(data == "True"){
					 dispatch({type : "setCommunityMembership" , data : {[commId] : true}})
				 }
				else{
					 dispatch({type : "setCommunityMembership" , data : {[commId] : false}})
					 }
             
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var checkIfInternalExpert =(commId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'checkifcommunityinternalexpert/', {
			params : {
				communityId : commId
			}
		}) 
			.then(function (response) {
				// console.log("******checkifcommunityinternalexpert : Response from server:", response);
				return response.data;
			}).then(function (data) {
				//  console.log("checkIfMember: ", data);
				 if(data == "True"){
					 dispatch({type : "setCommunityInternalExpertMembership" , data : {[commId] : true}})
				 }
				else{
					 dispatch({type : "setCommunityInternalExpertMembership" , data : {[commId] : false}})
					 }
             
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var checkIfExternalExpert =(commId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'checkifcommunityexternalexpert/', {
			params : {
				communityId : commId
			}
		}) 
			.then(function (response) {
				// console.log("******checkifcommunityexternalexpert : Response from server:", response);
				return response.data;
			}).then(function (data) {
				//  console.log("checkIfMember: ", data);
				 if(data == "True"){
					 dispatch({type : "setCommunityExternalExpertMembership" , data : {[commId] : true}})
				 }
				else{
					 dispatch({type : "setCommunityExternalExpertMembership" , data : {[commId] : false}})
					 }
             
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var addInternalCounsellor = (commId,counsellorList) =>{
	// //console.log("formValues" , formValues)
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'managecommunityinternalcounsellors/', {
			communityId : commId,
			memberList : counsellorList
		})
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
				dispatch(getCommunityMemberDetails(commId,"all"));
				return "success";
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getApplicationStatus = (communityId)=>{
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getcommunityapplicationstatus/',{ 
			params : {
				communityId : communityId,
			}
		}).then(function (response) {
			//console.log("******Response from server:", response);
			return response.data;
		}).then(function (data) {
			// console.log("******Response from server:", data);
			if (data !== "norequest"){
				dispatch({type : "setCommunityMembershipRequestStatus" , data : {[communityId] : data[0].fields}})
			}
		}).catch(function(err){
			//console.log(err);
		});
	}
}

export var getInternalCounsellorDetails = (commId) => {
return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getmembersdetails/', {
			params : {
				communityId : commId,
				designation : "internalmentor"
			}
		}) 
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				 //console.log("******Response from server111: ", data);
				 dispatch({type : 'setInternalCounsellorDetails' , data : data});
				// dispatch(setCommunityBasicDetailsTransientState("communityName",data[0].fields.community_name))
				// dispatch(setCommunityBasicDetailsTransientState("communityContact",data[0].fields.community_contact))
				// dispatch(setCommunityBasicDetailsTransientState("communityEmail",data[0].fields.community_email))
				// dispatch(setCommunityBasicDetailsTransientState("communityDesc",data[0].fields.community_description))
				// dispatch(setCommunityBasicDetailsTransientState("communityId",data[0].pk))
             
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}




export var changeCommunityBasicDetailsState = (formValues) =>{
	//console.log("formValues" , formValues)
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'editCommunityBasicDetails/', {
			formValues
		})
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
				dispatch({type : 'setCommunityBasicDetails' , data : data});
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var setCommunityBasicDetailsTransientState =(name,value) =>{
	//console.log("commAction", name);
	return {type : 'setCommunityBasicDetailsTransientState' , data : {[name] : value}}
}

export var getCommunityBasicDetails = (commId) => {
return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'fetchCommunityBasicDetails/', {
			params : {
				communityId : commId
			}
		})
			.then(function (response) {
				//console.log("commbasicdetails:", response);
				return response.data;
			}).then(function (data) {
				// console.log("******Response from server111: ", data.community_name);
				dispatch({type : 'setCommunityBasicDetails' , data : data});
				dispatch(setCommunityBasicDetailsTransientState("communityName",data[0].fields.entity_name))
				dispatch(setCommunityBasicDetailsTransientState("communityContact",data[0].fields.contact))
				dispatch(setCommunityBasicDetailsTransientState("communityEmail",data[0].fields.email))
				dispatch(setCommunityBasicDetailsTransientState("communityDesc",data[0].fields.description))
				dispatch(setCommunityBasicDetailsTransientState("communityId",data[0].pk))

			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getCommunityMemberDetails = (commId, designation = "all") => {
	//console.log("queryingmemberdetails");
return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getmembersdetails/', {
			params : {
				communityId : commId,
				designation : designation
			}
		})
			.then(function (response) {
				let data = response.data;
				//console.log("communitymembersdatafromserver", data);
				if(designation == "all"){
				for(let property in data){
					if(data.hasOwnProperty(property)){
						dispatch({type : 'setCommunityMembersDetails' , data : {property : property , value : JSON.parse(data[property])}});
					}
				}
				}
				else{
					dispatch({type : 'setCommunityMembersDetails' , data : {property : designation , value : data}});
				}
				
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getStudentDetails = (commId, desgn) => {
return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getmembersdetails/', {
			params : {
				communityId : commId,
				designation : desgn
			}
		})
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				// //console.log("******Response from server111: ", data.community_name);
				dispatch({type : 'setStudentDetails' , data : data});
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}
export var getTeacherDetails = (commId, desgn) => {
return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getmembersdetails/', {
			params : {
				communityId : commId,
				designation : desgn
			}
		})
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				//console.log("###response from serverteacherdetails: ", data);
				dispatch({type : 'setTeacherDetails' , data : data});
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getExternalMentorDetails = (commId, desgn) => {
return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getmembersdetails/', {
			params : {
				communityId : commId,
				designation : desgn
			}
		})
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				// //console.log("******Response from server111: ", data.community_name);
				dispatch({type : 'setExternalMentorDetails' , data : data});
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getNavBarState = () => {
	let NavBarStateData = {NavBarState : "feeds"};
	return { type : 'loadinitially', data : NavBarStateData}
}
export var changeNavBarState = (newState) => {
	return {type : 'changeNavState' , data : {NavBarState : newState}};
}


export var getInstituteTreeStructure = (commId, setAsState = true) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'gettreestructure/', {
			params : {
				school_id : commId
			}
		}) 
		.then(function (response) {
			let data = response.data;
			//console.log("tree data is : " , data);
			// //console.log("json tree is : ", JSON.parse(data))
			if(!(data) || data == "None" || data == ""){
				//console.log("recreating tree")
				dispatch(updateAndFetchTreeStructureSubject(commId));
			}		
			else{
			//console.log("setting treestate");
			if(setAsState){
			dispatch({type : "setInstituteTreeState" , data : data});
			}
			return data;
			}
             
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var refreshCommunityTreeStructures = (commId) => {
	let config = getCSRFHeader();
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'recreateCommunityTree/',
		 	{communityId : commId},
		 	config
		) .then(function (response) {
			return response.data;
		}).then(function(data){
			console.log("refreshCommunityTreeStructures:: setting treestate",data);
			dispatch({type : "setInstituteTreeState" , data : data});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}

export var assignSubjectToTeachers = (teacherId , checkedState, commId) => {
	return(dispatch) => {
		return axios.post(URL_TEXT + 'assignsubjectteachermapping/' , {
			teacher_id : teacherId,
			checked_items : checkedState,
			community_id : commId
		})
		.then(function(response){
			let data = response.data;
			//console.log("assignteachersubresponsedata" , data);
			if(data == "None Query Set"){
				return "empty"
			}
			else{
				dispatch({type : 'setCommunityMembersDetails' , data : {property : "teacher" , value : data}});
				dispatch(getInstituteTreeStructure(commId));
				return "success"
			}
		})
		.catch(function (error) {
				//console.log(error);
			});
	}
}

export var addUpdateDeleteEntities = (actionType,nodeId,value, schoolId) => {
	return(dispatch) => {
		return axios.post(URL_TEXT + 'addupdatedeleteentities/' , {
			action_type : actionType,
			node_id : nodeId,
			value : value,
			school_id : schoolId
		})
		.then(function(response){
			let data = response.data;
			//console.log("addupdatedeleteentitiesresponsedata" , data);
			dispatch(getInstituteTreeStructure(schoolId));
			// dispatch(updateAndFetchTreeStructureStudent(schoolId));
			return "success";
		})
		.catch(function (error) {
				//console.log(error);
				return error;
			});
	}
}

export var fetchAutoSuggestSubjectData = (value) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + "search/autocomplete/",{
			params:{
				query_string : value,
				model_parameter : "subject"
			}
		}).then(function(response){
			let data = response.data;
			//console.log("autosuggestrespone", data);
			dispatch({type : "setAutoSuggestStates" , data : {propName : "subjectAutoSuggestState" , value : data}});

		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}

export var fetchAutoSuggestCommunityMembersData = (value, commId, memberType) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + "search/autocomplete/",{
			params:{
				query_string : value,
				model_parameter : "community_member",
				community_id : commId,
				member_type : memberType
			}
		}).then(function(response){
			let data = response.data;
			//console.log("autosuggestresponemember", data);
			dispatch({type : "setAutoSuggestStates" , data : {propName : memberType + "AutoSuggestState" , 
																		value : data}});

		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}

export var addSubjectsToCommunity = (schoolId, entityId, existingSubjectList, newSubjectsNameList, newSubjectsCodeList) => {
	return (dispatch) => {
		return axios.post(URL_TEXT + 'addsubjectdetails/' ,{
			school_id : schoolId,
			entity_id : entityId,
			existing_subjects_list : existingSubjectList,
			new_subjects_name_list : newSubjectsNameList,
			new_subjects_code_list : newSubjectsCodeList

		}).then(function(response){
			let data = response.data;
			// dispatch({type : "setInstituteTreeState" , data : data});
			dispatch(getInstituteTreeStructure(schoolId));
			return "success";
		}).catch(function(error){
			//console.log("error : ", error);
			return error
		})
	}
}

export var editDeleteSubjectTeachersEntity = (mappingId,teacherId,subjectId,schoolId) =>{
	return (dispatch) => {
		return axios.post(URL_TEXT + 'editdeletesubjectmappings/' ,{
			school_id : schoolId,
			mapping_id : mappingId,
			teacher_id : teacherId,
			subject_id : subjectId

		}).then(function(response){
			let data = response.data;
			// dispatch({type : "setInstituteTreeState" , data : data});
			dispatch(getInstituteTreeStructure(schoolId));
			dispatch(getCommunityMemberDetails(schoolId, "teacher"));
			return "success";
		}).catch(function(error){
			//console.log("error : ", error);
			return error
		})
	}
}

export var updateAndFetchTreeStructureSubject = (commId, updateStudentTreeAlso = true) => {
	return (dispatch) => {
		return axios.post(URL_TEXT + 'updategettreestructure/' ,{
			school_id : commId

		}).then(function(response){
			let data = response.data;
			//console.log("newtreedata is : " , data);
			dispatch({type : "setInstituteTreeState" , data : data});
			if(updateStudentTreeAlso){
			dispatch(updateAndFetchTreeStructureStudent(commId));
			}
			return "success";
		}).catch(function(error){
			//console.log("error : ", error);
			return error
		})
	}
}

export var updateAndFetchTreeStructureStudent = (commId, updateStudentStateAlso = false) => {
	return (dispatch) => {
		return axios.post(URL_TEXT + 'updategettreestructure/' ,{
			school_id : commId,
			which_type : "student"

		}).then(function(response){
			let data = response.data;
			//console.log("newtreedata_student is : " , data);
			dispatch({ type: "studenttreeStructure", data: data.student_list });
			dispatch({ type: "teachertreeStructure", data: data.teacher_list });
			if(updateStudentStateAlso){
			dispatch(getCommunityMemberDetails(commId, "student"));
			}
			return "success";
		}).catch(function(error){
			//console.log("error : ", error);
			return error
		})
	}
}

export var fetchAutoSuggestAllUsersData = (value) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + "search/autocomplete/",{
			params:{
				query_string : value,
				model_parameter : "all_users"
			}
		}).then(function(response){
			let data = response.data;
			//console.log("response for all users data", data);
			dispatch({type : "setAutoSuggestStates" , data : {propName : "allUsersAutoSuggestState" , value : data}});

		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}

export var addUpdateCommunityMembers = (userId,userEmail,userName,userMobile,val,commId, userSubEntity) => {
	return (dispatch) => {
		return axios.post(URL_TEXT + "addupdatecommunitymembers/", {
			userName : userName,
			userId : userId,
			email : userEmail,
			mobile_number : userMobile,
			designation : val,
			communityId : commId,
			userSubEntity : userSubEntity

		}).then(function(response){
			let data = response.data;
			dispatch({type : 'setCommunityMembersDetails' , data : {property : val , value : data}});
			return "success";
		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}

export var fetchAutoSuggestSubEntitiesData = (value, commId) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + "search/autocomplete/",{
			params:{
				query_string : value,
				model_parameter : "sub_entities",
				school_id : commId
			}
		}).then(function(response){
			let data = response.data;
			//console.log("autosuggestresponesubentities", data);
			dispatch({type : "setAutoSuggestStates" , data : {propName : "subEntitiesAutoSuggestState" , 
																		value : data}});

		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}

export var fetchPendingJoiningRequests = (commId) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + "fetchrequestsbystatus/",{
			params:{
				community_id : commId
			}
		}).then(function(response){
			let data = response.data;
			//console.log("pendingrequestsdata", data);
			dispatch({type : "setPendingRequestState" , data : data});

		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}

export var changeCommunityRequestStatus = (commId,status,applicationId) => {
	return (dispatch) => {
		return axios.post(URL_TEXT + "changecommunityapplicationstatus/", {
			application_id : applicationId,
			community_id : commId,
			status : status

		}).then(function(response){
			let data = response.data;
			dispatch({type : "setPendingRequestState" , data : data});
			return "success";
		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}


export var uploadImageOrFile = (uploadData,url) => {
	//console.log("******Calling:uploadImageOrFile",uploadData,url)
	uploadData.append('csrfmiddlewaretoken', getCookie('csrftoken'));
	const config = {
			headers: { 'content-type': 'multipart/form-data' }
		}
	return (dispatch, getState) => {
		return axios.post(URL_TEXT+url,uploadData)
			.then(function (response) {
				//console.log("******Response from server:uploadImageOrFile", response);
				return response.data;
			})
			.then(function (data) {
					// console.log("******Response from server:uploadImageOrFile :: community ", data);
					dispatch({type : 'setCommunityBasicDetails' , data : data} );
				})
			.catch(function (error) {
				//console.log("uploadImageOrFile",error);
				return false;
			});
	}
}

export var submitJoinCommunityRequest = (commId, member_type, application_text) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'joinCommunityRequest/', {
			params : {
				community_id : commId,
				member_type : member_type,
				application_text: application_text
			}
		}) 
		.then(function (response) {
			let data = response.data;
			//console.log("submitJoinCommunityRequest",response)
			return response.data
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var changeMemberClsSecEntity = (userId,val,commId, userSubEntity, communityMemberId) => {
	return (dispatch) => {
		return axios.post(URL_TEXT + "changecommunitymembersclssecentity/", {
			userId : userId,
			designation : val,
			communityId : commId,
			userSubEntity : userSubEntity,
			communityMemberId : communityMemberId

		}).then(function(response){
			let data = response.data;
			dispatch({type : 'setCommunityMembersDetails' , data : {property : val , value : data}});
			return "success";
		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}

export var removeMemberFromCommunityEntity = (userId,val,commId, communityMemberId, isSubCommunity) => {
	return (dispatch) => {
		return axios.post(URL_TEXT + "removememberfromcommunity/", {
			userId : userId,
			designation : val,
			communityId : commId,
			communityMemberId: communityMemberId,
			isSubCommunity: isSubCommunity

		}).then(function(response){
			let data = response.data;
			dispatch({type : 'setCommunityMembersDetails' , data : {property : val , value : data}});
			return "success";
		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}

export var getCommunitySubscriptions = (commId) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + "getCommunitySubscriptions/",{
			params:{
				comm_id : commId
			}
		}).then(function(response){
			let data = response.data;
			//console.log("pendingrequestsdata", data);
			dispatch({type : "getCommunitySubscriptions" , data : data});

		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}

export var getCommunityAllSubscriptions = (commId) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + "getCommunityAllSubscriptions/",{
			params:{
				comm_id : commId
			}
		}).then(function(response){
			let data = response.data;
			// console.log("getCommunityAllSubscriptions", data);
			dispatch({type : "getCommunityAllSubscriptions" , data : data});

		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}


export var requestForInvoice = (entityPackageMappingId) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + "requestForInvoice/",{
			params:{
				entity_package_mapping : entityPackageMappingId
			}
		}).then(function(response){
			let data = response.data;
			return data
		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}

export var submitDiscussionRoom = (formData) => {
	return(dispatch) => {
		return axios.post(URL_TEXT + "addOrUpdateRoom/", formData)
		.then((resp) => {
			return resp.data;
		})
		.then((data) => {
			// console.log("submitDiscussionRoom:: data", data);
			dispatch({type : 'getAllRooms' , data : data});
			return 1;
		})
		.catch((err) =>  {
			console.log("submitDiscussionRoom:: error", err);	
		})
	}
}

export var getCommunityMentorsOwners = (commId) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + "getCommunityMentorsOwners/",{
			params:{
				community_id : commId
			}
		}).then(function(response){
			let data = response.data;
			// console.log("getCommunityMentorsOwners :: Response :: ", data);
			dispatch({type : "getCommunityMentorsOwners" , data : data});

		}).catch(function(err){
			// console.log("getCommunityMentorsOwners :: Error :: ",err);
			return err;
		})
	}
}

export var getMyCommunityLearningPathAndReport = (packageId, commId) => {
	console.log("getMyCommunityLearningPathAndReport")
	return (dispatch, getState) => {
	  axios
		.get(URL_TEXT + "getMyCommunityLearningPathAndReport", {
		  params: {
			package: packageId,
			comm_id: commId
		  }
		})
		.then(function (data) {
		  console.log("getMyCommunityLearningPathAndReport ::: data :: ", data);
		  return data.data;
		})
		.then(function (data) {
		  console.log("******Respponse from server for getMyCommunityLearningPathAndReport: ", data);
		  dispatch({ type: "getMyCommunityLearningPathAndReport", data: data });
		})
		.catch(function (err) {
		  console.log("Error occurred while Fetching data for getMyCommunityLearningPathAndReport", err);
		});
	}
}
  

export var getMyCommunityPackageAndReport = (packageId, commId) => {
	console.log("getMyCommunityLearningPathAndReport")
	return (dispatch, getState) => {
	  axios
		.get(URL_TEXT + "getMyCommunityPackageAndReport", {
		  params: {
			package: packageId,
			comm_id: commId
		  }
		})
		.then(function (data) {
		  console.log("getMyCommunityPackageAndReport ::: data :: ", data);
		  return data.data;
		})
		.then(function (data) {
		  console.log("******Respponse from server for getMyCommunityPackageAndReport: ", data);
		  dispatch({ type: "getMyCommunityPackageAndReport", data: data });
		})
		.catch(function (err) {
		  console.log("Error occurred while Fetching data for getMyCommunityPackageAndReport", err);
		});
	}
}
  

export var getMyTrackingCourses = (commId) => {
	return (dispatch, getState) => {
	  axios
		.get(URL_TEXT + "getMyTrackingCourses", {
		  params: {
			community_id: commId,
			for_community: true,
		  }
		})
		.then(function (data) {
		  console.log("getMyTrackingCourses:", data.data);
		  return data.data;
		})
		.then(function (data) {
		  console.log("******Respponse from server for getMyTrackingCourses: ", data);
		  dispatch({ type: "getCommunityCourseTracker", data: data });
		})
		.catch(function (err) {
		  //console.log("Error occurred while Fetching data", err);
		});
	}
}
  

export var resendInviteToMember = (commId, userId) => {
	return (dispatch, getState) => {
	  return axios
		.get(URL_TEXT + "resendInviteToMember", {
		  params: {
			community_id: commId,
			profile_id: userId,
		  }
		})
		.then(function (data) {
		  console.log("resendInviteToMember:", data.data);
		  return data.data;
		})
		
		.catch(function (err) {
		  //console.log("Error occurred while Fetching data", err);
		});
	}
}