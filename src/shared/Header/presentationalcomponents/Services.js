import React, { Component } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import Blogs from './Blogs';
import SubscriptionPage from './SubscriptionPage';
import UserServices from './UserServices';
import RecordedContent from './RecordedContent';


class Services extends Component {
  constructor(props) {
    super(props);
    this.onServiceClick = this.onServiceClick.bind(this);
    this.openPopover = this.openPopover.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.highlight === 'services' && nextProps === 'none')
        this.refs.overlay.hide();   
  }

  onServiceClick() {
    this.refs.overlay.hide();   
  }

  openPopover() {
      this.refs.overlay.show();
  }

  render() {
      
    let popover = <Popover 
                    id="services-popup" 
                    style={this.props.highlight === 'services' ? 
                            {minWidth:"350px", top:"50px", zIndex: '10000'} : 
                            {minWidth:"350px", top:"50px"}}>
                    <ul style={{overflow:"auto",maxHeight:"430px", marginBottom: "0px"}} 
                        id="services-popup-list">
                        {
                            this.props.profileFields?
                                this.props.profileFields.is_mentor ?
                                    null:
                                    <li onClick={() => this.onServiceClick()}>
                                        <SubscriptionPage  {...this.props} fromDropdown={true} />
                                    </li>
                                :
                                null 
                        }
                        {/* <li onClick={() => this.onServiceClick()}>
                            <RecordedContent   {...this.props} fromDropdown={true} />
                        </li> */}
                        <li onClick={() => this.onServiceClick()}>
                            <UserServices fromDropdown={true} />
                        </li>
                        <li onClick={() => this.onServiceClick()} style={{marginBottom: '10px'}}>
                            <Blogs fromDropdown={true} />
                        </li>
                    </ul>
                </Popover>

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={ popover } rootClose ref="overlay">
            <div title="Services" className="nav-button-container">
                <div className="refnavicon">
                <FontAwesome
                    name="bolt"
                    className="headerIcon"
                />
                </div>
                <div id="headerNav" style={{"display": "flex", "alignItems": "center"}}>
                    <p>Services</p>
                    <span className="caret" style={{"position": "relative", "top": "3px", "left": "2px"}}></span>
                </div>
                {this.props.highlight === 'services' ? this.openPopover() : null}
            </div>
        </OverlayTrigger>
    )
  }
}

export default Services;