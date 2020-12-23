import React, { Component } from "react";
import "redux";
import { connect } from "react-redux";

import ServicePageTemplateController from "./ServicePageTemplateController";
import {
  getServiceData, sendEventForApproval, getEventsData, getApplicationsReceived,
  getStudentAndTeacherList, addMembersToEvent, setEventEligibilityList,
  getCommunityPackagesAsOwner, getGeneratedEventURL, sendReminderMails
} from "./action";
import { 
  getTagsList, getCommunitySkillsList, getCommunityPackagesMarketPlace,
  getPackageAssessmentSkill, getAllSkillAndTag,
  getCompanySkillEntityMapping, getUserEntitySkills
} from "../../dashboardpage/conditionalcomponents/action";

import AddMembersToEventModal from '../presentationalcomponents/AddMembersToEvent'
import MembersEligibleForEvent from '../presentationalcomponents/MembersEligibleForEvent'
import AddSkillsToCompany from "./AddSkillsToCompanyController";
import AttendeeDetailsController from "./AttendeeDetailsController";

import ComponentsModal from "../../shared/CommonModal";
import { COMMUNITY_LABEL } from '../../GlobalConstants';


class ServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addMembersModal: false,
      addPresentersModal: false,
      eligibilityModal: false,
      members: [],
      countOfMembers: 0,
      event_status: true,
      eligibleMembers: [],
      serviceCounterLoading: true,
      serviceTrackerLoading: true,
      applicationsLoading: true,
      eventId: null,
      isAddMembersClicked: false,
      isSetEligibleMembersClicked: false,
      application:[],
      applicationApproved: [],
      communitylabels: COMMUNITY_LABEL.school,
      reminderEventId: null,
      reminderStatus: 0,
      defineSkillsModal: false,
      packageIdList: [],
      attendeeDetailModalState: false,
      currentAttendeeSessionDetails: '',
      openPresenterParticipantModal: false
    };

    this.openAddMembersModal = this.openAddMembersModal.bind(this);
    this.closeAddMembersModal = this.closeAddMembersModal.bind(this);
    this.setMembers = this.setMembers.bind(this);
    this.setEventId = this.setEventId.bind(this);
    this.toggleServiceCounterLoading = this.toggleServiceCounterLoading.bind(this)
    this.toggleServiceTrackerLoading = this.toggleServiceTrackerLoading.bind(this)
    this.toggleApplicationsLoading = this.toggleApplicationsLoading.bind(this)
    this.onApprove = this.onApprove.bind(this)
    this.onAddSelected = this.onAddSelected.bind(this)
    this.setEligibility = this.setEligibility.bind(this)
    this.onNotify = this.onNotify.bind(this)
    this.setEligibleMembers = this.setEligibleMembers.bind(this)
    this.showEligibilityModal = this.showEligibilityModal.bind(this)
    this.closeEligibilityModal = this.closeEligibilityModal.bind(this)
    this.onRequestAddMembers = this.onRequestAddMembers.bind(this)
    this.onResponseAddMembers = this.onResponseAddMembers.bind(this)
    this.onRequestSetMembersEligible = this.onRequestSetMembersEligible.bind(this)
    this.onResponseSetMembersEligible = this.onResponseSetMembersEligible.bind(this)
    this.setApplication = this.setApplication.bind(this)
    this.appendToApplicationApproved = this.appendToApplicationApproved.bind(this)
    this.setCountOfMembers = this.setCountOfMembers.bind(this)
    this.setStatus = this.setStatus.bind(this)
    this.generateEventURL = this.generateEventURL.bind(this)
    this.sendReminderMails = this.sendReminderMails.bind(this)
    this.openAddPresentersModal = this.openAddPresentersModal.bind(this)
    this.closeAddPresentersModal = this.closeAddPresentersModal.bind(this)
    this.openDefineSkillsModal = this.openDefineSkillsModal.bind(this)
    this.closeDefineSkillsModal = this.closeDefineSkillsModal.bind(this)
		this.getWriteAccess = this.getWriteAccess.bind(this);
    this.openAttendeeDetailModal = this.openAttendeeDetailModal.bind(this)
    this.closeAttendeeDetailModal = this.closeAttendeeDetailModal.bind(this)
    this.openAddParticipantPresenterModal = this.openAddParticipantPresenterModal.bind(this)
    this.closeAddParticipantPresenterModal = this.closeAddParticipantPresenterModal.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getServiceData(this.props.match.params.communityId));
    this.props.dispatch(getEventsData(this.props.match.params.communityId));
    this.props.dispatch(getApplicationsReceived(this.props.match.params.communityId));
    this.props.dispatch(getStudentAndTeacherList(this.props.match.params.communityId));
    this.props.dispatch(getCommunityPackagesAsOwner(this.props.match.params.communityId));
    this.props.dispatch(getTagsList())
    this.props.dispatch(getCommunitySkillsList(this.props.match.params.communityId))
    this.props.dispatch(getCommunitySkillsList(this.props.match.params.communityId, true))
    this.props.dispatch(getCommunityPackagesMarketPlace(this.props.match.params.communityId))
    this.props.dispatch(getCompanySkillEntityMapping(this.props.match.params.communityId))
    this.props.dispatch(getAllSkillAndTag(this.props.match.params.communityId))
    this.props.dispatch(getUserEntitySkills(this.props.match.params.communityId))
    this.setCommunityLabel(this.props.communityGenericType);

		if(this.props.communityPackagesAsOwner) {
			let packageIdList = []
			
			for(let course of this.props.communityPackagesAsOwner) {
				packageIdList.push(course['pk'])
			}

			this.setState({ packageIdList }, () => {
				// console.log("AddSkillsToPackage log", this.state.packageIdList)
				this.props.dispatch(getPackageAssessmentSkill(
					this.props.match.params.communityId, JSON.stringify(this.state.packageIdList)))
			})
		}
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.communityGenericType !== nextProps.communityGenericType) {
        this.setCommunityLabel(this.props.communityGenericType);
    }

    // optimize this block. it launches multiple times
    if(nextProps.communityPackagesAsOwner) {
    // if((this.props.communityPackagesAsOwner === 'undefined' && nextProps.communityPackagesAsOwner) ||
    //     (nextProps.communityPackagesAsOwner.length > this.props.communityPackagesAsOwner.length)) {
      let packageIdList = []
			
			for(let course of nextProps.communityPackagesAsOwner) {
				packageIdList.push(course['pk'])
			}

			this.setState({ packageIdList }, () => {
				// console.log("AddSkillsToPackage log", this.state.packageIdList)
				this.props.dispatch(getPackageAssessmentSkill(
					this.props.match.params.communityId, JSON.stringify(this.state.packageIdList)))
			})
		}
  }

  openAddParticipantPresenterModal(members, eventId, count, status) {
    if (members != null)
      this.setMembers(members)
    if (eventId != null)
      this.setEventId(eventId)
    if (count != null)
      this.setCountOfMembers(count)
    if (status != null)
      this.setStatus(status)
    this.setState({ openPresenterParticipantModal: true });
  }

  openAddMembersModal(members, eventId, count, status) {
    if (members != null)
      this.setMembers(members)
    if (eventId != null)
      this.setEventId(eventId)
    if (count != null)
      this.setCountOfMembers(count)
    if (status != null)
      this.setStatus(status)
    this.setState({ addMembersModal: true });
  }

  openAddPresentersModal(members, eventId, count, status) {
    if (members != null)
      this.setMembers(members)
    if (eventId != null)
      this.setEventId(eventId)
    if (count != null)
      this.setCountOfMembers(count)
    if (status != null)
      this.setStatus(status)
    this.setState({ addPresentersModal: true });
  }

  showEligibilityModal(members, eventId,status) {
    if (members != null)
      this.setEligibleMembers(members)
    if (eventId != null)
      this.setEventId(eventId)
    if(status != null)
      this.setStatus(status)
    this.setState({ eligibilityModal: true });
  }

  closeAddParticipantPresenterModal() {
    this.setState({ openPresenterParticipantModal: false });
  }

  closeAddMembersModal() {
    this.setState({ addMembersModal: false });
  }

  closeAddPresentersModal() {
    this.setState({ addPresentersModal: false });
  }

  openDefineSkillsModal() {
    this.setState({ defineSkillsModal: true });
  }

  closeDefineSkillsModal() {
    this.setState({ defineSkillsModal: false });
  }
    
  getWriteAccess() {
      return true;
  }

  closeEligibilityModal() {
    this.setState({ eligibilityModal: false })
  }

  setMembers(serviceMembers) {
    this.setState({ members: serviceMembers });
  }

  setStatus(status){
    if(status == "Scheduled")
      this.setState({event_status:true})
    else
      this.setState({event_status:false})
  }

  setEligibleMembers(members) {
    this.setState({ eligibleMembers: members })
  }

  setCountOfMembers(count){
    this.setState({countOfMembers:count})
  }

  setEventId(id) {
    this.setState({ eventId: id });
  }

  toggleServiceCounterLoading() {
    this.setState({ serviceCounterLoading: !this.state.serviceCounterLoading })
  }

  toggleServiceTrackerLoading() {
    this.setState({ serviceTrackerLoading: !this.state.serviceTrackerLoading })
  }

  toggleApplicationsLoading() {
    this.setState({ applicationsLoading: !this.state.applicationsLoading })
  }

  onRequestAddMembers() {
    this.setState({ isAddMembersClicked: true })
  }

  onResponseAddMembers() {
    this.setState({ isAddMembersClicked: false })
  }

  onRequestSetMembersEligible() {
    this.setState({ isSetEligibleMembersClicked: true })
  }

  onResponseSetMembersEligible() {
    this.setState({ isSetEligibleMembersClicked: false })
  }

  openAttendeeDetailModal(sessionId) {
    this.setState({ 
      attendeeDetailModalState: true, 
      currentAttendeeSessionDetails: sessionId})
  }

  closeAttendeeDetailModal() {
    this.setState({ attendeeDetailModalState: false })
  }

  setCommunityLabel(communityType) {
    // console.log("setCommunityLabel :: ", communityType)
    if ("school" === communityType.toLowerCase()) {
        this.setState({ communitylabels: COMMUNITY_LABEL.school });
    } else if ("ngo" === communityType.toLowerCase()) {
        this.setState({ communitylabels: COMMUNITY_LABEL.ngo })
    } else if ("college" === communityType.toLowerCase()) {
        this.setState({ communitylabels: COMMUNITY_LABEL.college })
    } else if ("institute" === communityType.toLowerCase()) {
        this.setState({ communitylabels: COMMUNITY_LABEL.institutions })
    } else if ("corporate" === communityType.toLowerCase()) {
        this.setState({ communitylabels: COMMUNITY_LABEL.corporate })
    }else if ("training" === communityType.toLowerCase()) {
      this.setState({ communitylabels: COMMUNITY_LABEL.training })
    }else if ("community" === communityType.toLowerCase()) {
      this.setState({ communitylabels: COMMUNITY_LABEL.community })
    }
  }

  setApplication(pk){
    let application = this.state.application
    application.push(pk)
    this.setState({application:application})
  }


  appendToApplicationApproved(pk){
    let approvedApplications = this.state.applicationApproved
    approvedApplications.push(pk)
    this.setState({applicationApproved:approvedApplications})
  }

  onApprove(pk) {
    // console.log("Approve button pressed ", pk)
    this.setApplication(pk)
    let returnPromise = this.props.dispatch(sendEventForApproval(pk, this.props.match.params.communityId));
    returnPromise.then((response) => {
      if (response) {
        this.appendToApplicationApproved(pk)
        let serviceTrackerData = (response.service_tracker)
        let applicationsData = (response.application_status)
        //console.log("******Response from server: ", data);
        //console.log("*****n", serviceTrackerData);
        this.props.dispatch({ type: "getApplicationsReceived", data: applicationsData });
        this.props.dispatch({ type: "setEventTrackerState", data: serviceTrackerData });
      }
        
    })
  }

  onAddSelected(addedStudentMembers, addedTeacherMembers, type) {
    this.onRequestAddMembers()
    let addedMembers = []
    addedMembers = addedStudentMembers.concat(addedTeacherMembers)
    //console.log("Added Members List", addedMembers,this.state.eventId)
    let jsonMembers = JSON.stringify(addedMembers)
    let memberType = type ? type : 'viewer'
    let returnPromise = this.props.dispatch(addMembersToEvent
      (jsonMembers, this.state.eventId, this.props.match.params.communityId, memberType));
    returnPromise.then((response) => {
      if (response) {
        console.log("ServicePage::onAddSelected::response", response)
        if (response.service_tracker) {
          let serviceTrackerData = (response.service_tracker)
          this.props.dispatch({ type: "setEventTrackerState", data: serviceTrackerData });
        }
      }
      this.onResponseAddMembers()
    })
  }

  

  setEligibility(addedStudentMembers, addedTeacherMembers, for_all) {
    this.onRequestSetMembersEligible()
    let addedMembers = []
    addedMembers = addedStudentMembers.concat(addedTeacherMembers)
    // console.log("ServicePage::setEligibility::Members", addedMembers, this.state.eventId)
    let jsonMembers = JSON.stringify(addedMembers)
    let returnPromise = this.props.dispatch(setEventEligibilityList
      (jsonMembers, this.state.eventId, for_all, this.props.match.params.communityId));
    returnPromise.then((response) => {
      if (response) {
        // console.log("ServicePage::setEligibility::response", response)
        if (response.service_tracker) {
          let serviceTrackerData = (response.service_tracker)
          this.props.dispatch({ type: "setEventTrackerState", data: serviceTrackerData });
        }
      }
      this.onResponseSetMembersEligible()
    })
  }

  sendReminderMails(val) {
    this.setState({reminderEventId:val, reminderStatus: 2})
    let returnPromise = this.props.dispatch(sendReminderMails(val))
    let self = this
    returnPromise.then((response) => {
      // console.log("ServicePage::sendReminderMails::response", response)
      if (response) {
        self.setState({reminderStatus:1})
      } else {
        self.setState({reminderStatus:-1})
      }
    })
  }

  onNotify() {
    //console.log("on Notification to all of Event", this.state.eventId)
    // this.props.dispatch(addMembersToEvent(addedMembers,this.props.match.params.communityId,eventId));
  }

  addKeyValuesToObject(node, nodeIdNameObject) {
    if (node.children != null) {
      for (let i = 0; i < node.children.length; i++) {
        this.addKeyValuesToObject(node.children[i], nodeIdNameObject)
      }
    }
    nodeIdNameObject[node.value] = node.path
  }

  findEventMembers() {
    //console.log("eventMembers - findEventId", this.state.eventId)
    let eventMembers = []
    let eventPresenters = []
    let eventPresenterParticipant = []

    if (this.state.eventId) {
      //console.log("eventMembers - eventId",this.state.eventId)
      if (this.props.eventTrackerState) {
        //console.log("eventMembers - eventTrackerState",this.props.eventTrackerState)
        for (let event in this.props.eventTrackerState) {
          //console.log("eventMembers - event", event)
          for (let i = 0; i < this.props.eventTrackerState[event].length; i++) {
            //console.log("eventMembers - events in particular event",this.props.eventTrackerState[event])
            if (this.props.eventTrackerState[event][i].pk === this.state.eventId) {
              for (let j = 0; j < this.props.eventTrackerState[event][i].fields.application_count.length; j++) {
                //console.log("eventMembers - applications for an event",
                //  this.props.eventTrackerState[event][i].fields.application_count[j])
                if (this.props.eventTrackerState[event][i].fields.application_count[j].fields.applicant_type ==
                  'viewer') {
                  eventMembers.push(
                    this.props.eventTrackerState[event][i].fields.application_count[j].fields.applicant_id
                  )
                }
                else if(this.props.eventTrackerState[event][i].fields.application_count[j].fields.applicant_type ==
                  'presenter') {
                    eventPresenters.push(
                      this.props.eventTrackerState[event][i].fields.application_count[j].fields.applicant_id
                  )
                }
                else if(this.props.eventTrackerState[event][i].fields.application_count[j].fields.applicant_type ==
                  'presenter_participant') {
                    eventPresenterParticipant.push(
                      this.props.eventTrackerState[event][i].fields.application_count[j].fields.applicant_id
                  )
                }
              }
            }
          }
        }
      }
    }

    let members = {}
    members["viewers"] = eventMembers
    members["presenters"] = eventPresenters
    members["presenter_participant"] = eventPresenterParticipant

    return members
  }

  findEligibility() {
    //console.log("eventMembers - findEventId", this.state.eventId)

    let eventEligibleObject = {}
    let eventEligibleMembers = []
    let for_all = false
    if (this.state.eventId) {
      //console.log("eventMembers - eventId",this.state.eventId)
      if (this.props.eventTrackerState) {
        //console.log("eventMembers - eventTrackerState",this.props.eventTrackerState)
        for (let event in this.props.eventTrackerState) {
          //console.log("eventMembers - event", event)
          for (let i = 0; i < this.props.eventTrackerState[event].length; i++) {
            //console.log("eventMembers - events in particular event",this.props.eventTrackerState[event])
            if (this.props.eventTrackerState[event][i].pk === this.state.eventId) {
              let eligibility_list = JSON.parse(this.props.eventTrackerState[event][i].fields.eligibility_list)
              for (let j = 0; j < eligibility_list.length; j++) {
                //console.log("eventMembers - applications for an event",
                //  this.props.eventTrackerState[event][i].fields.application_count[j])
                let value_for_all = eligibility_list[j].fields.for_all
                if (value_for_all) {
                  eventEligibleObject["for_all"] = true
                  eventEligibleObject["eligible_members"] = undefined
                  return eventEligibleObject
                }
                if (eligibility_list[j].fields.user_id != null) {
                  eventEligibleMembers.push(
                    eligibility_list[j].fields.user_id)
                }
              }
            }
          }
        }
      }
    }
    eventEligibleObject["for_all"] = false
    eventEligibleObject["eligible_members"] = eventEligibleMembers
    return eventEligibleObject
  }
  
	generateEventURL(mappingID, isPackage=false) {
    // console.log({mappingID, isPackage})
		this.props.dispatch(getGeneratedEventURL(mappingID, this.props.match.params.communityId, isPackage))
	}


  render() {
    // console.log("ServicePage : props", this.props);

    let nodeIdNameObject = {}
    
    if (this.props.communityTreeStructureState) {
      for (let i = 0; i < this.props.communityTreeStructureState.length; i++) {
        this.addKeyValuesToObject(this.props.communityTreeStructureState[i], nodeIdNameObject)
      }
    }

    if (this.props.teacherStructureState) {
      for (let i = 0; i < this.props.teacherStructureState.length; i++) {
        this.addKeyValuesToObject(this.props.teacherStructureState[i], nodeIdNameObject)
      }
    }
    //console.log("nodeIdNameObject",nodeIdNameObject)

    let members = this.findEventMembers()
    let eventMembers =  members["viewers"]
    let eventPresenters = members["presenters"]
    let eventPresenterParticipant = members["presenter_participant"]
    //console.log("eventMembers",eventMembers)
    let eventEligibility = this.findEligibility()
    // console.log("eventEligibility", eventEligibility)
    let modifiedEventEligibility = []
    let for_all

    if (eventEligibility) {
      for_all = false
      if (eventEligibility.eligible_members != undefined) {
        modifiedEventEligibility = eventEligibility.eligible_members
      }
      if (eventEligibility.for_all) {
        for_all = true
      }
    }

    let presenterParticipantModal = <AddMembersToEventModal members={eventPresenterParticipant}
        communityTreeStructure={
          this.props.communityTreeStructureState ?
            this.props.communityTreeStructureState : null
        }
        teacherStructureState={
          this.props.teacherStructureState ?
            this.props.teacherStructureState : null
        }
        nodeIdNameObject={nodeIdNameObject}
        onAddSelected={this.onAddSelected}
        onNotify={this.onNotify}
        isAddMembersClicked={this.state.isAddMembersClicked}
        // countOfMembers={this.state.countOfMembers || 300}
        countOfMembers={300}
        event_status={this.state.event_status}
        communitylabels={this.state.communitylabels}
        type='presenter_participant'/>

    let modalBodyState = <AddMembersToEventModal members={eventMembers}
        communityTreeStructure={
          this.props.communityTreeStructureState ?
            this.props.communityTreeStructureState : null
        }
        teacherStructureState={
          this.props.teacherStructureState ?
            this.props.teacherStructureState : null
        }
        nodeIdNameObject={nodeIdNameObject}
        onAddSelected={this.onAddSelected}
        onNotify={this.onNotify}
        isAddMembersClicked={this.state.isAddMembersClicked}
        countOfMembers={this.state.countOfMembers}
        event_status={this.state.event_status}
        communitylabels={this.state.communitylabels}
        type='viewer'/>
    
    let presenterModalBodyState = <AddMembersToEventModal members={eventPresenters}
        communityTreeStructure={
          this.props.communityTreeStructureState ?
            this.props.communityTreeStructureState : null
        }
        teacherStructureState={
          this.props.teacherStructureState ?
            this.props.teacherStructureState : null
        }
        nodeIdNameObject={nodeIdNameObject}
        onAddSelected={this.onAddSelected}
        onNotify={this.onNotify}
        isAddMembersClicked={this.state.isAddMembersClicked}
        countOfMembers={this.state.countOfMembers}
        event_status={this.state.event_status}
        communitylabels={this.state.communitylabels}
        type='presenter'/>

    let eligibilityModalBodyState = <MembersEligibleForEvent members={modifiedEventEligibility}
      communityTreeStructure={
        this.props.communityTreeStructureState ?
          this.props.communityTreeStructureState : null
      }
      teacherStructureState={
        this.props.teacherStructureState ?
          this.props.teacherStructureState : null
      }
      nodeIdNameObject={nodeIdNameObject}
      setEligibility={this.setEligibility}
      onNotify={this.onNotify}
      for_all={for_all}
      isSetEligibleMembersClicked={this.state.isSetEligibleMembersClicked}
      event_status={this.state.event_status}
      communitylabels={this.state.communitylabels} />


    let companySkillsBodyState = <AddSkillsToCompany 
      writeAccess={this.getWriteAccess}
      iconName="star-o" 
      profileTags={this.props.getCommunitySkills ? this.props.getCommunitySkills : ""} 
      className="refier_custom_panel_light_gray"
      name="Expertise" objectPropName="skills"
      communityId={this.props.match.params.communityId}
      communityTreeStructureState={this.props.communityTreeStructureState}
    />

    let attendeeDetails = <AttendeeDetailsController 
      sessionId={this.state.currentAttendeeSessionDetails}
      communityId={this.props.match.params.communityId}
    />

    return (
      <div>
        <ServicePageTemplateController
          serviceData={
            this.props.serviceDetails ? this.props.serviceDetails : null
          }
          eventsDetails={
            this.props.eventTrackerState ? this.props.eventTrackerState : null
          }
          applicationsReceived={
            this.props.applicationsReceivedState ? this.props.applicationsReceivedState : null
          }
          onAddButtonClick={this.openAddMembersModal}
          onAddPresenterButtonClick={this.openAddPresentersModal}
          openAddParticipantPresenterModal={this.openAddParticipantPresenterModal}
          onEligibleButtonClick={this.showEligibilityModal}
          openDefineSkillsModal={this.openDefineSkillsModal}
          openAttendeeDetailModal={this.openAttendeeDetailModal}
          match={this.props.match}
          onApprove={this.onApprove.bind(this)}
          serviceCounterLoading={this.state.serviceCounterLoading}
          serviceTrackerLoading={this.state.serviceTrackerLoading}
          applicationsLoading={this.state.applicationsLoading}
          communityId={this.props.match.params.communityId}
          application={this.state.application}
          applicationsApproved={this.state.applicationApproved}
          communityName={this.props.communityName}
          section={this.props.match.params.section}
          fromHome={this.props.match.params.fromHome}
          generateEventURL={this.generateEventURL}
          sendReminderMails={this.sendReminderMails}
          reminderEventId={this.state.reminderEventId}
          reminderStatus={this.state.reminderStatus}
          skillToSubEntity={this.props.skillToSubEntity}
          communityTreeStructureState={this.props.communityTreeStructureState}
          is_corporate={this.props.is_corporate}
        />
        <ComponentsModal
          showModal={this.state.openPresenterParticipantModal}
          close={this.closeAddParticipantPresenterModal}
          modalHeading={"Add Audio Presenters"}
          modalBody={presenterParticipantModal}
        />
        <ComponentsModal
          showModal={this.state.addMembersModal}
          close={this.closeAddMembersModal}
          modalHeading={"Add Viewers"}
          modalBody={modalBodyState}
        />
        <ComponentsModal
          showModal={this.state.eligibilityModal}
          close={this.closeEligibilityModal}
          modalHeading={"Set Eligibility"}
          modalBody={eligibilityModalBodyState}
        />
        <ComponentsModal
          showModal={this.state.addPresentersModal}
          close={this.closeAddPresentersModal}
          modalHeading={"Add Presenters"}
          modalBody={presenterModalBodyState}
        />
        <ComponentsModal
          showModal={this.state.defineSkillsModal}
          close={this.closeDefineSkillsModal}
          modalHeading={"Define Company Skills"}
          modalBody={companySkillsBodyState}
        />
        <ComponentsModal
          showModal={this.state.attendeeDetailModalState}
          close={this.closeAttendeeDetailModal}
          modalHeading={"Show Attendee Details"}
          modalBody={attendeeDetails}
        />
      </div>
    );
  }
}

var mapStateToProps =  (store, ownProps) => {
  let community_generic_type = "school";
  let community_name = ""
  let is_corporate = false

  for (let communityList in store.appDataReducer.communityListStateMemberOnly) {
      if (ownProps.match.params.communityId === store.appDataReducer.communityListStateMemberOnly[communityList].pk) {
          // console.log("CommunityPageController :: community detail", store.appDataReducer.communityListStateMemberOnly[communityList]);
        community_generic_type = store.appDataReducer.communityListStateMemberOnly[communityList].fields.generic_type;
        community_name = store.appDataReducer.communityListStateMemberOnly[communityList].fields.entity_name
        is_corporate = store.appDataReducer.communityListStateMemberOnly[communityList].is_corporate == undefined ?
          false : store.appDataReducer.communityListStateMemberOnly[communityList].is_corporate
      }
  }

  return {
    serviceDetails: store.serviceDataReducer.serviceCounterDataState,
    eventTrackerState: store.serviceDataReducer.eventsTrackerState,
    applicationsReceivedState: store.serviceDataReducer.applicationsReceivedState,
    communityTreeStructureState: store.serviceDataReducer.studentTreeStructureState,
    teacherStructureState: store.serviceDataReducer.teacherTreeStructureState,
    communityGenericType: community_generic_type,
    communityName: community_name,
    getCommunitySkills: store.communityPageDataReducer.getCommunitySkills,
    communityPackagesAsOwner: store.serviceDataReducer.communityPackagesAsOwner,
		treeStructureJson : store.communityPageDataReducer.instituteTreeState,
    userEntitySkills: store.communityPageDataReducer.getUserEntitySkills,
    skillToSubEntity: store.communityPageDataReducer.companySkillToSubEntity,
    is_corporate: is_corporate,
  };
};

export default connect(mapStateToProps)(ServicePage);
