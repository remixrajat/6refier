import React,{Component} from 'react';

import MentorCardForTopic from './MentorCardForTopic';

import PreLoader from '../../shared/Preloader/PreLoader'


export default class MentorListForTopic extends Component{
    render(){
        let mentorList;

        if(this.props.mentorsOfTopic ){
            mentorList = []
            for (var i = 0; i < this.props.mentorsOfTopic.length ; i++){
                mentorList.push(
                    <div key = {this.props.mentorsOfTopic[i].pk}>
                        <MentorCardForTopic 
                            mentorDetails = {this.props.mentorsOfTopic[i]} 
                            index = {i}
                            profileId={this.props.userProfileData ? 
                                JSON.parse(this.props.userProfileData.profile)[0].pk : 
                                ""
                            } 
                        />
                    </div>
                )
            } 
        }
    
        return (
            <div>
                {!mentorList ?
                        <PreLoader />
                        :
                        mentorList.length==0?
                        <div className="custom-list-content"> We're taking care of it</div>
                        :
                        mentorList
                    }
            </div>
        )  
    }
}
