import React from 'react';
import { Grid, Col, Row, Button, SplitButton, MenuItem, DropdownButton } from 'react-bootstrap';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import FontAwesome from 'react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

import TextEditorHolderAndOptions from './TextEditorHolderAndOptions'
import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton'
import { NonPriorityWhiteButton } from '../../shared/RefierComponents/NonPriorityWhiteButton'


export default class BlogWritingContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editorContainsText : false
        }

        this.setEditorContainsText = this.setEditorContainsText.bind(this)
        this.unsetEditorContainsText = this.unsetEditorContainsText.bind(this)
        this.editorChange = this.editorChange.bind(this)
        this.richTextEditorChange = this.richTextEditorChange.bind(this)
    }

    setEditorContainsText() {
        this.setState({editorContainsText : true})
    }

    unsetEditorContainsText() {
        this.setState({editorContainsText : false})
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
            this.props.previewQuestion 
                ? this.state.editorContainsText ?
                    <Col xs={12}>
                        <Grid fluid style={{ padding: "0px" }}>
                            <TextEditorHolderAndOptions {...this.props}
                                fromHomePage={true}
                                richTextEditorChange={this.richTextEditorChange.bind(this)}
                            />
                        </Grid>
                    </Col>
                : <Grid fluid>
                    <Col xs={7} sm={9} md={10}>
                        <input
                            componentClass="textarea"
                            className="custom-edit-blog-title"
                            placeholder={this.props.placeholder}
                            onFocus={this.editorChange}
                            className="custom-list-content"
                            style={{
                                border: "1px solid #f2f2f2",
                                width: "100%",
                                padding: "10px 10px"
                            }}
                        />
                    </Col>
                    <Col xs={5} sm={3} md={2} style={{ paddingTop: "5px" }}>
                        <NonPriorityWhiteButton 
                            isBlock="true"
                            // buttonId="ask_question_button"
                            onButtonClick={this.editorChange}
                            showIcon={ <FontAwesome name="pencil" /> }
                            buttonText={this.props.buttonText}
                        />
                    </Col>
                </Grid>

            : <div>
            {this.state.editorContainsText ?
                <Col smOffset={1} sm={10} mdOffset={0} md={12} lgOffset={0} lg={12}>
                    <Grid fluid style={{
                        textAlign: "bottom",
                        padding: "0px",
                        marginBottom: "20px"
                    }}>
                        <TextEditorHolderAndOptions {...this.props}
                            fromHomePage={true}
                            richTextEditorChange={this.richTextEditorChange.bind(this)}
                        />
                    </Grid>
                </Col>
                :
                <Grid fluid style={{ marginTop: "20px", }}>
                    <Col xs={5} md={7} style={{ verticalAlign: "middle" }}>
                        <input
                            componentClass="textarea"
                            className="custom-edit-blog-title"
                            placeholder={this.props.placeholder}
                            onFocus={this.editorChange}
                            className="custom-list-content"
                            style={{
                                border: "1px solid #f2f2f2",
                                width: "100%",
                                padding: "10px 10px"
                            }}
                        />
                    </Col>
                    <Col xs={5} sm={2} md={2} style={{ verticalAlign: "middle", paddingTop: "5px" }}>
                        <ComplementaryButton 
                            isBlock="true"
                            buttonId="ask_question_button"
                            onButtonClick={this.editorChange}
                            showIcon={ <FontAwesome name="pencil" /> }
                            buttonText={this.props.buttonText}
                        />
                    </Col>
                    <Col xs={5} sm={3} md={2} style={{ verticalAlign: "middle", paddingTop: "5px" }}>
                        <ComplementaryButton 
                            showIcon={ <FontAwesome name="pencil-square-o" /> }
                            buttonText="Share Learning"
                            redirect="true"
                            redirectAddress="/userDashboard/blog/write/ALL"
                        />
                    </Col>
                </Grid>
            }    
            </div>
        );
    }
}