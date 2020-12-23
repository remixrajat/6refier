import React from 'react';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


export default class IsUsefulButton extends React.Component{
    render() {
        let likeBtnClass = "refier_custom_button_unlike_vertical";
        let dislikeBtnClass = "refier_custom_button_unlike_vertical";
        let likeBtnAction = "add";
        let dislikeBtnAction = "add";

        if(this.props.liked_or_not === "like") {
            likeBtnClass = "refier_custom_button_like_vertical";
            likeBtnAction = "remove";
            dislikeBtnAction = "addRemove";
        }
        else if(this.props.liked_or_not === "dislike") {
            dislikeBtnClass = "refier_custom_button_like_vertical";
            likeBtnAction = "addRemove";
            dislikeBtnAction = "remove";
        }

        return (
            <div style={this.props.fromMobile ? 
                    {display: 'flex', justifyContent: 'space-around', borderTop: '1px solid rgba(0,0,0,0.1)'} : 
                    {marginTop: "15px"}}>
                <Button bsStyle="default" 
                    className={likeBtnClass} name="like" 
                    onClick ={(e) => {this.props.addLikeOrDislike(likeBtnAction,"like",e); e.target.blur();}} >
                    <span name="like">
                        <FontAwesome name="thumbs-up" />
                    </span>
                </Button>
                {this.props.fromMobile ?
                    null :
                    <p className="upvote-downvote-count">
                        {this.props.is_useful_count - this.props.is_not_useful_count}
                    </p>
                }
                <Button bsStyle="default" 
                    className={dislikeBtnClass} name="dislike" 
                    onClick = {(e) => {this.props.addLikeOrDislike(dislikeBtnAction,"dislike",e); e.target.blur();}} >
                    <span  name="dislike">
                        <FontAwesome name="thumbs-down" />
                    </span>
                </Button>
            </div>
        );
    }
}