import React,{Component} from 'react';
import { Grid, Row, Col, Button, ButtonGroup, Link } from 'react-bootstrap';
import BasicDetailsCardController  from '../../../communitypage/conditionalcomponents/BasicDetailsCardController';
import ClassDetailsController from '../../../communitypage/conditionalcomponents/ClassDetailsController';
import InternalCounsellorController from '../../../communitypage/conditionalcomponents/InternalCounsellorController';
import ExternalCounsellor from './ExternalCounsellor';
import ClassDetailsNew from './ClassDetailsNew';


export default class CommunityProfile extends Component{
 
 
  render()
  
  {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col md={6}>
                  {/* <div>
                  <Button bsStyle="default" 
                  className="refier_custom_link_8 refier_custom_button_dark" block
                  onClick={this.props.openUploadFilesModal} 
                  style={{"marginTop":"1em"}}>Upload Data</Button>
                  </div> */}
                
            <InternalCounsellorController {...this.props} />
              {/* <BasicDetailsCardController {...this.props}/> */}
              <ButtonGroup justified style={{"marginTop":"20px"}}>
                <ButtonGroup>
                <Button bsStyle="default" 
                className="refier_custom_link_8 refier_custom_button_dark"
                 onClick={this.props.open}>{"View "+ this.props.communitylabels.students + " List"}</Button>
                </ButtonGroup>
                <ButtonGroup>
                <Button bsStyle="default" 
                className="refier_custom_link_8 refier_custom_button_dark" 
                onClick={this.props.openAddStudents}>{"Add new " +  this.props.communitylabels.student} </Button>
                </ButtonGroup>
              </ButtonGroup>


              
            </Col>
            <Col md={6}>
              <ClassDetailsController {...this.props}/>
              <ButtonGroup justified style={{"marginTop":"20px"}}>
                <ButtonGroup>
                <Button bsStyle="default" className="refier_custom_link_8 refier_custom_button_dark" 
                block onClick={this.props.viewTeachers}>{"View "+ this.props.communitylabels.teachers + " List"}</Button>
                </ButtonGroup>
                <ButtonGroup>
                <Button bsStyle="default"
                className="refier_custom_link_8 refier_custom_button_dark" 
                block
                onClick={this.props.openAddTeachers}>{"Add new " +  this.props.communitylabels.teacher}</Button>
                </ButtonGroup>
              </ButtonGroup>
              <ExternalCounsellor {...this.props}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}
