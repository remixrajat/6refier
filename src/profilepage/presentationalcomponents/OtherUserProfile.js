import React from 'react'
import { Col, Grid } from 'react-bootstrap'
import CommonCardController from '../conditionalcomponents/CommonCardController';
import OtherProfilePageSideBar from './OtherProfilePageSideBar'
import FontAwesome from 'react-fontawesome';
import ProffessionalCardController from '../conditionalcomponents/ProffessiionalCardController';
import DescriptionBox from './DescriptionBox'
import DescriptionBoxController from '../conditionalcomponents/DescriptionBoxController'

export default class OtherUserProfile extends React.Component {
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
        // console.log("Other User Profile :: this.props.userProfileData",this.props.userProfileData)
        let userData = JSON.parse(this.props.userProfileData.profile)[0]

        let body = <div>
            <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12}>
                <DescriptionBoxController {...this.props} />
            </Col>
            <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12}>
                <OtherProfilePageSideBar {...this.props} />
            </Col>
            <Col xsOffset={0} xs={12} smOffset={1} sm={10} mdOffset={0} lgOffset={0} md={12} 
                    style={{ marginBottom: "40px", padding: "0 25px" }}>
                <Col xs={12}  className="refier_custom_panel_light_gray" style={{"padding": "0"}}>
                    {/* <div> */}
                    <Col xsOffset={0} xs={2} style={{ padding: "0px 0px", textAlign: "center" }}>
                        <div className={this.state.isAchievements ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                "custom-tab-icon-light custom-tab-height70-padding10"}
                            onClick={this.showAchievements}
                            style={{ cursor: "pointer" }}>
                            <div>
                                <FontAwesome
                                    name="trophy"
                                    
                                />
                            </div>
                            {this.props.isSmallScreen?null:<div style={{fontSize:"0.65em"}}>
                                Achievements
                            </div>}
                        </div>
                    </Col>

                    <Col xs={2} style={{ padding: "0px 0px", textAlign: "center" }}>
                        <div className={this.state.isSkillsHave ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" :
                                 "custom-tab-icon-light custom-tab-height70-padding10"}
                            style={{
                                /* marginTop: "0px", */
                                cursor: "pointer"
                            }}
                            onClick={this.showSkillsHave}>
                            <div>
                                <FontAwesome
                                    name="hand-peace-o"
                                    
                                />
                            </div>
                            {this.props.isSmallScreen?null:<div style={{fontSize:"0.65em"}}>
                                Skills
                            </div>}
                        </div>
                    </Col>
                    {/* <div className="refier_custom_panel_title_purple_pink"
                style={{ marginTop: "0px",cursor: "pointer" }}
                onClick={this.showSkillsLearn}>
                <span>
                    <FontAwesome
                        name="star"
                        
                    />
                </span>
            </div> */}

                    <Col xs={2} style={{ padding: "0px 0px", textAlign: "center" }}>
                        <div className={this.state.isInterests ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                "custom-tab-icon-light custom-tab-height70-padding10"}
                            style={{
                                /* marginTop: "0px", */
                                cursor: "pointer"
                            }}
                            onClick={this.showInterests}>
                            <div>
                                <FontAwesome
                                    name="smile-o"
                                    
                                />
                            </div>
                            {this.props.isSmallScreen?null:<div style={{fontSize:"0.65em"}}>
                                Interests
                            </div>}
                        </div>
                    </Col>

                    <Col xs={2} style={{ padding: "0px 0px", textAlign: "center" }}>
                        <div className={this.state.isGoals ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                "custom-tab-icon-light custom-tab-height70-padding10"}
                            style={{
                                /* marginTop: "0px", */
                                cursor: "pointer"
                            }}
                            onClick={this.showGoals}>
                            <div>
                                <FontAwesome
                                    name="bullseye"
                                    
                                />
                            </div>
                            {this.props.isSmallScreen?null:<div style={{fontSize:"0.65em"}}>
                                Goals
                            </div>}
                        </div>
                    </Col>

                    <Col xs={2} style={{ padding: "0px 0px", textAlign: "center" }}>
                        <div className={this.state.isEducation ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                "custom-tab-icon-light custom-tab-height70-padding10"}
                            style={{
                                /* marginTop: "0px", */
                                cursor: "pointer"
                            }}
                            onClick={this.showEducation}>
                            <div>
                                <FontAwesome
                                    name="graduation-cap"
                                    
                                />
                            </div>
                            {this.props.isSmallScreen?null:<div style={{fontSize:"0.65em"}}>
                                Education
                            </div>}
                        </div>
                    </Col>

                    <Col xs={2} style={{ padding: "0px 0px", textAlign: "center" }}>
                        <div className={this.state.isProfession ?
                                "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                "custom-tab-icon-light custom-tab-height70-padding10"}
                            style={{
                                /* marginTop: "0px", */
                                cursor: "pointer"
                            }}
                            onClick={this.showProfession}>
                            <div>
                                <FontAwesome
                                    name="building-o"
                                    
                                />
                            </div>
                            {this.props.isSmallScreen?null:<div style={{fontSize:"0.65em"}}>
                                Profession
                            </div>}
                        </div>
                    </Col>
                    {/* </div> */}
                </Col>
                <Col  xsOffset={0} xs={12} smOffset={1} sm={10}
                style={{ "padding": "0px 0px", "minHeight":"40vh"}}>
                    {/* <div style={{"marginTop":"10px"}}> */}
                    {this.state.isAchievements ?
                        <CommonCardController userProfileData={this.props.achievments}
                            writeAccess={this.props.writeAccess} name="Achievements"
                            objectPropName="achievments"
                            iconName="trophy"
                            className="refier_custom_panel_light_gray"/>
                        :
                        this.state.isSkillsHave ?
                            <CommonCardController userProfileData={this.props.skills}
                                writeAccess={this.props.writeAccess} name="Skills I have"
                                objectPropName="skills"
                                iconName="hand-peace-o"
                                className="refier_custom_panel_light_gray"/>
                            :
                            this.state.isSkillsLearn ?
                                <CommonCardController userProfileData={this.props.skills}
                                    writeAccess={this.props.writeAccess} name="Skills I want to learn"
                                    objectPropName="skills"
                                    iconName="star"
                                    className="refier_custom_panel_light_gray"/>
                                :
                                this.state.isInterests ?
                                    <CommonCardController userProfileData={this.props.hobbies}
                                        writeAccess={this.props.writeAccess} name="Interests"
                                        objectPropName="hobbies"
                                        iconName="smile-o"
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