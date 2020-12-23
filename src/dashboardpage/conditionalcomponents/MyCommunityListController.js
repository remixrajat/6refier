import React,{Component} from 'react';
import 'redux';
import {connect} from 'react-redux'
import { Col, Row, Grid } from 'react-bootstrap';

import MyCommunityList from '../presentationalcomponents/MyCommunityList';


class MyCommunityListController extends Component {
    render() {
        return (
            <Col xs={12} style={this.props.fromBottomBar ? {padding: '0 40px'} : {}}>
                <MyCommunityList 
                    communityDetails = {this.props.communityListState}
                    profileDetails = {this.props.profileFields} 
                    fromBottomBar = {this.props.fromBottomBar} 
                />
            </Col>
        )
    }
}

var mapStateToProps = (store) => {
    return {
        communityListState : store.appDataReducer.communityListStateMemberOnly,
        profileFields : store.userProfileReducer.profileFields
    };
}

export default  connect(mapStateToProps)(MyCommunityListController);