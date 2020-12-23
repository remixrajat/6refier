import React, { Component } from "react";
import { Col, Grid, Table, Button, Nav, NavItem, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

import AddStudentsOrClassesMembers from "./AddStudentsOrClassesMembers";
import Preloader from '../../shared/Preloader/PreLoader'
import AddTeacherMembers from './AddTeacherMembers'
import AddExpertMembers from './AddExpertMembers'

export default class AddExpertsToGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classesAndStudentsChecked: this.createTreeCheckedMembers(props),
            classesAndStudentsExpanded: [],
            teachersChecked: this.createTeacherCheckedMembers(props),
            teachersExpanded: [],
            alert: [],
            expertsChecked: [],
        };

        this.onClassAndStudentCheck = this.onClassAndStudentCheck.bind(this);
        this.onClassAndStudentExpand = this.onClassAndStudentExpand.bind(this);
        this.onTeachersCheck = this.onTeachersCheck.bind(this)
        this.onTeachersExpand = this.onTeachersExpand.bind(this)
        this.createTreeCheckedMembers = this.createTreeCheckedMembers.bind(this);
        this.createTeacherCheckedMembers = this.createTeacherCheckedMembers.bind(this)
        this.resetAlert = this.resetAlert.bind(this)
        this.setAlert = this.setAlert.bind(this)
        this.onAddClick = this.onAddClick.bind(this)
        this.onExpertsCheck = this.onExpertsCheck.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log("Before checking the component will receive props")
        if (this.props.members != nextProps.members ||
            this.props.communityTreeStructure != nextProps.communityTreeStructure ||
            this.props.teacherStructureState != nextProps.teacherStructureState) {
            console.log("Before checking the component will receive props")
            this.setState({
                classesAndStudentsChecked: this.createTreeCheckedMembers(nextProps),
                teachersChecked: this.createTeacherCheckedMembers(nextProps),
            })
        }
    }

    onClassAndStudentCheck(checked) {
        this.setState({ classesAndStudentsChecked: checked });
    }

    onClassAndStudentExpand(expanded) {
        this.setState({ classesAndStudentsExpanded: expanded });
    }

    onTeachersCheck(checked) {
        this.setState({ teachersChecked: checked });
    }

    onTeachersExpand(expanded) {
        this.setState({ teachersExpanded: expanded });
    }

    resetAlert() {
        this.setState({ alert: [] })
    }

    onExpertsCheck(checked) {
        console.log("AddExpertsToGroup :: onExpertsCheck :: ", checked)
        this.setState({expertsChecked:checked})
    }

    setAlert(alert) {
        let storedAlert = this.state.alert
        storedAlert.push(alert)
        this.setState({ alert: storedAlert })
    }

    onAddClick() {
            this.props.onAddSelected(
                this.state.classesAndStudentsChecked, this.state.teachersChecked, "isExpert")
    }

    addCheckedMembersToTree(members, treeCheckedMembers, node) {
        console.log("Inside Function",members,treeCheckedMembers,node)
        if (members) {
            for (let i = 0; i < members.length; i++) {
                if (members[i].id === node.value) {
                    treeCheckedMembers.push(node.value)
                    console.log("Adding Members to checked",treeCheckedMembers)
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
                console.log("treeCheckedMembers",treeCheckedMembers)
                for (var i = 0; i < value.communityTreeStructure.length; i++) {
                    this.addCheckedMembersToTree
                        (value.members, treeCheckedMembers, value.communityTreeStructure[i])
                }
                console.log("treeCheckedMembers",treeCheckedMembers)
            }
        }
        return treeCheckedMembers;
    }

    createTeacherCheckedMembers(value) {
        let treeCheckedMembers = []
        if (value.members) {
            if (value.teacherStructureState) {
                console.log("treeCheckedMembers",treeCheckedMembers)
                for (var i = 0; i < value.teacherStructureState.length; i++) {
                    this.addCheckedMembersToTree
                        (value.members, treeCheckedMembers, value.teacherStructureState[i])
                }
                console.log("treeCheckedMembers",treeCheckedMembers)
            }
        }
        return treeCheckedMembers;
    }



    render() {
        // console.log("AddMembersToGroup :: props :: ", this.props)
        // console.log("AddMembersToGroup :: state :: ", this.state)

        let alert = []
        for (let i = 0; i < this.state.alert.length; i++) {
            alert.push(
                <div className="custom-warning-alert" style={{ marginTop: "10px" }}>
                    {this.state.alert[i]}
                </div>
            )
        }

            return (
                <div>
                    <AddStudentsOrClassesMembers communityTreeStructure={this.props.communityTreeStructure}
                        nodeIdNameObject={this.props.nodeIdNameObject}
                        checked={this.state.classesAndStudentsChecked}
                        expanded={this.state.classesAndStudentsExpanded}
                        onCheck={this.onClassAndStudentCheck}
                        onExpand={this.onClassAndStudentExpand}
                        communitylabels={this.props.communitylabels} />
                    <AddTeacherMembers teacherStructure={this.props.teacherStructureState}
                        nodeIdNameObject={this.props.nodeIdNameObject}
                        checked={this.state.teachersChecked}
                        expanded={this.state.teachersExpanded}
                        onCheck={this.onTeachersCheck}
                        onExpand={this.onTeachersExpand}
                        communitylabels={this.props.communitylabels} />
                    
                    <AddExpertMembers
                        communityMentorsOwners={this.props.communityMentorsOwners}
                        checked={this.state.expertsChecked}
                        onCheck={this.onExpertsCheck}/>
                    <Button
                        style={{margin:"20px"}}
                        className="refier_custom_button_new_selected_2 btn btn-default"
                        onClick={this.props.onAddSelected.bind(this,
                            this.state.classesAndStudentsChecked,
                            this.state.teachersChecked,
                            this.state.expertsChecked, "isExpert")}
                    >Add Experts</Button>
                    
                </div>
            )
        }
    }