import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import DocumentCardForMarketPlace from './DocumentCardForMarketPlace';

import PreLoader from '../../shared/Preloader/PreLoader'


export default class DocumentListForMarketPlace extends Component {
    render() {
        // console.log("DocumentListForMarketPlace Props", this.props)

        let documentList;
        if (this.props.documents) {
            documentList = []
            for (let i = 0; i < this.props.documents.length; i++) {
                documentList.push (
                    <Col xs={12} sm={6} md={4} key={this.props.documents[i].pk}
                        className="generic-post-card custom-item-border"
                        style={{margin: '10px', padding: '10px'}}
                    >
                        <DocumentCardForMarketPlace
                            index={i} 
                            contentDetails={this.props.documents[i]} />
                    </Col>
                )
            }
        }

        return (
            <Grid fluid>
                {!documentList ?
                    <PreLoader />
                    :
                    documentList.length == 0 ?
                        <div style={{padding: '10px', width: '90%'}}
                            className="custom-list-content generic-post-card">
                            No documents available yet
                        </div>
                    :
                    documentList
                }
            </Grid>
        )
    }
}
