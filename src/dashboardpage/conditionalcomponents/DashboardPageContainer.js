import Dashboard from '../presentationalcomponents/Dashboard';
import React from 'react';
import 'redux'
import {connect} from 'react-redux'
import { getDashboardData,getTagsList } from './action'


class DashboardPageContainer extends React.Component {

	// constructor(props) {
	// 	super(props);
	// }

	componentDidMount(){
		this.props.dispatch(getDashboardData());
	}



	render() {
		//console.log(this.props);
		return (
			<Dashboard data={this.props.dashboardData} />
		);
	}
}

var mapStateToProps = (store)=>{
	//console.log("DashboardPageContainer::connect", store);

	return {dashboardData: store.dataReducer};
};


export default  connect(mapStateToProps)(DashboardPageContainer);