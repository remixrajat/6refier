import React, { Component } from "react";
import { Grid, Col, Row, Tabs } from "react-bootstrap";

import UserSessionDataTemplate from './UserSessionDataTemplate'

import PreLoader from "../../shared/Preloader/PreLoader"
import '../../styles/scss/custom-tab.css'


export default class UserServiceTemplate extends Component {
	render() {
		//console.log("servpagetemp", this.props)

		let sessionData = this.props.tabsList.length > 0 ?
			<div style={{ "margin": "0px 20px" }}>
				<Tabs defaultActiveKey={1}
					id="custom-tabs">
					{this.props.tabsList}
				</Tabs>
			</div>
			:
			<Col style={{ "textAlign": "center" }}>
				<div style={{ "margin": "50px 20px" }}>
					<PreLoader copies={1} placeholder="box_and_lines" shimmer={true} />
				</div>
			</Col>



		return (
			<Grid style={{ "margin-top": "20px" }} fluid>
				<Row>
					<Col md={3}>
						<div>
							<div className="refier_custom_panel_title_blue"
							>My Sessions</div>
							<Grid fluid className="refier-card-style" style={{
								textAlign: "center",
								maxHeight: "70vh"
							}}>
								<UserSessionDataTemplate mySessionData={this.props.mySessionData} userId={this.props.userId} />
							</Grid>
						</div>
					</Col>
					<Col md={9}>
						<div>
							<div className="refier_custom_panel_title_blue"
							>Refier Expert Sessions</div>
							<Grid fluid className="refier-card-style">
								{sessionData}
							</Grid>
						</div>
					</Col>
				</Row>
			</Grid>
		);
	}
}
