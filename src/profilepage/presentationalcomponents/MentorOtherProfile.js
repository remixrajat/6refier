import React from 'react'
import { Col, Grid, Row } from 'react-bootstrap'
import CommonCardController from '../conditionalcomponents/CommonCardController';
import OtherProfilePageSideBar from './OtherProfilePageSideBar'
import FontAwesome from 'react-fontawesome';
import ProffessionalCardController from '../conditionalcomponents/ProffessiionalCardController';
import DescriptionBox from './DescriptionBox'
import DescriptionBoxController from '../conditionalcomponents/DescriptionBoxController'

export default class MentorOtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAchievements: true,
            isSkillsHave: false,
            isSkillsLearn: false,
            isInterests: false,
            isGoals: false,
            isEducation: false,
            isProfession: false
        };

        this.showAchievements = this.showAchievements.bind(this)
        this.showSkillsHave = this.showSkillsHave.bind(this)
        this.showSkillsLearn = this.showSkillsLearn.bind(this)
        this.showInterests = this.showInterests.bind(this)
        this.showGoals = this.showGoals.bind(this)
        this.showEducation = this.showEducation.bind(this)
        this.showProfession = this.showProfession.bind(this)
    }

    showAchievements() {
        this.setState({
            isAchievements: true, isSkillsHave: false, isSkillsLearn: false,
            isInterests: false, isGoals: false, isEducation: false, isProfession: false
        })
    }

    showSkillsHave() {
        this.setState({
            isAchievements: false, isSkillsHave: true, isSkillsLearn: false,
            isInterests: false, isGoals: false, isEducation: false, isProfession: false
        })
    }

    showSkillsLearn() {
        this.setState({
            isAchievements: false, isSkillsHave: false, isSkillsLearn: true,
            isInterests: false, isGoals: false, isEducation: false, isProfession: false
        })
    }

    showInterests() {
        this.setState({
            isAchievements: false, isSkillsHave: false, isSkillsLearn: false,
            isInterests: true, isGoals: false, isEducation: false, isProfession: false
        })
    }

    showGoals() {
        this.setState({
            isAchievements: false, isSkillsHave: false, isSkillsLearn: false,
            isInterests: false, isGoals: true, isEducation: false, isProfession: false
        })
    }

    showEducation() {
        this.setState({
            isAchievements: false, isSkillsHave: false, isSkillsLearn: false,
            isInterests: false, isGoals: false, isEducation: true, isProfession: false
        })
    }

    showProfession() {
        this.setState({
            isAchievements: false, isSkillsHave: false, isSkillsLearn: false,
            isInterests: false, isGoals: false, isEducation: false, isProfession: true
        })
    }


    render() {
        // console.log("Other User Profile :: ",this.props)
        let userData = JSON.parse(this.props.userProfileData.profile)[0]

        let body = <div>
            <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12}>
                <DescriptionBoxController {...this.props} />
            </Col>
            <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12}>
                <OtherProfilePageSideBar {...this.props} />
            </Col>
            <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12} 
                    style={{ marginBottom: "40px", padding: "0px 40px" }}>
                <Row className="refier_custom_panel_light_gray" style={{"padding": "0"}}>
                    {/* <div> */}
                    <Col xsOffset={0} xs={4} smOffset={0} sm={4} style={{ padding: "0px 0px", textAlign: "center" }}>
                        <div  className={this.state.isAchievements ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                "custom-tab-icon-light custom-tab-height70-padding10"}
                        // className="refier_custom_panel_light_gray"
                            onClick={this.showAchievements}
                            style={{ cursor: "pointer" }}>
                            <div>
                                <FontAwesome
                                    name="trophy"
                                    
                                />
                            </div>
                            <div style={{fontSize:"0.65em"}}>
                                Achievements
                            </div>
                        </div>
                    </Col>

                    <Col xs={4} style={{ padding: "0px 0px", textAlign: "center" }}>
                        <div className={this.state.isInterests ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" :
                                 "custom-tab-icon-light custom-tab-height70-padding10"}
                        // className="refier_custom_panel_light_gray"
                            style={{
                                /* marginTop: "0px", */
                                cursor: "pointer"
                            }}
                            onClick={this.showInterests}>
                            <div >
                                <FontAwesome
                                    name="star-o"
                                    
                                />
                            </div>
                            
                            <div style={{fontSize:"0.65em"}}>
                                Expertise
                            </div>
                        </div>
                    </Col>

                    <Col xs={4} sm={4} style={{ padding: "0px 0px", textAlign: "center" }}>
                        <div className={this.state.isEducation ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" :
                                "custom-tab-icon-light custom-tab-height70-padding10"}
                        // className="refier_custom_panel_light_gray"
                            style={{
                                /* marginTop: "0px", */
                                cursor: "pointer"
                            }}
                            onClick={this.showEducation}>
                            <div >
                                <FontAwesome
                                    name="graduation-cap"
                                    
                                />
                            </div>
                            
                            <div style={{fontSize:"0.65em"}}>
                                Academics
                            </div>
                        </div>
                    </Col>
                </Row>
                <Col xsOffset={0} xs={12} smOffset={1} sm={10} 
                    style={{ "padding": "0px 0px", "minHeight":"40vh"}}>
                    {/* <div style={{"marginTop":"10px"}}> */}
                    {this.state.isAchievements ?
                        <CommonCardController userProfileData={this.props.achievments}
                            writeAccess={this.props.writeAccess} name="Achievements"
                            objectPropName="achievments"
                            iconName="trophy"
                            className="refier_custom_panel_light_gray" />
                        :
                        this.state.isSkillsHave ?
                            <CommonCardController userProfileData={this.props.skills}
                                writeAccess={this.props.writeAccess} name="Skills I have"
                                objectPropName="skills"
                                iconName="hand-peace-o"
                                className="refier_custom_panel_light_gray" />
                            :
                            this.state.isSkillsLearn ?
                                <CommonCardController userProfileData={this.props.skills}
                                    writeAccess={this.props.writeAccess} name="Skills I want to learn"
                                    objectPropName="skills"
                                    iconName="star"
                                    className="refier_custom_panel_light_gray" />
                                :
                                this.state.isInterests ?
                                    <CommonCardController userProfileData={this.props.hobbies}
                                        writeAccess={this.props.writeAccess} name="Expertise"
                                        objectPropName="hobbies"
                                        iconName="star-o"
                                        className="refier_custom_panel_light_gray" />
                                    :
                                    this.state.isGoals ?
                                        <CommonCardController userProfileData={this.props.goals}
                                            writeAccess={this.props.writeAccess} name="Goals"
                                            objectPropName="goals"
                                            iconName="bullseye"
                                            className="refier_custom_panel_light_gray" />
                                        :
                                        this.state.isEducation ?
                                            <CommonCardController userProfileData={this.props.education}
                                                writeAccess={this.props.writeAccess} name="Educational Details"
                                                objectPropName="education"
                                                iconName="graduation-cap"
                                                className="refier_custom_panel_light_gray" />
                                            :
                                            this.state.isProfession ?
                                                <ProffessionalCardController userProfileData={this.props.professional}
                                                    writeAccess={this.props.writeAccess} name="Professional Details"
                                                    objectPropName="professional"
                                                    iconName="building-o"
                                                    className="refier_custom_panel_light_gray" />
                                                :
                                                null
                    }
                </Col>
                {/* </div> */}
            </Col>
        </div>


        return (
            <div>
                {this.props.isSmallScreen ?
                    <Grid fluid
                    >
                        {body}
                    </Grid>
                    :
                    <Grid fluid
                        style={{ "marginRight": "0px" }}
                    >
                        {body}
                    </Grid>}
            </div>

        )
    }
}