import React, { Component } from 'react';
import { Col, Row, Grid, Image, Glyphicon } from 'react-bootstrap';
import logo from './img/logo.png';
import logo_small from './img/logo_small.png';
import FontAwesome from 'react-fontawesome';
import logo_dark from './img/logo_black.png'


class AppLogo extends Component {
    render() {
        if (this.props.issmallscreen) {
            return (
                <div class="headericon-bars">
                    <Col xs={12} style={{paddingLeft: "0px"}} class="headericon-bars">
                        <a onClick={this.props.changeSideNavHiddenState}>
                            <div className="refnavicon-small headericon-bars">
                                <FontAwesome
                                    name="bars"
                                    className="headerIcon headericon-bars"
                                />
                            </div>
                        </a>
                    </Col>
                </div>

            );
        } else {
            return (
                <div>
                    <a href={this.props.href}>
                        <Image responsive id=""
                            // src={logo}
                            src={logo_dark}
                            className="custom_logo"
                            title={this.props.title}
                        /></a>
                </div>
            );
        }


    }
}

export default AppLogo;