import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormGroup, ButtonToolbar } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Select from 'react-select';

import TagImg from '../../images/tags/tag_default.jpg';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'


export default class TaggedProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTags: [],
            selectedTagIds: []
        }

        this.getTagValues = this.getTagValues.bind(this);
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
            tag['value'] = this.props.tagList[i].fields.tag_name
            tag['label'] = this.props.tagList[i].fields.tag_name
            tag['id'] = this.props.tagList[i].pk
            if (tagIds.indexOf(this.props.tagList[i].pk) == -1) {
                tagIds.push(this.props.tagList[i].pk)
                tagValues.push(tag)
                if (this.props.tagList[i].fields.is_relevant) {
                    tagRelevantCards.push (
                        <Col xs={6} sm={4} md={3} style={{marginBottom: '10px'}}>
                            <div className={indexOfTag == -1 ? "refier_card" : "refier_card_selected"}
                                onClick={() => {
                                    self.tagFrameClicked(self.props.tagList[i].pk,
                                        self.props.tagList[i].fields.tag_name, self)
                                }}>
                                <div className="refier_card_image">
                                    <img
                                        src={this.props.tagList[i].fields.tag_photo 
                                            ? (MEDIA_URL_TEXT + this.props.tagList[i].fields.tag_photo) 
                                            : TagImg}
                                    /> </div>
                                <div className="refier_card_title refier_card_title_white">
                                    <p> {this.props.tagList[i].fields.tag_name}</p>
                                    {indexOfTag == -1 ? null :
                                        <p>
                                            <span>Selected</span>
                                            <span style={{ paddingLeft: "5px" }}>
                                                <FontAwesome name="check" />
                                            </span>
                                        </p>}
                                </div></div>
                        </Col>
                    )
                }
                else {
                    tagOtherCards.push (
                        <Col xs={6} sm={4} md={3} style={{marginBottom: '10px'}}>
                            <div className={indexOfTag == -1 ? "refier_card" : "refier_card_selected"}
                                onClick={() => {
                                    self.tagFrameClicked(self.props.tagList[i].pk,
                                        self.props.tagList[i].fields.tag_name, self)
                                }}>
                                <div className="refier_card_image">
                                    <img
                                        src={this.props.tagList[i].fields.tag_photo 
                                            ? (MEDIA_URL_TEXT + this.props.tagList[i].fields.tag_photo) 
                                            : TagImg}
                                    /> </div>
                                <div className="refier_card_title refier_card_title_white">
                                    <p> {this.props.tagList[i].fields.tag_name}</p>
                                    {indexOfTag == -1 ? null :
                                        <p>
                                            <span>Selected</span>
                                            <span style={{ paddingLeft: "5px" }}>
                                                <FontAwesome
                                                    name="check"
                                                    
                                                />
                                            </span>
                                        </p>}
                                </div></div>
                        </Col>
                    )
                }
            }
        }

        if (this.props.isIntroForm) {
            introFormTagsBody.push (
                <Grid fluid className="sub-list-header" style={{ margin: "10px 10px" }}>
                    Suggested Topics
                </Grid>
            )

            introFormTagsBody.push (
                <Grid fluid>{tagRelevantCards}</Grid>
            )


            introFormTagsBody.push (
                <Grid fluid className="sub-list-header" style={{ margin: "10px 10px" }}>
                    Other Topics
                </Grid>
            )

            introFormTagsBody.push (
                tagOtherCards
            )

            return introFormTagsBody;
        } else {
            return tagValues
        }
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
        else {
            selectedTags.splice(indexOfSelectedTag,1)
            selectedTagIds.splice(indexOfSelectedTag,1)
        }
        // console.log("selectedTags",selectedTags)
        self.setState({selectedTags:selectedTags, selectedTagIds:selectedTagIds})
    }

    onEdit() {
        let option = this.getTagValues();
        // console.log("TaggedProfileDetails:: onEdit", option, this.state.selectedTags)
        if (this.props.isIntroForm) {
            return (
                <div style={{
                    maxHeight: "60vh", overflow: "auto", padding: "5px 0px",
                    marginBottom: "10px",
                }}>{option}</div>
            )
        } else {
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
        
    }

    onShow() {
        if (!this.props.profileTags) {
            return null
        }

        let _this = this;
        let tags = [];
        this.state.selectedTags = [];
        this.state.selectedTagIds = [];

        Object.keys(this.props.profileTags).forEach(function (key, i) {
            // console.log("TaggedProfileDetails", key, i, _this.props.tagList)
            // let index = this.props.profileTags.id ? this.props.profileTags.id + i : i
            let index = key % 4;
            let tag = {}
            tag['value'] = _this.props.profileTags[key]["label"]
            tag['label'] = _this.props.profileTags[key]["label"]
            tag['id'] = _this.props.profileTags[key]["tag_id"]
            
            _this.state.selectedTags.push(tag)
            _this.state.selectedTagIds.push(tag['id'])
            tags.push(
                <span key={i} style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                    className={"custom-list-tag-" + index}>
                    {_this.props.profileTags[key]["label"]}</span>)
        });
        // console.log("TaggedProfileDetails", tags)
        return tags;
    }

    onSave() {
        let deletedTagList = [];
        let _this=this;
        
        Object.keys(this.props.profileTags).forEach((profilekey) => {
            let isPresent = false;
            for (let k = 0; k < _this.state.selectedTags.length; k++) {
                if (_this.props.profileTags[profilekey]["tag_id"] === _this.state.selectedTags[k].id) {
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
            deletetedTags: deletedTagList
        }
        // console.log("TaggedProfileDetails::onSave", this.state.selectedTags, this.props.profileTags, tempformValues)
        this.props.addOrUpdateTags(tempformValues);
    }

    render() {
        // console.log("TaggedProfileDetails", this.props)

        let showEditDiv = this.props.state.showEditDiv;
        let showAddDiv = this.props.state.showAddDiv;
        let showButtons = this.props.state.showButtons;
        let finaldesc = []

        if (this.state.selectedTags.length > 0) {
            for (let i = 0; i < this.state.selectedTags.length; i++){
                let index = i % 4
                finaldesc.push(<span key={i}
                    style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                    className={"custom-list-tag-" + index}>
                    {this.state.selectedTags[i]["label"]}</span>)
            }
        }


        return (
            <Grid fluid data-label="Common Cards">
                <Row
                    className={this.props.className}>
                    {this.props.isIntroForm ? 
                        null :
                        <Col xs={2} style={{ textAlign: "left" }}>
                                <FontAwesome
                                    name={this.props.iconName}
                                    style={{ "fontSize": "16px" }}
                                />
                        </Col>
                    }
                    {this.props.isIntroForm?
                        <Col xs={12} style={{ textAlign: "center" }}>
                            <span style={{ fontSize: "18px" }}>
                                {this.props.name}</span>
                        </Col>
                        :
                        <Col xs={7} style={{ textAlign: "center" }}>
                            <span style={{ fontSize: "18px" }}>
                                {this.props.name}</span>
                        </Col>
                    }
                    {!this.props.isIntroForm && showButtons ?
                        <Col xs={3} style={{ textAlign: "right" }}>
                            <FontAwesome
                                name="pencil"
                                style={{ fontSize: "16px", cursor: "pointer" }}
                                onClick={this.props.onEditFunction}
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
                                    fontWeight: '700', fontSize: "14px", margin: "12px 0"
                                }}>
                                {this.onShow()}
                            </div>
                        </div> : null
                    }

                    {!showButtons && !showEditDiv && !showAddDiv ?
                        <div style={{ padding: "0px 20px" }}>
                            <div className=" refier_text_on_light__3"
                                style={{
                                    fontWeight: '700', fontSize: "14px", margin: "12px 0"
                                }}>
                                {this.onShow()}
                                {}
                            </div>
                        </div>
                        : null
                    }

                    {showEditDiv || showAddDiv ?
                        <form style={{ "padding": "10px 10px" }}>
                            {
                                this.props.isIntroForm?
                                    <div style={{paddingBottom:"10px"}}>
                                        {finaldesc}
                                    </div>
                                    :
                                    null
                            }
                            <FormGroup controlId="formBasicText">
                                {this.onEdit()}
                                <ButtonToolbar style={{ marginBottom: "10px", marginTop: "20px" }}>
                                    <Button bsStyle="primary" 
                                        style={{ backgroundColor: "rgba(72, 82, 140, 1)" }} 
                                        onClick={this.onSave.bind(this)}>
                                        Save
                                    </Button>
                                    {this.props.isIntroForm ?
                                        null :
                                        <Button bsStyle="danger" onClick={this.props.onCancel}>
                                            Cancel
                                        </Button>
                                    }
                                </ButtonToolbar>
                            </FormGroup>

                        </form> 
                        : null
                    }
                </Row>
            </Grid>
        )
    }
}