import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import AvatarCard from './AvatarCard'
import UserImg from '../../images/mentor_dashboard_page/avatardp.png'


export default class ParticipantsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            listExpanded : true
        }
        this.createAttendeesDiv = this.createAttendeesDiv.bind(this);
        this.expandParticipantList = this.expandParticipantList.bind(this);
    }

    createAttendeesDiv(attendeesList) {
        if(!attendeesList) {return;}
        
        let attendeesDivList = [];
        let tempCheckList = [];
        for(let i = attendeesList.length-1; i >=0 ; i--) {
            // console.log("inserting element",attendeesList[i], this.props.type);
            if(attendeesList[i].user_type !== this.props.type && attendeesList[i].user_type !== 'presenter_participant'){
                continue;
            }
            if(this.props.type === 'presenter' && attendeesList[i].user_type === 'presenter_participant'){
                continue;
            }
            if(tempCheckList.indexOf(attendeesList[i].pk) !== -1){
                continue;
            }

            tempCheckList.push(attendeesList[i].pk)
            
            let name;
            let first_name = attendeesList[i].participants.first_name;
            const userPk = attendeesList[i].participants.id
            const presenters = this.props.allPresenters || {};
            const showStatus = Object.keys(presenters).length > 0 && 
                                (presenters[userPk] && presenters[userPk] !== 'undefined')
            const user = showStatus && presenters[userPk]

            if (!attendeesList[i].participants.last_name ||
                attendeesList[i].participants.last_name === "None" ||
                attendeesList[i].participants.last_name === "Null") {
                name = attendeesList[i].participants.first_name
            } else {
                name = attendeesList[i].participants.first_name + " " + attendeesList[i].participants.last_name
            }

            if(this.props.type === "presenter" && attendeesList[i].user_type === "presenter") {
                attendeesDivList.push (
                    <Row key={i} style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                        <Col xs={12} md={3} sm={3}>
                            <FontAwesome
                                name="circle"
                                title={attendeesList[i].is_online ? 'Online' : 'Offline'}
                                className={attendeesList[i].is_online ? 
                                    "is-online-notifier-true presenter-notifier" : 
                                    "is-online-notifier-false presenter-notifier"} 
                            />
                            <AvatarCard
                                profile={attendeesList[i].participants.profile_photo}
                                defaultPhoto={UserImg}
                                name={name}
                                fromAttendeesList={true}
                                type={"presenter"}
                            />
                        </Col>
                        <Col xs={12} md={9} sm={9} style={showStatus ? {display: 'flex'} : {}}>
                            <div style={showStatus ? {flex: 0.65} : {}}>
                                <div className="custom-list-title-content" 
                                    style={{fontWeight: '600', fontSize: '1em', letterSpacing: '0.015em', wordBreak: 'break-all'}}>
                                    {name}
                                </div>
                                <div className="custom-list-sub-content-dark">
                                    {this.props.userStatus || 'Presenter'}
                                </div>
                            </div>
                            {
                                showStatus ?
                                    <div className="attendees-presenters-stream-status"
                                        style={{flex: 0.35}} >
                                        {user  && user.isAudioActive() ?
                                            <FontAwesome
                                                title="Cam On/Off"
                                                name="microphone"
                                            /> :
                                            <FontAwesome
                                                title="Cam On/Off"
                                                name="microphone-slash"
                                            />
                                        }
                                        {user && !user.isScreenShareActive() ? 
                                                user.isVideoActive() ?
                                                    <FontAwesome
                                                        title="Cam On/Off"
                                                        name="video-camera"
                                                    /> :
                                                    <FontAwesome
                                                        title="Cam On/Off"
                                                        name="eye-slash"
                                                    /> 
                                                : null
                                        }
                                        {user  && user.isScreenShareActive() ?
                                            <FontAwesome
                                                title="Start Screen Share"
                                                name="laptop"
                                            /> :
                                            null
                                        }
                                    </div> :
                                    null
                            }
                        </Col>
                    </Row>
                );
            } else {
                attendeesDivList.push (
                    <Col xs={4} md={4} style={{ marginBottom: '20px' }} key={i}>
                        <FontAwesome
                            name="circle"
                            title={attendeesList[i].is_online ? 'Online' : 'Offline'}
                            className={attendeesList[i].is_online ? 
                                "is-online-notifier-true webinar-viewer" : 
                                "is-online-notifier-false webinar-viewer"} 
                        />
                        <AvatarCard
                            profile={attendeesList[i].participants.profile_photo}
                            defaultPhoto={UserImg}
                            name={name}
                            fromAttendeesList={true}
                        />
                        <div style={{textAlign: 'center'}}>
                            <div className="custom-list-sub-content attendees-viewer-name-tags" title={name}>
                                {first_name}
                            </div>
                        </div>
                    </Col>
                );
            }
                
        }
        // console.log("AtendeesComponent",attendeesList,attendeesDivList);
        return attendeesDivList;
    }

    expandParticipantList(){
        this.setState({listExpanded : !this.state.listExpanded})
    }

    render() {
        // console.log("ParticipantsList:: props", this.props);

        let attendeesDiv = null;

        if(this.props.attendeesList.length > 0) {            
            attendeesDiv = this.createAttendeesDiv(this.props.attendeesList);
        }
        else {
            attendeesDiv = <span>Waiting for attendees ...</span>
        }

        
        return (
            <div>
                <div className="refier_custom_panel_title_card" style={{borderBottomWidth: "1px", textAlign: 'left'}}>
                    {this.props.header}
                    <FontAwesome
                        className="attendees-show-hide-names"
                        onClick={this.expandParticipantList}
                        name={this.state.listExpanded ? "chevron-up" : "chevron-down" }
                        title={'Click to see' + this.props.userType}
                        style={{color: '#b5b91b', position: 'relative', float: "right", cursor: "pointer"}} />
                </div>
                { this.state.listExpanded ? 
                    <Row style={{"padding": "0 20px"}}>
                        {attendeesDiv}                   
                    </Row> : 
                    null
                }
            </div>
        );
    }
}