import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import TextEditorController from '../conditionalcomponents/CommentsTextEditorController'
import AnswerBox from './AnswerBox'

import { formatdatefunction } from '../../../HelperFunctions/formatDateFunction'
import imageSrc from "../../../images/mentor_dashboard_page/avatardp.png";
import {URL_TEXT, MEDIA_URL_TEXT} from '../../../GlobalConstants'


export default class PostsContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAnswerBox: false
        }
        this.getAnswerBoxState = this.getAnswerBoxState.bind(this)
        this.toggleShowAnswerBox = this.toggleShowAnswerBox.bind(this)
    }

    getAnswerBoxState() {
        return this.state.showAnswerBox;
    }

    toggleShowAnswerBox() {
        this.setState({ showAnswerBox: !this.getAnswerBoxState() })
    }


    render() {
        // console.log("PostsContent: ", this.props);

        let formattedPostDate = null;
        if (this.props.commentDetails) {
            formattedPostDate = formatdatefunction(this.props.commentDetails.comment_date, 'long')
        }

        let commentText = null;
        let commentDivStyle = null;
        let commentOptionsStyle = null;
        let allComment = null;
        let replyBox = null;
        let customeditorStyle = {
            "color": "#42565B",
            "fontFamily": "Roboto", "fontSize": "14px", "fontWeight": "400",
        };
        let comment_user = ""

        let is_comment_anonymous = (this.props.is_anonymous && (this.props.post_owner.id == this.props.commentDetails.comment_user.id)
            && !(this.props.is_community_owner)
            && !(this.props.is_post_owner)
            && !(this.props.is_community_internal_counsellor)
            && !(this.props.is_community_external_counsellor))
            ? true : false;
        

        if (this.props.isComment) {
            customeditorStyle = {
                "color": "#363636",
                "fontFamily": "Roboto", "fontSize": "14px", "marginLeft": "30px",
                "fontWeight": "400",
                "paddingRight": "20px",
                // "marginTop": "-70px"
            };

            if (!this.props.commentDetails.comment_user.last_name
                && this.props.commentDetails.comment_user.last_name != "None"
                && this.props.commentDetails.comment_user.last_name != "Null") {
                comment_user = this.props.commentDetails.comment_user.first_name + " " +
                    this.props.commentDetails.comment_user.last_name
            }
            else {
                comment_user = this.props.commentDetails.comment_user.first_name
            }

            if(this.props.commentShowStatus[this.props.commentItem.pk] && 
                this.props.commentShowStatus[this.props.commentItem.pk].showButton) {
                if(this.props.commentShowStatus[this.props.commentItem.pk] && this.props.commentShowStatus[this.props.commentItem.pk].isExpanded) {
                    allComment = 
                        <button 
                            className="comment-toggle refier_custom_link" 
                            onClick={() => this.props.refreshContent(this.props.commentItem.pk, this.props.commentItem.commentNum)}>Hide</button>;                           
                } else {
                    allComment = 
                        <button 
                            className="comment-toggle refier_custom_link" 
                            onClick={() => this.props.refreshContent(this.props.commentItem.pk, this.props.commentItem.commentNum)}>Show</button>;                           
                }
            }

            commentText =
                <div style={{ "margin": "5px 0px", "marginBottom": "0px" }}>
                    {
                        is_comment_anonymous ?
                            <span>
                                <img
                                    src={
                                        this.props.commentDetails.comment_user.profile_photo || 
                                        !this.props.commentDetails.comment_user.profile_photo ? 
                                            MEDIA_URL_TEXT +
                                            this.props.commentDetails.comment_user.profile_photo:imageSrc}
                                    className="custom-card-img-small"
                                />
                                <span className="refier_text_on_light__3"
                                    style={{ "fontSize": "14px", "padding": "0 10px" }}>
                                    Anonymous
                                </span>
                            </span>
                            :
                            <span>
                                <Link to={"/userDashboard/profile/" + this.props.commentDetails.comment_user.id}>
                                    <img src={
                                        this.props.commentDetails.comment_user.profile_photo || 
                                        this.props.commentDetails.comment_user.profile_photo !== ""? 
                                            MEDIA_URL_TEXT +
                                            this.props.commentDetails.comment_user.profile_photo :
                                            imageSrc }
                                        className = "custom-card-img-small"/> 
                                </Link>
                                <Link to={"/userDashboard/profile/" + this.props.commentDetails.comment_user.id}>
                                    <span className="refier_text_on_light__3"
                                        style={{ "fontSize": "14px", "padding": "0px 10px"}}>
                                        {comment_user}
                                    </span>
                                </Link>
                            </span>
                    }


                    <span className="refier_text_on_light__4"
                        style={{ "padding": "0 10px", "fontSize": "12px", "color": "#787878" }}>
                        {formattedPostDate}
                    </span>

                    {(this.props.commentDetails.comment_user.id == this.props.userId) || (this.props.is_community_owner) ?
                        <span style={{ "float": "right" }}>
                            <FontAwesome
                                className="refier_custom_button_icon"
                                name="pencil"
                                onClick={this.props.open.bind(this, { type: "comment", commentNum: this.props.commentItem.commentNum })}
                            />
                            <FontAwesome
                                className="refier_custom_button_icon"
                                name="trash-o"
                                onClick={this.props.openDeletionModal.bind(this, { type: "comment", pk: this.props.commentItem.pk })}
                            />
                        </span>
                        : null}
                </div>


            // commentDivStyle = { "paddingBottom": "10px" }
            commentDivStyle = { 
                border: '1px solid rgba(0,0,0,0.07)', 
                padding: '10px 10px 15px 10px', 
                marginBottom: '20px' 
            }

            replyBox = (
                (this.props.commentDetails && this.props.commentDetails.comment_user.id) ?
                    <div style={{marginTop: '15px', marginLeft: '30px'}}
                        className="custom-link-bold" 
                        onClick={() => this.toggleShowAnswerBox()}>
                        Reply
                        <FontAwesome
                            style={{"marginLeft": "5px"}}
                            name={this.state.showAnswerBox ? "angle-up" : "angle-down"} />
                    </div> :
                    null
            )

        }


        return (
            <div style={commentDivStyle}>
                {commentText}
                {this.props.isPreview ?
                    <div className="refier_text_on_light__3" style={
                        this.props.isComment ? { margin: "0px 0px" }:{ margin: "10px 0px" }}>
                        {this.props.post_title && !this.props.isComment ? 
                            <div>
                                <Link to={"/userDashboard/viewblog/" + this.props.preview_id + "/1/"} 
                                    className="refier__text_post_title">
                                    {this.props.post_title.length > 60 ? 
                                        this.props.post_title.substring(0, 60) + "..." : 
                                        this.props.post_title}
                                </Link>
                            </div> :
                            null
                        }
                        <div>
                            <TextEditorController readOnly={true}
                                toolbarOnFocus={false} 
                                {...this.props}
                                editorStyle={customeditorStyle} 
                                toolbarHidden={true} />                            
                        </div>
                        { allComment }    
                    </div>
                    :
                    <TextEditorController readOnly={true}
                        toolbarOnFocus={false} {...this.props}
                        editorStyle={customeditorStyle} 
                        toolbarHidden={true} />  
                }
                {/* {replyBox} */}
                {
                    this.state.showAnswerBox ?
                        <AnswerBox id={this.props.id}
                            commentReply={true}
                            showAnswerBox={this.state.showAnswerBox}
                            placeholder={"Reply to " + comment_user + "..."}
                            isIndividualPost={this.props.isIndividualPost}
                            isBlog={this.props.post_type === "Blog" ? true : false} /> :
                        null
                }
            </div>
        );
    }
}