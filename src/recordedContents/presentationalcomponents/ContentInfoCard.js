import React, { Component } from "react";
import { Thumbnail, Col, Popover, Row } from "react-bootstrap";
import FontAwesome from 'react-fontawesome';

import PlayerModal from './PlayerModal'
import RequestAccessFormController from '../conditionalcomponents/RequestAccessFormController';
import PackageValidityController from '../../shared/PackageValidity/conditionalcomponents/PackageValidityController'
import BlogWritingController from "../../dashboardpage/conditionalcomponents/BlogWritingController";
import { Event } from '../../actionTracking/actionTracking'

import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';
import { ComplementaryButton } from "../../shared/RefierComponents/ComplementaryButton";
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'

import dummyPoster from "../../images/mentor_dashboard_page/video-learn.jpeg"
import avatar from '../../shared/Header/presentationalcomponents/img/avatardp.png'


class ContentInfoCard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showModal: false,
            is_useful_count: this.props.content ? this.props.content.number_of_likes: 0,
            is_not_useful_count: this.props.content ? this.props.content.number_of_dislikes : 0,
            liked_or_not: this.props.content.likeOrDislike?this.props.content.likeOrDislike:null,
            showMore: false,
        }

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.isContentAccesible = this.isContentAccesible.bind(this);
        this.addLikeOrDislike = this.addLikeOrDislike.bind(this);
        this.getContentText = this.getContentText.bind(this);
        this.toggleTags = this.toggleTags.bind(this);   
        this.watchVideoWithGAEvent = this.watchVideoWithGAEvent.bind(this);   
        this.closeVideoWithGAEvent = this.closeVideoWithGAEvent.bind(this);   
        this.noAccessGAEvent = this.noAccessGAEvent.bind(this);   
    }

    
    toggleTags() {
        this.setState({ showMore: !this.state.showMore })
    }

    showModal() {
        //console.log("recordedContent::ContentInfoCard:: showModal() ")
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    isContentAccesible() {
        if (this.props.content.privacy_level === "public") {
            return true;
        }
        if (this.props.contentAccess && this.props.contentAccess[this.props.contentId]) {
            return this.props.contentAccess[this.props.contentId];
        }
        return false;
    }

    addLikeOrDislike(actionType, actionLikeOrDislike) {
        let self = this;
        let likeOrDislike = actionLikeOrDislike;
        if (likeOrDislike === "like") {
            if (actionType === "add") {
                this.setState((prevState) => {
                    return {
                        is_useful_count: prevState.is_useful_count + 1,
                        liked_or_not: "like"
                    }
                })
            }
            else if (actionType === "remove") {
                this.setState((prevState) => {
                    return {
                        is_useful_count: prevState.is_useful_count - 1,
                        liked_or_not: null
                    }
                })
            }
            else if (actionType === "addRemove") {
                this.setState((prevState) => {
                    return {
                        is_useful_count: prevState.is_useful_count + 1,
                        is_not_useful_count: prevState.is_not_useful_count - 1,
                        liked_or_not: "like"
                    }
                })
            }
        }

        else if (likeOrDislike === "dislike") {
            if (actionType === "add") {
                this.setState((prevState) => {
                    return {
                        is_not_useful_count: prevState.is_not_useful_count + 1,
                        liked_or_not: "dislike"
                    }
                })
            }
            else if (actionType === "remove") {
                this.setState((prevState) => {
                    return {
                        is_not_useful_count: prevState.is_not_useful_count - 1,
                        liked_or_not: null
                    }
                })
            }
            else if (actionType === "addRemove") {
                this.setState((prevState) => {
                    return {
                        is_not_useful_count: prevState.is_not_useful_count + 1,
                        is_useful_count: prevState.is_useful_count - 1,
                        liked_or_not: "dislike"
                    }
                })
            }
        }

        let formdata = {
            content_id: this.props.contentId,
            mapping_id: this.props.mapping_id,
            action: actionType,
            likeOrDislike: likeOrDislike,
            refresh_required: true
        }
        // console.log("addLikeOrDislike   ", formdata);

        this.props.likeOrDislikeContents(formdata);
    }

    hintDescription(desc) {
        return <Popover id="popover-trigger-hover-focus">
            <div className="custom-list-sub-content" style={{ margin: "10px 10px" }}>
                {desc}</div>
        </Popover>
    }

    getContentText(content, searchText) {
        let newContent = content.toLowerCase();
        let idx = newContent.indexOf(searchText);
        let resp;
        
        if(searchText !== '' && idx !== -1) {
            const textLen = searchText.length;
                
            if(idx === 0) {
                resp =  <span className="display-card-header">
                            <span className="highlight-text">{content.substring(idx, textLen)}</span>
                            { content.substring(textLen) }
                        </span>;
            } else {
                resp =  <span className="display-card-header">
                            {content.substring(0, idx)}
                            <span className="highlight-text">{ content.substring(idx, idx + textLen) }</span>
                            {content.substring(idx + textLen)}
                        </span>;
            }
        } else {
            resp = <span className="display-card-header">
                        { content }
                    </span>
        }       
        return resp;
    }

    watchVideoWithGAEvent() {
        this.showModal();
        Event("VIDEO_PAGE", "Click Watch Video", this.props.content.title + "-" + this.props.contentId)
    }

    noAccessGAEvent(accessLabel) {
        this.showModal();
        Event("VIDEO_PAGE", "No Access", accessLabel)
    }

    closeVideoWithGAEvent() {
        this.closeModal();
        // Event("VIDEO_PAGE", "Close Watch Video", this.props.contentId + " " + this.props.content.title)
        // Event("VIDEO_PAGE", "Video Watch Time", timeWatched)
    }


    render() {
        let searchText = this.props.searchText.toLowerCase();
        let tagValues = this.props.content.tag_values
        tagValues = JSON.parse(tagValues)
        let tags = [], tagsLess = []
        
        for(let i = 0; i < tagValues.length && i < 2; i++) {
            tagsLess.push(
                <span key={i}
                    style={{marginRight: '5px', display: 'inline-block', marginTop: '5px'}} 
                    className={"custom-list-tag-"+ (i % 4)}>
                    {tagValues[i].fields.tag_name}
                </span>
            )
        }
        
        for(let i = 0; i < tagValues.length; i++) {
            tags.push(
                <span key={i}
                    style={{marginRight: '5px', display: 'inline-block', marginTop: '5px'}} 
                    className={"custom-list-tag-"+ (i % 4)}>
                    {tagValues[i].fields.tag_name}
                </span>
            )
        }

        let total_credits = 0
        if(this.props.userCredits){
            total_credits = this.props.userCredits[0].fields.total_credits
        }

        let subscribed_packages, purchase_packages, purchase_button, purchase_package_details
        let is_purchase_package = false
        if (this.props.content.isEntitled) {
            let packages = JSON.parse(this.props.content.subscriptions_packages)
            let subscriptions_packages = packages.SubscribedPackages
            // console.log("subscriptions_packages", subscriptions_packages)
            if (subscriptions_packages) {
                if (subscriptions_packages.length > 0) {
                    subscriptions_packages = JSON.parse(subscriptions_packages[0])
                    // console.log("subscriptions_packages", subscriptions_packages)
                    if (subscriptions_packages) {
                        if (subscriptions_packages.length > 0) {
                            subscribed_packages = []
                            for (let i = 0; i < subscriptions_packages.length; i++) {
                                if (subscriptions_packages[i].fields.user) {
                                    // if (!entity_mapping_id) {
                                    //     entity_mapping_id = subscriptions_packages[i].pk
                                    // }
                                    subscribed_packages.push(<div
                                        className="custom-border custom-test-package"
                                        style={{ textAlign: "center" }}>
                                        <div>
                                            <span style={{ "marginRight": "10px" }}>
                                                <FontAwesome
                                                    name='unlock'
                                                    style={{ "display": "inline-block" }}
                                                />
                                            </span>
                                            <span>
                                                Subscribed -- {subscriptions_packages[i].fields.days_left} Days Left
                                            </span>
                                        </div>
                                    </div>)
                                }
                                else if (subscriptions_packages[i].fields.entity) {
                                    // entity_mapping_id = subscriptions_packages[i].pk
                                    subscribed_packages.push(<div
                                        className="custom-border custom-test-package"
                                        style={{ textAlign: "center" }}>
                                        <div>
                                            <span style={{ "marginRight": "10px" }}>
                                                <FontAwesome
                                                    name='unlock'
                                                    style={{ "display": "inline-block" }}
                                                />
                                            </span>
                                            <span>
                                                {subscriptions_packages[i].fields.entity} Subscription
                                            </span>
                                        </div>
                                        <div>
                                            {subscriptions_packages[i].fields.days_left} Days Left
                                        </div>
                                    </div>)
                                }
                            }
                        }
                    }
                }
            }

            if (!subscribed_packages) {
                is_purchase_package = true
                packages = JSON.parse(this.props.content.subscriptions_packages)
                let available_packages = packages.AvailablePackages
                // console.log("available_packages", available_packages)
                if (available_packages) {
                    if (available_packages.length > 0) {
                        available_packages = JSON.parse(available_packages[0])
                        // console.log("available_packages", available_packages)
                        purchase_package_details = available_packages
                        if (available_packages) {
                            if (available_packages.length > 0) {
                                purchase_packages = []

                                for (let i = 0; i < available_packages.length; i++) {
                                    if (available_packages[i].fields.cost_of_package == 0) {
                                        is_purchase_package = false
                                        purchase_button = undefined
                                        purchase_packages = []
                                        purchase_packages.push(
                                            <span style={{ display: "inline-block" }}
                                                className="custom-border custom-test-package">
                                                <span style={{ "marginRight": "10px" }}>
                                                    <FontAwesome
                                                        name='unlock'
                                                        style={{ "display": "inline-block" }}
                                                    />
                                                </span>
                                                <span>Free</span>
                                            </span>)
                                        break
                                    }
                                    else {
                                        purchase_button =
                                            <span style={{
                                                display: "inline-block", "cursor": "pointer"
                                            }} className="custom-border custom-test-package"
                                                onClick={this.showModal}>
                                                <span style={{ "marginRight": "10px" }}>
                                                    <FontAwesome
                                                        name='lock'
                                                        style={{ "display": "inline-block" }}
                                                    />
                                                </span>
                                                <span>Buy Premium Video</span>
                                            </span>
                                        purchase_packages.push (
                                            <PackageValidityController
                                                available_package={available_packages[i]}
                                                total_credits={total_credits}
                                                refresh={this.props.refresh}
                                                product_type="Content_Single_Package"
                                                closeModal={this.closeModal}
                                            />
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        let noAccess = null
        if (!subscribed_packages) {
            if (!purchase_packages) {
                purchase_button = <div />
                noAccess = <span style={{
                    display: "inline-block",
                }} className="custom-border custom-test-package">
                    <span style={{ "marginRight": "10px" }}>
                        <FontAwesome
                            name='lock'
                            style={{ "display": "inline-block" }}
                        />
                    </span>
                    <span>No Access</span>
                </span>
            }
        }

        let bootstrapClass = 'col-lg-3 col-md-4 col-xs-12 col-sm-6';
        if(this.props.fromCommunityProfile)
            bootstrapClass = 'col-lg-4 col-md-4 col-xs-12 col-sm-6'

        let contentHeading = this.props.content.title;
        let contentDescriptionFull = this.props.content.description;
        let contentTitle = this.getContentText(contentHeading, searchText);
        // let contentDesc = this.getContentText(this.props.content.description, searchText)
        // let contentFirstName = this.getContentText(this.props.content.author.first_name, searchText)
        // let contentLastName = this.getContentText(this.props.content.author.last_name, searchText)
        let contentDesc = contentDescriptionFull && contentDescriptionFull.length > 100
            ? contentDescriptionFull.substr(0, 100) + "..."
            : contentDescriptionFull
        let author = this.props.content.author
        let authorId = author.id
        let contentFirstName = author.first_name
        let contentLastName = author.last_name
        let profilePicUrl = author.profile_photo ? MEDIA_URL_TEXT + author.profile_photo : avatar
        
        let playerModal = (<PlayerModal {...this.props}
            showModal={this.state.showModal}
            onClose={this.closeVideoWithGAEvent}
            isVideoPage={true}
            is_useful_count={this.state.is_useful_count}
            is_not_useful_count={this.state.is_not_useful_count}
            liked_or_not={this.state.liked_or_not}
            addLikeOrDislike={this.addLikeOrDislike} />);

        let videoPoster = this.props.content.poster_thumbnail
                            ? MEDIA_URL_TEXT + this.props.content.poster_thumbnail
                            : dummyPoster


        return (
            this.props.isSingleVid ?
            <Col sm={12} style={{marginBottom: '50px'}}>
                <Row className="single-video-container">
                    <Col sm={6} md={5} mdOffset={1} className="single-video-container-left">
                        <div style={{ margin: "10px 0px 20px 0px" }}>
                            {contentTitle}
                        </div>

                        <div className="display-card-description" 
                            style={{marginBottom: '20px', display: 'flex', alignItems: 'center'}}>
                            <span>
                                <img alt="profile_photo"
                                    style={{height:"35px", width: '35px', objectFit: 'contain'}}
                                    className="refnaviconimg"
                                    src={profilePicUrl} />
                            </span>
                            <span style={{marginLeft: '20px'}}>
                                <div className="display-card-description dark-description">
                                    <b>{contentFirstName}&nbsp;{contentLastName !== 'None' ? contentLastName : ""}</b>
                                </div>
                            </span>
                        </div>

                        <div className="display-card-description" style={{marginBottom: '20px'}}>
                            {this.props.content.description}
                        </div>

                        {this.props.content.views_count > 0 || this.state.is_useful_count > 0 ?
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                {this.props.content.views_count > 0 ?
                                    <div className="custom-list-sub-content-highlighted" 
                                        style={{marginRight: '20px'}}>
                                        <span>{this.props.content.views_count} views</span>
                                    </div>
                                    : null
                                }
                                {this.state.is_useful_count > 0 ?
                                    <div className="custom-list-sub-content-highlighted">
                                        <b><span style={{ "marginRight": "5px" }}>
                                            <FontAwesome
                                                name='thumbs-o-up'
                                                style={{ "display": "inline-block" }}
                                            />
                                        </span>
                                        <span>{this.state.is_useful_count}</span></b>
                                    </div>
                                    : null
                                }
                            </div>
                            : null
                        }

                        <div style={{marginTop: '20px'}}>{tags}</div>
                    </Col>
                    <Col sm={6} md={5} className="single-video-container-right" 
                        style={{marginTop: '15px'}}>
                        <div className="img-wrapper">
                            <img style={{cursor: 'pointer'}} 
                                src={videoPoster} alt="video-placeholder"
                                onClick={is_purchase_package 
                                    ? () => this.noAccessGAEvent("Get Access") 
                                    : noAccess 
                                        ? () => this.noAccessGAEvent("No Access")
                                        : this.watchVideoWithGAEvent}
                            />
                            {subscribed_packages ?
                                <div className="card-subscription-indicator-watch">
                                    <PrimaryButton buttonText="Watch" 
                                        style={{fontSize: '1em', letterSpacing: '0.05em'}}
                                        onButtonClick={this.watchVideoWithGAEvent}
                                    />
                                </div>
                                : null
                            }
                            {noAccess ? 
                                <div className="card-subscription-indicator-watch">
                                    <ComplementaryButton buttonText="No Access" 
                                        style={{fontSize: '1em', letterSpacing: '0.05em'}}
                                        onButtonClick={() => this.noAccessGAEvent("No Access")}
                                        showIcon= { <FontAwesome name="lock" /> }
                                    />
                                </div>
                                : null
                            }
                            {is_purchase_package ? 
                                <div className="card-subscription-indicator-watch">
                                    <ComplementaryButton buttonText="Get Access"
                                        style={{fontSize: '14px', letterSpacing: '0.05em'}} 
                                        onButtonClick={() => this.noAccessGAEvent("Get Access")}
                                        showIcon= { <FontAwesome name="lock" /> }
                                    />
                                </div>
                                : null
                            }
                        </div>
                    </Col>
                </Row>

                {this.props.communityListState && this.props.communityListState.length > 0 
                    ? <Row style={{marginTop: '50px'}}>
                        <Col xs={12} smOffset={1} sm={10} className="refier-user-ask-question-wrapper"
                            style={{paddingTop: '10px', paddingBottom: '30px'}}>
                            <div className="main-list-header" style={{margin: "10px", marginBottom: '20px'}}>
                                Have a doubt? Ask a Question to our Expert!
                            </div>
                            <BlogWritingController previewQuestion={true} communitiesOptions="ALL" 
                                editorHeight={'100px'} />
                        </Col>
                    </Row>
                    : null
                }

                { this.state.showModal ?
                    !purchase_button ? playerModal :
                        <div className="video-page-modal">
                            <RequestAccessFormController {...this.props}
                                expertId={authorId}
                                contentHeading={contentHeading}
                                contentDescription={contentDescriptionFull}
                                purchase_packages={purchase_packages}
                                purchase_package_details={purchase_package_details}
                                showModal={this.state.showModal}
                                onClose={this.closeModal} 
                            />
                        </div>
                        : null
                }
            </Col>

            :

            <Col className={bootstrapClass} title="Click To Watch">
                <Thumbnail
                    src={videoPoster}
                    // onClick= {!purchase_button ? this.showModal : null} 
                    onClick={is_purchase_package 
                                ? () => this.noAccessGAEvent("Get Access") 
                                : noAccess 
                                    ? () => this.noAccessGAEvent("No Access")
                                    : this.watchVideoWithGAEvent} 
                    className="custom-thumbnail refier-card-style refier-card-style-marketplace video-image-shadow"
                    // className={!purchase_button ? 
                    //     "custom-thumbnail refier-card-style refier-card-style-marketplace"
                    //     : "custom-thumbnail refier-card-style refier-card-style-marketplace video-image-shadow"}
                    // style={!purchase_button ? { "cursor": "pointer" } : {}}>
                    style={{cursor: "pointer"}}>

                    {/* {noAccess} */}
                    {subscribed_packages ?
                        <div onClick={this.watchVideoWithGAEvent} 
                            // className="card-subscription-indicator-button custom-list-sub-content-highlighted">
                            className="card-subscription-indicator-button">
                            {/* {subscribed_packages} */}
                            <PrimaryButton buttonText="Watch" 
                                style={{fontSize: '1em', letterSpacing: '0.025em'}}
                                // onButtonClick={this.showModal}
                            />
                        </div>
                        : null
                    }
                    
                    {is_purchase_package ? 
                        <div className="card-no-access-indicator-wrapper">
                            <div onClick={() => this.noAccessGAEvent("Get Access") } 
                                className="card-no-access-indicator custom-list-sub-content-highlighted">
                                <FontAwesome
                                    name='lock'
                                    className='no-access-lock'
                                />
                            </div>
                        </div>
                        : null
                    }

                    {this.state.is_useful_count > 0 ?
                        <div className="card-like-count-sticker 
                            custom-list-sub-content-highlighted custom-list-sub-content-dark14">
                            <b><span style={{ marginRight: "5px" }}>
                                <FontAwesome
                                    name='thumbs-o-up'
                                    style={{ "display": "inline-block" }}
                                />
                            </span>
                            <span>{this.state.is_useful_count}</span></b>
                        </div>
                        : null
                    }

                    <div style={{ margin: "10px 0px" }}>
                        {contentTitle}
                    </div>
                    
                    <div className="display-card-description">{contentDesc}</div>
                    
                    {/* <Row style={{marginBottom: '10px'}}>
                        <Col xs={12}>
                            {noAccess}
                            {!is_purchase_package ? purchase_packages : purchase_button}
                            {subscribed_packages}
                        </Col>
                    </Row> */}

                    <Row style={{display: 'flex', alignItems: 'center', marginTop: '15px'}}>
                        <Col xs={7} style={{display: 'flex', alignItems: 'center', paddingRight: 0}}>
                            <div style={{flex: '0.22'}}>
                                <img alt="profile-picture"
                                    style={{height:"35px", width: '35px', objectFit: 'contain'}}
                                    className="refnaviconimg"
                                    src={profilePicUrl} />
                            </div>
                            <span style={{marginLeft: '5px', flex: '0.78'}}>
                                <div className="display-card-description dark-description">
                                    <b>{contentFirstName}&nbsp;{contentLastName !== 'None' ? contentLastName : ""}</b>
                                </div>
                            </span>
                        </Col>
                        {this.props.content.views_count > 0 ?
                            <Col xs={5}>
                                {this.props.content.views_count > 0 ?
                                    <div className="display-card-description">
                                        <span>{this.props.content.views_count} views</span>
                                    </div>
                                    : null
                                }
                            </Col>
                            : null
                        }
                    </Row>
                    
                    <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '10px'}}>
                        {this.state.showMore ?
                            tags : 
                            tagsLess
                        }
                        {tagValues && tagValues.length > 2 ?
                            <span className="show-more-tags"
                                onClick={() => this.toggleTags()}>
                                {this.state.showMore ? 
                                    '- Show Less' 
                                    :
                                    '+ Show More'
                                }
                            </span> 
                            :
                            null
                        }
                    </div> 
                </Thumbnail>
                
                { this.state.showModal ?
                    !purchase_button ? playerModal :
                        <div className="video-page-modal">
                            <RequestAccessFormController {...this.props}
                                expertId={authorId}
                                contentHeading={contentHeading}
                                contentDescription={contentDescriptionFull}
                                purchase_packages={purchase_packages}
                                purchase_package_details={purchase_package_details}
                                showModal={this.state.showModal}
                                onClose={this.closeModal} />
                        </div>
                        : null
                }
            </Col>
        );
    }
}

export default ContentInfoCard;