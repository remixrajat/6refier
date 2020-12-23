import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab} from 'react-bootstrap'

import {
	changeTextboxState, changeAddTextboxState, setProfileDetails,
	fetchAutoSuggestInstitutesData, getInstituteTreeStructure, updateUserTags
} from '../../profilepage/conditionalcomponents/action';
import { getHierarchyStringOfSchool } from '../../HelperFunctions/getHierarchyStringOfSchool';
import { searchEntitiesInTree } from '../../HelperFunctions/searchEntititesInTree';
import AddSkillsToCompany from '../presentationalcomponents/AddSkillsToCompany'
import AddSkillsToPackage from '../presentationalcomponents/AddSkillsToPackage'
import { 
	updateCommunitySkills, getCommunityPackagesMarketPlace, submitCommunitySkill,
	getPackageAssessmentSkill, updatePackageAssessmentSkills, getAllSkillAndTag,  
	getCompanySkillEntityMapping, getCommunitySkillsList
} from '../../dashboardpage/conditionalcomponents/action'

import AddCommunitySkillsToEntity from '../presentationalcomponents/CommunitySkills/AddCommunitySkillsToEntity'


class AddSkillsToCompanyController extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			showEditDiv: false, 
			showAddDiv: false, 
			showButtons: this.props.writeAccess(),
			loaderStatus: 0,
            skillName: '',
            skillDesc: '',
			skillCreateLoader: 0,
			packageIdList: [],
			packageLoaderStatus: 0
        };
        
		this.onEdit = this.onEdit.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.saveDetails = this.saveDetails.bind(this);
		this.onChangeTextbox1 = this.onChangeTextbox1.bind(this);
		this.onAddText = this.onAddText.bind(this);
		this.cancel = this.cancel.bind(this);
		this.submitSkill = this.submitSkill.bind(this);
		this.validateName = this.validateName.bind(this);
		this.validateDescription = this.validateDescription.bind(this);
		this.setName = this.setName.bind(this);
		this.setDescription = this.setDescription.bind(this);
		this.addOrUpdatePackageSkills = this.addOrUpdatePackageSkills.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		//console.log("AddSkillsToCompanyController :: componentWillReceiveProps" , nextProps.writeAccess);
		if(nextProps.writeAccess !== this.props.writeAccess) {
			this.setState({ showButtons: nextProps.writeAccess() })
		}	
	}

	saveDetails(formdata) {
		if (!this.props.writeAccess()) {
			return;
		}
		// console.log("saveDetails:formdata::", formdata);
		let params = {};
		let objectPropName = this.props.objectPropName;
		params.action = "add";
		for (let i = 0; i < formdata.elements.length; i++) {
			if (formdata.elements[i].type === "checkbox") {
				params[formdata.elements[i].name] = formdata.elements[i].checked;
			} else {
				params[formdata.elements[i].name] = formdata.elements[i].value;
			}

		}
		params.objectPropName = objectPropName;
		// console.log("saveDetails:params::", params);
		this.props.dispatch(setProfileDetails(params));
		this.setState({ showEditDiv: false });
		this.setState({ showAddDiv: false });
		this.setState({ showButtons: true });
	}

	updateProfileDetail(formdata, previousVal) {
		//console.log(formdata,previousVal);
		if (!this.props.writeAccess()) {
			return;
		}
		let params = {};
		let objectPropName = this.props.objectPropName;
		//console.log("updateProfileDetail::",formdata.elements);
		params.action = "edit";
		for (let i = 0; i < formdata.elements.length; i++) {
			if (formdata.elements[i].type === "checkbox") {
				params[formdata.elements[i].name] = formdata.elements[i].checked;
			} else {
				params[formdata.elements[i].name] = formdata.elements[i].value;
			}
		}
		params.objectPropName = objectPropName;
		params.pk = previousVal.pk;
		//console.log("updateProfileDetail::",params);
		this.props.dispatch(setProfileDetails(params));
		this.setState({ showEditDiv: false });
		this.setState({ showAddDiv: false });
		this.setState({ showButtons: true });
	}

	cancel() {
		this.setState({ showEditDiv: false });
		this.setState({ showAddDiv: false });
		this.setState({ showButtons: true });
	}

	onEdit() {
		if (!this.props.writeAccess()) {
			return;
        }
        
		this.setState({ showEditDiv: true });
		this.setState({ showButtons: false });
	}

	onAdd() {
		if (!this.props.writeAccess()) {
			return;
		}
		this.setState({ showAddDiv: true });
		this.setState({ showButtons: false });
	}

	onDeleteProfileData(profiledata) {
		let params = {};
		params.pk = profiledata.pk;
		params.action = "delete";
		params.objectPropName = this.props.objectPropName;
		this.props.dispatch(setProfileDetails(params));
		this.setState({ showEditDiv: false });
		this.setState({ showAddDiv: false });
		this.setState({ showButtons: true });
	}

	onChangeTextbox1(e) {
		let uniqueId = e.target.id;
		let tbvalue = e.target.value;
		this.props.dispatch(changeTextboxState(tbvalue, uniqueId, this.props.objectPropName));
	}

	onAddText(e) {
		let txtVal = e.target.value;
		this.props.dispatch(changeAddTextboxState(txtVal));
	}

	onSuggestionSelected(suggestionValue) {
		this.instituteName = suggestionValue.label;
		this.communityId = suggestionValue.id;
		let returnPromise = this.props.dispatch(getInstituteTreeStructure(this.communityId.split(".")[2], false));
		returnPromise.then((response) => {
			this.selectedTreeStructure = response;
			this.setState({ hierarchyString: getHierarchyStringOfSchool(this.selectedTreeStructure) });
		})
	}

	onchangeDynamicFetchInstitutesName(newValue) {
		if (newValue != null && newValue != "") {
			this.props.dispatch(fetchAutoSuggestInstitutesData(newValue));
		}
		this.instituteName = newValue;
		this.communityId = null;
	}

	onchangeDynamicFetchSubEntitiesName(newValue) {
		if (newValue != null && newValue != "") {
			let searchSet = searchEntitiesInTree(this.selectedTreeStructure, newValue);
			this.setState({ subEntitiesSuggestions: searchSet });
		}
		this.ClsSec = newValue;
		this.ClsSecId = null;
	}

	onSuggestionSelectedSubEntity(suggestionValue) {
		this.ClsSec = suggestionValue.label;
		this.ClsSecId = suggestionValue.id;
	}
	
	addOrUpdateTags(formdata) {
		this.setState({ loaderStatus: 2 })               
		let returnPromise = this.props.dispatch(updateCommunitySkills(formdata));

		// console.log("AddSkillsToCompany", {formdata})

		returnPromise.then((response) => {
			this.props.dispatch(getCommunityPackagesMarketPlace(this.props.communityId));
			this.props.dispatch(getAllSkillAndTag(this.props.communityId));
			this.props.dispatch(getCommunitySkillsList(this.props.communityId))

			let status = 0
			if(typeof response == "undefined")  status = -1;
			else if(response) status = 1;

			this.setState({ loaderStatus: status })             

			setTimeout(() => {
				this.setState({ 
					loaderStatus: 0
				})
			}, 1000) 
		})

		this.setState({ showEditDiv: false, showAddDiv: false, showButtons: true });
	}
	
	addOrUpdatePackageSkills(formdata) {
		this.setState({ packageLoaderStatus: 2 })     
		let returnPromise = this.props.dispatch(updatePackageAssessmentSkills(formdata));
		
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
	}

	submitSkill(e) {
		e.preventDefault();
		if(this.state.skillDesc.length > 500 || this.state.skillName.length > 200)
			return;

		const formData = {
			"skill_name": this.state.skillName,
			"description": this.state.skillDesc,
			"community_id": this.props.communityId
		}

		let skillPromise = this.props.dispatch(submitCommunitySkill(formData));
		this.setState({ skillCreateLoader: 2 })               

        skillPromise.then((resp) => {
                // console.log("******Response from server for isUserFollows: ", resp);
                let status = 0

                if(typeof resp == "undefined")  status = -1;
                else if(resp === 1) status = 1;

                this.setState({ skillCreateLoader: status })             
				setTimeout(() => {
					this.setState({ skillCreateLoader: 0 });
				}, 1000)                  
		})

		this.setState({ showEditDiv: false, showAddDiv: false, showButtons: true });
	}

	setName(e) {
		this.setState({skillName: e.target.value})
	}

	setDescription(e) {
		this.setState({skillDesc: e.target.value})
	}

	validateName() {
		const length = this.state.skillName.length;
		if(length < 1) return null
		else if(length < 200) return 'success'
		else if(length > 200) return 'error'
		return null;
	}

	validateDescription() {
		const length = this.state.skillDesc.length;
		if(length < 1) return null
		else if(length < 500) return 'success'
		else if(length > 500) return 'error'
		return null;
	}


	render() {
        // console.log("AddSkillsToCompanyController::", this.props);
        
		return (
			<div className="community-marketplace-tab-wrapper">
				<Tabs id="community-add-skill" defaultActiveKey="add_skill" bsStyle='pills'>
					<Tab eventKey="add_skill" title="Step: 1">
						<AddSkillsToCompany {...this.props} {...this.state}
							onEditFunction={this.onEdit} state={this.state}
							onChangeTxtBoxEvent={this.onChangeTextbox1}
							loaderStatus={this.state.loaderStatus}
							skillCreateLoader={this.state.skillCreateLoader}
							skillName={this.state.skillName}
							skillDesc={this.state.skillDesc}
							onAddFunction={this.onAdd} onCancel={this.cancel}
							onChangeAddTxtboxEvent={this.onAddText} 
							onSave={this.saveDetails} delete={this.onDeleteProfileData.bind(this)}
							onSaveDetails={this.updateProfileDetail.bind(this)}
							addOrUpdateTags={this.addOrUpdateTags.bind(this)}
							onSuggestionSelected={this.onSuggestionSelected}
							onchangeDynamicFetchInstitutesName={this.onchangeDynamicFetchInstitutesName}
							onchangeDynamicFetchSubEntitiesName={this.onchangeDynamicFetchSubEntitiesName}
							onSuggestionSelectedSubEntity={this.onSuggestionSelectedSubEntity} 
							submitDetails={this.props.submitDetails}
							showSubmitButton={this.props.showSubmitButton}
							submitSkill={this.submitSkill}
							validateName={this.validateName}
							validateDescription={this.validateDescription}
							setName={this.setName}
							setDescription={this.setDescription}
						/>
					</Tab>
					<Tab eventKey="package_mapping" title="Step: 2">
						<AddSkillsToPackage {...this.props} 
							communityId={this.props.communityId}
							packageLoaderStatus={this.state.packageLoaderStatus}
							addOrUpdatePackageSkills={this.addOrUpdatePackageSkills}
						/>
					</Tab>
					<Tab eventKey="entity_mapping" title="Step: 3">
						<AddCommunitySkillsToEntity {...this.props} 
							communityId={this.props.communityId}
							
						/>
					</Tab>
				</Tabs>
			</div>
		);

	}
}

let mapStateToProps = (store) => {
	return {
		textBoxStateProp: store.profileDataReducer.tbvalue,
		uniqueId: store.profileDataReducer.uniqueId,
		addTextBoxStateProp: store.profileDataReducer.txtVal,
		profileDataStateProps: store.profileDataReducer,
		instituteAutoSuggestProps: store.communityPageDataReducer.instituteAutoSuggestState,
		communityPackagesAsOwner: store.serviceDataReducer.communityPackagesAsOwner,
		getPackageAssessmentSkill: store.communityPageDataReducer.getPackageAssessmentSkill,
		// tagList: store.appDataReducer.tagsListState,
		tagList: store.communityPageDataReducer.getAllSkillAndTag,
		getCommunitySkillsDetails: store.communityPageDataReducer.getCommunitySkillsDetails,
		companySkillToSubEntity: store.communityPageDataReducer.companySkillToSubEntity,
	}
}

export default connect(mapStateToProps)(AddSkillsToCompanyController);