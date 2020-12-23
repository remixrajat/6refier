import React from "react";
import { Col, Row, Button, Image } from 'react-bootstrap';

import MentorImg from '../../images/mentor_dashboard_page/community_avatar.png';

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

const CommunityDetailedCard = ({ data }) => {
    //console.log("Community Data", data)
    let community_image = data.fields.community_image ? data.fields.community_image:MentorImg
    let community_name = data.fields.entity_name ? data.fields.entity_name : "Dummy Community"
    let community_external_mentors = data.fields.external_mentors ? 
                data.fields.external_mentors : "Dummy External Mentors"
    let community_desc = data.fields.description ? data.fields.description : "Dummy Community Status"
    let community_members = data.fields.members ? data.fields.members : "10 (Dummy Number)"
    let upcoming_events = data.fields.upcoming_events ? data.fields.upcoming_events: "Dummy Events"
    let is_community_private = data.fields.is_private ? true : false




    return( 
        <Col mdOffset={1} smOffset={1} md={5} sm={5} style={ mentorCardStyle }>
            <Row>
                <Col md={4} sm={4}>
                    <Image src={community_image} style={ imgStyle } responsive circle/>
                </Col>
                <Col md={8} sm={8}>
                    <p className="refier_custom_light_panel_title">{ community_name}</p>
                    <p className="">Mentor: { community_external_mentors }</p>
                </Col>
            </Row>
            < br/>
            <Row>
                <Col md={12} sm={12}>
                    <p>{ community_desc }</p>
                </Col>
            </Row>
            <Row>
                <Col md={12} sm={12}>
                    <p className="refier_text_on_light__4">Number of Members: {" "}
                        <span className="refier_text_on_light__3">{ community_members }</span>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={12} sm={12}>
                    <b className="refier_text_on_light__4">Upcoming Events: </b>
                    <p className="refier_text_on_light__3">{ upcoming_events}</p>
                </Col>
            </Row>
            { is_community_private ? 
            <Button bsStyle="default" style={{display:"block", margin: "0 auto"}} 
            className="refier_custom_button_new" disabled>Join Community</Button>
            : 
            <Button bsStyle="default" style={{display:"block", margin: "0 auto"}} 
            className="refier_custom_button_new" >Join Community</Button>}
            
        </Col>
    );
}

export default CommunityDetailedCard;
