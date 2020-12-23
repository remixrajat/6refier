import React from 'react';
import { connect } from 'react-redux';

import { getReadOnlyProfileData, uploadImageOrFile, getUserTypes } from './action';
import { getPostsDataListByUser, getQuestionListByUser, getPromotionMaterial,
	getPostsListLikedByUser, getPostsListCommentedByUser } 
from '../../shared/TextDisplayPanels/conditionalcomponents/action'
import ProfilePage from '../presentationalcomponents/ProfilePage';


class ProfilePageController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			temp: true,
			imageUploadProgress:0, 
		};

		this.readOnly = false;
		this.getWriteAccess = this.getWriteAccess.bind(this);
		this.imageUploadFailed = this.imageUploadFailed.bind(this)
		this.imageUploadProgress = this.imageUploadProgress.bind(this)
		this.imageUploadSuccess = this.imageUploadSuccess.bind(this)
		this.imageUploadReset = this.imageUploadReset.bind(this)
	}

	isReadOnlyProfile(selfProfileId) {
		if (selfProfileId) {
			if (this.props.match.params.profileId !== 'self' && 
				selfProfileId !== this.props.match.params.profileId) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.props.readWrite.profileFields) {
				if (this.props.match.params.profileId !== 'self' && 
					this.props.readWrite.profileFields.pk !== this.props.match.params.profileId) {
					return true;
				} else {
					return false;
				}
			}
		}
		return true;
	}

	componentDidMount(){
		//console.log("456RecievePropsCalled :: componentDidMount", this.isReadOnlyProfile());

		if(this.isReadOnlyProfile()) {
			//console.log("456RecievePropsCalled :: componentDidMount", "this.isReadOnlyProfile : true");
			this.props.dispatch(getReadOnlyProfileData(this.props.match.params.profileId));
			this.setState({temp : !this.state.temp});
			this.readOnly = true;
		} else {
			//console.log("456RecievePropsCalled :: componentDidMount", "this.isReadOnlyProfile : false");
			this.setState({temp : !this.state.temp});
			this.readOnly = false; 
		}

	}

	componentWillMount() {
		this.props.dispatch(getPostsDataListByUser("Blog", this.props.match.params.profileId))
		this.props.dispatch(getQuestionListByUser("Question", this.props.match.params.profileId))
		this.props.dispatch(getPostsListLikedByUser(this.props.match.params.profileId))
		this.props.dispatch(getPostsListCommentedByUser(this.props.match.params.profileId))
		this.props.dispatch(getUserTypes())
		this.props.dispatch(getPromotionMaterial())
	}
	
    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) {						
			if(this.isReadOnlyProfile()) {
				// console.log("456RecievePropsCalled :: componentDidMount", "this.isReadOnlyProfile : true");
				this.props.dispatch(getReadOnlyProfileData(this.props.match.params.profileId));
				this.setState({temp : !this.state.temp});
				this.readOnly = true;
			} else {
				//console.log("456RecievePropsCalled :: componentDidMount", "this.isReadOnlyProfile : false");
				this.setState({temp : !this.state.temp});
				this.readOnly = false; 
			}

			this.props.dispatch(getPostsDataListByUser("Blog", this.props.match.params.profileId))
			this.props.dispatch(getQuestionListByUser("Question", this.props.match.params.profileId))
			this.props.dispatch(getPostsListLikedByUser(this.props.match.params.profileId))
			this.props.dispatch(getPostsListCommentedByUser(this.props.match.params.profileId))
        } 
    }

	imageUploadReset() {
		this.setState({imageUploadProgress:0})
	}

	imageUploadFailed() {
		this.setState({imageUploadProgress:-1})
	}

	imageUploadSuccess() {
		this.setState({imageUploadProgress:1})
	}

	imageUploadProgress() {
		this.setState({imageUploadProgress:2})
	}

	submitProfilePicture(formdata) {
		this.imageUploadProgress()
		let returnPromise = this.props.dispatch(uploadImageOrFile(formdata, "updateuserprofilepicture/", "profile"));
		let _this = this
		returnPromise.then(function (data) {
			if (!data)
			{
				_this.imageUploadFailed()
				return
			}
			// console.log("******Response from server: ", data);
			_this.props.dispatch({ type: 'setProfileData', data: data, section: "profile" });
			_this.imageUploadSuccess()
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.readWrite.profileFields && 
			nextProps.readWrite.profileFields.pk !== undefined && 
			this.props.readWrite.profileFields === undefined) {
			if (this.isReadOnlyProfile(nextProps.readWrite.profileFields.pk)) {
				this.props.dispatch(getReadOnlyProfileData(nextProps.match.params.profileId));
				
				this.readOnly = true;
				this.setState({temp : !this.state.temp});
			} else {
				
				this.readOnly = false;
				this.setState({temp : !this.state.temp});
			}
			return;
		}

		if(nextProps.match.params.profileId !== this.props.match.params.profileId) {
			if(nextProps.match.params.profileId === 'self') {
				this.readOnly = false;
				this.setState({temp : !this.state.temp});
			 }else if (!this.props.readWrite.profileFields) {
				this.readOnly = true;
				this.setState({temp : !this.state.temp});
			} else if(nextProps.match.params.profileId !== this.props.readWrite.profileFields.pk) {
				this.readOnly = true;
				this.setState({temp : !this.state.temp});
			} else {
				this.readOnly = false;
				this.setState({temp : !this.state.temp});
			}
			return;
		}
	}

	getWriteAccess(){
		return !this.readOnly;
	}

	render() {
		// console.log("ProfilePageController::props", this.props)

		return (
			<div>
				{this.readOnly ?
					<ProfilePage 
						{...this.props.readOnly}
						location={this.props.location}
						profileId={this.props.match.params.profileId}
						writeAccess={this.getWriteAccess}
						isReadOnly={true}/>
					:
					<ProfilePage 
						{...this.props.readWrite}
						location={this.props.location}
						submitProfilePicture={this.submitProfilePicture.bind(this)}
						profileId={this.props.match.params.profileId}
						writeAccess={this.getWriteAccess}
						isReadOnly={false}
						imageUploadProgress={this.state.imageUploadProgress}
						imageUploadReset={this.imageUploadReset}/>
				}

			</div>
		);
	}
}

let mapStateToProps = (store) => {
	// console.log("ProfilePageController::connect", store, store.userProfileReducer);

	return {
		data: store.profileDataReducer,
		readWrite: {
			userProfileData: store.userProfileReducer.userProfileData,
			profileFields: store.userProfileReducer.profileFields,
			goals: store.userProfileReducer.goals,
			professional: store.userProfileReducer.professional,
			achievments: store.userProfileReducer.achievments,
			skills: store.userProfileReducer.skills,
			skillsIWant: store.userProfileReducer.skillsIWant,
			certificates: store.userProfileReducer.certificates,
			education: store.userProfileReducer.education,
			hobbies: store.userProfileReducer.hobbies,
			credits: store.userProfileReducer.credits,
			userProfileTags: store.userProfileReducer.userProfileTags,
			userTypes: store.userProfileReducer.userTypes,
		},

		readOnly: {
			userProfileData: store.userProfileReducer.userProfileDataRO,
			profileFields: store.userProfileReducer.profileFieldsRO,
			goals: store.userProfileReducer.goalsRO,
			professional: store.userProfileReducer.professionalRO,
			achievments: store.userProfileReducer.achievmentsRO,
			skills: store.userProfileReducer.skillsRO,
			skillsIWant: store.userProfileReducer.skillsIWantRO,
			certificates: store.userProfileReducer.certificatesRO,
			education: store.userProfileReducer.educationRO,
			hobbies: store.userProfileReducer.hobbiesRO,
			userProfileTags: store.userProfileReducer.userProfileTags,
			userTypes: store.userProfileReducer.userTypes,
		},

	};
};
export default connect(mapStateToProps)(ProfilePageController);