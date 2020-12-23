import React, { Component } from 'react';
import {
  Form, Col, ControlLabel, FormGroup, FormControl,
  Button, Grid, DropdownButton, InputGroup, MenuItem, SplitButton, Glyphicon, Row
} from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal'
import IndividualRequest from './IndividualRequest'
import Preloader from '../../../shared/Preloader/PreLoader'

class Requests extends Component {

  render() {
    // console.log("Requests::", this.props)

    let requests = this.props.pendingRequestState || [];
    let requestList = [];
    for (let i = 0; i < requests.length; i++) {
      requestList.push(
        <IndividualRequest key={i} name={requests[i]} {...this.props} />
      )
    }

    let body = requests.length == 0 ?
      <div className=" refier_text_on_light__3"
        style={{
          'fontWeight': '700', "fontSize": "14px", "margin": "12px 20px"
        }}> No Requests
      </div> :
      <div>
        <Row style={{ "margin": "10px 10px" }} >
          <Col xsOffset={2} xs={8}>
            {this.props.applicationId == "All" && this.props.requestaction == 2 ?
              <div style={{ textAlign: 'center' }}>
                <Preloader/>
              </div>
              :
              <Button bsStyle="primary"
                block
                bsSize="small" style={{}}
                className="refier_custom_button_dark"
                disabled={this.props.requestaction == 2 ? true : false}
                onClick={this.props.changeCommunityApplicationStatus.bind(this, "All", "Accepted")}
              >Approve All</Button>
            }
          </Col>
        </Row>
        <br />
        <div style={{ "margin": "5px 10px" }}>
          {requestList}
        </div>

      </div>

    return (
      <CommonModal close={this.props.close}
        showModal={this.props.showModal}
        modalHeading="Join Requests"
        modalBody={body} />
    )
  }
}
export default Requests;