import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';

import PostsholderController from '../../../shared/TextDisplayPanels/conditionalcomponents/PostsHolderController'
import BlogWritingController from '../../../dashboardpage/conditionalcomponents/BlogWritingController'


const Questions = (props) => {
		return (
			<Grid fluid id="post-cards-container">
            	<Col xs={12} mdOffset={1} md={10} lgOffset={0} lg={12}>
					<Grid fluid>
						<Row style={{"marginBottom":"20px"}}>
                    		<BlogWritingController communitiesOptions={props.match.params.communityId}/>
                		</Row>
					</Grid>
				</Col>
				<PostsholderController postType="Question"  isPreview={true} communityId={props.match.params.communityId}/>
			</Grid>
		);
	}

export default Questions;
