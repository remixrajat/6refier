import React from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import PostsholderController from '../../shared/TextDisplayPanels/conditionalcomponents/PostsHolderController'


class Dashboard extends React.Component {
  
  render() {
    return (
      <Grid fluid id="post-cards-container">
        {!this.props.is_mentor ?
          this.props.communityListState ? 
          this.props.communityListState.length > 0 ?
        <div id="section-subtitle" style={{marginTop:"20px", marginBottom:"20px"}}>
          Questions and Articles from your Community
          </div>
          :
          null
          :
            null
          :
            this.props.askedQuestions && this.props.askedQuestions.length>0?
            <div id="section-subtitle" style={{marginTop:"20px", marginBottom:"20px"}}>
                You have <b>{this.props.askedQuestions && this.props.askedQuestions.length}  questions</b> to answer
            </div>
                :
                null
        }
        <PostsholderController 
          timeline={this.props.timeline ? this.props.timeline : "all"} 
          sort={this.props.sort ? this.props.sort : "DESC"} 
          postType={this.props.postType ? this.props.postType : "all"} 
          user_details={this.props.profileFields}
          isPreview={true}
          col12={true} />
      </Grid>
    );
  }
}

export default Dashboard;
