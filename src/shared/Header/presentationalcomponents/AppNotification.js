import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { OverlayTrigger, Popover, Button, ListGroup, ListGroupItem, Col, Label } from 'react-bootstrap';

import { isMobileDevice, isSmDevice, isXsDevice } from '../../../GlobalConstants'


class AppNotificationPanel extends Component {

    constructor(props){
        super(props);

        this.markAsReadButton =(<div > 
                                    <Col xs={12} sm={12} style={{padding:"0"}}>
                                        <Button
                                            bsSize="small"
                                            block
                                            onClick={this.props.markAllNotificationsRead}
                                            style={{backgroundColor:"#049cdb"}}>
                                            <span style={{fontWeight: "600", fontSize:"14px",
                                                    color:"white",fontFamily: "Roboto"}}>Mark all as Read</span>
                                        </Button>
                                    </Col>
                                </div>
                            );
    
        this.notification_header = (
            <div>
                 <Label style={{color:"#049cdb", backgroundColor:"transparent"}}>Notifications</Label>
            </div>
        )
        this.state={tempstate : false}
    }

    createNotificationsList(notification , index) {
        let nf ;
        let cssCls;

        if (notification.read) {
            cssCls = "read";
        } else {
            cssCls = "unread";
        }

        let _this = this;
        
        switch (notification.nf_type) {
            case 'addedbyadmin1':
                nf = (
                    <ListGroupItem className={cssCls} key={index} >
                        <a  data-nf-id={ notification.id } 
                            id={"nf-"+ notification.id } 
                            className={"notification refier_text_on_light__3 "}
                            href={notification.obj_url} style={{fontSize:"12px"}}>
                            {notification.target ?
                                (<div>
                                    <a href={notification.actor_url}>{notification.actor_text + " " }</a> 
                                    <span>{notification.verb +  " on    "}</span> 
                                    <a href={ notification.target_url }>{ notification.target_text }</a>
                                </div> )
                                :
                                (<div>
                                    <a href={notification.actor_url}>{notification.actor_text + " "}</a>
                                    <span>{notification.verb}</span>
                                </div>)
                            }
                            <span className="timesince">{notification.created} ago</span>
                        </a>
                    </ListGroupItem>);
                break;

            case 'applied_for_event1':
                break;

            case 'eventappstatusupdate000':
                break;

            case 'ADD_OR_UPDATE_POST':
                nf = (
                    <ListGroupItem className={cssCls} key={index}>
                        <a  data-nf-id={ notification.id } 
                            id={"nf-"+ notification.id } 
                            className={"notification refier_text_on_light__3 "}
                            href={notification.obj_url}  style={{fontSize:"12px"}}>
                            {notification.target ?
                                (<div className={cssCls}>
                                    <a href={notification.actor_url}>{notification.actor_text+" "}</a> 
                                    <span>{notification.verb +  " on "}</span> 
                                    <a href={ notification.target_url }>{ notification.target_text }</a>
                                </div>
                                )
                            :
                                (<div className={cssCls}>
                                    <a href={notification.actor_url}>{notification.actor_text + " "}</a>
                                    <span>{notification.verb}</span>
                                </div>)
                            }
                            <span className="timesince">{notification.created} ago</span>
                        </a>
                    </ListGroupItem>);
                break;

            default:
                nf = (
                    <ListGroupItem className={cssCls} key={index} >
                        <a  data-nf-id={ notification.id } 
                            id={"nf-"+ notification.id } 
                            className={"notification refier_text_on_light__3 "}
                            href={notification.obj_url} style={{fontSize:"12px"}}>
                            {notification.target ?
                                (<div className={cssCls}>
                                    <a href={notification.actor_url}>{notification.actor_text+" "}</a> 
                                        <span>{notification.verb +  " on "}</span> 
                                    <a href={ notification.target_url }>{ notification.target_text }</a>
                                </div> )
                                :
                                (<div className={cssCls}>
                                    {
                                        notification.actor_url ?
                                            <a href={notification.actor_url}>{notification.actor_text + " "}</a> :
                                            null
                                    }
                                    <span>{notification.verb}</span>
                                </div>)
                            }
                            <span className="timesince">{notification.created} ago</span>
                        </a>
                    </ListGroupItem>);
            break;
        }
        //console.log("AppNotificationPanel :: ",notification , nf , index);
        return nf;
    }

    render() {

        let lists = [];
        let _createNotificationsList = this.createNotificationsList.bind(this);

        if(this.props.popupData && this.props.popupData.notifications) {          
            lists = this.props.popupData.notifications.map((nf, i) => {
                    return _createNotificationsList(nf,i);
            });     
        } else {
            lists = [
                (
                    <p key={1} style={{textAlign:"center", margin:"10px 10px"}}>No Notification for you</p>
                )
            ]
        }

        if (!this.props.issmallscreen) {
            return (
                <OverlayTrigger trigger="click" placement="bottom" rootClose 
                    overlay={
                        <Popover id="notification-popup" title={this.notification_header}  style={{minWidth:"430px", top:"50px"}}>
                            <ListGroup style={{overflow:"auto", maxHeight:"430px", marginBottom: "0px"}} id="notification-pop">
                                {lists}
                            </ListGroup>
                            {this.markAsReadButton}
                        </Popover>
                        }
                >
                    <div title="NOTIFICATIONS" className="nav-button-container">
                    {this.props.popupData && 
                        this.props.popupData.notifications && 
                        this.props.popupData.notifications.length > 0 ?
                        <div className="refnavicon" >
                            <FontAwesome
                                name="bell-o"
                                size='2x'
                                className="headerIcon"
                            />
                            <span className="custom-badge"
                                style={{
                                    "position": "relative",
                                    "top": "-10px",
                                    "right": "10px"
                                }}
                            >
                                {this.props.popupData && 
                                    this.props.popupData.notifications && 
                                    this.props.popupData.notifications.length > 0 ? 
                                        this.props.popupData.unread_count : 0
                                }
                            </span>
                        </div>
                        : null
                    }
                    {!(isMobileDevice() || isSmDevice() || isXsDevice()) ?
                        <div id="headerNav" style={this.props.popupData && 
                            this.props.popupData.notifications && 
                            this.props.popupData.notifications.length > 0 ? 
                                {"marginLeft": "-7px"} : {}}>
                            <p>Notifications</p>
                        </div> :
                        null
                    }
                    </div>
                </OverlayTrigger>
            )
        } else {
            return (
                <div style={{position:'relative'}}>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={
                        <Popover id="notification-popup" title={this.notification_header}>
                            <ul class="list-group">
                                {lists}
                            </ul>
                            {this.markAsReadButton}
                        </Popover>}
                    >

                        <div className="refnavicon headerIconBox">
                            <FontAwesome
                                name="bell-o"
                                className="headerIcon"
                            />

                            <span className="custom-badge"
                                style={{
                                    "position": "relative", "top": "-30px",
                                    "right": "-5px", "height": "60%", "width": "60%",
                                    "padding": "0px", "backgroundColor": "#F89212red !important"
                                }}>
                                <span style={{ "font-size": "10px", "text-align": "center" }}>
                                    {this.props.popupData ? this.props.popupData.length : 0}
                                </span>
                            </span>
                        </div>
                    </OverlayTrigger>
                </div>
            )
        }
    }
}

export default AppNotificationPanel;