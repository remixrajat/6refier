import React, { Component } from 'react';
import {
  Col, Row, Grid, Image, MenuItem, Dropdown, Tooltip, FormGroup,
  FormControl
} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


class RecordedContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let url = this.props.profileFields ? this.props.profileFields.pk : "all"

    return (
      this.props.fromDropdown ?
        <Link to="/userDashboard/vids/all" className="services-popup-list-icons">
          <div className="refnavicon" title="ON DEMAND">
            <FontAwesome
              name="play-circle"
              className="headerIcon"
            />
          </div>
          <div id="headerNav">
            <p>On Demand</p>
            <div className="custom-list-sub-content" style={{fontSize: '0.8em'}}>
              Check out videos tailored to you
            </div>
          </div>
        </Link> :
        <Link to={"/userDashboard/vids/all"}>
          <div className="refnavicon" title="ON DEMAND">
            <FontAwesome
              name="play-circle"
              className="headerIcon"
            />
          </div>
          <div id="headerNav">
            <p>On Demand</p>
          </div>

        </Link>
    )
  }
}

export default RecordedContent;