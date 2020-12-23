import React, { Component } from 'react';
import { Grid, Row, Col, Table, Button, FormGroup, FormControl, Form, ButtonToolbar } from 'react-bootstrap';
// import AddElementToClsSecSubTreeModal from './AddElementToClsSecSubTreeModal'
// import EditElementOfClsSecSubTreeModal from './EditElementOfClsSecSubTreeModal'
import FontAwesome from 'react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import { PrimaryButton } from '../../../shared/RefierComponents/PrimaryButton';
import { NonPriorityWhiteButton } from '../../../shared/RefierComponents/NonPriorityWhiteButton';

export default class CommunitySkillMapping extends Component {

  render() {

    console.log("CommunitySkillMapping : details : ", this.props.details)

    let teacherLabel = null;
    let rightBtnCol = 6;
    let displayLabelCol = 6;
    let mainDisplayCol = 12;
    let teacherDisplayCol = 0;


    let childComponent = this.props.isExpanded ?
      this.props.listItems : null

    let textLabel = <span
      className="custom-list-content">
      {this.props.details.label}</span>

    let arrowButton;

    if (this.props.details.children != null) {
      arrowButton = this.props.isExpanded ? <FontAwesome
        name="angle-down"
        
        style={{ "color": "#999999" }}
      />
        :
        <FontAwesome
          name="angle-right"
          
          style={{ "color": "#999999" }}
        />

      textLabel =
        this.props.isExpanded ?
          <span
            className=" refier_text_on_light__3"
            style={{ "marginLeft": "10px", "fontSize": "14px", "fontWeight": "800" }}>
            {this.props.details.label}</span>

          :
          <span
            className=" refier_text_on_light__3"
            style={{ "marginLeft": "10px", "fontSize": "14px", "fontWeight": "400" }}>
            {this.props.details.label}</span>
    }

    let rightButtons = ((this.props.details.type !== "All") || (this.props.details.type !== "Student"))?
      <Col xs={rightBtnCol} style={{ "textAlign": "right" }}>
        <Button bsStyle="default"
          className="refier_custom_button_new_small_dark"
          style={{ "padding": "2px 5px" }}
          onClick={this.props.enableEditing}
        >Edit</Button>
      </Col> :
      null

      if (this.props.details.childrenType != null) {
          rightButtons = 
              this.props.details.type !== "All"?
              this.props.addSkillsClicked ?
                  <Col xs={rightBtnCol} style={{ "textAlign": "right" }}>
                        <PrimaryButton
                        onButtonClick={this.props.closeAddSkills}
                        buttonText="Close"
                    />
                  </Col>
                  :
                  <Col xs={rightBtnCol} style={{ "textAlign": "right" }}>
                      <PrimaryButton
                          onButtonClick={this.props.clickAddSkills}
                          buttonText="Add Skills"
                      />
                  </Col>
              :
              null
          
      }
    else {
      rightButtons = null
    }


    return (
      <div style={{ "marginTop":"15px","marginLeft": "10px", "marginRight": "5px" }}>
        <div style={{ "marginBottom": "5px" }}>
                <Row style={{alignItems:"vertical"}}>
            <Col xs={displayLabelCol} style={{ "textAlign": "left" }} onClick={this.props.makeExpandable}>
                        <Col xs={mainDisplayCol} style={{ marginTop: "5px" }}>
                            <div>
                                {textLabel}
                            </div>
                            <div>
                                {this.props.addSkillsClicked?
                        <form style={{ padding: '10px' }}>
                            <FormGroup controlId="formBasicText">
                            
                                            {this.props.onEdit()}
                                <ButtonToolbar style={{ marginBottom: "10px", marginTop: "20px" }}>
                                    <PrimaryButton
                                        style={{marginRight: '10px'}}
                                        onButtonClick={this.props.onSave.bind(this)}
                                        buttonText="Save"
                                    />
                                    <NonPriorityWhiteButton
                                        onButtonClick={this.props.closeAddSkills}
                                        buttonText="Cancel"
                                    />
                                </ButtonToolbar>
                            </FormGroup>
                        </form> 
                                    :
                                    this.props.onShow()
                                }
                                </div>
              </Col>
            </Col>
            {rightButtons}
          </Row>
        </div>
        {childComponent}
      </div>
    );
  }
}
