import React, { Component } from 'react';
import {
  Form, Col, ControlLabel, FormGroup, FormControl,
  Button, Grid, DropdownButton, InputGroup, MenuItem, SplitButton, Glyphicon,Row
} from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree';
import IndividualSubjectTeacherMapping from '../../conditionalcomponents/IndividualTeacherDetailsController';

class SubjectTeacherMapping extends Component {

  render() {

    return (
      <Grid fluid>
        <div>
        <Col smOffset={3}>
          <div style={{ "padding": "20px 20px", "background": "white", "textAlign": "left" }}>
            <div className="refier_custom_light_panel_title"
              style={{
                "border": "solid transparent 1px", borderBottomColor: "#CCCCCC",
                "padding": "10px 20px", "marginBottom": "20px", "fontSize": "18px"
              }}
            >
              Assign Teachers to Subjects
            </div>
            <IndividualSubjectTeacherMapping/>
            <IndividualSubjectTeacherMapping/>
            <IndividualSubjectTeacherMapping/>
            <div style={{"textAlign":"center","marginTop":"20px"}}>
                  <Button bsStyle="primary"
                    className="refier_custom_button_new"
                    onClick={this.props.close}>Save Changes</Button> 
            </div>
          </div>
        </Col>
        </div>
      </Grid>
    )


  }
}
export default SubjectTeacherMapping;