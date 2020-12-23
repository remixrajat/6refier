import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
	
import UserImageStatus from '../../profilepage/presentationalcomponents/UserImageStatus'
import TagController from '../../shared/Tags/conditionalcomponents/TagController'
	
import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton'
import schoolImg from '../../images/mentor_dashboard_page/community_avatar.png';
import MentorImg from '../../images/mentor_dashboard_page/avatardp.png';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import '../../styles/scss/cards.css'


class SchoolHeaderNew extends Component {
	getWriteAccess() {
		return this.props.communityOwnershipStateValue;
	}
	
	render() {
		// console.log("SchoolHeaderNew :: this.props :: ", this.props)

		// console.log("communityMemberShipRequestValue :: ", this.props.communityMemberShipRequestValue);
		let tagValues = this.props.communityBasicDataState[0].fields.tag_values
		let ownerTitle, owners
		
		if (this.props.owners) {
			if (this.props.owners.length > 0) {
				ownerTitle = <div className="custom-list-content" style={{textAlign:"center", marginTop:"30px"}}>
					Admins ({this.props.owners.length})</div>
				owners = []
				let ownerDetails 
				for (let i = 0; i < this.props.owners.length; i++){
					ownerDetails = this.props.owners[i]
					let name = (ownerDetails.fields.community_member.last_name &&
                        ownerDetails.fields.community_member.last_name != "Null" &&
                        ownerDetails.fields.community_member.last_name != "None") ?
                        (ownerDetails.fields.community_member.first_name + " " + ownerDetails.fields.community_member.last_name)
                        :
                        ownerDetails.fields.community_member.first_name
					owners.push(
						<div style={{ marginTop: "5px",textAlign:"left", marginLeft:"20px" }}>
                            <span>
                                <img
                                    src={ownerDetails.fields.community_member.profile_photo ?
                                        MEDIA_URL_TEXT +
                                        ownerDetails.fields.community_member.profile_photo : MentorImg}
                                    className="custom-list-img" />
                            </span>
                            <span style={{ marginLeft: "10px" }}>
                                <Link
                                    to={"/userDashboard/profile/" + ownerDetails.fields.community_member.id}
                                    id="custom-list">
									{name}
									{ownerDetails.fields.member_description ?
										ownerDetails.fields.member_description.length > 0 ?
										(" - " +
											ownerDetails.fields.member_description) :
											"":""}
                                </Link>
                            </span>
                        </div>
					)
				}
			}
			else {
				ownerTitle = <div className="custom-list-sub-content">Sorry, There are no Owners to this Community</div>
			}
		}

		return (
			<div className="refier_custom_panel_window" 
				style={{ textAlign: "left", backgroundColor:"white", marginTop:"20px" }}>
				<div>
					<div className={"refier_image_panel"} 
                		style={{ cursor: "default", width:"100%", transform:"none", margin:"0px" }}>
                		<div className="refier_image">
							<img 
								style={{objectFit:"cover"}}
								src={this.props.communityBasicDataState[0].fields.profile_photo ? 
										MEDIA_URL_TEXT
										+ this.props.communityBasicDataState[0].fields.profile_photo
										: schoolImg}
							/>
						</div>
						<div>
							<div className="refier_image_panel_element"
								style={{
										padding: "5px",
										height: '350px',
										overflowY: 'hidden'
									}}>

								<div style={{
										"paddingTop": "10px", paddingBottom: "20px",
										"textAlign": "center", "marginTop": "20px"
									}}>
									<UserImageStatus 
										profile_photo={this.props.communityBasicDataState[0].fields.profile_photo}
										defaultVal={schoolImg}
										writeAccess={this.getWriteAccess.bind(this)}
										submitProfilePicture={this.props.submitProfilePicture}

										imageUploadProgress={this.props.imageUploadProgress}
										imageUploadReset={this.props.imageUploadReset}
									/>
									<div className="refier_custom_title_white">
										{this.props.communityBasicDataState[0].fields.entity_name}
									</div>
									{this.props.communityBasicDataState && 
									this.props.communityBasicDataState[0] ?
										<div>
											<div className="refier_custom_desc_white"
												style={{ "textAlign": "center", margin: "10px" }}>
												{/* {this.props.communityBasicDataState[0].fields.description} */}
												<div dangerouslySetInnerHTML={{__html: this.props.communityBasicDataState[0].fields.description}} />
											</div>
										</div>
										:
										null}
								</div>

							</div>
						</div>
					</div>
				</div>
				<div style={{
						"paddingTop": "20px", paddingBottom: "30px",
						"textAlign": "center", "marginTop": "20px"
					}}>
					<div>
						{/* {tags} */}
						<TagController tagValues={tagValues}
							index={this.props.index}
							userId={this.props.userId} />
					</div>

					{this.props.communityOwnershipStateValue ?
						<div
							style={{ "marginTop": "10px" }}>
							<div style={{ "padding": "10px 15px" }}>
								<ComplementaryButton
									redirect={true}
									redirectAddress={"/userDashboard/service/" + this.props.communityId}
									buttonText="Refier Services"
									isBlock={true}
								/>
							</div>
							<div style={{ "padding": "10px 15px" }}>
								<ComplementaryButton
									onButtonClick={this.props.openRequestsModal}
									isBlock={true}
									buttonText={"Requests (" 
										+ (this.props.pendingRequestState ? 
											this.props.pendingRequestState.length : "0")
										+ ")"
									}
								/>
							</div>
							<div style={{ "padding": "10px 15px" }}>
								<ComplementaryButton
									onButtonClick={this.props.createDiscussionRoom}
									isBlock={true}
									buttonText="Create Discussion Room"
								/>
							</div>
							{/* <div style={{ "padding": "10px 15px" }}>
								<Link to={"/userDashboard/performance/" + this.props.communityBasicDataState[0].pk}><Button bsStyle="primary"
									bsSize="small"
									className="refier_custom_button_new_selected_2" block
								>Performance</Button></Link>
							</div> */}
						</div>
						:
						!this.props.communityMembershipStateValue ?
							<div style={{ marginTop: "10px" }}>
								<div style={{ "padding": "10px 15px" }}>
									<ComplementaryButton
										disabled={this.props.communityMemberShipRequestValue}
										onButtonClick={this.props.openRequestToJoin}
										isBlock={true}
										buttonText={
											this.props.communityMemberShipRequestValue ? 
												"Request " + this.props.communityMemberShipRequestValue.application_status : 
												"Request to Join"
										}
									/>
								</div>
							</div>
							:
							null
					}

					{ownerTitle}
					{owners}

				</div>
			</div>

		);
	}
}

export default SchoolHeaderNew;