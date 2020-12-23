import React,{Component} from 'react';
import Slider from 'react-slick';
import {Grid,Col,Row, Button } from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';

import MentorCard from '../presentationalcomponents/MentorCard.js';


export default class MentorSlider extends Component{

    render() {
        var settings = {
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows : true,
            responsive :[{
                breakpoint:480,
                settings :{
                    slidesToShow : 2
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

        let mentorList = [];
        let slickSliderElement = null;

        if(this.props.mentorDetails ) {
            for (var i = 0; i < this.props.mentorDetails.length ; i++){
                mentorList.push(
                    <Link key={i} 
                        to={"/userDashboard/profile/" + this.props.mentorDetails[i].pk}>
                        <div key = {this.props.mentorDetails[i].pk}>
                            <MentorCard mentorDetails={this.props.mentorDetails[i]} />
                        </div>
                    </Link>
                )
            } 
            if(mentorList.length > 0){
                slickSliderElement = <Slider {...settings}>{mentorList}</Slider>
            }
            else{
                slickSliderElement = <span>No mentors onboard yet</span>
            }
        }


        return (
            <div>
                <Grid fluid>
                    <br />
                    <div className="refier_custom_light_panel_title" 
                        style={{ "border" : "solid transparent 1px"}}>
                        Featured Mentors
                    </div>
                    <div className="separator" style={{textAlign: "center"}}> <span><i></i></span> </div>
                    {slickSliderElement}
                    <br />
                </Grid>
            </div>
        )  
    }
}
