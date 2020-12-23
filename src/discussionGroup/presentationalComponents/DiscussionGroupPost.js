import React, { Component } from 'react'
import { Grid, Col, Row, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import DiscussionPostTextHolderController from '../conditionalComponents/DiscussionPostTextHolderController';
import DiscussionGroupPostAnswerController from '../conditionalComponents/DiscussionGroupPostAnswerController';
import IsUsefulButton from '../../shared/TextDisplayPanels/presentationalcomponents/IsUsefulButton';

import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import { MEDIA_URL_TEXT } from '../../GlobalConstants';
import MentorImg from '../../images/mentor_dashboard_page/avatardp.png';


class DiscussionGroupPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswerOpen: false,
            is_useful_count: this.props.likesCount || 0,
            is_not_useful_count: this.props.dislikesCount || 0,
            liked_or_not: this.props.likeOrDislike ? this.props.likeOrDislike : null,
        }
        this.toggleShowAnswerBox = this.toggleShowAnswerBox.bind(this);
        this.addLikeOrDislike = this.addLikeOrDislike.bind(this);
        // dislikesCount, likesCount, answerCount, likeOrDislike
    }

    toggleShowAnswerBox() {
        let self = this;
        this.setState({ isAnswerOpen: !this.state.isAnswerOpen }, () => {
            if (self.state.isAnswerOpen) {
                self.props.getGroupPostAnswers(self.props.discussionGroupPost.pk);
            }
        });

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            is_useful_count: nextProps.likesCount,
            is_not_useful_count: nextProps.dislikesCount,
            liked_or_not: nextProps.likeOrDislike ? nextProps.likeOrDislike : null
        })
    }

    addLikeOrDislike(actionType, actionLikeOrDislike) {
        let self = this;
        let likeOrDislike = actionLikeOrDislike;
        if (likeOrDislike === "like") {
            if (actionType === "add") {
                this.setState((prevState) => {
                    return {
                        is_useful_count: prevState.is_useful_count + 1,
                        liked_or_not: "like"
                    }
                })
            }
            else if (actionType === "remove") {
                this.setState((prevState) => {
                    return {
                        is_useful_count: prevState.is_useful_count - 1,
                        liked_or_not: null
                    }
                })
            }
            else if (actionType === "addRemove") {
                this.setState((prevState) => {
                    return {
                        is_useful_count: prevState.is_useful_count + 1,
                        is_not_useful_count: prevState.is_not_useful_count - 1,
                        liked_or_not: "like"
                    }
                })
            }
        }

        else if (likeOrDislike === "dislike") {
            if (actionType === "add") {
                this.setState((prevState) => {
                    return {
                        is_not_useful_count: prevState.is_not_useful_count + 1,
                        liked_or_not: "dislike"
                    }
                })
            }
            else if (actionType === "remove") {
                this.setState((prevState) => {
                    return {
                        is_not_useful_count: prevState.is_not_useful_count - 1,
                        liked_or_not: null
                    }
                })
            }
            else if (actionType === "addRemove") {
                this.setState((prevState) => {
                    return {
                        is_not_useful_count: prevState.is_not_useful_count + 1,
                        is_useful_count: prevState.is_useful_count - 1,
                        liked_or_not: "dislike"
                    }
                })
            }
        }
        let formdata = {
            group_post_id: this.props.discussionGroupPost.pk,
            group: this.props.discussionGroupPost.fields.group,
            // mapping_id: this.props.mapping_id,
            action: actionType,
            likeOrDislike: likeOrDislike,
            postType: 'post',
            refresh_required: true
        }

        this.props.likeOrDislikePost(formdata);
    }

    render() {
        // console.log("DiscussionGroupPost :: ", this.props);

        let name, groupPost, groupPostId, formattedPostDate, isEditAllowed;

        if(this.props.postOwner) {
            name = this.props.postOwner.first_name + " " + this.props.postOwner.last_name;
        } else {
            name = "Non-member User";
        }
        
        groupPost = this.props.discussionGroupPost.fields.group_post
        groupPostId = this.props.discussionGroupPost.pk

        formattedPostDate = formatdatefunction(this.props.discussionGroupPost.fields.post_date, 'long');

        isEditAllowed = this.props.isCurrentUserOwner || this.props.postOwner.id === this.props.currentUserProfileId;
        
        return (
            <Grid fluid >
                <Col xsOffset={1} xs={10} className='generic-post-card'>
                    <Grid fluid>
                        <Col xs={2} sm={1} style={{ "textAlign": "left", marginTop: "10px", marginBottom: "10px" }} >
                            <div className="sizable-image-container"
                                style={{ "height": "40px", "width": "40px" }}>
                                <img
                                    src={this.props.postOwner.profile_photo ?
                                        MEDIA_URL_TEXT +
                                        this.props.postOwner.profile_photo : MentorImg}
                                    className="custom-list-img" />
                            </div>
                        </Col>
                        <Col xs={8} md={7} sm={7} lg={8} style={{
                            "textAlign": "left", "verticalAlign": "middle"
                        }}>
                            <div style={{ marginTop: "10px" }}>
                                <Link
                                    to={"/userDashboard/profile/" + this.props.postOwner.id}
                                    id="custom-list">
                                    <span className="refier_text_post_owner">
                                        {name}
                                    </span>
                                </Link>
                            </div>
                            <div className="custom-list-sub-content">
                                {formattedPostDate}
                            </div>
                        </Col>
                        <Col xs={2} style={{
                            "textAlign": "right", "verticalAlign": "middle"
                        }}>
                             <div style={{ marginTop: "20px" }}>
                            {
                                isEditAllowed ?
                                    <div>
                                        <FontAwesome
                                            className="refier_custom_button_icon"
                                            name="pencil" 
                                            onClick={() => this.props.showEditPostModal(groupPostId, groupPost)}
                                        />
                                        <FontAwesome
                                            className="refier_custom_button_icon"
                                            name="trash-o" 
                                            onClick={() => this.props.showConfirmationModal(groupPostId)}
                                        />
                                    </div>
                                    : null
                                }
                                </div>
                        </Col>
                    </Grid>
                    <div>
                        <DiscussionPostTextHolderController postBody={groupPost}
                            groupPostId={groupPostId}
                            readOnly={true}
                            isGroupPostAnswer={false}
                        />
                                
                        <IsUsefulButton is_useful_count={this.state.is_useful_count}
                            is_not_useful_count={this.state.is_not_useful_count}
                            liked_or_not={this.state.liked_or_not}
                            addLikeOrDislike={this.addLikeOrDislike} />

                        <div style={{
                            marginTop: "10px", paddingTop: "10px", marginBottom: "40px",
                            borderTop: "solid 1px #f2f2f2"
                        }}>

                            <DiscussionPostTextHolderController readOnly={false}
                                groupPostId={groupPostId}
                                isGroupPostAnswer={true}
                                isGroupPostAnswerWritingBox={true}
                                submitGroupPost={this.props.submitGroupPostAnswer} />
                        </div>

                        <Row style={{ "marginTop": "20px", "marginBottom": "10px" }}>
                            <Col sm={3}></Col>
                            <Col sm={9}>
                                <div style={{ "marginRight": "35px" }}>
                                    <div>
                                        <Col xs={12} style={{ "textAlign": "right" }}>
                                            <span
                                                className="custom-link refier_custom_button_answer"
                                                onClick={this.toggleShowAnswerBox}>
                                                Answer( {this.props.answerCount || 0} )
                                                        <FontAwesome
                                                    style={{ "marginLeft": "5px" }}
                                                    name={this.state.isAnswerOpen ? "angle-up" : "angle-down"} />
                                            </span>
                                        </Col>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {this.state.isAnswerOpen ?
                            <DiscussionGroupPostAnswerController readOnly={true}
                                isCurrentUserOwner={this.props.isCurrentUserOwner}
                                currentUserProfileId={this.props.currentUserProfileId}
                                groupPostId={groupPostId}
                                groupId={this.props.groupId}
                                dispatch={this.props.dispatch}
                                isGroupPostAnswer={true}
                                toggleShowAnswerBox={this.toggleShowAnswerBox}
                                submitGroupPost={this.props.submitGroupPostAnswer} />
                            :
                            null
                        }

                    </div>
                </Col>
            </Grid>
        )
    }
}


export default DiscussionGroupPost;