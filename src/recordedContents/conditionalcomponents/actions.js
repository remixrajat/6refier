import axios from 'axios';
import {URL_TEXT, getCSRFHeader} from '../../GlobalConstants'


export var getContentDetails = (content_filter='all', content_id=undefined) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getcontentbyfilter/',{
			params : {
				content_filter, content_id
			}
		})
			.then(function (response) {
				// console.log("getContentDetails", response)
				return response.data;
			}).then(function (data) {
				dispatch({type:"contentDetails", data : data });
			})
			.catch(function (error) {
				console.warn(error);
			});
	}
}


export var getCustomizedContent = (content_filter, videoId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getCustomizedContent/',{
			params : { content_filter, videoId }
		})
		.then(function (response) {
			// console.log("getCustomizedContent", response)
			return response.data;
		}).then(function (data) {
			// console.log("getCustomizedContent", data)
			dispatch({type:"CUSTOM_CONTENT_LIST", data : data });
		})
		.catch(function (error) {
			console.warn(error);
		});
	}
}



export var getContentLikesDislikesMapping = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getContentLikes/')
			.then(function (response) {
				return response.data;
			}).then(function (data) {
				// console.log("getContentLikesDislikesMapping :: ", data)
				dispatch({type:"contentLikesMapping", data : data });
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getContentAccess = (formdata) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getContentAccess/',{
			params : {
				formdata
			}
		})
			.then(function (response) {
				return response.data;
			}).then(function (data) {
				// console.log("getContentAccess :: ", data)
				dispatch({type:"contentAccessMapping", data : data });
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getContentURL = (content_id) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getContentUrl/',{
			params : {
				content_id:content_id
			}
		})
			.then(function (response) {
				return response.data;
			}).then(function (data) {
				// console.log("getContentURL :: ", data)
				dispatch({type:"contentUrlMapping", data : data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export var requestToAccessContent = (formdata)=>{
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'requestToAccessContent/', formdata)
			.then(function (response) {
				return response.data;
			}).then(function (data) {
				dispatch({type:"requestToAccessContent", data : data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export var getContentStats = ()=>{
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getContentStats/')
			.then(function (response) {
				return response.data;
			}).then(function (data) {
				
				// console.log("getContentStats :: ", data)
				dispatch({type:"contentStats", data : data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export var likeOrDislikeContents = (formdata)=>{ 
	let config = getCSRFHeader();
	return (dispatch,getState) =>{
		return axios.post(URL_TEXT + 'updateLikes/',formdata, config)
			.then(function(response){
				return response.data;
			}).then(function(data){
				console.log("likeOrDislikeContents :: ",data)
				dispatch({type : "contentDeleteLikesMapping" , data: data});
			}).catch(function(error){
				console.log("error");
			});
	}
	
	
}

export var submitVideoViewStat = (formdata)=>{
	let config = getCSRFHeader();
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'submitVideoViewStat/', formdata,config)
			.then(function (response) {
				return response.data;
			}).then(function (data) {
				dispatch({type:"requestToAccessContent", data : data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export var getContentForDashboard = (formdata) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getcontentfordashboard/',{
			params : {
				formdata
			}
		})
			.then(function (response) {
				// console.log("getContentDetails", response)
				return response.data;
			}).then(function (data) {
				dispatch({type:"contentDetailsForDashboard", data : data });
			})
			.catch(function (error) {
				console.warn(error);
			});
	}
}


export var getPromoDetailsExpert = (userid) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getPromotionalUserById/',{
			params : {
				userid,
				community_list: false
			}
		})
		.then(function (response) {
			// console.log("getPromoDetailsExpert", response)
			return response.data;
		}).then(function (data) {
			// dispatch({type:"contentDetailsForDashboard", data : data });
			return data;
		})
		.catch(function (error) {
			console.warn(error);
		});
	}
}