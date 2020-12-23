import React from 'react';
import { Grid, Col, Row, Tab, Tabs, ButtonGroup, Button } from 'react-bootstrap';

import ReactTable from 'react-table'
import 'react-table/react-table.css'
import FontAwesome from 'react-fontawesome';
import EditCell from './EditCell'
import StudentExamTab from './StudentExamTab';


class StudentPerformance extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     isEdit: false
        // };

    }





    render() {

        let tabs = []
        if (!this.props.studentsPerformanceData) {
            return null;
        }

        for (let i = 0; i < this.props.studentsPerformanceData.length; i++) {
            tabs.push(
                <Tab eventKey={i + 1}
                    style={{ "fontSize": "14px", "background": "white", "fontWeight": "400" }}
                    title={this.props.studentsPerformanceData[i].Test}>
                    <StudentExamTab studentsPerformance={this.props.studentsPerformanceData[i]}
                        addOrUpdatePerformanceList={this.props.addOrUpdatePerformanceList}
                        addOrUpdateStudentsMarks={this.props.addOrUpdateStudentsMarks}
                        getPerformanceListLength={this.props.getPerformanceListLength}
                    />
                </Tab>
            )
        }
        // console.log("PerformanceController:: TABS :: ", tabs);

        return (
            <Grid fluid>
                <Col xs={12} style={{ "margin": "20px 20px" }}>
                    <Tabs defaultActiveKey={1}
                        style={{ "fontSize": "14px", "fontWeight": "400" }} >
                        {tabs}
                    </Tabs>
                </Col>
            </Grid>
        );
    }
}

export default StudentPerformance;
