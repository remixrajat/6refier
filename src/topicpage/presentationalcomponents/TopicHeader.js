import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import UserImageStatus from '../../profilepage/presentationalcomponents/UserImageStatus';
import MentorListForTopic from './MentorListForTopic';
import CommunityListForTopic from './CommunityListForTopic';

import { NonPriorityWhiteButton } from '../../shared/RefierComponents/NonPriorityWhiteButton';
import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import TagImg from '../../images/tags/tag_default.jpg';


class TopicHeader extends React.Component {
    constructor(props){
        super(props);

        this.state={
            showMentors: true,
            showCommunities: false,
        }

        this.getWriteAccess = this.getWriteAccess.bind(this);
        this.onClickMentors = this.onClickMentors.bind(this)
        this.onClickCommunities = this.onClickCommunities.bind(this)
    }

	getWriteAccess() {
		return this.props.topicOwnershipValue;
    }
    
    
    onClickMentors() {
        this.setState({
            showMentors: true,
            showCommunities: false
        })
    }

    onClickCommunities() {
        this.setState({
            showMentors: false,
            showCommunities: true,
        })
    }
    

    render() {
        // console.log("TopicHeader::props", this.props);

        let topic = this.props.topicDetails ? 
                        this.props.topicDetails.fields.tag_name : 
                        ""
                        
        return (
            <div>
                <div className="refier_custom_panel_window" 
                    style={{ textAlign: "left", backgroundColor:"white", marginTop:"20px" }}>
                    <div>
                        <div className={"refier_image_panel"} 
                            style={{ cursor: "default", width:"100%", transform:"none", margin:"0px" }}>
                            <div className="refier_image">
                                <img 
                                    style={{objectFit:"cover"}}
                                    src={this.props.topicDetails.fields.tag_photo ? 
                                            MEDIA_URL_TEXT
                                            + this.props.topicDetails.fields.tag_photo :
                                            TagImg
                                    }
                                />
                            </div>
                            <div>
                                <div className="refier_image_panel_element"
                                    style={{
                                            padding: "5px",
                                            height: '350px',
                                            overflowY: 'hidden'
                                        }}>

                                    <div style={{
                                            "paddingTop": "10px", paddingBottom: "20px",
                                            "textAlign": "center", "marginTop": "20px"
                                        }}>
                                        <UserImageStatus 
                                            profile_photo={this.props.topicDetails.fields.tag_photo}
                                            defaultVal={TagImg}
                                            writeAccess={this.getWriteAccess}
                                            submitProfilePicture={this.props.submitProfilePicture}
                                            imageUploadProgress={this.props.imageUploadProgress}
                                            imageUploadReset={this.props.imageUploadReset}
                                        />
                                        <div className="refier_custom_title_white">
                                            {topic}
                                        </div>
                                        <div>
                                            <div className="refier_custom_desc_white"
                                                style={{ "textAlign": "center", margin: "10px" }}>
                                                <span>
                                                    {this.props.topicDetails.fields.description}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '25px', marginTop: "20px" }}>
                        {
                            this.props.isFollowing && this.props.isFollowing.isUserFollowing 
                                ? <NonPriorityWhiteButton 
                                    onButtonClick={this.props.followTopic}
                                    buttonText="Following"
                                    isBlock={true}
                                /> 
                                : <ComplementaryButton 
                                    onButtonClick={this.props.followTopic}
                                    buttonText="Follow"
                                    isBlock={true}
                                />
                        }
                    </div>
                </div>

                <div style={{padding: '15px', marginTop: '15px'}}>
                    <Row className="refier_custom_panel_window refier_custom_panel_light_gray"
                        style={{ "marginTop": "0px", "padding": "0" }}>
                        <Col xs={6} 
                            className={this.state.showMentors ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                "custom-tab-icon-light custom-tab-height70-padding10"
                            }
                            onClick={this.onClickMentors}>
                            <div>
                                <FontAwesome
                                    name="user-secret"
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                Our Mentors
                            </div>
                        </Col>
                        <Col xs={6} 
                            className={this.state.showCommunities ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                "custom-tab-icon-light custom-tab-height70-padding10"
                            }
                            onClick={this.onClickCommunities}>
                            <div>
                                <FontAwesome
                                    name="users"
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                Communities
                            </div>
                        </Col>
                    </Row>
                    <Row className="refier-card-style" style={{ padding: "10px 20px" }}>
                        {this.state.showMentors?
                            <MentorListForTopic {...this.props} /> :
                            this.state.showCommunities ?
                                <CommunityListForTopic {...this.props} /> :
                                null
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default TopicHeader;
