import React from 'react'
import CommunityListController from '../../dashboardpage/conditionalcomponents/CommunityRightListController'
import MentorRightListController from '../../dashboardpage/conditionalcomponents/MentorRightListController';
import MyCommunityListController from '../conditionalcomponents/MyCommunityListController'
import FontAwesome from 'react-fontawesome';
import { Col, Row, Grid } from 'react-bootstrap';
import MyCalendarController from '../conditionalcomponents/MyCalendarController'
import MyBlogsController from '../conditionalcomponents/MyBlogsController'
import MyLikedBlogsController from '../conditionalcomponents/MyLikedBlogsController'
import MyQuestionController from '../conditionalcomponents/MyQuestionsController'
import MyCommentedQuestionsController from '../conditionalcomponents/MyCommentedQuestionsController'

export default class OtherProfilePageSideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let userData = JSON.parse(this.props.userProfileData.profile)[0]
        return (
            <div>

                <div>
                    <Col xs={12} lg={6} style={{ padding: "10px 10px" }}>
                        <div>
                            <div className="refier_custom_panel_light_gray">
                                <span> <FontAwesome
                                    name="pencil-square-o"
                                    
                                /> </span>
                                <span style={{ marginLeft: "20px" }}
                                > {"Blogs of " + userData.fields.first_name}</span>
                            </div>
                            <div className="refier-card-style"
                                style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                                <Grid fluid>
                                    <MyBlogsController {...this.props} />
                                </Grid>
                            </div>
                        </div>

                        <div>
                            <div className="refier_custom_panel_light_gray">
                                <span> <FontAwesome
                                    name="calendar"
                                    
                                /> </span>
                                <span style={{ marginLeft: "20px" }}
                                > {"Upcoming Sessions of " + userData.fields.first_name}</span>
                            </div>
                            <div className="refier-card-style"
                                style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                                <Grid fluid>
                                    <MyCalendarController  {...this.props} />
                                </Grid>
                            </div>
                        </div>
                        {
                            this.props.isMentor ?
                                <div>
                                    <div className="refier_custom_panel_light_gray">
                                        <span> <FontAwesome
                                            name="clock-o"
                                            
                                        /> </span>
                                        <span style={{ marginLeft: "20px" }}
                                        >Preferred Time Slots</span>
                                    </div>
                                    <div className="refier-card-style"
                                        style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                                        <Grid fluid>
                                            <div className="custom-list-content">On Appointment</div>
                                            <div className="custom-list-sub-content-highlighted">Note :</div>
                                            <div className="custom-list-sub-content">
                                            Appointment are fixed between 9 AM to 9 PM on 7 days a week / 365 days a year</div>
                                            <div className="custom-list-sub-content">
                                            Appointment needs to be confirmed 24 hours in advance</div>
                                        </Grid>
                                    </div>
                                </div>
                                :
                                null
                        }
                        {this.props.isMentor ? null :
                            <div>
                                <div className="refier_custom_panel_light_gray">
                                    <span> <FontAwesome
                                        name="comments-o"
                                        
                                    /> </span>
                                    <span style={{ marginLeft: "20px" }}
                                    > {"Questions of " + userData.fields.first_name}</span>
                                </div>
                                <div className="refier-card-style"
                                    style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                                    <Grid fluid>
                                        <MyQuestionController {...this.props} />
                                    </Grid>
                                </div>
                            </div>
                        }
                    </Col>
                    <Col xs={12} lg={6} style={{ padding: "10px 10px" }}>
                        <div>
                            <div className="refier_custom_panel_light_gray">
                                <span> <FontAwesome
                                    name="users"
                                    
                                /> </span>
                                <span style={{ marginLeft: "20px" }}
                                > {"Communities of " + userData.fields.first_name}</span>
                            </div>
                            <div className="refier-card-style"
                                style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                                <Grid fluid>
                                    <MyCommunityListController {...this.props} />
                                </Grid>
                            </div>
                        </div>

                        <div>
                            <div className="refier_custom_panel_light_gray">
                                <span> <FontAwesome
                                    name="question-circle-o"
                                    
                                /> </span>
                                <span style={{ marginLeft: "20px" }}
                                > {userData.fields.first_name + " answered Questions"}</span>
                            </div>
                            <div className="refier-card-style"
                                style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                                <Grid fluid>
                                    <MyCommentedQuestionsController {...this.props} />
                                </Grid>
                            </div>
                        </div>

                        <div>
                            <div className="refier_custom_panel_light_gray">
                                <span> <FontAwesome
                                    name="thumbs-up"
                                    
                                /> </span>
                                <span style={{ marginLeft: "20px" }}
                                > {"Blogs " + userData.fields.first_name + " Liked"}</span>
                            </div>
                            <div className="refier-card-style"
                                style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                                <Grid fluid>
                                    <MyLikedBlogsController {...this.props} />
                                </Grid>
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
        )
    }
}