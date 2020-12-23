import React, {Component} from 'react'
import {Button, Col, Grid} from 'react-bootstrap'
import QuestionPageController from '../conditionalcomponents/QuestionPageController'
import Preloader from '../../shared/Preloader/PreLoader'
import FirstTestPageController from '../conditionalcomponents/FirstTestPageController'
import CompletedTestController from '../conditionalcomponents/CompletedTestController'

export default class TestPage extends Component{

    render(){
        console.log("TestPage::props",this.props)

        return(
            <div>
                {this.props.testDetail && this.props.ifAlreadyEnrolledInTest?
                this.props.isCompletedTest?
                    <CompletedTestController {...this.props}/>
                    : 
                    !this.props.isStartTest?
                    <FirstTestPageController {...this.props}/>
                    :
                    <QuestionPageController {...this.props}/>
                    :
                    <Grid fluid><Col xs={12} style={{textAlign:"center"}}>
                            <Preloader loaderMessage="Loading Test Details..."/>
                            </Col></Grid>
                }
            </div>
        )
    }
}