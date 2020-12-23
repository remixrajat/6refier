/*
import React, { Component } from 'react';
import { convertToRaw ,EditorState, ContentState} from 'draft-js';
import TextEditor from '../presentationalcomponents/textEditor';
import axios from 'axios';


export default class TextEditorController extends Component {
constructor(props){
    super(props);
    const plainText = '';
    const content = ContentState.createFromText(plainText);

    this.state = { editorState: EditorState.createWithContent(content)};
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
}
  
  onEditorStateChange = (editorState) => {
//   this.setState({
//     editorState
//   });
  if(this.props.onEditorStateChange){
    this.props.onEditorStateChange(this.state.editorState);
  }
  
}

render(){
    return(
        <TextEditor editorState={this.state.editorState}
    onEditorStateChange={this.onEditorStateChange}
    {...this.props}/> 
    )
}
}
*/
