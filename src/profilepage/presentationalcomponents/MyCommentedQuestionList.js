import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import MyCommentedQuestionCardForList from './MyCommentedQuestionCardForList';
import PreLoader from '../../shared/Preloader/PreLoader'

export default class MyCommentedQuestionList extends Component {
    render() {
        let userData = JSON.parse(this.props.userProfileData.profile)[0]
        //console.log("MyCommentedQuestionList: props", this.props)
        //console.log("UserProfile", userData)
        let blogsList;
        if (this.props.commentedQuestionsData) {
            blogsList=[]
            for (var i = 0; i < this.props.commentedQuestionsData.length; i++) {
                        blogsList.push(
                            <div key={i} className="custom-item-border">
                                <MyCommentedQuestionCardForList commentedQuestion={this.props.commentedQuestionsData[i]}
                                    userProfile={this.props.userProfile} />
                            </div>
                        )       
                //console.log("MyCommentedQuestionList: questionsList", blogsList)    
            }
        }

        return (
            <div>
                {this.props.isReadOnly ? 
                    null:
                    <Row className="custom-tab-title-gray">Questions I have answered</Row>}
                { !this.props.commentedQuestionsData ?
                    <PreLoader copies={5} placeholder="short_card" shimmer={true} /> :
                    blogsList.length==0?
                        <div className="custom-list-sub-content"> No Questions answered </div> :
                        <div>
                            {blogsList}
                        </div>
                }
            </div>
        )

    }
}
