import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import MyCommunityCardForList from './MyCommunityCardForList';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import PreLoader from '../../shared/Preloader/PreLoader';

export default class MyCommunityList extends Component {
    render() {

        //console.log("My Profile Details Props", this.props)

        let communityList = [];
        let slickSliderElement = null;
        if (this.props.communityDetails) {
            for (var i = 0; i < this.props.communityDetails.length; i++) {
                communityList.push(
                    <div key={this.props.communityDetails[i].pk}  className="custom-item-border">
                        <MyCommunityCardForList
                            key={this.props.communityDetails[i].pk}
                            index={i} 
                            communityDetails={this.props.communityDetails[i]}
                            profileId={this.props.profileId}
                            profileDetails={this.props.profileDetails} />
                    </div>)
            }
        }

        return (
            <div>
                {!this.props.isReadOnly?
                    <Row className="custom-tab-title-gray" >My Communities</Row> :
                    null}
                {!communityList ?
                    <PreLoader copies={5} placeholder="short_card" shimmer={true} /> :
                    communityList.length == 0 ?
                        <div className="custom-list-sub-content">No Communities</div> :
                        <div>
                            {communityList}
                        </div>
                }
            </div>
        )

    }
}
