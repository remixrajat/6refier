import axios from 'axios';
import { URL_TEXT, getCSRFHeader } from '../../GlobalConstants'

export var submitDocumentViewStat = (formdata)=>{
	let config = getCSRFHeader();
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + 'submitDocumentViewStat/', formdata,config)
			.then(function (response) {
				return response.data;
			}).then(function (data) {
				// dispatch({type:"requestToAccessContent", data : data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

