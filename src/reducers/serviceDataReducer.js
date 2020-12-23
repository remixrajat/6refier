let serviceDataReducer = function(state =[], action){
    switch(action.type) {			
        case 'setServiceCounterData': 
            return Object.assign({},state,{serviceCounterDataState : action.data});
            
        case 'setEventTrackerState': 
            return Object.assign({},state,{eventsTrackerState : action.data});
            
        case 'getApplicationsReceived': 
            return Object.assign({},state,{applicationsReceivedState : action.data});

        case 'studenttreeStructure': 
            return Object.assign({},state,{studentTreeStructureState : action.data});

        case 'teachertreeStructure': 
            return Object.assign({},state,{teacherTreeStructureState : action.data});
            
        case 'setCommunitySessionsState':
            return Object.assign({}, state, { communitySessionsState: action.data });
            
        case 'getCommunityPackagesAsOwner':
            return Object.assign({}, state, { communityPackagesAsOwner: action.data });
        
        case 'getAttendeeDetailsForSession':
            return Object.assign({}, state, { getAttendeeDetailsForSession: action.data });
        
        default: return state;
    }
}

export default serviceDataReducer;
