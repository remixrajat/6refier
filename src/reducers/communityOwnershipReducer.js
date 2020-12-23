let communityOwnershipReducer = function(state =[], action){
	switch(action.type){
		case 'setCommunityOwnership':
			return Object.assign({},state,action.data);
		
		default: return state;
	}
};

let communityMembershipReducer = function(state =[], action){
	switch(action.type){
		case 'setCommunityMembership':
			return Object.assign({},state,action.data);
		
		default: return state;
	}
};

let communityInternalExpertReducer = function(state =[], action){
	switch(action.type){
		case 'setCommunityInternalExpertMembership':
			return Object.assign({},state,action.data);
		
		default: return state;
	}
};

let communityExternalExpertReducer = function(state =[], action){
	switch(action.type){
		case 'setCommunityExternalExpertMembership':
			return Object.assign({},state,action.data);
		
		default: return state;
	}
};


let communityMembershipRequestReducer = function(state =[], action){
	switch(action.type){
		case 'setCommunityMembershipRequestStatus':
			return Object.assign({},state,action.data);
		
		default: return state;
	}
};
export default communityOwnershipReducer;
export {
	communityMembershipReducer, communityMembershipRequestReducer,
	communityExternalExpertReducer, communityInternalExpertReducer
};