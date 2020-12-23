import React, { Component } from 'react'
import { connect } from 'react-redux';

import RaiseHand from '../presentationalcomponents/RaiseHand'
import { addQuestionsToEvent, getQuestionsEvent } from './action'

import SocketConnection from '../SocketConnection';
import { playNotificationSound } from '../../GlobalConstants';


class RaiseHandController extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showInputQuestion: true,
            showQuestions: false,
            question: "",
            questionSubmitStatus: 0,
            myQuestions: 0,
            answeredQuestion: 0,
        }

        this.showInputQuestion = this.showInputQuestion.bind(this)
        this.hideInputQuestion = this.hideInputQuestion.bind(this)
        this.toggleInputQuestion = this.toggleInputQuestion.bind(this)

        this.showQuestions = this.showQuestions.bind(this)
        this.hideQuestions = this.hideQuestions.bind(this)
        this.toggleQuestions = this.toggleQuestions.bind(this)

        this.changeQuestion = this.changeQuestion.bind(this)
        this.submitQuestion = this.submitQuestion.bind(this)

        this.questionSubmitFailed = this.questionSubmitFailed.bind(this)
        this.questionSubmitProgress = this.questionSubmitProgress.bind(this)
        this.questionSubmitReset = this.questionSubmitReset.bind(this)
        this.questionSubmitSuccessful = this.questionSubmitSuccessful.bind(this)

        this.setQuestionsCount = this.setQuestionsCount.bind(this)

        this.clearQuestion = this.clearQuestion.bind(this);
        this.askQuestionHandler = this.askQuestionHandler.bind(this);
        this.emitRaisedHand = this.emitRaisedHand.bind(this);

        this.ASKQUESTIONEVENT = "askquestion"
        this.ASKQUESTIONEVENT_SERVER = "askquestionserver"
    }

    componentDidMount() {
        if (this.props.eventid) {
            this.props.dispatch(getQuestionsEvent(this.props.eventid));
        }
        if (this.props.profileFields && this.props.webinarQuestionsList) {
            this.setQuestionsCount(this.props.webinarQuestionsList)
        }

        setTimeout(() => {
            this.props.dispatch({ type: "IS_QUESTION_ASKED", data: false })
            this.props.dispatch({ type: "NEW_CHAT_COUNT", data: 0 })            
        }, 2000)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profileFields && nextProps.webinarQuestionsList) {
            if (!this.props.webinarQuestionsList) {
                this.setQuestionsCount(nextProps.webinarQuestionsList)
            }
            else if (this.props.webinarQuestionsList.length != nextProps.webinarQuestionsList.length) {
                this.setQuestionsCount(nextProps.webinarQuestionsList)
            }
        }

        if (nextProps.isPresenter) {
            this.setState({ showQuestions: true })
        }

        if (nextProps.refreshQuestionList !== 'undefined' && nextProps.refreshQuestionList) {
            this.hideQuestions()
            this.showQuestions()
        }
    }

    setQuestionsCount(questionList) {
        if (questionList) {
            let count = 0
            let answeredCount = 0
            for (let i = 0; i < questionList.length; i++) {
                if (questionList[i].fields.participant ==
                    this.props.profileFields.pk && !questionList[i].fields.isAnswered) {
                    count = count + 1
                }
                if (questionList[i].fields.isAnswered) {
                    answeredCount = answeredCount + 1
                }
            }
            this.setState({ myQuestions: count, answeredQuestion: answeredCount })
        }
    }

    changeQuestion(e) {
        this.setState({
            question: e.target.value
        })
    }

    clearQuestion() {
        this.setState({ question: "" })
    }

    submitQuestion() {
        let self = this
        this.questionSubmitProgress()
        let returnPromise = this.props.dispatch(addQuestionsToEvent(this.props.eventid, this.state.question))
        returnPromise.then(function (data) {
            if (!data) {
                self.questionSubmitFailed()
                return
            }
            self.props.dispatch({ type: "WEBINARQUESTIONS", data: data })
            // self.props.dispatch({ type: "IS_QUESTION_ASKED", data: true })
            self.emitRaisedHand(data);
            self.questionSubmitSuccessful();
            setTimeout(() => {
                self.questionSubmitReset()
            }, 1000);
        })

    }

    showInputQuestion() {
        this.setState({ showInputQuestion: true })
    }

    hideInputQuestion() {
        this.setState({ showInputQuestion: false })
    }

    toggleInputQuestion() {
        this.hideQuestions()
        this.setState({ showInputQuestion: !this.state.showInputQuestion })
    }

    showQuestions() {
        this.setState({ showQuestions: true })
    }

    hideQuestions() {
        this.setState({ showQuestions: false })
    }

    toggleQuestions() {
        this.hideInputQuestion()
        this.setState({ showQuestions: !this.state.showQuestions })
    }

    questionSubmitProgress() {
        this.setState({ questionSubmitStatus: 2 })
    }

    questionSubmitFailed() {
        this.setState({ questionSubmitStatus: -1 })
    }

    questionSubmitSuccessful() {
        this.setState({ questionSubmitStatus: 1 })
    }

    questionSubmitReset() {
        this.setState({ questionSubmitStatus: 0 })
        this.clearQuestion()
    }

    askQuestionHandler(event) {
        // console.log("askQuestionHandler ", event);
        let parsedMessage = JSON.parse(event);
        // console.log("Raisehand:: askQuestionHandler:: parsedMessage", parsedMessage);
        if (parsedMessage.eventid !== this.props.eventid) {
            console.warn("Wrong Event Id.")
            return;
        }
        this.props.dispatch({ type: "WEBINARQUESTIONS", data: parsedMessage.data })
        if(this.props.isPresenter) {
            playNotificationSound();
        }
    }

    emitRaisedHand(message) {
        // console.log("emitRaisedHand ", message)
        let msg = { eventid: this.props.eventid, data: message }
        this.props.ws.emit(this.ASKQUESTIONEVENT, JSON.stringify(msg));
        // this.ws.emit(this.ASKQUESTIONEVENT, JSON.stringify(msg));
    }

    render() {
        // console.log("RaiseHandController :: props :: ", this.props)

        return (
            <RaiseHand
                {...this.props}
                showInputQuestion={this.showInputQuestion}
                hideInputQuestion={this.hideInputQuestion}
                isShowInputQuestion={this.state.showInputQuestion}
                toggleInputQuestion={this.toggleInputQuestion}
                toggleQuestions={this.toggleQuestions}
                isShowQuestions={this.state.showQuestions}
                eventid={this.props.eventid}
                submitQuestion={this.submitQuestion}
                changeQuestion={this.changeQuestion}
                question={this.state.question}
                questionSubmitStatus={this.state.questionSubmitStatus}
                questionSubmitReset={this.questionSubmitReset}
                myQuestions={this.state.myQuestions}
                answeredQuestion={this.state.answeredQuestion}
            />
        )
    }
}


let mapStateToProps = (store) => {
    return {
        profileFields: store.userProfileReducer.profileFields,
        webinarQuestionsList: store.webinarPageReducer.webinarQuestion,
        token: store.webinarPageReducer.token
    }
}

export default connect(mapStateToProps)(RaiseHandController);