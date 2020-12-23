import React from 'react';
import { connect } from 'react-redux';
import { convertToRaw, EditorState, ContentState } from 'draft-js';

import DiscussionPostWriting from '../presentationalComponents/DiscussionPostWriting.js'
import { addUpdatePostToDiscussionRoom, getDiscussionGroupPostsStatsCount } from './action.js';
import { handleQuotesInEditor } from '../../HelperFunctions/handleQuotesInEditor'


class DiscussionPostWritingController extends React.Component {
    constructor(props) {
        super(props);
        const plainText = '';
        const content = ContentState.createFromText(plainText);

        this.state = {
            editorState: EditorState.createWithContent(content),
            postType: "Question",
            buttonText: "Ask",
            postSubmitStatus: 0,
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
        this.nextForm = this.nextForm.bind(this);
    }

    componentWillMount() {
        // this.props.dispatch(getTagsList())
    }

    componentWillReceiveProps(nextProps) {
        nextProps.userProfileTags ?
            (Object.values(nextProps.userProfileTags.hobbies).length > 0 ?
                this.setState({ introFormStatus: 1 }) :
                null) :
            null
    }

    componentDidMount() {
        this.discussionGroupId = this.props.match.params
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

    setSelectedTagsList(tagsList) {
        //console.log("tagsSelected::state",this.state.tagsSelected)
        //console.log("tagsSelected::",tagsList)
        let newTagsList = this.state.tagsSelected
        this.setState({ tagsSelected: tagsList })
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
        this.setState({ postSubmitStatus: 2 })
    }

    postSubmitReset() {
        this.setState({ postSubmitStatus: 0 })
    }

    submitPost() {
        // console.log("submitting here===================================");

        this.props.trackSubmitPost ? this.props.trackSubmitPost() : null;
        let editorStateSubmit = this.state.editorState;
        let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
        let postTypeState = this.state.postType;
        let communitySelectState = this.state.communitySelect;
        if (communitySelectState == "0") {
            this.setState({
                showModal: true,
                modalHeading: "Oops!!!",
                modalBodyText: "Please select a community"
            });
            return false;
        }
        let anonymousCheck = this.state.anonymousCheck

        // let tagIdList = []
        // for(let i=0;i<this.state.tagsSelected.length;i++){
        //     tagIdList.push(this.state.tagsSelected[i].id)
        // }

        // console.log("editorStateSubmit", contentState)
        //console.log("postTypeState", postTypeState)
        //console.log("communitySelectState", communitySelectState);
        //console.log("anonymousCheck", anonymousCheck);
        //console.log("tagIdList", tagIdList);

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

        this.postSubmitInProgress()

        let addUpdatePost = this.props.dispatch(addUpdatePostToDiscussionRoom(this.props.groupId,
            newContentState, this.props.communityId, null))

        return addUpdatePost.then(function (data) {
            // console.log("******Response from server: ", data);
            self.postSubmitReset()
            self.setState({
                showModal: true, modalHeading: "Successful!!!", modalBodyText: "Your Post Was Successfully Submitted!!",
                editorState: EditorState.createWithContent(ContentState.createFromText('')),
                tagsSelected: [],
            });
            self.props.dispatch(getDiscussionGroupPostsStatsCount(self.props.groupId));
            self.props.dispatch({ type: "setPostsListState", data: data });
        })
        .catch(function (error) {
            //console.log(error);
            self.postSubmitReset()
            self.setState({
                showModal: true, modalHeading: "Oops!!!", modalBodyText: error.message // "Sorry...an error occurred while submitting!!"
            })
        });

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

    nextForm() {
        this.setState({ introFormStatus: this.state.introFormStatus + 1 })
    }

    render() {
        // console.log("Communities Select Props in Write Question : ", this.props);

        return (
            <DiscussionPostWriting onEditorStateChange={this.onEditorStateChange}
                submitPost={this.submitPost}
                onChangeSelect={this.onChangeSelect}
                {...this.props}  {...this.state}
                onToggleCheckbox={this.onToggleCheckbox}
                placeholder=" Post a question to discuss with Group Members"
                onSetEditView={this.onSetEditView}
                onUnsetEditView={this.onUnsetEditView}
            />
        );
    }
}

let mapStateToProps = (store) => {
    return {
        userId: (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
    }
}

export default connect(mapStateToProps)(DiscussionPostWritingController);