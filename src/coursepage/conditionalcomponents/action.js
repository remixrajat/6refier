import axios from "axios";
import { URL_TEXT } from '../../GlobalConstants'

export var getRunningCourseDetails = (packageMappingId) => {
    return (dispatch, getState) => {
      axios
        .get(URL_TEXT + "getRunningCourseDetails", {
          params: {
            package_mapping_id: packageMappingId,
          }
        })
        .then(function (data) {
          // console.log("getRunningCourseDetails:", data.data);
          return data.data;
        })
        .then(function (data) {
          //console.log("******Respponse from server for Community Sessions: ", data);
          dispatch({ type: "getRunningCourseDetails", data: data });
        })
        .catch(function (err) {
          //console.log("Error occurred while Fetching data", err);
        });
    }
}


export var getPackageInfo = (validityId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getPackageInfo/", {
        params : {
          package_validity_id : validityId
        }
      })
      .then(function(data) {
        // console.log("getPackageInfo:", data.data);
        return data.data;
      })
      .then(function(data) {
         dispatch({ type: "COURSEINFO", data: data});
      })
      .catch(function(err) {
        console.log("Error occurred while Fetching Webinar data", err);
      });
  };
};



export var getPackageUserAccess = (validityId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getPackageUserAccess/", {
        params : {
          package_validity_id : validityId
        }
      })
      .then(function(data) {
        // console.log("getPackageInfoAccess:", data.data);
        return data.data;
      })
      .then(function(data) {
         dispatch({ type: "COURSEINFOACCESS", data: data});
      })
      .catch(function(err) {
        console.log("Error occurred while Fetching Webinar data", err);
      });
  };
};