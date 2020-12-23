import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Feeds from './Feeds/Feeds';
import CommunitySubscriptions from '../conditionalcomponents/CommunitySubscriptionsController';
import CommunityProfileController from '../conditionalcomponents/CommunityProfileController';
import DiscussionRoomFeeds from '../../discussionGroup/conditionalComponents/DiscussionGroupFeedController';
import MemberLearningPathController from '../conditionalcomponents/MemberLearningPathController'
import MemberResourceAccessController from '../conditionalcomponents/MemberResourceAccessController'
import CommunitySessionsController from '../conditionalcomponents/CommunitySessionsController'
import MyTrackingCoursesController from '../conditionalcomponents/MyTrackingCoursesController'


export default class CommunityPageNavBarContentHolder extends React.Component{
    render() {
        
        let currentState = this.props.currentState;
        let renderElement = null;
        
        if(currentState === 'feeds'){
           renderElement =  <Feeds {...this.props}/>
        }
        else if(currentState === 'subscription'){
            renderElement = <MemberLearningPathController  {...this.props} fromCommunityProfile={true} />
        }
        else if (currentState === 'resources') {
            renderElement = <MemberResourceAccessController  {...this.props} fromCommunityProfile={true} />
        }
        else if (currentState === 'webinars') {
            renderElement = <CommunitySessionsController  {...this.props} fromCommunityProfile={true} />
        }
        else if(currentState === 'discussionRooms'){
            renderElement = <DiscussionRoomFeeds  {...this.props} fromCommunityProfile={true} />
        }
        else if(currentState === 'communityProfile' && this.props.communityOwnershipState[this.props.match.params.communityId]){
            renderElement = <CommunityProfileController {...this.props}/>
        }
        else if(currentState === 'trackCourse' && this.props.communityInternalExpertState[this.props.match.params.communityId]){
            renderElement = <MyTrackingCoursesController {...this.props}/>
        }
        else if(currentState === 'trackCourse' && this.props.communityExternalExpertState[this.props.match.params.communityId]){
            renderElement = <MyTrackingCoursesController {...this.props}/>
        }

        
        return(
            <Grid fluid>
                {renderElement}
            </Grid>
        );
    }
}