/**
 * Import all reducers
 */
import { combineReducers } from 'redux'
import dashboardDataReducer from './dashboardDataReducer'
import communityPageDataReducer from './communityDataReducer'
import profileDataReducer from './profileDataReducer'
import schoolReducer from './schoolReducer'
import appDataReducer from './AppDataReducer'
import communityBasicDataReducer from './communityBasicDataReducer'
import userProfileReducer from './UserProfileReducer'
import QueryItemsReducer from './queryReducer'
import serviceDataReducer from './serviceDataReducer'
import userServicePageReducer from './userServicePageReducer'
import communityOwnershipReducer, {
    communityMembershipReducer,
    communityMembershipRequestReducer, communityExternalExpertReducer, communityInternalExpertReducer
} from './communityOwnershipReducer'
import webinarPageReducer from './webinarDataReducer';
import appPerformanceData from './PerformanceDataReducer';
import appStatusMessageReducer  from './appStatusMessageReducer'
import recordedContentPageReducer from './RecordedContentPageReducer'
import topicDataReducer from './topicDataReducer'
import testDataReducer from './testDataReducer'
import subscriptionDataReducer from './subscriptionDataReducer'
import { reducer as popupNotificationsReducer } from 'reapop';
import groupDiscussionReducer from './groupDiscussionReducer';
import refierCartReducer from './RefierCartReducer';
import stylesDataReducer from './StylesDataReducer';
import courseDataReducer from './courseDataReducer';
import { analysisReducer, useranalysisReducer, usertypesReducer, useragetypeReducer } from "./analysisReducer";

const mainReducer = combineReducers({
    appDataReducer,
    dashboardDataReducer,
    communityPageDataReducer,
    profileDataReducer,
    // schoolReducer,
    communityBasicDataReducer,
    userProfileReducer,
    QueryItemsReducer,
    serviceDataReducer,
    userServicePageReducer,
    communityOwnershipReducer,
    communityMembershipReducer,
    communityInternalExpertReducer,
    communityExternalExpertReducer,
    communityMembershipRequestReducer,
    webinarPageReducer,
    appPerformanceData,
    appStatusMessageReducer,
    recordedContentPageReducer,
    topicDataReducer,
    testDataReducer,
    subscriptionDataReducer,
    groupDiscussionReducer,
    refierCartReducer,
    notifications : popupNotificationsReducer(),
    stylesDataReducer,
    courseDataReducer,
    analysisReducer,
    useranalysisReducer,
    usertypesReducer,
    useragetypeReducer,
});

export default mainReducer
