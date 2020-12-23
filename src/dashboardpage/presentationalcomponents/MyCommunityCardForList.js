import React, { Component } from 'react';
//import CommunityImg from '../../images/mentor_dashboard_page/community_placeholder-3_u237.png';
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import { Link } from 'react-router-dom';
import { Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import '../../styles/scss/cards.css'


export default class MyCommunityCardForList extends Component {
    render() {
        // console.log("My Community Detail : ", this.props.communityDetails)
        
        let tagValues = this.props.communityDetails.fields.tag_values
        tagValues = JSON.parse(tagValues)
        let tags = []

        for (let i = 0; i < tagValues.length; i++) {
            let index = this.props.index ? this.props.index + i : i
            index = index % 4
            tags.push(
                <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                    className={"custom-list-tag-" + index}>
                    {tagValues[i].fields.tag_name}</span>)
        }

        let summary
        let designation = "Learner"
        if (this.props.communityDetails.is_owner) {
            designation = "Admin"
        } else if (this.props.communityDetails.is_internal_counsellor) {
            designation = "Expert"
        } else if (this.props.communityDetails.is_external_counsellor) {
            designation = "Expert"
        }
        if (this.props.communityDetails.summary) {
            let summary_obj = this.props.communityDetails.summary

            
            let stats_list = []
            let isBackground = false
            // console.log("MyCommunityCard :: summary, questions ", summary_obj,
            // summary_obj.total_question_count,summary_obj.running_courses,summary_obj.past_courses)

            let current_course_count = 0, past_course_count = 0
            for (let key in summary_obj.running_courses) {
                // console.log("MyCommunityCard :: running courses key ", key)
                current_course_count = current_course_count + summary_obj.running_courses[key]
            }
            for (let key in summary_obj.past_courses) {
                // console.log("MyCommunityCard :: past courses key ", key)
                past_course_count = past_course_count + summary_obj.past_courses[key]
            }

            if (current_course_count > 0 || past_course_count > 0) {
                stats_list.push(
                    <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                        <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                            <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                Trainings</span>
                        </div>
                        <div style={{ padding: "10px", paddingLeft: "20px", paddingTop: "0px" }}>
                            <span className="custom-list-sub-content">
                                Running | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{current_course_count}</span>
                            <span className="custom-list-sub-content" style={{ marginLeft: "10px" }}>
                                Past | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{past_course_count}</span>
                        </div>
                    </div>
                )
                isBackground = !isBackground
            }
            else {
                stats_list.push(
                    <div>
                        <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                            <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                                <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                    No trainings have been conducted yet</span>
                            </div>
                        </div>
                    </div>
                )
                isBackground = isBackground
            }

            if (summary_obj.total_question_count > 0) {
                stats_list.push(
                    <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                        <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                            <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                All Questions</span>
                        </div>
                        <div style={{ padding: "10px", paddingLeft: "20px", paddingTop: "0px" }}>
                            <span className="custom-list-sub-content">
                                Total | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{summary_obj.total_question_count}</span>
                            <span className="custom-list-sub-content" style={{ marginLeft: "10px" }}>
                                Answered | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{summary_obj.unanswered_questions_count}</span>
                        </div>
                    </div>
                )
                isBackground = !isBackground
            }
            else {
                stats_list.push(
                    <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                        <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                            <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                0 Questions asked</span>
                        </div>
                    </div>
                )
                isBackground = isBackground
            }

            if (summary_obj.total_question_count > 0) {
                if (summary_obj.recent_questions_count > 0) {
                    stats_list.push(
                        <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                            <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                                <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                    Recent Questions</span>
                            </div>
                            <div style={{ padding: "10px", paddingLeft: "20px", paddingTop: "0px" }}>
                                <span className="custom-list-sub-content">
                                    Total | </span>
                                <span className="custom-list-sub-content"
                                    style={{ fontWeight: "600" }}>{summary_obj.recent_questions_count}</span>
                                <span className="custom-list-sub-content" style={{ marginLeft: "10px" }}>
                                    Answered | </span>
                                <span className="custom-list-sub-content"
                                    style={{ fontWeight: "600" }}>{summary_obj.unanswered_recent_questions_count}</span>
                            </div>
                        </div>
                    )
                    isBackground = !isBackground
                }
                else {
                    stats_list.push(
                        <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                            <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                                <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                    0 Questions asked in last 7 days</span>
                            </div>
                        </div>
                    )
                    isBackground = !isBackground
                }
            }

            if (summary_obj.total_blog_count > 0) {
                stats_list.push(
                    <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                        <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                            <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                Learnings shared</span>
                        </div>
                        <div style={{ padding: "10px", paddingLeft: "20px", paddingTop: "0px" }}>
                            <span className="custom-list-sub-content">
                                Total | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{summary_obj.total_blog_count}</span>
                            <span className="custom-list-sub-content" style={{ marginLeft: "10px" }}>
                                Followed | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{summary_obj.followed_blogs_count}</span>
                        </div>
                    </div>
                )
                isBackground = !isBackground
            }
            else {
                stats_list.push(
                    <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                        <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                            <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                0 Learning Article shared</span>
                        </div>
                    </div>
                )
                isBackground = !isBackground
            }

            if (summary_obj.total_blog_count > 0) {
                if (summary_obj.recent_blogs_count > 0) {
                    stats_list.push(
                        <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                            <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                                <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                    Learnings shared recently</span>
                            </div>
                            <div style={{ padding: "10px", paddingLeft: "20px", paddingTop: "0px" }}>
                                <span className="custom-list-sub-content">
                                    Total | </span>
                                <span className="custom-list-sub-content"
                                    style={{ fontWeight: "600" }}>{summary_obj.recent_blogs_count}</span>
                                <span className="custom-list-sub-content" style={{ marginLeft: "10px" }}>
                                    Followed | </span>
                                <span className="custom-list-sub-content"
                                    style={{ fontWeight: "600" }}>{summary_obj.followed_recent_blogs_count}</span>
                            </div>
                        </div>
                    )
                    isBackground = !isBackground
                }
                else {
                    stats_list.push(
                        <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                            <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                                <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                    0 Learning Article shared in last 7 days</span>
                            </div>
                        </div>
                    )
                    isBackground = !isBackground
                }
            }

            if (summary_obj.discussion_group_count > 0) {
                stats_list.push(
                    <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                        <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                            <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                Discussion Groups</span>
                        </div>
                        <div style={{ padding: "10px", paddingLeft: "20px", paddingTop: "0px" }}>
                            <span className="custom-list-sub-content">
                                Groups | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{summary_obj.discussion_group_count}</span>
                            <span className="custom-list-sub-content" style={{ marginLeft: "10px" }}>
                                Discussions | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{summary_obj.discussions_count}</span>
                        </div>
                        {summary_obj.recent_discussions_count > 0 ?
                            <div style={{ padding: "10px", paddingLeft: "20px", paddingTop: "0px" }}>
                                <span className="custom-list-sub-content">
                                    Recent Discussions | </span>
                                <span className="custom-list-sub-content"
                                    style={{ fontWeight: "600" }}>{summary_obj.recent_discussions_count}</span>
                            </div> :
                            <div style={{ padding: "10px", paddingLeft: "20px", paddingTop: "0px" }}>
                                <span className="custom-list-sub-content">
                                    No new discussion since last 7 days </span>
                            </div>
                        }
                    </div>
                )
                isBackground = !isBackground
            }
            else {
                stats_list.push(
                    <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                        <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                            <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                No Discussion Groups created yet</span>
                        </div>
                    </div>
                )
                isBackground = !isBackground
            }

            if (summary_obj.assessment_count > 0 || summary_obj.content_count > 0 ||
                summary_obj.document_count > 0) {
                stats_list.push(
                    <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                        <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                            <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                Community Content</span>
                        </div>
                        <div style={{ padding: "10px", paddingLeft: "20px", paddingTop: "0px" }}>
                            <span className="custom-list-sub-content">
                                Videos | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{summary_obj.content_count}</span>
                            <span className="custom-list-sub-content" style={{ marginLeft: "10px" }}>
                                Documents | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{summary_obj.document_count}</span>
                        </div>
                        <div style={{ padding: "10px", paddingLeft: "20px", paddingTop: "0px" }}>
                            <span className="custom-list-sub-content">
                                Assessments | </span>
                            <span className="custom-list-sub-content"
                                style={{ fontWeight: "600" }}>{summary_obj.assessment_count}</span>
                        </div>
                    </div>
                )
                isBackground = !isBackground
            }
            else {
                stats_list.push(
                    <div style={isBackground ? { backgroundColor: "#fbfbfb" } : {}}>
                        <div style={{ padding: "5px", paddingLeft: "20px", paddingTop: "10px" }}>
                            <span className="custom-list-sub-content" style={{ fontWeight: "600" }}>
                                No Content has been uploaded yet</span>
                        </div>
                    </div>
                )
                isBackground = !isBackground
            }

            stats_list.push(
                <div style={!isBackground ? { backgroundColor: "#fbfbfb", height: "20px" } :
                    { height: "20px" }} />)

            summary =
                <div style={{ maxHeight: "40vh", overflow: "auto" }}>
                    <div style={{
                        padding: "10px", paddingTop: "20px", paddingBottom: "0px",
                        paddingLeft: "20px"
                    }}>
                        <span className="custom-list-content"
                            style={{ textTransform: "uppercase", fontWeight: "600" }}>
                            Community Activities</span>
                    </div>
                    {stats_list}

                </div>
        }

        const member_popover = (
            <Popover>
                <div
                    className="custom-list-sub-content-highlighted"
                    style={{ margin: "10px", color: "#3c3c3c" }}>
                    <Link to={"/userDashboard/community/" + this.props.communityDetails.pk}>
                        Go to Community
                </Link>
                </div>
            </Popover>
        );

        const popover = (
            <Popover>
                <div
                    className="custom-list-sub-content-highlighted"
                    style={{ margin: "10px", color: "#3c3c3c" }}>
                    {this.props.communityDetails.fields.description &&
                        this.props.communityDetails.fields.description.length > 200 ?
                        this.props.communityDetails.fields.description.substring(0, 200) + "..." :
                        this.props.communityDetails.fields.description.length == 0 ?
                            "Description not present" :
                            this.props.communityDetails.fields.description}
                </div>
            </Popover>
        );

        return (
            <Row className="refier_custom_panel_window"
                style={{ textAlign: "left", backgroundColor: "white", marginBottom: "20px" }}
            >
                <div className={"refier_card_list"}
                    style={{ cursor: "default", width: "100%", transform: "none", margin: "0px" }}>
                    <div className="refier_card_image">
                        <img
                            style={{ objectFit: "cover" }}
                            src={this.props.communityDetails.fields.profile_photo ? MEDIA_URL_TEXT +
                                this.props.communityDetails.fields.profile_photo : CommunityImg}
                        />
                    </div>
                    <div>
                        <div className="refier_card_title refier_card_title_white"
                            style={{
                                padding: "5px",
                                marginTop: "-40px"
                            }}>
                            <div style={{ display: "flex", justifyContent: "space-between", }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Link to={"/userDashboard/community/" + this.props.communityDetails.pk}>
                                        <span style={{
                                            color: "white", fontSize: '14px',
                                            paddingLeft: "15px"
                                        }}>
                                            {this.props.communityDetails.fields.entity_name}
                                        </span>
                                        <span
                                            // onMouseOver={this.mouseEnter} 
                                            // onMouseOut={this.mouseExit} 
                                            style={{ "display": "inline-block" }}>
                                            <OverlayTrigger
                                                placement="bottom"
                                                // trigger="manual" 
                                                overlay={popover}
                                                rootClose
                                                containerPadding={20}
                                                ref="pop">
                                                <FontAwesome
                                                    // title="Info"
                                                    name="info-circle"
                                                    style={{ "color": "white", paddingLeft: "10px" }} />
                                            </OverlayTrigger>
                                        </span>
                                    </Link>
                                </div>
                                <div style={{ verticalAlign: "middle" }}>
                                    <span
                                        // onMouseOver={this.mouseEnter} 
                                        // onMouseOut={this.mouseExit} 
                                        style={{ float: 'right' }}>
                                        <OverlayTrigger
                                            placement="bottom"
                                            // trigger="manual" 
                                            overlay={member_popover}
                                            rootClose
                                            containerPadding={20}>
                                            {/* ref="pop"> */}
                                            <FontAwesome
                                                // title="Member"
                                                name="check-circle"
                                                size='2x'
                                                style={{ "color": "#03a9f4" }} />
                                        </OverlayTrigger>
                                    </span>
                                </div>

                            </div>

                            <div
                                style={{
                                    color: "white", fontSize: '11px', textAlign: "left",
                                    paddingLeft: "15px"
                                }}>
                                {this.props.communityDetails.designation ?
                                    this.props.communityDetails.designation : designation}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {summary}
                </div>
            </Row>
        );
    }
}