import React from 'react';
import { Grid, Col, Row, Button, SplitButton, MenuItem, DropdownButton } from 'react-bootstrap';
import TextEditorHolderAndOptions from './TextEditorHolderAndOptions'
import FontAwesome from 'react-fontawesome';
import { convertToRaw, EditorState, ContentState } from 'draft-js';

export default class DiscussionPostWriting extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editorContainsText: false
        }

        this.setEditorContainsText = this.setEditorContainsText.bind(this)
        this.unsetEditorContainsText = this.unsetEditorContainsText.bind(this)
        this.editorChange = this.editorChange.bind(this)
        this.richTextEditorChange = this.richTextEditorChange.bind(this)
    }

    setEditorContainsText() {
        this.setState({ editorContainsText: true })
    }

    unsetEditorContainsText() {
        this.setState({ editorContainsText: false })
    }

    editorChange(e) {
        this.setEditorContainsText()
    }

    richTextEditorChange(e) {
        let contentState = convertToRaw(e.getCurrentContent());
        let editorState = convertToRaw(this.props.editorState.getCurrentContent());
        // console.log("richTextEditorChange :: e :: ", contentState, editorState)
        if (editorState.blocks.length == 1) {
            if (editorState.blocks[0].text != "") {
                if (contentState.blocks.length == 1) {
                    if (contentState.blocks[0].text == "") {
                        this.unsetEditorContainsText()
                        this.props.onEditorStateChange(e)
                        return
                    }
                }
            }
        }
        this.props.onEditorStateChange(e)
    }


    render() {
        return (
            <div>
                {this.state.editorContainsText ?
                    <Col smOffset={1} sm={10} mdOffset={0} md={12} lgOffset={0} lg={12} style={{ padding: "0px" }}>
                        <Grid fluid style={{
                            "textAlign": "bottom",
                            padding: "0px"
                        }}>
                            <TextEditorHolderAndOptions {...this.props}
                                fromHomePage={true}
                                richTextEditorChange={this.richTextEditorChange.bind(this)}
                            />

                        </Grid>
                    </Col>
                    :
                    <Grid fluid style={{ margin: "20px", }}>
                        <Col xs={9} md={9} style={{ verticalAlign: "middle" }}>
                            <input
                                className="custom-edit-blog-title"
                                placeholder={this.props.placeholder}
                                autoFocus={this.props.autoFocus}
                                onFocus={this.editorChange}
                                className="custom-list-content"
                                style={{
                                    border: "1px solid #f2f2f2",
                                    // borderRadius: "20px",
                                    width: "100%",
                                    padding: "10px 10px"

                                }}
                            />
                        </Col>
                        <Col xs={3} md={2} style={{ verticalAlign: "middle", paddingTop: "5px" }}>
                            <Button
                                id="ask_question_button"
                                className="refier_custom_button_new_selected_2"
                                block
                                onClick={
                                    this.editorChange
                                }>
                                <span style={{ "marginRight": "10px" }}>
                                    <FontAwesome
                                        name="pencil"
                                        
                                    />
                                </span>
                                <span>{this.props.buttonText}</span>
                            </Button>
                        </Col>
                    </Grid>}
            </div>
        );
    }
}