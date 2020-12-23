import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import {formatdatefunction} from '../../HelperFunctions/formatDateFunction'


export default class BlogCardForTopic extends Component {
    constructor(props){
        super(props)
    }

    render() {
        let blog = (this.props.blogDetail.fields.post_body)
        blog = blog.replace(/'/g, "\"")
        blog = JSON.parse(blog)
        
        let preview = ""

        for(let i = 0; i < blog.blocks.length; i++) {
            if(!blog.blocks[i].text=="") {
                preview = preview + blog.blocks[i].text
                if(preview.length > 20) {
                    preview = preview.substring(0, 200)
                    preview = preview + "..."
                    break;
                }
            } 
        }

        let publishDate = formatdatefunction(this.props.blogDetail.fields.publish_date,"long")
        let publishTime = formatdatefunction(this.props.blogDetail.fields.publish_date,"time")
        let isUsefulCount = this.props.blogDetail.fields.is_useful_count

        return (
            <Row style={{ padding: "10px 10px", textAlign: "left" }} 
                className="vertical-align-col-components">
                <Col style={{ width: '100%' }}>
                    {this.props.blogDetail.fields.post_title?
                        <div style={{marginBottom: '10px'}}
                            className="custom-list-content">
                            {this.props.blogDetail.fields.post_title}</div>
                        :
                        null}
                    
                    <div style={{marginBottom: '10px'}} 
                        className="custom-list-sub-content-highlighted">
                        {preview}</div>
                    <div
                        className="custom-list-sub-content">
                        {publishDate} {publishTime}</div>
                    <div style={{
                            display: 'flex', 
                            flexDirection: 'row', 
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Link to={"/userDashboard/viewblog/"+this.props.blogDetail.pk+"/1/"}
                            className="custom-link">
                            View
                        </Link>
                        {
                            isUsefulCount ?
                                <div className="custom-list-sub-content">
                                    {isUsefulCount === 1 ?
                                        <div><b>1</b> person finds this useful</div> :
                                        <div><b>{isUsefulCount}</b> people find it useful</div>
                                    }
                                </div> :
                                null
                        }
                    </div>
                </Col>
            </Row>
        );
    }
}