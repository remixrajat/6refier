import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Grid, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { getDiscussionRooms } from './action'
import DiscussionGroupFeedCard from '../presentationalComponents/DiscussionGroupFeedCard';


class DiscussionGroupFeedController extends Component{
    componentWillMount() {
        this.props.dispatch(getDiscussionRooms(this.props.match.params.communityId))
    }

    render(){
        // console.log("DiscussionGroupFeedController:: props", this.props);

        let content = [];
        if(this.props.rooms && this.props.rooms.length > 0) {
            for(let room of this.props.rooms) {       
                let desc = room.fields.group_description.length > 200 ? 
                                room.fields.group_description.slice(0, 200) + " ..." :  
                                room.fields.group_description; 
                
                content.push(<DiscussionGroupFeedCard
                                desc={desc}
                                room={room}
                                communityId={this.props.match.params.communityId}
                            />)
            }
        }

        return (
            <div>
                <Col xs={12} mdOffset={0} md={12} lgOffset={1} lg={10} style={{"marginTop": "50px"}}>
                    { this.props.rooms && this.props.rooms.length > 0 ? content : 

                        <div className="refier_custom_title" style={{fontSize: '1em',color: 'unset'}}>
                            <p>No Discussion Rooms is created by community owner.</p>
                            <p> Please request Community Owner to initiate discussion a room.  </p>
                        </div>
                    }
                </Col>
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    return {
        rooms: store.groupDiscussionReducer.getAllRooms
    }
}

export default connect(mapStateToProps)(DiscussionGroupFeedController);