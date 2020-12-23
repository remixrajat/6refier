import React, { Component } from "react";
import quizImageSrc from "../../images/mentor_dashboard_page/quiz.jpg";
import contentImageSrc from "../../images/mentor_dashboard_page/refier_generic.jpg";
import imageSrc from "../../images/mentor_dashboard_page/avatardp.png";
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import { Grid, Col, Row, FormControl, Image} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';


export default class ContentActivityReport extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isHide: true
        }
        this.toggleHide = this.toggleHide.bind(this)
    }

    toggleHide() {
        let hide = this.state.isHide
        this.setState({isHide:!hide})
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
        // console.log("ContentActivityReport :: this.props ", this.props)

        let member_index = []
        let member_ids = []
        let member_attempts = []
        let body

        if (this.props.type && this.props.type == "test") {
            let test = this.props.test

            if (test.member_id) {
                for (let i = 0; i < test.member_id.length; i++) {
                    let indexOfMember = member_ids.indexOf(test.member_id[i])
                    if (indexOfMember == -1) {
                        member_ids.push(test.member_id[i])
                        member_index.push(i)
                        member_attempts.push(1)
                    }
                    else {
                        member_attempts[indexOfMember] = member_attempts[indexOfMember] + 1
                    }
                }
            }

            let members = []
            for (let i = 0; i < member_index.length; i++) {
                let userData = test.member_json[member_index[i]]
                let name = userData.last_name ? (userData.last_name != 'None'
                    || userData.last_name != '') ? (userData.first_name + ' ' +
                        userData.last_name) : userData.first_name :
                    userData.first_name
                
                let profile_photo = userData.profile_photo
                members.push(
                    <div style={{ marginTop: "15px" }}>
                        <span style={{ marginLeft: "10px" }}>
                            <img src={
                                profile_photo ||
                                    profile_photo != "" ?
                                    MEDIA_URL_TEXT +
                                    profile_photo : imageSrc}
                                className="custom-card-img" />
                        </span>
                        <span className="custom-list-content" style={{ marginLeft: "20px" }}>{name}</span>
                        <span className="custom-list-sub-content">
                            {" "} - {member_attempts[i]} Attempts</span>
                    </div>
                )
            }

            let decoratedName = this.getContentText(test.name,this.props.coloredText)

            body =
                <Grid fluid style={{ marginTop: "10px", padding: "0px" }}
                    className="refier-card-style">
                    <Col xs={4} md={2} style={{ padding: "0px" }}>
                        <div>
                            <Image src={quizImageSrc} responsive />
                        </div>
                    </Col>
                    <Col xs={8} md={10} style={{ padding: "20px" }}>
                        <div className="custom-list-content">
                            {decoratedName}
                        </div>
                        <div className="custom-list-sub-content">
                            {test.session_date_time ?
                                (test.session_date_time.length + " Times Completed") : "No Attempts"}
                        </div>
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
                        <div>
                            {
                                this.state.isHide ?
                                    null
                                    :
                                    members
                            }
                        </div>
                    </Col>
                </Grid>
        }
        else if (this.props.type && this.props.type == "content") {
            let content = this.props.content

            if (content.member_id) {
                for (let i = 0; i < content.member_id.length; i++) {
                    member_ids.push(content.member_id[i])
                    member_index.push(i)
                    if (content.number_of_full_view[i] == 0) {
                        let analysis = content.percentage_view[i].toFixed(1) + "% Seen"
                        member_attempts.push(analysis)
                    }
                    else {
                        let analysis = content.number_of_full_view[i] + " Times Seen"
                        member_attempts.push(analysis)
                    }
                }
            }

            let members = []
            for (let i = 0; i < member_index.length; i++) {
                let userData = content.member_json[member_index[i]]
                let name = userData.last_name ? (userData.last_name != 'None'
                    || userData.last_name != '') ? (userData.first_name + ' ' +
                        userData.last_name) : userData.first_name :
                    userData.first_name
                
                let profile_photo = userData.profile_photo
                members.push(
                    <div style={{ marginTop: "15px" }}>
                        <span style={{ marginLeft: "10px" }}>
                            <img src={
                                profile_photo ||
                                    profile_photo != "" ?
                                    MEDIA_URL_TEXT +
                                    profile_photo : imageSrc}
                                className="custom-card-img" />
                        </span>
                        <span className="custom-list-content" style={{ marginLeft: "20px" }}>{name}</span>
                        <span className="custom-list-sub-content">
                            {" "} - {member_attempts[i]}</span>
                    </div>
                )
            }

            let decoratedName = this.getContentText(content.name, this.props.coloredText)
            
            body =
                <Grid fluid style={{ marginTop: "10px", padding: "0px" }}
                    className="refier-card-style">
                    <Col xs={4} md={2} style={{ padding: "0px" }}>
                        <div>
                            <Image src={content.photo || 
                                    content.photo != ""? 
                                        MEDIA_URL_TEXT +
                                        content.photo:contentImageSrc} responsive />
                        </div>
                    </Col>
                    <Col xs={8} md={10} style={{ padding: "20px" }}>
                        <div className="custom-list-content">
                            {decoratedName}
                        </div>
                        <div className="custom-list-sub-content">
                        {content.number_of_full_view ?
                            (content.number_of_full_view.length + " Views")
                            : "No Views"}
                        </div>
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
                        <div>
                            {
                                this.state.isHide ?
                                    null
                                    :
                                    members
                            }
                        </div>
                    </Col>
                </Grid>
        }

        return (
            <div>
                {body} 
            </div>          
            )
        }
}