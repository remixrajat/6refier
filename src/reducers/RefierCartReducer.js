let refierCartReducer = (state=[], action) => {
	switch(action.type){
        case "CART_MODAL_STATUS":
            return Object.assign({},state, action.data)
        case "UPDATE_CART":
            let item = action.data
            if(state.hasOwnProperty('cartItems')){
                item = state.cartItems.concat( action.data)
            }
            return Object.assign({}, state, {cartItems : item});
        case "ADD_TO_CART":
            let additem = action.data
            return Object.assign({}, state, {cartItems : additem});
        case "REMOVE_FROM_CART":
            console.log("REMOVE_FROM_CART ::", action.data);
            let finalCartItem = []
            state.cartItems.map((product, idx)=>{
                if(action.data.indexOf(product.pk) === -1){
                    finalCartItem.push(product);
                }
            });
            // console.log("REMOVE_FROM_CART ::",finalCartItem);
            return Object.assign({}, state, {cartItems : finalCartItem});
		default: return state
	}
}

export default refierCartReducer;