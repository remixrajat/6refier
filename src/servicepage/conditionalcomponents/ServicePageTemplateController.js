import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Tab, Grid, Tabs, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import ServiceTable from "../presentationalcomponents/ServiceTableNew";
import ServicePageTemplate from "../presentationalcomponents/ServicePageTemplate"
import PaymentsTemplate from "../presentationalcomponents/PaymentsTemplate"
import CommunityOwnerSubscriptionsController from "../../communitypage/conditionalcomponents/CommunityOwnerSubscriptionsController"
import CommunityContentTracker from "../../reporting/conditionalcomponents/CommunityContentTracker"
import CommunityMemberActivityTracker from "../../reporting/conditionalcomponents/CommunityMemberActivityTracker"
import MyLearningModulesController from './MyLearningModulesController'
import MarketPlaceForCommunityController from './MarketPlaceForCommunityController'
import SkillMatrixController from "./SkillMatrixController";
import MemberCompetencyReport from '../presentationalcomponents/CommunitySkills/MemberCompetencyReport'

import { PrimaryButton } from "../../shared/RefierComponents/PrimaryButton";
import '../../styles/scss/custom-tab.css'
import CommunityReports from "../../reporting/presentationalcomponents/CommunityReports";


export default class ServicePageTemplateController extends Component {
    render() {
        // console.log("ServicePageTemplateController", this.props);
        
        let data2 = [{ name: 'Used', value: 12 },
                        { name: 'Remaining', value: 18 }];
        let serviceTypesData = []

        if (this.props.eventsDetails !== null) {
            for (let i = 0; i < this.props.eventsDetails.length; i++) {
                //console.log("serviceTypesData",serviceTypesData)
                let serviceData = {}
                let isAdded = false;
                if (serviceTypesData !== null) {
                    for (let j = 0; j < serviceTypesData.length; j++) {
                        if (serviceTypesData[j].service === this.props.eventsDetails[i].service) {
                            //console.log("AddingserviceTypesData",serviceTypesData)
                            let serviceDetailsObject = {}
                            serviceDetailsObject = this.props.eventsDetails[i]
                            let countOfAcceptedApplications = 0;
                            for (let k = 0; k < serviceDetailsObject.applications.length; k++) {
                                if (serviceDetailsObject.applications[k].fields.application_status ===
                                    "Accepted")
                                    countOfAcceptedApplications++;
                            }
                            serviceDetailsObject.countOfAcceptedApplications =
                                countOfAcceptedApplications
                            serviceTypesData[j].data.push(serviceDetailsObject)
                            isAdded = true
                        }
                    }
                }
                if (!isAdded) {
                    //console.log("AddingNewserviceTypesData",serviceTypesData)
                    let serviceDetailsObject = {}
                    serviceDetailsObject = this.props.eventsDetails[i]
                    serviceData.service = this.props.eventsDetails[i].service
                    let countOfAcceptedApplications = 0;
                    for (let k = 0; k < serviceDetailsObject.applications.length; k++) {
                        if (serviceDetailsObject.applications[k].fields.application_status ===
                            "Accepted")
                            countOfAcceptedApplications++;
                    }
                    serviceDetailsObject.countOfAcceptedApplications = countOfAcceptedApplications
                    serviceData.data = []
                    serviceData.data.push(serviceDetailsObject)
                    serviceTypesData.push(serviceData)
                }
            }
        }

        let tabsList = []

        if (this.props.eventsDetails !== null) {
            let count = 0
            for (let key in this.props.eventsDetails) {
                //console.log("Service Key", key)
                tabsList.push (
                    <Tab eventKey={count + 1} tabClassName="refier_custom_table_header_pane"
                        style={{
                            fontSize: "16px", backgroundColor: "white"
                        }} title={key}>
                        {this.props.eventsDetails[key] && <ServiceTable data={this.props.eventsDetails[key]}
                            generateEventURL={this.props.generateEventURL}
                            onAddButtonClick={this.props.onAddButtonClick}
                            onAddPresenterButtonClick={this.props.onAddPresenterButtonClick}
                            openAddParticipantPresenterModal={this.props.openAddParticipantPresenterModal}
                            onEligibleButtonClick={this.props.onEligibleButtonClick}
                            sendReminderMails={this.props.sendReminderMails}
                            reminderEventId={this.props.reminderEventId}
                            reminderStatus={this.props.reminderStatus}
                            openAttendeeDetailModal={this.props.openAttendeeDetailModal}
                        />
                            
                        }
                    </Tab>
                )
                count++
            }
        }

        let section = 1
        if (this.props.section) {
            if (this.props.section == "memberActivityReport") {
                section = 4
            }
        }

        return (
            <Grid fluid className="router-content-panel" style={{marginBottom: '75px'}}>
                <div style={{ marginBottom: '30px', marginTop: '10px' }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        {this.props.fromHome ?
                            <Link to={"/userDashboard/"}>
                                <Button className="refier_custom_button_dark">
                                    <FontAwesome
                                        name="arrow-left"
                                        size='x'
                                        style={{ "display": "inline-block" }}
                                    />
                                    <span
                                        style={{ marginLeft: "10px" }}>Back to Home
                                    </span>
                                </Button>
                            </Link>
                            :
                            <Link to={"/userDashboard/community/" + this.props.communityId}>
                                <Button className="refier_custom_button_dark">
                                    <FontAwesome
                                        name="arrow-left"
                                        size='x'
                                        style={{ "display": "inline-block" }}
                                    />
                                    <span
                                        style={{ marginLeft: "10px" }}>Back to {this.props.communityName != "" ?
                                            this.props.communityName + " " : ""}Community
                                    </span>
                                </Button>
                            </Link>
                        }

                        {this.props.is_corporate ?
                            <PrimaryButton
                                onButtonClick={this.props.openDefineSkillsModal}
                                buttonText="Define Company Skills"
                                showIcon={
                                    <FontAwesome
                                        name="tags"
                                        style={{ marginRight: "5px" }}
                                    />
                                }
                            />
                            :
                            null
                        }
                    </div>
                </div>
                {this.props.is_corporate ?
                    <Tabs defaultActiveKey={section} id="custom-tabs">
                        <Tab eventKey={1} className="refier_custom_table_header_pane"
                            title="Sessions">
                            <ServicePageTemplate
                                serviceData={this.props.serviceData}
                                eventsDetails={this.props.eventsDetails}
                                applicationsReceived={this.props.applicationsReceived}
                                tabsList={tabsList}
                                onAddButtonClick={this.props.onAddButtonClick}
                                onAddPresenterButtonClick={this.props.onAddPresenterButtonClick}
                                openAddParticipantPresenterModal={this.props.openAddParticipantPresenterModal}
                                onEligibleButtonClick={this.props.onEligibleButtonClick}
                                match={this.props.match}
                                onApprove={this.props.onApprove}
                                serviceCounterLoading={this.props.serviceCounterLoading}
                                serviceTrackerLoading={this.props.serviceTrackerLoading}
                                applicationsLoading={this.props.applicationsLoading}
                                application={this.props.application}
                                applicationsApproved={this.props.applicationsApproved}
                                communityName={this.props.communityName}
                                openAttendeeDetailModal={this.props.openAttendeeDetailModal}
                            />
                        </Tab>
                        <Tab eventKey={2} tabClassName="refier_custom_table_header_pane"
                            title="Our Learning Modules">
                            <MyLearningModulesController communityId={this.props.communityId} />
                        </Tab>
                        <Tab eventKey={3} tabClassName="refier_custom_table_header_pane"
                            title="External Subscriptions">
                            <CommunityOwnerSubscriptionsController communityId={this.props.communityId} />
                        </Tab>
                        <Tab eventKey={4} tabClassName="refier_custom_table_header_pane"
                            title="Member Activity Report">
                            <CommunityMemberActivityTracker communityId={this.props.communityId} />
                        </Tab>
                        <Tab eventKey={5} tabClassName="refier_custom_table_header_pane"
                            title="Content Report">
                            <CommunityContentTracker communityId={this.props.communityId} />
                        </Tab>
                    
                        <Tab eventKey={6} tabClassName="refier_custom_table_header_pane"
                            title="Marketplace">
                            <MarketPlaceForCommunityController communityId={this.props.communityId} />
                        </Tab>
                        <Tab eventKey={7} tabClassName="refier_custom_table_header_pane"
                            title="Competency Report">
                            <MemberCompetencyReport communityId={this.props.communityId}
                                skillToSubEntity={this.props.skillToSubEntity}
                                communityTreeStructureState={this.props.communityTreeStructureState}
                            />
                        </Tab>
                        <Tab eventKey={8} tabClassName="refier_custom_table_header_pane"
                            title="Skill Assessment">
                            <SkillMatrixController communityId={this.props.communityId} />
                        </Tab>
                        <Tab eventKey={9} tabClassName="refier_custom_table_header_pane" title="Reports">
                            <CommunityReports />
                        </Tab>
                    </Tabs>
                    :
                    <Tabs defaultActiveKey={section} id="custom-tabs">
                        <Tab eventKey={1} className="refier_custom_table_header_pane"
                            title="Sessions">
                            <ServicePageTemplate
                                serviceData={this.props.serviceData}
                                eventsDetails={this.props.eventsDetails}
                                applicationsReceived={this.props.applicationsReceived}
                                tabsList={tabsList}
                                onAddButtonClick={this.props.onAddButtonClick}
                                onAddPresenterButtonClick={this.props.onAddPresenterButtonClick}
                                openAddParticipantPresenterModal={this.props.openAddParticipantPresenterModal}
                                onEligibleButtonClick={this.props.onEligibleButtonClick}
                                match={this.props.match}
                                onApprove={this.props.onApprove}
                                serviceCounterLoading={this.props.serviceCounterLoading}
                                serviceTrackerLoading={this.props.serviceTrackerLoading}
                                applicationsLoading={this.props.applicationsLoading}
                                application={this.props.application}
                                applicationsApproved={this.props.applicationsApproved}
                                communityName={this.props.communityName}
                                openAttendeeDetailModal={this.props.openAttendeeDetailModal}
                            />
                        </Tab>
                        <Tab eventKey={2} tabClassName="refier_custom_table_header_pane"
                            title="Our Learning Modules">
                            <MyLearningModulesController communityId={this.props.communityId} />
                        </Tab>
                        <Tab eventKey={3} tabClassName="refier_custom_table_header_pane"
                            title="External Subscriptions">
                            <CommunityOwnerSubscriptionsController communityId={this.props.communityId} />
                        </Tab>
                        <Tab eventKey={4} tabClassName="refier_custom_table_header_pane"
                            title="Member Activity Report">
                            <CommunityMemberActivityTracker communityId={this.props.communityId} />
                        </Tab>
                        <Tab eventKey={5} tabClassName="refier_custom_table_header_pane"
                            title="Content Report">
                            <CommunityContentTracker communityId={this.props.communityId} />
                        </Tab>
                    </Tabs>
                }
            </Grid>
        );
    }
}
