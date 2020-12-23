import axios from "axios";
import { URL_TEXT } from '../../GlobalConstants'

export var getTestList = () => {
    return (dispatch, getState) => {
      axios
        .get(URL_TEXT + "getTestsList")
        .then(function (data) {
          // console.log("TestDetailsResponse:", data.data);
          return data.data;
        })
        .then(function (data) {
          // console.log("******Response from server for test details: ", data);
          dispatch({ type: "testList", data: data });
        })
        .catch(function (err) {
          //console.log("Error occurred while Fetching data", err);
        });
    }
  }

  export var getTestDetailsId = (testId) => {
    return (dispatch, getState) => {
      return axios
        .get(URL_TEXT + "getTestDetailsId", {
            params: {
              test_id: testId,
            }
          })
        .then(function (data) {
          // console.log("TestDetailsOfIdResponse:", data.data);
          return data.data;
        })
        // .then(function (data) {
        //   console.log("******Response from server for test details for id: ", data);
        //   dispatch({ type: "testDetail", data: data });
        // })
        .catch(function (err) {
          //console.log("Error occurred while Fetching data", err);
        });
    }
  }

  
  
  export var getTestPreviewDetailsId = (testId) => {
    return (dispatch, getState) => {
      axios
        .get(URL_TEXT + "getTestPreviewDetailsId", {
            params: {
              test_id: testId,
            }
          })
        .then(function (data) {
          // console.log("TestPreviewDetailsOfIdResponse:", data.data);
          return data.data;
        })
        .then(function (data) {
          // console.log("******Response from server for test preview details for id: ", data);
          dispatch({ type: "testPreviewDetail", data: data });
        })
        .catch(function (err) {
          //console.log("Error occurred while Fetching data", err);
        });
    }
  }

  
  export var enrollForTest = (testId,entity_mapping_id) => {
    return (dispatch, getState) => {
      return axios
        .get(URL_TEXT + "enrollForTest", {
            params: {
              test_id: testId,
              entity_mapping_id: entity_mapping_id
            }
          })
        .then(function (data) {
          // console.log("enrollForTestResponse:", data.data);
          return data.data;
        })
        // .then(function (data) {
        //   console.log("******Response from server for enrollForTest: ", data);
        //   dispatch({ type: "testEnrollmentDetail", data: data });
        // })
        .catch(function (err) {
          //console.log("Error occurred while Fetching data", err);
        });
    }
  }

  
  export var ifAlreadyEnrolledForTest = (testId) => {
    return (dispatch, getState) => {
      axios
        .get(URL_TEXT + "ifAlreadyEnrolledForTest", {
            params: {
              test_id: testId,
            }
          })
        .then(function (data) {
          // console.log("ifAlreadyEnrolledForTestResponse:", data.data);
          return data.data;
        })
        .then(function (data) {
          // console.log("******Response from server for ifAlreadyEnrolledForTest: ", data);
          dispatch({ type: "ifAlreadyEnrolledForTestDetail", data: data });
        })
        .catch(function (err) {
          //console.log("Error occurred while Fetching data", err);
        });
    }
  }

   
  export var submitTestAnswers = (testSessionId,answers) => {
    return (dispatch, getState) => {
      return axios
        .post(URL_TEXT + "submitTestAnswers/", {
              test_session_id: testSessionId,
              answers: answers
          })
        .then(function (data) {
          // console.log("submitTestAnswersResponse:", data.data);
          return data.data;
        })
        .catch(function (err) {
          //console.log("Error occurred while Fetching data", err);
        });
    }
  }

  
export var analysisOfTest = (testId, testSessionId) => {
    return (dispatch, getState) => {
      return axios
        .get(URL_TEXT + "analysisTest", {
            params: {
              test_id: testId,
              test_session_id: testSessionId,
            }
          })
        .then(function (data) {
          // console.log("analysisOfTestResponse:", data.data);
          return data.data;
        })
        .catch(function (err) {
          //console.log("Error occurred while Fetching data", err);
        });
    }
  }

  export var analysisUsersAllAttemptsOfTest = (testId, testSessionId) => {
    return (dispatch, getState) => {
      axios
        .get(URL_TEXT + "analysisUsersAllAttemptsOnTest", {
            params: {
              test_id: testId,
            }
          })
        .then(function (data) {
          // console.log("analysisUsersAllAttemptsOnTest:", data.data);
          return data.data;
        })
        .then(function (data) {
          // console.log("******Response from server for analysisUsersAllAttemptsOnTest: ", data);
          dispatch({ type: "analysisUsersAllAttemptsOnTest", data: data });
        })
        .catch(function (err) {
          //console.log("Error occurred while Fetching data", err);
        });
    }
  }