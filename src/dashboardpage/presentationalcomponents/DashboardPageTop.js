import React from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

import BlogWritingController from '../conditionalcomponents/BlogWritingController'
import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton'


class DashboardPageTop extends React.Component {
    render() {
        // console.log("DashboardPageTop :: props : ", this.props)

        let isOwner = false
        if (this.props.communityListState) {
            for (let i = 0; i < this.props.communityListState.length; i++){
                if (this.props.communityListState[i].is_owner) {
                    isOwner = true
                }
            }
            return (
                <div style={{ marginBottom: "50px" }}>
                    {this.props.is_mentor || isOwner ?
                        <div style={{width: '100%', margin: '50px auto'}}>
                            <div id="section-subtitle" className="dashboard-notice"
                                style={{marginLeft: '30px'}}>
                                Share a learning or notice
                                <ComplementaryButton 
                                    buttonText="Share Learning"
                                    showIcon= { <FontAwesome name="pencil-square-o" /> }
                                    redirect="true"
                                    redirectAddress="/userDashboard/blog/write/ALL"
                                />
                            </div> 
                        </div> :
                        this.props.communityListState.length == 0 ?
                            <div id="section-subtitle">
                                Meanwhile, you can checkout the Learning Articles
                            </div>
                            :
                            <div id="section-subtitle">
                                Go ahead and ask a Question or share your Learning
                            </div>
                    }
                    { this.props.is_mentor || isOwner ?
                        null :
                        <BlogWritingController
                            communitiesOptions="ALL" trackSubmitPost={this.props.trackSubmitPost} />
                    }
                </div>
            )
        } else {
            return (null)
        }
    }
}

var mapStateToProps = (store) => {
    return {
        is_mentor: (store.userProfileReducer.profileFields ? 
                        store.userProfileReducer.profileFields.is_mentor : false),
    }
}

export default connect(mapStateToProps)(DashboardPageTop);