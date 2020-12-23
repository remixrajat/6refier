import axios from "axios";
import { URL_TEXT, getCookie, getCSRFHeader } from '../../GlobalConstants'
import { getTagsList } from '../../dashboardpage/conditionalcomponents/action'

export var emptyStore = () => {
  return (dispatch, getState) => {
    let data = []
    dispatch({ type: "topicDetails", data: data });
    dispatch({ type: "postOfTopic", data: data });
    dispatch({ type: "sessionsOfTopic", data: data });
    dispatch({ type: "mentorsOfTopic", data: data });
    dispatch({ type: "communitiesOfTopic", data: data });
    dispatch({ type: "testListOfTopic", data: data });
    dispatch({ type: "contentDetailsOfTopic", data: data });
    dispatch({ type: "doesUserFollowTopic", data: data });
  }
}

export var getTagDetails = (tagId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getTagDetails/", {
        params: {
          tag_pk: tagId,
        }
      })
      .then(function (data) {
        // console.log("topicDetailsResponse:", data.data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Respponse from server for topic details: ", data);
        dispatch({ type: "topicDetails", data: data });
      })
      .catch(function (err) {
        // console.log("Error occurred while Fetching data", err);
      });
  }
}

export var getPostsOfTags = (tagId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getPostsOfTags/", {
        params: {
          tag_pk: tagId,
        }
      })
      .then(function (data) {
        // console.log("postDetailsResponse:", data.data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Respponse from server for post details: ", data);
        dispatch({ type: "postOfTopic", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}



export var getSessionsOfTags = (tagId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getSessionsOfTags/", {
        params: {
          tag_pk: tagId,
        }
      })
      .then(function (data) {
        // console.log("sessionDetailsResponse:", data.data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Response from server for session details: ", data);
        dispatch({ type: "sessionsOfTopic", data: data });
      })
      .catch(function (err) {
        // console.log("Error occurred while Fetching data", err);
      });
  }
}



export var getUserListForTag = (tagId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getUserListForTag/", {
        params: {
          tag_pk: tagId,
          usertype: 'mentor'
        }
      })
      .then(function (data) {
        // console.log("mentorDetailsResponse:", data.data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Response from server for mentor details: ", data);
        dispatch({ type: "mentorsOfTopic", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}



export var getCommunityListForTag = (tagId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "fetchCommunityListOfTag/", {
        params: {
          tag_pk: tagId,
        }
      })
      .then(function (data) {
        // console.log("communityDetailsResponse:", data.data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Response from server for community details: ", data);
        dispatch({ type: "communitiesOfTopic", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}


export var getTestList = (tagId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getTestListFromTag/", {
        params: {
          tag_pk: tagId,
        }
      })
      .then(function (data) {
        // console.log("TestDetailsResponse:", data.data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Response from server for test details: ", data);
        dispatch({ type: "testListOfTopic", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}


export var getContentOfTags = (tagId) => {
  // console.log("getContentOfTags")
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getContentOfTags/", {
        params: {
          tag_pk: tagId,
        }
      })
      .then(function (data) {
        // console.log("ContentDetailsResponse:", data.data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Response from server for content details: ", data);
        dispatch({ type: "contentDetailsOfTopic", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}

export var isUserFollows = (profileId, tagId) => {
  // console.log("here")
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getIsFollow/", {
        params: {
          profile_id: profileId,
          tag_pk: tagId,
        }
      })
      .then(function (data) {
        // console.log("isUserFollows:", data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Response from server for isUserFollows: ", data);
        dispatch({ type: "doesUserFollowTopic", data: { isUserFollowing: data }});
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}

export var followTopic = (tagId) => {
  // console.log("here")
  return (dispatch, getState) => {
    return axios
      .get(URL_TEXT + "followTopic/", {
        params: {
          tag_pk: tagId,
        }
      })
      .then(function (data) {
        // console.log("isUserFollows:", data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Response from server for isUserFollows: ", data);
        dispatch({ type: "doesUserFollowTopic", data: { isUserFollowing: data }});
        // dispatch({ type: 'setProfileData', data: data, section: "hobbies" });
        dispatch(getTagsList());
        return 1;
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}

export var getParentTagsList = () => {
	return (dispatch, getState) => {
		return axios.get(URL_TEXT + 'getParentTags/',{
			params : {}
		})
			.then(function (response) {
				return response.data;
			}).then(function (data) {
				// console.log("getTagsList" , data)
				dispatch({type : 'getParentTags' , data : data});
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var uploadImageOrFile = (uploadData) => {
  uploadData.append('csrfmiddlewaretoken', getCookie('csrftoken'));
  
  const config = {
			headers: { 'content-type': 'multipart/form-data' }
  }
  
  return (dispatch, getState) => {
    return axios.post(URL_TEXT + 'updateTopicPicture/', uploadData)
      .then(function (response) {
          //console.log("******Response from server:uploadImageOrFile", response);
          return response.data;
      })
      .then(function (data) {
          // console.log("******Response from server:uploadImageOrFile :: topic ", data);
          dispatch({type : 'topicDetails' , data : data} );
          return 1;
      })
      .catch(function (error) {
        //console.log("uploadImageOrFile",error);
        return false;
      });
	}
}