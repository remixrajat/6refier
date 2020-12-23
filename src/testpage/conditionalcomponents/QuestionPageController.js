import React, {Component} from 'react'
import {getTestDetailsId} from './action'
import QuestionPage from '../presentationalcomponents/QuestionPage'
import { connect } from 'react-redux';

class QuestionPageController extends Component{
    constructor(props){
        super(props)
        this.state = {
            answers: {},
            currentQuestion: 0,
			isEndTest: false,
			currentQuestionId:null
        };
		this.setEndTest = this.setEndTest.bind(this)
		this.setCurrentQuestion = this.setCurrentQuestion.bind(this)
		this.onClickPreviousButton = this.onClickPreviousButton.bind(this)
		this.onClickNextButton = this.onClickNextButton.bind(this)
		this.setCurrentQuestionId = this.setCurrentQuestionId.bind(this)
		this.handleOptionChange = this.handleOptionChange.bind(this)
    }

    

    setEndTest() {
        this.props.setTestAnswers(this.state.answers)
        this.props.setCompletedTest()
        this.setState({ isEndTest: true })
	}
	
	setCurrentQuestion(question){
		this.setState({currentQuestion:question})
	}

	setCurrentQuestionId(questionId){
		this.setState({currentQuestionId:questionId})
	}

	onClickPreviousButton(prevQuestion,e){
        // onClickPreviousButton(){
        console.log("QuestionPageController::prevQuestion",prevQuestion)
		let currentQuestionState = this.state.currentQuestion
        this.setCurrentQuestion(currentQuestionState-1)
        this.setCurrentQuestionId(prevQuestion)
	}

	onClickNextButton(nextQuestion,e){
        // onClickNextButton(){
        console.log("QuestionPageController::nextQuestion",nextQuestion)
		let currentQuestionState = this.state.currentQuestion
        this.setCurrentQuestion(currentQuestionState+1)
        this.setCurrentQuestionId(nextQuestion)
	}

	setAnswers(answer){
		this.setState({answers:answer})
	}

	handleOptionChange(changeEvent) {
		let selectedOptionId = changeEvent.target.value
		let answerList = this.state.answers
		answerList[this.state.currentQuestionId] = selectedOptionId
		console.log("handleOptionChange::selectedOptionId::answerList",selectedOptionId,answerList)
		this.setAnswers(answerList)
	}

    componentDidMount(){
        let returnPromise = this.props.dispatch(getTestDetailsId(this.props.testId))
        returnPromise.then((response) => {
            console.log("QuestionPageController::fetchedTestDetails",response)
            this.props.dispatch({ type: "testDetail", data: response });
        //   console.log("******Response from server for enrollForTest: ", data);
        //   dispatch({ type: "testEnrollmentDetail", data: data });
        })
    }

    render(){
        return(
            <div>
                <QuestionPage {...this.props}
				    setCurrentQuestion = {this.setCurrentQuestion}
				    onClickNextButton = {this.onClickNextButton}
				    onClickPreviousButton = {this.onClickPreviousButton}
				    currentQuestionId = {this.state.currentQuestionId}
				    setCurrentQuestionId = {this.setCurrentQuestionId}
                    handleOptionChange = {this.handleOptionChange}
                    currentQuestion = {this.state.currentQuestion}
                    answers = {this.state.answers}
                    setEndTest = {this.setEndTest} />
            </div>
        )
    }
}


let mapStateToProps = (store) => {
    console.log("QuestionPageController::store", store.testDataReducer)
    return {
		completeTestDetail: store.testDataReducer.testDetailState
    }
}

export default connect(mapStateToProps)(QuestionPageController);