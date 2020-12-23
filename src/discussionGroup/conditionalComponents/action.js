import axios from 'axios';
import {URL_TEXT, getCSRFHeader, getCookie} from '../../GlobalConstants'


export var getGroupDetails = (group_id) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getGroupDetails/',{
			params : {
				group_id : group_id
			}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("Response from getGroupDetails" , data)
			dispatch({type : 'getGroupDetails' , data : data});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}

export var getGroupMembers = (group_id) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getGroupMembers/',{
			params : {
				group_id : group_id
			}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("Response from getGroupMembers" , data)
			dispatch({type : 'getGroupMembers' , data : data});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}

export var getDiscussionRooms = (community_id, fromDashboard=false) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getDiscussionRooms/',{
			params : {
				community_id
			}
		})
		.then((response) => {
			return response.data;
		})
		.then((data) => {
			// console.log("Response from getDiscussionRooms" , data)
			if(fromDashboard)
				dispatch({type : 'GET_ALL_USER_ROOMS' , data : data});
			else
				dispatch({type : 'getAllRooms' , data : data});
		})
		.catch((error) => {
			// console.log("getDiscussionRooms:: error", error);
		});
	}
}

export var joinRoom = (group_id, community_id) => {
	return (dispatch) => {
		return axios.post(URL_TEXT + "joinRoom/", {
				group_id, 
				community_id
		})
		.then((response) => {
			return response.data;
		})
		.then((data) => {
			// console.log("Response from joinRoom" , data)
			return data;
		})
		.catch((error) => {
			// console.log("joinRoom:: error", error);
		});
	}
}


export var addOrUpdateRoomMembers = (group_id, community_id, profile_id, isExpertorOwner) => {
	// console.log("addorupdatemember :: ",group_id, community_id, profile_id, isExpertorOwner)
	return (dispatch) => {
		return axios.post(URL_TEXT + "addOrUpdateRoomMembers/", {
				group_id, 
				community_id,
				profile_id,
				isExpertorOwner
		})
		.then((response) => {
			return response.data;
		})
		.then((data) => {
			// console.log("Response from Adding Members" , data)
			return data;
		})
		.catch((error) => {
			// console.log("addOrUpdateRoomMembers:: error", error);
		});
	}
}


export var leaveDiscussionRoom = (group_id, joining_id, is_removed, is_left) => {
	return (dispatch) => {
		return axios.post(URL_TEXT + "leaveDiscussionRoom/", {
			group_id,
			joining_id, 
			is_removed,
			is_left
		})
		.then((response) => {
			return response.data;
		})
		.then((data) => {
			// console.log("Response from Leaving Room" , data)
			return data;
		})
		.catch((error) => {
			// console.log("leaveDiscussionRoom:: error", error);
		});
	}
}

export var addUpdatePostToDiscussionRoom = (groupId, post, communityId, postId)=>{
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + "addOrUpdateDiscussionPost/", {
			groupId,
			post,
			postId,
			communityId
		})
		.then((response) => {
			return response.data;
		})
		.then((data) => {
			// console.log("addUpdatePostToDiscussionRoom" , data)
			dispatch({type : 'ADD_UPDATE_GROUP_POST' , data : data, isNewPost: !postId});
			return data;
		})
		.catch((error) => {
			// console.log("addUpdatePostToDiscussionRoom :: error", error);
		});	
	}
}


export var addUpdatePostAnswerToDiscussionRoom = (postAnswer, postId,postAnswerId)=>{
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + "addOrUpdateDiscussionAnswer/", {
			postId,
			postAnswer,
			postAnswerId:postAnswerId
		})
		.then((response) => {
			return response.data;
		})
		.then((data) => {
			// console.log("addUpdatePostAnswerToDiscussionRoom" , data);
			dispatch({type : 'ADD_GROUP_POST_ANSWER' , data : data});
			return data;
		})
		.catch((error) => {
			// console.log("addUpdatePostAnswerToDiscussionRoom :: error", error);
		});	
	}
}



export var getDiscussionRoomPosts = (group_id) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getDiscussionGroupPosts/',{
			params : {
				groupId : group_id
			}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("Response from getDiscussionRoomPosts" , data)
			dispatch({type : 'DISCUSSION_ROOM_POSTS' , data : data});
		})
		.catch(function (error) {
			//console.log(error);
		});
}
}

export var getDiscussionRoomPostsAnswer = (groupPostId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getDiscussionGroupPostsAnswers/',{
			params : {
				groupPostId
			}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("Response from getDiscussionRoomPostsAnswer" , data)
			dispatch({type : 'DISCUSSION_ROOM_POST_ANSWERS' , data : data, groupPostId:groupPostId});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}

export var getDiscussionGroupPostsStatsCount = (group_id)=>{
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getDiscussionGroupPostsStatsCount/',{
			params : {
				groupId : group_id
			}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("Response from getDiscussionGroupPostsAnswersCount" , data)
			dispatch({type : 'DISCUSSION_ROOM_POSTS_STATS_COUNT' , data : data});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var likeOrDislikeGroupPost = (formdata)=>{ 
	let config = getCSRFHeader();
	return (dispatch,getState) =>{
		return axios.post(URL_TEXT + 'updateDiscussionPostLikes/',formdata, config)
			.then(function(response){
				return response.data;
			}).then(function(data){
				// console.log("likeOrDislikeGroupPost :: ",data)
				// dispatch({type : "contentDeleteLikesMapping" , data: data});
				return 1;
			}).catch(function(error){
				// console.log("error");
			});
	}
	
	
}


export var getSubscribedDiscussionRooms = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getSubscribedDiscussionRooms/',{
			params : {}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("getSubscribedDiscussionRooms" , data)
			dispatch({type : 'SUBSCRIBED_DISCUSSION_ROOMS' , data : data});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}

export var deleteDiscussionGroupPostsOrAnswer = (postId,postType)=>{
	let config = getCSRFHeader();
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + "deleteDiscussionGroupPostOrAnswer/", {
			postId,
			postType,
		}, config)
		.then((response) => {
			return response.data;
		})
		.then((data) => {
			// console.log("deleteDiscussionGroupPostsOrAnswer" , data);
			dispatch({type : 'REMOVE_GROUP_POST' , data : data,postId:postId, postType:postType});
			return data;
		})
		.catch((error) => {
			// console.log("deleteDiscussionGroupPostsOrAnswer :: error", error);
		});	
	}
}

export var addOrUpdateRoom = (uploadData, isFormData=true) => {
	if(isFormData)
		uploadData.append('csrfmiddlewaretoken', getCookie('csrftoken'));

	const config = {
		headers: { 'content-type': 'multipart/form-data' }
	}

	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'addOrUpdateRoom/', uploadData)
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("Response from addOrUpdateRoom" , data)
			dispatch({type : 'getGroupDetails' , data : data});
			return 1;
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}