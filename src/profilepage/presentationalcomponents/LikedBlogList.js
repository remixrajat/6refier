import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import LikedBlogCardForList from './LikedBlogCardForList';
import PreLoader from '../../shared/Preloader/PreLoader'

export default class LikedBlogList extends Component {
    render() {
        let userData = JSON.parse(this.props.userProfileData.profile)[0]
        //console.log("LikedBlogList:UserProfile", userData)
        let blogsList;
        if (this.props.blogDetails) {
            blogsList=[]
            for (var i = 0; i < this.props.blogDetails.length; i++) {
                    blogsList.push(
                        <div key={i} className="custom-item-border">
                            <LikedBlogCardForList 
                                index={i}
                                blogDetail={this.props.blogDetails[i]}
                                profileId={this.props.profileId}
                                 />
                        </div>
                    )
            }
        }

        return (
            <div>
                {this.props.isReadOnly?
                    null :
                    <Row className="custom-tab-title-gray">Blogs I Liked</Row>}
                {  !blogsList ? 
                    <PreLoader copies={5} placeholder="short_card" shimmer={true} /> :
                    blogsList.length == 0 ?
                        <div className="custom-list-sub-content"> No Blogs Liked </div> :
                        blogsList
                }
            </div>
        )

    }
}
