import React, { Component } from 'react';
import {
  Form, Col, ControlLabel, FormGroup, FormControl,
  Button, Grid, DropdownButton, InputGroup, MenuItem, SplitButton, Glyphicon
} from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal';
import AutosuggestTextBox from '../../../shared/AutosuggestInput/presentationalcomponents/autosuggestTextBox';
import {getHierarchyStringOfSchool} from '../../../HelperFunctions/getHierarchyStringOfSchool';

class AddStudentModal extends Component {


  render() {

    let body = <Grid fluid>
        <Col style={{"textAlign":"center"}}>
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
                    <AutosuggestTextBox {...this.props} placeholder="Type email search text..." inputValue = {this.props.allUsersAutoSuggestProps}/> 
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
                    <FormControl type="text" value={this.props.enteredUserName} onChange={this.props.onChangeTeacherName}/>
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
                  {getHierarchyStringOfSchool(this.props.treeStructureJson)}
                </Col>
                <Col xs={10}>
                  <InputGroup>
                    <AutosuggestTextBox {...this.props} placeholder="Type community/sub-community search text..." inputValue = {this.props.subEntitiesAutoSuggestProps}
                                      onSuggestionSelected={this.props.onSuggestionSelectedSubEntities}
                                      onchangeDynamicFetch={this.props.onchangeDynamicFetchSubEntities}
                                      valueOnBlur = {this.props.selectedSubentityForStudent}/> 
                    <InputGroup.Addon>
                      <Glyphicon glyph="blackboard" />
                    </InputGroup.Addon>
                  </InputGroup>
                </Col>
              </FormGroup>

              {(this.props.modalResponseState) ? 
                <div style={{"color" : (this.props.modalResponseTypeState === "success") ? "#008744" : "#d62d20"}}>
                  {this.props.modalResponseState}
                </div>
                : null}
              
              <Button bsStyle="primary"
                className="refier_custom_button_new"
              onClick={this.props.onSubmitUserDetails.bind(this, "student")}>Add {this.props.communitylabels.student}</Button>
            </Form>
          </div>
        </Col>
      </Grid>

    return (
      <CommonModal close={this.props.close}
            showModal={this.props.showModal}
        modalHeading={"Add " + this.props.communitylabels.student} 
            modalBody={body} />
    )
  }
}
export default AddStudentModal;