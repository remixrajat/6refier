import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom';
import { OverlayTrigger, Popover, Row, Col, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import PreLoader from '../../Preloader/PreLoader'


export default class Tag extends Component {
    constructor(props) {
        super(props);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseExit = this.mouseExit.bind(this);
    }
    
    mouseEnter() {
        this.refs.pop.show();
    }

    mouseExit() {
        this.refs.pop.hide();        
    }

    render() {
        // console.log("Tag::props", this.props);


        let content =   <Link to={"/userDashboard/topic/"+this.props.userId+"/"+this.props.tag_id+"/"}>
                            <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                                className={"custom-list-tag-" + this.props.index}>
                                {
                                    this.props.isFollowed !== undefined && this.props.isFollowed ?
                                        <span>
                                            {this.props.tag_name}
                                            <FontAwesome
                                                title="Following"
                                                name="check-circle"
                                                
                                                className="tag-following-indicator" />
                                        </span> :
                                        this.props.tag_name
                                }
                            </span>
                        </Link>
                        
        if(this.props.showPopup) {
            const popover = (
                <Popover 
                    className="refier-tooltip" 
                    onMouseOver={this.mouseEnter}   
                    onMouseOut={this.mouseExit}>    
                    { 
                        this.props.tagFollowLoader === 2 ? 
                            <div className="popover-header loader">
                                <PreLoader />
                            </div> :
                            this.props.tagFollowLoader === -1 ?
                                <div className="popover-header loader">
                                    <p style={{"marginLeft": "10px"}}>Sorry, there was an issue!</p>
                                </div> :                                                                                              
                                <Row className="popover-header">
                                    <Col md={7}>
                                        <FontAwesome
                                            name='flash'
                                            
                                            style={{"display": "inline-block"}}/>                                
                                        <p style={{"display": "inline-block", "marginLeft" : "5px"}}>
                                            {this.props.followerCount} watchers
                                        </p>
                                    </Col>
                                    <Col md={5}>
                                        <Button 
                                            className="refier_custom_link" 
                                            onClick={() => this.props.tagFollow(this.props.tag_id)}>
                                            { this.props.isFollowed ? 'Following' : 'Follow' }
                                        </Button>
                                    </Col>
                                </Row> 
                    }
                    <Row className="popover-body">
                        <Col xs={12}>
                            <p>{this.props.tag_description}</p>
                        </Col>
                    </Row>
                </Popover>
            );
            content =   <div 
                            onMouseOver={this.mouseEnter} 
                            onMouseOut={this.mouseExit} 
                            style={{"display": "inline-block"}}>
                            <OverlayTrigger 
                                placement="bottom" 
                                trigger="manual" 
                                overlay={popover} 
                                rootClose
                                containerPadding={20}
                                ref="pop">
                                { content }
                            </OverlayTrigger>
                        </div>
        }

        return (
            content
        )
    }
}