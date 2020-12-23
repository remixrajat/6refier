import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import TestCardForTopic from './TestCardForTopic';

import PreLoader from '../../shared/Preloader/PreLoader'


export default class TestListForTopic extends Component {
    render() {
        console.log("TestListForTopic Props", this.props)

        let testList;
        if (this.props.testListOfTopic) {
            testList=[]
            for (var i = 0; i < this.props.testListOfTopic.length; i++) {
                let userId = this.props.userProfileData ? 
                                JSON.parse(this.props.userProfileData.profile)[0].pk:
                                (this.props.profileId?this.props.profileId:"")
                testList.push(
                    <Col xs={12} md={6} lg={4} key={this.props.testListOfTopic[i].pk}
                        className="generic-post-card custom-item-border"
                        style={{margin:"10px", padding: '10px'}}
                    >
                        <TestCardForTopic
                            index={i} 
                            testDetails={this.props.testListOfTopic[i]}
                            profileId = {userId} /></Col>)
            }
        }

        return (
                <Grid fluid>
                {!testList ?
                    <PreLoader />
                    :
                    testList.length==0?
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
