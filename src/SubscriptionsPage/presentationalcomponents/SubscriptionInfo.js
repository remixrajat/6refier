import React, { Component } from 'react'
import { Thumbnail, Col, Grid, Popover, OverlayTrigger } from 'react-bootstrap';
import SubscriptionPackageValidityController from '../conditionalcomponents/SubscriptionPackageValidityController';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom'

export default class SubscriptionInfo extends Component {

    constructor(props) {
        super(props)

        this.hintDescription = this.hintDescription.bind(this)
    }

    hintDescription(desc) {
        // console.log("Clicked on details : ", desc)
        let expertContent, expertQuiz
        if (desc) {
            expertContent = []
            expertQuiz = []
            for (let i = 0; i < desc.length; i++) {
                if (desc[i].type === "Expert Content") {
                    expertContent.push(
                        <div className="custom-list-sub-content" style={{ margin: "10px 10px" }}>
                            
                            {desc[i].name}</div>)
                }
                else if (desc[i].type === "Expert Quiz") {
                    expertQuiz.push(
                        <div className="custom-list-sub-content" style={{ margin: "10px 10px" }}>
                            {desc[i].name}</div>)
                }
            }
            let body = <div>
                <div className="custom-list-content" style={{ margin: "10px 10px" }}>
                    Expert Content</div>
                <div>{expertContent}</div>
                <div className="custom-list-content" style={{ margin: "10px 10px" }}>
                    Expert Quiz</div>
                <div>{expertQuiz}</div>
            </div>

            return <Popover id="popover-trigger-hover-focus">{body}</Popover>
        }
        return null
    }

    render() {
        // console.log("SubscriptionInfo::packageDetails", this.props.packageDetails, this.props.userCredits)
        let packageTitle, packageDesc, packageServices, packageCost,
            packageStatus, packageDaysLeft, packageValidities
        let countOfTest = 0
        let countOfContent = 0
        let countOfSession = 0
        let is_subscribed = false
        let expertContent = []
        let expertQuiz = []

        if (this.props.packageDetails) {
            packageTitle = this.props.packageDetails.fields.package_name
            packageDesc = this.props.packageDetails.fields.package_description

            let services = JSON.parse(this.props.packageDetails.fields.services)
            // console.log("services", services)
            packageServices = []
            countOfContent = 0
            countOfSession = 0
            countOfTest = 0
            for (let i = 0; i < services.length; i++) {
                let service = {}
                if (services[i].fields.available_test != null) {
                    service["type"] = "Expert Quiz"
                    service["name"] = services[i].fields.available_test
                    countOfTest = countOfTest + 1
                    expertQuiz.push(
                        <div className="custom-list-sub-content" style={{ margin: "10px 10px" }}>
                            <Link to={"/userDashboard/refiercontest/"+services[i].fields.available_test_id}
                        className="custom-link" target="_blank">
                        {services[i].fields.available_test}</Link>
                            </div>)
                }
                else if (services[i].fields.content != null) {
                    service["type"] = "Expert Content"
                    service["name"] = services[i].fields.content
                    countOfContent = countOfContent + 1
                    expertContent.push(
                        <div className="custom-list-sub-content" style={{ margin: "10px 10px" }}>
                        <Link to={"/userDashboard/vids/"+services[i].fields.content_id}
                        className="custom-link" target="_blank">
                        { services[i].fields.content}</Link>
                            </div>)
                }
                else if (services[i].fields.session != null) {
                    service["type"] = "Expert Session"
                    service["name"] = services[i].fields.session
                    countOfSession = countOfSession + 1
                }
                packageServices.push(service)
            }

            let validity = JSON.parse(this.props.packageDetails.fields.validity_subscription)
            // console.log("validity", validity)
            if (validity.length > 0) {
                packageValidities = []
            }
            for (let i = 0; i < validity.length; i++) {
                let packageValidity = {}
                packageValidity["id"] = validity[i].pk
                packageValidity["cost_in_credits"] = validity[i].fields.cost_of_package_in_credits
                packageValidity["cost"] = validity[i].fields.cost_of_package
                packageValidity["validity"] = validity[i].fields.validity
                let user_subscription = JSON.parse(validity[i].fields.user_subscription)
                if (user_subscription.length > 0) {
                    packageStatus = "Subscribed"
                    packageDaysLeft = user_subscription[0].fields.days_left
                    packageValidities = []
                    is_subscribed = true
                    packageValidities.push(
                        <div key={validity[i].pk}>
                            <span
                                style={{ display: "inline-block" }}
                                className="custom-border custom-test-package">
                                Subscribed -- {user_subscription[0].fields.days_left} Days Left
                            </span>
                        </div>
                    )
                    break
                }
                else {
                    packageValidities.push(
                        <div key={validity[i].pk}>
                            <SubscriptionPackageValidityController
                                available_package={validity[i]}
                                total_credits={this.props.userCredits[0].fields.total_credits}
                                refresh={this.props.refresh}
                                product_type="User_Package"
                            />
                        </div>
                    )
                }
            }
        }

        // if (packageServices) {

        // }

        return (
            <Col xs={12} md={6} style={{ marginTop: "10px" }}>
                <Grid fluid className="refier-card-style">
                    <div className="refier_custom_package_title">
                        {is_subscribed ? <span>
                            <FontAwesome
                                name="check-circle-o"
                                
                            />
                        </span>
                            :
                            null
                        }
                        <span style={{ marginLeft: "10px" }}>{packageTitle}</span>
                        {is_subscribed ?
                            <span style={{ marginLeft: "10px" }}>
                                <FontAwesome
                                    name="check-circle-o"
                                    
                                />
                            </span>
                            :
                            null
                        }
                    </div>
                    <div className="custom-list-sub-content" style={{padding:"10px 10px"}}>
                        {packageDesc}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        {countOfTest ? countOfTest > 0 ?
                            <div>
                            <div className="custom-list-content custom-package-detail-link"
                                style={{ marginTop: "20px", textAlign:"left" ,marginLeft: "10px"}}>
                                <span>Quiz from Experts:</span>
                                <span style={{ marginLeft: "10px" }}> {countOfTest}</span>
                                {/* <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="bottom"
                                    overlay={packageServices ?
                                        this.hintDescription(packageServices) : null}
                                >
                                    <span style={{ marginLeft: "20px" }}> Details</span>
                                    </OverlayTrigger> */}
                                </div>
                                <div>
                                    {expertQuiz}
                                </div>
                            
                            </div>

                            :
                            null : null}
                        {countOfSession ? countOfSession > 0 ?
                            <div className="custom-list-content custom-package-detail-link"
                                style={{ marginTop: "20px", textAlign:"left",marginLeft: "10px"  }}>
                                <span>Session Experts:</span>
                                <span style={{ marginLeft: "10px" }}> {countOfSession}</span>
                                <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="bottom"
                                    overlay={packageServices ?
                                        this.hintDescription(packageServices) : null}
                                >
                                    <span style={{ marginLeft: "20px" }}> Details</span>
                                </OverlayTrigger>
                            </div>
                            :
                            null : null}
                        {countOfContent ? countOfContent > 0 ?
                            <div>
                            <div className="custom-list-content custom-package-detail-link"
                                style={{ marginTop: "20px", textAlign:"left" ,marginLeft: "10px" }}>
                                <span>Content of Experts:</span>
                                <span style={{ marginLeft: "10px" }}> {countOfContent}</span>
                                {/* <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="bottom"
                                    overlay={this.hintDescription(packageServices)}
                                >
                                    <span style={{ marginLeft: "20px" }}> Details</span>
                                    </OverlayTrigger> */}
                                </div>
                                <div>
                                    {expertContent}
                                </div>
                            </div>
                            :
                            null : null}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        {packageValidities}
                    </div>
                </Grid>
            </Col>
        )
    }
}