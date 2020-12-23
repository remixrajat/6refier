import axios from "axios";
import { formatdatefunction } from "../../HelperFunctions/formatDateFunction";
import {URL_TEXT,MEDIA_URL_TEXT} from '../../GlobalConstants'

export var setUpcomingEvent = () => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getuserevents/")
      .then(function(data) {
        //console.log("upcomingEvents:", data.data);
        // dispatch(tasks('name', data));
        return data.data;
      })
      .then(function(data) {
          // console.log("userservicedataserver", data);
        //  let eventData  = setEventDataStateUser(data);
         dispatch({ type: "setUpcomingEvent", data: data});
      })
      .catch(function(err) {
        //console.log("Error occurred while Fetching data", err);
      });
  };
};


export var getScheduledEventsOfUser = (profileUserId) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getuserscheduledevents/",{
        params : {
          profileuserid : profileUserId
        }
      })
      .then(function(data) {
        // console.log("userservicedataserver : setUpcomingEventOfUser", data);
        // dispatch(tasks('name', data));
        return data.data;
      })
      .then(function(data) {
          // console.log("userservicedataserver : setUpcomingEventOfUser", data);
        //  let eventData  = setEventDataStateUser(data);
         dispatch({ type: "setUpcomingEventOfUser", data: data});
      })
      .catch(function(err) {
        //console.log("Error occurred while Fetching data", err);
      });
  };
};

export var insertUserApplication = (id,text)=> {
  return (dispatch,getState) => {
    return axios.post(URL_TEXT + 'applyeventuser/', {
            event_id : id,
            application_text : text
		})
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
      })
      // .then(function (data) {
      //   // let eventData = setEventDataStateUser(data);
      //   dispatch({ type: "setUpcomingEvent", data: data});
			// })
			.catch(function (error) {
        // if(error.response.data.error_type == "INSUFFICIENT_CREDITS"){
        //   let win = window.open("/checkout/" + error.response.data.product_type + "/" + id, '_blank');
        //   win.focus();
        // }
			});
  }
}

var setEventDataStateUser = (data) => {
 let event = {};
event.upcoming = [];
event.previous = [];
event.upcomingSmallScreen = [];
for(let key of data) {
    let tempObj = {};
    let tempObj2 = {};
    const obj = key.fields;
    //console.log("hoho",obj)
    tempObj.event = obj.session_id.event_type.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + ((obj.session_id.topic) ? ' - ' + obj.session_id.topic : "");
    tempObj2.event = tempObj.event;
    tempObj.description = obj.session_id.description;
    tempObj.url = obj.session_id.event_url;
    tempObj.id = obj.session_id.session_id;
    tempObj.date = formatdatefunction(obj.session_id.start_date_time, "short");
    tempObj2.date = formatdatefunction(obj.session_id.start_date_time, "short");
    tempObj.time = formatdatefunction(obj.session_id.start_date_time, "time");
    tempObj.end_time = formatdatefunction(obj.session_id.end_date_time, "time");
    tempObj.mentor_id = obj.session_id.mentor_id.id;
    tempObj2.mentor_id = obj.session_id.mentor_id.id;
    if(obj.session_id.status === "Scheduled") {
        if(obj.application) {
            tempObj.status = obj.application.application_status;
            tempObj2.status = obj.application.application_status;
        }
        else {
            tempObj.status = null; 
            tempObj2.status = null; 
        }
        event.upcoming.push(tempObj);
        event.upcomingSmallScreen.push(tempObj2);
    }
    else if(obj.session_id.status === "Done") {
        event.previous.push(tempObj);
    }
      
}          
// //console.log("event data upcoming", event);
return(event);
}

export var updateSessionStatus = (event_id)=>{
  return (dispatch,getState) => {
    return axios.post(URL_TEXT + 'updateEventStatus/', {
            "event_id" : event_id
		})
			.then(function (response) {
				// console.log("******Response from server:", response);
				return response.data;
      })
      // .then(function (data) {
        // let eventData = setEventDataStateUser(data);
        // dispatch({ type: "", data: data});
			// })
			.catch(function (error) {
			});
  }
}

/*
export var setPreviousEvent = () => {
  return (dispatch, getState) => {
    axios
      .get("data/userServicePagePreviousData.json")
      .then(function(data) {
        //console.log("previous Data:", data.data);
        // dispatch(tasks('name', data));
        return data.data;
      })
      .then(function(data) {
        //console.log("******Respponse from server: ", data);
        dispatch({ type: "setPreviousEvent", data: data });
      })
      .catch(function(err) {
        //console.log("Error occurred while Fetching data", err);
      });
  };
};
*/

export var getEventInfo = (event_id) => {
  return (dispatch, getState) => {
    axios
      .get(URL_TEXT + "getEventInfo/",{
        params : {
          event_id : event_id
        }
      })
      .then(function(data) {
        // console.log("getEventInfo:", data.data);
        // dispatch(tasks('name', data));
        return data.data;
      })
      .then(function(data) {
          //console.log("upcominguserservicedataserver", data);
        //  let eventData  = setEventDataStateUser(data);
        //  dispatch({ type: "setUpcomingEventOfUser", data: data});
      })
      .catch(function(err) {
        //console.log("Error occurred while Fetching data", err);
      });
  };
};

export var getGeneratedEventURL = (mappingID) => {
  return (dispatch, getState) => {
    return axios
      .get(URL_TEXT + "generateEventUrl/",{
        params : {
          eventid : mappingID
        }
      })
      .then(function(data) {
        // console.log("getGeneratedEventURL:", data.data);
        // dispatch(tasks('name', data));
        return data.data;
      })
      .then(function(data) {
        // console.log("getGeneratedEventURL:", data);
        dispatch(setUpcomingEvent())
        return data;
      })
      .catch(function(err) {
        //console.log("Error occurred while Fetching data", err);
      });
  };
};


export var getAllPackageValidityMappingForEvents = () => {
  return (dispatch, getState) => {
    return axios
      .get(URL_TEXT + "getallpackagevaliditymappingforevents/")
      .then(function(data) {
        return data.data;
      })
      .then(function(data) {
        // console.log("getAllPackageValidityMappingForEvents:", data);
        dispatch({type:'PACKAGE_VALIDITY_MAPPING_FOR_EVENTS', data: data})
        return data;
      })
      .catch(function(err) {
        console.log("Error occurred while Fetching getAllPackageValidityMappingForEvents", err);
      });
  };
};
