import React, {Component} from "react";
import { Grid, Row } from "react-bootstrap";
import Slider from 'react-slick';

import ContentInfoCard from "../presentationalcomponents/ContentInfoCard"

import Preloader from '../../shared/Preloader/PreLoader'


class ContentPage extends Component{
    constructor(props){
        super(props);
        this.createCards = this.createCards.bind(this);
        this.createCarousel = this.createCarousel.bind(this);
    }

    createCards(content) {
        // console.log("ContentPage::", content, this.props.contentUrls);
        let contentUrl = this.props.contentUrls ? this.props.contentUrls[content.pk] : null;

        return(
            <ContentInfoCard    
                getContentURL={this.props.getContentURL} 
                content={content.fields}  contentId={content.pk}
                contentAccess={this.props.contentAccess}
                contentUrl={contentUrl}
                likeOrDislikeContents={this.props.likeOrDislikeContents}
                fromOtherPage={this.props.fromOtherPage}
                userCredits={this.props.userCredits}
                refresh = {this.props.refresh}
                fromCommunityProfile={this.props.fromCommunityProfile}
                saveProgress={this.props.saveProgress}
                searchText={this.props.searchText} 
                isSingleVid={this.props.isSingleVid}
                communityListState={this.props.communityListState}
            />
        );
    }

    createCarousel(contentDetails) {
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


        // console.log("ContentPage::", content, this.props.contentUrls);
        let contentList = []
        let slickSliderElement = null;
        
        if (contentDetails) {
            for (var i = 0; i < contentDetails.length; i++) {
                let contentUrl = this.props.contentUrls ? this.props.contentUrls[contentDetails[i].pk] : null;
                contentList.push(
                    <div key={i} style={{padding:"10px"}}>
                        <ContentInfoCard
                            getContentURL={this.props.getContentURL}
                            content={contentDetails[i].fields} contentId={contentDetails[i].pk}
                            contentAccess={this.props.contentAccess}
                            contentUrl={contentUrl}
                            likeOrDislikeContents={this.props.likeOrDislikeContents}
                            fromOtherPage={this.props.fromOtherPage}
                            userCredits={this.props.userCredits}
                            saveProgress={this.props.saveProgress}
                            refresh={this.props.refresh}
                            fromDashboardPage={this.props.fromDashboardPage}
                            isSingleVid={this.props.isSingleVid}
                        />
                    </div>
                )
            }
        }

        if(contentList.length > 0){
            slickSliderElement = <Slider {...settings}>{contentList}</Slider>
        }

        return slickSliderElement
    }

   render() {
        // console.log("ContentPage::props", this.props);

        let contentInfoCard, customContentCard, noVideoCard;

        if (this.props.contentDetails !== undefined) {
            contentInfoCard = []
            let suggestedContent = []
            let otherContent = []
            for (let i = 0; i < this.props.contentDetails.length; i++) {
                if (this.props.contentDetails[i].fields && 
                    this.props.contentDetails[i].fields.is_relevant) {
                    suggestedContent.push(this.createCards(this.props.contentDetails[i]))
                } else {
                    otherContent.push(this.createCards(this.props.contentDetails[i]))
                }
            }
            if (suggestedContent.length > 0) {
                if(!this.props.isSingleVid) {
                    contentInfoCard.push (
                        <Row className="sub-list-header" style={{ margin: "10px 10px 25px 10px" }}>
                            Videos Curated For You!
                        </Row>
                    )
                }
                contentInfoCard.push (
                    <Row className="video-page-display-list-suggested">
                        {suggestedContent}
                    </Row>)
                if (otherContent.length > 0) {
                    contentInfoCard.push (
                        <Row className="sub-list-header" style={{ margin: "10px 10px 25px 10px" }}>
                            Other Videos
                        </Row>
                    )
                    contentInfoCard.push(
                        <Row className="video-page-display-list">
                            {otherContent}
                        </Row>)
                }
            } else {
                contentInfoCard.push(<Row>{otherContent}</Row>)
            }
        }

        if (this.props.customContentDetails !== undefined) {
            customContentCard = []
            let suggestedContent = []
            for (let i = 0; i < this.props.customContentDetails.length; i++) {
                let content = this.props.customContentDetails[i]
                let contentUrl = this.props.contentUrls ? this.props.contentUrls[content.pk] : null;

                suggestedContent.push( <ContentInfoCard    
                    getContentURL={this.props.getContentURL} 
                    content={content.fields}  contentId={content.pk}
                    contentAccess={this.props.contentAccess}
                    contentUrl={contentUrl}
                    likeOrDislikeContents={this.props.likeOrDislikeContents}
                    fromOtherPage={this.props.fromOtherPage}
                    userCredits={this.props.userCredits}
                    refresh = {this.props.refresh}
                    fromCommunityProfile={this.props.fromCommunityProfile}
                    saveProgress={this.props.saveProgress}
                    searchText={this.props.searchText} 
                /> )
            }

            if (suggestedContent.length > 0) {
                customContentCard.push(
                    <Row className="sub-list-header" style={{ margin: "10px 10px 25px 10px" }}>
                        Videos from this Community
                    </Row>)
                customContentCard.push (
                    <Row className="video-page-display-list">
                        {suggestedContent}
                    </Row>)
            } else {
                noVideoCard = []
                noVideoCard.push(
                    <Row className="sub-list-header" style={{margin: "10px"}}>
                        Videos from this Community
                    </Row>)
                noVideoCard.push(
                    <div style={{padding: '10px', width: '90%'}} 
                        className="custom-list-content">
                        Sorry! No videos are available right now.
                    </div>
                )
            }
        } else {
            noVideoCard = []
            noVideoCard.push(
                <Row className="sub-list-header" style={{margin: "10px"}}>
                    Videos from this Community
                </Row>)
            noVideoCard.push(
                <div style={{padding: '10px', width: '90%'}} 
                    className="custom-list-content">
                    Sorry! No videos are available right now.
                </div>
            )
        }


        
        return (
            <div>
                {this.props.contentDetails ?
                    this.props.contentDetails.length === 0 ?
                        <div style={{padding: '10px', width: '90%'}} 
                            className="custom-list-content generic-post-card">
                            Sorry! No videos are available ...
                        </div>
                        :
                        contentInfoCard
                    : this.props.customContentDetails ?
                        this.props.customContentDetails.length === 0 
                            ? noVideoCard
                            : customContentCard
                        : <div>
                            <Preloader 
                                shimmer={true} 
                                placeholder="video_card" 
                                copies={4} 
                                preloaderStyle={{display: "flex", justifyContent: 'space-between'}}/>
                        </div>
                }
            </div>
        );
    }
}


export default  ContentPage;