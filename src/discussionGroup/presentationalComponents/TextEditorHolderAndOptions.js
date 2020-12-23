import React from 'react';
import { Grid, Col, Row, Button, SplitButton, MenuItem, DropdownButton, FormControl } from 'react-bootstrap';
import WriteBlog from '../../shared/WriteBlog/presentationalcomponents/textEditor';
import FontAwesome from 'react-fontawesome';
import IsUsefulButton from '../../shared/TextDisplayPanels/presentationalcomponents/IsUsefulButton'
import Select from 'react-select';
import Preloader from '../../shared/Preloader/PreLoader'
import { convertToRaw, EditorState, ContentState } from 'draft-js';

export default class TextEditorHolderAndOptions extends React.Component {


    render() {
        //console.log("TextEditorHolderAndOptions::props",this.props)
        let comunityOptions = null;
        let communityListState = this.props.communityListState;
        if (communityListState) {

            comunityOptions = communityListState.map((commObj) => {
                let option;
                // //console.log("Community : ", commObj)
                return this.props.communitiesOptions != "ALL" ?
                    this.props.communitiesOptions == commObj.pk ?
                        (<option value={commObj.pk}>Share with {commObj.fields.entity_name}</option>) :
                        null :
                    (<option value={commObj.pk}>Share with {commObj.fields.entity_name}</option>)
            })
        }

        let tagValues = []
        if (this.props.tagsList) {
            for (let i = 0; i < this.props.tagsList.length; i++) {
                let tag = {}
                tag['value'] = this.props.tagsList[i].fields.tag_name
                tag['label'] = this.props.tagsList[i].fields.tag_name
                tag['id'] = this.props.tagsList[i].pk
                tagValues.push(tag)
            }
        }

        let editorHeight = "60px";
        if (this.props.editorHeight) {
            editorHeight = this.props.editorHeight
        }

        let editor = {
            "height": editorHeight, "backgroundColor": "white"
            , "paddingLeft": "10px", "overflowY": "auto",
            border: "solid 0px #f2f2f2", "borderTopWidth": "0px"
        }

        let wrapper = {
            "border": "1px solid #f2f2f2", "borderRadius": "0em",
            // "borderTopWidth": "1px"
        }

        return (
            <div>
                <WriteBlog editorStyle={editor}
                    wrapperStyle={wrapper}
                    editorState={this.props.editorState}
                    toolbarOnFocus={true}
                    toolbarHidden={false}
                    placeholder={this.props.placeholder}
                    onEditorStateChange={this.props.onEditorStateChange}
                    onBlurFunction={this.props.onUnsetEditView}
                />
                <Grid fluid
                    className="refier-card-style">

                    <Col xs={12} 
                        style={{ "textAlign": "right", verticalAlign: "end" }}>
                        {this.props.is_useful_button ? <div style={{ "paddingTop": "30px" }} /> : null}
                        {this.props.submitStatus && this.props.submitStatus == 2 ?
                            <Preloader loaderMessage="Submitting..." />
                            :
                            <Button
                                id="ask_question_button"
                                /* bsStyle="warning"
                                className="refier_custom_uplifted_button"    */
                                className="refier_custom_button_new_selected_2"
                                onFocus={(e) => {
                                    e.target.blur();
                                    this.props.submitPost()
                                }}>
                                <span style={{ "marginRight": "10px" }}>
                                    <FontAwesome
                                        name="pencil"                                                                                                                                                                       
                                        
                                    />
                                </span>
                                <span>{this.props.buttonText}</span>
                            </Button>
                        }
                    </Col>
                </Grid>
            </div>
        );
    }
}