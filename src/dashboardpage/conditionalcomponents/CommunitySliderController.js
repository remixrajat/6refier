import React,{Component} from 'react';
import 'redux';
import {connect} from 'react-redux'
// import Slider from 'react-slick';
import { getMentorDetails } from './action';
import { Col, Row, Grid } from 'react-bootstrap';
import CommunitySlider from '../presentationalcomponents/CommunitySlider.js';


class CommunitySliderController extends Component {
    

    render(){
    
    return(
        <Col xs={12}>
            <CommunitySlider communityDetails = {this.props.communityDetails} />
        </Col>
    )

}

}

var mapStateToProps = (store) => {
    //console.log(store);
    return {communityDetails : store.appDataReducer.communityListState};
}

export default  connect(mapStateToProps)(CommunitySliderController);