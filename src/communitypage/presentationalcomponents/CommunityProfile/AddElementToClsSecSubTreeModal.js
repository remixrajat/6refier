import React, { Component } from 'react';
import { Form, Col, ControlLabel, FormGroup, FormControl, Button } from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal'

class AddElementToClsSecSubTreeModal extends Component {


  render() {
    let addElement = [];
    let parentId = this.props.details.value;
    let inputRefElement = "";

    let parentNode = this.props.details.type !== "All" ? <FormGroup controlId="formHorizontalClass">
      <Col componentClass={ControlLabel} sm={2}
        className="refier_text_on_light__4"
        style={{ "padding": "2px 20px", "fontWeight": "600" }}>
        {this.props.details.type}
      </Col>
      <Col sm={6} className=" refier_text_on_light__3"
        style={{
          'fontWeight': '700', "fontSize": "14px", "padding": "2px 20px",
        }}>
        {this.props.details.path}
      </Col>
    </FormGroup>
      :
      null

    let siblingNode = this.props.siblingNodes != "" ? <FormGroup controlId="formHorizontalClass">
          <Col componentClass={ControlLabel} sm={2}
            className="refier_text_on_light__4"
            style={{ "padding": "2px 20px", "fontWeight": "600" }}>
            {this.props.details.childrenType}
          </Col>
          <Col sm={6} className=" refier_text_on_light__3"
            style={{
              'fontWeight': '700', "fontSize": "14px", "padding": "2px 20px",
            }}>
            {this.props.siblingNodes}
          </Col>
        </FormGroup>
        :
        null

    let placeholder = "Enter multiple " + this.props.details.childrenType + " separated by ,"
    let title = "Add " + this.props.details.childrenType
    addElement.push(
      <Form horizontal>
        {parentNode}
        {siblingNode}
        <FormGroup controlId="formHorizontalSection">
          <Col smOffset={2} sm={6}>
            <FormControl type="text" placeholder={placeholder} inputRef = {(input) => {inputRefElement = input}} disabled={this.props.modalFreeze}/>
          </Col>
          <Col sm={2}>
            <Button bsStyle="primary"
                style={{ "backgroundColor": "rgba(72, 82, 140, 1)", "marginLeft": "20px" }}
                onClick={() => {this.props.submitDetails(inputRefElement, parentId , "add")}} disabled={this.props.modalFreeze}>Add</Button>
          </Col>
        </FormGroup>
        {(this.props.modalResponseState) ? 
        <div style={{"color" : (this.props.modalResponseTypeState === "success") ? "#008744" : "#d62d20"}}>
          {this.props.modalResponseState}
        </div>
        : null}
      </Form>
    );


    return (
      <CommonModal close={this.props.close}
        showModal={this.props.showAddModal}
        modalHeading={title}
        modalBody={addElement} />
    )


  }
}
export default AddElementToClsSecSubTreeModal;