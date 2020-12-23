import React, { Component } from 'react';
import {
  Col, Row, Grid, Image, MenuItem, Dropdown, Tooltip, FormGroup,
  FormControl, NavDropdown
} from 'react-bootstrap';

import { Link, NavLink } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';

class MoreOptions extends Component {
  constructor(props) {
    super(props);
    this.onSelectMenuItem = this.onSelectMenuItem.bind(this)
  }

  onSelectMenuItem(e) {
    //console.log("Fired Menu Item", e)
    window.location = e
  }

  render() {

    return (
      <a>
        <div className="refnavicon">
          <FontAwesome
            name="more"
            className="headerIcon"
          />
        </div>
        <div id="headerNav">
          <NavDropdown eventKey="1" title="More" id="nav-dropdown">
            <MenuItem eventKey="/userDashboard/blogs/ALL" onSelect={this.onSelectMenuItem}>Blogs</MenuItem>
            <MenuItem eventKey="/userDashboard/user_service/" onSelect={this.onSelectMenuItem}>Sessions</MenuItem>
            <MenuItem eventKey="/logout_user" onSelect={this.onSelectMenuItem}>Logout</MenuItem>
          </NavDropdown>
        </div>

      </a>

    )
  }
}

export default MoreOptions;