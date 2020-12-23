import React, { Component } from 'react';
import { Grid, Row, Col, Table, Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import AddElementToClsSecSubTreeModal from './AddElementToClsSecSubTreeModal'
import EditElementOfClsSecSubTreeModal from './EditElementOfClsSecSubTreeModal'
import FontAwesome from 'react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

export default class ClassSectionExpandableRow extends Component {

  render() {

    // console.log("ClassSectionExpandableRow : details : ", this.props.details)

    let teacherLabel = null;
    let rightBtnCol = 6;
    let displayLabelCol = 6;
    let mainDisplayCol = 12;
    let teacherDisplayCol = 0;
    if (this.props.details.teacher) {
      let name = this.props.details.teacher.last_name && 
            this.props.details.teacher.last_name!="Null" &&
            this.props.details.teacher.last_name=="None"?
            this.props.details.teacher.first_name + " " + this.props.details.teacher.last_name
            :
            this.props.details.teacher.first_name
      teacherLabel =
        <Link
          to={"/userDashboard/profile/" + this.props.details.teacher.id}><span
            className="custom-list-sub-content custom-link">
            {name}
          </span></Link>
      displayLabelCol = 10;
      mainDisplayCol = 7;
      teacherDisplayCol = 5;
      rightBtnCol = 2;
    }


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
      // console.log("ClassSectionExpandableRow :: childrenType : ", this.props.details.childrenType)
      let addButtonLabel = "Add " + this.props.details.childrenType
      rightButtons = this.props.details.type !== "All" ?
        <Col xs={rightBtnCol} style={{ "textAlign": "right" }}>
          {this.props.details.childrenType == "Subject" ?
            <span />
            :
            <Button bsStyle="default"
              className="refier_custom_button_new_small_dark"
              style={{ "padding": "2px 5px" }} onClick={this.props.openAddModal}
            >{addButtonLabel}</Button>
          }
          <Button bsStyle="default"
            className="refier_custom_button_new_small_dark"
            style={{ "marginLeft": "20px", "padding": "2px 5px" }}
            onClick={this.props.enableEditing}
          >Edit</Button>
        </Col>
        :
        <Col xs={rightBtnCol} style={{ "textAlign": "right" }}>
          <Button bsStyle="default"
            className="refier_custom_button_new_small_dark"
            style={{ "padding": "2px 5px" }} onClick={this.props.openAddModal}
          >{addButtonLabel}</Button>
        </Col>
    }
    else {
      rightButtons = null
    }


    return (
      <div style={{ "marginLeft": "10px", "marginRight": "5px" }}>
        <div style={{ "marginBottom": "5px" }}>
          <Row>
            <Col xs={displayLabelCol} style={{ "textAlign": "left" }} onClick={this.props.makeExpandable}>
              <Col xs={mainDisplayCol}>
                {arrowButton}
                {textLabel}
              </Col>
              <Col xs={teacherDisplayCol}>
                {teacherLabel}
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
