import React, { Component } from "react";
import { Col, Grid, Table, Button, Nav, NavItem, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree';

export default class AddStudentsOrClassesMembers extends Component {

    render() {

        if(this.props.communityTreeStructure){
            for(let i=0;i<this.props.communityTreeStructure.length;i++){
                this.props.communityTreeStructure[i].className= "custom-list-sub-content"
            }
        }

        let finalValue = [] 

        let getAssignedClass = this.props.checked.forEach((val, index) => {
                //console.log("checked State", val)
                if(this.props.nodeIdNameObject){
                    finalValue.push(<div>{this.props.nodeIdNameObject[val]}</div>)
                }
            })


        return (
            <div style={{ "margin": "10px 0px" }}>
                <Col>
                    <div className="refier_custom_headertext_light_gray_medium">
                        {this.props.communitylabels.students}
                    </div>
                </Col>
                <Row style={{marginTop:"10px"}}>
                <Col xs={6}>
                    {
                    this.props.communityTreeStructure?
                    <CheckboxTree
                        nodes={this.props.communityTreeStructure}
                        checked={this.props.checked}
                        expanded={this.props.expanded}
                        nameAsArray={true}
                        showNodeIcon={false}
                        onCheck={this.props.onCheck}
                        onExpand={this.props.onExpand}
                    />:
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