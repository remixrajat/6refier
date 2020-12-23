import React, { Component } from 'react'
import { Grid, Col, Row, FormControl } from 'react-bootstrap'

import CommunityMemberActivityReport from './CommunityMemberActivityReport'


export default class CommunityMembersActivityReport extends Component{
    constructor(props) {
        super(props)
        this.state = {
           searchText: "" 
        }

        this.onEditSearch = this.onEditSearch.bind(this)
    }

    onEditSearch(e) {
        let value = e.target.value
        // console.log("Search text : ",e.target.value)
        this.setState({searchText:value})
    }

    render() {
        // console.log("CommunityMembersActivityReport :: this.props :: ", this.props)

        let memberActivityReports = this.props.communityActivityReport ?
            this.props.communityActivityReport.activity_report : undefined
        
        let memberActivityList = []
        if (memberActivityReports) {
            for (let i = 0; i < memberActivityReports.length; i++){
                // console.log("CommunityMembersActivityReport :: member report :: ", memberActivityReports[i])
                let communityMemberJson = JSON.parse(memberActivityReports[i].community_member)
                if (this.state.searchText == "") {
                    memberActivityList.push(
                        <CommunityMemberActivityReport
                            memberActivityReport={memberActivityReports[i]}
                            coloredText={""}
                        />
                    )
                }
                else {
                    let name = communityMemberJson.last_name ? (communityMemberJson.last_name != 'None'
                    || communityMemberJson.last_name != '') ? (communityMemberJson.first_name + ' ' + 
                        communityMemberJson.last_name) : communityMemberJson.first_name :
                        communityMemberJson.first_name
                    name = name.toLowerCase()
                    let text = this.state.searchText.toLowerCase()
                    if (name.indexOf(text) != -1) {
                        memberActivityList.push(
                            <CommunityMemberActivityReport
                                memberActivityReport={memberActivityReports[i]}
                                coloredText={text}
                                />
                        )
                    }
                }
            }
        }

        return (
            <Grid fluid>
                <Col xsOffset={2} xs={8} style={{marginTop:"30px"}}>
                <div style={{border:"1px solid #f2f2f2"}}>
                    <FormControl 
                        autofocus
                        componentClass="textarea"
                        placeholder="Search ..." 
                        className="custom-search-area"
                        onChange={this.onEditSearch}
                        />
                    </div>
                </Col>
                
                <Col xsOffset={0} xs={12} style={{marginTop:"10px"}}>
                    {memberActivityList}
                    </Col>
            </Grid>
        )
    }
}