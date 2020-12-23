import React, { Component } from 'react';
import homeIcon from './img/home_icon_u92.png';
import blogIcon from './img/blogs_shape_u130_c.png';
import communityIcon from './img/community_icon_u99.png';
import questionsIcon from './img/question_shape_u121.png';
import profileIcon from './img/profile_icon_u98.png';
import miniseperator from './img/separator_between_communities.png'
import { Image, Media } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';


class AppSideBarNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "list": [{ "icon": "home", "label": "Home", "height": 20, "width": 27, "link": "/userDashboard" },
            { "icon": "shopping-cart", "label": "My Orders", "height": 20, "width": 22, "link": "/userDashboard/viewOrders/" },
            // { "icon": "play-circle", "label": "On Demand", "height": 20, "width": 20, "link": "/userDashboard/vids/all" },
            { "icon": "star-o", "label": "Sessions", "height": 20, "width": 22, "link": "/userDashboard/user_service" },
            { "icon": "file-text-o", "label": "Blogs", "height": 20, "width": 18, "link": "/userDashboard/blog/read/" },
            { "icon": "users", "label": "Communities", "height": 20, "width": 22, "link": "#" }
            ],
            "mappedList": [],
            "selectedTab": window.location.pathname
        }

        this.setUserState = this.setUserState.bind(this)
        this.setMentorState = this.setMentorState.bind(this)
    }

    setUserState() {
        this.setState({
            "list": [{ "icon": "home", "label": "Home", "height": 20, "width": 27, "link": "/userDashboard" },
            { "icon": "shopping-cart", "label": "My Orders", "height": 20, "width": 22, "link": "/userDashboard/viewOrders/" },
            { "icon": "bullseye", "label": "Go Premium", "height": 20, "width": 20, "link": "/userDashboard/subscriptions" },
            // { "icon": "play-circle", "label": "Learn", "height": 20, "width": 20, "link": "/userDashboard/vids/all" },
            { "icon": "star-o", "label": "Sessions", "height": 20, "width": 22, "link": "/userDashboard/user_service" },
            { "icon": "file-text-o", "label": "Blogs", "height": 20, "width": 18, "link": "/userDashboard/blog/read/" },
            { "icon": "users", "label": "Communities", "height": 20, "width": 22, "link": "#" },
            { "icon": "power-off", "label": "Logout", "height": 20, "width": 22, "link": "/logoutUser/" }
            ],
        })
    }

    setMentorState(){
        this.setState({
            "list": [{ "icon": "home", "label": "Home", "height": 20, "width": 27, "link": "/userDashboard" },
            // { "icon": "play-circle", "label": "Learn", "height": 20, "width": 20, "link": "/userDashboard/vids/all" },
            { "icon": "star-o", "label": "Sessions", "height": 20, "width": 22, "link": "/userDashboard/user_service" },
            { "icon": "file-text-o", "label": "Blogs", "height": 20, "width": 18, "link": "/userDashboard/blog/read/" },
            { "icon": "users", "label": "Communities", "height": 20, "width": 22, "link": "#" },
            { "icon": "power-off", "label": "Logout", "height": 20, "width": 22, "link": "/logoutUser/" }
            ],
        })
    }

    componentDidMount() {
        if (this.props.profileFields) {
            let url ="all"
            let sideNavState = this.state.list
            sideNavState[1].link = "/userDashboard/vids/" + url
            this.setState({ list: sideNavState })
            if(this.props.profileFields.is_mentor){
                this.setMentorState()
            }
            else{
                this.setUserState()
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.profileFields && nextProps.profileFields) {
            let url = "all"
            let sideNavState = this.state.list
            sideNavState[1].link = "/userDashboard/vids/" + url
            this.setState({ list: sideNavState })
            if(nextProps.profileFields.is_mentor){
                this.setMentorState()
            }
            else{
                this.setUserState()
            }
        }
    }

    isActive(value) {
        return 'list-group-item sidebar-nav ' + ((value === this.state.selectedTab) ? 'sidebar-nav-active' : '');
    }

    isActiveText(value) {
        return 'sidebar-nav-text ' + ((value === this.state.selectedTab) ? 'sidebar-nav-text-active' : '');
    }

    isActiveCommunityText(value) {
        return 'community-list ' + ((value === this.state.selectedTab) ? 'community-list-active' : '');
    }

    setSelectedTab(tab) {
        //console.log("setSelectedTab::", tab);
        this.setState({ selectedTab: tab });
    }

    setList(newList) {
        //console.log("new list::", newList);
        this.setState({ mappedList: newList });
    }


    render() {
        let communityNavlist = null
        if (this.props.communityList) {
            //console.log("headerBlah", this.props)
            communityNavlist = this.props.communityList.map((communityObject,i) => {
                //console.log("communityNavlist : ",communityObject)
                let communityLink = "/userDashboard/community/" + communityObject.pk;
                return (
                    <Link to={communityLink} className={this.isActiveCommunityText(communityLink)} key={i}
                        onClick={this.setSelectedTab.bind(this, communityLink)}>
                        <p>{communityObject.fields.entity_name}</p>
                    </Link>

                )
            });
        }

        let sidenavlist = this.state.list.map((navDetails, i) => {
            let tabName = navDetails.link;
            return (
                navDetails.label === "Communities" ?
                    <a className={this.isActive(tabName)} key={i} 
                        onClick={this.setSelectedTab.bind(this, tabName)}
                        style={{ textAlign: "left", marginBottom: '60px', borderBottom: "thin 1px #f2f2f2" }}>
                        <Link to={navDetails.link} className={this.isActiveText(tabName)} >
                            <FontAwesome
                                name={navDetails.icon}
                                style={{
                                    display: "inline-block", position: "relative", 
                                    marginLeft: "20px", padding: "0"
                                }}
                            />
                            <p
                                style={{
                                    display: "inline-block", padding: "0", 
                                    position: "relative", marginLeft: "5px"
                                }}>{navDetails.label}</p>
                        </Link>            
                        <div className='sidebar-nav-communities' style={{marginTop: '10px'}}>
                            {communityNavlist}
                        </div>
                    </a> :
                    <a className={this.isActive(tabName)} key={i} onClick={this.setSelectedTab.bind(this, tabName)}
                        style={{ textAlign: "left", borderBottom: "thin 1px #f2f2f2" }}>
                        <Link to={navDetails.link} className={this.isActiveText(tabName)} >
                            <FontAwesome
                                name={navDetails.icon}
                                style={{
                                    display: "inline-block", position: "relative", 
                                    marginLeft: "20px", padding: "0"
                                }}
                            />
                            <p
                                style={{
                                    display: "inline-block", padding: "0", 
                                    position: "relative", marginLeft: "5px"
                                }}>{navDetails.label}</p>
                        </Link>
                    </a>
            )
        });


        return (
            <div className="list-group" style={{borderColor: "transparent", paddingBottom: '50px' }}>
                {sidenavlist}
            </div>
        )
    }
}

export default AppSideBarNav;
