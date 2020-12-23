import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import TagController from '../../shared/Tags/conditionalcomponents/TagController'

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import MentorImg from '../../images/mentor_dashboard_page/avatardp.png';


export default class MentorCardForList extends Component {
    render() {
        let name = ""

        if(this.props.mentorDetails.fields.last_name && 
            this.props.mentorDetails.fields.last_name!="Null" &&
            this.props.mentorDetails.fields.last_name!="None"){
            name = this.props.mentorDetails.fields.first_name + " " + 
                    this.props.mentorDetails.fields.last_name
        }
        else{
            name = this.props.mentorDetails.fields.first_name 
        }
        
        let tagValues = this.props.mentorDetails.fields.tag_values

        return (
            <Row style={{ padding: "10px 10px", textAlign: "left" }} 
                // className="vertical-align-col-components"
                >
                <Col xs={3}  style={{textAlign:"right"}}>
                    <img
                        src={this.props.mentorDetails.fields.profile_photo? MEDIA_URL_TEXT+
                        this.props.mentorDetails.fields.profile_photo:MentorImg}
                        className="custom-list-img" />
                </Col>
                <Col xs={9} style={{textAlign:"left"}}>
                    <Link to={"/userDashboard/profile/" + this.props.mentorDetails.pk}>
                        <div
                            className="custom-list-content">
                            {this.props.mentorDetails.fields.first_name} {this.props.mentorDetails.fields.last_name}
                        </div>
                    </Link>
                    {
                        !this.props.previewCard ?
                            <div><div
                                className="custom-list-sub-content-highlighted">
                                {this.props.mentorDetails.fields.userstatus?
                                    this.props.mentorDetails.fields.userstatus.length>60?
                                        this.props.mentorDetails.fields.userstatus.substring(0,60)+"...":
                                        this.props.mentorDetails.fields.userstatus.substring:
                                    null}
                            </div>
                            <div>
                            <TagController tagValues={tagValues}
                                index={this.props.index}
                                userId={this.props.userId}
                            />
                            </div></div> :
                            null
                    }
                </Col>
            </Row>
        );
    }
}