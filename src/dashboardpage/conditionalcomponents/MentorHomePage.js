import React from 'react';
// import './homescreen_customstyles.css';
// import AppHeaderContainer from '../../shared/Header/conditionalcomponents/AppHeaderContainer';
import { Col, Row, Grid } from 'react-bootstrap';
// import { connect } from 'react-redux';
import DashboardPageContainer from './DashboardPageContainer';
class MentorHomePage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <Grid>
	      {/* TODO: integrate the Nav Bar with the page afterwards*/}
	      {/*<AppHeaderContainer />*/}
        <DashboardPageContainer />
      </Grid>
    );
  }
}

export default MentorHomePage;
