import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import ContentCardForMarketPlace from './ContentCardForMarketPlace';

import PreLoader from '../../shared/Preloader/PreLoader'


export default class ContentListForMarketPlace extends Component {
    render() {
        // console.log("ContentListForMarketPlace Props", this.props)

        let contentList;
        if (this.props.contents) {
            contentList = []
            for (let i = 0; i < this.props.contents.length; i++) {
                contentList.push (
                    <Col xs={12} sm={6} md={4} key={this.props.contents[i].pk}
                        className="generic-post-card custom-item-border"
                        style={{margin: '10px', padding: '10px'}}
                    >
                        <ContentCardForMarketPlace
                            index={i} 
                            contentDetails={this.props.contents[i]} />
                    </Col>
                )
            }
        }

        return (
            <Grid fluid>
                {!contentList ?
                    <PreLoader />
                    :
                    contentList.length == 0 ?
                        <div style={{padding: '10px', width: '90%'}}
                            className="custom-list-content generic-post-card">
                            No Content available yet
                        </div>
                    :
                    contentList
                }
            </Grid>
        )
    }
}
