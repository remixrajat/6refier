import React, { Component } from 'react';
import {
  Col, Row, Grid, Image, MenuItem, Dropdown, Tooltip, FormGroup,
  FormControl
} from 'react-bootstrap';

import { Link, NavLink } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.showSearchBar ?
          <a onClick={this.props.setHideSearchBar} className="nav-button-container">
            <div className="refnavicon" title="Close">
              <FontAwesome
                name="times"
                className="headerIcon"
              />
            </div>
            <div id="headerNav">
              <p>Close</p>
            </div>
          </a>
          :
          <a onClick={this.props.setShowSearchBar} className="nav-button-container">
            <div className="refnavicon" title="SEARCH">
              <FontAwesome
                name="search"
                className="headerIcon"
              />
            </div>
            
            <div id="headerNav">
              <p>Search</p>
            </div>
          </a>
        }
      </div>

    )
  }
}

export default Search;