import React, {Component} from 'react'
import { connect } from 'react-redux'

import { joinRoom } from './action'

import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';
import Preloader from "../../shared/Preloader/PreLoader"


class JoinRoomController extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showJoinButton: false,
            joinLoaderStatus: 0,
            isJoined: false,
        }
        this.joinDiscussionRoom = this.joinDiscussionRoom.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.roomDetails) {
            this.setState({ showJoinButton: nextProps.roomDetails.fields.is_user_in_group })
        }
    }

    joinDiscussionRoom(groupId, communityId) {
        let joinPromise = this.props.dispatch(joinRoom(groupId, communityId));
        this.setState({ joinLoaderStatus: 2 })
        let self=this
        joinPromise.then((resp) => {
            let status = 0
            if(typeof resp == "undefined" || resp === "False")  status = -1;
            else if(resp === "True") status = 1;
            
            self.setState({ joinLoaderStatus: status })                   
            setTimeout(() => {
                self.setState({ joinLoaderStatus: 0 });   
                if (status === 1) {
                    self.props.setIsJoined()
                    self.setState({ showJoinButton: true, isJoined:true })
                }         
            }, 1000)
        })
    }

    render(){
        // console.log("JoinRoomController:: props", this.props);

        return (
            <div>
                {
                    !this.state.showJoinButton && this.state.joinLoaderStatus === 0 ? 
                        <ComplementaryButton 
                            onButtonClick={() => this.joinDiscussionRoom(this.props.roomDetails.pk, this.props.communityId)}
                            buttonText="Join Room"
                        /> :
                        ""
                }
                {
                    this.state.joinLoaderStatus === 2 ?
                        <Preloader /> :
                        ''
                }
                {
                    this.state.joinLoaderStatus === 1 ? 
                        <p style={{"margin": "0"}} className="form-status-success">Success</p> :
                        this.state.joinLoaderStatus === -1 ?
                            <p style={{"margin": "0"}}  className="form-status-fail">request failed</p> :
                            ''
                }
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    return {
    }
}

export default connect(mapStateToProps)(JoinRoomController);