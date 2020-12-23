import React, { Component } from 'react';
import {Table, Checkbox} from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal'
import InternalCounsellorDetail from './InternalCounsellorDetail';


class InternalCounsellorModal extends Component {


  render() { 
    let teacherDetails = <InternalCounsellorDetail  {...this.props} />


      return(
        <CommonModal close={this.props.closeModal}
            showModal={this.props.showCounsellorModal}
            modalHeading="Add Master Trainers" 
            modalBody={teacherDetails} />
      )


}}
export default InternalCounsellorModal;