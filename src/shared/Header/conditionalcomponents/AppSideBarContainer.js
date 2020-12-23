import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Col, Grid} from 'react-bootstrap';

import AppSideBarNav from '../presentationalcomponents/AppSideBarNav';

import AppLogo from '../presentationalcomponents/AppLogo';
import UserDisplayPic from '../presentationalcomponents/AppUserDisplayPic';


class AppSideBar extends Component {
    constructor(props) {
        super(props);
        
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            // console.log('event.target:: here::  ', event.target)
            const className = event.target.className;
            const classList = className.split(" ");

            let containsBars = false
            for(let elemClass of classList) {
                if(elemClass === 'headericon-bars') {
                    containsBars = true;
                    break;
                }
            }

            if(!containsBars)
                this.props.closeSideNav();
        }
    }

    render() {
        return (
            <div id="u28" ref={this.setWrapperRef}>
                <div id="u28_div" className="sidebar-background" onClick={this.props.changeSideNavHiddenState}>
                    <Col xsHidden smHidden>
                        <AppLogo issmallscreen={true} 
                            changeSideNavHiddenState={this.props.changeSideNavHiddenState} />
                    </Col>
                    <UserDisplayPic profileFields={this.props.profileFields}/>
                    <AppSideBarNav communityList={this.props.communityListState} 
                                profileFields={this.props.profileFields}/>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (store) => {
    return {
        communityListState : store.appDataReducer.communityListStateMemberOnly,
        profileFields : store.userProfileReducer.profileFields
    }
}

export default connect(mapStateToProps)(AppSideBar) ;


