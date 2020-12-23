import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button,OverlayTrigger, Popover } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import TagController from '../../shared/Tags/conditionalcomponents/TagController'
import RequestsToJoin from '../../communitypage/presentationalcomponents/CommunityProfile/RequestsToJoin'

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import '../../styles/scss/cards.css'


export default class CommunityCardForList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRequestToJoinModal: false,
        }
        this.closeRequestToJoinModal = this.closeRequestToJoinModal.bind(this);
        this.openRequestToJoin = this.openRequestToJoin.bind(this)
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseExit = this.mouseExit.bind(this);
    }

    closeRequestToJoinModal() {
        this.setState({ showRequestToJoinModal: false })
    }

    openRequestToJoin() {
		this.setState({ showRequestToJoinModal: true })
    }

    mouseEnter() {
        this.refs.pop.show();
    }

    mouseExit() {
        this.refs.pop.hide();        
    }


    render() {
        // console.log("CommunityCardForList: Props", this.props, this.state);

        // let tagValues = this.props.communityDetails.fields.tag_values
        let pk = [{pk: this.props.pk}];     // this declaration is required by requeststojoin
        let body;
        let imageStyle = {}
        let imageUrl = this.props.communityDetails.fields.profile_photo? MEDIA_URL_TEXT+
                    this.props.communityDetails.fields.profile_photo:CommunityImg
        imageStyle["background"] = "url(" + imageUrl + ") 50%/ cover"
        
        const popover = (
            <Popover style={this.props.newUserForm ? {zIndex: '10010'} : {}}>
                {/* // className="refier-tooltip" 
                // onMouseOver={this.mouseEnter}   
                // onMouseOut={this.mouseExit}>     */}
                <div
                    className="custom-list-sub-content-highlighted"
                    style={{margin:"10px", color:"#3c3c3c"}}>
                    {this.props.communityDetails.fields.description && 
                        this.props.communityDetails.fields.description.length > 200 ?
                        this.props.communityDetails.fields.description.substring(0, 200) + "..." : 
                        this.props.communityDetails.fields.description}
                </div>
            </Popover>
        );

        const pending_popover = (
            <Popover style={this.props.newUserForm ? {zIndex: '10010'} : {}}>
                {/* // className="refier-tooltip" 
                // onMouseOver={this.mouseEnter}   
                // onMouseOut={this.mouseExit}>     */}
                <div
                    className="custom-list-sub-content-highlighted"
                    style={{margin:"10px", color:"#3c3c3c"}}>
                    Request Pending
                </div>
            </Popover>
        );

        const member_popover = (
            <Popover style={this.props.newUserForm ? {zIndex: '10010'} : {}}>
                {/* // className="refier-tooltip" 
                // onMouseOver={this.mouseEnter}   
                // onMouseOut={this.mouseExit}>     */}
                <div
                    className="custom-list-sub-content-highlighted"
                    style={{margin:"10px", color:"#3c3c3c"}}>
                    <Link to={"/userDashboard/community/" + this.props.pk}>
                    Go to Community
                </Link>
                </div>
            </Popover>
        );

        body = 
            <div className={this.props.newUserForm ? "refier_card_selected" : "refier_card_list"} 
                style={this.props.newUserForm ?
                    { cursor: "default", height: '210px', overflow: 'hidden' } :
                    { cursor: "default", overflow: 'hidden' }}>
                <div className="refier_card_image">
                    <img 
                        style={{objectFit:"cover"}}
                        src={this.props.communityDetails.fields.profile_photo? MEDIA_URL_TEXT+
                            this.props.communityDetails.fields.profile_photo:CommunityImg}
                    />
                </div>
                <div>
                    <div className="refier_card_title refier_card_title_white"
                        style={this.props.newUserForm ?
                            {display: "flex", justifyContent: "space-between", padding: "5px", marginTop: '-105px'} :
                            {display: "flex", justifyContent: "space-between", padding: "5px"}}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {
                                this.props.newUserForm ?
                                    <div>
                                        <span style={{color:"white", fontSize: '14px'}}>
                                            {this.props.communityDetails.fields.entity_name}
                                        </span>
                                        <span
                                            // onMouseOver={this.mouseEnter} 
                                            // onMouseOut={this.mouseExit} 
                                            style={{"display": "inline-block"}}>
                                            <OverlayTrigger 
                                                placement="bottom" 
                                                // trigger="manual" 
                                                overlay={popover} 
                                                rootClose
                                                containerPadding={20}
                                                ref="pop">
                                                <FontAwesome
                                                    // title="Info"
                                                    name="info-circle"
                                                    style={{ "color": "white", paddingLeft: "10px" }} />
                                            </OverlayTrigger>
                                        </span>
                                    </div> :
                                    <Link to={"/userDashboard/community/" + this.props.pk}>
                                        <span style={{color:"white", fontSize: '14px'}}>
                                            {this.props.communityDetails.fields.entity_name}
                                        </span>
                                        <span
                                            // onMouseOver={this.mouseEnter} 
                                            // onMouseOut={this.mouseExit} 
                                            style={{"display": "inline-block"}}>
                                            <OverlayTrigger 
                                                placement="bottom" 
                                                // trigger="manual" 
                                                overlay={popover} 
                                                rootClose
                                                containerPadding={20}
                                                ref="pop">
                                                <FontAwesome
                                                    // title="Info"
                                                    name="info-circle"
                                                    style={{ "color": "white", paddingLeft: "10px" }} />
                                            </OverlayTrigger>
                                        </span>
                                    </Link>
                            }
                        </div>
                        <div style={{ verticalAlign: "middle" }}>
                            {this.props.communityDetails.is_member ?
                                this.props.newUserForm ?
                                    <span
                                        // onMouseOver={this.mouseEnter} 
                                        // onMouseOut={this.mouseExit} 
                                        style={{float: 'right'}}>
                                        <FontAwesome
                                            title="Member"
                                            name="check-circle"
                                            size='2x'
                                            style={{ "color": "#03a9f4" }} />
                                    </span> :
                                    <span
                                        // onMouseOver={this.mouseEnter} 
                                        // onMouseOut={this.mouseExit} 
                                        style={{float: 'right'}}>
                                        <OverlayTrigger 
                                            placement="bottom" 
                                            // trigger="manual" 
                                            overlay={member_popover} 
                                            rootClose
                                            containerPadding={20}>
                                            {/* ref="pop"> */}
                                                <FontAwesome
                                                // title="Member"
                                                name="check-circle"
                                                size='2x'
                                                style={{ "color": "#03a9f4" }} />
                                        </OverlayTrigger>
                                    </span> 
                                :
                                this.props.communityDetails.request_status ?
                                    <span
                                        // onMouseOver={this.mouseEnter} 
                                        // onMouseOut={this.mouseExit} 
                                        style={{float: 'right'}}>
                                        <OverlayTrigger 
                                            placement="bottom" 
                                            // trigger="manual" 
                                            overlay={pending_popover} 
                                            rootClose
                                            containerPadding={20}>
                                                <FontAwesome
                                                // title="Request Pending"
                                                name="clock-o"
                                                size='2x'
                                                style={{ "color": "#03a9f4" }} />
                                        </OverlayTrigger>
                                    </span>
                                    :
                                    <Button
                                        className="refier_custom_icon_button"
                                        onClick={() => this.openRequestToJoin()}
                                        style={{ marginLeft: "20px" }}>
                                        <FontAwesome
                                            title="Join Community"
                                            name="plus"
                                            size="2x"
                                            style={{
                                                "cursor": "pointer"
                                            }} />
                                    </Button>
                                }
                        </div>
                    </div>
                    {this.props.newUserForm ?
                        <div className="refier_card_title_white"
                            style={{
                                background: 'rgba(0, 0, 0, 0.7)', 
                                padding: '5px',
                                fontFamily: 'sans-serif',
                                fontSize: '0.9em',
                                position: 'relative'
                            }}>
                            {this.props.communityDetails.fields.description && 
                            this.props.communityDetails.fields.description.length > 60 ?
                                this.props.communityDetails.fields.description.substring(0, 60) + "..." : 
                                this.props.communityDetails.fields.description}
                        </div> :
                        null
                    }
                </div>
            
                <RequestsToJoin 
                    {...this.props}
                    close={this.closeRequestToJoinModal}
                    showModal={this.state.showRequestToJoinModal}
                    communityBasicDataState={pk}/>
            </div>


        return (
            body
        )
    }
}