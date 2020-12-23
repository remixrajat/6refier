import React, { Component } from 'react';
import 'redux';
import { connect } from 'react-redux'
// import Slider from 'react-slick';
import { getMentorDetails } from './action';
import { Col, Row, Grid } from 'react-bootstrap';
import MyCommunityList from '../presentationalcomponents/MyCommunityList';
import {getCommunityListMemberOnlyOfUser} from '../../shared/Header/conditionalcomponents/action'


class MyCommunityListController extends Component {

    componentDidMount(){
        //console.log("Sending Dispatch Request to get Communities",this.props.profileId)
        this.props.dispatch(getCommunityListMemberOnlyOfUser(this.props.profileId))
    }

    render() {

        return (
            <Col xs={12}>
                <MyCommunityList communityDetails={this.props.communityListState}
                    profileDetails={this.props.profileFields}
                    isReadOnly={this.props.isReadOnly}
                    profileId={this.props.profileId} />
            </Col>
        )

    }

}

var mapStateToProps = (store) => {
    //console.log(store);
    return {
        communityListState: store.appDataReducer.communityListStateMemberOnlyOfUser,
        profileFields: store.userProfileReducer.profileFields
    };
}

export default connect(mapStateToProps)(MyCommunityListController);