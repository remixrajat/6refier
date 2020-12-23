import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Grid,Col,Row} from 'react-bootstrap'


export default class TextEditor extends Component {
  constructor(props){
    super(props);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    this.state = {uploadedImages : []};
  }

  componentDidMount() {
    this.domEditor.focusEditor()
  }

  uploadImageCallBack(file){
    // console.log("reached callback function")
    let uploadedImages = this.state.uploadedImages;

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    }

    uploadedImages.push(imageObject);

    this.setState({uploadedImages: uploadedImages});

    let imgLink = this.state.uploadedImages[0].localSrc;
   
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: imgLink } });
      }
    );
  }

  render() {
    // console.log("inside editor", this.props)

    return (
      <div>
        <Editor editorStyle = {this.props.editorStyle}
          ref={ref => this.domEditor = ref}
          wrapperStyle={this.props.wrapperStyle}
          toolbarStyle={this.props.toolbarStyle}
          editorState={this.props.editorState}
          onEditorStateChange={this.props.onEditorStateChange} 
          //toolbarOnFocus = {this.props.toolbarOnFocus}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          toolbarHidden={this.props.toolbarHidden}
          keypress = {this.props.handleKeypress}
          autoFocus={this.props.autoFocus}
              toolbar={{
                options: ['inline', 
                //'list',
                  //'textAlign',
                  // 'colorPicker',
                  'link',
                  // 'embedded', 'emoji', 'image',
                  // 'remove', 'history'
                ],
                image: { uploadCallback: this.uploadImageCallBack } }}
          onFocus = {this.props.onFocusFunction}
          onBlur={this.props.onBlurFunction}
        />
      </div>
    )
  }
}