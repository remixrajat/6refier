import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';

import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';
import PreLoader from '../../shared/Preloader/PreLoader'


export default class InitialUserProfileFormNew extends Component {
    render() {
        // console.log("InitialUserProfileFormNew :: props", this.props);

        let modalBody = this.props.userForm.value;
        let modalSelectedOptions = [], stepMessage = '';
        let messageEnd = 'It takes less than 1 min and helps us in providing you with best experience.'
        let currentStep = this.props.currentSection + 2
        stepMessage = 'Step ' + currentStep + " of 4: "

        if(this.props.userForm.selectedOptions && 
            this.props.userForm.selectedOptions.length) {
                for(let i= 0; i< this.props.userForm.selectedOptions.length; i++) {
                    modalSelectedOptions.push (
                        <Button key={i} className="refier_custom_button_new_selected">
                            {this.props.userForm.selectedOptions[i]}
                        </Button>
                    )
                }
        }

        let modalActionButton = (
            !this.props.userForm.isShowButton ?
                <ComplementaryButton 
                    buttonText={this.props.userForm.buttonText}
                    disabled={true}
                /> :
                this.props.loaderStatus === 2 ?
                    <PreLoader /> :
                    <ComplementaryButton 
                        buttonText={this.props.userForm.buttonText}
                        onButtonClick={this.props.userForm.buttonAction}
                    />
        );

        return (
            <div className="refier-introform">
                {
                    this.props.userForm.showNav ?
                        <div className="introform-nav" style={{
                            position: "fixed", top: "0",
                            width: "100%", zIndex:"999"
                        }}>
                            <Col xs={8} md={9} mdOffset={1} 
                                className="introform-nav-option-selected">
                                { modalSelectedOptions }
                            </Col>
                            <Col xs={4} md={1} 
                                className="introform-nav-action-button">
                                { modalActionButton }
                            </Col>
                        </div> :
                        null
                }
                {/* {
                    this.props.currentSection === 0 &&
                    this.props.inviteCommunityName !== undefined &&
                    this.props.inviteCommunityName.trim() !== '' ?
                        <Col xsOffset={1} xs={10} mdOffset={2} md={8} 
                            className="introform-invite-heading">
                            {this.props.inviteCommunityName} has invited you to Refier
                        </Col> :
                        null
                } */}
                {
                    this.props.redirectUrlMessage  
                        ? <Col xs={12} mdOffset={2} md={8} 
                            className="introform-invite-heading">
                            {this.props.currentSection === 0 
                                ? stepMessage + " " + this.props.redirectUrlMessage + " " + messageEnd
                                : stepMessage + " " + this.props.redirectUrlMessage
                            }
                        </Col> 
                        : null
                }
                {
                    this.props.currentSection === 0 ?
                        <div className={this.props.isMobile ? "" : "introform-body-wrapper"}>
                            {modalBody}
                        </div> :
                        modalBody
                }
            </div>
        )
    }
}