import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal'
import IndividualTeacherDetailsController from '../../conditionalcomponents/IndividualTeacherDetailsController';


class teachersModal extends Component {


  render() {
    //console.log("teachersModal:props", this.props)
    let teachers = [];
    let teacherDetails = [];
    if (this.props.communityTeacherDataState) {
      teachers = this.props.communityTeacherDataState;
      const listItems = [];

      const nodes = this.props.treeStructureJson

      for (var i = 0; i < teachers.length; i++) {
        let teacherName = teachers[i].fields.community_member.last_name &&
          teachers[i].fields.community_member.last_name != "None" &&
          teachers[i].fields.community_member.last_name != "Null" ?
          teachers[i].fields.community_member.first_name + " " +
          teachers[i].fields.community_member.last_name
          :
          teachers[i].fields.community_member.first_name;
        let teacherId = teachers[i].fields.community_member.id;

        let alreadyAssignedSubjects = teachers[i].fields.subject_mapping_list;
        let checkedList = [];
        if (alreadyAssignedSubjects) {
          for (let i = 0; i < alreadyAssignedSubjects.length; i++) {
            checkedList.push(alreadyAssignedSubjects[i].mapping_id);
          }
        }
        //console.log("teacherscheckedsubjects", alreadyAssignedSubjects)

        teacherDetails.push(
          <IndividualTeacherDetailsController {...this.props} teacher={teacherName}
            alreadyAssignedSubjects={alreadyAssignedSubjects} teacherId={teacherId}
            checkedList={checkedList} nodes={nodes} currentRow = {teachers[i]}/>
        )
      }
    }

    return (
      <CommonModal close={this.props.close}
        showModal={this.props.showModal}
        modalHeading={this.props.communitylabels.teachers}
        modalBody={teacherDetails} 
        size = "large"/>
    )


  }
}
export default teachersModal;