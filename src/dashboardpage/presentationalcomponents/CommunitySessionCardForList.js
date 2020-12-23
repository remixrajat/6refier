import React, { Component } from 'react';
//import CommunityImg from '../../images/mentor_dashboard_page/community_placeholder-3_u237.png';
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import { Row, Col, Grid } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { Link } from 'react-router-dom'
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import TagController from '../../shared/Tags/conditionalcomponents/TagController'
import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";


export default class CommunitySessionCardForList extends Component {

    render() {
        // console.log("CommunitySessionCardForList : props", this.props)

        let name = this.props.eventDetail.mentor_id.last_name &&
            this.props.eventDetail.mentor_id.last_name != "Null" &&
            this.props.eventDetail.mentor_id.last_name != "None" ?
            this.props.eventDetail.mentor_id.first_name + " " +
            this.props.eventDetail.mentor_id.last_name :
            this.props.eventDetail.mentor_id.first_name
        
        let photo = this.props.eventDetail.mentor_id.profile_photo

        let topic = this.props.eventDetail.topic

        let imgChar = topic ? topic.charAt(0) : name.charAt(0)

        let date = formatdatefunction(this.props.eventDetail.start_date_time, "long")
        let time = formatdatefunction(this.props.eventDetail.start_date_time, "time")

        let tagValues = this.props.eventDetail.tag_values

        let colorIndex = (this.props.index + tagValues.length) % 4

        return (
            <Row
                style={{ margin: "10px", padding: "20px", textAlign: "left" }}
                className="generic-post-card refier_custom_panel_window">
                <Col xs={3} style={{ textAlign: "right" }}>
                    <p className={"custom-list-char-image-" + colorIndex}>
                        {imgChar}
                    </p>
                </Col>
                <Col xs={9} style={{ textAlign: "left" }}>
                    <Link
                        className="custom-list-title-content custom-item-border"
                        style={{
                            color:"#049cdb",
                            fontWeight: 600, paddingTop: "10px",
                            paddingBottom: "10px",
                            "wordWrap": "normal",
                        }}
                        to={"/userDashboard/webinarinfo/" + this.props.eventDetail.session_id}
                        
                        className="custom-link">
                        {topic}</Link>
                    <div
                        className="custom-list-sub-content-highlighted"
                        style={{marginTop:"5px", marginBottom:"5px"}}>
                        <span>
                        <img src={
                            (photo && 
                            photo !== "")? 
                                MEDIA_URL_TEXT +
								photo:imageSrc}
                                className="custom-card-img-small" />
                        </span>
                        <span style={{marginLeft:"10px"}}>
                            {name}
                        </span>
                    </div>
                    <div
                        className="custom-list-sub-content">
                        {date} {time}</div>
                    {
                        this.props.accepted_applications_count < this.props.count_of_participants ?
                            <div>
                                <div className="custom-list-sub-content" style={{margin:"10px 0px"}}>
                                    <Link 
                                        to={"/userDashboard/service/" +
                                        this.props.owners_community.pk}
                                        onClick={() => this.props.openApplyModal(this.props.pk)}>
                                        Add Members to Sessions of { this.props.owners_community.fields.entity_name}
                                    </Link>
                                </div>
                                <div className="custom-list-sub-content">
                                   {this.props.count_of_participants-this.props.accepted_applications_count} seats left</div>
                            </div>
                            :
                            <div>
                                <div className="custom-list-sub-content" style={{margin:"10px 0px"}}>
                                    <Link 
                                        to={"/userDashboard/service/" +
                                        this.props.owners_community.pk}
                                        onClick={() => this.props.openApplyModal(this.props.pk)}>
                                        Customise this Session of { this.props.owners_community.fields.entity_name}
                                    </Link>
                                </div>
                            <div className="custom-list-sub-content">
                                Seats Filled</div>
                            </div>

                    }

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