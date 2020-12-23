import React from 'react';
import {connect} from 'react-redux';
import { convertToRaw ,EditorState, ContentState} from 'draft-js';
import WriteBlogPageContainer from '../presentationalcomponents/WriteBlogPageContainer.js'
import axios from 'axios';
import {URL_TEXT} from '../../GlobalConstants'
import CommonModal from '../../shared/CommonModal'
import {handleQuotesInEditor} from '../../HelperFunctions/handleQuotesInEditor'

class EditBlogController extends React.Component{
   constructor(props){
    super(props);
    const plainText = '';
    const content = ContentState.createFromText(plainText);

    this.state = { editorState: EditorState.createWithContent(content),
                    postType : "Blog",
                    communitySelect : "everyone",
                    anonymousOption : false,
                    anonymousCheck : false,
                    showModal: false ,
                    communitySelectOption : true,
                    buttonText : "Post",
                    switchToEditView: false,
                    postSubmitStatus:0,
                };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.onSetEditView = this.onSetEditView.bind(this);
    this.onUnsetEditView = this.onUnsetEditView.bind(this);

    this.postSubmitInProgress = this.postSubmitInProgress.bind(this) 
    this.postSubmitReset = this.postSubmitReset.bind(this)
}

onSetEditView(){
    this.setState({switchToEditView:true})
}

onUnsetEditView(){
    this.setState({switchToEditView:false})
}
  
  onEditorStateChange = (editorState) => {
    this.setState({
    editorState
  });
}

onChangeSelect(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}

onToggleCheckbox(e){
    this.setState({
        anonymousCheck : !(this.state.anonymousCheck)
    })
}

postSubmitInProgress() {
    this.setState({postSubmitStatus:2})
}

postSubmitReset() {
    this.setState({postSubmitStatus:0})
}

submitPost(){
        //console.log("submitting!!!");
        let editorStateSubmit = this.state.editorState;
        let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
        let postTypeState = this.state.postType;
        let communitySelectState = this.state.communitySelect;
        let anonymousCheck = this.state.anonymousCheck
        //console.log("editorStateSubmit", contentState)
        //console.log("postTypeState", postTypeState)
        //console.log("communitySelectState", communitySelectState);
        let self = this;

        let i = 0;
        while(i < contentState.blocks.length){
            if(contentState.blocks[i].text != ""){
                break;
            }
            else if(i == contentState.blocks.length - 1){
                //console.log("returning false");
                self.setState({showModal:true, modalHeading : "Oops!!!" , modalBodyText : "You cannot submit empty content!"});
                return false;
            }
            i++;
        }

        contentState = handleQuotesInEditor(contentState);

        this.postSubmitInProgress()

		return axios.post(URL_TEXT + 'submitposts/', {
			editorStateSubmit : contentState,
            postTypeState : postTypeState,
            communitySelectState : communitySelectState,
            anonymousCheck : anonymousCheck,
            refresh_required : true,
            timeline: "month",
            sortOrder: "DESC"
		})
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
                self.postSubmitReset()
				self.setState({showModal:true, modalHeading : "Successful!!!" , modalBodyText : "Your Post Was Successfully Submitted!!",
                    editorState: EditorState.createWithContent(ContentState.createFromText(''))
                })
			})
			.catch(function (error) {
				//console.log(error);
                self.postSubmitReset()
                self.setState({showModal:true, modalHeading : "Oops!!!" , modalBodyText : error.message // "Sorry...an error occurred while submitting!!"
                })
			});
	}

    close() {
	    this.setState({ showModal: false });
	}

	open() {
	    this.setState({ showModal: true });
	}

    render(){
        let modalBody = <span>{this.state.modalBodyText}</span>

       return(
        <div>
        <WriteBlogPageContainer onEditorStateChange = {this.onEditorStateChange} submitPost={this.submitPost}
         {...this.props} onChangeSelect = {this.onChangeSelect} {...this.state} onToggleCheckbox={this.onToggleCheckbox}
         communitiesOptions={this.props.match.params.shareOptions} 
         onSetEditView={this.onSetEditView} onUnsetEditView={this.onUnsetEditView}
         placeholder="Write your thoughts here..."
         submitStatus={this.state.postSubmitStatus} />

          <CommonModal
            modalHeading= {this.state.modalHeading}
            modalBody={modalBody} 
            close={this.close} showModal={this.state.showModal}/>
            </div>
        );
    }
}

let mapStateToProps = (store) => {
    return {communityListState : store.appDataReducer.communityListStateMemberOnly,
            tagsList: store.appDataReducer.tagsListState}
}

export default connect(mapStateToProps)(EditBlogController);