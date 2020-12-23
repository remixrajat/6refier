import React, { Component } from 'react';
//import CommunityImg from '../../images/mentor_dashboard_page/community_placeholder-3_u237.png';
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import { Row, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { Link } from 'react-router-dom'
import {formatdatefunction} from '../../HelperFunctions/formatDateFunction'


export default class BlogCardForList extends Component {

    constructor(props){
        super(props)
    }

    render() {
        //console.log("Each Blog",this.props.blogDetail)
        let blog = (this.props.blogDetail.fields.post_body)
        blog = blog.replace(/'/g, "\"")
        //console.log("Each Blog 1 ", blog)
        blog = JSON.parse(blog)
        //console.log("Each Blog 2 ", blog.blocks)
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
                        className="custom-list-sub-content-highlighted">
                        {preview}</div>
                    <div
                        className="custom-list-sub-content">
                        {publishDate} {publishTime}</div>
                    <div className="custom-list-sub-content-highlighted">
                        <Link to={"/userDashboard/viewblog/"+this.props.blogDetail.pk+"/1/"}
                        className="custom-link">
                        View</Link></div>
                </Col>
            </Row>
        );
    }
}