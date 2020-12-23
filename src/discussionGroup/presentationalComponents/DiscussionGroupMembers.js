import React, { Component } from 'react'
import { Col, Row, Grid, Nav, NavItem, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import DiscussionGroupIndividualMember from './DiscussionGroupIndividualMember'
import ComponentsModal from '../../shared/CommonModal'
import RemovingMemberModal from './RemovingMemberModal';


export default class DiscussionGroupMembers extends Component{
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            joiningId: undefined,
            joiningMember:"",
        }
        this.setJoiningId = this.setJoiningId.bind(this)
        this.setJoiningMember = this.setJoiningMember.bind(this)
        this.showLeaveRoomModal = this.showLeaveRoomModal.bind(this)
        this.hideLeaveRoomModal = this.hideLeaveRoomModal.bind(this)
    }

    showLeaveRoomModal() {
        this.setState({showModal: true})
    }

    hideLeaveRoomModal() {
        this.setState({showModal: false})
    }

    setJoiningId(joiningId) {
        this.setState({joiningId})
    }

    setJoiningMember(name) {
        this.setState({joiningMember:name})
    }


    render() {
        // console.log("DiscussionGroupMembers :: ", this.props);

        let group_experts, group_owners, group_members, ownerslist, expertslist, membersList
        if (!this.props.groupMembers) {
            return null
        }
        let experts_owners_json = this.props.groupMembers
        group_experts = []
        group_owners = []
        group_members=[]
        
        Object.keys(experts_owners_json).forEach(function(i){
            // console.log('experts_owners_json', experts_owners_json[i]);
            if (experts_owners_json[i].fields.isOwner) {
                if (!ownerslist) {
                    ownerslist = []
                }
                group_owners.push(experts_owners_json[i])
                let member_details = experts_owners_json[i].fields.member.member_details
                let name = (member_details.last_name &&
                    member_details.last_name != "Null" &&
                    member_details.last_name != "None") ?
                    (member_details.first_name + " " + member_details.last_name)
                    :
                    member_details.first_name
                let photo = member_details.profile_photo
                ownerslist.push(
                    <DiscussionGroupIndividualMember
                        key={i}    
                        member_details={member_details}
                        name={name}
                        joiningId={experts_owners_json[i].pk}
                        setJoiningId={this.setJoiningId}
                        setJoiningMember={this.setJoiningMember}
                        showLeaveRoomModal={this.showLeaveRoomModal}
                        isUserOwner={this.props.isUserOwner}/>
                )
            }
            else if (experts_owners_json[i].fields.isExpert) {
                group_experts.push(experts_owners_json[i])
                if (expertslist == undefined) {
                    expertslist = []
                }
                let member_details = experts_owners_json[i].fields.member.member_details
                let name = (member_details.last_name &&
                    member_details.last_name != "Null" &&
                    member_details.last_name != "None") ?
                    (member_details.first_name + " " + member_details.last_name)
                    :
                    member_details.first_name
                let photo = member_details.profile_photo
                expertslist.push(
                        <DiscussionGroupIndividualMember
                            key={i}    
                            member_details={member_details}
                            name={name}
                            joiningId={experts_owners_json[i].pk}
                            setJoiningId={this.setJoiningId}
                            setJoiningMember={this.setJoiningMember}
                            showLeaveRoomModal={this.showLeaveRoomModal}
                            isUserOwner={this.props.isUserOwner}/>
                )
            }
            else {
                group_members.push(experts_owners_json[i])
                if (membersList == undefined) {
                    membersList = []
                }
                let member_details = experts_owners_json[i].fields.member.member_details
                let name = (member_details.last_name &&
                    member_details.last_name != "Null" &&
                    member_details.last_name != "None") ?
                    (member_details.first_name + " " + member_details.last_name)
                    :
                    member_details.first_name
                let photo = member_details.profile_photo
                membersList.push(
                    <DiscussionGroupIndividualMember
                        key={i}
                        member_details={member_details}
                        name={name}
                        joiningId={experts_owners_json[i].pk}
                        setJoiningId={this.setJoiningId}
                        setJoiningMember={this.setJoiningMember}
                        showLeaveRoomModal={this.showLeaveRoomModal}
                        isUserOwner={this.props.isUserOwner}/>
                )
            }
        }.bind(this))
        

        let number = (ownerslist ? ownerslist.length : 0) + (expertslist ? expertslist.length : 0) + 
            (membersList ? membersList.length : 0)
        
        
        let modalRemovingMember = <RemovingMemberModal joiningId={this.state.joiningId}
            joiningMember={this.state.joiningMember}
            hideLeaveRoomModal={this.hideLeaveRoomModal.bind(this)}
            groupId={this.props.groupId}/>

        return (
            <div style={{ paddingBottom: "10px" }}>
                <Grid fluid className="refier_custom_header_light_gray">
                        <Row
                        className="refier_custom_headertext_light_gray_medium"
                        style={{display:"flex", alignItems:"center"}}>
                        <Col xs={9} style={{textAlign:"left"}}>
                        MEMBERS ({number})
                        </Col>
                        <Col xs={3}  style={{textAlign:"right"}} onClick={this.props.showAddMembersModal}>
                            {this.props.isUserOwner == "True"?
                                <Button
                                    className="refier_custom_icon_button">
                                    <FontAwesome
                                        name="pencil"
                                        style={{
                                            "cursor": "pointer"
                                        }}
                                    />
                                </Button>
                                :
                                null
                            }
                        </Col>
                    </Row>
                    
                </Grid>
                <div style={{ padding: "5px", textAlign:"left", marginTop:"10px"}}>
                    {ownerslist}
                </div>
                {/* <h4
                    style={{ paddingTop: "10px", textAlign:"center", color:"#797979"}}>
                    Experts ({expertslist?expertslist.length:0})
                </h4> */}
                <div style={{ padding: "5px", textAlign:"left"}}>
                    {expertslist}
                </div>
                {/* <h4
                    style={{ paddingTop: "10px", textAlign:"center",color:"#797979"}}>
                    Members ({membersList?membersList.length:0})
                </h4> */}
                <div style={{ padding: "5px", textAlign:"left"}}>
                    {membersList}
                </div>
                <ComponentsModal
                        showModal={this.state.showModal}
                        close={this.hideLeaveRoomModal}
                        modalHeading={"Removing Member"}
                        modalBody={modalRemovingMember}
                    />
            </div>
        )
    }
}