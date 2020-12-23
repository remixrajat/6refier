import React, {Component} from 'react'
import { Grid, Col, Row, FormControl, Image, Button, ProgressBar} from 'react-bootstrap'

import PlayerModal from './PlayerModal'
import {getContentForDashboard} from '../conditionalcomponents/actions'
import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton'

import contentImageSrc from "../../images/mentor_dashboard_page/refier_generic.jpg";
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import '../../styles/scss/content-section.css'


export default class ContentSectionElement extends Component{
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
    }

    showModal() {
        //console.log("recordedContent::ContentInfoCard:: showModal() ")
        this.setState({ showModal: true });
    }

    closeModal() {
        this.props.dispatch(getContentForDashboard());
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

        let formdata = {
            content_id: this.props.content.id,
            mapping_id: this.props.mapping_id,
            action: actionType,
            likeOrDislike: likeOrDislike,
            refresh_required: true
        }
        // console.log("addLikeOrDislike   ", formdata);

        this.props.likeOrDislikeContents(formdata);
    }


    render() {
        let playerModal = (<PlayerModal {...this.props}
            showModal={this.state.showModal}
            onClose={this.closeModal}
            liked_or_not={this.state.liked_or_not}
            addLikeOrDislike={this.addLikeOrDislike}
            contentId={this.props.content.id}
            fromContentSection={true}
        
            is_useful_count={this.state.is_useful_count}
            is_not_useful_count={this.state.is_not_useful_count}
        />);

        return (
            <div id="content-container">
                <div id="content-image-container">
                    <Image id="content-image" src={this.props.content.photo || 
                       this.props.content.photo != ""? 
                            MEDIA_URL_TEXT +
                            this.props.content.photo:contentImageSrc} responsive/>
                </div>
                
                <div id="content-text">
                    {this.props.content.title}
                </div>
                <div id="content-progress">
                    {this.props.content.number_of_full_view.length>0 ?
                       this.props.content.number_of_full_view[0]!=0?
                        ("Completed")
                            :
                            this.props.content.percentage_view[0].toFixed(0) + "% Seen"
                        : "Watch Now"
                    }
                </div>
                <PrimaryButton 
                    buttonText={
                        this.props.content.number_of_full_view.length > 0 ?
                            this.props.content.number_of_full_view[0] !=0 ?
                                ("Watch Again")
                                :
                                ("Resume")
                            : "Watch Now"
                    }
                    buttonId="content-action"
                    onButtonClick={this.showModal}
                />
                {playerModal}
            </div>
        )
    }

}