import React, { Component } from 'react';
import {Form, Col, ControlLabel, FormGroup, FormControl, Button} from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal'

class ClassSectionModal extends Component {


  render() {

        let addClassForm = []; 
        addClassForm.push (
          <Form horizontal>
            <FormGroup controlId="formHorizontalClass">
              <Col componentClass={ControlLabel} sm={2} className="refier_text_on_light__4" 
                    style={{"padding":"10px 20px", "fontWeight":"600"}}>
                Class
              </Col>
              <Col sm={6}>
                <FormControl type="text" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalSection">
              <Col componentClass={ControlLabel} sm={2} className="refier_text_on_light__4" 
                    style={{"padding":"10px 20px", "fontWeight":"600"}}>
                Section
              </Col>
              <Col sm={6}>
                <FormControl type="text" />
              </Col>
            </FormGroup>
            <Button bsStyle="primary" 
            style={{"backgroundColor":"rgba(72, 82, 140, 1)","marginLeft":"20px"}}
            onClick={this.props.close}>Add</Button>
          </Form> 
        );
      

      return(
        <CommonModal close={this.props.close}
            showModal={this.props.showModal}
            modalHeading="Add Class and Section" 
            modalBody={addClassForm} />
      )


}}
export default ClassSectionModal;