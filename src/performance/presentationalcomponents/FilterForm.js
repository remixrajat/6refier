import React, { Component } from 'react';
import { Form, FormControl, InputGroup, FormGroup, Col, Grid, Button } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentNameDD: null,
            clsSectionDD: null,
            subjectNameDD: null,
            examNameDD: null
        };
        this.memberDesignation = "";
    }

    handleClsSectionDropDown(newValue) {
        // console.log("PerformanceController::handleDropDown::", newValue);
        // {label: "Class  L.K.G", value: "Class  L.K.G", id: "84cc04b0-ae13-4311-aa86-68833766f0b4"}
        this.setState({ "clsSectionDD": newValue })
    }

    handleStudentNameDropDown(newValue) {
        // console.log("PerformanceController::handleDropDown::", newValue);
        // {label: "Ayush Poddar ", value: "Ayush Poddar ", id: "72e53255-7ea3-4147-aa74-1fcfe605e7b6"}
        this.setState({ "studentNameDD": newValue });
    }

    handleSubjectNameDropDown(newValue) {
        //console.log("PerformanceController::handleDropDown::",newValue);
        this.setState({ "subjectNameDD": newValue })
    }

    handleExamNameDropDown(newValue) {
        //console.log("PerformanceController::handleDropDown::",newValue);
        this.setState({ "examNameDD": newValue })
    }

    handleSubmit(e) {
        let formData = {
            students_filter: this.state.studentNameDD ? this.state.studentNameDD.map(a => a.id) : null,
            sub_entities_filter: this.state.clsSectionDD ? this.state.clsSectionDD.map(a => a.id) : null,
            subject_filter: this.state.subjectNameDD ? this.state.subjectNameDD.map(a => a.id) : null,
            exam_filter: this.state.examNameDD ? this.state.examNameDD.map(a => a.id) : null
        }
        console.log("PerformanceController::memberDesignationList::", this.memberDesignation);
        if(this.props.DESIGNATIONS.STUDENT === this.memberDesignation){
            console.log("PerformanceController::memberDesignationList::");
            formData.students_filter = [this.props.profileUserId];
        }
        console.log("PerformanceController::handleDropDown::",formData);
        this.props.submitFilterForm(formData);
    }


    render() {
        this.memberDesignation = this.props.memberDesignationList ?
                                    this.props.memberDesignationList[this.props.match.params.communityid].designation : null;
        // console.log("PerformanceController::memberDesignationList::", this.props, this.memberDesignation);
        return (
            <div>
                {this.props.DESIGNATIONS.STUDENT !== this.memberDesignation ?
                    <Col xs={12} sm={6} style={{ paddingTop: "20px" }} >
                        <Select
                            name="student_name" multi={true}
                            placeholder="Select Student Name"
                            options={this.props.studentNameOptions || []}
                            value={this.state.studentNameDD}
                            isLoading={!this.props.studentNameOptions}
                            /* onInputChange = {this.props.getStudentName}  */
                            onChange={this.handleStudentNameDropDown.bind(this)}
                        />
                    </Col>
                    : null}
                {this.props.DESIGNATIONS.STUDENT !== this.memberDesignation ?
                    <Col xs={12} sm={6} style={{ paddingTop: "20px" }}>
                        <Select
                            name="cls_section"
                            placeholder="Select Classes"
                            multi={true}
                            options={this.props.clsSectionOptions || []}
                            value={this.state.clsSectionDD}
                            isLoading={(this.props.ClsSectionOptions !== undefined)}
                            /* onInputChange = {this.props.getClsSectionOptions} */
                            onChange={this.handleClsSectionDropDown.bind(this)}
                        />
                    </Col>
                    : null}
                <Col xs={12} sm={6} style={{ paddingTop: "20px" }}>
                    <Select
                        name="subjects"
                        placeholder="Select Subjects"
                        multi={true}
                        options={this.props.subjectNameOptions || []}
                        value={this.state.subjectNameDD}
                        isLoading={!this.props.subjectNameOptions}
                        /* onInputChange = {this.props.getSubjectsOptions} */
                        onChange={this.handleSubjectNameDropDown.bind(this)}
                    />
                </Col>
                <Col xs={12} sm={6} style={{ paddingTop: "20px" }}>
                    <Select
                        name="exam_name"
                        placeholder="Select Examinations"
                        multi={true}
                        options={this.props.examNameOptions || []}
                        value={this.state.examNameDD}
                        isLoading={!this.props.examNameOptions}
                        /* onInputChange = {this.props.getExamOptions} */
                        onChange={this.handleExamNameDropDown.bind(this)}
                    />
                </Col>
                <Col xs={9} sm={7} smOfsfset={3}  md={6} mdOffset={3} style={{ paddingTop: "20px" }}>
                    <Button bsStyle="primary" bsSize="large" block
                        onClick={this.handleSubmit.bind(this)}
                        disabled={!this.props.isSubmitComplete}>{this.props.isSubmitComplete ? "Submit" : "Fetching Students Record. Please Wait ..."}
                    </Button>
                </Col>
            </div>

        );
    }
}

export default FilterForm;