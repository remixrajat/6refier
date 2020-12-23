import DashboardPosts from '../presentationalcomponents/DashboardPosts';
import React from 'react';
import 'redux'
import {connect} from 'react-redux'

import Preloader from '../../shared/Preloader/PreLoader'


class DashboardPostsController extends React.Component {
	render() {
		// console.log(this.props);
		let renderElement = null;
		if (this.props.data){
			renderElement = <DashboardPosts {...this.props} />
		}
		return (
			this.props.profileFields ?
				<div>
					{renderElement}
				</div> :
				<div style={{marginLeft: '20px'}}>
					<Preloader shimmer={true} placeholder="post_card" copies={6} />
				</div>
		);
	}
}

var mapStateToProps = (store)=>{
	return {
		data: store.dashboardDataReducer,
		timeline: store.dashboardDataReducer.timeline,
        sort: store.dashboardDataReducer.sortOrder,
		postType: store.dashboardDataReducer.yourPostType,
        profileFields: store.userProfileReducer.profileFields		
	};
};


export default  connect(mapStateToProps)(DashboardPostsController);