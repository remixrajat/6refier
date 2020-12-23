import React, {Component} from 'react'
import { connect } from 'react-redux';

import DiscussionGroupPage from '../presentationalComponents/DiscussionGroupPage'
import { getGroupDetails, getGroupMembers, getDiscussionRoomPosts, getDiscussionGroupPostsStatsCount } from './action'

import "../../styles/scss/discussion.css"


class DiscussionGroupController extends Component{
    componentWillMount() {
        let groupId = this.props.match.params.groupId;
        this.props.dispatch(getGroupDetails(groupId))
        this.props.dispatch(getGroupMembers(groupId))
        this.props.dispatch(getDiscussionRoomPosts(groupId))
        this.props.dispatch(getDiscussionGroupPostsStatsCount(groupId))
    }

    render() {
        // console.log("DiscussionGroupController:: props", this.props)

        return (
            <div>
                <DiscussionGroupPage
                    {...this.props}
                    groupId={this.props.match.params.groupId}
                />
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    // console.log('store.groupDiscussionReducer :: ', store.groupDiscussionReducer);

    return {
        groupDetails: store.groupDiscussionReducer.getGroupDetails,
        groupMembers: store.groupDiscussionReducer.getGroupMembers,
        discussionRoomPostsStatsCount: store.groupDiscussionReducer.discussionRoomPostsStatsCount,
    }
}

export default connect(mapStateToProps)(DiscussionGroupController);