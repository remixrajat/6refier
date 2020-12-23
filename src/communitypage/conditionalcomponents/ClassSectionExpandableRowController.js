import React, { Component } from 'react';
import 'redux';
import {connect} from 'react-redux'
import { Grid, Row, Col, Table, Button, FormGroup, FormControl, Form } from 'react-bootstrap';

import AddElementToClsSecSubTreeModal from
 '../presentationalcomponents/CommunityProfile/AddElementToClsSecSubTreeModal'
import EditElementOfClsSecSubTreeModal from
 '../presentationalcomponents/CommunityProfile/EditElementOfClsSecSubTreeModal'
import ClassSectionExpandableRow from 
 '../presentationalcomponents/CommunityProfile/ClassSectionExpandableRow.js'
import AddSubjectToTreeModal from '../presentationalcomponents/CommunityProfile/AddSubjectsToTreeModal.js';
import EditSubjectTeacherOfTreeModal from '../presentationalcomponents/CommunityProfile/EditSubjectTecherOfTreeModal.js';
import FontAwesome from 'react-fontawesome';
import {addUpdateDeleteEntities , fetchAutoSuggestSubjectData, addSubjectsToCommunity, fetchAutoSuggestCommunityMembersData,
          editDeleteSubjectTeachersEntity} from './action';
import {compareObjects} from '../../HelperFunctions/compareObjects';

class ClassSectionExpandableRowController extends Component {

  constructor(props) {
    super(props);
    
    let returnStateValues = this.getSubjectTeacherStateFromProps(this.props);
    this.state = { isExpanded: false, showAddModal: false, isEdit: false ,isModalTypeDelete:false, modalFreeze : false,
                    showAddSubjectModalState : false , showEditSubjectTeacherModalState:false,
                  enteredSingleSubjectState : returnStateValues[0] , enteredTeacherState : returnStateValues[1]};
    this.makeExpandable = this.makeExpandable.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.enableEditing = this.enableEditing.bind(this);
    this.disableEditing = this.disableEditing.bind(this);
    this.submitDetails = this.submitDetails.bind(this);
    this.confirmDeleteOption = this.confirmDeleteOption.bind(this);
    this.showAddSubjectModal = this.showAddSubjectModal.bind(this);
    this.closeAddSubjectModal = this.closeAddSubjectModal.bind(this);
    this.onchangeDynamicFetch = this.onchangeDynamicFetch.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onNewSubjectNameChange = this.onNewSubjectNameChange.bind(this);
    this.onNewSubjectCodeChange = this.onNewSubjectCodeChange.bind(this);
    this.addSubjectsOnClick = this.addSubjectsOnClick.bind(this);
    this.showEditSubjectTeacherModal = this.showEditSubjectTeacherModal.bind(this);
    this.closeEditSubjectTeacherModal = this.closeEditSubjectTeacherModal.bind(this);
    this.onSuggestionSelectedSingleSubject = this.onSuggestionSelectedSingleSubject.bind(this);
    this.onSuggestionSelectedTeacher = this.onSuggestionSelectedTeacher.bind(this);
    this.onchangeDynamicFetchTeachers = this.onchangeDynamicFetchTeachers.bind(this);
    this.clearMappingStateForDeletion = this.clearMappingStateForDeletion.bind(this);
    this.getSubjectTeacherStateFromProps = this.getSubjectTeacherStateFromProps.bind(this);
    this.editDeleteSubjectOnClick = this.editDeleteSubjectOnClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    // if(!compareObjects(nextProps.details , this.props.details)){
      let returnStateValues = this.getSubjectTeacherStateFromProps(nextProps);
      this.setState({enteredSingleSubjectState : returnStateValues[0] , enteredTeacherState : returnStateValues[1]});
    // }
  }

  getSubjectTeacherStateFromProps(propsValue){
    let subjectDetails = {};
    let teacherDetails = {};

    subjectDetails.label = propsValue.details.label;
    subjectDetails.id = propsValue.details.id;
    if(propsValue.details.teacher){
        teacherDetails.value = propsValue.details.teacher.first_name + " " + propsValue.details.teacher.last_name;
        teacherDetails.member_id = propsValue.details.teacher.id;
      } 
      return [subjectDetails , teacherDetails]
    
  }

  closeAddModal() {
    this.setState({ showAddModal: false , modalResponseState : null , modalResponseTypeState : null, modalFreeze : false});
  }

  openAddModal() {
    this.setState({ showAddModal: true });
  }

  makeExpandable() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  enableEditing() {
    this.setState({ isEdit: true })
  }

  disableEditing() {
    this.setState({ isEdit: false ,isModalTypeDelete : false, modalResponseState : null , modalResponseTypeState : null,modalFreeze : false});
  }

  confirmDeleteOption(val,e){
    this.setState({isModalTypeDelete : val , modalResponseState : null , modalResponseTypeState : null, modalFreeze : false});
  }

  submitDetails(element , nodeId, actionType){
    if(actionType ==="delete" || (element.value != "" && element.value != null)){
      let schoolId = this.props.match.params.communityId;
      let x = this.props.dispatch(addUpdateDeleteEntities(actionType,nodeId,element.value, schoolId));
      x.then((response) => {
      let modalResponseType = response;

      if(response === "success"){
        this.setState({modalResponseState : "Data Successfully Changed" , modalResponseTypeState : modalResponseType, modalFreeze:true});
      }
      else{
        //console.log("error response", response.response);
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
  else{
    this.setState({modalResponseState : "Error : Cannot submit empty text !!", modalResponseTypeState : "error"});
  }  
  }

  showAddSubjectModal(){
    this.setState({showAddSubjectModalState : true});
  }

  closeAddSubjectModal(){
    this.setState({showAddSubjectModalState : false,
                  enteredSubjectsState : null,
                  newSubjectNamesState : "",
                  newSubjectCodeEnteredState : "",
                  newSubjectCodesState : "",
                  modalResponseState : null , 
                  modalResponseTypeState : null,
                  modalFreeze : false
                });
  }

  onchangeDynamicFetch(newValue){
    if(newValue != null && newValue != ""){
      this.props.dispatch(fetchAutoSuggestSubjectData(newValue));
    }
  }

  onchangeDynamicFetchTeachers(newValue){
    if(newValue != null && newValue != ""){
      let schoolId = this.props.match.params.communityId;
      this.props.dispatch(fetchAutoSuggestCommunityMembersData(newValue , schoolId , "teacher"));
    }
  }

  onSuggestionSelected(suggestionValue){
    let enteredSubjectsArray = []
    if(this.state.enteredSubjectsState){
      enteredSubjectsArray = this.state.enteredSubjectsState;
    }
    enteredSubjectsArray.push(suggestionValue)
    this.setState({enteredSubjectsState : enteredSubjectsArray , 
        modalResponseState : null , modalResponseTypeState : null, modalFreeze : false});
  }

  onSuggestionSelectedSingleSubject(suggestionValue){
    this.setState({enteredSingleSubjectState : suggestionValue,
        modalResponseState : null , modalResponseTypeState : null, modalFreeze : false });
  }

  onSuggestionSelectedTeacher(suggestionValue){
    this.setState({enteredTeacherState : suggestionValue ,
       modalResponseState : null , modalResponseTypeState : null, modalFreeze : false});
  }

  onNewSubjectNameChange(e){
    let value = e.target.value;
    this.setState({newSubjectNamesState : value});
    if(!this.state.newSubjectCodeEnteredState){
      this.setState({newSubjectCodesState : value});
    }
  }

  onNewSubjectCodeChange(e){
    let value = e.target.value;
    this.setState({newSubjectCodesState : value , newSubjectCodeEnteredState : true});
  }

  addSubjectsOnClick(){
    let schoolId = this.props.match.params.communityId;
    let entityId = this.props.details.value;
    let existingSubjectList = this.state.enteredSubjectsState;
    let newSubjectsNameList = this.state.newSubjectNamesState;
    let newSubjectsCodeList = this.state.newSubjectCodesState;

    if(!(existingSubjectList) && !(newSubjectsNameList)){
      this.setState({modalResponseState : "Error : Cannot submit empty text !!", modalResponseTypeState : "error"});
      return false;
    }
    if(newSubjectsCodeList && !(newSubjectsNameList)){
      this.setState({modalResponseState : "Error : Please enter Subject names corresponding to subject codes !!", modalResponseTypeState : "error"});
      return false;
    }

    let returnPromise = this.props.dispatch(addSubjectsToCommunity(
      schoolId, entityId, existingSubjectList, newSubjectsNameList, newSubjectsCodeList
    ));

    returnPromise.then((response) => {
      let modalResponseType = response;

      if(response === "success"){
        this.setState({modalResponseState : "Data Successfully Changed." , modalResponseTypeState : modalResponseType, 
                        modalFreeze:true , enteredSubjectsState : null});
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


  showEditSubjectTeacherModal(){
    this.setState({showEditSubjectTeacherModalState : true});
  }

  closeEditSubjectTeacherModal(){
    let returnStateValues = this.getSubjectTeacherStateFromProps(this.props);
    this.setState({showEditSubjectTeacherModalState : false,
                  enteredSingleSubjectState : returnStateValues[0],
                  enteredTeacherState : returnStateValues[1],
                  isSubjectDelete : false,
                  modalResponseState : null , 
                  modalResponseTypeState : null,
                  modalFreeze : false
                });
  }

  clearMappingStateForDeletion(){
    this.setState({
      enteredSingleSubjectState : null,
      enteredTeacherState : null,
      isSubjectDelete : true,
      modalResponseState : null , modalResponseTypeState : null, modalFreeze : false
    })
  }

  editDeleteSubjectOnClick(){
    let teacherId = this.state.enteredTeacherState ? this.state.enteredTeacherState.member_id : null;
    let subjectId = this.state.enteredSingleSubjectState ? this.state.enteredSingleSubjectState.id : null;
    let mappingId = this.props.details ? this.props.details.value : null;
    let schoolId = this.props.match.params.communityId;

    let returnPromise = this.props.dispatch(editDeleteSubjectTeachersEntity(mappingId,teacherId,subjectId,schoolId));

     returnPromise.then((response) => {
      let modalResponseType = response;

      if(response === "success"){
        this.setState({modalResponseState : "Data Successfully Changed" , modalResponseTypeState : modalResponseType, 
                        modalFreeze:true , enteredSubjectsState : null});
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
    // console.log("ClassSectionExpandableRowController :: props : ", this.props)

    let listItems = [];
    let childNodes = "";

    if (this.props.details.children != null) {

      for (var i = 0; i < this.props.details.children.length; i++) {
        if (this.props.details.children[i].type !== "Student") {
          if (i == 0) {
            childNodes = childNodes + this.props.details.children[i].label
          }
          else {
            childNodes = childNodes + " , " + this.props.details.children[i].label
          }
        }
        listItems.push(
          <ClassSectionExpandableRowController {...this.props} details={this.props.details.children[i]} />
        )
      }
    }

    return (
      <div>
        <ClassSectionExpandableRow {...this.props} 
                listItems={listItems} isExpanded={this.state.isExpanded}
                showAddModal={this.state.showAddModal} isEdit={this.state.isEdit}
                openAddModal={(this.props.details.childrenType == "Subject") ? this.showAddSubjectModal : this.openAddModal}
                makeExpandable={this.makeExpandable} 
                enableEditing={(this.props.details.type == "Subject") ? this.showEditSubjectTeacherModal:this.enableEditing}
                details={this.props.details}
                 />
        <AddElementToClsSecSubTreeModal close={this.closeAddModal}
          {...this.state} {...this.props}
          siblingNodes={childNodes} submitDetails={this.submitDetails}
        />
        <EditElementOfClsSecSubTreeModal close={this.disableEditing}
          {...this.state} confirmDeleteOption = {this.confirmDeleteOption}
          {...this.props} submitDetails={this.submitDetails}/>

        <AddSubjectToTreeModal {...this.state} {...this.props}
        close ={this.closeAddSubjectModal} 
        siblingNodes={childNodes}
        onSuggestionSelected ={this.onSuggestionSelected}
        inputValue = {this.props.subjectAutoSuggestProps}
        onchangeDynamicFetch = {this.onchangeDynamicFetch}
        onNewSubjectCodeChange = {this.onNewSubjectCodeChange}
        onNewSubjectNameChange = {this.onNewSubjectNameChange}
        addSubjectsOnClick = {this.addSubjectsOnClick}
        
         />

        <EditSubjectTeacherOfTreeModal {...this.props} {...this.state}
         close = {this.closeEditSubjectTeacherModal}
         onchangeDynamicFetch = {this.onchangeDynamicFetch}
         onchangeDynamicFetchTeachers = {this.onchangeDynamicFetchTeachers}
         onSuggestionSelectedSingleSubject = {this.onSuggestionSelectedSingleSubject}
         onSuggestionSelectedTeacher = {this.onSuggestionSelectedTeacher}
         subjectDetails = {this.state.enteredSingleSubjectState}
         teacherDetails = {this.state.enteredTeacherState}
         clearMappingStateForDeletion = {this.clearMappingStateForDeletion}
         editDeleteSubjectOnClick = {this.editDeleteSubjectOnClick}
         />
      </div>
    );
  }
}

let mapStateToProps = (store) => {
  return {subjectAutoSuggestProps : store.communityPageDataReducer.subjectAutoSuggestState,
          teacherAutoSuggestProps : store.communityPageDataReducer.teacherAutoSuggestState
  }
}

export default connect(mapStateToProps)(ClassSectionExpandableRowController);
