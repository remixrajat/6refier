import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {URL_TEXT, MEDIA_URL_TEXT} from '../../../GlobalConstants'

import avatar from './img/avatardp.png'


const UserDisplayPic = (props) => {
    let displaypicurl;

    if(props.profileFields) {
        displaypicurl = MEDIA_URL_TEXT + props.profileFields.profile_photo;
    } else {
        displaypicurl = avatar;
    }

    let userfullname = "";

    if(props.profileFields) {
        if(props.profileFields.last_name && props.profileFields.last_name!= "None" && 
                props.profileFields.last_name!="Null")
            userfullname = props.profileFields.first_name + " " + props.profileFields.last_name;
        else
            userfullname = props.profileFields.first_name;
    }    

    return (
        <div>
            <div className="ax_default " 
                style={{ borderWidth: "1px", borderStyle: "solid", height: "100px", width: "100px", margin: "20px auto" }} >
                <Link to="/userDashboard/profile/self">
                    <Image responsive className="img e" src={displaypicurl} thumbnail/>
                </Link> 
            </div>
            <div style={{ "transformOrigin": "21.5px 8px 0px" }}>
                <Link to="/userDashboard/profile/self">
                    <p style={{ "fontSize": "18px", "textAlign": "center" }}>
                        <span className="user-fullname">{userfullname}</span>
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default UserDisplayPic;