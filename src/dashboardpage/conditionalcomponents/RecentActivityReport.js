import React from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick';


class RecentActivityReport extends React.Component {
    render() {
        // console.log("RecentActivityReport:: props : ", this.props)

        const { activity } = this.props
        let bodyDiv = []

        if(activity) {
            let discussionsDiv = null
            let eventsDiv = null
            let postsDiv = null
            let body = []

            if(activity.discussions && 
                activity.discussions.length > 0) {
                const discussions = activity.discussions;
                const groupCount = discussions.length;
                let totalLikes = 0;
                let totalAnswerCount = 0;
                let totalDiscussions = 0;

                for (let discussion of discussions) {
                    let stats = discussion.posts_stats_count;
                    totalDiscussions = totalDiscussions + Object.keys(stats).length;
                    Object.keys(stats).forEach( stat => {
                        totalAnswerCount = totalAnswerCount + stats[stat]['answerCount']
                        totalLikes = totalLikes + stats[stat]['likesCount']
                    })    
                }
                
                discussionsDiv = (
                    <div style={{padding: '10px', marginLeft: '15px', height: '200px'}} 
                        className="generic-post-card">
                        <div style={{paddingTop: '10px', paddingBottom: '10px'}} 
                            className="custom-list-title-content-blue-bold custom-item-border">
                            Discussions
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total discussion groups:&nbsp;
                            <span className="custom-list-sub-content-bold">{groupCount}</span>
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total discussions in groups:&nbsp;
                            <span className="custom-list-sub-content-bold">{totalDiscussions}</span>
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total answers on discussions:&nbsp;
                            <span className="custom-list-sub-content-bold">{totalAnswerCount}</span>
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total likes on discussion:&nbsp;
                            <span className="custom-list-sub-content-bold">{totalLikes}</span>
                        </div>
                    </div>
                )
            } 

            if(activity.events && 
                activity.events.length > 0) {
                const events = activity.events;
                const eventCount = events.length;
                let totalParticipants = 0;
                let totalApplicants = 0;
                let totalQuestionsAnswered = 0
                let totalQuestions = 0

                for (let event of events) {
                    totalApplicants = totalApplicants + event['fields']['accepted_applications_count']
                    totalParticipants = totalParticipants + event['fields']['count_of_participants']
                    totalQuestions = totalQuestions + event['fields']['total_question_count']
                    totalQuestionsAnswered = totalQuestionsAnswered + event['fields']['answered_question_count']
                }

                eventsDiv = (
                    <div style={{padding: '10px', marginLeft: '15px', height: '200px'}} 
                        className="generic-post-card">
                        <div  style={{paddingTop: '10px', paddingBottom: '10px'}} 
                            className="custom-list-title-content-blue-bold custom-item-border">
                            Sessions
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total Sessions:&nbsp;
                            <span className="custom-list-sub-content-bold">{eventCount}</span>
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total Applicants:&nbsp;
                            <span className="custom-list-sub-content-bold">{totalApplicants}</span>
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total Participants:&nbsp;
                            <span className="custom-list-sub-content-bold">{totalParticipants}</span>
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total Questions Asked:&nbsp;
                            <span className="custom-list-sub-content-bold">{totalQuestions}</span>
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total Questions Answered:&nbsp;
                            <span className="custom-list-sub-content-bold">{totalQuestionsAnswered}</span>
                        </div>
                    </div>
                )
            } 

            if(activity.posts && 
                activity.posts.length > 0) {
                const posts = activity.posts;
                const postsCount = posts.length;
                let postsResolved = 0;
                let postsUnresolved = 0;

                for(let post of posts) {
                    const isResolved = post['fields']['is_resolved']
                    if(isResolved) postsResolved++
                    else postsUnresolved++
                }

                postsDiv = (
                    <div style={{padding: '10px', marginLeft: '15px', height: '200px'}} 
                        className="generic-post-card">
                        <div  style={{paddingTop: '10px', paddingBottom: '10px'}} 
                            className="custom-list-title-content-blue-bold custom-item-border">
                            Posts
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total Posts:&nbsp;
                            <span className="custom-list-sub-content-bold">{postsCount}</span>
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total Posts Resolved:&nbsp; 
                            <span className="custom-list-sub-content-bold">{postsResolved}</span>
                        </div>
                        <div className="custom-list-sub-content" style={{margin: '5px auto', fontSize: '14px'}}>
                            Total Posts yet to be resolved:&nbsp;
                            <span className="custom-list-sub-content-bold">{postsUnresolved}</span>
                        </div>
                    </div>
                )
            } 
            // console.log("RecentActivityReport::", {eventsDiv, postsDiv, discussionsDiv})

            if(eventsDiv)
                body.push(eventsDiv)
            if(postsDiv)
                body.push(postsDiv)
            if(discussionsDiv)
                body.push(discussionsDiv)

            if(body)
                bodyDiv.push(body)
        }

        const settings = {
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows : true,
            swipeToSlide: true,
            infinite: false,
            // dots: true,
            responsive :[{
                breakpoint:480,
                settings :{
                    slidesToShow : 2
                }
            },
            {
                breakpoint:768,
                settings:{
                    slidesToShow:3
                }
            }
            ]
        };

        let slickSliderElement = null;
        if (bodyDiv.length > 0) {
            if (bodyDiv[0].length > 0) {
                slickSliderElement = <Slider {...settings}>{bodyDiv}</Slider>
            }
        }


        return (
            <div style={{ marginBottom: "50px" }} key={this.props.community_pk}>
                <div style={{width: '100%', margin: '50px auto'}}>
                    <div id="section-subtitle">
                        {this.props.community_name + " - Recent Activity Report"}
                    </div> 
                    <div>
                        {slickSliderElement ?
                            <div style={{ marginRight: '60px', marginLeft: '15px' }}>
                                {slickSliderElement}
                            </div> :
                            <div className="dashboard-notice" 
                                style={{marginLeft: '30px', marginTop: '20px'}}>
                                <div className="custom-list-title-content">
                                    No activities to Report yet
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

var mapStateToProps = (store) => {
    return {
        is_mentor: (store.userProfileReducer.profileFields ? 
                        store.userProfileReducer.profileFields.is_mentor : false),
        // recentActivity: store.appDataReducer.recentActivityCommunityOwner
    }
}

export default connect(mapStateToProps)(RecentActivityReport);