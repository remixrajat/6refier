import React from 'react';
import { Grid, Row, Col,Button } from 'react-bootstrap';

const MoreCards = props => {
	return (
		      <div className=" generic-post-card" data-label="Common Cards">
            <span style={{"float":"right"}} className="ax_default refier_text_on_light_10">{props.name}</span><br/>
            <hr/>
            <img className="img img-responsive" src={props.imageSrc} alt="blog" style={{"max-width":"100%","min-width":"100%"}}/>
            <div className="" style={{"text-align":"left"}}>
              <div className="ax_default refier_text_on_light_1">
                {props.opt1}
              </div>
              <div className="ax_default refier_custom_text_on_light_h4">
                {props.val1}
              </div>
              <div className="ax_default refier_custom_text_on_light_h5">
                {props.time1}
              </div>
              <div className="ax_default refier_custom_paragraph1">
                {props.val2}
              </div>
            </div>


            <img className="img img-responsive" src={props.imageSrc} alt="blog" style={{"max-width":"100%","min-width":"100%"}}/>
            <div className="" style={{"text-align":"left"}}>
              <div className="ax_default refier_text_on_light_1">
                {props.opt1}
              </div>
              <div className="ax_default refier_custom_text_on_light_h4">
                {props.val1}
              </div>
              <div className="ax_default refier_custom_text_on_light_h5">
                {props.time1}
              </div>
              <div className="ax_default refier_custom_paragraph1">
                {props.val2}
              </div>
            </div>
            <Grid fluid>
              <Row>
                <Col md={4} mdOffset={4}>
                  <Button bsStyle="primary" bsSize="small" style={{"background-color":"rgba(72, 82, 140, 1)"}} block>More</Button>
                </Col>
              </Row>
            </Grid>
          </div>
		);
};

export default MoreCards;