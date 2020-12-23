import React from 'react';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import UserImageStatus from './UserImageStatus';
import UserDetailsController from '../conditionalcomponents/UserDetailsController'
import UserDetailsControllerNew from '../conditionalcomponents/UserDetailsControllerNew'
import UserImg from '../../images/mentor_dashboard_page/avatardp.png'
import PreLoader from '../../shared/Preloader/PreLoader'
import SelfUserProfile from './SelfUserProfile'
import OtherUserProfile from './OtherUserProfile'
import MentorOtherProfile from './MentorOtherProfile'
import MentorSelfProfile from './MentorSelfProfile'


class ProfilePage extends React.Component {
	render() {
		// console.log("ProfilePage:: ", this.props)

		if (this.props.userProfileData === undefined) {
			return (<div style={{ "marginTop": "50px", "textAlign": "center" }}><PreLoader /></div>);
		}
		
		return (
			<div>
				<Col xs={12} lgHidden mdHidden>
					<Row><br /></Row>
					<Row>
						{this.props.profileFields && this.props.profileFields.is_mentor ?
							<div className="custom-list-content"
								style={{ "marginBottom": "10px", "textAlign": "center" }}>
								<span>
									<FontAwesome
										name="trophy"
										
									/>
								</span>
								<span style={{ "marginLeft": "10px" }}>REFIER EXPERT</span>
								<span style={{ "marginLeft": "10px" }}>
									<FontAwesome
										name="trophy"
										
									/>
								</span>
							</div>
							:
							null
						}
					</Row>
					<Row>
						<Col xsHidden sm={4} >
							<UserImageStatus
								isRight={true}
								profile_photo={this.props.profileFields.profile_photo}
								defaultVal={UserImg}
								writeAccess={this.props.writeAccess}
								submitProfilePicture={this.props.submitProfilePicture}
								imageUploadProgress={this.props.imageUploadProgress}
								imageUploadReset={this.props.imageUploadReset}/>
						</Col>
						<Col xsHidden sm={8}>
							<UserDetailsController userProfileData={this.props.profileFields}
								writeAccess={this.props.writeAccess} align={"left"}
								profileId={this.props.profileId}
								userTypes={this.props.userTypes}/>
						</Col>
						<Col xs={12} smHidden >
							<UserImageStatus
								profile_photo={this.props.profileFields.profile_photo}
								defaultVal={UserImg}
								writeAccess={this.props.writeAccess}
								submitProfilePicture={this.props.submitProfilePicture} 
								imageUploadProgress={this.props.imageUploadProgress}
								imageUploadReset={this.props.imageUploadReset}/>
						</Col>
						<Col xs={12} smHidden>
							<UserDetailsController userProfileData={this.props.profileFields}
								writeAccess={this.props.writeAccess} align={"center"} 
								profileId = {this.props.profileId}
								is_mentor={this.props.profileFields.is_mentor}
								is_read_only={this.props.isReadOnly}
								userTypes={this.props.userTypes}
								/>
						</Col>
					</Row>
					<br />

					<Row style={{marginBottom: '50px'}}>
					{this.props.profileFields?
						!this.props.profileFields.is_mentor?
							this.props.isReadOnly ?
							<Col xs={12} style={{ marginRight: "0px", paddingRight: "0px" }}>
								<OtherUserProfile {...this.props} isSmallScreen={true}  isMentor={false}/>
							</Col>
							:
							<Col xs={12} style={{ marginRight: "0px", paddingRight: "0px" }}>
								<SelfUserProfile {...this.props} isSmallScreen={true}  isMentor={false}/>
							</Col>
						:
							this.props.isReadOnly?
							<Col xs={12} style={{ marginRight: "0px", paddingRight: "0px" }}>
								<MentorOtherProfile {...this.props} isSmallScreen={true} isMentor={true}/>
							</Col>
							:
							<Col xs={12} style={{ marginRight: "0px", paddingRight: "0px" }}>
								<MentorSelfProfile {...this.props} isSmallScreen={true}  isMentor={true}/>
							</Col>
						:
							null
					}
					</Row>
				</Col>
				<Col xsHidden smHidden md={12} lg={12} style={{marginBottom: '75px'}}>
					<Col xs={3}>
						<div>
							<UserDetailsControllerNew userProfileData={this.props.profileFields}
								writeAccess={this.props.writeAccess}
								profileId = {this.props.profileId}
								profile_photo={this.props.profileFields.profile_photo}
								defaultVal={UserImg}
								submitProfilePicture={this.props.submitProfilePicture}
								is_mentor={this.props.profileFields.is_mentor}
								is_read_only={this.props.isReadOnly}
								userTypes={this.props.userTypes}
								submitProfilePicture={this.props.submitProfilePicture} 
								imageUploadProgress={this.props.imageUploadProgress}
								imageUploadReset={this.props.imageUploadReset}/>

						</div>
					</Col>
					{this.props.profileFields ?
						!this.props.profileFields.is_mentor?
							this.props.isReadOnly ?
							<Col xs={9} style={{ marginRight: "0px", paddingRight: "0px" }}>
								<OtherUserProfile {...this.props} isSmallScreen={false} isMentor={false} />
							</Col>
							:
							<Col xs={9} style={{ marginRight: "0px", paddingRight: "0px" }}>
								<SelfUserProfile {...this.props} isSmallScreen={false}  isMentor={false}/>
							</Col>
						:
							this.props.isReadOnly?
							<Col xs={9} style={{ marginRight: "0px", paddingRight: "0px" }}>
								<MentorOtherProfile {...this.props} isSmallScreen={false}  isMentor={true}/>
							</Col>
							:
							<Col xs={9} style={{ marginRight: "0px", paddingRight: "0px" }}>
								<MentorSelfProfile {...this.props} isSmallScreen={false}  isMentor={true}/>
							</Col>
						:
							null
					}
				</Col>
			</div>
		);
	}
}

export default ProfilePage;
