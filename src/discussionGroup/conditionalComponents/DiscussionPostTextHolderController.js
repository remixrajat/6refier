import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertToRaw, convertFromRaw, EditorState, ContentState } from 'draft-js';

import DiscussionPostTextHolder from '../presentationalComponents/DiscussionPostTextHolder';

import { createEditorStateFromBackendData } from '../../HelperFunctions/createEditorStateFromBackendData';
import { convertStringToJson } from '../../HelperFunctions/convertStringToJson';
import { handleQuotesInEditor } from '../../HelperFunctions/handleQuotesInEditor';


class DiscussionPostTextHolderController extends Component {
	constructor(props) {
		super(props);
			this.buttonText = "Submit";
			this.state = {
				showModal: false,
				showCommonModal: false,
				showError: "none",
				errorMsg: "",
				submitDiscussionPost: null,
				editorState: createEditorStateFromBackendData(this.props.postBody),
				commentShowStatus: {},
				editedBody: null,
				isEditModal: false,
			};

		this.onEditorStateChange = this.onEditorStateChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.postBody) {
			this.setState({ editorState: createEditorStateFromBackendData(nextProps.postBody) })
		}
	}

	onEditorStateChange = (editorState) => {
		this.setState({ editorState });
	}

	previewContent(content) {
        let jsonContent = convertStringToJson(content)
        if (jsonContent == null) {
            jsonContent = content
        }
        let clonedBody = JSON.parse(JSON.stringify(jsonContent))
        jsonContent = jsonContent.blocks
        let contentLength = 0
        let previewBody = []
        for (let i = 0; i < jsonContent.length; i++) {

            contentLength = contentLength + jsonContent[i].text.length
            let previousLength = contentLength - jsonContent[i].text.length
            if (contentLength > 200) {
                let cloneContent = JSON.parse(JSON.stringify(jsonContent[i]))
                let text = cloneContent.text
                if (text.length > 0) {
                    let newText = text.substring(0, (200 - previousLength))
                    cloneContent.text = newText + "..."
                    //console.log("Preview Original Content", jsonContent[i])
                    //console.log("Preview New Content", cloneContent)
                    previewBody.push(cloneContent)
                    break;
                }
            }
            else {
                previewBody.push(jsonContent[i])
            }
        }
        //console.log("Preview the Processed Content", previewBody)
        clonedBody.blocks = previewBody
        //console.log("Preview the Processed Body", clonedBody)
        let cloneVal = '';
        try {
            cloneVal = EditorState.createWithContent(convertFromRaw(clonedBody));
        }
        catch (err) {
            const plainText = '';
            const content = ContentState.createFromText(plainText);
            cloneVal = EditorState.createWithContent(content);
        }
        return cloneVal
    }

	onSubmit() {
		let editorStateSubmit = this.state.editorState;
		let contentState = convertToRaw(editorStateSubmit.getCurrentContent());
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
				showCommonModal: true,
				modalHeading: "Oops!!!",
				modalBodyText: "You cannot submit empty content!",
			});
			return false;
		}
		let isNotFirst = true;
		let tempContentObj = { blocks: [] };
		let tempObj = [];
		for (let j = 0; j < contentState.blocks.length; j++) {
			if (contentState.blocks[j].text.trim() !== "") {
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
		// console.log("final temp obj flash: ", tempContentObj);
		let newContentState = handleQuotesInEditor(tempContentObj);
		let resetAnsweBox = null;
		if(this.props.isGroupPostAnswerWritingBox){
			resetAnsweBox = ()=>{
				console.log("sdksdkskdk");
				self.setState({
					editorState: createEditorStateFromBackendData(null)
				})
			}
		}
		this.props.submitGroupPost(newContentState, this.props.groupPostId, resetAnsweBox)
	}


	render() {
		
		let editorStyle = {
			"color": "#42565B",
			"backgroundColor": "white",
			"paddingLeft": "10px",
			// "overflowY": "auto",
			"borderTopWidth": "0px",
			"lineHeight": "1.6",
			"fontSize": "1.25em",
			"letterSpacing": "0.01em"
		}
		
		let isToolBarHidden = false;
		let isToolBarOnFocus = true;
		if (this.props.readOnly) {
			isToolBarHidden = true
			isToolBarOnFocus = false;
		}


		return (
			<DiscussionPostTextHolder {...this.props} {...this.state}
				onEditorStateChange={this.onEditorStateChange}
				isToolbarHidden={isToolBarHidden}
				onSubmit={this.onSubmit}
				isToolBarOnFocus={isToolBarOnFocus}
				editorStyle={editorStyle} />
		)
	}
}

let mapStateToProps = () => {
	return {}
}

export default connect(mapStateToProps)(DiscussionPostTextHolderController)