import React, { Component } from 'react'
import { getTestPreviewDetailsId, ifAlreadyEnrolledForTest, analysisUsersAllAttemptsOfTest } from './action'
import { connect } from 'react-redux';
import TestPage from '../presentationalcomponents/TestPage'

class TestPageController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            testAnswers: [],
            currentQuestion: 0,
            isStartTest: false,
			isCompletedTest: false,
			isEnrolled: false,
			testSessionId: null
		};
		this.setStartTest = this.setStartTest.bind(this)
		this.setCompletedTest = this.setCompletedTest.bind(this)
		this.setTestSessionId = this.setTestSessionId.bind(this)
		this.setTestAnswers = this.setTestAnswers.bind(this)
		this.setRetakeTest = this.setRetakeTest.bind(this)
		this.refresh = this.refresh.bind(this)
    }

    setStartTest() {
        this.setState({ isStartTest: true })
	}
	
	setRetakeTest(){
		window.location = "/userDashboard/contest/"+this.props.userProfileId
									+"/"+this.props.match.params.testId
	}

	setCompletedTest(){
		console.log("completing test")
		this.setState({isCompletedTest: true})
	}

	setTestAnswers(answers){
		this.setState({testAnswers:answers})
	}

	setTestSessionId(testSession){
		this.setState({testSessionId:testSession})
	}

    componentDidMount() {
        this.props.dispatch(getTestPreviewDetailsId(this.props.match.params.testId))
        this.props.dispatch(ifAlreadyEnrolledForTest(this.props.match.params.testId))
        this.props.dispatch(analysisUsersAllAttemptsOfTest(this.props.match.params.testId))
	}
	
	refresh(){
        this.props.dispatch(getTestPreviewDetailsId(this.props.match.params.testId))
        this.props.dispatch(ifAlreadyEnrolledForTest(this.props.match.params.testId))
        this.props.dispatch(analysisUsersAllAttemptsOfTest(this.props.match.params.testId))
	}

    render() {
        console.log("Test Details", this.props)
        return (
            <TestPage
				profileId={this.props.userProfileId}
				testId={this.props.match.params.testId}
                testDetail={this.props.testDetail}
                isStartTest={this.state.isStartTest}
                isCompletedTest={this.state.isCompletedTest}
                currentQuestion={this.state.currentQuestion}
                setStartTest={this.setStartTest}
				setCompletedTest={this.setCompletedTest}
				ifAlreadyEnrolledInTest = {this.props.ifAlreadyEnrolledInTest}
				testAnswers = {this.state.testAnswers}
				setTestAnswers = {this.setTestAnswers}
				setTestSessionId = {this.setTestSessionId}
				testSessionId = {this.state.testSessionId}
				analysisUserAllAttempts = {this.props.analysisUserAllAttempts}
				setRetakeTest = {this.setRetakeTest}
				userCredits = {this.props.userCredits}
				refresh = {this.refresh}/>)
    }

}

let mapStateToProps = (store) => {
    // console.log("TestPageController::store", store.testDataReducer.testDetailState)
    return {
		testDetail: store.testDataReducer.testPreviewDetailState,
		ifAlreadyEnrolledInTest: store.testDataReducer.ifAlreadyEnrolledForTestDetailState,
		analysisUserAllAttempts: store.testDataReducer.analysisUserAllAttemptsState,
		userCredits: store.userProfileReducer.credits,
		userProfileId: store.userProfileReducer.userId
    }
}

export default connect(mapStateToProps)(TestPageController);