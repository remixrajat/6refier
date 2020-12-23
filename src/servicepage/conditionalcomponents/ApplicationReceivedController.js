import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import ApplicationReceived from '../presentationalcomponents/ApplicationReceived'


export default class ApplicationReceivedController extends Component {

    render() {
        let name = " ";
        if (this.props.data.fields.applicant_id.last_name &&
            this.props.data.fields.applicant_id.last_name != "Null" &&
            this.props.data.fields.applicant_id.last_name != "None") {
              name = this.props.data.fields.applicant_id.first_name + " " + this.props.data.fields.applicant_id.last_name
          }
        else {
            name = this.props.data.fields.applicant_id.first_name
        }
            
        let application_id = this.props.data.fields.applicant_id.id;
        let eventDetails = JSON.parse(this.props.data.fields.event_details)[0]
        // console.log("ApplicationReceivedController::eventDetails::",eventDetails)
        let eventType = eventDetails.fields.event_type.service_name
        let eventTopic = eventDetails.fields.topic
        let eventDate = formatdatefunction(eventDetails.fields.start_date_time, 'short')
        let eventTime = formatdatefunction(eventDetails.fields.start_date_time, 'time')
        let mentorName = (eventDetails.fields.mentor_id.last_name &&
            eventDetails.fields.mentor_id.last_name != "Null" &&
            eventDetails.fields.mentor_id.last_name != "None") ?
            eventDetails.fields.mentor_id.first_name + " " +
            eventDetails.fields.mentor_id.last_name : eventDetails.fields.mentor_id.first_name
        let mentorId = eventDetails.fields.mentor_id.id
        let applicationMessage = this.props.data.fields.application_text
        let applicationId = this.props.data.pk
        let detailsText
        if (!eventTopic) {
            detailsText = ""
        }
        else {
            detailsText = eventTopic + " by "
        }

        return (
            <ApplicationReceived
                name={name} detailsText={detailsText}
                eventDate={eventDate} eventTime={eventTime}
                applicationMessage={applicationMessage}
                applicationId={applicationId} application_id={application_id}
                onApprove={this.props.onApprove}
                mentorId={mentorId}
                mentorName={mentorName}
                application={this.props.application} />
        );
    }
}
