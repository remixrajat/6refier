import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel, ButtonToolbar, ListGroupItem, ListGroup, Dropdown, MenuItem } from 'react-bootstrap';
import ProfessionsalDetailsList from './ProfessionsalDetailsList';
import FontAwesome from 'react-fontawesome';


export default class ProffessionalDetailsCards extends Component {

    constructor(props) {
        super(props);
        this.get_professional_form = this.get_professional_form.bind(this);
        this.state = { is_currently_working: false }
        this.onChangeCurrentlyWorkingCheckbox = this.onChangeCurrentlyWorkingCheckbox.bind(this);
    }

    onChangeCurrentlyWorkingCheckbox(e) {
        this.setState({ is_currently_working: e.target.checked })
    }

    formatDateForTB(dateVal) {
        let dob;
        if (dateVal) {
            let date = new Date(dateVal);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;

            dob = year + "-" + month + "-" + day;
        }
        return dob;
    }

    get_professional_form(onSave, onCancel, profileData) {
        let self = this;
        let profileforms;
        const professional_form = (
            <ListGroupItem className=" refier_text_on_light__3" style={{ 'fontWeight': '700', "textAlign": "left", padding: "10px" }}>
                <form ref={(formD) => { profileforms = formD }}>
                    <FormGroup >
                        <FormControl type="text" defaultValue={profileData ? profileData.fields.organisation : ""}
                            name={"organisation"} placeholder={"Organisation"}
                            className="refier_text_on_light__3"
                            style={{ 'fontWeight': '600', "fontSize": "14px" }} />
                    </FormGroup>
                    <FormGroup >
                        <FormControl type="text" defaultValue={profileData ? profileData.fields.designation : ""}
                            name={"designation"} placeholder={"Designation"}
                            className="refier_text_on_light__3"
                            style={{ 'fontWeight': '600', "fontSize": "14px" }} />
                    </FormGroup>
                    <FormGroup >
                        <FormControl type="text" defaultValue={profileData ? profileData.fields.location : ""}
                            name={"location"} placeholder={"Location"}
                            className="refier_text_on_light__3"
                            style={{ 'fontWeight': '600', "fontSize": "14px" }} />
                    </FormGroup>
                    <FormGroup style={{ "margin": "5px 0" }}>
                        <Row>
                            <Col xs={4}>
                                <ControlLabel
                                    className="refier_text_on_light__4"
                                    style={{ 'fontWeight': '500', "fontSize": "14px", "margin": "5px 0px" }}
                                >{"Joining Date: "}</ControlLabel>
                            </Col>
                            <Col xs={6}>
                                <FormControl type="date"
                                    name={"start_date"} defaultValue={profileData ? self.formatDateForTB(profileData.fields.start_time) : ""}
                                    className="refier_text_on_light__3"
                                    style={{ 'fontWeight': '600', "fontSize": "14px" }}
                                    placeholder={""} />

                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup style={{ "margin": "5px 0" }} >
                        <Row>
                            <Col xs={4}>
                                <ControlLabel
                                    className="refier_text_on_light__4"
                                    style={{ 'fontWeight': '500', "fontSize": "14px", "margin": "5px 0px" }}
                                >{"Leaving Date :"}</ControlLabel>
                            </Col>
                            <Col xs={6}>
                                <FormControl type="date" disabled={self.state.is_currently_working}
                                    name={"end_date"} defaultValue={profileData ? self.formatDateForTB(profileData.fields.end_time) : ""}
                                    className="refier_text_on_light__3"
                                    style={{ 'fontWeight': '600', "fontSize": "14px" }}
                                />

                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup style={{ "margin": "5px 0" }}>
                        <ControlLabel
                            className="refier_text_on_light__4"
                            style={{ 'fontWeight': '500', "fontSize": "14px" }}
                        >{"Is it Current Company ?   :    "}</ControlLabel>
                        <input type="checkbox" style={{ "marginLeft": "10px" }}
                            defaultChecked={profileData ? profileData.fields.is_currently_working:false} name={"is_currently_working"} onChange={self.onChangeCurrentlyWorkingCheckbox} />
                    </FormGroup>
                    <FormGroup >
                        <FormControl type="text" defaultValue={profileData ? profileData.fields.description : ""}
                            name={"description"} placeholder={"Description"}
                            className="refier_text_on_light__3"
                            style={{ 'fontWeight': '600', "fontSize": "14px" }} />
                    </FormGroup>
                </form>
                <ButtonToolbar style={{ "marginBottom": "20px", "marginTop": "10px" }}>
                    <Button bsStyle="primary" bsSize="small"
                        onClick={() => { onSave(profileforms, profileData) ; onCancel();}}>Save</Button>
                    <Button bsStyle="danger" bsSize="small" onClick={() => { onCancel() }}>Cancel</Button>
                </ButtonToolbar>
            </ListGroupItem>
        );
        return professional_form;
    }


    render() {
        const showEditDiv = this.props.state.showEditDiv;
        const showAddDiv = this.props.state.showAddDiv;
        const showButtons = this.props.state.showButtons;

        const readModeProfileData = this.props.userProfileData.map((profileData,i) => {
            if (!profileData.fields) {
                return
            }
            return (
                <ProfessionsalDetailsList profileData={profileData} key={i}
                    professionalEditForm={this.get_professional_form}
                    onDeleteProfileData={this.props.onDeleteProfileData}
                    updateProfileDetail={this.props.updateProfileDetail} 
                    writeAccess={this.props.writeAccess} >
                </ProfessionsalDetailsList>
            );
        });

        return (
            <Grid fluid data-label="Common Cards">
             {/* <div className=" generic-post-card" style={{ "marginTop": "1em" }} data-label="Details Cards"> */}
                <Row 
                /* style={{
                    "border": "solid transparent 1px", borderBottomColor: "#CCCCCC",
                    "padding": "10px 0px", "margin": "0px 0px"
                }} */
                className={this.props.className}>
                    <Col xs={2} md={1} style={{ "textAlign": "left" }}>
                        <FontAwesome
                            name={this.props.iconName}
                            
                            style={{ "fontSize": "16px" }}
                        />
                    </Col>
                    <Col xs={7} md={9} style={{ "textAlign": "center" }}>
                        <span
                            style={{
                                "fontSize": "18px"
                            }}>{this.props.name}</span>
                    </Col>
                    {showButtons ?
                        <Col xs={3} md={2} style={{ "textAlign": "right" }}>
                            <FontAwesome
                                name="plus"
                                
                                style={{  "fontSize": "16px", "marginLeft": "10px" }}
                                onClick={this.props.onAddFunction}
                            />
                        </Col>
                        :
                        null}
                </Row>
                <Row 
			        className="refier-card-style">
                {showAddDiv ?
                    this.get_professional_form(this.props.onSave, this.props.onCancelAdd)
                    :
                    <ListGroup style={{ marginBottom: "0px" }}>
                        {readModeProfileData}
                    </ListGroup>
                }

                </Row>
            </Grid>
        );
    }
}
