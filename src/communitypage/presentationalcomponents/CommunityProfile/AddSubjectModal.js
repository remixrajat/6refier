import React, { Component } from 'react';
import {Form, Col, ControlLabel, FormGroup, FormControl, Button} from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal'

class AddSubjectModal extends Component {


  render() {

        let addSubject = []; 
        addSubject.push (
          <Form horizontal>
                  <FormGroup controlId="formHorizontalClass">
                    <Col componentClass={ControlLabel} sm={2} 
                      className="refier_text_on_light__4" 
                      style={{"padding":"10px 20px", "fontWeight":"600"}}>
                      Cls-Sec
                    </Col>
                    <Col sm={6} className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "padding":"10px 20px", 
                          }}>
                      Nur-A, Nur-B, 1-A
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalSection">
                    <Col componentClass={ControlLabel} sm={2} 
                    className="refier_text_on_light__4" 
                    style={{"padding":"10px 20px", "fontWeight":"600"}}>
                      Subject
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
            modalHeading="Add Subject" 
            modalBody={addSubject} />
      )


}}
export default AddSubjectModal;