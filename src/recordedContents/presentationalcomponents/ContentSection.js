import React, { Component } from 'react'
import { Grid, Col, Row, FormControl, Image, Button, ProgressBar} from 'react-bootstrap'
import Slider from 'react-slick';
import {Link} from 'react-router-dom'

import ContentSectionElement from './ContentSectionElement'

import { PrimaryWhiteButton } from '../../shared/RefierComponents/PrimaryWhiteButton'
import Preloader from '../../shared/Preloader/PreLoader'


export default class ContentSection extends Component{
    render() {
        // console.log("ContentSection :: this.props :: ", this.props)

        let contentDetails = this.props.contentDetails ?
            this.props.contentDetails : undefined
    
        let content_ids = []
        let contents = []

        let slickSliderElement = null;

        let activity = []
        if (contentDetails) {
            let individualActivity
            for (let j = 0; j < contentDetails.length; j++){
                if (contentDetails[j].type == "Content") {
                    individualActivity = (contentDetails[j].content[0])
                    let content = {}
                    let indexOfContent = -1
                    if (content_ids.length>0)
                        indexOfContent = content_ids.indexOf(individualActivity.id)
                    //   console.log("ContentSection :: indexOfContent :: ", indexOfContent)
                    if (indexOfContent == -1) {
                        content["id"] = individualActivity.id
                        content["title"] = individualActivity.title
                        content["photo"] = individualActivity.poster_thumbnail
                        content["number_of_likes"] = individualActivity.number_of_likes
                        content["number_of_dislikes"] = individualActivity.number_of_dislikes
                        content["likeOrDislike"] = individualActivity.liked_or_not
                        content["author"] = {}
                        content["author"]["id"] =  individualActivity.author_profile.id
                        content["author"]["first_name"] =  individualActivity.author_profile.first_name
                        content["author"]["last_name"] =  individualActivity.author_profile.last_name
                        content['last_update_time'] = []
                        content['number_of_full_view'] = []
                        content['percentage_view'] = []
                        content['start_from'] = 0

                        // console.log("ContentSection :: content :: ", content)
                        if (contentDetails[j].viewed_content &&
                            contentDetails[j].viewed_content.fields)
                        {
                            content['last_update_time'].push(contentDetails[j].
                                viewed_content.fields.last_update_time)
                            content['number_of_full_view'].push(contentDetails[j].
                                viewed_content.fields.number_of_full_view)
                            content['percentage_view'].push(contentDetails[j].
                                viewed_content.fields.percentage_view)
                            content['start_from'] = Math.floor(contentDetails[j].
                                viewed_content.fields.view_time)
                                // console.log("ContentSection :: content1 :: ", content)
                            
                        }
                        contents.push(content)
                        // console.log("ContentSection :: contents :: ", contents)
                        content_ids.push(individualActivity.id)
                        // console.log("ContentSection :: content_ids :: ", content_ids)
                    }
                    else {
                        if (contentDetails[j].viewed_content &&
                            contentDetails[j].viewed_content.fields)
                        {

                            // console.log("ContentSection :: content11 :: ", contents)
                            contents[indexOfContent].last_update_time.push(contentDetails[j].
                                viewed_content.fields.last_update_time)
                            contents[indexOfContent].number_of_full_view.push(contentDetails[j].
                                viewed_content.fields.number_of_full_view)
                            contents[indexOfContent].percentage_view.push(contentDetails[j].
                                    viewed_content.fields.percentage_view)
                            contents[indexOfContent].start_from = Math.floor(contentDetails[j].
                                viewed_content.fields.view_time)
                            // console.log("ContentSection :: content12 :: ", contents)
                            
                        }
                    }
                }
            }

            
            for (let j = 0; j < contents.length; j++){
                let contentUrl = this.props.contentUrls ? this.props.contentUrls[contents[j].id] : null;
                // console.log("SubscribedActivityReport :: activity contents :: ", contents[j])
                activity.push(
                    <div key={j} style={{padding:"10px"}}>
                        <ContentSectionElement content={contents[j]} {...this.props}
                            contentUrl={contentUrl}/>
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
            
            if(activity.length > 0){
                slickSliderElement = <Slider {...settings}>{activity}</Slider>
            }
        }

        return (
            <Grid fluid>
                {activity.length > 0 ?
                    <div>
                        {slickSliderElement}
                        <div style={{ marginTop: "10px", textAlign:"center" }}>
                                <PrimaryWhiteButton 
                                    buttonText="Explore Content"
                                    redirect="true"
                                    redirectAddress="/userDashboard/vids/all"
                                />
                        </div>
                    </div> :
                    contentDetails ?
                        <div>
                            <div className="custom-list-content">
                                Sorry, We don't have any Suggestions as of now.
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <PrimaryWhiteButton 
                                    buttonText="Explore Content"
                                    redirect={true}
                                    redirectAddress="/userDashboard/vids/all"
                                />
                            </div>
                        </div> :
                        <div style={{display: "flex", justifyContent: "flex-start"}}>
                            <Preloader shimmer={true} copies={1} placeholder="card" />
                        </div>
                }
            </Grid>
        )
    }
}