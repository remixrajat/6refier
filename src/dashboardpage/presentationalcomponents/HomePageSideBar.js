import React from 'react'
import FontAwesome from 'react-fontawesome';
import { Col, Row } from 'react-bootstrap';

import CommunityListController from '../conditionalcomponents/CommunityRightListController'
import MentorRightListController from '../conditionalcomponents/MentorRightListController';
import TopicList from './TopicList';
import MyCommunityList from './MyCommunityList'


export default class HomePageSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCommunityList: false,
            isMentorList: false,
            isTopicsList: true,
        };
        this.showCommunityList = this.showCommunityList.bind(this)
        this.showMentorList = this.showMentorList.bind(this)
        this.showTopicsList = this.showTopicsList.bind(this)
    }

    showCommunityList() {
        this.setState({ isCommunityList: true, isMentorList: false, isTopicsList: false })
    }

    showMentorList() {
        this.setState({ isCommunityList: false, isMentorList: true, isTopicsList: false })
    }

    showTopicsList(){
        this.setState({isTopicsList: true, isMentorList: false, isCommunityList:false})
    }

    render() {
        // console.log("HomePageSideBar:props", this.props)
        
        let forLearner = (<div>
            <Row className="refier_custom_panel_window refier_custom_panel_light_gray"
                style={{ "marginTop": "0px", "padding": "0" }}>
                <Col xs={6} className={this.state.isTopicsList ?
                                        "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                        "custom-tab-icon-light custom-tab-height70-padding10"}
                    onClick={this.showTopicsList}>
                    <div>
                    <FontAwesome
                        name="tags"
                    />
                    </div>
                    <div style={{fontSize:"0.65em"}}>
                        Our Topics
                    </div>
                </Col>
                {/* <Col xs={4} className={this.state.isMentorList ?
                                        "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                        "custom-tab-icon-light custom-tab-height70-padding10"}
                    onClick={this.showMentorList}>
                    <div>
                    <FontAwesome
                        name="user-secret"
                    />
                    </div>
                    <div style={{fontSize:"0.65em"}}>
                        Our Mentors
                    </div>
                </Col> */}
                <Col xs={6} className={this.state.isCommunityList ?
                                        "custom-tab-icon-active-light custom-tab-height70-padding10" : 
                                        "custom-tab-icon-light custom-tab-height70-padding10"}
                    onClick={this.showCommunityList}>
                    <div>
                    <FontAwesome
                        name="users"
                    />
                    </div>
                    <div style={{fontSize:"0.65em"}}>
                        Our Communities
                    </div>
                </Col>
        </Row>
        <Row className="refier-card-style" style={{ maxHeight: "70vh", overflow: "auto", padding:"5px 0px", }}>
            {
                this.state.isTopicsList ?
                    <Col xs={12}>
                        <TopicList 
                            dispatch={this.props.dispatch}
                            topics={this.props.tags_list} 
                            userId={this.props.userId} 
                            displayStyle="list" /> 
                    </Col>
                    :
                    this.state.isMentorList ?
                        <Col xs={12}>
                            <MentorRightListController userId={this.props.userId}/>
                        </Col>
                        :
                        this.state.isCommunityList ?
                            <Col xs={12}>
                                <CommunityListController userId={this.props.userId}/>
                            </Col>
                            :
                            null
            }
        </Row></div>)
        
        // let forOwner = 
        //     <div style={{marginTop:"20px", position: 'fixed', width: '20%'}}>
        //         <MyCommunityList communityDetails={this.props.isOwner}/>
        //             </Row>
        // </div>

        let combinedCommunities = this.props.isOwner.concat(this.props.isInternalTrainer,
            this.props.isExternalTrainer)
        // combinedCommunities = combinedCommunities.concat(this.props.isInternalTrainer)
        // combinedCommunities = combinedCommunities.concat(this.props.isExternalTrainer)
        // console.log("HomePageSideBar :: combinedCommunities : ",combinedCommunities)
        
        let forOwner = 
            <div>
                <div style={{marginTop:"20px", marginLeft:"20px"}}>
                    <MyCommunityList communityDetails={combinedCommunities}/>
                </div>
                {this.props.isLearner.length == 0 && !this.props.is_mentor?
                    <div style={{ marginLeft: "20px", marginBottom:"20px" }}>
                        <Row className="refier_custom_panel_window"
                            style={{ "marginTop": "0px", "padding": "0", backgroundColor: "white" }}>
                            <div
                                style={{
                                    maxHeight: "70vh", overflow: "auto", padding: "5px 0px",
                                }}>
                                <MentorRightListController userId={this.props.userId} />
                            </div>
                        </Row>
                    </div>
                    :
                    null
                }
            </div>
        
        let forRefierExpert = <div>
            <div style={{marginTop:"20px", marginLeft:"20px"}}>
                <MyCommunityList communityDetails={combinedCommunities}/>
                </div>
        </div>

        let forInternalExpert = <div>
        <div style={{marginTop:"20px", marginLeft:"20px"}}>
            <MyCommunityList communityDetails={combinedCommunities}/>
            </div>
    </div>
        


        return (
            <div>
                {this.props.isMentor ?
                    forRefierExpert :
                    this.props.isOwner.length > 0 ?
                        forOwner :
                        this.props.isExternalTrainer.length > 0 ?
                        forRefierExpert :
                        this.props.isInternalTrainer.length > 0 ?
                        forInternalExpert :
                forLearner
                    
            }
            </div>
        )
    }
}