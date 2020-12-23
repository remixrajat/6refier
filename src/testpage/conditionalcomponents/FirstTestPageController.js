import React, {Component} from 'react'
import FirstTestPage from '../presentationalcomponents/FirstTestPage'
import {enrollForTest} from './action'
import {purchase_service} from '../../SubscriptionsPage/conditionalcomponents/action'
import { connect } from 'react-redux';


class FirstTestPageController extends Component{
    constructor(props){
        super(props)
        this.state = {
            isStartButton : false,
            isEnrollButton : false,
            showProgress : false,
            isEntitled : false,
            isTestExists: false,
            isProgressOnPayButton: false,
            payButtonId: -1
        }
        this.setIsStartButton = this.setIsStartButton.bind(this)
        this.setIsEnrollButton = this.setIsEnrollButton.bind(this)
        this.setIsProgress = this.setIsProgress.bind(this)
        this.setIsEntitled = this.setIsEntitled.bind(this)
        this.setIsTestExists = this.setIsTestExists.bind(this)
        this.onClickForEnrollment = this.onClickForEnrollment.bind(this)
        this.setPayButtonId = this.setPayButtonId.bind(this)
        this.setProgressOnPayButton = this.setProgressOnPayButton.bind(this)
        this.unsetProgressOnPayButton = this.unsetProgressOnPayButton.bind(this)
    }

    componentDidMount(){
        if(this.props.ifAlreadyEnrolledInTest){
            let statusOfEnrollment = this.props.ifAlreadyEnrolledInTest.enrollment_details
            // console.log("FirstTestPageController::componentDidMount::statusOfEnrollment",
                                // statusOfEnrollment)
            if(statusOfEnrollment == "No Sessions"){
                this.setIsEnrollButton(true)
                this.setIsStartButton(false)
                this.setIsEntitled(true)
                this.setIsTestExists(true)
                this.setIsProgress(false)
            }
            else if(statusOfEnrollment == "Not Entitled"){
                this.setIsEnrollButton(false)
                this.setIsStartButton(false)
                this.setIsEntitled(false)
                this.setIsTestExists(true)
                this.setIsProgress(false)
            }
            else if(statusOfEnrollment == "Test Not Exist"){
                this.setIsEnrollButton(false)
                this.setIsStartButton(false)
                this.setIsEntitled(false)
                this.setIsTestExists(false)
                this.setIsProgress(false)
            }
            else{
                this.setIsEnrollButton(false)
                this.setIsStartButton(true)
                this.setIsEntitled(true)
                this.setIsTestExists(true)
                this.setIsProgress(false)
                let enrollment = JSON.parse(statusOfEnrollment)
                // console.log("componentDidMount::enrollment",enrollment)
                this.props.setTestSessionId(enrollment[0].pk)
            }
        }
    }

    componentWillReceiveProps(props){
        // console.log("Props Received : " ,props)
        if(!this.props.ifAlreadyEnrolledInTest){
            if(props.ifAlreadyEnrolledInTest){
                let statusOfEnrollment = props.ifAlreadyEnrolledInTest.enrollment_details
                // console.log("FirstTestPageController::componentDidMount::statusOfEnrollment",
                                    // statusOfEnrollment)
                if(statusOfEnrollment == "No Sessions"){
                    this.setIsEnrollButton(true)
                    this.setIsStartButton(false)
                    this.setIsEntitled(true)
                    this.setIsTestExists(true)
                    this.setIsProgress(false)
                }
                else if(statusOfEnrollment == "Not Entitled"){
                    this.setIsEnrollButton(false)
                    this.setIsStartButton(false)
                    this.setIsEntitled(false)
                    this.setIsTestExists(true)
                    this.setIsProgress(false)
                }
                else if(statusOfEnrollment == "Test Not Exist"){
                    this.setIsEnrollButton(false)
                    this.setIsStartButton(false)
                    this.setIsEntitled(false)
                    this.setIsTestExists(false)
                    this.setIsProgress(false)
                }
                else{
                    this.setIsEnrollButton(false)
                    this.setIsStartButton(true)
                    this.setIsEntitled(true)
                    this.setIsTestExists(true)
                    this.setIsProgress(false)
                }
            }
        }
    }

    setPayButtonId(id){
        this.setState({payButtonId:id})
    }

    setProgressOnPayButton(){
        this.setState({isProgressOnPayButton:true})
    }

    unsetProgressOnPayButton(){
        this.setState({isProgressOnPayButton:true})
    }

    setIsStartButton(isStart){
        this.setState({isStartButton:isStart})
    }

    setIsEnrollButton(isEnroll){
        this.setState({isEnrollButton:isEnroll})
    }

    setIsProgress(isProgress){
        this.setState({showProgress:isProgress})
    }

    setIsEntitled(entitled){
        this.setState({isEntitled:entitled})
    }

    setIsTestExists(testExist){
        this.setState({isTestExists:testExist})
    }

    onClickForEnrollment(entity_mapping_id){    
        this.setIsProgress(true)
        let returnPromise = this.props.dispatch(enrollForTest(this.props.testId,entity_mapping_id))
        returnPromise.then((response) => {
            // console.log("FirstTestPageController::onClickForEnrollment",response)
        //   console.log("******Response from server for enrollForTest: ", data);
            this.props.dispatch({ type: "testEnrollmentDetail", data: response });
            this.setIsProgress(false)
            this.setIsStartButton(true)
            this.setIsEnrollButton(false)
        })
    }


    onClickForStartTest(){
        this.props.setStartTest(true)
    }

    render(){
        
        let body = <FirstTestPage {...this.props} 
                    isStartButton={this.state.isStartButton} 
                    isEnrollButton={this.state.isEnrollButton} 
                    isEntitled={this.state.isEntitled} 
                    isTestExists={this.state.isTestExists}
                    isProgress = {this.state.showProgress}
                    setIsProgress = {this.setIsProgress}
                    setIsStartButton = {this.setIsStartButton}
                    setIsEnrollButton = {this.setIsEnrollButton}
                    onClickForEnrollment = {this.onClickForEnrollment}
                    onClickForStartTest = {this.onClickForStartTest}
                    />

        return(
            <div>
                {body}
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    // console.log("FirstTestPageController::store", store.testDataReducer)
    return {
		testEnrollmentDetail: store.testDataReducer.testEnrollmentDetailState
    }
}

export default connect(mapStateToProps)(FirstTestPageController);