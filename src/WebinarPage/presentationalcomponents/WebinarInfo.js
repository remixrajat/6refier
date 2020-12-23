import React, { Component } from 'react'
import { Grid, Row, Col, Media, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import WebinarInfoAccess from './WebinarInfoAccess';
import { formatdatefunction } from "../../HelperFunctions/formatDateFunction";

import { MEDIA_URL_TEXT,isLgDevice } from '../../GlobalConstants';
import Preloader from '../../shared/Preloader/PreLoader'
import userImg from '../../images/mentor_dashboard_page/avatardp.png'
import webinarImg from '../../images/webinar/webinar-cover.jpg'


class WebinarInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLargeScreen:isLgDevice()
        }

        this.convertHeadersToSessionHeadings = this.convertHeadersToSessionHeadings.bind(this)
    }

    componentWillMount() {
        window.addEventListener("resize", this.isLgScreen.bind(this));
    }
    
    isLgScreen() {
        this.setState({isLargeScreen:isLgDevice()})
    }

    convertHeadersToSessionHeadings(headerName) {
        if(headerName === 'learn_what')
            return "Topics To Be Covered"
        else if (headerName === 'target_audience')
            return "Who Should Attend"
        else if (headerName === 'about_presenter')
            return "About the Presenter"
        else if (headerName === 'other_videos')
            return "Videos to Check"
        else if (headerName === 'video')
            return "Message from the Presenter"
        else if (headerName === 'learn_next')
            return "What you should learn next?"
        else if (headerName === 'resources')
            return "Perks and Resources you get!"
        else 
            return headerName
    }


    render() {
        // console.log("WebinarInfo:: this.props :: ", this.props)

        let body =  <div style={{ textAlign: "center" }}>    
                        <Preloader shimmer={true} copies={2} placeholder="box_and_lines" />
                    </div>

        if(this.props.eventInfo) {
            if(this.props.eventInfo.length>0) {
                if (this.props.eventInfo[0].pk == this.props.eventId) {
                    let eventInfo = this.props.eventInfo[0]
                    let topic = eventInfo.fields.topic
                    let desc = eventInfo.fields.description
                    let startdatetime = eventInfo.fields.start_date_time
                    let photo = eventInfo.fields.mentor_id.profile_photo
                    let name = ""
                    if (eventInfo.fields.mentor_id.first_name != null) {
                        if (eventInfo.fields.mentor_id.last_name &&
                            eventInfo.fields.mentor_id.last_name != "None" &&
                            eventInfo.fields.mentor_id.last_name != "Null") {
                            name = eventInfo.fields.mentor_id.first_name + " " + eventInfo.fields.mentor_id.last_name
                        }
                        else {
                            name = eventInfo.fields.mentor_id.first_name
                        }
                    }

                    let mentorId = eventInfo.fields.mentor_id.id

                    let info = eventInfo.fields.event_info
                    let infodetails, webinar_photo, info_url_text, info_url
                    if (info.length > 0) {
                        infodetails = info[0].fields.info
                        webinar_photo = info[0].fields.info_thumbnail
                        info_url_text = info[0].fields.info_url_text
                        info_url = info[0].fields.info_url
                    }

                    let webinar_headers = []
                    let headers = eventInfo.fields.event_headers
                    if (headers.length > 0) {
                        for (let i = 0; i < headers.length; i++) {
                            webinar_headers.push (
                                <div className="webinar-header"
                                    style={{ marginTop: "30px", borderTop:"1px solid #f2f2f2", paddingTop:"5px" }}>
                                    {this.convertHeadersToSessionHeadings(headers[i].fields.info_header)}
                                </div>
                            )
                            let topics = headers[i].fields.topics
                            if (topics.length > 0) {
                                for (let j = 0; j < topics.length; j++){
                                    webinar_headers.push (
                                        <div>
                                            <div className="webinar-subheader"
                                                style={{ marginTop: "25px" }}>
                                                {topics[j].fields.scheduled_topic}
                                            </div>
                                            <a className="custom-link" href={topics[j].fields.topic_url} 
                                                target="_blank">
                                                {topics[j].fields.topic_url_text}
                                            </a>
                                        </div>
                                    )
                                    let details = topics[j].fields.details
                                    if (details.length > 0) {
                                        for (let k = 0; k < details.length; k++) {
                                            webinar_headers.push (
                                                <div>
                                                    <div className="webinar-details"
                                                        style={{ marginTop: "15px" }}>
                                                        <span>
                                                            <FontAwesome
                                                                name="circle"
                                                                style={{fontSize:"0.5em"}}
                                                            />
                                                        </span>
                                                        <span style={{marginLeft:"10px"}}>
                                                            {details[k].fields.detail}
                                                        </span>
                                                    </div>
                                                    <a className="custom-link" 
                                                        href={details[k].fields.details_url} 
                                                        target="_blank">
                                                        {details[k].fields.details_url_text}
                                                    </a>
                                                </div>
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }


                    return (
                        <Grid fluid>
                            <Col xs={12} mdOffset={1} md={10} style={{backgroundColor:"white", padding:"20px"}}>
                                <Row>
                                    <Col xs={12} md={7}>
                                        <div className="webinar-topic"
                                            style={{ marginTop: "10px"  }}>{topic}</div>
                                        </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={7}>
                                        <div className="webinar-subtopic"
                                            style={{ marginTop: "10px", marginBottom:"10px"}}>{desc}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}  md={7}>
                                        <div>
                                            <img 
                                                src={(webinar_photo && webinar_photo !== "") ?
                                                    MEDIA_URL_TEXT + webinar_photo : webinarImg}
                                                style={{"display":"inline", "width": "100%"}}
                                            />
                                        </div>
                                        <div className="generic-post-card-left-text">  
                                            <img 
                                                style={{objectFit: 'contain'}}
                                                src={photo || photo!=""? MEDIA_URL_TEXT + photo : userImg}
                                                className={this.state.isLargeScreen ? "webinar-mentor-image" :
                                                    "webinar-mentor-image-small"} 
                                            />
                                            <h4 className={this.state.isLargeScreen ?
                                                    "webinar-mentor" : "webinar-mentor-small"} 
                                                style={{
                                                    "marginTop": "10px", "marginBottom": "20px",
                                                        }}>
                                                        <Link
                                                        to={"/userDashboard/profile/" + mentorId}>
                                                            {name}
                                                        </Link>
                                                    </h4>       
                                        </div>
                                    </Col>
                                    <Col xs={12} md={5}>
                                        <div className="webinar-optionbox" 
                                            style={{padding: "10px", display: 'flex'}}>
                                            <span className="custom-list-sub-content" 
                                                style={{flex: '0.3', textAlign: 'center'}}>On</span> 
                                            <span style={{flex: '0.7', textAlign: 'center'}}>
                                                {formatdatefunction(startdatetime, "long")}
                                            </span>
                                        </div>
                                        <div className="webinar-optionbox" 
                                            style={{padding: "10px", display: 'flex'}}>
                                            <span className="custom-list-sub-content"
                                                style={{flex: '0.3', textAlign: 'center'}}>At</span>
                                            <span style={{flex: '0.7', textAlign: 'center'}}>
                                                {formatdatefunction(startdatetime, "time")} IST
                                            </span>
                                        </div>
                                        <div className="webinar-optionbox"
                                            style={{
                                                padding: "20px", paddingTop: "35px", paddingBottom: "35px",
                                                borderTop:"2px solid white"}}>
                                            <WebinarInfoAccess 
                                                {...this.props}/>
                                        </div>
                                    </Col>
                                </Row>
                                { infodetails?
                                    <Row>
                                        <Col xs={12} md={7}>
                                            <div className="webinar-subtopic"
                                                style={{ marginTop: "20px", marginBottom: "10px" }}>
                                                {infodetails}
                                            </div>
                                            <a className="custom-link" href={info_url} target="_blank">
                                                {info_url_text}
                                            </a>
                                        </Col>
                                    </Row>
                                    :
                                    null
                                }
                                { webinar_headers.length>0?
                                    <Row>
                                        <Col xs={12} md={7}>
                                            {webinar_headers}
                                        </Col>
                                    </Row>
                                    :
                                    null
                                }
                            </Col>
                        </Grid>
                    )
                }
            }
        }

        return(
            <div>{body}</div>
        )
    }
}

export default WebinarInfo;