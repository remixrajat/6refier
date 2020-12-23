import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchQueries } from './action'
import { bindActionCreators } from 'redux'
import { FormControl, FormGroup, Col, Row } from 'react-bootstrap'
import { convertStringToJson } from '../../../HelperFunctions/convertStringToJson'
import { Link } from 'react-router-dom';
import { MEDIA_URL_TEXT } from '../../../GlobalConstants'
import avatar from '../presentationalcomponents/img/avatardp.png';


class QueryContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			queryTerm: '',
			isShow: false
		}
		this.doQuery = this.doQuery.bind(this)
		this.getDescription = this.getDescription.bind(this)
		this.trimContent = this.trimContent.bind(this)
		this.closeSearch = this.closeSearch.bind(this)
		this.timeout = null
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps, "\nthis", this.props);
		if(nextProps.QueryItems)
			this.setState({ isShow: true })
	}

	doQuery(event) {
		clearTimeout(this.timeout);
		let query = event.target.value
		this.setState({ queryTerm: query })
		this.timeout = setTimeout(() => {
			if(query.length > 2) {
				this.props.fetchQueries(query)
			} else this.setState({isShow: false})
		}, 1000);
	}

	getDescription(data) {
		return convertStringToJson(data);
	}

	trimContent(text, lenVal) {
		return text.length > lenVal ? text.substring(0, lenVal) + "..." : text;
	}

	closeSearch() {
		this.setState({isShow: false})
	}

	render() {
		// console.log("QueryContainer::props", this.props);

		let usersList, blogsList, questionsList, tagsList, contentList;
		if(this.props.QueryItems) {
			usersList = this.props.QueryItems.users && this.props.QueryItems.users.slice(0, 8).map((item) => {
				const name = this.trimContent(item.name, 12);
				const email = this.trimContent(item.email, 12);
				const url = `/userDashboard/profile/${item.pk}/`;
				const img_url = item.profile_photo ? MEDIA_URL_TEXT + item.profile_photo : avatar;

				return (
					
					<Col sm={4} md={3}>
						<Link to={url} onClick={this.closeSearch}>		
							<div className="global-search-user-card">
								<p>
									<img src={img_url} />
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
			blogsList = this.props.QueryItems.blogs && this.props.QueryItems.blogs.slice(0, 8).map((item) => {
				const data = this.getDescription(item.description);
				const desc = this.trimContent(data.blocks[0].text, 280);
				const title = this.trimContent(item.title, 20);
				const url = `/userDashboard/viewblog/${item.pk}/1/`;

				return (
					
					<Col sm={4} md={3}>
						<Link to={url} onClick={this.closeSearch}>		
							<div className="global-search-card">
								<h5 title={item.title}>{title}</h5>
								<p>{desc}</p>
							</div>
						</Link>
					</Col> 
				)
			});
			questionsList = this.props.QueryItems.questions && this.props.QueryItems.questions.slice(0, 8).map((item) => {
				const data = this.getDescription(item.description);
				const desc = this.trimContent(data.blocks[0].text, 200);
				const url = `/userDashboard/viewpost/${item.pk}/`;				
				
				return (
					<Col sm={4} md={3}>
						<Link to={url} onClick={this.closeSearch}>									
							<div className="global-search-question-card">							
								<p>{desc}</p>
							</div>
						</Link>
					</Col>
				)
			});
			tagsList = this.props.QueryItems.tags && this.props.QueryItems.tags.slice(0, 8).map((item) => {
				const title = this.trimContent(item.title, 20);
				const desc = this.trimContent(item.description, 280);
				const url = `/userDashboard/topic/${this.props.userId}/${item.pk}/`;
					
				return (
					<Col sm={4} md={3}>
						<Link to={url} onClick={this.closeSearch}>														
							<div className="global-search-card">							
								<h5>{title}</h5>
								<p>{desc}</p>
							</div>
						</Link>
					</Col>
				)
			});
			contentList = this.props.QueryItems.content && this.props.QueryItems.content.map((item) => {
				const title = this.trimContent(item.title, 20);
				const desc = this.trimContent(item.description, 290);
				const url = `/userDashboard/vids/${item.pk}/`;
				
				return (
					<Col sm={4} md={3}>
						<Link to={url} onClick={this.closeSearch}>																					
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
			<div>
				<div>
					<FormControl 
						autoFocus={true}
						onChange={this.doQuery} 
						value={this.state.query} 
						type="text" placeholder="Search" 
						className="searchbar" />
                </div>
				
				{
					this.state.isShow ? 
						<div className="global-search">
							<div className="global-search-count-indicator">
							{
								usersList.length || blogsList.length || questionsList.length || tagsList.length || contentList.length ?							
									<p>
										We found { usersList.length > 0 ? <b>{usersList.length} users, </b> : null } 
												{ blogsList.length > 0 ? <b>{blogsList.length} blogs, </b> : null } 
												{ questionsList.length > 0 ? <b>{questionsList.length} questions, </b> : null }
												{ tagsList.length > 0 ? <b>{tagsList.length} tags, </b> : null }
												{ contentList.length > 0 ? <b>{contentList.length} videos, </b> : null }
												for <em>"{this.state.queryTerm}"</em>
									</p> :
									<p>No resuls found for "{this.state.queryTerm}"</p>
							}
							</div>
							{
								usersList.length > 0 ? 
									<div className="global-search-each-section">
										<div className="global-search-section-title">
											<h4>Users</h4>
											<Link 
												onClick={this.closeSearch} 
												to={{ 
													pathname: "/userDashboard/search", 
													state: {queryItems: this.props.QueryItems, userId: this.props.userId} 
												}}>
												<p>View All</p>
											</Link>
										</div>
										<Row>
											{usersList}
										</Row>
									</div> :
									null
							}
							{
								blogsList.length > 0 ? 
									<div className="global-search-each-section">
										<div className="global-search-section-title">
											<h4>Blogs</h4>
											<Link 
												onClick={this.closeSearch} 
												to={{ 
													pathname: "/userDashboard/search", 
													state: {queryItems: this.props.QueryItems, userId: this.props.userId} 
												}}>
												<p>View All</p>
											</Link>
										</div>
										<Row>
											{blogsList}
										</Row>
									</div> :
									null
							}
							{
								tagsList.length > 0 ? 
									<div className="global-search-each-section">
										<div className="global-search-section-title">
											<h4>Tags</h4>
											<Link 
												onClick={this.closeSearch} 
												to={{ 
													pathname: "/userDashboard/search", 
													state: {queryItems: this.props.QueryItems, userId: this.props.userId} 
												}}>
												<p>View All</p>
											</Link>
										</div>
										<Row>
											{tagsList}
										</Row>
									</div> :
									null
							}
							{
								contentList.length > 0 ? 
									<div className="global-search-each-section">
										<div className="global-search-section-title">
											<h4>Content</h4>
											<Link 
												onClick={this.closeSearch} 
												to={{ 
													pathname: "/userDashboard/search", 
													state: {queryItems: this.props.QueryItems, userId: this.props.userId} 
												}}>
												<p>View All</p>
											</Link>
										</div>
										<Row>
											{contentList}
										</Row>
									</div> :
									null
							}	
							{
								questionsList.length > 0 ? 
									<div className="global-search-each-section">
										<div className="global-search-section-title">
											<h4>Questions</h4>
											<Link 
												onClick={this.closeSearch} 
												to={{ 
													pathname: "/userDashboard/search", 
													state: {queryItems: this.props.QueryItems, userId: this.props.userId} 
												}}>
												<p>View All</p>
											</Link>
										</div>
										<Row>
											{questionsList}
										</Row>
									</div> :
									null
							}												
						</div> : 
						null
				}
				
			</div>
		)
	}
}

function mapStateToProps(state){
	//console.log("queryState", state.QueryItemsReducer.queryState)
    return {QueryItems : state.QueryItemsReducer.queryState}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({ fetchQueries: fetchQueries }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(QueryContainer)