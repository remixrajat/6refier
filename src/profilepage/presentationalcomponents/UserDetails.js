import React from 'react';
import { Table, Button, Grid, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import TagController from '../../shared/Tags/conditionalcomponents/TagController'

const UserDetails = props => {
	let dob_formatted = "--";
	if (props.userProfileData.date_of_birth) {
		dob_formatted = formatdatefunction(props.userProfileData.date_of_birth, "long")
	}
	// console.log("My Profile", props)

	let tagValues = props.userProfileData.tag_values
	// let tagValues = props.userProfileData.tag_values
	// tagValues = JSON.parse(tagValues)
	// let tags = []
	// for(let i=0;i<tagValues.length;i++){
	// 	let index = 0
	// 	tags.push(
	// 		<span style={{marginRight:"5px",display: "inline-block", marginTop:"5px"}} 
	// 				className={"custom-list-tag-"+index}>
	// 				{tagValues[i].fields.tag_name}</span>)
	// }


	let textAlignComp = (props.align ? props.align : "left")
	// if( this.props.isLeft){
	// 	textAlignComp = "left"
	// }

	return (
		<Grid fluid >
			<Col xs={12} style={{ "paddingBottom": "20px" }}>
				<div className="custom-profile-title"
					data-label="name value" style={{ "textAlign": textAlignComp }}>
					{props.userProfileData.last_name &&
						props.userProfileData.last_name != "None" &&
						props.userProfileData.last_name != "Null" ?
						props.userProfileData.first_name + ' ' + props.userProfileData.last_name
						: props.userProfileData.first_name}
				</div>
				{props.userProfileData.email ?
					<div className="custom-list-sub-content"
						data-label="email value"
						style={{ "marginTop": "10px", "textAlign": textAlignComp }}
					>{props.userProfileData.email}
					</div>
					:
					null
				}
				{props.userProfileData.date_of_birth ?
					<div className="custom-list-sub-content"
						data-label="dob value"
						style={{ "marginTop": "10px", "textAlign": textAlignComp }}>
						{dob_formatted}
					</div>
					:
					null
				}
				{props.userProfileData.userstatus ?
					<div className="custom-list-sub-content"
						data-label="gender"
						style={{ "marginTop": "10px", "textAlign": textAlignComp }}>
						{props.userProfileData.userstatus}
					</div>
					:
					null
				}

				<div style={{ "textAlign": textAlignComp }}>
					<div>
						{/* {tags} */}

						<TagController tagValues={tagValues}
							index={props.index}
							userId={props.profileId} />
					</div>
				</div>
				{/* {!props.userProfileData.gender ?
					null :
					props.userProfileData.gender == "M" ?
						<div className="custom-list-sub-content"
							data-label="gender"
							style={{ "marginTop": "10px", "textAlign": textAlignComp }}>Male
					</div>
						:
						props.userProfileData.gender == "F" ?
							<div className="custom-list-sub-content"
								data-label="gender"
								style={{ "marginTop": "10px", "textAlign": textAlignComp }}>Female
						</div>
							: null} */}
				{props.userProfileData.is_student ?
					props.userProfileData.father_profile ?
						<div className="custom-list-content"
							data-label="father key"
							style={{ "fontWeight": "500", "marginTop": "10px", "textAlign": textAlignComp }}>
							<span>{"Father :"}</span><span>
								<Link className="custom-list-content"
									data-label="father value"
									style={{ "marginLeft": "20px", "fontWeight": "700", "textAlign": textAlignComp }}
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
							style={{ "fontWeight": "500", "marginTop": "10px", "textAlign": textAlignComp }}>
							<span>{"Mother :"}</span><span>
								<Link className="custom-list-content"
									data-label="mother value"
									style={{ "marginLeft": "20px", "fontWeight": "700", "textAlign": textAlignComp }}
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
					<div style={{ "marginTop": "10px", "textAlign": textAlignComp }}>
						<Button onClick={props.editClick} bsStyle="primary"
							bsSize="small" className="refier_custom_button_dark" >Edit</Button>
						<Button onClick={props.openChangePasswordModal} bsStyle="primary"
							bsSize="small" className="refier_custom_button_dark">Change Password</Button>
						{props.userProfileData ? !props.userProfileData.is_mentor ?
							<div style={{ "marginTop": "10px" }}>
								<Link to={"/userDashboard/myLearnings/"}>
								<Button bsStyle="primary"
									bsSize="small" className="refier_custom_button_dark" block
									block>Learnings</Button>
								</Link>
							</div>
							:
							null :
							null
						}
					</div>
					: null}
			</Col>
		</Grid>

	);

};

export default UserDetails;