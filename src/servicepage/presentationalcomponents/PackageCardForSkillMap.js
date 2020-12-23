import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Grid, Col, FormGroup, ButtonToolbar } from 'react-bootstrap'
import Select from 'react-select';

import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';
import { NonPriorityWhiteButton } from '../../shared/RefierComponents/NonPriorityWhiteButton';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import PreLoader from '../../shared/Preloader/PreLoader'


export default class PackageCardForSkillMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSkillAddState: false,
            selectedTags: [],
            selectedTagIds: [],
        }

        this.getTagValues = this.getTagValues.bind(this);
        this.showSkillAdd = this.showSkillAdd.bind(this);
        this.closeSkillAdd = this.closeSkillAdd.bind(this);
    }

    showSkillAdd() {
        this.setState({ showSkillAddState: true })
    }

    closeSkillAdd() {
        this.setState({ showSkillAddState: false })
    }

    getTagValues() {
        if (!this.props.tagList) {
            return [];
        }

        let tagValues = [];
        let tagIds = []
        
        for (let i = 0; i < this.props.tagList.length; i++) {
            let tag = {}
            const tagInfo = this.props.tagList[i].fields
            const tagPk = this.props.tagList[i].pk

            if(tagInfo.company_skill) {
                tag['value'] = tagInfo.company_skill.skill_name
                tag['label'] = tagInfo.company_skill.skill_name
                tag['tag_id'] = tagInfo.company_skill.skill_id
                tag['id'] = tagPk
                tag['unique_key'] = tagPk + "_skill"
                tag['entity'] = "skill"
            } else if (tagInfo.user_skill) {
                tag['value'] = tagInfo.user_skill.tag_name
                tag['label'] = tagInfo.user_skill.tag_name
                tag['tag_id'] = tagInfo.user_skill.tag_id
                tag['id'] = tagPk
                tag['unique_key'] = tagPk + "_tag"
                tag['entity'] = "tag"
            } else {
                continue;
            }

            if (tagIds.indexOf(tagPk) === -1) {
                tagIds.push(tagPk)
                tagValues.push(tag)
            }
        }

        return tagValues
    }

    setSelectedTags(newValue) {
        this.setState({ selectedTags: newValue })
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
            return <div style={{fontWeight: '400'}}>Click on <b>Add Skills</b> to add Skills</div>
        }
        
        let _this = this;
        let tags = [];
        this.state.selectedTags = [];
        this.state.selectedTagIds = [];
        
        Object.keys(this.props.profileTags).forEach(function (key, i) {
            // let index = this.props.profileTags.id ? this.props.profileTags.id + i : i
            let index = key % 4;
            let tag = {}
            tag['value'] = _this.props.profileTags[key]["label"]
            tag['label'] = _this.props.profileTags[key]["label"]
            tag['id'] = _this.props.profileTags[key]["pk"]
            tag['tag_id'] = _this.props.profileTags[key]["tag_id"]
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
        let _this=this;

        Object.keys(this.props.profileTags).forEach((profilekey) => {
            let isPresent = false;
            for (let k = 0; k < _this.state.selectedTags.length; k++) {
                if (_this.props.profileTags[profilekey]["pk"] === _this.state.selectedTags[k].id) {
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
            communityId: this.props.communityId,
            package_pk: this.props.pk
        }
        // console.log("PackageCardForSkillMap::onSave", this.state.selectedTags, this.props.profileTags, tempformValues)
        this.props.addOrUpdatePackageSkills(tempformValues);
        this.closeSkillAdd();
    }


    render() {
        // console.log("PackageCardForSkillMap:: ", this.props)

        return (
            <Grid fluid 
                style={{ padding: "10px", marginTop: '15px', border: '1px solid rgba(0,0,0,0.1)' }}>
                <Col sm={7} style={{ textAlign: "left" }}>
                    {this.props.packageInfo.package_name ?
                        <div
                            className="custom-list-content">
                            <b>{this.props.packageInfo.package_name}</b></div>
                        :
                        null}
                    <div
                        className="custom-list-sub-content-highlighted">
                        {this.props.packageInfo.package_description ?
                            this.props.packageInfo.package_description.length < 50 ?
                                this.props.packageInfo.package_description :
                                this.props.packageInfo.package_description.substring(0, 50) + '...' :
                            null
                        }
                    </div>
                </Col>
                <Col sm={5} style={{display: 'flex', justifyContent: 'flex-end'}}>
                {this.state.showSkillAddState ?
                    <PrimaryButton
                        onButtonClick={this.closeSkillAdd}
                        buttonText="Close"
                    /> :
                    <PrimaryButton
                        onButtonClick={this.showSkillAdd}
                        buttonText="Add Skills"
                    />
                }
                </Col>
                {!this.state.showSkillAddState ?
                    <Col xs={12}>
                        <div className=" refier_text_on_light__3"
                            style={{
                                margin: "12px 0", fontWeight: '700', fontSize: "14px",
                                display: 'flex', alignItems: 'center'
                            }}>
                            <Col sm={4}> Package Skills </Col>
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
                    </Col> :
                    <Col xs={12}>
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
                                        onButtonClick={this.closeSkillAdd}
                                        buttonText="Cancel"
                                    />
                                </ButtonToolbar>
                            </FormGroup>
                        </form> 
                    </Col>
                }
            </Grid>
        );
    }
}