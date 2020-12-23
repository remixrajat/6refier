import axios from "axios";
import { URL_TEXT } from '../../GlobalConstants'
import { formatdatefunction } from "../../HelperFunctions/formatDateFunction";


export var getServiceData = (commId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getservicecounter", {
        params: {
          community_id: commId
        }
      })
      .then(function (data) {
        //console.log("serviceData:", data.data);
        return data.data.service_details;
      })
      .then(function (data) {
        //console.log("******Respponse from server: ", data);
        let newData = [];
        const keys = Object.keys(data);
        for (let key of keys) {
          let tempObject = {};
          tempObject.serviceName = key;
          let keyval = JSON.parse(data[key]);
          for (let j of keyval) {
            tempObject.quantityAlloted = j.fields.total_available_hours;
            tempObject.quantityUsed = j.fields.hours_consumed;
            tempObject.quantityRemaining =
              j.fields.total_available_hours - j.fields.hours_consumed;
          }
          newData.push(tempObject);
        }
        //console.log("newData", newData);
        dispatch({ type: "setServiceCounterData", data: newData });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  };
};

export var getEventsData = (commId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getservicetracker", {
        params: {
          community_id: commId,
          service_name: "all",
          fetch_application_count: "true",
        }
      })
      .then(function (data) {
        //console.log("trackerData:", data.data);
        return data.data;
      })
      .then(function (data) {
        //console.log("******Respponse from server for Event Tracker: ", data);
        dispatch({ type: "setEventTrackerState", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}

export var getApplicationsReceived = (commId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "geteventapplicationstatus/", {
        params: {
          eventId: "all",
          communityId: commId,
          status: "Pending"
        }
      })
      .then(function (data) {
        //console.log("ApplicationReceived Data:", data.data);
        return data.data;
      })
      .then(function (data) {
        //console.log("******Respponse from server: setAppRec: ", data);
        dispatch({ type: "getApplicationsReceived", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  };
};

export var sendEventForApproval = (pk,commId) => {
  return (dispatch, getState) => {
    return axios
      .post(URL_TEXT + "changeapplicationstatus/", {
        applicationId: pk,
        status: "Accepted",
        community_id: commId,
      })
      .then(function (response) {
        //console.log("******Response from server after accepting application:", response);
        return response.data;
      })
      // .then(function (data) {
        
      // })
      .catch(function (error) {
        //console.log("Error occurred while applying for application", error);
      });
  }
};

export var getStudentAndTeacherList = (commId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "gettreestructure", {
        params: {
          school_id: commId,
          which_type: "student"
        }
      })
      .then(function (response) {
        //console.log("******Student and Teacher's List", response);
        return response.data;
      })
      .then(function (data) {
        dispatch({ type: "studenttreeStructure", data: data.student_list });
        dispatch({ type: "teachertreeStructure", data: data.teacher_list });
      })
      .catch(function (error) {
        //console.log("Error occurred while applying for application", error);
      });
  }
};

export var addMembersToEvent = (members,eventId,commId,type) => {
  return (dispatch, getState) => {
    return axios
      .post(URL_TEXT + "applybulkusers/", {
        members: members,
        eventId: eventId,
        community_id: commId,
        type: type
      })
      .then(function (response) {
        //console.log("******Response from server after accepting application:", response);
        return response.data;
      // }).then(function (data) {
      //   let serviceTrackerData = (data.service_tracker)
      //   //console.log("******Response from server: ", data);
      //   //console.log("*****n", serviceTrackerData);
      //   dispatch({ type: "setEventTrackerState", data: serviceTrackerData });
      })
      .catch(function (error) {
        //console.log("Error occurred while applying for application", error);
      });
  }
};


export var getCommunitySessionsData = (commId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getcommunityscheduledeventlist", {
        params: {
          community_id: commId,
        }
      })
      .then(function (data) {
        //console.log("sessionsData:", data.data);
        return data.data;
      })
      .then(function (data) {
        //console.log("******Respponse from server for Community Sessions: ", data);
        dispatch({ type: "setCommunitySessionsState", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}

export var setEventEligibilityList = (members,eventId,for_all,commId) => {
  return (dispatch, getState) => {
    return axios
      .post(URL_TEXT + "setEventEligibilityList/", {
        members: members,
        eventId: eventId,
        for_all: for_all,
        community_id: commId,
      })
      .then(function (response) {
        //console.log("******Response from server after accepting application:", response);
        return response.data;
      // }).then(function (data) {
      //   let serviceTrackerData = (data.service_tracker)
      //   //console.log("******Response from server: ", data);
      //   //console.log("*****n", serviceTrackerData);
      //   dispatch({ type: "setEventTrackerState", data: serviceTrackerData });
      })
      .catch(function (error) {
        //console.log("Error occurred while applying for application", error);
      });
  }
};

export var getCommunityPackagesAsOwner = (commId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getMyPackagesAsOwner", {
        params: {
          community_id: commId,
          for_community: true,
        }
      })
      .then(function (data) {
        // console.log("getCommunityPackagesAsOwner:", data.data);
        return data.data;
      })
      .then(function (data) {
        //console.log("******Respponse from server for Community Sessions: ", data);
        dispatch({ type: "getCommunityPackagesAsOwner", data: data });
      })
      .catch(function (err) {
        //console.log("Error occurred while Fetching data", err);
      });
  }
}

export var setMonitoringPermissionsForModule = (members, commId, packageId) => {
  return (dispatch, getState) => {
    return axios
      .post(URL_TEXT + "setMonitoringPermissions/", {
        members: members,
        package_mapping: packageId,
        comm_id: commId,
        is_monitor: true
      })
      .then(function (response) {
        //console.log("******Response from server after accepting application:", response);
        return response.data;
      // }).then(function (data) {
      //   let serviceTrackerData = (data.service_tracker)
      //   //console.log("******Response from server: ", data);
      //   //console.log("*****n", serviceTrackerData);
      //   dispatch({ type: "setEventTrackerState", data: serviceTrackerData });
      })
      .catch(function (error) {
        //console.log("Error occurred while applying for application", error);
      });
  }
}

export var setAdminPermissionsForModule = (members, commId, packageId) => {
  return (dispatch, getState) => {
    return axios
      .post(URL_TEXT + "setResponsibilityForCourse/", {
        members: members,
        package_mapping: packageId,
        comm_id: commId,
        is_monitor: true
      })
      .then(function (response) {
        //console.log("******Response from server after accepting application:", response);
        return response.data;
      // }).then(function (data) {
      //   let serviceTrackerData = (data.service_tracker)
      //   //console.log("******Response from server: ", data);
      //   //console.log("*****n", serviceTrackerData);
      //   dispatch({ type: "setEventTrackerState", data: serviceTrackerData });
      })
      .catch(function (error) {
        //console.log("Error occurred while applying for application", error);
      });
  }
}

export var assignMembersToCourse = (members, commId, nodeIdTypeObj, packageValidityId) => {
  return (dispatch, getState) => {
    return axios
      .post(URL_TEXT + "assignCourse/", {
        members: members,
        comm_id: commId,
        nodeIdTypeObj: nodeIdTypeObj,
        packageValidityId: packageValidityId,
      })
      .then(function (response) {
        //console.log("******Response from server after accepting application:", response);
        return response.data;
      // }).then(function (data) {
      //   let serviceTrackerData = (data.service_tracker)
      //   //console.log("******Response from server: ", data);
      //   //console.log("*****n", serviceTrackerData);
      //   dispatch({ type: "setEventTrackerState", data: serviceTrackerData });
      })
      .catch(function (error) {
        //console.log("Error occurred while applying for application", error);
      });
  }
}

export var getGeneratedEventURL = (mappingID, communityID, isPackage) => {
  return (dispatch, getState) => {
    return axios
      .get(URL_TEXT + "generateEventUrl/",{
        params : {
          eventid : mappingID, 
          is_package : isPackage
        }
      })
      .then(function(data) {
        // console.log("getGeneratedEventURL:", data.data);
        // dispatch(tasks('name', data));
        return data.data;
      })
      .then(function(data) {
        // console.log("getGeneratedEventURL:", data);
        dispatch(getEventsData(communityID))
        return data;
      })
      .catch(function(err) {
        //console.log("Error occurred while Fetching data", err);
      });
  };
};

export var sendReminderMails = (mappingID) => {
  return (dispatch, getState) => {
    return axios
      .get(URL_TEXT + "sendReminderMailEvent/",{
        params : {
          mappingId : mappingID
        }
      })
      .then(function(data) {
        console.log("sendReminderMailEvent:", data.data);
        // dispatch(tasks('name', data));
        return data.data;
      })
      .catch(function(err) {
        //console.log("Error occurred while Fetching data", err);
      });
  };
}