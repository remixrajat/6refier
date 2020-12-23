import React from 'react';
import { connect } from 'react-redux';
import { convertToRaw, convertFromRaw, EditorState, ContentState } from 'draft-js';
import { Button } from 'react-bootstrap'
import axios from 'axios';
import { URL_TEXT } from '../../../GlobalConstants'
import TextEditor from '../../WriteBlog/presentationalcomponents/textEditor'
import CommonModal from '../../CommonModal'
import { handleQuotesInEditor } from '../../../HelperFunctions/handleQuotesInEditor'
import FontAwesome from 'react-fontawesome';
import { getPostById } from './action'
import Preloader from '../../Preloader/PreLoader'

class CommentsTextEditorController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: this.props.content,
            switchToEditView: false,
            commentSubmitStatus: 0,
        };

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.submitPost = this.submitPost.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.onSetEditView = this.onSetEditView.bind(this);
        this.onUnsetEditView = this.onUnsetEditView.bind(this);
        this.commentSubmitInProgress = this.commentSubmitInProgress.bind(this)
        this.commentSubmitReset = this.commentSubmitReset.bind(this)
    }

    componentWillReceiveProps(nextProps, prevProps) {
        this.setState({ editorState: nextProps.content })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    }

    onSetEditView() {
        this.setState({ switchToEditView: true })
    }

    onUnsetEditView() {
        this.setState({ switchToEditView: false })
    }

    commentSubmitInProgress() {
        this.setState({commentSubmitStatus:2})
    }

    commentSubmitReset() {
        this.setState({commentSubmitStatus:0})
    }


    submitPost() {
        // console.log("lets props", this.props);
        let editorStateSubmit = this.state.editorState;
        let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
        let postId = this.props.id;
        //console.log("postIdSubmit", postId)
            
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
                commentSubmitStatus: -1
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

        this.commentSubmitInProgress()

        return axios.post(URL_TEXT + 'submitcomments/', {
            comments: newContentState,
            postId: postId,
            refresh_required: true,
            timeline: self.props.timeline,
            sortOrder: self.props.sortOrder,
            posttype: self.props.filterPostType
        })
            .then(function (response) {
                // console.log("******Response from server:", response);
                return response.data;
            }).then(function (data) {
                // console.log("******Response data from server: ", data);
                self.commentSubmitReset()
                self.setState({
                    showModal: true, modalHeading: "Successful!!!", modalBodyText: "Your Comment is Successfully Submitted!!",
                    editorState: EditorState.createWithContent(ContentState.createFromText(''))
                });
                self.props.dispatch({ type: "setPostsListState", data: data });
                
		        self.props.isIndividualPost? self.props.dispatch(getPostById(self.props.id)) : null
            })
            .catch(function (error) {
                // console.log("Error in submitting comment ", error.message);
                self.setState({ modalHeading: "Oops!!!", modalBodyText: error.message ,
                    showModal: true,
                    commentSubmitStatus:-1 // "Sorry...an error occurred while submitting!!"
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
        // console.log("CommentsProps:", this.props);

        let modalBody = this.state.commentSubmitStatus!=-1 ? 
                        <span>{this.props.isBlog ?
                            "Your Comment on a blog is Successfully Submitted!!":
                            "Your Answer is Successfully Submitted!!"}</span>
                        : this.state.modalBodyText

        return (
            <div>
                {this.state.switchToEditView ?
                    <TextEditor
                        {...this.props} editorState={this.state.editorState}
                        onEditorStateChange={this.onEditorStateChange}
                        // onBlurFunction={this.onUnsetEditView}
                    /> :
                    <TextEditor
                        {...this.props} editorState={this.state.editorState}
                        onEditorStateChange={this.onEditorStateChange}
                        onFocusFunction={this.onSetEditView}
                        toolbarHidden={true} />
                }
                {this.props.showSubmitButton ?
                    this.state.commentSubmitStatus == 2 ?
                    <div style={{ "marginTop": "10px", "marginBottom": "10px" }}>    
                        <Preloader loaderMessage="Submitting Comment ..."/>
                    </div>    
                    :    
                    <div style={{ "marginTop": "10px", "marginBottom": "10px" , textAlign:'right' }}>
                        <Button
                            bsStyle="primary" bsSize="small"
                            className="refier_custom_button_save"
                            onClick={(e) => { this.submitPost(); e.target.blur(); }}>
                            <span>
                                <FontAwesome
                                    name="check"
                                />
                            </span>
                            <span style={{ marginLeft: "10px" }}>
                                {this.props.isBlog? "Reply" : "Submit Answer"}
                            </span>
                        </Button>
                    </div>
                    : null
                }

                <CommonModal
                    modalHeading={this.state.modalHeading}
                    modalBody={modalBody}
                    close={this.close} showModal={this.state.showModal} />
            </div>

        );
    }
}

let mapStateToProps = (store) => {
    return {}
}

export default connect(mapStateToProps)(CommentsTextEditorController);