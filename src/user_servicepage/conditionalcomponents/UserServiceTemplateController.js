/*jshint esversion: 6 */
import React, { Component } from "react";
import { Grid, Col, Row, Tab } from "react-bootstrap";
import { connect } from "react-redux";

import { getEventInfo, getGeneratedEventURL } from "./action"
import UserServiceTemplate from '../presentationcomponents/UserServiceTemplate'
import UserServiceTable from '../presentationcomponents/UserServiceTableNew'


class UserServiceTemplateController extends Component {
	constructor(props) {
		super(props);
		this.tabStructure = {
			"Apply For Sessions": {
				"key": 1,
				"status": "apply"
			},
			"Upcoming Sessions": {
				"key": 2,
				"status": "approved"
			},
			"Pending Applications": {
				"key": 3,
				"status": "pending"
			},
			"Previous Sessions": {
				"key": 4,
				"status": "previous"
			}
		}
		this.getEventInfo = this.getEventInfo.bind(this)
		this.generateEventURL = this.generateEventURL.bind(this)
	}

	getEventInfo(event_id) {
		this.props.dispatch(getEventInfo(event_id));
	}

	generateEventURL(mappingID) {
		this.props.dispatch(getGeneratedEventURL(mappingID))
	}


	render() {
		// console.log("UserServiceTemplateController", this.props)

		let mySessionsKey = "My Sessions"
		let tabsList = []
		let mySessionData
		if (this.props.eventLists) {
			let count = 0
			for (let key in this.tabStructure) {
				//console.log("UserServiceTabsTitle", key)
				tabsList.push(
					<Tab
						eventKey={this.tabStructure[key].key} tabClassName="refier_custom_table_header_pane"
						style={{ "fontSize": "14px", "background": "white" }} title={key}
					>
						{
							this.props.eventLists[key] 
							&& 
							<UserServiceTable
								data={this.props.eventLists[key]}
								status={this.tabStructure[key].status}
								userId={this.props.userId}
								applyForEvent={this.props.applyForEvent}
								confirmSessionComplete={this.props.confirmSessionComplete}
								getEventInfo={this.getEventInfo}
								packageValiditymappingForEvents={this.props.packageValiditymappingForEvents}
								generateEventURL={this.generateEventURL}
							/>
						}
					</Tab>
				)
				count++
			}
			mySessionData = this.props.eventLists[mySessionsKey]
		}

		return (
			<UserServiceTemplate
				tabsList={tabsList}
				mySessionData={mySessionData}
				userId={this.props.userId} />
		);
	}
}

var mapStateToProps = store => {
    return { };
};

export default connect(mapStateToProps)(UserServiceTemplateController);