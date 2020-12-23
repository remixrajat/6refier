import React, {Component} from 'react'
import { connect } from 'react-redux';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import {Button} from 'react-bootstrap';

import DiscussionGroupPostAnswer from '../presentationalComponents/DiscussionGroupPostAnswer';
import DiscussionPostEditing from '../presentationalComponents/DiscussionPostWriting'
import { 
    addUpdatePostAnswerToDiscussionRoom, 
    deleteDiscussionGroupPostsOrAnswer,
    getDiscussionGroupPostsStatsCount
} from './action'

import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';
import { createEditorStateFromBackendData } from '../../HelperFunctions/createEditorStateFromBackendData';
import { handleQuotesInEditor } from '../../HelperFunctions/handleQuotesInEditor'
import CommonModal from '../../shared/CommonModal'


class DiscussionGroupPostAnswerController extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            currentAnswerId: null, 
            currentAnswerBody: null,
            modalType: null,
            isLoading: false,
            showInfoModal: false,
            modalHeading: '',
            modalBodyText: ''
        }

        this.postAnswerListDiv = null;
        this.createPostAnswerDivList = this.createPostAnswerDivList.bind(this);
        this.updateAnswer = this.updateAnswer.bind(this);
        this.showEditPostModal = this.showEditPostModal.bind(this);
        this.editPost = this.editPost.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.deleteGroupPostOrPostAnswer = this.deleteGroupPostOrPostAnswer.bind(this);
        this.hideInfoModal = this.hideInfoModal.bind(this);
    }

    componentWillReceiveProps(nextProps){
        // console.log("DiscussionGroupPostAnswerController :: componentWillReceiveProps :: ",nextProps.discussionGroupPostAnswer )
        if(!nextProps.groupPostId || !nextProps.discussionGroupPostAnswer.hasOwnProperty(nextProps.groupPostId)){
            return;
        }
        this.createPostAnswerDivList(nextProps.discussionGroupPostAnswer[nextProps.groupPostId]);

    }

    showConfirmationModal(postid) {
        this.setState({
            showModal: true, 
            currentAnswerId: postid,
            modalType: 'delete'
        })
    }

    hideConfirmationModal() {
        this.setState({showModal: false, currentAnswerId: null, currentAnswerBody: null})
    }

    hideInfoModal() {
        this.setState({showInfoModal: false})
    }

    deletePost() {
        if(!this.state.currentAnswerId) {
            return;
        }

        this.deleteGroupPostOrPostAnswer(this.state.currentAnswerId, 'answer');
        this.hideConfirmationModal();
    }

    deleteGroupPostOrPostAnswer(postId, postType) {
        let deleteAnswerPromise = this.props.dispatch(deleteDiscussionGroupPostsOrAnswer(postId, postType));
        return deleteAnswerPromise.then((data) => {
            const groupId = this.props.groupId;
            if(groupId)
                this.props.dispatch(getDiscussionGroupPostsStatsCount(groupId))

            this.props.toggleShowAnswerBox();            
        })
        .catch(function (error) {
        });
    }

    showEditPostModal(postid, postBody) {
        this.setState({
            showModal: true,
            modalType: 'edit',
            currentAnswerId: postid,
            currentAnswerBody: createEditorStateFromBackendData(postBody)
        })
    }

    editPost() {
        if(!this.state.currentAnswerId) {
            return;
        }

        this.updateAnswer(this.state.currentAnswerBody, this.props.groupPostId, this.state.currentAnswerId);
        this.hideConfirmationModal();
    }

    onEditorStateChange(editorState) {
        this.setState({ currentAnswerBody: editorState });
    }

    updateAnswer(postAnswer, postId, postAnswerId) {
        this.setState({isLoading: true});

        let editorStateSubmit = postAnswer;
        let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
        let postTypeState = 'answer';

        let self = this;
        let ifContent = false;  // assume no content

        let i = 0;
        while (i < contentState.blocks.length) {
            if (contentState.blocks[i].text.trim() !== "") {
                ifContent = true;
                break;
            }
            i++;
        }

        if (!ifContent) {
            self.setState({
                showInfoModal: true,
                modalHeading: "Oops!!!",
                modalBodyText: "You cannot submit empty content!",
            });
            self.setState({isLoading: false});

            return false;
        }

        let isNotFirst = true;
        let tempContentObj = { blocks: [] };
        let tempObj = [];
        for (let j = 0; j < contentState.blocks.length; j++) {
            if (contentState.blocks[j].text !== "") {
                if (isNotFirst) {
                    isNotFirst = false;
                    tempContentObj.blocks.push(contentState.blocks[j]);
                } else {
                    tempContentObj.blocks.push(...tempObj);
                    tempContentObj.blocks.push(contentState.blocks[j]);
                    tempObj = [];
                }
            } else {
                if (!isNotFirst)
                    tempObj.push(contentState.blocks[j]);
            }
        }
        tempContentObj = Object.assign({}, contentState, tempContentObj);
        // console.log("final temp obj flash: ", tempContentObj, contentState);

        let newContentState = handleQuotesInEditor(tempContentObj);

        let addUpdatePost = this.props.dispatch(addUpdatePostAnswerToDiscussionRoom(newContentState, postId, postAnswerId))

        return addUpdatePost.then((data) => {
            // self.props.dispatch(getDiscussionRoomPostsAnswer(postId))
            
            self.setState({
                showInfoModal: true, 
                modalHeading: "Successful!!!", 
                modalBodyText: "Your Answer Was Successfully Submitted!!",
            });
            
            self.setState({ isLoading: false });
            
            self.props.toggleShowAnswerBox();            
        })
        .catch(function (error) {
            // self.postSubmitReset()
            self.setState({
                showInfoModal: true, 
                modalHeading: "Oops!!!", 
                modalBodyText: error.message // "Sorry...an error occurred while submitting!!"
            })
            self.setState({ isLoading: false });
        });
    }

    createPostAnswerDivList(postAnswerList){
        let self = this;

        this.postAnswerListDiv = postAnswerList.map((postAnswer,i)=>{
            let postAnswerId = postAnswer.pk;
            let groupPostAnswer = postAnswer.fields.answer;

            return (
                <DiscussionGroupPostAnswer key={i} groupPostAnswer={groupPostAnswer} 
                    isCurrentUserOwner={self.props.isCurrentUserOwner}
                    currentUserProfileId={self.props.currentUserProfileId}
                    groupPostId={postAnswer.fields.post}
                    answerUser={postAnswer.fields.answer_user}
                    postAnswerId={postAnswerId}
                    answerDate={postAnswer.fields.answer_date}
                    showConfirmationModal={this.showConfirmationModal}                    
                    showEditPostModal={this.showEditPostModal}   
                />
            );
        })
    }

    render() {
        // console.log('DiscussionGroupPostAnswerController ::render', this.props)

        let modalHeading, modalBodyText;

        if(this.state.modalType === 'edit') {
            modalHeading = "Edit Post";
            modalBodyText = (
                <div>
                    <DiscussionPostEditing {...this.props}
                        onEditorStateChange={this.onEditorStateChange}
                        submitPost={this.editPost}
                        autoFocus={true}
                        placeholder="Edit your answer..."
                        editorState={this.state.currentAnswerBody}
                        buttonText="Update"
                        isLoading={this.props.isLoading}
                        editorHeight="200px"
                    />
                </div>
                    // <DiscussionPostEditing {...this.props}
                    //     onEditorStateChange={this.onEditorStateChange}
                    //     submitPost={this.editPost}
                    //     autoFocus={true}
                    //     placeholder="Edit your answer..."
                    //     editorState={this.state.currentAnswerBody}
                    //     buttonText="Update"
                    //     isLoading={this.props.isLoading}
                    // />
            )
        } else if (this.state.modalType === 'delete') {
            modalHeading = "Delete Post";
            modalBodyText = (
                <div>
                    <div>Do you want to delete this Answer ?</div><br />
                    <PrimaryButton 
                        onButtonClick={this.deletePost}
                        buttonText="Yes"
                    />
                </div>
            )
        }


        return (
            <div>
                {this.postAnswerListDiv}
                <CommonModal
                    showModal={this.state.showModal}
                    close={this.hideConfirmationModal}
                    modalHeading={modalHeading}
                    modalBody={modalBodyText}
                />
                <CommonModal
                    showModal={this.state.showInfoModal}
                    close={this.hideInfoModal}
                    modalHeading={this.state.modalHeading}
                    modalBody={this.state.modalBodyText}
                />
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    // console.log('DiscussionGroupPostAnswerController ::', store)

    return {
        discussionGroupPostAnswer : store.groupDiscussionReducer.discussionGroupPostAnswer
    }
}

export default connect(mapStateToProps)(DiscussionGroupPostAnswerController);