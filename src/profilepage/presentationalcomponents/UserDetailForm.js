import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';

import ProfessionalUserForm from './ProfessionalUserForm';
import StudentUserForm from './StudentUserForm';
import SchoolStudentUserForm from './SchoolStudentUserForm';
import LookingForJobForm from './LookingForJobForm';
import EntrepreneurForm from './EntrepreneurForm';


export default class UserDetailForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IndustryName: ''
        }
    }
    
    render() {
        // console.log("UserDetailForm :: props", this.props);

        let userType = this.props.selectedUserTypeNames, formBody = undefined

        if(userType && userType.length === 1) {
            let user = userType[0].toLowerCase()

            if(user.indexOf('school') > -1) {
                formBody = ( <SchoolStudentUserForm 
                    loaderStatus={this.props.loaderStatus} 
                    submitUserDetails={this.props.submitUserDetails} /> 
                )
            }
            else if(user.indexOf('college') > -1) {
                formBody = ( <StudentUserForm 
                    loaderStatus={this.props.loaderStatus}
                    submitUserDetails={this.props.submitUserDetails} /> )
            }
            else if(user.indexOf('professional') > -1) {
                formBody = ( <ProfessionalUserForm 
                    loaderStatus={this.props.loaderStatus}
                    submitUserDetails={this.props.submitUserDetails} /> )
            }
            else if(user.indexOf('entrepreneur') > -1) {
                formBody = ( <EntrepreneurForm 
                    loaderStatus={this.props.loaderStatus}
                    submitUserDetails={this.props.submitUserDetails} /> )
            }
            else if(user.indexOf('parent') > -1) {
                formBody = ( <ProfessionalUserForm 
                    loaderStatus={this.props.loaderStatus}
                    submitUserDetails={this.props.submitUserDetails} /> )
            }
            else if(user.indexOf('job') > -1) {
                formBody = ( <LookingForJobForm 
                    loaderStatus={this.props.loaderStatus}
                    submitUserDetails={this.props.submitUserDetails} /> )
            }
            else if(user.indexOf('teacher') > -1) {
                formBody = ( <ProfessionalUserForm 
                    loaderStatus={this.props.loaderStatus}
                    submitUserDetails={this.props.submitUserDetails} /> )
            } 
            else {
                formBody = ( <ProfessionalUserForm 
                    loaderStatus={this.props.loaderStatus}
                    submitUserDetails={this.props.submitUserDetails} /> )
            }
        } else {
            formBody = ( <ProfessionalUserForm 
                loaderStatus={this.props.loaderStatus}
                submitUserDetails={this.props.submitUserDetails} /> )
        }


        return (
            <Col mdOffset={3} md={6} smOffset={1} sm={10} className="introform-user-form-wrapper">
                {formBody}
            </Col>
        )
    }
}