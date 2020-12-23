import React, { Component } from 'react';
import { Table, Button, Glyphicon, Row, Col, Grid, InputGroup, FormGroup, FormControl,ControlLabel, Form } from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal';
import { getHierarchyStringOfSchool } from '../../../HelperFunctions/getHierarchyStringOfSchool';
import { handleNullStringWhileConcatenation } from '../../../HelperFunctions/handleNullStringWhileConcatenation';
import AutosuggestTextBox from '../../../shared/AutosuggestInput/presentationalcomponents/autosuggestTextBox';


export default class EditStudentDetailsModal extends Component {

  removeMemberFromIndividualCommunity(currentStudent, pathIndex) {
    console.log("EditStudentDetailsModal : currentStudent, pathIndex : ",
      currentStudent, pathIndex)
    this.props.onRemoveMemberFromIndividualCommunity(
      currentStudent.fields.community_member.id,
      currentStudent.fields.cls_sec_entity_array.id[pathIndex],
      currentStudent.fields.cls_sec_entity_array.member_id[pathIndex],
      "student")
  }

  render() {
    let currentStudent = this.props.selectedStudentToEdit;
    console.log("EditStudentDetailsModal :: selectedStudent is : ", this.props, currentStudent);
    let studentName = null;
    let studentEmail = null;
    let studentClsSecEntity = null;
      
    let communities = []
    let community_ids = []
    let community_divs = []
      
    if (currentStudent) {
      studentName = currentStudent.fields.community_member.first_name + handleNullStringWhileConcatenation(currentStudent.fields.community_member.last_name, " ");
      studentEmail = currentStudent.fields.community_member.email;
      studentClsSecEntity = currentStudent.fields.cls_sec_entity ? currentStudent.fields.cls_sec_entity.path : "";
            
      if (currentStudent.fields.cls_sec_entity_array) {
        let self = this
        for (let i = 0; i < currentStudent.fields.cls_sec_entity_array.id.length; i++) {
          communities.push(currentStudent.fields.cls_sec_entity_array.path[i])
          community_ids.push(currentStudent.fields.cls_sec_entity_array.id[i])

          community_divs.push(
            <div style={{ textAlign: "left", marginBottom: "10px" }}>
              <span>
                {currentStudent.fields.cls_sec_entity_array.path[i]}
              </span>
              <span style={{ marginLeft: "30px" }}>
                {/* <Button className="refier_custom_button_new_selected_2">
                  <Glyphicon glyph="pencil" />
                </Button> */}
              </span>
              <span style={{ marginLeft: "10px" }}>
                <Button className="refier_custom_button_new_selected_2"
                  onClick={() => { self.removeMemberFromIndividualCommunity(currentStudent, i) }}>
                  <Glyphicon glyph="trash" />
                </Button>
              </span>
            </div>
          )
        }
      }
    }
      
        
        
      let body = <Grid fluid>
        <Col style={{ "textAlign": "center" }}>
          <div>
            <Form horizontal>
              <FormGroup controlId="formHorizontalSection">
                <Col componentClass={ControlLabel} xs={2} md={2}
                  className="refier_text_on_light__4"
                  style={{ "padding": "10px 20px", "fontWeight": "600" }}>
                  Email
            </Col>
                <Col xs={10}>
                  <InputGroup>
                    <FormControl type="text" value={studentEmail} disabled />
                    <InputGroup.Addon>
                      <Glyphicon glyph="search" />
                    </InputGroup.Addon>
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalSection">
                <Col componentClass={ControlLabel} xs={2} md={2}
                  className="refier_text_on_light__4"
                  style={{ "padding": "10px 20px", "fontWeight": "600" }}>
                  Name
            </Col>
                <Col xs={10}>
                  <InputGroup>
                    <FormControl type="text" value={studentName} disabled />
                    <InputGroup.Addon>
                      <Glyphicon glyph="user" />
                    </InputGroup.Addon>
                  </InputGroup>
                </Col>
              </FormGroup>
                
                
              <FormGroup controlId="formHorizontalSection">
                <Col componentClass={ControlLabel} xs={2} md={2}
                  className="refier_text_on_light__4"
                  style={{ "padding": "10px 20px", "fontWeight": "600" }}>
                  Members of
            </Col>
                <Col xs={10}>
                  {community_divs}
                </Col>
              </FormGroup>


              <FormGroup controlId="formHorizontalSection">
                <Col componentClass={ControlLabel} xs={2} md={2}
                  className="refier_text_on_light__4"
                  style={{ "padding": "10px 20px", "fontWeight": "600" }}>
                  Add Member
                </Col>
                <Col xs={10}>
                  <InputGroup>
                    <AutosuggestTextBox {...this.props} placeholder="Type to search community/sub-community..." inputValue={this.props.subEntitiesAutoSuggestProps}
                      onSuggestionSelected={this.props.onSuggestionSelectedSubEntities}
                      onchangeDynamicFetch={this.props.onchangeDynamicFetchSubEntities}
                      valueOnBlur={this.props.selectedSubentityForStudent}
                      defaultValue={studentClsSecEntity} doNotReset={true} />
                    <InputGroup.Addon>
                      <Glyphicon glyph="blackboard" />
                    </InputGroup.Addon>
                  </InputGroup>
                </Col>
              </FormGroup>

              {(this.props.modalResponseState) ?
                <div style={{ "color": (this.props.modalResponseTypeState === "success") ? "#008744" : "#d62d20" }}>
                  {this.props.modalResponseState}
                </div>
                : null}
              
              <Button bsStyle="primary"
                className="refier_custom_button_new"
                onClick={this.props.onChangeUserClsSecEntity.bind(this, "student")}>Add {this.props.communitylabels.student}</Button>
              <Button bsStyle="primary"
                className="refier_custom_button_new" style={{ marginLeft: "15px" }}
                onClick={this.props.closeBackEditStudentDetailsModal}>Back</Button>
            </Form>
          </div>
        </Col>
      </Grid>

      return (
        <CommonModal close={this.props.close}
          showModal={this.props.showModal}
          modalHeading={"Edit " + this.props.communitylabels.student + " Details"}
          modalBody={body}
          size="large" />
      )
    }
    
  }