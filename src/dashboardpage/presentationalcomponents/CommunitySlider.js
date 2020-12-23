import React,{Component} from 'react';
import Slider from 'react-slick';
import {Grid,Col,Row, Button} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';

import CommunityCard from '../presentationalcomponents/CommunityCard.js';


export default class CommunitySlider extends Component{
    render(){
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

        let communityList = [];
        let slickSliderElement = null;

        if(this.props.communityDetails ){
            for (var i = 0; i < this.props.communityDetails.length ; i++){
                communityList.push(
                    <Link key={i} 
                        to={"/userDashboard/community/" + this.props.communityDetails[i].pk}>
                        <div key = {this.props.communityDetails[i].pk}>
                            <CommunityCard communityDetails={this.props.communityDetails[i]} />
                        </div>
                    </Link>)
            } 

            if(communityList.length > 0){
               slickSliderElement = <Slider {...settings}>{communityList}</Slider>
            }
            else{
                slickSliderElement = <span>No communities added yet</span>
            }
        }
    

        return(
            <div>
                <Grid fluid>
                    <div className="refier_custom_light_panel_title" 
                        style={{ "border" : "solid transparent 1px", 
                        }}>Discover Communities
                    </div>
                    <div className="separator" style={{textAlign: "center"}}> <span><i></i></span> </div>
                    {slickSliderElement}
                    <br />
                </Grid>
            </div>
        )  
    }
}
