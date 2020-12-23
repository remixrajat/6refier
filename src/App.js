/* eslint-disable */
import React from 'react';
import 'redux';
import { connect } from 'react-redux'
import './reset.css';
import './app.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import NotificationsSystem, { notify } from 'reapop';
import theme from 'reapop-theme-bootstrap';
import MentorHomePage from './dashboardpage/presentationalcomponents/MentorHomePage'
import MentorListPage from './dashboardpage/conditionalcomponents/MentorListPage'
import CommunityListPage from './dashboardpage/conditionalcomponents/CommunityListPage'
import CommunityPageController from './communitypage/conditionalcomponents/CommnityPageController';
import AppHeaderContainer from './shared/Header/conditionalcomponents/AppHeaderContainer';
import CommunityProfile from './profilepage/conditionalcomponents/ProfilePageController.js';
import WriteBlog from './writeblogpage/conditionalcomponents/WriteBlogPageController.js';
import ViewAllBlogsPageController from './writeblogpage/conditionalcomponents/ViewAllBlogsPageController.js';
import ViewBlog from './writeblogpage/conditionalcomponents/ViewBlogController';
import ServicePage from './servicepage/conditionalcomponents/ServicePage';
import UserServicePage from './user_servicepage/conditionalcomponents/UserServicePage';
// import PerformanceTrackerController from './performanceTracker/conditionalcomponents/performanceTrackerController.js'
import { DEV_ENV_FRONTEND, GOOGLE_ANLYTICS_CODE } from './GlobalConstants'
import AddStudentPage from './communitypage/presentationalcomponents/CommunityProfile/AddStudentModal'
import AddTeacherPage from './communitypage/presentationalcomponents/CommunityProfile/AddTeacherModal'
import SubjectTeacherMapping from './communitypage/presentationalcomponents/CommunityProfile/SubjectTeacherMapping'

import { BrowserRouter, Route } from 'react-router-dom';
import { getUserProfileAfterLoginDataForDev, isNewUserExplainComplete, 
	getCommunityList, getCommunityListMemberOnly } 
	from './shared/Header/conditionalcomponents/action';
import IntroForm from './profilepage/conditionalcomponents/IntroFormNew'
import AutosuggestTextBox from './shared/AutosuggestInput/presentationalcomponents/autosuggestTextBox'
import PerformanceController from './performance/conditionalcomponents/PerformanceController'
import IndividualPostController from './writeblogpage/conditionalcomponents/IndividualPostController'
import ContentPageController from './recordedContents/conditionalcomponents/ContentPageController'
import CheckoutPageController from './paymentPage/conditionalComponents/checkoutPageController';
import TopicPage from './topicpage/conditionalcomponents/TopicPageController'
import TestPage from './testpage/conditionalcomponents/TestPageController'
import SubscriptionsPage from './SubscriptionsPage/conditionalcomponents/SubscriptionsPageController'
import CommunitySubscriptions from './communitypage/conditionalcomponents/CommunitySubscriptionsController'
import SearchPage from './shared/SearchPage'
import UserActivityReport from './reporting/conditionalcomponents/UserActivityTracker'
import DiscussionGroup from './discussionGroup/conditionalComponents/DiscussionGroupController'
import WebinarInfo from './WebinarPage/conditionalcomponents/WebinarInfoController'
import LiveSessionsController from './LiveSessions/conditionalComponents/LiveSessionsController';
import SplashScreen from './shared/SplashScreen';
import ReactGA, { gaOptions } from 'react-ga';
import ErrorHandler from './ErrorHandler';
import OnlineOfflineComponent from './shared/OnlineOfflineComponent';
import CourseInfoController from './coursepage/conditionalcomponents/CourseInfoController'
import CoursePageController from './coursepage/conditionalcomponents/CoursePageController'
import DocumentPageController from './coursepage/conditionalcomponents/DocumentPageController';
import ViewAllOrdersController from './paymentPage/conditionalComponents/ViewAllOrdersController';
import { getCartItems } from './paymentPage/conditionalComponents/action'

import {PageView, initGA} from './actionTracking/actionTracking';

import "./styles/css/homescreen_customstyles.css"
import "./styles/css/headercustomstyles.css"
import "./styles/css/TextDisplayPanels.css"
import "./styles/css/modal.css"
import "./styles/css/nav-styles.css"
import "./styles/css/communitypage.css"
import "./styles/css/community-styles.css"
import "./styles/css/profiles-styles.css"
import "./styles/css/webinar-video-btn-styles.css"
import "./styles/css/webinar-avatar-card.css"
import "./styles/css/dashboardpage.css"
import "./styles/css/service-page-styles.css"
import "./styles/css/autosuggest.css"
import "./styles/css/notification_popup_styles.css"
import "./styles/css/webinar.css"
import "./styles/css/preloader.css"
import "./styles/css/introform.css"
import "./styles/css/cards.css"
import "./styles/css/conference_room.css"
import "./styles/css/analysis_sidebar.css"

import './styles/scss/custom-tab.scss'
import './styles/scss/content-section.scss'
import './styles/scss/discussion.scss'
import './styles/scss/cards.scss'
import Analysis from './shared/Header/conditionalcomponents/Analysis';
import Pap from './shared/Header/conditionalcomponents/Date';

class App extends React.Component {
	componentWillMount() {

		let profileDataJson = '';
		// console.log("iDM", DEV_ENV_FRONTEND,this.props);

		// this.props.dispatch(isNewUserExplainComplete());

		this.props.dispatch(getCommunityList());
		this.props.dispatch(getCommunityListMemberOnly());
        this.props.dispatch(getCartItems());

		if (DEV_ENV_FRONTEND) {
			this.props.dispatch(getUserProfileAfterLoginDataForDev());
		} else {
			if (window.hasOwnProperty("refierContext") && window.refierContext.hasOwnProperty("profileData")) {
				profileDataJson = window.refierContext.profileData;
			}
			this.props.dispatch(
				{ type: "SET_USER_STATE", data: profileDataJson }
			);
		}

	}

	componentDidMount() {
		initGA(GOOGLE_ANLYTICS_CODE);
    	PageView();
	}

	render() {
		// ReactGA.initialize(GOOGLE_ANLYTICS_CODE,
		// 	gaOptions: {
		// 	name: 'tracker1',
		// 	userId: 12345
		// 	}
		// );
		// ReactGA.pageview(window.location.pathname + window.location.search);
	

		return (
			<div>
				<ErrorHandler />
				<NotificationsSystem theme={theme} />
				<BrowserRouter>
					<div>

						<AppHeaderContainer {...this.props} />

						{/* <br /> */}
						{/* {
							this.props.isWebView ?
								null
								:
								<div>
									<br /><br /><br />
								</div>

						} */}

						<Route path='/userDashboard/welcome' component={SplashScreen} />
						<Route path='/userDashboard/getting-to-know-you' component={IntroForm} />
						<Route
							exact
							path="/userDashboard"
							render={(routeProps) => (
								<MentorHomePage
									{...routeProps}
									{...this.props}
									isNewUserExplainComplete={this.props.isNewUserExplainComplete} />
							)} />
						<Route path='/userDashboard/community/:communityId' component={CommunityPageController} />
						<Route path='/userDashboard/profile/:profileId' component={CommunityProfile} />
						<Route path='/userDashboard/blog/write/:shareOptions' component={WriteBlog} />
						<Route path='/userDashboard/blog/read/' component={ViewAllBlogsPageController} />
						<Route path='/userDashboard/viewblog/:blogid/:storeidentifier' component={ViewBlog} />
						<Route path='/userDashboard/viewpost/:postid' component={IndividualPostController} />
						<Route path='/userDashboard/testing' component={AutosuggestTextBox} />
						<Route path='/userDashboard/service/:communityId/:section?/:fromHome?' component={ServicePage} />
						<Route path="/userDashboard/user_service" component={UserServicePage} />
						<Route path="/userDashboard/dummyaddstudent" component={AddStudentPage} />
						<Route path="/userDashboard/dummyaddteacher" component={AddTeacherPage} />
						<Route path="/userDashboard/subjectTeacherMapping" component={SubjectTeacherMapping} />
						<Route path="/userDashboard/webinar/:eventid/:profileuserid/:webview?" component={LiveSessionsController} />
						<Route path="/userDashboard/mentor_list" component={MentorListPage} />
						{/* <Route path="/performancetracker" component={PerformanceTrackerController} /> */}
						<Route path="/userDashboard/community_list" component={CommunityListPage} />
						<Route path="/userDashboard/performance/:communityid" component={PerformanceController} />
						<Route path="/userDashboard/vids/:videoId" component={ContentPageController} />
						<Route path="/userDashboard/checkout/:productType/:productId" component={CheckoutPageController} />
						<Route path="/userDashboard/topic/:profileId/:topicId" component={TopicPage} />
						<Route path="/userDashboard/refiertopic/:topicId" component={TopicPage} />
						<Route path="/userDashboard/refiercontest/:testId" component={TestPage} />
						<Route path="/userDashboard/contest/:profileId/:testId" component={TestPage} />
						<Route path="/userDashboard/subscriptions" component={SubscriptionsPage} />
						<Route path="/userDashboard/communitySubscriptions/:communityId" component={CommunitySubscriptions} />
						<Route path="/userDashboard/myLearnings/:package?" component={UserActivityReport} />
						<Route path="/userDashboard/discussion/:groupId" component={DiscussionGroup} />
						<Route path="/userDashboard/discussion/:groupId/:questionId" component={DiscussionGroup} />
						<Route path="/userDashboard/search" component={SearchPage} />
						<Route path="/userDashboard/webinarinfo/:eventId" component={WebinarInfo} />
						<Route path="/userDashboard/course/:mappingId" component={CoursePageController} />
						<Route path="/userDashboard/document" component={DocumentPageController} />
						<Route path="/userDashboard/viewcart" component={CheckoutPageController} />
						<Route path="/userDashboard/viewOrders" component={ViewAllOrdersController} />
						<Route path="/userDashboard/courseInfo/:validityId" component={CourseInfoController} />
						<Route path="/analysis" component={Analysis} />
						{/* <Route path="/datepicker" component={Datepick} /> */}
						<Route exact path="/pap" component={Pap} />
					</div>
				</BrowserRouter>
				<OnlineOfflineComponent />
			</div>
		);
	}
}

let mapStateToProps = (store) => {
	return {
		communityListState: store.appDataReducer.communityListState,
		isWebView: store.webinarPageReducer.isWebView,
		isNewUserExplainComplete: store.userProfileReducer.isNewUserExplainComplete,
		profileFields: store.userProfileReducer.profileFields,
		communityListState: store.appDataReducer.communityListStateMemberOnly,
        cartItems: store.refierCartReducer.cartItems,
	}
}

export default connect(mapStateToProps)(App)
