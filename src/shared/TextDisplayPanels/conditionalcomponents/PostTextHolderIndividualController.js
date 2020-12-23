import React from 'react';
import { connect } from 'react-redux';
import PostsTextHolder from '../presentationalcomponents/PostsTextHolder'
import { Button } from 'react-bootstrap'
import { URL_TEXT } from '../../../GlobalConstants.js'
import axios from 'axios'

import PostEditingModal from '../presentationalcomponents/PostEditingModal.js'
import { getPostById } from './action'

import { PrimaryButton } from '../../RefierComponents/PrimaryButton';
import { convertToRaw, EditorState, ContentState } from 'draft-js';  
import { createEditorStateFromBackendData } from '../../../HelperFunctions/createEditorStateFromBackendData'
import { handleQuotesInEditor } from '../../../HelperFunctions/handleQuotesInEditor'
import { convertStringToJson } from '../../../HelperFunctions/convertStringToJson'
import CommonModal from '../../CommonModal'
import Preloader from '../../Preloader/PreLoader'

class PostTextHolderIndividualController extends React.Component {

	constructor(props) {
		super(props);
		let comments_data_state = [];
		if (this.props.comments) {
			let commentsList = JSON.parse(this.props.comments);
			for (let i = 0; i < commentsList.length; i++) {
				let comments_data_state_object = commentsList[i];
				comments_data_state_object.comments_data = createEditorStateFromBackendData(commentsList[i].fields.comment);
				comments_data_state_object.commentNum = i;
				comments_data_state.push(comments_data_state_object);
			}
		}
		let is_post_owner = (this.props.post_owner.id === this.props.userId) ? true : false;

		let tag_values = this.props.tag_values
		let postTags = []
		let tagValues = null
		if (tag_values) {
			tagValues = []
			tag_values = JSON.parse(tag_values)
			for (let i = 0; i < tag_values.length; i++) {
				let tag = {}
				tag['value'] = tag_values[i].fields.tag_name
				tag['label'] = tag_values[i].fields.tag_name
				tag['id'] = tag_values[i].pk
				postTags.push(tag)
				tagValues.push(tag)
			}
		}


		this.state = {
			postPrivacyCheckBoxStatus: (this.props.is_visible_everyone) ? false : true,
			showModal: false,
			showCommonModal: false,
			post_body_state: createEditorStateFromBackendData(this.props.post_body),
			postType: this.props.post_type,
			communitySelect: this.props.community_id,
			anonymousCheck: this.props.is_anonymous,
			buttonText: "Submit",
			comments_data_state: comments_data_state,
			showError: "none",
			errorMsg: "",
			submitPost: null,
			is_useful_count: this.props.is_useful_count_state,
			is_not_useful_count: this.props.is_not_useful_count_state,
			liked_or_not: this.props.liked_or_not_state,
			is_post_owner: is_post_owner,
			numberOfComments: 2,
			isExpanded: false,
			tagsSelected: postTags,
			tagsFinal: tagValues,
			isComment: false,
			commentShowStatus: {},
			editedBody: null,
			isEditModal: false
		};

		this.changePostPrivacy = this.changePostPrivacy.bind(this);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.onEditorStateChange = this.onEditorStateChange.bind(this);
		this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
		this.onChangeSelect = this.onChangeSelect.bind(this);
		this.submitEditedPost = this.submitEditedPost.bind(this);
		this.submitComment = this.submitComment.bind(this);
		this.openDeletionModal = this.openDeletionModal.bind(this);
		this.closeDeletionModal = this.closeDeletionModal.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.addLikeOrDislike = this.addLikeOrDislike.bind(this);
		this.switchExpandedStatus = this.switchExpandedStatus.bind(this);
		this.setSelectedTags = this.setSelectedTags.bind(this)
		this.setIsCommentState = this.setIsCommentState.bind(this)
		this.refreshContent = this.refreshContent.bind(this)
		this.deletionInProgress = this.deletionInProgress.bind(this)
	}

	componentWillReceiveProps(nextProps, prevProps) {
		// console.log("hereinsideyou", nextProps, prevProps);

		let comments_data_state = [];
		if(!(nextProps.onBlogPage || nextProps.onViewPost)) {
			if (nextProps.comments) {
				let commentsList = JSON.parse(nextProps.comments);
				for (let i = 0; i < commentsList.length; i++) {
					let comments_data_state_object = commentsList[i];
					let temp_comment = convertStringToJson(commentsList[i].fields.comment);
					if(temp_comment.blocks.length > 2) {
						let temp_comment_obj = {
							entityMap: Object.assign({}, temp_comment.entityMap),
							blocks: []
						};
						temp_comment_obj.blocks.push(temp_comment.blocks[0]);
						temp_comment_obj.blocks.push(temp_comment.blocks[1]);
						comments_data_state_object.comments_data = createEditorStateFromBackendData(temp_comment_obj);
						let temp_comment_info = {
							isExpanded: false,
							showButton: true,
							originalData: createEditorStateFromBackendData(temp_comment),
							trimmedData: comments_data_state_object.comments_data
						}
						let temp_state = this.state.commentShowStatus;
						temp_state[comments_data_state_object.pk] = temp_comment_info; 
						this.setState({
							commentShowStatus: temp_state
						})
					} else {
						comments_data_state_object.comments_data = createEditorStateFromBackendData(temp_comment);

						let temp_comment_info = {
							isExpanded: false,
							showButton: false,
							originalData: comments_data_state_object.comments_data,
							trimmedData: comments_data_state_object.comments_data
						}
						let temp_state = this.state.commentShowStatus;
						temp_state[comments_data_state_object.pk] = temp_comment_info; 
						this.setState({
							commentShowStatus: temp_state
						})					
						comments_data_state_object.comments_data = createEditorStateFromBackendData(temp_comment);
					}
					comments_data_state_object.commentNum = i;
					comments_data_state.push(comments_data_state_object);
				}
			}
		} else {
			if (nextProps.comments) {
				let commentsList = JSON.parse(nextProps.comments);
				for (let i = 0; i < commentsList.length; i++) {
					let comments_data_state_object = commentsList[i];
					comments_data_state_object.comments_data = createEditorStateFromBackendData(commentsList[i].fields.comment);
					comments_data_state_object.commentNum = i;
					comments_data_state.push(comments_data_state_object);
				}
			}
		}
					
		let tag_values = nextProps.tag_values
		let postTags = []
		let tagValues = []
		if (tag_values) {
			tag_values = JSON.parse(tag_values)
			for (let i = 0; i < tag_values.length; i++) {
				let tag = {}
				tag['value'] = tag_values[i].fields.tag_name
				tag['label'] = tag_values[i].fields.tag_name
				tag['id'] = tag_values[i].pk
				postTags.push(tag)
				tagValues.push(tag)
			}
		}

		let is_post_owner = (nextProps.post_owner.id == nextProps.userId) ? true : false;

		this.setState({
			postPrivacyCheckBoxStatus: (nextProps.is_visible_everyone) ? false : true,
			post_body_state: createEditorStateFromBackendData(nextProps.post_body),
			postType: nextProps.post_type,
			communitySelect: nextProps.community_id,
			anonymousCheck: nextProps.is_anonymous,
			comments_data_state: comments_data_state,
			is_useful_count: nextProps.is_useful_count_state,
			is_not_useful_count: nextProps.is_not_useful_count_state,
			liked_or_not: nextProps.liked_or_not_state,
			is_post_owner: is_post_owner,
			tagsSelected: postTags,
			tagsFinal: tagValues
		})
	}

	refreshContent(pk, commentNum) {
		let temp_obj = this.state.commentShowStatus[pk];
		temp_obj.isExpanded = !temp_obj.isExpanded;	

		let temp_state = this.state.commentShowStatus;
		temp_state[pk] = temp_obj;
		
		let comments_data_state_array = this.state.comments_data_state;
		
		if(temp_obj.isExpanded)
			comments_data_state_array[commentNum].comments_data = temp_obj.originalData;				
		else comments_data_state_array[commentNum].comments_data = temp_obj.trimmedData;				
			 	
		this.setState({
			commentShowStatus: temp_state,
			comments_data_state: comments_data_state_array
		});
	}

	setSelectedTags(tagsList) {
		this.setState({ tagsSelected: tagsList })
	}

	setIsCommentState(isCommentOrPost) {
		this.setState({ isComment: isCommentOrPost })
	}

	switchExpandedStatus() {
		this.setState((prevState) => {
			return { isExpanded: !(prevState.isExpanded) };
		})
	}

	changePostPrivacy(e) {
		let self = this;
		let privacy_val = (e.target.checked) ? false : true;
		let post_id = this.props.id
		axios.post(URL_TEXT + 'changePostPrivacy/', {
			privacy_val: privacy_val,
			post_id: post_id
		})
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				self.setState({ postPrivacyCheckBoxStatus: !(privacy_val) })
			})
			.catch(function (error) {
				//console.log(error);
			});

	}

	close() {
		this.setState({
			showModal: false,
			editorState: createEditorStateFromBackendData(this.props.post_body),
			showError: "none",
			errorMsg: "",
			isEditModal: false
		});
	}

	open(type, e) {
		let editorStateVal = "";
		let anonymousOption = true;
		let communitySelectOption = true;
		let currentComment = null;
		let currentCommentNum = 0;
		let submitPost = null;
		let isTypeComment = false;
		if (type.type == "post") {
			editorStateVal = this.state.post_body_state;
			anonymousOption = (this.props.post_type == "Question") ? true : false;
			communitySelectOption = true;
			submitPost = this.submitEditedPost;
			isTypeComment = false
		}
		else {
			currentCommentNum = type.commentNum;
			currentComment = this.state.comments_data_state[currentCommentNum];
			let temp_comment_data = this.state.commentShowStatus[currentComment.pk] ?
											this.state.commentShowStatus[currentComment.pk] :
											this.state.comments_data_state[currentCommentNum].comments_data;
			editorStateVal = temp_comment_data.originalData ? temp_comment_data.originalData : temp_comment_data;			
			anonymousOption = false;
			communitySelectOption = false;
			submitPost = this.submitComment;
			isTypeComment = true
		}
		this.setState({
			showModal: true, editorState: editorStateVal,
			anonymousOption: anonymousOption,
			communitySelectOption: communitySelectOption,
			currentComment: currentComment,
			currentCommentNum: currentCommentNum,
			submitPost: submitPost,
			isComment: isTypeComment,
			isEditModal: true
		});
	}

	onEditorStateChange = (editorState) => {
		let contentState = convertToRaw(editorState.getCurrentContent());
		//console.log("state changed",contentState.blocks[0].text)
		this.setState({
			editorState
		});
	}

	onChangeSelect(e) {
		this.setState({
			[e.target.name]: e.target.value
		})

		if (e.target.name == 'postType') {

			if (e.target.value == 'Question') {
				this.setState({
					anonymousOption: true
				})
			}
			else {
				this.setState({
					anonymousOption: false,
					anonymousCheck: false
				})
			}

		}

	}

	onToggleCheckbox(e) {
		this.setState((prevState) => {
			return { anonymousCheck: !(prevState.anonymousCheck) };
		})
	}


	submitEditedPost() {
		// console.log("submitting!!!");
		let editorStateSubmit = this.state.editorState;
		let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
		let postTypeState = this.state.postType;
		let communitySelectState = this.state.communitySelect;
		let anonymousCheck = this.state.anonymousCheck
		let postId = this.props.id

		let tagIdList = []
		for (let i = 0; i < this.state.tagsSelected.length; i++) {
			tagIdList.push(this.state.tagsSelected[i].id)
		}

		//console.log("editorStateSubmit", contentState)
		//console.log("postTypeState", postTypeState)
		//console.log("communitySelectState", communitySelectState);
		//console.log("tagIdList",tagIdList)
		
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
		
        if(!ifContent) {
            self.setState({ 
                showCommonModal: true, 
                modalHeading: "Oops!!!", 
                modalBodyText: "You cannot submit empty content!",
            });
            return false;
        } else {
        
			let isNotFirst = true; 
			let tempContentObj = { blocks: [] };
			let tempObj = [];
			for(let j= 0; j< contentState.blocks.length; j++) {
				if (contentState.blocks[j].text.trim() !== "") {
					if(isNotFirst) {
						isNotFirst = false;
						tempContentObj.blocks.push(contentState.blocks[j]);
					} else {
						tempContentObj.blocks.push(...tempObj);                
						tempContentObj.blocks.push(contentState.blocks[j]);
						tempObj = [];
					}
				} else {
					if(!isNotFirst)
						tempObj.push(contentState.blocks[j]);
				}
			}
			tempContentObj = Object.assign({}, contentState, tempContentObj);
			// console.log("final temp obj flash: ", tempContentObj);
			
			let newContentState = handleQuotesInEditor(tempContentObj);
			
			return axios.post(URL_TEXT + 'submitposts/', {
				editorStateSubmit: newContentState,
				postTypeState: postTypeState,
				communitySelectState: communitySelectState,
				anonymousCheck: anonymousCheck,
				postID: postId,
				refresh_required: true,
				tag_id_list: tagIdList,
				posttype: this.props.filterPostType,
				timeline: this.props.timeline,
				sortOrder: this.props.sortOrder
			})
				.then(function (response) {
					//console.log("******Response from server:", response);
					return response.data;
				}).then(function (data) {
					// console.log("******Response from server: ", data);
					// console.log("******data check", newContentState);
					self.setState({
						editedBody: JSON.stringify(newContentState),
						post_body_state: createEditorStateFromBackendData(newContentState),
						tagsFinal: self.state.tagsSelected,
						showModal: false,
					})
					self.props.dispatch({type: "setPostsListState", data: data});
				})
				.catch(function (error) {
					//console.log(error);
					self.setState({
						showError: "block", errorMsg: error.message // "Sorry...an error occurred while submitting!!"
					})
				});
			}
	}


	submitComment() {
		// console.log("submitCommentEngage!!!");
		let editorStateSubmit = this.state.editorState;
		let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
		let postId = this.props.id
		let comment_id = null;
		if (this.state.currentComment) {
			comment_id = this.state.currentComment.pk
		}
		else {
			return false;
		}
		// console.log("editorStateSubmit", contentState)
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
		
        if(!ifContent) {
            self.setState({ 
                showCommonModal: true, 
                modalHeading: "Oops!!!", 
                modalBodyText: "You cannot submit empty content!",
            });
            return false;
        } else {
        
			let isNotFirst = true; 
			let tempContentObj = { blocks: [] };
			let tempObj = [];
			for(let j= 0; j< contentState.blocks.length; j++) {
				if (contentState.blocks[j].text.trim() !== "") {
					if(isNotFirst) {
						isNotFirst = false;
						tempContentObj.blocks.push(contentState.blocks[j]);
					} else {
						tempContentObj.blocks.push(...tempObj);                
						tempContentObj.blocks.push(contentState.blocks[j]);
						tempObj = [];
					}
				} else {
					if(!isNotFirst)
						tempObj.push(contentState.blocks[j]);
				}
			}
			tempContentObj = Object.assign({}, contentState, tempContentObj);
			// console.log("final temp obj flash: ", tempContentObj);
			
			let newContentState = handleQuotesInEditor(tempContentObj);

			return axios.post(URL_TEXT + 'submitcomments/', {
				comments: newContentState,
				postId: postId,
				comment_id: comment_id,
				refresh_required: false,
				posttype: this.props.filterPostType,
				timeline: this.props.timeline,
				sortOrder: this.props.sortOrder
			})
				.then(function (response) {
					//console.log("******Response from server:", response);
					return response.data;
				}).then(function (data) {
					//console.log("******Response from server: ", data);
					let comments_data_state_array = self.state.comments_data_state;
					if(self.props.onBlogPage || self.props.onViewPost) {
						comments_data_state_array[self.state.currentCommentNum].comments_data = self.state.editorState;
						self.setState({
							comments_data_state: comments_data_state_array,
							showModal: false
						})
					} else {
						let temp_state = self.state.commentShowStatus;
						if(newContentState.blocks.length <= 2) {
							comments_data_state_array[self.state.currentCommentNum].comments_data = createEditorStateFromBackendData(newContentState);	
							let pk = comments_data_state_array[self.state.currentCommentNum].pk;			
							let temp_obj = self.state.commentShowStatus[pk];
							temp_obj.showButton = false;
							temp_obj.originalData = createEditorStateFromBackendData(newContentState);						
							
							temp_state[pk] = temp_obj;	

						} else {
							
							let temp_comment_obj = {
								entityMap: Object.assign({}, newContentState.entityMap),
								blocks: []
							};
							temp_comment_obj.blocks.push(newContentState.blocks[0]);
							temp_comment_obj.blocks.push(newContentState.blocks[1]);
							
							newContentState = createEditorStateFromBackendData(newContentState);
							
							comments_data_state_array[self.state.currentCommentNum].comments_data = newContentState;	
							let pk = comments_data_state_array[self.state.currentCommentNum].pk;			
							let temp_obj = self.state.commentShowStatus[pk];
							temp_obj.isExpanded = true;
							temp_obj.showButton = true;						
							temp_obj.originalData = newContentState;
							temp_obj.trimmedData = createEditorStateFromBackendData(temp_comment_obj);					;
							
							temp_state[pk] = temp_obj;		
						}
						
						self.setState({
							comments_data_state: comments_data_state_array,
							showModal: false,
							commentShowStatus: temp_state
						})
					}
				})
				.catch(function (error) {
					//console.log(error);
					self.setState({
						showError: "block", errorMsg: error.message // "Sorry...an error occurred while submitting!!"
					})
				});
			}
	}

	openDeletionModal(type, e) {
		this.setState({
			showCommonModal: true,
			deletionPostType: type.type,
			deletionCommentId: type.pk,
			modalHeading: (type.type == "post") ? "Delete Post" : "Delete Answer",
			modalBodyText: <div>
				<div>Do you want to delete this {type.type == "post"? "Post":"Answer"} ?</div><br />
				<PrimaryButton 
					onButtonClick={this.deletePost}
					buttonText="Yes"
				/>
			</div>
		});
	}

	deletionInProgress() {
		this.setState({
			modalBodyText: <div>
				<div>Do you want to delete this post ?</div><br />
				<Preloader loaderMessage="Deleting..."/>
			</div>
		})
	}

	closeDeletionModal() {
		this.setState({ showCommonModal: false });
	}

	deletePost() {
		//console.log("deleting :",this.props.id)
		let self = this;
		this.deletionInProgress()
		return axios.post(URL_TEXT + "deletepost/", {
			post_type: self.state.deletionPostType,
			post_id: self.props.id,
			comment_id: self.state.deletionCommentId,
			refresh_required: true,
			timeline: this.props.timeline,
			sortOrder: this.props.sortOrder,
			posttype: this.props.filterPostType
		}).then(function (response) {
			return response.data
		}).then(function (data) {
			self.setState({ showCommonModal: false })
			//console.log("after deletion data",data)
			self.props.dispatch({ type: "setPostsListState", data: data });
			self.props.isIndividualPost ? self.props.dispatch(getPostById(self.props.id)) : null
		}).catch(function (error) {
			//console.log(error);
			self.setState({ showCommonModal: true, modalHeading: "Oops!!!", modalBodyText: error.message });
		})
	}

	addLikeOrDislike(actionType, actionLikeOrDislike, e) {
		let self = this;
		let likeOrDislike = actionLikeOrDislike;
		if (likeOrDislike == "like") {
			if (actionType == "add") {
				this.setState((prevState) => {
					return {
						is_useful_count: prevState.is_useful_count + 1,
						liked_or_not: "like"
					}
				})
			}
			else if (actionType == "remove") {
				this.setState((prevState) => {
					return {
						is_useful_count: prevState.is_useful_count - 1,
						liked_or_not: null
					}
				})
			}
			else if (actionType == "addRemove") {
				this.setState((prevState) => {
					return {
						is_useful_count: prevState.is_useful_count + 1,
						is_not_useful_count: prevState.is_not_useful_count - 1,
						liked_or_not: "like"
					}
				})
			}
		}

		else if (likeOrDislike == "dislike") {
			if (actionType == "add") {
				this.setState((prevState) => {
					return {
						is_not_useful_count: prevState.is_not_useful_count + 1,
						liked_or_not: "dislike"
					}
				})
			}
			else if (actionType == "remove") {
				this.setState((prevState) => {
					return {
						is_not_useful_count: prevState.is_not_useful_count - 1,
						liked_or_not: null
					}
				})
			}
			else if (actionType == "addRemove") {
				this.setState((prevState) => {
					return {
						is_not_useful_count: prevState.is_not_useful_count + 1,
						is_useful_count: prevState.is_useful_count - 1,
						liked_or_not: "dislike"
					}
				})
			}
		}

		return axios.post(URL_TEXT + 'addlikedislike/', {
			post_id: self.props.id,
			actionType: actionType,
			likeOrDislike: likeOrDislike,
			refresh_required: false
		}
		).then(function (response) {
			return response.data;
		}).then(function (data) {
			// self.props.dispatch({ type: "setPostsListState", data: data });
		}).catch(function (error) {
			//console.log("error");
		})
	}



	render() {
		// console.log("PostTextHolderIndividualController:: Props", this.props)
		
		let renderElement = <PostsTextHolder {...this.props} 
			changePostPrivacy={this.changePostPrivacy} 
			postPrivacyCheckBoxStatus={this.state.postPrivacyCheckBoxStatus}
			open={this.open} post_body_state={this.state.post_body_state}
			comments_data_state={this.state.comments_data_state} openDeletionModal={this.openDeletionModal}
			addLikeOrDislike={this.addLikeOrDislike} is_useful_count={this.state.is_useful_count}
			is_not_useful_count={this.state.is_not_useful_count} liked_or_not={this.state.liked_or_not}
			is_post_owner={this.state.is_post_owner}
			numberOfComments={this.state.numberOfComments}
			isExpanded={this.state.isExpanded}
			switchExpandedStatus={this.switchExpandedStatus}
			isIndividualPost={this.props.isIndividualPost ? true : false}
			tagsFinal={this.state.tagsFinal}
			commentShowStatus={this.state.commentShowStatus}
			refreshContent={this.refreshContent}
			editedBody={this.state.editedBody}
			isEditModal={this.state.isEditModal}
			refreshPost={this.props.refreshPost}
			onViewPost={this.props.onViewPost}
		/>

		if (!(this.props.is_visible_everyone) && !(this.props.is_community_owner) && !(this.state.is_post_owner)
			&& !(this.props.is_community_internal_counsellor) && !(this.props.is_community_external_counsellor)) {
			renderElement = null;
		}

		return (
			<div>
				{renderElement}

				<PostEditingModal
					{...this.props} {...this.state}
					close={this.close}
					onToggleCheckbox={this.onToggleCheckbox}
					onChangeSelect={this.onChangeSelect}
					onEditorStateChange={this.onEditorStateChange}
					submitPost={this.state.submitPost}
					setSelectedTags={this.setSelectedTags}
					selectedTags={this.state.tagsSelected}
					editorHeight={"200px"}
				/>

				<CommonModal
					showModal={this.state.showCommonModal}
					close={this.closeDeletionModal}
					deletePost={this.deletePost}
					modalHeading={this.state.modalHeading}
					modalBody={this.state.modalBodyText}
					isEditModal={this.state.isEditModal}
				/>
			</div>
		)
	}
}

let mapStateToProps = (store) => {
	return {

	}
}

export default connect(mapStateToProps)(PostTextHolderIndividualController);