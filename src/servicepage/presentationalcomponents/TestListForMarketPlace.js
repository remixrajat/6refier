import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import TestCardForMarketPlace from './TestCardForMarketPlace';

import PreLoader from '../../shared/Preloader/PreLoader'


export default class TestListForMarketPlace extends Component {
    render() {
        // console.log("TestListForMarketPlace Props", this.props)

        let testList;
        if (this.props.tests) {
            testList = []
            for (let i = 0; i < this.props.tests.length; i++) {
                testList.push (
                    <Col xs={12} sm={6} md={4} key={this.props.tests[i].pk}
                        className="generic-post-card custom-item-border"
                        style={{margin: '10px', padding: '10px'}}
                    >
                        <TestCardForMarketPlace
                            index={i} 
                            testDetails={this.props.tests[i]} />
                    </Col>
                )
            }
        }

        return (
            <Grid fluid>
                {!testList ?
                    <PreLoader />
                    :
                    testList.length == 0 ?
                        <div style={{padding: '10px', width: '90%'}}
                            className="custom-list-content generic-post-card">
                            No Tests available yet
                        </div>
                    :
                    testList
                }
            </Grid>
        )
    }
}
