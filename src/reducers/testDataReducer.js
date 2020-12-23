let testDataReducer = function (state = [], action) {
	switch (action.type) {
		case 'testList':
			return Object.assign({}, state, { testListState: action.data });
		case 'testDetail':
			return Object.assign({}, state, { testDetailState: action.data });
		case 'testPreviewDetail':
			return Object.assign({}, state, { testPreviewDetailState: action.data });
		case 'testEnrollmentDetail':
			return Object.assign({}, state, { testEnrollmentDetailState: action.data });
		case 'ifAlreadyEnrolledForTestDetail':
			return Object.assign({}, state, { ifAlreadyEnrolledForTestDetailState: action.data });
		case 'analysisUsersAllAttemptsOnTest':
			return Object.assign({}, state, { analysisUserAllAttemptsState: action.data }); 
		default: return state;
	}
};

export default testDataReducer;
