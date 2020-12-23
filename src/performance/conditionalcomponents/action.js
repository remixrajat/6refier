import axios from "axios";
import {URL_TEXT} from '../../GlobalConstants'

export var getDropDownValues = (formdata , type)=>{
    //console.log("getDropDownValues::")
    return (dispatch, getState)=> {
        return axios.get(URL_TEXT+'search/autocomplete/', {params : formdata})
        .then(function(response){
            //console.log("getDropDownValues::",response)
            return response.data
        })
        .then(function(data){
            //console.log("getDropDownValues::",data)
            dispatch({type:type, data:data})
        })
        .catch(function(error){
            //console.log("getDropDownValues::",error);
        });
    }
}

export var getDropDownFilterValues = (formdata , uri, type)=>{
    //console.log("getDropDownValues::")
    return (dispatch, getState)=> {
        return axios.get(URL_TEXT+uri, {params : formdata})
        .then(function(response){
            //console.log("getDropDownValues::",response)
            return response.data
        })
        .then(function(data){
            //console.log("getDropDownValues::",data)
            dispatch({type:type, data:data})
        })
        .catch(function(error){
            //console.log("getDropDownValues::",error);
        });
    }
}

export var getMemberDesignation = (communityId)=>{
    return (dispatch, getState) => {
        return axios.get(URL_TEXT+"getmemberdesignation/", {params : {communityId:communityId}})
        .then(function(response){
            //console.log("getDropDownValues::",response)
            return response.data
        })
        .then(function(data){
            //console.log("getDropDownValues::",data)
            let temp = {}
            temp[communityId] = data
            dispatch({type:"memberDesignation", data:temp})
        })
        .catch(function(error){
            //console.log("getDropDownValues::",error); 
        });
    }
}

export var getPerformanceDetails = (formdata)=>{
    console.log("performancedata::",formdata)
    return (dispatch, getState) =>{
        return axios.get(URL_TEXT+'getperformancedata/',{params:{"filterValues" : formdata}})
        .then(function(response){
            return response.data
       })
       .then(function(data){
            console.log("performancedata::",data)
            dispatch({type:"performancedata", data:data})
            return true;
       })
       .catch(function(error){
            //console.log("performancedata::",error);
            return true;
       })
    }
}

export var addOrUpdateStudentMarks = (formdata) =>{
    //console.log("addOrUpdateStudentMarks::", formdata);
    return (dispatch,getState) => {
        return axios.post(URL_TEXT+'addupdatedeleteperformancedata/',formdata)
        .then(function(response){
            return response.data
        })
        .then(function(data){
            dispatch({type:"addPerformance", data:data})
            return data
        })
        .catch(function(error,p){
            // console.log("addPerformance::",error.response.data);
            return error.response
        })
    }
}


export var getTeacherPerformance = (formdata)=>{
    //console.log("getTeacherPerformance::",formdata)
    return (dispatch, getState)=> {
        return axios.get(URL_TEXT +'getteacherperformancedata/', {params : formdata})
        .then(function(response){
            //console.log("getTeacherPerformance::1",response)
            return response.data
        })
        .then(function(data){
            //console.log("getTeacherPerformance::",data)
            dispatch({type:"teacherPerformanceData", data:data})
        })
        .catch(function(error){
            //console.log("getTeacherPerformance::",error);
        });
    }
}
