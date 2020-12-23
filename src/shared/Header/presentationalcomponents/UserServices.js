import React, { Component } from 'react';
import {
  Col, Row, Grid, Image, MenuItem, Dropdown, Tooltip, FormGroup,
  FormControl
} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


class UserServices extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      this.props.fromDropdown ?
        <Link to="/userDashboard/user_service" className="services-popup-list-icons">
          <div className="refnavicon" title="SESSIONS">
            <FontAwesome
              name="star-o"
              className="headerIcon"
            />
          </div>

          <div id="headerNav">
            <p>Sessions</p>
            <div className="custom-list-sub-content" style={{fontSize: '0.8em'}}>
              Check out Sessions to apply
            </div>
          </div>
        </Link> :
        <Link to="/userDashboard/user_service">
          <div className="refnavicon" title="SESSIONS">
            <FontAwesome
              name="star-o"
              className="headerIcon"
            />
          </div>
          <div id="headerNav">
            <p>Sessions</p>
          </div>

        </Link>
    )
  }
}

export default UserServices;