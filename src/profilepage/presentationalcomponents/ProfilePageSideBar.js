import React from 'react'
import CommunityListController from '../../dashboardpage/conditionalcomponents/CommunityRightListController' 
import MentorRightListController from '../../dashboardpage/conditionalcomponents/MentorRightListController';
import MyCommunityListController from '../conditionalcomponents/MyCommunityListController'
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';
import MyCalendarController from '../conditionalcomponents/MyCalendarController'
import MyBlogsController from '../conditionalcomponents/MyBlogsController'
import MyLikedBlogsController from '../conditionalcomponents/MyLikedBlogsController'
import MyQuestionController from '../conditionalcomponents/MyQuestionsController'
import MyCommentedQuestionsController from '../conditionalcomponents/MyCommentedQuestionsController'

export default class ProfilePageSideBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isCalendar: true,
            isMyCommunityList: false,
            isBlogs: false,
            isQuestion: false,
            isBoxHighlight: false
        };
        this.showMyCalendar = this.showMyCalendar.bind(this)
        this.showMyCommunityList = this.showMyCommunityList.bind(this)
        this.showMyBlogs = this.showMyBlogs.bind(this)
        this.showMyQuestions = this.showMyQuestions.bind(this)
        this.highlightBox = this.highlightBox.bind(this)
    }

    componentWillMount() {
        if(this.props.location) {
            if(this.props.location.state && this.props.location.state.tabNum) {
                if(this.props.location.state.tabNum === 4) {
                    this.showMyQuestions();
                    this.highlightBox();
                }
                else if(this.props.location.state.tabNum === 3) {
                    this.showMyBlogs()
                    this.highlightBox();
                }
                else if(this.props.location.state.tabNum === 2) {
                    this.showMyCommunityList()
                    this.highlightBox();
                }
                else {
                    this.showMyCalendar()
                    this.highlightBox();
                }
            }
        }
    }

    highlightBox() {
        this.setState(
            {isBoxHighlight: true}, 
            () => {
                setInterval(() => {
                    this.setState({isBoxHighlight: false})
                }, 3000)
            });
    }

    showMyCalendar(){
        this.setState({isCalendar:true,isMyCommunityList:false,isBlogs:false,isQuestion:false})
    }

    showMyCommunityList(){
        this.setState({isCalendar:false,isMyCommunityList:true,isBlogs:false,isQuestion:false})
    }
    
    showMyBlogs(){
        this.setState({isCalendar:false,isMyCommunityList:false,isBlogs:true,isQuestion:false})
    }
    
    showMyQuestions(){
        this.setState({isCalendar:false,isMyCommunityList:false,isBlogs:false,isQuestion:true})
    }

    render(){
        return(
                <div 
                    style={
                            this.state.isBoxHighlight ?
                                {
                                    marginTop: "10px", 
                                    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 10px 2px rgba(0, 0, 0, 0.12)'
                                } :
                                {
                                    marginTop: "10px", 
                                }
                        }>
                {this.props.isMentor?
                <Grid fluid style={{"padding": "0"}}
                className="refier_custom_panel_light_gray"
                    >
                    <Col xs={4}  className={this.state.isCalendar?
                        "custom-tab-icon-active-light custom-tab-height50-padding10":"custom-tab-icon-light custom-tab-height50-padding10"}
                            onClick={this.showMyCalendar}
                            >
                        <div >
                                <FontAwesome                
							name="calendar"
                                    
                                    title="Calendar"        
						/>
                        </div>
                        {/* <div style={{fontSize:"0.4em"}}>
                                My Calendar
                            </div> */}
                    </Col>
                    <Col xs={4}  className={this.state.isMyCommunityList?
                        // "custom-tab-icon-active-dark":"custom-tab-icon-dark"
                        "custom-tab-icon-active-light custom-tab-height50-padding10":"custom-tab-icon-light custom-tab-height50-padding10"
                    }
                        onClick={this.showMyCommunityList}>
                        <div>
                    <FontAwesome
							name="user"
							
						/>
                        </div>
                        {/* <div style={{fontSize:"0.4em"}}>
                                My Community List
                            </div> */}
                    </Col>
                    <Col xs={4}  className={this.state.isBlogs?
                        // "custom-tab-icon-active-dark":"custom-tab-icon-dark"
                        "custom-tab-icon-active-light custom-tab-height50-padding10":"custom-tab-icon-light custom-tab-height50-padding10"
                    }
                        onClick={this.showMyBlogs}>
                        <div>
                    <FontAwesome
							name="thumbs-up"
							
						/>
                        </div>
                        {/* <div style={{fontSize:"0.4em"}}>
                                Blogs I Liked
                            </div> */}
                    </Col>
                </Grid>
                :
                <Grid fluid style={{"padding": "0"}}
                className="refier_custom_panel_light_gray"
                    >
                    <Col xs={3}  className={this.state.isCalendar?
                        "custom-tab-icon-active-light custom-tab-height50-padding10":"custom-tab-icon-light custom-tab-height50-padding10"}
                        onClick={this.showMyCalendar}>
                        <div>
                    <FontAwesome
							name="calendar"
							
                            title="My Calendar"  
						/>
                        </div>
                        {/* <div style={{fontSize:"0.4em"}}>
                                My Calendar
                            </div> */}
                    </Col>
                    <Col xs={3}  className={this.state.isMyCommunityList?
                        // "custom-tab-icon-active-dark":"custom-tab-icon-dark"
                        "custom-tab-icon-active-light custom-tab-height50-padding10":"custom-tab-icon-light custom-tab-height50-padding10"
                    }
                        onClick={this.showMyCommunityList}>
                        <div>
                    <FontAwesome
							name="users"
							
                            title="My Communities" 
						/>
                        </div>
                        {/* <div style={{fontSize:"0.4em"}}>
                                My Community List
                            </div> */}
                    </Col>
                    <Col xs={3}  className={this.state.isBlogs?
                        // "custom-tab-icon-active-dark":"custom-tab-icon-dark"
                        "custom-tab-icon-active-light custom-tab-height50-padding10":"custom-tab-icon-light custom-tab-height50-padding10"
                    }
                        onClick={this.showMyBlogs}>
                        <div>
                    <FontAwesome
							name="thumbs-up"
							
                            title="Blogs Liked" 
						/>
                        </div>
                        {/* <div style={{fontSize:"0.4em"}}>
                                Blogs I Liked
                            </div> */}
                    </Col>
                    <Col xs={3}  className={this.state.isQuestion?
                        // "custom-tab-icon-active-dark":"custom-tab-icon-dark"
                        "custom-tab-icon-active-light custom-tab-height50-padding10":"custom-tab-icon-light custom-tab-height50-padding10"
                    }
                        onClick={this.showMyQuestions}>
                        <div>
                    <FontAwesome
							name="comments-o"
							
                            title="Questions Answered" 
						/>
                        </div>
                        {/* <div style={{fontSize:"0.4em"}}>
                               Questions I Answered
                            </div> */}
                    </Col>
                </Grid>
                }
                
                <Col className="refier-card-style" 
                style={this.props.isSmallScreen?{"maxHeight":"90vh","overflow":"auto"}
                    :
                    {"height":"75vh","overflow":"auto"}}
                >
                    {
                        this.state.isCalendar?
                        <MyCalendarController  {...this.props}/>
                        :
                        this.state.isMyCommunityList?
                        <MyCommunityListController {...this.props}/>
                        :
                        this.state.isBlogs?
                        <MyLikedBlogsController {...this.props}/>
                        :
                        this.state.isQuestion?
                        <MyCommentedQuestionsController {...this.props}/>
                        :
                        null
                    }
                
                </Col>
                </div>

                
        )
    }
}