import React, {Component} from 'react';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';
import mentorImage from '../../../images/mentor_dashboard_page/avatardp.png'
import {URL_TEXT, MEDIA_URL_TEXT} from '../../../GlobalConstants'
import {Link} from 'react-router-dom';

export default class ExternalCounsellor extends Component{

  render()
  {
    let mentors=[];
    let listItems = [];
    if(this.props.communityExtMentorDataState)
    {
      mentors = this.props.communityExtMentorDataState;
      //console.log("ExternalCounsellor:mentors",mentors)
        for(var i=0;i<mentors.length;i++)
        {
          let tagValues = mentors[i].fields.community_member.tag_values
          tagValues = JSON.parse(tagValues)
          let tags = []
          for(let j=0;j<tagValues.length;j++){
              let index = i+j
              index = index % 4
              tags.push(
                  <span style={{marginRight:"5px",display: "inline-block", marginTop:"5px"}} 
                          className={"custom-list-tag-"+index}>
                          {tagValues[j].fields.tag_name}</span>)
          }
          listItems.push(
              <Row style={{"marginTop":"10px"}}>
                <Col xs={4} style={{"textAlign":"-webkit-right"}}>
                <img
                src={mentors[i].fields.community_member.profile_photo?
                       MEDIA_URL_TEXT+
                       mentors[i].fields.community_member.profile_photo
                       :mentorImage}
                       className="custom-image-card" /> 
                </Col>
                <Col xs={8} style={{"textAlign":"left"}}>
                        <div className="custom-list-content">
                          <Link className="custom-link"
                          to ={"/userDashboard/profile/" + mentors[i].fields.community_member.id}>
                        {mentors[i].fields.community_member.first_name} {mentors[i].fields.community_member.last_name}
                        </Link>
                        </div>
                        <div className="custom-list-sub-content">
                          {mentors[i].fields.community_member.userstatus}
                        </div>
                        <div  className="custom-list-sub-content">
                          {mentors[i].fields.community_member.email}
                        </div>
                        <div>
                          {tags}
                        </div>
                      </Col>
              </Row>
          )
        }
    }
    return (
          <div>
            <div className="refier_custom_panel_title_gray">
            External Expert Details
            </div>
            <div  className="refier-card-style" style={{"padding":"10px 20px"}}>
            <Grid fluid >
              {listItems}
                {/* <Button bsStyle="primary" bsSize="small" 
                style={{"marginBottom":"10px", "marginTop":"10px"}}
                className="refier_custom_button_new"
                 block>ADD EXTERNAL COUNSELLOR</Button> */}
            </Grid>
            </div>
          </div>
    );
  }
}
