import React from 'react';
import { connect } from 'react-redux';

import CommunityNavBar from '../presentationalcomponents/CommunityNavBar';
import { changeNavBarState, getNavBarState } from './action';
import CommunityPageNavBarContentHolder from '../presentationalcomponents/CommunityPageNavBarContentHolder.js';
import { getTagsList } from '../../dashboardpage/conditionalcomponents/action' 


class CommunityPageNavBarController extends React.Component {
    constructor(props) {
        super(props);
        this.changeNavBarStateFunction = this.changeNavBarStateFunction.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getNavBarState());
        this.props.dispatch(getTagsList())
        // this.props.dispatch(getCommunityPageNavPanelData());
    }

    changeNavBarStateFunction(stateVal, e) {
        this.props.dispatch(changeNavBarState(stateVal));
    }

    render() {
        // console.log("CommunityPageNavBarController:: props", this.props);

        let communityNavBarRenderElement = null;
        let communityNavPanelHolderRenderElement = null;
        if (this.props.navBarStateProp && this.props.communityMembershipState[this.props.match.params.communityId]) {
            communityNavBarRenderElement =
                    <CommunityNavBar stateChangeFunction={this.changeNavBarStateFunction}
                        currentState={this.props.navBarStateProp}
                        {...this.props} />
        }

        if (this.props.navBarStateProp && this.props.communityMembershipState[this.props.match.params.communityId]) {
            communityNavPanelHolderRenderElement = <CommunityPageNavBarContentHolder currentState={this.props.navBarStateProp}
                {...this.props} />
        }
        return (
            <div>
                {communityNavBarRenderElement}
                {communityNavPanelHolderRenderElement}
            </div>
        );
    }
}

var mapStateToProps = (store) => {
    return {
        navBarStateProp: store.communityPageDataReducer.NavBarState,
        communityOwnershipState: store.communityOwnershipReducer,
        communityMembershipState: store.communityMembershipReducer,
        communityInternalExpertState: store.communityInternalExpertReducer,
        communityExternalExpertState: store.communityExternalExpertReducer,
        timeline: store.dashboardDataReducer.timeline,
        sort: store.dashboardDataReducer.sortOrder,
        postType: store.dashboardDataReducer.yourPostType
    }
}

export default connect(mapStateToProps)(CommunityPageNavBarController);