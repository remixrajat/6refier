import React,{Component} from 'react';
import { Button,Grid, Row, Col } from 'react-bootstrap';
  
export default class MentorCard extends Component{
  render(){
    const listItems = this.props.val.map((item) => 
      <Grid fluid>
        <Row>
          <Col md={2}>
            <img className=" img img-responsive" src="images/profile_page/mentor-2_u558.png" alt="Mentor" style={{"float":"left"}}/>
          </Col>
          <Col className="ax_default refier_text_on_light__8">
            {item}
          </Col>
        </Row>
      </Grid>

    );
    return (
          <div className=" generic-post-card" data-label="Common Cards">
          <span style={{"float":"right"}} className="ax_default refier_text_on_light_10">{this.props.name}</span><br/>
              <hr/>
            {listItems}
            <Grid fluid>
              <Row>
                <Col md={4} mdOffset={4}>
                  <Button bsStyle="primary" bsSize="small" style={{"background-color":"rgba(72, 82, 140, 1)"}} block>More</Button>
                </Col>
              </Row>
            </Grid>
          </div>
    );
  }
}