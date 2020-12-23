import React from 'react';
import { connect } from 'react-redux';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import axios from 'axios';

import BlogWritingContainer from '../presentationalcomponents/BlogWritingContainer.js'
import { getTagsList } from './action'
import { Event } from '../../actionTracking/actionTracking'

import CommonModal from '../../shared/CommonModal'
import { handleQuotesInEditor } from '../../HelperFunctions/handleQuotesInEditor'
import { URL_TEXT } from '../../GlobalConstants'


class BlogWritingController extends React.Component {
    constructor(props) {
        super(props);
        const plainText = '';
        const content = ContentState.createFromText(plainText);

        this.state = {
            editorState: EditorState.createWithContent(content),
            postType: "Question",
            communitySelect: "0",
            anonymousOption: true,
            communitySelectOption: true,
            buttonText: "Ask",
            anonymousCheck: false,
            showModal: false,
            switchToEditView: false,
            tagsSelected: [],
            postSubmitStatus:0,
            showInterestsIntroPanel: true,
            showCommunityIntroPanel: true
        };

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.submitPost = this.submitPost.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.onSetEditView = this.onSetEditView.bind(this);
        this.onUnsetEditView = this.onUnsetEditView.bind(this);
        this.setSelectedTagsList = this.setSelectedTagsList.bind(this);

        this.postSubmitInProgress = this.postSubmitInProgress.bind(this) 
        this.postSubmitReset = this.postSubmitReset.bind(this)        
		this.getWriteAccess = this.getWriteAccess.bind(this);
    }

    componentWillMount(){
		this.props.dispatch(getTagsList())
    }

    componentWillReceiveProps(nextProps) {
        nextProps.userProfileTags ?
            (Object.values(nextProps.userProfileTags.hobbies).length > 2 ?
                this.setState({
                    showInterestsIntroPanel: false, 
                }) :
                null) :
            null
        
        if(nextProps.communityListState && nextProps.communityListState.length > 0) {
            this.setState({
                showCommunityIntroPanel: false, 
            })
        }

        if(nextProps.communityDetails) {
            for(let community of nextProps.communityDetails) {
                if(community.request_status) {
                    this.setState({
                        showCommunityIntroPanel: false, 
                    })
                    return;
                }
            }
        }
    }

    componentDidMount() {
        // console.log("dlsfi:: ", this.refs.new_user_interest_form.getBoundingClientRect());
        if (this.refs.new_user_interest_form) {
            this.props.dispatch({ type: 'new_user_interest_form', data: this.refs.new_user_interest_form.getBoundingClientRect() })
        }
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

    setSelectedTagsList(tagsList){
        //console.log("tagsSelected::state",this.state.tagsSelected)
        //console.log("tagsSelected::",tagsList)
        let newTagsList = this.state.tagsSelected
        this.setState({tagsSelected:tagsList})
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
        // this.setState({anonymousCheck : !(this.state.anonymousCheck)})
    }

    postSubmitInProgress() {
        this.setState({postSubmitStatus: 2})
    }

    postSubmitReset() {
        this.setState({postSubmitStatus: 0})
    }

    submitPost() {
        Event("ASK_QUESTION", "User Submit Initiate", "UserId: " + this.props.userId)
        this.props.trackSubmitPost ? this.props.trackSubmitPost() : null;
        // console.log("submitting here===================================");
        let editorStateSubmit = this.state.editorState;
        let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
        let postTypeState = this.state.postType;
        let communitySelectState = this.state.communitySelect;
        if (communitySelectState === "0") {
            Event("ASK_QUESTION", "User Submit Error", "Community Not Selected")
            this.setState({ showModal: true, modalHeading: "Oops!", modalBodyText: "Please select a community" });
            return false;
        }
        let anonymousCheck = this.state.anonymousCheck
        let tagIdList = []
        for(let i=0; i < this.state.tagsSelected.length; i++){
            tagIdList.push(this.state.tagsSelected[i].id)
        }

        //console.log("editorStateSubmit", contentState)
        //console.log("postTypeState", postTypeState)
        //console.log("communitySelectState", communitySelectState);
        //console.log("anonymousCheck", anonymousCheck);
        //console.log("tagIdList", tagIdList);
        
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
            Event("ASK_QUESTION", "User Submit Error", "Empty Content")
            self.setState({ 
                showModal: true, 
                modalHeading: "Oops!", 
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
                    Event("ASK_QUESTION", "User Submit Success", "UserId: " + self.props.userId)
                    self.postSubmitReset()
                    self.setState({
                        showModal: true, modalHeading: "Successful!", 
                        modalBodyText: self.props.previewQuestion 
                                            ? "Your query was successfully submitted! You can view your asked query in the home page."
                                            : "Your Post Was Successfully Submitted!",
                        editorState: EditorState.createWithContent(ContentState.createFromText('')),
                        tagsSelected : [],
                    });
                    self.props.dispatch({type: "setPostsListState", data: data});
                    self.props.dispatch({type: "timeline", data: "all"})
                    self.props.dispatch({type: "yourPostType", data: "all"})
                    self.props.dispatch({type: "sortOrder", data: "DESC"})              
                })
                .catch(function (error) {
                    //console.log(error);
                    Event("ASK_QUESTION", "User Submit Error", error.message)
                    self.postSubmitReset()
                    self.setState({
                        showModal: true, modalHeading: "Oops!", modalBodyText: error.message // "Sorry...an error occurred while submitting!!"
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

    getWriteAccess() {
        return true;
    }

    render() {
        // console.log("Communities Select Props in Write Question : ", this.props);

        let modalBody = <div style={{textAlign: 'center'}} className="display-card-description">
                            {this.state.modalBodyText}
                        </div>

        let content =   this.props.communityListState && this.props.communityListState.length > 0 ?
                            <div>
                                <BlogWritingContainer onEditorStateChange={this.onEditorStateChange} 
                                    {...this.state} {...this.props} 
                                    submitPost={this.submitPost} 
                                    previewQuestion={this.props.previewQuestion}
                                    onChangeSelect={this.onChangeSelect} 
                                    onToggleCheckbox={this.onToggleCheckbox}
                                    placeholder=" Ask a question for Guidance from Experts..."
                                    onSetEditView={this.onSetEditView} 
                                    onUnsetEditView={this.onUnsetEditView}
                                    setSelectedTags={this.setSelectedTagsList}
                                    selectedTags={this.state.tagsSelected}
                                    submitStatus={this.state.postSubmitStatus} />

                                <CommonModal
                                    modalHeading={this.state.modalHeading}
                                    modalBody={modalBody}
                                    close={this.close} showModal={this.state.showModal} />
                            </div> :
                            null 
        return (
            content
        );
    }
}

let mapStateToProps = (store) => {
    return {
        communityListState: store.appDataReducer.communityListStateMemberOnly,
        tagsList: store.appDataReducer.tagsListState,        
        userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
        userName : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.first_name : null),
        is_mentor: (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.is_mentor : false),
        userProfileTags: store.userProfileReducer.userProfileTags,
        highlight: store.stylesDataReducer.highlight,
        communityDetails : store.appDataReducer.communityListState
    }
}

export default connect(mapStateToProps)(BlogWritingController);