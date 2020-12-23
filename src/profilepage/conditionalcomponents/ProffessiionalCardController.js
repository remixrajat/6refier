import React,{Component} from 'react';
import {connect} from 'react-redux';
import ProffessionalDetailsCards from '../presentationalcomponents/ProffessionalCard';
import {changeInstitutionDetailsState, changeDesignationDetailsState, changeYearDetailsState,changeDescriptionDetailsState,
addInstitutionDetailsState,addIDesignationDetailsState,addYearDetailsState,addDescriptionDetailsState, setProfileDetails} from './action.js';

class ProffessionalCardController extends Component{

	constructor(props)
    {
        super(props);
        this.onAdd=this.onAdd.bind(this);
		this.saveDetails=this.saveDetails.bind(this);
		this.onCancelAdd = this.onCancelAdd.bind(this);
		this.updateProfileDetail = this.updateProfileDetail.bind(this);
        this.state={showAddDiv : false, showButtons:this.props.writeAccess()};
	}

	componentWillReceiveProps(nextProps) {
		//console.log("CommonCardsBlah :: componentWillReceiveProps" , nextProps.writeAccess);
		if (nextProps.writeAccess !== this.props.writeAccess){
			this.setState({showButtons : nextProps.writeAccess()})
		}
	}
	
	saveDetails(formdata){
		if(!this.props.writeAccess()){
			return;
		}
		//console.log(formdata);
		let params = {};
		let objectPropName = this.props.objectPropName;
		params.action = "add";
		for(let i=0;i<formdata.elements.length;i++){
			if(formdata.elements[i].type === "checkbox"){
				params[ formdata.elements[i].name ] =  formdata.elements[i].checked;		
			}else{
				params[ formdata.elements[i].name ] =  formdata.elements[i].value;
			}
			
		}
		params.objectPropName = objectPropName; 
		this.props.dispatch(setProfileDetails(params));
		this.setState({showAddDiv:false});
		this.setState({showButtons:true});
	}


	updateProfileDetail(formdata, previousVal){
		if(!this.props.writeAccess()){
			return;
		}
		//console.log(formdata,previousVal);
		let params = {};
		let objectPropName = this.props.objectPropName;
		//console.log("updateProfileDetail::",formdata.elements);
		params.action = "edit";
		for(let i=0;i<formdata.elements.length;i++){
			//console.log("updateProfileDetail::",formdata.elements[i].name,formdata.elements[i].value,formdata.elements[i].checked);
			if(formdata.elements[i].type === "checkbox"){
				params[ formdata.elements[i].name ] =  formdata.elements[i].checked;
			}else{
				params[ formdata.elements[i].name ] =  formdata.elements[i].value;
			}
			
		}
		params.objectPropName = objectPropName; 
		params.pk = previousVal.pk;
		//console.log("updateProfileDetail::",params);
		this.props.dispatch(setProfileDetails(params));
		this.setState({showEditDiv:false});
		this.setState({showAddDiv:false});
		this.setState({showButtons:true});	
	}

	onDeleteProfileData(profiledata){
		if(!this.props.writeAccess()){
			return;
		}
		console.log("onDeleteProfileData::",profiledata);
		let params = {};
		params.pk = profiledata.pk;
		params.action = "delete";
		params.objectPropName = this.props.objectPropName; 
		this.props.dispatch(setProfileDetails(params));
		this.setState({showAddDiv:false});
		this.setState({showButtons:true});	

	}
	


    onAdd()
    {
		if(!this.props.writeAccess()){
			return;
		}
        this.setState({showAddDiv:true});
        this.setState({showButtons:false});
	}
	
	onCancelAdd(){
		this.setState({showAddDiv:false});
        this.setState({showButtons:true});
	}

    onChangeEditInstitution(e){
		let uniqueId = e.target.id;
		let tbvalue = e.target.value;
		this.props.dispatch(changeInstitutionDetailsState(tbvalue,uniqueId));
	}

	onEditDesignation(e){
		let uniqueId = e.target.id;
		let tbvalue = e.target.value;
		this.props.dispatch(changeDesignationDetailsState(tbvalue,uniqueId));
	}
	onEditYear(e){
		let uniqueId = e.target.id;
		let tbvalue = e.target.value;
		this.props.dispatch(changeYearDetailsState(tbvalue,uniqueId));
	}
	onEditDescription(e){
		let uniqueId = e.target.id;
		let tbvalue = e.target.value;
		this.props.dispatch(changeDescriptionDetailsState(tbvalue,uniqueId));
	}

	onAddInstitution(e){
		let tbvalue = e.target.value;
		this.props.dispatch(addInstitutionDetailsState(tbvalue));
	}

	onAddDesignation(e){
		let tbvalue = e.target.value;
		this.props.dispatch(addIDesignationDetailsState(tbvalue));
	}

	onAddYear(e){
		let tbvalue = e.target.value;
		this.props.dispatch(addYearDetailsState(tbvalue));
	}
   	
   	onAddDescription(e){
		let tbvalue = e.target.value;
		this.props.dispatch(addDescriptionDetailsState(tbvalue));
	}

	render()
	{
		return(
			<ProffessionalDetailsCards onEditFunction={this.onEdit} onChangeInstitution={this.onChangeEditInstitution}
			{...this.props}  onAddFunction={this.onAdd} onChangeDesignation={this.onEditDesignation}
			  state={this.state} onChangeYear={this.onEditYear} onChangeDescription={this.onEditDescription}
			onSave={this.saveDetails} updateProfileDetail={this.updateProfileDetail} onAddInstitution={this.onAddInstitution}
			onAddDesignation={this.onAddDesignation} onAddYear={this.onAddYear} onDeleteProfileData={this.onDeleteProfileData.bind(this)}
			onAddDescription={this.onAddDescription} onCancelAdd={this.onCancelAdd} writeAccess={this.props.writeAccess} />
		);
		
	}
}

let mapStateToProps = (store) => {
	return {
		editInstitutionStateProp : store.profileDataReducer.instValue,
		editDesignationStateProp : store.profileDataReducer.desValue,
		editDescriptionStateprop : store.profileDataReducer.descritptionValue,
		editYearStateProp : store.profileDataReducer.yearValue,
		addInstitutionStateProp : store.profileDataReducer.newInst,
		addDesignationStateProp : store.profileDataReducer.newDesgn,
		addDescriptionStateprop : store.profileDataReducer.newDescr,
		addYearStateProp : store.profileDataReducer.newYear
	}
}

export default connect(mapStateToProps)(ProffessionalCardController);