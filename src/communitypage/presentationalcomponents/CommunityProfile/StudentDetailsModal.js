import React, { Component } from 'react';
import { Table, Button, Glyphicon, Row, Col, Grid } from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal';
import { getHierarchyStringOfSchool } from '../../../HelperFunctions/getHierarchyStringOfSchool';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import FontAwesome from 'react-fontawesome';
import { formatdatefunction } from "../../../HelperFunctions/formatDateFunction";
import { ComplementaryButton } from '../../../shared/RefierComponents/ComplementaryButton'
import Preloader from '../../../shared/Preloader/PreLoader'

class StudentDetailsModal extends Component {

  filterName(filter, row) {
    if (row[filter.id]) {
      // console.log("row", row, filter)
      if (row[filter.id].props.children.props.children)
        // for (let i = 0; i < row[filter.id].props.children.props.children.length; i++) {
          if (row[filter.id].props.children.props.children.toLocaleLowerCase().
            includes(filter.value.toLocaleLowerCase()))
            return true
        // }
    }
    return false
  }

  filterTopic(filter, row) {
    if (row[filter.id]) {
      //console.log("row", row)
      if (row[filter.id].props.children)
        if (row[filter.id].props.children.toLocaleLowerCase().
          includes(filter.value.toLocaleLowerCase()))
          return true
    }
    return false
  }

  formatEventTopic(row) {
    if (row.fields.session_id.topic != null)
      return (
        <span
          className="refier_text_on_light__4"
          style={{
            "wordWrap": "normal", "fontSize": "14px", "background": "white",
            "color": "black", "marginLeft": "10px"
          }}>
          {row.fields.session_id.topic}
        </span>)
    else
      return (
        <span
          className="refier_text_on_light__4"
          style={{
            "wordWrap": "normal", "fontSize": "14px", "background": "white",
            "color": "black", "marginLeft": "10px"
          }}>{"--"}
        </span>)
  }

  formatStudentName(row) {
    let name = row.fields.community_member.last_name &&
      row.fields.community_member.last_name != "Null" &&
      row.fields.community_member.last_name != "None" ?
      row.fields.community_member.first_name + " " + row.fields.community_member.last_name
      :
      row.fields.community_member.first_name
    if (row.fields.community_member.last_name != null)
      return (
        <Link to={"/userDashboard/profile/" + row.fields.community_member.id}>
          <span
            className="refier_text_on_light__4"
            style={{
              "wordWrap": "normal", "fontSize": "14px", "background": "white",
              "color": "black", "marginLeft": "10px"
            }}>
            {name}
          </span>
        </Link>)
    else if (row.fields.community_member.first_name != null)
      return (
        <Link to={"/userDashboard/profile/" + row.fields.community_member.id}>
          <span
            className="refier_text_on_light__4"
            style={{
              "wordWrap": "normal", "fontSize": "14px", "background": "white",
              "color": "black", "marginLeft": "10px"
            }}>
            {row.fields.community_member.first_name}
          </span>
        </Link>)
    else
      return (
        <span
          className="refier_text_on_light__4"
          style={{
            "wordWrap": "normal", "fontSize": "14px", "background": "white",
            "color": "black", "marginLeft": "10px"
          }}>{"--"}
        </span>)
  }

  formatHierarchyString(row) {
    if (row.fields.cls_sec_entity != null)
      return (
        <span
          className="refier_text_on_light__4"
          style={{
            "wordWrap": "normal", "fontSize": "14px", "background": "white",
            "color": "black", "marginLeft": "10px"
          }}>
          {row.fields.cls_sec_entity.path}
        </span>)
    else if (row.fields.cls_sec_entity_array != null) {
      let paths = ""
      for (let i = 0; i < row.fields.cls_sec_entity_array.path.length; i++){
        if (i == 0) {
          paths = row.fields.cls_sec_entity_array.path[i]
        } else {
          paths = paths + ", " + row.fields.cls_sec_entity_array.path[i]
        }
      }
      return (
        <span
          className="refier_text_on_light__4"
          style={{
            "wordWrap": "normal", "fontSize": "14px", "background": "white",
            "color": "black", "marginLeft": "10px"
          }}>
          {paths}
        </span>)
    }
    else {
      return (
        <span
          className="refier_text_on_light__4"
          style={{
            "wordWrap": "normal", "fontSize": "14px", "background": "white",
            "color": "black", "marginLeft": "10px"
          }}>{"--"}
        </span>)
    }
  }

  formatEditDeleteButton(row) {
    return (
      <div style={{textAlign:"center"}}>
          <button onClick={e => {this.props.openEditStudentDetailsModal(e,row)}}><FontAwesome
            name="pencil"
            
          /></button>
          <button onClick={e => {this.props.openDeleteMemberModal(e,row,"student")}} style={{marginLeft:"20px"}}><FontAwesome
            name="trash-o"
            
          />
          </button>
        </div>)
  }

  formatStatusOfStudent(row) {
    let isActionPerformed = false
    if (this.props.resendMailRow) {
      if (this.props.resendMailRow == row.fields.community_member.id) {
        isActionPerformed = true
      }
    }

    if (row.fields.isJoined == true) {
      return (
        <span
          className="refier_text_on_light__4"
          style={{
            "wordWrap": "normal", "fontSize": "14px", "background": "white",
            "color": "black", "marginLeft": "10px"
          }}>
          Joined on {formatdatefunction(row.fields.joining_date,"short")}
        </span>)
    }
    else if (row.fields.isJoined == false) {
      return (
          isActionPerformed?
          this.props.resendingMailStatus == 2 ?
              <Preloader />
              :
            this.props.resendingMailStatus == 1 ?
              <div
              className="custom-info-alert"
              >
              Invite Sent
              </div>
              :
                <div>
                  <div
                    className="refier_text_on_light__4"
                    style={{
                      "wordWrap": "normal", "fontSize": "10px", "background": "white",
                      "color": "black", "marginLeft": "12px"
                    }}>
                    Not Joined
                    </div>
                  <div style={{ marginLeft: "10px", marginTop: "5px" }}>
              
                    <ComplementaryButton
                      onButtonClick={this.props.resendInviteToMember.bind
                        (this, row.fields.community_member.id)}
                      // isBlock={true}
                      buttonText={"Resend Invite"}
                    />
            </div>
              </div>
          :
          <div>
                  <div
                    className="refier_text_on_light__4"
                    style={{
                      "wordWrap": "normal", "fontSize": "10px", "background": "white",
                      "color": "black", "marginLeft": "12px"
                    }}>
                    Not Joined
                    </div>
                  <div style={{ marginLeft: "10px", marginTop: "5px" }}>
            
              
                    <ComplementaryButton
                      onButtonClick={this.props.resendInviteToMember.bind
                        (this, row.fields.community_member.id)}
                      // isBlock={true}
                      buttonText={"Resend Invite"}
                    />
            </div>
                </div>
      )
    }
  }

  formatEmail(row) {
    if (row.fields.community_member.email != null)
      return (
        <span
          className="refier_text_on_light__4"
          style={{
            "wordWrap": "normal", "fontSize": "14px", "background": "white",
            "color": "black", "marginLeft": "10px"
          }}>
          {row.fields.community_member.email}
        </span>)
    else
      return (
        <span
          className="refier_text_on_light__4"
          style={{
            "wordWrap": "normal", "fontSize": "14px", "background": "white",
            "color": "black", "marginLeft": "10px"
          }}>{"--"}
        </span>)
  }

  render() {
    console.log("studentDetailsModal", this.props.communityStudentDataState)
    let studentDetails = [];
    let students = [];
    let reactTableView;
    if (this.props.communityStudentDataState) {
          let reactTableColumns = [
        {
          Header: props => <span className="refier_text_on_light__table_header" >Student Name</span>,
          id: "name",
          accessor: row => this.formatStudentName(row),
          filterMethod: (filter, row) => this.filterName(filter, row),
          Filter: ({filter, onChange }) =>
            <input
          onChange={event => onChange(event.target.value)}
          placeholder={"Search Name"}
          style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "14px" }}
        />
        },
        {
          Header: props => <span className="refier_text_on_light__table_header" >
          {getHierarchyStringOfSchool(this.props.treeStructureJson)}</span>,
          id: "hierarchyString",
          accessor: row => this.formatHierarchyString(row),
          filterMethod: (filter, row) => this.filterTopic(filter, row),
          Filter: ({filter, onChange }) =>
            <input
          onChange={event => onChange(event.target.value)}
          type="text"
          placeholder={"Search " + getHierarchyStringOfSchool(this.props.treeStructureJson)}
          style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "14px" }}
        />

        },
        {
          Header: props => <span className="refier_text_on_light__table_header" >
          Email ID</span>,
          id: "email",
          accessor: row => this.formatEmail(row),
          filterMethod: (filter, row) => this.filterTopic(filter, row),
          Filter: ({filter, onChange }) =>
            <input
          onChange={event => onChange(event.target.value)}
          type="text"
          placeholder={"Search Email"}
          style={{ margin: "5px 5px", height: "30px", borderColor: "transparent", fontSize: "14px" }}
        />

        },
        {
          Header: props => <span className="refier_text_on_light__table_header" >
          Edit/Delete</span>,
          id: "edit",
          accessor: row => this.formatEditDeleteButton(row),
          filterable: false,

        },
        {
          Header: props => <span className="refier_text_on_light__table_header" >
          Status</span>,
          id: "status",
          accessor: row => this.formatStatusOfStudent(row),
          filterable: false,

        },
      ]

      reactTableView = this.props.communityStudentDataState.length != 0 ?
        <ReactTable
          data={this.props.communityStudentDataState}
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

    }
    
    // console.log("Student Details :: ", this.props)

    return (
      <CommonModal close={this.props.close}
          showModal={this.props.showModal}
        modalHeading={this.props.communitylabels.students}
          /* modalBody={studentDetails} */
          modalBody={reactTableView}
          size="large" />
        )


  }
}
export default StudentDetailsModal;