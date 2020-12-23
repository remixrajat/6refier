import React, { Component } from "react";
import { Col, Grid, Table, Button, Nav, NavItem, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree';
import { handleNullStringWhileConcatenation } from '../../HelperFunctions/handleNullStringWhileConcatenation'

export default class AlreadyAddedMembers extends Component {

    render() {
        console.log("members", this.props)
        let list = []
        if (this.props.members != null) {
            for (var i = 0; i < this.props.members.length; i++) {
                let memberName = ""
                let name = ""
                if (this.props.isNodeNames) {
                    name = this.props.nodeIdNameObject[this.props.members[i]]

                }
                else {
                    if (this.props.members[i].last_name &&
                        this.props.members[i].last_name != "None" &&
                        this.props.members[i].last_name != "Null") {
                        memberName = this.props.members[i].first_name + " " + this.props.members[i].last_name
                    }
                    else {
                        memberName = this.props.members[i].first_name
                    }

                    name = memberName
                        + (this.props.members[i].member_type ?
                            handleNullStringWhileConcatenation(this.props.members[i].member_type, " (", ")") : "")
                }
                list.push(
                    <div className="refier_text_on_light__3"
                        style={{
                            'fontWeight': '700', "fontSize": "14px",
                            "margin": "5px 0", "cursor": "default"
                        }}>
                        {name}</div>
                )
            }
        }

        return (
            <div style={{ "margin": "10px 0px" }}>
                <Col>
                    <div className="custom-list-title-content"
                        style={{
                            // "border": "solid transparent 1px",
                            "padding": "5px 10px", "marginBottom": "5px",
                            color:"#049cdb",fontWeight: 600,
                            // "fontSize": "18px", "fontWeight": "700"
                        }}>
                        {this.props.title}
                    </div>
                </Col>
                {this.props.for_all == true ?
                    <div>
                        <Row>
                            <Col xsOffset={1}>
                                <div className="refier_text_on_light__3"
                                    style={{
                                        'fontWeight': '700', "fontSize": "14px",
                                        "margin": "5px 0", "cursor": "default"
                                    }}>
                                    All Members
                                </div>
                            </Col>
                        </Row>
                    </div>
                    :
                    <div>

                        <Row>
                            <Col xsOffset={1}>
                                {list.length > 0 ? list :
                                    this.props.not_all ?
                                    <div className="refier_text_on_light__3"
                                    style={{
                                        'fontWeight': '700', "fontSize": "14px",
                                        "margin": "5px 0", "cursor": "default"
                                    }}>
                                    Not assigned yet
                                </div>
                                :
                                    <div className="refier_text_on_light__3"
                                        style={{
                                            'fontWeight': '700', "fontSize": "14px",
                                            "margin": "5px 0", "cursor": "default"
                                        }}>
                                        Default - All Members
                                    </div>
                                }
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )


    }
}