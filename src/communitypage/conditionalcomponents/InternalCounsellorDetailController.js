import React, { Component } from 'react';
import {
  Form, Col, ControlLabel, FormGroup, FormControl,
  Button, Grid, DropdownButton, InputGroup, MenuItem, SplitButton, Glyphicon, Row
} from 'react-bootstrap';
import CommonModal from '../../shared/CommonModal';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree';
import InternalCounsellorDetail from 
        '../../communitypage/presentationalcomponents/CommunityProfile/InternalCounsellorDetail';


class InternalCounsellorDetailController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.alreadyCounsellors,
    };
    
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.alreadyCounsellors != nextProps.alreadyCounsellors)
    {
      this.setState({
        checked: nextProps.alreadyCounsellors||[]
      })
    }
  }

  render() {

    return (
      <InternalCounsellorDetail {...this.props}/>
    )
  }
}
export default InternalCounsellorDetailController;