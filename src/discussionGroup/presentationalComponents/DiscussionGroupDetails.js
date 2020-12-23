import React, { Component } from 'react'
import { Col, Row, Grid, Nav, NavItem, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import { addOrUpdateRoom } from '../conditionalComponents/action';
import UserImageStatus from '../../profilepage/presentationalcomponents/UserImageStatus'

import CommonModal from '../../shared/CommonModal'
import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import MentorImg from '../../images/mentor_dashboard_page/avatardp.png';
import discussionImg from '../../images/mentor_dashboard_page/discussion.png';


export default class DiscussionGroupDetails extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showModal: false,
            description: ''
        }

        this.onOpenEditDescription = this.onOpenEditDescription.bind(this);
        this.onEditDescription = this.onEditDescription.bind(this);
		this.closeDescriptionModal = this.closeDescriptionModal.bind(this);
		this.onSaveDescription = this.onSaveDescription.bind(this);
    }

    componentWillMount() {
        if(this.props.groupDetails) {
            let description = this.props.groupDetails.fields.group_description;
            this.setState({ description });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.groupDetails) {
            let description = nextProps.groupDetails.fields.group_description;
            this.setState({ description });
        }
    }

    getWriteAccess() {
        if (this.props.groupDetails) {
            return this.props.groupDetails.fields.isOwner;
        }
        else {
            return false
        }
    }

    closeDescriptionModal() {
        this.setState({showModal: false});
    }

    onOpenEditDescription() {
        this.setState({showModal: true});
    }

    onSaveDescription() {
        const formdata = {
            'group_id': this.props.match.params.groupId,
            'room_desc': this.state.description
        }
        this.props.dispatch(addOrUpdateRoom(formdata, false));
        this.setState({showModal: false});
    }

    onEditDescription(e) {
        let description = e.target.value;
        this.setState({ description })
    }

    render() {
        // console.log("DiscussionGroupDetails :: props :: ", this.props)

        let group_photo, group_name, group_description, group_owners,
            group_experts, questions, ownerslist, expertslist, communityId

        let modalBody = ( 
            <textarea 
                value={this.state.description}
                onChange={this.onEditDescription} 
                rows="12">
            </textarea>
        )


        if (this.props.groupDetails) {
            group_photo = (this.props.groupDetails.fields.group_photo
                && this.props.groupDetails.fields.group_photo != "") ?
                this.props.groupDetails.fields.group_photo : undefined

            group_name = this.props.groupDetails.fields.group_name
            group_description = this.props.groupDetails.fields.group_description

            communityId = this.props.groupDetails.fields.groupCommunityMapping ?
                this.props.groupDetails.fields.groupCommunityMapping.id : undefined

            let experts_owners = this.props.groupDetails.fields.experts_and_owners
            let experts_owners_json = JSON.parse(experts_owners)
            // console.log("DiscussionGroupDetails :: experts_owners_json :: ",
            //     experts_owners_json)
            group_experts = []
            group_owners = []
            // for (let i = 0; i < experts_owners_json.length; i++) {
            Object.keys(experts_owners_json).forEach(function(i){
                if (experts_owners_json[i].fields.isOwner) {
                    if (ownerslist == undefined) {
                        ownerslist = []
                    }
                    group_owners.push(experts_owners_json[i])
                    let member_details = JSON.parse(experts_owners_json[i].
                        fields.member.member_details)
                    let name = (member_details.last_name &&
                        member_details.last_name != "Null" &&
                        member_details.last_name != "None") ?
                        (member_details.first_name + " " + member_details.last_name)
                        :
                        member_details.first_name
                    let photo = member_details.profile_photo
                    ownerslist.push(
                        <div style={{ marginTop: "5px" }} key={i}>
                            <span>
                                <img
                                    src={member_details.profile_photo ?
                                        MEDIA_URL_TEXT +
                                        member_details.profile_photo : MentorImg}
                                    className="custom-list-img" />
                            </span>
                            <span style={{ marginLeft: "10px" }}>
                                <Link
                                    to={"/userDashboard/profile/" + member_details.id}
                                    id="custom-list">
                                    {name}
                                </Link>
                            </span>
                        </div>
                    )
                }
                else if (experts_owners_json[i].fields.isExpert) {
                    group_experts.push(experts_owners_json[i])
                    if (expertslist == undefined) {
                        expertslist = []
                    }
                    let member_details = JSON.parse(experts_owners_json[i].
                        fields.member.member_details)
                    let name = (member_details.last_name &&
                        member_details.last_name != "Null" &&
                        member_details.last_name != "None") ?
                        (member_details.first_name + " " + member_details.last_name)
                        :
                        member_details.first_name
                    let photo = member_details.profile_photo
                    expertslist.push(
                        <div style={{ marginTop: "5px" }} key={i}>
                            <span>
                                <img
                                    src={member_details.profile_photo ?
                                        MEDIA_URL_TEXT +
                                        member_details.profile_photo : MentorImg}
                                    className="custom-list-img" />
                            </span>
                            <span style={{ marginLeft: "10px" }}>
                                <Link
                                    to={"/userDashboard/profile/" + member_details.id}
                                    id="custom-list">
                                    {name}
                                </Link>
                            </span>
                        </div>
                    )
                }
            })
            questions = this.props.groupDetails.fields.numberOfQuestions

        }
        
        return (
            <div style={{ paddingBottom: "10px" }}>
                <div className="refier-card-style" >
                    <UserImageStatus
                        profile_photo={group_photo}
                        defaultVal={discussionImg}
                        writeAccess={this.getWriteAccess.bind(this)}
                        submitProfilePicture={this.props.submitProfilePicture}
                        imageUploadProgress={this.props.imageUploadProgress}
                        imageUploadReset={this.props.imageUploadReset}
                    />
                    <div style={{ paddingTop: "10px" }} className="refier_custom_title">
                        {group_name}
                    </div>
                    {
                        this.props.groupDetails && 
                        this.props.groupDetails.fields.isOwner ?
                            <Button
                                onClick={this.onOpenEditDescription}
                                style={{float: 'right'}}
                                className="refier_custom_icon_button">
                                <FontAwesome
                                    name="pencil"
                                    style={{
                                        "cursor": "pointer"
                                    }}
                                />
                            </Button> :
                            null
                    }
                    <div className="custom-list-sub-content"
                        style={{ padding: "10px", textAlign: "center" }}>
                        {group_description}
                    </div>
                </div>
                <div className="refier-card-style" style={{ marginTop: "10px" }}>
                    <Grid fluid className="refier_custom_header_light_gray">
                        <Row
                            className="refier_custom_headertext_light_gray_medium">
                            <Col xs={12} style={{ textAlign: "left" }}>
                                Owners
                            </Col>
                        </Row>
                    </Grid>
                    {ownerslist && ownerslist.length > 0 ?
                        <div style={{ padding: "5px", textAlign: "left" }}>
                            {ownerslist}
                        </div>
                        :
                        <div>
                            <div style={{ padding: "5px", textAlign: "left" }} className="custom-list-sub-content">
                                No Owners Present
                            </div>
                        </div>
                    }
                    {this.props.isUserOwner == "True" ?
                        <div style={{margin: '10px'}}>
                            <PrimaryButton 
                                onButtonClick={this.props.showAddOwnersModal}
                                buttonText="Add Owners"
                            />
                        </div>
                        :
                        null
                    }
                </div>
                <div className="refier-card-style" style={{ marginTop: "10px" }}>
                    <Grid fluid className="refier_custom_header_light_gray">
                        <Row
                            className="refier_custom_headertext_light_gray_medium">
                            <Col xs={12} style={{ textAlign: "left" }}>
                                Experts
                            </Col>
                        </Row>
                    </Grid>
                    {expertslist && expertslist.length > 0 ?
                        <div style={{ padding: "5px", textAlign: "left" }}>
                            {expertslist}
                        </div>
                        :
                        <div>
                            <div style={{ padding: "5px", textAlign: "left" }}
                                className="custom-list-sub-content">
                                No Experts Present
                            </div>
                        </div>
                    }
                    {this.props.isUserOwner == "True" ?
                        <div style={{margin: '10px'}}>
                            <PrimaryButton 
                                onButtonClick={this.props.showAddExpertsModal}
                                buttonText="Add Experts"
                            />
                        </div>
                        :
                        null
                    }
                </div>
                <CommonModal
					showModal={this.state.showModal}
					close={this.closeDescriptionModal}
					modalHeading="Edit Group Description"
                    modalBody={modalBody}
                    onSaveModal={this.onSaveDescription}
                    isSaveButton={true}
                    onEditDescription={this.onEditDescription}
				/>
            </div>
        )
    }
}