import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-bootstrap'

import SkillMatrix from '../presentationalcomponents/SkillMatrix'
import { fetchReportsForSkill } from "../../dashboardpage/conditionalcomponents/action";


class SkillMatrixController extends Component {
	constructor(props) {
		super(props);

        this.fetchReports = this.fetchReports.bind(this)
    }

    onEditSearch(e) {
        let value = e.target.value
        this.setState({searchText:value})
	}
    
    fetchReports(skill) {
        this.props.dispatch(fetchReportsForSkill(this.props.communityId, skill))
    }
    

	render() {
        // console.log("SkillMatrixController::", this.props);

		return (
            <Grid fluid>
                <SkillMatrix 
                    communityId={this.props.communityId}
                    tagList={this.props.tagList}
                    testReports={this.props.fetchReportsForSkill}
                    fetchReports={this.fetchReports}
                />
            </Grid>
        );

	}
}

let mapStateToProps = (store) => {
	return {
		tagList: store.communityPageDataReducer.getCommunitySkillsDetails,        
		fetchReportsForSkill: store.communityPageDataReducer.fetchReportsForSkill        
	}
}

export default connect(mapStateToProps)(SkillMatrixController);