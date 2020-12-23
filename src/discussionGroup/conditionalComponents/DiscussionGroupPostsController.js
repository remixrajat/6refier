import React, {Component} from 'react'
import { connect } from 'react-redux';
import { convertToRaw, EditorState, ContentState } from 'draft-js';

import { 
    getDiscussionRoomPosts, 
    getDiscussionGroupPostsStatsCount,
    addUpdatePostAnswerToDiscussionRoom, 
    getDiscussionRoomPostsAnswer, 
    likeOrDislikeGroupPost, 
    addUpdatePostToDiscussionRoom,
    deleteDiscussionGroupPostsOrAnswer } from './action'
import DiscussionGroupPostsList from '../presentationalComponents/DiscussionGroupPostsList';

import { handleQuotesInEditor } from '../../HelperFunctions/handleQuotesInEditor'
import CommonModal from '../../shared/CommonModal'


class DiscussionGroupPostsController extends Component{
    constructor(props){
        super(props);
        this.state = {
            isAnswerPanelOpen : false,
            isLoading: false, 
            showModal: false,
            modalHeading: '',
            modalBodyText: ''
        }
        this.getGroupPostAnswers = this.getGroupPostAnswers.bind(this);
        this.submitGroupPostAnswer = this.submitGroupPostAnswer.bind(this);
        this.openOrCloseAnswerPanel = this.openOrCloseAnswerPanel.bind(this);
        this.likeOrDislikePost = this.likeOrDislikePost.bind(this);
        this.deleteGroupPostOrPostAnswer = this.deleteGroupPostOrPostAnswer.bind(this);
        this.editGroupPost = this.editGroupPost.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getDiscussionRoomPosts(this.props.match.params.groupId))
    }

    openOrCloseAnswerPanel(){
        this.setState({isAnswerPanelOpen : !this.state.isAnswerPanelOpen})
    }

    getGroupPostAnswers(groupPostId){
        this.props.dispatch(getDiscussionRoomPostsAnswer(groupPostId))
    }

    submitGroupPostAnswer(answer, groupPostId, cb){
        // console.log('submitGroupPostAnswer :: ', answer, groupPostId)
        let self = this;
        this.props.dispatch(addUpdatePostAnswerToDiscussionRoom(answer, groupPostId))
            .then(()=>{
                self.props.dispatch(
                    getDiscussionGroupPostsStatsCount(self.props.groupId)
                )
                if(cb){
                    cb();
                }
                self.getGroupPostAnswers(groupPostId);
            })
            
    }

    deleteGroupPostOrPostAnswer(postId, postType){
        this.props.dispatch(deleteDiscussionGroupPostsOrAnswer(postId, postType))
        .then(()=>{
            if(postType === "post")
                this.props.dispatch(getDiscussionGroupPostsStatsCount(this.props.groupId));
        })
    }

    likeOrDislikePost(formdata){
        // console.log('likeOrDislikePost :: ', formdata);
        this.props.dispatch(likeOrDislikeGroupPost(formdata))
        .then((data)=>{
            if(data)
                this.props.dispatch(getDiscussionGroupPostsStatsCount(this.props.groupId));
        })
    }

    editGroupPost(postId, postBody) {
        // console.log("submitting here===================================", {postId, postBody});
        
        this.setState({isLoading: true});

        let editorStateSubmit = postBody;
        let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
        let postTypeState = 'post';
        
        let self = this;
        let ifContent = false;  // assume no content

        let i = 0;
        while (i < contentState.blocks.length) {
            if (contentState.blocks[i].text !== "") {
                ifContent = true;
                break;
            }
            i++;
        }

        if (!ifContent) {
            self.setState({
                showModal: true,
                modalHeading: "Oops!!!",
                modalBodyText: "You cannot submit empty content!",
            });
            this.setState({isLoading: false});
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

        let addUpdatePost = this.props.dispatch(addUpdatePostToDiscussionRoom(this.props.groupId,
            newContentState, this.props.communityId, postId))

        return addUpdatePost.then(function (data) {
            // console.log("******Response from server: ", data);
            self.setState({
                showModal: true, 
                modalHeading: "Successful!!!", 
                modalBodyText: "Your Post Was Successfully Submitted!!",
            });
            self.setState({ isLoading: false });
            // self.props.dispatch(getDiscussionGroupPostsStatsCount(self.props.groupId));
            // self.props.dispatch(getDiscussionRoomPosts(self.props.groupId))
        })
        .catch(function (error) {
            //console.log(error);
            self.setState({
                showModal: true, 
                modalHeading: "Oops!!!", 
                modalBodyText: error.message // "Sorry...an error occurred while submitting!!"
            })
            self.setState({ isLoading: false });
        });
    }

    hideModal() {
        this.setState({showModal: false})
    }


    render() {
        // console.log('DiscussionGroupPostsController :: ', this.props)

        return (
            <div>
                <DiscussionGroupPostsList {...this.props} {...this.state}
                    getGroupPostAnswers={this.getGroupPostAnswers}
                    submitGroupPostAnswer={this.submitGroupPostAnswer}  
                    openOrCloseAnswerPanel={this.openOrCloseAnswerPanel} 
                    likeOrDislikePost={this.likeOrDislikePost}
                    deleteGroupPostOrPostAnswer={this.deleteGroupPostOrPostAnswer}
                    editGroupPost={this.editGroupPost}
                />
                <CommonModal
                    showModal={this.state.showModal}
                    close={this.hideModal}
                    modalHeading={this.state.modalHeading}
                    modalBody={this.state.modalBodyText}
                />
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    let isCurrentUserOwner;
    if(store.groupDiscussionReducer.getGroupDetails && store.groupDiscussionReducer.getGroupDetails.fields){
        isCurrentUserOwner: store.groupDiscussionReducer.getGroupDetails.fields.isOwner
    }
    
    return {
        discussionGroupPosts: store.groupDiscussionReducer.discussionGroupPosts,
        groupMembers: store.groupDiscussionReducer.getGroupMembers,
        userIdMapping: store.groupDiscussionReducer.userIdMapping,
        discussionRoomPostsStatsCount: store.groupDiscussionReducer.discussionRoomPostsStatsCount,
        userProfileId: store.userProfileReducer.userId,
        isCurrentUserOwner:isCurrentUserOwner
    }
}

export default connect(mapStateToProps)(DiscussionGroupPostsController);