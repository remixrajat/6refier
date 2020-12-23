import React, { Component } from 'react'
import { Grid, Col, Row, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import BlogForTopicList from './BlogForTopicList'
import QuestionListForTopic from './QuestionsListForTopic'
import CalendarEventListForTopic from './CalendarEventListForTopic'
import MentorListForTopic from './MentorListForTopic'
import CommunityListForTopic from './CommunityListForTopic'
import TestListForTopic from './TestListForTopic'
import ContentPageController from '../../recordedContents/conditionalcomponents/ContentPageController'
import TopicHeaderController from '../conditionalcomponents/TopicHeaderController';

import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';
import { NonPriorityWhiteButton } from '../../shared/RefierComponents/NonPriorityWhiteButton';
import { isLgDevice } from '../../GlobalConstants';


export default class TopicPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showBlogs: false,
            showQuestions: false,
            showSessions: false,
            showMentors: true,
            showCommunities: false,
            showTests: false,
            showContent: true,
            isLargeScreen: isLgDevice()
        }

        this.onClickBlogs = this.onClickBlogs.bind(this)
        this.onClickCommunities = this.onClickCommunities.bind(this)
        this.onClickContent = this.onClickContent.bind(this)
        this.onClickMentors = this.onClickMentors.bind(this)
        this.onClickQuestions = this.onClickQuestions.bind(this)
        this.onClickSessions = this.onClickSessions.bind(this)
        this.onClickTests = this.onClickTests.bind(this)
    }

    componentWillMount () {
        window.addEventListener("resize", this.isLgScreen.bind(this));
    }
    
    isLgScreen(){
        this.setState({isLargeScreen: isLgDevice()})
    }

    onClickBlogs() {
        this.setState({
            showBlogs: true, showQuestions: false, showSessions: false, showTests: false, showContent: false
        })
    }

    onClickQuestions() {
        this.setState({
            showBlogs: false, showQuestions: true, showSessions: false, showTests: false, showContent: false
        })
    }

    onClickSessions() {
        this.setState({
            showBlogs: false, showQuestions: false, showSessions: true, showTests: false, showContent: false
        })
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

    onClickTests() {
        this.setState({showBlogs: false, showQuestions: false, 
            showSessions: false,
            showTests: true, showContent: false
        })
    }

    onClickContent() {
        this.setState({showBlogs: false, showQuestions: false, 
            showSessions: false, showTests: false, showContent: true
        })
    }

    render() {
        // console.log("TopicPage", this.props.topicDetails)

        let topic = this.props.topicDetails ? this.props.topicDetails.length > 0 ?
             this.props.topicDetails[0].fields.tag_name : "" : ""
        let desc = this.props.topicDetails ? this.props.topicDetails.length > 0 ? 
            this.props.topicDetails[0].fields.description : "" : ""

        return (
            this.state.isLargeScreen ?
            <Grid fluid>
                <Col md={3}>
                    <TopicHeaderController {...this.props} />
                </Col>
                <Col md={9} style={{marginTop: '5px'}}>
                    <Navbar fluid className="custom-navbar" collapseOnSelect>
                        <Nav className="text">
                            <li onClick={this.onClickContent}>
                                <NavLink to='#' className={this.state.showContent ? 'active' : {}}>
                                    <div style={{padding: "5px 10px"}}>
                                        <FontAwesome
                                            name="play-circle"
                                            style={{"display": "inline-block"}}
                                        />
                                        <span style={{"display": "inline-block", "marginLeft":"10px"}}>
                                            {"Expert Videos" + (this.props.topicDetails ? (" on " + topic) : "")}
                                        </span>
                                    </div>
                                </NavLink>
                            </li>
                            <li onClick={this.onClickTests}>
                                <NavLink to='#' className={this.state.showTests ? 'active' : {}}>
                                    <div style={{padding: "5px 10px"}}>
                                        <FontAwesome
                                            name="line-chart"
                                            style={{"display": "inline-block"}}
                                        />
                                        <span style={{display: "inline-block", marginLeft: "10px"}}>
                                            {"Tests" + (this.props.topicDetails ? (" on " + topic) : "")}
                                        </span>
                                    </div>							
                                </NavLink>
                            </li>
                            <li onClick={this.onClickSessions}>
                                <NavLink to='#' className={this.state.showSessions ? 'active' : {}}>
                                    <div style={{padding: "5px 10px"}}>
                                        <FontAwesome
                                            name="line-chart"
                                            style={{"display": "inline-block"}}
                                        />
                                        <span style={{display: "inline-block", marginLeft: "10px"}}>
                                            {"Sessions" + (this.props.topicDetails ? (" on " + topic) : "")}
                                        </span>
                                    </div>							
                                </NavLink>
                            </li>
                            <li onClick={this.onClickBlogs}>
                                <NavLink to='#' className={this.state.showBlogs ? 'active' : {}}>
                                    <div style={{padding: "5px 10px"}}>
                                        <FontAwesome
                                            name="line-chart"
                                            style={{"display": "inline-block"}}
                                        />
                                        <span style={{display: "inline-block", marginLeft: "10px"}}>
                                            {"Blogs" + (this.props.topicDetails ? (" on " + topic) : "")}
                                        </span>
                                    </div>							
                                </NavLink>
                            </li>
                            <li onClick={this.onClickQuestions}>
                                <NavLink to='#' className={this.state.showQuestions ? 'active' : {}}>
                                    <div style={{padding: "5px 10px"}}>
                                        <FontAwesome
                                            name="line-chart"
                                            style={{"display": "inline-block"}}
                                        />
                                        <span style={{display: "inline-block", marginLeft: "10px"}}>
                                            {"Questions" + (this.props.topicDetails ? (" on " + topic) : "")}
                                        </span>
                                    </div>							
                                </NavLink>
                            </li>
                        </Nav>
                    </Navbar>

                    <Grid fluid style={{marginTop: '50px', paddingLeft: '50px'}}>
                        <Col md={10} mdOffset={1}>
                            {this.state.showContent ?
                                <ContentPageController fromOtherPage={true}
                                    contentListFromOtherPage={this.props.contentListOfTopic} />
                                :
                                this.state.showTests ?
                                    <TestListForTopic {...this.props} />
                                    :
                                    this.state.showSessions ?
                                        <CalendarEventListForTopic {...this.props} />
                                        :
                                        this.state.showBlogs ?
                                            <BlogForTopicList {...this.props} />
                                            :
                                            this.state.showQuestions?
                                                <QuestionListForTopic {...this.props} />
                                                :
                                                null
                            }
                        </Col>
                    </Grid>
                </Col>
            </Grid> :

            <Grid fluid style={{ margin: "20px 30px" }}>
                <Row className="refier-card-style">
                    <Col xs={12} md={10}>
                        <div style={{ padding: "10px 20px" }}>
                            <div className="custom-topic-title">
                                {topic}
                            </div>
                            <div className="custom-list-content" style={{ marginTop: "20px" }}>
                                {desc}
                            </div>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div style={{"position": "relative", "top": "10px"}}>
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
                    </Col>
                </Row>

                <Col xs={12} md={8} style={{padding:"20px 20px"}}>
                    <Row className="refier_custom_panel_title_blue">
                        <Col xs={3} className={this.state.showContent ?
                            "custom-tab-icon-active-dark" : "custom-tab-icon-dark"}
                            onClick={this.onClickContent}>
                            <div>
                                <FontAwesome
                                    name="play-circle"
                                    
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                {"Expert Videos" + (this.props.topicDetails ? (" on " + topic) : "")}
                            </div>
                        </Col>
                        <Col xs={3} className={this.state.showTests ?
                            "custom-tab-icon-active-dark" : "custom-tab-icon-dark"}
                            onClick={this.onClickTests}>
                            <div>
                                <FontAwesome
                                    name="line-chart"
                                    
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                {"Tests" + (this.props.topicDetails ? (" on " + topic) : "")}
                            </div>
                        </Col>
                        <Col xs={2} className={this.state.showSessions ?
                            "custom-tab-icon-active-dark" : "custom-tab-icon-dark"}
                            onClick={this.onClickSessions}>
                            <div>
                                <FontAwesome
                                    name="calendar-check-o"
                                    
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                {"Sessions" + (this.props.topicDetails ? (" on " + topic) : "")}
                            </div>
                        </Col>
                        <Col xs={2} className={this.state.showBlogs ?
                            "custom-tab-icon-active-dark" : "custom-tab-icon-dark"}
                            onClick={this.onClickBlogs}>
                            <div>
                                <FontAwesome
                                    name="pencil-square-o"
                                    
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                {"Blogs" + (this.props.topicDetails ? (" on " + topic) : "")}
                            </div>
                        </Col>
                        <Col xs={2} className={this.state.showQuestions ?
                            "custom-tab-icon-active-dark" : "custom-tab-icon-dark"}
                            onClick={this.onClickQuestions}>
                            <div>
                                <FontAwesome
                                    name="comments-o"
                                    
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                {"Questions" + (this.props.topicDetails ? (" on " + topic) : "")}
                            </div>
                        </Col>
                    </Row>
                    <Row className="refier-card-style" style={{ padding: "10px 20px" }}>
                        <div
                        // style={{ maxHeight: "70vh", overflow: "auto" }}
                        >
                            {this.state.showContent ?
                                <ContentPageController fromOtherPage={true}
                                    contentListFromOtherPage={this.props.contentListOfTopic} />
                                :
                                this.state.showTests ?
                                    <TestListForTopic {...this.props} />
                                    :
                                    this.state.showSessions ?
                                        <CalendarEventListForTopic {...this.props} />
                                        :
                                        this.state.showBlogs ?
                                            <BlogForTopicList {...this.props} />
                                            :
                                            this.state.showQuestions?
                                                <QuestionListForTopic {...this.props} />
                                                :
                                                null
                            }
                        </div>
                    </Row>
                </Col>

                <Col xs={12} md={4} style={{padding:"20px 20px"}}>
                    <Row className="refier_custom_panel_title_blue">
                        <Col xs={6} className={this.state.showMentors ?
                            "custom-tab-icon-active-dark" : "custom-tab-icon-dark"}
                            onClick={this.onClickMentors}>
                            <div>
                                <FontAwesome
                                    name="user-secret"
                                    
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                {"Our Mentors" + (this.props.topicDetails ? (" on " + topic) : "")}
                            </div>
                        </Col>
                        <Col xs={6} className={this.state.showCommunities ?
                            "custom-tab-icon-active-dark" : "custom-tab-icon-dark"}
                            onClick={this.onClickCommunities}>
                            <div>
                                <FontAwesome
                                    name="users"
                                    
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                {"Communities" + (this.props.topicDetails ? (" on " + topic) : "")}
                            </div>
                        </Col>
                    </Row>
                    <Row className="refier-card-style" style={{ padding: "10px 20px" }}
                    // style={{ maxHeight: "70vh", overflow: "auto" }}
                    >
                        {this.state.showMentors?
                        <MentorListForTopic {...this.props} />
                        :
                            this.state.showCommunities?
                        <CommunityListForTopic {...this.props} />
                        :
                        null
                    }
                    </Row>
                </Col>
            </Grid>
        )
    }
}