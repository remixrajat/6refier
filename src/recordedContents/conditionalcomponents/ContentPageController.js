import React, {Component} from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";

import ContentPage from "../presentationalcomponents/ContentsPage"
import {
    getContentDetails, getContentAccess, getContentURL, likeOrDislikeContents,
    getContentLikesDislikesMapping, getContentStats, submitVideoViewStat,
    getCustomizedContent
} from "./actions"
import { GAtiming } from '../../actionTracking/actionTracking'


class ContentPageController extends Component{
    constructor(props){
        super(props);
        this.state = {
            onDemandSearchText: ""
        }

        this.getContentURL = this.getContentURL.bind(this);
        this.likeOrDislikeContents = this.likeOrDislikeContents.bind(this);
        this.refresh = this.refresh.bind(this)
        this.setOnDemandSearchText = this.setOnDemandSearchText.bind(this)
        this.saveProgress = this.saveProgress.bind(this)
    }

    componentWillMount() {
        this.currentTime = new Date().getMilliseconds()
        let { params } = this.props.match
        if(params && params.videoId && params.videoId !== 'all') {
            this.props.dispatch(getContentDetails("content", params.videoId));
            this.props.dispatch(getCustomizedContent('community', params.videoId));
        } else {
            this.props.dispatch(getContentDetails());
        }

        this.props.dispatch(getContentAccess());
        // this.props.dispatch(getContentLikesDislikesMapping())
        this.props.dispatch(getContentStats())
    }

    componentDidMount() {
        GAtiming('PAGE_LOAD_TIME','Video Page', new Date().getMilliseconds() - this.currentTime)
    }

    getContentURL(content_id) {
        this.props.dispatch(getContentURL(content_id));
    }

    likeOrDislikeContents(formdata){
        this.props.dispatch(likeOrDislikeContents(formdata));
    }

    refresh() {
        let { params } = this.props.match
        if(params && params.videoId && params.videoId !== 'all') {
            this.props.dispatch(getContentDetails("content", params.videoId));
        } else {
            this.props.dispatch(getContentDetails());
        }
        this.props.dispatch(getContentAccess());
        // this.props.dispatch(getContentLikesDislikesMapping())
        this.props.dispatch(getContentStats()) 
    }

    setOnDemandSearchText(e) {
        this.setState({ onDemandSearchText: e.target.value });
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

    render() {
        // console.log("ContentPageController :: props", this.props);

        let modifiedContent = this.props.contentDetails;
        if(this.props.contentDetails) {
            modifiedContent = []
            if(this.state.onDemandSearchText === '') {
                modifiedContent = this.props.contentDetails;
            } else {
                let searchText = this.state.onDemandSearchText.toLowerCase();

                for(let key of this.props.contentDetails) {
                    const title = key.fields.title.toLowerCase();
                    const desc = key.fields.description.toLowerCase();
                    const firstName = key.fields.author.first_name.toLowerCase()
                    const lastName = key.fields.author.last_name.toLowerCase()
                    if( title.indexOf(searchText) !== -1 ||
                        desc.indexOf(searchText) !== -1 ||
                        firstName.indexOf(searchText) !== -1 ||
                        lastName.indexOf(searchText) !== -1) {
                        modifiedContent.push(key);
                    } else {
                        let tagsList = JSON.parse(key.fields.tag_values)
                        for(let tag of tagsList){
                            let tagName = tag.fields.tag_name.toLowerCase()
                            if(tagName.indexOf(searchText) !== -1){
                                modifiedContent.push(key);
                                break
                            }
                        }
                    }
                }
            }
        }
        
        if (this.props.fromCommunityProfile || this.props.fromOtherPage) {
            return (
                <ContentPage
                    mentorDetails={this.props.mentorDetails}
                    contentDetails={this.props.fromOtherPage ?
                        this.props.contentListFromOtherPage : this.props.contentDetails}
                    fromDashboardPage={this.props.fromDashboardPage}
                    contentUrls={this.props.contentUrls}
                    contentAccess={this.props.contentAccess}
                    contentStats={this.props.contentStats}
                    contentLikesMapping={this.props.contentLikesMapping}
                    getContentURL={this.getContentURL}
                    likeOrDislikeContents={this.likeOrDislikeContents}
                    fromOtherPage={this.props.fromOtherPage ? true : false}
                    userCredits={this.props.userCredits}
                    refresh={this.refresh}
                    fromCommunityProfile={this.props.fromCommunityProfile}
                    searchText={this.state.onDemandSearchText}
                    saveProgress={this.saveProgress} />
            )
        }
        else {
            return (
                <div>
                    {/* <Col smHidden xsHidden md={2} xsHidden className="search-nav-left-side">
                        <input
                            className="searchbar"
                            type="text"
                            onChange={this.setOnDemandSearchText}
                            value={this.state.onDemandSearchText}
                            placeholder="Search for Content" />
                    </Col> */}

                    <Grid fluid>
                        <Col xs={12} sm={10} smOffset={1}>
                            <div>
                                <ContentPage
                                    mentorDetails={this.props.mentorDetails}
                                    contentDetails={this.props.contentDetails}
                                    fromDashboardPage={this.props.fromDashboardPage}
                                    contentUrls={this.props.contentUrls}
                                    contentAccess={this.props.contentAccess}
                                    contentStats={this.props.contentStats}
                                    contentLikesMapping={this.props.contentLikesMapping}
                                    getContentURL={this.getContentURL}
                                    likeOrDislikeContents={this.likeOrDislikeContents}
                                    fromOtherPage={true}
                                    userCredits={this.props.userCredits}
                                    refresh={this.refresh}
                                    fromCommunityProfile={this.props.fromCommunityProfile}
                                    searchText={this.state.onDemandSearchText}
                                    saveProgress={this.saveProgress}  
                                    communityListState={this.props.communityListState}
                                    // customContentDetails={this.props.customContentDetails} 
                                    isSingleVid={this.props.match 
                                                    && this.props.match.params 
                                                    && this.props.match.params.videoId !== 'all' 
                                                    ? true : false}
                                />
                            </div>
                        </Col>
                    </Grid>

                    {this.props.match 
                        && this.props.match.params 
                        && this.props.match.params.videoId !== 'all'
                        ? <Grid fluid style={{marginBottom: '50px'}}>
                            <Col xs={12} sm={10} smOffset={1}>
                                <ContentPage
                                    mentorDetails={this.props.mentorDetails}
                                    // contentDetails={this.props.contentDetails}
                                    fromDashboardPage={this.props.fromDashboardPage}
                                    contentUrls={this.props.contentUrls}
                                    contentAccess={this.props.contentAccess}
                                    contentStats={this.props.contentStats}
                                    contentLikesMapping={this.props.contentLikesMapping}
                                    getContentURL={this.getContentURL}
                                    likeOrDislikeContents={this.likeOrDislikeContents}
                                    fromOtherPage={true}
                                    userCredits={this.props.userCredits}
                                    refresh={this.refresh}
                                    fromCommunityProfile={this.props.fromCommunityProfile}
                                    searchText={this.state.onDemandSearchText}
                                    saveProgress={this.saveProgress} 
                                    customContentDetails={this.props.customContentDetails} 
                                />
                            </Col>
                        </Grid>
                        : null
                    }
                </div>
            );
        }
    }
}

var mapStateToProps = (store) => {
    // console.log(store);
    return {
            mentorDetails : store.dashboardDataReducer.mentorDetails,
            contentDetails: store.recordedContentPageReducer.contentDetails,
            customContentDetails: store.recordedContentPageReducer.customContentDetails,
            contentUrls : store.recordedContentPageReducer.contentUrls,
            contentAccess : store.recordedContentPageReducer.contentAccess,
            contentStats : store.recordedContentPageReducer.contentStats,
            contentLikesMapping : store.recordedContentPageReducer.contentLikesMapping,
            userCredits: store.userProfileReducer.credits,
            communityListState: store.appDataReducer.communityListStateMemberOnly,
        };
}   

export default  connect(mapStateToProps)(ContentPageController);