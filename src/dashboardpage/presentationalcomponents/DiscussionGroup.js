import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { joinRoom } from '../../discussionGroup/conditionalComponents/action';

import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';
import PreLoader from '../../shared/Preloader/PreLoader';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import imageSrc from "../../images/mentor_dashboard_page/community_avatar.png";


export default class DiscussionGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            joinLoaderStatus: 0,
            isJoined: true
        }

        this.joinDiscussionRoom = this.joinDiscussionRoom.bind(this);
    }

    componentWillMount() {
        if(this.props.discussionDetails) {
            if(this.props.discussionDetails.hasOwnProperty('is_member')) {
                this.setState({isJoined: this.props.discussionDetails.is_member})
            }
        }
    }

    joinDiscussionRoom(groupId, communityId) {
        let joinPromise = this.props.dispatch(joinRoom(groupId, communityId));
        this.setState({ joinLoaderStatus: 2 })
        let self=this
        joinPromise.then((resp) => {
            let status = 0
            if(typeof resp == "undefined" || resp === "False")  status = -1;
            else if(resp === "True") status = 1;
            
            self.setState({ joinLoaderStatus: status })                   
            setTimeout(() => {
                self.setState({ joinLoaderStatus: 0 });   
                if (status === 1) {
                    self.setState({ isJoined: true })
                }         
            }, 1000)
        })
    }
    

    render() {
        // console.log("DiscussionGroup :: props :: ", this.props)

        let groupName = this.props.discussionDetails.fields.group_name

        let imgChar = groupName ? groupName.charAt(0) : "G"
        let colorIndex = (this.props.index) % 4

        let photo = this.props.discussionDetails.fields.community_photo

        return (
            <Row style={{ padding: "10px 10px", textAlign: "left", borderBottomColor: 'transparent' }} 
                className="custom-item-border">
                <Col xs={3} style={{ textAlign: "right" }}>
                    <p className={"custom-list-char-image-" + colorIndex}>
                        {imgChar}
                    </p>
                </Col>
                <Col xs={9} style={{ textAlign: "left" }}>
                    <Link style={{marginLeft: "10px"}}
                        to={"/userDashboard/discussion/" + this.props.discussionDetails.fields.group}
                        style={{ "wordWrap": "normal" }}
                        className="custom-link">
                        {groupName}
                    </Link>
                    <div
                        className="custom-list-sub-content-highlighted"
                        style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <Link style={{marginLeft: "10px"}}
                            to={"/userDashboard/community/" + this.props.discussionDetails.fields.community_id}
                            style={{ wordWrap: "normal" }}
                            className="custom-link">
                            <span>
                                <img src={(photo && photo !== "") ? 
                                        MEDIA_URL_TEXT + photo : 
                                        imageSrc
                                    }
                                    className="custom-card-img-small" />
                            </span>
                        </Link>
                        <Link style={{marginLeft: "10px"}}
                            to={"/userDashboard/community/" + this.props.discussionDetails.fields.community_id}
                            style={{ wordWrap: "normal" }}
                            className="custom-link">
                            <span style={{marginLeft: "10px"}}>
                                {this.props.discussionDetails.fields.community_name}
                            </span>
                        </Link>
                    </div>
                    <div
                        className="custom-list-sub-content">
                        {this.props.discussionDetails.fields.membersCount} Members</div>
                    <div
                        className="custom-list-sub-content" style={{marginTop: "5px", marginBottom: '10px'}}>
                        {this.props.discussionDetails.fields.postsCount} Discussions Happening</div>
                    {
                        !this.state.isJoined ?
                            this.state.joinLoaderStatus === 0 ?
                                <PrimaryButton 
                                    onButtonClick={() => 
                                        this.joinDiscussionRoom(
                                            this.props.discussionDetails.fields.group, 
                                            this.props.discussionDetails.fields.community_id
                                        )
                                    }
                                    buttonText="Join Room"
                                /> :
                                this.state.joinLoaderStatus === 2 ?
                                    <PreLoader /> :
                                    this.state.joinLoaderStatus === 1 ? 
                                        <p style={{"margin": "0"}} 
                                            className="form-status-success">Success</p> :
                                        this.state.joinLoaderStatus === -1 ?
                                            <p style={{"margin": "0"}}  
                                                className="form-status-fail">request failed</p> :
                                            null :
                            null
                    }
                </Col>
            </Row>
        );
    }
}