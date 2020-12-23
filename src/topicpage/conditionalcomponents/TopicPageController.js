import React, {Component} from 'react'
import {connect } from 'react-redux';

import {
            getTagDetails, 
            getPostsOfTags, 
            getSessionsOfTags, 
            getUserListForTag, 
            getCommunityListForTag, 
            getTestList, 
            getContentOfTags, 
            isUserFollows,
            followTopic,
            emptyStore
} from './action'
import TopicPage from '../presentationalcomponents/TopicPage'


class TopicPageController extends Component{
    constructor(props){
        super(props);
        this.state = {
            topicOwnershipValue: false
        }

        this.followTopic = this.followTopic.bind(this)
    }

    componentWillMount(){
        this.props.dispatch(emptyStore())
    }

    componentDidMount(){
        this.props.dispatch(getTagDetails(this.props.match.params.topicId))
        this.props.dispatch(getPostsOfTags(this.props.match.params.topicId))
        this.props.dispatch(getSessionsOfTags(this.props.match.params.topicId))
        this.props.dispatch(getUserListForTag(this.props.match.params.topicId))
        this.props.dispatch(getCommunityListForTag(this.props.match.params.topicId))
        this.props.dispatch(getTestList(this.props.match.params.topicId))
        this.props.dispatch(getContentOfTags(this.props.match.params.topicId))
        this.props.dispatch(isUserFollows(this.props.match.params.profileId, this.props.match.params.topicId))
    }

    componentWillReceiveProps(nextProps){
        if(this.props.mentorsOfTopic && 
            this.props.mentorsOfTopic.length > 0 && 
            this.props.userProfile) {
            const userPk = this.props.userProfile.pk 
            for(let mentor of this.props.mentorsOfTopic) {
                if(mentor.pk === userPk) {
                    this.setState({ topicOwnershipValue: true })
                    break;
                }
            }
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) {
            this.props.dispatch(getTagDetails(this.props.match.params.topicId))
            this.props.dispatch(getPostsOfTags(this.props.match.params.topicId))
            this.props.dispatch(getSessionsOfTags(this.props.match.params.topicId))
            this.props.dispatch(getUserListForTag(this.props.match.params.topicId))
            this.props.dispatch(getCommunityListForTag(this.props.match.params.topicId))
            this.props.dispatch(getTestList(this.props.match.params.topicId))
            this.props.dispatch(getContentOfTags(this.props.match.params.topicId))
            this.props.dispatch(isUserFollows(this.props.match.params.profileId, this.props.match.params.topicId))
        } 
    }

    followTopic() {
        this.props.dispatch(followTopic(this.props.match.params.topicId));        
    }

    render(){
        // console.log("TopicPageController", this.props)

        return(
            <TopicPage 
                {...this.props}
                followTopic={this.followTopic}
                topicOwnershipValue={this.state.topicOwnershipValue}
            />
        );
    }
}

let mapStateToProps = (store) => {
    return{
        topicDetails :store.topicDataReducer.topicDetailsState,
        postOfTopic :store.topicDataReducer.postOfTopicState,
        userProfileData: store.userProfileReducer.userProfileData,
        userProfile: store.userProfileReducer.profileFields,
        sessionsOfTopic: store.topicDataReducer.sessionsOfTopicState,
        mentorsOfTopic: store.topicDataReducer.mentorsOfTopicState,
        communitiesOfTopic: store.topicDataReducer.communitiesOfTopicState,
        testListOfTopic: store.topicDataReducer.testOfTopicState,
        contentListOfTopic: store.topicDataReducer.contentOfTopicState,
        isFollowing: store.topicDataReducer.isFollowTopic,
    }
}

export default connect(mapStateToProps)(TopicPageController);