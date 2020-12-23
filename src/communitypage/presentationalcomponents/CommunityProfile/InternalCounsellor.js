import React, { Component } from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import mentorImage from '../../../images/mentor_dashboard_page/avatardp.png'
import { URL_TEXT, MEDIA_URL_TEXT } from '../../../GlobalConstants'
import { Link } from 'react-router-dom';

export default class InternalCounsellor extends Component {

  render() {
    let InternalCounsellor = [];
    if (this.props.InternalCounsellorDataState) {
      for (var i = 0; i < this.props.InternalCounsellorDataState.length; i++) {
        InternalCounsellor.push(
          <Row style={{"marginTop":"10px"}}>
            <Col xs={4} style={{ "textAlign": "-webkit-right" }}>
              <img
                src={this.props.InternalCounsellorDataState[i].fields.community_member.profile_photo ?
                  MEDIA_URL_TEXT +
                  this.props.InternalCounsellorDataState[i].fields.community_member.profile_photo
                  : mentorImage}
                className="custom-image-card"/>
            </Col>
            <Col xs={8} style={{ "textAlign": "left" }}>

              <div className="custom-list-content" xs={12}>
                <Link  className="custom-link"
                to={"/userDashboard/profile/" + this.props.InternalCounsellorDataState[i].fields.community_member.id}>
                  {this.props.InternalCounsellorDataState[i].fields.community_member.first_name + " " + 
                      (this.props.InternalCounsellorDataState[i].fields.last_name=="None"?"":this.props.InternalCounsellorDataState[i].fields.community_member.last_name)}
                </Link>
              </div>
              {/* <Col className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"5px 0"
                          }} md={12}>
      {this.props.InternalCounsellorDataState[i].fields.community_member.userstatus}</Col> */}
              <div className="custom-list-sub-content" xs={12}>
                {this.props.InternalCounsellorDataState[i].fields.community_member.email}</div>
              <div className="custom-list-sub-content" xs={12}>
                {this.props.InternalCounsellorDataState[i].fields.community_member.mobile_number}</div>
            </Col>
          </Row>
        )
      };

    }


    return (
      <div>
        <div className="refier_custom_panel_title_gray" >
          {this.props.communitylabels?this.props.communitylabels.internal_counsellors:"Internal Trainer"} Details
            </div>
        <div className="refier-card-style" style={{ "padding": "10px 20px" }}>
          <Grid fluid>
            {InternalCounsellor}
          </Grid>
          <br />
          <Row>
                <Button bsStyle="primary" bsSize="small" 
                style={{"marginBottom":"10px", "marginTop":"10px"}}
                className="refier_custom_button_dark" block 
              onClick={this.props.addCounsellor}>Edit {this.props.communitylabels ?
                this.props.communitylabels.internal_counsellors:"Internal Trainers"}</Button>
              </Row>
        </div>
      </div>
    );
  }
}
