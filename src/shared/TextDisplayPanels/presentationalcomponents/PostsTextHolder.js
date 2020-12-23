import React from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { convertToRaw, convertFromRaw, EditorState, ContentState } from 'draft-js';

import PostOwnerDetails from './PostOwnerDetails'
import PostsContent from './PostsContent'
import AnswerBox from './AnswerBox'
import IsQuestionResolved from './IsQuestionResolved'
import IsUsefulButtonVertical from './IsUsefulButtonVertical'
import TagController from '../../Tags/conditionalcomponents/TagController'

import { convertStringToJson } from '../../../HelperFunctions/convertStringToJson';
import { PrimaryWhiteButton } from '../../RefierComponents/PrimaryWhiteButton'
import { isXsDevice, isMobileDevice } from '../../../GlobalConstants'


export default class PostsTextHolder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnswerBox: false
        }
        this.previewContent = this.previewContent.bind(this)
        this.toggleShowAnswerBox = this.toggleShowAnswerBox.bind(this)
    }

    toggleShowAnswerBox() {
        this.setState({ showAnswerBox: !this.state.showAnswerBox })
    }
    
    previewContent(content) {
        let jsonContent = convertStringToJson(content)
        if (jsonContent == null) {
            jsonContent = content
        }
        let clonedBody = JSON.parse(JSON.stringify(jsonContent))
        jsonContent = jsonContent.blocks
        let contentLength = 0
        let previewBody = []
        for (let i = 0; i < jsonContent.length; i++) {

            contentLength = contentLength + jsonContent[i].text.length
            let previousLength = contentLength - jsonContent[i].text.length
            if (contentLength > 200) {
                let cloneContent = JSON.parse(JSON.stringify(jsonContent[i]))
                let text = cloneContent.text
                if (text.length > 0) {
                    let newText = text.substring(0, (200 - previousLength))
                    cloneContent.text = newText + "..."
                    previewBody.push(cloneContent)
                    break;
                }
            }
            else {
                previewBody.push(jsonContent[i])
            }
        }
        //console.log("Preview the Processed Content", previewBody)
        clonedBody.blocks = previewBody
        //console.log("Preview the Processed Body", clonedBody)
        let cloneVal = '';
        try {
            cloneVal = EditorState.createWithContent(convertFromRaw(clonedBody));
        }
        catch (err) {
            const plainText = '';
            const content = ContentState.createFromText(plainText);
            cloneVal = EditorState.createWithContent(content);
        }
        return cloneVal
    }


    render() {
        // console.log("PostsTextHolder:: props==============", this.props, this.state);
        
        let previewBody
        if (this.props.post_body) {
            if (this.props.isPreview) {
                let content = this.props.editedBody ? this.props.editedBody : this.props.post_body;
                previewBody = this.previewContent(content);
                //console.log("Preview Cloned Content", previewBody)
            }
        }

        let commentRenderElement = null;
        if (this.props.comments_data_state) {
            if (this.props.isExpanded || this.props.onBlogPage || this.props.onViewPost) {
                commentRenderElement = this.props.comments_data_state.map((commentItem) => {
                    return (<PostsContent content={commentItem.comments_data} isComment={true} 
                                commentDetails={commentItem.fields} {...this.props} commentItem={commentItem} />)
                })
            }
            else {
                let compressed_comments_data_state = [];
                let count = this.props.numberOfComments >
                    this.props.comments_data_state.length ?
                    this.props.comments_data_state.length : this.props.numberOfComments

                for (let i = 0; i < count; i++) {
                    compressed_comments_data_state[i] = this.props.comments_data_state[i]
                }

                commentRenderElement = compressed_comments_data_state.map((commentItem) => {
                    return (<PostsContent
                        key={commentItem.pk}
                        content={commentItem.comments_data} isComment={true}
                        commentDetails={commentItem.fields} {...this.props} commentItem={commentItem} />)
                })
            }
        }

        let moreLessSwitchElement = null;
        if(!(this.props.onBlogPage || this.props.onViewPost)) {
            if (this.props.numberOfComments >=
                this.props.comments_data_state.length) {
                moreLessSwitchElement = null
            }
            else {
                if (this.props.isExpanded) {
                    moreLessSwitchElement =
                        <Button style={{ "marginBottom": "0", "padding": "2px 40px", }}
                            className="refier_custom_button_dark"
                            onClick={this.props.switchExpandedStatus} >Less</Button>
                }
                else {
                    moreLessSwitchElement =
                        <Button style={{ "marginBottom": "0", "padding": "2px 40px", }}
                            className="refier_custom_button_dark"
                            onClick={this.props.switchExpandedStatus}>More</Button>
                }
            }
        }
        let tagValues = this.props.tag_values
        let tagValuesFromState = this.props.tagsFinal
        

        return (
            isXsDevice() || isMobileDevice() ?
            <div>
                <Grid fluid
                    id="user-community-post-card"
                    className='generic-post-card'
                    data-label="user community post card 1">
                    {
                        // this.props.post_type === "Question" ?
                        //     this.props.is_post_owner && 
                        //     !(this.props.is_community_owner || 
                        //         this.props.is_internal_counsellor || 
                        //         this.props.is_external_counsellor) &&
                        //         (commentRenderElement &&
                        //         commentRenderElement.length > 0) ?
                        //             <IsQuestionResolved 
                        //                 postId={this.props.id}
                        //                 dispatch={this.props.dispatch}
                        //                 isResolved={this.props.is_resolved}
                        //                 timeline={this.props.timeline}
                        //                 sortOrder={this.props.sortOrder}                    
                        //                 filterPostType={this.props.filterPostType}
                        //                 refreshPost={this.props.refreshPost}
                        //                 onViewPost={this.props.onViewPost}
                        //                 commentsCount={commentRenderElement.length}
                        //             /> :
                        //             <IsQuestionResolved 
                        //                 communityOwnerOrMentor={true}
                        //                 postId={this.props.id}
                        //                 dispatch={this.props.dispatch}
                        //                 isResolved={this.props.is_resolved}
                        //                 timeline={this.props.timeline}
                        //                 sortOrder={this.props.sortOrder}                    
                        //                 filterPostType={this.props.filterPostType}
                        //                 refreshPost={this.props.refreshPost}
                        //                 onViewPost={this.props.onViewPost}
                        //                 commentsCount={commentRenderElement.length}
                        //             /> :
                        //     null
                    }
                    <Col xs={12} style={{padding: "0"}}>
                        {this.props.onBlogPage || typeof tagValues === "undefined" || 
                        (tagValues && tagValues.length === 2) ?
                            /* 
                                tagValues = <string>
                                emtpy tagValues = "[]"
                                so length = 2
                            */
                            null :
                            <Grid fluid>
                                <Col xs={12} style={{ marginTop: "10px", "paddingLeft": "0" }}>
                                    <TagController 
                                        tagValues={tagValues}
                                        userId={this.props.userId}
                                        showPopup={true}
                                    />
                                </Col>
                            </Grid>
                        }

                        {this.props.onBlogPage ?
                            null :
                            <Grid fluid>
                                <Col style={{ textAlign: "left" }}>
                                    <PostOwnerDetails {...this.props} />
                                </Col>
                            </Grid>
                        }


                        {this.props.isPreview ?
                            <div style={this.props.post_title ? 
                                    { marginLeft: "15px", marginRight: "30px", marginTop: "20px" } : 
                                    { marginLeft: "15px", marginRight: "30px" }}>
                                <PostsContent content={previewBody}
                                    preview_post_type={this.props.post_type}
                                    isPreview={this.props.isPreview}
                                    preview_id={this.props.id}
                                    post_title={this.props.post_title}
                                    timeline={this.props.timeline}
                                    sortOrder={this.props.sortOrder}                    
                                    filterPostType={this.props.filterPostType} />
                            </div>
                            :
                            this.props.onBlogPage ?
                                null :
                                <div style={this.props.post_title ? 
                                        { marginLeft: "15px", marginRight: "30px", marginTop: "20px" } : 
                                        { marginLeft: "15px", marginRight: "30px" }}>
                                    <PostsContent 
                                        content={this.props.post_body_state} 
                                        timeline={this.props.timeline}
                                        sortOrder={this.props.sortOrder}
                                        filterPostType={this.props.filterPostType} />
                                </div>
                        }

                        <Grid style={{marginTop: "20px", marginBottom: "10px", display: 'flex', alignItems: 'center'}}>
                            <Col xs={6}>
                            {this.props.post_type && !(this.props.onBlogPage || this.props.onViewPost) ?
                                this.props.post_type == "Blog" ?
                                    <Link to={"/userDashboard/viewblog/" + this.props.id + "/1/"}
                                        className="custom-link" 
                                        style={{"fontSize": "0.85em"}}>
                                        <FontAwesome
                                            style={{"marginRight": "5px"}}
                                            name="comment-o" />
                                        {this.props.comments_data_state ? 
                                            this.props.comments_data_state.length !== 0 ?
                                                <span style={{"marginRight": "5px"}}>
                                                    {this.props.comments_data_state.length}
                                                </span> :
                                                <span style={{"marginRight": "5px"}}>No</span>
                                            : null
                                        }
                                        <span>Comments</span>
                                    </Link>
                                    :
                                    this.props.post_type == "Question" ?
                                        <Link to={"/userDashboard/viewpost/" + this.props.id + "/"}
                                            className=" custom-link" 
                                            style={{"fontSize": "0.85em"}}>
                                            <FontAwesome
                                                style={{"marginRight": "5px"}}
                                                name="comment-o" />
                                            {this.props.comments_data_state ? 
                                                this.props.comments_data_state.length !== 0 ?
                                                    <span style={{"marginRight": "5px"}}>
                                                        {this.props.comments_data_state.length}
                                                    </span> :
                                                    <span style={{"marginRight": "5px"}}>No</span>
                                                : null
                                            }
                                            <span>Answers</span>
                                        </Link>
                                        :
                                        null
                                    :
                                    null
                                }
                            </Col>
                            <Col xs={6}>
                                <div>
                                    <div>
                                    { !(this.props.onBlogPage || this.props.onViewPost) && 
                                        this.props.post_type &&
                                        ((this.props.post_type === "Question" && 
                                        (this.props.is_community_owner || 
                                            this.props.is_internal_counsellor || 
                                            this.props.is_external_counsellor || 
                                            this.props.is_post_owner))
                                        || this.props.post_type === "Blog") ?
                                        this.props.post_type === "Blog" ?
                                            <Col xs={12} style={{ textAlign: "right" }}>
                                                <PrimaryWhiteButton 
                                                    buttonText="Comment"
                                                    onButtonClick={this.toggleShowAnswerBox}
                                                    showIcon={
                                                        <FontAwesome
                                                            name={this.state.showAnswerBox ? 
                                                                "angle-up" : 
                                                                "angle-down"
                                                            } />
                                                    }
                                                />
                                            </Col> :
                                            this.props.post_type === "Question" ?
                                                <Col xs={12} style={{ "textAlign": "right" }}>
                                                    <PrimaryWhiteButton 
                                                        buttonText="Answer"
                                                        onButtonClick={this.toggleShowAnswerBox}
                                                        showIcon={
                                                            <FontAwesome
                                                                name={this.state.showAnswerBox ? 
                                                                    "angle-up" : 
                                                                    "angle-down"
                                                                } />
                                                        }
                                                    />
                                                </Col> :
                                                null :
                                            null
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Grid>

                        {this.props.onBlogPage ?
                            <br /> : null
                        }

                        <div className="custom-divider-post" style={{borderTopWidth: "0px"}}>
                            {((this.state.showAnswerBox || this.props.onBlogPage || this.props.onViewPost) && 
                                ((this.props.post_type === "Question" && 
                                (this.props.is_community_owner || 
                                    this.props.is_internal_counsellor || 
                                    this.props.is_external_counsellor || 
                                    this.props.is_post_owner))
                                || this.props.post_type === "Blog")
                            )
                                ?
                                <div style={{marginBottom: '10px'}}>
                                    <AnswerBox id={this.props.id}
                                        isIndividualPost={this.props.isIndividualPost}
                                        isBlog={this.props.post_type === "Blog" ? true : false} 
                                        filterPostType={this.props.filterPostType}
                                        timeline={this.props.timeline}
                                        sortOrder={this.props.sortOrder} />
                                </div>
                                : null
                            }
                            {this.props.onBlogPage || this.props.onViewPost ?
                                <div>
                                    {commentRenderElement}
                                    <div style={{ "textAlign": "right" }}>
                                        {moreLessSwitchElement}
                                    </div>
                                </div> :
                                null }
                            {((this.props.onBlogPage || this.props.onViewPost) &&
                                ((this.props.post_type === "Question" &&
                                (this.props.is_community_owner || 
                                    this.props.is_internal_counsellor || 
                                    this.props.is_external_counsellor || 
                                    this.props.is_post_owner))
                                || this.props.post_type === "Blog"))
                                ? <br />
                                : null
                            }
                        </div>
                    </Col>  
                    <Col xs={12}>
                    {
                        ((this.props.post_type === "Blog" || this.props.post_type === "Question") 
                        && !this.props.onBlogPage) ? 
                            <IsUsefulButtonVertical 
                                is_useful_count={this.props.is_useful_count}
                                is_not_useful_count={this.props.is_not_useful_count} 
                                liked_or_not={this.props.liked_or_not}
                                addLikeOrDislike={this.props.addLikeOrDislike} 
                                fromMobile={true}
                            />
                            : null
                    }
                    </Col>
                </Grid>
            </div>

            :
            
            <Col xs={12}>
                <Grid fluid
                    id="user-community-post-card"
                    className='generic-post-card'
                    data-label="user community post card 1">
                    {
                        this.props.post_type === "Question" ?
                            this.props.is_post_owner && 
                            !(this.props.is_community_owner || 
                                this.props.is_internal_counsellor || 
                                this.props.is_external_counsellor) &&
                                (commentRenderElement &&
                                commentRenderElement.length > 0) ?
                                    <IsQuestionResolved 
                                        postId={this.props.id}
                                        dispatch={this.props.dispatch}
                                        isResolved={this.props.is_resolved}
                                        timeline={this.props.timeline}
                                        sortOrder={this.props.sortOrder}                    
                                        filterPostType={this.props.filterPostType}
                                        refreshPost={this.props.refreshPost}
                                        onViewPost={this.props.onViewPost}
                                        commentsCount={commentRenderElement.length}
                                    /> :
                                    <IsQuestionResolved 
                                        communityOwnerOrMentor={true}
                                        postId={this.props.id}
                                        dispatch={this.props.dispatch}
                                        isResolved={this.props.is_resolved}
                                        timeline={this.props.timeline}
                                        sortOrder={this.props.sortOrder}                    
                                        filterPostType={this.props.filterPostType}
                                        refreshPost={this.props.refreshPost}
                                        onViewPost={this.props.onViewPost}
                                        commentsCount={commentRenderElement.length}
                                    /> :
                            null
                    }
                    <Col sm={2} md={1}>
                    {
                        ((this.props.post_type === "Blog" || this.props.post_type === "Question") && !this.props.onBlogPage)
                            ? <IsUsefulButtonVertical is_useful_count={this.props.is_useful_count}
                                is_not_useful_count={this.props.is_not_useful_count} liked_or_not={this.props.liked_or_not}
                                addLikeOrDislike={this.props.addLikeOrDislike} />
                            : null
                    }
                    </Col>
                    <Col sm={10} md={11} style={{"padding": "0"}}>
                        {this.props.onBlogPage || typeof tagValues === "undefined" || (tagValues && tagValues.length === 2) ?
                            /* 
                                tagValues = <string>
                                emtpy tagValues = "[]"
                                so length = 2
                            */
                            null :
                            <Grid fluid>
                                <Col xs={12} style={{ marginTop: "10px", "paddingLeft": "0" }}>
                                    <TagController 
                                        tagValues={tagValues}
                                        userId={this.props.userId}
                                        showPopup={true}
                                    />
                                </Col>
                            </Grid>
                        }

                        {this.props.onBlogPage ?
                            null :
                            <Grid fluid>
                                <Col style={{ "textAlign": "left" }}>
                                    <PostOwnerDetails {...this.props} />
                                </Col>
                            </Grid>
                        }


                        {this.props.isPreview ?
                            <div style={this.props.post_title ? 
                                    { "marginLeft": "15px", "marginRight": "30px", "marginTop": "20px" } : 
                                    { "marginLeft": "15px", "marginRight": "30px" }}>
                                <PostsContent content={previewBody}
                                    preview_post_type={this.props.post_type}
                                    isPreview={this.props.isPreview}
                                    preview_id={this.props.id}
                                    post_title={this.props.post_title}
                                    timeline={this.props.timeline}
                                    sortOrder={this.props.sortOrder}                    
                                    filterPostType={this.props.filterPostType} />
                            </div>
                            :
                            this.props.onBlogPage ?
                                null :
                                <div style={this.props.post_title ? 
                                        { "marginLeft": "15px", "marginRight": "30px", "marginTop": "20px" } : 
                                        { "marginLeft": "15px", "marginRight": "30px" }}>
                                    <PostsContent 
                                        content={this.props.post_body_state} 
                                        timeline={this.props.timeline}
                                        sortOrder={this.props.sortOrder}
                                        filterPostType={this.props.filterPostType} />
                                </div>
                        }

                        <Row style={{"marginTop": "20px", "marginBottom": "20px"}}>
                            <Col sm={3}>
                            {this.props.post_type && !(this.props.onBlogPage || this.props.onViewPost) ?
                                    this.props.post_type == "Blog" ?
                                        <Link to={"/userDashboard/viewblog/" + this.props.id + "/1/"}
                                            className="custom-link" 
                                            style={{"paddingLeft": "15px", "fontSize": "0.85em"}}>
                                            <FontAwesome
                                                style={{"marginRight": "5px"}}
                                                name="comment-o" />
                                            {this.props.comments_data_state ? 
                                                this.props.comments_data_state.length !== 0 ?
                                                    <span style={{"marginRight": "5px"}}>
                                                        {this.props.comments_data_state.length}
                                                    </span> :
                                                    <span style={{"marginRight": "5px"}}>No</span>
                                                : null
                                            }
                                            <span>Comments</span>
                                        </Link>
                                        :
                                        this.props.post_type == "Question" ?
                                            <Link to={"/userDashboard/viewpost/" + this.props.id + "/"}
                                                className=" custom-link" 
                                                style={{"paddingLeft": "15px", "fontSize": "0.85em"}}>
                                                <FontAwesome
                                                    style={{"marginRight": "5px"}}
                                                    name="comment-o" />
                                                {this.props.comments_data_state ? 
                                                    this.props.comments_data_state.length !== 0 ?
                                                        <span style={{"marginRight": "5px"}}>
                                                            {this.props.comments_data_state.length}
                                                        </span> :
                                                        <span style={{"marginRight": "5px"}}>No</span>
                                                    : null
                                                }
                                                <span>Answers</span>
                                            </Link>
                                            :
                                            null
                                    :
                                    null
                                }
                            </Col>
                            <Col sm={9}>
                                <div style={{ "marginRight": "35px" }}>
                                    <div>
                                        {
                                            !(this.props.onBlogPage || this.props.onViewPost) && this.props.post_type &&
                                                ((this.props.post_type === "Question" && 
                                                (this.props.is_community_owner || 
                                                    this.props.is_internal_counsellor || 
                                                    this.props.is_external_counsellor || 
                                                    this.props.is_post_owner))
                                                || this.props.post_type === "Blog") ?
                                                this.props.post_type === "Blog" ?
                                                    <Col xs={12} style={{ "textAlign": "right" }}>
                                                        <PrimaryWhiteButton 
                                                            buttonText="Comment"
                                                            onButtonClick={this.toggleShowAnswerBox}
                                                            showIcon={
                                                                <FontAwesome
                                                                    name={this.state.showAnswerBox ? 
                                                                        "angle-up" : 
                                                                        "angle-down"
                                                                    } />
                                                            }
                                                        />
                                                    </Col> :
                                                    this.props.post_type === "Question" ?
                                                        <Col xs={12} style={{ "textAlign": "right" }}>
                                                            <PrimaryWhiteButton 
                                                                buttonText="Answer"
                                                                onButtonClick={this.toggleShowAnswerBox}
                                                                showIcon={
                                                                    <FontAwesome
                                                                        name={this.state.showAnswerBox ? 
                                                                            "angle-up" : 
                                                                            "angle-down"
                                                                        } />
                                                                }
                                                            />
                                                        </Col> :
                                                        null :
                                                    null
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {this.props.onBlogPage ?
                            <br /> : null
                        }

                        <div className="custom-divider-post" style={{borderTopWidth:"0px", "width": "95%"}}>
                            {((this.state.showAnswerBox || this.props.onBlogPage || this.props.onViewPost) && 
                                ((this.props.post_type === "Question" && 
                                (this.props.is_community_owner || 
                                    this.props.is_internal_counsellor || 
                                    this.props.is_external_counsellor || 
                                    this.props.is_post_owner))
                                || this.props.post_type === "Blog")
                            )
                                ?
                                <div style={{marginBottom: '50px'}}>
                                    <AnswerBox id={this.props.id}
                                        isIndividualPost={this.props.isIndividualPost}
                                        isBlog={this.props.post_type === "Blog" ? true : false} 
                                        filterPostType={this.props.filterPostType}
                                        timeline={this.props.timeline}
                                        sortOrder={this.props.sortOrder} />
                                </div>
                                : null
                            }
                            {this.props.onBlogPage || this.props.onViewPost ?
                                <div>
                                    {commentRenderElement}
                                    <div style={{ "textAlign": "right" }}>
                                        {moreLessSwitchElement}
                                    </div>
                                </div> :
                                null }
                            {((this.props.onBlogPage || this.props.onViewPost) &&
                                ((this.props.post_type === "Question" &&
                                (this.props.is_community_owner || 
                                    this.props.is_internal_counsellor || 
                                    this.props.is_external_counsellor || 
                                    this.props.is_post_owner))
                                || this.props.post_type === "Blog"))
                                ? <br />
                                : null
                            }
                        </div>
                    </Col>  
                </Grid>
            </Col>
        );
    }
}