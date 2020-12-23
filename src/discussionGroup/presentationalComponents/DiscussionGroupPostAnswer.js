import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import DiscussionPostTextHolderController from '../conditionalComponents/DiscussionPostTextHolderController';
import PostDateTime from '../../shared/TextDisplayPanels/presentationalcomponents/PostDateTime'

import { createEditorStateFromBackendData } from '../../HelperFunctions/createEditorStateFromBackendData';
import MentorImg from '../../images/mentor_dashboard_page/avatardp.png';
import { MEDIA_URL_TEXT } from '../../GlobalConstants';


class DiscussionGroupPostAnswer extends Component {

    render() {
        // console.log("DiscussionGroupPostAnswer :: ", this.props);

        let member_details = this.props.answerUser || {}
        let name = member_details.first_name + " " + member_details.last_name;
        let isEditAllowed = this.props.isCurrentUserOwner || member_details.id === this.props.currentUserProfileId;
        let groupPostAnswer = this.props.groupPostAnswer;

        return (
            <div style={{ marginTop: "20px", marginBottom: "30px" }}>
                <Row style={{ margin: "10px", marginBottom: "0px" }}>
                    <Col xs={3} sm={2} md={1} style={{ textAlign: "left" }}>
                        <span>
                            <img
                                src={member_details.profile_photo ?
                                    MEDIA_URL_TEXT +
                                    member_details.profile_photo : MentorImg}
                                className="custom-list-img" />
                        </span>
                    </Col>
                    <Col xs={6} sm={8} md={9} style={{textAlign: 'left'}}>
                        <div>
                            <Link
                                to={"/userDashboard/profile/" + member_details.id}
                                id="custom-list">
                                {name}
                            </Link>
                        </div>
                        <PostDateTime post_date={this.props.answerDate} />
                    </Col>
                    <Col xs={3} sm={2}>
                    {
                        isEditAllowed ?
                        <div>
                                <FontAwesome
                                    className="refier_custom_button_icon"
                                    name="pencil" 
                                    onClick={() => this.props.showEditPostModal(this.props.postAnswerId, groupPostAnswer)}
                                />
                                <FontAwesome
                                    className="refier_custom_button_icon"
                                    name="trash-o" 
                                    onClick={() => this.props.showConfirmationModal(this.props.postAnswerId, 'answer')}
                                />
                            </div>
                            : null
                    }
                    </Col>
                </Row>
                <DiscussionPostTextHolderController
                    class={"refier-card-style"} 
                    postBody={groupPostAnswer}
                    groupPostId={this.props.groupPostId}
                    readOnly={true}
                    isGroupPostAnswer={true}
                />
            </div>
        );
    }
}

export default DiscussionGroupPostAnswer;