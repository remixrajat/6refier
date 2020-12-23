import React, {Component} from 'react'
import {submitTestAnswers} from './action'
import { connect } from 'react-redux';
import {analysisOfTest} from './action'
import Preloader from '../../shared/Preloader/PreLoader'
import CompletedTest from '../presentationalcomponents/CompletedTest'

class CompletedTestController extends Component{
    constructor(props){
        super(props)
            this.state = {
                isAnalysis: false,
                message: "",
                bin: -1,
                percentage: -1,
                test_type:"isAnalysis"
            }
            this.setIsAnalysis = this.setIsAnalysis.bind(this)
        this.setMessage = this.setMessage.bind(this)
        this.setTestType = this.setTestType.bind(this)
        this.setBin = this.setBin.bind(this)
        this.setPercentage = this.setPercentage.bind(this)
    }

    setIsAnalysis(analysis){
        this.setState({isAnalysis:analysis})
    }

    setMessage(msg){
        this.setState({message:msg})
    }

    setBin(bin){
        this.setState({bin:bin})
    }

    setPercentage(percentage){
        this.setState({percentage:percentage})
    }

    setTestType(test_type) {
        this.setState({test_type: test_type})
    }

    componentDidMount(){
        this.setIsAnalysis(false)
        if(this.props.testAnswers){
            let answerList = []
            for (let key in this.props.testAnswers){
                let answer = {}
                answer["question_id"] = key
                answer["option_id"] = this.props.testAnswers[key]
                answerList.push(answer)
            }
            // console.log("Submit Answers :: ",this.props.testSessionId, answerList )
            let returnPromise = this.props.dispatch(submitTestAnswers(this.props.testSessionId, answerList))
            returnPromise.then((response) => {
                console.log("CompletedTestController::submitTestAnswers",response)
                let status = response.submit_answer
                if(status == "Success"){
                    let returnPromiseOnAnalysis = this.props.dispatch(
                            analysisOfTest(this.props.testId, this.props.testSessionId))
                    returnPromiseOnAnalysis.then((response) => {
                        console.log("CompletedTestController::returnPromiseOnAnalysis", response)
                        this.setTestType(response.test_type)
                        this.setIsAnalysis(true)
                        this.setMessage(response.analysis)
                        if (response.bin) {
                            this.setBin(response.bin)
                        }
                        if (response.percentage) {
                            this.setPercentage(response.percentage)
                        }
                        
                    })
                } 
                else if(status == "Not Entitled"){
                    this.setIsAnalysis(true)
                    this.setMessage("Error occured in submitting. Seems like you were not entitled to this test.")
                }
                else if(status == "Invalid"){
                    this.setIsAnalysis(true)
                    this.setMessage("Error occured in submitting. Seems like you submitted an invalid test")
                }
                else if(status == "No Session Present"){
                    this.setIsAnalysis(true)
                    this.setMessage("Error occured in submitting. Seems like no sessions were present for this test")
                }
                // this.props.dispatch({ type: "testEnrollmentDetail", data: response });
            })
        }
    }

    render(){
        return(
            <div>
                <CompletedTest message={this.state.message}
                    bin={this.state.bin}
                    percentage={this.state.percentage}
                    isAnalysis={this.state.isAnalysis}
                    setRetakeTest={this.props.setRetakeTest}
                    profileId={this.props.profileId}
                    testId={this.props.testId}
                    test_type={this.state.test_type}/>
            </div>)
    }
}


let mapStateToProps = (store) => {
    console.log("CompletedTestController::store", store.testDataReducer)
    return {
		// testEnrollmentDetail: store.testDataReducer.testEnrollmentDetailState
    }
}

export default connect(mapStateToProps)(CompletedTestController);