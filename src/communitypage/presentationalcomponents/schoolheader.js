import React, { Component } from 'react';
// import 
import { Grid, Row, Col, Button, Image, imageShapeInstance, imageResponsiveInstance, Thumbnail } 
            from 'react-bootstrap';
import schoolImg from '../../images/mentor_dashboard_page/community_avatar.png';
import {Link, NavLink} from 'react-router-dom';
import UserImageStatus from '../../profilepage/presentationalcomponents/UserImageStatus'

class SchoolHeader extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={12} >
            <br />
            <Col xs={12} smOffset={3} mdOffset={0} lgOffset={2} sm={5} lg={3} 
                        style={{ "textAlign": "center", "marginTop":"20px" }}>
              <UserImageStatus defaultVal={schoolImg}
                profile_photo = {this.props.communityBasicDataState[0].fields.profile_photo} 
                writeAccess={this.props.communityOwnershipStateValue} 
                submitProfilePicture={this.props.submitProfilePicture}
              />

            </Col>

            <Col xs={12} md={6} style={{ "textAlign": "left","marginTop":"10px" }} >
              <div className="refier_custom_light_panel_title"
               style={{ border: "solid transparent 1px", fontSize: '24px',
                   paddingRight: 30, textTransform: "uppercase" }}>
                <p><span>{this.props.communityBasicDataState[0].fields.entity_name}</span></p>
              </div>
              <div className="separator" style={{textAlign: "center",paddingRight: 30,}}> <span><i></i></span> </div>
              <div className="refier_custom_paragraph1"
                style={{ "fontSize": "18px", "marginTop": "5px", 
                      "fontFamily": "Roboto" }}>
                <p><span> {this.props.communityBasicDataState[0].fields.description} </span> </p>
              </div>

              {this.props.communityOwnershipStateValue ?
                <div
                  style={{"marginTop": "10px"}}>
                  <span>
                    <Link to={"/userDashboard/service/" + this.props.communityId}><Button bsStyle="primary"
                                  bsSize="small" style={{"marginTop":"10px"}} 
                                  className="refier_custom_button_new_selected_2"  
                                  >Refier Services</Button></Link>
                  </span>
                  <span style={{"marginLeft":"20px"}}>
                          <Button bsStyle="primary"
                                  bsSize="small" style={{"marginTop":"10px"}} 
                                  className="refier_custom_button_new_selected_2"  
                                  onClick={this.props.openRequestsModal}
                                  >{"Requests (" + 
                                  (this.props.pendingRequestState ? this.props.pendingRequestState.length : "0")
                                  + ")"}
                                  </Button>
                  </span>
                  {/* <span style={{"marginLeft":"20px"}}>
                    <Link to={"/userDashboard/performance/"+this.props.communityBasicDataState[0].pk}><Button bsStyle="primary"
                                  bsSize="small" style={{"marginTop":"10px"}} 
                                  className="refier_custom_button_new_selected_2"  
                                  >performance</Button></Link>
                  </span> */}
                </div>
                :null
              }
              
            </Col>
          </Col>
          <br />
          <br />
        </Row>
      </Grid>


    );
  }
}

export default SchoolHeader;