import React, { Component } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Logout from './Logout';
import avatar from './img/avatardp.png';
import { URL_TEXT, MEDIA_URL_TEXT } from '../../../GlobalConstants';

class AppUserAvatar extends Component {
    constructor(props) {
        super(props);
        this.onServiceClick = this.onServiceClick.bind(this)
    }
    
    onServiceClick() {
        this.refs.overlay.hide();   
    }

    render() {
        let displaypicurl;
        if (this.props.profileFields && this.props.profileFields.profile_photo) {
            displaypicurl = MEDIA_URL_TEXT + this.props.profileFields.profile_photo;
        } else {
            displaypicurl = avatar;
        }
        
        let userfullname = "";
        if (this.props.profileFields) {
            if (this.props.profileFields.last_name && this.props.profileFields.last_name != "None" &&
                this.props.profileFields.last_name != "Null")
                userfullname = this.props.profileFields.first_name + " " + this.props.profileFields.last_name;
            else
                userfullname = this.props.profileFields.first_name;
        }

        // console.log("UserDisplayPic", displaypicurl, this.props.profileFields);

        let url = this.props.profileFields && this.props.profileFields.pk ? this.props.profileFields.pk : ""

        let popover =   <Popover id="user-profile-popup" style={{minWidth:"150px", top:"50px"}}>
                            <ul style={{overflow:"auto",maxHeight:"430px", marginBottom: "0px"}} id="user-profile-popup-list">
                                <li onClick={() => this.onServiceClick()}>
                                    <Link to={"/userDashboard/profile/" + url}>
                                        <span style={{"marginRight": "10px"}}>
                                            <img src={displaypicurl}  className="refnaviconimg"/>
                                        </span>
                                        <span>Profile</span>
                                    </Link>
                                </li>
                                <li onClick={() => this.onServiceClick()}>
                                    <Link to={ "/userDashboard/myLearnings/"}>
                                        <span style={{"marginRight": "20px"}}>
                                            <FontAwesome
                                                name="paper-plane"
                                                style={{fontSize: "20px"}}
                                            />
                                        </span>
                                        <span>My Learnings</span>
                                    </Link>
                                </li>
                                <li onClick={() => this.onServiceClick()}>
                                    <Link to={ "/userDashboard/viewOrders/"}>
                                        <span style={{"marginRight": "20px"}}>
                                            <FontAwesome
                                                name="shopping-cart"
                                                style={{fontSize: "20px"}}
                                            />
                                        </span>
                                        <span>My Orders</span>
                                    </Link>
                                </li>
                                <li onClick={() => this.onServiceClick()}>
                                    <Link to={{ pathname: "/userDashboard/profile/" + url, state: { tabNum: 3} }}>
                                        <span style={{"marginRight": "20px"}}>
                                            <FontAwesome
                                                name="feed"
                                                style={{fontSize: "25px"}}
                                            />
                                        </span>
                                        <span>Blogs I Liked</span>
                                    </Link>
                                </li>
                                <li onClick={() => this.onServiceClick()}>
                                    <Link to={{ pathname: "/userDashboard/profile/" + url, state: { tabNum: 4} }}>
                                        <span style={{"marginRight": "20px"}}>
                                            <FontAwesome
                                                name="pencil-square-o"
                                                style={{fontSize: "20px"}}
                                            />
                                        </span>
                                        <span>Questions I Answered</span>
                                    </Link>
                                </li>
                                <li onClick={() => this.onServiceClick()}>
                                    <Logout fromUserAvatar={true} />
                                </li>
                            </ul>
                        </Popover>

        return (
            <OverlayTrigger trigger="click" placement="bottom" overlay={ popover } rootClose ref="overlay">
                <div>
                    
                    {/* <span id="headerNav" style={{color:"#000000"}}>
                    {userfullname}
                    </span> */}
                    <span style={{"display": "block", "padding": "15px"}}>
                        <img src={displaypicurl}  className="refnaviconimg"/>
                        <span className="caret" style={{"position": "relative", "top": "3px", "left": "2px"}}></span>
                    </span>
                    
                </div>
            </OverlayTrigger>
        );
    }
}

export default AppUserAvatar;