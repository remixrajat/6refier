import React,{Component} from 'react';
import {connect} from 'react-redux';
import BasicDetailsCard from '../../communitypage/presentationalcomponents/CommunityProfile/BasicDetailsCard';
import {setCommunityBasicDetailsTransientState} from './action'
import {changeCommunityBasicDetailsState} from './action'

class BasicDetailsCardController extends Component{
	constructor(props)
	{
		super(props);
		this.onEdit=this.onEdit.bind(this);
		this.saveDetails=this.saveDetails.bind(this);
		this.state={showButtons:true};
		this.onInputChange = this.onInputChange.bind(this);
		this.onCancel = this.onCancel.bind(this)
	}
	saveDetails()
	{
		let formValues = this.props.communityBasicDetailsTransientState;
		this.props.dispatch(changeCommunityBasicDetailsState(formValues));
		this.setState({showButtons:true});	
	}

	onCancel()
	{
		this.setState({showButtons:true});	
	}

	onEdit()
	{
		this.setState({showButtons:false});
	}

	onInputChange(e){
		let elementName = e.target.name;
		let elementValue = e.target.value;
		this.props.dispatch(setCommunityBasicDetailsTransientState(elementName,elementValue))
	}

	// componentDidMount(){
	// 	//console.log("compMountBlah2",this.props)
	// 	// if(this.props.communityBasicDataState){
    //   // //console.log("@@@@@@$$$BasicDetails" ,this.props.communityBasicDataState[0].fields.community_name)
    //   let commBasicDetails = this.props.communityBasicDataState[0].fields;
	//   //console.log("compMountBlah" , commBasicDetails)
	//   this.props.dispatch(setCommunityBasicDetailsTransientState("communityName",commBasicDetails.community_name))
	//   this.props.dispatch(setCommunityBasicDetailsTransientState("communityContact",commBasicDetails.community_contact))
	//   this.props.dispatch(setCommunityBasicDetailsTransientState("communityEmail",commBasicDetails.community_email))
	//   this.props.dispatch(setCommunityBasicDetailsTransientState("communityDesc",commBasicDetails.community_description))
    // // }
	// }

	render()
	{
		if(this.props.communityBasicDataState){
			return (
			<BasicDetailsCard onSave={this.saveDetails} onCancel={this.onCancel} onEdit={this.onEdit} state={this.state} {...this.props}
			onInputChange={this.onInputChange}/>
			);
		}
		else{
			return (
				<div></div>
			)
		}
		
		
	}
}
let mapStateToProps = (store) => {
	return {communityBasicDetailsTransientState : store.communityBasicDataReducer}
}

export default connect(mapStateToProps)(BasicDetailsCardController) ;