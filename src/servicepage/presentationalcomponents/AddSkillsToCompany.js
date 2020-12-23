import React, { Component } from "react";
import { Button, Grid, Row, Col, ButtonToolbar,
    Form, FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Select from 'react-select';

import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';
import { NonPriorityWhiteButton } from '../../shared/RefierComponents/NonPriorityWhiteButton';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import PreLoader from '../../shared/Preloader/PreLoader'


export default class AddSkillsToCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTags: [],
            selectedTagIds: [],
            createSkill: false,
        }

        this.getTagValues = this.getTagValues.bind(this);
        this.showCreateSkill = this.showCreateSkill.bind(this);
        this.closeCreateSkill = this.closeCreateSkill.bind(this);
    }

    showCreateSkill() {
        this.setState({ createSkill: true })
    }

    closeCreateSkill() {
        this.setState({ createSkill: false })
    }

    getTagValues() {
        if (!this.props.tagList) {
            return [];
        }

        let tagValues = [];
        let introFormTagsBody = []
        let tagRelevantCards = []
        let tagOtherCards = []
        let tagIds = []
        let self = this
        let selectedTagIds = this.state.selectedTagIds

        for (let i = 0; i < this.props.tagList.length; i++) {
            let indexOfTag = selectedTagIds.indexOf(this.props.tagList[i].pk)
            let tag = {}
            if(this.props.tagList[i].model === "tags.tags") {
                tag['value'] = this.props.tagList[i].fields.tag_name
                tag['label'] = this.props.tagList[i].fields.tag_name
                tag['id'] = this.props.tagList[i].pk
                tag['unique_key'] = this.props.tagList[i]['unique_key']
                tag['entity'] = this.props.tagList[i]['entity']
            } else {
                tag['value'] = this.props.tagList[i].fields.skill_name
                tag['label'] = this.props.tagList[i].fields.skill_name
                tag['id'] = this.props.tagList[i].pk
                tag['unique_key'] = this.props.tagList[i]['unique_key']
                tag['entity'] = this.props.tagList[i]['entity']
            }
            if (tagIds.indexOf(this.props.tagList[i]['unique_key']) === -1) {
                tagIds.push(this.props.tagList[i]['unique_key'])
                tagValues.push(tag)
            }
        }

        // console.log("AddSkillsToCompanyController:: ", tagValues)

        return tagValues
    }

    setSelectedTags(newValue) {
        this.setState({ selectedTags: newValue })
    }

    tagFrameClicked(id,name, self) {
        let selectedTags = self.state.selectedTags
        let selectedTagIds = self.state.selectedTagIds
        let tag = {}
        tag['value'] = name
        tag['label'] = name
        tag['id'] = id
        let indexOfSelectedTag = selectedTagIds.indexOf(id)
        if (indexOfSelectedTag == -1) {
            selectedTags.push(tag)
            selectedTagIds.push(id)
        }
        else{
            selectedTags.splice(indexOfSelectedTag,1)
            selectedTagIds.splice(indexOfSelectedTag,1)
        }
        // console.log("selectedTags",selectedTags)
        self.setState({selectedTags:selectedTags, selectedTagIds:selectedTagIds})
    }

    onEdit() {
        let option = this.getTagValues();
        return (
            <Select
                name="tag_name"
                multi={true}
                placeholder="Select Topics"
                options={option}
                value={this.state.selectedTags}
                removeSelected={true}
                rtl={false}
                onChange={this.setSelectedTags.bind(this)}
            />
        );
    }

    onShow() {
        if (!this.props.profileTags || Object.keys(this.props.profileTags).length === 0) {
            return <div style={{fontWeight: '400'}}>Click on <b>Edit</b> to add Skills</div>
        }
        
        let _this = this;
        let tags = [];
        this.state.selectedTags = [];
        this.state.selectedTagIds = [];
        
        Object.keys(this.props.profileTags).forEach(function (key, i) {
            // console.log("AddSkillsToCompany", key, i, _this.props.tagList)
            // let index = this.props.profileTags.id ? this.props.profileTags.id + i : i
            let index = key % 4;
            let tag = {}
            tag['value'] = _this.props.profileTags[key]["label"]
            tag['label'] = _this.props.profileTags[key]["label"]
            tag['id'] = _this.props.profileTags[key]["tag_id"]
            tag['unique_key'] = _this.props.profileTags[key]["unique_key"]
            tag['entity'] = _this.props.profileTags[key]["entity"]
            
            _this.state.selectedTags.push(tag)
            _this.state.selectedTagIds.push(tag['id'])

            tags.push (
                <span key={i} className={"custom-list-tag-" + index}
                    style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}>
                    {_this.props.profileTags[key]["label"]}
                </span>
            )
        });

        return tags
    }

    onSave() {
        let deletedTagList = [];
        let _this = this;
        
        Object.keys(this.props.profileTags).forEach((profilekey) => {
            let isPresent = false;
            for (let k = 0; k < _this.state.selectedTags.length; k++) {
                if (_this.props.profileTags[profilekey]["unique_key"] === _this.state.selectedTags[k]['unique_key']) {
                    isPresent = true;
                    break;
                }
            }
            if (!isPresent) {
                deletedTagList.push(_this.props.profileTags[profilekey]["pk"]);
            }
        });

        let tempformValues = {
            objectPropName: this.props.objectPropName,
            selectedTags: this.state.selectedTags,
            deletetedTags: deletedTagList,
            communityId: this.props.communityId
        }

        // console.log("AddSkillsToCompany::onSave", this.state.selectedTags, this.props.profileTags, tempformValues)
        this.props.addOrUpdateTags(tempformValues);
    }

    render() {
        // console.log("AddSkillsToCompany:: ", this.props)

        let showEditDiv = this.props.state.showEditDiv;
        let showAddDiv = this.props.state.showAddDiv;
        let showButtons = this.props.state.showButtons;

        let createSkillBody = (
            <Form horizontal onSubmit={this.props.submitSkill} 
                style={{marginTop: '15px', marginBottom: '15px'}}
                className="group-discussion-form">
                <FormGroup controlId="formHorizontalName" 
                    validationState={this.props.validateName()}>
                    <Col sm={3}>
                        <ControlLabel>Skill Name</ControlLabel>
                    </Col>
                    <Col sm={9}>
                        <FormControl 
                            state={this.props.skillName}
                            onChange={(e) => this.props.setName(e)}
                            type="text" 
                            required
                            autoFocus
                            placeholder="Skill Name..." />
                    </Col>
                    <FormControl.Feedback />
                </FormGroup>
            
                <FormGroup controlId="formHorizontalDesc" 
                    validationState={this.props.validateDescription()}>
                    <Col sm={3}>
                        <ControlLabel>Skill Description</ControlLabel>
                    </Col>
                    <Col sm={9}>
                        <FormControl
                            state={this.state.skillDesc}
                            onChange={(e) => this.props.setDescription(e)}
                            componentClass="textarea" 
                            placeholder="Skill Description..." />
                    </Col>
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup>
                    {
                        this.props.skillCreateLoader === 2 ? 
                            <Col smOffset={3} sm={9}>
                                <PreLoader />
                            </Col> :
                            <div>
                                <Col smOffset={3} sm={2}>
                                    <Button 
                                        className="refier_custom_button_new_selected_2" 
                                        type="submit">Submit
                                    </Button>
                                </Col>
                                <Col sm={2}>
                                    <NonPriorityWhiteButton 
                                        onButtonClick={this.closeCreateSkill}
                                        buttonText="Close"
                                    />
                                </Col>
                            </div>
                    }
                </FormGroup>	

                <FormGroup>
                    <Col smOffset={3} sm={9}>
                        {
                            this.props.skillCreateLoader === 1 ? 
                                <span className="form-status-success">Success</span> :
                                this.props.skillCreateLoader === -1 ?
                                    <span className="form-status-fail">request failed</span> :
                                    ''
                        }
                    </Col>
                </FormGroup>
            </Form>
        )


        return (
            <Grid fluid data-label="Common Cards" style={{minHeight: '350px'}}>
                <Row className={this.props.className} 
                    style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
                    <Col xs={8}>
                        <span style={{ fontSize: "18px" }}>
                            {this.props.name}</span>
                    </Col>
                    {showButtons ?
                        <Col xs={4} style={{ textAlign: "right" }}>
                            <PrimaryButton
                                onButtonClick={this.props.onEditFunction}
                                buttonText="Edit"
                                showIcon={
                                    <FontAwesome
                                        name="pencil"
                                        style={{ marginRight: "5px" }}
                                    />    
                                }
                            />
                        </Col>
                        :
                        null
                    }
                </Row>
                <Row className="refier-card-style">
                    {showButtons ?
                        <div style={{ padding: "0px 20px" }}>
                            <div className=" refier_text_on_light__3"
                                style={{
                                    margin: "12px 0", fontWeight: '700', fontSize: "14px",
                                    display: 'flex', alignItems: 'center'
                                }}>
                                <Col sm={4}> Company Skills </Col>
                                <Col sm={8}> 
                                    {
                                        this.props.loaderStatus === 2 ?
                                        <div style={{textAlign: 'center'}}>
                                            <PreLoader />
                                        </div> :
                                        this.onShow()
                                    }
                                </Col>
                            </div>
                        </div> : null
                    }

                    {!showButtons && !showEditDiv && !showAddDiv ?
                        <div style={{ "padding": "0px 20px" }}>
                            <div className=" refier_text_on_light__3"
                                style={{
                                    margin: "12px 0", fontWeight: '700', fontSize: "14px", 
                                    display: 'flex', alignItems: 'center'
                                }}>
                                <Col sm={4}> Company Skills </Col>
                                <Col sm={8}> 
                                {
                                    this.props.loaderStatus === 2 ?
                                        <div style={{textAlign: 'center'}}>
                                            <PreLoader />
                                        </div> :
                                        this.onShow()
                                } 
                                </Col>
                            </div>
                        </div>
                        : null
                    }

                    {showEditDiv || showAddDiv ?
                        <form style={{ padding: '10px' }}>
                            <FormGroup controlId="formBasicText">
                                {this.onEdit()}
                                <ButtonToolbar style={{ marginBottom: "10px", marginTop: "20px" }}>
                                    <PrimaryButton
                                        style={{marginRight: '10px'}}
                                        onButtonClick={this.onSave.bind(this)}
                                        buttonText="Save"
                                    />
                                    <NonPriorityWhiteButton
                                        onButtonClick={this.props.onCancel}
                                        buttonText="Cancel"
                                    />
                                </ButtonToolbar>
                            </FormGroup>
                        </form> 
                        : null
                    }
                </Row>
                {showEditDiv || showAddDiv ?
                    <Row className="refier-card-style" 
                        style={{display: 'flex', alignItems: 'center', marginTop: '15px'}}>
                        <div className=" refier_text_on_light__3" style={{margin: 'auto 10px'}}>
                            * cannot find skills in our database
                        </div>                
                        <NonPriorityWhiteButton
                            onButtonClick={this.showCreateSkill}
                            buttonText="Click Here"
                        />
                    </Row> :
                    null
                }
                {
                    (showEditDiv || showAddDiv) && this.state.createSkill ?
                        createSkillBody :
                        null
                }
            </Grid>
        )
    }
}