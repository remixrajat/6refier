/*jshint esversion: 6 */
import React, { Component } from "react";
import { Grid, Col, Row, Tabs, ButtonGroup, Button } from "react-bootstrap";
import AllApplicationReceivedController from '../conditionalcomponents/AllApplicationReceivedController'
import PreLoader from "../../shared/Preloader/PreLoader"
import {Link, NavLink} from 'react-router-dom';

export default class PaymentsTemplate extends Component {
    render() {

        let payments = [
            {
                "Date": "15/11/2017",
                "Amount": "8000",
                "Invoice": "www.google.com",
                "paid": false
            },
            {
                "Date": "15/09/2017",
                "Amount": "5000",
                "Invoice": "www.google.com",
                "paid": false
            },
            {
                "Date": "15/05/2017",
                "Amount": "10000",
                "Invoice": "www.google.com",
                "paid": true
            },
            {
                "Date": "15/04/2017",
                "Amount": "2000",
                "Invoice": "www.google.com",
                "paid": true
            },
            {
                "Date": "15/02/2017",
                "Amount": "4000",
                "Invoice": "www.google.com",
                "paid": true
            }
        ]

        //console.log("payments", this.props)

        let unpaidAmounts = []
        let paidAmounts = []
        for (let i = 0; i < payments.length; i++) {
            if (!payments[i].paid) {
                unpaidAmounts.push(
                    <div style={{"padding":"10px 20px"}}>
                        <Grid fluid>
                            <Row>
                                <Col xs={4}>
                                    <span>Date: {payments[i].Date}</span>
                                </Col>
                                <Col xs={4}>
                                    <span>Amount: {payments[i].Amount}</span>
                                </Col>
                                <Col xs={4}>
                                    <Button>Pay Now</Button>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                )
            }
            else {
                paidAmounts.push(
                    <div style={{"padding":"10px 20px"}}>
                       <Grid fluid>
                            <Row>
                                <Col xs={4}>
                                    <span>Date: {payments[i].Date}</span>
                                </Col>
                                <Col xs={4}>
                                    <span>Amount: {payments[i].Amount}</span>
                                </Col>
                                <Col xs={4}>
                                    <Link to={payments[i].Invoice}>Invoice</Link>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                )
            }
        }

        return (
            <Grid fluid>
                <div>
                    <div className="refier_custom_light_panel_title"
                        style={{
                            "border": "solid transparent 1px",
                            "padding": "0px 10px 10px", textAlign: "center"
                        }}>Pending Payments</div>
                        <div style={{backgroundColor:"white"}}>
                            {unpaidAmounts}
                        </div>
                </div>
                <div>
                    <div className="refier_custom_light_panel_title"
                        style={{
                            "border": "solid transparent 1px",
                            "padding": "0px 10px 10px", textAlign: "center"
                        }}>Previous Payments</div>
                        <div  style={{backgroundColor:"white"}}>
                            {paidAmounts}
                        </div>
                </div>
            </Grid>
        );
    }
}
