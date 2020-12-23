import React from 'react';
import { Table, Button, Grid, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import FontAwesome from 'react-fontawesome';

import TagController from '../../shared/Tags/conditionalcomponents/TagController'
import UserImageStatus from './UserImageStatus'

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'


const UserDetailsNew = props => {
	// console.log("UserDetailsNew::", props)

	let dob_formatted = "--";
	if (props.userProfileData.date_of_birth) {
		dob_formatted = formatdatefunction(props.userProfileData.date_of_birth, "long")
	}

	let tagValues = props.userProfileData.tag_values
	// tagValues = JSON.parse(tagValues)
	// let tags = []
	// for(let i=0;i<tagValues.length;i++){
	// 	let index = 0
	// 	tags.push(
	// 		<span style={{marginRight:"5px",display: "inline-block", marginTop:"5px"}} 
	// 				className={"custom-list-tag-"+index}>
	// 				{tagValues[i].fields.tag_name}</span>)
	// }

	let userTypeBody = ""
	let finaldesc = []
	if (props.userTypes) {
		{
			let userTypes = JSON.parse(props.userTypes)
			if (userTypes.length > 0) {
				if (userTypes.length == 1) {
					finaldesc.push(userTypes[0].fields.tagparentTitle)
				}
				else {
					for (let j = 0; j < userTypes.length - 1; j++) {
						if (userTypeBody === "") {
							userTypeBody = userTypes[j].fields.tagparentTitle +
								(userTypes.length > 2 ? ", " : " ")
						}
						else {
							userTypeBody = userTypeBody + userTypes[j].fields.tagparentTitle + ", "
						}
					}
					userTypeBody = userTypeBody + "and " +
						userTypes[userTypes.length - 1].fields.tagparentTitle
                
					finaldesc.push(userTypeBody)
				}
				// finaldesc.push(<div>We are ready to get you started.</div>)
				}
			}
        }

	return (
		<Grid fluid>
			<Col xs={12} className="refier-card-style-blue"
				style={{
					"marginTop": "20px",
					"paddingTop": "10px", "textAlign": "center",
				}}>
				{props.userProfileData ? props.userProfileData.is_mentor ?
					<div className="custom-list-content-white"
						style={{ "marginBottom": "10px", "textAlign": "center" }}>
						<span>
							<FontAwesome
								name="trophy"
								
							/>
						</span>
						<span style={{ "marginLeft": "10px", "opacity": 1 }}>REFIER EXPERT</span>
						<span style={{ "marginLeft": "10px" }}>
							<FontAwesome
								name="trophy"
								
							/>
						</span>
					</div>
					:
					null
					:
					null
				}
				<UserImageStatus
					profile_photo={props.profile_photo}
					defaultVal={props.defaultVal}
					writeAccess={props.writeAccess}
					submitProfilePicture={props.submitProfilePicture}
					imageUploadProgress={props.imageUploadProgress}
					imageUploadReset={props.imageUploadReset}/>
				{/* </Col>
			<Col xs={12} style={{ "textAlign": "center", "paddingBottom": "10px" }}> */}
				<div className="refier_custom_title_white" style={{ padding: "5px" }}
					data-label="name value" >
					{props.userProfileData.last_name &&
						props.userProfileData.last_name != "None" &&
						props.userProfileData.last_name != "Null" ?
						props.userProfileData.first_name + ' ' + props.userProfileData.last_name
						: props.userProfileData.first_name}
				</div>
				{/* {props.userProfileData.email ?
					<div className="custom-list-sub-content-white"
						data-label="email value"
						style={{ "marginTop": "0px", "textAlign": "center" }}
					>{props.userProfileData.email}
					</div>
					:
					null
				} */}
				{props.userTypes ?
					<div className="custom-list-sub-content-white"
						data-label="email value"
						style={{ "marginTop": "0px", "textAlign": "center" }}
					>{finaldesc}
					</div>
					:
					null
				}
			</Col>
			<Col xs={12} className="refier-card-style"
				style={{
					"marginTop": "10px",
					"paddingTop": "10px", "textAlign": "center"
				}}>
				{props.userProfileData.userstatus ?
					<div className="custom-list-sub-content"
						data-label="gender"
						style={{ "marginTop": "10px", "textAlign": "center" }}>
						{props.userProfileData.userstatus}
					</div>
					:
					null
				}
				<div>
					<TagController tagValues={tagValues}
						index={props.index}
						userId={props.profileId} />
				</div>

				{props.userProfileData.date_of_birth ?
					<div className="custom-list-sub-content"
						data-label="dob value"
						style={{ "marginTop": "10px", "textAlign": "center" }}>
						{dob_formatted}
					</div>
					:
					null
				}
				{props.userProfileData.is_student ?
					props.userProfileData.father_profile ?
						<div className="custom-list-content"
							data-label="father key"
							style={{ "fontWeight": "500", "marginTop": "10px", "textAlign": "center" }}>
							<span>{"Father :"}</span><span>
								<Link className="custom-list-content"
									data-label="father value"
									style={{ "marginLeft": "20px", "fontWeight": "700", "textAlign": "center" }}
									to={props.userProfileData.father_profile ?
										props.userProfileData.father_profile.id ?
											"/userDashboard/profile/" + props.userProfileData.father_profile.id : "" : ""}>
									<span>{props.userProfileData.father_profile ?
										props.userProfileData.father_profile.first_name ?
											props.userProfileData.father_profile.first_name : "-" : "-"}</span>
									<span> {props.userProfileData.father_profile ?
										props.userProfileData.father_profile.last_name &&
											props.userProfileData.father_profile.last_name != "None" &&
											props.userProfileData.father_profile.last_name != "Null" ?
											props.userProfileData.father_profile.last_name : "-" : "-"}</span>
								</Link>
							</span>
						</div>
						:
						null
					: null}
				{props.userProfileData.is_student ?
					props.userProfileData.mother_profile ?
						<div className="custom-list-content"
							data-label="mother key"
							style={{ "fontWeight": "500", "marginTop": "10px", "textAlign": "center" }}>
							<span>{"Mother :"}</span><span>
								<Link className="custom-list-content"
									data-label="mother value"
									style={{ "marginLeft": "20px", "fontWeight": "700", "textAlign": "center" }}
									to={props.userProfileData.mother_profile ?
										props.userProfileData.mother_profile.id ?
											"/userDashboard/profile/" + props.userProfileData.mother_profile.id : "" : ""}>
									<span>
										{props.userProfileData.mother_profile ?
											props.userProfileData.mother_profile.first_name ?
												props.userProfileData.mother_profile.first_name : "-" : "-"}</span>
									<span> {props.userProfileData.mother_profile ?
										props.userProfileData.mother_profile.last_name &&
											props.userProfileData.mother_profile.last_name != "Null" &&
											props.userProfileData.mother_profile.last_name != "None" ?
											props.userProfileData.mother_profile.last_name : "-" : "-"}
									</span>

								</Link>
							</span>
						</div>
						:
						null
					: null}
				{props.writeAccess() ?
					<div style={{ "marginTop": "10px" }}>
						<Button onClick={props.editClick} bsStyle="primary"
							bsSize="small" className="refier_custom_button_dark" block
							block>Edit</Button>
					</div>
					: null}
				{props.writeAccess() && document.getElementsByName('google-signin-client_id').length === 0 ?
					<div style={{ "marginTop": "10px" }}>
						<Button onClick={props.openChangePasswordModal} bsStyle="primary"
							bsSize="small" className="refier_custom_button_dark" block
							block>Change Password</Button>
					</div>
					: null}
				{props.userProfileData ? !(props.userProfileData.is_mentor || props.is_read_only) ?
					<div style={{ "marginTop": "10px" }}>
						<Link to={"/userDashboard/myLearnings/"}>
							<Button bsStyle="primary"
								bsSize="small" className="refier_custom_button_dark" block
								block>My Learnings</Button>
						</Link>
					</div>
					:
					null :
					null
				}
				{props.userProfileData ? !(props.is_read_only) ?
					<div style={{ "marginTop": "10px" }}>
						<Link to={"/userDashboard/viewOrders/"}>
							<Button bsStyle="primary"
								bsSize="small" className="refier_custom_button_dark" block
								block>My Orders</Button>
						</Link>
					</div>
					:
					null :
					null
				}
				{/* {props.is_mentor ? props.is_read_only ?
					<div style={{ "marginTop": "20px" }}>
						<Button onClick={props.openChangePasswordModal}
							bsSize="small" className="refier_custom_button_cancel" block
							block>Request for Session</Button>
					</div>
					:
					null
					:
					null
				} */}
			</Col>
		</Grid>

	);

};

export default UserDetailsNew;