let appStatusMessageReducer = (state=[], action) => {
    switch(action.type){
        case 'appendedMessage':
            let temp = [];
            if (this.state.statusMessage )  {
                temp = temp.concat(this.state.statusMessage)
            }
            temp = temp.concat(action.data);
            return Object.assign({},state,{statusMessage :temp});
        case 'statusMessage':
            return Object.assign({},state,{statusMessage : action.data});
        case 'passwordChangeStatus':
            return Object.assign({},state,{passwordChangeStatus : action.data});

        default: return state;
    
    }
}

export default appStatusMessageReducer;