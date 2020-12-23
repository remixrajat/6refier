import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { REFIER_SCREENSHARE_EXTENSION_URL } from '../../../GlobalConstants';
import { PrimaryButton } from '../../../shared/RefierComponents/PrimaryButton';

import './DialogExtension.css';


export default class DialogExtensionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInstalled: false,
        };

        this.goToChromePage = this.goToChromePage.bind(this);
        this.onNoClick = this.onNoClick.bind(this);
        this.refreshBrowser = this.refreshBrowser.bind(this);
    }

    onNoClick() {
        // this.cancel.emit();
        this.props.cancelClicked();
    }

    goToChromePage() {
        window.open(REFIER_SCREENSHARE_EXTENSION_URL);
        this.setState({ isInstalled: true });
    }

    refreshBrowser() {
        window.location.reload();
    }

    render() {
        return (
            this.props.showDialog ? (
                <Row id="dialogExtension">
                    <Row>
                        <p>Hello</p>
                    </Row>
                    <Row>
                        <p>
                            You need install Refier Screen Share chrome extension. 
                            Click on Install and refresh the browser to share your screen.
                        </p>
                    </Row>
                    <Row style={{marginTop: '15px'}}>
                        <Button 
                            onClick={this.onNoClick} 
                            className="refier_custom_button_white" 
                            style={{color: '#494949'}}>
                            Cancel
                        </Button>
                        <PrimaryButton 
                            onButtonClick={this.goToChromePage}
                            buttonText="Install"
                            showIcon={
                                <FontAwesome
                                    name="chrome"
                                    style={{ marginRight: "5px" }}
                                />    
                            }
                        />
                        {this.state.isInstalled ? (
                            <PrimaryButton 
                                onButtonClick={this.refreshBrowser}
                                buttonText="Refresh"
                            />
                        ) : null}
                    </Row>
                </Row>
            ) : 
            null
        );
    }
}
