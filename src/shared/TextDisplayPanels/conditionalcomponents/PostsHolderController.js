import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row, DropdownButton, MenuItem, Alert } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import PostTextHolderIndividualController from './PostTextHolderIndividualController'
import { getPostsDataList, getUnresolvedPosts } from './action'
import DiscussionGroupFeedCard from '../../../discussionGroup/presentationalComponents/DiscussionGroupFeedCard';

import { getCommunityNameFromId } from '../../../HelperFunctions/getCommunityNameFromId'
import PreLoader from '../../../shared/Preloader/PreLoader'
import { isXsDevice, isMobileDevice } from '../../../GlobalConstants'


class PostsHolderController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadPost: false,
            asked_question: false, 
            postLoader: 0,
            postsItems: [],
        }
        this.timelineSelect = this.timelineSelect.bind(this);
        this.yourPostTypeSelect = this.yourPostTypeSelect.bind(this);
        this.setLoaderStatus = this.setLoaderStatus.bind(this);
    }

    getDocHeight() {
        const D = document;
        return Math.max (
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }

    onEndOfPageHandler(ev) {
        if ((window.innerHeight + window.scrollY) >= this.getDocHeight() - 500 && 
            (this.props.postsList && this.props.postsList.length >= 10)) {
            // alert("you're at the bottom of the page");
            // console.log("PostsHolderController::onscroll :: you're at the bottom of the page", (window.innerHeight + window.scrollY), document.body.offsetHeight);
            if (!this.state.isLoadPost) {
                // alert("Loading Post");
                this.setState({ isLoadPost: true })
                this.props.dispatch(getPostsDataList(this.props.postType, true, this.props.sort, this.props.timeline));
            }
        }
    }

    componentWillMount() {
        if(this.props.user_details && this.props.user_details.has_community) {
            this.setState({asked_question: true});
            this.props.dispatch(getUnresolvedPosts())
        } else {
            this.props.dispatch(getPostsDataList(this.props.postType, false, this.props.sort, this.props.timeline));
        } 
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        if(this.refs.filter_nav)
            this.props.dispatch({type: 'filter_nav', data: this.refs.filter_nav.getBoundingClientRect()});
        window.onscroll = this.onEndOfPageHandler.bind(this)
    }

    componentWillUnmount() {
        //console.log("PostsHolderController::componentWillUnmount ");
        window.onscroll = null;
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
            window.onscroll = null;
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log("PostsHolderController:: nextProps", nextProps, this.props)

        if(!this.state.asked_question && this.state.postsItems.length > 0) {
            if(this.props.postsList && nextProps.postsList &&    
                this.props.postsList.length === nextProps.postsList.length) {
                this.setState({ postLoader: 0 })        
                return;
            }   
        }

        let postsList = this.state.asked_question ? 
                        nextProps.askedQuestions : 
                        nextProps.postsList;

        const postsLength = postsList ? postsList.length : 0;
        const items = [];

        for(let i = 0; i < postsLength; i = i + 2) {
            if (this.props.communityId && 
                postsList[i] && 
                postsList[i].fields.community_name && 
                postsList[i].fields.community_name !== this.props.communityId ) {
                i = i + 2;
                continue;
            }

            items.push (
                this.state.asked_question ?
                    <PostTextHolderIndividualController
                        key={postsList[i].pk}
                        id={postsList[i].pk}
                        is_community_owner={postsList[i].fields.is_community_owner}
                        post_owner={postsList[i].fields.post_owner}
                        post_date={postsList[i].fields.post_date}
                        post_title={postsList[i].fields.post_title}
                        is_mentor={this.props.is_mentor}
                        userId={this.props.userId}
                        comments={postsList[i].fields.comments}
                        post_body={postsList[i].fields.post_body}
                        is_visible_everyone={postsList[i].fields.is_visible_everyone}
                        post_type={postsList[i].fields.post_type}
                        is_anonymous={postsList[i].fields.is_anonymous}
                        communityListState={this.props.communityListState}
                        community_id={postsList[i].fields.community_name}
                        community_name={getCommunityNameFromId(postsList[i].fields.community_name, nextProps.communityListState)}
                        is_useful_count_state={postsList[i].fields.is_useful_count}
                        is_not_useful_count_state={postsList[i].fields.is_not_useful_count}
                        liked_or_not_state={postsList[i].fields.liked_or_not}
                        isPreview={this.props.isPreview ? true : false}
                        tag_values={postsList[i].fields.tag_values}
                        is_resolved={postsList[i].fields.is_resolved}
                        sortOrder={nextProps.sort}
                        timeline={nextProps.timeline}
                        filterPostType={nextProps.postType}
                    /> :
                    <PostTextHolderIndividualController
                        key={postsList[i].pk}
                        id={postsList[i].pk}
                        is_community_owner={postsList[i].fields.is_community_owner}
                        is_community_internal_counsellor={postsList[i].fields.is_community_internal_counsellor}
                        is_community_external_counsellor={postsList[i].fields.is_community_external_counsellor}
                        post_owner={postsList[i].fields.post_owner}
                        post_date={postsList[i].fields.post_date}
                        post_title={postsList[i].fields.post_title}
                        is_mentor={this.props.is_mentor}
                        userId={this.props.userId}
                        comments={postsList[i].fields.comments}
                        post_body={postsList[i].fields.post_body}
                        is_visible_everyone={postsList[i].fields.is_visible_everyone}
                        post_type={postsList[i].fields.post_type}
                        is_anonymous={postsList[i].fields.is_anonymous}
                        communityListState={this.props.communityListState}
                        community_id={postsList[i].fields.community_name}
                        community_name={getCommunityNameFromId(postsList[i].fields.community_name, nextProps.communityListState)}
                        is_useful_count_state={postsList[i].fields.is_useful_count}
                        is_not_useful_count_state={postsList[i].fields.is_not_useful_count}
                        liked_or_not_state={postsList[i].fields.liked_or_not}
                        isPreview={this.props.isPreview ? true : false}
                        tag_values={postsList[i].fields.tag_values}
                        is_resolved={postsList[i].fields.is_resolved}
                        sortOrder={nextProps.sort}
                        timeline={nextProps.timeline}
                        filterPostType={nextProps.postType}
                    />
            )

            if(postsList[i+1]) {
                items.push (
                    this.state.asked_question ?
                        <PostTextHolderIndividualController
                            key={postsList[i+1].pk}
                            id={postsList[i+1].pk}
                            is_community_owner={postsList[i+1].fields.is_community_owner}
                            post_owner={postsList[i+1].fields.post_owner}
                            post_date={postsList[i+1].fields.post_date}
                            post_title={postsList[i+1].fields.post_title}
                            is_mentor={this.props.is_mentor}
                            userId={this.props.userId}
                            comments={postsList[i+1].fields.comments}
                            post_body={postsList[i+1].fields.post_body}
                            is_visible_everyone={postsList[i+1].fields.is_visible_everyone}
                            post_type={postsList[i+1].fields.post_type}
                            is_anonymous={postsList[i+1].fields.is_anonymous}
                            communityListState={this.props.communityListState}
                            community_id={postsList[i+1].fields.community_name}
                            community_name={getCommunityNameFromId(postsList[i+1].fields.community_name, nextProps.communityListState)}
                            is_useful_count_state={postsList[i+1].fields.is_useful_count}
                            is_not_useful_count_state={postsList[i+1].fields.is_not_useful_count}
                            liked_or_not_state={postsList[i+1].fields.liked_or_not}
                            isPreview={this.props.isPreview ? true : false}
                            tag_values={postsList[i+1].fields.tag_values}
                            is_resolved={postsList[i+1].fields.is_resolved}
                            sortOrder={nextProps.sort}
                            timeline={nextProps.timeline}
                            filterPostType={nextProps.postType}
                        /> :
                        <PostTextHolderIndividualController
                            key={postsList[i+1].pk}
                            id={postsList[i+1].pk}
                            is_community_owner={postsList[i+1].fields.is_community_owner}
                            is_community_internal_counsellor={postsList[i].fields.is_community_internal_counsellor}
                            is_community_external_counsellor={postsList[i].fields.is_community_external_counsellor}
                            post_owner={postsList[i+1].fields.post_owner}
                            post_date={postsList[i+1].fields.post_date}
                            post_title={postsList[i+1].fields.post_title}
                            is_mentor={this.props.is_mentor}
                            userId={this.props.userId}
                            comments={postsList[i+1].fields.comments}
                            post_body={postsList[i+1].fields.post_body}
                            is_visible_everyone={postsList[i+1].fields.is_visible_everyone}
                            post_type={postsList[i+1].fields.post_type}
                            is_anonymous={postsList[i+1].fields.is_anonymous}
                            communityListState={this.props.communityListState}
                            community_id={postsList[i+1].fields.community_name}
                            community_name={getCommunityNameFromId(postsList[i+1].fields.community_name, nextProps.communityListState)}
                            is_useful_count_state={postsList[i+1].fields.is_useful_count}
                            is_not_useful_count_state={postsList[i+1].fields.is_not_useful_count}
                            liked_or_not_state={postsList[i+1].fields.liked_or_not}
                            isPreview={this.props.isPreview ? true : false}
                            tag_values={postsList[i+1].fields.tag_values}
                            is_resolved={postsList[i+1].fields.is_resolved}
                            sortOrder={nextProps.sort}
                            timeline={nextProps.timeline}
                            filterPostType={nextProps.postType}
                        />
                )
            }

            if(!(isXsDevice() || isMobileDevice()) && 
                !this.props.isBlogPage && 
                (nextProps.userRooms && i/2 < nextProps.userRooms.length > 0)) {
                const desc = nextProps.userRooms[i/2].fields.group_description.length > 200 ? 
                                nextProps.userRooms[i/2].fields.group_description.slice(0, 200) + " ..." :  
                                nextProps.userRooms[i/2].fields.group_description
                const communityPk = nextProps.userRooms[i/2].community_id

                items.push(<DiscussionGroupFeedCard
                                key={communityPk+i}
                                desc={desc}
                                room={nextProps.userRooms[i/2]}
                                communityId={communityPk}
                                fromDashboard={true}
                            />)
            }
        }

        // console.log("PostsHolderController:: postitems", {items, postsLength})

        this.setState({postsItems: items})

        if (this.props.postsList === undefined) {
            return;
        } 
        if (nextProps.postsList && nextProps.postsList.length >= this.props.postsList.length) {
            this.setState({ isLoadPost: false })
            return true;
        }
    }

    setLoaderStatus(resp) {
        let status = 0;
        if(typeof resp == "undefined") status = -1;
        else if(resp == 1) status = 1;
        this.setState({
            postLoader: status
        })
    }

    timelineSelect(eventKey) {
        // console.log(eventKey);
        this.setState({
            // timeline: eventKey,
            postLoader: 2
        })
        let postPromise = this.props.dispatch(getPostsDataList(this.props.postType, false, this.props.sort, eventKey));
        postPromise.then((resp) => {
            // console.log("******Response from server: ", resp);
            this.setLoaderStatus(resp);
            this.props.dispatch({type: "timeline", data: eventKey})
        })
    }

    yourPostTypeSelect(type) {
        if(type.indexOf('community') !== -1) {
            const community_list = []
            let community_pk = type.split('_')[2]
            community_list.push(community_pk)

            this.setState({
                asked_question: true,
                postLoader: 2
            })
            let postPromise = this.props.dispatch(getUnresolvedPosts(community_list));
            postPromise.then((resp) => {
                //console.log("******Response from server: ", data);
                this.setLoaderStatus(resp);
            })
        } else if (type === 'asked_question') {
            this.setState({
                asked_question: true,
                postLoader: 2
            })
            let postPromise = this.props.dispatch(getUnresolvedPosts());
            postPromise.then((resp) => {
                //console.log("******Response from server: ", data);
                this.setLoaderStatus(resp);
            })
        } else {
            this.setState({
                asked_question: false,
                postLoader: 2
            })
            let postPromise = this.props.dispatch(getPostsDataList(type, false, this.props.sort, this.props.timeline));
            postPromise.then((resp) => {
                //console.log("******Response from server: ", data);
                this.setLoaderStatus(resp);
                this.props.dispatch({type: "yourPostType", data: type})
            })
        }
    }
    
    changeSortOrder() {
        let sortOrder = "DESC"
        if(this.props.sort === "DESC")
            sortOrder = "ASC"
        this.setState({
            // sortOrder,
            postLoader: 2
        });
        let postPromise = this.props.dispatch(getPostsDataList(this.props.postType, false, sortOrder, this.props.timeline));
        postPromise.then((resp) => {
            //console.log("******Response from server: ", data);
            this.props.dispatch({type: "sortOrder", data: sortOrder})
            this.setLoaderStatus(resp);
        })
    }

    render() {
        // console.log("PostsHolderController:: props==================", this.props, this.state);

        let communityNavlist = [];

        let timelineTitle = ''
        if(this.props.timeline === "year")
            timelineTitle = "This Year"
        else if(this.props.timeline === "all") 
            timelineTitle = "All Time"
        else if(this.props.timeline === "week") 
            timelineTitle = "This Week"
        else if (this.props.timeline === "today")
            timelineTitle = "Today"
        else timelineTitle = "This Month" 

        let postTypeTitle = ''
        if(this.state.asked_question)
            postTypeTitle = "Unresolved Questions (" 
                            + (this.props.askedQuestions ? this.props.askedQuestions.length : 0) 
                            + ")"
        else if(this.props.postType === "all")
            postTypeTitle = "All Posts"
        else if(this.props.postType === "Blog") 
            postTypeTitle = "All Blogs"
        else if(this.props.postType === "Question") 
            postTypeTitle = "All Questions"
        else if(this.props.postType === "your_blog") 
            postTypeTitle = "My Blogs"
        else if(this.props.postType === "your_post") 
            postTypeTitle = "My Posts"
        else postTypeTitle = "My Questions" 

        let postClass = this.props.col12 ? 
                            "col-xs-12" :
                            "col-xs-12 col-md-offset-2 col-md-8" 

        if (this.props.user_details && 
            this.props.user_details.has_community && 
            this.props.communityListState && 
            this.props.communityListState.length > 0) {
            let i = 1;
            communityNavlist = this.props.communityListState.map((communityObject, i) => {
                i++;
                return (
                    <MenuItem 
                        bsPrefix="filter-community-list"
                        className="filter-community-list"
                        key={i} 
                        eventKey={"community_" 
                                    + communityObject.fields.entity_name
                                    + "_"
                                    + communityObject.pk }>
                        <span style={{fontSize: 14, flex: '0.2'}}>{i + "."}</span>
                        <span style={{flex: '0.8', display: 'flex', flexWrap: 'wrap'}}>
                            {communityObject.fields.entity_name}
                        </span>
                    </MenuItem>
                )
            });
        }

        
        return (
            isXsDevice() || isMobileDevice() ?
                <div>
                    { 
                        this.state.postLoader === 2 ?
                        <div 
                            className="custom-list-content filter-content-nav" 
                            style={{"display": "flex", "justifyContent": "center", "alignItems": "center", height: "50px"}}>
                            <PreLoader />
                        </div> :  
                        this.state.postLoader === -1 ?
                            <div 
                                className="custom-list-content filter-content-nav">
                                <p>Sorry, there was an issue!</p>
                            </div> :                      
                            <div 
                                id="refier__filter_nav"
                                className="custom-list-content filter-content-nav" 
                                ref="filter_nav"
                                style={ this.props.highlight === 'filter_nav' ?
                                        {position: 'relative', zIndex: '10000'} :
                                        {background: 'transparent', boxShadow: 'none', marginTop: '30px'} }>
                                <div className="filter-label" style={{flex: '0.2'}}>                            
                                    <span>Filter:</span>
                                </div>
                                <div style={{
                                        flex: '0.8', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center',
                                        background: 'white',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <div>
                                        <DropdownButton
                                            title={timelineTitle}
                                            onSelect={this.timelineSelect}
                                            style={{
                                                "borderColor": "white", 
                                                "color": "#797979", 
                                                "fontWeight" : "400",
                                                "padding": "15px 12px",
                                                "borderRadius": "0px"}}
                                            disabled={this.state.asked_question ? true : false}
                                        >
                                            <MenuItem eventKey="today">Today</MenuItem>
                                            <MenuItem eventKey="week">This Week</MenuItem>
                                            <MenuItem eventKey="month">This Month</MenuItem>
                                            <MenuItem eventKey="year">This Year</MenuItem>
                                            <MenuItem eventKey="all">All Time</MenuItem>
                                        </DropdownButton>
                                    </div>
                                    <div>
                                        <DropdownButton
                                            title={postTypeTitle}
                                            onSelect={this.yourPostTypeSelect}
                                            style={{
                                                "borderColor": "white", 
                                                "color": "#797979", 
                                                "fontWeight" : "400",
                                                "padding": "15px 12px",
                                                "borderRadius": "0px",
                                                "whiteSpace": 'normal'}}>
                                            { this.props.col12 ? <MenuItem eventKey="all">All Posts</MenuItem> : null }
                                            { this.props.col12 && 
                                                this.props.user_details && 
                                                this.props.user_details.has_community ? 
                                                    <MenuItem eventKey="asked_question">Unresolved Questions</MenuItem> : "" }
                                            { this.props.user_details && 
                                                this.props.user_details.has_community ?
                                                    <MenuItem divider /> : null
                                            }
                                            {communityNavlist.length > 0 ? communityNavlist : null}
                                            { this.props.user_details && 
                                                this.props.user_details.has_community ?
                                                    <MenuItem divider /> : null
                                            }
                                            <MenuItem eventKey="Blog">All Blogs</MenuItem>
                                            { this.props.col12 ? 
                                                <MenuItem eventKey="Question">All Questions</MenuItem> : null }
                                            { this.props.col12 && 
                                                !(this.props.user_details && 
                                                this.props.user_details.has_community) ? 
                                                    <MenuItem eventKey="your_post">My Posts</MenuItem> : null }
                                            { this.props.col12 && 
                                                !(this.props.user_details && 
                                                this.props.user_details.has_community) ? 
                                                    <MenuItem eventKey="your_question">My Questions</MenuItem> : null }
                                            <MenuItem eventKey="your_blog">My Blogs</MenuItem>
                                        </DropdownButton>
                                    </div>
                                    <div 
                                        className={this.state.asked_question ? 'sorting disable-sorting' : 'sorting'}
                                        onClick={!this.state.asked_question ? () => this.changeSortOrder() : null}>
                                        <div style={{padding: "15px 12px"}}>
                                            <span style={{"marginRight": "3px"}}>
                                                { this.props.sort === "DESC" ? "Newest First: " : "Oldest First: " }  
                                            </span>
                                            <FontAwesome
                                                name={this.props.sort === "DESC" ? 'arrow-down' : 'arrow-up'}
                                                style={{"display": "inline-block"}}
                                            />
                                        </div>
                                    </div>                            
                                </div>
                            </div> 
                        }
                        <div style={this.props.highlight === 'filter_nav' ?
                                    {position: 'relative', zIndex: '10000'} : { marginTop: '30px'} }>
                            {   this.state.postLoader === 2 || 
                                (this.props.postsList === undefined && 
                                this.props.askedQuestions === undefined) ?
                                    <PreLoader shimmer={true} placeholder="post_card" copies={10} /> :
                                    this.state.postsItems.length === 0 ? 
                                        <PreLoader shimmer={true} placeholder="post_card" copies={10} /> :
                                        this.state.postsItems
                            }
                        </div>
                </div>

            :
            
            <div>
                <Col className={postClass}>
                    <Grid fluid>
                    { 
                        this.state.postLoader === 2 ?
                        <div 
                            className="custom-list-content filter-content-nav" 
                            style={{"display": "flex", "justifyContent": "center", "alignItems": "center", height: "50px"}}>
                            <PreLoader />
                        </div> :  
                        this.state.postLoader === -1 ?
                            <div 
                                className="custom-list-content filter-content-nav">
                                <p>Sorry, there was an issue!</p>
                            </div> :                      
                            <div 
                                id="refier__filter_nav"
                                className="custom-list-content filter-content-nav" 
                                ref="filter_nav"
                                style={ this.props.highlight === 'filter_nav' ?
                                        {position: 'relative', zIndex: '10000'} :
                                        {} }>
                                <div className="filter-label">                            
                                    <span>Filter:</span>
                                </div>
                                <div>
                                    <DropdownButton
                                        title={timelineTitle}
                                        onSelect={this.timelineSelect}
                                        style={{
                                            "borderColor": "white", 
                                            "color": "#797979", 
                                            "fontWeight" : "400",
                                            "padding": "15px 12px",
                                            "borderRadius": "0px"}}
                                        disabled={this.state.asked_question ? true : false}
                                    >
                                        <MenuItem eventKey="today">Today</MenuItem>
                                        <MenuItem eventKey="week">This Week</MenuItem>
                                        <MenuItem eventKey="month">This Month</MenuItem>
                                        <MenuItem eventKey="year">This Year</MenuItem>
                                        <MenuItem eventKey="all">All Time</MenuItem>
                                    </DropdownButton>
                                </div>
                                <div>
                                    <DropdownButton
                                        title={postTypeTitle}
                                        onSelect={this.yourPostTypeSelect}
                                        style={{
                                            "borderColor": "white", 
                                            "color": "#797979", 
                                            "fontWeight" : "400",
                                            "padding": "15px 12px",
                                            "borderRadius": "0px"}}>
                                        { this.props.col12 ? <MenuItem eventKey="all">All Posts</MenuItem> : null }
                                        { this.props.col12 && 
                                            this.props.user_details && 
                                            this.props.user_details.has_community ? 
                                                <MenuItem eventKey="asked_question">Unresolved Questions</MenuItem> : "" }
                                        { this.props.user_details && 
                                            this.props.user_details.has_community ?
                                                <MenuItem divider /> : null
                                        }
                                        {communityNavlist.length > 0 ? communityNavlist : null}
                                        { this.props.user_details && 
                                            this.props.user_details.has_community ?
                                                <MenuItem divider /> : null
                                        }
                                        <MenuItem eventKey="Blog">All Blogs</MenuItem>
                                        { this.props.col12 ? 
                                            <MenuItem eventKey="Question">All Questions</MenuItem> : null }
                                        { this.props.col12 && 
                                            !(this.props.user_details && 
                                            this.props.user_details.has_community) ? 
                                                <MenuItem eventKey="your_post">My Posts</MenuItem> : null }
                                        { this.props.col12 && 
                                            !(this.props.user_details && 
                                            this.props.user_details.has_community) ? 
                                                <MenuItem eventKey="your_question">My Questions</MenuItem> : null }
                                        <MenuItem eventKey="your_blog">My Blogs</MenuItem>
                                    </DropdownButton>
                                </div>
                                <div 
                                    className={this.state.asked_question ? 'sorting disable-sorting' : 'sorting'}
                                    onClick={!this.state.asked_question ? () => this.changeSortOrder() : null}>
                                    <div>
                                        <span style={{"marginRight": "3px"}}>
                                            { this.props.sort === "DESC" ? "Newest First: " : "Oldest First: " }  
                                        </span>
                                        <FontAwesome
                                            name={this.props.sort === "DESC" ? 'arrow-down' : 'arrow-up'}
                                            style={{"display": "inline-block"}}
                                        />
                                    </div>
                                </div>                            
                            </div>
                    }
                        <div style={this.props.highlight === 'filter_nav' ?
                                    {position: 'relative', zIndex: '10000'} : {} }>
                            {   this.state.postLoader === 2 || 
                                (this.props.postsList === undefined && 
                                this.props.askedQuestions === undefined) ?
                                    <PreLoader shimmer={true} placeholder="post_card" copies={10} /> :
                                    this.state.postsItems.length === 0 ? 
                                        <PreLoader shimmer={true} placeholder="post_card" copies={10} /> :
                                        this.state.postsItems
                            }
                        </div>
                    </Grid>
                </Col>
            </div>
        );
    }
}

let mapStateToProps = (store) => {
    return {
        userId: store.userProfileReducer.userId,
        postsList: store.appDataReducer.postsList,
        communityListState: store.appDataReducer.communityListStateMemberOnly,
        tags_list: store.appDataReducer.tagsListState,
        askedQuestions: store.appDataReducer.questionsAskedFromMentor,
        highlight: store.stylesDataReducer.highlight,
        profileFields: store.userProfileReducer.profileFields,
        userRooms: store.groupDiscussionReducer.getAllUserRooms
    }
}

export default connect(mapStateToProps)(PostsHolderController);