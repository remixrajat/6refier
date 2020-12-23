let courseDataReducer = function (state = [], action) {
	switch (action.type) {
		case 'getRunningCourseDetails':
			return Object.assign({}, state, { runningCourseDetails: action.data });
			
		case 'COURSEINFO':
			return Object.assign({}, state, {courseInfo: action.data});

		case 'COURSEINFOACCESS':
			return Object.assign({}, state, {courseInfoAccess: action.data});
			
		default: return state;
	}
};

export default courseDataReducer;