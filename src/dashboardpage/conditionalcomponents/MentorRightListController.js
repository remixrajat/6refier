import React, { Component } from 'react';
import 'redux';
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-bootstrap';

import { getMentorDetails } from './action';
import MentorRightList from '../presentationalcomponents/MentorRightList';


class MentorRightListController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mentorSearchText: ""
        }
        this.setMentorSearchTextState = this.setMentorSearchTextState.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(getMentorDetails());
    }

    setMentorSearchTextState(e) {
        this.setState({ mentorSearchText: e.target.value })
    }


    render() {
        let modifiedMentorList = []

        if (this.props.mentorDetails) {
            if (this.state.mentorSearchText == "") {
                modifiedMentorList = this.props.mentorDetails
            }
            else{
                let searchText = this.state.mentorSearchText.toLowerCase()
                for(let i=0;i<this.props.mentorDetails.length;i++){
                    let first_name = this.props.mentorDetails[i].fields.first_name.toLowerCase()
                    let last_name = this.props.mentorDetails[i].fields.last_name.toLowerCase()
                    if(first_name.
                        indexOf(searchText)!=-1 || 
                            last_name.
                                indexOf(searchText)!=-1){
                                    modifiedMentorList.push(this.props.mentorDetails[i])
                                }
                    else{
                        let tagsList = JSON.parse(this.props.mentorDetails[i].fields.tag_values)
                        for(let j=0;j<tagsList.length;j++){
                            let tagName = tagsList[j].fields.tag_name.toLowerCase()
                            if(tagName.indexOf(searchText)!=-1){
                                modifiedMentorList.push(this.props.mentorDetails[i])
                                break
                            }
                        }
                    }
                }
            }
        }

        return (
            <Col xs={12}>
                <MentorRightList mentorDetails={modifiedMentorList}
                    mentorList={this.props.mentorDetails}
                    mentorSearchText={this.state.mentorSearchText}
                    setMentorSearchTextState={this.setMentorSearchTextState}
                    userId={this.props.userId} />
            </Col>
        )

    }

}

var mapStateToProps = (store) => {
    return { mentorDetails: store.dashboardDataReducer.mentorDetails };
}

export default connect(mapStateToProps)(MentorRightListController);