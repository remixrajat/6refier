import React, {Component} from "react";
import { Col, Row, Grid } from "react-bootstrap";
import { connect } from "react-redux";

import ContentSection from "../presentationalcomponents/ContentSection"
import {
    getContentForDashboard,
    submitVideoViewStat, 
    getContentURL, 
    likeOrDislikeContents
} from "./actions"
import TestListForTopic from './../../dashboardpage/presentationalcomponents/TestListForTopic'
import UpcomingSessionsList from './../../dashboardpage/presentationalcomponents/UpcomingSessionsList'
import DiscussionGroupsList from './../../dashboardpage/presentationalcomponents/DiscussionGroupsList'


class ContentSectionController extends Component{
    constructor(props){
        super(props);
        this.state = {
            isContentSection: true,
            isSessionSection: false,
            isTestSection: false,
            isDiscussionSection: false,
            showRecommendationsStudent: false,
            cssDispatched: false
        }
        this.getContentURL = this.getContentURL.bind(this);
        this.refresh = this.refresh.bind(this)
        this.saveProgress = this.saveProgress.bind(this)
        this.likeOrDislikeContents = this.likeOrDislikeContents.bind(this);
        this.showContentSection = this.showContentSection.bind(this);
        this.showSessionsSection = this.showSessionsSection.bind(this);
        this.showTestSection = this.showTestSection.bind(this);
        this.showRecommnedations = this.showRecommnedations.bind(this);
        this.showDiscussionSection = this.showDiscussionSection.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getContentForDashboard());
        // this.props.dispatch(getContentAccess());
        // this.props.dispatch(getContentLikesDislikesMapping())
        // this.props.dispatch(getContentStats())
    }

    componentWillReceiveProps(nextProps) {
        // console.log("ContentSectionController:: nextProps", nextProps)

        nextProps.userProfileTags ?
            (Object.values(nextProps.userProfileTags.hobbies).length > 2 ?
                this.showRecommnedations(nextProps) :        
                null ) :
            null
        
        if(!nextProps.contentDetails || nextProps.contentDetails === 'undefined' && 
            (nextProps.testDetails || nextProps.subscribedDiscussionRooms)) {
            // if(nextProps.testDetails && nextProps.testDetails !== 'undefined') {
            //     this.showTestSection()
            // } else {
                this.showDiscussionSection()
            // }
        } 
        // else if (nextProps.contentDetails) {
        //     this.showContentSection()
        // }
    }

    showRecommnedations(props) {
        if(props.communityListState && props.communityListState.length > 0) {
            this.setState({
                showRecommendationsStudent: true, 
            })
            return;
        }

        if(props.communityDetails) {
            for(let community of props.communityDetails) {
                if(community.request_status) {
                    this.setState({
                        showRecommendationsStudent: true, 
                    })
                    break;
                }
            }
        }
    }

    getContentURL(content_id){
        this.props.dispatch(getContentURL(content_id));
    }

    refresh(){
        this.props.dispatch(getContentForDashboard());
    }


    likeOrDislikeContents(formdata){
        this.props.dispatch(likeOrDislikeContents(formdata));
    }

    saveProgress(contentProgressDetails, content_id){
        if(!content_id){
            return;
        }
        let statDetails= {
            contentProgressDetails,
            content_id
        }
        // console.log("saveProgress :: ",statDetails)
        this.props.dispatch(submitVideoViewStat(statDetails))
    }

    showContentSection() {
        this.setState({
            isContentSection: true,
            isSessionSection: false,
            isTestSection: false,
            isDiscussionSection: false
        })
    }

    showSessionsSection() {
        this.setState({
            isContentSection: false,
            isSessionSection: true,
            isTestSection: false,
            isDiscussionSection: false
        })
    }

    showTestSection() {
        // this.setState({
        //     isContentSection: false,
        //     isSessionSection: false,
        //     isTestSection: true,
        //     isDiscussionSection: false
        // })
    }

    showDiscussionSection() {
        this.setState({
            isContentSection: false,
            isSessionSection: false,
            isTestSection: false,
            isDiscussionSection: true
        })
    }

    render() {
        // console.log("ContentSectionController :: this.props :: ", this.props)
        
        let events = this.props.events
        let eventsCount = events ? events["Apply For Sessions"] ? 
                            events["Apply For Sessions"].length : undefined : undefined
        

        return (
            (this.props.communityListState && this.props.communityListState.length > 0) ?  
                !this.props.is_mentor ?
                    this.state.showRecommendationsStudent ?
                        <div style={{marginBottom: '50px'}}>
                            <div>
                                <div id="section-subtitle">
                                    Content Recommendations
                                </div>
                            </div>
                            <div className="recommendation-section" 
                                ref={(recommendation_section) => {
                                    if(recommendation_section && !this.state.cssDispatched) {
                                        this.props.dispatch({
                                            type: 'recommendation_section', 
                                            data: recommendation_section.getBoundingClientRect()
                                        })
                                        this.setState({cssDispatched: true})
                                    }
                                }}
                                style={ this.props.highlight === 'recommendation_section' ?
                                        {position: 'relative', zIndex: '10000'} :
                                        {} }>
                                <Row className="recommendation-section-header" 
                                    style={{marginLeft: '-10px', marginRight: '-10px'}}>
                                    <Col xs={6} sm={4} className={this.state.isContentSection ?
                                        "custom-tab-recommendation-active-light" 
                                        : "custom-tab-recommendation-light"}
                                        onClick={this.showContentSection}>
                                        <p>
                                            {this.props.contentDetails ? 
                                                ("Content ("+this.props.contentDetails.length+")"):
                                                "Contents"}
                                        </p>
                                    </Col>
                                    <Col xs={6} sm={4} className={this.state.isSessionSection ?
                                        "custom-tab-recommendation-active-light" 
                                        : "custom-tab-recommendation-light"}
                                        onClick={this.showSessionsSection}>
                                        <p>
                                            {eventsCount ? ("Webinars (" + eventsCount + ")")
                                                :
                                                "Webinars"}
                                        </p>
                                    </Col>
                                    <Col xs={6} sm={4} className={this.state.isDiscussionSection ?
                                        "custom-tab-recommendation-active-light" 
                                        : "custom-tab-recommendation-light"}
                                        onClick={this.showDiscussionSection}>
                                        <p>
                                            {this.props.subscribedDiscussionRooms ?
                                                ("Discussions ("+this.props.subscribedDiscussionRooms.length+")")
                                                : "Discussions"}
                                        </p>
                                    </Col>
                                </Row>
                                <div className="recommendation-section-body">
                                    {
                                        this.state.isContentSection ?
                                            <ContentSection 
                                                mentorDetails={this.props.mentorDetails}
                                                contentDetails={this.props.fromOtherPage ?
                                                    this.props.contentListFromOtherPage : 
                                                    this.props.contentDetails ? 
                                                        this.props.contentDetails :
                                                        []
                                                }
                                                fromDashboardPage={this.props.fromDashboardPage}
                                                contentUrls={this.props.contentUrls}
                                                // contentAccess = {this.props.contentAccess}
                                                // contentStats = {this.props.contentStats}
                                                // contentLikesMapping = {this.props.contentLikesMapping}
                                                dispatch={this.props.dispatch}
                                                getContentURL={this.getContentURL}
                                                likeOrDislikeContents={this.likeOrDislikeContents}
                                                fromOtherPage={this.props.fromOtherPage ? true : false}
                                                userCredits={this.props.userCredits}
                                                refresh={this.refresh}
                                                saveProgress={this.saveProgress}
                                                profileFields={this.props.profileFields} /> :
                                            this.state.isSessionSection ?
                                                <UpcomingSessionsList 
                                                    userId={this.props.userId} 
                                                    events={this.props.events} 
                                                    dispatch={this.props.dispatch} 
                                                    recommendationTab={true}/> :
                                                this.state.isTestSection ?
                                                    <TestListForTopic 
                                                        userId={this.props.userId} 
                                                        testDetails={this.props.testDetails ?
                                                            this.props.testDetails :
                                                            []
                                                        } 
                                                        recommendationTab={true}/> :
                                                    this.state.isDiscussionSection ?
                                                        <DiscussionGroupsList
                                                            dispatch={this.props.dispatch} 
                                                            subscribedDiscussionRooms={this.props.subscribedDiscussionRooms}
                                                            recommendationTab={true}/> :
                                                    null
                                    }
                                </div> 
                            </div> 
                        </div> :
                        null :
                        null :
                    null
                    // <Preloader placeholder="long_card" copies={1} shimmer={true} />
        );
    }
}

var mapStateToProps = (store) => {
    // console.log(store);
    return {
            contentDetails: store.recordedContentPageReducer.contentDetailsForDashboard,
            contentUrls : store.recordedContentPageReducer.contentUrls,
            userCredits: store.userProfileReducer.credits,
            is_mentor: (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.is_mentor : false),
            profileFields : store.userProfileReducer.profileFields,
            askedQuestions: store.appDataReducer.questionsAskedFromMentor,
            events: store.userServicePageReducer.upcomingEventData,
            userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
            testDetails: store.testDataReducer.testListState,
            communityListState: store.appDataReducer.communityListStateMemberOnly,
            communityDetails: store.appDataReducer.communityListState,
            subscribedDiscussionRooms: store.groupDiscussionReducer.subscribedDiscussionRooms,
            userProfileTags: store.userProfileReducer.userProfileTags,
            highlight: store.stylesDataReducer.highlight
    };
}   

export default  connect(mapStateToProps)(ContentSectionController);