import React from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import GoogleAnalytics from 'react-ga';
import { Redirect } from 'react-router-dom'

import DashboardPostsController from '../conditionalcomponents/DashboardPostsController.js';
import DashboardPageTop from './DashboardPageTop'
import HomePageSidebarController from '../conditionalcomponents/HomePageSidebarController';
import MyCalendarListBottomController from '../../shared/MyCalendarListBottom'
import ContentSectionController from '../../recordedContents/conditionalcomponents/ContentSectionController'
import NewUserGuide from '../../profilepage/conditionalcomponents/NewUserGuide'
import LearningPanelController from '../conditionalcomponents/LearningPanelController'
import ActionPanelController from '../conditionalcomponents/ActionPanelController'
import RecentActivityReportController from '../conditionalcomponents/RecentActivityReportController'
import { getCommunityList, getCommunityListMemberOnly } from '../../shared/Header/conditionalcomponents/action.js';
import { getDiscussionRooms } from '../../discussionGroup/conditionalComponents/action.js';
import CommunitySessionList from './CommunitySessionList'

import { isXsDevice, isMobileDevice, isSmDevice, isMdDevice } from '../../GlobalConstants'

import "../../styles/scss/dashboard.css"


class MentorHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.hasItemsInCart = false
  }

  trackPage = (page, options) => {
    GoogleAnalytics.set({
      page,
      ...options
    });
    GoogleAnalytics.pageview(page);
  };

  trackSubmitPost() {
    GoogleAnalytics.event({
      category: 'Question',
      action: 'Submit Question',
    });
  }

  componentWillMount() {
    // let communityListPromise = this.props.dispatch(getCommunityList());
    // this.props.dispatch(getCommunityListMemberOnly());

    // communityListPromise.then((communityList) => {
    //   if (communityList){
    //     for (let i = 0; i < communityList.length; i++) {
    //       const communityPk = communityList[i].pk
    //       if (communityPk) {
    //         this.props.dispatch(getDiscussionRooms(communityPk, true))
    //       }
    //     }
    //   }
    // })

    // this.hasItemsInCart = this.props.cartItems ? 
    //                         this.props.cartItems.length === 0 ?
    //                           false :
    //                           true
    //                         : false
    // let storageHasItemsInCart = localStorage.getItem("hasItemsInCart")

    // if(storageHasItemsInCart && storageHasItemsInCart === 'false')
    //   this.hasItemsInCart = false

    // if(this.hasItemsInCart) {
    //   this.props.dispatch({type: 'highlightCart', data: 'cart_nav'})
    //   localStorage.setItem('hasItemsInCart', "true")
    // }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const page = this.props.location.pathname;
    this.trackPage(page, {});

    // this.hasItemsInCart = this.props.cartItems ? 
    //                         this.props.cartItems.length === 0 ?
    //                           false :
    //                           true
    //                         : false

    // let storageHasItemsInCart = localStorage.getItem("hasItemsInCart")

    // if(storageHasItemsInCart && storageHasItemsInCart === 'false')
    //   this.hasItemsInCart = false

    // if(this.hasItemsInCart) {
    //   this.props.dispatch({type: 'highlightCart', data: 'cart_nav'})
    //   localStorage.setItem('hasItemsInCart', "true")
    // }
  }

  componentWillUpdate() {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    const currentPage = this.props.location.pathname;
    const nextPage = nextProps.location.pathname;
    if (currentPage !== nextPage) {
      this.trackPage(nextPage, {});
    }
    
    // this.hasItemsInCart = nextProps.cartItems ? 
    //                         nextProps.cartItems.length === 0 ?
    //                           false :
    //                           true
    //                         : false
    
    // let storageHasItemsInCart = localStorage.getItem("hasItemsInCart")

    // if(storageHasItemsInCart && storageHasItemsInCart === 'false')
    //   this.hasItemsInCart = false

    // if(this.hasItemsInCart) {
    //   this.props.dispatch({type: 'highlightCart', data: 'cart_nav'})
    //   localStorage.setItem('hasItemsInCart', "true")
    // }
  }


  render() {
    // console.log("MentorHomePage: Props", this.props, this.hasItemsInCart);

    return (
      // !this.hasItemsInCart && this.props.profileFields && 
      // !this.props.profileFields.isInitialSetupComplete ?
      //   <Redirect to="/userDashboard/getting-to-know-you" /> :
      <div>
      {
        isXsDevice() || isMobileDevice() ?
          <Col xs={12} mdHidden lgHidden style={{ padding: "0px 0px" }}>
            <ActionPanelController/>
            <LearningPanelController />
            <ContentSectionController fromDashboardPage={true} />
            <HomePageSidebarController largeScreen={false} trackSubmitPost={this.trackSubmitPost}/>
          </Col> :
          <Col md={12}>
            <Grid fluid>
              <Col sm={8} md={8} lg={7} lgOffset={1} >
                <ActionPanelController/>
                <LearningPanelController/>
                <ContentSectionController fromDashboardPage={true} />
                <RecentActivityReportController fromDashboardPage={true} {...this.props} />
                <CommunitySessionList/>
                <div style={{ marginTop: "20px" }}>
                  <DashboardPageTop {...this.props} 
                    trackSubmitPost={this.trackSubmitPost} />
                </div>
                <Row style={{ marginTop: "30px" }}>
                  <DashboardPostsController {...this.props}
                    fromDashboardPage={true}/>
                </Row>
              </Col>
              <Col sm={4} md={4} lg={3} style={{ marginTop: '20px', paddingLeft: '20px' }}>
                <div >
                  <HomePageSidebarController largeScreen={true} />
                </div>
              </Col>
              <Col xs={12} xsHidden smHidden>
                <MyCalendarListBottomController />
              </Col>
            </Grid>
            {/* { 
              this.hasItemsInCart || isXsDevice() || isMobileDevice() || isSmDevice() ?
                null :
                this.props.isNewUserExplainComplete !== undefined ? 
                  this.props.isNewUserExplainComplete ?
                    null :
                    <NewUserGuide /> :
                  null
            } */}
          </Col>
      }
      </div>
    );
  }
}

export default MentorHomePage;
