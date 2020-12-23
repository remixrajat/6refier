import React, {Component} from 'react'
import { Grid, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import JoinRoomController from '../conditionalComponents/JoinRoomController'
import RoomDetails from './RoomDetails'


export default class DiscussionGroupFeedCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isJoined: false,
        }
        this.setIsJoined = this.setIsJoined.bind(this)
    }

    setIsJoined() {
        this.setState({isJoined: true})
    }

    render() {
        // console.log("DiscussionGroupFeedCard:: props", this.props);

        return (
            <Col xs={12}>
                <div
                    id="user-community-post-card"
                    className='generic-post-card'
                    data-label="user community post card 1">
                    {
                        this.props.fromDashboard ?
                            <div className="discussion-banner-container">
                                <p style={{flex: 0.4}}>Discussion Room</p>                    
                                <div style={{flex: 0.6}}></div>                    
                            </div> :
                            null
                    }
                    <div style={this.props.fromDashboard ? {padding: '15px 50px'} : {padding: '15px 20px'}}>
                        <Grid fluid>
                            <Col xs={7} sm={8} style={{ "textAlign": "left" }}>
                                <RoomDetails roomDetails={this.props.room}
                                    isJoined={this.state.isJoined}/>
                            </Col>
                            <Col xs={5} sm={4} style={{ "textAlign": "right", "marginTop": "20px" }}>
                                {
                                    !this.props.room.fields.is_user_in_group ?
                                        <JoinRoomController 
                                            roomDetails={this.props.room}
                                            communityId={this.props.communityId}
                                            setIsJoined={this.setIsJoined} /> :
                                        ''
                                }
                            </Col>
                        </Grid>
                        <div style={{ "margin": "30px 30px 20px 30px" }}>
                            <p className="generic-post-card-description">
                                {this.props.desc}
                            </p>
                            {!this.props.room.fields.is_user_in_group && !this.state.isJoined?
                                null :
                                <Link to={"/userDashboard/discussion/" + this.props.room.pk} 
                                    className="generic-custom-link-right">
                                    <span>View Room</span>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </Col>
        )
    }
}