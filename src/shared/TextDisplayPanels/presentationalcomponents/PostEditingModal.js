import React, { Component } from 'react';
import { Grid, Row, Col, Image, imageShapeInstance, getInitialState, imageResponsiveInstance, Modal, Button, Thumbnail } from 'react-bootstrap';

import TextEditorHolderAndOptions from '../../../dashboardpage/presentationalcomponents/TextEditorHolderAndOptions'


class PostEditingModal extends Component {


  render() {
    return (
      <Modal bsSize="large" show={this.props.showModal} onHide={this.props.close} dialogClassName={this.props.dialogClassName}>
         <Modal.Header className="refier_custom_light_panel_title"
      style={{
        backgroundColor: "transparent",
        margin: "10px"
        // color: "white"
          }}>
      <Modal.Title>
          {this.props.isComment?"Edit Comment":"Edit Post"}</Modal.Title>
          </Modal.Header>    
        <Modal.Body style={{maxHeight:"70vh",overflow:"auto"}}>
          <TextEditorHolderAndOptions {...this.props} />
          <div style={{ margin:"10px","display": this.props.showError, "color": "red" }}>{this.props.errorMsg}</div>
        </Modal.Body>
        {/* {this.props.hideFooter?null : 
            <Modal.Footer style={{borderTop:"1px solid #f2f2f2"}}>
            <Button onClick={this.props.close} 
              className="refier_custom_button_cancel">Close</Button>
          </Modal.Footer>
          } */}
      </Modal>
    )


  }
}
export default PostEditingModal;
