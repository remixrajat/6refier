import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel, ButtonToolbar, ListGroupItem, ListGroup, Dropdown, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


class ProfessionsalDetailsList extends Component {
    constructor(props) {
        super(props);
        this.OPTIONS = [{ value: "edit", label: "Edit" }, { value: "delete", label: "Delete" }];
        this.optionsItemList = this.OPTIONS.map((option, i) => {
            return (
                <MenuItem eventKey={i} value={option.value}>{option.label}</MenuItem>
            );
        });
        this.state = { showEditDiv: false }
        this.onCancel = this.onCancel.bind(this);
    }

    formatdateTime(dateTime) {
        let dob;
        if (!dateTime) {
            dob = ""
        } else {
            dob = new Date(dateTime);
            dob = dob.toDateString()
        }
        return dob;
    }


    handleDropDownOptions(eventKey, event) {
        if (!this.props.writeAccess()) {
            return;
        }
        console.log("ProffessionalDetailsCards::", eventKey, event.target, this.OPTIONS[1].value , event.target.value);
        if (this.OPTIONS[0].label === event.target.innerHTML) {
            //console.log("ProffessionalDetailsCards:: Edit");
            this.setState({ showEditDiv: true });
        } else if (this.OPTIONS[1].label === event.target.innerHTML) {
            console.log("ProffessionalDetailsCards:: Delete");
            // this.props.delete(this.props.userProfileData[idx]);
            this.props.onDeleteProfileData(this.props.profileData);
        }
    }

    onCancel() {
        this.setState({ showEditDiv: false })
    }

    render() {
        if (!this.props.profileData) {
            return;
        }
        return (

            <div>
                {!this.state.showEditDiv ?
                    <ListGroupItem className="refier_text_on_light__3"
                        style={{
                            'fontWeight': '700', "textAlign": "left",
                            border: "0px solid transparent"
                        }} >
                        {this.props.profileData.fields.organisation}
                        {this.props.writeAccess() ?
                            <div style={{ float: "right", position: "relative", top: "-12px" }}>
                                <Dropdown pullRight bsSize="xsmall" onSelect={this.handleDropDownOptions.bind(this)} >
                                    <Dropdown.Toggle style={{ border: "0px", "backgroundColor": "#ffffff" }} />
                                    <Dropdown.Menu style={{ "minWidth": "50%" }}>
                                        {this.optionsItemList}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            :
                            null
                        }
                        <br />
                        <span style={{
                            'fontWeight': '700', "fontSize": "12px", "margin": "12px 0"
                        }}>{this.props.profileData.fields.designation || "Employee"}
                        </span>
                        <FontAwesome
                            name="circle"
                            
                            style={{ "color": "#00000", "fontSize": "8px", "margin": "-2px 5px", "position": "relative", "top": "-2px" }}
                        />
                        <span style={{ 'fontWeight': '700', "fontSize": "12px", "margin": "12px 0" }}>
                            {this.formatdateTime(this.props.profileData.fields.start_time)}{ " to "}</span>
                        {
                            this.props.profileData.fields.is_currently_working ?
                                <span style={{
                                    'fontWeight': '700', "fontSize": "12px", "margin": "12px 0"
                                }}>
                                    {" present "}
                                </span>
                                :
                                <span style={{
                                    'fontWeight': '700', "fontSize": "12px", "margin": "12px 0"
                                }}>
                                    {this.formatdateTime(this.props.profileData.fields.end_time)}
                                </span>
                        }
                        <FontAwesome
                            name="circle"
                            
                            style={{ "color": "#00000", "fontSize": "8px", "margin": "-2px 5px", "position": "relative", "top": "-2px" }}
                        />
                        <span style={{
                            'fontWeight': '700', "fontSize": "12px", "margin": "12px 0"
                        }}>{this.props.profileData.fields.location || "India"}</span>
                        <br />
                        <span className=" refier_text_on_light__4"
                            style={{
                                'fontWeight': '700', "fontSize": "12px", "margin": "12px 0"
                            }}>{this.props.profileData.fields.description || ""}</span>
                    </ListGroupItem>
                    :
                    this.props.professionalEditForm(this.props.updateProfileDetail, this.onCancel, this.props.profileData)
                }
            </div>

        );
    }
}

export default ProfessionsalDetailsList;