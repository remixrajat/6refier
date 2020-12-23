import React, { Component } from "react";
import { Col, Grid, Table, Button, Nav, NavItem, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

import AddStudentsOrClasses from "./AddStudentsOrClasses";
import AddTeachers from "./AddTeachers";
import AlreadyAddedMembers from "./AlreadyAddedMembers"
import Preloader from '../../shared/Preloader/PreLoader'


export default class AddMembersToEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classesAndStudentsChecked: this.createTreeCheckedMembers(props),
            classesAndStudentsExpanded: [],
            teachersChecked: this.createTeacherCheckedMembers(props),
            teachersExpanded: [],
            alert: [],
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
    }

    componentWillReceiveProps(nextProps) {
        //console.log("Before checking the component will receive props")
        if (this.props.members != nextProps.members ||
            this.props.communityTreeStructure != nextProps.communityTreeStructure ||
            this.props.teacherStructureState != nextProps.teacherStructureState) {
            //console.log("Before checking the component will receive props")
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

    setAlert(alert) {
        let storedAlert = this.state.alert
        storedAlert.push(alert)
        this.setState({ alert: storedAlert })
    }

    onAddClick() {
        this.resetAlert()
        let addedMembersCount = this.props.members ? this.props.members.length : 0
        if (this.props.countOfMembers >=
            (this.state.classesAndStudentsChecked.length + this.state.teachersChecked.length +
                addedMembersCount)) {
            this.props.onAddSelected(
                this.state.classesAndStudentsChecked, this.state.teachersChecked, this.props.type)
        }
        else {
            let message = (this.props.countOfMembers - addedMembersCount) < 0 ?
                "Cannot add any member. Please contact us for support"
                :
                "Cannot add more than " + (this.props.countOfMembers - addedMembersCount) + " members"
            
            this.setAlert(message)
        }
    }

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
                //console.log("treeCheckedMembers",treeCheckedMembers)
                for (var i = 0; i < value.communityTreeStructure.length; i++) {
                    this.addCheckedMembersToTree
                        (value.members, treeCheckedMembers, value.communityTreeStructure[i])
                }
                //console.log("treeCheckedMembers",treeCheckedMembers)
            }
        }
        return treeCheckedMembers;
    }

    createTeacherCheckedMembers(value) {
        let treeCheckedMembers = []
        if (value.members) {
            if (value.teacherStructureState) {
                //console.log("treeCheckedMembers",treeCheckedMembers)
                for (var i = 0; i < value.teacherStructureState.length; i++) {
                    this.addCheckedMembersToTree
                        (value.members, treeCheckedMembers, value.teacherStructureState[i])
                }
                //console.log("treeCheckedMembers",treeCheckedMembers)
            }
        }
        return treeCheckedMembers;
    }



    render() {
        // console.log("AddMembersToEvent :: props :: ", this.props)

        let members = ["Ayush (1-A) -- Student", "Shourya (2-A) -- Student",
            "Okesh -- Teacher", "Karan -- Counsellor"]

        
        let alert = []
        for (let i = 0; i < this.state.alert.length; i++) {
            alert.push(
                <div className="custom-warning-alert" style={{ marginTop: "10px" }}>
                    {this.state.alert[i]}
                </div>
            )
        }

        let typeTitle = "Members"
        let loaderMessage = "Adding Members for the Session..."
        if (this.props.type == 'viewer'){
            typeTitle = 'Viewers'   
            loaderMessage = "Adding Viewers for the Session..."
        }
        else if(this.props.type == 'presenter'){
            typeTitle = 'Presenters (Excluding Session Host)'
            loaderMessage = "Adding Presenters for the Session..."
        }

        if (this.props.event_status) {
            return (
                <div>
                    <AlreadyAddedMembers
                        members={this.props.members} title={typeTitle} not_all={true} />
                    <div className="custom-list-sub-content">
                        </div>
                    <AddStudentsOrClasses communityTreeStructure={this.props.communityTreeStructure}
                        nodeIdNameObject={this.props.nodeIdNameObject}
                        checked={this.state.classesAndStudentsChecked}
                        expanded={this.state.classesAndStudentsExpanded}
                        onCheck={this.onClassAndStudentCheck}
                        onExpand={this.onClassAndStudentExpand}
                        communitylabels={this.props.communitylabels}/>
                    <AddTeachers teacherStructure={this.props.teacherStructureState}
                        nodeIdNameObject={this.props.nodeIdNameObject}
                        checked={this.state.teachersChecked}
                        expanded={this.state.teachersExpanded}
                        onCheck={this.onTeachersCheck}
                        onExpand={this.onTeachersExpand}
                        communitylabels={this.props.communitylabels} />
                    {this.props.isAddMembersClicked ?
                        <Row>
                            <Col xs={12} style={{ "textAlign": "center" }}>
                                <Preloader loaderMessage={loaderMessage} />
                            </Col>
                        </Row>
                        :
                        <Row>
                            <Col xs={12} style={{ "textAlign": "center" }}>
                                <Button bsStyle="default" style={{ display: "block", margin: "0 auto" }}
                                    className="refier_custom_button_new"
                                    onClick={this.onAddClick.bind(this)}
                                // {this.props.onAddSelected.bind(this,
                                //     this.state.classesAndStudentsChecked, this.state.teachersChecked)}
                                >Add Selected</Button>
                            </Col>
                            {/* <Col xs={6} style={{ "textAlign": "center" }}>
                            <Button bsStyle="default" style={{ display: "block", margin: "0 auto" }}
                                className="refier_custom_button_new"
                                onClick={this.props.onNotify.bind(this)} >Notify All</Button>
                        </Col> */}
                        </Row>
                    }
                    {alert}
                </div>
            )
        }
        else{
            return (
                <div>
                    <AlreadyAddedMembers members={this.props.members} title={typeTitle} />
                </div>
            )
        }
    }
}