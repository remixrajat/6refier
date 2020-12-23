import React from "react";
import { Col, Row, Button, Image } from 'react-bootstrap';

import MentorImg from '../../images/mentor_dashboard_page/avatardp.png';
import { MEDIA_URL_TEXT } from "../../GlobalConstants";

const mentorCardStyle = {
    background: "white",
    marginBottom: "30px",
    padding: "10px 20px",
    borderRadius: "5px"
}

const imgStyle = {
    display: "inline",
    height: "70px",
    width: "70px",
}

const MentorDetailedCard = ({ data }) => {
    //console.log("Mentor Data", data)
    let mentorImage = data.fields.profile_photo ? MentorImg : (MEDIA_URL_TEXT + data.fields.profile_photo)
    let name = data.fields.last_name && data.fields.last_name != "Null" &&
        data.fields.last_name != "None" ? data.fields.first_name + " " + data.fields.last_name
        :
        data.fields.first_name
    let tags = data.fields.tags ? data.fields.tags : "Dummy Writer, Author"
    let status = data.fields.userstatus ? data.fields.userstatus : "Dummy Status"
    let communities_serving = data.fields.communities_serving ? data.communities_serving.join(", ")
        :
        "Dummy Serving Communities"
    let upcoming_events = data.fields.upcoming_events ? data.fields.upcoming_events.join(", ")
        :
        "Dummy Events"
    return (
        <Col mdOffset={1} smOffset={1} md={5} sm={5} style={mentorCardStyle}>
            <Row>
                <Col md={4} sm={4}>
                    <Image src={mentorImage} style={imgStyle} responsive circle />
                </Col>
                <Col md={8} sm={8}>
                    <p className="refier_custom_light_panel_title">{name}</p>
                    <p className="refier_text_on_light__3">{tags}</p>
                </Col>
            </Row>
            < br />
            <Row>
                <Col md={12} sm={12}>
                    <p>{status}</p>
                </Col>
            </Row>
            <Row>
                <Col md={12} sm={12}>
                    <b className="refier_text_on_light__4">Communities Serving: </b>
                    <p className="refier_text_on_light__3">{communities_serving}</p>
                </Col>
            </Row>
            <Row>
                <Col md={12} sm={12}>
                    <b className="refier_text_on_light__4">Upcoming Events: </b>
                    <p className="refier_text_on_light__3">{upcoming_events}</p>
                </Col>
            </Row>
            <Button bsStyle="default" style={{ display: "block", margin: "0 auto" }}
                className="refier_custom_button_new" >Connect</Button>
        </Col>
    );
}

export default MentorDetailedCard;
