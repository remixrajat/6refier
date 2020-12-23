import React, { Component } from 'react';
import { getInternalCounsellorDetails, addInternalCounsellor } from './action.js';
import 'redux';
import { connect } from 'react-redux';
import InternalCounsellor from  '../presentationalcomponents/CommunityProfile/InternalCounsellor.js'
import InternalCounsellorModal from  '../presentationalcomponents/CommunityProfile/InternalCounsellorModal.js'
import { Grid, Row, Col, button, Image, imageShapeInstance, imageResponsiveInstance, Thumbnail } from 'react-bootstrap';

class InternalCounsellorController extends Component {

  constructor(props)
  {
  	super(props);
	  //console.log("hellointernalcouns",this.props);

	  this.state={showCounsellorModal:false, teachersList:this.props.teacher,teacherChecked:[],teacherToAdd:[],
					nodes : JSON.parse(JSON.stringify(this.props.communityTeacherDataState || []))};

		if(this.state.teachersList){
			for(var i=0;i<this.state.teachersList.length;i++)
			{
				this.state.teacherChecked.push(false);
			}
		}  
	 
  	this.addCounsellor=this.addCounsellor.bind(this);
  	this.closeModal=this.closeModal.bind(this);
		this.addTeacher = this.addTeacher.bind(this);
		
	}

	componentDidMount() {
		if (this.props.communityTeacherDataState) {
			this.addNodes(this.props.communityTeacherDataState)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.communityTeacherDataState) {
			if (nextProps.communityTeacherDataState) {
				this.addNodes(nextProps.communityTeacherDataState)
			}
		}
	}

	addNodes(teacherDataState) {
		this.setState({ nodes: JSON.parse(JSON.stringify(teacherDataState || [])) })
	}
	
  addCounsellor()
  {
  	this.setState({showCounsellorModal:true});
	}
	
  addTeacher(id,e)
  {
  	//console.log(e.target.checked,id);
  	if(e.target.checked)
  	{
  		let arr=this.state.teacherChecked;
  		arr[id]=true;
  		//console.log("idhello",id);
  		this.setState({teacherChecked:arr});
  	}
  	else
  	{
  		let arr=this.state.teacherChecked;
  		arr[id]=false;
  		this.setState({teacherChecked:arr});
  	}

	}
	
  closeModal(){
		this.setState({
			showCounsellorModal: false,
			// nodes: [],
			modalResponseState: null, modalResponseTypeState: null, 
					modalFreeze:false});
  }

  onEditCheckBoxes(e){
	let selectedTeacherId = e.target.value;
	let ifSelectedOrUnselected = e.target.checked;
	let teacherNodeArray = this.state.nodes;
	let selectedTeacher = teacherNodeArray.find(o => o.pk == selectedTeacherId);
	selectedTeacher.fields.is_internal_mentor = ifSelectedOrUnselected;
	this.setState({nodes : teacherNodeArray});
  }

 onCancelCounsellorChanges(){
	 this.setState({nodes : JSON.parse(JSON.stringify(this.props.communityTeacherDataState))})
 } 
 
  onChangeInternalCounsellors()
  {
	  let counsellorList = this.state.nodes.filter(o => o.fields.is_internal_mentor === true).map(o => o.pk);
	  let commId = this.props.match.params.communityId;
	  let returnPromise = this.props.dispatch(addInternalCounsellor(commId,counsellorList));

	  returnPromise.then((response) => {
		let modalResponseType = response;
	  
		if(response === "success"){
		  this.setState({modalResponseState : "Data Successfully Changed." , modalResponseTypeState : modalResponseType, 
						  modalFreeze:true});
		}
		else{
		  //console.log("error response", response.response,response.response.data.length);
		  let errorText = "";
		  if(response.response.data.length < 200){
			errorText = response.response.data;
		  }
		  else{
			errorText = response.response.statusText;
		  }
		  this.setState({modalResponseState : "Error : " + errorText,
						modalResponseTypeState : modalResponseType});
		}
	  })
	  .catch((err) => {
		//console.log("caught error is ", err);
	  })
  }

	render() {
		
		console.log("InternalCounsellorController :: props : state : ", this.props, this.state)

return (
<div>
   <InternalCounsellor addCounsellor={this.addCounsellor} {...this.props} />
   <InternalCounsellorModal closeModal={this.closeModal} showCounsellorModal={this.state.showCounsellorModal} {...this.props}
   addTeacher={this.addTeacher} {...this.state} onEditCheckBoxes={this.onEditCheckBoxes.bind(this)}
   onChangeInternalCounsellors = {this.onChangeInternalCounsellors.bind(this)}
   onCancelCounsellorChanges = {this.onCancelCounsellorChanges.bind(this)}/>
</div>
);
  }
}

export default InternalCounsellorController;