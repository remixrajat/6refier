import React, { Component } from 'react'
import { Grid, Row, Col, Media } from 'react-bootstrap'
import UserImg from '../../images/mentor_dashboard_page/avatardp.png'

import AvatarCard from './AvatarCard'
import { MEDIA_URL_TEXT } from '../../GlobalConstants';


class WebinarDetails extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.event_details) {
            return null
        }
        return (
            <div style={{ display: "flex", justifyContent: "flex-start",  }}>
                <div >
                    <img 
                        width={64} 
                        height={64}
                        style={{"borderRadius": "50%"}}
                        src={this.props.event_details.sessionMentorProfilePhoto ?
                            (MEDIA_URL_TEXT + this.props.event_details.sessionMentorProfilePhoto) : UserImg} 
                        alt="profile-photo" />
                </div>
                <div style={{marginLeft:"10px"}}>
                    <p className="refier__text_post_title" style={{"margin": "0", fontFamily:"Roboto"}}>
                        {this.props.event_details.sessionTitle || "Refier Webinar Session"}
                    </p>
                    <div>
                        <p style={{"margin": "0"}}>{this.props.event_details.sessionMentorName || "Refier Mentor"}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default WebinarDetails;