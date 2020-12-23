import React, { Component } from 'react';

import QuestionCardForTopicList from './QuestionCardForTopicList';

import PreLoader from '../../shared/Preloader/PreLoader'


export default class QuestionsListForTopic extends Component {
    render() {
        //console.log("QuestionsList: props", this.props)
        
        let userData = this.props.userProfileData?JSON.parse(this.props.userProfileData.profile)[0]:""
        let blogsList;

        if (this.props.postOfTopic) {
            blogsList=[]
            for (var i = 0; i < this.props.postOfTopic.length; i++) {
                if (this.props.postOfTopic[i][0].fields.post_type == "Question") {
                    blogsList.push (
                        <div className="generic-post-card" 
                            style={{padding: '15px 30px', width: '95%', marginBottom: '20px'}}> 
                            <QuestionCardForTopicList blogDetail={this.props.postOfTopic[i][0]}
                                userProfile={this.props.userProfile} />
                        </div>
                    )
                }
            }
        }

        return (
            <div>
                { !blogsList ?
                    <PreLoader />
                    :
                    blogsList.length==0?
                        <div style={{padding: '10px', width: '90%'}}
                            className="custom-list-content generic-post-card">
                            No Questions Posted
                        </div>
                    :
                    blogsList
                }
            </div>
        )

    }
}
