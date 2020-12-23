import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import CommunityCardForList from './CommunityCardForList.js';

import Preloader from '../../shared/Preloader/PreLoader'
import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton.js';


export default class IntroFormCommunityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewCardId: ''
        }

        this.expandCard = this.expandCard.bind(this);
        this.previewCard = this.previewCard.bind(this);
    }

    expandCard(id) {
        this.setState({previewCardId: id});
    }
    
    previewCard() {
        this.setState({previewCardId: ''});
    }

    render() {
        // console.log("IntroFormCommunityList :: this.props : ", this.props.communityDetails)

        let relevantCommunityList = [];
        let otherCommunityList = []
        
        if (this.props.communityDetails) {
            for (var i = 0; i < this.props.communityDetails.length; i++) {
                let pk = this.props.communityDetails[i].pk;

                if (this.props.communityDetails[i].is_relevant) {
                    relevantCommunityList.push (
                        <div
                            // onMouseEnter={() => this.expandCard(pk)}
                            // onMouseLeave={this.previewCard}
                            key={pk}
                            className={this.props.isMobile ? 
                                "col-xs-6 introform-cards-mobile" : "introform-cards"}>
                            {
                                this.state.previewCardId !== '' && this.state.previewCardId === pk ?
                                    <CommunityCardForList
                                        pk={pk}
                                        communityDetails={this.props.communityDetails[i]}
                                        userId={this.props.userId}
                                        dispatch={this.props.dispatch}
                                        previewCard={false}
                                        index={i}
                                        newUserForm={this.props.newUserForm} /> :
                                    <CommunityCardForList
                                        pk={pk}
                                        communityDetails={this.props.communityDetails[i]}
                                        userId={this.props.userId}
                                        dispatch={this.props.dispatch}
                                        previewCard={true}
                                        index={i}
                                        newUserForm={this.props.newUserForm} />
                            }
                        </div>
                    )
                }
                else {
                    otherCommunityList.push (
                        <div
                            // onMouseEnter={() => this.expandCard(pk)}
                            // onMouseLeave={this.previewCard}
                            key={pk}
                            className={this.props.isMobile ? 
                                "col-xs-6 introform-cards-mobile" : "introform-cards"}>
                            {
                                this.state.previewCardId !== '' && this.state.previewCardId === pk ?
                                    <CommunityCardForList
                                        pk={pk}
                                        communityDetails={this.props.communityDetails[i]}
                                        userId={this.props.userId}
                                        dispatch={this.props.dispatch}
                                        previewCard={false}
                                        index={i}
                                        newUserForm={this.props.newUserForm} /> :
                                    <CommunityCardForList
                                        pk={pk}
                                        communityDetails={this.props.communityDetails[i]}
                                        userId={this.props.userId}
                                        dispatch={this.props.dispatch}
                                        previewCard={true}
                                        index={i}
                                        newUserForm={this.props.newUserForm} />
                            }
                        </div>
                    )
                }
            }
        }

        let actionButton = (
            this.props.loaderStatus === 2 ?
                <Preloader /> :
                this.props.showSubmitButton ?
                    <ComplementaryButton 
                        onButtonClick={this.props.submitDetails}
                        buttonText="Submit"
                    /> :
                    <ComplementaryButton 
                        onButtonClick={this.props.submitDetails}
                        buttonText="Submit"
                        disabled={true}
                    />
        )

        return (
            
            <div>
				<div className="introform-nav" style={{position: 'fixed', top: '0', width: '100%', zIndex: '10001'}}>
					<Col xs={8} md={9} mdOffset={1} className="introform-nav-option-selected">
                        {/* { finaldesc } */}
					</Col>
					<Col xs={4} md={1} className="introform-nav-action-button">
						{ actionButton }
					</Col>
				</div>
                { this.props.isMobile ?
                    <div>
                        <Col xs={12} style={{ marginTop: "100px", marginBottom: "50px" }}>
                            <div className="introform-tiles-mobile" style={{marginBottom: '50px'}}>
                                <Col xs={12} 
                                    className="introform-cta-tile-mobile" 
                                    style={{marginRight: '50px', marginBottom: '50px'}}>
                                    <div className="introform-cta-tile-header">
                                        Join a Community
                                    </div>
                                    <div className="introform-cta-tile-sub-header">
                                        And get started
                                    </div>
                                    <div className="introform-cta-tile-sub-header">
                                        ( Click <b>plus (+) button</b> beside community name to join )
                                    </div>
                                </Col>
                                {relevantCommunityList.length > 0 ?
                                    <Col xs={12} style={{marginBottom: '30px'}}>
                                        <div className="sub-list-header" style={{ marginBottom: '20px' }}>
                                            Suggested Communities
                                    </div>
                                        <div>
                                            {relevantCommunityList}
                                        </div>
                                    </Col>
                                    :
                                    <Col xs={12} style={{marginBottom: '30px'}}>
                                        <div className="sub-list-header" style={{ marginBottom: '20px' }}>
                                            Communities
                                    </div>
                                        <div>
                                            {otherCommunityList}
                                        </div>
                                    </Col>
                                }
                                {relevantCommunityList.length>0?
                                    <Col xs={12}>
                                        <div className="sub-list-header" style={{ marginBottom: '20px' }}>
                                            Other Communities
                                    </div>
                                        <div>
                                            {otherCommunityList}
                                        </div>
                                    </Col>
                                    :
                                    null
                                }
                            </div>
                        </Col>
                    </div>

                    :
                    
                    <div className="introform-body-wrapper">
                        <Col sm={12} mdOffset={1} md={10} style={{ marginTop: "80px", marginBottom: "50px" }}>
                            <div className="introform-tiles" style={{marginBottom: '50px'}}>
                                <Col sm={12} md={5} 
                                    className="introform-cta-tile" 
                                    style={{marginRight: '50px', marginBottom: '50px'}}>
                                    <div className="introform-cta-tile-header">
                                        Join a Community
                                    </div>
                                    <div className="introform-cta-tile-sub-header">
                                        And get started
                                    </div>
                                    <div className="introform-cta-tile-sub-header">
                                        ( Click <b>plus (+) button</b> beside community name to join )
                                    </div>
                                </Col>
                                {relevantCommunityList.length > 0 ?
                                    <Col sm={12} md={7}>
                                        <div className="sub-list-header" style={{ marginBottom: '20px' }}>
                                            Suggested Communities
                                    </div>
                                        <div>
                                            {relevantCommunityList}
                                        </div>
                                    </Col>
                                    :
                                    <Col sm={12} md={7}>
                                        <div className="sub-list-header" style={{ marginBottom: '20px' }}>
                                            Communities
                                    </div>
                                        <div>
                                            {otherCommunityList}
                                        </div>
                                    </Col>
                                }
                            </div>
                            {relevantCommunityList.length > 0?
                                <Col sm={12}>
                                    <div className="sub-list-header" style={{ marginBottom: '20px' }}>
                                        Other Communities
                                </div>
                                    <div>
                                        {otherCommunityList}
                                    </div>
                                </Col>
                                :
                                null
                            }
                        </Col>
                    </div>
                }
			</div>
        )

    }
}
