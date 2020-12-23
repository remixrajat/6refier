import React, { Component } from "react";
import { connect } from "react-redux";

import { setUpcomingEvent, getAllPackageValidityMappingForEvents} from '../../user_servicepage/conditionalcomponents/action';
import HomePageSideBar from "../presentationalcomponents/HomePageSideBar";
import HomePageBottomBar from "../presentationalcomponents/HomePageBottomBar";
import { getTestList } from '../../testpage/conditionalcomponents/action'
import {getTagsList} from './action'
import {getSubscribedDiscussionRooms } from '../../discussionGroup/conditionalComponents/action'


class HomePageSidebarController extends Component {
    componentDidMount() {
        this.props.dispatch(setUpcomingEvent());
        this.props.dispatch(getAllPackageValidityMappingForEvents());
        this.props.dispatch(getTestList())
        if(this.refs.app_sidebar)
            this.props.dispatch({ type: 'app_sidebar', data: this.refs.app_sidebar.getBoundingClientRect() })
        
        this.props.dispatch(getSubscribedDiscussionRooms())
        this.props.dispatch(getTagsList())
    }

    render() {
        // console.log("HomePageSidebarController :: props : ", this.props);

        let isLearner = [], isExternalTrainer = [], isInternalTrainer = [], isOwner = []
        let communityIds = []

        if(this.props.communityListState) {
            for (let i = 0; i < this.props.communityListState.length; i++) {
                let communityDetails = this.props.communityListState[i]
                if (communityDetails.is_owner) {
                    isOwner.push(communityDetails)
                    communityIds.push(communityDetails.pk)
                }else if(communityDetails.is_internal_counsellor) {
                    isInternalTrainer.push(communityDetails)
                    communityIds.push(communityDetails.pk)
                }else if(communityDetails.is_external_counsellor) {
                    isExternalTrainer.push(communityDetails)
                    communityIds.push(communityDetails.pk)
                } else if (communityDetails.is_member) {
                    isLearner.push(communityDetails)
                }
            }
        }


        return (
            <div
                ref="app_sidebar" 
                style={ this.props.highlight === 'app_sidebar' ? 
                        {position: 'relative', zIndex: '10000'} : 
                        {} }>
                {this.props.largeScreen?
                    <HomePageSideBar {...this.props}
                        isOwner={isOwner}
                        isInternalTrainer={isInternalTrainer}
                        isExternalTrainer={isExternalTrainer}
                        isLearner={isLearner}
                        isMentor={this.props.is_mentor}
                    />
                    :
                    <HomePageBottomBar  {...this.props} />
                }
            </div>
        );
    }
}

var mapStateToProps = (store) => {
    return {
        tags_list : store.appDataReducer.tagsListState,
        userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
        highlight : store.stylesDataReducer.highlight,
        communityListState: store.appDataReducer.communityListStateMemberOnly,
        is_mentor: (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.is_mentor : false),
    }
}

export default connect(mapStateToProps)(HomePageSidebarController);
