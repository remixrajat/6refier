import React, { Component } from 'react'
import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { Grid, Col, Row, FormControl } from 'react-bootstrap'
import CommunityMemberActivityReport from './CommunityMemberActivityReport'
import Preloader from '../../shared/Preloader/PreLoader'

export default class CourseActivityReport extends Component{
    constructor(props) {
        super(props)
        this.state = {
           searchText: "" 
        }
        this.onEditSearch = this.onEditSearch.bind(this)
    }

    onEditSearch(e) {
        let value = e.target.value
        console.log("Search text : ",e.target.value)
        this.setState({searchText:value})
    }

    render() {
        console.log("CourseActivityReport :: this.props :: ", this.props)

        let memberActivityReports = this.props.courseActivityReport ? 
            this.props.courseActivityReport.length>0?
                this.props.courseActivityReport[0].report ?
                    this.props.courseActivityReport[0].report.activity_report : undefined : undefined
                :undefined
        
        let memberActivityList
        if (memberActivityReports) {
            memberActivityList = []
            for (let i = 0; i < memberActivityReports.length; i++){
                // console.log("CourseActivityReport :: member report :: ", memberActivityReports[i])
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
                {memberActivityList ? memberActivityList.length > 0 ?
                    <Col xsOffset={2} xs={8} style={{ marginTop: "15px" }}>
                        <div style={{ border: "1px solid #f2f2f2" }}>
                            <FormControl
                                autofocus
                                componentClass="textarea"
                                placeholder="Search Member..."
                                className="custom-search-area"
                                onChange={this.onEditSearch}
                            />
                        </div>
                    </Col>
                    :
                    null:null
                }
                {memberActivityList ? memberActivityList.length > 0 ?
                <Col xsOffset={0} xs={12} style={{marginTop:"10px"}}>
                    {memberActivityList}
                    </Col>
                    :
                    <div className="custom-list-content"
                        style={{ textAlign: "center", marginTop: "10px" }}>No Members Present</div>
                    :
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                        <Preloader loaderMessage="Loading Activity Reports... " />
                    </div>
                }
            </Grid>
        )
    }
}