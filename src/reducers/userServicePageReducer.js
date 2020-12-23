let userServicePageReducer = function(state =[], action){
    switch(action.type){			
        case 'setUpcomingEvent': 
            let count = 0, today = [], tomorrow = [], dayAfter = [], events = [], nextEvent = undefined;
            if(action.data['My Sessions'] && action.data['My Sessions'].length > 0) {
                events = action.data['My Sessions']
            } else if (action.data['Upcoming Sessions']) {
                events = action.data['Upcoming Sessions']
            }


            for (let event of events) {
                if(count < 5) {
                    const sessionStartDateTime = event.fields.session_id ? event.fields.session_id.start_date_time : event.fields.start_date_time
                    const startTime = new Date(sessionStartDateTime).getTime();
                    const timeCurrent = new Date(new Date().toDateString()).getTime()
                    const timeTomorrow = new Date(timeCurrent + 86400000).getTime()
                    const timeDayAfter = new Date(timeTomorrow + 86400000).getTime()
                    const timeDay3 = new Date(timeDayAfter + 86400000).getTime()
                    
                    if (startTime >= timeDayAfter && startTime < timeDay3)  {
                        dayAfter.push(event);                        
                        if(nextEvent !== 'undefined')
                            nextEvent = event
                    }
                    else if (startTime >= timeTomorrow && startTime < timeDayAfter) {
                        tomorrow.push(event);
                        if(nextEvent !== 'undefined')
                            nextEvent = event
                    } else if ( startTime >= timeCurrent && startTime < timeTomorrow){
                        today.push(event);
                        if(nextEvent !== 'undefined')
                            nextEvent = event
                    }
    
                    count++;
    
                } else {
                    break;
                }
            }

            let upcomingEvents = {
                "today": today,
                "tomorrow": tomorrow,
                "dayAfter": dayAfter
            }

            return Object.assign({},state, {
                upcomingEventData : action.data, 
                eventsToday: upcomingEvents,
                nextEvent: nextEvent
            });

        case 'setUpcomingEventOfUser': return Object.assign({},state,{upcomingEventDataOfUser : action.data});
        
        case 'setPreviousEvent': return Object.assign({},state,{previousEventData : action.data});

        case 'PACKAGE_VALIDITY_MAPPING_FOR_EVENTS':
            return Object.assign({},state,{packageValiditymappingForEvents : action.data})

        default: return state;
    }
}

export default userServicePageReducer;
