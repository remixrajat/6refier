import axios from 'axios';
import { URL_TEXT, getCookie, getCSRFHeader } from '../../GlobalConstants'


var setInitialState = (datatype, data = "") => {
	switch (datatype) {
		case 'postsData':
			return { type: 'loadInitialState', data: {'postsData' : data} };
		case 'mentorDetails':
			return { type: 'loadInitialState', data: {'mentorDetails' : data} };
		case 'communityDetails':
			return { type: 'loadInitialState', data: {'communityDetails' : data} };
		default:
			return { type: 'default' };
	}

};


export var getMentorDetails = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getuserlist/', {
			params : {
				usertype : 'mentor'
			}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			//console.log("xoxo" , data)
			dispatch(setInitialState('mentorDetails', data));
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}

// export var setDashboardMentorDetails = () => {
//   return (dispatch, getState) => {
//     axios
//       .get("data/dashboardMentorDetails.json")
//       .then(function(data) {
//         // dispatch(tasks('name', data));
//         return data.data;
//       })
//       .then(function(data) {
//         //console.log("******Respponse from server", data);
//         dispatch({ type: "mentorDetailsHardcoded", data: data });
//       })
//       .catch(function(err) {
//         //console.log("Error occurred while Fetching data", err);
//       });
//   };
// };

// export var setDashboardCommunityDetails = () => {
//   return (dispatch, getState) => {
//     axios
//       .get("data/dashboardCommunityDetails.json")
//       .then(function(data) {
//         // dispatch(tasks('name', data));
//         return data.data;
//       })
//       .then(function(data) {
//         //console.log("******Respponse from server", data);
//         dispatch({ type: "communityDetailsHardcoded", data: data });
//       })
//       .catch(function(err) {
//         //console.log("Error occurred while Fetching data", err);
//       });
//   };
// };


export var getTagsList = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getTagsList/', {
			params : {}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("getTagsList" , data)
			dispatch({type : 'getTagsList' , data : data});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var getCourseForDashboard = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getCoursesForDashboard/', {
			params : {}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("getCourseForDashboard" , data)
			dispatch({type : 'getCourseForDashboard' , data : data});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var getRecentActivityReport = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getRecentActivityReport/', {
			params : {}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("getRecentActivityReport" , data)
			dispatch({type: 'recentActivityCommunityOwner', data: data})
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var getCommunitySkillsList = (communityId, autocomplete=false) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getCommunitySkillsList/', {
			params : {
				community_id: communityId,
				autocomplete: autocomplete
			}
		})
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("getCommunitySkillsList" , data)
			if(autocomplete) {
				dispatch({type : 'getCommunitySkills' , data : data});
			} else {
				dispatch({type : 'getCommunitySkillsDetails' , data : data});
			}
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var getAllCommunitySkillsList = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getCommunitySkillsList/')
		.then(function (response) {
			return response.data;
		}).then(function (data) {
			// console.log("getAllCommunitySkillsList" , data)
			// dispatch({type : 'getTagsList' , data : data});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var updateCommunitySkills = (skillsFormData) => {
	let csrftoken = getCookie('csrftoken')
	skillsFormData.csrfmiddlewaretoken = csrftoken
	let config = getCSRFHeader();

	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'addorupdatecommunityskills/', skillsFormData, config)
		.then(function (response) {
			// console.log("updateCommunitySkills" , data)
			return response.data;
		}).then(function (data) {
			// console.log("updateCommunitySkills" , data)
			dispatch({type : 'getCommunitySkills' , data : data});
			return 1;
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var updatePackageAssessmentSkills = (skillsFormData) => {
	let csrftoken = getCookie('csrftoken')
	skillsFormData.csrfmiddlewaretoken = csrftoken
	let config = getCSRFHeader();

	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'addorupdatepackageassessmentskills/', skillsFormData, config)
		.then(function (response) {
			// console.log("updatePackageAssessmentSkills" , data)
			return response.data;
		}).then(function (data) {
			// console.log("updatePackageAssessmentSkills" , data)
			dispatch({type : 'getPackageAssessmentSkill' , data : data, add: 'add'});
			return 1;
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var getCommunityPackagesMarketPlace = (communityId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getCommunityPackagesMarketPlace/', {
			params : {
				community_id: communityId,
			}
		})
		.then(function (response) {
			// console.log("getCommunityPackagesMarketPlace" , data)
			return response.data;
		}).then(function (data) {
			// console.log("getCommunityPackagesMarketPlace" , data)
			dispatch({type : 'communityPackagesMarketPlace' , data : data});
			return 1;
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var submitCommunitySkill = (formData) => {
	let csrftoken = getCookie('csrftoken')
	formData.csrfmiddlewaretoken = csrftoken
	let config = getCSRFHeader();

	return(dispatch) => {
		return axios.post(URL_TEXT + "addCommunitySkill/", formData, config)
		.then((resp) => {
			return resp.data;
		})
		.then((data) => {
			// console.log("submitCommunitySkill:: data", data);
			dispatch({type : 'getCommunitySkills' , data : data});
			return 1;
		})
		.catch((err) =>  {
			// console.log("submitCommunitySkill:: error", err);	
		})
	}
}


export var getPackageAssessmentSkill = (communityId, packageIdList) => {
	return(dispatch) => {
		return axios.get(URL_TEXT + "getPackageAssessmentSkill/", {
			params: {
				community_id: communityId,
				package_id_list: packageIdList,
				autocomplete: true
			}
		})
		.then((resp) => {
			return resp.data;
		})
		.then((data) => {
			// console.log("getPackageAssessmentSkill:: data", data);
			dispatch({type : 'getPackageAssessmentSkill' , data : data});
			return 1;
		})
		.catch((err) =>  {
			// console.log("submitCommunitySkill:: error", err);	
		})
	}
}


export var getAllSkillAndTag = (communityId) => {
	return(dispatch) => {
		return axios.get(URL_TEXT + "getAllSkillAndTag/", {
			params: {
				community_id: communityId,
			}
		})
		.then((resp) => {
			return resp.data;
		})
		.then((data) => {
			// console.log("getAllSkillAndTag:: data", data);
			dispatch({type : 'getAllSkillAndTag' , data : data});
			return 1;
		})
		.catch((err) =>  {
			// console.log("getAllSkillAndTag:: error", err);	
		})
	}
}


export var fetchReportsForSkill = (communityId, skill) => {
	return(dispatch) => {
		return axios.get(URL_TEXT + "fetchReportsForSkill/", {
			params: {
				community_id: communityId,
				skill: skill
			}
		})
		.then((resp) => {
			return resp.data;
		})
		.then((data) => {
			// console.log("fetchReportsForSkill:: data", data);
			dispatch({type : 'fetchReportsForSkill' , data : data});
			return 1;
		})
		.catch((err) =>  {
			// console.log("fetchReportsForSkill:: error", err);	
		})
	}
}


export var getCompanySkillEntityMapping = (communityId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getSubCommunityMappedToCompanySkill/', {
			params : {
				community_id: communityId,
			}
		})
		.then(function (response) {
			console.log("getSubCommunityMappedToCompanySkill" , response)
			return response.data;
		}).then(function (data) {
			// console.log("getSubCommunityMappedToCompanySkill" , data)
			dispatch({type : 'companySkillToSubEntity' , data : data});
			return 1;
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}

export var addorupdateSubCommunityMappedToCompanySkills = (skillsFormData) => {
	let csrftoken = getCookie('csrftoken')
	skillsFormData.csrfmiddlewaretoken = csrftoken
	let config = getCSRFHeader();

	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'addorupdateSubCommunityMappedToCompanySkills/', skillsFormData, config)
		.then(function (response) {
			console.log("addorupdateSubCommunityMappedToCompanySkills" , response.data)

			dispatch({type : 'companySkillToSubEntity' , data : response.data, add: 'add'});
			return response.data;
			})
		// 	.then(function (data) {
		// 	// console.log("updatePackageAssessmentSkills" , data)
		// 	return 1;
		// })
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var getUserEntitySkills = (communityId) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getUserEntitySkills/', {
			params : {
				community_id: communityId,
			}
		})
		.then(function (response) {
			console.log("getUserEntitySkills" , response)
			return response.data;
		}).then(function (data) {
			// console.log("getSubCommunityMappedToCompanySkill" , data)
			dispatch({type : 'getUserEntitySkills' , data : data});
			return 1;
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}


export var getAttendeeDetailsForSession = (event_id) => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getSessionAttendanceListForSession/', {
			params : {
				event_id: event_id,
			}
		})
		.then(function (response) {
			// console.log("getAttendeeDetails" , response)
			return response.data;
		}).then(function (data) {
			console.log("getAttendeeDetails" , data)
			dispatch({type: 'getAttendeeDetailsForSession' , data: data});
			return 1;
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
}

