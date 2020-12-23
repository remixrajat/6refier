import React, { Component } from 'react';
import {
  Col, Row, Grid, Image, MenuItem, Dropdown, Tooltip, FormGroup,
  FormControl
} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';


class SubscriptionPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      this.props.fromDropdown ?
        <Link to="/userDashboard/subscriptions" className="services-popup-list-icons">
          <div className="refnavicon" title="PREMIUM">
            <FontAwesome
              name="bullseye"
              className="headerIcon"
            />
          </div>

          <div id="headerNav">
            <p>Go Premium</p>
            <div className="custom-list-sub-content" style={{fontSize: '0.8em'}}>
              Buy courses available to you
            </div>
          </div>
        </Link> :
        <Link to="/userDashboard/subscriptions">
          <div className="refnavicon" title="PREMIUM">
            <FontAwesome
              name="bullseye"
              className="headerIcon"
            />
          </div>

          <div id="headerNav">
            <p>Go Premium</p>
          </div>
        </Link>
    )
  }
}

export default SubscriptionPage;