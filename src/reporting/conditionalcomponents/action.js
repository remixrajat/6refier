import axios from "axios";
import { URL_TEXT } from '../../GlobalConstants'


export var getCommunitySubscriptionReport = (commId) => {
  // console.log("getCommunitySubscriptionReport :: commId :: ", commId)
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getCommunitySubscriptionReport", {
        params: {
          community_id: commId,
        }
      })
      .then(function (data) {
        // console.log("getCommunitySubscriptionReport ::: data :: ", data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Respponse from server for getCommunitySubscriptionReport: ", data);
        dispatch({ type: "getCommunityActivityReports", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}


export var getUserActivityReport = (packageId) => {
  // console.log("getUserActivityReport")
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getUserActivityReport", {
        params: {
          package: packageId,
        }
      })
      .then(function (data) {
        // console.log("getUserActivityReport ::: data :: ", data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Respponse from server for getUserActivityReport: ", data);
        dispatch({ type: "getUserActivityReport", data: data });
      })
      .catch(function (err) {
        console.log("Error occurred while Fetching data for getUserActivityReport", err);
      });
  }
}

export var getPackageSubscriptionReport = (packageId, commId) => {
  // console.log("getPackageSubscriptionReport :: packageId :: ", packageId)
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getPackageSubscriptionReport", {
        params: {
          package_mapping_id: packageId,
          commId: commId
        }
      })
      .then(function (data) {
        // console.log("getPackageSubscriptionReport ::: data :: ", data);
        return data.data;
      })
      .then(function (data) {
        // console.log("******Respponse from server for getCommunitySubscriptionReport: ", data);
        dispatch({ type: "getCourseActivityReports", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}

export var notifyLearner = (notification, notifiedTo, type) => {
	return (dispatch) => {
		return axios.post(URL_TEXT + "notifyLearner/", {
			notification : notification,
			notified_to : notifiedTo,
			notification_type : type,

		}).then(function(response){
			let data = response.data;
			return data;
		}).catch(function(err){
			//console.log(err);
			return err;
		})
	}
}