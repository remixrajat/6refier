import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ReactTable from 'react-table'
import { Button, Grid, Col, Tooltip, Overlay } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { formatdatefunction } from "../../HelperFunctions/formatDateFunction"
import { PrimaryButton } from "../../shared/RefierComponents/PrimaryButton";
import Preloader from "../../shared/Preloader/PreLoader"

import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import 'react-table/react-table.css'


class ServiceTableNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltipOpen: false,
            expandedRows : {}
        };

        this.attachRef = this.attachRef.bind(this);
        this.copyUrlToClipboard = this.copyUrlToClipboard.bind(this);
        this.format = this.format.bind(this);
        this.showGenerateMessage = this.showGenerateMessage.bind(this);
    }

    attachRef(target) {
        if(target)
            this.setState({ target });
    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;

        if(currentExpandedRows[rowId])
            currentExpandedRows[rowId] = !currentExpandedRows[rowId]
        else 
            currentExpandedRows[rowId] = true
        
        this.setState({expandedRows : currentExpandedRows}, () => {
            // console.log("jaako", this.state)
        });
    }

    onAddPresenterParticipantClickHandler(e) {
        let eventObject = JSON.parse(e.target.value)
        // console.log("onAddClickHandler : ButtonValue", eventObject)
        this.props.openAddParticipantPresenterModal(eventObject["members"], eventObject["eventId"], 
            eventObject["count"], eventObject["status"])
    }

    onAddClickHandler(e) {
        let eventObject = JSON.parse(e.target.value)
        // console.log("onAddClickHandler : ButtonValue", eventObject)
        this.props.onAddButtonClick(eventObject["members"], eventObject["eventId"], 
            eventObject["count"], eventObject["status"])
    }

    onAddPresenterClickHandler(e) {
        let eventObject = JSON.parse(e.target.value)
        // console.log("onAddPresenterClickHandler : ButtonValue", eventObject)
        this.props.onAddPresenterButtonClick(eventObject["members"], eventObject["eventId"], 
            eventObject["count"], eventObject["status"])
    }

    onEligibleClickHandler(e) {
        //console.log("ButtonValue", e.target.value, e.target)
        //this.props.onAddButtonClick(e);
        let eventObject = JSON.parse(e.target.value)
        this.props.onEligibleButtonClick(eventObject["members"], eventObject["eventId"], eventObject["status"])
    }

    showAttendeesList(e) {
        let sessionId = JSON.parse(e.target.value)
        this.props.openAttendeeDetailModal(sessionId)
    }

    format(row, onAdd) {
        // console.log("applicationsformat", row, this.props)

        let applications = (row.fields.application_count)
        let members = []
        let presenters = []
        let presenterParticipant = []
        let countOfAcceptedApplicationsViewer = 0;
        let countOfAcceptedApplicationsPresenter = 0;
        let countOfAcceptedApplicationsPresenterParticipants = 0;
        for (let k = 0; k < applications.length; k++) {
            if (applications[k].fields.application_status ===
                "Accepted") {
                if (applications[k].fields.applicant_type == 'viewer') {
                    countOfAcceptedApplicationsViewer++;
                    members.push(applications[k].fields.applicant_id)
                }
                else if (applications[k].fields.applicant_type == 'presenter') {
                    countOfAcceptedApplicationsPresenter++;
                    presenters.push(applications[k].fields.applicant_id)
                } else if (applications[k].fields.applicant_type == 'presenter_participant') {
                    countOfAcceptedApplicationsPresenterParticipants++;
                    presenterParticipant.push(applications[k].fields.applicant_id)
                }
            }
        }
        let maximumCountOfViewers = row.fields.count_of_participants
        let maximumCountOfPresenters = row.fields.count_of_presenters
        // let maximumCountOfPresenterParticipants = row.fields.count_of_presenters
        let event_status = row.fields.session_id.status
        let session_id = row.fields.session_id.session_id
        //console.log("members", members)
        let eventObject = {}
        eventObject["members"] = members
        eventObject["eventId"] = row.pk
        eventObject["count"] = maximumCountOfViewers
        eventObject["status"] = event_status

        let eventPresenterObject = {}
        eventPresenterObject["members"] = presenters
        eventPresenterObject["eventId"] = row.pk
        eventPresenterObject["count"] = maximumCountOfPresenters
        eventPresenterObject["status"] = event_status

        let eventPresenterParticipantObject = {}
        eventPresenterParticipantObject["members"] = presenterParticipant
        eventPresenterParticipantObject["eventId"] = row.pk
        eventPresenterParticipantObject["count"] = 100
        eventPresenterParticipantObject["status"] = event_status

        const refierURL = "https://www.refier.com"
        const inviteUrl = "https://www.refier.com/send-user-event-invite/"

        if (event_status === "Scheduled") {
            return (
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginLeft: "10px" }}>
                            <span style={{ wordWrap: "normal", fontSize: "14px", margin: "0 10px" }}>
                                Viewers : {countOfAcceptedApplicationsViewer} / {maximumCountOfViewers}
                            </span>
                        </div>
                        <div style={{ margin: "10px 10px" }}>
                            <span style={{ wordWrap: "normal", fontSize: "14px", margin: "0 10px" }}>
                                Presenters : {countOfAcceptedApplicationsPresenter+1} / {maximumCountOfPresenters+1}
                            </span>
                        </div>
                        <div style={{ margin: "10px 10px" }}>
                            <span style={{ wordWrap: "normal", fontSize: "14px", margin: "0 10px" }}>
                                Presenter Participants : { countOfAcceptedApplicationsPresenterParticipants }
                            </span>
                        </div>
                        {/* <div style={{ margin: "10px 10px" }}>
                            <span style={{ wordWrap: "normal", fontSize: "14px", margin: "0 10px" }}>
                                <Button
                                    className='refier_custom_button_new'
                                    onClick={this.showAttendeesList.bind(this)}
                                    value={JSON.stringify(session_id)}>
                                    Attendee Details</Button>
                            </span>
                        </div> */}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{ margin: "10px 10px" }}>
                            <span>
                                <Button
                                    className='refier_custom_button_new'
                                    value={JSON.stringify(eventObject)}
                                    onClick={this.onAddClickHandler.bind(this)}>
                                    Add Viewers</Button>
                            </span>
                        </div>
                        <div style={{ margin: "10px 10px" }}>
                            <span>
                                <Button
                                    className='refier_custom_button_new'
                                    value={JSON.stringify(eventPresenterObject)}
                                    onClick={this.onAddPresenterClickHandler.bind(this)}>
                                    Add Presenters</Button>
                            </span>
                        </div>
                        <div style={{ margin: "10px 10px" }}>
                            <span>
                                <Button
                                    className='refier_custom_button_new'
                                    value={JSON.stringify(eventPresenterParticipantObject)}
                                    onClick={this.onAddPresenterParticipantClickHandler.bind(this)}>
                                    Add Audio Participants</Button>
                            </span>
                        </div>
                        <div style={{ margin: "10px 10px" }}>
                            <span >
                                <Button
                                    className='refier_custom_button_new'
                                    value={JSON.stringify(eventObject)}
                                    onClick={this.onEligibleClickHandler.bind(this)}>
                                    Set Eligibility</Button>
                            </span>
                        </div>
                    </div>
                    {row.fields.is_part_of_package ?
                        <div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{flex: 0.5}}>
                                {
                                    this.props.reminderEventId === row.pk ?
                                        this.props.reminderStatus === 2 ?
                                            <Preloader />
                                            :
                                            this.props.reminderStatus === 1 ?
                                                <div className="custom-info-alert">
                                                    Reminder Mail Sent
                                                </div>
                                                :
                                                <div style={{ marginLeft: '10px' }}>
                                                <PrimaryButton
                                                    buttonText="Send Reminder"
                                                    onButtonClick={() => this.props.sendReminderMails(row.pk)}
                                                />
                                                </div>
                                            :    
                                    <div style={{ marginLeft: '10px' }}>
                                        <PrimaryButton
                                            buttonText="Send Reminder"
                                            onButtonClick={() => this.props.sendReminderMails(row.pk)}
                                        />
                                    </div>
                                }
                                </div>
                                <div style={{ flex: 0.5 }}>
                                    <span >
                                        <a target="_blank"
                                            style={{padding: '6px'}}
                                            className='refier_custom_button_new'
                                            href={inviteUrl + row.fields.event_url}>Send Invite
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <div style={{color: '#555', marginTop: '20px', marginBottom: '15px'}}>
                                <div style={{textAlign: 'left'}}>This session is a part of package(s)</div>
                                <div>{this.showGenerateMessage(row.pk, row.fields.packages_info)}</div>
                            </div>
                        </div>
                        :
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{flex: 0.4}}>
                            {
                                this.props.reminderEventId === row.pk ?
                                    this.props.reminderStatus === 2 ?
                                        <Preloader />
                                        :
                                        this.props.reminderStatus === 1 ?
                                            <div className="custom-info-alert">
                                                Reminder Mail Sent
                                            </div>
                                            :
                                            <div style={{ marginLeft: '10px' }}>
                                            <PrimaryButton
                                                buttonText="Send Reminder"
                                                onButtonClick={() => this.props.sendReminderMails(row.pk)}
                                            />
                                            </div>
                                        :    
                                <div style={{ marginLeft: '10px' }}>
                                    <PrimaryButton
                                        buttonText="Send Reminder"
                                        onButtonClick={() => this.props.sendReminderMails(row.pk)}
                                    />
                                </div>
                            }
                            </div>
                            <div style={{ flex: 0.4 }}>
                                <span >
                                    <a target="_blank"
                                        style={{padding: '6px'}}
                                        className='refier_custom_button_new'
                                        href={inviteUrl + row.fields.event_url}>Send Invite
                                    </a>
                                </span>
                            </div>
                            <div style={{flex: 0.2}}>
                            {row.fields.event_url && 
                            (row.fields.event_url.trim() !== '' || row.fields.event_url.length > 0) ?
                                <div style={{color: 'rgba(0,0,0,0.9)', margin: '20px 10px 10px 10px'}}>
                                    <div style={{marginLeft: '10px', display: 'flex', alignItems: 'center'}} 
                                        ref={this.attachRef}>
                                        <FontAwesome name="clipboard" 
                                            title="Copy Event URL"
                                            style={{marginRight: '5px', fontSize: '18px', cursor: 'pointer'}}
                                            onClick={() => {
                                                let registerURL = refierURL + row.fields.event_url;
                                                this.copyUrlToClipboard(registerURL)
                                            }} />
                                        <span style={{background: 'rgba(0,0,0,0.1)', padding: '5px'}}>
                                            {refierURL + row.fields.event_url.substr(0, 7) + "..."}
                                        </span>
                                    </div>
                                    <Overlay target={this.state.target} 
                                        show={this.state.tooltipOpen} 
                                        placement="left" rootClose>
                                        <Tooltip id="copied">
                                            Copied!
                                        </Tooltip>
                                    </Overlay>
                                </div>
                                :
                                <div key={row.pk} style={{marginLeft: '10px'}}>
                                    <PrimaryButton 
                                        buttonText="Generate"
                                        onButtonClick={() => this.props.generateEventURL(row.pk)}
                                    />
                                </div>
                            }
                            </div>
                        </div>
                    }
                </div>
            )
        }
        else if(event_status == "Done") {
            return (<div style={{ "marginLeft": "10px" }}>
                <div>
                    <span style={{ "wordWrap": "normal", "fontSize": "14px", "margin": "0 10px" }}>
                        Completed
                    </span>
                </div>
                <div style={{ "margin": "10px 0px" }}>
                    <span style={{ "margin": "0px 10px" }}>
                        <Button bsStyle='primary' bsSize='small'
                            className='refier_custom_button_new'
                            value={JSON.stringify(eventObject)}
                            onClick={this.onAddClickHandler.bind(this)}>Participants</Button>
                    </span>
                </div>
                <div style={{ "margin": "10px 0px" }}>
                    <span style={{ "margin": "0 10px" }}>
                        <Button 
                            className='refier_custom_button_new'
                            value={JSON.stringify(eventObject)}
                            onClick={this.onEligibleClickHandler.bind(this)}>Eligibility</Button>
                    </span>
                </div>
            </div>)
        }
    }

    formatEventTopic(row) {
        if (row.fields.session_id.topic !== null)
            return (
                <Link style={{marginLeft:"10px"}}
                            to={"/userDashboard/webinarinfo/" + row.fields.session_id.session_id}
                            style={{
                                "wordWrap": "normal"
                        }}
                        className="custom-link">
                    {row.fields.session_id.topic}
                </Link>
            )
        else
            return (
                <span
                    style={{
                        "wordWrap": "normal", "fontSize": "14px", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>{"--"}
                </span>)
    }

    formatEventDescription(row) {
        if (row.fields.session_id.description !== null)
            return (
                <span
                    style={{
                        "wordWrap": "normal", "fontSize": "14px", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>
                    {row.fields.session_id.description}
                </span>)
        else
            return (
                <span
                    style={{
                        "wordWrap": "normal", "fontSize": "14px", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>{"--"}
                </span>)
    }

    formatEventDate(row) {
        if (row.fields.session_id.start_date_time !== null)
            return (
                <span
                    style={{
                        "wordWrap": "normal", "fontSize": "14px", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>
                    {formatdatefunction(row.fields.session_id.start_date_time, "short")} {formatdatefunction(row.fields.session_id.start_date_time, "time")}
                </span>)
        else
            return (
                <span
                    style={{
                        "wordWrap": "normal", "fontSize": "14px", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>{"--"}
                </span>)
    }

    formatEventMentor(row) {
        let name = ""
        if (row.fields.session_id.mentor_id.last_name &&
            row.fields.session_id.mentor_id.last_name !== "Null" &&
            row.fields.session_id.mentor_id.last_name !== "None")
            name = row.fields.session_id.mentor_id.first_name + " " +
                row.fields.session_id.mentor_id.last_name
        else {
            name = row.fields.session_id.mentor_id.first_name
        }
        if (row.fields.session_id.mentor_id !== null)
            return (
                <span
                    style={{
                        "wordWrap": "normal", "fontSize": "14px", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>
                    <Link to={"/userDashboard/profile/" + row.fields.session_id.mentor_id.id}>
                        {name}
                    </Link>
                </span>)
        else
            return (
                <span
                    style={{
                        "wordWrap": "normal", "fontSize": "14px", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>{"--"}
                </span>)
    }


    filterTopic(filter, row) {
        if (row[filter.id]) {
            //console.log("rowtopic", row, filter.id)
            if (row[filter.id].props.children)
                if (row[filter.id].props.children.toLocaleLowerCase().
                    includes(filter.value.toLocaleLowerCase()))
                    return true
        }
        return false
    }

    filterMentor(filter, row) {
        if (row[filter.id]) {
            //console.log("row", row)
            if (row[filter.id].props.children.props.children)
                if (row[filter.id].props.children.props.children.length > 0) {
                    for (let i = 0; i < row[filter.id].props.children.props.children.length; i++)
                        if (row[filter.id].props.children.props.children[i].toLocaleLowerCase().
                            includes(filter.value.toLocaleLowerCase()))
                            return true
                }
        }
        return false
    }

    filterDate(filter, row) {
        if (row[filter.id]) {
            let selectedDate = formatdatefunction(filter.value, "short")
            return row[filter.id].props.children[0].toLocaleLowerCase().
                includes(selectedDate)
        }
        return false
    }

    copyUrlToClipboard(text) {
        const that = this;
        if (!navigator.clipboard) {
            
            var textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
          
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                // console.log('Fallback: Copying text command was ' + msg);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
          
            document.body.removeChild(textArea);
            that.setState({tooltipOpen: true})
            setTimeout(() => {
                that.setState({tooltipOpen: false})
            }, 1000)

            return;
        }
        navigator.clipboard.writeText(text).then(function() {
            // console.log('Async: Copying to clipboard was successful!');
            that.setState({tooltipOpen: true})
            setTimeout(() => {
                that.setState({tooltipOpen: false})
            }, 1000)
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    showGenerateMessage(schoolMapping, packagesInfo) {
        // console.log("showGenerateMessage", packagesInfo)
        
        let body = []
        
        for(let pkg of packagesInfo) {
            let temp_body = (
                <div key={pkg.package_pvm} 
                    style={{display: 'flex', alignItems: 'center'}}>
                    <div>Course: {pkg.package_name} and PVM {pkg.package_pvm}</div>
                    {pkg.package_url && 
                    (pkg.package_url.trim() !== '' || pkg.package_url.length > 0) ?
                        <div style={{color: 'rgba(0,0,0,0.9)', margin: '20px 10px 10px 10px'}}>
                            <div style={{marginLeft: '10px'}} key={pkg.package_pvm} ref={this.attachRef}>
                                <FontAwesome name="clipboard" 
                                    title="Copy Course URL"
                                    style={{marginRight: '5px', fontSize: '18px', cursor: 'pointer'}}
                                    onClick={() => {
                                        let registerURL = "https://www.refier.com" + pkg.package_url;
                                        this.copyUrlToClipboard(registerURL)
                                    }} />
                                <span style={{background: 'rgba(0,0,0,0.1)', padding: '5px'}}>
                                    {"https://www.refier.com" + pkg.package_url.substr(0, 7) + "..."}
                                </span>
                            </div>
                            <Overlay target={this.state.target} 
                                show={this.state.tooltipOpen} 
                                placement="left" rootClose>
                                <Tooltip id="copied">
                                    Copied!
                                </Tooltip>
                            </Overlay>
                        </div>
                        :
                        <div style={{marginLeft: '10px'}}>
                            <PrimaryButton 
                                buttonText="Generate Course URL"
                                onButtonClick={() => this.props.generateEventURL(pkg.package_pvm, true)}
                            />
                        </div>
                    }
                    <div style={{padding: '5px'}}>
                        <Link to={"/userDashboard/courseinfo/" + pkg.package_pvm}
                            className='refier_custom_button_new'
                            style={{padding: '6px'}}>
                            Go To Course Page
                        </Link>
                    </div>
                </div>
            )

            body.push(temp_body)
        }

        return body
    }


    render() {
        console.log("ServiceTableNew:: props", this.props)

        if (typeof this.props === "undefined" || typeof this.props.data === "undefined") {
            return <div>Loading</div>;
        }

        let serviceTableColumns = [
            {
                Header: props => <span className="refier_text_on_light__table_header" >Topic</span>,
                id: "topic",
                accessor: row => this.formatEventTopic(row),
                filterMethod: (filter, row) => this.filterTopic(filter, row),
                Filter: ({ filter, onChange }) =>
                    <input
                        onChange={event => onChange(event.target.value)}
                        placeholder={"Search Topic"}
                        style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "14px" }}
                    />
            },
            {
                Header: props => <span className="refier_text_on_light__table_header" >Description</span>,
                id: "description",
                accessor: row => this.formatEventDescription(row),
                filterMethod: (filter, row) => this.filterTopic(filter, row),
                Filter: ({ filter, onChange }) =>
                    <input
                        onChange={event => onChange(event.target.value)}
                        placeholder={"Search Description"}
                        style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "14px" }}
                    />
            },
            {
                Header: props => <span className="refier_text_on_light__table_header" >Mentor</span>,
                id: "mentorName",
                accessor: row => this.formatEventMentor(row),
                filterMethod: (filter, row) => this.filterMentor(filter, row),
                Filter: ({ filter, onChange }) =>
                    <input
                        placeholder={"Search Mentor"}
                        onChange={event => onChange(event.target.value)}
                        style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "14px" }}
                    />
            },
            {
                Header: props => <span className="refier_text_on_light__table_header" >Date</span>,
                id: "date",
                accessor: row => this.formatEventDate(row),
                filterMethod: (filter, row) => this.filterDate(filter, row),
                Filter: ({ filter, onChange }) =>
                    <input
                        onChange={event => onChange(event.target.value)}
                        placeholder={"Search Date"}
                        type="date"
                        style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "14px" }}
                    />
            },
            // {
            //     Header: props => <span className="refier_text_on_light__table_header" >Members</span>,
            //     id: "applications",
            //     accessor: row => this.format(row, this.props),
            //     filterable: false,
            // },
        ]


        let serviceTable = this.props.data.length !== 0 ?
            <ReactTable
                data={this.props.data}
                columns={serviceTableColumns}
                onClick={this.handleRowClick}
                defaultPageSize={5}
                filterable
                expanded={this.state.expandedRows}
                SubComponent={row => this.format(row.original)}
                getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
                        // console.log('A Td Element was clicked!')
                        // console.log('it produced this event:', e)
                        // console.log('It was in this column:', column)
                        // console.log('It was in this row:', rowInfo)
                        // console.log('It was in this table instance:', instance)

                        if(column.expander) {
                            this.handleRowClick(rowInfo.viewIndex)
                        }
                 
                        // IMPORTANT! React-Table uses onClick internally to trigger
                        // events like expanding SubComponents and pivots.
                        // By default a custom 'onClick' handler will override this functionality.
                        // If you want to fire the original onClick handler, call the
                        // 'handleOriginal' function.
                        // if (handleOriginal) {
                        //   handleOriginal()
                        // }
                      }
                    }
                  }}
            />
            :
            <Grid fluid>
                <Col xs={12} style={{ "textAlign": "center" }}>
                    <div className="refier_custom_light_panel_title"
                        style={{
                            "padding": "0px 10px 10px", textAlign: "center", fontSize: "16px", 
                        }}>No Entries Available
            </div>
                </Col>
            </Grid>
        // //console.log("inside ServiceTable", this.props.data);
        return (
            <div style={{ "padding": "20px 20px" }}>
                {serviceTable}
            </div>
        );
    }
}

export default ServiceTableNew;
