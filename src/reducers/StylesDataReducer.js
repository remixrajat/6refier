let StylesDataReducer = function (state = [], action) {
	switch (action.type) {
		case 'new_user_interest_form':
            	return Object.assign({}, state, { new_user_interest_form: action.data });
		case 'app_sidebar':
            	return Object.assign({}, state, { app_sidebar: action.data });
		case 'filter_nav':
            	return Object.assign({}, state, { filter_nav: action.data });
		case 'cart_nav':
            	return Object.assign({}, state, { cart_nav: action.data });
		case 'calendar':
            	return Object.assign({}, state, { calendar: action.data });
		case 'recommendation_section':
            	return Object.assign({}, state, { recommendation_section: action.data });
        case 'highlight':
            return Object.assign({}, state, { highlight: action.data });
        case 'highlightCart':
            return Object.assign({}, state, { highlightCart: action.data });
		default: return state;
	}
};

export default StylesDataReducer;