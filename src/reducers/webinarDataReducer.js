let webinarPageReducer = function(state =[], action){
    //console.log("LiveBroadcast::action::authenticateUser",action);
    switch(action.type){			
        case 'WEBINARTOKEN': 
            return Object.assign({}, state, action.data);
            
        case 'WEBINARCHAT':
            let tempdata = [];
            if(state.eventConversation !== undefined) {
                tempdata = state.eventConversation;
                tempdata = tempdata.concat(action.data)
            }else{
                tempdata = action.data
            }
            return Object.assign({},state,{eventConversation: tempdata});
            
        case 'WEBINARPARTICIPANTS': 
            let eventAttendeesObject = {}
            let eventAttendeesSpeakQueue = []

            for(let attendee of action.data) {
                if(attendee.user_type === 'presenter_participant' || attendee.user_type === 'presenter') {
                    let participantId = attendee.participants.id
                    eventAttendeesObject[participantId] = attendee
                }
                if(attendee.is_in_speak_queue) {
                    eventAttendeesSpeakQueue.push(attendee.participants.id)
                }
            }

            return Object.assign({}, state, {eventAttendees: action.data, eventAttendees_self: [], 
                                    eventAttendeesExtended: [], eventAttendeesObject, eventAttendeesSpeakQueue});
            
        case 'WEBINARPARTICIPANT_SELF': 
            return Object.assign({}, state, {eventAttendees_self: action.data});
            
        case 'WEBINARPARTICIPANT_SOCKET':
            let tempusers = [];
            if(state.eventAttendeesExtended !== undefined) {
                tempusers = state.eventAttendeesExtended;
                tempusers = tempusers.concat(action.data)
            } else{
                tempusers = action.data
            }
            return Object.assign({}, state, {eventAttendeesExtended: tempusers});

        case 'WEBINARQUERIES': 
            return Object.assign({}, state, {eventQueries: action.data});
        // case 'setPreviousEvent': return Object.assign({},state,{previousEventData : action.data});
        
        case 'IS_WEBVIEW':
            return Object.assign({}, state, {isWebView: action.data});
            
        case 'WEBINARINFO':
            return Object.assign({}, state, {webinarInfo: action.data});

        case 'WEBINARINFOACCESS':
            return Object.assign({}, state, { webinarInfoAccess: action.data });
        
        case 'WEBINARINSTANTREACTION':
            return Object.assign({}, state, { webinarInstantReaction: action.data });

        case 'WEBINARREACTIONS':
            tempdata = [];
            if(state.webinarReaction !== undefined){
                tempdata = state.webinarReaction;
                tempdata = tempdata.concat(action.data)
            }else{
                tempdata = action.data
            }
            return Object.assign({}, state, {webinarReaction : tempdata});
        
        case 'WEBINARQUESTIONS':
            return Object.assign({}, state, { webinarQuestion: action.data });

        case 'IS_QUESTION_ASKED':
            return Object.assign({}, state, { isQuestionAsked: action.data });

        case 'IS_CHAT_NOTIFICATION':
            return Object.assign({}, state, { isChatNotification: action.data });

        case 'NEW_CHAT_COUNT':
            return Object.assign({}, state, { newChatCount: action.data });

        case 'NEW_ASKED_QUESTION_COUNT':
            return Object.assign({}, state, { newAskedQuestionCount: action.data });
            
        case 'SESSION_UNMOUNT':
            return Object.assign({});

        case 'SWITCH_LIGHT_OFF':
            return Object.assign({}, state, { switchLightOff: action.data });
        
        default: 
            return state;
    }
}

export default webinarPageReducer;
