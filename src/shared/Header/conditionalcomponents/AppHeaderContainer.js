import React from 'react';
import AppHeader from '../presentationalcomponents/AppHeader';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getCommunityList, getCommunityListMemberOnly, getApplicationConfig } from './action';
import { addToCart, getCartItems } from '../../../paymentPage/conditionalComponents/action';
import IntroFormNew from '../../../profilepage/conditionalcomponents/IntroFormNew';


class AppHeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xsHiddenSideNav: true,
            showSearchBar: false,
            currentTab: 1
        };

        this.changeSideNavHiddenState = this.changeSideNavHiddenState.bind(this);
        this.setShowSearchBar = this.setShowSearchBar.bind(this)
        this.setHideSearchBar = this.setHideSearchBar.bind(this)
        this.currentlyActiveNavTab = this.currentlyActiveNavTab.bind(this)
        this.handleTabSelect = this.handleTabSelect.bind(this);
        this.addSessionToCart = this.addSessionToCart.bind(this);
        this.closeSideNav = this.closeSideNav.bind(this);
    }

    changeSideNavHiddenState() {
        this.setState((prevState) => ({ xsHiddenSideNav: !(prevState.xsHiddenSideNav) }))
    }

    closeSideNav() {
        this.setState({ xsHiddenSideNav: true })
    }

    setShowSearchBar() {
        this.setState({ showSearchBar: true })
    }

    setHideSearchBar() {
        this.setState({ showSearchBar: false })
    }

    currentlyActiveNavTab() {
        let pathname = window.location.pathname.trim();
        let currentTab = pathname.split("/");
        let currentTabIndex = 1;

        if (currentTab.length < 2 
            || (currentTab.length === 2 && currentTab[0] === "")
            || (currentTab.length >= 2 && currentTab[2] === "")) {
            currentTabIndex = 1;
        } else if (currentTab[2] === 'community') {
            currentTabIndex = 2;
        } else if (currentTab[2] === 'profile') {
            currentTabIndex = 7;
        } else if (currentTab[2] === 'viewcart') {
            currentTabIndex = 6;
        } else {
            currentTabIndex = 3;
        }

        // else if(currentTab[2] === 'vids'|| 
        //             currentTab[2] === 'user_service'|| 
        //             currentTab[2] === 'blog' ||
        //             currentTab[2] === 'subscriptions' ){
        // }

        if (this.state.currentTab !== currentTabIndex) {
            // console.log("currentlyActiveNavTab :: ", currentTabIndex, currentTab);
            this.setState({ currentTab: currentTabIndex });
        }
    }

    handleTabSelect(tabNum) {
        this.setState({
            currentTab: tabNum
        });
    }

    componentWillMount() {
        this.currentlyActiveNavTab();
        // window.onclick = this.currentlyActiveNavTab;
        // this.props.dispatch(getCommunityList());
        // this.props.dispatch(getCommunityListMemberOnly());
        this.props.dispatch(getApplicationConfig())
        this.addSessionToCart();

        this.hasItemsInCart = this.props.cartItems 
                                ? this.props.cartItems.length === 0 
                                    ? false 
                                    : true
                                : false

        let storageHasItemsInCart = localStorage.getItem("hasItemsInCart")

        if(storageHasItemsInCart && storageHasItemsInCart === 'false')
            this.hasItemsInCart = false

        if(this.hasItemsInCart) {
            this.props.dispatch({type: 'highlightCart', data: 'cart_nav'})
            localStorage.setItem('hasItemsInCart', "true")
        }
    }

    addSessionToCart(credits, packageValidityMappingId) {
        let keys = Object.keys(localStorage),
        i = keys.length;

        while ( i-- && keys[i] !== 'hasItemsInCart' ) {
            // values.push( localStorage.getItem(keys[i]) );
            // console.log("LocalStorage ",keys[i],localStorage.getItem(keys[i]) )
            try {
                let product_detail =  JSON.parse(localStorage.getItem(keys[i]))
                let product = {
                    amount: product_detail.product_cost,
                    product_id: keys[i],
                    product_type: product_detail.product_type
                }
                this.props.dispatch(addToCart(product));
                window.localStorage.removeItem(keys[i])
            } catch(e) {
                console.warn('localstore:: ', e)
            }
        } 
        this.props.dispatch(getCartItems());       
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.switchLightOff !== undefined) {
            if(this.state.currentTab !== 0) {
                this.setState({ currentTab: 0 });
            }
        } else {
            this.currentlyActiveNavTab();
        }
    }

    render() {
        // console.log("Header :: profileFields", this.props)
        
        if(this.props.isWebView) {
            return null;
        }

        let isCurrentPageIntroForm = window.location.href.indexOf("getting") > -1 
                                        ? true 
                                        : false

        if(!isCurrentPageIntroForm && 
            !this.hasItemsInCart && this.props.profileFields && 
            !this.props.profileFields.isInitialSetupComplete) {
                return ( <Redirect to={{
                    pathname: "/userDashboard/getting-to-know-you",
                    state: { redirectUrl: window.location.href }
                }} /> )
        }
        

        return (
            <AppHeader
                className="header"
                highlight={this.props.highlight}
                changeSideNavHiddenState={this.changeSideNavHiddenState}
                closeSideNav={this.closeSideNav}
                xsHiddenSideNav={this.state.xsHiddenSideNav}
                setShowSearchBar={this.setShowSearchBar}
                setHideSearchBar={this.setHideSearchBar}
                showSearchBar={this.state.showSearchBar}
                profileFields={this.props.profileFields}
                currentTab={this.state.currentTab}
                handleTabSelect={this.handleTabSelect}
                switchLightOff={this.props.switchLightOff}
                communityList={this.props.communityListState} />
        );
    }
}

let mapStateToProps = (store) => {
    return {
        communityListState: store.appDataReducer.communityListStateMemberOnly,
        profileFields: store.userProfileReducer.profileFields,
        highlight: store.stylesDataReducer.highlight,
        switchLightOff: store.webinarPageReducer.switchLightOff,
    }
}

export default connect(mapStateToProps)(AppHeaderContainer);
