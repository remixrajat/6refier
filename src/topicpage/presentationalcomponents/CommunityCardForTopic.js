import React, { Component } from 'react';
//import CommunityImg from '../../images/mentor_dashboard_page/community_placeholder-3_u237.png';
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import { Row,Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import {URL_TEXT, MEDIA_URL_TEXT} from '../../GlobalConstants'
import { Link, NavLink } from 'react-router-dom';


export default class CommunityCardForTopic extends Component {
    render() {
        //console.log("My Community Detail : ",this.props.communityDetails.fields )
        let tagValues = this.props.communityDetails.fields.tag_values
        tagValues = JSON.parse(tagValues)
        let tags = []
        for(let i=0;i<tagValues.length;i++){
            let index = this.props.index?this.props.index+i:i
            index = index % 4
            tags.push(
                <span style={{marginRight:"5px",display: "inline-block", marginTop:"5px"}} 
                        className={"custom-list-tag-"+index}>
                        {tagValues[i].fields.tag_name}</span>)
        }
        return (
            <Row style={{padding:"10px 10px", textAlign:"left"}} 
                    // className="vertical-align-col-components"
                    >
                 <Col xs={2} style={{textAlign:"left"}}>
                <img 
                src={this.props.communityDetails.fields.profile_photo? MEDIA_URL_TEXT +
                            this.props.communityDetails.fields.profile_photo:CommunityImg}
                            /* src={CommunityImg} */
                            className="custom-list-img"/> 
                </Col>
                <Col xs={10} style={{textAlign:"left"}}>
                <div style={{paddingLeft:"10px"}}>    
                <Link to={"/userDashboard/community/" + this.props.communityDetails.pk}>
                <div 
                    className="custom-list-content">
                    {this.props.communityDetails.fields.entity_name}</div>  
                </Link>
                <div 
                    className="custom-list-sub-content-highlighted">
                    {this.props.communityDetails.fields.description}</div>
                <div>
                    {tags}
                </div>
                </div>
                </Col>
            </Row>
        );
    }
}