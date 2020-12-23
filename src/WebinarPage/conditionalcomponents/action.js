import axios from 'axios';
import {URL_TEXT, SOCKETURL} from '../../GlobalConstants';

export var authenticateUser = (userprofiledata) => {
    //console.log("LiveBroadcast::action::authenticateUser", userprofiledata);
    return (dispatch, getState) => {
        axios.get(URL_TEXT+"autheticate_webinar_user/", {params: userprofiledata})
        .then(function(data) {
            return data.data;
        }).then(function(data) {
            console.log("LiveBroadcast::action::authenticateUser", data)
            let tempdata;
            if(data.status === 'failed') {
                tempdata = data
            } else {
                tempdata = {token:data.token, event_details:data.data, event_config:data.config}
            }
            dispatch({type: "WEBINARTOKEN", data: tempdata})
        })
        .catch(function(error) {
            console.error("LiveBroadcast::action::authenticateUser", error);
        });
    }
}


// '/getjoinedparticipants/'
export var syncEventJoinedParticipants = (eventdata) => {
    //console.log("LiveBroadcast::action::syncEventConversation", eventdata);
    return (dispatch, getState) => {
        axios.get(URL_TEXT+"getjoinedparticipants/", {params: eventdata})
        .then(function(data) {
            //console.log("LiveBroadcast::action::syncEventJoinedParticipants", data)
            return data.data;
        })
        .then(function(data) {
            //console.log("LiveBroadcast::action::syncEventJoinedParticipants", data)
            dispatch({type: "WEBINARPARTICIPANTS", data: data})
        })
        .catch(function(error) {
            //console.log("LiveBroadcast::action::syncEventJoinedParticipants",error);
        });
    }
}

// '/updateparticipants/'
export var add_participants_to_ongoing_events = (eventdata) => {
    //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", eventdata);
    return (dispatch, getState) => {
        axios.post(URL_TEXT+"updateparticipants/", eventdata)
        .then(function(data) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", data)
            return data.data;
        })
        .then(function(data) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", data)
            dispatch({type: "WEBINARPARTICIPANT_SELF", data: data})
        })
        .catch(function(error) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events",error);
        });
    }
}


export var update_participats_details_of_ongoing_events = (eventdata) => {
    return (dispatch, getState) => {
        axios.post(URL_TEXT+"update_user_details_ongoing_events/", eventdata)
        .then(function(data) {
            //console.log("update_participats_details_of_ongoing_events", data)
            return data.data;
        })
        .then(function(data) {
            console.log("update_participats_details_of_ongoing_events", data)
            // dispatch({type: "WEBINARPARTICIPANT_SELF", data: data})
        })
        .catch(function(error) {
            console.log("update_participats_details_of_ongoing_events", error);
        });
    }
}


export var syncEventConversation = (eventdata) => {
    //console.log("LiveBroadcast::action::syncEventConversation", eventdata);
    return (dispatch, getState) => {
        axios.get(URL_TEXT+"getallconversation/", {params: eventdata})
        .then(function(data) {
            //console.log("LiveBroadcast::action::syncEventConversation", data)
            return data.data;
        })
        .then(function(data) {
            //console.log("LiveBroadcast::action::syncEventConversation", data)
            dispatch({type: "WEBINARCHAT", data: data})
        })
        .catch(function(error) {
            //console.log("LiveBroadcast::action::syncEventConversation",error);
        });
    }
}

export var getAllQuestionsOfEvent = (eventdata) => {
    //console.log("LiveBroadcast::action::getAllQuestionsOfEvent:dispatched", eventdata);
    return (dispatch, getState) => {
        axios.get(URL_TEXT+"getAllAskedQuestions/", {params: eventdata})
        .then(function(data) {
            //console.log("LiveBroadcast::action::getAllQuestionsOfEvent", data)
            return data.data;
            
        })
        .then(function(data) {
            //console.log("LiveBroadcast::action::getAllQuestionsOfEvent", data)
            dispatch({type: "WEBINARQUERIES", data: data})
        })
        .catch(function(error) {
            //console.log("LiveBroadcast::action::getAllQuestionsOfEvent",error);
        });
    }
}




export var addReceivedMessage= (message) => {
    return (dispatch, getState) => {
        dispatch({type: "WEBINARCHAT", data: message})
    }
}

export var addEventParticipants = (parsedMessage) => {
    return (dispatch, getState) => {
        dispatch({type: "WEBINARPARTICIPANT_SOCKET", data: parsedMessage.addeduser})
    }
}



export var getEventInfo = (event_id) => {
    return (dispatch, getState) => {
      axios
        .get(URL_TEXT + "getEventInfo/", {
          params : {
            event_id : event_id
          }
        })
        .then(function(data) {
        //   console.log("getEventInfo:", data.data);
          // dispatch(tasks('name', data));
          return data.data;
        })
        .then(function(data) {
            //console.log("upcominguserservicedataserver", data);
          //  let eventData  = setEventDataStateUser(data);
           dispatch({ type: "WEBINARINFO", data: data});
        })
        .catch(function(err) {
          console.log("Error occurred while Fetching Webinar data", err);
        });
    };
  };

  

export var getEventInfoAccess = (event_id) => {
    return (dispatch, getState) => {
      axios
        .get(URL_TEXT + "getEventInfoAccess/", {
          params : {
            event_id : event_id
          }
        })
        .then(function(data) {
            //   console.log("getEventInfoAccess:", data.data);
            // dispatch(tasks('name', data));
          return data.data;
        })
        .then(function(data) {
            //console.log("upcominguserservicedataserver", data);
          //  let eventData  = setEventDataStateUser(data);
           dispatch({ type: "WEBINARINFOACCESS", data: data});
        })
        .catch(function(err) {
          console.log("Error occurred while Fetching Webinar data", err);
        });
    };
};

  
export var addReactionToEvent = (eventId, reaction) => {
    //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", eventdata);
    return (dispatch, getState) => {
        axios.get(URL_TEXT+"addReaction/", {
			params:{
                eventid : eventId,
                reaction: reaction
			}
		})
        .then(function(data) {
            // console.log("addReactionToEvent:: action :: data", data)
            return data.data;
        })
        .then(function(data) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", data)
            dispatch({type: "WEBINARINSTANTREACTION", data: data})
        })
        .catch(function(error) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events",error);
        });
    }
}


export var getReactionsEvent = (eventId) => {
    //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", eventdata);
    return (dispatch, getState) => {
        axios.get(URL_TEXT+"getReactions/", {
			params:{
                eventid : eventId
			}
		})
        .then(function(data) {
            // console.log("getReactionsEvent:: action :: data", data)
            return data.data;
        })
        .then(function(data) {
            // console.log("getReactionsEvent:: data", data)
            dispatch({type: "WEBINARINSTANTREACTION", data: data})
        })
        .catch(function(error) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events",error);
        });
    }
}


export var addRtcInfoToEvent =(eventId, info) => {
    //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", eventdata);
    return (dispatch, getState) => {
        axios.post(URL_TEXT+"addParticipantRTCInfo/", {
                eventid : eventId,
                info: info
		})
        .then(function(data) {
            // console.log("addRtcInfoToEvent:: action :: data", data)
            return data.data;
        })
        .then(function(data) {
        })
        .catch(function(error) {
        });
    }
}


export var addQuestionsToEvent =(eventId, question) => {
    //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", eventdata);
    return (dispatch, getState) => {
        return axios.post(URL_TEXT+"addQuestion/", {
                eventid : eventId,
                question: question
		})
        .then(function(data) {
            // console.log("addQuestionsToEvent:: action :: data", data)
            return data.data;
        })
        .catch(function(error) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events",error);
        });
    }
}


export var getQuestionsEvent = (eventId) => {
    //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", eventdata);
    return (dispatch, getState) => {
        axios.get(URL_TEXT+"getQuestions/", {
			params:{
                eventid : eventId
			}
		})
        .then(function(data) {
            // console.log("getQuestionsEvent:: action :: data", data)
            return data.data;
        })
        .then(function(data) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", data)
            dispatch({type: "WEBINARQUESTIONS", data: data})
        })
        .catch(function(error) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events",error);
        });
    }
}


export var setQuestionStatus =(eventId,questionId) => {
    //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", eventdata);
    return (dispatch, getState) => {
        return axios.get(URL_TEXT+"setQuestionStatus/", {
			params:{
                eventId: eventId,
                questionId: questionId
			}
		})
        .then(function(data) {
            // console.log("setQuestionStatus:: action :: data", data)
            return data.data;
        })
        .then(function(data) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events", data)
            dispatch({type: "WEBINARQUESTIONS", data: data})
            return 1;
        })
        .catch(function(error) {
            //console.log("LiveBroadcast::action::add_participants_to_ongoing_events",error);
        });
    }
}