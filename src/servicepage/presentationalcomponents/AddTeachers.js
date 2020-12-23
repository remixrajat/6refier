import React, { Component } from "react";
import { Col, Grid, Table, Button, Nav, NavItem, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree';

export default class AddTeachers extends Component {

    render() {

        if(this.props.teacherStructure){
            for(let i=0;i<this.props.teacherStructure.length;i++){
                this.props.teacherStructure[i].className= "refier_text_on_light__4"
            }
        }

        let finalValue = []

        let getAssignedClass =
            this.props.checked.forEach((val, index) => {
                //console.log("checked State", val)
                if(this.props.nodeIdNameObject){
                    finalValue.push(<div>{this.props.nodeIdNameObject[val]}</div>)
                }
            })

        const nodes = [{
            value: "/All Teachers",
            label: "All Teachers",
            className: "refier_text_on_light__4",
            children: [{
                value: '/All Teachers/Ramesh',
                label: 'Ramesh',
            },
            {
                value: '/All Teachers/Naresh',
                label: 'Naresh',
            },
            {
                value: '/All Teachers/Munesh',
                label: 'Munesh',
            },
            {
                value: '/All Teachers/Kamlesh',
                label: 'Kamlesh',
            },
            {
                value: '/All Teachers/Suresh',
                label: 'Suresh',
            },
            {
                value: '/All Teachers/Chetan',
                label: 'Chetan',
            },
            ]
        }];

        return (
            <div style={{ "margin": "10px 0px" }}>
                <Col>
                    <div className="custom-list-title-content"
                        style={{
                            // "border": "solid transparent 1px",
                            "padding": "5px 10px", "marginBottom": "5px",
                            color:"#049cdb",fontWeight: 600,
                        }}>
                        {this.props.title ? this.props.title :
                            ("Select " + this.props.communitylabels.teachers )}
                    </div>
                </Col>
                <Row>
                    <Col xs={6}>
                    {
                        this.props.teacherStructure?
                        <CheckboxTree
                            nodes={this.props.teacherStructure}
                            checked={this.props.checked}
                            expanded={this.props.expanded}
                            nameAsArray={true}
                            showNodeIcon={false}
                            onCheck={this.props.onCheck}
                            onExpand={this.props.onExpand}
                        />
                        :
                        null
                    }
                    </Col>
                    <Col xs={6} className="refier_text_on_light__4">
                        {finalValue}
                    </Col>
                </Row>
            </div>
        )


    }
}