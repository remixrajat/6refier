import React, { Component } from 'react'
import {connect } from 'react-redux';

import Tag from '../presentationalcomponents/Tag'
import { followTopic } from '../../../topicpage/conditionalcomponents/action'
import { getTagsList } from '../../../dashboardpage/conditionalcomponents/action'


class TagController extends Component {
    constructor(props){
        super(props)
        this.state = {
            showPreview: true,
            tagFollowLoader: 0
        }

        this.togglePreviewState = this.togglePreviewState.bind(this)
        this.tagFollow = this.tagFollow.bind(this)
    }

    togglePreviewState(){
        let currentState = this.state.showPreview
        this.setState({showPreview: !currentState})
    }

    tagFollow(tagId) {
        let tagPromise = this.props.dispatch(followTopic(tagId)); 
        this.setState({
            tagFollowLoader: 2
        })               
        tagPromise.then((resp) => {
                // console.log("******Response from server for isUserFollows: ", resp);
                let status = 0

                if(typeof resp == "undefined")  status = -1;
                else if(resp === 1) status = 1;

                this.setState({
                    tagFollowLoader: status
                })                                
        })
    }


    render() {
        // console.log("TagController: props", this.props);
        
        let tagValues
        let index = 0
        let tags = []
        let previewtags = []
        let numberOfTagsToShowInPreview = 4

        if (this.props.tagValues) {
            let tagValues = JSON.parse(this.props.tagValues)
            // console.log("tagValues", tagValues,this.props.userProfileData);
            for (let i = 0; i < tagValues.length; i++) {
                index = this.props.index ? this.props.index + i : i
                index = index % 4
                tags.push (
                    <Tag 
                        key = {i}
                        tagFollowLoader={this.state.tagFollowLoader}
                        tag_name={tagValues[i].fields.tag_name}
                        tag_description={tagValues[i].fields.description}
                        isFollowed={
                                    this.props.tagsListObject ? 
                                        this.props.tagsListObject[tagValues[i].pk].fields.is_followed_by_user :
                                        undefined
                                    }
                        followerCount={
                                        this.props.tagsListObject ? 
                                            this.props.tagsListObject[tagValues[i].pk].fields.follower_count:
                                            undefined
                                        }
                        tag_id={tagValues[i].pk}
                        index={index}
                        userId={this.props.userId}
                        tagFollow={this.tagFollow}
                        showPopup={this.props.showPopup}
                    />
                )
                if(i < numberOfTagsToShowInPreview) {
                    previewtags.push (
                        <Tag 
                            tagFollowLoader={this.state.tagFollowLoader}    
                            tag_name={tagValues[i].fields.tag_name}
                            tag_description={tagValues[i].fields.description}
                            isFollowed={                                    
                                        this.props.tagsListObject ? 
                                            this.props.tagsListObject[tagValues[i].pk].fields.is_followed_by_user :
                                            undefined
                                    }
                            followerCount={
                                            this.props.tagsListObject ? 
                                                this.props.tagsListObject[tagValues[i].pk].fields.follower_count:
                                                undefined
                                        }
                            tag_id={tagValues[i].pk}
                            index={index}
                            userId={this.props.userId}                            
                            tagFollow={this.tagFollow}  
                            showPopup={this.props.showPopup}
                        />
                    )
                }
            }
        }

        return (
            <div>
                {tags.length > numberOfTagsToShowInPreview ?
                    this.state.showPreview ?
                        previewtags
                        :
                        tags
                        :
                        tags
                }
                { tags.length > numberOfTagsToShowInPreview ?
                    <span className="custom-list-sub-content-highlighted custom-link"
                        style={{ marginRight: "5px", display: "inline-block",
                                marginTop: "5px",cursor:"pointer"}}
                        onClick={this.togglePreviewState}>
                        {this.state.showPreview?"More":"Less"}
                    </span>
                    :
                    null
                } 
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    return{ 
        tagsListObject: store.appDataReducer.tagsListStateObject,
        userId: store.userProfileReducer.userId,
    }
}

export default connect(mapStateToProps)(TagController);