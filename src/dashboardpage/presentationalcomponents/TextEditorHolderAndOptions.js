import React from 'react';
import { Grid, Col, Row, Button, SplitButton, MenuItem, DropdownButton, FormControl } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Select from 'react-select';

import WriteBlog from '../../shared/WriteBlog/presentationalcomponents/textEditor';
import IsUsefulButton from '../../shared/TextDisplayPanels/presentationalcomponents/IsUsefulButton'

import Preloader from '../../shared/Preloader/PreLoader'


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
        if(this.props.tagsList){
            for(let i=0;i<this.props.tagsList.length;i++){
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
                {this.props.fromHomePage ?
                    <WriteBlog editorStyle={editor}
                        wrapperStyle={wrapper}
                        editorState={this.props.editorState}
                        toolbarOnFocus={true}
                        toolbarHidden={false}
                        placeholder={this.props.placeholder}
                        onEditorStateChange={this.props.richTextEditorChange} 
                    />
                    :
                    this.props.switchToEditView ?
                        <WriteBlog editorStyle={editor}
                            wrapperStyle={wrapper}
                            editorState={this.props.editorState}
                            toolbarOnFocus={true}
                            toolbarHidden={false}
                            placeholder={this.props.placeholder}
                            onEditorStateChange={this.props.onEditorStateChange}
                            onBlurFunction={this.props.onUnsetEditView}
                        />
                        :
                        <WriteBlog editorStyle={editor}
                            wrapperStyle={wrapper}
                            editorState={this.props.editorState}
                            toolbarOnFocus={false}
                            toolbarHidden={true}
                            placeholder={this.props.placeholder}
                            onEditorStateChange={this.props.onEditorStateChange}
                            onFocusFunction={this.props.onSetEditView} />

                    }
                    <Grid fluid
                        className="refier-card-style">

                        <Col xs={12} sm={12} md={8} lg={8} style={{ "textAlign": "left" }}>
                            <div>
                                {this.props.anonymousOption ?
                                    <label
                                        className="custom-checkbox"
                                        style={{ margin: "5px 5px", display: "inline-block" }}
                                    >Go Anonymous
                                    <input type="checkbox" name="anonymousCheck"
                                            onChange={this.props.onToggleCheckbox} checked={this.props.anonymousCheck}
                                            className="custom-checkbox-radio" />
                                    </label>
                                    : null}

                                {this.props.showNoticeOption ?
                                    <label
                                        className="custom-checkbox"
                                        style={{ margin: "5px 5px", display: "inline-block" }}
                                    >Is this a Notice?
                                        <input type="checkbox" name="anonymousCheck"
                                            onChange={this.props.onToggleNoticeCheckbox} 
                                            checked={this.props.isNoticeCheck}
                                            className="custom-checkbox-radio" />
                                    </label>
                                    : null}

                                {this.props.communitySelectOption ?
                                    <select className="custom-select"
                                        style={{ margin: "5px 5px", display: "inline-block" }}
                                        name="communitySelect" onChange={this.props.onChangeSelect}
                                        value={this.props.communitySelect == "0" ?
                                                (comunityOptions && comunityOptions.length == 1) ?
                                            "1" : this.props.communitySelect
                                        : this.props.communitySelect}>
                                        <option value="0" disabled>Select a community</option>
                                        {
                                            (this.props.shareEveryoneAllowed) ?
                                                <option value="everyone">Share with everyone</option>
                                                :
                                                null
                                        }

                                        {comunityOptions}
                                    </select>
                                    : null}
                            </div>
                            {this.props.tagsList && !this.props.isComment ?
                                <div style={{ margin: "5px 5px" }}><Select
                                    name="tag_name"
                                    multi={true}
                                    placeholder="Select Topics"
                                    options={tagValues}
                                    value={this.props.selectedTags}
                                    removeSelected={true}
                                    rtl={false}
                                    onChange={this.props.setSelectedTags.bind(this)}
                                /></div>
                                :
                                null
                            }
                            {this.props.is_useful_button ?
                                <div
                                    style={{ "paddingTop": "20px", "paddingLeft": "20px" }}>
                                    <IsUsefulButton is_useful_count={this.props.is_useful_count}
                                        is_not_useful_count={this.props.is_not_useful_count}
                                        liked_or_not={this.props.liked_or_not}
                                        addLikeOrDislike={this.props.addLikeOrDislike} />
                                </div>
                                :
                                null}


                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}
                            style={{ "textAlign": "right", verticalAlign: "end" }}>
                            {this.props.is_useful_button ? <div style={{ "paddingTop": "30px" }} /> : null}
                            {this.props.submitStatus && this.props.submitStatus == 2 ?
                                <Preloader loaderMessage="Submitting..." />
                                :
                                <Button
                                    id="ask_question_button"
                                    className="refier_custom_button_new_selected_2"
                                    onFocus={(e) => {
                                        e.target.blur();
                                        this.props.submitPost()
                                    }}>
                                    <span style={{ "marginRight": "10px" }}>
                                        <FontAwesome name="pencil" />
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