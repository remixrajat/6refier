import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link, IndexRoute, hashHistory,Switch} from 'react-router-dom';
// import {Route} from 'react-router-dom';
import MentorHomePage from './dashboardpage/presentationalcomponents/MentorHomePage'
import CommunityPage from './communitypage/conditionalcomponents/CommunityPageController';

class PageRouter extends Component{
    render(){
        return(
            <Router history={hashHistory}>
                <IndexRoute component={MentorHomePage} />
                <Route path='/community' component={CommunityPage} />
            </Router>
        );
    }
}