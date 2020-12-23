import React from 'react'
import { Col, Row, Nav, NavItem } from 'react-bootstrap';

import CommunityListController from '../conditionalcomponents/CommunityRightListController'
import MentorRightListController from '../conditionalcomponents/MentorRightListController';
import MyCommunityListController from '../conditionalcomponents/MyCommunityListController';
import UpcomingSessionsList from './UpcomingSessionsList'
import MyCalendarList from './MyCalendarList'
import FontAwesome from 'react-fontawesome';
import TestListForTopic from './TestListForTopic'
import FeedsController from '../conditionalcomponents/FeedsController'
import MyCalendarController from '../../profilepage/conditionalcomponents/MyCalendarController';


export default class HomePageBottomBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isFeeds: true,
            isCommunityList: false,
            isMentorList: false,
            isMyCommunityList: false,
            isMySessionsList: false,
            isUpcomingSessionsList: false,
            isSuggestedTests: false,
        };

        this.showFeeds = this.showFeeds.bind(this)
        this.showCommunityList = this.showCommunityList.bind(this)
        this.showMentorList = this.showMentorList.bind(this)
        this.showMyCommunityList = this.showMyCommunityList.bind(this)
        this.showUpcomingSessionsList = this.showUpcomingSessionsList.bind(this)
        this.showMySessionsList = this.showMySessionsList.bind(this)
        this.showSuggestedTests = this.showSuggestedTests.bind(this)
        this.handleBottomSelect = this.handleBottomSelect.bind(this)
    }

    showFeeds() {
        this.setState({
            isFeeds: true,
            isCommunityList: false,
            isMentorList: false,
            isMyCommunityList: false,
            isMySessionsList: false,
            isUpcomingSessionsList: false,
            isSuggestedTests: false
        })
    }

    showCommunityList() {
        this.setState({
            isFeeds: false,
            isCommunityList: true,
            isMentorList: false,
            isMyCommunityList: false,
            isMySessionsList: false,
            isUpcomingSessionsList: false,
            isSuggestedTests: false
        })
    }

    showMentorList() {
        this.setState({
            isFeeds: false,
            isCommunityList: false,
            isMentorList: true,
            isMyCommunityList: false,
            isMySessionsList: false,
            isUpcomingSessionsList: false,
            isSuggestedTests: false
        })
    }

    showMyCommunityList() {
        this.setState({
            isFeeds: false,
            isCommunityList: false,
            isMentorList: false,
            isMyCommunityList: true,
            isMySessionsList: false,
            isUpcomingSessionsList: false,
            isSuggestedTests: false
        })
    }

    showMySessionsList() {
        this.setState({
            isFeeds: false,
            isCommunityList: false,
            isMentorList: false,
            isMyCommunityList: false,
            isMySessionsList: true,
            isUpcomingSessionsList: false,
            isSuggestedTests: false
        })
    }

    showUpcomingSessionsList() {
        this.setState({
            isFeeds: false,
            isCommunityList: false,
            isMentorList: false,
            isMyCommunityList: false,
            isMySessionsList: false,
            isUpcomingSessionsList: true,
            isSuggestedTests: false
        })
    }

    showSuggestedTests() {
        this.setState({
            isFeeds: false,
            isCommunityList: false,
            isMentorList: false,
            isMyCommunityList: false,
            isMySessionsList: false,
            isUpcomingSessionsList: false,
            isSuggestedTests: true
        })
    }

    handleBottomSelect(selectedKey) {
        // console.log("handleBottomSelect::selectedKey",selectedKey)
        if(selectedKey === 1){
            this.showFeeds()
        }
        else if(selectedKey === 2){
            this.showMentorList()
        }
        else if(selectedKey === 3){
            this.showCommunityList()
        }
        else if(selectedKey === 4){
            this.showMyCommunityList()
        }
        else if(selectedKey === 5){
            this.showUpcomingSessionsList()
        }
        else if(selectedKey === 6){
            this.showMySessionsList()
        }
        else if(selectedKey === 7){
            this.showSuggestedTests()
        }
    }

    render() {
        // console.log("HomePageBottomBar::props", this.props)

        return (
            <div>
                <Nav className="custom-bottom-navbar"  right
                    onSelect={key => this.handleBottomSelect(key)} >
                        <NavItem eventKey={1} href="#" className={this.state.isFeeds ? "active" : ""}>
                            <div>
                                <FontAwesome
                                    name="clock-o"
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                Feeds
                            </div>
                        </NavItem>
                        <NavItem eventKey={2} href="#" className={this.state.isMentorList ? "active" : ""}>
                            <div>
                                <FontAwesome
                                    name="user-secret"
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                Our Mentors
                            </div>
                        </NavItem>
                        <NavItem eventKey={3} href="#" className={this.state.isCommunityList ? "active" : ""}>
                            <div>
                                <FontAwesome
                                    name="users"
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                Our Communities
                            </div>
                        </NavItem>
                        <NavItem eventKey={4} href="#" className={this.state.isMyCommunityList ? "active" : ""}>
                            <div>
                                <FontAwesome
                                    name="user"
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                My Communities
                            </div>
                        </NavItem>
                        <NavItem eventKey={5} href="#" className={this.state.isUpcomingSessionsList ? "active" : ""}>
                            <div>
                                <FontAwesome
                                    name="play-circle"
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                Suggested Sessions
                            </div>
                        </NavItem>
                        {/* <NavItem eventKey={6} href="#" className={this.state.isMySessionsList ? "active" : ""}>
                            <div>
                                <FontAwesome
                                    name="calendar-check-o"
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                My Calendar
                            </div>
                        </NavItem> */}
                        <NavItem eventKey={7} href="#" className={this.state.isSuggestedTests ? "active" : ""}>
                            <div>
                                <FontAwesome
                                    name="line-chart"
                                />
                            </div>
                            <div style={{ fontSize: "0.65em" }}>
                                Suggested Tests
                            </div>
                        </NavItem>
                </Nav>
                <Col xs={12} style={{marginBottom: '100px'}}>
                    <Row 
                    // className={!this.state.isFeeds?"refier-card-style":""}
                    >
                        <div hidden={!this.state.isFeeds}>
                            <FeedsController trackSubmitPost={this.props.trackSubmitPost} />
                        </div>
                        
                        {
                        this.state.isCommunityList?
                            <CommunityListController/>
                        :
                        this.state.isMentorList?
                            <MentorRightListController userId={this.props.userId}/>
                        :
                        this.state.isMyCommunityList?
                            <MyCommunityListController fromBottomBar={true} />
                        :
                        this.state.isMySessionsList?
                            <MyCalendarList  {...this.props} />
                        :
                        this.state.isSuggestedTests?
                            <TestListForTopic  {...this.props} />
                        :
                        this.state.isUpcomingSessionsList?
                            <UpcomingSessionsList  {...this.props} />
                        :
                        null
                    
                    }
                    </Row>
                </Col>
            </div>
        )
    }
}