import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, ButtonToolbar, Modal, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import CommonModal from '../../shared/CommonModal'
import Preloader from '../../shared/Preloader/PreLoader'
import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';


class ChangePasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            confirmPassword: "",
            passwordMatch: false,
            errorMessage: []
        };
        this.setConfirmPassword = this.setConfirmPassword.bind(this)
        this.setNewPassword = this.setNewPassword.bind(this)
        this.checkIfPasswordMatches = this.checkIfPasswordMatches.bind(this)
        this.setPasswordMatch = this.setPasswordMatch.bind(this)
        this.setErrorMessage = this.setErrorMessage.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.passwordChangeStatus && this.props.passwordChangeStatus !== nextProps.passwordChangeStatus) {
            this.setErrorMessage(nextProps.passwordChangeStatus);
        }
    }


    setNewPassword(e) {
        //console.log("new password : ", e.target.value)
        this.setState({ newPassword: e.target.value }, this.checkIfPasswordMatches.bind(this))
    }

    setConfirmPassword(e) {
        //console.log("confirm password : ", e.target.value)
        this.setState({ confirmPassword: e.target.value }, this.checkIfPasswordMatches.bind(this))

    }

    setPasswordMatch(isMatched) {
        //console.log("Passwords Matched : ", isMatched)
        this.setState({ passwordMatch: isMatched })
    }

    setErrorMessage(msg) {
        let temp = [];
        if (this.state.errorMessage.length > 0) {
            temp = temp.concat(this.state.errorMessage);
        }
        temp.push(msg);
        this.setState({ errorMessage: temp });
    }

    checkIfPasswordMatches() {
        if (this.state.newPassword !== "" && this.state.confirmPassword !== "") {
            if (this.state.newPassword.length < 8) {
                this.setPasswordMatch(false)
            }
            if (this.state.newPassword === this.state.confirmPassword) {
                this.setState({ errorMessage: [] });
                this.setPasswordMatch(true)
            } else {
                this.setPasswordMatch(false)
            }

        }
        else {
            this.setPasswordMatch(false)
        }
    }

    render() {

        let editForm =
            <form ref={(form) => { this.passwordChangeForm = form }}>
                <FormGroup style={{ "margin": "5px 0" }} controlId="basicDetails">
                    <Row style={{ "margin": "5px 20px" }}>
                        <Col xs={11}>
                            <FormControl
                                className="refier_text_on_light__3"
                                style={{ 'fontWeight': '600', "fontSize": "14px" }}
                                placeholder="Current Password"
                                type="password" name="currentPassword" />
                        </Col>
                    </Row>

                    <Row style={{ "margin": "5px 20px" }}>
                        <Col xs={11}>
                            <FormControl
                                className="refier_text_on_light__3"
                                style={{ 'fontWeight': '600', "fontSize": "14px" }}
                                placeholder="New Password"
                                type="password" name="newPassword" onChange={this.setNewPassword} />
                        </Col>
                    </Row>

                    <Row style={{ "margin": "5px 20px" }}>
                        <Col xs={11}>
                            <FormControl
                                className="refier_text_on_light__3"
                                style={{ 'fontWeight': '600', "fontSize": "14px" }}
                                placeholder="Confirm Password"
                                type="password" name="confirmPassword"
                                onChange={this.setConfirmPassword} />
                        </Col>
                        {this.state.passwordMatch ?
                            <Col xs={1}>
                                <FontAwesome
                                    name="check"
                                    
                                    className="checkIcon"
                                />
                            </Col>
                            :
                            null
                        }
                    </Row>
                    <Row style={{ "margin": "10px 20px", "textAlign": "right" }}>

                        {this.props.changedPassword == 2 ?
                            <Col xs={12} style={{ "textAlign": "left" }}>
                                <Preloader />
                            </Col>
                            :
                            this.props.changedPassword == 1 ?
                                <Col xs={12} style={{ "textAlign": "left" }}>
                                    <div style=
                                        {{ "color": "#008744" }}>
                                        Password Changed Successfully
                            </div>
                                </Col>
                                :
                                this.props.changedPassword == -1 ?
                                    <Col xs={12} style={{ "textAlign": "left" }}>
                                        <div style=
                                            {{ "color": "#d62d20" }}>
                                            Some Error occured in changing Password
                            </div>
                                    </Col>
                                    :
                                    this.state.passwordMatch ?
                                        <Col xs={2} style={{ "textAlign": "right" }}>
                                            <ButtonToolbar>
                                                <PrimaryButton 
                                                    onButtonClick={() => this.props.changeUserPassoword(this.passwordChangeForm)}
                                                    buttonText="Save"
                                                />
                                            </ButtonToolbar>
                                        </Col> :
                                        <Col xs={2} style={{ "textAlign": "right" }}>
                                            <ButtonToolbar>
                                                <PrimaryButton 
                                                    disabled={true}
                                                    buttonText="Save"
                                                />
                                            </ButtonToolbar>
                                        </Col>
                        }
                    </Row>
                </FormGroup>
            </form>


        return (
            <CommonModal close={this.props.close}
                showModal={this.props.showModal}
                modalHeading="Change Password"
                modalBody={editForm} />
        )


    }
}
export default ChangePasswordModal;