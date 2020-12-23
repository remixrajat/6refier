import React, { Component } from 'react';
import { getSchoolName } from './action.js'
import 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, button, Image, imageShapeInstance, imageResponsiveInstance, Thumbnail } from 'react-bootstrap';
import { getCommunityBasicDetails, checkIfCommunityOwner, checkIfCommunityMember } from './action.js'
import SchoolStatus from '../presentationalcomponents/schoolstatus'


class SchoolStatusController extends Component {

  render() {

    let schoolstatus = [{"status1":"Webinar on Mentoring Skills is going on."},
        {"status1":"Mr. Ayush Poddar is Online. Please ask your queries"}
  ]

    let schoolStatusRenderElement =
      <SchoolStatus
        status={schoolstatus}
      />

    return (
        <div>
          {schoolStatusRenderElement}
        </div>

    );
  }
}


export default (SchoolStatusController);

