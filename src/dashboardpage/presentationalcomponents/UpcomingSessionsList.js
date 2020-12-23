import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import UpcomingEventCardForList from './UpcomingEventCardForList';
import EventApplicationForm from '../../user_servicepage/presentationcomponents/EventApplicationForm'
import { insertUserApplication } from "../../user_servicepage/conditionalcomponents/action";

import { PrimaryWhiteButton } from '../../shared/RefierComponents/PrimaryWhiteButton'
import Preloader from '../../shared/Preloader/PreLoader'
import CommonModal from '../../shared/CommonModal'
import { isXsDevice, isMobileDevice } from '../../GlobalConstants'


export default class UpcomingSessionsList extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            showModal: false,
            appTextStatus : "Hi, I am interested for this event !",
            eventId : "",
            inProgress: -1,
        };

        this.openApplyModal = this.openApplyModal.bind(this)
        this.closeApplyModal = this.closeApplyModal.bind(this)
        this.changeApplicationText = this.changeApplicationText.bind(this)
        this.submitApplicationText = this.submitApplicationText.bind(this)
        this.setInProgress = this.setInProgress.bind(this)
        this.unsetInProgress = this.unsetInProgress.bind(this)
        this.completedProgress = this.completedProgress.bind(this)
    }

    openApplyModal(eventId) {
        this.setState({ 
            eventId,
            showModal: true
        })
    }

    closeApplyModal() {
        this.setState({ showModal: false })
    }

    changeApplicationText(e){
        this.setState({ appTextStatus : e.target.value })
    }

    submitApplicationText(){
        this.setInProgress()
        let applicationText = this.state.appTextStatus;
        // console.log("Sending Request",this.state.eventId,applicationText)
        let returnPromise = this.props.dispatch(insertUserApplication(this.state.eventId,applicationText))
        returnPromise.then((response) => {
            // let eventData = setEventDataStateUser(data);
            this.completedProgress()
            this.props.dispatch({ type: "setUpcomingEvent", data: response});
            this.closeApplyModal()
            this.unsetInProgress()
        })
    }

    setInProgress(){
        this.setState({inProgress:0})
    }

    unsetInProgress(){
        this.setState({inProgress:-1})
    }

    completedProgress(){
        this.setState({inProgress:1})
    }

    render() {
        // console.log("UpcomingSessionsList:Props", this.props)

        let key = "Apply For Sessions"
        let eventList, slickSliderElement;
        if (this.props.events) {
            if (this.props.events[key]) {
                // console.log("UpcomingSessionsList:this.props.events[key]", this.props.events[key])
                eventList = []
                for (let i = 0; i < this.props.events[key].length; i++) {
                    if (this.props.events[key][i].fields.session_id.mentor_id.id !=
                        this.props.userId) {
                        eventList.push(
                            <div key={i} style={{padding:"10px"}}>
                                <UpcomingEventCardForList
                                index={i}
                                eventDetail={this.props.events[key][i].fields.session_id}
                                accepted_applications_count={this.props.events[key][i].fields.accepted_applications_count}
                                count_of_participants={this.props.events[key][i].fields.count_of_participants}
                                pk={this.props.events[key][i].pk}
                                profileId={this.props.userId} 
                                openApplyModal={this.openApplyModal} />
                            </div>)
                    }
                }
                    
                var settings = {
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows : true,
                    infinite:false,
                    responsive :[{
                        breakpoint:480,
                        settings :{
                            slidesToShow : 1
                        }
                    },
                    {
                        breakpoint:768,
                        settings:{
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint:1200,
                        settings:{
                            slidesToShow: 3
                        }
                    }
                    ]
                };
        
                if(eventList.length > 0) {
                    slickSliderElement = <Slider {...settings}>{eventList}</Slider>
                }
            }
        }

        let modalBodyState = <EventApplicationForm 
                                onChange = {this.changeApplicationText}
                                appTextStatus={this.state.appTextStatus} 
                                submitApplicationText = {this.submitApplicationText}
                                inProgress = {this.state.inProgress}/>
        //console.log("UpcomingSessionsList :: eventList", eventList)

        return (
            <div style={{backgroundColor:"white"}}>
                {/* <Row
                    className="custom-tab-title">Upcoming Sessions</Row> */}
                {!eventList ?
                    <div style={{ "textAlign": "center", marginTop: "30px" }}>
                        <Preloader />
                    </div>
                    :
                    eventList.length == 0 ?
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                            <div className="custom-list-content">Sorry, There are no recommended Sessions</div>
                            <div style={{textAlign:"center"}}>
                                <PrimaryWhiteButton 
                                    buttonText="Explore Sessions"
                                    redirect="true"
                                    redirectAddress={"/userDashboard/user_service"}
                                />
                            </div>
                        </div>
                        :
                            this.props.recommendationTab ? 
                            <Grid fluid>
                                <div>
                                    {slickSliderElement}
                                </div>
                                <div style={{textAlign:"center"}}>
                                    <Link
                                        style={{padding:6}}
                                        to={"/userDashboard/user_service"}>
                                        <span className="refier_custom_button_answer">
                                            Explore More
                                        </span>
                                    </Link>
                                </div>
                                <CommonModal
                                    showModal={this.state.showModal}
                                    close={this.closeApplyModal}
                                    modalHeading={"Apply for an Event or Session"}
                                    modalBody={modalBodyState} />
                            </Grid> : 
                            <div>{eventList}</div>
                }
            </div>
        )

    }
}
