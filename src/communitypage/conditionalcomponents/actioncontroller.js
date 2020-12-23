import axios from 'axios';
export var getschoolComponents = () => {
return (dispatch, getState) => {
		return axios.get('data/schoolComponents.json')
			.then(function (response) {
				//console.log("******Response from server:", response);
            return  response.data;
			}).then(function (data) {
			//console.log("******Response from server: ", data);
			dispatch(setSchoolComponentsState(data));
		})
			.catch(function (error) {
				//console.log(error);
			});
	}
}
var setSchoolComponentsState = (schoolCompenentsData) => {
	return {type : 'setSchoolComponents', data : {studentActive : schoolComponentsData}}
}
