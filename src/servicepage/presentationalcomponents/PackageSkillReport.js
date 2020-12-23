import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Grid, Col, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import PreLoader from '../../shared/Preloader/PreLoader'


import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";


export default class PackageSkillReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded : false,
        }
 
        this.showCollapsed = this.showCollapsed.bind(this)
        this.showExpanded = this.showExpanded.bind(this)
    }

    showExpanded() {
        this.setState({isExpanded:true})
    }

    showCollapsed() {
        this.setState({isExpanded:false})
    }
    

    render() {
        // console.log("PackageSkillReport:: ", this.props)

        let { packageInfo, test_details, passingCriteria } = this.props
        let name = '', imageUri = '', userId = '', test_body = [];

        if(packageInfo['fields'] && packageInfo['fields']['package_owner_user']) {
            const owner = packageInfo['fields']['package_owner_user']

            userId = owner.id
            imageUri = owner.profile_photo !== "" ?
                            MEDIA_URL_TEXT + owner.profile_photo : 
                            imageSrc
            name = owner.first_name
            if(owner.last_name.trim() !== '') {
                name = name + " " + owner.last_name.trim()
            }
        } else if (packageInfo['fields'] && packageInfo['fields']['package_owner_entity']) {
            const owner = packageInfo['fields']['package_owner_entity']['fields']

            name = owner.entity_name
            imageUri = owner.profile_photo !== "" ?
                            MEDIA_URL_TEXT + owner.profile_photo : 
                            imageSrc
        } else {
            name = "Refier User"
            imageUri = imageSrc
        }


        Object.keys(test_details).forEach((key, idx) => {
            const test = test_details[key]
            if(test.user_test_details && test.user_test_details.length > 0) {
                const test_user = test['user_details']['fields']
                const test_details = test['user_test_details']
                const complete_analysis = []
                let i = 0, tests_cleared = 0
                let bin1=0, bin2=0, bin3=0

                for (let test of test_details) {
                    // console.log("typeof:: ", typeof(test.analysis)) 
                    if (typeof(test.analysis) !== 'string') 
                        continue
                    let testAnalysis = JSON.parse(test.analysis)
                    // console.log("testAnalysis:: ", testAnalysis)
                    if(parseFloat(testAnalysis.percentage) > passingCriteria) {
                        tests_cleared++
                    }

                    if(testAnalysis.test_type === "isAnalysis") {
                        complete_analysis.push(
                            <Col xs={12} sm={6} md={4} key={i}
                                style={{ padding: "20px 20px" }}>
                                <div className={"custom-panel-" + i++}>
                                    <div className="custom-list-content-white"
                                        style={{ marginTop: "10px", textAlign: "center" }}
                                    >{testAnalysis.analysis}</div>
                                    {
                                        testAnalysis.percentage ?
                                            <div className="custom-list-content-white"
                                                style={{ marginTop: "10px", textAlign: "center" }}
                                            >{testAnalysis.percentage}%</div>
                                            :
                                            null
                                    }
                                </div>
                            </Col>
                        )
                    } else if (testAnalysis.test_type === "isParametricAnalysis") {
                        let analysis = []
                        let bin_total = 0
                        let percentage_total=0
                        let index = 0
                        for (let key in testAnalysis.analysis) {
                            index = index + 1
                            analysis.push(
                                <div>
                                    <div style={{
                                        marginTop: "15px", fontSize: "1em"
                                        , fontWeight:"600"  }} className="">
                                        {key}
                                    </div>
                                    <div style={{ marginTop: "5px", fontSize:"0.9em" }}>
                                        {testAnalysis.analysis[key]}    
                                    </div>    
                                </div>
                                
                            )
                            bin_total = bin_total + (testAnalysis.bin?testAnalysis.bin[key]:0)
                            percentage_total = percentage_total +
                                (testAnalysis.percentage ? testAnalysis.percentage[key] : 0)
                        }
                        let bin = Math.ceil(bin_total / index)
                        let percentage = Math.ceil(percentage_total / index)
                        if(percentage > passingCriteria) {
                            tests_cleared++
                        }

                        if (bin == 1) {
                            bin1 = bin1+1
                        }
                        else if (bin == 2) {
                            bin2 = bin2 + 1
                        }
                        else if (bin == 3) {
                            bin3 = bin3 + 1
                        }
                        complete_analysis.push(
                            <Col xs={12} sm={6} md={4} key={index}
                                style={{ padding: "20px 20px" }}>
                                <div className={"custom-panel-" + (bin)}>
                                    <div className="custom-list-content-white"
                                        style={{ marginTop: "10px", textAlign: "center" }}
                                    >{analysis}</div>
                                            <div className="custom-list-content-white"
                                                style={{ marginTop: "10px", textAlign: "center" }}
                                            >{percentage}%</div>
                                        
                                </div>
                            </Col>
                        )
                    }
                }

                let test_user_name =test_user['first_name']
                if(test_user['last_name'] && 
                    test_user['last_name'].trim() !== '') {
                        test_user_name = test_user_name 
                                            + " " 
                                            + test_user['last_name']
                }

                let test_user_image_uri = test_user.profile_photo !== "" ?
                                            MEDIA_URL_TEXT + test_user.profile_photo : 
                                            imageSrc

                let body = (
                    <Col xs={12} style={{marginBottom: '20px'}} key={idx}>
                        <Col xs={12} style={{display: 'flex', alignItems: 'center'}}>
                            <div className="sizable-image-container"
                                style={{ height: "40px", width: "40px", marginRight: '15px' }}>
                                <img
                                    src={test_user_image_uri}
                                    className="custom-card-img" />
                            </div>
                            <div className="refier_text_post_owner">{test_user_name}</div>
                        </Col>
                        <Col xs={12} style={{padding: '10px'}} className="custom-list-sub-content">
                            <span>Quiz attempted: <b>{test_details.length}</b></span> 
                            <span style={{ marginLeft: "20px" }}>
                                Passing Criteria: <b>{passingCriteria}</b>
                            </span> 
                            <span style={{ marginLeft: "20px" }}>
                                Tests Passes: <b>{tests_cleared}</b>
                            </span> 
                        </Col>
                        <Col xs={12} style={{padding: '10px'}} className="custom-list-sub-content">
                            {complete_analysis}
                        </Col>
                    </Col>
                )

                test_body.push(body)
            } else {
                test_body.push(
                    <div key={idx} className="custom-list-sub-content">
                        Users yet to take any test
                    </div>
                )
            }
        })


        const expandedBody = (
            <Col xs={12}>
                <div className="refier_custom_panel_light_gray">
                    <div style={{ padding: "10px 10px" }}>
                        <div className="custom-list-content" 
                            style={{fontWeight:"600", marginBottom:"15px"}}>
                            {packageInfo['fields'] && packageInfo['fields'].isCourse ? 
                                "Course" : "Content Resource"}
                        </div>
                        <div className="custom-list-title-content">
                            {packageInfo['fields'] ? packageInfo['fields'].package_name : 'Course'}
                        </div>
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "10px", textTransform:"none" }}>
                            {packageInfo['fields'] && packageInfo['fields'].package_description}
                        </div>
                    </div>
                    <div style={{ padding: '10px', textTransform: 'none' }}>
                        {test_body}
                    </div>
                    <div style={{ padding: '10px' }}>
                        <span className="refier_custom_link"
                            onClick={this.showCollapsed}  style={{textTransform:"None"}}
                            >Show Less</span>
                    </div>
                </div>
            </Col> 
        )

        const collapsedBody = (
            <Col sm={6} md={4}>
                <div className="refier_custom_panel_light_gray">
                    <div style={{ padding: "10px 10px" }}>
                        <div className="custom-list-content" 
                            style={{fontWeight:"600", marginBottom:"15px"}}>
                            {packageInfo['fields'] && packageInfo['fields'].isCourse ? 
                                "Course" : "Content Resource"}
                        </div>
                        <div className="custom-list-title-content">
                            {packageInfo['fields'] ? packageInfo['fields'].package_name : 'Course'}
                        </div>
                        <div className="custom-list-sub-content" 
                            style={{ marginTop: "10px", textTransform:"none" }}>
                            {packageInfo['fields'] && packageInfo['fields'].package_description}
                        </div>
                    </div>
                    <div style={{ padding: "10px 10px" }}>
                        <span className="refier_custom_link"
                            onClick={this.showExpanded}  style={{textTransform:"None"}}
                            >Show More</span>
                    </div>
                </div>
            </Col> 
        )


        return (
            this.state.isExpanded ?
                expandedBody :
                collapsedBody
        )
    }
}