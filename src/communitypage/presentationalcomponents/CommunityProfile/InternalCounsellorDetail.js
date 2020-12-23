import React, { Component } from 'react';
import {
  Form, Col, ControlLabel, FormGroup, FormControl,
  Button, Grid, DropdownButton, InputGroup, MenuItem, SplitButton, Glyphicon, Row, Checkbox
} from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree';
import { handleNullStringWhileConcatenation } from '../../../HelperFunctions/handleNullStringWhileConcatenation';

class InternalCounsellorDetail extends Component {

  render() {
    let teacherList=[]
    for(var i=0;i<this.props.nodes.length;i++){
        teacherList.push(
              <Checkbox onChange={this.props.onEditCheckBoxes} checked = {this.props.nodes[i].fields.is_internal_mentor}
                value = {this.props.nodes[i].pk}>
                     {this.props.nodes[i].fields.community_member.first_name + 
                     handleNullStringWhileConcatenation(this.props.nodes[i].fields.community_member.last_name , " ")} </Checkbox>
        )
    }


    let teacherDetail = 
      <div style={{ "margin": "5px 10px" }}>
          <Row>
        <Col xs={4} style={{"paddingLeft":"20px"}}>
          <FormGroup>
            {teacherList}
          </FormGroup>  
        </Col>

      
        <Col  xs={5} style={{"textAlign":"right", "paddingLeft":"10px","margin":"10px 0px"}} >
            <Button bsStyle="default" className="refier_custom_button_new_small"
                  style={{"fontWeight":"700"}} 
                   onClick={this.props.onChangeInternalCounsellors}>Save</Button>
            <Button bsStyle="default" className="refier_custom_button_new_small" 
             onClick={this.props.onCancelCounsellorChanges} 
             style={{"marginLeft":"10px","fontWeight":"700"}}>Cancel</Button>
          </Col>
        </Row>

        <br />
        {(this.props.modalResponseState) ? 
                <div style={{"color" : (this.props.modalResponseTypeState === "success") ? "#008744" : "#d62d20"}}>
                  {this.props.modalResponseState}
                </div>
                : null}
      </div>
    

    return (
          <div>
            {teacherDetail}
          </div>  
    )


  }
}
export default InternalCounsellorDetail;