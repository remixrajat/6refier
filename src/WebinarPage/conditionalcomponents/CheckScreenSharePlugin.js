import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { REFIER_SCREENSHARE_EXTENSION_URL } from '../../GlobalConstants';

class CheckScreenSharePlugin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPluginPresent: false
        }
        this.pluginMessageEventHandler = this.pluginMessageEventHandler.bind(this)
        this.installPlugin = this.installPlugin.bind(this);
        
    }


    pluginMessageEventHandler(event) {
        // console.log(" CheckScreenSharePlugin  ::pluginMessageEventHandler:: ", event);
        if (!event.data || !(typeof event.data === 'string'
            || event.data.sourceId || event.data.captureSourceId
            || event.data.getChromeExtensionStatus)) {
            return;
        }
        if (event.data === 'rtcmulticonnection-extension-loaded') {
            // console.log("CheckScreenSharePlugin  :: Extension is Present");
            this.setState({ isPluginPresent: true });
        }
    }

    componentWillMount() {
        // console.log("CheckScreenSharePlugin:: componentWillMount")
        // window.removeEventListener('message',this.pluginMessageEventHandler)
        window.addEventListener('message', this.pluginMessageEventHandler);
    }

    componentDidMount() {
        // console.log("CheckScreenSharePlugin:: componentDidMount")
        setTimeout(()=>{
            // console.log("CheckScreenSharePlugin:: messaging")
            window.postMessage('are-you-there', '*');
        },200);
        
    }

    componentWillUnmount(){
        window.removeEventListener('message',this.pluginMessageEventHandler);
    }

    installPlugin(){
        let isChrome = window.chrome && (window.chrome.webstore !== undefined);
        if (isChrome) { 
          window.chrome.webstore.install();
        } else { // redirect non-chrome users to a proper page.
          window.open(REFIER_SCREENSHARE_EXTENSION_URL, '_blank');
        }
      }

    render() {
        return (
            <div>
                {
                    this.state.isPluginPresent ?
                        this.props.fromSettings ?
                        <div className="custom-list-content">Screenshare plugin is installed.</div>     
                        :
                            null :
                        <Alert bsStyle="info" onDismiss={this.handleAlertDismiss} >
                            <ul>
                                <li>Screenshare extension is not found. Please click to install  Refier Screen share extension.
                                    <Button onClick={this.installPlugin} className="refier_custom_button_dark btn btn-primary">
                                        <FontAwesome
                                            name="chrome"
                                            style={{ marginRight: "5px" }}
                                        />
                                        One Click Install
                                    </Button>
                                </li>
                                <li>
                                <div style={{ marginTop: "10px" }}
                                        className="custom-warning-alert">
                                        Please REFRESH the page after plugin installation.</div>
                                </li>
                            </ul>
                        </Alert>

                }
            </div >
        );
    }
}

export default CheckScreenSharePlugin;