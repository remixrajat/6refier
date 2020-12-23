import React, { Component } from 'react';
import { Button,Row, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import {getBrowserInfo, SUPPORTED_BROWSER_WEBINAR} from '../../GlobalConstants'


export default class SupportedBrowserInfo extends Component {

    componentDidMount(){
        // getBrowserInfo()
    }

    supportedBrowserInfo() {
        let BrowserInfo = []
        for (let key in SUPPORTED_BROWSER_WEBINAR) {
            let values = []
            for(let i=0;i<SUPPORTED_BROWSER_WEBINAR[key].length;i++){
                values.push(
                    <div className="custom-list-sub-content" key={i} style={{marginTop:"5px"}}>{SUPPORTED_BROWSER_WEBINAR[key][i]}</div>
                )
            }
            BrowserInfo.push(
                <div key={key}>
                    <Col  xs={6} style={{marginTop:"10px"}}>
                    <div className="custom-list-content" style={{marginTop:"5px"}}>{key}</div>
                    </Col>
                    <Col xs={6} style={{marginTop:"10px"}}>{values}</Col>
                </div>
                
            )
        }
        return BrowserInfo
    }

    render() {

        return(
            <div>
            <div>{this.supportedBrowserInfo()}</div>
            </div>
        )
    }
}