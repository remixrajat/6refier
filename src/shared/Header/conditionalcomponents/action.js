import axios from 'axios';
import {URL_TEXT} from '../../../GlobalConstants'


var tasks = (datatype, data = "") => {
    switch (datatype) {
        case 'name':
            return { type: 'loadinitially', data: data };
        default:
            return { type: 'default' };
    }

}

export var getCommunityList = () =>{
    return (dispatch, getState) => {
        return axios.get(URL_TEXT + "fetchCommunityList/")
            .then(function (data) {
                //console.log("******Respponse from server:", data);
                // dispatch(tasks('name', data));
                return  data.data;
            }).then(function (data) {
                //console.log("communityList", data);
                dispatch({type : 'setCommunityListState' , data : data})
                return data;
            })
            .catch(function (err) {
                //console.log("Error occurred while Fetching data",err);
            });
    }
}

export var getCommunityListMemberOnly = () =>{
    return (dispatch, getState) => {
        axios.get(URL_TEXT + "fetchCommunityList/",{
            params : {
                member_only : true
            }
        })
            .then(function (data) {
                //console.log("******Respponse from server:", data);
                // dispatch(tasks('name', data));
                return  data.data;
            }).then(function (data) {
                //console.log("communityListmemberonly", data);
                dispatch({type : 'setCommunityListStateMemberOnly' , data : data})
            })
            .catch(function (err) {
                //console.log("Error occurred while Fetching data",err);
            });
    }
}


export var getCommunityListMemberOnlyOfUser = (profileUserId) =>{
    return (dispatch, getState) => {
        axios.get(URL_TEXT + "fetchCommunityListOfUser/",{
            params : {
                member_only : true,
                profileuserid : profileUserId
            }
        })
            .then(function (data) {
                //console.log("******Respponse from server:", data);
                // dispatch(tasks('name', data));
                return  data.data;
            }).then(function (data) {
                //console.log("communityListmemberonlyOfUser", data);
                dispatch({type : 'setCommunityListStateMemberOnlyOfUser' , data : data})
            })
            .catch(function (err) {
                //console.log("Error occurred while Fetching data",err);
            });
}
}

export let fetchQueries = query_string => {
    return (dispatch) => {
        axios.get(URL_TEXT + "search/autocomplete/", {
        // axios.get("data/queryResult.json", {
            params: {
                query_string,
                model_parameter: "global_search"
            }
        })
            .then((data) => {
                // console.log("Query::data", data);
                return data.data
            })
            .then((data) => {
                // console.log("fetchQueries:: data", data);
                dispatch({ type: "DO_QUERY", payload: data });
            })
    }
}

export var getUserProfileAfterLoginDataForDev = () =>{
    return (dispatch, getState) => {
        axios.get(URL_TEXT +"userDashboard_dev/",{
            params:{
                user_id : "8bfac2532cc94e7c971bc09b9d7a7d80"
            }
        })
            .then(function (data) {
                //console.log("userdashboardDevdata:", data);
                // dispatch(tasks('name', data));
                return  data.data;
            }).then(function (data) {
                //console.log("userdashboardDevdata2:", data);
                let profileDataJson = data.profileData;
                dispatch(
                    {type : "SET_USER_STATE" , data : profileDataJson}
                    );

            })
            .catch(function (err) {
                //console.log("Error occurred while Fetching data",err);
            });
    }
}

export var isNewUserExplainComplete = () => {
    return (dispatch, getState) => {
        axios.get(URL_TEXT +"isNewUserExplainComplete/")
        .then((data) => {
            //console.log("isNewUserExplainComplete:", data);
            return  data.data;
        }).then((data) => {
            // console.log("isNewUserExplainComplete:", data);
            dispatch({type: 'isNewUserExplainComplete' , data: data});
        })
        .catch((err) => {
            //console.log("Error occurred while Fetching data",err);
        });
    }
}

export var changeCartModalState = (flag)=>{
    return (dispatch, getState) =>{
        dispatch({type:'CART_MODAL_STATUS',data:{ isCartModalOpen : flag}})
    }
}

export var newUserExplainCompleted = () => {
    return (dispatch, getState) => {
        axios.get(URL_TEXT +"newUserExplainCompleted/")
        .then((data) => {
            //console.log("isNewUserExplainComplete:", data);
            return  data.data;
        }).then((data) => {
            // console.log("isNewUserExplainComplete:", data);
            dispatch({type: 'isNewUserExplainComplete' , data: data});
        })
        .catch((err) => {
            //console.log("Error occurred while Fetching data",err);
        });
    }
}


export var getApplicationConfig = () => {
    return (dispatch, getState) => {
        axios.get(URL_TEXT +"applicationConfig/")
        .then((data) => {
            console.log("Application Config",data);
            return  data.data;
        }).then((data) => {
            console.log("Application Config",data);
            dispatch({type: 'APPLICATION_CONFIG' , data: data});
        })
        .catch((err) => {
            console.log("Error occurred while Fetching Application Config",err);
        });
    }
}