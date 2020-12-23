import React from 'react'
import { connect } from 'react-redux'

import RecentActivityReport from './RecentActivityReport'
import { getRecentActivityReport } from './action'


class RecentActivityReportController extends React.Component {
    componentWillMount() {
        this.props.dispatch(getRecentActivityReport());
    }

    render() {
        // console.log("RecentActivityReportController:: props : ", this.props)

        let body = [];
        if (this.props.communityListState) {
            for (let i = 0; i < this.props.communityListState.length; i++) {
                if (this.props.communityListState[i].is_owner ||
                    this.props.communityListState[i].is_internal_counsellor) {
                    const community_pk = this.props.communityListState[i].pk
                    const community_name = this.props.communityListState[i].fields.entity_name

                    if (this.props.recentActivity && this.props.recentActivity[community_pk]) {
                        let temp_body = (
                            <RecentActivityReport
                                community_name={community_name}
                                community_pk={community_pk}
                                activity={this.props.recentActivity[community_pk]}
                                {...this.props}
                                isOwner={true}
                            />
                        )

                        body.push(temp_body)
                    }
                }
            }

            return (
                <div>
                    {body}
                </div>
            )
        } else {
            return null
        }
    }
}

var mapStateToProps = (store) => {
    return {
        is_mentor: (store.userProfileReducer.profileFields ? 
                        store.userProfileReducer.profileFields.is_mentor : false),
        recentActivity: store.appDataReducer.recentActivityCommunityOwner
    }
}

export default connect(mapStateToProps)(RecentActivityReportController);