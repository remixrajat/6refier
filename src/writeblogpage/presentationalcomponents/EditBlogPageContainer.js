import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Grid, Col, FormControl } from 'react-bootstrap';

import TextEditorHolderAndOptions from '../../dashboardpage/presentationalcomponents/TextEditorHolderAndOptions';

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import OwnerImg from '../../images/mentor_dashboard_page/avatardp.png'


export default class EditBlogPageContainer extends React.Component {
    
    render() {
        // console.log("EditBlogPageContainer:: props", this.props)
        
        let date = formatdatefunction(this.props.blog.fields.publish_date, "long")
        let time = formatdatefunction(this.props.blog.fields.publish_date, "time")

        let tagValues = this.props.tag_values
        let tagValuesFromState = this.props.tagsFinal
        let tags = []
        if (tagValuesFromState) {
            for (let i = 0; i < tagValuesFromState.length; i++) {
                let index = this.props.id ? this.props.id + i : i
                index = index % 4
                tags.push(
                    <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                        className={"custom-list-tag-" + index}>
                        {tagValuesFromState[i].value}</span>)
            }
        }
        else if (tagValues) {
            tagValues = JSON.parse(tagValues)
            for (let i = 0; i < tagValues.length; i++) {
                let index = this.props.id ? this.props.id + i : i
                index = index % 4
                tags.push(
                    <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                        className={"custom-list-tag-" + index}>
                        {tagValues[i].fields.tag_name}</span>)
            }
        }

        return (
            <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                <div
                    id="user-community-post-card"
                    className='post-card-blog-view'>
                    {this.props.blog ?
                        <Grid fluid 
                        // className="refier_custom_panel_light_gray" 
                            style={{ "textAlign": "left", "padding": "10px 10px", marginTop:"0px" }}>                        
                            <Col xs={3} sm={1} md={1} lg={1} style={{ "textAlign": "left" }}>
                                <img
                                    src={this.props.blog.fields.post_owner.profile_photo ? MEDIA_URL_TEXT +
                                        this.props.blog.fields.post_owner.profile_photo : OwnerImg}
                                    className="custom-list-img" />
                            </Col>
                            <Col style={{ "textAlign": "left" }} xs={8} sm={10}>
                                <div className="custom-list-content">
                                    You
                                </div>
                                <div className="custom-list-sub-content">
                                    {date} {time}
                                </div>
                            </Col>
                            <Col>
                                <FontAwesome
                                    title="Close"
                                    className="refier_custom_button_icon"
                                    name="times" 
                                    onClick={this.props.toggleEditMode}/>
                            </Col>
                        </Grid>
                        :
                        <div className="refier_custom_panel_title_card">Blog</div>}
                    {tags.length > 0 ?
                        <Grid fluid style={{ "padding": "10px 10px", background: "white" }}>
                            {tags}
                        </Grid>
                        :
                        null
                    }
                    <div style={{margin:"10px"}}>
                        <div style={{border:"1px solid #f2f2f2", borderBottomWidth:"0px"}}>
                        <FormControl componentClass="textarea"
                            placeholder="Blog/Notice Title"
                            className="custom-edit-blog-title"
                            onChange={this.props.setBlogTitle}
                            value={this.props.blogTitle}
                        />
                    </div>
                    <TextEditorHolderAndOptions
                        {...this.props}
                        editorHeight="100%"
                        shareEveryoneAllowed={true} />
                    </div>
                    
                </div>
            </Col>
        );
    }
}