import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, } from 'react-bootstrap';

import CommonCards from '../presentationalcomponents/CommonCards';
import {
	changeTextboxState, changeAddTextboxState, setProfileDetails, changeUserDetailsTextBoxState,
	fetchAutoSuggestInstitutesData, getInstituteTreeStructure, updateUserTags
} from './action.js';
import { getHierarchyStringOfSchool } from '../../HelperFunctions/getHierarchyStringOfSchool';
import { searchEntitiesInTree } from '../../HelperFunctions/searchEntititesInTree';
import IntroFormInterestsSelect from '../presentationalcomponents/IntroFormInterestsSelect'
import {getTagsList} from '../../dashboardpage/conditionalcomponents/action'


class IntroFormInterestsSelectController extends Component {

	constructor(props) {
		super(props);
		this.onEdit = this.onEdit.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.saveDetails = this.saveDetails.bind(this);
		this.state = { 
			showEditDiv: false, 
			showAddDiv: false, 
			showButtons: this.props.writeAccess(),
			loaderStatus: 0
		};
		this.onChangeTextbox1 = this.onChangeTextbox1.bind(this);
		this.onAddText = this.onAddText.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		//console.log("CommonCardsBlah :: componentWillReceiveProps" , nextProps.writeAccess);
		if (nextProps.writeAccess !== this.props.writeAccess) {
			this.setState({ showButtons: nextProps.writeAccess() })
		}	
		if (this.props.isIntroForm && Object.keys(this.props.profileTags).length === Object.keys(nextProps.profileTags).length) {			
			this.setState({ showEditDiv: true });
			this.setState({ showButtons: false });
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

	addOrUpdateTags(formdata) {
		let returnPromise = this.props.dispatch(updateUserTags(formdata));
		this.setState({ loaderStatus: 2 })               
		let self = this
		returnPromise.then((response) => {
			self.props.dispatch({ type: 'setProfileData', data: response, section: "hobbies" })
			if (self.props.isIntroForm) {
				self.props.dispatch(getTagsList())
			}
			let status = 0

			if(typeof response == "undefined")  status = -1;
			else if(response) status = 1;

			this.setState({ loaderStatus: status })             

			setTimeout(() => {
				this.setState({ 
					loaderStatus: 0
				})
			}, 1000) 
		}
		)
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
			//console.log("updateProfileDetail::",formdata.elements[i].name,formdata.elements[i].value,formdata.elements[i].checked);
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
		//console.log("CommonCardsBlah::")
		this.setState({ showEditDiv: false });
		this.setState({ showAddDiv: false });
		this.setState({ showButtons: true });
	}

	onEdit() {
		if (!this.props.writeAccess()) {
			return;
		}
		//console.log("CommonCardsBlah::")
		this.setState({ showEditDiv: true });
		this.setState({ showButtons: false });
	}

	onAdd() {
		if (!this.props.writeAccess()) {
			return;
		}
		//console.log("CommonCardsBlah::")
		this.setState({ showAddDiv: true });
		this.setState({ showButtons: false });
	}

	onDeleteProfileData(profiledata) {
		//console.log(profiledata);
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

	render() {
        // console.log("IntroFormInterestsSelectController::", this.props);
        
		return (
			<IntroFormInterestsSelect {...this.props} {...this.state}
				onEditFunction={this.onEdit} 
				onChangeTxtBoxEvent={this.onChangeTextbox1}
				loaderStatus={this.state.loaderStatus}
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
			/>
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
		tagList: store.appDataReducer.tagsListState
	}
}

export default connect(mapStateToProps)(IntroFormInterestsSelectController);