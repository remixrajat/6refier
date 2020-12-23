import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import QuestionHolderController from '../conditionalcomponents/QuestionHolderController'

import Preloader from '../../shared/Preloader/PreLoader'


export default class RaiseHand extends Component {

    render() {
        if (this.props.isPresenter) {
            return (
                <div style={{
                    backgroundColor: "white", padding: "10px 0 10px 0", height: '100%'
                }}>
                    <div className="raisehand-chat-header"
                        style={{
                            marginTop: "5px",
                            borderWidth: "0px",
                            cursor: "pointer"
                        }}
                        onClick={this.props.toggleQuestions}>
                        All Questions ({this.props.answeredQuestion}/{this.props.webinarQuestionsList ?
                            this.props.webinarQuestionsList.length : 0})
                        <FontAwesome
                            name={this.props.isShowQuestions ? 'caret-up' : 'caret-down'}
                            style={{ display: "inline-block", marginLeft: '5px' }}
                        />
                    </div>
                    {
                        this.props.isShowQuestions ?
                            <QuestionHolderController
                                fromConference={true}
                                eventid={this.props.eventid}
                                isPresenter={this.props.isPresenter} />
                            :
                            null
                    }
                </div>
            )
        }
        else {
            return (
                <div style={{
                    backgroundColor: "white", padding: "10px", height: '100%'
                }}>
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div className="webinar-chat-header"
                            onClick={this.props.toggleInputQuestion}
                            style={{ paddingTop: "5px", borderWidth: "0px", cursor: 'pointer' }}>
                            Ask Question
                        </div>
                        <div style={{ verticalAlign: "middle", marginLeft: "20px" }}>
                            <Button
                                className="refier_custom_icon_button"
                                block
                                onClick={this.props.toggleInputQuestion}
                                style={{ fontSize: "16px" }}>
                                <span>
                                    <FontAwesome
                                        name="hand-pointer-o"

                                        title="Raise Hand"
                                    />
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "space-between",
                    }}>
                        <div style={{ marginTop: "5px", marginLeft: "5px" }}
                            className="custom-info-alert">Your {this.props.myQuestions} Questions are Pending
                        </div>
                        <div style={{
                            marginTop: "5px", marginLeft: "5px", borderBottom: "1px solid #797979",
                            cursor: "pointer"
                        }}
                            onClick={this.props.toggleQuestions}
                            className="custom-list-content">All Questions ({this.props.webinarQuestionsList ?
                                this.props.webinarQuestionsList.length : 0})
                        </div>
                    </div>
                    {this.props.isShowInputQuestion ?
                        this.props.questionSubmitStatus == 2 ?
                            <Preloader loaderMessage="Submitting Question ..." />
                            :
                            this.props.questionSubmitStatus == 1 ?
                                <div className="form-status-success">
                                    Question Submit Successful
                                </div>
                                :
                                this.props.questionSubmitStatus == -1 ?
                                    <div className="form-status-fail">
                                        Question Submit Failed. Please try again later.
                                    </div>
                                    :
                                    <div className="write"
                                        style={{
                                            display: "flex", justifyContent: "space-between", height: "130px"
                                        }}
                                    >
                                        <div style={{ width: "80%" }}>
                                            <textarea type="text" placeholder="Your Question here..."
                                                style={{
                                                    width: "100%", background: "transparent", borderWidth: "0px",
                                                    marginTop: "5px", height: "120px"
                                                }}
                                                autoFocus={true}
                                                onChange={this.props.changeQuestion}
                                                value={this.props.question}
                                            />
                                        </div>
                                        <div style={{ verticalAlign: "middle", marginTop: "10px", marginRight: "10px" }}>
                                            <Button
                                                className="refier_custom_icon_button"
                                                block
                                                onClick={
                                                    this.props.submitQuestion
                                                }
                                                style={{ fontSize: "16px" }}>
                                                <span>
                                                    <FontAwesome
                                                        name="paper-plane"
                                                        title="Send Question"
                                                    />
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                        :
                        null
                    }
                    {
                        this.props.isShowQuestions ?
                            <QuestionHolderController
                                ws={this.props.ws}
                                fromConference={true}
                                eventid={this.props.eventid}
                                isPresenter={this.props.isPresenter} />
                            :
                            null
                    }
                </div>
            )
        }
    }

}

