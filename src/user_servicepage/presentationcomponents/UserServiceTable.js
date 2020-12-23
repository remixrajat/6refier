import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Button, Grid, Col } from 'react-bootstrap';
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import {formatdatefunction} from "../../HelperFunctions/formatDateFunction";
import {Link} from 'react-router-dom';

class UserServiceTable extends Component {

    onAddClickHandler(e){
        //console.log("ButtonValue",e.target.value,e.target)
        //this.props.onAddButtonClick(e);
        let event = e.target.value
        this.props.applyForEvent(event)
    }

    createEventUrl(event_url,eventid,userId){
        let uri = event_url+ "/" + eventid + "/" + userId;
        return uri;
    }

    formatStatus(cell, row, onAdd){
        let status;
        //console.log("status",cell);
        if(this.props.status){
            switch(this.props.status){
                case "apply":{
                    status = <Button bsStyle='primary' bsSize='small'
                                className='refier_custom_button_new' 
                                value={row.pk}
                                onClick={this.onAddClickHandler.bind(this)}>APPLY</Button>
                    break;
                }
                case "approved":{
                    status = <span
                                className="refier_text_on_light__4" 
                                style={{"wordWrap": "normal","fontSize":"14px","margin":"0 10px",
                                                "color":"black"}}>
                                <Link to = {this.createEventUrl(row.fields.session_id.event_url,row.pk,this.props.userId)}>Join Event</Link>
                            </span>
                    break;
                }
                case "pending":{
                    status = <span
                                className="refier_text_on_light__4" 
                                style={{"wordWrap": "normal","fontSize":"14px","margin":"0 10px",
                                                "color":"black"}}>
                                Pending for Approval
                            </span>
                    break;
                }
                case "previous":{
                    status = <span
                                className="refier_text_on_light__4" 
                                style={{"wordWrap": "normal","fontSize":"14px","margin":"0 10px",
                                                "color":"black"}}>
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

    formatEventTopic(cell,row){
        if(row.fields.session_id.topic!=null)
            return (
                <span 
                className="refier_text_on_light__4" 
                style={{"wordWrap": "normal","fontSize":"14px", "background":"white",
                                "color":"black"}}>
                    {row.fields.session_id.topic}
            </span>)
        else
             return (
                <span 
                className="refier_text_on_light__4" 
                style={{"wordWrap": "normal","fontSize":"14px", "background":"white",
                                "color":"black"}}>{"--"}
            </span>)
    }

    formatEventDescription(cell,row){
    if(row.fields.session_id.description!=null)
        return (
            <span 
                className="refier_text_on_light__4" 
                style={{"wordWrap": "normal","fontSize":"14px", "background":"white",
                                "color":"black"}}>
                {row.fields.session_id.description}
        </span>)
    else
            return (
            <span 
                className="refier_text_on_light__4" 
                style={{"wordWrap": "normal","fontSize":"14px", "background":"white",
                                "color":"black"}}>{"--"}
        </span>)
    }

    formatEventDate(cell,row){
    if(row.fields.session_id.start_date_time!=null)
        return (
            <span 
                className="refier_text_on_light__4" 
                style={{"wordWrap": "normal","fontSize":"14px", "background":"white",
                                "color":"black"}}>
                {formatdatefunction(row.fields.session_id.start_date_time,"short")} {formatdatefunction(row.fields.session_id.start_date_time,"time")}
        </span>)
    else
            return (
            <span 
                className="refier_text_on_light__4" 
                style={{"wordWrap": "normal","fontSize":"14px", "background":"white",
                                "color":"black"}}>{"--"}
        </span>)
    }

    formatEventMentor(cell,row){
    if(row.fields.session_id.mentor_id.first_name!=null)
        return (
            <span 
                className="refier_text_on_light__4" 
                style={{"wordWrap": "normal","fontSize":"14px", "background":"white",
                                "color":"black"}}>
                <Link to={"/userDashboard/profile/" + row.fields.session_id.mentor_id.id}>
                {row.fields.session_id.mentor_id.first_name} {row.fields.session_id.mentor_id.last_name}
                </Link>
        </span>)
    else
            return (
            <span 
                className="refier_text_on_light__4" 
                style={{"wordWrap": "normal","fontSize":"14px", "background":"white",
                                "color":"black"}}>{"--"}
        </span>)
    }

    render() {
        if( typeof this.props === "undefined" || typeof this.props.data === "undefined") {
            return <div>Loading</div>;
        }
        
        let tableView = this.props.data.length!=0?
            <BootstrapTable
                data={this.props.data}
                >
                <TableHeaderColumn
                    dataField="topic"
                    className="refier_text_on_light__3"
                    dataFormat={this.formatEventTopic}
                    tdStyle={ { whiteSpace: "normal", overflowWrap: "break-word", wordBreak: "break-all" } } 
                >
                    Topic
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="description"
                    className="refier_text_on_light__3"
                    isKey
                    dataFormat={this.formatEventDescription}
                    tdStyle={ { whiteSpace: "normal", overflowWrap: "break-word", wordBreak: "break-all" } } 
                >
                    Description
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="date"
                    className="refier_text_on_light__3" 
                    dataFormat={this.formatEventDate}
                    tdStyle={ { whiteSpace: "normal", overflowWrap: "break-word", wordBreak: "break-all" } } 
                >
                    Date-Time
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="mentorName"
                    className="refier_text_on_light__3"
                    dataFormat={this.formatEventMentor}
                    tdStyle={ { whiteSpace: "normal", overflowWrap: "break-word", wordBreak: "break-all" } } 
                >
                    Mentor Name
                </TableHeaderColumn>

                <TableHeaderColumn
                    dataField="status"
                    className="refier_text_on_light__3"
                    dataFormat={this.formatStatus.bind(this)}
                    formatExtraData={this.props}
                    tdStyle={ { whiteSpace: "normal", overflowWrap: "break-word", wordBreak: "break-all" } } 
                >
                    Status
                </TableHeaderColumn>
            </BootstrapTable>
            :
            <Grid fluid>
                <Col xs={12} style={{"textAlign":"center"}}>
                    <div className="refier_custom_light_panel_title"
                                style={{
                                    "padding": "0px 10px 10px", textAlign: "center", fontSize:"16px"
                        }}>No Entries Available
                    </div>
                </Col>
            </Grid>

        return (
          <div style={{"padding":"20px 20px", "minHeight":"50vh"}}>
              {tableView}
          </div>  
        );
    }
}

export default UserServiceTable;
