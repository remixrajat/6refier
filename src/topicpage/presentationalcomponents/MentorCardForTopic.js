import React, { Component } from 'react';
//import CommunityImg from '../../images/mentor_dashboard_page/community_placeholder-3_u237.png';

import MentorImg from '../../images/mentor_dashboard_page/avatardp.png';
import { Row, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import {Link, NavLink} from 'react-router-dom';
import TagController from '../../shared/Tags/conditionalcomponents/TagController'


export default class MentorCardForTopic extends Component {
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
        //console.log("Mentor Details",this.props.mentorDetails.fields)
        let tagValues = this.props.mentorDetails.fields.tag_values
        // tagValues = JSON.parse(tagValues)
        // let tags = []
        // for(let i=0;i<tagValues.length;i++){
        //     let index = this.props.index?this.props.index+i:i
        //     index = index % 4
        //     tags.push(
        //         <span style={{marginRight:"5px",display: "inline-block", marginTop:"5px"}} 
        //                 className={"custom-list-tag-"+index}>
        //                 {tagValues[i].fields.tag_name}</span>)
        // }
        return (
            <Row style={{ padding: "10px 10px", textAlign: "left" }} 
                // className="vertical-align-col-components"
                >
                <Col xs={3}  style={{textAlign:"right"}}>
                    <img
                        src={this.props.mentorDetails.fields.profile_photo? MEDIA_URL_TEXT +
                        this.props.mentorDetails.fields.profile_photo:MentorImg}
                        /* src={MentorImg} */
                        className="custom-list-img" />
                </Col>
                <Col xs={9} style={{textAlign:"left"}}>
                <Link to={"/userDashboard/profile/" + this.props.mentorDetails.pk}>
                    <div
                        className="custom-list-content">
                        {this.props.mentorDetails.fields.first_name} {this.props.mentorDetails.fields.last_name}
                    </div>
                    </Link>
                    <div
                        className="custom-list-sub-content-highlighted">
                        {this.props.mentorDetails.fields.userstatus}
                    </div>
                    <div>
                        <TagController tagValues={tagValues}
                            index={this.props.index}
                            userId={this.props.profileId}
                            />

                        {/* {tags} */}
                    </div>
                </Col>
            </Row>
        );
    }
}