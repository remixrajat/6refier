import React from 'react';
import { Grid, Col, Row, Tab, Tabs } from 'react-bootstrap';
import StudentPerformance from './StudentPerformance';
import TeacherPerformance from './TeacherPerformance';
import FilterForm from './FilterForm'


class PerformanceTemplate extends React.Component {

    render() {
        this.memberDesignation = this.props.memberDesignationList ?
                                    this.props.memberDesignationList[this.props.match.params.communityid].designation : null;
        return (
            <div>
                <Grid fluid className="router-content-panel">
                    <Tabs defaultActiveKey={1} 
                        style={{ "fontSize": "14px","fontWeight":"400" }} >
                        <Tab eventKey={1} className="refier_custom_light_panel_title"
                            style={{ "fontSize": "16px", "background": "white","fontWeight":"500"  }} 
                            title="Students Performance">
                            <FilterForm {...this.props} />
                            <StudentPerformance {...this.props}/>
                            
                        </Tab>
                        {this.props.DESIGNATIONS.STUDENT !== this.memberDesignation ?
                        <Tab eventKey={2} className="refier_custom_light_panel_title"
                            style={{ "fontSize": "14px", "background": "white","fontWeight":"500"  }}
                            title="Teachers Performance"
                            animation={true}
                            onEntering={this.props.getTeacherPerformanceDetails}
                            >
                            <TeacherPerformance 
                                teacherPerformanceData={this.props.teacherPerformanceData}/>
                        </Tab>
                        :null}
                    </Tabs>
                </Grid>
            </div>
        );
    }
}

export default PerformanceTemplate;
