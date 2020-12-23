import React, { Component } from 'react';
import {
	Col, Row, Grid, Image, MenuItem, Dropdown, Tooltip, FormGroup,
	FormControl, NavDropdown
} from 'react-bootstrap';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import { URL_TEXT, MEDIA_URL_TEXT } from '../../../GlobalConstants'
import CommunityImg from '../../../images/mentor_dashboard_page/community_avatar.png';


class Communities extends Component {
	constructor(props) {
		super(props);
		this.onSelectMenuItem = this.onSelectMenuItem.bind(this)
		this.onServiceClick = this.onServiceClick.bind(this);
	}

	onSelectMenuItem(e) {
		// console.log("Fired Menu Item", e, this.props)
		// window.location = "/userDashboard/community/" + e
		// this.props.history.push("/userDashboard/community/" + e);
	}
	
	onServiceClick() {
		this.refs.overlay.hide();   
	}

	render() {
		// console.log("Communities:: props", this.props)
		
		let communityNavlist = <li onClick={() => this.onServiceClick()}><a href="#">Please, Join a Community</a></li>;

		if (this.props.communityList && this.props.communityList.length > 0) {
			let i = 1;
			communityNavlist = this.props.communityList.map((communityObject, i) => {
				i++;
				let communityLink = "/userDashboard/community/" + communityObject.pk;
				let imageUrl = communityObject.fields.profile_photo ? 
							MEDIA_URL_TEXT + communityObject.fields.profile_photo : 
							CommunityImg
                        
				return (
					<li 
						key={i} 
						onClick={() => this.onServiceClick()}>
						<Link to={communityLink} className="services-popup-list-icons">
							<div className="refnavicon">
								<img
									style={{height: '50px', width: '50px'}}
									src={imageUrl}
									className="custom-list-img" />
							</div>

							<div id="headerNav">
								<p>{communityObject.fields.entity_name}</p>
								<div className="custom-list-sub-content" style={{fontSize: '0.8em'}}>
									{communityObject.fields.description ?
										communityObject.fields.description[0] !== '<' ?
											communityObject.fields.description.length <= 60 ?
												communityObject.fields.description :
												communityObject.fields.description.substring(0, 57) + "..."
											: "The community is " + communityObject.fields.entity_name
										:
										"The community is " + communityObject.fields.entity_name
									}
								</div>
							</div>
						</Link>
					</li>
				)
			});
		}

		let popover = <Popover id="services-popup" 
							style={{maxHeight: '375px', overflowY: 'auto', minWidth: "350px", top: "50px"}}>
							<ul id="services-popup-list">
								{communityNavlist}
							</ul>
						</Popover>
		
		return (
			<OverlayTrigger trigger="click" placement="bottom" overlay={ popover } rootClose ref="overlay">
				<div title="Communities" className="nav-button-container">
					<div className="refnavicon">
						<FontAwesome
							name="users"
							className="headerIcon"
						/>
					</div>
					<div id="headerNav" style={{"display": "flex", "alignItems": "center"}}>
						<p>Communities</p>
						<span className="caret" style={{"position": "relative", "top": "3px", "left": "2px"}}></span>
					</div>
				</div>
			</OverlayTrigger>
		)
	}
}

export default Communities;