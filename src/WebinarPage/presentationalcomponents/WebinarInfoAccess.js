import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Media, Button } from 'react-bootstrap'

import { MEDIA_URL_TEXT, isLgDevice } from '../../GlobalConstants';
import PreLoader from '../../shared/Preloader/PreLoader';


class WebinarInfoAccess extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLargeScreen:isLgDevice()
          }
          
    }

    componentWillMount () {
        window.addEventListener("resize", this.isLgScreen.bind(this));
    }
    
    isLgScreen(){
        this.setState({isLargeScreen:isLgDevice()})
    }
    
    createEventUrl(event_url, eventid, userId) {
        let uri = "/userDashboard/" + event_url + "/" + eventid + "/" + userId;
        return uri;
    }


    render(){
        // console.log("WebinarInfoAccess :: this.props :: ", this.props)

        let body = <div style={{textAlign:"center"}}>
            <PreLoader loaderMessage="Loading Access Information" />
            </div>

        if (this.props.eventInfoAccess) {
            if (this.props.eventId === this.props.eventInfoAccess.eventId) {
                let eventAccessInfo = JSON.parse(this.props.eventInfoAccess.accessInfo)
                let communityMappings = this.props.eventInfoAccess.communityMappings ?
                    JSON.parse(this.props.eventInfoAccess.communityMappings):[]
                // console.log("Webinar Info Access :: accessInfo :: ", eventAccessInfo)
                if (eventAccessInfo['Previous Sessions'].length > 0) {
                    body =  <div style={{padding:"10px"}}>
                        Completed
                    </div>
                }
                else if (eventAccessInfo['My Sessions'].length > 0) {
                    let event = eventAccessInfo['My Sessions'][0]
                    body =
                        <Link className="btn btn-block refier_custom_button_new_selected_2"
                            to={this.createEventUrl(event.fields.event_url,
                                event.pk, this.props.userId)}
                            target="_blank">
                            Start Session</Link>
                }
                else if (eventAccessInfo['Upcoming Sessions'].length > 0) {
                    let event = eventAccessInfo['Upcoming Sessions'][0]
                    body = 
                    <Link className="btn btn-block refier_custom_button_new_selected_2"
                        to={this.createEventUrl(event.fields.session_id.event_url,
                            event.fields.session_id.session_id, this.props.userId)}
                            target="_blank">
                        {this.props.userId === event.fields.session_id.mentor_id_id ?
                            "Start Session" : "Join Session"}</Link>
                }
                else if (eventAccessInfo['Pending Applications'].length > 0) {
                    body =  <div style={{padding:"10px"}}>
                        Access Request Pending
                    </div>
                }
                else if (eventAccessInfo['Apply For Sessions'].length > 0) {
                    if (this.props.inProgress == 0) {
                        body = <div style={{ textAlign: "center" }}>
                            <PreLoader loaderMessage="Applying..." />
                        </div>
                    }
                    else if (this.props.inProgress == 1 && 
                            eventAccessInfo['Apply For Sessions'][0] && 
                            !eventAccessInfo['Apply For Sessions'][0]['fields']['auto_approval']) {
                        body = <div style={{ padding: "10px" }}>
                            Access Request Pending
                        </div>
                    } 
                    else if (this.props.inProgress == 1 &&
                            eventAccessInfo['Apply For Sessions'][0] && 
                            eventAccessInfo['Apply For Sessions'][0]['fields']['auto_approval']) {
                        let event = eventAccessInfo['Apply For Sessions'][0]
                        body = <Link className="btn btn-block refier_custom_button_new_selected_2"
                                    to={this.createEventUrl(event.fields.session_id.event_url,
                                        event.fields.session_id.session_id, this.props.userId)}
                                        target="_blank">Join Session
                                </Link>
                    }
                    else {
                        let events = eventAccessInfo['Apply For Sessions']
                        // console.log("WebinarInfoAccess :: event :: ", events)
                        // console.log("WebinarInfoAccess :: packageValiditymappingForEvents :: ",this.props.packageValiditymappingForEvents)
                        let seatsAvailableIndex = -1
                        for (let i = 0; i < events.length; i++) {
                            if (events[i].fields.accepted_applications_count < events[i].fields.count_of_participants) {
                                seatsAvailableIndex = i
                            }
                        }
                        if (seatsAvailableIndex >= 0) {
                            let schoolEventMappingId = events[0].pk;
                            let is_session_purchased = false, credits = -1, package_validity_mapping_id;
                            let packageValiditymappingForEvent = this.props.packageValiditymappingForEvents ? 
                                this.props.packageValiditymappingForEvents[schoolEventMappingId] : undefined;
                            let user_package_mapping = packageValiditymappingForEvent ? 
                                JSON.parse(packageValiditymappingForEvent.user_package_mapping) : [];
                            // console.log("WebinarInfoAccess :: packageValiditymappingForEvent :: ", packageValiditymappingForEvent)

                            if(packageValiditymappingForEvent 
                                && user_package_mapping 
                                && user_package_mapping.length > 0 ) {
                                is_session_purchased = true;
                            }

                            if(packageValiditymappingForEvent && 
                                packageValiditymappingForEvent.package_validity_mapping.length > 0 ) {
                                credits =  packageValiditymappingForEvent
                                                .package_validity_mapping[0]
                                                .fields.cost_of_package_in_credits
                                package_validity_mapping_id = packageValiditymappingForEvent
                                                                .package_validity_mapping[0]
                                                                .pk
                            }

                            // console.log("WebinarInfoAccess :: accessInfo :: ", is_session_purchased, credits, seatsAvailableIndex)
                            
                            body = <div>
                                <div style={{marginBottom: '20px'}}>
                                {is_session_purchased || credits < 0  ?
                                    <span className="btn btn-block refier_custom_button_new_selected_2" 
                                        onClick={() => this.props.openApplyModal(events[seatsAvailableIndex].pk)}>
                                        Apply for Session
                                    </span>
                                    :
                                    this.props.addToCartProgress ?
                                        <span className="btn btn-block refier_custom_button_cancel">
                                            <PreLoader />
                                        </span> :
                                        this.props.cartItemsValidityIds.includes(package_validity_mapping_id) ?
                                            <span className="btn btn-block refier_custom_button_cancel">
                                                ADDED TO CART
                                            </span> :
                                            <span className="btn btn-block refier_custom_button_new_selected_2"
                                                    onClick={()=> {
                                                        this.props.addSessionToCart(credits, package_validity_mapping_id)
                                                    }}>
                                                ADD TO CART
                                            </span>
                                }
                                </div>
                                {!is_session_purchased && credits >= 0 ? 
                                    <div style={{ padding: "10px", display: 'flex'}}>
                                        <span className="custom-list-sub-content" 
                                            style={{flex: '0.3', textAlign: 'center'}}>Cost</span> 
                                        <span style={{flex: '0.7', textAlign: 'center'}}>{credits} credits</span> 
                                    </div>
                                    : null
                                }
                                <div style={{ padding: "10px", display: 'flex' }}>
                                    <span className="custom-list-sub-content"
                                        style={{flex: '0.3', textAlign: 'center'}}>Seats</span> 
                                    <span style={{flex: '0.7', textAlign: 'center'}}> 
                                        {events[seatsAvailableIndex].fields.count_of_participants -
                                            events[seatsAvailableIndex].fields.accepted_applications_count} seats left
                                    </span>
                                </div>
                            </div>
                        }
                        else {
                            body = <div style={{ padding: "10px" }}>
                                Seats Filled</div>
                        }
                    }
                }
                else if (communityMappings.length > 0) {
                    // console.log("Webinar Info Access : communityMappings : ", communityMappings)
                    let comm_ids = []
                    let comm_names = []
                    let comm_list = []
                    for (let i = 0; i < communityMappings.length; i++){
                        if (communityMappings[i][0].fields.school_community_id) {
                            let request_status = false
                            let is_member = communityMappings[i][0].fields.is_member?true:false
                            if(!is_member){
                                request_status = communityMappings[i][0].fields.request_status
                            }

                            let community = JSON.parse(communityMappings[i][0].fields.school_community_id)
                            // console.log("Webinar Info Access : community : ", community)

                            comm_list.push(
                                <div style={{marginTop:"10px"}}>
                                    <span className="custom-list-sub-content" style={{color:"gray"}}>
                                        {community[0]["fields"]["entity_name"]}</span>
                                    {request_status ?
                                        <span className="custom-list-sub-content"
                                            style={{ marginLeft: "20px", fontStyle:"italic" }}>
                                        Request Pending</span>
                                        :
                                    <span
                                        style={{marginLeft:"20px"}}
                                        className="btn refier_custom_button_new_selected_2"
                                        onClick={() => this.props.openRequestToJoin(community)}>
                                        Join Community
                                    </span>
                                    }
                                </div>
                            )
                        }
                    }
                    body =
                        <div style={{ padding: "10px" }}>
                        <div className="custom-list-sub-content" 
                            style={{fontSize:"0.7em"}}>
                            You are not a part of Community that is hosting the Session. 
                            Please send the Community Joining Request to get access.</div>
                        {comm_list}
                                </div>
                    
                }
            }
        }

        return(
            <div>{body}</div>
        )
    }
}

export default WebinarInfoAccess;