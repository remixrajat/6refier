import React, { Component } from 'react';
import { Table, Button, Glyphicon, Row, Col, Grid, InputGroup, FormGroup, FormControl,ControlLabel, Form } from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal';

import { handleNullStringWhileConcatenation } from '../../../HelperFunctions/handleNullStringWhileConcatenation';


export default class RemoveCommunityMemberModal extends Component{
    render(){
        let currentMember = this.props.selectedStudentToDelete;
        let memberDesignation = this.props.selectedMemberDesignation;
        let memberName = null;
        let memberEmail = null;
        let studentClsSecEntity = null;
        if(currentMember){
            memberName = currentMember.fields.community_member.first_name + handleNullStringWhileConcatenation(currentMember.fields.community_member.last_name, " ");
            memberEmail = currentMember.fields.community_member.email;
        }
        
        let body = <Grid fluid>
        <Col style={{"textAlign":"center"}}>
          <div>
            <Form horizontal>
        <div>Are you sure you want to remove {memberName} ({memberEmail}) from this community ? </div>
        <br /><br />

              {(this.props.modalResponseState) ? 
                <div style={{"color" : (this.props.modalResponseTypeState === "success") ? "#008744" : "#d62d20"}}>
                  {this.props.modalResponseState}
                </div>
                : null}
                <br />
              
              <Button bsStyle="primary"
                className="refier_custom_button_new"
                onClick={this.props.onRemoveMemberFromCommunity}>Delete</Button>
                <Button bsStyle="primary"
                className="refier_custom_button_new" style={{marginLeft : "15px"}}
                onClick={this.props.closeBackDeleteMemberModal}>Back</Button>
            </Form>
          </div>
        </Col>
      </Grid>

        return (
            <CommonModal close={this.props.close}
                showModal={this.props.showModal}
            modalHeading={"Delete "+ this.props.communitylabels.student +" Details"}
                modalBody={body}
                size="large" />
              )
    }
    
}