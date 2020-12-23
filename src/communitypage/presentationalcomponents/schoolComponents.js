import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import Slider from 'react-slick';
import { Link, NavLink } from 'react-router-dom';

import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import Preloader from '../../shared/Preloader/PreLoader'
import counselimg from '../../images/mentor_dashboard_page/avatardp.png';
import FontAwesome from 'react-fontawesome';


class SchoolComponents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let Students = this.props.communityStudentDataState ? this.props.communityStudentDataState.length : 0;
    let Teachers = this.props.communityTeacherDataState ? this.props.communityTeacherDataState.length : 0;
    let internalCounsellors = this.props.InternalCounsellorDataState ? this.props.InternalCounsellorDataState : null;
    let externalCounsellors = this.props.communityExtMentorDataState ? this.props.communityExtMentorDataState : null;
    let internalCounsellorsCount = internalCounsellors ? internalCounsellors.length : 0;
    let externalCounsellorsCount = externalCounsellors ? externalCounsellors.length : 0;
    let communitySessions = this.props.communitySessions ? this.props.communitySessions : null;


    var settings = {
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      infinite:false,
      responsive: [{
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      }
      ]
    };

    let internalCounsellorList;
    let internalCounsellorSliderElement = null;

    if (internalCounsellors) {
      internalCounsellorList = []
      for (var i = 0; i < internalCounsellors.length; i++) {
        let pk = i + 1
        internalCounsellorList.push(
          <Link key={pk} to={"/userDashboard/profile/" + internalCounsellors[i].fields.community_member.id}>
            <div key={pk}>

              <div style={{ "textAlign": "center", "padding": "0 10px" }}>
                <div>
                  <Image responsive
                    className="customSmallImage" circle
                    src={internalCounsellors[i].fields.community_member.profile_photo ? MEDIA_URL_TEXT +
                      internalCounsellors[i].fields.community_member.profile_photo : counselimg}
                    style={{ "display": "inline" }} />
                </div>
                <div className="refier_text_on_light__3"
                  style={{ "margin": "5px 0px", "textAlign": "center" }}>
                  {internalCounsellors[i].fields.community_member.first_name + " " + (internalCounsellors[i].fields.community_member.last_name == "None" ? "" : internalCounsellors[i].fields.community_member.last_name)}</div>
              </div>
            </div></Link>)
      }
    }
    if (!internalCounsellorList) {
      internalCounsellorSliderElement = <div style={{ "marginTop": "10px" }}>
        <Preloader shimmer={true} copies={2} placeholder="line" /></div>
    }
    else if (internalCounsellorList.length > 0) {
      internalCounsellorSliderElement = <div style={{ "marginTop": "20px" }}>
        <Slider {...settings}>{internalCounsellorList}</Slider></div>
    }
    else {
      internalCounsellorSliderElement =
        <div style={{ "textAlign": "left", "marginTop": "20px" }}
          className="refier_custom_desc">No counsellors yet</div>
    }

    let externalCounsellorList;
    let externalCounsellorSliderElement = null;

    if (externalCounsellors) {
      externalCounsellorList = []
      for (let i = 0; i < externalCounsellors.length; i++) {
        let pk = i + 1
        externalCounsellorList.push(
          <Link key={pk} to={"/userDashboard/profile/" + externalCounsellors[i].fields.community_member.id}>
            <div key={pk}>

              <div style={{ "textAlign": "center", "padding": "0 10px" }}>
                <div>
                  <Image responsive
                    className="customSmallImage" circle
                    src={externalCounsellors[i].fields.community_member.profile_photo ? MEDIA_URL_TEXT +
                      externalCounsellors[i].fields.community_member.profile_photo : counselimg}
                    style={{ "display": "inline" }} />
                </div>
                <div className="refier_text_on_light__3"
                  style={{ "margin": "5px 0px", "textAlign": "center" }}>
                  {externalCounsellors[i].fields.community_member.first_name + " " + (externalCounsellors[i].fields.community_member.last_name == "None" ? "" : externalCounsellors[i].fields.community_member.last_name)}</div>
              </div>
            </div></Link>)
      }
    }
    if (!externalCounsellorList) {
      externalCounsellorSliderElement = <div style={{ "textAlign": "left", "marginTop": "10px" }}>
        <Preloader shimmer={true} copies={2} placeholder="line" /></div>
    }
    else if (externalCounsellorList.length > 0) {
      externalCounsellorSliderElement = <div style={{ "marginTop": "20px" }}>
        <Slider {...settings}>{externalCounsellorList}</Slider></div>
    }
    else {
      externalCounsellorSliderElement =
        <div style={{ "textAlign": "left", "marginTop": "20px" }} className="refier_custom_desc">
          No Refier mentors onboarded yet</div>
    }

    let upcomingSessionsList
    let upcomingSessionsSliderElement = null
    if (communitySessions) {
      upcomingSessionsList = []
      let key = "CommunitySessions"
      let pk = 0
      for (let j = 0; j < communitySessions[key].length; j++) {
        if (communitySessions[key][j].fields.session_id.topic) {
          pk = pk + 1
          upcomingSessionsList.push(
            <div key={pk} style={{ textAlign: "center", padding: "0px 10px" }}>
              <Link style={{marginLeft:"10px"}}
                        to={"/userDashboard/webinarinfo/" + communitySessions[key][j].fields.session_id.session_id}
                        style={{
                            "wordWrap": "normal"
                        }}>
              <div
                className="custom-list-content">
                {communitySessions[key][j].fields.session_id.topic}</div>
              <div
                className="custom-list-sub-content-highlighted">
                {(communitySessions[key][j].fields.session_id.mentor_id.last_name
                  && communitySessions[key][j].fields.session_id.mentor_id.last_name != "None"
                  && communitySessions[key][j].fields.session_id.mentor_id.last_name != "Null")
                  ? communitySessions[key][j].fields.session_id.mentor_id.first_name + " " +
                  communitySessions[key][j].fields.session_id.mentor_id.last_name :
                  communitySessions[key][j].fields.session_id.mentor_id.first_name}
              </div>
              <div
                className="custom-list-sub-content">
                  {formatdatefunction(communitySessions[key][j].fields.session_id.start_date_time, "long")} {formatdatefunction(communitySessions[key][j].fields.session_id.start_date_time, "time")}
                </div>
                </Link>
            </div>
          )
        }
      }
    }
    if (!upcomingSessionsList) {
      upcomingSessionsSliderElement = <div style={{ "display": "flex", "marginTop": "10px" }}>
        <Preloader shimmer={true} copies={2} placeholder="card" /></div>
    }
    else if (upcomingSessionsList.length > 0) {
      upcomingSessionsSliderElement = <div style={{ "marginTop": "20px" }}>
        <Slider {...settings}>{upcomingSessionsList}</Slider></div>
    }
    else {
      upcomingSessionsSliderElement =
        <div style={{ "textAlign": "left", "marginTop": "20px" }} className="refier_custom_desc">
          No Upcoming Sessions</div>
    }

    return (
      <Grid fluid>
        <Col xs={12}>
          {
            this.props.communityMembershipState[this.props.match.params.communityId] ?
              null:
              <Grid fluid>
        <Row>
          <div>
            {/* <div
              // className="refier_custom_panel_light_gray"
              className="refier_custom_panel_title_blue" style={{textAlign:"left"}}
            >
              <span style={{ paddingLeft: "20px" }}><FontAwesome
                name="info-circle"
                
              /></span>
              <span style={{ paddingLeft: "20px" }}>Community Info</span></div> */}
            
            <div className="refier-card-style" style={{borderBottomWidth:"0px"}}>
              <div>
                <Row style={{ "margin": "20px 10px" }}>
                  <Col xs={1}>
                    <span className="custom-list-content"
                    >Members</span>
                  </Col>
                  <Col xsOffset={1} xs={2} style={{ "textAlign": "left" }}>
                    <span className="refier_text_on_light__4" style={{ "margin": "0px 5px" }}
                    >{this.props.communitylabels.students}</span>
                    <span className="refier_text_on_light__3"
                      style={{ "margin": "0px 5px" }}>
                      {Students}</span>
                  </Col>
                  <Col xs={2} style={{ "textAlign": "left" }}>
                    <span className="refier_text_on_light__4" style={{ "margin": "0px 5px" }}
                    >{this.props.communitylabels.teacher}</span>
                    <span className="refier_text_on_light__3"
                      style={{ "margin": "0px 5px" }}>
                      {Teachers}</span>
                  </Col>
                  <Col xs={3} style={{ "textAlign": "left" }}>
                    <span className="refier_text_on_light__4"
                      style={{ "margin": "0px 5px" }}
                    >{this.props.communitylabels.internal_counsellors}</span>
                    <span className="refier_text_on_light__3"
                      style={{ "margin": "0px 5px" }}>
                      {internalCounsellorsCount}</span>
                  </Col>
                  <Col xs={3} style={{ "textAlign": "left" }}>
                    <span className="refier_text_on_light__4"
                      style={{ "margin": "0px 5px" }}
                    >Refier Mentors</span>
                    <span className="refier_text_on_light__3"
                      style={{ "margin": "0px 5px" }}>
                      {externalCounsellorsCount}</span>
                  </Col>
                </Row>
                <Row style={{ "margin": "20px 10px" }}>
                  <Col xs={1} style={{ "marginTop": "20px" }}>
                    <span className="custom-list-content"
                    >
                      {this.props.communitylabels.internal_counsellors}</span>
                  </Col>
                  <Col xsOffset={1} xs={9} style={{ "textAlign": "center" }}>
                    {internalCounsellorSliderElement}
                  </Col>
                </Row>
                <Row style={{ "margin": "30px 10px" }}>
                  <Col xs={1} style={{ "marginTop": "20px" }}>
                    <span className="custom-list-content"
                    >
                      Refier Mentors</span>
                  </Col>
                  <Col xsOffset={1} xs={9} style={{ "textAlign": "center" }}>
                    {externalCounsellorSliderElement}
                  </Col>
                </Row>
                <Row style={{ "margin": "30px 10px" }}>
                  <Col xs={1} style={{ "marginTop": "20px" }}>
                    <span className="custom-list-content"
                    >
                      Upcoming Sessions</span>
                  </Col>
                  <Col xsOffset={1} xs={9} style={{ "textAlign": "center" }}>
                    {upcomingSessionsSliderElement}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Row>
      </Grid>

          }
        </Col>
      </Grid>
    )
  }
}

export default SchoolComponents;