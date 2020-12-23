import React, { Component } from 'react'
import {Button} from 'react-bootstrap';

import DiscussionGroupPosts from './DiscussionGroupPost';
import DiscussionPostEditing from './DiscussionPostWriting';

import CommonModal from '../../shared/CommonModal'
import { createEditorStateFromBackendData } from '../../HelperFunctions/createEditorStateFromBackendData';


class DiscussionGroupPostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentPostId: null,
            modalType: null,
            currentPostBody: null,
        }
        this.createQuestionAnswerPanel = this.createQuestionAnswerPanel.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
        this.editPost = this.editPost.bind(this);
        this.showEditPostModal = this.showEditPostModal.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    deletePost(){
        if(!this.state.currentPostId) {
            return;
        }

        this.props.deleteGroupPostOrPostAnswer(this.state.currentPostId, 'post');
        this.hideConfirmationModal();
    }

    showConfirmationModal(postid){
        this.setState({
            showModal: true, 
            currentPostId: postid,
            modalType: 'delete'
        })
    }

    hideConfirmationModal(){
        this.setState({showModal: false, currentPostId: null, currentPostBody: null})
    }


    createQuestionAnswerPanel() {
        // console.log('DiscussionGroupPostsList::11');
        if (!this.props.discussionGroupPosts) {
            return null;
        }
        // console.log('DiscussionGroupPostsList::12');
        let self = this;

        if (this.props.isAll) {
            return this.props.discussionGroupPosts.map(function (groupPost, i) {
                
                let isPostOwnerMember = self.props.userIdMapping[groupPost.fields.post_owner.id]
                let dislikesCount, likesCount, answerCount, likeOrDislike;
                if (self.props.discussionRoomPostsStatsCount && self.props.discussionRoomPostsStatsCount[groupPost.pk]) {
                    // console.log('DiscussionGroupPostsList::', self.props.discussionRoomPostsStatsCount[groupPost.pk]);
                    dislikesCount = self.props.discussionRoomPostsStatsCount[groupPost.pk].dislikesCount;
                    likesCount = self.props.discussionRoomPostsStatsCount[groupPost.pk].likesCount;
                    answerCount = self.props.discussionRoomPostsStatsCount[groupPost.pk].answerCount;
                    likeOrDislike = self.props.discussionRoomPostsStatsCount[groupPost.pk].likeOrDislike;
                }

            
                return (
                    <DiscussionGroupPosts key={i} discussionGroupPost={groupPost}
                        postOwner={groupPost.fields.post_owner}
                        isPostOwnerMember={isPostOwnerMember}
                        currentUserProfileId={self.props.userProfileId}
                        isCurrentUserOwner={self.props.isCurrentUserOwner}
                        getGroupPostAnswers={self.props.getGroupPostAnswers}
                        submitGroupPostAnswer={self.props.submitGroupPostAnswer}
                        openOrCloseAnswerPanel={self.props.openOrCloseAnswerPanel}
                        likeOrDislikePost={self.props.likeOrDislikePost}
                        dislikesCount={dislikesCount} likesCount={likesCount}
                        answerCount={answerCount} likeOrDislike={likeOrDislike}
                        showConfirmationModal={self.showConfirmationModal}
                        showEditPostModal={self.showEditPostModal}
                        groupId={self.props.groupId}
                        dispatch={self.props.dispatch}
                    />
                )
            
            })
        } else {
            let filteredPosts = this.props.discussionGroupPosts.filter(function (groupPost, i){
                return self.props.discussionRoomPostsStatsCount[groupPost.pk].likeOrDislike == "like"
            })
            
            return filteredPosts.map(function (groupPost, i) {
                // let postOwner = self.props.groupMembers[groupPost.fields.post_owner]
                let isPostOwnerMember = self.props.userIdMapping[groupPost.fields.post_owner.id]
                let dislikesCount, likesCount, answerCount, likeOrDislike;
                if (self.props.discussionRoomPostsStatsCount && self.props.discussionRoomPostsStatsCount[groupPost.pk]) {
                    // console.log('DiscussionGroupPostsList::', self.props.discussionRoomPostsStatsCount[groupPost.pk]);
                    dislikesCount = self.props.discussionRoomPostsStatsCount[groupPost.pk].dislikesCount;
                    likesCount = self.props.discussionRoomPostsStatsCount[groupPost.pk].likesCount;
                    answerCount = self.props.discussionRoomPostsStatsCount[groupPost.pk].answerCount;
                    likeOrDislike = self.props.discussionRoomPostsStatsCount[groupPost.pk].likeOrDislike;
                }

            
                return (
                    <DiscussionGroupPosts key={i} discussionGroupPost={groupPost}
                        postOwner={groupPost.fields.post_owner}
                        isPostOwnerMember={isPostOwnerMember}
                        currentUserProfileId={self.props.userProfileId}
                        isCurrentUserOwner={self.props.isCurrentUserOwner}
                        getGroupPostAnswers={self.props.getGroupPostAnswers}
                        submitGroupPostAnswer={self.props.submitGroupPostAnswer}
                        openOrCloseAnswerPanel={self.props.openOrCloseAnswerPanel}
                        likeOrDislikePost={self.props.likeOrDislikePost}
                        dislikesCount={dislikesCount} likesCount={likesCount}
                        answerCount={answerCount} likeOrDislike={likeOrDislike}
                        showConfirmationModal={self.showConfirmationModal}
                        showEditPostModal={self.showEditPostModal}
                        groupId={self.props.groupId}
                        dispatch={self.props.dispatch}
                    />
                )
            
            })
        }
    }

    showEditPostModal(postid, postBody) {
        this.setState({
            showModal: true,
            modalType: 'edit',
            currentPostId: postid,
            currentPostBody: createEditorStateFromBackendData(postBody)
        })
    }

    editPost() {
        if(!this.state.currentPostId) {
            return;
        }

        this.props.editGroupPost(this.state.currentPostId, this.state.currentPostBody);
        this.hideConfirmationModal();
    }

    onEditorStateChange(editorState) {
        this.setState({ currentPostBody: editorState });
    }


    render() {
        // console.log('DiscussionGroupPostsList::', this.props);

        let modalHeading, modalBodyText;

        if(this.state.modalType === 'edit') {
            modalHeading = "Edit Post";
            modalBodyText = (
                <div>
                    <DiscussionPostEditing {...this.props}
                        onEditorStateChange={this.onEditorStateChange}
                        submitPost={this.editPost}
                        autoFocus={true}
                        placeholder="Edit your question..."
                        editorState={this.state.currentPostBody}
                        buttonText="Update"
                        isLoading={this.props.isLoading}
                        editorHeight="200px"
                    />
                </div>
            )
        } else if (this.state.modalType === 'delete') {
            modalHeading = "Delete Post";
            modalBodyText = (
                <div>
                    <div>Do you want to delete this Post ?</div><br />
                    <Button className="refier_custom_button_save" onClick={this.deletePost}>Yes</Button>
                </div>
            )
        }

            
        return (
            <div>
                {this.createQuestionAnswerPanel()}
                <CommonModal
                    showModal={this.state.showModal}
                    close={this.hideConfirmationModal}
                    modalHeading={modalHeading}
                    modalBody={modalBodyText}
                />
            </div>
        )
    }
}


export default DiscussionGroupPostsList;