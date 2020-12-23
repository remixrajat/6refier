import React from 'react';
import {Grid,Row,Col, Button} from 'react-bootstrap';

import CommunityPostCard from '../common/CommunityPostCard';
import {Link, NavLink} from 'react-router-dom';
import PostsholderController from '../../../shared/TextDisplayPanels/conditionalcomponents/PostsHolderController'
import WriteBlogButton from '../../../writeblogpage/presentationalcomponents/WriteBlogButton';

const Updates = (props) => {
		let linkToPage = "/userDashboard/blog/write/" + props.match.params.communityId
		return (
			<Grid fluid id="post-cards-container">
				<WriteBlogButton linkToPage={linkToPage} />
				
				<PostsholderController postType="Blog"  isPreview={true} communityId={props.match.params.communityId}/>
			</Grid>
		);
	}

export default Updates;

