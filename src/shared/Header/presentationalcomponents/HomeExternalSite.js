import React, { Component } from 'react';
import {
  Col, Row, Grid, Image, MenuItem, Dropdown, Tooltip, FormGroup,
  FormControl
} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';
import { URL_TEXT } from '../../../GlobalConstants';

class HomeExternalSite extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Link to="/userDashboard" className="nav-button-container">      
        <div className="refnavicon" title="HOME">
          <FontAwesome
            name="home"
            className="headerIcon"
          />
        </div>
        <div id="headerNav">
          <p>Home</p>
        </div>
      </Link>

    )
  }
}

export default HomeExternalSite;