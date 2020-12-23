import React, { Component } from 'react';

import CommunityCardForTopic from './CommunityCardForTopic';

import PreLoader from '../../shared/Preloader/PreLoader'


export default class CommunityListForTopic extends Component {

    render() {
        //console.log("My Profile Details Props", this.props)

        let communityList = [];
        let slickSliderElement = null;
        if (this.props.communitiesOfTopic) {
            for (var i = 0; i < this.props.communitiesOfTopic.length; i++) {
                communityList.push (
                    <div key={this.props.communitiesOfTopic[i].pk}>
                        <CommunityCardForTopic
                            index={i} 
                            communityDetails={this.props.communitiesOfTopic[i]} />
                    </div>
                )
            }
        }

        return (
            <div>
                <div>
                {!communityList ?
                    <PreLoader />
                    :
                    communityList.length==0?
                    <div className="custom-list-content">No Communities Available</div>
                    :
                    communityList
                    
                    }
                </div>
            </div>
        )
    }
}
