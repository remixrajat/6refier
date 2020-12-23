let topicDataReducer = function (state = [], action) {
	switch (action.type) {
		case 'topicDetails':
			return Object.assign({}, state, { topicDetailsState: action.data });
		case 'postOfTopic':
			return Object.assign({}, state, { postOfTopicState: action.data });
		case 'sessionsOfTopic':
			return Object.assign({}, state, { sessionsOfTopicState: action.data });
		case 'mentorsOfTopic':
			return Object.assign({}, state, { mentorsOfTopicState: action.data });
		case 'communitiesOfTopic':
			return Object.assign({}, state, { communitiesOfTopicState: action.data });
		case 'contentDetailsOfTopic':
			return Object.assign({}, state, { contentOfTopicState: action.data });
		case 'testListOfTopic':
			return Object.assign({}, state, { testOfTopicState: action.data });
		case 'doesUserFollowTopic':
			return Object.assign({}, state, { isFollowTopic: action.data });
		case 'getParentTags':
			return Object.assign({}, state, { parentTags: action.data });
		case 'getUserTypes':
			return Object.assign({}, state, { userTypes: action.data });
		default: return state;
	}
};

export default topicDataReducer;
