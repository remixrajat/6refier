import React,{Component} from 'react';
import {connect} from 'react-redux';
import DetailsCard from '../presentationalcomponents/DetailsCard';
import {changeInstitutionDetailsState, changeDesignationDetailsState, changeYearDetailsState,changeDescriptionDetailsState,
addInstitutionDetailsState,addIDesignationDetailsState,addYearDetailsState,addDescriptionDetailsState} from './action.js';

class DetailsCardController extends Component{

	constructor(props)
    {
        super(props);
        this.onEdit=this.onEdit.bind(this);
        this.onAdd=this.onAdd.bind(this);
        this.saveDetails=this.saveDetails.bind(this);
        this.state={showEditDiv: false , showAddDiv : false, showButtons:true};
    }
    saveDetails()
    {
        this.setState({showEditDiv:false});
        this.setState({showAddDiv:false});
        this.setState({showButtons:true});
    }

    onEdit()
    {
        this.setState({showEditDiv:true});
        this.setState({showButtons:false});
    }

    onAdd()
    {
        this.setState({showAddDiv:true});
        this.setState({showButtons:false});
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
			<DetailsCard onEditFunction={this.onEdit} onChangeInstitution={this.onChangeEditInstitution}
			{...this.props}  onAddFunction={this.onAdd} onChangeDesignation={this.onEditDesignation}
			  state={this.state} onChangeYear={this.onEditYear} onChangeDescription={this.onEditDescription}
			onSave={this.saveDetails} onAddInstitution={this.onAddInstitution}
			onAddDesignation={this.onAddDesignation} onAddYear={this.onAddYear}
			onAddDescription={this.onAddDescription} />
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

export default connect(mapStateToProps)(DetailsCardController);