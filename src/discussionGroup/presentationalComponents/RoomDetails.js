import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";
import {MEDIA_URL_TEXT} from "../../GlobalConstants";
import RoomDateTime from './RoomDateTime'

export default class RoomDetails extends Component{

    render() {
        let content;

        if (this.props.roomDetails) {
            let groupimage = this.props.roomDetails.fields.group_photo ?
                                <img
                                    src={MEDIA_URL_TEXT + this.props.roomDetails.fields.group_photo}
                                    className="custom-card-img"
                                /> :
                                <img
                                    src={imageSrc}
                                    className="custom-card-img"
                                    style={{ "height": "60px", "width": "60px" }}
                                />


            content = (
            <Row>
				<Col xs={2} md={3} sm={3} lg={2} data-label="Mentor/Counselor Photo"
					style={{ "marginTop": "10px" }}>
					<div className="sizable-image-container"
                            style={{ "height": "40px", "width": "40px" }}>
                            {!this.props.roomDetails.fields.is_user_in_group && !this.props.isJoined?
                                groupimage :
                                <Link to={"/userDashboard/discussion/" + this.props.roomDetails.pk}>
                                    {groupimage}
                                </Link>
                            }
					</div>
				</Col>

				<Col xs={10} md={9} sm={9} lg={10} style={{
					"textAlign": "left", "marginTop": "20px", "verticalAlign": "middle"
                    }}>
                        {!this.props.roomDetails.fields.is_user_in_group && !this.props.isJoined?
                            <span
                                className="refier_text_post_owner"
                                style={{ "fontWeight": "600", "fontSize": "1em", "letterSpacing": "0.05em" }}>
                                {this.props.roomDetails.fields.group_name}
                            </span>
                            :
                            <Link to={"/userDashboard/discussion/" + this.props.roomDetails.pk}>
                                <span
                                    className="refier_text_post_owner"
                                    style={{ "fontWeight": "600", "fontSize": "1em", "letterSpacing": "0.05em" }}>
                                    {this.props.roomDetails.fields.group_name}
                                </span>
                            </Link>
                        }
				</Col>

				<Col xs={10} md={9} sm={9} lg={10}>
                    <RoomDateTime dateTime={this.props.roomDetails.fields.creation_time} />
				</Col>
            </Row> 
            )
        }
        
        return (
            content
        )
    }
}