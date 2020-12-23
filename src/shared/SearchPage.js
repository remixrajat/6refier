import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { convertStringToJson } from '../HelperFunctions/convertStringToJson'
import { Link } from 'react-router-dom';
import { MEDIA_URL_TEXT } from '../GlobalConstants'

export default class SearchPage extends Component {
    constructor(props) {
        super(props);

		this.getDescription = this.getDescription.bind(this)
		this.trimContent = this.trimContent.bind(this)
    }

    getDescription(data) {
		return convertStringToJson(data);
	}

	trimContent(text, lenVal) {
		return text.length > lenVal ? text.substring(0, lenVal) + "..." : text;
	}

    render() {
        // console.log("SearchPage:: props", this.props);

		let usersList, blogsList, questionsList, tagsList, contentList;
		if(this.props.location.state && this.props.location.state.queryItems) {
            const queryItems = this.props.location.state.queryItems;
			usersList = queryItems.users && queryItems.users.map((item) => {
				const name = this.trimContent(item.name, 12);
				const email = this.trimContent(item.email, 12);
				const url = `/userDashboard/profile/${item.pk}/`;
				const img_url = MEDIA_URL_TEXT + item.profile_photo;

				return (
					
					<Col sm={4} md={3}>
						<Link to={url}>		
							<div className="global-search-user-card">
								<p>
									<img src={img_url} alt="user-picture"/>
								</p>
								<div>
									<h5 title={item.name}>{name}</h5>
									<p title={item.email}>{email}</p>
								</div>
							</div>
						</Link>
					</Col> 
				)
			});
			blogsList = queryItems.blogs && queryItems.blogs.map((item) => {
				const data = this.getDescription(item.description);
				const desc = this.trimContent(data.blocks[0].text, 280);
				const title = this.trimContent(item.title, 20);
				const url = `/userDashboard/viewblog/${item.pk}/1/`;

				return (
					
					<Col sm={4} md={3}>
						<Link to={url}>		
							<div className="global-search-card">
								<h5 title={item.title}>{title}</h5>
								<p>{desc}</p>
							</div>
						</Link>
					</Col> 
				)
			});
			questionsList = queryItems.questions && queryItems.questions.map((item) => {
				const data = this.getDescription(item.description);
				const desc = this.trimContent(data.blocks[0].text, 200);
				const url = `/userDashboard/viewpost/${item.pk}/`;				
				
				return (
					<Col sm={4} md={3}>
						<Link to={url}>									
							<div className="global-search-question-card">							
								<p>{desc}</p>
							</div>
						</Link>
					</Col>
				)
			});
			tagsList = queryItems.tags && queryItems.tags.map((item) => {
				const title = this.trimContent(item.title, 20);
				const desc = this.trimContent(item.description, 280);
				const url = `/userDashboard/topic/${this.props.location.state.userId}/${item.pk}/`;
					
				return (
					<Col sm={4} md={3}>
						<Link to={url}>														
							<div className="global-search-card">							
								<h5>{title}</h5>
								<p>{desc}</p>
							</div>
						</Link>
					</Col>
				)
			});
			contentList = queryItems.content && queryItems.content.map((item) => {
				const title = this.trimContent(item.title, 20);
				const desc = this.trimContent(item.description, 290);
				const url = `/userDashboard/vids/${item.pk}/`;
				
				return (
					<Col sm={4} md={3}>
						<Link to={url}>																					
							<div className="global-search-card">							
								<h5>{title}</h5>
								<p>{desc}</p>
							</div>
						</Link>
					</Col>
				)
			});
		}

        return (
            !this.props.location.state ? 
                
                <Redirect to="/userDashboard" /> :

                <div className="global-search-page">
                    <div className="global-search-count-indicator">
                    {
                        usersList.length || blogsList.length || questionsList.length || tagsList.length || contentList.length ?							
                            <p>
                                We found { usersList.length > 0 ? <b>{usersList.length} users, </b> : null } 
                                        { blogsList.length > 0 ? <b>{blogsList.length} blogs, </b> : null } 
                                        { questionsList.length > 0 ? <b>{questionsList.length} questions, </b> : null }
                                        { tagsList.length > 0 ? <b>{tagsList.length} tags, </b> : null }
                                        { contentList.length > 0 ? <b>{contentList.length} videos, </b> : null }                                        
                            </p> :
                            null
                    }
                    </div>
                    {
                        usersList.length ? 
                            <div className="global-search-each-section">
                                <div className="global-search-section-title">
                                    <h4>Users</h4>
                                </div>
                                <Row>
                                    {usersList}
                                </Row>
                            </div> :
                            null
                    }
                    {
                        blogsList.length ? 
                            <div className="global-search-each-section">
                                <div className="global-search-section-title">
                                    <h4>Blogs</h4>
                                </div>
                                <Row>
                                    {blogsList}
                                </Row>
                            </div> :
                            null
                    }
                    {
                        tagsList.length ? 
                            <div className="global-search-each-section">
                                <div className="global-search-section-title">
                                    <h4>Tags</h4>
                                </div>
                                <Row>
                                    {tagsList}
                                </Row>
                            </div> :
                            null
                    }
                    {
                        contentList.length ? 
                            <div className="global-search-each-section">
                                <div className="global-search-section-title">
                                    <h4>Content</h4>
                                </div>
                                <Row>
                                    {contentList}
                                </Row>
                            </div> :
                            null
                    }	
                    {
                        questionsList.length ? 
                            <div className="global-search-each-section">
                                <div className="global-search-section-title">
                                    <h4>Questions</h4>
                                </div>
                                <Row>
                                    {questionsList}
                                </Row>
                            </div> :
                            null
                    }												
            </div>                                                       
        )
    }
} 