import React, {Component} from 'react'
import {getPackageList} from './action'
import { connect } from 'react-redux';
import SubscriptionsPage from '../presentationalcomponents/SubscriptionsPage'

class SubscriptionsPageController extends Component{

    constructor(props){
        super(props)
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount(){
        this.props.dispatch(getPackageList())
    }

    refresh(){
        this.props.dispatch(getPackageList())
    }

    render(){
        // console.log("SubscriptionsPageController::subscriptionPackages",this.props)
        return(
            <SubscriptionsPage {...this.props}
                refresh={this.refresh}/>)
    }
}

let mapStateToProps = (store) => {
    // console.log("SubscriptionsPageController::store")
    return {
        subscriptionPackages: store.subscriptionDataReducer.subscriptionPackagesState,
        userCredits: store.userProfileReducer.credits
    }
}

export default connect(mapStateToProps)(SubscriptionsPageController);

