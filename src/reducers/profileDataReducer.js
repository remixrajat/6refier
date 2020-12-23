let profileDataReducer = function(state =[], action){
	switch(action.type){
		case 'loadinitially':
			return Object.assign({},state,action.data);
		case 'setTextboxState':
			return Object.assign({},state,action.data);
		case 'setAddTextboxState':
			return Object.assign({},state,action.data);
		case 'setInstitutionTextboxState':
			return Object.assign({},state,action.data);
		case 'setDesignationTextboxState':
			return Object.assign({},state,action.data);
		case 'setYearTextboxState':
			return Object.assign({},state,action.data);
		case 'setDescriptionTextboxState':
			return Object.assign({},state,action.data);
		case 'setAddInstitutionTextState':
			return Object.assign({},state,action.data);
		case 'setAddDesignationTextState':
			return Object.assign({},state,action.data);
		case 'setAddYearTextState':
			return Object.assign({},state,action.data);
		case 'setAddDescriptionTextState':
			return Object.assign({},state,action.data);
		default: return state;
	}
};

export default profileDataReducer;