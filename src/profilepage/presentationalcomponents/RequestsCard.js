import React,{Component} from 'react';
import { Button,Grid, Row, Col } from 'react-bootstrap';

export default class RequestsCard extends Component{

  render(){
    const listItems = this.props.req.map((item) => 
      <div className="ax_default refier_text_on_light__8" style={{"text-align":"left"}}>
        {item.r}<span style={{"float":"right"}} className="ax_default refier_text_on_dark_9">{item.stat}</span><br/>
      </div>
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