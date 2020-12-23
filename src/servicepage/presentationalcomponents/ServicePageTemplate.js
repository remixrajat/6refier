import React, { Component } from "react";
import { Grid, Col, Row, Tabs, ButtonGroup, Button } from "react-bootstrap";
import AllApplicationReceivedController from '../conditionalcomponents/AllApplicationReceivedController'
import ServiceChart from "./ServiceChart";
import PreLoader from "../../shared/Preloader/PreLoader"

import '../../styles/scss/custom-tab.css'


export default class ServicePageTemplate extends Component {
    render() {
        //console.log("servpagetemp", this.props)

        return (
            <Grid fluid>
                <Row className="show-grid">
                    <Col>
                        <div>
                            <Col xs={12} md={3}>
                                <div className="refier_custom_panel_title_card"
                                    style={{borderBottomWidth:"0px"}}
                                    >Applications Received</div>
                                <Grid fluid className="refier-card-style"
                                    style={{ 
                                 "maxHeight": "40vh", "overflow": "auto" }}>
                                    <AllApplicationReceivedController
                                        data={this.props.applicationsReceived}
                                        application={this.props.application}
                                        applicationsApproved={this.props.applicationsApproved}
                                        onApprove={this.props.onApprove} />
                                </Grid>
                            </Col>
                        </div>
                        <div>
                            <Col xs={12} md={9}>  
                                <div className="refier_custom_panel_title_card"
                                    style={{borderBottomWidth:"0px"}}
                                >{this.props.communityName ?
                                    ("Sessions of " + this.props.communityName):"Sessions"}</div>
                                <Grid fluid className="refier-card-style">
                                    <div style={{ "margin": "0px 0px" }}>
                                        {this.props.tabsList.length > 0 ?
                                            <Tabs justified defaultActiveKey={1}
                                            id="custom-tabs">
                                                {this.props.tabsList}
                                            </Tabs>
                                            :
                                            <Col style={{ "textAlign": "center" }}>
                                                <div style={{ "margin": "50px 20px" }}>
                                                    <PreLoader />
                                                </div>
                                            </Col>}
                                    </div>
                                </Grid>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
