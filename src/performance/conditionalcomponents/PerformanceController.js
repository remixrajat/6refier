import React, { Component } from 'react';
import 'redux'
import { connect } from 'react-redux'
import {
	Grid, Row, Col, button, Image, imageShapeInstance,
	imageResponsiveInstance, Thumbnail
} from 'react-bootstrap';
import PreLoader from "../../shared/Preloader/PreLoader"
import PerformanceTemplate from '../presentationalcomponents/PerformanceTemplate'
import testData from '../../../public/data/performanceData.json'
import teacherPerformanceData from '../../../public/data/teacherPerformanceData.json'
import {
	getDropDownValues, getPerformanceDetails,
	addOrUpdateStudentMarks, getDropDownFilterValues, getTeacherPerformance, getMemberDesignation
} from './action.js';

class PerformanceController extends Component {

	constructor(props) {
		super(props);
		this.community_id = this.props.match.params.communityid;
		this.performancelist = [];
		this.state = {
			isSubmitComplete: true,
			status_msg: [],
			dropdownData: false
		}
		this.DESIGNATIONS = {
			OWNER: "owner",
			TEACHER: "teacher",
			INTERNAL_MENTOR: "internal_mentor",
			EXTERNAL_MENTOR: "external_mentor",
			STUDENT: "student"
		};
	}


	componentWillMount() {
		// this.props.dispatch(get)
		this.props.dispatch(getMemberDesignation(this.community_id));
		this.props.dispatch(getDropDownFilterValues({}, "getsubjectfilterlist/", "addSubjectList"));
		this.props.dispatch(getDropDownFilterValues({}, "getexamfilterlist/", "addExamList"));

	}

	setErrorMsg(msg) {
		let temp = []
		this.state.status_msg.push(msg);
		this.setState({ status_msg: this.state.status_msg })
	}

	// componentDidMount() {
	// 	// this.props.dispatch(getCommunityMemberDetails(this.props.match.params.communityId));
	// }

	componentWillReceiveProps(nextProps) {
		if (!this.state.dropdownData && nextProps.memberDesignationList &&
			nextProps.memberDesignationList[this.community_id].designation !== this.DESIGNATIONS.STUDENT) {

			this.props.dispatch(getDropDownFilterValues({ member_type: "student" }, "getmemberfilterlist/", "addStudentnameList"));
			this.props.dispatch(getDropDownFilterValues({}, "getsubentitiesfilterlist/", "addClsList"));
			this.setState({ dropdownData: true }, () => { console.log("PerformanceController::dropdownData", this.state.dropdownData) })

		}
		// if(this.props.match.params.communityId != nextProps.match.params.communityId){
		//   this.props.dispatch(getCommunityMemberDetails(nextProps.match.params.communityId));
		//   }
	}

	/*
	getClsSectionOptions(inputVal) {
		//console.log("PerformanceController::", inputVal);
		if (inputVal.length < 1) {
			return;
		}
		let formdata = { query_string: inputVal, model_parameter: "sub_entities", school_id: this.community_id }
		this.props.dispatch(getDropDownValues(formdata, "addClsList"));
	}

	getSubjectsOptions(inputVal) {
		//console.log("PerformanceController::getSubjectsOptions    ", inputVal);
		if (inputVal.length < 3) {
			return;
		}
		let formdata = { query_string: inputVal, model_parameter: "subject" }
		this.props.dispatch(getDropDownValues(formdata, "addSubjectList"));
	}

	getExamOptions(inputVal) {
		//console.log("PerformanceController::", inputVal);
		if (inputVal.length < 3) {
			return;
		}
		let formdata = { query_string: inputVal, model_parameter: "subject" }
		this.props.dispatch(getDropDownValues(formdata, "addExamList"));
	}

	getStudentName(inputVal) {
		//console.log("PerformanceController::", inputVal);
		if (inputVal.length < 3) {
			return;
		}
		let formdata = { query_string: inputVal, model_parameter: "community_member", member_type: "student", community_id: this.community_id }
		this.props.dispatch(getDropDownValues(formdata, "addStudentnameList"));
	}
	*/

	submitFilterForm(formdata) {
		console.log("submitFilterForm::", formdata)
		formdata.community_id = this.community_id;
		let response = this.props.dispatch(getPerformanceDetails(formdata));
		this.setState({ isSubmitComplete: false });
		let _this = this;
		response.then(function (dd) {
			_this.setState({ isSubmitComplete: true });
		});
	}

	addOrUpdateStudentsMarks() {
		let updateStatus = this.props.dispatch(addOrUpdateStudentMarks({ performance_list: this.performancelist }));
		console.log("addPerformance::", updateStatus);
		this.performancelist = [];
		return updateStatus;


	}

	addOrUpdatePerformanceList(cell_performance_data, is_pop = false, element_position = -1) {
		if (is_pop && element_position >= 0) {
			this.performancelist.pop(element_position)
		} else {
			if (element_position >= 0) {
				this.performancelist.pop(element_position);
			}
			return this.performancelist.push(cell_performance_data) - 1;
		}
	}

	getPerformanceListLength() {
		return this.performancelist.length;
	}

	getTeacherPerformanceDetails() {
		this.props.dispatch(getTeacherPerformance({ community_id: this.community_id }));
	}


	render() {

		// console.log("PerformanceController::", this.props);
		return (
			<div>
				{this.props.memberDesignationList !== undefined ?
					<PerformanceTemplate
						// getExamOptions={this.getExamOptions.bind(this)}
						// getClsSectionOptions={this.getClsSectionOptions.bind(this)}
						// getSubjectsOptions={this.getSubjectsOptions.bind(this)}
						// getStudentName={this.getStudentName.bind(this)}
						submitFilterForm={this.submitFilterForm.bind(this)}
						addOrUpdatePerformanceList={this.addOrUpdatePerformanceList.bind(this)}
						addOrUpdateStudentsMarks={this.addOrUpdateStudentsMarks.bind(this)}
						getTeacherPerformanceDetails={this.getTeacherPerformanceDetails.bind(this)}
						memberDesignationList={this.props.memberDesignationList ? this.props.memberDesignationList[this.community_id] : null}
						{...this.state}
						{...this.props}
						getPerformanceListLength={this.getPerformanceListLength.bind(this)}
						DESIGNATIONS={this.DESIGNATIONS}
					/>
					:
					<Col style={{ "textAlign": "center" }}>
						<div style={{ "margin": "50px 20px" }}>
							<PreLoader  loaderMessage="Loading Students Performance ..." />
						</div>
					</Col>
				}
			</div>
		);
	}

}

var mapStateToProps = (store) => {
	//console.log("store.addPerformanceData::", store);
	return {
		subjectNameOptions: store.appPerformanceData.subjectList,
		examNameOptions: store.appPerformanceData.examList,
		studentNameOptions: store.appPerformanceData.studentList,
		clsSectionOptions: store.appPerformanceData.clsList,
		studentsPerformanceData: store.appPerformanceData.studentsPerfrmanceList,
		teacherPerformanceData: store.appPerformanceData.teacherPerformanceList,
		communityOwnershipState: store.communityOwnershipReducer,
		memberDesignationList: store.appPerformanceData.memberDesignation,
		profileUserId: store.userProfileReducer.userId
	}
}

export default connect(mapStateToProps)(PerformanceController);

// export default (PerformanceController);
