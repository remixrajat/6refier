import React, { Component } from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import CommunityCardForList from './CommunityCardForList.js';
import Preloader from '../../shared/Preloader/PreLoader'


export default class CommunityRightList extends Component {
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
        // console.log("CommunityRightList :: this.props : ", this.props.communityDetails)

        let relevantCommunityList = [];
        let otherCommunityList = []
        
        if (this.props.communityDetails) {
            for (var i = 0; i < this.props.communityDetails.length; i++) {
                let pk = this.props.communityDetails[i].pk;
                if (this.props.communityDetails[i].is_relevant) {
                    relevantCommunityList.push(
                        <div
                            // onMouseEnter={() => this.expandCard(pk)}
                            // onMouseLeave={this.previewCard}
                            key={pk}
                            className="custom-item-border">
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
                    otherCommunityList.push(
                        <div
                            // onMouseEnter={() => this.expandCard(pk)}
                            // onMouseLeave={this.previewCard}
                            key={pk}
                            className="custom-item-border">
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

        return (
            <div style={{ backgroundColor: "white" }}>
                {this.props.communityList ?
                    this.props.communityList.length == 0 ?
                        <div className="custom-list-content" style={{padding: "10px"}}>
                            We are taking care of this.
                        </div> :
                        <Grid fluid>
                            <Row className="custom-list-content" style={{padding:"10px 10px"}}>
                                <input type="text" onChange={(e) => this.props.setCommunitySearchTextState(e)} 
                                    value={this.props.communitySearchText} placeholder="Search Community"
                                    style={{width:"100%",paddingLeft:"5px"}}/>
                            </Row>
                            {relevantCommunityList.length > 0 ?
                                <Row className="sub-list-header" style={{ margin: "10px 10px" }}>
                                    Suggested Communities
                                </Row>
                                :
                                null
                            }
                            <div
                                className={this.props.newUserForm ? "community-form" : ""}
                            >
                                {relevantCommunityList}
                            </div>
                            {relevantCommunityList.length > 0 && otherCommunityList.length>0?
                                <Row className="sub-list-header" style={{ margin: "10px 10px" }}>
                                    Other Communities
                                </Row>
                                :
                                null
                            }
                            <div
                                className={this.props.newUserForm ? "community-form" : ""}
                            >
                            {otherCommunityList}
                            </div>
                            
                        </Grid> :
                    <div style={{ "textAlign": "center", marginTop: "30px" }}>
                        <Preloader copies={5} placeholder="short_card" shimmer={true} />
                    </div>
                }
            </div>
        )

    }
}
