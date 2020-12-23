import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Row, Col, Thumbnail } from 'react-bootstrap'

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import dummyPoster from "../../images/mentor_dashboard_page/document.jpg"


export default class ContentCardForMarketPlace extends Component {
    render() {
        // console.log("ContentCardForMarketPlace :: ", this.props)
        
        if(this.props.contentDetails === 'undefined')
            return

        let contentFirstName = this.props.contentDetails['fields'].author.first_name
        let contentLastName = this.props.contentDetails['fields'].author.last_name

        return (
            <div>
                <Thumbnail
                    src={this.props.contentDetails['fields'].poster_thumbnail && 
                        this.props.contentDetails['fields'].poster_thumbnail.trim() !== '' ? 
                            MEDIA_URL_TEXT + this.props.contentDetails['fields'].poster_thumbnail : 
                            dummyPoster}
                    style={{border: "0px"}}
                    className="custom-thumbnail refier-card-style">
                    <div style={{ margin: "10px 0px" }}>
                        <b>{this.props.contentDetails['fields'].title}</b>
                    </div>
                    <div style={{ margin: "10px 0px" }} className="custom-list-sub-content">
                        {this.props.contentDetails['fields'].description}
                    </div>
                    <Row>
                        <Col xs={6}
                            className="custom-list-sub-content-highlighted">
                            <span style={{ "marginRight": "10px" }}>
                                <FontAwesome
                                    name='eye'
                                    style={{ display: "inline-block" }}
                                />
                            </span>
                            <span>{this.props.contentDetails['fields'].views_count}</span>
                        </Col>
                        <Col xs={6} 
                            className=
                            {this.props.contentDetails.likeOrDislike?
                                this.props.contentDetails.likeOrDislike == "like"?
                                    "custom-list-sub-content-blue":
                                    "custom-list-sub-content-highlighted":
                                    "custom-list-sub-content-highlighted"}>
                            <span style={{ "marginRight": "10px" }}>
                                <FontAwesome
                                    name='thumbs-o-up'
                                    style={{ display: "inline-block" }}
                                />
                            </span>
                            <span>{this.props.contentDetails['fields'].number_of_likes}</span></Col>
                    </Row>
                    <div className="custom-list-sub-content-highlighted" style={{ marginTop: "10px" }}>
                        Content by &nbsp;<b>{contentFirstName}&nbsp;
                        {contentLastName && contentLastName.trim() !== '' ?
                            contentLastName : ""}</b>
                    </div>
                </Thumbnail>
            </div>
        );
    }
}