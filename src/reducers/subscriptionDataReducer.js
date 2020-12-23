let subscriptionDataReducer = function (state = [], action) {
	switch (action.type) {
		case 'subscriptionPackages':
			return Object.assign({}, state, { subscriptionPackagesState: action.data });
		default: return state;
	}
};

export default subscriptionDataReducer;
