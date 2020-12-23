import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import BlogCardForList from './BlogCardForList';
import PreLoader from '../../shared/Preloader/PreLoader'

export default class BlogList extends Component {
    render() {
        let userData = JSON.parse(this.props.userProfileData.profile)[0]
        //console.log("UserProfile", userData)
        let blogsList;
        if (this.props.blogDetails) {
            blogsList=[]
            for (var i = 0; i < this.props.blogDetails.length; i++) {
                if (userData.pk == this.props.blogDetails[i].fields.post_owner.id) {
                    blogsList.push(
                        <div key={i} className="custom-item-border">
                            <BlogCardForList blogDetail={this.props.blogDetails[i]} />
                        </div>
                    )
                }
            }
        }

        return (
            <div>
                {  !blogsList ? 
                    <PreLoader shimmer={true} copies={2} placeholder="line" /> :
                    blogsList.length == 0 ?
                        <div className="custom-list-sub-content"> No Blogs Written </div> :
                        blogsList
                }
            </div>
        )

    }
}
