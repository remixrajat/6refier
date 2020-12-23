import React, { Component } from 'react';
import 'redux';
import { connect } from 'react-redux'
// import Slider from 'react-slick';
import { getMentorDetails } from './action';
import { Col, Row, Grid } from 'react-bootstrap';
import QuestionsList from '../presentationalcomponents/QuestionsList';
import QuestionsAsked from '../presentationalcomponents/QuestionsAsked'
import {getpostsAskedFromMentor}  from '../../shared/TextDisplayPanels/conditionalcomponents/action'


class MyQuestionsController extends Component {

    componentDidMount(){
        if(this.props.isMentor){
            this.props.dispatch(getpostsAskedFromMentor())
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.isMentor == undefined || nextProps.isMentor!=this.props.isMentor){
            if(nextProps.isMentor){
                nextProps.dispatch(getpostsAskedFromMentor())
            }
        }
    }

    render() {
        // console.log("My Questions", this.props)
        return (
            <Col xs={12}>
                { this.props.isMentor?
                <QuestionsAsked blogDetails={this.props.askedQuestions} {...this.props} 
                otherUserProfileFields={this.props.profileFields} />
                :
                <QuestionsList blogDetails={this.props.questionsData} {...this.props} 
                                otherUserProfileFields={this.props.profileFields} />
                }
            </Col>
        )
    }
}

var mapStateToProps = (store) => {
    return { questionsData: store.appDataReducer.questionsListByUser,
             userProfile: store.userProfileReducer.profileFields,
             askedQuestions: store.appDataReducer.questionsAskedFromMentor };
}

export default connect(mapStateToProps)(MyQuestionsController);