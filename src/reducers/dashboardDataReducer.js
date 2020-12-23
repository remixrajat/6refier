let dashboardDataReducer = function(state =[], action){
	switch(action.type){
		case 'loadInitialState':
			return Object.assign({},state, action.data);
		case 'mentorDetailsHardcoded':
			return Object.assign({},state, { mentorList: action.data });
		case 'communityDetailsHardcoded':
			return Object.assign({},state, { communityList: action.data });
		case 'yourPostType':
			return Object.assign({},state, { yourPostType: action.data });
		case 'timeline':
			return Object.assign({},state, { timeline: action.data });
		case 'sortOrder':
			return Object.assign({},state, { sortOrder: action.data });
		default: return state;
	}
};

export default dashboardDataReducer;
