import React,{Component} from 'react';
import 'redux';
import {connect} from 'react-redux'
// import Slider from 'react-slick';
import { getMentorDetails } from './action';
import { Col, Row, Grid } from 'react-bootstrap';
import CalendarEventList from '../presentationalcomponents/CalendarEventList';
import {getScheduledEventsOfUser} from '../../user_servicepage/conditionalcomponents/action'


class MyCalendarController extends Component {

    componentDidMount(){
        //console.log("Dispatching action to fetch user upcoming events",this.props.profileId)
        this.props.dispatch(getScheduledEventsOfUser(this.props.profileId))
    }

    render(){
        // console.log("MyCalendarController::props", this.props)
        //console.log("MyCalendarController::Upcoming Events Data", this.props.upcomingEventData)
        let applications
        let mySessions
        if(this.props.upcomingEventData){
            //console.log("Upcoming Applications Data", this.props.upcomingEventData["Applications"])
            // console.log("My Sessions Data", this.props.upcomingEventData["MySessions"])
            applications = this.props.upcomingEventData["Applications"]
            mySessions = this.props.upcomingEventData["MySessions"]
        }

    return(
        <Col xs={12}>
            <CalendarEventList eventDetails = {applications} 
                                mySessions = {mySessions}
                                profileId = {this.props.profileId}
                                userProfileFields={this.props.userProfileFields}
                                otherUserProfileFields={this.props.profileFields}
                                isReadOnly={this.props.isReadOnly}/>
        </Col>
    )

}

}

var mapStateToProps = (store) => {
    //console.log(store);
    return {upcomingEventData : store.userServicePageReducer.upcomingEventDataOfUser,
            userProfileFields : store.userProfileReducer.profileFields};
}

export default  connect(mapStateToProps)(MyCalendarController);