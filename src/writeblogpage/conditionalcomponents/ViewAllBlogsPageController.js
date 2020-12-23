import React, { Component } from 'react';
import 'redux'
import {connect} from 'react-redux'
import { Grid } from 'react-bootstrap'

import PostsholderController from '../../shared/TextDisplayPanels/conditionalcomponents/PostsHolderController'
import WriteBlogButton from '../presentationalcomponents/WriteBlogButton';


class ViewAllBlogsPageController extends Component {
    render() {
        let postType = "Blog";
        if(this.props.postType === "your_blog")
            postType = "your_blog";
        else postType = "Blog"

        return (
            <Grid fluid>
                <WriteBlogButton/>
                <PostsholderController 
                    isBlogPage={true}
                    timeline={this.props.timeline ? this.props.timeline : "all"} 
                    sort={this.props.sort ? this.props.sort : "DESC"} 
                    postType={postType}
                    isPreview={true}
                    communityId={null} />
            </Grid>
        )
    }
}

var mapStateToProps = (store)=>{
	return {
		timeline: store.dashboardDataReducer.timeline,
        sort: store.dashboardDataReducer.sortOrder,
        postType: store.dashboardDataReducer.yourPostType
	};
};

export default connect(mapStateToProps)(ViewAllBlogsPageController);