import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import SessionCardForMarketPlace from './SessionCardForMarketPlace';

import PreLoader from '../../shared/Preloader/PreLoader'


export default class SessionListForMarketPlace extends Component {
    render() {
        // console.log("SessionListForMarketPlace Props", this.props)

        let eventtList;
        if (this.props.events) {
            eventtList = []
            for (let i = 0; i < this.props.events.length; i++) {
                eventtList.push (
                    <Col xs={12} sm={6} md={4} key={this.props.events[i].pk}
                        className="generic-post-card custom-item-border"
                        style={{margin: '10px', padding: '10px'}}
                    >
                        <SessionCardForMarketPlace
                            index={i} 
                            eventDetail={this.props.events[i]} />
                    </Col>
                )
            }
        }

        return (
            <Grid fluid>
                {!eventtList ?
                    <PreLoader />
                    :
                    eventtList.length == 0 ?
                        <div style={{padding: '10px', width: '90%'}}
                            className="custom-list-content generic-post-card">
                            No Content available yet
                        </div>
                    :
                    eventtList
                }
            </Grid>
        )
    }
}
