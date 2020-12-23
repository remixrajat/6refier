import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import { Redirect } from 'react-router-dom'

import WriteBlogPageContainer from '../presentationalcomponents/WriteBlogPageContainer.js'
import { getTagsList } from '../../dashboardpage/conditionalcomponents/action'
import { handleQuotesInEditor } from '../../HelperFunctions/handleQuotesInEditor'

import CommonModal from '../../shared/CommonModal'
import { URL_TEXT } from '../../GlobalConstants'


class WriteBlogPageController extends React.Component {
    constructor(props) {
        super(props);
        const plainText = '';
        const content = ContentState.createFromText(plainText);

        this.state = {
            editorState: EditorState.createWithContent(content),
            postType: "Blog",
            communitySelect: "everyone",
            anonymousOption: false,
            anonymousCheck: false,
            showModal: false,
            communitySelectOption: true,
            buttonText: "Post",
            switchToEditView: false,
            blogTitle: "",
            tagsSelected: [],
            postSubmitStatus: 0,
            showNoticeOption: true,
            isNoticeCheck: false
        };

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.submitPost = this.submitPost.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.onSetEditView = this.onSetEditView.bind(this);
        this.onUnsetEditView = this.onUnsetEditView.bind(this);
        this.setBlogTitle = this.setBlogTitle.bind(this);
        this.setSelectedTagsList = this.setSelectedTagsList.bind(this);
        this.postSubmitInProgress = this.postSubmitInProgress.bind(this) 
        this.postSubmitReset = this.postSubmitReset.bind(this)
        this.onToggleNoticeCheckbox = this.onToggleNoticeCheckbox.bind(this)
    }

    componentWillMount() {
        this.props.dispatch(getTagsList())
    }

    onSetEditView() {
        this.setState({ switchToEditView: true })
    }

    onUnsetEditView() {
        this.setState({ switchToEditView: false })
    }

    setBlogTitle(e) {
        // //console.log("setBlogTitle", e.target.value);
        this.setState({ blogTitle: e.target.value });
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

    setSelectedTagsList(tagsList) {
        //console.log("tagsSelected::state",this.state.tagsSelected)
        //console.log("tagsSelected::",tagsList)
        let newTagsList = this.state.tagsSelected
        this.setState({ tagsSelected: tagsList })
    }

    onToggleCheckbox(e) {
        this.setState({
            anonymousCheck: !(this.state.anonymousCheck)
        })
    }

    onToggleNoticeCheckbox(e) {
        this.setState({
            isNoticeCheck: !(this.state.isNoticeCheck)
        })
    }


    postSubmitInProgress() {
        this.setState({postSubmitStatus:2})
    }

    postSubmitReset() {
        this.setState({postSubmitStatus:0})
    }

    submitPost() {
        //console.log("submitting!!!");
        let editorStateSubmit = this.state.editorState;
        let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
        let postTypeState = this.state.postType;
        let communitySelectState = this.state.communitySelect;
        let anonymousCheck = this.state.anonymousCheck;
        let blogTitle = this.state.blogTitle;
        let noticeCheck = this.state.isNoticeCheck

        if(noticeCheck)
            postTypeState = "Notices"

        if(blogTitle.trim() === '') {
            this.setState({ 
                showModal: true, 
                modalHeading: "Oops!!!", 
                modalBodyText: "You cannot submit post without a title!",
            });
            return false;
        }

        let tagIdList = []
        for (let i = 0; i < this.state.tagsSelected.length; i++) {
            tagIdList.push(this.state.tagsSelected[i].id)
        }

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
                showModal: true, 
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
                title: blogTitle,
                refresh_required: true,
                tag_id_list: tagIdList,
                timeline: "month",
                sortOrder: "DESC"
            })
                .then(function (response) {
                    //console.log("******Response from server:", response);
                    return response.data;
                }).then(function (data) {
                    //console.log("******Response from server: ", data);
                    // self.postSubmitReset()
                    self.setState({
                        showModal: true, 
                        modalHeading: "Successful!!!", 
                        modalBodyText: "Your Post Was Successfully Submitted!!",
                        editorState: EditorState.createWithContent(ContentState.createFromText('')),
                        tagsSelected: [],
                        blogTitle: "",
                        postSubmitStatus: 1
                    })
                })
                .catch(function (error) {
                    //console.log(error);
                    self.postSubmitReset()
                    self.setState({
                        showModal: true, modalHeading: "Oops!!!", modalBodyText: error.message // "Sorry...an error occurred while submitting!!"
                    })
                });
        }
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }


    render() {
        let modalBody = <span style={{textAlign: 'center'}}>{this.state.modalBodyText}</span>

        return (
            this.state.postSubmitStatus === 1 ?
                <Redirect to="/userDashboard/blog/read/" /> :
                <div>
                    <WriteBlogPageContainer onEditorStateChange={this.onEditorStateChange} 
                        submitPost={this.submitPost} {...this.props} 
                        onChangeSelect={this.onChangeSelect} {...this.state} 
                        onToggleCheckbox={this.onToggleCheckbox}
                        communitiesOptions={this.props.match.params.shareOptions}
                        onSetEditView={this.onSetEditView} onUnsetEditView={this.onUnsetEditView}
                        setBlogTitle={this.setBlogTitle} blogTitle={this.state.blogTitle}
                        placeholder="Write your thoughts here..."
                        setSelectedTags={this.setSelectedTagsList}
                        selectedTags={this.state.tagsSelected} 
                        isNoticeCheck={this.state.isNoticeCheck} 
                        onToggleNoticeCheckbox={this.onToggleNoticeCheckbox} 
                        submitStatus={this.state.postSubmitStatus}/>
                    <CommonModal
                        modalHeading={this.state.modalHeading}
                        modalBody={modalBody}
                        close={this.close} showModal={this.state.showModal} />
                </div>
        );
    }
}

let mapStateToProps = (store) => {
    return {
        communityListState: store.appDataReducer.communityListStateMemberOnly,
        tagsList: store.appDataReducer.tagsListState
    }
}

export default connect(mapStateToProps)(WriteBlogPageController);