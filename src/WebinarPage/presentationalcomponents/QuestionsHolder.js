import React, { Component } from 'react'
import { Col, ListGroup, ListGroupItem, Grid, Row, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import { formatDateFunction, formatdatefunction} from '../../HelperFunctions/formatDateFunction'


export default class QuestionsHolder extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // console.log("QuestionsHolder:: props", this.props);

        const list2 = [];
        const list1 = [];
        let self = this
        
        if (this.props.webinarQuestionsList) {
            for(let i= 0; i< this.props.webinarQuestionsList.length; i++) {
                if (!this.props.webinarQuestionsList[i].fields.isAnswered) {
                    list1.push (
                        <Row key={i} style={{
                            "margin": "5px 5px", marginTop: "20px",
                            borderBottom: "1px solid #f5f5f5"
                        }}>
                            <Col xs={8}>
                                <div className="custom-list-content"
                                    style={{
                                        "fontSize": "1.1em", wordBreak: "break-word"
                                    }}>{this.props.webinarQuestionsList[i].fields.question}</div>
                        
                                <div className="custom-list-sub-content"
                                    style={{
                                        marginTop: "5px"
                                    }}>{this.props.profileFields.pk ==
                                        this.props.webinarQuestionsList[i].fields.participant ?
                                        "You"
                                        :
                                        this.props.webinarQuestionsList[i].fields.first_name}</div>
                                <div className="custom-list-sub-content"
                                    style={{
                                        marginTop: "5px", fontSize: "0.8em"
                                    }}>
                                    {formatdatefunction(this.props.webinarQuestionsList[i].fields.
                                        creation_time, "time")}</div>
                            </Col>
                            <Col xs={4} style={{ textAlign: "end" }}>
                                {this.props.isPresenter || 
                                this.props.profileFields.pk == this.props.webinarQuestionsList[i].fields.participant ?
                                    <Button
                                        className="refier_custom_icon_button"
                                        onClick={() => {
                                            // console.log("Inside function :: self.props : ", self.props, i)
                                            self.props.setQuestionStatus
                                                (self.props.webinarQuestionsList[i].pk)
                                        }}
                                        style={{ fontSize: "16px" }}>
                                        <span>
                                            <FontAwesome
                                                name="check"
                                                title="Mark as Answered"
                                            />
                                        </span>
                                    </Button>
                                    :
                                    <div className="custom-warning-alert">
                                        Pending
                                    </div>
                                }
                            </Col>
                        </Row>
                    )
                }
                else {
                    list2.push (
                        <Row key={i} style={{
                            "margin": "5px 5px", marginTop: "20px",
                            borderBottom: "1px solid #f5f5f5"
                        }}>
                            <Col xs={8}>
                                <div className="custom-list-content"
                                    style={{
                                        "fontSize": "1.1em", wordBreak: "break-word"
                                    }}>{this.props.webinarQuestionsList[i].fields.question}</div>
                        
                                <div className="custom-list-sub-content"
                                    style={{
                                        marginTop: "5px"
                                    }}>{this.props.profileFields.pk ==
                                        this.props.webinarQuestionsList[i].fields.participant ?
                                        "You"
                                        :
                                        this.props.webinarQuestionsList[i].fields.first_name}</div>
                                <div className="custom-list-sub-content"
                                    style={{
                                        marginTop: "5px", fontSize: "0.8em"
                                    }}>
                                    {formatdatefunction(this.props.webinarQuestionsList[i].fields.
                                        creation_time, "time")}</div>
                            </Col>
                            <Col xs={4} style={{textAlign:"end"}}>
                                <div className="custom-info-alert">
                                    Answered
                                </div>
                            </Col>
                        </Row>
                    )
                }
            }
        }

        const AnsweredQuestions = list2.reverse()
        const UnAnsweredQuestions = list1.reverse()
        let isSmallScreen = "yes" === this.props.isSmallScreen
        let height = isSmallScreen? "30vh" : "55vh"

        
        return (
            <Grid fluid style={
                this.props.fromConference ?
                {
                    background:"white", 
                    padding: "10px 0px 0px 0px", 
                    margin: "0px",
                    minHeight: height, 
                    maxHeight: height, 
                    overflowY: "auto", 
                } :
                {
                    background:"white", 
                    padding: "10px 0px 0px 0px", 
                    margin: "0px",
                    maxHeight: height, 
                    minHeight: height, 
                    overflowY: "auto", 
                    overflowX: "hidden"
            }}>
                {!this.props.isPresenter ?
                    <div className="custom-list-sub-content" 
                        style={{marginTop: '5px', marginBottom: '5px', marginLeft: '15px', fontSize: '0.9em'}}>
                        <i>* Click on check button when query is resolved</i>
                    </div> :
                    null }
                {UnAnsweredQuestions}
                {AnsweredQuestions}
            </Grid>
        )
    }
}
