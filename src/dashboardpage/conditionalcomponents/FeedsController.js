import React, { Component } from 'react';
import 'redux';
import { Col, Row, Grid } from 'react-bootstrap';
import CommunitySliderController from '../conditionalcomponents/CommunitySliderController.js';
import DashboardPostsController from '../conditionalcomponents/DashboardPostsController.js';
import MentorSliderController from '../conditionalcomponents/MentorSliderController';
import DashboardPageTop from '../presentationalcomponents/DashboardPageTop'


export default class FeedsController extends Component {
    render() {

        return (
            <Col xs={12}>
                <Row>
                    <DashboardPageTop trackSubmitPost={this.props.trackSubmitPost} />
                </Row>
                <br />

                <Row>
                    <CommunitySliderController />
                </Row>

                <Row>
                    <MentorSliderController />
                </Row>

                <Row>
                    <DashboardPostsController />
                </Row>
            </Col>
        )

    }

}