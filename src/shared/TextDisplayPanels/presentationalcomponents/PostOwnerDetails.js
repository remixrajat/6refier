import React from 'react';
import { Link } from 'react-router-dom'
import { Grid, Col, Row, Image } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import PostDateTime from './PostDateTime'
import PostPrivacy from './PostPrivacy'

import imageSrc from "../../../images/mentor_dashboard_page/avatardp.png";
import { URL_TEXT, MEDIA_URL_TEXT, isXsDevice, isMobileDevice } from '../../../GlobalConstants'


export default class PostOwnerDetails extends React.Component {
	render() {
		// console.log("PostOwnerDetails:: props", this.props)

		let post = null;
		let text = ""
		if (this.props.post_type !== "Blog") {
			if (this.props.community_name) {
				if (this.props.is_post_owner) {
					text = <span>
						<span style={{marginLeft:"10px",marginRight:"10px"}}>
						<FontAwesome
								name="caret-right"
								className="refier_custom_icon"/></span>
						<Link to={"/userDashboard/community/" + this.props.community_id}>
							<span className="refier_text_post_owner">
								{this.props.community_name}
							</span>
						</Link>
					</span>
				}
				else if (this.props.is_mentor || this.props.is_community_external_counsellor) {
					text = <span >
						<span  className="refier_text_post_owner"> (</span>
						<Link to={"/userDashboard/community/" + this.props.community_id}>
							<span  className="refier_text_post_owner">
								{this.props.community_name}
							</span>
						</Link>
						<span  className="refier_text_post_owner">)</span>
						<span style={{marginLeft:"10px",marginRight:"10px"}}>
						<FontAwesome
								name="caret-right"
								className="refier_custom_icon"/></span>
						<span  className="refier_text_post_owner">You</span>
					</span>
				}
				else if (this.props.is_community_internal_counsellor) {
					text = <span>
						<span style={{marginLeft:"10px",marginRight:"10px"}}>
						<FontAwesome
								name="caret-right"
								className="refier_custom_icon"/></span>
						<Link to={"/userDashboard/community/" + this.props.community_id}>
							<span className="refier_text_post_owner">
								{this.props.community_name}
							</span>
						</Link>
					</span>
				}
				else if (this.props.is_community_owner) {
					text = <span>
						{(this.props.is_anonymous) ?
							<div className="refier_text_post_owner"> (as Anonymous)</div>
							: null
						}
						<span style={{marginLeft:"10px",marginRight:"10px"}}>
						<FontAwesome
								name="caret-right"
								className="refier_custom_icon"/></span>
						<Link to={"/userDashboard/community/" + this.props.community_id}>
							<span className="refier_text_post_owner">
								{this.props.community_name}
							</span>
						</Link>
						
					</span>
				}
				else {
					text = <span>
						<span style={{marginLeft:"10px",marginRight:"10px"}}>
						<FontAwesome
								name="caret-right"
								className="refier_custom_icon"/></span>
						<Link to={"/userDashboard/community/" + this.props.community_id}>
							<span className="refier_text_post_owner">
								{this.props.community_name}
							</span>
						</Link>
					</span>
				}
			}
		}
		else {
			if (this.props.community_name) {
				text = <span className="refier_text_post_owner">
						{this.props.is_post_owner ? 
							" posted a Blog on " + this.props.community_name : 
							" has posted a Blog on " + this.props.community_name
						}
					</span>
			} else {
				text = <span className="refier_text_post_owner">
						{this.props.is_post_owner ? " posted a Blog" : " has posted a Blog"}
					</span>
			}
		}

		let name = ""
		if(this.props.post_owner.last_name && 
			this.props.post_owner.last_name != "None" &&
				this.props.post_owner.last_name !="Null"){
			name = this.props.post_owner.first_name + " " + this.props.post_owner.last_name
		}
		else{
			name = this.props.post_owner.first_name
		}

		return (
			<Row>
				<Col xs={2} sm={1} data-label="Mentor/Counselor Photo"
					style={{"marginTop": "20px"}}>
					<div className="sizable-image-container"
						style={{ "height": "40px", "width": "40px" }}>

						{(this.props.is_anonymous) && !(this.props.is_community_owner)
							&& !(this.props.is_post_owner) && !(this.props.is_community_external_counsellor) &&
							!(this.props.is_community_internal_counsellor) ?
							<img
								src={imageSrc}
								className="custom-card-img"
							/>
							:
							<Link to={"/userDashboard/profile/" + this.props.post_owner.id}>
								<img
									src={
										this.props.post_owner.profile_photo &&
											this.props.post_owner.profile_photo != "" ?
											MEDIA_URL_TEXT +
											this.props.post_owner.profile_photo : imageSrc}
									className="custom-card-img" />
							</Link>
						}
					</div>
				</Col>

				<Col xs={10} md={9} sm={9} lg={10} style={{
					"textAlign": "left", "marginTop": "20px", "verticalAlign": "middle"
				}}>
				{ isXsDevice() || isMobileDevice() ?
					<Grid fluid style={{"padding": "0"}}>
						<Col xs={((this.props.post_owner.id == this.props.userId || (this.props.is_community_owner))
							&& !this.props.onBlogPage) ? 8 : 12} style={{"padding": "0"}}>
							{ this.props.is_post_owner ?
								<Link to={"/userDashboard/profile/" + this.props.post_owner.id}>
									<span  className="refier_text_post_owner">
										You
									</span>
								</Link>
								:
								(this.props.is_anonymous) && !(this.props.is_community_owner) &&
									!(this.props.is_community_external_counsellor) &&
									!(this.props.is_community_internal_counsellor) ?
									<span  className="refier_text_post_owner">
										Anonymous
									</span>
									:
									<Link to={"/userDashboard/profile/" + this.props.post_owner.id}>
										<span  className="refier_text_post_owner">
											{name}
										</span>
									</Link>
							}
							{text}
						</Col>
						{((this.props.post_owner.id == this.props.userId || (this.props.is_community_owner))
							&& !this.props.onBlogPage) ?
							<Col xs={4}>
								<div style={{position: 'relative', left: '-40px'}}>
									{(this.props.is_community_owner) && (this.props.post_type == "Question") ?
										<PostPrivacy {...this.props.is_visible_everyone} 
											changePostPrivacy={this.props.changePostPrivacy}
											postPrivacyCheckBoxStatus={this.props.postPrivacyCheckBoxStatus} />
										: null}
								</div>
								<Col xs={12} style={{display: 'flex', position: 'absolute', marginTop: '10px'}}>
									<FontAwesome
										className="refier_custom_button_icon"
										name="pencil" 
										onClick={this.props.open.bind(this, { type: "post" })}
									/>
									<FontAwesome
										className="refier_custom_button_icon"
										name="trash-o" 
										onClick={this.props.openDeletionModal.bind(this, { type: "post" })}
									/>
								</Col>
							</Col>
							: null
						}
					</Grid>

					:
						
					<Grid fluid style={{"padding": "0"}}>
						<Col sm={8} style={{"padding": "0"}}>
							{
								this.props.is_post_owner ?
									<Link to={"/userDashboard/profile/" + this.props.post_owner.id}>
										<span  className="refier_text_post_owner">
											You
										</span>
									</Link>
									:
									(this.props.is_anonymous) && !(this.props.is_community_owner) &&
										!(this.props.is_community_external_counsellor) &&
										!(this.props.is_community_internal_counsellor) ?
										<span  className="refier_text_post_owner">
											Anonymous
									</span>
										:
										<Link to={"/userDashboard/profile/" + this.props.post_owner.id}>
											<span  className="refier_text_post_owner">
												{name}
											</span>
										</Link>
							}
							{text}
						</Col>
						<Col>
							{((this.props.post_owner.id == this.props.userId || (this.props.is_community_owner))
								&& !this.props.onBlogPage) ?
								<div style={(this.props.is_community_owner) && (this.props.post_type == "Question") ?
									{ display: 'flex', alignItems: 'center', position: "relative", right: "-20px"} :
									{ "textAlign": "right", "position": "relative", "right": "-40px" }}>
									{(this.props.is_community_owner) && (this.props.post_type == "Question") ?
										<PostPrivacy {...this.props.is_visible_everyone} 
											changePostPrivacy={this.props.changePostPrivacy}
											postPrivacyCheckBoxStatus={this.props.postPrivacyCheckBoxStatus} />
										: null}
									<FontAwesome
										className="refier_custom_button_icon"
										name="pencil" onClick={this.props.open.bind(this, { type: "post" })}
									/>
									<FontAwesome
										className="refier_custom_button_icon"
										name="trash-o" onClick={this.props.openDeletionModal.bind(this, { type: "post" })}
									/>
								</div>
								: null
							}
						</Col>
					</Grid>
					}
					<div>
						<PostDateTime post_date={this.props.post_date} />
					</div>
				</Col>
			</Row>
		);
	}
}