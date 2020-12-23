import React, { Component } from 'react';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, 
    FormControl, ControlLabel } 
    from 'react-bootstrap';

import PreLoader from '../../shared/Preloader/PreLoader'
import { INDUSTRY_NAMES } from '../../GlobalConstants'


export default class EntrepreneurForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organisation: '',
            experience: 0,
            industry: undefined,
            city: '',
        }

        this.getIndustries = this.getIndustries.bind(this);
        this.submitDetails = this.submitDetails.bind(this);
    }

    getIndustries() {
        let industryNames = []

        for(let name of INDUSTRY_NAMES) {
            let nameObj = {}
            nameObj['value'] = name
            nameObj['label'] = name.toLowerCase()
            industryNames.push(nameObj)
        }

        return industryNames
    }

    setIndustryName(newValue) {
        this.setState({ industry: newValue })
    }
    
    submitDetails(e) {
        e.preventDefault();

        // if(!this.state.industry || !this.state.designation) {
        //     return
        // }

        let profiledata = {}
        profiledata.organisation = this.state.organisation
        profiledata.experience = this.state.experience
        profiledata.industry = this.state.industry['value'].trim()
        profiledata.jobLocation = this.state.city
        profiledata.designation = 'Founder'

        this.props.submitUserDetails(profiledata, 3)
    }

    
    render() {
        // console.log('EntrepreneurForm:: state', this.state)

        return (
            <Form horizontal onSubmit={this.submitDetails} className="group-discussion-form">
                <FormGroup className="intro-form-components">
                    <Col xs={12}>
                        <ControlLabel>Organisation Name</ControlLabel>
                        <FormControl 
                            state={this.state.organisation}
                            onChange={(e) => this.setState({organisation: e.target.value})}
                            type="text" 
                            required
                            autoFocus
                            // placeholder="Organisation Name" 
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="intro-form-components">
                    <Col xs={12} sm={5} className="intro-form-components-mobile-spacing">
                        <ControlLabel>Years in Business</ControlLabel>
                        <FormControl 
                            state={this.state.experience}
                            onChange={(e) => this.setState({experience: e.target.value})}
                            type="number" 
                            required
                            // placeholder="How many years of experience?" 
                        />
                    </Col>
                    <Col xs={12} smOffset={1} sm={6}>
                        <ControlLabel>City</ControlLabel>
                        <FormControl 
                            state={this.state.city}
                            onChange={(e) => this.setState({city: e.target.value})}
                            type="text" 
                            required
                            // placeholder="City" 
                        />
                    </Col>
                </FormGroup> 
                <FormGroup className="intro-form-components">
                    <Col xs={12}>
                        <ControlLabel>Industry</ControlLabel>
                        <Select
                            name="industry_select"
                            multi={false}
                            placeholder="Select your Industry"
                            options={this.getIndustries()}
                            value={this.state.industry}
                            removeSelected={true}
                            rtl={false}
                            onChange={this.setIndustryName.bind(this)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="intro-form-components">
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