import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Select from 'react-select';

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import PreLoader from '../../shared/Preloader/PreLoader'
import TagImg from '../../images/tags/tag_default.jpg';


export default class IntroFormInterestsSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTags: [],
            selectedTagIds: [],
            relevantTags: [],
            otherTags: []
        }
        
        this.getTagValues = this.getTagValues.bind(this);
    }

    componentWillMount() {
        if(this.props.tagList) {
            this.getTagValues(this.props.tagList);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.tagList) {
            this.getTagValues(nextProps.tagList);
        }
    }

    getTagValues(tagList) {
        let tagValues = [];
        let introFormTagsBody = []
        let tagRelevantCards = []
        let tagRelevantCardsBody = []
        let tagOtherCards = []
        let tagOtherCardsBody = []
        let tagIds = []
        let self = this
        let selectedTagIds = this.state.selectedTagIds
        
        for (let i = 0; i < tagList.length; i++) {
            let indexOfTag = selectedTagIds.indexOf(tagList[i].pk)
            let tag = {}
            tag['value'] = tagList[i].fields.tag_name
            tag['label'] = tagList[i].fields.tag_name
            tag['id'] = tagList[i].pk
            
            if (tagIds.indexOf(tagList[i].pk) == -1) {
                tagIds.push(tagList[i].pk)
                tagValues.push(tag)
                
                if (tagList[i].fields.is_relevant) {
                    tagRelevantCards.push ( 
                        <div className={this.props.isMobile ? 
                                            "col-xs-6 introform-cards-mobile" : "introform-cards"} 
                            key={i}
                            >
                            <div className={indexOfTag == -1 ? "refier_card" : "refier_card_selected"}
                                onClick={() => {
                                    self.tagFrameClicked(self.props.tagList[i].pk,
                                        self.props.tagList[i].fields.tag_name, self)
                                }}>
                                <div className="refier_card_image">
                                    <img
                                        style={{filter: 'grayscale(95%)'}}
                                        src={tagList[i].fields.tag_photo ? (MEDIA_URL_TEXT +
                                            tagList[i].fields.tag_photo) : TagImg}
                                    /> </div>
                                <div className="refier_card_title refier_card_title_white">
                                    <p >
                                        {tagList[i].fields.tag_name}</p>
                                    {indexOfTag == -1 ? null :
                                        <p>
                                            <span>Selected</span>
                                            <span style={{ paddingLeft: "5px" }}>
                                                <FontAwesome name="check" />
                                            </span>
                                        </p>}
                                </div></div>
                        </div>
                    )
                }
                else {
                    tagOtherCards.push (
                        <div className={this.props.isMobile ? 
                            "col-xs-6 introform-cards-mobile" : "introform-cards"}
                            key={i}
                        >
                            <div className={indexOfTag == -1 ? "refier_card" : "refier_card_selected"}
                                onClick={() => {
                                    self.tagFrameClicked(self.props.tagList[i].pk,
                                        self.props.tagList[i].fields.tag_name, self)
                                }}>
                                <div className="refier_card_image">
                                    <img
                                        style={{filter: 'grayscale(95%)'}}
                                        src={tagList[i].fields.tag_photo ? (MEDIA_URL_TEXT +
                                            tagList[i].fields.tag_photo) : TagImg}
                                    /> </div>
                                <div className="refier_card_title refier_card_title_white">
                                    <p >
                                        {tagList[i].fields.tag_name}</p>
                                    {indexOfTag == -1 ? null :
                                        <p>
                                            <span>Selected</span>
                                            <span style={{ paddingLeft: "5px" }}>
                                                <FontAwesome name="check" />
                                            </span>
                                        </p>}
                                </div></div>
                        </div>
                    )
                }
            }

        }

        this.setState({
            otherTags: tagOtherCards,
            relevantTags: tagRelevantCards
        })
    }

    setSelectedTags(newValue) {
        this.setState({ selectedTags: newValue })
    }

    tagFrameClicked(id, name, self){
        let selectedTags = self.state.selectedTags
        let selectedTagIds = self.state.selectedTagIds
        let tag = {}
        tag['value'] = name
        tag['label'] = name
        tag['id'] = id
        let indexOfSelectedTag = selectedTagIds.indexOf(id)

        if (indexOfSelectedTag === -1) {
            selectedTags.push(tag)
            selectedTagIds.push(id)
        }
        else{
            selectedTags.splice(indexOfSelectedTag, 1)
            selectedTagIds.splice(indexOfSelectedTag, 1)
        }
        self.setState(
            {selectedTags: selectedTags, selectedTagIds: selectedTagIds}, 
            () => this.getTagValues(self.props.tagList)
        )
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
        this.props.submitDetails();
    }

    render() {
        // console.log("IntroFormInterestsSelect", this.props, this.state)

        let finaldesc = []
        if (this.state.selectedTags.length > 0) {
            for (let i = 0; i < this.state.selectedTags.length; i++){
                let index = i % 4
                finaldesc.push (
                    <Button key={i} className="refier_custom_button_new_selected">
                        {this.state.selectedTags[i]["label"]}
                    </Button>
                )
            }
        }

        
        let actionButton = (
            this.props.loaderStatus === 2 ?
                <PreLoader /> :
                this.state.selectedTags.length === 0 ?
                    <Button 
                        disabled
                        className="refier_custom_button_new_selected_2_disabled">
                        Next
                    </Button> :
                    this.state.selectedTags.length === 1 ?
                        <Button 
                            disabled
                            className="refier_custom_button_new_selected_2_disabled load_33">
                            Next
                        </Button> :
                        this.state.selectedTags.length === 2 ?
                            <Button 
                                disabled
                                className="refier_custom_button_new_selected_2_disabled load_66">
                                Next
                            </Button> :
                            <Button 
                                className="refier_custom_button_new_selected_2"
                                onClick={() => this.onSave()}>
                                {this.props.showSubmitButton ? "Submit" : "Next"}
                            </Button>
        );


        return (
            <div>
                <div className="introform-nav" 
                    style={{position: 'fixed', top: '0', width: '100%', zIndex: '10001'}}>
					<Col xs={8} md={9} mdOffset={1} className="introform-nav-option-selected">
                        { finaldesc }
					</Col>
					<Col xs={4} md={1} className="introform-nav-action-button">
						{ actionButton }
					</Col>
				</div>
                { this.props.isMobile ?
                    <div>
                        <Col xs={12} style={{ marginTop: "100px", marginBottom: "50px" }}>
                            <div className="introform-tiles-mobile" style={{marginBottom: '50px'}}>
                                <Col xs={12}
                                    className="introform-cta-tile-mobile" 
                                    style={{marginBottom: '50px'}}>
                                    <div className="introform-cta-tile-header">
                                        Your Learning Goals...?
                                    </div>
                                    <div className="introform-cta-tile-sub-header">
                                        ( Click at least 3 )
                                    </div>
                                </Col>
                                <Col xs={12} style={{marginBottom: '30px'}}>
                                    <div className="sub-list-header" style={{marginBottom: '20px'}}>
                                        Suggested Topics
                                    </div>
                                    <div>
                                        {this.state.relevantTags}
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div className="sub-list-header" style={{marginBottom: '20px'}}>
                                        Other Topics
                                    </div>
                                    <div>
                                        {this.state.otherTags}
                                    </div>
                                </Col>
                            </div>
                        </Col>
                    </div>

                    :

                    <div  className="introform-body-wrapper">
                        <Col sm={12} mdOffset={1} md={10} style={{ marginTop: "40px", marginBottom: "50px" }}>
                            <div className="introform-tiles" style={{marginBottom: '50px'}}>
                                <Col sm={12} md={5} 
                                    className="introform-cta-tile" 
                                    style={{marginRight: '50px', marginBottom: '50px'}}>
                                    <div className="introform-cta-tile-header">
                                        Your Learning Goals...?
                                    </div>
                                    <div className="introform-cta-tile-sub-header">
                                        ( Click at least 3 )
                                    </div>
                                </Col>
                                <Col sm={12} md={7}>
                                    <div className="sub-list-header" style={{marginBottom: '20px'}}>
                                        Suggested Topics
                                    </div>
                                    <div>
                                        {this.state.relevantTags}
                                    </div>
                                </Col>
                            </div>
                            <Col sm={12}>
                                <div className="sub-list-header" style={{marginBottom: '20px'}}>
                                    Other Topics
                                </div>
                                <div>
                                    {this.state.otherTags}
                                </div>
                            </Col>
                        </Col>
                    </div>
                }
			</div>
        )
    }
}