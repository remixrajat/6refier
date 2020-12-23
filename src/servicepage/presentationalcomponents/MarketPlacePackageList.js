import React, { Component } from "react";
import { Grid, Col, Row, FormControl, Tabs, Tab} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import MarketPlacePackage from "./MarketPlacePackage";

import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';
import { NonPriorityWhiteButton } from '../../shared/RefierComponents/NonPriorityWhiteButton';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import PreLoader from '../../shared/Preloader/PreLoader'


export default class MarketPlacePackageList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log("MarketPlacePackageList:: ", this.props)

        let courseList = []

        if(this.props.courses) {
            let { courses } = this.props;

            for(let course of courses) {
                courseList.push (
                    <MarketPlacePackage 
                        pk={course['pk']}
                        key={course['pk']}
                        cost={course['cost_of_package']}
                        creationTime={course['creation_time']}
                        course={course['package']}
                        tag={course['tag']}
                        documents={course['document_list']}
                        contents={course['content_list']}
                        sessions={course['sessions_list']}
                        tests={course['test_list']}
                        payForExternalCourse={this.props.payForExternalCourse}
                    />
                )
            }
        }

        return (
            courseList.length > 0 ?
                <div>
                    {courseList}
                </div> :
                <div className="custom-list-content"
                    style={{
                        width: '50%', textAlign: 'center', margin: '50px auto', 
                        background: 'white', padding: '10px', borderRadius: '5px'
                    }}>
                    Add Skills to Community by clicking "Define Company Skills" Buttton
                </div>
        )
    }
}