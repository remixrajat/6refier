import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserInterestForm from '../presentationalcomponents/userInterestForm'

class UserInterestFormController extends Component{
    constructor(props){
        super(props);
    }

    

    render(){
        return(
            <UserInterestForm {...this.props}/>
        );
    }
}

let mapStoreToProps = (store)=>{
    return {
        tagList : store.appDataReducer.tagsListState
    }
}

export default connect(mapStoreToProps)(UserInterestFormController)