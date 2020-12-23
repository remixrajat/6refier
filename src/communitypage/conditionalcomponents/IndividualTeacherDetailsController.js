import React, { Component } from 'react';
import {
  Form, Col, ControlLabel, FormGroup, FormControl,
  Button, Grid, DropdownButton, InputGroup, MenuItem, SplitButton, Glyphicon, Row
} from 'react-bootstrap';
import CommonModal from '../../shared/CommonModal';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree';
import IndividualTeacherDetail from
 '../../communitypage/presentationalcomponents/CommunityProfile/IndividualTeacherDetail';
 import {assignSubjectToTeachers} from './action';


class IndividualTeacherDetailsController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checkedList||[],
      expanded: [],
      isEdit: false,
      status: null,
      isError: false,
    };

    this.onCheck = this.onCheck.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.makeEditable = this.makeEditable.bind(this);
    this.makeUneditable = this.makeUneditable.bind(this);
    this.submitCheckedOptions = this.submitCheckedOptions.bind(this);
    this.setStatus = this.setStatus.bind(this)
    this.setError = this.setError.bind(this)
    this.unsetError = this.unsetError.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.checkedList != nextProps.checkedList)
    {this.setState({
     checked: nextProps.checkedList||[]
    })}
  }

  onCheck(checked) {
    //console.log("checkedTeachers",checked)
    this.setState({ checked });
  }

  unsetError(){
    this.setState({isError:false})
  }

  setError(){
    this.setState({isError:true})
  }

  onExpand(expanded) {
    this.setState({ expanded });
  }

  makeEditable() {
    this.setState({ isEdit: true });
  }

  setStatus(status){
    this.setState({status:status})
  }

  makeUneditable() {
    this.setState({ isEdit: false });
  }

  submitCheckedOptions(){
    let checkedOptions = this.state.checked;
    let teacherId = this.props.teacherId;
    let commId = this.props.match.params.communityId;
    let returnPromise = this.props.dispatch(assignSubjectToTeachers(teacherId,checkedOptions,commId));
    returnPromise.then((response) => {
      if(response=="success"){
        this.unsetError()
        this.setStatus("Subjects has been assigned")
      }
      else{
        this.setError()
        this.setStatus("Failed!! Can only assign subjects to Teachers")
      }
    })
    this.setState({ isEdit: false });
  }


  render() {
    //console.log("IndividualTeacherDetailsController : ", this.props)

    const { checked, expanded } = this.state;

    return (
      <IndividualTeacherDetail {...this.props} nodes={this.props.nodes} checked={checked} 
            expanded={expanded} onCheck={this.onCheck} onExpand={this.onExpand}
            isEditable={this.makeEditable} isUneditable={this.makeUneditable}
            edit={this.state.isEdit} submitCheckedOptions = {this.submitCheckedOptions}
            status={this.state.status} isError={this.state.isError}/>
    )


  }
}
export default IndividualTeacherDetailsController;