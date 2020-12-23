import React, {Component} from 'react'
import {connect } from 'react-redux';

import { uploadImageOrFile } from './action'
import TopicHeader from '../presentationalcomponents/TopicHeader';


class TopicHeaderController extends Component{
    constructor(props){
        super(props)
        this.state = {
			imageUploadProgress: 0
        }
        
		this.submitEntityProfilePicture = this.submitEntityProfilePicture.bind(this)
		this.imageUploadFailed = this.imageUploadFailed.bind(this)
		this.imageUploadProgress = this.imageUploadProgress.bind(this)
		this.imageUploadSuccess = this.imageUploadSuccess.bind(this)
		this.imageUploadReset = this.imageUploadReset.bind(this)
    }

	imageUploadReset(){
		this.setState({imageUploadProgress: 0})
	}

	imageUploadFailed(){
		this.setState({imageUploadProgress: -1})
	}

	imageUploadSuccess(){
		this.setState({imageUploadProgress: 1})
	}

	imageUploadProgress(){
		this.setState({imageUploadProgress: 2})
    }

    submitEntityProfilePicture(formdata) {
		if(this.props.topicOwnershipValue) {
            this.imageUploadProgress();

            formdata.append('topic_id', this.props.match.params.topicId);
            const updatePicturePromise = this.props.dispatch(uploadImageOrFile(formdata))

            updatePicturePromise.then((resp) => {
                let status = 0
                if(typeof resp == "undefined" || resp === "False")  status = -1;
                else if(resp === "True" || resp === 1) status = 1;
                
                if(status === 1)
                    this.imageUploadSuccess()
                else this.imageUploadFailed()
            })
		}
	}
    

    render(){
        // console.log("TopicHeaderController::props", this.props)

        return(
            this.props.topicDetails && this.props.topicDetails[0]?
                <div>
                    <TopicHeader 
                        topicDetails={this.props.topicDetails[0]}
                        isFollowing={this.props.isFollowing}
                        followTopic={this.props.followTopic}
                        mentorsOfTopic={this.props.mentorsOfTopic}
                        communitiesOfTopic={this.props.communitiesOfTopic}
                        imageUploadProgress={this.state.imageUploadProgress}
                        imageUploadReset={this.imageUploadReset}
    					submitProfilePicture={this.submitEntityProfilePicture}
                        topicOwnershipValue={this.props.topicOwnershipValue}
                    />
                </div> :
                null
        );
    }
}

let mapStateToProps = (store) => {
    return{
    }
}

export default connect(mapStateToProps)(TopicHeaderController);