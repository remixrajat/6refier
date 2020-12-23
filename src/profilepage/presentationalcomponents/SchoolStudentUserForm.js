import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, 
    FormControl, ControlLabel } 
    from 'react-bootstrap';

import PreLoader from '../../shared/Preloader/PreLoader'


export default class SchoolStudentUserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stream: '',
            classYear: '',
            schoolName: '',
        }

        this.submitDetails = this.submitDetails.bind(this);
    }

    submitDetails(e) {
        e.preventDefault();

        // if(!this.state.industry || !this.state.designation) {
        //     return
        // }

        let profiledata = {}
        profiledata.instituteName = this.state.schoolName
        profiledata.year = this.state.classYear
        profiledata.clsSec = this.state.stream

        this.props.submitUserDetails(profiledata, 2)
    }

    
    render() {
        // console.log('SchoolStudentUserForm:: state', this.state)

        return (
            <Form horizontal onSubmit={this.submitDetails} className="group-discussion-form">
                <FormGroup className="intro-form-components">
                    <Col xs={12}>
                        <ControlLabel>School Name</ControlLabel>
                        <FormControl 
                            state={this.state.schoolName}
                            onChange={(e) => this.setState({schoolName: e.target.value})}
                            type="text" 
                            required
                            autoFocus
                            // placeholder="School Name" 
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="intro-form-components">
                    <Col xs={12} sm={3} className="intro-form-components-mobile-spacing">
                        <ControlLabel>Class</ControlLabel>
                        <FormControl 
                            state={this.state.classYear}
                            onChange={(e) => this.setState({classYear: e.target.value})}
                            type="number" 
                            required
                            // placeholder="Class ?" 
                        />
                    </Col>
                    <Col xs={12} smOffset={1} sm={8}>
                        <ControlLabel>Stream (for students above 10th class)</ControlLabel>
                        <FormControl 
                            state={this.state.stream}
                            onChange={(e) => this.setState({stream: e.target.value})}
                            type="text" 
                            // placeholder="Stream (for students above 10th class)" 
                        />
                    </Col>
                </FormGroup> 
                <FormGroup className="intro-form-components intro-userform-button">
                    { this.props.loaderStatus === 2 ? 
                        <Col xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                            <PreLoader />
                        </Col> :
                        <Col xs={12} style={{textAlign: 'center'}}>
                            <Button
                                className="refier_custom_button_save" 
                                type="submit">Submit
                            </Button>
                        </Col>
                    }
                </FormGroup> 
            </Form>
        )
    }
}