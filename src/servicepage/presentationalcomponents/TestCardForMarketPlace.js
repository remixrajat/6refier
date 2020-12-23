import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Row, Col } from 'react-bootstrap'

import {formatdatefunction} from '../../HelperFunctions/formatDateFunction'
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'


export default class TestCardForMarketPlace extends Component {
    render() {
        // console.log("TestCardForMarketPlace:: ", this.props)

        return (
            <div style={{ padding: "10px 10px", textAlign: "left" }}
                className="vertical-align-col-components">
                <div style={{ textAlign: "left" }}>
                    {this.props.testDetails.fields.test_name ?
                        <div
                            className="custom-list-content">
                            <b>{this.props.testDetails.fields.test_name}</b></div>
                        :
                        null}
                    <div
                        className="custom-list-sub-content-highlighted">
                        {this.props.testDetails.fields.description}
                    </div>
                    <div
                        className="custom-list-sub-content" style={{ marginTop: "5px" }}>
                        Estimated Time :&nbsp;
                        <b>{this.props.testDetails.fields.expected_time_in_minutes}</b>
                        &nbsp;minutes
                    </div>
                </div>
            </div>
        );
    }
}