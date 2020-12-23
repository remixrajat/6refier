import React, { Component } from 'react';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, 
    FormControl, ControlLabel } 
    from 'react-bootstrap';

import PreLoader from '../../shared/Preloader/PreLoader'
import { ACADEMIC_DISCIPLINE } from '../../GlobalConstants'


export default class LookingForJobForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discipline: undefined,
            year: 0,
            universityName: '',
        }

        this.getDisciplines = this.getDisciplines.bind(this);
        this.submitDetails = this.submitDetails.bind(this);
    }

    getDisciplines() {
        let disciplines = []

        for(let name of ACADEMIC_DISCIPLINE) {
            let nameObj = {}
            nameObj['value'] = name
            nameObj['label'] = name
            disciplines.push(nameObj)
        }

        return disciplines
    }
    
    setDiscipline(newValue) {
        this.setState({ discipline: newValue })
    }

    submitDetails(e) {
        e.preventDefault();

        // if(!this.state.industry || !this.state.designation) {
        //     return
        // }

        let profiledata = {}
        profiledata.instituteName = this.state.universityName
        profiledata.year = this.state.year
        profiledata.clsSec = this.state.discipline['value']

        this.props.submitUserDetails(profiledata, 2)
    }

    
    render() {
        // console.log('LookingForJobForm:: state', this.state)

        return (
            <Form horizontal onSubmit={this.submitDetails} className="group-discussion-form">
                <FormGroup className="intro-form-components">
                    <Col xs={12}>
                        <ControlLabel>Institute Name</ControlLabel>
                        <FormControl 
                            state={this.state.universityName}
                            onChange={(e) => this.setState({universityName: e.target.value})}
                            type="text" 
                            required
                            autoFocus
                            // placeholder="University/ College Name" 
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="intro-form-components">
                    <Col xs={12} sm={7} className="intro-form-components-mobile-spacing">
                        <ControlLabel>Highest Qualification</ControlLabel>
                        <Select
                            name="discipline_select"
                            multi={false}
                            placeholder="Select your Academic Discipline"
                            options={this.getDisciplines()}
                            value={this.state.discipline}
                            removeSelected={true}
                            rtl={false}
                            onChange={this.setDiscipline.bind(this)}
                        />
                    </Col>
                    <Col xs={12} smOffset={1} sm={4}>
                        <ControlLabel>Experience (in years)</ControlLabel>
                        <FormControl 
                            state={this.state.year}
                            onChange={(e) => this.setState({year: e.target.value})}
                            type="number" 
                            // placeholder="Years in Experience" 
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