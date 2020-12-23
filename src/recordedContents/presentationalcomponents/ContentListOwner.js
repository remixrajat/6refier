import React, {Component} from "react";
import ContentInfoCard from "../presentationalcomponents/ContentInfoCard"
import { Grid, Row } from "react-bootstrap";
import Preloader from '../../shared/Preloader/PreLoader'
import Slider from 'react-slick';
import ContentOwnerCard from './ContentOwnerCard'

class ContentListOwner extends Component{
    constructor(props){
        super(props);
        this.createCards = this.createCards.bind(this);
    }

    createCards(content){
        // console.log("ContentPage::", content, this.props.contentUrls);
        let contentUrl = this.props.contentUrls ? this.props.contentUrls[content.pk] : null;
        return(
            <ContentOwnerCard    getContentURL={this.props.getContentURL} 
                                content={content.fields}  contentId={content.pk}
                                contentAccess={this.props.contentAccess}
                                contentUrl={contentUrl}
                                likeOrDislikeContents={this.props.likeOrDislikeContents}
                                fromOtherPage={this.props.fromOtherPage}
                                userCredits={this.props.userCredits}
                                refresh = {this.props.refresh}
                                saveProgress={this.props.saveProgress}
                                fromCommunityProfile={this.props.fromCommunityProfile}
                                searchText={this.props.searchText}/>
        );
       
    }

   render(){
        let contentInfoCard;
        // console.log("ContentListOwner::", this.props.contentDetails);
        if (this.props.contentDetails !== undefined){
            contentInfoCard = []
                let content = []
            for (let i = 0; i < this.props.contentDetails.length; i++){
                    content.push(this.createCards(this.props.contentDetails[i]))
            }
            contentInfoCard.push(<Grid fluid>{content}</Grid>)
        }
        
        return(
            <div>
                <Grid fluid>
                    {this.props.contentDetails?
                        contentInfoCard.length==0?
                        <div className="custom-list-content"> Sorry! No videos are available ...</div>
                            :
                            // <div>Content</div>
                        contentInfoCard
                    :
                    <div>
                        <Preloader 
                            shimmer={true} 
                            placeholder="video_card" 
                            copies={4} 
                            preloaderStyle={{display: "flex", justifyContent: 'space-between'}}/>
                    </div>}
                </Grid>
            </div>
        );
    }
}


export default  ContentListOwner;