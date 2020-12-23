import React, { Component } from 'react';
import 'redux'
import {connect} from 'react-redux'

import AppNotificationPanel from '../presentationalcomponents/AppNotification.js';
import {getAllNotifications, markAllNotifications} from './notifications_action.js'
import { DEV_ENV_FRONTEND } from '../../../GlobalConstants';


class NotificationController extends Component {
    constructor(props) {
        super(props);

        if(DEV_ENV_FRONTEND) {
            this.notificationUpdateTimeInterval = 5000000;
        } else {  
            this.notificationUpdateTimeInterval = 300000;
        }
        
        this.state={flag:'1'}
        this._getAllNotifications = this._getAllNotifications.bind(this);
    }
    
    componentDidMount() {
        //console.log("NotificationController::componentDidMount");
        window.setInterval(this._getAllNotifications.bind(this), this.notificationUpdateTimeInterval );
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.notificationDetails.notifications && 
            nextProps.notificationDetails.notifications.length > 0) {
            //console.log("setNotificationListState::componentWillReceiveProps" ,nextProps.notificationDetails.notifications.length ,nextProps.notificationDetails.notifications[0]  )
            this.setState({flag:nextProps.notificationDetails.notifications[0].id});
        } else {
            //console.log("setNotificationListState::componentWillReceiveProps" ,nextProps.notificationDetails);
        }
        
    }

    _getAllNotifications() {
        this.props.dispatch(getAllNotifications(this.state.flag));
    }

    markAllNotificationsRead() {
        this.props.dispatch(markAllNotifications("read"));
    }
    

    render() {
        return (
            <AppNotificationPanel 
                issmallscreen={ this.props.issmallscreen } 
                popupData={ this.props.notificationDetails }
                markAllNotificationsRead = {this.markAllNotificationsRead.bind(this)}
            />
        );
    }
}

var mapStateToProps = (store) => {
    return {notificationDetails : store.appDataReducer.notificationsList};
}

export default  connect(mapStateToProps)(NotificationController);