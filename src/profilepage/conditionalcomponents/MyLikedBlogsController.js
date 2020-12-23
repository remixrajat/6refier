import React,{Component} from 'react';
import 'redux';
import {connect} from 'react-redux'
// import Slider from 'react-slick';
import { getMentorDetails } from './action';
import { Col, Row, Grid } from 'react-bootstrap';
import LikedBlogList from '../presentationalcomponents/LikedBlogList';


class MyLikedBlogsController extends Component {


    render(){

        //console.log("MyLikedBlogsController : My Blogs", this.props.blogData)

    return(
        <Col xs={12}>
            <LikedBlogList blogDetails = {this.props.blogData} {...this.props}/>
        </Col>
    )

}

}

var mapStateToProps = (store) => {
    //console.log(store);
    return {blogData: store.appDataReducer.postsListLikedByUser,};
}

export default  connect(mapStateToProps)(MyLikedBlogsController);