import React, { Component } from 'react';
import {Grid,Row,Col,Image,imageShapeInstance,getInitialState,imageResponsiveInstance,Modal,Button,Thumbnail} from 'react-bootstrap';


class FullScreenComponentsModal extends Component {


  render() {
return(
       <Modal show={this.props.showModal} onHide={this.props.close} 
              dialogClassName={this.props.dialogClassName} className="custom-map-modal"
            bsSize = {this.props.size ? this.props.size : null}>
            <Modal.Header className={this.props.headingStyle}>
                <Modal.Title>{this.props.modalHeading}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{height:"70vh",overflow:"auto"}}>
                {this.props.modalBody}
            </Modal.Body>
            <Modal.Footer>
                {this.props.modalFooter}
            </Modal.Footer>
        </Modal>
      )


}}
export default FullScreenComponentsModal;
