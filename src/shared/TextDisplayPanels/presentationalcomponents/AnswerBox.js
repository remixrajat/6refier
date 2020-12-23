import React from 'react';

import TextEditorController from '../conditionalcomponents/CommentsTextEditorController'


export default class AnswerBox extends React.Component {
    render() {
        let editor = {
            "color":"black" , 
            "border" : "1px solid #f2f2f2",
            "borderTopWidth":"0px",
            "paddingLeft":"10px", 
            "height":"60px", 
            "fontFamily":"Roboto"
        }

        let wrapper = {"border" : "1px solid #f2f2f2", "borderRadius":"0em"}

        return (
            this.props.commentReply ?
                <div style={{padding: '20px 25px 0px 25px'}}>
                    <TextEditorController
                        showAnswerBox={this.props.showAnswerBox}
                        toolbarOnFocus={true} 
                        wrapperStyle={wrapper} 
                        editorStyle={editor} toolbarHidden={false}
                        placeholder={this.props.placeholder}
                        showSubmitButton = {true} {...this.props} /> 
                </div> :
                <TextEditorController
                    toolbarOnFocus={true} 
                    wrapperStyle={wrapper} 
                    editorStyle={editor} toolbarHidden={false}
                    placeholder={this.props.isBlog ? "Write a comment..." : "Write Answer here..."}
                    showSubmitButton = {true} {...this.props} />
        );
    }
}