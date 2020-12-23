import React, { Component } from 'react';
import {
  Col, Row, Grid, Image, MenuItem, Dropdown, Tooltip, FormGroup,
  FormControl
} from 'react-bootstrap';

import { Link, NavLink } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logoutuser = this.logoutuser.bind(this);

  }

  logoutuser(e) {
    // e.preventDefault();
    if (window.signoutuser) {
      window.signoutuser();
    }
    window.location = "/logoutUser/";
  }

  render() {
    let style;
    if(this.props.fromUserAvatar) {
      style = {
        "fontSize": "1.4em"
      }
    }

    return (
      <a title="LOGOUT" onClick={this.logoutuser} className={this.props.fromUserAvatar ? "logout-container" : ""}>
        <div className="refnavicon" style={{"marginRight": "18px"}}>
          <FontAwesome
            name="power-off"
            style={style}
          />
        </div>
        <div id="headerNav" style={{"fontSize": "1.1em"}}>
          <p>Logout</p>
        </div>

      </a>

    )
  }
}

export default Logout;