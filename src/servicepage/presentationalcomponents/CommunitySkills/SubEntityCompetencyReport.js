import React, { Component } from 'react'
import IndividualCompetencies from './IndividualCompetencies'
import Select from 'react-select';
import { connect } from 'react-redux';
import {addorupdateSubCommunityMappedToCompanySkills} from '../../../dashboardpage/conditionalcomponents/action'


class SubEntityCompetencyReport extends Component{

    constructor(props) {
        super(props)
        this.state = {
            addSkillsClicked:false,
            selectedTags: [],
            selectedTagIds: [],
        }
        this.clickAddSkills = this.clickAddSkills.bind(this)
        this.closeAddSkills = this.closeAddSkills.bind(this)
    }

    clickAddSkills() {
        this.setState({addSkillsClicked:true})
    }

    closeAddSkills() {
        this.setState({ addSkillsClicked: false })
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

        let tagsBody = []
        if (this.props.details.type !== "All"){
            if (this.props.skillToSubEntity) {
                let entityTags = this.props.skillToSubEntity[this.props.details.value]
                let _this = this
                
                if(entityTags){
                if (entityTags.length === 0) {
                    tagsBody.push(<div style={{ fontWeight: '400', fontSize: "12px" }}>Click on <b>Define Company Skills</b> on top to add Skills</div>)
                } else {
                    Object.keys(entityTags).forEach(function (key, i) {
                        // console.log("AddSkillsToCompany", key, i, _this.props.tagList)
                        // let index = this.props.profileTags.id ? this.props.profileTags.id + i : i
                        let index = key % 4;
                        let tag = {}
                        tag['value'] = entityTags[key]["label"]
                        tag['label'] = entityTags[key]["label"]
                        tag['id'] = entityTags[key]["tag_id"]
                        tag['unique_key'] = entityTags[key]["unique_key"]
                        tag['entity'] = entityTags[key]["entity"]
                    
                        if (_this.state.selectedTagIds.indexOf(tag['id']) == -1) {
                            _this.state.selectedTags.push(tag)
                            _this.state.selectedTagIds.push(tag['id'])
                        }
        
                        tagsBody.push(
                            <div key={i} className={"custom-list-tag-" + index}
                                style={{
                                    marginRight: "5px"
                                    // , display: "inline-block"
                                    , marginTop: "5px"
                                }}>
                                {entityTags[key]["label"]}
                            </div>
                        )
                    });
                }
            }
            }
        }
        return tagsBody
    }

    onSave() {
        let deletedTagList = [];
        let _this = this;
        if (this.props.companySkillToSubEntity) {
            let entityTags = this.props.companySkillToSubEntity[this.props.details.value]
        
            Object.keys(entityTags).forEach((profilekey) => {
                let isPresent = false;
                for (let k = 0; k < _this.state.selectedTags.length; k++) {
                    if (entityTags[profilekey]["tag_id"] === _this.state.selectedTags[k].id) {
                        isPresent = true;
                        break;
                    }
                }
                if (!isPresent) {
                    deletedTagList.push(entityTags[profilekey]["pk"]);
                }
            });

            let tempformValues = {
                objectPropName: this.props.objectPropName,
                selectedTags: this.state.selectedTags,
                deletetedTags: deletedTagList,
                communityId: this.props.communityId,
                entityId: this.props.details.value,
                // package_pk: this.props.pk
            }
            console.log("PackageCardForSkillMap::onSave", this.state.selectedTags,  tempformValues)
            // this.props.addOrUpdatePackageSkills(tempformValues);


        this.setState({ packageLoaderStatus: 2 })     
		let returnPromise = this.props.dispatch(addorupdateSubCommunityMappedToCompanySkills(tempformValues));
		
		// console.log("AddSkillsToCompanyController", {formdata})

		returnPromise.then((response) => {
			let status = 0
			if(typeof response == "undefined")  status = -1;
			else if(response) status = 1;

			this.setState({ packageLoaderStatus: status })             

			setTimeout(() => {
				this.setState({ 
					packageLoaderStatus: 0
				})
			}, 1000) 
		})

            this.closeAddSkills();
        }
    }


    render() {
        let listItems = []
        let childNodes = "";
        let tags = []

        if (this.props.details.children != null) {

        for (var i = 0; i < this.props.details.children.length; i++) {
            
            if (this.props.details.children[i].type != "Student") {
                listItems.push(
                    <SubEntityCompetencyReport {...this.props} details={this.props.details.children[i]} />
 
                )

            }
        }
        }

        let numberOfTags = 0
        if (this.props.skillToSubEntity) {
            let entityTags = this.props.skillToSubEntity[this.props.details.value]
            let _this = this
            
            if (entityTags) {
                if (entityTags.length != 0) {
                    numberOfTags = entityTags.length
                }
            }
        }


        console.log("AddCommunitySkillsToEntity :: props : ", this.props)
        return (
            <div>
                <IndividualCompetencies listItems={listItems} {...this.props}
                    addSkillsClicked={this.state.addSkillsClicked}
                    clickAddSkills={this.clickAddSkills}
                    closeAddSkills={this.closeAddSkills}
                    onShow={this.onShow.bind(this)}
                    onEdit={this.onEdit.bind(this)}
                    onSave={this.onSave.bind(this)}
                    isExpanded={true}
                    numberOfTags={numberOfTags}
                />
                </div>)
    }
}

let mapStateToProps = (store) => {
	return {
	}
}

export default connect(mapStateToProps)(SubEntityCompetencyReport);