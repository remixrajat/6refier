import React, { Component } from 'react';

import BlogCardForTopic from './BlogCardForTopic';

import PreLoader from '../../shared/Preloader/PreLoader'


export default class BlogForTopicList extends Component {
    render() {
        // console.log("BlogForTopicList:: props", this.props)

        let userData = this.props.userProfileData?JSON.parse(this.props.userProfileData.profile)[0]:""
        let blogsList;
        if (this.props.postOfTopic) {
            blogsList=[]
            for (var i = 0; i < this.props.postOfTopic.length; i++) {
                if (this.props.postOfTopic[i][0].fields.post_type == "Blog") {
                    blogsList.push(
                        <div className="generic-post-card" 
                            style={{padding: '15px 30px', width: '95%', marginBottom: '20px'}}> 
                            <BlogCardForTopic blogDetail={this.props.postOfTopic[i][0]} />
                        </div>
                    )
                }
            }
        }

        return (
            <div>
                {  !blogsList ? 
                    <PreLoader /> :
                    blogsList.length == 0 ?
                        <div style={{padding: '10px', width: '90%'}} 
                            className="custom-list-content generic-post-card">
                            No Blogs Written
                        </div>
                    :
                    blogsList
                }
            </div>
        )
    }
}
