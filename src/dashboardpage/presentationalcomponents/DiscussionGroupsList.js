import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import DiscussionGroup from './DiscussionGroup';
import { isXsDevice, isMobileDevice } from '../../GlobalConstants'
import Preloader from '../../shared/Preloader/PreLoader'


export default class DiscussionGroupsList extends Component {
    render() {
        // console.log("DiscussionGroupsList:: props", this.props)

        let subscribedDiscussionRooms, slickSliderElement;
        if (this.props.subscribedDiscussionRooms) {
            subscribedDiscussionRooms = []
            for (var i = 0; i < this.props.subscribedDiscussionRooms.length; i++) {
                subscribedDiscussionRooms.push(
                    <div key={this.props.subscribedDiscussionRooms[i].pk}  
                        className="custom-item-border"
                        style={{borderBottomColor: 'transparent'}}>
                        <DiscussionGroup
                            index={i} 
                            discussionDetails={this.props.subscribedDiscussionRooms[i]}
                            dispatch={this.props.dispatch} 
                        />
                    </div>
                )
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
    
            if(subscribedDiscussionRooms.length > 0){
                slickSliderElement = <Slider {...settings}>{subscribedDiscussionRooms}</Slider>
            }
        }

        return (
                <div style={{backgroundColor:"white"}}>
                    {!subscribedDiscussionRooms ?
                        <div style={{ "textAlign": "center", marginTop: "30px" }}>
                            <Preloader />
                        </div>
                        :
                        subscribedDiscussionRooms.length == 0 ?
                        <div className="custom-list-content" style={{margin:"20px"}}>
                            Sorry! You have not joined any Discussion Groups as of now. Go to Community and Join Discussions</div>
                            :
                            this.props.recommendationTab ?
                                <Grid fluid>
                                    {slickSliderElement}
                                </Grid> :
                                subscribedDiscussionRooms
                            }
            </div>
        )

    }
}
