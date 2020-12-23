import React, { Component } from 'react'
import Preloader from '../../shared/Preloader/PreLoader'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';

export default class QuestionPage extends Component {

    componentDidMount() {
        let question
        if (this.props.completeTestDetail) {
            let questionObj = {}
            let questions = JSON.parse(this.props.completeTestDetail.test_details[0].fields.questions)
            console.log("QuestionPage::componentDidMount::questions", questions)
            question = questions[this.props.currentQuestion].fields.question_text[0]
            this.props.setCurrentQuestionId(question.pk)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.completeTestDetail) {
            let question
            let questionObj = {}
            let questions = JSON.parse(nextProps.completeTestDetail.test_details[0].fields.questions)
            console.log("QuestionPage::componentWillReceiveProps::questions", questions)
            question = questions[nextProps.currentQuestion].fields.question_text[0]
            nextProps.setCurrentQuestionId(question.pk)
        }
    }

    render() {

        console.log("QuestionPage::props", this.props)

        let questionBody
        let question, count
        if (this.props.completeTestDetail) {
            let questionObj = {}
            let questions = JSON.parse(this.props.completeTestDetail.test_details[0].fields.questions)
            console.log("QuestionPage::questions", questions)
            count = questions.length - 1
            question = questions[this.props.currentQuestion].fields.question_text[0]
            let prevQuestion = this.props.currentQuestion > 0 ? questions[this.props.currentQuestion - 1].fields.question_text[0].pk :
                questions[this.props.currentQuestion].fields.question_text[0].pk
            let nextQuestion = this.props.currentQuestion == count ? questions[this.props.currentQuestion].fields.question_text[0].pk :
                questions[this.props.currentQuestion + 1].fields.question_text[0].pk
            let questionLabel = question.fields.question
            let optionList = []
            let optionsUIList = []
            if (question) {
                let inputType
                let options = JSON.parse(question.fields.options)
                if (question.fields.is_multi_choice_type) {
                    inputType = "checkbox"
                }
                else if (question.fields.is_single_choice_type) {
                    inputType = "radio"
                }
                else if (question.fields.is_subjective_type) {
                    inputType = "text"
                }
                else {
                    inputType = "radio"
                }
                let optionsCount
                if (options.length % 2 == 0) {
                    optionsCount = options.length / 2
                }
                else {
                    optionsCount = (options.length / 2)
                }
                for (let i = 0; i < optionsCount; i++) {
                    console.log("QuestionPage::option", options[2 * i], options[2 * i + 1])
                    let option = {}
                    let option1 = {}
                    if (options[2 * i]) {
                        option["id"] = options[2 * i].pk
                        option["label"] = options[2 * i].fields.option
                    }
                    // if ((i < optionsCount - 1) || (i == optionsCount - 1 && options.length % 2 == 0)) {
                    if (options[2 * i + 1]) {
                        option1["id"] = options[2 * i + 1].pk
                        option1["label"] = options[2 * i + 1].fields.option
                    }
                    let currentId = this.props.currentQuestionId

                    let isAnswered = this.props.answers[currentId] == undefined ? false : true
                    if (options[2 * i]) {
                        optionList.push(option)
                    }
                    if (options[2 * i + 1]) {
                        optionList.push(option1)
                    }
                    let styleClass = "custom-option-btn"
                    if (isAnswered) {
                        if (this.props.answers[currentId] == option.id) {
                            styleClass = "custom-option-btn selected-custom-option-btn"
                        }
                    }
                    let styleClass1
                    if ((i < optionsCount - 1) || (i == optionsCount - 1 && options.length % 2 == 0)) {
                        styleClass1 = "custom-option-btn"
                        if (isAnswered) {
                            if (this.props.answers[currentId] == option1.id) {
                                styleClass1 = "custom-option-btn selected-custom-option-btn"
                            }
                        }
                    }
                    console.log("StyleClass", styleClass)

                    optionsUIList.push(
                        <div style={{ display: "table", width: "100%" }}>
                            <Col xs={6} style={{ display: "table-cell" }}>
                                <table>
                                    <tr>
                                        <td><div className={styleClass}>{2 * i + 1}. </div></td>
                                        <td>
                                            <label for={option.id}
                                                className={styleClass}>
                                                <input type={inputType}
                                                    //  name="SingleChoice"
                                                    value={option.id}
                                                    checked={this.props.answers.currentId == option.id ? true : false}
                                                    onChange={this.props.handleOptionChange.bind(this)}
                                                    hidden={true}
                                                />{option.label}</label>
                                        </td>
                                    </tr>
                                </table>
                            </Col>
                            {
                                ((i < optionsCount - 1) ||
                                    (i == optionsCount - 1 && options.length % 2 == 0)) ?
                                    <Col xs={6} style={{ display: "table-cell" }}>
                                        <table>
                                            <tr>
                                                <td><div className={styleClass1}>{2 * i + 2}. </div></td>
                                                <td>
                                                    <label for={option1.id}
                                                        className={styleClass1}>
                                                        <input type={inputType}
                                                            //  name="SingleChoice"
                                                            value={option1.id}
                                                            checked={this.props.answers.currentId == option1.id ? true : false}
                                                            onChange={this.props.handleOptionChange.bind(this)}
                                                            hidden={true}
                                                        />{option1.label}</label>

                                                </td>
                                            </tr>
                                        </table>
                                    </Col>
                                    :
                                    null
                            }
                        </div>
                    )
                }
            }
            console.log("Question:::Options::", questionLabel, optionList)
            questionBody = <Grid fluid>
                <Col xsOffset={1} xs={10}
                    // className="refier-card-style"
                    className="generic-post-card" style={{
                        padding: "20px"}}
                >
                    <Col xs={12} className="custom-test-time" style={{ textAlign: "right" }}>
                        Question {this.props.currentQuestion + 1} of {count + 1}
                    </Col>
                    <Col xs={12} style={{marginBottom:"10px"}}>
                        <div style={{ padding: "10px 20px" }} className="custom-test-analysis-title">
                            {questionLabel}</div>
                        <Col xs={12}>
                            {optionsUIList}
                        </Col>
                    </Col>
                    <Col xsOffset={1} xs={5} style={{ textAlign: "left" }}>
                        <div>
                            {this.props.currentQuestion == 0 ? null :
                                <Button className='refier_custom_button_dark'
                                    onClick={this.props.onClickPreviousButton.bind(this, prevQuestion)}>Previous</Button>}
                        </div>
                    </Col>
                    <Col xs={5} style={{ textAlign: "right" }}>
                        <div>{this.props.currentQuestion == count ?
                            <PrimaryButton 
                                onButtonClick={this.props.setEndTest}
                                buttonText="Submit Test"
                            /> :
                            <Button className='refier_custom_button_save'
                                onClick={this.props.onClickNextButton.bind(this, nextQuestion)}>Next</Button>}</div>
                    </Col>
                </Col>
            </Grid>
        }

        return (
            <div >
                {this.props.completeTestDetail ?
                    questionBody :
                    <div style={{ textAlign: "center" }}>
                        <Preloader loaderMessage="Loading Questions..." />
                    </div >}
            </div>
        )
    }
}