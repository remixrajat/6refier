import React from 'react'
import { Col, Grid, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import CommonCardController from '../conditionalcomponents/CommonCardController';
import ProfilePageSideBar from './ProfilePageSideBar'
import MyQuestionController from '../conditionalcomponents/MyQuestionsController'
import MyBlogsController from '../conditionalcomponents/MyBlogsController'
import DescriptionBoxController from '../conditionalcomponents/DescriptionBoxController'


export default class MentorSelfProfile extends React.Component {
    render() {
        // console.log("MentorSelfProfile:: ", this.props)

        let userData = JSON.parse(this.props.userProfileData.profile)[0]

        let body = this.props.isSmallScreen ?
            <Col xs={12}>
                <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12}  
                    style={{ marginTop: "10px" }}>
                    <DescriptionBoxController {...this.props} />
                </Col>

                <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12} 
                    style={{ marginTop: "10px" }}>
                    <ProfilePageSideBar {...this.props} />
                </Col>

                <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12}>
                    <div>
                        <div className="refier_custom_panel_light_gray">
                            <span> <FontAwesome
                                name="question-circle-o"
                            /> </span>
                            <span style={{ marginLeft: "20px" }}
                            > Questions Asked</span>
                        </div>
                        <div className="refier-card-style"
                            style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                            <Grid fluid>
                                <MyQuestionController {...this.props} />
                            </Grid>
                        </div>
                    </div>
                </Col>

                <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12}>
                    <div>
                        <div className="refier_custom_panel_light_gray">
                            <span> <FontAwesome
                                name="pencil-square-o"
                            /> </span>
                            <span style={{ marginLeft: "20px" }}
                            >My Blogs</span>
                        </div>
                        <div className="refier-card-style"
                            style={{ "maxHeight": "40vh", "overflow": "auto" }}>
                            <Grid fluid>
                                <MyBlogsController {...this.props} />
                            </Grid>
                        </div>
                    </div>
                </Col>
                    
                <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12}>
                    <div>
                        <div className="refier_custom_panel_light_gray">
                            <span> <FontAwesome
                                name="calendar-o"
                                
                            /> </span>
                            <span style={{ marginLeft: "20px" }}
                            >Days for Interaction</span>
                        </div>
                        <div className="refier-card-style"
                            style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                            <Grid fluid>
                                <div className="custom-list-content">Monday to Sunday</div>
                            </Grid>
                        </div>
                    </div>
                </Col>

                <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12}>
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
                            </Grid>
                        </div>
                    </div>
                </Col>

                <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12} 
                    style={{ marginTop: "10px" }}>
                    
                    <CommonCardController userProfileData={this.props.achievments}
                        writeAccess={this.props.writeAccess} name="Achievements" objectPropName="achievments"
                        iconName="trophy" className="refier_custom_panel_light_gray" />

                    <CommonCardController userProfileData={this.props.hobbies} profileTags={""}
                        writeAccess={this.props.writeAccess} name="Expertise" objectPropName="hobbies"
                        profileTags={this.props.userProfileTags ? this.props.userProfileTags.hobbies : ""} 
                        isTag={true} iconName="smile-o" className="refier_custom_panel_light_gray" />

                    <CommonCardController userProfileData={this.props.education}
                        writeAccess={this.props.writeAccess} name="Educational Details" objectPropName="education"
                        iconName="graduation-cap" className="refier_custom_panel_light_gray" />

                </Col>
            </Col>
            :
            <div>
                <Col md={7} lg={8}>
                    <div>
                        <DescriptionBoxController {...this.props} />
                    </div>
                    <Row>
                        <Col md={12} lg={6}>
                            <div>
                                <div className="refier_custom_panel_light_gray">
                                    <span> <FontAwesome
                                        name="question-circle-o"
                                        
                                    /> </span>
                                    <span style={{ marginLeft: "20px" }}
                                    >Questions Asked</span>
                                </div>
                                <div className="refier-card-style"
                                    style={{ "maxHeight": "40vh", "overflow": "auto" }}>
                                    <Grid fluid>
                                        <MyQuestionController {...this.props} />
                                    </Grid>
                                </div>
                            </div>
                        </Col>

                        <Col md={12} lg={6}>
                            <div>
                                <div className="refier_custom_panel_light_gray">
                                    <span> <FontAwesome
                                        name="pencil-square-o"
                                        
                                    /> </span>
                                    <span style={{ marginLeft: "20px" }}
                                    >My Blogs</span>
                                </div>
                                <div className="refier-card-style"
                                    style={{ "maxHeight": "40vh", "overflow": "auto" }}>
                                    <Grid fluid>
                                        <MyBlogsController {...this.props} />
                                    </Grid>
                                </div>
                            </div>
                        </Col>

                        <Col md={12} lg={6}>
                            <div>
                                <div className="refier_custom_panel_light_gray">
                                    <span> <FontAwesome
                                        name="calendar-o"
                                        
                                    /> </span>
                                    <span style={{ marginLeft: "20px" }}
                                    >Days for Interaction</span>
                                </div>
                                <div className="refier-card-style"
                                    style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                                    <Grid fluid>
                                        <div className="custom-list-content">Monday to Sunday</div>
                                    </Grid>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} lg={6}>
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
                                    </Grid>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <CommonCardController userProfileData={this.props.achievments}
                        writeAccess={this.props.writeAccess} name="Achievements" 
                        objectPropName="achievments" iconName="trophy" 
                        className="refier_custom_panel_light_gray" 
                    />

                    <CommonCardController userProfileData={this.props.hobbies}
                        writeAccess={this.props.writeAccess} name="Expertise" objectPropName="hobbies"
                        profileTags={this.props.userProfileTags ? this.props.userProfileTags.hobbies : ""} 
                        isTag={true} iconName="star-o" 
                        className="refier_custom_panel_light_gray"
                    />

                    <CommonCardController userProfileData={this.props.education}
                        writeAccess={this.props.writeAccess} name="Educational Details" 
                        objectPropName="education" iconName="graduation-cap" 
                        className="refier_custom_panel_light_gray"
                    />
                </Col>

                <Col md={5} lg={4}>
                    <ProfilePageSideBar {...this.props} />
                </Col>
            </div>




        return (
            <div>
                {this.props.isSmallScreen ?
                    <Grid fluid>
                        {body}
                    </Grid>
                    :
                    <Grid fluid>
                        {body}
                    </Grid>}
            </div>
        )
    }
}