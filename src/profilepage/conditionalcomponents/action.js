/**
	Action file
 */
import axios from 'axios';
import { URL_TEXT, getCookie, getCSRFHeader } from '../../GlobalConstants'

export var fetchAutoSuggestInstitutesData = (value) => {
	return (dispatch) => {
		return axios.get(URL_TEXT + 'search/autocomplete/', {
			params: {
				query_string: value,
				model_parameter: "institute"
			}
		}).then(function (response) {
			let data = response.data;
			//console.log("instiautosuggest response ", data)
			dispatch({ type: "setAutoSuggestStates", data: { propName: "instituteAutoSuggestState", value: data } });

		}).catch(function (error) {
			//console.log(error);
		})
	}
}


export var submitIntroForm = (profiledata, section="profile") => {
	//console.log("...456")
	//console.log(URL_TEXT)
	//console.log(profiledata)
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'updateuserprofileintro/', profiledata)
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				//console.log("45678: ", data);
				if (section === "profile") {
					dispatch({ type: 'setProfileData', data: data, section: section });
				}
				if (section === "professional") {
					dispatch({ type: 'setProfileData', data: JSON.parse(data["professional"]), section: section });
					dispatch({ type: 'setProfileData', data: JSON.parse(data["profile"]), section: "profile" });
				}
				if (section === "education") {
					dispatch({ type: 'setProfileData', data: JSON.parse(data["education"]), section: section });
					dispatch({ type: 'setProfileData', data: JSON.parse(data["profile"]), section: "profile" });
				}
				if (section === "hobbies") {
					window.location.reload();
					// dispatch({type : 'setProfileData' , data : JSON.parse(data["hobbies"]),section:section});
					// dispatch({type : 'setProfileData' , data : JSON.parse(data["profile"]),section:"profile"});
				}
				return 1;
			})
			.catch(function (error) {
				// console.log("submitIntroForm", error);
			});
	}
}


export var submitUserFormDetailsIntroForm = (profiledata, section=1) => {
	//console.log("...456")
	//console.log(URL_TEXT)
	//console.log(profiledata)
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'updateuserprofileintro/', {
			section,
			data : profiledata
		})
		.then(function (response) {
			//console.log("******Response from server:", response);
			return response.data;
		}).then(function (data) {
			//console.log("45678: ", data);
			if (section === "profile") {
				dispatch({ type: 'setProfileData', data: data, section: section });
			}
			if (section === "professional") {
				dispatch({ type: 'setProfileData', data: JSON.parse(data["professional"]), section: section });
				dispatch({ type: 'setProfileData', data: JSON.parse(data["profile"]), section: "profile" });
			}
			if (section === "education") {
				dispatch({ type: 'setProfileData', data: JSON.parse(data["education"]), section: section });
				dispatch({ type: 'setProfileData', data: JSON.parse(data["profile"]), section: "profile" });
			}
			if (section === "hobbies") {
				window.location.reload();
				// dispatch({type : 'setProfileData' , data : JSON.parse(data["hobbies"]),section:section});
				// dispatch({type : 'setProfileData' , data : JSON.parse(data["profile"]),section:"profile"});
			}
			return 1;
		})
		.catch(function (error) {
			// console.log("submitIntroForm", error);
		});
	}
}


export var getReadOnlyProfileData = (profileId) => {
	//console.log("...456::getReadOnlyProfileData")
	//console.log(URL_TEXT)
	//console.log(profileId)
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getuserprofiles/', {
			params: {
				userid: profileId,
				section: "all"
			}
		})
			.then(function (response) {
				//console.log("******Response from server:getReadOnlyProfileData", response);
				return response.data;
			}).then(function (data) {
				//console.log("45678:getReadOnlyProfileData ", data);
				dispatch({ type: 'setReadOnlyUserState', data: data });
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var setProfileDetails = (params) => {
	//console.log("blah blah" , params)
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'updateuserprofile/', params)
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
				dispatch({ type: 'setProfileData', data: data, section: params.objectPropName });
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}


export var uploadImageOrFile = (uploadData, url, objectPropName) => {
	//console.log("******Calling:uploadImageOrFile",uploadData,url)
	uploadData.append('csrfmiddlewaretoken', getCookie('csrftoken'));
	const config = {
		headers: { 'content-type': 'multipart/form-data' }
	}
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + url, uploadData)
			.then(function (response) {
				//console.log("******Response from server:uploadExcelTemplates", response);
				return response.data;
			})
			
			.catch(function (error) {
				//console.log(error);
				return false;
			});
	}
}

export var changeTextboxState = (value, id, objectPropName) => {
	return { type: 'setTextboxState', data: { [objectPropName + '#' + id]: value } };
}

export var changeAddTextboxState = (value) => {
	return { type: 'setAddTextboxState', data: { txtVal: value } };
}

export var changeInstitutionDetailsState = (value, id) => {
	return { type: 'setInstitutionTextboxState', data: { instValue: value, instId: id } };
}

export var changeDesignationDetailsState = (value, id) => {
	return { type: 'setDesignationTextboxState', data: { desValue: value, desId: id } };
}

export var changeYearDetailsState = (value, id) => {
	return { type: 'setYearTextboxState', data: { yearValue: value, yearId: id } };
}

export var changeDescriptionDetailsState = (value, id) => {
	return { type: 'setDescriptionTextboxState', data: { descriptionValue: value, descriptionId: id } };
}

export var addInstitutionDetailsState = (value) => {
	return { type: 'setAddInstitutionTextState', data: { newInst: value } };
}

export var addIDesignationDetailsState = (value) => {
	return { type: 'setAddDesignationTextState', data: { newDesgn: value } };
}

export var addYearDetailsState = (value) => {
	return { type: 'setAddYearTextState', data: { newYear: value } };
}

export var addDescriptionDetailsState = (value) => {
	return { type: 'setAddDescriptionTextState', data: { newDescr: value } };
}

export var changeUserDetailsTextBoxState = (name, value) => {
	//console.log("action called", name)
	return { type: 'setAddDescriptionTextState', data: { [name]: value } };
}




let tasks = (datatype, data = "") => {
	switch (datatype) {
		case 'name':
			return { type: 'loadinitially', data: data };
		default:
			return { type: 'default' };
	}

};

let getProfilePageData = () => {
	//console.log("Getting details from server");
	return (dispatch, getState) => {
		return axios.get('data/profilePageData.json')
			.then(function (response) {
				//console.log("******Response from server:", response);
				// dispatch(tasks('name', data));
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
				dispatch(tasks('name', data));
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
};

export default getProfilePageData;




export var saveChangedPassword = (changePasswordFormdata) => {
	// let csrftoken = getCookie('csrftoken')
	// changePasswordFormdata.csrfmiddlewaretoken = csrftoken
	let config = getCSRFHeader(); 
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'changePassword/', 
				changePasswordFormdata, 
				config
			)
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			})
			// .then(function (data) {
			// 	//console.log("saveChangedPassword: ", data);	
			// 	dispatch({ type: 'passwordChangeStatus', data: data });
			// })
			.catch(function (error) {
				//console.log(error);
			});
	}
}


export var updateUserTags = (tagsFormdata) => {
	let csrftoken = getCookie('csrftoken')
	tagsFormdata.csrfmiddlewaretoken = csrftoken
	let config = getCSRFHeader();
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'updateuserprofile/', tagsFormdata, config)
			.then(function (response) {
				// console.log("******Response from server:", response);
				return response.data;
			})
			// .then(function (data) {
			// 	// console.log("updateUserTags:: ", data);
			// 	dispatch({ type: 'setProfileData', data: data, section: "hobbies" });
			// })
			.catch(function (error) {
				// console.log(error);
			});
	}
}


export var requestForSession = (mentor_id, requested_date_time,
	requested_time_period, contact_number, application_text) => {
	return (dispatch, getState) => {
		return axios
			.post(URL_TEXT + "requestForSession/", {
				mentor_id: mentor_id,
				requested_date_time: requested_date_time,
				requested_time_period: requested_time_period,
				contact_number: contact_number,
				application_text: application_text
			})
			.then(function (response) {
				// console.log("******Response from server after requesting for session:", response);
				return response.data;
			})
			.catch(function (error) {
				// console.log("Error occurred while requesting for session:", error);
			});
	}
};

export var updateUserDescription = (profiledata) => {
	return (dispatch) => {
		return axios
				.post(URL_TEXT + "updateuserprofileintro/", {
					section: 1,
					isDescEdit: true,
					profiledata
				})
				.then((resp) => {
					return resp.data;
				})
				.then((data) => {
					// console.log("updateUserDescription:: data", data);
					data[0] = Object.assign({}, data[0], { fields: Object.assign({}, data[0].fields, {pk: data[0].pk}) })			
					dispatch({ type: 'setProfileData', data: data, section: "profile" });
				})
				.catch((err) => {
					console.log("updateUserDescription:: error", err);
				})
	}
}

export var updateUserStatus = (profiledata) => {
	return (dispatch) => {
		return axios
				.post(URL_TEXT + "updateuserprofileintro/", {
					section: 1,
					isStatusEdit: true,
					profiledata
				})
				.then((resp) => {
					return resp.data;
				})
				.then((data) => {
					// console.log("updateUserDescription:: data", data);
					data[0] = Object.assign({}, data[0], { fields: Object.assign({}, data[0].fields, {pk: data[0].pk}) })			
					dispatch({ type: 'setProfileData', data: data, section: "profile" });
				})
				.catch((err) => {
					console.log("updateUserDescription:: error", err);
				})
	}
}


export var submitUserTypes = (params) => {
	// console.log("here")
	return (dispatch, getState) => {
	  return axios
		  .post(URL_TEXT + "submitUserTypes/", {
			user_types : params
		})
		.then(function (data) {
		//   console.log("submitUserTypes:", data);
		  return data.data;
		})
		.then(function (data) {
		  // console.log("******Response from server for isUserFollows: ", data);
		//   dispatch({ type: "doesUserFollowTopic", data: { isUserFollowing: data }});
		  // dispatch({ type: 'setProfileData', data: data, section: "hobbies" });
		//   dispatch(getTagsList());
		  return 1;
		})
		.catch(function (err) {
		  //console.log("Error occurred while Fetching data", err);
		});
	}
}
  

export var getUserTypes = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getUserTypes/',{
			params : {}
		})
			.then(function (response) {
				return response.data;
			}).then(function (data) {
				// console.log("getTagsList" , data)
				dispatch({type : 'getUserTypes' , data : data});
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}