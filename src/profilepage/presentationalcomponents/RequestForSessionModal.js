import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, ButtonToolbar, Modal, Button } from 'react-bootstrap';
import CommonModal from '../../shared/CommonModal'

class RequestForSessionModal extends Component {


    render() {
        console.log("RequestForSessionModal", this.props)
        let dob = "";
        let profileName = this.props.userProfileData.last_name &&
            this.props.userProfileData.last_name != "Null" &&
            this.props.userProfileData.last_name != "None" ?
            this.props.userProfileData.first_name + " " + this.props.userProfileData.last_name
            :
            this.props.userProfileData.first_name;
        let mobile = this.props.userProfileData.mobile_number;
        let email = this.props.userProfileData.email;
        let gender = this.props.userProfileData.gender;
        if (this.props.userProfileData.date_of_birth) {
            let date = new Date(this.props.userProfileData.date_of_birth);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;

            dob = year + "-" + month + "-" + day;
        }

        let editForm =
            <form ref={(form) => { this.userdetailsform = form }}>
                <FormGroup style={{ "margin": "5px 0" }} controlId="basicDetails">
                    <Row style={{ "margin": "5px 20px" }}>
                        <Col xs={3}>
                            <ControlLabel
                                className="refier_text_on_light__4"
                                style={{ 'fontWeight': '500', "fontSize": "14px", "margin": "5px 0px" }}
                            >Expert Name</ControlLabel>
                        </Col>
                        <Col xs={9}>
                            <FormControl
                                className="refier_text_on_light__3"
                                style={{ 'fontWeight': '600', "fontSize": "14px" }}
                                placeholder="Enter Name"
                                type="text" name="profileName" value={profileName} />
                        </Col>
                    </Row>

                    <Row style={{ "margin": "5px 20px" }}>
                        <Col xs={3}>
                            <ControlLabel
                                className="refier_text_on_light__4"
                                style={{ 'fontWeight': '500', "fontSize": "14px", "margin": "5px 0px" }}
                            >Date of Session</ControlLabel>
                        </Col>
                        <Col xs={9}>
                            <FormControl
                                className="refier_text_on_light__3"
                                style={{ 'fontWeight': '600', "fontSize": "14px" }}
                                type="date" name="dos" />
                        </Col>
                    </Row>

                    <Row style={{ "margin": "5px 20px" }}>
                        <Col xs={3} >
                            <ControlLabel
                                className="refier_text_on_light__4"
                                style={{ 'fontWeight': '500', "fontSize": "14px", "margin": "5px 0px" }}
                            >Duration of Session</ControlLabel>
                        </Col>
                        <Col xs={9}>
                            <FormControl
                                className="refier_text_on_light__3"
                                style={{ 'fontWeight': '600', "fontSize": "14px" }}
                                componentClass="select" placeholder="Select Duration" name="gender"
                                defaultValue={"30 Minutes"}>
                                <option value="" disabled >select</option>
                                <option value="30"  >30 Minutes</option>
                                <option value="60"  >60 Minutes</option>
                            </FormControl>
                        </Col>
                    </Row>

                    <Row style={{ "margin": "5px 20px" }}>
                        <Col xs={3}>
                            <ControlLabel
                                className="refier_text_on_light__4"
                                style={{ 'fontWeight': '500', "fontSize": "14px", "margin": "5px 0px" }}
                            >Email ID</ControlLabel>
                        </Col>
                        <Col xs={9}>
                            <FormControl
                                className="refier_text_on_light__3"
                                style={{ 'fontWeight': '600', "fontSize": "14px" }}
                                type="text" name="email" defaultValue={email} readOnly={true} />
                        </Col>
                    </Row>

                    <Row style={{ "margin": "5px 20px" }}>
                        <Col xs={3} style={{ "textAlign": "right" }}>
                            <ButtonToolbar>
                                <Button bsStyle="primary"
                                    style={{
                                        "backgroundColor": "rgba(72, 82, 140, 1)", "margin": "5px 0px",
                                        "paddingLeft": "10px", "paddingRight": "10px"
                                    }} block
                                    onClick={() => { this.props.onSave(this.userdetailsform) }} >Save</Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </FormGroup>
            </form>


        return (
            <CommonModal close={this.props.close}
                showModal={this.props.showModal}
                modalHeading="User Details"
                modalBody={editForm} />
        )


    }
}
export default RequestForSessionModal;