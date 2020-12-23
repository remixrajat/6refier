import React, { Component } from 'react';
import { Modal, Pager, Button, Alert } from 'react-bootstrap';
import FullScreenComponentsModal from '../../shared/FullScreenCommonModal';

export default class InitialUserProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFormIndex: 1,
            disableNext: false,
            disablePrevious: true,
            currentStep: 1
        }
        this.tempcurrentFormIndex = this.state.currentFormIndex;
    }




    onClickNext(e, isSubmit = true) {
        //console.log("abhishekkkk", this.state.currentFormIndex)
        let tempcurrentIndex = this.tempcurrentFormIndex + 1;
        if (tempcurrentIndex > this.props.userdetailsforms.length) {
            //console.log("***********Final Submit")
            if (isSubmit) {
                this.props.submitDetails(tempcurrentIndex - 1);
            }

            return;
        }
        let isError = false;
        if (isSubmit) {
            isError = this.props.submitDetails(tempcurrentIndex - 1);
        }
        if (tempcurrentIndex === this.props.userdetailsforms.length && !isError) {
            this.setState({ disableNext: true });

        }

        if (tempcurrentIndex > 1 && !isError) {
            this.setState({ disablePrevious: false })
        }


        if (!isError) {
            //console.log("abhishekkkk",this.state.currentStep)
            this.tempcurrentFormIndex = tempcurrentIndex;

            if (!this.props.userdetailsforms[tempcurrentIndex - 1].isShow) {
                this.onClickNext(e, isSubmit = false);
            }

            if (this.state.currentStep >= 3) {
                this.setState({ disablePrevious: true });
                this.setState({ disableNext: true });
                // setTimeout(this.dismissInroFormUponErr.bind(this),5000);
                return;
            }
            this.setState({ currentStep: this.state.currentStep + 1 });
            this.setState({ currentFormIndex: this.tempcurrentFormIndex });
        }
    }
    dismissInroFormUponErr() {
        if (this.props.showModal) {
            this.props.setShowInroForm(false);
        }
    }

    onClickPrevious(e) {
        let tempcurrentIndex = this.tempcurrentFormIndex - 1;
        if (tempcurrentIndex < 1) {
            return;
        }
        this.tempcurrentFormIndex = tempcurrentIndex;
        if (!this.props.userdetailsforms[tempcurrentIndex - 1].isShow) {
            this.onClickPrevious(e);
        }
        this.setState({ currentStep: this.state.currentStep - 1 });
        this.setState({ currentFormIndex: this.tempcurrentFormIndex });

        if (tempcurrentIndex == 1) {
            this.setState({ disablePrevious: true })
        }
        if (tempcurrentIndex < this.props.userdetailsforms.length) {
            this.setState({ disableNext: false });
        }
    }




    render() {
        let errorDiv = this.props.errorMsgs.map((err) => {
            //console.log(err);
            return (

                <li>{err}</li>
            )
        });

        let modalBody = (
            <div>
                {this.props.errorMsgs.length > 0 ? <Alert bsStyle="warning"><ul>{errorDiv}</ul></Alert> : null}
                {this.props.userdetailsforms[this.state.currentFormIndex - 1].value}
            </div>
        );

        let modalHeading = (
            <div className="refier_custom_panel_light_gray" style={{ marginTop: "0px", borderWidth: "0px" }}>
                {this.props.userdetailsforms[this.state.currentFormIndex - 1].name}
            </div>
        );

        let modalFooter = (
            <Pager>
                {this.state.disablePrevious ? null : <Pager.Item previous href="#"
                    onSelect={this.onClickPrevious.bind(this)} disabled={this.state.disablePrevious} style={{ borderRadius: "0px" }}>&larr; Previous</Pager.Item>}
                <span>{this.state.currentStep} of {this.props.userdetailsforms.length - 1}</span>
                <Pager.Item next href="#" onSelect={this.onClickNext.bind(this)} >{this.state.disableNext ? "Submit" : 'Next \u2192'}</Pager.Item>
            </Pager>
        );

        return (
            <div>
                <FullScreenComponentsModal modalBody={modalBody}
                    showModal={this.props.showModal}
                    modalFooter={modalFooter}
                    modalHeading={modalHeading}
                    isFullScreen={true}
                />
            </div>
        )
    }
}

