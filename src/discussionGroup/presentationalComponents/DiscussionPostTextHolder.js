import React, {Component} from 'react';
import { Grid, Col, Row, Panel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import TextEditor from '../../shared/WriteBlog/presentationalcomponents/textEditor';


export default class DiscussionPostTextHolder extends Component{
    render(){
        let editor = {
            "color": "black",
            // "border": "1px solid #f2f2f2",
            "borderTopWidth":"0px",
            "paddingLeft": "10px",
            "paddingRight": "10px",
            // "height": "60px",
            "fontFamily": "Roboto"
        }
        let wrapper = {
            // "border": "1px solid #f2f2f2",
            "borderRadius": "0em"
        }


        let editorWithBorder = {
            "color": "black",
            "border": "1px solid #f2f2f2",
            "borderTopWidth":"0px",
            "paddingLeft": "10px",
            "paddingRight": "10px",
            "height": "40px",
            "fontFamily": "Roboto"
        }
        let wrapperWithBorder = {
            "border": "1px solid #f2f2f2",
            "borderRadius": "0em"
        }

        return (
            <Grid fluid>
                <Col>
                    <div>
                        <TextEditor editorStyle={(this.props.isGroupPostAnswer &&
                            !this.props.readOnly) ? editorWithBorder : editor}
                            onEditorStateChange={this.props.onEditorStateChange}
                                wrapperStyle={(this.props.isGroupPostAnswer &&
                                    !this.props.readOnly) ? wrapperWithBorder : wrapper}
                            editorState={this.props.editorState}
                            toolbarOnFocus={this.props.isToolBarOnFocus}
                            toolbarHidden={this.props.isToolbarHidden}
                            readOnly={this.props.readOnly}
                        />
                    {
                        this.props.readOnly? null :
                        <div style={{ 'marginTop':'10px'}}
                            className="refier_custom_button_save btn btn-sm btn-primary pull-right"
                            onClick={this.props.onSubmit}>
                            Submit Comment
                            <FontAwesome
                                style={{ "marginLeft": "5px" }}
                                name="save" />
                        </div>
                    }
                    </div>
                </Col>
            </Grid>
        );
    }
}