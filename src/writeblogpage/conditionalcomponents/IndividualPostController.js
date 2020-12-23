import React from 'react';
import { connect } from 'react-redux';
import { URL_TEXT } from '../../GlobalConstants'
import { getPostById } from '../../shared/TextDisplayPanels/conditionalcomponents/action'
import { Grid, Col } from 'react-bootstrap'
import Alerts from '../../shared/Alerts/Alerts'
import PostTextHolderIndividualController from
    '../../shared/TextDisplayPanels/conditionalcomponents/PostTextHolderIndividualController'
import { getCommunityNameFromId } from '../../HelperFunctions/getCommunityNameFromId'
import { Redirect } from 'react-router-dom'


class IndividualPostController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false,
            strongAlert: "",
            lightAlert: "",
            tagsSelected: [],
        };

        this.refreshPost = this.refreshPost.bind(this)
    }

    componentWillMount() {
        //console.log("Sending Dispatch Request")
        this.props.dispatch(getPostById(this.props.match.params.postid))
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) {     
            this.props.dispatch(getPostById(this.props.match.params.postid))
        }
    }

    refreshPost() {
        //console.log("Sending Dispatch Request again")
        this.props.dispatch(getPostById(this.props.match.params.postid))
    }

    setSelectedTagsList(tagsList) {
        //console.log("tagsSelected::state",this.state.tagsSelected)
        //console.log("tagsSelected::",tagsList)
        let newTagsList = this.state.tagsSelected
        this.setState({ tagsSelected: tagsList })
    }

    render() {
        // console.log("Individual Post" , this.props.post)

        let postsList
        let i = 0
        if (this.props.post)
            if (this.props.post.length !== 0)
                postsList = this.props.post

        return (
            <Grid fluid>
                <Col xsOffset={1} xs={10} mdOffset={2} md={8}>
                    {this.props.post ?
                        this.props.post.length !== 0 ?
                            <PostTextHolderIndividualController
                                id={postsList[i].pk}
                                is_community_owner={postsList[i].fields.is_community_owner}
                                is_community_internal_counsellor={postsList[i].fields.is_community_internal_counsellor}
                                is_community_external_counsellor={postsList[i].fields.is_community_external_counsellor}
                                post_owner={postsList[i].fields.post_owner}
                                post_date={postsList[i].fields.post_date}
                                is_mentor={this.props.userProfile.is_mentor}
                                userId={this.props.userId}
                                comments={postsList[i].fields.comments}
                                post_body={postsList[i].fields.post_body}
                                is_visible_everyone={postsList[i].fields.is_visible_everyone}
                                post_type={postsList[i].fields.post_type}
                                is_anonymous={postsList[i].fields.is_anonymous}
                                communityListState={this.props.communityListState}
                                community_id={postsList[i].fields.community_name}
                                community_name={getCommunityNameFromId(postsList[i].fields.community_name, this.props.communityListState)}
                                is_useful_count_state={postsList[i].fields.is_useful_count}
                                is_not_useful_count_state={postsList[i].fields.is_not_useful_count}
                                liked_or_not_state={postsList[i].fields.liked_or_not}
                                isIndividualPost={true}
                                refreshPost={this.refreshPost}
                                tag_values={postsList[i].fields.tag_values}
                                is_resolved={postsList[i].fields.is_resolved}
                                tagsList={this.props.tagsList}
                                onViewPost={true}
                                setSelectedTags={this.setSelectedTagsList}
                                selectedTags={this.state.tagsSelected}
                            />
                            :
                            <Redirect to="/userDashboard" /> :
                        null}
                </Col>
            </Grid>
        );
    }
}

let mapStateToProps = (store) => {
    return {
        post: store.appDataReducer.individualQuestionState,
        userProfile: store.userProfileReducer.profileFields,
        communityListState: store.appDataReducer.communityListStateMemberOnly,
        userId: store.userProfileReducer.userId,
        tagsList: store.appDataReducer.tagsListState
    }
}

export default connect(mapStateToProps)(IndividualPostController);