import axios from 'axios';
import { URL_TEXT } from '../../../GlobalConstants'

export var getPostsDataList = (postType, isappendresponse, sortOrder = "DESC", timeline = "all") => {
	// console.log("getPostsDataList ::", postType, sortOrder, timeline);
	if (isappendresponse === undefined) {
		isappendresponse = false;
	}
	//console.log("getPostsDataList ::", isappendresponse);
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getposts', {
			params: {
				posttype: postType,
				isappendpost: isappendresponse,
				sortOrder: sortOrder,
				timeline: timeline
			}
		})
			.then(function (response) {
				//console.log("******Response from server:", response);
				// dispatch(tasks('name', data));
				return response.data;
			})
			.then(function (data) {
				//console.log("******Response from server: ", data);
				// dispatch({type : "setPostsListState" , data: data , isappendresponse:isappendresponse});
				dispatch({ type: 'SET_POST_LIST_UPON_FETCH', data: data, isappendresponse: isappendresponse });
				return 1;
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getPostsDataListByUser = (postType, profileUserId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getpostsbyuser', {
			params: {
				posttype: postType,
				profileuserid: profileUserId
			}
		})
			.then(function (response) {
				//console.log("******Response from server for user blogs:", response);
				// dispatch(tasks('name', data));
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
				dispatch({ type: "setPostsListStateByUser", data: data });
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getQuestionListByUser = (postType, profileUserId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getpostsbyuser', {
			params: {
				posttype: postType,
				profileuserid: profileUserId
			}
		})
			.then(function (response) {
				//console.log("******Response from server for user questions:", response);
				// dispatch(tasks('name', data));
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
				dispatch({ type: "setQuestionsListStateByUser", data: data });
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}


export var getPostById = (postId, profileUserId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getpostsbyid', {
			params: {
				postid: postId,
			}
		})
			.then(function (response) {
				//console.log("******Response from server for post:", response);
				// dispatch(tasks('name', data));
				return response.data;
			}).then(function (data) {
				// console.log("******Response from server: ", data);
				dispatch({ type: "setIndividualPostState", data: data });
				return 1;
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getPostsListLikedByUser = (profileUserId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getpostsbylike', {
			params: {
				profileuserid: profileUserId
			}
		})
			.then(function (response) {
				//console.log("******Response from server for user liked blogs:", response);
				// dispatch(tasks('name', data));
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
				dispatch({ type: "setPostsListLikedStateByUser", data: data });
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getPostsListCommentedByUser = (profileUserId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getpostsusercommented', {
			params: {
				profileuserid: profileUserId
			}
		})
			.then(function (response) {
				//console.log("******Response from server for user commented posts:", response);
				// dispatch(tasks('name', data));
				return response.data;
			}).then(function (data) {
				// console.log("******Response from server: ", data);
				dispatch({ type: "setPostsListCommentedStateByUser", data: data });
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}


export var getUnresolvedPosts = (community_list = []) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getUnresolvedPosts/', {
			params: { community_list }
		})
			.then(function (response) {
				//console.log("******Response from server for user commented posts:", response);
				// dispatch(tasks('name', data));
				return response.data;
			}).then(function (data) {
				// console.log("******Response from server: ", data);
				dispatch({ type: "setQuestionsAskedFromMentor", data: data });
				return 1;
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}


export const getPostsSuggestions = (posttype = 'Blog', count = 5) => {
	return (dispatch) => {
		axios.get(URL_TEXT + 'getPostsSuggestions', {
			params: {
				posttype, count
			}
		})
			.then(resp => {
				return resp.data;
			})
			.then(data => {
				// console.log('getPostsSuggestions:: ', data);
				dispatch({ type: "suggestedPosts", data: data });
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export const markQuestionResolved = (postId, timeline, sortOrder, filterPostType, refresh_required) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + 'markQuestionResolved', {
			params: {
				posttype: filterPostType,
				refresh_required,
				postId,
				timeline,
				sortOrder,
			}
		})
			.then(resp => {
				return resp.data;
			})
			.then(data => {
				// console.log('markQuestionResolved:: ', data);
				if (refresh_required)
					dispatch({ type: "setPostsListState", data: data });
				return 1;
			})
			.catch(err => {
				console.log(err)
			})
	}
}


export var getpostsAskedFromMentor = () => {
	return (dispatch, getState) => {
		// return axios.get(URL_TEXT + 'getpostsAskedMentor')
		// 	.then(function (response) {
		// 		//console.log("******Response from server for user commented posts:", response);
		// 		// dispatch(tasks('name', data));
		// 		return response.data;
		// 	}).then(function (data) {
		// 		//console.log("******Response from server: ", data);
		// 		dispatch({ type: "setQuestionsAskedFromMentor", data: data });
		// 	})
		// 	.catch(function (error) {
		// 		//console.log(error);
		// 	});
	}
}


export const getTransactionHistory = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getTransactionHistory/')
		.then(function (response) {
			// console.log("******Response from server for getTransactionHistory::", response);
			return response.data;
		}).then(function (data) {
			// console.log("******getTransactionHistory: ", data);
			dispatch({ type: "myTransactionHistory", data: data });
		})
		.catch(function (error) {
			console.log("*****", error);
		});
	}
}


export const getPromotionMaterial = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getPromotionMaterial/')
		.then(function (response) {
			// console.log("******Response from server for getPromotionMaterial::", response);
			return response.data;
		}).then(function (data) {
			console.log("******getPromotionMaterial: ", data);
			// dispatch({ type: "getPromotionMaterial", data: data });
		})
		.catch(function (error) {
			console.log("*****", error);
		});
	}
}