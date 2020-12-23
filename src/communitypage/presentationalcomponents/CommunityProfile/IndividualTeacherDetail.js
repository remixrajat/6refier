import React, { Component } from 'react';
import {
  Form, Col, ControlLabel, FormGroup, FormControl,
  Button, Grid, DropdownButton, InputGroup, MenuItem, SplitButton, Glyphicon, Row
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommonModal from '../../../shared/CommonModal';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree';
import FontAwesome from 'react-fontawesome';

class IndividualTeacherDetail extends Component {

  findInTree(treeNodes,mappingId){
    let result = false
    for(let i=0;i<treeNodes.length;i++){
      if(treeNodes[i].value == mappingId)
        return true
      if(treeNodes[i].children){
        if(treeNodes[i].children.length>0){
          result = this.findInTree(treeNodes[i].children,mappingId)
          if(result)
            return result
        }
      }
    }
    return result
  }

  include(arr,obj) {
    return (arr.indexOf(obj) != -1);
  }

  render() {
  //console.log("IndividualTeacherDetail::alreadyAssignedSubjects",this.props)

  let checkedSubjects = this.props.checked
  let treeNodes = this.props.nodes || []
  let verifiedCheckedList = []
  for(let i=0;i<checkedSubjects.length;i++){
    let mappingId = checkedSubjects[i]
    let result = this.findInTree(treeNodes,mappingId)
    if(result)
      verifiedCheckedList.push(mappingId)
  }

    let teacherAssignedList = "";
    if (this.props.alreadyAssignedSubjects) {
      if (this.props.alreadyAssignedSubjects.length > 0) {
        for (let i = 0; i < this.props.alreadyAssignedSubjects.length; i++) {
          if(this.include(verifiedCheckedList,this.props.alreadyAssignedSubjects[i].mapping_id))
              teacherAssignedList = teacherAssignedList + " , " + this.props.alreadyAssignedSubjects[i].path;
        }
        if(teacherAssignedList.length>3)
            teacherAssignedList = teacherAssignedList.substring(3, teacherAssignedList.length);
      }
    }



    let teacherDetail =
      <div style={{ "margin": "10px 0px" }}>
        <div>
          <Row>
          <Col xs={4} style={{ "textAlign": "left", "paddingLeft": "10px" }} >
          <div
          className="custom-list-content"
          style={{ "fontWeight": "400" }}>
          <Link to={"/userDashboard/profile/" + this.props.teacherId}
            className="custom_link">{this.props.teacher || ''}</Link>
          </div>
          </Col>
            {/* {this.props.edit ? <Col xs={6} style={{ "paddingLeft": "10px" }}>
              <CheckboxTree
                nodes={this.props.nodes || []}
                checked={verifiedCheckedList}
                expanded={this.props.expanded}
                nameAsArray={true}
                showNodeIcon={false}
                onCheck={this.props.onCheck}
                onExpand={this.props.onExpand}
              />
            </Col> : null} */}

            {/* {this.props.edit ?
              <Col xs={3} className="refier_text_on_light__4"
                style={{ "fontSize": "12px", "paddingLeft": "10px" }}>

              </Col>
              :
              <Col xsOffset={2} xs={6} className="refier_text_on_light__4" style={{ "fontSize": "12px" }}>
                {teacherAssignedList}
              </Col>
            } */}
            {
              this.props.edit ?
                <Col xs={3} style={{ "textAlign": "right", "paddingLeft": "10px" }} >
                  <Button bsStyle="default" className="refier_custom_button_new_small"
                    onClick={this.props.submitCheckedOptions}>Save</Button>
                  <Button bsStyle="default" className="refier_custom_button_new_small"
                    onClick={this.props.isUneditable} style={{ "marginLeft": "10px" }}>Cancel</Button>
                </Col> :
                <div>
                {/* <Col xs={3} style={{ "textAlign": "right", "paddingLeft": "10px" }}>
                  <Button bsStyle="default" className="refier_custom_button_new_small"
                    onClick={this.props.isEditable}>Assign</Button>
                </Col> */}
                <Col xs={3} style={{ "textAlign": "left", "paddingLeft": "10px" }}>
                    <Button bsStyle="default" className="refier_custom_button_new_small"
                    onClick={e => {this.props.openDeleteMemberModal(e,this.props.currentRow,"teacher")}}>
                    <FontAwesome name="trash-o"  /></Button>
                </Col>
                </div>
            }
          </Row>
        </div>
        {this.props.status?
          this.props.isError?
          <div
          className="refier_text_on_light__4"
          style={{ "fontWeight": "500" ,"marginLeft":"20px", color:"red",fontStyle:"italic" }}>
          {this.props.status}
          </div>
          :
          <div
          className="refier_text_on_light__4"
          style={{ "fontWeight": "500" ,"marginLeft":"20px", color:"#6b45af",fontStyle:"italic" }}>
          {this.props.status}
          </div>
        :
        null}
      </div>


    return (
      <div>
        {teacherDetail}
      </div>
    )


  }
}
export default IndividualTeacherDetail;