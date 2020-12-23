let appPerformanceData = function(state=[] , action){
    //console.log("addPerformanceData",state);
    //console.log("addPerformanceData", action);
    switch(action.type){
        case "addSubjectList":
            return Object.assign({},state,{subjectList: action.data})
        case "addExamList":
            return Object.assign({},state,{examList: action.data})
        case "addStudentnameList":
            return Object.assign({},state,{studentList: action.data})
        case "addClsList":
            return Object.assign({},state,{clsList: action.data})
        case "performancedata":
            return Object.assign({},state,{studentsPerfrmanceList:action.data})
        case "teacherPerformanceData":
            return Object.assign({},state,{teacherPerformanceList:action.data})
        case "memberDesignation":
            return Object.assign({},state,{memberDesignation : action.data})

        default:
            return state;
    }
}

export default appPerformanceData;