import React, { Component } from 'react';
import 'redux';
import { connect } from 'react-redux'
// import Slider from 'react-slick';
import { getMentorDetails } from './action';
import { Col, Row, Grid } from 'react-bootstrap';
import MyCommentedQuestionList from '../presentationalcomponents/MyCommentedQuestionList';


class MyCommentedQuestionsController extends Component {
    render() {
        //console.log("MyCommentedQuestionsController:My Questions", this.props.questionsData)
        let questions
        if(this.props.questionsData){
            let questionIds = []
             questions = []
            for(let i=0;i<this.props.questionsData.length;i++){
                let questionId = this.props.questionsData[i].fields.post.id
                let indexOfId = questionIds.indexOf(questionId)
                if(indexOfId==-1){
                    questions.push(this.props.questionsData[i])
                    questionIds.push(questionId)
                }
                //console.log("MyCommentedQuestionsController:questions",questions)
            }
        }
        return (
            <Col xs={12}>
                <MyCommentedQuestionList commentedQuestionsData={questions} {...this.props} 
                                otherUserProfileFields={this.props.profileFields} />
            </Col>
        )
    }
}

var mapStateToProps = (store) => {
    return { questionsData: store.appDataReducer.postsListCommentedByUser,
             userProfile: store.userProfileReducer.profileFields, };
}

export default connect(mapStateToProps)(MyCommentedQuestionsController);