import React, {Component} from "react"
import "redux";
import { connect } from "react-redux";
import CoursePage from "../presentationalcomponents/CoursePage"
import { getRunningCourseDetails } from './action'
import Preloader from '../../shared/Preloader/PreLoader'

import {
    getContentForDashboard,
    submitVideoViewStat, 
    getContentURL, 
    likeOrDislikeContents
} from "../../recordedContents/conditionalcomponents/actions"


class CoursePageController extends Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.dispatch(getRunningCourseDetails(this.props.match.params.mappingId));
    }

    render(){
        if (this.props.runningCourseDetails) {
            if (this.props.runningCourseDetails.length > 0) {
                if (this.props.runningCourseDetails[0].fields.package_entity_mapping.length > 0) {
                    let mappingId =
                        this.props.runningCourseDetails[0].fields.package_entity_mapping[0].pk
                    if (mappingId == this.props.match.params.mappingId) {
                        return (
                            <CoursePage
                                {...this.props}
                            />
                        )
                    }
                }
            }
        }
        return (
            <div style={{textAlign:"center", margin:"20px"}}>
                <Preloader loaderMessage="Loading Course Details..."/>
            </div>
        )
    }
}

var mapStateToProps =  (store, ownProps) => {
    return {
        runningCourseDetails: store.courseDataReducer.runningCourseDetails,
        courseActivityReport: store.communityPageDataReducer.courseAcitivityReports
    };
  };

export default connect(mapStateToProps)(CoursePageController);