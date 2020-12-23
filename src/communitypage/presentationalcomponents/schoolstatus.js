import React, { Component } from 'react';
// import 
import { Grid, Row, Col, Button, Image, imageShapeInstance, imageResponsiveInstance, Thumbnail } 
            from 'react-bootstrap';
import schoolImg from '../../images/mentor_dashboard_page/community_avatar.png';
import {Link, NavLink} from 'react-router-dom';

class SchoolStatus extends Component {
  render() {

    status = []
    if(this.props.status){
      for(let i=0;i<this.props.status.length;i++){
        status.push(<Row>
          <div className="refier_custom_paragraph1"
                style={{ "fontSize": "16px", "marginTop": "5px", 
                      "fontFamily": "Roboto" }}>
                <p><span> {this.props.status[i].status1} </span> </p>
              </div>
        </Row>)
      }
    }

    return (
      <Grid fluid>
        {status}
      </Grid>
    );
  }
}

export default SchoolStatus;