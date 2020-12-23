let schoolReducer = function(state =[], action){
    switch(action.type){
        case "setSchoolName":
     	    return Object.assign({},state,action.data);
     
        case "setMoreClass":
            return Object.assign({},state,action.data);
        
   
        default: return state;
    }
}

export default schoolReducer