import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const CommunityNavBar = (props) => {
	let feedsClass = '';
	let profileClass = '';
	let subscriptionClass = '';
	let discussionRoomsClass = '';
	let resourceClass = '';
	let webinarClass = '';
	let trackCoursesClass = '';

	if (props.currentState === 'feeds') {
		feedsClass = 'active';
	}
	else if (props.currentState === 'communityProfile') {
		profileClass = 'active';
	}
	else if (props.currentState === 'subscription') {
		subscriptionClass = 'active'
	}
	else if (props.currentState === 'discussionRooms') {
		discussionRoomsClass = 'active'
	}
	else if (props.currentState === 'resources') {
		resourceClass = 'active'
	}
	else if (props.currentState === 'webinars') {
		webinarClass = 'active'
	}
	else if (props.currentState === 'trackCourse') {
		trackCoursesClass = 'active'
	}

	let liWidth = "33%";
	
	return (
		<div
			// className="refier-card-style"
			style={{ padding: "0px" }}>
		<Navbar fluid className="custom-navbar" collapseOnSelect>
			
				<Nav className="text">
					<li
						onClick={props.stateChangeFunction.bind(this, 'feeds')}
						style={{
							// "width": liWidth,
							// paddingTop: '16px'
						}}>
						<NavLink to='#' className={feedsClass}>
							<div style={{padding: "5px 10px"}}>
								<FontAwesome
                                name="clock-o"
                                
                                style={{"display": "inline-block"}}
                                />
								<span style={{"display": "inline-block", "marginLeft":"10px"}}>Feeds</span></div>
							
						</NavLink></li>
					<li onClick={props.stateChangeFunction.bind(this, 'discussionRooms')}
						style={{
							// "width": liWidth,
							// paddingTop: '16px',
						}}>
						<NavLink to='#' className={discussionRoomsClass}>
							<div style={{padding: "5px 10px"}}>
								<FontAwesome
                                name="envelope"
                                
                                style={{"display": "inline-block"}}
                                />
								<span style={{
									"display": "inline-block",
									"marginLeft": "10px"
								}}>Discussion Rooms</span></div>							
						</NavLink></li>
					{/* <li onClick={props.stateChangeFunction.bind(this, 'questions')} style={{ "width": liWidth }}>
						<NavLink to='#' className={questionsClass} >
							<div>
								<FontAwesome
                                name="question"
                                
                                style={{"display": "inline-block"}}
                                />
								<p style={{"display": "inline-block", "marginLeft":"10px"}}>Questions</p></div>							
						</NavLink></li>
					<li onClick={props.stateChangeFunction.bind(this, 'blogs')} style={{ "width": liWidth }}>
						<NavLink to='#' className={blogsClass} >
							<div>
								<FontAwesome
                                name="rss"
                                
                                style={{"display": "inline-block"}}
                                />
								<p style={{"display": "inline-block", "marginLeft":"10px"}}>Blogs/Updates</p></div>							
						</NavLink></li> */}
					{props.communityOwnershipState[props.match.params.communityId] ?
						<li onClick={props.stateChangeFunction.bind(this, 'communityProfile')}
							style={{
								// "width": liWidth,
								// paddingTop: '16px'
							}}>
							<NavLink to='#' className={profileClass} >
								<div style={{padding: "5px 10px"}}>
								<FontAwesome
                                name="gear"
                                
                                style={{"display": "inline-block"}}
                                />
									<span style={{
										"display": "inline-block",
										"marginLeft": "10px"
									}}>Community Profile</span></div>								
							</NavLink></li>
						:
						props.communityInternalExpertState[props.match.params.communityId] || 
							props.communityExternalExpertState[props.match.params.communityId]?
						<li onClick={props.stateChangeFunction.bind(this, 'trackCourse')}
							style={{
								// "width": liWidth,
								// paddingTop: '16px'
							}}>
							<NavLink to='#' className={trackCoursesClass} >
								<div style={{padding: "5px 10px"}}>
								<FontAwesome
                                name="tasks"
                                
                                style={{"display": "inline-block"}}
                                />
									<span style={{
										"display": "inline-block",
										"marginLeft": "10px"
									}}>Track Course</span></div>								
							</NavLink></li>
						
						: <li onClick={props.stateChangeFunction.bind(this, 'subscription')}
							style={{
								// "width": liWidth
							// paddingTop: '16px',
							}}>
						<NavLink to='#' className={subscriptionClass} >
							<div style={{padding: "5px 10px"}}>
								<FontAwesome
                                name="magic"
                                
                                style={{"display": "inline-block"}}
                                />
									<span style={{
										"display": "inline-block",
										"marginLeft": "10px"
									}}>Learning Path</span></div>							
						</NavLink></li>
					}
					{props.communityOwnershipState[props.match.params.communityId] ?
						<li></li>
						
						: <li onClick={props.stateChangeFunction.bind(this, 'resources')}
							style={{
								// "width": liWidth
							// paddingTop: '16px',
							}}>
						<NavLink to='#' className={resourceClass} >
							<div style={{padding: "5px 10px"}}>
								<FontAwesome
                                name="caret-square-o-right"
                                
                                style={{"display": "inline-block"}}
                                />
									<span style={{
										"display": "inline-block",
										"marginLeft": "10px"
									}}>Resources</span></div>							
						</NavLink></li>
					}
					{props.communityOwnershipState[props.match.params.communityId] ?
						<li></li>
						
						: <li onClick={props.stateChangeFunction.bind(this, 'webinars')}
							style={{
								// "width": liWidth
							// paddingTop: '16px',
							}}>
						<NavLink to='#' className={webinarClass} >
							<div style={{padding: "5px 10px"}}>
								<FontAwesome
                                name="laptop"
                                
                                style={{"display": "inline-block"}}
                                />
									<span style={{
										"display": "inline-block",
										"marginLeft": "10px"
									}}>Webinars</span></div>							
						</NavLink></li>
					}
				</Nav>
			{/* </Navbar.Collapse> */}
		</Navbar>
		</div>
	);
};

export default CommunityNavBar;
