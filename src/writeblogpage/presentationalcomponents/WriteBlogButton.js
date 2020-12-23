import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';


class WriteBlogButton extends Component {
    render() {
        
        return (
            <div>
                <Col xs={12} mdOffset={1} md={10} lgOffset={0} lg={12}>
                    <Grid fluid>
                        <Row style={{ "marginBottom": "20px", "textAlign": "center" }}>
                            <PrimaryButton 
                                redirect={true}
                                redirectAddress={this.props.linkToPage 
                                    ? this.props.linkToPage 
                                    : "/userDashboard/blog/write/ALL"
                                }
                                buttonText="Write a Blog/Notice"
                                showIcon={
                                    <FontAwesome
                                        name="pencil-square-o"
                                    />
                                }
                            />
                        </Row>
                    </Grid>
                </Col>
            </div>
        )
    }
}

export default WriteBlogButton;