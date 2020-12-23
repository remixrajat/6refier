import axios from 'axios';
import { URL_TEXT, getCSRFHeader} from '../../GlobalConstants'

export var getPaymentHashValues = (formValues) => {
    //console.log("formValues" , formValues)
    return (dispatch, getState) => {
        return axios.post(URL_TEXT + 'getPaymentHashValues/', formValues)
            .then(function (response) {
                //console.log("******Response from server:", response);
                return response.data;
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
}

export var createAndGetPaymentOrderId = () => {
    //console.log("formValues" , formValues)
    return (dispatch, getState) => {
        return axios.post(URL_TEXT + 'createPaymentOrder/')
            .then(function (response) {
                //console.log("******Response from server:", response);
                return response.data;
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
}



export var sendPaymentResponse = (formValues) => {
    // console.log("******sendPaymentResponse:", formValues);
    return (dispatch, getState) => {
        return axios.post(URL_TEXT + "verifyPayment/", formValues)
            .then(function (response) {
                //console.log("******Response from server:", response);
                return response.data;
            }).then(function (data) {
                // console.log("******Response from server:sendPaymentResponse::", data);
                dispatch(getCartItems(formValues))
                return data
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
}

export var sendFailurePaymentResponse = (formValues) => {
    // console.log("******sendFailurePaymentResponse:", formValues);
    return (dispatch, getState) => {
        return axios.post(URL_TEXT + "paymentFailure/", formValues)
            .then(function (response) {
                return response.data;
            }).then(function(data){
                // console.log("******Response from server:sendFailurePaymentResponse::", data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
}


export var addToCart = (formValues) => {
    // console.log("addToCart::",formValues);
    return (dispatch, getState) => {
        return axios.post(URL_TEXT + 'addToPurchaseCart/', formValues)
            .then((response) =>{
                return response.data;
            })
            .then((data)=>{
                dispatch({type:'UPDATE_CART', data: data})
                return data;
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
}

export var getCartItems = (formValues) => {
    let config = getCSRFHeader();
    // console.log("ADD_TO_CART:: ");
    return (dispatch, getState) => {
        return axios.get(URL_TEXT + 'getPurchaseCart/')
            .then((response) =>{
                return response.data;
            })
            .then((data)=>{
                // console.log("ADD_TO_CART:: ", data);
                dispatch({type:'ADD_TO_CART', data:data})
                return data;
            })
            .catch(function (error) {
                // console.log("ADD_TO_CART:: ", error);
                // console.log(error);
            });
    }
}

export var removeCartItem = (formValues, length) => {
    return (dispatch, getState) => {
        return axios.post(URL_TEXT + 'removeFromPurchaseCart/', formValues)
            .then((response) =>{
                return response.data;
            })
            .then((data)=>{
                // console.log("removeCartItem:: ", data);
                if(data[0] <= 0){
                    throw "Error in removing from cart";
                    return
                }else{
                    let val=1;
                    if(Array.isArray(formValues.item)){
                        val = formValues.item.length
                    }else{
                        formValues.item = [formValues.item]
                    }
                    if(data[0] !== val){
                        throw "Error in removing from cart";
                        return
                    }
                }
                dispatch({type:'REMOVE_FROM_CART', data:formValues.item})
                return data;
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
}

