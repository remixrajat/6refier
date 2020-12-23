import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import QuestionCardForList from './QuestionCardForList';
import PreLoader from '../../shared/Preloader/PreLoader'

export default class QuestionsList extends Component {
    render() {
        let userData = JSON.parse(this.props.userProfileData.profile)[0]
        // console.log("QuestionsList: props", this.props)
        //console.log("UserProfile", userData)
        let blogsList;
        if (this.props.blogDetails) {
            blogsList=[]
            for (var i = 0; i < this.props.blogDetails.length; i++) {
                if (userData.pk == this.props.blogDetails[i].fields.post_owner.id) {
                    !this.props.isReadOnly ?
                        blogsList.push(
                            <div   className="custom-item-border">
                                <QuestionCardForList blogDetail={this.props.blogDetails[i]}
                                    userProfile={this.props.userProfile} />
                            </div>
                        )
                        :
                        !this.props.blogDetails[i].fields.is_anonymous ?
                            blogsList.push(
                                <div   className="custom-item-border">
                                    <QuestionCardForList blogDetail={this.props.blogDetails[i]}
                                        userProfile={this.props.userProfile} />
                                </div>
                            )
                            :
                                (this.props.blogDetails[i].fields.is_community_external_counsellor ||
                                this.props.blogDetails[i].fields.is_community_internal_counsellor ||
                                this.props.blogDetails[i].fields.is_community_owner) ?
                                blogsList.push(
                                    <div   className="custom-item-border">
                                        <QuestionCardForList blogDetail={this.props.blogDetails[i]}
                                            userProfile={this.props.userProfile} />
                                    </div>
                                )
                                :
                                null

                }
            }
        }

        return (
            <div>
                { !blogsList ?
                    <PreLoader shimmer={true} copies={2} placeholder="line" /> :
                    blogsList.length==0?
                    <div className="custom-list-sub-content"> No Questions Posted </div>
                    :
                    blogsList
                }
            </div>
        )

    }
}
