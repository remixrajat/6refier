import React, { Component } from "react";
import { Grid, Col, FormGroup, Row } from 'react-bootstrap'
import Select from 'react-select';

import PackageSkillReport from './PackageSkillReport'

import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';
import { NonPriorityWhiteButton } from '../../shared/RefierComponents/NonPriorityWhiteButton';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import PreLoader from '../../shared/Preloader/PreLoader'


export default class SkillMatrix extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTags: []
        }
    }

    getTagValues() {
        if (!this.props.tagList) {
            return [];
        }

        let tagValues = [];
        let tagIds = []
        
        for (let i = 0; i < this.props.tagList.length; i++) {
            let tag = {}
            const tagInfo = this.props.tagList[i].fields
            const tagPk = this.props.tagList[i].pk

            if(tagInfo.company_skill) {
                tag['value'] = tagInfo.company_skill.skill_name
                tag['label'] = tagInfo.company_skill.skill_name
                tag['tag_id'] = tagInfo.company_skill.skill_id
                tag['id'] = tagPk
                tag['unique_key'] = tagPk + "_skill"
                tag['entity'] = "skill"
            } else if (tagInfo.user_skill) {
                tag['value'] = tagInfo.user_skill.tag_name
                tag['label'] = tagInfo.user_skill.tag_name
                tag['tag_id'] = tagInfo.user_skill.tag_id
                tag['id'] = tagPk
                tag['unique_key'] = tagPk + "_tag"
                tag['entity'] = "tag"
            } else {
                continue;
            }
            
            if (tagIds.indexOf(tagPk) === -1) {
                tagIds.push(tagPk)
                tagValues.push(tag)
            }
        }

        return tagValues
    }
    
    setSelectedTags(newValue) {
        this.setState({ selectedTags: newValue })
    }

    onEdit() {
        let option = this.getTagValues();
        return (
            <Select
                name="tag_name"
                multi={false}
                placeholder="Select Topics"
                options={option}
                value={this.state.selectedTags}
                removeSelected={true}
                rtl={false}
                onChange={this.setSelectedTags.bind(this)}
            />
        );
    }

    onSave() {
        // console.log("SkillMatrix::onSave", this.state.selectedTags)
        this.props.fetchReports(this.state.selectedTags)
    }


    render() {
        // console.log("SkillMatrix:: ", this.props)

        let reportList

        if(this.props.testReports) {
            let { testReports } = this.props;
            // console.log(Array.isArray(testReports))
            if (!Array.isArray(testReports)) {
                reportList = (
                    <div className="custom-list-content"
                        style={{
                            width: '50%', textAlign: 'center', margin: '50px auto', 
                            background: 'white', padding: '10px', borderRadius: '5px'
                    }}>{testReports['message']}</div>
                )
            } else {
                reportList = []
                let i = 0
    
                for(let report of testReports) {
                    reportList.push (
                        <PackageSkillReport 
                            key={i++}
                            packagePk={report['package_pk']}
                            packageInfo={report['package_info']}
                            test_details={report['test_details']}
                            passingCriteria={report['passing_criteria']}
                        />
                    )
                }
            }

        }


        return (
            <Grid fluid>
                <Row style={{marginTop: '50px', display: 'flex', alignItems: 'center'}}>
                    <Col sm={8} md={6} mdOffset={2}
                        style={{padding: '10px', borderRadius: '5px', background: '#f1f1f1'}}>
                        <form style={{ padding: '10px' }}>
                            <FormGroup controlId="formBasicText" style={{margin: 0}}>
                                {this.onEdit()}
                            </FormGroup>
                        </form> 
                    </Col>
                    <Col sm={4} md={2}>
                        <PrimaryButton
                            style={{marginRight: '10px'}}
                            onButtonClick={this.onSave.bind(this)}
                            buttonText="Submit"
                        />
                    </Col>
                </Row>
                <Col xs={12} style={{minHeight: '200px'}}>
                { reportList ?
                    reportList.length > 0 ?
                        <div style={{marginTop: '50px'}}>
                            {reportList}
                        </div> :
                        <div className="custom-list-content"
                            style={{
                                width: '50%', textAlign: 'center', margin: '50px auto', 
                                background: 'white', padding: '10px', borderRadius: '5px'
                            }}>
                            Skill not assigned to any package or course
                        </div> 
                    :
                    <div className="custom-list-content"
                        style={{
                            width: '50%', textAlign: 'center', margin: '50px auto', 
                            background: 'white', padding: '10px', borderRadius: '5px'
                        }}>
                        Select a skill to see Reports
                    </div>

                }
                </Col>
            </Grid>
        )
    }
}