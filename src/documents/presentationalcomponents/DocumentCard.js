import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Thumbnail, Col, OverlayTrigger, Popover, Fade, Button, Row } from "react-bootstrap";
import FontAwesome from 'react-fontawesome';

import PackageValidityController from '../../shared/PackageValidity/conditionalcomponents/PackageValidityController'
import DocumentPlayer from "../../coursepage/presentationalcomponents/DocumentPlayer";

import dummyPoster from "../../images/mentor_dashboard_page/avatardp.png"
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'


class DocumentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            documentModalState: false,
            nextPrevTimeAdd: 5
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showDocumentModal = this.showDocumentModal.bind(this);
        this.closeDocumentModal = this.closeDocumentModal.bind(this);
        this.openInNewTab = this.openInNewTab.bind(this);
    }

    showModal() {
        //console.log("recordedContent::ContentInfoCard:: showModal() ")
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    showDocumentModal() {
        this.setState({documentModalState: true})
    }

    closeDocumentModal() {
        this.setState({documentModalState: false})
    }

    hintDescription(desc) {
        return <Popover id="popover-trigger-hover-focus">
            <div className="custom-list-sub-content" style={{ margin: "10px 10px" }}>
                {desc}</div>
        </Popover>
    }

    openInNewTab(contentUrl) {
        let url = contentUrl || this.props.content.document_url
        var win = window.open(url, '_blank');
        win.focus();
    }


    render() {
        // console.log("DocumentCard:: props", this.props)

        let tagValues = this.props.content.tag_values
        tagValues = JSON.parse(tagValues)
        let tags = []
        for (let i = 0; i < tagValues.length; i++) {
            let index = this.props.index ? this.props.index + i : i
            index = index % 4
            tags.push(
                <span
                    key={i}    
                    style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
                    className={"custom-list-tag-" + index}>
                    {tagValues[i].fields.tag_name}</span>)
        }

        let total_credits = 0
        if(this.props.userCredits){
            total_credits = this.props.userCredits[0].fields.total_credits
        }

        let subscribed_packages, purchase_packages, purchase_button, purchase_package_details
        let is_purchase_package = false
        if (this.props.content.isEntitled) {
            let packages = JSON.parse(this.props.content.subscriptions_packages)
            let subscriptions_packages = packages.SubscribedPackages
            // console.log("subscriptions_packages", subscriptions_packages)
            if (subscriptions_packages) {
                if (subscriptions_packages.length > 0) {
                    subscriptions_packages = JSON.parse(subscriptions_packages[0])
                    // console.log("subscriptions_packages", subscriptions_packages)
                    if (subscriptions_packages) {
                        if (subscriptions_packages.length > 0) {
                            subscribed_packages = []
                            for (let i = 0; i < subscriptions_packages.length; i++) {
                                if (subscriptions_packages[i].fields.user) {
                                    // if (!entity_mapping_id) {
                                    //     entity_mapping_id = subscriptions_packages[i].pk
                                    // }
                                    subscribed_packages.push(<div
                                        className="custom-border custom-test-package"
                                        style={{ textAlign: "center" }}>
                                        <div>
                                            <span style={{ "marginRight": "10px" }}>
                                                <FontAwesome
                                                    name='unlock'
                                                    
                                                    style={{ "display": "inline-block" }}
                                                />
                                            </span>
                                            <span>
                                                Subscribed -- {subscriptions_packages[i].fields.days_left} Days Left
                                            </span>
                                        </div>
                                    </div>)
                                }
                                else if (subscriptions_packages[i].fields.entity) {
                                    // entity_mapping_id = subscriptions_packages[i].pk
                                    subscribed_packages.push(<div
                                        className="custom-border custom-test-package"
                                        style={{ textAlign: "center" }}>
                                        <div>
                                            <span style={{ "marginRight": "10px" }}>
                                                <FontAwesome
                                                    name='unlock'
                                                    
                                                    style={{ "display": "inline-block" }}
                                                />
                                            </span>
                                            <span>
                                                {subscriptions_packages[i].fields.entity} Subscription
                                    </span>
                                        </div>
                                        <div>
                                            {subscriptions_packages[i].fields.days_left} Days Left
                                    </div>
                                    </div>)
                                }
                            }
                        }
                    }
                }
            }

            if (!subscribed_packages) {
                is_purchase_package = true
                packages = JSON.parse(this.props.content.subscriptions_packages)
                let available_packages = packages.AvailablePackages
                // console.log("available_packages", available_packages)
                if (available_packages) {
                    if (available_packages.length > 0) {
                        available_packages = JSON.parse(available_packages[0])
                        // console.log("available_packages", available_packages)
                        purchase_package_details = available_packages
                        if (available_packages) {
                            if (available_packages.length > 0) {
                                purchase_packages = []

                                for (let i = 0; i < available_packages.length; i++) {
                                    if (available_packages[i].fields.cost_of_package == 0) {
                                        is_purchase_package = false
                                        purchase_button = undefined
                                        purchase_packages = []
                                        purchase_packages.push(
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                }}
                                                className="custom-border custom-test-package">

                                                <span style={{ "marginRight": "10px" }}>
                                                    <FontAwesome
                                                        name='unlock'
                                                        
                                                        style={{ "display": "inline-block" }}
                                                    />
                                                </span>
                                                <span>Free</span>

                                            </span>)
                                        break
                                    }
                                    else {
                                        purchase_button =
                                            <span style={{
                                                display: "inline-block", "cursor": "pointer"
                                            }} className="custom-border custom-test-package"
                                                onClick={this.showModal}>
                                                <span style={{ "marginRight": "10px" }}>
                                                    <FontAwesome
                                                        name='lock'
                                                        style={{ "display": "inline-block" }}
                                                    />
                                                </span>
                                                <span>Go Premium</span>
                                            </span>
                                        purchase_packages.push (
                                            <PackageValidityController
                                                available_package={available_packages[i]}
                                                total_credits={total_credits}
                                                refresh={this.props.refresh}
                                                product_type="Content_Single_Package" 
                                                />
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        let noAccess
        if (!subscribed_packages) {
            if (!purchase_packages) {
                purchase_button = <div />
                noAccess = <span style={{
                    display: "inline-block",
                }} className="custom-border custom-test-package">
                    <span style={{ "marginRight": "10px" }}>
                        <FontAwesome
                            name='lock'
                            style={{ "display": "inline-block" }}
                        />
                    </span>
                    <span>No Access</span>
                </span>
            }
        }

        let playerModal = (
            <DocumentPlayer {...this.props}
                showModal={this.state.documentModalState}
                nextPrevTimeAdd={this.state.nextPrevTimeAdd}
                onClose={this.closeDocumentModal}
                document={this.props.content}
                openInNewTab={this.openInNewTab}
            />
        );

        return (
            <div>
                <Col xs={6} md={4} lg={3}>
                    <Thumbnail
                        src={this.props.content.poster_thumbnail ? 
                            MEDIA_URL_TEXT + this.props.content.poster_thumbnail : 
                            dummyPoster}
                        className="custom-thumbnail refier-card-style"
                        >
                        <div style={{ margin: "10px 0px" }}>
                            <OverlayTrigger
                                trigger={['hover', 'focus']}
                                placement="top"
                                overlay={this.hintDescription(this.props.content.description)}
                            >
                                <span className="custom-list-content">{this.props.content.title}</span>
                            </OverlayTrigger></div>
                        <Row>
                            {/* <Col xs={6}
                                className="custom-list-sub-content-highlighted">
                                <span style={{ "marginRight": "10px" }}>
                                    <FontAwesome
                                        name='arrow-down'
                                        
                                        style={{ "display": "inline-block" }}
                                    />
                                </span>
                                <span>10</span></Col> */}
                            <Col xs={6} className="custom-list-sub-content-highlighted">
                                {/* <span style={{ "marginRight": "10px" }}>
                                    <FontAwesome
                                        name='thumbs-o-up'
                                        
                                        style={{ "display": "inline-block" }}
                                    />
                                </span> */}
                                {/* <a
                                    onClick={this.openInNewTab.bind(this)}    
                                    className="refier_custom_link">Open Google Doc</a></Col> */}
                                <a
                                    onClick={this.showDocumentModal}    
                                    className="refier_custom_link">View Document</a></Col>
                        </Row>
                        <div style={{marginTop:"10px"}}>
                            {tags}
                        </div>

                        {this.props.content.author ? this.props.content.author.last_name!=""?
                            <div className="custom-list-sub-content-highlighted" style={{ marginTop: "10px" }}>
                                {this.props.content.author.first_name}{" "}{this.props.content.author.last_name !== 'None' ?
                                    this.props.content.author.last_name : ""}</div>
                            :
                            <div className="custom-list-sub-content-highlighted" style={{ marginTop: "10px" }}>
                                {this.props.content.author.first_name}</div>
                            :
                            null
                        }
                        {this.props.fromOtherPage ? null : <div className="custom-list-sub-content">
                            {this.props.content.description}</div>
                        }

                    </Thumbnail>
                </Col>
                {
                    this.state.documentModalState ?
                        playerModal :
                        null
                }
            </div>
        );
    }
}

export default DocumentCard;