import React, { Component } from 'react';
import { Modal, Button} from 'react-bootstrap';

import { NonPriorityWhiteButton } from './RefierComponents/NonPriorityWhiteButton';
import { ComplementaryButton } from './RefierComponents/ComplementaryButton';


class ComponentsModal extends Component {
  render() {
    let addHeight = {zIndex: '10001'};

    if(this.props.isEditModal) {
      addHeight = Object.assign({}, addHeight, { "height" : "450px", zIndex: '10001'});
    }

    return (
      <Modal style={addHeight} 
        show={this.props.showModal} onHide={this.props.close} 
        dialogClassName={this.props.dialogClassName}
        bsSize = {this.props.size ? this.props.size : null}>
        <Modal.Header
          className={this.props.customHeaderStyle ? "": "refier_custom_light_panel_title"}
          style={{ marginTop: "0px" }}>
          <Modal.Title style={{fontSize:"0.9em", fontWeight: '700'}}>
            {this.props.modalHeading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight:"70vh", overflow:"auto"}}>
          {this.props.modalBody}
        </Modal.Body>
        {this.props.hideFooter ?
          null : 
          <Modal.Footer style={{borderTop: "1px solid #f2f2f2"}}>
          {
              this.props.isSaveButton ?
                <ComplementaryButton
                  buttonText={this.props.saveButtonText ? this.props.saveButtonText : "Save"}
                  onButtonClick={this.props.onSaveModal}
              /> : 
              null 
          }
          {
            this.props.modalFooter ?
              this.props.modalFooter :
              <NonPriorityWhiteButton
                onButtonClick={this.props.close}
                buttonText="Close"
              />
          }
          </Modal.Footer>
        }
      </Modal>
    )
  }
}

export default ComponentsModal;
