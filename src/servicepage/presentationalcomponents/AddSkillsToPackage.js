import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';

import PackageCardForSkillMap from './PackageCardForSkillMap'

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import PreLoader from '../../shared/Preloader/PreLoader'


export default class AddSkillsToPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }    
    }


    render() {
        // console.log("AddSkillsToPackage:: ", this.props)

        const { communityPackagesAsOwner } = this.props;
        let courseList

        if(communityPackagesAsOwner) {
            courseList = []

            for(let course of communityPackagesAsOwner) {
                courseList.push (
                    <PackageCardForSkillMap
                        objectPropName="package_skill"
                        packageInfo={course['fields']}
                        pk={course['pk']}
                        key={course['pk']}
                        tagList={this.props.getCommunitySkillsDetails}
                        profileTags={this.props.getPackageAssessmentSkill ? 
                                        this.props.getPackageAssessmentSkill[course['pk']] :
                                        ''}
                        addOrUpdatePackageSkills={this.props.addOrUpdatePackageSkills}
                        loaderStatus={this.props.packageLoaderStatus}
                        communityId={this.props.communityId}
                    />
                )
            }
        }


        return (
            <Grid fluid data-label="Common Cards" style={{minHeight: '350px'}}>
                {!courseList ?
                    <PreLoader />
                    :
                    courseList.length == 0 ?
                        <div style={{padding: '10px', width: '90%'}}
                            className="custom-list-content generic-post-card">
                            No Courses available yet
                        </div>
                    :
                    <div style={{marginTop: '20px'}}>
                        {courseList}
                    </div>
                }
            </Grid>
        )
    }
}