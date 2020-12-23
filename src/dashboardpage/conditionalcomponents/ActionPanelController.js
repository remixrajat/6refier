import React, { Component } from 'react';
import 'redux';
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import { Col, Row, Grid, Image } from 'react-bootstrap'
import UserImageStatus from '../../profilepage/presentationalcomponents/UserImageStatus'
import { uploadImageOrFile, updateUserStatus } from '../../profilepage/conditionalcomponents/action'

import CommonModal from '../../shared/CommonModal'
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction';
import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'

import avatar from '../../shared/Header/presentationalcomponents/img/avatardp.png'


class ActionPanelController extends Component{
    constructor(props){
        super(props)
        this.state = {
            imageUploadProgress: 0, 
            showModal: false,
            description: '',
            charsCount: 0,
            maxChar: 120
		};

		this.imageUploadFailed = this.imageUploadFailed.bind(this)
		this.imageUploadProgress = this.imageUploadProgress.bind(this)
		this.imageUploadSuccess = this.imageUploadSuccess.bind(this)
        this.imageUploadReset = this.imageUploadReset.bind(this)
        this.submitProfilePicture = this.submitProfilePicture.bind(this)
        this.onOpenEditDescription = this.onOpenEditDescription.bind(this);
        this.onEditDescription = this.onEditDescription.bind(this);
		this.closeDescriptionModal = this.closeDescriptionModal.bind(this);
        this.onSaveDescription = this.onSaveDescription.bind(this);
        this.showSessionBanner = this.showSessionBanner.bind(this);
        this.createEventUrl = this.createEventUrl.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.profileFields) {
            let userData;
            let charCount
            if (nextProps.profileFields.userstatus) {
                if (nextProps.profileFields.userstatus.length > 0) {
                    userData = nextProps.profileFields.userstatus;
                    charCount = nextProps.profileFields.userstatus.length
                    this.setState({ description: userData, charsCount:charCount });
                }
            }
        }
    }


    closeDescriptionModal() {
        this.setState({showModal: false});
    }

    onOpenEditDescription() {
        this.setState({showModal: true});
    }

    onSaveDescription() {
        let profiledata = {}
        profiledata.userstatus = this.state.description;
        this.props.dispatch(updateUserStatus(profiledata));
        this.setState({showModal: false});
    }

    onEditDescription(e) {
        let description = e.target.value;
        let charCount = e.target.value.length; 
        if (charCount <= this.state.maxChar) {
            this.setState({ description: description, charsCount: charCount })
        }
    }

    imageUploadReset(){
		this.setState({imageUploadProgress:0})
	}

	imageUploadFailed(){
		this.setState({imageUploadProgress:-1})
	}

	imageUploadSuccess(){
		this.setState({imageUploadProgress:1})
	}

	imageUploadProgress(){
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
    
    createEventUrl(event_url, eventid, userId) {
        let uri = "/userDashboard/" + event_url + "/" + eventid + "/" + userId;
        return uri;
    }

    showSessionBanner(session) {
        if(session) {
            const latest_session = session;
            const eventDetail = latest_session.fields.session_id ? 
                                    latest_session.fields.session_id :
                                    latest_session.fields
            const session_id = latest_session.fields.session_id ? 
                                    latest_session.fields.session_id.session_id :
                                    latest_session.pk

            // console.log("latest_session", latest_session)
            
            let name = eventDetail.mentor_id.last_name &&
                        eventDetail.mentor_id.last_name !== "Null" &&
                        eventDetail.mentor_id.last_name !== "None" ?
                        eventDetail.mentor_id.first_name + " " +
                        eventDetail.mentor_id.last_name :
                        eventDetail.mentor_id.first_name

            if (this.props.userId === eventDetail.mentor_id.id) {
                name = "You"
            }

            let photo = eventDetail.mentor_id.profile_photo

            let topic = eventDetail.topic

            let date = formatdatefunction(eventDetail.start_date_time, "long")
            let time = formatdatefunction(eventDetail.start_date_time, "time")

            let dateToday = new Date()
            let eventDate = new Date(eventDetail.start_date_time)
            let diffTime = Number(eventDate - dateToday)
            let timeRemainingMsg = ''

            if(diffTime < 0) {
                timeRemainingMsg = <span><b style={{ color: '#555', letterSpacing: '0.015em' }}>
                                        Join Quick. Webinar has already started!</b></span>
            } else {
                let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
                let diffHours = Math.floor(diffTime / (1000 * 60 * 60))
                let diffMinutes = Math.floor(diffTime / (1000 * 60))
    
                if(diffDays > 0) {
                    timeRemainingMsg = <span>
                                            <b style={{ color: '#555', letterSpacing: '0.015em' }}>
                                                {diffDays} {diffDays > 1 ? " days" : " day"}
                                            </b> to go
                                        </span>
                } else if (diffHours > 0) {
                    timeRemainingMsg = <span>
                                            <b style={{ color: '#555', letterSpacing: '0.015em' }}>
                                                {diffHours} {diffHours > 1 ? " hours" : " hour"}
                                            </b> to go
                                        </span>
                } else {
                    timeRemainingMsg = <span>
                                            <b style={{ color: '#555', letterSpacing: '0.015em' }}>
                                                {diffMinutes === 0 ? "1" : diffMinutes} 
                                                {diffMinutes > 1 ? " minutes" : " minute"}
                                            </b> to go
                                        </span>
                }
            }


            let body = (
                <Grid fluid className="session-banner-wrapper">
                    <Col xs={3} style={{ textAlign: "center" }}>
                        <img src={photo || photo !== "" ? MEDIA_URL_TEXT + photo : avatar}
                            alt="userprofilepic"
                            className="session-banner-img" />
                    </Col>
                    <Col xs={9} style={{ textAlign: "left" }}>
                        <Link style={{ wordWrap: "normal" }}
                            to={"/userDashboard/webinarinfo/" + session_id}
                            className="custom-link session-banner-title">
                            {topic + " by " + name}
                        </Link>
                        <div className="session-banner-date"
                            style={{ margin: '10px auto' }}>
                            {time} &nbsp;on&nbsp;{date}
                        </div>
                        <div className="session-banner-start-msg">
                            {timeRemainingMsg}
                            <span>
                                <ComplementaryButton
                                    redirect={true}
                                    redirectAddress={this.createEventUrl(
                                        eventDetail.event_url, session_id, this.props.userId)}
                                    buttonText={this.props.userId === eventDetail.mentor_id.id 
                                        ? "Start Session" 
                                        : "Join Session"}
                                />
                            </span>
                        </div>
                    </Col>
                </Grid>
            )

            return body;
        }
        return null;
    }

    
    render() {
        // console.log("ActionPanelController :: props : ", this.props)
        
        let modalBody =
            <div>
                <textarea
                    onChange={this.onEditDescription}
                    rows="12" maxlength="120" required
                    placeholder="Enter your Info here">{this.state.description}</textarea>
                <div className="custom-list-sub-content"
                    style={this.state.charsCount == this.state.maxChar ?
                        { textAlign: "right", color:"red", fontWeight:"600" }:{ textAlign: "right"}}>
                    {this.state.charsCount}/{this.state.maxChar}
                </div>
            </div>
            
        let pending_community_request = []
        let pending_request_onstart
        if(this.props.communityListState){
            if (this.props.communityListState.length == 0) {
                if (this.props.communityDetails) {
                    for (let i = 0; i < this.props.communityDetails.length; i++){
                        if (this.props.communityDetails[i].request_status) {
                            pending_community_request.push(this.props.communityDetails[i])
                        }
                    }
                }
                if (pending_community_request.length > 0) {
                    let community_pending
                    if (pending_community_request.length == 1) {
                        community_pending =
                            <Link to={"/userDashboard/community/" + pending_community_request[0].pk}>
                            {pending_community_request[0].fields.entity_name}</Link>
                            }
                    else if (pending_community_request.length == 2) {
                        community_pending =
                            <span>
                            <Link to={"/userDashboard/community/" + pending_community_request[0].pk}>
                                {pending_community_request[0].fields.entity_name}</Link><span> 
                                {" "} and{" "}</span>
                            <Link to={"/userDashboard/community/" + pending_community_request[1].pk}>
                                {pending_community_request[1].fields.entity_name}</Link></span>
                       }
                    else {
                        community_pending = []
                        for (let i = 0; i < pending_community_request.length; i++){
                            if (i == 0) {
                                community_pending.push(
                                <span>
                                    <Link to={"/userDashboard/community/" + pending_community_request[0].pk}>
                                        {pending_community_request[0].fields.entity_name}</Link>
                                    <span>
                                            {", "}</span></span> 
                                )
                            }
                            else if (i < pending_community_request.length - 1) {
                                community_pending.push(
                                    <span>
                                    <Link to={"/userDashboard/community/" + pending_community_request[i].pk}>
                                            {pending_community_request[i].fields.entity_name}</Link>
                                        <span>
                                    {", "}</span></span> 
                                )
                                }
                            else {
                                community_pending.push(
                                    <span><span>{"and "}</span>
                                    <Link to={"/userDashboard/community/" + pending_community_request[i].pk}>
                                        {pending_community_request[i].fields.entity_name}</Link>
                                    </span> 
                                )
                            }
                        }
                    }
                    pending_request_onstart =
                            <div id="section-subtitle">
                            Looks like, your request to {community_pending} is Pending!
                    </div>
                }
                else {
                    pending_request_onstart =
                            <div id="section-subtitle">
                            Looks like, you have not joined any Community. Go to Our Communities and Join.
                    </div>
                }
            }
        }

        let displaypicurl;
        if(this.props.profileFields) {
            displaypicurl = MEDIA_URL_TEXT + this.props.profileFields.profile_photo;
        } else {
            displaypicurl = avatar;
        }

        return (
            <div style={{marginTop: "10px"}}>
                <div id="section-title" style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom:"30px"
                }}>
                    <div>
                        {this.props.profileFields?
                            <UserImageStatus
                                isRight={true}
                                profile_photo={this.props.profileFields.profile_photo}
                                defaultVal={avatar}
                                writeAccess={() => { return true }}
                                submitProfilePicture={this.submitProfilePicture}
                                imageUploadProgress={this.state.imageUploadProgress}
                                imageUploadReset={this.imageUploadReset}
                                isSmall={true}/>
                            :
                            <img className="frontimg" src={displaypicurl} />
                        }
                    </div>
                    <div style={{paddingLeft:"20px"}}>
                    <div >
                    {this.props.profileFields ? "Hey " +
                            this.props.profileFields.first_name + ", " : ""} Welcome Back
                    </div>
                        <div className="custom-list-content" style={{fontSize:"0.5em"}}>
                            <span>{this.props.profileFields ?
                                this.props.profileFields.userstatus != 0 ?
                                    this.props.profileFields.userstatus : 
                                    "Tell us what you do?" :
                                ""
                            }</span>
                            {this.props.profileFields ?
                                this.props.profileFields.userstatus != 0 ?
                                    <span style={{ marginLeft: "20px",fontSize:"0.9em" }}
                                        className="custom-link"
                                        onClick={this.onOpenEditDescription}> Edit Info</span> :
                                    
                                    <span style={{ marginLeft: "20px" ,fontSize:"0.9em"}}
                                        className="custom-link"
                                        onClick={this.onOpenEditDescription}> Add Info</span> :
                                null
                            }
                            
                    </div>
                    </div>
                </div>
                {pending_request_onstart}
                {this.showSessionBanner(this.props.nextEvent && this.props.nextEvent)}
                <CommonModal
					showModal={this.state.showModal}
					close={this.closeDescriptionModal}
					modalHeading="UPDATE YOUR INFO"
                    modalBody={modalBody}
                    onSaveModal={this.onSaveDescription}
                    isSaveButton={true}
                    onEditDescription={this.onEditDescription}
				/>
            </div>
        )
    }
}

var mapStateToProps = (store) => {
    //console.log(store);
    return {
        is_mentor: (store.userProfileReducer.profileFields ?
            store.userProfileReducer.profileFields.is_mentor : false),
        profileFields : store.userProfileReducer.profileFields,
        askedQuestions: store.appDataReducer.questionsAskedFromMentor,
        userId: (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
        communityListState: store.appDataReducer.communityListStateMemberOnly,
        communityDetails: store.appDataReducer.communityListState,
        subscribedDiscussionRooms: store.groupDiscussionReducer.subscribedDiscussionRooms,
        userProfileTags: store.userProfileReducer.userProfileTags,
        testDetails: store.testDataReducer.testListState,
        // eventsToday: store.userServicePageReducer.eventsToday,
        nextEvent: store.userServicePageReducer.nextEvent,
    }
    
}

export default connect(mapStateToProps)(ActionPanelController);