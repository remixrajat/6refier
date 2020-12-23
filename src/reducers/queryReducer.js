let QueryItemsReducer = (state=[{key: '', value: ''}], action) => {
	switch(action.type){
		case "DO_QUERY":
			return Object.assign({}, state, {queryState : action.payload})
		default: return state
	}
}

export default QueryItemsReducer