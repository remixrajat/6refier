import React, {Component} from 'react';
import { Grid, Row, Col, Button, FormControl, ButtonToolbar, Image, FormGroup } from 'react-bootstrap';
import commImage from '../../../images/mentor_dashboard_page/community_avatar.png'
import { URL_TEXT, MEDIA_URL_TEXT } from '../../../GlobalConstants'

export default class BasicDetailsCard extends Component{

  render()
  {
    let commBasicDetails = {}
    if(this.props.communityBasicDataState){
      commBasicDetails = this.props.communityBasicDataState[0].fields;
    }

    const showButtons=this.props.state.showButtons;

    return (
          <div
          /* className=" generic-post-card"  style={{"marginTop":"1em"}} */
          >
            <div className="refier_custom_panel_title_gray" 
              >
              Basic Details
            </div>
            
            <Grid fluid className="refier-card-style" >
              <Row>
                <Col xs={12} style={{"textAlign":"center"}}>
                  <img 
                  src={commBasicDetails.profile_photo ? MEDIA_URL_TEXT + 
                  commBasicDetails.profile_photo : commImage}
                  className="custom-image-card" alt="school"/>
                </Col>
                <Col mdOffset={5}>
                  <Grid fluid>
                    <Row>
                      <Col className=" refier_text_on_light__4" 
                         style={{"margin":"12px 0", "fontWeight":"600"}} md={4}>Name</Col>
                      { showButtons ? 
                        <Col className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0"
                          }} md={8}>{commBasicDetails.entity_name}</Col>
                                :
                        <Col md={8}>
                        <FormGroup bsSize="small">
                          <FormControl type="text" name="communityName" 
                          className=" refier_text_on_light__3"
                          style={{
                            'fontSize': '14px', 'fontWeight': '700', "marginBottom":"10px",
                          }}
                          onChange={this.props.onInputChange} 
                          value={this.props.communityBasicDetailsTransientState.communityName}/>
                          </FormGroup>
                        </Col>
                        
                      }
                      
                    
                      <Col  className=" refier_text_on_light__4" 
                         style={{"margin":"12px 0", "fontWeight":"600"}} md={4}>Contact</Col>
                      { showButtons ?
                        <Col className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0"
                          }} md={8}>{commBasicDetails.contact}</Col>
                        :
                        <Col md={8}>
                        <FormGroup bsSize="small">
                          <FormControl type="text" name="communityContact" 
                          className=" refier_text_on_light__3"
                          style={{
                            'fontSize': '14px', 'fontWeight': '700', "marginBottom":"10px",
                          }}
                          onChange={this.props.onInputChange} 
                          value={this.props.communityBasicDetailsTransientState.communityContact}/>
                          </FormGroup>
                        </Col>
                      }
                      
                   
                      <Col className=" refier_text_on_light__4" 
                         style={{"margin":"12px 0", "fontWeight":"600"}} md={4}>Email ID</Col>
                      { showButtons ? 
                        <Col className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0"
                          }} md={8}>{commBasicDetails.email}</Col>
                        :
                        <Col md={8}>
                         <FormGroup bsSize="small">
                          <FormControl type="text" name="communityEmail" 
                          className=" refier_text_on_light__3"
                          style={{
                            'fontSize': '14px', 'fontWeight': '700', "marginBottom":"10px",
                          }}
                          onChange={this.props.onInputChange} 
                          value={this.props.communityBasicDetailsTransientState.communityEmail}/>
                          </FormGroup>
                        </Col>
                      }
                      
                    </Row>
                  </Grid>
                </Col>
              </Row>
              <Row>
                <Col className="refier_text_on_light__4" style={{"paddingLeft":"20px", "fontWeight":"600"}}>
                  Description
                </Col>
              </Row>
              <Row>
                <Col className="refier_text_on_light__3">
                  { showButtons ?
                  <div className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"20px 20px"
                          }}>{commBasicDetails.description}</div>
                  :
                  <FormGroup bsSize="small" style={{"margin":"0 20px"}}>
                    <FormControl componentClass="textarea"
                     name="communityDesc" onChange={this.props.onInputChange} 
                     className=" refier_text_on_light__3"
                          style={{
                            'fontSize': '14px', 'fontWeight': '700',
                            "padding":"10px 10px"
                          }}
                     value={this.props.communityBasicDetailsTransientState.communityDesc}/>
                  </FormGroup>
                  }
                </Col>
              </Row>
              {/* <Row style={{"marginBottom":"10px", "marginTop":"10px"}}>
                <Col mdOffset={8} md={4}>
                  { showButtons ?
                    <Button bsStyle="primary" bsSize="small" 
                    className="refier_custom_button_new"
                    block
                    onClick={this.props.onEdit}>Edit</Button>
                    :
                    <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="small" 
                    style={{"backgroundColor":"rgba(72, 82, 140, 1)"}} 
                    onClick={this.props.onSave}>Save</Button>
                    <Button bsStyle="danger" bsSize="small"  
                    onClick={this.props.onCancel}>Cancel</Button>
                    </ButtonToolbar>
                  }
                  
                </Col>
              </Row> */}
            </Grid>
          </div>
    );
  }
}
