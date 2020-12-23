import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Preloader from "../../../shared/Preloader/PreLoader"
import { Link } from 'react-router-dom';


export default class IndividualRequest extends Component {
  constructor(props) {
    super(props);
    this.state = { requestStatus: 0 };
    this.setRequestStatus = this.setRequestStatus.bind(this)
    this.onApprove = this.onApprove.bind(this)
  }

  setRequestStatus(status) {
    this.setState({ requestStatus: status });
  }

  onApprove() {
    // this.setRequestStatus(1)

  }

  render() {
    let userName = ""
    if (this.props.name.fields.applicant_id.last_name &&
      this.props.name.fields.applicant_id.last_name != "Null" &&
      this.props.name.fields.applicant_id.last_name != "None") {
        userName = this.props.name.fields.applicant_id.first_name + " " + this.props.name.fields.applicant_id.last_name
    }
    else {
      userName = this.props.name.fields.applicant_id.first_name
    }

    let pendingState = this.props.communitylabels[this.props.name.fields.member_type] ? this.props.communitylabels[this.props.name.fields.member_type] :
      "Member"

    let requestBody =
      <div className="refier-request-card">
        <Row style={{ "margin": "5px 10px" }} >
          <Col xs={6}>
            <div className=" refier_text_on_light__3"
              style={{
                'fontWeight': '700', "fontSize": "14px"
              }}>
              <Link to={"/userDashboard/profile/" + this.props.name.fields.applicant_id.id}>
                {userName}
              </Link>
            </div>
          </Col>
        </Row>
        <Row style={{ "margin": "5px 10px" }}>
          <Col xs={12} className=" refier_text_on_light__3"
            style={{
              'fontWeight': '500', "fontSize": "14px"
            }}>
            Joining as {pendingState}
          </Col>
        </Row>

        <Row style={{ "margin": "5px 10px" }}>
          <Col xs={12} className=" refier_text_on_light__3"
            style={{
              'fontWeight': '500', "fontSize": "14px"
            }}>
            {this.props.name.fields.application_text}
          </Col>
        </Row>
        {this.props.applicationId == this.props.name.pk && this.props.requestaction == 2?
          <div style={{ textAlign: "center" }}>
            <Preloader/>
          </div>
          :
          < Row style={{ "margin": "5px 10px" }}>
            <Col xs={3}>
          <Button bsStyle="primary"
            bsSize="small" style={{}}
            className="refier_custom_button_dark"
            onClick={this.props.changeCommunityApplicationStatus.bind(this, this.props.name.pk, "Accepted")}
          >Approve</Button>
        </Col>
        <Col xsOffset={3} xs={3}>
          <Button bsStyle="primary"
            bsSize="small" style={{}}
            className="refier_custom_button_dark"
            onClick={this.props.changeCommunityApplicationStatus.bind(this, this.props.name.pk, "Rejected")}
          >Decline</Button>
        </Col>
          </Row>
        }
      </div>


    return (
      <div>
        {requestBody}
      </div>
    );
  }
}
