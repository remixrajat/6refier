import React from 'react';
import {grid,Col,Row,Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class IsUsefulButton extends React.Component{
    render(){
        let likeBtnClass = "refier_custom_button_new_not_selected";
        let dislikeBtnClass = "refier_custom_button_new_not_selected";
        let likeBtnAction = "add";
        let dislikeBtnAction = "add";
        if(this.props.liked_or_not === "like"){
            likeBtnClass = "refier_custom_button_new_selected";
            likeBtnAction = "remove";
            dislikeBtnAction = "addRemove";
        }
        else if(this.props.liked_or_not === "dislike"){
            dislikeBtnClass = "refier_custom_button_new_selected";
            likeBtnAction = "addRemove";
            dislikeBtnAction = "remove";
        }

        return(
            <div className="useful-wrapper" style={this.props.fromViewBlog ? 
                {background: '#f5f6fc', paddingLeft:"20px"} :
                {}
            }>
                <span className="custom-small-text-options">Do you find it useful?</span>
                <div>
                    <Button bsStyle="default" 
                        style={this.props.fromViewBlog ?
                            {"margin": "10px 0px", "padding": "2px 10px", fontSize: '14px'} :
                            {"margin": "10px 0px", "padding": "2px 10px"}
                        }
                        className={likeBtnClass} name="like" 
                        onClick ={(e) => {this.props.addLikeOrDislike(likeBtnAction,"like",e); e.target.blur();}} 
                    >
                        <span name="like">
                            <FontAwesome
                                name="thumbs-up"
                            />
                        </span>
                        <span style={{marginLeft:"10px"}} name="like">
                            Yes ({this.props.is_useful_count})
                        </span>
                    </Button>

                    <Button bsStyle="default" 
                        style={this.props.fromViewBlog ?
                            {"margin": "10px 0px", "padding": "2px 10px", fontSize: '14px', marginLeft: '10px'} :
                            {"margin": "10px 0px 10px 15px", "padding": "2px 10px"}
                        }
                        className={dislikeBtnClass} name="dislike" 
                        onClick = {(e) => {this.props.addLikeOrDislike(dislikeBtnAction,"dislike",e); e.target.blur();}}
                    >
                        <span  name="dislike">
                            <FontAwesome
                                name="thumbs-down"
                            />
                        </span>
                        <span style={{marginLeft:"10px"}}  name="dislike">
                            No ({this.props.is_not_useful_count})
                        </span>
                    </Button>
                </div>
            </div>
        );
    }
}