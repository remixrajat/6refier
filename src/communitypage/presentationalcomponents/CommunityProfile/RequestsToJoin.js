import React, { Component } from 'react';
import { Col, FormControl, Button, Grid, Checkbox } from 'react-bootstrap';

import { submitJoinCommunityRequest, getApplicationStatus } from '../../../communitypage/conditionalcomponents/action'
import { getCommunityList } from '../../../shared/Header/conditionalcomponents/action' 

import { PrimaryButton } from '../../../shared/RefierComponents/PrimaryButton';
import CommonModal from '../../../shared/CommonModal'
import Preloader from '../../../shared/Preloader/PreLoader'


class RequestsToJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStudent: true,
      isTeacher: false,
      desc: "Hello Sir/Madam, Please allow me to be a part of your community.",
      status: null,
      action:0,
    }

    this.onSubmitRequest = this.onSubmitRequest.bind(this);
  }

  onIsStudentChange(e) {
    this.setState({ isStudent: e.target.checked, isTeacher: !e.target.checked })
  }

  onIsTeacherChange(e) {
    this.setState({ isTeacher: e.target.checked, isStudent: !e.target.checked })
  }

  onChangeDesc(e) {
    //console.log("changed text", e.target.value)
    this.setState({ desc: e.target.value })
  }

  setStatus(status) {
    this.setState({ status: status })
  }

  onSubmitRequest() {
    if (this.props.communityBasicDataState) {
      let member_type = this.state.isStudent ? "student" : this.state.isTeacher ? "teacher" : "student"
      let desc = this.state.desc
      let returnPromise = this.props.dispatch(submitJoinCommunityRequest(
        this.props.communityBasicDataState[0].pk, member_type, desc));
      this.setState({action : 2})
      returnPromise.then((response) => {
        //console.log("RequestsToJoin:onSubmitRequest Promise", response)
        let action = 0
        if(typeof response == "undefined")  action = -1;
        else action = 1;
        
        this.setState({ action: action })
        this.props.dispatch(getCommunityList());
        this.setStatus("Your request has been submitted!!")
        this.props.close();

        if(this.props.match && this.props.match.params && this.props.match.params.communityId) {
          this.props.dispatch(getApplicationStatus(this.props.match.params.communityId));
        } else {
          this.props.dispatch(getApplicationStatus(this.props.communityBasicDataState[0].pk));
        }
      })
    }
  }

  render() {
    // console.log("RequestsToJoin::props", this.props)

    let studentType = this.props.communitylabels ? this.props.communitylabels.student : null
    let teacherType = this.props.communitylabels ? this.props.communitylabels.teacher : null

    let student =
      studentType ?
        <Checkbox checked={this.state.isStudent} onChange={this.onIsStudentChange.bind(this)}>
          I am a {studentType}
        </Checkbox>
        :
        null

    let teacher = teacherType ?
      <Checkbox checked={this.state.isTeacher} onChange={this.onIsTeacherChange.bind(this)}>
        I am a {teacherType}
      </Checkbox>
      :
      null

    let status = this.state.status ? <Col xs={12} style={{ marginTop: "20px" }}>
      <div className=" refier_text_on_light__3" >{this.state.status}</div>
    </Col>
      :
      null

    let body = <Grid fluid>
      {/* <Col xs={6} style={{ textAlign: "left" }}>
        {student}
      </Col>
      <Col xs={6} style={{ textAlign: "left" }}>
        {teacher}
      </Col> */}
      <Col xs={12} style={{ marginTop: "10px" }}>
        <FormControl componentClass="textarea" className=" refier_text_on_light__3"
          name="request"
          style={{
            'fontWeight': '700', "fontSize": "14px"
          }}
          value={this.state.desc} onChange={this.onChangeDesc.bind(this)} />
      </Col>
      <Col xs={12} style={{ marginTop: "20px" }}>
        {this.state.action == 2 ?
          <div style={{textAlign:"center"}}>
            <Preloader/>
          </div>
          :
          <PrimaryButton
            onButtonClick={this.onSubmitRequest}
            buttonText="Submit Request"
          />
        }
          </Col>
      {status}
    </Grid>

    return (
      <CommonModal close={this.props.close}
        showModal={this.props.showModal}
        modalHeading="Request to Join Community"
        modalBody={body} />
    )
  }
}
export default RequestsToJoin;