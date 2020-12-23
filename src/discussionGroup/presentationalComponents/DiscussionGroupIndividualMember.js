import React, { Component } from 'react'
import { Col, Row, Grid, Nav, NavItem, OverlayTrigger, Popover } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import MentorImg from '../../images/mentor_dashboard_page/avatardp.png';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'


export default class DiscussionGroupIndividualMember extends Component{

    removeMember() {
        this.props.setJoiningId(this.props.joiningId)
        this.props.setJoiningMember(this.props.name)
        this.props.showLeaveRoomModal()
    }


    render() {

        let popover =   <Popover id="user-profile-popup" style={{minWidth:"150px", top:"50px"}}>
                        <ul style={{ overflow: "auto", maxHeight: "430px", marginBottom: "0px" }}
                            id="user-profile-popup-list">
                            <li onClick={this.removeMember.bind(this)}>
                                    <span className="custom-list-sub-content-highlighted">Remove</span>
                                </li>
                            </ul>
                        </Popover>

        return (
            <Row style={{display:"flex", alignItems:"center", marginTop:"10px"}}>
                <Col xs={10}>
                    <span>
                    <img
                        src={this.props.member_details.profile_photo ?
                            MEDIA_URL_TEXT +
                            this.props.member_details.profile_photo : MentorImg}
                        className="custom-list-img" />
                </span>
                <span style={{marginLeft:"10px"}}>
                    <Link
                        to={"/userDashboard/profile/" + this.props.member_details.id}
                        id="custom-list">
                        {this.props.name}
                    </Link>
                </span>
                </Col>
                {this.props.isUserOwner == "True" ?
                    <Col xs={2}>
                        <OverlayTrigger trigger="click" placement="left" overlay={popover} rootClose>
                            <FontAwesome
                                name="ellipsis-v"
                                
                                style={{
                                    padding: "10px",
                                    fontSize: "12px",
                                    "cursor": "pointer"
                                }}
                            />
                        </OverlayTrigger>
                    </Col>
                    :
                    null
                }
            </Row>
        )
    }
}