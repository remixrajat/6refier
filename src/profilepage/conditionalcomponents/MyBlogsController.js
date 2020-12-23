import React,{Component} from 'react';
import 'redux';
import {connect} from 'react-redux'
// import Slider from 'react-slick';
import { getMentorDetails } from './action';
import { Col, Row, Grid } from 'react-bootstrap';
import BlogsList from '../presentationalcomponents/BlogList';


class MyBlogsController extends Component {


    render(){

        //console.log("My Blogs", this.props.blogData)

    return(
        <Col xs={12}>
            <BlogsList blogDetails = {this.props.blogData} {...this.props}/>
        </Col>
    )

}

}

var mapStateToProps = (store) => {
    //console.log(store);
    return {blogData: store.appDataReducer.postsListByUser,};
}

export default  connect(mapStateToProps)(MyBlogsController);