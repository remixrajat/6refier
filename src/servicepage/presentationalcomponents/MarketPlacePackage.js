import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Grid, Col, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import TestListForMarketPlace from './TestListForMarketPlace'
import ContentListForMarketPlace from './ContentListForMarketPlace'
import DocumentListForMarketPlace from './DocumentListForMarketPlace'
import SessionListForMarketPlace from './SessionListForMarketPlace'

import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import PreLoader from '../../shared/Preloader/PreLoader'


import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";


export default class MarketPlacePackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTest: false,
            showContent: true,
            showSession: false,
            showDocuments: false,
            isExpanded : false,
            isProgressExpanded: false
        }
 
        this.clickContentTab = this.clickContentTab.bind(this)
        this.clickTestTab = this.clickTestTab.bind(this)
        this.clickSessionTab = this.clickSessionTab.bind(this)
        this.clickDocumentsTab = this.clickDocumentsTab.bind(this)
        
        this.showCollapsed = this.showCollapsed.bind(this)
        this.showExpanded = this.showExpanded.bind(this)
    }

    showExpanded() {
        this.setState({isExpanded:true})
    }

    showCollapsed() {
        this.setState({isExpanded:false})
    }
    
    clickTestTab() {
        this.setState({ showTest: true, showContent: false, showSession:false,showDocuments:false })
    }
 
    clickContentTab() {
        this.setState({ showTest: false, showContent: true, showSession: false,showDocuments:false })
    }
 
    clickSessionTab() {
        this.setState({ showTest:false, showContent:false, showSession:true,showDocuments:false})
    }
 
    clickDocumentsTab() {
        this.setState({showTest:false,showContent:false,showSession:false,showDocuments:true})
    }

    render() {
        // console.log("MarketPlacePackage:: ", this.props)

        let { course, documents, contents, sessions, 
                tests, cost, tag, pk } = this.props
        let name = '', imageUri = '', userId = '';

        if(course['fields'] && course['fields']['package_owner_user']) {
            const owner = course['fields']['package_owner_user']

            userId = owner.id
            imageUri = owner.profile_photo !== "" ?
                            MEDIA_URL_TEXT + owner.profile_photo : 
                            imageSrc
            name = owner.first_name
            if(owner.last_name.trim() !== '') {
                name = name + " " + owner.last_name.trim()
            }
        } else if (course['fields'] && course['fields']['package_owner_entity']) {
            const owner = course['fields']['package_owner_entity']['fields']

            name = owner.entity_name
            imageUri = owner.profile_photo !== "" ?
                            MEDIA_URL_TEXT + owner.profile_photo : 
                            imageSrc
        } else {
            name = "Refier User"
            imageUri = imageSrc
        }

        const expandedBody = (
            <Col xs={12}>
                <div className="refier_custom_panel_light_gray">
                    <Grid fluid 
                        style={{marginTop: '10px', marginBottom: '15px', 
                            display: 'flex', alignItems: 'center', padding: '0'}}>
                        <Col xs={3} sm={2} md={1} data-label="Owner Photo">
                            <div className="sizable-image-container"
                                style={{ height: "40px", width: "40px" }}>
                                {userId.trim() !== '' ?
                                    <Link to={"/userDashboard/profile/" + userId}>
                                        <img
                                            src={imageUri}
                                            className="custom-card-img" />
                                    </Link> :
                                    <img
                                        src={imageUri}
                                        className="custom-card-img" />
                                }
                            </div>
                        </Col>
                        <Col xs={9} sm={10} md={11} style={{display: 'flex', alignItems: 'center'}}>
                            <Col xs={12} sm={7}>
                                <span  className="refier_text_post_owner"
                                    style={{textTransform: 'capitalize', fontSize: '1.1em', 
                                        wordBreak: 'break-all'}}>
                                    {name}
                                </span>
                            </Col>
                            {/* <Col xs={12} sm={5} style={{display: 'flex', justifyContent: 'center'}}>
                                <ComplementaryButton
                                    onButtonClick={this.props.payForExternalCourse}
                                    buttonText={`Buy for ${cost} credits`}
                                    style={{textTransform: 'none'}}
                                />
                            </Col> */}
                        </Col>
                    </Grid>

                    <div style={{ padding: "10px 10px" }}>
                        <div className="custom-list-content" 
                            style={{fontWeight:"600", marginBottom:"15px"}}>
                            {course['fields'] && course['fields'].isCourse ? 
                                "Course" : "Content Resource"}
                        </div>
                        <div className="custom-list-title-content">
                            {course['fields'] ? course['fields'].package_name : 'Course'}
                        </div>
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "10px", textTransform:"none" }}>
                            {course['fields'] && course['fields'].package_description}
                        </div>
                    </div>

                    <Col xs={12} style={{marginTop:"20px"}}>
                        <Col xs={3} className={this.state.showContent ?
                           "custom-tab-icon-active-light" : "custom-tab-icon-light"}
                           style={{padding: '10px'}}
                           onClick={this.clickContentTab}>
                           <div> <FontAwesome name="play-circle" /> </div>
                           <div style={{ fontSize: "0.65em" }}>
                               {"Expert Videos"}
                           </div>
                        </Col>
                        <Col xs={3} className={this.state.showTest ?
                           "custom-tab-icon-active-light" : "custom-tab-icon-light"}
                           style={{padding: '10px'}}
                           onClick={this.clickTestTab}>
                           <div> <FontAwesome name="line-chart" /> </div>
                           <div style={{ fontSize: "0.65em" }}>
                               {"Tests"}
                           </div>
                        </Col>
                        <Col xs={3} className={this.state.showSession ?
                           "custom-tab-icon-active-light" : "custom-tab-icon-light"}
                           style={{padding: '10px'}}
                           onClick={this.clickSessionTab}>
                           <div> <FontAwesome name="trophy" /> </div>
                           <div style={{ fontSize: "0.65em" }}>
                               {"Expert Sessions"}
                           </div>
                        </Col>
                        <Col xs={3} className={this.state.showDocuments ?
                           "custom-tab-icon-active-light" : "custom-tab-icon-light"}
                           style={{padding: '10px'}}
                           onClick={this.clickDocumentsTab}>
                           <div> <FontAwesome name="file" /> </div>
                           <div style={{ fontSize: "0.65em" }}>
                               {"Documents"}
                           </div>
                        </Col>
                    </Col>

                    <Col xs={12} className="refier-card-style" 
                        style={{minHeight:"30vh", textTransform: 'none', marginTop: '20px'}}>
                    {this.state.showContent ?
                        <ContentListForMarketPlace contents={contents} />
                        :
                        this.state.showTest ?
                            <TestListForMarketPlace tests={tests} />
                            :
                            this.state.showSession ?
                                <SessionListForMarketPlace events={sessions} />
                                :
                                this.state.showDocuments ?
                                    <DocumentListForMarketPlace documents={documents} />
                                    :
                                    null
                                    
                    }
                    </Col>
                    <div style={{ padding: '10px', marginTop: '10px' }}>
                        <span className="refier_custom_link"
                            onClick={this.showCollapsed}  style={{textTransform:"None"}}
                            >Show Less</span>
                    </div>
                </div>
            </Col> 
        )

        const collapsedBody = (
            <Col sm={6} md={4}>
                <div className="refier_custom_panel_light_gray">
                    <Grid fluid 
                        style={{marginTop: '10px', marginBottom: '15px', 
                            display: 'flex', alignItems: 'center', padding: '0'}}>
                        <Col xs={3} sm={2} md={1} data-label="Owner Photo">
                            <div className="sizable-image-container"
                                style={{ height: "40px", width: "40px" }}>
                                {userId.trim() !== '' ?
                                    <Link to={"/userDashboard/profile/" + userId}>
                                        <img
                                            src={imageUri}
                                            className="custom-card-img" />
                                    </Link> :
                                    <img
                                        src={imageUri}
                                        className="custom-card-img" />
                                }
                            </div>
                        </Col>
                        <Col xs={9} sm={10} md={11} style={{display: 'flex', alignItems: 'center'}}>
                            <Col xs={12} sm={7}>
                                <span  className="refier_text_post_owner"
                                    style={{textTransform: 'capitalize', fontSize: '1.1em', 
                                        wordBreak: 'break-all'}}>
                                    {name}
                                </span>
                            </Col>
                            {/* <Col xs={12} sm={5} style={{display: 'flex', justifyContent: 'center'}}>
                                <ComplementaryButton
                                    onButtonClick={this.props.payForExternalCourse}
                                    buttonText={`Buy for ${cost} credits`}
                                    style={{textTransform: 'none'}}
                                />
                            </Col> */}
                        </Col>
                    </Grid>
                    <div style={{ padding: "10px 10px" }}>
                        <div className="custom-list-content" 
                            style={{fontWeight:"600", marginBottom:"15px"}}>
                            {course['fields'] && course['fields'].isCourse ? 
                                "Course" : "Content Resource"}
                        </div>
                        <div className="custom-list-title-content">
                            {course['fields'] ? course['fields'].package_name : 'Course'}
                        </div>
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "10px", textTransform:"none" }}>
                            {course['fields'] && course['fields'].package_description}
                        </div>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "10px", marginLeft:"10px" ,textTransform:"none" }}>
                            Videos - {contents.length}
                        </div>
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "5px", marginLeft:"10px", textTransform:"none" }}>
                            Quizzes - {tests.length}
                        </div>

                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "5px", marginLeft:"10px", textTransform:"none" }}>
                            Sessions - {sessions.length}
                        </div>
                        <div className="custom-item-border custom-list-sub-content" 
                            style={{ marginTop: "5px", marginLeft:"10px", textTransform:"none" }}>
                            Documents - {documents.length}
                        </div>
                    </div>
                    <div style={{ padding: "10px 10px" }}>
                        <span className="refier_custom_link"
                            onClick={this.showExpanded}  style={{textTransform:"None"}}
                            >Show More</span>
                    </div>
                </div>
            </Col> 
        )


        return (
            this.state.isExpanded ?
                expandedBody :
                collapsedBody
        )
    }
}