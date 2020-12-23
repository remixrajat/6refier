import React, { Component } from 'react';
import { Form, Col, Row, ControlLabel, FormGroup, FormControl, Button} from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal'
import AutosuggestTextBox from '../../../shared/AutosuggestInput/presentationalcomponents/autosuggestTextBox';

export default class AddSubjectToTreeModal extends Component{
    render(){
    let addElement = [];
    let parentId = this.props.details.value;

    let parentNode = this.props.details.type !== "All" ? <FormGroup controlId="formHorizontalClass">
      <Col componentClass={ControlLabel} sm={3}
        className="refier_text_on_light__4"
        style={{ "padding": "2px 20px", "fontWeight": "600" }}>
        {this.props.details.type}
      </Col>
      <Col sm={8} className=" refier_text_on_light__3"
        style={{
          'fontWeight': '700', "fontSize": "14px", "padding": "2px 20px",
        }}>
        {this.props.details.path}
      </Col>
    </FormGroup>
      :
      null

    let siblingNode = this.props.siblingNodes != "" ? <FormGroup controlId="formHorizontalClass">
          <Col componentClass={ControlLabel} sm={3}
            className="refier_text_on_light__4"
            style={{ "padding": "2px 20px", "fontWeight": "600" }}>
            {this.props.details.childrenType}
          </Col>
          <Col sm={8} className=" refier_text_on_light__3"
            style={{
              'fontWeight': '700', "fontSize": "14px", "padding": "2px 20px",
            }}>
            {this.props.siblingNodes}
          </Col>
        </FormGroup>
        :
        null

        let enteredSubjects = null;
        if(this.props.enteredSubjectsState){
           let enteredSubjectsList = "";
           for (let i=0; i < this.props.enteredSubjectsState.length; i++){
               enteredSubjectsList = enteredSubjectsList + " , " + this.props.enteredSubjectsState[i].label
           }
           enteredSubjectsList = enteredSubjectsList.substring(3, enteredSubjectsList.length);
           enteredSubjects =  
                <FormGroup controlId="formHorizontalClass">
                    <Col componentClass={ControlLabel} sm={3}
                    className="refier_text_on_light__4"
                    style={{ "padding": "2px 20px", "fontWeight": "600" }}>
                    Entered Subjects
                </Col>
                <Col sm={8} className=" refier_text_on_light__3"
                    style={{
                    'fontWeight': '700', "fontSize": "14px", "padding": "2px 20px",
                    }}>
                    {enteredSubjectsList}
                </Col>
                    </FormGroup>
        }

        let placeholder = "Enter " + this.props.details.childrenType
        let title = "Add " + this.props.details.childrenType

        let addSubjectElement = 
        <Form horizontal>
            {parentNode}
            {siblingNode}
            {enteredSubjects}

        {!(this.props.modalFreeze) ?
        <FormGroup controlId="formHorizontalSection">
          <Col componentClass={ControlLabel} sm={3}
                    className="refier_text_on_light__4"
                    style={{ "padding": "2px 20px", "fontWeight": "600" }}>
                    Look up Subject
                </Col>
          <Col sm={8}>
           <AutosuggestTextBox {...this.props} placeholder="Type search text..." /> 
           </Col>
           </FormGroup>
           : null
           }
           <div className="refier_text_on_light__3"
                    style={{ "padding": "2px 20px", "fontWeight": "800" , "fontSize" :"16px"}}>Cannot find the required Subject ? Enter below !</div>
                    <br />
            
            <FormGroup controlId="formHorizontalSection">
                <Col componentClass={ControlLabel} sm={3}
                    className="refier_text_on_light__4"
                    style={{ "padding": "2px 20px", "fontWeight": "600" }}>
                    Subject Names
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="e.g. Maths, Social Science, Physics..." disabled={this.props.modalFreeze}
                                    value={this.props.newSubjectNamesState} onChange={this.props.onNewSubjectNameChange}/>
                </Col>
            </FormGroup>
            <br />
            <FormGroup controlId="formHorizontalSection">
                <Col componentClass={ControlLabel} sm={3}
                    className="refier_text_on_light__4"
                    style={{ "padding": "2px 20px", "fontWeight": "600" }}>
                    Respective Subject Codes (Optional)
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="e.g. MA-1, SS-3, PHY-01..." disabled={this.props.modalFreeze}
                                    value={this.props.newSubjectCodesState} onChange={this.props.onNewSubjectCodeChange}/>
                </Col>
            </FormGroup>
            <Row>
            <Col sm={2}>
            <Button bsStyle="primary"
                style={{ "backgroundColor": "rgba(72, 82, 140, 1)", "marginLeft": "20px" }}
                onClick={this.props.addSubjectsOnClick} disabled={this.props.modalFreeze}>Add</Button>
          </Col>
          </Row>
            <br />
          {(this.props.modalResponseState) ? 
        <div style={{"color" : (this.props.modalResponseTypeState === "success") ? "#008744" : "#d62d20"}}>
          {this.props.modalResponseState}
        </div>
        : null}

        </Form>

        return(
        <CommonModal close={this.props.close}
        showModal={this.props.showAddSubjectModalState}
        modalHeading={title}
        modalBody={addSubjectElement}/>
        // <Modal show={this.props.showAddSubjectModalState} onHide={this.props.close} dialogClassName={this.props.dialogClassName}>
        //   <Modal.Header className={this.props.headingStyle} closeButton>
        //     <Modal.Title>{title}</Modal.Title>
        //   </Modal.Header>
        //   <Modal.Body>
        //     {addSubjectElement}
        //   </Modal.Body>
        //     <Modal.Footer>
        //     <Button onClick={this.props.close}>Close</Button>
        //   </Modal.Footer>
        // </Modal>
        );
    }
}