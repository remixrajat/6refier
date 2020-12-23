import React, { Component } from 'react';
import { Row, Col, Grid, OverlayTrigger, Popover, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';

import { followTopic } from '../../topicpage/conditionalcomponents/action'

import TagImg from '../../images/tags/tag_default.jpg';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'


export default class TopicCard extends Component {
    constructor(props) {
        super(props)
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseExit = this.mouseExit.bind(this);
        this.tagFollow = this.tagFollow.bind(this)
    }


    mouseEnter() {
        this.refs.pop.show();
    }

    mouseExit() {
        this.refs.pop.hide();        
    }

    tagFollow(tagId) {
        this.props.dispatch(followTopic(tagId)); 
        // let tagPromise = this.props.dispatch(followTopic(tagId)); 
        // this.setState({
        //     tagFollowLoader: 2
        // })               
        // tagPromise.then((resp) => {
        //         // console.log("******Response from server for isUserFollows: ", resp);
        //         let status = 0

        //         if(typeof resp == "undefined")  status = -1;
        //         else if(resp === 1) status = 1;

        //         this.setState({
        //             tagFollowLoader: status
        //         })                                
        // })
    }

    render() {
        // console.log("TopicCard :: props :: ", this.props)

        let imgChar = this.props.topicDetails ? this.props.topicDetails.fields.tag_name.charAt(0) : 'R';
        let colorIndex = this.props.topicDetails ? (this.props.topicDetails.pk) % 4 : 2;

        const popover = (
            <Popover>
                {/* // className="refier-tooltip" 
                // onMouseOver={this.mouseEnter}   
                // onMouseOut={this.mouseExit}>     */}
                <div
                    className="custom-list-sub-content-highlighted"
                    style={{margin:"10px", color:"#3c3c3c"}}>
                    {this.props.topicDetails.fields.description.length > 100 ? 
                            this.props.topicDetails.fields.description.substr(0, 100) + "..." :
                        this.props.topicDetails.fields.description.length == 0 ?
                        this.props.topicDetails.fields.tag_name:this.props.topicDetails.fields.description}
                </div>
            </Popover>
        );


        return (
            <div className={"refier_card_list"}>
                <div className="refier_card_image">
                    <img
                        // src="https://i.redd.it/b3esnz5ra34y.jpg"
                        src={this.props.topicDetails.fields.tag_photo ? (MEDIA_URL_TEXT +
                            this.props.topicDetails.fields.tag_photo) : TagImg}
                    /> </div>
                <div className="refier_card_title refier_card_title_white"
                style={{
                        display: "flex", justifyContent: "space-between", padding: "5px"
                    }}>
                    <div style={{textAlign:"left"}}>
                        <div>
                        <Link to={"/userDashboard/topic/" + this.props.profileId + "/" + this.props.link + "/"}>
                                <span style={{color:"white", fontSize: '14px'}}>
                                {this.props.topicDetails.fields.tag_name}</span>
                                <span
                                    // onMouseOver={this.mouseEnter} 
                                    // onMouseOut={this.mouseExit} 
                                    style={{"display": "inline-block"}}>
                                    <OverlayTrigger 
                                        placement="bottom" 
                                        // trigger="manual" 
                                        overlay={popover} 
                                        rootClose
                                        containerPadding={20}
                                        ref="pop">
                                        <FontAwesome
                                            // title="Info"
                                            name="info-circle"
                                            style={{ "color": "white", paddingLeft: "10px" }} />
                                    </OverlayTrigger>
                                </span>
                        </Link></div>
                        <div className="refier_card_sub_title_white"
                            style={{ margin:"0px", marginTop: "5px" }}>
                                <div>
                                   {this.props.topicDetails.fields.follower_count} &nbsp;Subscribers
                                </div>
                        </div> 
                    </div>
                    {!this.props.topicDetails.fields.is_followed_by_user ? 
                        <div style={{ verticalAlign: "middle" }}>
                            <span style={{ paddingLeft: "5px" }}>
                                <Button
                                    className="refier_custom_icon_button"
                                    onClick={() => this.tagFollow(this.props.link)}
                                    style={{width: '24px', height: '24px'}}
                                    >
                                    <FontAwesome
                                        title="Follow Topic"
                                        name="plus"
                                        size="x"
                                        style={{
                                            "cursor": "pointer", fontSize: '14px'
                                        }} />
                                </Button>
                            </span>
                        </div> :
                        <div style={{ verticalAlign: "middle" }}>
                            <span style={{ paddingLeft: "5px" }}>
                                <FontAwesome
                                    title="Following"
                                    name="check-circle"
                                    size='2x'
                                />
                            </span>
                        </div>
                    }
                </div>
            </div>
        )
    }
}