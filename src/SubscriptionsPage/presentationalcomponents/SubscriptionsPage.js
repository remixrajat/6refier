import React, { Component } from 'react'
import SubscriptionInfo from './SubscriptionInfo'
import Preloader from '../../shared/Preloader/PreLoader'
import { Grid, Col, Tab, Tabs } from 'react-bootstrap'

export default class SubscriptionsPage extends Component {

    render() {

        // console.log("SubscriptionsPage::props", this.props)

        let packages, subscribed_packages
        if (this.props.subscriptionPackages) {
            // console.log("SubscriptionsPage::subscriptionPackages", this.props.subscriptionPackages)
            packages = []
            subscribed_packages=[]
            for (let i = 0; i < this.props.subscriptionPackages.length; i++) {
                if (!this.props.subscriptionPackages[i].fields.is_single_service &&
                    !this.props.subscriptionPackages[i].fields.for_community) {
                    let validity = JSON.parse(this.props.subscriptionPackages[i].fields.
                        validity_subscription)
                    let is_subscribed=false
                    for (let i = 0; i < validity.length; i++) {
                        let user_subscription = JSON.parse(validity[i].fields.user_subscription)
                        if (user_subscription.length > 0) {
                            is_subscribed=true
                        }
                    }
                    is_subscribed?
                    subscribed_packages.push(
                        <SubscriptionInfo packageDetails={this.props.subscriptionPackages[i]}
                            userCredits={this.props.userCredits}
                            refresh={this.props.refresh} />
                    )
                    :
                    packages.push(
                        <SubscriptionInfo packageDetails={this.props.subscriptionPackages[i]}
                            userCredits={this.props.userCredits} 
                            refresh={this.props.refresh} />
                    )
                }
            }
        }

        return (
            <Grid fluid>
                {
                    packages ?
                        ((packages.length > 0 ) || (subscribed_packages.length>0))?
                            <Grid fluid>
                                <Col xs={12} style={{ textAlign: "center" }}>
                                    <div className="custom-test-title" style={{ border: "0px" }}>
                                        Subscriptions and Packages
                                    </div>
                                    <div className="custom-test-desc" style={{ border: "0px", marginTop: "10px" }}>
                                        Available Credits : {this.props.userCredits[0].fields.total_credits}
                                    </div>
                                </Col>
                                <Tabs defaultActiveKey={1} id="custom-tabs">
                                    <Tab eventKey={1} className="refier_custom_table_header_pane"
                                        title="Premium Packages">
                                        {
                                            packages.length > 0 ?
                                                packages :
                                                <div className="custom-list-content"
                                                    style={{ margin: "20px", }}>
                                                    Sorry! No Packages are available.
                                                </div>
                                        }
                                    </Tab>
                                    <Tab eventKey={2} className="refier_custom_table_header_pane"
                                        title="Subscribed Packages">
                                         {
                                            subscribed_packages.length > 0 ?
                                            subscribed_packages :
                                                <div className="custom-list-content"
                                                    style={{ margin: "20px" }}>
                                                    Sorry! You have not subscribed to any package.
                                                </div>
                                        }
                                    </Tab>
                                </Tabs>
                            </Grid>
                            :
                            <Col xs={12} className="custom-test-desc"
                                style={{ marginTop: "20px", textAlign: "center" }}>Sorry! No Packages are available.</Col>
                        :
                        <Col xs={12} md={10} mdOffset={1}
                            style={{ marginTop: "20px", textAlign: "center", background: 'white' }}>
        					<Preloader copies={3} placeholder="box_and_lines" shimmer={true} />
                        </Col>

                }
            </Grid>
        )
    }
}