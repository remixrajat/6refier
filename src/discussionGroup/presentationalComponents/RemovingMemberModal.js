import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Grid, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { leaveDiscussionRoom} from '../conditionalComponents/action'

import Preloader from "../../shared/Preloader/PreLoader"


class RemovingMemberModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showRemoveButton: false,
            
            isRemovingMember:0,
        }
        this.onRemoveMember = this.onRemoveMember.bind(this);


        this.removingMemberFailed = this.removingMemberFailed.bind(this)
        this.removingMemberinProgress = this.removingMemberinProgress.bind(this)
        this.removingMemberReset = this.removingMemberReset.bind(this)
        this.removingMemberSuccessful = this.removingMemberSuccessful.bind(this)
    }


    removingMemberinProgress() {
        this.setState({isRemovingMember : 2})
    }

    removingMemberSuccessful() {
        this.setState({ isRemovingMember: 1 })
    }

    removingMemberFailed() {
        this.setState({isRemovingMember : -1})
    }

    removingMemberReset() {
        this.setState({ isRemovingMember: 0 })
    }


    onRemoveMember(joiningId) {
        this.removingMemberinProgress()
        let returnPromise = this.props.dispatch(leaveDiscussionRoom
          (this.props.groupId,joiningId, true,false));
        returnPromise.then((response) => {
            console.log("RemovingMemberModal::onRemoveMember::response", response)
              if (response) {
                  this.props.dispatch({ type: 'getGroupMembers', data: response });
                  this.removingMemberSuccessful()
                  setTimeout(() => {
                    this.removingMemberReset()   
                    this.props.hideLeaveRoomModal() 
                }, 1000)
              }
              else {
                  this.removingMemberFailed()
            }
        })
    }

    render() {

        return (
            <div>
                <div className="refier-custom-list-content" style={{margin:"10px"}}>
                    Are you sure you want to remove {this.props.joiningMember}?</div>
                {
                    !this.state.showRemoveButton && this.state.isRemovingMember === 0 ? 
                        <div>
                        <Button 
                            className="refier_custom_button_new_selected_2 btn btn-default" 
                            onClick={() => this.onRemoveMember(this.props.joiningId)}>
                            Yes
                        </Button>
                        <Button 
                                className="refier_custom_button_secondary btn btn-default"
                                onClick={() => this.props.hideLeaveRoomModal()}>
                            No
                        </Button>
                        </div> :
                           null
                   }
                {
                    this.state.isRemovingMember === 2 ?
                        <Preloader /> :
                        null
                }
                {
                    this.state.isRemovingMember === 1 ? 
                        <p style={{"margin": "0"}} className="form-status-success">Success</p> :
                        this.state.isRemovingMember === -1 ?
                            <p style={{"margin": "0"}}  className="form-status-fail">request failed</p> :
                            null
                }
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    return {
    }
}

export default connect(mapStateToProps)(RemovingMemberModal);