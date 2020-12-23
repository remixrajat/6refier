import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import TagController from '../../shared/Tags/conditionalcomponents/TagController'

import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton'


export default class TestCardForTopic extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        // console.log("TestCardForTopic :: testDetails :: ", this.props.testDetails)

        let user_sessions = this.props.testDetails.fields.user_sessions
        user_sessions = JSON.parse(user_sessions)
        let completed_session_list = 0
        let pending_session = false
        for (let i = 0; i < user_sessions.length; i++) {
            if (user_sessions[i].fields.status == "Done") {
                completed_session_list = completed_session_list + 1
            }
            else if (user_sessions[i].fields.status == "Pending") {
                pending_session = true
            }
        }
        let tagValues = this.props.testDetails.fields.tags
        // let tags = []
        // for (let i = 0; i < tagValues.length; i++) {
        //     let index = this.props.index ? this.props.index + i : i
        //     index = index % 4
        //     tags.push(
        //         <span style={{ marginRight: "5px", display: "inline-block", marginTop: "5px" }}
        //             className={"custom-list-tag-" + index}>
        //             {tagValues[i].fields.tag_name}</span>)
        // }

        return (
            <div style={{ padding: "10px 10px", textAlign: "left" }}
                // className="vertical-align-col-components"
                >
                <div style={{ textAlign: "left" }}>
                    {this.props.testDetails.fields.test_name ?
                        <div
                            className="custom-list-content">
                            {this.props.testDetails.fields.test_name}</div>
                        :
                        null}

                    <div
                        className="custom-list-sub-content-highlighted">
                        {this.props.testDetails.fields.description}</div>
                    <div
                        className="custom-list-sub-content" style={{ marginTop: "5px" }}>
                        {"Estimated Time : " + this.props.testDetails.fields.expected_time_in_minutes + " minutes"}</div>
                    {completed_session_list > 0 ?
                        <div className="custom-list-sub-content-highlighted">
                            <span>
                                <FontAwesome
                                    name="check-square-o"
                                    
                                />
                            </span>
                            <span style={{ marginLeft: "10px" }}>
                                {completed_session_list + " Times Completed"}
                            </span>
                        </div>
                        :
                        null}
                    <div className="custom-list-sub-content" style={{margin: '15px auto'}}>
                        <PrimaryButton 
                            buttonText={pending_session ? "Start Test" : "Enroll in Test"}
                            redirect="true"
                            redirectAddress={"/userDashboard/contest/" 
                                + this.props.profileId 
                                + "/" 
                                + this.props.testDetails.pk 
                            }
                        />
                    </div>
                    <div style={{ marginTop: "5px" }}>
                    <TagController tagValues={tagValues}
                            index={this.props.index}
                            userId={this.props.profileId}
                            />
                    {/* {tags} */}
                    </div>
                </div>
            </div>
        );
    }
}