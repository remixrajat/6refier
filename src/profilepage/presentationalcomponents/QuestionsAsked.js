import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import QuestionCardForList from './QuestionCardForList';
import PreLoader from '../../shared/Preloader/PreLoader'

export default class QuestionsAsked extends Component {
    render() {
        let userData = JSON.parse(this.props.userProfileData.profile)[0]
        // console.log("QuestionsAsked: props", this.props)
        //console.log("UserProfile", userData)
        let blogsList;
        if (this.props.blogDetails) {
            blogsList = []
            for (var i = 0; i < this.props.blogDetails.length; i++) {
                blogsList.push(<div className="custom-item-border">
                    <QuestionCardForList blogDetail={this.props.blogDetails[i]}
                        userProfile={this.props.userProfile}
                        askedQuestion={true} />
                </div>)
            }
        }

        return (
            <div>
                {!blogsList ?
                    <PreLoader shimmer={true} copies={2} placeholder="line" /> :
                    blogsList.length == 0 ?
                        <div className="custom-list-sub-content"> No Questions Asked </div>
                        :
                        blogsList
                }
            </div>
        )

    }
}
