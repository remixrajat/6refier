import React, { Component } from 'react';
import {
  Col, Row, Grid, Image, MenuItem, Dropdown, Tooltip, FormGroup,
  FormControl
} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


class Blogs extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      this.props.fromDropdown ?
        <Link to="/userDashboard/blog/read/" className="services-popup-list-icons">
          <div className="refnavicon" title="BLOG">
            <FontAwesome
              name="pencil-square-o"
              className="headerIcon"
            />
          </div>

          <div id="headerNav">
            <p>Blogs</p>
            <div className="custom-list-sub-content" style={{fontSize: '0.8em'}}>
              Blogs shared with you
            </div>
          </div>
        </Link> :
        <Link to="/userDashboard/blog/read/">
          <div className="refnavicon" title="BLOG">
            <FontAwesome
              name="pencil-square-o"
              className="headerIcon"
            />
          </div>

          <div id="headerNav">
            <p>Blogs</p>
          </div>
        </Link>
    )
  }
}

export default Blogs;