import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import PostsholderController from '../../../shared/TextDisplayPanels/conditionalcomponents/PostsHolderController'
import BlogWritingController from '../../../dashboardpage/conditionalcomponents/BlogWritingController';
import { ComplementaryButton } from '../../../shared/RefierComponents/ComplementaryButton'
import FontAwesome from 'react-fontawesome';


const Feeds = props => {
    // console.log("Feeds:: props", props);
  
    return (
      <Grid fluid id="post-cards-container" style={{marginTop:"20px"}}>
        <Col xs={12} md={10} mdOffset={1}>
          <div style={{ marginBottom: '50px' }}>
            { props.communityInternalExpertState[props.match.params.communityId] || 
              props.communityExternalExpertState[props.match.params.communityId] || 
              props.communityOwnershipState[props.match.params.communityId] ?
              <div id="section-subtitle" className="dashboard-notice"
                    style={{marginLeft: '30px'}}>
                    Answer the Questions or Share a learning
                    <ComplementaryButton 
                        buttonText="Share Learning"
                        showIcon= {
                            <FontAwesome
                            name="pencil-square-o"
                        />
                        }
                        redirect="true"
                        redirectAddress="/userDashboard/blog/write/ALL"
                    />
                </div> 
              :
              <BlogWritingController communitiesOptions={props.match.params.communityId} />
            }
          </div>
        
          <PostsholderController 
            timeline={props.timeline ? props.timeline : "all"} 
            sort={props.sort ? props.sort : "DESC"} 
            postType={props.postType ? props.postType : "all"} 
            col12={true} 
            isPreview={true} 
            communityId={props.match.params.communityId}/>
        </Col>
      </Grid>
    );
};
export default Feeds;
