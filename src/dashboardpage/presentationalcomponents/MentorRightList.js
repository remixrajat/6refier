import React, {Component} from 'react';
import {Grid,Col,Row, Button} from 'react-bootstrap';

import MentorCardForList from './MentorCardForList.js';

import Preloader from '../../shared/Preloader/PreLoader'


export default class MentorRightList extends Component{
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
        // console.log("MentorRightList::props", this.props)

        let relevantMentorList = [], otherMentorList=[]
        
        if(this.props.mentorDetails ) {
            for (var i = 0; i < this.props.mentorDetails.length ; i++) {
                let pk = this.props.mentorDetails[i].pk;
                if (this.props.mentorDetails[i].fields.is_relevant) {
                    relevantMentorList.push (
                        <div
                            onMouseEnter={() => this.expandCard(pk)}
                            onMouseLeave={this.previewCard}
                            key={this.props.mentorDetails[i].pk}
                            // className="custom-item-border"
                        >
                            {
                                this.state.previewCardId !== '' && this.state.previewCardId === pk ?
                                    <MentorCardForList
                                        mentorDetails={this.props.mentorDetails[i]}
                                        index={i}
                                        previewCard={false}
                                        userId={this.props.userId} /> :
                                    <MentorCardForList
                                        mentorDetails={this.props.mentorDetails[i]}
                                        index={i}
                                        previewCard={true}
                                        userId={this.props.userId} />
                            }
                        </div>)
                }
                else {
                    otherMentorList.push (
                        <div
                            onMouseEnter={() => this.expandCard(pk)}
                            onMouseLeave={this.previewCard}
                            key={this.props.mentorDetails[i].pk}
                            // className="custom-item-border"
                        >
                            {
                                this.state.previewCardId !== '' && this.state.previewCardId === pk ?
                                    <MentorCardForList
                                        mentorDetails={this.props.mentorDetails[i]}
                                        index={i}
                                        previewCard={false}
                                        userId={this.props.userId} /> :
                                    <MentorCardForList
                                        mentorDetails={this.props.mentorDetails[i]}
                                        index={i}
                                        previewCard={true}
                                        userId={this.props.userId} />
                            }
                        </div>)
                }
            } 
        }
    
        return (
            <div style={{backgroundColor:"white"}}>
                {!this.props.mentorList ?
                    <div style={{ "textAlign": "center", marginTop: "30px" }}>
                        <Preloader copies={5} placeholder="short_card" shimmer={true} />
                    </div> :
                    this.props.mentorDetails.length == 0 ?
                    <div className="custom-list-content">Sorry! We are in a process of onboarding Experts.</div> :
                        <Grid fluid>
                            <Row className="custom-list-content" style={{padding:"10px 10px"}}>
                                <input type="text" onChange={(e) => this.props.setMentorSearchTextState(e)} 
                                    value={this.props.mentorSearchText} placeholder="Search Mentors"
                                    style={{width:"100%",paddingLeft:"5px"}}/>
                            </Row>
                            {relevantMentorList.length > 0 ?
                                <Row className="sub-list-header" style={{ margin: "10px 10px" }}>
                                    Suggested Experts
                            </Row>
                                :
                                null
                            }
                            {relevantMentorList}

                            {relevantMentorList.length > 0 && otherMentorList.length>0?
                                <Row className="sub-list-header" style={{ margin: "10px 10px" }}>
                                    Other Experts
                                </Row>
                                :
                                null
                            }
                            {otherMentorList}
                        </Grid>
                }
            </div>
        )  

    }
}
