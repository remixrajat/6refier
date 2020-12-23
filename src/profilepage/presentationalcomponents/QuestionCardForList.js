import React, { Component } from 'react';
//import CommunityImg from '../../images/mentor_dashboard_page/community_placeholder-3_u237.png';
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import { Row, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { Link } from 'react-router-dom'
import {formatdatefunction} from '../../HelperFunctions/formatDateFunction'


export default class QuestionCardForList extends Component {

    constructor(props){
        super(props)
    }

    render() {
        //console.log("Each Question",this.props.blogDetail)
        let blog = (this.props.blogDetail.fields.post_body)
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

        let publishDate = formatdatefunction(this.props.blogDetail.fields.publish_date,"long")
        let publishTime = formatdatefunction(this.props.blogDetail.fields.publish_date,"time")

        return (
            <Row style={{ padding: "10px 10px", textAlign: "left" }} 
            className="vertical-align-col-components">
                <Col style={{ textAlign: "left" }}>
                    {this.props.blogDetail.fields.post_title?
                        <div
                        className="custom-list-content">
                        {this.props.blogDetail.fields.post_title}</div>
                        :
                        null}
                    
                    <div
                        className="custom-list-content">
                        {preview}</div>
                    <div
                        className="custom-list-sub-content">
                        {publishDate} {publishTime}</div>
                    {this.props.askedQuestion==undefined?
                    null:
                    this.props.blogDetail.fields.is_commented?
                    <div
                        className="custom-list-sub-content" style={{color:"green"}}>
                        Answered</div>
                        :
                        <div
                        className="custom-list-sub-content" style={{color:"red"}}>
                        Not Answered</div>
                    }
                    <div className="custom-list-sub-content" style={{"paddingTop":"5px"}}>
                        <Link to={"/userDashboard/viewpost/"+this.props.blogDetail.pk+"/"}
                        className="custom-link">
                        View</Link></div>
                </Col>
            </Row>
        );
    }
}