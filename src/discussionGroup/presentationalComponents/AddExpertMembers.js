import React, { Component } from "react";
import { Col, Grid, Table, Button, Nav, NavItem, Row, FormGroup, Checkbox } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree';

export default class AddExpertMembers extends Component {

    onChangingSelection(e) {
        // console.log("AddExpertMembers :: onChangingSelection ", e.target.name, e.target.value)
        let newCheckedList = []
        let isPresent = false
        for (let i = 0; i < this.props.checked.length; i++){
            if (this.props.checked[i] == e.target.name) {
                isPresent = true
            }
            else {
                newCheckedList.push(this.props.checked[i])
            }
        }
        if (!isPresent) {
            newCheckedList.push(e.target.name)
        }
        this.props.onCheck(newCheckedList)
    }

    render() {
        // console.log("AddExpertMembers :: this.props ", this.props)

        let externalMentorsList = undefined
        if (this.props.communityMentorsOwners) {
            let externalMentors = this.props.communityMentorsOwners.external_mentor
            externalMentors = JSON.parse(externalMentors)
            externalMentorsList = []
            for (let i = 0; i < externalMentors.length; i++){
                let name = externalMentors[i].fields.last_name && 
                    (externalMentors[i].fields.last_name).toLowerCase() != "none" ?
                    (externalMentors[i].fields.first_name + " " + externalMentors[i].fields.last_name)
                    :
                    externalMentors[i].fields.first_name
                externalMentorsList.push(
                    <Checkbox name={externalMentors[i].fields.profile_id}
                        onChange={this.onChangingSelection.bind(this)}>{name}</Checkbox>
                )
            }
        }

        return (
            <div style={{ "margin": "10px 0px" }}>
                {externalMentorsList ?
                    <div>
                    <Col>
                        <div className="refier_custom_headertext_light_gray_medium">
                            Community Experts
                    </div>
                    </Col>
                    <Row style={{ margin: "10px" }}>
                        <Col xs={6}>
                            <FormGroup>
                                {externalMentorsList}
                            </FormGroup>
                        </Col>
                        </Row>
                    </div>
                    :
                    null
                }
            </div>
        )


    }
}