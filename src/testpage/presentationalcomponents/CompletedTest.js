import React, { Component } from 'react'
import { Grid, Col, Row, Button } from 'react-bootstrap'
import Preloader from '../../shared/Preloader/PreLoader'
import {Link} from 'react-router-dom'

export default class CompletedTest extends Component {
    render() {
        console.log("CompletedTest :: props :: ", this.props)
        let test_analysis
        if (this.props.test_type) {
            if (this.props.test_type == "isAnalysis") {
                test_analysis = <div
                                    style={{ padding: "20px 20px" }}>
                    <div className={"custom-panel-" + (this.props.bin != -1 ?
                        this.props.bin:0)}>
                                        <div className="custom-list-content-white"
                                            style={{ marginTop: "10px", textAlign: "center" }}
                        >{this.props.message}</div>
                        {
                            this.props.percentage != -1 ?
                                <div className="custom-list-content-white"
                            style={{ marginTop: "10px", textAlign: "center" }}
                                >{this.props.percentage}%</div>
                                :
                                null
                        }
                                    </div>
                                </div>
            }
            else if (this.props.test_type == "isParametricAnalysis") {
                let analysis = []
                let bin_total = 0
                let percentage_total=0
                let index = 0
                for (let key in this.props.message) {
                    index = index+1
                    analysis.push(
                        <div>
                            <div style={{
                                marginTop: "15px", fontSize: "0.9em"
                                  , fontWeight:"600"  }} className="">
                                {key}
                            </div>
                            <div style={{ marginTop: "5px", fontSize:"0.8em" }}>
                                {this.props.message[key]}    
                            </div>    
                        </div>
                        
                    )
                    bin_total = bin_total + (this.props.bin?this.props.bin[key]:0)
                    percentage_total = percentage_total +
                        (this.props.percentage ? this.props.percentage[key] : 0)
                }
                let bin = Math.ceil(bin_total / index)
                let percentage = Math.ceil(percentage_total / index)
                test_analysis = <div
                                    style={{ padding: "20px 20px" }}>
                    <div className={"custom-panel-" + (bin)}>
                                        <div className="custom-list-content-white"
                                            style={{ marginTop: "10px", textAlign: "center" }}
                        >{analysis}</div>
                                <div className="custom-list-content-white"
                            style={{ marginTop: "10px", textAlign: "center" }}
                                >{percentage}%</div>
                              
                                    </div>
                                </div>
            }
        }
        return (
            <Grid fluid>
                {this.props.isAnalysis ?
                    <Row>
                        <Col xsOffset={1} xs={10}
                            // className="refier-card-style"
                            className="generic-post-card" style={{
                                padding: "20px"}}
                        >
                        <div>
                            <div className="custom-test-analysis-title">
                                            Analysis of the Test
                                    </div>
                            <div  style={{marginTop:"10px"}}>
                            {test_analysis}</div>
                            <div style={{ marginTop: "20px" }}>
                                <Button onClick={this.props.setRetakeTest}
                                    className='refier_custom_button_save'> Retake Test
                                </Button>
                                    <Link to={"/userDashboard/"}>    
                                    <Button
                                    className='refier_custom_button_dark'> Go to Home
                                </Button>
                                </Link>        
                            </div>
                            </div>
                        </Col>
                    </Row>
                    :
                    <Col xs={12} style={{ textAlign: "center" }}>
                        <Preloader loaderMessage="Analysing the test results..." />
                    </Col>
                }
            </Grid>
        )
    }
}