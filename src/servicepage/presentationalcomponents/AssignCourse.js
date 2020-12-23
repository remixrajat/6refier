import React, { Component } from "react";
import { Col, Grid, Table, Button, Nav, NavItem, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

import AddStudentsOrClasses from "./AddStudentsOrClasses";
import AddTeachers from "./AddTeachers";
import AlreadyAddedMembers from "./AlreadyAddedMembers"
import Preloader from "../../shared/Preloader/PreLoader"

export default class AssignCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classesAndStudentsChecked: this.createTreeCheckedMembers(props),
            classesAndStudentsExpanded: [],
            // teachersChecked: this.createTeacherCheckedMembers(props),
            // teachersExpanded: [],
        };

        this.onClassAndStudentCheck = this.onClassAndStudentCheck.bind(this);
        this.onClassAndStudentExpand = this.onClassAndStudentExpand.bind(this);
        // this.onTeachersCheck = this.onTeachersCheck.bind(this)
        // this.onTeachersExpand = this.onTeachersExpand.bind(this)
        this.createTreeCheckedMembers = this.createTreeCheckedMembers.bind(this);
        // this.createTeacherCheckedMembers = this.createTeacherCheckedMembers.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        //console.log("Before checking the component will receive props")
        if (this.props.members != nextProps.members ||
            this.props.communityTreeStructure != nextProps.communityTreeStructure ||
            this.props.teacherStructureState != nextProps.teacherStructureState) {
            //console.log("Before checking the component will receive props")
            this.setState({
                classesAndStudentsChecked: this.createTreeCheckedMembers(nextProps),
                // teachersChecked: this.createTeacherCheckedMembers(nextProps),
            })
        }
    }

    onClassAndStudentCheck(checked) {
        // console.log("onClassAndStudentCheck",checked)
        this.setState({ classesAndStudentsChecked: checked });
    }

    onClassAndStudentExpand(expanded) {
        this.setState({ classesAndStudentsExpanded: expanded });
    }

    // onTeachersCheck(checked) {
    //     console.log("onTeachersCheck",checked)
    //     this.setState({ teachersChecked: checked });
    // }

    // onTeachersExpand(expanded) {
    //     this.setState({ teachersExpanded: expanded });
    // }

    addCheckedMembersToTree(members, treeCheckedMembers, node) {
        //console.log("Inside Function",members,treeCheckedMembers,node)
        if (members) {
            for (let i = 0; i < members.length; i++) {
                if (members[i].id === node.value) {
                    treeCheckedMembers.push(node.value)
                    //console.log("Adding Members to checked",treeCheckedMembers)
                }
            }
        }
        if (node.children != null) {
            for (let i = 0; i < node.children.length; i++) {
                this.addCheckedMembersToTree(members, treeCheckedMembers, node.children[i])
            }
        }
    }

    createTreeCheckedMembers(value) {
        let treeCheckedMembers = []
        if (value.members) {
            if (value.communityTreeStructure) {
                // console.log("treeCheckedMembers",treeCheckedMembers)
                for (var i = 0; i < value.communityTreeStructure.length; i++) {
                    this.addCheckedMembersToTree
                        (value.members, treeCheckedMembers, value.communityTreeStructure[i])
                }
                // console.log("treeCheckedMembers", treeCheckedMembers)
            }
        }
        return treeCheckedMembers;
    }

    // createTeacherCheckedMembers(value) {
    //     let treeCheckedMembers = []
    //     if (value.members) {
    //         if (value.teacherStructureState) {
    //             //console.log("treeCheckedMembers",treeCheckedMembers)
    //             for (var i = 0; i < value.teacherStructureState.length; i++) {
    //                 this.addCheckedMembersToTree
    //                     (value.members, treeCheckedMembers, value.teacherStructureState[i])
    //             }
    //             console.log("treeCheckedMembers", treeCheckedMembers)
    //         }
    //     }
    //     return treeCheckedMembers;
    // }



    render() {
        // console.log("MonitoringPermission : props : ", this.props, this.state)
        let self = this
        // if (this.props.event_status) {
            return (
                <div>
                    <div className="custom-item-border">
                        <AlreadyAddedMembers members={this.props.members}
                            title={"Already Assigned"}
                            for_all={this.props.for_all}
                            not_all={true}
                            nodeIdNameObject={this.props.nodeIdNameObject}
                            isNodeNames = {true}/>
                    </div>
                    <div >
                        <AddStudentsOrClasses communityTreeStructure={this.props.communityTreeStructure}
                            nodeIdNameObject={this.props.nodeIdNameObject}
                            checked={this.state.classesAndStudentsChecked}
                            expanded={this.state.classesAndStudentsExpanded}
                            onCheck={this.onClassAndStudentCheck}
                            onExpand={this.onClassAndStudentExpand}
                            communitylabels={this.props.communitylabels}
                            title={"Assign course to one or group of " + this.props.communitylabels.students}
                            noCascade={true}    
                        />
                        </div>
                        <div style={{marginTop:"20px"}}>
                    {/* <AddTeachers teacherStructure={this.props.teacherStructureState}
                        nodeIdNameObject={this.props.nodeIdNameObject}
                        checked={this.state.teachersChecked}
                        expanded={this.state.teachersExpanded}
                        onCheck={this.onTeachersCheck}
                        onExpand={this.onTeachersExpand}
                        communitylabels={this.props.communitylabels}
                            title={"Select One or Group of " +
                                this.props.communitylabels.teachers + " for Monitoring"}
                        /> */}
                    </div>
                    <div style={{marginTop:"20px"}}>
                    {this.props.statusOfRequest == 2?
                        <Row>
                            <Col xs={12} style={{ "textAlign": "center" }}>
                                <Preloader loaderMessage="Setting Monitoring Permissions..." />
                            </Col>
                        </Row>
                            :
                            this.props.statusOfRequest == -1?
                                            <div className="form-status-fail">
                                            Request Failed
                                            </div>
                                            :
                                            this.props.statusOfRequest == 1?
                                                <div className="form-status-success">
                                                Course Assigned. Please refresh the page.
                                            </div>
                                    :
                        <Row>
                            <Col xs={12} style={{ "textAlign": "center" }}>
                                <Button bsStyle="default" style={{ display: "block", margin: "0 auto" }}
                                        className="refier_custom_button_new_selected_2"
                                        
                                    onClick={this.props.setMembersForCourse.bind(this,
                                        self.state.classesAndStudentsChecked, 
                                    self.props.nodeIdTypeObject)} 
                                >Assign Course</Button>
                            </Col>
                        </Row>
                        }
                        </div>
                </div>
            )
        // }
        // else {
        //     return (
        //         <div>
        //             <AlreadyAddedMembers members={this.props.members} title={"Eligible Members"}
        //                 for_all={this.props.for_all} />
        //         </div>)
        // }
    }
}