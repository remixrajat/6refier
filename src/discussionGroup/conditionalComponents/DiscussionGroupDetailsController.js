import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getStudentAndTeacherList } from "../../servicepage/conditionalcomponents/action";
import { getCommunityMentorsOwners } from "../../communitypage/conditionalcomponents/action"
import { addOrUpdateRoomMembers, addOrUpdateRoom, getGroupDetails } from "./action"
import DiscussionGroupDetails from '../presentationalComponents/DiscussionGroupDetails'
import AddMembersToGroup from '../presentationalComponents/AddMembersToGroup'
import AddOwnersToGroup from '../presentationalComponents/AddOwnersToGroup'
import DiscussionGroupMembers from '../presentationalComponents/DiscussionGroupMembers'
import AddExpertsToGroup from '../presentationalComponents/AddExpertsToGroup';

import { COMMUNITY_LABEL, getCommunityLabel } from '../../GlobalConstants';
import ComponentsModal from '../../shared/CommonModal'


class DiscussionGroupDetailsController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addMembersModal: false,
            addOwnersModal: false,
            addExpertsModal: false,
            communitylabels: COMMUNITY_LABEL.community,
            isAddMembersClicked: false,
			imageUploadProgress: 0
        }
        this.closeAddMembersModal = this.closeAddMembersModal.bind(this)
        this.showAddMembersModal = this.showAddMembersModal.bind(this)
        this.closeAddOwnersModal = this.closeAddOwnersModal.bind(this)
        this.showAddOwnersModal = this.showAddOwnersModal.bind(this)
        this.closeAddExpertsModal = this.closeAddExpertsModal.bind(this)
        this.showAddExpertsModal = this.showAddExpertsModal.bind(this)

        this.onResponseAddMembers = this.onResponseAddMembers.bind(this)
        this.onRequestAddMembers = this.onRequestAddMembers.bind(this)
        this.onAddSelected = this.onAddSelected.bind(this)

		this.submitEntityProfilePicture = this.submitEntityProfilePicture.bind(this)
		this.imageUploadFailed = this.imageUploadFailed.bind(this)
		this.imageUploadProgress = this.imageUploadProgress.bind(this)
		this.imageUploadSuccess = this.imageUploadSuccess.bind(this)
		this.imageUploadReset = this.imageUploadReset.bind(this)
    }


    componentDidMount() {
        if (this.props.communityId) {
            this.props.dispatch(getStudentAndTeacherList(this.props.communityId));
            this.props.dispatch(getCommunityMentorsOwners(this.props.communityId));
            this.setCommunityLabel(this.props.communityGenericType);
        }
    }

    onRequestAddMembers() {
        this.setState({ isAddMembersClicked: true })
    }

    onResponseAddMembers() {
        this.setState({ isAddMembersClicked: false })
    }

    closeAddMembersModal() {
        this.setState({ addMembersModal: false })
    }

    showAddMembersModal() {
        this.setState({ addMembersModal: true })
    }

    closeAddExpertsModal() {
        this.setState({ addExpertsModal: false })
    }

    showAddExpertsModal() {
        this.setState({ addExpertsModal: true })
    }

    closeAddOwnersModal() {
        this.setState({ addOwnersModal: false })
    }

    showAddOwnersModal() {
        this.setState({ addOwnersModal: true })
    }

    removingMemberinProgress() {
        this.setState({ isRemovingMember: 2 })
    }

    removingMemberSuccessful() {
        this.setState({ isRemovingMember: 1 })
    }

    removingMemberFailed() {
        this.setState({ isRemovingMember: -1 })
    }

    removingMemberReset() {
        this.setState({ isRemovingMember: 0 })
    }

    setCommunityLabel(communityType) {
        let communityLabel = getCommunityLabel(communityType)
        this.setState({ communitylabels: communityLabel })
    }

    onAddSelected(addedStudentMembers, addedTeacherMembers, addedExpertMembers, isExpertOrOwner) {
        this.onRequestAddMembers()
        let addedMembers = []
        addedMembers = addedStudentMembers.concat(addedTeacherMembers)
        addedMembers = addedMembers.concat(addedExpertMembers)
        // console.log("DiscussionGroupDetailsController::Added Members List", addedMembers, this.state.eventId,
            // isExpertOrOwner)
        let jsonMembers = JSON.stringify(addedMembers)
        let returnPromise = this.props.dispatch(addOrUpdateRoomMembers
            (this.props.groupId, this.props.communityId, jsonMembers, isExpertOrOwner));
        returnPromise.then((response) => {
            if (response) {
                // console.log("DiscussionGroupDetailsController::onAddSelected::response", response)
                if (response) {
                    this.props.dispatch({ type: 'getGroupMembers', data: response });
                    this.props.dispatch(getGroupDetails(this.props.groupId))
                }
            }
            this.onResponseAddMembers()
        })
    }

	imageUploadReset(){
		this.setState({imageUploadProgress: 0})
	}

	imageUploadFailed(){
		this.setState({imageUploadProgress: -1})
	}

	imageUploadSuccess(){
		this.setState({imageUploadProgress: 1})
	}

	imageUploadProgress(){
		this.setState({imageUploadProgress: 2})
    }

    submitEntityProfilePicture(formdata) {
        if (this.props.groupDetails && this.props.groupDetails.fields.isOwner) {
            this.imageUploadProgress();
            
            formdata.append('group_id', this.props.match.params.groupId);
            const updateRoomPromise = this.props.dispatch(addOrUpdateRoom(formdata));

            updateRoomPromise.then((resp) => {
                let status = 0
                if(typeof resp == "undefined" || resp === "False")  status = -1;
                else if(resp === "True" || resp === 1) status = 1;
                
                if(status === 1)
                    this.imageUploadSuccess()
                else this.imageUploadFailed()
            })
		}
	}


    render() {
        // console.log("DiscussionGroupDetailsController:: props", this.props)

        let modalBodyState = <AddMembersToGroup {...this.props}
            communityTreeStructure={
                this.props.communityTreeStructureState ?
                    this.props.communityTreeStructureState : null
            }
            teacherStructureState={
                this.props.teacherStructureState ?
                    this.props.teacherStructureState : null
            }
            communitylabels={
                this.state.communitylabels}
            onAddSelected={
                this.onAddSelected
            }
        />

        let modalBodyOwner = <AddOwnersToGroup {...this.props}
            communityTreeStructure={
                this.props.communityTreeStructureState ?
                    this.props.communityTreeStructureState : null
            }
            teacherStructureState={
                this.props.teacherStructureState ?
                    this.props.teacherStructureState : null
            }
            communitylabels={
                this.state.communitylabels}
            onAddSelected={
                this.onAddSelected
            }
        />

        let modalBodyExpert = <AddExpertsToGroup {...this.props}
            communityTreeStructure={
                this.props.communityTreeStructureState ?
                    this.props.communityTreeStructureState : null
            }
            teacherStructureState={
                this.props.teacherStructureState ?
                    this.props.teacherStructureState : null
            }
            communitylabels={
                this.state.communitylabels}
            onAddSelected={
                this.onAddSelected
            }
            communityMentorsOwners={this.props.communityMentorsOwners}
        />

        if (this.props.isDetails === true && this.props.isMembers === false) {
            return (
                <div>
                    <DiscussionGroupDetails {...this.props}
                        showAddOwnersModal={this.showAddOwnersModal}
                        showAddMembersModal={this.showAddMembersModal}
                        showAddExpertsModal={this.showAddExpertsModal} 
                        imageUploadProgress={this.state.imageUploadProgress}
                        imageUploadReset={this.imageUploadReset}
    					submitProfilePicture={this.submitEntityProfilePicture} />

                    <ComponentsModal
                        showModal={this.state.addMembersModal}
                        close={this.closeAddMembersModal}
                        modalHeading={"Add Discussion Group Members"}
                        modalBody={modalBodyState}
                    />
                    <ComponentsModal
                        showModal={this.state.addOwnersModal}
                        close={this.closeAddOwnersModal}
                        modalHeading={"Add Discussion Group Owners"}
                        modalBody={modalBodyOwner}
                    />

                    <ComponentsModal
                        showModal={this.state.addExpertsModal}
                        close={this.closeAddExpertsModal}
                        modalHeading={"Add Discussion Group Experts"}
                        modalBody={modalBodyExpert}
                    />
                </div>
            )
        } else if (this.props.isDetails === false && this.props.isMembers === true) {
            return (
                <div>
                    <DiscussionGroupMembers {...this.props}
                        showAddMembersModal={this.showAddMembersModal} />
                    <ComponentsModal
                        showModal={this.state.addMembersModal}
                        close={this.closeAddMembersModal}
                        modalHeading={"Add Discussion Group Members"}
                        modalBody={modalBodyState}
                    />
                </div>
            )
        }
    }
}

var mapStateToProps = (store, ownProps) => {
    let community_generic_type = "school";
    for (let communityList in store.appDataReducer.communityListStateMemberOnly) {
        if (ownProps.communityId === store.appDataReducer.communityListStateMemberOnly[communityList].pk) {
            community_generic_type = store.appDataReducer.communityListStateMemberOnly[communityList].fields.generic_type;
        }
    }
    return {
        communityTreeStructureState: store.serviceDataReducer.studentTreeStructureState,
        teacherStructureState: store.serviceDataReducer.teacherTreeStructureState,
        communityGenericType: community_generic_type,
        communityMentorsOwners: store.communityPageDataReducer.communityMentorsOwners
    }
}

export default connect(mapStateToProps)(DiscussionGroupDetailsController);