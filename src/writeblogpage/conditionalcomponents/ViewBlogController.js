import React from 'react';
import { connect } from 'react-redux';
import { convertToRaw, EditorState, ContentState, convertFromRaw } from 'draft-js';
import axios from 'axios'

import ViewBlogPageContainer from '../presentationalcomponents/ViewBlogPageContainer.js'
import EditBlogPageContainer from '../presentationalcomponents/EditBlogPageContainer'
import { handleQuotesInEditor } from '../../HelperFunctions/handleQuotesInEditor'
import { createEditorStateFromBackendData } from '../../HelperFunctions/createEditorStateFromBackendData'
import { 
    getPostsDataListByUser, 
    getPostsDataList, 
    getPostById, 
    getPostsSuggestions } from '../../shared/TextDisplayPanels/conditionalcomponents/action'
import { Grid, Col } from 'react-bootstrap'
import PostTextHolderIndividualController from
'../../shared/TextDisplayPanels/conditionalcomponents/PostTextHolderIndividualController'
import { getCommunityNameFromId } from '../../HelperFunctions/getCommunityNameFromId'

import CommonModal from '../../shared/CommonModal'
import { URL_TEXT } from '../../GlobalConstants'


class ViewBlogController extends React.Component {
    constructor(props) {
        super(props);
        let plainText = '';
        let content = ContentState.createFromText(plainText);

        this.state = {
            editorState: EditorState.createWithContent(content),
            blog: null,
            is_useful_count: 0,
            is_not_useful_count: 0,
            liked_or_not: "",
            post_owner: false,
            postType: "Blog",
            communitySelect: "everyone",
            anonymousOption: false,
            anonymousCheck: false,
            communitySelectOption: true,
            buttonText: "Update Blog",
            switchToEditView: false,
            tagsSelected: [],
            tagsFinal:[],
            showAlert: false,
            strongAlert: "",
            lightAlert: "",
            blogTitle: "",
            tag_values: null,
            showCommonModal:false,
            isUpdating:false,
            modalHeading:"",
            modalBodyText:"",
            postSubmitStatus:0,
            editMode: false
        };

        this.setContent = this.setContent.bind(this)
        this.setOwner = this.setOwner.bind(this)
        this.addLikeOrDislike = this.addLikeOrDislike.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
        this.onSetEditView = this.onSetEditView.bind(this);
        this.onUnsetEditView = this.onUnsetEditView.bind(this);
        this.submitEditedPost = this.submitEditedPost.bind(this);
        this.setBlogTitle = this.setBlogTitle.bind(this);
        this.refreshPost = this.refreshPost.bind(this)
        this.setSelectedTagsList = this.setSelectedTagsList.bind(this)
        this.isUpdating = this.isUpdating.bind(this)
        this.isUpdated = this.isUpdated.bind(this)
        this.openUpdateSuccessModal = this.openUpdateSuccessModal.bind(this)
        this.closeCommonModal = this.closeCommonModal.bind(this)
        this.postSubmitInProgress = this.postSubmitInProgress.bind(this) 
        this.postSubmitReset = this.postSubmitReset.bind(this)
        this.toggleEditMode = this.toggleEditMode.bind(this)
        this.scrollToTop = this.scrollToTop.bind(this)
    }

    isUpdating(){
        this.setState({isUpdating:true})
    }

    isUpdated(){
        this.setState({isUpdating:false})
    }

    openUpdateSuccessModal(){
        this.setState({
            modalHeading:"Successful",
            modalBodyText:"Your Blog has been updated",
            showCommonModal:true,
        })
    }

    closeCommonModal(){
        this.setState({showCommonModal:false})
    }

    setBlogTitle(e) {
        // //console.log("setBlogTitle", e.target.value);
        this.setState({ blogTitle: e.target.value });
    }

    componentWillMount() {
        // console.log("Sending Dispatch Request")
        this.props.dispatch(getPostById(this.props.match.params.blogid))
        this.props.dispatch(getPostsSuggestions('Blog', 3))
    }
    
    componentDidMount() {
        document.body.classList.add("background-white");
        this.scrollToTop();
    }

    componentWillUnmount() {
        document.body.classList.remove("background-white");
    }

    componentWillReceiveProps(nextProps) {
        // console.log("ViewBlogController::componentWillReceiveProps Inside receive props", nextProps);
        if (!this.props.post && nextProps.post) {
            // console.log("ViewBlogController::Inside receive props",nextProps.post)
            this.setContent(nextProps.post[0].fields.post_body, nextProps.post[0])
            this.setState({ 
                blogTitle: nextProps.post[0].fields.post_title, 
                postType: nextProps.post[0].fields.post_type 
            })
        }
        else if (this.props.post && nextProps.post) {
            // console.log("ViewBlogController::componentWillReceiveProps Else if 1 Inside receive props");
            this.setContent(nextProps.post[0].fields.post_body, nextProps.post[0])
            this.setState({ blogTitle: nextProps.post[0].fields.post_title })
        }
        else if (!this.props.userProfile && nextProps.userProfile) {
            // console.log("ViewBlogController::componentWillReceiveProps Else if 2 Inside receive props",nextProps.userProfile)
            this.setOwner(nextProps.userProfile)
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) {         
            this.props.dispatch(getPostById(this.props.match.params.blogid))
                .then((response) => {
                    if(response === 1) {
                        this.scrollToTop();
                    }
                })  
        }
    }

    scrollToTop() {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.requestAnimationFrame(this.scrollToTop);
          window.scrollTo(0, c - c / 10);
        }
    }

    refreshPost() {
        //console.log("Sending Dispatch Request again")
        this.props.dispatch(getPostById(this.props.match.params.blogid))
    }

    onSetEditView() {
        this.setState({ switchToEditView: true })
    }

    onUnsetEditView() {
        this.setState({ switchToEditView: false })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    }

    onChangeSelect(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onToggleCheckbox(e) {
        this.setState({
            anonymousCheck: !(this.state.anonymousCheck)
        })
    }


    setContent(plainText, selectedBlog) {
        let owner = this.props.userProfile ? this.props.userProfile.userId === selectedBlog.fields.post_owner.userId_id ?
            true : false : false
        let select = selectedBlog.fields.community_name ? selectedBlog.fields.community_name : "everyone"
        let postTags = []
        let tagValues = []
        if (selectedBlog.fields.tag_values) {
			let tag_values = JSON.parse(selectedBlog.fields.tag_values)
			for (let i = 0; i < tag_values.length; i++) {
				let tag = {}
				tag['value'] = tag_values[i].fields.tag_name
				tag['label'] = tag_values[i].fields.tag_name
				tag['id'] = tag_values[i].pk
				postTags.push(tag)
				tagValues.push(tag)
			}
		}

        this.setState({
            editorState: createEditorStateFromBackendData(plainText),
            blog: selectedBlog,
            is_useful_count: selectedBlog.fields.is_useful_count,
            is_not_useful_count: selectedBlog.fields.is_not_useful_count,
            liked_or_not: selectedBlog.fields.liked_or_not,
            post_owner: owner,
            communitySelect: select,
            tag_values: selectedBlog.fields.tag_values,
            tagsSelected: tagValues,
            tagsFinal: postTags
        })
    }

    setSelectedTagsList(tagsList) {
        //console.log("tagsSelected::state",this.state.tagsSelected)
        //console.log("tagsSelected::",tagsList)
        let newTagsList = this.state.tagsSelected
        this.setState({ tagsSelected: tagsList })
    }

    setOwner(userProfile) {
        let owner = this.state.blog ? userProfile.userId === this.state.blog.fields.post_owner.userId_id ?
            true : false : false
        this.setState({
            post_owner: owner,
        })
    }

    addLikeOrDislike(actionType, actionLikeOrDislike, e) {
        //console.log("Clicked Action", actionType, e.target, actionLikeOrDislike)
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

        return axios.post(URL_TEXT + 'addlikedislikenoresp/', {
            post_id: self.state.blog.pk,
            actionType: actionType,
            likeOrDislike: likeOrDislike,
            refresh_required: false
        }
        ).then(function (response) {
            return response.data;
        }).then(function (data) {
            //console.log("Setting the action like", data)
            self.props.dispatch(getPostsDataListByUser("Blog"))
            self.props.dispatch(getPostsDataList(this.props.postType, false, this.props.sort, this.props.timeline))
            // self.props.dispatch({type : "setPostsListState" , data: data});
        }).catch(function (error) {
            //console.log("error");
        })
    }


    postSubmitInProgress() {
        this.setState({postSubmitStatus:2})
    }

    postSubmitReset() {
        this.setState({postSubmitStatus:0})
    }

    submitEditedPost() {
        // console.log("submitting!!!");
        this.isUpdating()
        let editorStateSubmit = this.state.editorState;
        let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
        let postTypeState = this.state.postType;
        let communitySelectState = this.state.communitySelect;
        let anonymousCheck = this.state.anonymousCheck
        let postId = this.state.blog.pk
        let blogTitle = this.state.blogTitle;

        if(blogTitle.trim() === '') {
            this.setState({ 
                showCommonModal: true, 
                modalHeading: "Oops!!!", 
                modalBodyText: "You cannot submit post without a title!",
            });
            return false;
        }
        
        let tagIdList = []
        for (let i = 0; i < this.state.tagsSelected.length; i++) {
            tagIdList.push(this.state.tagsSelected[i].id)
        }
        //console.log("editorStateSubmit", contentState)
        //console.log("postTypeState", postTypeState)
        //console.log("communitySelectState", communitySelectState);
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

            this.postSubmitInProgress()

            return axios.post(URL_TEXT + 'submitposts/', {
                editorStateSubmit: newContentState,
                postTypeState: postTypeState,
                communitySelectState: communitySelectState,
                anonymousCheck: anonymousCheck,
                postID: postId,
                title: blogTitle,
                refresh_required: false,
                tag_id_list: tagIdList,

            })
            .then(function (response) {
                //console.log("******Response from server:", response);
                return response.data;
            }).then(function (data) {
                //console.log("******Response from server: ", data);
                self.isUpdated()
                self.setState({
                    post_body_state: createEditorStateFromBackendData(newContentState),
                    tagsFinal: self.state.tagsSelected,
                    showAlert: true,
                    strongAlert: "Yay!!!", lightAlert: "Your blog has been updated!",
                    editMode: false,
                    editorState: createEditorStateFromBackendData(newContentState)
                })
                self.props.dispatch(getPostById(self.props.match.params.blogid))
                self.postSubmitReset()
                self.openUpdateSuccessModal()
                self.scrollToTop();
            })
            .catch(function (error) {
                //console.log(error);
                self.postSubmitReset()
                self.setState({
                    showError: "block", errorMsg: error.message // "Sorry...an error occurred while submitting!!"
                })
            });
        }
    }

    toggleEditMode() {
        this.setState({ editMode: !this.state.editMode })
    }

    render() {
        // console.log("ViewBlogController::View", this.props)

        let editor = {
            "color": "#42565B",
            "backgroundColor": "white" , 
            "paddingLeft": "10px", 
            "overflowY": "auto",
            "borderTopWidth": "0px",
            "lineHeight": "1.6",
            "fontSize": "1.25em",
            "letterSpacing": "0.01em"
        }

        let wrapper = { "borderRadius": "0em", "borderTopWidth": "0px" }

        let postsList
        let i = 0
        if (this.props.post)
            if (this.props.post.length != 0)
                postsList = this.props.post

        let comments_body = null
        if (this.props.post && this.props.userProfile && this.props.communityListState && this.props.tagsList) {
            if (this.props.post.length != 0) {
                comments_body = 
                <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                    <PostTextHolderIndividualController
                        id={this.props.post[0].pk}
                        is_community_owner={false}
                        is_community_internal_counsellor={this.props.post[0].fields.is_community_internal_counsellor}
                        is_community_external_counsellor={this.props.post[0].fields.is_community_external_counsellor}
                        post_owner={this.props.post[0].fields.post_owner}
                        post_date={this.props.post[0].fields.post_date}
                        is_mentor={this.props.userProfile.is_mentor}
                        userId={this.props.userProfile.pk}
                        comments={this.props.post[0].fields.comments}
                        post_body={this.props.post[0].fields.post_body}
                        is_visible_everyone={this.props.post[0].fields.is_visible_everyone}
                        post_type={this.props.post[0].fields.post_type}
                        is_anonymous={this.props.post[0].fields.is_anonymous}
                        communityListState={this.props.communityListState}
                        community_id={this.props.post[0].fields.community_name}
                        community_name={getCommunityNameFromId(this.props.post[0].fields.community_name, this.props.communityListState)}
                        is_useful_count_state={this.props.post[0].fields.is_useful_count}
                        is_not_useful_count_state={this.props.post[0].fields.is_not_useful_count}
                        liked_or_not_state={this.props.post[0].fields.liked_or_not}
                        isIndividualPost={true}
                        refreshPost={this.refreshPost}
                        tag_values={this.props.post[0].fields.tag_values}
                        tagsList={this.props.tagsList}
                        setSelectedTags={this.setSelectedTagsList}
                        selectedTags={this.state.tagsSelected}
                        onBlogPage={true}
                    />
                </Col>
            }
        }

        return (
            <Grid fluid style={{marginBottom: '50px'}}>
                <Col xsOffset={1} xs={10}>
                    {this.state.blog && this.props.communityListState ?
                        !this.state.editMode ?
                        <div>
                            <ViewBlogPageContainer
                                editor={editor}
                                wrapper={wrapper}
                                editorState={this.state.editorState}
                                blog={this.state.blog}
                                userProfile={this.props.userProfile}
                                is_useful_count={this.state.is_useful_count}
                                is_not_useful_count={this.state.is_not_useful_count}
                                liked_or_not={this.state.liked_or_not}
                                addLikeOrDislike={this.addLikeOrDislike}
                                tag_values={this.state.tag_values}
                                tagsList={this.props.tagsList}
                                history={this.props.history}      
                                post_owner={this.state.post_owner}       
                                toggleEditMode={this.toggleEditMode}       
                                suggestions={this.props.suggestedPosts}            
                                isNotice={this.state.postType === "Notices"}
                            />
                            {comments_body}
                        </div>
                            :
                            <div>
                                <EditBlogPageContainer
                                    editor={editor}
                                    wrapper={wrapper}
                                    editorState={this.state.editorState}
                                    blog={this.state.blog}
                                    userProfile={this.props.userProfile}
                                    is_useful_button={false}
                                    is_useful_count={this.state.is_useful_count}
                                    is_not_useful_count={this.state.is_not_useful_count}
                                    liked_or_not={this.state.liked_or_not}
                                    addLikeOrDislike={this.addLikeOrDislike}
                                    tag_values={this.state.tag_values}
                                    tagsList={this.props.tagsList}
                                    tagsFinal={this.state.tagsFinal}
                                    setSelectedTags={this.setSelectedTagsList}
                                    selectedTags={this.state.tagsSelected}
                                    onEditorStateChange={this.onEditorStateChange}
                                    submitPost={this.submitEditedPost}
                                    communityListState={this.props.communityListState}
                                    onChangeSelect={this.onChangeSelect}
                                    {...this.state}
                                    onToggleCheckbox={this.onToggleCheckbox}
                                    communitiesOptions="ALL"
                                    onSetEditView={this.onSetEditView} onUnsetEditView={this.onUnsetEditView}
                                    setBlogTitle={this.setBlogTitle} blogTitle={this.state.blogTitle}
                                    placeholder="Write your thoughts here..." 
                                    isUpdating={this.state.isUpdating}
                                    submitStatus={this.state.postSubmitStatus} 
                                    history={this.props.history}
                                    toggleEditMode={this.toggleEditMode}
                                />
                            </div>
                        :
                        null
                    }
                </Col>

                <CommonModal
					showModal={this.state.showCommonModal}
					close={this.closeCommonModal}
					modalHeading={this.state.modalHeading}
					modalBody={this.state.modalBodyText}
				/>
            </Grid>
        );
    }
}

let mapStateToProps = (store) => {
    // console.log("View Store---------------", store);
    return {
        post: store.appDataReducer.individualQuestionState,
        // blogList: store.appDataReducer.postsListByUser,
        userProfile: store.userProfileReducer.profileFields,
        communityListState: store.appDataReducer.communityListStateMemberOnly,
        tagsList: store.appDataReducer.tagsListState,
        timeline: store.dashboardDataReducer.timeline,
        sort: store.dashboardDataReducer.sortOrder,
        postType: store.dashboardDataReducer.yourPostType,
        suggestedPosts: store.appDataReducer.suggestedPosts
    }
}

export default connect(mapStateToProps)(ViewBlogController);