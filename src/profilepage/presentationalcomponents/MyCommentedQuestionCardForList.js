import React, { Component } from 'react';
//import CommunityImg from '../../images/mentor_dashboard_page/community_placeholder-3_u237.png';
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import { Row, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { Link } from 'react-router-dom'
import {formatdatefunction} from '../../HelperFunctions/formatDateFunction'


export default class MyCommentedQuestionCardForList extends Component {

    constructor(props){
        super(props)
    }

    render() {
        //console.log("Each Commented Question",this.props.commentedQuestion)
        let blog = (this.props.commentedQuestion.fields.post.post_body)
        blog = blog.replace(/'/g, "\"")
        //console.log("Each Question 1 ", blog)
        blog = JSON.parse(blog)
        //console.log("Each Question 2 ", blog.blocks)
        let preview = ""
        for(let i=0;i<blog.blocks.length;i++){
            if(!blog.blocks[i].text==""){
                preview = preview + blog.blocks[i].text
                if(preview.length>20){
                    preview = preview.substring(0,80)
                    preview = preview + "..."
                    break;
                }
            } 
        }

        let publishDate = formatdatefunction(
                    this.props.commentedQuestion.fields.post.publish_date,"long")
        let publishTime = formatdatefunction(
                    this.props.commentedQuestion.fields.post.publish_date,"time")

        return (
            <Row style={{ padding: "10px 10px", textAlign: "left" }} 
            className="vertical-align-col-components">
                <Col style={{ textAlign: "left" }}>
                    {this.props.commentedQuestion.fields.post.post_title?
                        <div
                        className="custom-list-content">
                        {this.props.commentedQuestion.fields.post.post_title}</div>
                        :
                        null}
                    
                    <div
                        className="custom-list-sub-content-highlighted">
                        {preview}</div>
                    <div
                        className="custom-list-sub-content">
                        {publishDate} {publishTime}</div>
                    <div className="custom-list-sub-content">
                        <Link to={"/userDashboard/viewpost/"+this.props.commentedQuestion.fields.post.id+"/"}
                        className="custom-link">
                        View</Link></div>
                </Col>
            </Row>
        );
    }
}