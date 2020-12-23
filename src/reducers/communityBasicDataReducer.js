let communityBasicDataReducer = function(state =[], action){
	switch(action.type){
		case 'setCommunityBasicDetailsTransientState':
			return Object.assign({},state, action.data)
		default: return state;
	}
};


export default communityBasicDataReducer;