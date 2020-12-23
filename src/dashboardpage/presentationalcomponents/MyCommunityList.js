import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import MyCommunityCardForList from './MyCommunityCardForList';


export default class MyCommunityList extends Component {
    render() {
        // console.log("MyCommunityList", this.props)

        let communityList = [];
        let slickSliderElement = null;

        if (this.props.communityDetails) {
            for (var i = 0; i < this.props.communityDetails.length; i++) {
                communityList.push (
                    <Link to={"/userDashboard/community/" + this.props.communityDetails[i].pk}
                        style={this.props.fromBottomBar ? {display: 'block', marginBottom: '40px'} : {}}>
                        <div key={this.props.communityDetails[i].pk}>
                            <MyCommunityCardForList 
                                communityDetails={this.props.communityDetails[i]}
                                profileDetails={this.props.profileDetails}
                                index = {i} 
                            />
                        </div>
                    </Link>
                )
            }
        }

        return (
            <div >
                {communityList}
            </div>
        )

    }
}
