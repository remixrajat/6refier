import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import CommunityPageNavBarController from '../conditionalcomponents/CommunityPageNavBarController.js';
import SchoolComponentsController from '../conditionalcomponents/schoolComponentsController'
import SchoolHeaderControllerNew from '../conditionalcomponents/SchoolHeaderControllerNew'
import SchoolHeaderController from '../conditionalcomponents/schoolheaderController'

import {isLgDevice} from '../../GlobalConstants';


class CommunityPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLargeScreen: isLgDevice()
    }
  }
  
  componentWillMount () {
    window.addEventListener("resize", this.isLgScreen.bind(this));
  }
  
  isLgScreen(){
    this.setState({isLargeScreen: isLgDevice()})
  }
  
  render() {
    // console.log("isLgDevice", this.state.isLargeScreen);

    return (
      <div>
        {!this.state.isLargeScreen ?
          <Col lgHidden>
            <Grid fluid className="router-content-panel">
              <SchoolHeaderController {...this.props} />
              <br />
              <SchoolComponentsController {...this.props} />
              <br />
              <CommunityPageNavBarController {...this.props} />
            </Grid>
          </Col>
          :
          <Col xsHidden smHidden mdHidden lg={12}>
            <Col xs={3}>
              <SchoolHeaderControllerNew {...this.props} />
            </Col>
            <Col xs={9}>
                <SchoolComponentsController {...this.props} />
                <CommunityPageNavBarController {...this.props} />
            </Col>
          </Col>
        }
      </div>
    );
  }
}

export default CommunityPage;
