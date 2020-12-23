import React, { Component } from 'react';
import { Form, Col, Row, ControlLabel, FormGroup, FormControl, Button} from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal'
import AutosuggestTextBox from '../../../shared/AutosuggestInput/presentationalcomponents/autosuggestTextBox';
import {Link} from 'react-router-dom'

export default class EditSubjectTeacherOfTreeModal extends Component{
    render(){
        let editSubjectTeacherElement = 
        <Form horizontal>
        <Row>
            <Col xs = {6}>
            {(this.props.subjectDetails)?
                this.props.subjectDetails.label
                :null}
            </Col>
            <Col xs = {6}>
            {(this.props.teacherDetails) ?
            <Link to = {"/userDashboard/profile/" + this.props.teacherDetails.member_id}>
            {this.props.teacherDetails.value} 
            </Link>
            :null
            }
            </Col>
        </Row>
        <br />
        {!(this.props.modalFreeze) ?
        <FormGroup controlId="formHorizontalSection">
        <Col sm={6}>
           <AutosuggestTextBox {...this.props} placeholder="Look up subject..." inputValue={this.props.subjectAutoSuggestProps}
                                onchangeDynamicFetch = {this.props.onchangeDynamicFetch}
                                onSuggestionSelected = {this.props.onSuggestionSelectedSingleSubject}/> 
           </Col>
        <Col sm={6}>
           <AutosuggestTextBox {...this.props} placeholder="Look up teacher..."  inputValue={this.props.teacherAutoSuggestProps}
                                onchangeDynamicFetch = {this.props.onchangeDynamicFetchTeachers}
                                onSuggestionSelected = {this.props.onSuggestionSelectedTeacher}/> 
           </Col>
        </FormGroup>
        :null
        }
        
        <br />
        <Row>
            <Col sm={2}>
            <Button bsStyle="primary"
                style={{ "backgroundColor": "rgba(72, 82, 140, 1)", "marginLeft": "20px" }}
                onClick={this.props.editDeleteSubjectOnClick} disabled={this.props.modalFreeze}>Save</Button>
          </Col>
          <Col sm={2}>
            <Button bsStyle="danger"
                style={{"marginLeft": "20px" }}
                onClick={this.props.clearMappingStateForDeletion} disabled={this.props.modalFreeze}>Delete</Button>
          </Col>
          </Row>

           <br />
          {(this.props.modalResponseState) ? 
        <div style={{"color" : (this.props.modalResponseTypeState === "success") ? "#008744" : "#d62d20"}}>
          {this.props.modalResponseState}
        </div>
        : null}

        </Form>
        
        
        let title = "Edit Subject Teacher Mapping - " + this.props.details.path;

        return(
            <CommonModal close={this.props.close}
            showModal={this.props.showEditSubjectTeacherModalState}
            modalHeading={title}
            modalBody={editSubjectTeacherElement}/>
        )
    }
}