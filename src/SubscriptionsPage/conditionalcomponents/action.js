import axios from "axios";
import { URL_TEXT } from '../../GlobalConstants'

export var getPackageList = () => {
    return (dispatch, getState) => {
      axios.get(URL_TEXT + "getPackageListUser")
        .then(function (data) {
          // console.log("PackageDetailsResponse:", data.data);
          return data.data;
        })
        .then(function (data) {
          // console.log("******Response from server for package details: ", data);
          dispatch({ type: "subscriptionPackages", data: data });
        })
        .catch(function (err) {
          //console.log("Error occurred while Fetching data", err);
        });
    }
  }

  export var purchase_service = (product_id, product_type) => {
    return (dispatch, getState) => {
      return axios.get(URL_TEXT + "purchase_service", {
            params: {
                product_id: product_id,
                product_type: product_type
            }
          })
        .then(function (data) {
          // console.log("PurchaseServiceResponse:", data.data);
          return data.data;
        })
        .then(function (data) {
          // console.log("******Response from server for Purchasing Service:", data);
        //   dispatch({ type: "testPreviewDetail", data: data });
          return data
        })
        .catch(function (err) {
          // console.log("Error occurred while Fetching data", err);
        });
    }
  }