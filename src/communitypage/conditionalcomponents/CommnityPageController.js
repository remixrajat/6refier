import React, { Component } from 'react';
import CommnityPage from '../presentationalcomponents/CommunityPage';
import { connect } from 'react-redux';

import { COMMUNITY_LABEL } from '../../GlobalConstants';


class CommunityPageController extends Component {

    constructor(props) {
        super(props);
        this.state = { communitylabels: COMMUNITY_LABEL.school }
    }

    componentDidMount() {
        if (this.props.communityBasicDataState) {
            this.setCommunityLabel(this.props.communityBasicDataState[0].fields.generic_type);
        }
        else if (this.props.communityGenericType) {
            this.setCommunityLabel(this.props.communityGenericType);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.communityBasicDataState) {
            if (nextProps.communityBasicDataState) {
                this.setCommunityLabel(nextProps.communityBasicDataState[0].fields.generic_type);
            }
        }
        else {
            if (this.props.communityGenericType !== nextProps.communityGenericType) {
                this.setCommunityLabel(nextProps.communityGenericType);
            }
        }
    }

    setCommunityLabel(communityType) {
        if ("school" === communityType.toLowerCase()) {
            this.setState({ communitylabels: COMMUNITY_LABEL.school });
        } else if ("ngo" === communityType.toLowerCase()) {
            this.setState({ communitylabels: COMMUNITY_LABEL.ngo })
        } else if ("college" === communityType.toLowerCase()) {
            this.setState({ communitylabels: COMMUNITY_LABEL.college })
        } else if ("institute" === communityType.toLowerCase()) {
            this.setState({ communitylabels: COMMUNITY_LABEL.institutions })
        } else if ("corporate" === communityType.toLowerCase()) {
            this.setState({ communitylabels: COMMUNITY_LABEL.corporate })
        }else if ("training" === communityType.toLowerCase()) {
            this.setState({ communitylabels: COMMUNITY_LABEL.training })
        }else if ("community" === communityType.toLowerCase()) {
            this.setState({ communitylabels: COMMUNITY_LABEL.community })
        }
    }

    render() {
        return (
            <CommnityPage communitylabels={this.state.communitylabels}  {...this.props} />
        );
    }
}

var mapStateToProps = (store, ownProps) => {
    let community_generic_type = "school";
    // console.log("CommunityPageController :: communityListStateMemberOnly", store.appDataReducer.communityListStateMemberOnly);

    for (let communityList in store.appDataReducer.communityListStateMemberOnly) {
        if (ownProps.match.params.communityId === store.appDataReducer.communityListStateMemberOnly[communityList].pk) {
            // console.log("CommunityPageController :: generic_type", store.appDataReducer.communityListStateMemberOnly[communityList].fields.generic_type);
            community_generic_type = store.appDataReducer.communityListStateMemberOnly[communityList].fields.generic_type;
        }
    }
    
    return {
        communityBasicDataState: store.communityPageDataReducer.communityBasicDataState,
        communityGenericType: community_generic_type
    }
}

export default connect(mapStateToProps)(CommunityPageController)