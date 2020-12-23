import React from 'react';
import { Grid, Col, Row, Tab, Tabs, ButtonGroup, Button, Alert } from 'react-bootstrap';

import ReactTable from 'react-table'
import 'react-table/react-table.css'
import FontAwesome from 'react-fontawesome';
import EditCell from './EditCell'


class StudentExamTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            errorMsg: []
        };
        this.toggleEditState = this.toggleEditState.bind(this)
        this.onMonitorClick = this.onMonitorClick.bind(this)
        this.onEditClick = this.onEditClick.bind(this)
        this.createPerformanceTable = this.createPerformanceTable.bind(this);
        this.onSaveStudentsMarks = this.onSaveStudentsMarks.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.performanceTableColumns = [
            {
                Header: props => <span className="refier_text_on_light__3" >Students ID</span>,
                id: "studentsId",
                accessor: row => row.RegistrationNumber,
            },
            {
                Header: props => <span className="refier_text_on_light__3" >Students Name</span>,
                id: "studentsName",
                accessor: row => row.StudentName,
            },
        ]
    }

    updateMsg(msg) {
        let temp = [];
        if (this.state.errorMsg.length > 0) {
            temp = temp.concat(this.state.errorMsg)
        }
        temp.push(msg);
        this.setState({ errorMsg: temp });
    }

    toggleEditState() {
        this.setState({ isEdit: !this.state.isEdit })
    }

    onCancel(){
        if(this.props.getPerformanceListLength()>0){
            this.updateMsg("You have updated the Marks, but it is not saved.")
        }
        this.setState({ isEdit: false })
    }

    onMonitorClick() {
        if (this.state.isEdit) {
            return;
        }
        this.toggleEditState()
    }

    onEditClick() {
        if (!this.state.isEdit)
            this.toggleEditState()
    }

    onSaveStudentsMarks() {
        this.setState({errorMsg:[]})
        let updateStatus = this.props.addOrUpdateStudentsMarks();
        console.log("PerformanceController::onSaveStudentsMarks::resp ",updateStatus);
        let _this = this;
        updateStatus.then(function (resp) {
			if (resp.data) {
				console.log("addPerformance::1", resp.data)
				_this.updateMsg(resp.data)
			} else {
				console.log("addPerformance::2", resp)
				_this.updateMsg(resp)
			}

		})

        
    }

    createPerformanceTable() {
        let alerts;
        if (this.state.errorMsg.length > 0) {
            alerts = this.state.errorMsg.map((msg) => {
                return (
                    <li>
                        {msg}
                    </li>
                );
            });
        }
        let performanceTableColumnForTest = [];
        if (!this.state.isEdit) {
            performanceTableColumnForTest = []
            for (let j = 0; j < this.performanceTableColumns.length; j++) {
                performanceTableColumnForTest.push(this.performanceTableColumns[j])
            }
            for (let j = 0; j < this.props.studentsPerformance.Subjects.length; j++) {
                let subject = this.props.studentsPerformance.Subjects[j]
                performanceTableColumnForTest.push(
                    {
                        Header: props => <span className="refier_text_on_light__3">
                            {this.props.studentsPerformance.Subjects[j]}</span>,
                        id: subject,
                        accessor: row => row.SubjectsValue[j].Marks,
                        filterable: false
                    },
                )
            }
        } else {
            
            performanceTableColumnForTest = []
            for (let j = 0; j < this.performanceTableColumns.length; j++) {
                performanceTableColumnForTest.push(this.performanceTableColumns[j])
            }
            for (let j = 0; j < this.props.studentsPerformance.Subjects.length; j++) {
                let subject = this.props.studentsPerformance.Subjects[j]
                performanceTableColumnForTest.push(
                    {
                        Header: props => <span className="refier_text_on_light__3">
                            {this.props.studentsPerformance.Subjects[j]}</span>,
                        id: subject,
                        accessor: row => row.SubjectsValue[j].IsEditable
                            ? <EditCell marks={row.SubjectsValue[j].Marks}
                                cellData={row.SubjectsValue[j]}
                                addOrUpdatePerformanceList={this.props.addOrUpdatePerformanceList}
                            />
                            : row.SubjectsValue[j].Marks,
                        filterable: false,
                    },
                )
            }
        }

        return (
            <div>
                <div style={{ "margin": "20px 0px" }}>
                {this.state.errorMsg.length > 0 ?
                    <Row style={{ padding: "0 5%" }}>
                        <Alert bsStyle="warning" style={{ marginBottom: "10px" }}>
                            {alerts}
                        </Alert>
                    </Row>: null
                }
                    <Row>
                        <Col xs={6} style={{ "textAlign": "left" }}>
                            <ButtonGroup>
                                <Button >Monitor</Button>
                                <Button onClick={this.onEditClick}>Edit</Button>
                            </ButtonGroup>
                        </Col>
                        {this.state.isEdit ?
                            <Col xs={6} style={{ "textAlign": "right" }}>
                                <ButtonGroup>
                                    <Button onClick={this.onSaveStudentsMarks} bsStyle="primary">Save</Button>
                                    <Button onClick={this.onCancel}>Cancel</Button>
                                </ButtonGroup>
                            </Col> : null
                        }
                    </Row>
                </div>
                <ReactTable
                    data={this.props.studentsPerformance.StudentDetails}
                    columns={performanceTableColumnForTest}
                    defaultPageSize={5}
                    filterable
                />
            </div>
        );
    }

    render() {
        // console.log("PerformanceController:: StudentExamTab :: ", this.props);
        return (
            // <Tab eventKey={this.props.tabEventKey}
            //     style={{ "fontSize": "14px", "background": "white", "fontWeight": "400" }}
            //     title={this.props.studentsPerformance.Test}>
            //     
            // </Tab>
            <div>
                {this.createPerformanceTable()}
            </div>
        );
    }

}

export default StudentExamTab;