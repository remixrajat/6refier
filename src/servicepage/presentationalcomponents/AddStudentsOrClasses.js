import React, { Component } from "react";
import { Col, Grid, Table, Button, Nav, NavItem, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree';

export default class AddStudentsOrClasses extends Component {

    render() {

        if(this.props.communityTreeStructure){
            for(let i=0;i<this.props.communityTreeStructure.length;i++){
                this.props.communityTreeStructure[i].className= "refier_text_on_light__4"
            }
        }

        //console.log("communityTreeStructure",this.props.communityTreeStructure)

        //console.log("States",this.props.checked,this.props.expanded)

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
                    <div className="custom-list-title-content"
                        style={{
                            // "border": "solid transparent 1px",
                            "padding": "5px 10px", "marginBottom": "5px",
                            color:"#049cdb",fontWeight: 600,
                        }}>
                        {this.props.title ? this.props.title :
                            ("Select " + this.props.communitylabels.students )}
                    </div>
                </Col>
                <Row>
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
                                
                                    noCascade={this.props.noCascade?this.props.noCascade:false}
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