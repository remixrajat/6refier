import React, { Component } from 'react';
import { Col, Grid, NavItem, Nav, Navbar, FormControl } from 'react-bootstrap';

import AppUserAvatar from './AppUserAvatar';
import Search from './Search';
import Communities from './Communities';
import Services from './Services';
import AppSideBar from '../conditionalcomponents/AppSideBarContainer';
import AppLogo from './AppLogo';
import QueryContainer from '../conditionalcomponents/QueryContainer'
import NotificationController from '../conditionalcomponents/NotificationController.js'
import MyCalendarMobile from '../conditionalcomponents/MyCalendarMobile.js'
import HomeExternalSite from './HomeExternalSite';
import RefierCartController from '../conditionalcomponents/RefierCartController';

import { URL_TEXT, isMobileDevice, isXsDevice, isSmDevice, isMdDevice, isLgDevice } from '../../../GlobalConstants';


class AppHeader extends Component {
    constructor(props) {
        super(props)
        this.intervalFunc = null
        this.state = {
            isLightOff: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.switchLightOff !== undefined && nextProps.switchLightOff && !this.state.isLightOff) {
            this.switchLightOff()        
        } else if (nextProps.switchLightOff !== undefined && !nextProps.switchLightOff && this.state.isLightOff) {
            this.switchLightOn()
        }
    }

    switchLightOff() {
        // this.props.dispatch({ type: 'SWITCH_LIGHT_OFF', data: true })
        let elem = document.querySelector('.appheader-wrap')
        let elem2 = document.querySelector('.refheader .container-fluid')
        let i = 0;

        this.setState({isLightOff: true}, () => {
            this.intervalFunc = window.setInterval(() => {
                if(i <= 0.6) {
                    i = i + 0.01
                    elem.style.background = `rgba(0, 0, 0, ${i})`
                    elem2.style.background = `rgba(0, 0, 0, ${i})`
                } else {
                    clearInterval(this.intervalFunc)
                    this.intervalFunc = null
                }
            }, 50)
        })
    }

    switchLightOn() {
        // this.props.dispatch({ type: 'SWITCH_LIGHT_OFF', data: false })
        let elem = document.querySelector('.appheader-wrap')
        let elem2 = document.querySelector('.refheader .container-fluid')
        let i = 0.6;

        this.setState({isLightOff: false}, () => {
            this.intervalFunc = window.setInterval(() => {
                if(i >= 0) {
                    i = i - 0.01
                    elem.style.background = `rgba(0, 0, 0, ${i})`
                    elem2.style.background = `rgba(0, 0, 0, ${i})`
                } else {
                    clearInterval(this.intervalFunc)
                    this.intervalFunc = null
                }
            }, 50)
        })
    }

    render() {
        return (
            <div className="appheader-wrap">
                <Navbar fluid style={{ borderRadius: '0px' , padding: 'auto 0px', margin: "0px 0px"}} 
                        className="refheader" fixedTop>
                    <Grid className="appheader-wrap-navbar" fluid style={{ padding:'0px', verticalAlign: 'bottom'}}>
                        {/* <Col xs={this.props.showSearchBar ? 3 : 5} mdHidden lgHidden>    */}
                        {
                            isMobileDevice() || isXsDevice() || isSmDevice() ?
                                <Col xs={2} mdHidden lgHidden>   
                                    <AppLogo href={URL_TEXT} title="www.refier.com/" 
                                        issmallscreen={true} 
                                        changeSideNavHiddenState={this.props.changeSideNavHiddenState}
                                    />
                                </Col> :
                                <Col xsHidden smHidden md={3} lgOffset={1} lg={2} 
                                    style={{padding: 0, textAlign: "left"}}>   
                                    <AppLogo href={URL_TEXT} title="www.refier.com/" 
                                        issmallscreen={false} 
                                        changeSideNavHiddenState={this.props.changeSideNavHiddenState}
                                    />
                                </Col>
                        }


                        {/************** SearchBar *****************/}
                        {this.props.showSearchBar && isSmDevice() ?
                            <Col xsHidden sm={7} mdHidden lgHidden>
                                <Nav justified>
                                    <Navbar.Form style={{padding: "15px 0px", margin: "0em 0em",
                                            borderColor: "transparent"}}>
                                        <QueryContainer userId={this.props.profileFields.pk}/>
                                    </Navbar.Form>
                                </Nav>
                            </Col>
                            :
                            <Col xsHidden sm={0} mdHidden lgHidden/>       
                        }
                        {this.props.showSearchBar && (isMdDevice() || isLgDevice()) ?
                            <Col xsHidden smHidden md={8} lg={7}>
                                <Nav justified>
                                    <Navbar.Form style={{padding: "15px 0px", margin: "0em 0em",
                                            borderColor: "transparent"}}>
                                        <QueryContainer userId={this.props.profileFields.pk}/>
                                    </Navbar.Form>
                                </Nav>
                            </Col>
                            :
                            <Col xsHidden smHidden md={0}/>       
                        }
                        {this.props.showSearchBar && (isMobileDevice() || isXsDevice()) ?
                            <Col xs={7} smHidden mdHidden lgHidden>
                                <Nav justified>
                                    <Navbar.Form style={{padding: "15px 0px", margin: "0em 0em",
                                            borderColor: "transparent"}}>
                                        <QueryContainer userId={this.props.profileFields.pk}/>
                                    </Navbar.Form>
                                </Nav>
                            </Col>
                            :
                            <Col xs={0} smHidden mdHidden lgHidden/>       
                        }

                        {/************** Right Nav Bar *****************/}

                        {!this.props.showSearchBar && (isMdDevice() || isLgDevice()) ?
                            <Col xsHidden smHidden md={9} lg={8} style={{textAlign: "right"}}>
                                <Nav 
                                    className="refier-navigation"
                                    navbar 
                                    pullRight 
                                    activeKey={this.props.currentTab} 
                                    style={{height:"60px"}} 
                                    onSelect={this.props.handleTabSelect}>
                                    
                                    <NavItem eventKey={1}>
                                        <HomeExternalSite />
                                    </NavItem>
                                    <NavItem eventKey={2} href="#">
                                        <Communities {...this.props} />
                                    </NavItem>
                                    <NavItem eventKey={3} href="#">
                                        <Services {...this.props} />
                                    </NavItem>
                                    <NavItem eventKey={4} href="#">
                                        <NotificationController/>
                                    </NavItem>
                                    <NavItem eventKey={5} href="#">
                                        <Search {...this.props}/>
                                    </NavItem>
                                    <NavItem eventKey={6} href="#">
                                        <RefierCartController />
                                    </NavItem>
                                    <NavItem eventKey={7}>
                                        <AppUserAvatar {...this.props}/>
                                    </NavItem>
                                    
                                </Nav>
                            </Col>
                            :
                            <Col xsHidden smHidden md={1}>
                                <Nav navbar pullRight>
                                    <NavItem eventKey={1} href="#"  style={{width:"100%"}}>
                                        <Search {...this.props}/>
                                    </NavItem>
                                </Nav>
                            </Col>
                        }
                        {!this.props.showSearchBar && isSmDevice() ?
                            <Col xsHidden mdHidden lgHidden sm={10} style={{textAlign: "right"}}>
                                <Nav navbar pullRight style={{display: 'flex', alignItems: 'center'}}>
                                    <NavItem eventKey={1} href="#">
                                        <AppUserAvatar issmallscreen={false} {...this.props}/>
                                    </NavItem>
                                    <NavItem eventKey={2} href="#">
                                        <NotificationController issmallscreen={false}/>
                                    </NavItem>
                                    {/* <NavItem eventKey={6} href="#">
                                        <Logout  />
                                    </NavItem> */}
                                    {/* <NavItem eventKey={3} href="#">
                                        <Search {...this.props}/>
                                    </NavItem> */}
                                    <NavItem eventKey={5} href="#">
                                        <MyCalendarMobile />
                                    </NavItem>
                                </Nav>
                            </Col>
                            :
                            <Col xsHidden sm={2} mdHidden lgHidden>
                                <Nav navbar pullRight>
                                    <NavItem eventKey={1} href="#"  style={{width: "100%"}}>
                                        <Search {...this.props}/>
                                    </NavItem>
                                </Nav>
                            </Col>
                        }
                        {!this.props.showSearchBar && (isMobileDevice() || isXsDevice()) ?
                            <Col xs={10} smHidden mdHidden lgHidden 
                                style={{textAlign: "right", paddingRight: '0'}}>
                                <Nav navbar pullRight style={{display: 'flex'}}>
                                    <NavItem eventKey={1} href="#">
                                        <NotificationController issmallscreen={false}/>
                                    </NavItem>
                                    <NavItem eventKey={2} href="#">
                                        <RefierCartController />
                                    </NavItem>
                                    <NavItem eventKey={5} href="#">
                                        <MyCalendarMobile />
                                    </NavItem>
                                </Nav>
                            </Col>
                            :
                            <Col xs={2} smHidden mdHidden lgHidden>
                                <Nav navbar pullRight>
                                    <NavItem eventKey={1} href="#"  style={{width: "100%"}}>
                                        <Search {...this.props}/>
                                    </NavItem>
                                </Nav>
                            </Col>
                        }
                        
                    </Grid>
                </Navbar>
                    
                {isMobileDevice() || isXsDevice() || isSmDevice() ?
                    <div className="side-bar-style">
                        <Col xsHidden={this.props.xsHiddenSideNav} smHidden={this.props.xsHiddenSideNav} 
                                    mdHidden lgHidden
                            style={{paddingLeft: 0, marginLeft: 0, backgroundColor: "#f8f8f8"}}>
                            <AppSideBar {...this.props} />
                        </Col>
                    </div> :
                    null
                }
                    
            </div>
        );
    }
}

export default AppHeader;