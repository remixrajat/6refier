import React from 'react';
import { Grid, Col, Row, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import WriteBlog from '../../shared/WriteBlog/presentationalcomponents/textEditor';
import IsUsefulButton from '../../shared/TextDisplayPanels/presentationalcomponents/IsUsefulButton'
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import OwnerImg from '../../images/mentor_dashboard_page/avatardp.png';
import PostImg1 from '../../images/blogs/blog-0.png';
import PostImg2 from '../../images/blogs/blog-1.png';
import PostImg3 from '../../images/blogs/blog-2.png';


export default class ViewBlogPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.showSuggestedPosts = this.showSuggestedPosts.bind(this);
    }

    showSuggestedPosts(posts) {
        const postList = [];

        let postIndex = -1
        for (let post of posts) {
            postIndex = postIndex + 1
            let postImageIndex = postIndex%3
            const title = post.post_details[0].fields.post_title.length > 50 ?
                            post.post_details[0].fields.post_title.substring(0, 50) + '...' :
                            post.post_details[0].fields.post_title;
            const date = formatdatefunction(post.post_details[0].fields.publish_date, 'long');
            const name = post.owner_details[0].fields.first_name + ' ' + post.owner_details[0].fields.last_name; 

            postList.push(
                <Col sm={4}>
                    <Link to={"/userDashboard/viewblog/" + post.post_id + "/1"}>
                        <Thumbnail className="refier-suggestion-card refier-card-style"
                            src={
                                postImageIndex != 0 ?
                                    postImageIndex != 1 ?
                                        PostImg3 :
                                        PostImg2:
                                    PostImg1
                                    }>
                            <div className="refier-suggestion-card-title-wrapper">
                                <p className="refier-suggestion-card-title">{title}</p>
                            </div>
                            <div className="refier-suggestion-card-footer">
                                <p className="refier-suggestion-card-name">{name}</p>
                                <p className="refier-suggestion-card-date">{date}</p>
                            </div>
                        </Thumbnail>
                    </Link>
                </Col>
            )    
        }

        return postList;
    }

    render() {
        // console.log("ViewBlogPageContainer::props", this.props)

        let name = ""
        if (this.props.blog) {
            if (!this.props.blog.fields.post_owner.last_name ||
                this.props.blog.fields.post_owner.last_name == "None" ||
                this.props.blog.fields.post_owner.last_name == "Null")
                name = this.props.blog.fields.post_owner.first_name
            else
                name = this.props.blog.fields.post_owner.first_name + " " + this.props.blog.fields.post_owner.last_name
        }
        
        let date = formatdatefunction(this.props.blog.fields.publish_date, "long")
        let time = formatdatefunction(this.props.blog.fields.publish_date, "time")

        let tagValues = this.props.tag_values
        let tags = []
        if (tagValues) {
            tagValues = JSON.parse(tagValues)
            for (let i = 0; i < tagValues.length; i++) {
                let index = i
                index = index % 4
                tags.push(
                    <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                        className={"custom-list-tag-" + index}>
                        {tagValues[i].fields.tag_name}</span>)
            }
        }

        return (
            <Col xs={12}>
                <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                    <div
                        id="user-community-post-card"
                        className='post-card-blog-view'>
                        {this.props.blog ?
                            <Row 
                            // className="refier_custom_panel_light_gray"
                                style={{ "textAlign": "left", "padding": "10px 10px", marginTop:"0px", "paddingLeft": "20px" }}>
                                <Col xs={3} sm={1} md={1} lg={1} style={{ "textAlign": "left" }}>
                                    <img
                                        src={this.props.blog.fields.post_owner.profile_photo ? MEDIA_URL_TEXT +
                                            this.props.blog.fields.post_owner.profile_photo : OwnerImg}
                                        className="custom-list-img" />
                                </Col>
                                <Col style={{ "textAlign": "left" }} xs={8} sm={10}>
                                    <div className="custom-list-content">
                                        {name}
                                    </div>
                                    <div className="custom-list-sub-content">
                                        {date} {time}
                                    </div>
                                </Col>
                                {
                                    this.props.post_owner ?
                                    <Col>
                                        <FontAwesome
                                            title="Edit"
                                            className="refier_custom_button_icon"
                                            name="pencil" 
                                            style={{fontSize: '16px'}}
                                            onClick={this.props.toggleEditMode} />
                                    </Col> :
                                    null
                                }
                            </Row>
                            :
                            <div className="refier_custom_panel_title_card">Blog</div>
                        }
                        {
                            this.props.blog &&
                            this.props.blog.fields.community_entity_name ?
                                <div className="custom-list-sub-content" 
                                    style={{ "textAlign": "left", padding: '20px', fontSize: '14px' }}>
                                    <FontAwesome
                                        className="refier_custom_button_icon_2"
                                        name="pencil-square-o" />
                                    Shared on &nbsp;
                                    <Link to={"/userDashboard/community/" + this.props.blog.fields.community_name}>
                                        {this.props.blog.fields.community_entity_name}
                                    </Link>
                                </div>
                                : null
                        }

                        <div style={{ "textAlign": "left","paddingLeft": "20px" }}>
                            {tags}
                        </div>

                        <div 
                            className="refier-card-style"
                            style={{ "paddingBottom": "20px", borderColor:"transparent" }}>
                            
                            {this.props.blog.fields.post_title ?
                                <div className="refier-custom-blog-title refier__view_post_title"
                                    style={{ "paddingLeft": "10px", "paddingTop": "10px" }}>
                                    {this.props.blog.fields.post_title}</div>
                                :
                                null
                            }
                            <WriteBlog editorStyle={this.props.editor}
                                wrapperStyle={this.props.wrapper}
                                editorState={this.props.editorState}
                                toolbarOnFocus={false}
                                toolbarHidden={true}
                            />
                        </div>
                        {
                            this.props.isNotice ?
                                null :
                                <Grid fluid className="refier-card-style"
                                    style={{padding: "20px", marginTop: '20px', marginBottom: '20px'}}>
                                    <IsUsefulButton 
                                        fromViewBlog={true}
                                        is_useful_count={this.props.is_useful_count}
                                        is_not_useful_count={this.props.is_not_useful_count}
                                        liked_or_not={this.props.liked_or_not}
                                        addLikeOrDislike={this.props.addLikeOrDislike} />
                                </Grid>
                        }
                    </div>
                </Col>
                <Col xs={12}>
                    {this.props.suggestions ?
                        <Grid fluid className="refier-suggestions-container">
                            <Row>
                                {this.showSuggestedPosts(this.props.suggestions)}
                            </Row>
                        </Grid> :
                        null
                    }
                </Col>
            </Col>
        );
    }
}