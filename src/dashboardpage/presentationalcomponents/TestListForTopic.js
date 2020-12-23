import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import TestCardForTopic from './TestCardForTopic';

import Preloader from '../../shared/Preloader/PreLoader'
import { isXsDevice, isMobileDevice } from '../../GlobalConstants'


export default class TestListForTopic extends Component {
    render() {
        //console.log("TestListForTopic:: props", this.props)

        let testList, slickSliderElement;
        if (this.props.testDetails) {
            testList = []
            for (var i = 0; i < this.props.testDetails.length; i++) {
                testList.push(
                    <div key={this.props.testDetails[i].pk}  className="custom-item-border">
                        <TestCardForTopic
                            index={i} 
                            testDetails={this.props.testDetails[i]}
                            profileId = {this.props.userId} /></div>)
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
                        slidesToShow : isXsDevice() || isMobileDevice() ? 1 : 2
                    }
                },
                {
                    breakpoint:768,
                    settings:{
                        slidesToShow:3
                    }
                }
                ]
            };
    
            if(testList.length > 0){
                slickSliderElement = <Slider {...settings}>{testList}</Slider>
            }
        }

        return (
                <div style={{backgroundColor:"white"}}>
                    {!testList ?
                        <div style={{ "textAlign": "center", marginTop: "30px" }}>
                            <Preloader />
                        </div>
                        :
                        testList.length == 0 ?
                            <div className="custom-list-content">Sorry! We have no Suggested Tests as of now.</div>
                            :
                            this.props.recommendationTab ?
                                <Grid fluid>
                                    {slickSliderElement}
                                </Grid> :
                                testList
                            }
            </div>
        )

    }
}
