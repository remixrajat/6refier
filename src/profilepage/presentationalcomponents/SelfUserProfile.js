import React from 'react'
import { Col, Grid } from 'react-bootstrap'
import CommonCardController from '../conditionalcomponents/CommonCardController';
import ProfilePageSideBar from './ProfilePageSideBar'
import ProffessionalCardController from '../conditionalcomponents/ProffessiionalCardController';
import FontAwesome from 'react-fontawesome';
import MyQuestionController from '../conditionalcomponents/MyQuestionsController'
import MyBlogsController from '../conditionalcomponents/MyBlogsController'
import DescriptionBoxController from '../conditionalcomponents/DescriptionBoxController'


export default class SelfUserProfile extends React.Component {
    render() {
        // console.log("Self User Profile: ", this.props);

        let userData = JSON.parse(this.props.userProfileData.profile)[0]

        let body = this.props.isSmallScreen ?
            <Col xs={12}>
            <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12}  style={{ marginTop: "10px" }}>
                <DescriptionBoxController {...this.props} />
            </Col>
                <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12} style={{ marginTop: "10px" }}>
                    <ProfilePageSideBar {...this.props} />
                </Col>
                <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12} style={{ marginTop: "10px" }}>

                    <div>
                        <div className="refier_custom_panel_light_gray">
                            <span> <FontAwesome
                                name="question-circle-o"
                            /> </span>
                            <span style={{ marginLeft: "20px" }}
                            > My Questions</span>
                        </div>
                        <div className="refier-card-style"
                            style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                            <Grid fluid>
                                <MyQuestionController {...this.props} />
                            </Grid>
                        </div>
                    </div>

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

                    <CommonCardController userProfileData={this.props.goals}
                        writeAccess={this.props.writeAccess} name="Goals" objectPropName="goals"
                        iconName="bullseye" className="refier_custom_panel_light_gray" />

                    <CommonCardController userProfileData={this.props.achievments}
                        writeAccess={this.props.writeAccess} name="Achievements" objectPropName="achievments"
                        iconName="trophy" className="refier_custom_panel_light_gray"/>

                    <CommonCardController userProfileData={this.props.hobbies} profileTags={""}
                        writeAccess={this.props.writeAccess} name="Interests" objectPropName="hobbies"
                        profileTags={this.props.userProfileTags ? this.props.userProfileTags.hobbies : ""} isTag={true}
                        iconName="smile-o" className="refier_custom_panel_light_gray"/>



                    <CommonCardController userProfileData={this.props.skills}
                        writeAccess={this.props.writeAccess} name="Skills I have" objectPropName="skills"
                        iconName="hand-peace-o" className="refier_custom_panel_light_gray" />

                    {/* <CommonCardController userProfileData={this.props.skills}
            writeAccess={this.props.writeAccess} name="Skills I want to learn" objectPropName="skills"
            iconName="star" className="refier_custom_panel_title_purple_pink" /> */}

                    <CommonCardController userProfileData={this.props.education}
                        writeAccess={this.props.writeAccess} name="Educational Details" objectPropName="education"
                        iconName="graduation-cap" className="refier_custom_panel_light_gray" />

                    {/* <CommonCardController userProfileData={this.props.professional}
        writeAccess={this.props.writeAccess} name="Professional Details" objectPropName="professional"
        iconName="building-o" /> */}
                    <ProffessionalCardController userProfileData={this.props.professional}
                        writeAccess={this.props.writeAccess} name="Professional Details" objectPropName="professional"
                        iconName="building-o" className="refier_custom_panel_light_gray" />
                </Col>
            </Col>
            :
            <div>
                <Col md={7} lg={8}>
                <div>
                    <DescriptionBoxController {...this.props} />
                </div>
                    <div>
                        <div className="refier_custom_panel_light_gray">
                            <span> <FontAwesome
                                name="question-circle-o"
                                
                            /> </span>
                            <span style={{ marginLeft: "20px" }}
                            > My Questions</span>
                        </div>
                        <div className="refier-card-style"
                            style={{ "maxHeight": "30vh", "overflow": "auto" }}>
                            <Grid fluid>
                                <MyQuestionController {...this.props} />
                            </Grid>
                        </div>
                    </div>

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

                    <CommonCardController userProfileData={this.props.goals}
                        writeAccess={this.props.writeAccess} name="Goals" objectPropName="goals"
                        iconName="bullseye" className="refier_custom_panel_light_gray" />

                    <CommonCardController userProfileData={this.props.achievments}
                        writeAccess={this.props.writeAccess} name="Achievements" objectPropName="achievments"
                        iconName="trophy" className="refier_custom_panel_light_gray" />

                    <CommonCardController userProfileData={this.props.hobbies}
                        writeAccess={this.props.writeAccess} name="Interests" objectPropName="hobbies"
                        profileTags={this.props.userProfileTags ? this.props.userProfileTags.hobbies : ""} isTag={true}
                        iconName="smile-o" className="refier_custom_panel_light_gray" isTag={true} />

                    <CommonCardController userProfileData={this.props.skills}
                        writeAccess={this.props.writeAccess} name="Skills I have" objectPropName="skills"
                        iconName="hand-peace-o" className="refier_custom_panel_light_gray" />

                    {/* <CommonCardController userProfileData={this.props.skills}
                writeAccess={this.props.writeAccess} name="Skills I want to learn" objectPropName="skills"
                iconName="star" className="refier_custom_panel_title_purple_pink" /> */}

                    <CommonCardController userProfileData={this.props.education}
                        writeAccess={this.props.writeAccess} name="Educational Details" objectPropName="education"
                        iconName="graduation-cap" className="refier_custom_panel_light_gray" />

                    {/* <CommonCardController userProfileData={this.props.professional}
            writeAccess={this.props.writeAccess} name="Professional Details" objectPropName="professional"
            iconName="building-o" /> */}
                    <ProffessionalCardController userProfileData={this.props.professional}
                        writeAccess={this.props.writeAccess} name="Professional Details" objectPropName="professional"
                        iconName="building-o" className="refier_custom_panel_light_gray" />
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
                    <Grid fluid 
                    // style={{ maxHeight: "90vh", "overflow": "auto", marginRight: "0px" }}
                    >
                        {body}
                    </Grid>}
            </div>
        )
    }
}