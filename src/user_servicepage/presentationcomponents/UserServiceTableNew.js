import React, { Component } from "react";
import ReactTable from 'react-table'
import { Link } from 'react-router-dom';
import { Button, Grid, Col, Tooltip, Overlay } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import 'react-table/react-table.css'
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

import { formatdatefunction } from "../../HelperFunctions/formatDateFunction";
import { PrimaryButton } from "../../shared/RefierComponents/PrimaryButton";
import { URL_TEXT, MEDIA_URL_TEXT, REFIER_OPEN_COMMUNITY, REFIER_OPEN_COMMUNITY_NICKNAME } from '../../GlobalConstants'
import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";


class UserServiceTableNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltipOpen: false
        };

        this.attachRef = target => this.setState({ target });
        this.copyUrlToClipboard = this.copyUrlToClipboard.bind(this);
    }


    onAddClickHandler(e) {
        //console.log("ButtonValue", e.target.value, e.target)
        //this.props.onAddButtonClick(e);
        let event = e.target.value
        this.props.applyForEvent(event)
    }

    createEventUrl(event_url, eventid, userId) {
        let uri = event_url + "/" + eventid + "/" + userId;
        return uri;
    }

    onGetEventInfo(e) {
        //console.log("ButtonValue", e.target.value, e.target)
        //this.props.onAddButtonClick(e);
        let event = e.target.value
        this.props.getEventInfo(event)
    }

    formatStatus(row, onAdd) {
        let status
        if (this.props.status) {
            switch (this.props.status) {
                case "apply": {
                    console.log('row ::',row, this.props.packageValiditymappingForEvents);
                    let is_single_service = false, credits;
                    if (this.props.packageValiditymappingForEvents.hasOwnProperty(row.pk)){
                        is_single_service = this.props.packageValiditymappingForEvents[row.pk].is_single_service;
                        credits = this.props.packageValiditymappingForEvents[row.pk].package_validity_mapping[0].fields.cost_of_package_in_credits
                    }
                    if (row.fields.accepted_applications_count < row.fields.count_of_participants) {
                        status = <div>
                            <div> 
                            { is_single_service ? 
                                <Link style={{marginLeft:"10px"}}
                                    to={"/userDashboard/webinarinfo/" + row.fields.session_id.session_id}
                                    className=" refier_text_on_light__4 custom-link"
                                    style={{
                                        "wordWrap": "normal", "background": "white",
                                    "marginLeft": "10px"
                                    }}>
                                    {credits !== 0 ?
                                        "BUY for " + credits +" credits"
                                        : "Apply"
                                    }
                                </Link>
                                :
                                <Button bsSize='small'
                                    className='refier_custom_button_new_selected_2'
                                    value={row.pk}
                                    onClick={this.onAddClickHandler.bind(this)}>
                                    APPLY
                                </Button>
                            }                           
                            </div>
                            <div
                                className="refier_text_on_light__4"
                                style={{
                                    "wordWrap": "normal", "marginTop": "10px", "marginLeft": "10px",
                                    "color": "black"
                                }}>
                                {row.fields.count_of_participants - row.fields.accepted_applications_count} seats left 
                            </div>
                        </div>
                    }
                    else {
                        status = <span
                            className="refier_text_on_light__4"
                            style={{
                                "wordWrap": "normal", "margin": "0 10px",
                                "color": "black"
                            }}>
                            Seats Filled
                            </span>
                    }
                    break;
                }
                case "approved": {
                    status = <span
                        className="refier_text_on_light__4"
                        style={{
                            "wordWrap": "normal", "margin": "0 10px",
                            "color": "black"
                        }}>
                        <Link className="btn refier_custom_button_new_selected_2"
                            to={this.createEventUrl(row.fields.session_id.event_url,
                                row.fields.session_id.session_id, this.props.userId)}>
                            {this.props.userId === row.fields.session_id.mentor_id_id ?
                                "Start Session" : "Join Event"}</Link>
                        {
                            row.fields.session_id.mentor_id.id === this.props.userId ?
                                (
                                    // <span>
                                    //     &nbsp;  |  &nbsp;

                                    <div>
                                        <br />
                                        <Button
                                            onClick={() => { this.props.confirmSessionComplete(row.fields.session_id.session_id) }}
                                            className="refier_custom_link">
                                            Mark as Complete
                                </Button>
                                    </div>
                                    // </span>
                                )
                                : null
                        }

                    </span>
                    break;
                }
                case "pending": {
                    status = <span
                        className="refier_text_on_light__4"
                        style={{
                            "wordWrap": "normal", "margin": "0 10px",
                            "color": "black"
                        }}>
                        Pending for Approval
                            </span>
                    break;
                }
                case "previous": {
                    status = <span
                        className="refier_text_on_light__4"
                        style={{
                            "wordWrap": "normal", "margin": "0 10px",
                            "color": "black"
                        }}>
                        Completed
                            </span>
                    break;
                }
                default:
                    break;
            }
        }
        return (<span>
            {status}
        </span>)
    }

    formatEventTopic(row) {
        let tagValues = row.fields.session_id.tag_values
        tagValues = JSON.parse(tagValues)
        let tags = []
        for (let i = 0; i < tagValues.length; i++) {
            let index = this.props.index ? this.props.index + i : i
            index = index % 4
            tags.push(
                <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                    className={"custom-list-tag-" + index}>
                    {tagValues[i].fields.tag_name}</span>)
        }
        if (row.fields.session_id.topic != null)
            return (
                <div>
                    <Link style={{marginLeft:"10px"}}
                        to={"/userDashboard/webinarinfo/" + row.fields.session_id.session_id}
                        className=" refier_text_on_light__4 custom-link"
                        style={{
                            "wordWrap": "normal", "background": "white",
                         "marginLeft": "10px"
                        }}>
                        {row.fields.session_id.topic}
                    </Link>
                    <div style={{ "marginLeft": "10px" }}>{tags}</div>
                </div>)
        else
            return (
                <div>
                    <div
                        className="refier_text_on_light__4"
                        style={{
                            "wordWrap": "normal", "background": "white",
                            "color": "black", "marginLeft": "10px"
                        }}>{"--"}
                    </div>
                    <div style={{ "marginLeft": "10px" }}>{tags}</div>
                </div>)
    }

    formatEventDescription(row) {
        if (row.fields.session_id.description != null)
            return (
                <span
                    className="refier_text_on_light__4"
                    style={{
                        "wordWrap": "normal", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>
                    {row.fields.session_id.description}
                </span>)
        else
            return (
                <span
                    className="refier_text_on_light__4"
                    style={{
                        "wordWrap": "normal", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>{"--"}
                </span>)
    }

    formatEventDate(row) {
        if (row.fields.session_id.start_date_time != null)
            return (
                <span
                    className="refier_text_on_light__4"
                    style={{
                        "wordWrap": "normal", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>
                    {formatdatefunction(row.fields.session_id.start_date_time, "short")} {formatdatefunction(row.fields.session_id.start_date_time, "time")}
                </span>)
        else
            return (
                <span
                    className="refier_text_on_light__4"
                    style={{
                        "wordWrap": "normal", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>{"--"}
                </span>)
    }

    formatEventMap(row) {
        let mapping, event_receiver
        if (row.fields.session_id.mapping) {
            mapping = JSON.parse(row.fields.session_id.mapping)
            if (mapping.length > 0) {
                for (let i = 0; i < mapping.length; i++) {
                    if (mapping[i].length > 0) {
                        if (mapping[i][0].fields.school_community_id) {
                            let event_receivers = JSON.parse(mapping[i][0].fields.school_community_id)
                            let community_name = event_receivers[0].fields.entity_name == REFIER_OPEN_COMMUNITY ?
                                REFIER_OPEN_COMMUNITY_NICKNAME:event_receivers[0].fields.entity_name
                            event_receiver = (event_receiver ? event_receiver + " , " : "") +
                                community_name
                        }
                        if (mapping[i][0].fields.user_id) {
                            let event_receivers = JSON.parse(mapping[i][0].fields.user_id)
                            event_receiver = (event_receiver ? event_receiver + " , " : "") +
                                event_receivers[0].fields.first_name + " " + (event_receivers[0].fields.last_name ? event_receivers[0].fields.last_name != "None" ? event_receivers[0].fields.last_name : "" : "")
                        }
                    }
                }
            }
            return (
                <span
                    className="refier_text_on_light__4"
                    style={{
                        "wordWrap": "normal", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>
                    {event_receiver}
                </span>)
        }
        else {
            return (
                <span
                    className="refier_text_on_light__4"
                    style={{
                        "wordWrap": "normal", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>{"--"}
                </span>)
        }
    }

    formatEventMentor(row) {
        let name = ""
        if (row.fields.session_id.mentor_id.first_name != null) {
            if (row.fields.session_id.mentor_id.last_name &&
                row.fields.session_id.mentor_id.last_name != "None" &&
                row.fields.session_id.mentor_id.last_name != "Null") {
                name = row.fields.session_id.mentor_id.first_name + " " + row.fields.session_id.mentor_id.last_name
            }
            else {
                name = row.fields.session_id.mentor_id.first_name
            }
        }


        let photo = row.fields.session_id.mentor_id.profile_photo

        if (row.fields.session_id.mentor_id.first_name != null)
            return (
                    <div
                    className="refier_text_on_light__4"
                    style={{marginLeft:"10px", marginRight:"10px"}}>
                        <span>
                        <img src={
                            photo || 
                            photo != ""? 
                                MEDIA_URL_TEXT +
								photo:imageSrc}
                                className="custom-card-img-small" />
                        </span>
                        <Link style={{marginLeft:"10px"}}
                        to={"/userDashboard/profile/" + row.fields.session_id.mentor_id.id}>
                            {name}
                        </Link>
                    </div>

                // <span
                //     className="refier_text_on_light__4"
                //     style={{
                //         "wordWrap": "normal", "background": "white",
                //         "color": "black", "marginLeft": "10px"
                //     }}>
                //     <Link to={"/userDashboard/profile/" + row.fields.session_id.mentor_id.id}>
                //         {row.fields.session_id.mentor_id.first_name} {row.fields.session_id.mentor_id.last_name}
                //     </Link>
                // </span>
                )
        else
            return (
                <span
                    className="refier_text_on_light__4"
                    style={{
                        "wordWrap": "normal", "background": "white",
                        "color": "black", "marginLeft": "10px"
                    }}>{"--"}
                </span>)
    }

    filterWithSubString(filter, row) {
        if (row[filter.id])
            return row[filter.id].toLocaleLowerCase().
                includes(filter.value.toLocaleLowerCase())
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

    filterMentor(filter, row) {
        if (row[filter.id]) {
            if (row[filter.id].props.children[1].props.children)
                if (row[filter.id].props.children[1].props.children.length > 0) {
                        if (row[filter.id].props.children[1].props.children.toLocaleLowerCase().
                            includes(filter.value.toLocaleLowerCase()))
                            return true
                }
        }
        return false
    }

    filterUserEntityMap(filter, row) {
        if (row[filter.id]) {
            // console.log("row",row[filter.id])
            if (row[filter.id].props.children.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase()))
                return true
        }
        return false
    }

    filterTopic(filter, row) {
        if (row[filter.id]) {
            //console.log("row",row)
            if (row[filter.id].props.children.props.children)
                if (row[filter.id].props.children.props.children.toLocaleLowerCase().
                    includes(filter.value.toLocaleLowerCase()))
                    return true
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

    generateEventURL(row) {
        if(row.fields.generated_url !== '' || row.fields.generated_url.length > 0) {
            return (
                <div key={row.pk}>
                    <div style={{marginLeft: '10px'}} key={row.pk} ref={this.attachRef}>
                        <FontAwesome name="clipboard" 
                            title="Copy"
                            style={{marginRight: '5px', fontSize: '18px', cursor: 'pointer'}}
                            onClick={() => this.copyUrlToClipboard(row.fields.generated_url)} />
                        <span style={{background: 'rgba(0,0,0,0.1)', padding: '5px'}}>{row.fields.generated_url}</span>
                    </div>
                    <Overlay target={this.state.target} show={this.state.tooltipOpen} placement="left" rootClose>
                        <Tooltip>
                            Copied!
                        </Tooltip>
                    </Overlay>
                </div>
            )
        }
        else {
            return <div key={row.pk} style={{marginLeft: '10px'}}>
                        <PrimaryButton 
                            buttonText="Generate"
                            onButtonClick={() => this.props.generateEventURL(row.pk)}
                        />
                    </div>
        }
    }


    render() {
        console.log("UserServiceTable::this.props", this.props)

        if (typeof this.props === "undefined" || typeof this.props.data === "undefined") {
            return <div>Loading</div>;
        }

        let reactTableColumns = [
            {
                Header: props => <span className="refier_text_on_light__table_header" >Topic</span>,
                id: "topic",
                accessor: row => this.formatEventTopic(row),
                filterMethod: (filter, row) => this.filterTopic(filter, row),
                Filter: ({ filter, onChange }) =>
                    <input
                        onChange={event => onChange(event.target.value)}
                        placeholder={"Search Topic"}
                        style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "12px" }}
                    />
            },
            {
                Header: props => <span title="Description" className="refier_text_on_light__table_header" >Description</span>,
                id: "description",
                accessor: row => this.formatEventDescription(row),
                filterMethod: (filter, row) => this.filterTopic(filter, row),
                Filter: ({ filter, onChange }) =>
                    <input
                        onChange={event => onChange(event.target.value)}
                        type="text"
                        placeholder={"Search Description"}
                        style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "12px" }}
                    />

            },
            {
                Header: props => <span title="Date-Time" className="refier_text_on_light__table_header" >Date-Time</span>,
                id: "date-time",
                accessor: row => this.formatEventDate(row),
                filterMethod: (filter, row) => this.filterDate(filter, row),
                Filter: ({ filter, onChange }) =>
                    <input
                        onChange={event => onChange(event.target.value)}
                        type="date"
                        placeholder={"Search Date"}
                        style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "12px" }}
                    />
            },
            {
                Header: props => <span title="Mentor Name" className="refier_text_on_light__table_header" >Mentor Name</span>,
                id: "mentor",
                accessor: row => this.formatEventMentor(row),
                filterMethod: (filter, row) => this.filterMentor(filter, row),
                Filter: ({ filter, onChange }) =>
                    <input
                        onChange={event => onChange(event.target.value)}
                        placeholder={"Search Mentor"}
                        style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "12px" }}
                    />
            },
            {
                Header: props => <span title="Community/User" className="refier_text_on_light__table_header" >Community / User</span>,
                id: "communityusermap",
                accessor: row => this.formatEventMap(row),
                filterMethod: (filter, row) => this.filterUserEntityMap(filter, row),
                Filter: ({ filter, onChange }) =>
                    <input
                        onChange={event => onChange(event.target.value)}
                        type="text"
                        placeholder={"Search Community / User"}
                        style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "12px" }}
                    />

            },
            {
                Header: props => <span className="refier_text_on_light__table_header" >Status</span>,
                id: "status",
                accessor: row => this.formatStatus(row, this.props),
                filterable: false,
            },
        ]



        let reactTableView = this.props.data.length != 0 ?
            <ReactTable
                data={this.props.data}
                columns={reactTableColumns}
                defaultPageSize={5}
                filterable
            />
            :
            <Grid fluid>
                <Col xs={12} style={{ "textAlign": "center" }}>
                    <div className="refier_custom_light_panel_title"
                        style={{
                            "padding": "0px 10px 10px", textAlign: "center", fontSize: "16px"
                        }}>No Entries Available
                </div>
                </Col>
            </Grid>

        return (
            <div style={{ "padding": "20px 20px", "minHeight": "50vh" }}>
                {reactTableView}
            </div>
        );
    }
}

export default UserServiceTableNew;
