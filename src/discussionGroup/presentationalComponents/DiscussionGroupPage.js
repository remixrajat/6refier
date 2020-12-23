import React, { Component } from 'react'
import { Col, Grid, Tabs, Tab } from 'react-bootstrap';

import DiscussionGroupDetailsController from '../conditionalComponents/DiscussionGroupDetailsController'
import DiscussionPostWritingController from '../conditionalComponents/DiscussionPostWritingController';
import DiscussionGroupPostsController from '../conditionalComponents/DiscussionGroupPostsController';

import Preloader from '../../shared/Preloader/PreLoader'


export default class DiscussionGroupPage extends Component {
    constructor(props) {
        super(props);
        this.getDiscussionPageBody = this.getDiscussionPageBody.bind(this);
    }

    getDiscussionPageBody() {
        // console.log("DiscussionGroupPage ", this.props.groupDetails)

        if (this.props.groupDetails) {
            let followingQuestions, allQuestions
            if (this.props.discussionRoomPostsStatsCount) {
                allQuestions = 0
                followingQuestions = 0
                for(let key in this.props.discussionRoomPostsStatsCount) {
                    allQuestions = allQuestions + 1
                    if (this.props.discussionRoomPostsStatsCount[key]['likeOrDislike'] == 'like') {
                        followingQuestions = followingQuestions + 1
                    }
                }
            }

            let communityId = this.props.groupDetails.fields.groupCommunityMapping ?
                this.props.groupDetails.fields.groupCommunityMapping.id : undefined
            let isUserExpert = this.props.groupDetails.fields.isExpert ? "True" : "False"
            let isUserOwner = this.props.groupDetails.fields.isOwner ? "True" : "False"
            let isUserMember = this.props.groupDetails.fields.isMember ? "True" : "False"

            if (this.props.groupDetails.pk !== this.props.groupId) {
                return
                (<Grid>
                    <Col xs={12} style={{ "textAlign": "center" }}>
                        <Preloader loaderMessage={"Loading Group Details"} />
                    </Col>
                </Grid>)
            } else {
                return (
                    <div style={{ margin: "5px 20px" }}>
                        <Col xs={2} style={{ textAlign: "center" }}>
                            <DiscussionGroupDetailsController {...this.props}
                                communityId={communityId}
                                isDetails={true}
                                isMembers={false}
                                isUserExpert={isUserExpert}
                                isUserMember={isUserMember}
                                isUserOwner={isUserOwner}
                            />
                        </Col>
                        <Col xs={8} style={{textAlign: "center"}}>
                            
                            <DiscussionPostWritingController {...this.props}
                                communityId={communityId}
                                isUserExpert={isUserExpert}
                                isUserMember={isUserMember}
                                isUserOwner={isUserOwner}
                            />
                            <div>
                                <Tabs defaultActiveKey={1} id="custom-tabs">
                                <Tab
                                    eventKey={1}
                                    tabClassName="refier_custom_table_header_pane"
                                        style={{ "fontSize": "14px", "background": "white" }}
                                        title={allQuestions && allQuestions != 0 ? ("All (" + allQuestions + ")")
                                        :
                                        "All"}
                                    > 
                                        <DiscussionGroupPostsController  {...this.props}
                                            isAll={true}/>
                                </Tab>
                                <Tab
                                    eventKey={2}
                                    tabClassName="refier_custom_table_header_pane"
                                        style={{ "fontSize": "14px", "background": "white" }}
                                        title={followingQuestions && followingQuestions != 0 ?
                                            ("Following (" + followingQuestions + ")")
                                        :
                                        "Following"}
                                    > 
                                        <DiscussionGroupPostsController  {...this.props}
                                            isAll={false}/>
                                </Tab>
                                </Tabs>
                            </div>
                        </Col>
                        <Col xs={2} className="refier-card-style" style={{
                            "textAlign": "center"
                            }}>
                            <DiscussionGroupDetailsController {...this.props}
                                communityId={communityId}
                                isDetails={false}
                                isMembers={true}
                                isUserExpert={isUserExpert}
                                isUserMember={isUserMember}
                                isUserOwner={isUserOwner}
                            />
                        </Col>
                    </div>
                )
            }
        } else {
            // console.log("DiscussionGroupPage :: 2");
            // return null
            return (
                <Grid>
                    <Col xs={12} style={{ "textAlign": "center" }}>
                        <Preloader loaderMessage={"Loading Discussion Group"} />
                    </Col>
                </Grid>
            )
        }
        // return body;
    }

    render() {
        // console.log("DiscussionGroupPage ", this.props)

        return (
            <div>
                {this.getDiscussionPageBody()}
            </div>
        )
    }
}