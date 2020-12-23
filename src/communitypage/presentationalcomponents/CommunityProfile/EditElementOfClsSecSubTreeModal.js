import React, { Component } from 'react';
import { Form, Col, Row, ControlLabel, FormGroup, FormControl, Button } from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal'

class EditElementOfClsSecSubTreeModal extends Component {

  render() {

    let editElement = [];
    let placeholder = this.props.details.type
    let value = this.props.details.label
    let title = "Edit " + this.props.details.type
    let elementId = this.props.details.value;
    let inputElementRef = "";

    if(this.props.isModalTypeDelete){
      editElement.push(
        <div>
        <div>Are you sure you want to delete this {placeholder}?</div>
        <br /><br />
        <Row>
        <Col xs={3}>
        <Button bsStyle="primary"
            style={{ "backgroundColor": "rgba(72, 82, 140, 1)", "marginLeft": "20px" }}
            onClick={() => {this.props.submitDetails(inputElementRef,elementId , "delete")}} disabled={this.props.modalFreeze}>Yes , Delete</Button>
        </Col>
        <Col xs={3}>
        <Button bsStyle="danger"
            onClick={this.props.confirmDeleteOption.bind(this,false)} disabled={this.props.modalFreeze}>No</Button>
        </Col>
        </Row>
        <br />
        {(this.props.modalResponseState) ? 
        <div style={{"color" : (this.props.modalResponseTypeState === "success") ? "#008744" : "#d62d20"}}>
          {this.props.modalResponseState}
        </div>
        : null}
      </div>

      )
    }
    else{
    editElement.push(
      <Form horizontal>
        <FormGroup controlId="formHorizontalSection">
          <Col componentClass={ControlLabel} sm={2}
            className="refier_text_on_light__4"
            style={{ "padding": "5px 20px", "fontWeight": "600", "fontSize":"14"}}>
            {this.props.details.type}
          </Col>
          <Col sm={6}>
             <FormControl type="text" placeholder={placeholder} defaultValue={value}
              inputRef = {(input) => {inputElementRef = input}} disabled={this.props.modalFreeze}/> 
          </Col>
          <Col sm={2}>
            <Button bsStyle="primary"
                style={{ "backgroundColor": "rgba(72, 82, 140, 1)", "marginLeft": "20px" }}
                onClick={() => {this.props.submitDetails(inputElementRef,elementId , "edit")}} disabled={this.props.modalFreeze}>Save</Button>
          </Col>
          <Col sm={2}>
            <Button bsStyle="danger"
                onClick={this.props.confirmDeleteOption.bind(this,true)}>Delete</Button>
          </Col>
        </FormGroup>
        {(this.props.modalResponseState) ? 
        <div style={{"color" : (this.props.modalResponseTypeState === "success") ? "#008744" : "#d62d20"}}>
          {this.props.modalResponseState}
        </div>
        : null}
      </Form>

    );
  }


    return (
      <CommonModal close={this.props.close}
        showModal={this.props.isEdit}
        modalHeading={title}
        modalBody={editElement} />
    )


  }
}
export default EditElementOfClsSecSubTreeModal;