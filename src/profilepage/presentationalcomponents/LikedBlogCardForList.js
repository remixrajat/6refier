import React, { Component } from 'react';
//import CommunityImg from '../../images/mentor_dashboard_page/community_placeholder-3_u237.png';
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import { Row, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { Link } from 'react-router-dom'
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import TagController from '../../shared/Tags/conditionalcomponents/TagController'


export default class LikedBlogCardForList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        //console.log("LikedBlogCardForList: Each Blog", this.props.blogDetail)
        let blog = (this.props.blogDetail.fields.post_id.post_body)
        blog = blog.replace(/'/g, "\"")
        //console.log("LikedBlogCardForList:Each Blog 1 ", blog)
        blog = JSON.parse(blog)
        //console.log("Each Blog 2 ", blog.blocks)
        let preview = ""
        for (let i = 0; i < blog.blocks.length; i++) {
            if (!blog.blocks[i].text == "") {
                preview = preview + blog.blocks[i].text
                if (preview.length > 20) {
                    preview = preview.substring(0, 80)
                    preview = preview + "..."
                    break;
                }
            }
        }

        let publishDate = formatdatefunction(this.props.blogDetail.fields.post_id.publish_date, "long")
        let publishTime = formatdatefunction(this.props.blogDetail.fields.post_id.publish_date, "time")

        let tagValues = this.props.blogDetail.fields.tag_values
        // let tags = []
        // if (tagValues) {
        //     tagValues = JSON.parse(tagValues)
        //     for (let i = 0; i < tagValues.length; i++) {
        //         let index = this.props.index ? this.props.index + i : i
        //         index = index % 4
        //         tags.push(
        //             <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
        //                 className={"custom-list-tag-" + index}>
        //                 {tagValues[i].fields.tag_name}</span>)
        //     }
        // }

        return (
            <Row style={{ padding: "10px 10px", textAlign: "left" }}
                // className="vertical-align-col-components"
                >
                <Col style={{ textAlign: "left" }}>
                    {this.props.blogDetail.fields.post_id.post_title ?
                        <div
                            className="custom-list-content">
                            {this.props.blogDetail.fields.post_id.post_title}</div>
                        :
                        null}

                    <div
                        className="custom-list-sub-content-highlighted">
                        {preview}</div>
                    <div
                        className="custom-list-sub-content">
                        {publishDate} {publishTime}</div>
                    <div className="custom-list-sub-content">
                        <Link to={"/userDashboard/viewblog/" + this.props.blogDetail.fields.post_id.id + "/3/"}
                            className="custom-link">
                            View</Link></div>
                    <div>
                        {/* {tags} */}
                        
					<TagController tagValues={tagValues}
                            index={this.props.index}
                            userId={this.props.profileId}/>
                    </div>
                    
                </Col>
            </Row>
        );
    }
}