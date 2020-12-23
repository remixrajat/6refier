import React, { Component } from 'react'
import 'redux'
import {connect} from 'react-redux'
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import CommunitySessionCardForList from './CommunitySessionCardForList';

class CommunitySessionList extends Component {

    render() {
        // console.log("CommunitySessionList :: props : ", this.props)

        let sessions = []
        let owners_community = []
        let owners_community_ids = []
        let eventList = []
        let slickSliderElement
        if (this.props.communityListState) {
            for (let i = 0; i < this.props.communityListState.length; i++){
                if (this.props.communityListState[i].is_owner) {
                    owners_community.push(this.props.communityListState[i])
                    owners_community_ids.push(this.props.communityListState[i].pk)
                }
            }
        }

        let keys = ["Apply For Sessions","Pending Applications","Upcoming Sessions"]
        // console.log("CommunitySessionList :: owners_community : ", owners_community)

        if (this.props.events) {
            for (let key in this.props.events) {
                if (keys.indexOf(key) == -1) {
                    continue
                }
                for (let i = 0; i < this.props.events[key].length; i++){
                    let community_session_mapping =
                        JSON.parse(this.props.events[key][i].fields.session_id.mapping)
                    // console.log("CommunitySessionList :: community_session_mapping : ", community_session_mapping)
                    for (let j = 0; j < community_session_mapping.length > 0; j++){
                        for (let k = 0; k < community_session_mapping[j].length > 0; k++) {
                            let community =
                                JSON.parse(community_session_mapping[j][k].fields.school_community_id)
                            // console.log("CommunitySessionList :: community : ", community)
                            if (community.length > 0) {
                                let indexOfCommunity = owners_community_ids.indexOf(community[0].pk)
                                if(indexOfCommunity!=-1){
                                    sessions.push(this.props.events[key][i])
                                    eventList.push(
                                        <div key={i+""+j+""+k+key} style={{padding:"10px"}}>
                                            <CommunitySessionCardForList
                                                index={i}
                                                eventDetail={this.props.events[key][i].fields.session_id}
                                                accepted_applications_count={this.props.events[key][i].fields.accepted_applications_count}
                                                count_of_participants={this.props.events[key][i].fields.count_of_participants}
                                                pk={this.props.events[key][i].pk}
                                                owners_community={owners_community[indexOfCommunity]}
                                            />
                                        </div>)
                                }

                                    var settings = {
                                        speed: 500,
                                        slidesToShow: 2,
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
                                                slidesToShow:2
                                            }
                                        }
                                        ]
                                    };
                            
                                    if(eventList.length > 0){
                                        slickSliderElement = <Slider {...settings}>{eventList}</Slider>
                                    }
                            }
                        }
                    }
                }   
            }
        }

        // console.log("CommunitySessionList :: sessions : ", sessions)

        return (
            <div>
            {eventList.length>0 ?
            <div
                style={{ marginTop: "30px" }}
            >
                <div id="section-subtitle">
                    Sessions in your Community
                </div>
                <div
                style={{ margin: "20px", marginTop:"5px" }}
            >
                    {slickSliderElement}
                    </div>
                </div >
                :
                null
                }
                </div>
        )
    }
}

var mapStateToProps = (store) => {
    // console.log(store);
    return {
        events: store.userServicePageReducer.upcomingEventData,
        communityListState: store.appDataReducer.communityListStateMemberOnly,
       
    };
}   

export default  connect(mapStateToProps)(CommunitySessionList);