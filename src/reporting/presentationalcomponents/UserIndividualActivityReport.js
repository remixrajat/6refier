import React, { Component } from 'react'
import quizImageSrc from "../../images/mentor_dashboard_page/quiz.jpg";
import webinarImageSrc from "../../images/webinar/webinar-cover.jpg";
import docImageSrc from "../../images/mentor_dashboard_page/document.jpg";
import contentImageSrc from "../../images/mentor_dashboard_page/refier_generic.jpg";
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { Grid, Col, Row, FormControl, Image, Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import { Link, NavLink } from 'react-router-dom';
import DocumentPlayer from '../../coursepage/presentationalcomponents/DocumentPlayer'
import { submitDocumentViewStat } from '../../documents/conditionalcomponents/actions'
import { connect } from "react-redux";

class UserIndividualActivityReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHide: true,
            showModal: false,
            documentModalState: false,
            nextPrevTimeAdd: 5,
            document: null,
        }
        this.toggleHide = this.toggleHide.bind(this)
        this.showDocumentModal = this.showDocumentModal.bind(this);
        this.closeDocumentModal = this.closeDocumentModal.bind(this);
        this.saveProgress = this.saveProgress.bind(this)
    }

    saveProgress(contentProgressDetails, content_id){
        if(!content_id){
            return;
        }
        let statDetails= {
            contentProgressDetails,
            content_id
        }
        // console.log("saveProgress :: ",statDetails)
        this.props.dispatch(submitDocumentViewStat(statDetails))
    }

    toggleHide() {
        let hide = this.state.isHide
        this.setState({isHide:!hide})
    }

    open() {
        this.setState({showModal:true})
    }

    close() {
        this.setState({showModal:false})
    }

    openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
    


    showDocumentModal(document) {
        this.setState({documentModalState: true, document:document})
    }

    closeDocumentModal() {
        this.setState({documentModalState: false})
    }

    render() {
        console.log("UserIndividualActivityReport::props::", this.props)

        let activity_name, activity_status, activity_details, activity_image, activity_action, package_text
        if (this.props.type && this.props.type == "test") {
            let test = this.props.test
            activity_name = test.name
            activity_image = quizImageSrc
            activity_status = test.session_date_time.length>0 ?
                test.session_date_time.length + " Times Completed" : "No Attempts"
            package_text = []
            for (let i = 0; i < test.packages.length; i++){
                if (test.package_ids) {
                    package_text.push(<span className="custom-list-sub-content" style={{ paddingRight: "20px" }}>
                            <Link to={"/userDashboard/myLearnings/" + test.package_ids[i]}>
                        {test.packages[i]}
                    </Link>
                    </span>
                    )
                }
                else {
                    package_text.push(<span className="custom-list-sub-content" style={{ paddingRight: "20px" }}>
                        {test.packages[i]}
                    </span>)
                }
            }
            activity_action = test.session_date_time.length > 0 ?
            <span style={{marginRight:"20px"}}>
                <span>
                    <FontAwesome
                        name="check"
                        size='2x'
                    />
                </span> 
                <span style={{marginLeft:"30px"}}>
                        <Link to={"/userDashboard/contest/" + this.props.userProfileId + "/" + test.id}
                            className="refier_custom_button_new_selected_2" style={{padding:"10px 10px"}}>
                        Retake
                    </Link>
                </span>
            </span>
            :
            <span style={{marginRight:"20px"}}>
                <Link to={"/userDashboard/contest/" + this.props.userProfileId + "/" + test.id}
                    className="refier_custom_button_new_selected_2" style={{padding:"10px 10px"}}>
                    Enroll
                </Link>
            </span>
            
            let firstCol = [],secondCol=[],thirdCol=[]
            if (test.session_analysis.length > 0) {
                let count = -1

                // Offset to maintain the sequence from first to third column
                // let offset = 3 - (analysis.length - 1) % 3
                // count = count + offset
                
                for (let i = test.session_analysis.length - 1; i >= 0; i--) {
                    // console.log("Length of json string :: ", test.session_analysis[i].length)
                    if (test.session_analysis[i].length != undefined) {
                        let testAnalysis = JSON.parse(test.session_analysis[i])
                        
                    // console.log("UserIndividualActivityReport:testAnalysis :: ",testAnalysis)
                        if ((testAnalysis.test_type == "isAnalysis" && testAnalysis.analysis.length > 0)
                            ||
                            (testAnalysis.test_type == "isParametricAnalysis")) {
                            count = count + 1
                            let analysisBody
                            let date = formatdatefunction(test.session_date_time[i], "long")
                            let time = formatdatefunction(test.session_date_time[i], "time")
                            analysisBody = []
                            if (testAnalysis.test_type == "isAnalysis") {
                                analysisBody.push(
                                    <div
                                    style={{ padding: "20px 20px" }}>
                                    <div className={"custom-panel-" + (testAnalysis.bin ?
                                        testAnalysis.bin:0)}>
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
                                </div>
                                
                                )
                            }
                            else if (testAnalysis.test_type == "isParametricAnalysis") {
                                let analysis_list = []
                                let bin_total = 0
                                let index = 0
                                let percentage_total=0
                                for (let key in testAnalysis.analysis) {
                                    index = index+1
                                    analysis_list.push(
                                        <div>
                                            <div style={{
                                                marginTop: "15px", fontSize: "0.9em"
                                                , fontWeight: "600"
                                            }} className="">
                                                {key}
                                            </div>
                                            <div style={{ marginTop: "5px", fontSize: "0.8em" }}>
                                                {testAnalysis.analysis[key]}
                                            </div>
                                        </div>
                                    
                                    )
                                    bin_total = bin_total + (testAnalysis.bin ? testAnalysis.bin[key] : 0)
                                    percentage_total = percentage_total +
                                        (testAnalysis.percentage ? testAnalysis.percentage[key] : 0)
                                    // console.log("bin_total, testAnalysis.bin[key] : ",bin_total, testAnalysis.bin[key])
                                }
                                let bin = Math.ceil(bin_total / index)
                                let percentage = Math.ceil(percentage_total/index)
                                // console.log("bin_total, bin : ",bin_total, bin)

                                analysisBody.push(
                                    <div
                                    style={{ padding: "20px 20px" }}>
                                    <div className={"custom-panel-" + (bin)}>
                                        <div className="custom-list-content-white"
                                            style={{ marginTop: "10px", textAlign: "center" }}
                                            >{analysis_list}</div>
                                            <div className="custom-list-content-white"
                                            style={{ marginTop: "10px", textAlign: "center" }}
                                        >{percentage}%</div>
                                    </div>
                                    </div>
                                )
                            }

                            let index = i % 4
                            let columnNumber = count % 2
                            switch (columnNumber) {
                                case 0:
                                    firstCol.push(
                                        <div
                                            style={{ padding: "20px 20px" }}>{analysisBody}</div>
                                    )
                                    break;
                                case 1:
                                    secondCol.push(
                                        <div
                                            style={{ padding: "20px 20px" }}>
                                           {analysisBody}
                                        </div>
                                    )
                                    break;
                            
                            }
                        }
                    }
                }
            }  
            activity_details = 
                <div style={{marginTop:"10px"}}>
                <Col xs={12}  md={12}>
                    {firstCol}    
                </Col>
                <Col xs={12} md={12}>
                    {secondCol}    
                </Col>     
                </div>
    
            
        }
        else if (this.props.type && this.props.type == "content") {
            let content = this.props.content
            activity_name = content.name
            package_text = []
            for (let i = 0; i < content.packages.length; i++){
                if (content.package_ids) {
                    package_text.push(<span className="custom-list-sub-content" style={{ paddingRight: "20px" }}>
                            <Link to={"/userDashboard/myLearnings/" + content.package_ids[i]}>
                        {content.packages[i]}
                    </Link>
                    </span>
                    )
                }
                else {
                package_text.push(<span className="custom-list-sub-content" style={{paddingRight:"20px"}}>
                                    {content.packages[i]}
                                </span>)
                }
            }
            activity_image = content.photo || 
                content.photo != ""? 
                    MEDIA_URL_TEXT +
                content.photo : contentImageSrc
            
            let number_of_full_views = 0
            let percentage_view = 0
            for (let i = 0; i < content.number_of_full_view.length; i++){
                if (content.number_of_full_view[i] != 0) {
                    number_of_full_views = number_of_full_views + 1
                }
                if (content.percentage_view[i]) {
                    if (content.percentage_view[i].toFixed(1) > percentage_view) {
                        percentage_view = content.percentage_view[i].toFixed(1)
                    }
                }
            }
            
            activity_status = number_of_full_views>0 || percentage_view>0 ?
                                number_of_full_views!=0?
                            ("Viewed - " + number_of_full_views + " Times")
                                :
                                (percentage_view + "% Seen")
                            : "Pending"
            
            activity_action =
                <Link to={"/userDashboard/vids/"+content.id}>
                <div style={{ marginTop: "30px" }}>
            {content.number_of_full_view.length>0 ?
                   content.number_of_full_view[0] != 0 ?   
            <span style={{marginRight:"20px"}}>    
                <span>
                    <FontAwesome
                        name="check"
                        size='2x'
                    />
                </span> 
                <span style={{marginLeft:"30px"}}>
                    <FontAwesome
                        name="play-circle"
                        size='2x'
                    />
                </span> 
            </span>
                :
                <span  style={{marginRight:"20px"}}>
                    <Button className="refier_custom_button_new_selected_2">
                        Resume
                    </Button>
                </span>
                :
                <span style={{marginRight:"20px"}}>
                <FontAwesome
                    name="play-circle"
                    size='2x'
                />
            </span>            
            }
            </div>
        </Link>
        }
        else if (this.props.type && this.props.type == "session") {
            let session = this.props.session
            activity_name = session.name
            package_text = []
            if (session.packages) {
                for (let i = 0; i < session.packages.length; i++) {
                    if (session.package_ids) {
                        package_text.push(<span className="custom-list-sub-content" style={{ paddingRight: "20px" }}>
                            <Link to={"/userDashboard/myLearnings/" + session.package_ids[i]}>
                                {session.packages[i]}
                            </Link>
                        </span>
                        )
                    }
                    else {
                        package_text.push(<span className="custom-list-sub-content" style={{ paddingRight: "20px" }}>
                            {session.packages[i]}
                        </span>)
                    }
                }
            }
            activity_image = webinarImageSrc
            activity_status = session.status
            
            activity_action =
                <Link to={"/userDashboard/webinarinfo/"+session.id}>
                <div style={{ marginTop: "30px" }}>
                <span  style={{marginRight:"20px"}}>
                    <Button className="refier_custom_button_new_selected_2">
                        Go to Webinar
                    </Button>
                </span>   
            </div>
        </Link>
        }
        else if (this.props.type && this.props.type == "document") {
            let document = this.props.document
            activity_name = document.name
            package_text = []
            if (document.packages) {
                for (let i = 0; i < document.packages.length; i++) {
                    if (document.package_ids) {
                        package_text.push(<span className="custom-list-sub-content" style={{ paddingRight: "20px" }}>
                            <Link to={"/userDashboard/myLearnings/" + document.package_ids[i]}>
                                {document.packages[i]}
                            </Link>
                        </span>
                        )
                    }
                    else {
                        package_text.push(<span className="custom-list-sub-content" style={{ paddingRight: "20px" }}>
                            {document.packages[i]}
                        </span>)
                    }
                }
            }
            activity_image = docImageSrc

            let number_of_full_views = 0
            let percentage_view = 0
            if (document.number_of_full_view) {
                for (let i = 0; i < document.number_of_full_view.length; i++) {
                    if (document.number_of_full_view[i] != 0) {
                        number_of_full_views = number_of_full_views + document.number_of_full_view[i]
                    }
                    if (document.percentage_view[i]) {
                        if (document.percentage_view[i].toFixed(1) > percentage_view) {
                            percentage_view = document.percentage_view[i].toFixed(1)
                        }
                    }
                }
            }
            
            activity_status = number_of_full_views>0 || percentage_view>0 ?
                                number_of_full_views!=0?
                            ("Viewed - " + number_of_full_views + " Times")
                                :
                                (percentage_view + "% Seen")
                            : "Pending"


            let self = this
            activity_action =
                <div style={{ marginTop: "30px" }}>
                <span  style={{marginRight:"20px"}}>
                    <Button className="refier_custom_button_new_selected_2"
                        onClick={() => { self.showDocumentModal(document)}}>
                        View Document
                    </Button>
                </span>   
            </div>
        }

        let playerModal = (
            <DocumentPlayer {...this.props}
                showModal={this.state.documentModalState}
                nextPrevTimeAdd={this.state.nextPrevTimeAdd}
                onClose={this.closeDocumentModal}
                document={this.state.document}
                fromReport={true}
                openInNewTab={this.openInNewTab}
                saveProgress={this.saveProgress}
            />
        );


        return (
            <Grid fluid style={{ marginTop: "10px", padding:"0px" }}
                className="refier-card-style">
                <Col xs={4} md={2} style={{ padding: "0px" }}>
                    
                    <div>
                        <Image src={activity_image} responsive/>
                    </div>
                </Col>
                <Col xs={4} md={7} style={{padding:"20px"}}>
                    <div  className="custom-list-title-content">
                        {activity_name}
                    </div>
                    <div className="custom-list-sub-content">
                        {activity_status}
                    </div>
                    <div className="custom-list-sub-content">
                        {package_text}
                    </div>
                    {this.props.type && this.props.type == "content" ?
                        null :
                        this.props.type && this.props.type == "session" ?
                            null:
                            this.props.type && this.props.type == "document" ?
                                null:
                        <div style={{ marginTop: "10px" }} onClick={this.toggleHide} style={{
                            padding: "10px",
                            cursor: "pointer",
                        }}>
                            <span className="custom-tab-icon-light">
                                {this.state.isHide ?
                                    <FontAwesome
                                        name="caret-right"
                                    />
                                    :
                                    <FontAwesome
                                        name="caret-down"
                                    />
                                }
                            </span>
                            <span style={{ marginLeft: "10px" }} className="refier_custom_link">
                                Details
                            </span>
                        </div>
                    }
                    <div>
                        {
                            this.state.isHide ?
                                null
                                :
                                activity_details
                        }
                        </div>
                </Col>
                <Col xs={4} md={3} style={{ textAlign: "right" }}>
                    <div style={{ marginTop: "30px" }}>
                        {activity_action}
                    </div>
                </Col>
                {
                    this.state.documentModalState ?
                        playerModal :
                        null
                }
            </Grid>
        )
    }
}

var mapStateToProps =  (store, ownProps) => {
    return {
    };
};

export default connect(mapStateToProps)(UserIndividualActivityReport);