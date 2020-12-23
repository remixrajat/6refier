import React, { Component } from 'react'
import { connect } from "react-redux";
import "redux";
import FontAwesome from 'react-fontawesome';
import { Grid, Col, Row} from 'react-bootstrap'

import { notifyLearner } from '../conditionalcomponents/action'

import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import CommonModal from '../../shared/CommonModal'
import Preloader from '../../shared/Preloader/PreLoader'

import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";


class CommunityMemberActivityReport extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isHide: true,
            hideAnalysis: {},
            showModal: false,
            description: '',
            charsCount: 0,
            maxChar: 120,
            isAppreciate: false,
            action: 0,
        }
        this.setHide = this.setHide.bind(this)
        this.setShow = this.setShow.bind(this)
        this.toggleHide = this.toggleHide.bind(this)
        this.setHideShowAnalysis = this.setHideShowAnalysis.bind(this)

        this.onOpenEditDescription = this.onOpenEditDescription.bind(this);
        this.onEditDescription = this.onEditDescription.bind(this);
        this.closeDescriptionModal = this.closeDescriptionModal.bind(this);
        this.onSaveDescription = this.onSaveDescription.bind(this);
    }

    onOpenEditDescription(isAppreciate) {
        this.setState({isAppreciate:isAppreciate,showModal: true});
    }


    closeDescriptionModal() {
    this.setState({showModal: false});
    }

    onSaveDescription() {
        let memberActivityReport = this.props.memberActivityReport
        let communityMemberJson = JSON.parse(memberActivityReport.community_member)
        let type = this.state.isAppreciate ? "APPRECIATION" : "NOTIFICATION"
        let self = this
        this.setState({ action: 2 })
        let returnPromise = this.props.dispatch(notifyLearner
            (this.state.description, communityMemberJson.id, type));
        returnPromise.then((data) => {
            console.log("Response from notifying :: data : ", data)
            if (data == "Success") {
                self.setState({ action: 1 })
            } else {
                self.setState({ action: -1 })
            }
            setTimeout(() => {
                self.setState({showModal: false});
            }, 2000)
        })
    }

    onEditDescription(e) {
        let description = e.target.value;
        let charCount = e.target.value.length; 
        if (charCount <= this.state.maxChar) {
            this.setState({ description: description, charsCount: charCount })
        }
    }

    setHide() {
        this.setState({ isHide: true })
    }

    setShow() {
        this.setState({ isHide: false })
    }

    setHideShowAnalysis(id) {
        let analysis = this.state.hideAnalysis
        if (analysis[id] == undefined) {
            // console.log("analysis[" + id + "] : ", undefined)
            analysis[id] = true
        } else {
            let currentStatus = analysis[id]
            analysis[id] = !currentStatus
        }
        this.setState({hideAnalysis:analysis})
    }

    toggleHide() {
        let hide = this.state.isHide
        this.setState({isHide: !hide})
    }

    getContentText(content, searchText) {
        let newContent = content.toLowerCase();
        let idx = newContent.indexOf(searchText);
        let resp;
        
        if(searchText !== '' && idx !== -1) {
            const textLen = searchText.length;
                
            if(idx === 0) {
                resp =  <span className="custom-list-content">
                            <span className="highlight-text">{content.substring(idx, textLen)}</span>
                            { content.substring(textLen) }
                        </span>;
            } else {
                resp =  <span className="custom-list-content">
                            {content.substring(0, idx)}
                            <span className="highlight-text">{ content.substring(idx, idx + textLen) }</span>
                            {content.substring(idx + textLen)}
                        </span>;
            }
        } else {
            resp = <span className="custom-list-content">
                        { content }
                    </span>
        }       
        return resp;
    }

    render() {
        // console.log("CommunityMemberActivityReport :: this.props :: ", this.props, this.state)

        let memberActivityReport = this.props.memberActivityReport

                // console.log("CommunityMemberActivityReport :: member report :: ", memberActivityReports[i])
        let communityMemberJson = JSON.parse(memberActivityReport.community_member)
        let name = communityMemberJson.last_name ? (communityMemberJson.last_name != 'None'
            || communityMemberJson.last_name != '') ? (communityMemberJson.first_name + ' ' + 
                communityMemberJson.last_name) : communityMemberJson.first_name :
            communityMemberJson.first_name
        
        let decoratedName = this.getContentText(name,this.props.coloredText)
        
        let profile_photo = communityMemberJson.profile_photo
        
        let activity = []
        let test_ids = []
        let count_of_tests_given = 0
        let count_of_videos_accessed = 0
        let count_of_document_accessed = 0
        let content_ids = []
        let tests = []
        let contents = []
        let individualActivity
        let memberActivity
        let testActivity = {}
        let document_ids = []
        let documents = []

        // console.log("CommunityMemberActivityReport ::memberActivityReports[i].activity.length :: ",
        // memberActivityReports[i].activity.length)
        for (let j = 0; j < memberActivityReport.activity.length; j++){
            // console.log("CommunityMemberActivityReport ::j :: ",j)
            // console.log("CommunityMemberActivityReport ::memberActivityReports[i].activity[j].type :: ",
            // memberActivityReports[i].activity[j].type)
            if (memberActivityReport.activity[j].type == "Test") {
                let testpackage = []
                individualActivity =
                    (memberActivityReport.activity[j].test[0])
                // for (let k = 0; k < memberActivityReport.activity[j].test.length; k++){
                //     let each_test = memberActivityReport.activity[j].test[k]
                //     let package_def = JSON.parse(each_test.package.fields.package_definition)
                //     testpackage.push(package_def[0].fields.package_name)
                // }
                
                let test = {}
                // console.log("CommunityMemberActivityReport :: individualActivity ",
                //     individualActivity)
                let indexOfTest = -1
                if (test_ids.length > 0)
                    indexOfTest = test_ids.indexOf(individualActivity.test_id)
                // console.log("CommunityMemberActivityReport :: indexOfTest ",
                //             indexOfTest)
                if (indexOfTest == -1) {
                    test["id"] = individualActivity.test_id
                    test["name"] = individualActivity.test_name
                    test["session_date_time"] = []
                    test["session_analysis"] = []
                    test["package"] = []
                    // console.log("CommunityMemberActivityReport :: user_test ",
                    // memberActivityReport.activity[j].user_test)
                    // console.log("CommunityMemberActivityReport :: test :: ", test)
                    if (memberActivityReport.activity[j].user_test &&
                        memberActivityReport.activity[j].user_test.fields) {
                        test["session_date_time"].push
                            (memberActivityReport.activity[j].user_test.fields.creation_time)
                        count_of_tests_given++;
                        // console.log("CommunityMemberActivityReport :: test1 :: ", test)
                    }
                    if (memberActivityReport.activity[j].analysis) {
                        test["session_analysis"].push
                            (memberActivityReport.activity[j].analysis)
                        // console.log("CommunityMemberActivityReport :: test2 :: ", test)
                    }
                    // for (let k = 0; k < testpackage.length; k++){
                    //     test["package"].push(testpackage[k])
                    // }
                    tests.push(test)
                    // console.log("CommunityMemberActivityReport :: tests :: ", tests)
                    test_ids.push(individualActivity.test_id)
                    // console.log("CommunityMemberActivityReport :: test_ids :: ", test_ids)
                }
                else {
                    if (memberActivityReport.activity[j].user_test &&
                        memberActivityReport.activity[j].user_test.fields) {
                        
                        // console.log("CommunityMemberActivityReport :: tests1 :: ", tests)
                        tests[indexOfTest].session_date_time.push
                            (memberActivityReport.activity[j].user_test.fields.creation_time)
                        count_of_tests_given++;
                        // console.log("CommunityMemberActivityReport :: tests11 :: ", tests)
                    }
                    if (memberActivityReport.activity[j].analysis) {
                        tests[indexOfTest].session_analysis.push
                            (memberActivityReport.activity[j].analysis)
                        // console.log("CommunityMemberActivityReport :: tests2 :: ", tests)
                    }
                    // for (let k = 0; k < testpackage.length; k++){
                    //     if(test["package"].indexOf(testpackage[k])>-1)
                    //         test["package"].push(testpackage[k])
                    // }
                }
            }
            else if (memberActivityReport.activity[j].type == "Content") {
                individualActivity = (memberActivityReport.activity[j].content[0])
                let testpackage = []
                // for (let k = 0; k < memberActivityReport.activity[j].content.length; k++){
                //     let each_test = memberActivityReport.activity[j].content[k]
                //     let package_def = JSON.parse(each_test.package.fields.package_definition)
                //     testpackage.push(package_def[0].fields.package_name)
                // }
                let content = {}
                let indexOfContent = -1
                if (content_ids.length > 0)
                    indexOfContent = content_ids.indexOf(individualActivity.id)
                // console.log("CommunityMemberActivityReport :: indexOfContent :: ", indexOfContent)
                if (indexOfContent == -1) {
                    content["id"] = individualActivity.id
                    content["name"] = individualActivity.title
                    content["package"] = []
                    content['last_update_time'] = []
                    content['number_of_full_view'] = []
                    content['percentage_view'] = []
                    // console.log("CommunityMemberActivityReport :: content :: ", content)
                    if (memberActivityReport.activity[j].viewed_content &&
                        memberActivityReport.activity[j].viewed_content.fields) {
                        content['last_update_time'].push(memberActivityReport.activity[j].
                            viewed_content.fields.last_update_time)
                        content['number_of_full_view'].push(memberActivityReport.activity[j].
                            viewed_content.fields.number_of_full_view)
                        content['percentage_view'].push(memberActivityReport.activity[j].
                            viewed_content.fields.percentage_view)
                        // console.log("CommunityMemberActivityReport :: content1 :: ", content)
                        count_of_videos_accessed++;
                        
                    }
                    contents.push(content)
                    // console.log("CommunityMemberActivityReport :: contents :: ", contents)
                    content_ids.push(individualActivity.id)
                    // console.log("CommunityMemberActivityReport :: content_ids :: ", content_ids)
                    // for (let k = 0; k < testpackage.length; k++){
                    //     content["package"].push(testpackage[k])
                    // }
                }
                else {
                    if (memberActivityReport.activity[j].viewed_content &&
                        memberActivityReport.activity[j].viewed_content.fields) {
                        
                        contents[indexOfContent].last_update_time.push(memberActivityReport.activity[j].
                            viewed_content.fields.last_update_time)
                    

                        contents[indexOfContent].number_of_full_view.push(memberActivityReport.activity[j].
                            viewed_content.fields.number_of_full_view)
                    

                        contents[indexOfContent].percentage_view.push(memberActivityReport.activity[j].
                            viewed_content.fields.percentage_view)
                        
                        count_of_videos_accessed++;
                        
                    }
                }
            }
            else if (memberActivityReport.activity[j].type == "Document") {
                individualActivity = (memberActivityReport.activity[j].document[0])

                let document = {}
                let indexOfContent = -1
                if (document_ids.length > 0)
                    indexOfContent = document_ids.indexOf(individualActivity.id)
                
                if (indexOfContent == -1) {
                    document["id"] = individualActivity.id
                    document["name"] = individualActivity.title
                    document["package"] = []

                    document['last_update_time'] = []
                    document['number_of_full_view'] = []
                    document['percentage_view'] = []

                    // console.log("CommunityMemberActivityReport :: content :: ", content)
                    if (memberActivityReport.activity[j].viewed_document &&
                        memberActivityReport.activity[j].viewed_document.fields) {
                        document['last_update_time'].push(memberActivityReport.activity[j].
                            viewed_document.fields.update_time)
                        document['number_of_full_view'].push(memberActivityReport.activity[j].
                            viewed_document.fields.number_of_full_view)
                        document['percentage_view'].push(memberActivityReport.activity[j].
                            viewed_document.fields.percentage_view)
                        count_of_document_accessed++;
                        
                    }
                    documents.push(document)
                    document_ids.push(individualActivity.id)
                }
                else {
                    if (memberActivityReport.activity[j].viewed_document &&
                        memberActivityReport.activity[j].viewed_document.fields) {
                        
                        documents[indexOfContent].last_update_time.push(memberActivityReport.activity[j].
                            viewed_document.fields.update_time)
                    

                        documents[indexOfContent].number_of_full_view.push(memberActivityReport.activity[j].
                            viewed_document.fields.number_of_full_view)
                    

                        documents[indexOfContent].percentage_view.push(memberActivityReport.activity[j].
                            viewed_document.fields.percentage_view)
                        
                        count_of_document_accessed++;
                        
                    }
                }
            }
        }

        if (tests.length > 0) {
            activity.push(
                <div style={{marginTop:"10px"}}>
                    <span className="refier_custom_light_panel_title" >
                        Quiz
                    </span>
                </div>
            )
        }
        let self = this
        for (let j = 0; j < tests.length; j++){
            // console.log("CommunityMemberActivityReport::test:", tests[j])
            let complete_analysis = []
            let bin1=0, bin2=0, bin3=0
            for (let i = 0; i < tests[j].session_analysis.length; i++){
                let testAnalysis
                if (typeof tests[j].session_analysis[i] === "string") {
                    testAnalysis = JSON.parse(tests[j].session_analysis[i])
                    // console.log("CommunityMemberActivityReport::testAnalysis:",
                    //     tests[j].session_analysis[i], testAnalysis)
                    if (testAnalysis.test_type === "isAnalysis") {
                        if (testAnalysis.bin) {
                            if (testAnalysis.bin == 1) {
                                bin1 = bin1+1
                            }
                            else if (testAnalysis.bin == 2) {
                                bin2 = bin2 + 1
                            }
                            else if (testAnalysis.bin == 3) {
                                bin3 = bin3 + 1
                            }
                        }
                        complete_analysis.push(
                            <Col xs={12} sm={6} md={4}
                                style={{ padding: "20px 20px" }}>
                                <div className={"custom-panel-" + (testAnalysis.bin ?
                                    testAnalysis.bin : 0)}>
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
                    }
                    else if (testAnalysis.test_type === "isParametricAnalysis") {
                        let analysis = []
                        let bin_total = 0
                        let percentage_total=0
                        let index = 0
                        for (let key in testAnalysis.analysis) {
                            index = index+1
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
                            <Col xs={12} sm={6} md={4}
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
            }
                
            activity.push(
                <div>
                <div>
                    <span>
                        {tests[j].name} - {" "}
                    </span>
                    <span style={{}}>
                        {tests[j].session_date_time.length > 0 ?
                        (tests[j].session_date_time.length + " Times Completed"):"Pending"}
                    </span>
                    <span style={{ marginLeft: "20px" }} className="custom-color-1">
                    <FontAwesome
                        name="circle"
                        />
                    </span>
                    <span style={{ marginLeft: "5px" }} className="custom-color-1">
                        {bin1}
                    </span>

                    <span style={{ marginLeft: "20px" }} className="custom-color-2">
                    <FontAwesome
                        name="circle"
                        />
                    </span>
                    <span style={{ marginLeft: "5px" }} className="custom-color-2">
                        {bin2}
                    </span>

                    <span style={{ marginLeft: "20px" }} className="custom-color-3">
                    <FontAwesome
                        name="circle"
                        />
                    </span>
                    <span style={{ marginLeft: "5px" }} className="custom-color-3">
                        {bin3}
                    </span>
                    {   tests[j].session_date_time.length > 0 ?
                        <span className="refier_custom_link" style={{ marginLeft: "20px" }}
                            onClick={() => {self.setHideShowAnalysis(tests[j].id) }}
                        >Show Complete Analysis</span>
                        :
                        null
                    }
                    {
                        this.state.hideAnalysis[tests[j].id] ?
                            // <div>Ayush</div>
                            <Row>
                                {complete_analysis}
                                </Row>
                                :
                                null
                        }
                    </div>
                </div>
            )
        }

        if (contents.length > 0) {
            activity.push(
                <div style={{marginTop:"10px"}}>
                <span className="refier_custom_light_panel_title" >
                    Video Contents
                </span>
                    </div>
            )
        }
        for (let j = 0; j < contents.length; j++){
            // console.log("CommunityMemberActivityReport :: activity contents :: ", contents[j])
            let number_of_full_view = 0
            let percentage_view = 0
            if (contents[j].number_of_full_view) {
                for (let m = 0; m < contents[j].number_of_full_view.length; m++){
                    if (contents[j].number_of_full_view[m] != 0) {
                        number_of_full_view = number_of_full_view +
                            contents[j].number_of_full_view[m]
                    }
                    if (contents[j].percentage_view[m]) {
                        if (contents[j].percentage_view[m].toFixed(1) > percentage_view) {
                            percentage_view = contents[j].percentage_view[m].toFixed(1)
                        }
                    }
                }
            }

            activity.push(
                <div>
                    <span>
                        {contents[j].name} - {" "}
                    </span>
                    <span>
                        {
                            number_of_full_view>0 || percentage_view>0 ?
                                number_of_full_view!=0?
                            ("Viewed - " + number_of_full_view + " Times")
                                :
                                (percentage_view + "% Seen")
                            : "Pending"
                        }
                    </span>
                </div>
            )
        }


        if (documents.length > 0) {
            activity.push(
                <div style={{marginTop:"10px"}}>
                <span className="refier_custom_light_panel_title" >
                    Documents
                </span>
                    </div>
            )
        }
        for (let j = 0; j < documents.length; j++){
            // console.log("CommunityMemberActivityReport :: activity contents :: ", contents[j])
            let number_of_full_view = 0
            let percentage_view = 0
            if (documents[j].number_of_full_view) {
                for (let m = 0; m < documents[j].number_of_full_view.length; m++){
                    if (documents[j].number_of_full_view[m] != 0) {
                        number_of_full_view = number_of_full_view +
                        documents[j].number_of_full_view[m]
                    }
                    if (documents[j].percentage_view[m]) {
                        if (documents[j].percentage_view[m].toFixed(1) > percentage_view) {
                            percentage_view = documents[j].percentage_view[m].toFixed(1)
                        }
                    }
                }
            }

            activity.push(
                <div>
                    <span>
                        {documents[j].name} - {" "}
                    </span>
                    <span>
                        {
                            number_of_full_view>0 || percentage_view>0 ?
                                number_of_full_view!=0?
                            ("Viewed - " + number_of_full_view + " Times")
                                :
                                (percentage_view + "% Seen")
                            : "Pending"
                        }
                    </span>
                </div>
            )
        }



        memberActivity = (
            <div style={{ marginTop: "10px", padding:"10px" }}
                className="refier-card-style">
                <Grid fluid>
                    <Row>
                        <Col xs={8}>
                            <span onClick={this.toggleHide} style={{
                                padding: "10px",
                                cursor: "pointer",
                            }}
                            className="custom-tab-icon-light">
                                { this.state.isHide?
                                    <FontAwesome
                                        name="caret-right"
                                    />
                                    :
                                    <FontAwesome
                                        name="caret-down"
                                    />
                                }
                            </span>
                            <span  style={{ marginLeft: "20px" }}>
                                <img src={
                                    profile_photo || 
                                    profile_photo != ""? 
                                        MEDIA_URL_TEXT +
                                        profile_photo:imageSrc}
                                        className="custom-card-img" />
                            </span>
                            <span className="custom-list-content" style={{ marginLeft: "20px" }}>
                                {decoratedName}</span>
                        </Col>
                        <Col xs={4} style={{ textAlign: "right" }}>
                            <div style={{ marginTop: "5px" }}>
                                <span className="refier_custom_link"
                                    onClick={() => { self.onOpenEditDescription(true) }}
                                >Appreciate</span>
                                <span className="refier_custom_link"
                                     onClick={() => { self.onOpenEditDescription(false) }}
                                    style={{marginLeft:"20px"}}>Notify</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} style={{ marginLeft:"20px", padding: "10px" }}
                            className="custom-list-sub-content">
                            <span>Quiz attempted : {count_of_tests_given} Times </span>
                            <span style={{ marginLeft: "20px" }}>
                                Videos accessed : {count_of_videos_accessed} Times</span>
                            <span style={{ marginLeft: "20px" }}>
                                Documents accessed : {count_of_document_accessed} Times</span>
                        </Col>
                    </Row>
                    {this.state.isHide ?
                        null
                        :
                        <Row>
                            <Col xs={12}>
                                <div className="custom-list-sub-content"
                                    style={{ marginTop: "10px", marginLeft:"20px" }}>
                                    {activity}
                                </div>
                            </Col>
                        </Row>
                    }
                </Grid>
            </div>
        )

        let modalBody = <div>
            <textarea
                style={{padding:"5px"}}
                onChange={this.onEditDescription}
                rows="12" maxlength="120" required
                placeholder="Enter your Note here">{this.state.description}</textarea>
            <div className="custom-list-sub-content"
                style={this.state.charsCount == this.state.maxChar ?
                    { textAlign: "right", color:"red", fontWeight:"600" }:{ textAlign: "right"}}>
                {this.state.charsCount}/{this.state.maxChar}
            </div>
            <div style={{ textAlign: "right", margin:"10px"}}>
            {
                this.state.action === 1 ? 
                    <span className="form-status-success">Note Sent</span> :
                    this.state.action === -1 ?
                            <span className="form-status-fail">Failed</span> :
                            this.state.action === 2 ?
                                <Preloader />
                                :
                        <ComplementaryButton
                        buttonText={this.state.isAppreciate ? "Appreciate" : "Notify"}
                        onButtonClick={this.onSaveDescription}
                    /> 
            }
            </div>
        </div>

        return (
            <div>
                {memberActivity}
                <CommonModal 
                    showModal={this.state.showModal}
                    close={this.closeDescriptionModal}
                    modalHeading={(this.state.isAppreciate ? "Appreciate " : "Notify ") + name}
                    modalBody={modalBody}
                    onSaveModal={this.onSaveDescription}
                    isSaveButton={true}
                    saveButtonText={this.state.isAppreciate ? "Appreciate" : "Notify"}
                    onEditDescription={this.onEditDescription}
                    hideFooter={true}
                />
            </div>
        )
    }
}

var mapStateToProps =  (store, ownProps) => {
    return {
    };
  };
  
  export default connect(mapStateToProps)(CommunityMemberActivityReport);