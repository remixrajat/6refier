import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAttendeeDetailsForSession } from '../../dashboardpage/conditionalcomponents/action'

import { formatdatefunction } from '../../HelperFunctions/formatDateFunction';
import Preloader from '../../shared/Preloader/PreLoader';


class AttendeeDetailsController extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			details: undefined
		};
		
		this.setDetails = this.setDetails.bind(this);
	}

	componentWillMount() {
		this.props.dispatch(getAttendeeDetailsForSession(this.props.sessionId))
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.getAttendeeDetails) {
			this.setDetails(nextProps.getAttendeeDetails)
		}
	}

	setDetails(details) {
		let list = []

		for(let detail of details) {
			if(detail.applicant_type === "viewer") {
				let name = detail.first_name
				if (detail.last_name && detail.last_name.trim() !== '') {
					name = name + " " + detail.last_name
				}
				
				list.push(
					<tr key={detail.pk}>
						<td>{name}</td>
						<td>{formatdatefunction(detail.time_of_joining, 'time')}</td>
						<td>{formatdatefunction(detail.last_seen_time, 'time')}</td>
					</tr>
				)				
			}
		}

		this.setState({ details: list })
	}


	render() {
        // console.log("AttendeeDetailsController::", this.props);
        
		return (
			this.state.details === 'undefined' ?
				<div style={{ textAlign: "center", marginTop: "30px" }}>
					<Preloader />
				</div> :
				this.state.details && this.state.details.length > 0 ?
					<table style={{width: '100%'}}>
						<thead>
							<tr style={{margin: '10px auto'}}>
								<th>Name</th>
								<th>Join Time</th>
								<th>End Time</th>
							</tr>
						</thead>
						<tbody>
							{this.state.details}
						</tbody>
					</table> :
					<div style={{padding: '10px', width: '90%'}}
						className="custom-list-content">
						No attendees in session yet
					</div>
				
		);

	}
}

let mapStateToProps = (store) => {
	return {
		getAttendeeDetails: store.serviceDataReducer.getAttendeeDetailsForSession,
	}
}

export default connect(mapStateToProps)(AttendeeDetailsController);