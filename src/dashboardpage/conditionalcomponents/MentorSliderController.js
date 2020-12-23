import React,{Component} from 'react';
import 'redux';
import {connect} from 'react-redux'
// import Slider from 'react-slick';
import { Col, Row, Grid } from 'react-bootstrap';
import { getMentorDetails } from './action';
import MentorSlider from '../presentationalcomponents/MentorSlider.js';


class MentorSliderController extends Component {
    
    componentDidMount(){
        this.props.dispatch(getMentorDetails());
    }

    render(){
    
    return(
        <Col xs={12}>
            <MentorSlider mentorDetails = {this.props.mentorDetails} />
        </Col>
    )

}

}

var mapStateToProps = (store) => {
    return {mentorDetails : store.dashboardDataReducer.mentorDetails};
}

export default  connect(mapStateToProps)(MentorSliderController);