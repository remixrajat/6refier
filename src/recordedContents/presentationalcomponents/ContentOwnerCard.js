import React, { Component } from "react";
import dummyPoster from "../../images/mentor_dashboard_page/document.jpg"
import { Thumbnail, Col, OverlayTrigger, Popover, Fade, Button, Row, Image } from "react-bootstrap";
import PlayerModal from './PlayerModal'
import FontAwesome from 'react-fontawesome';
import RequestAccessFormController from '../conditionalcomponents/RequestAccessFormController';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import PackageValidityController from '../../shared/PackageValidity/conditionalcomponents/PackageValidityController'



class ContentInfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            is_useful_count: this.props.content.number_of_likes,
            is_not_useful_count: this.props.content.number_of_dislikes,
            liked_or_not: this.props.content.likeOrDislike?this.props.content.likeOrDislike:null,

        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addLikeOrDislike = this.addLikeOrDislike.bind(this);
        this.getContentText = this.getContentText.bind(this);
    }

    showModal() {
        //console.log("recordedContent::ContentInfoCard:: showModal() ")
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false })
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

        // {
        //     content_id : content_id,
        //     mapping_id : mapping_id,
        //     action : actionType,
        //     likeOrDislike : likeOrDislike,
        //     refresh_required : true
        // }
        let formdata = {
            content_id: this.props.contentId,
            mapping_id: this.props.mapping_id,
            action: actionType,
            likeOrDislike: likeOrDislike,
            refresh_required: true
        }
        // console.log("addLikeOrDislike   ", formdata);

        this.props.likeOrDislikeContents(formdata);
    }

    hintDescription(desc) {

        return <Popover id="popover-trigger-hover-focus">
            <div className="custom-list-sub-content" style={{ margin: "10px 10px" }}>
                {desc}</div>
        </Popover>
    }

    getContentText(content, searchText) {

        const maxLength = 50   
        let append = content.length>50?"...":""
        content = content.substring(0,50) + append
        let newContent = content.toLowerCase();
        let idx = newContent.indexOf(searchText);
        let resp;
        
        if(searchText !== '' && idx !== -1) {
            const textLen = searchText.length;
            if(idx === 0) {
                resp =  <span className="custom-list-content" >
                            <span className="highlight-text">{content.substring(idx, textLen)}</span>
                            { content.substring(textLen) }
                        </span>;
            } else {
                resp =  <span className="custom-list-content">
                            {content.substring(0, idx)}
                            <span className="highlight-text">{ content.substring(idx, idx + textLen) }</span>
                            {content.substring(idx + textLen)}
                        </span>;
            }
        } else {
            resp = <span className="custom-list-content">
                        { content }
                    </span>
        }       
        return resp;
    }



    render() {
        // console.log("Content Owner Card :: this.props ::", this.props)
        let searchText = ""
        let tagValues = this.props.content.tag_values
        tagValues = JSON.parse(tagValues)
        let tags = []
        for (let i = 0; i < tagValues.length; i++) {
            let index = this.props.index ? this.props.index + i : i
            index = index % 4
            tags.push(
                <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                    className={"custom-list-tag-" + index}>
                    {tagValues[i].fields.tag_name}</span>)
        }


        let bootstrapClass = 'col-lg-3 col-md-4 col-xs-6';
        if(this.props.fromCommunityProfile)
            bootstrapClass = 'col-lg-4 col-md-4 col-xs-6'

        let contentTitle = this.getContentText(this.props.content.title, searchText);
        let contentDesc = this.getContentText(this.props.content.description, searchText)
        let contentFirstName = this.getContentText(this.props.content.author.first_name, searchText)
        let contentLastName = this.getContentText(this.props.content.author.last_name, searchText)
        
        // console.log("ContentPage::ContentInfoCard::", this.props)
        let playerModal = (<PlayerModal {...this.props}
            showModal={this.state.showModal}
            onClose={this.closeModal}
            is_useful_count={this.state.is_useful_count}
            is_not_useful_count={this.state.is_not_useful_count}
            liked_or_not={this.state.liked_or_not}
            addLikeOrDislike={this.addLikeOrDislike} />);
        return (
            <div>
                <Col className={bootstrapClass} style={{height: "250px"}}>
                    <Thumbnail
                        src={this.props.content.poster_thumbnail ?
                            MEDIA_URL_TEXT + this.props.content.poster_thumbnail : dummyPoster}
                        onClick=
                        {this.showModal} className="custom-thumbnail custom-item-border"
                        style={{ "cursor": "pointer" }}>
                        <div style={{ margin: "10px 0px" }}>
                            <OverlayTrigger
                                trigger={['hover', 'focus']}
                                placement="bottom"
                                overlay={this.hintDescription(this.props.content.description)}
                            >
                                {contentTitle}
                            </OverlayTrigger></div>
                        <Row>
                            <Col xs={6} 
                                className=
                                {this.props.content.likeOrDislike?
                                    this.props.content.likeOrDislike == "like"?
                                        "custom-list-sub-content-blue":
                                        "custom-list-sub-content-highlighted":
                                        "custom-list-sub-content-highlighted"}>
                                <span style={{ "marginRight": "10px" }}>
                                    <FontAwesome
                                        name='thumbs-o-up'
                                        
                                        style={{ "display": "inline-block" }}
                                    />
                                </span>
                                <span>{this.state.is_useful_count}</span></Col>
                        </Row>
                        <div>
                            {tags}
                        </div>
                        <div>
                        </div>

                        {/* <div className="custom-list-sub-content-highlighted" style={{ marginTop: "10px" }}>
                            {contentFirstName}&nbsp;{contentLastName !== 'None' ?
                                contentLastName : ""}</div>
                        {this.props.fromOtherPage ? null : <div className="custom-list-sub-content">
                            {contentDesc}</div>
                        } */}

                    </Thumbnail>
                </Col>
                {
                    this.state.showModal ?
                         playerModal : null
                }
            </div>
        );
    }
}

export default ContentInfoCard;