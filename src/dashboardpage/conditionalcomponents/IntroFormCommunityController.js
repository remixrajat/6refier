import React,{Component} from 'react';
import 'redux';
import {connect} from 'react-redux'
// import Slider from 'react-slick';
import { getMentorDetails } from './action';
import { Col, Row, Grid } from 'react-bootstrap';
import IntroFormCommunityList from '../presentationalcomponents/IntroFormCommunityList';


class IntroFormCommunityController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            communitySearchText: ""
        }
        this.setCommunitySearchTextState = this.setCommunitySearchTextState.bind(this)
    }

    setCommunitySearchTextState(e) {
        this.setState({ communitySearchText: e.target.value })
    }

    render(){
        
        let modifiedCommunityList = []
        if (this.props.communityDetails) {
            if (this.state.communitySearchText == "") {
                modifiedCommunityList = this.props.communityDetails
            }
            else{
                let searchText = this.state.communitySearchText.toLowerCase()
                for(let i=0;i<this.props.communityDetails.length;i++){
                    let entity_name = this.props.communityDetails[i].fields.entity_name.toLowerCase()
                    if(entity_name.
                        indexOf(searchText)!=-1){
                            modifiedCommunityList.push(this.props.communityDetails[i])
                                }
                    else{
                        let tagsList = JSON.parse(this.props.communityDetails[i].fields.tag_values)
                        for(let j=0;j<tagsList.length;j++){
                            let tagName = tagsList[j].fields.tag_name.toLowerCase()
                            if(tagName.indexOf(searchText)!=-1){
                                modifiedCommunityList.push(this.props.communityDetails[i])
                                break
                            }
                        }
                    }
                }
            }
        }

        let style = {};
        let header = null;
        if(this.props.newUserForm) {
            style= {"background": "white", "maxHeight": "50vh", "overflowY": "scroll"}
            header = <div className="intro_form_modal_heading_title" style={{"textAlign": "center"}}>
                            <p>Hey{this.props.userName?
                                " " + this.props.userName:""}, Join at least 1 community</p>
                        </div>
        }
    
    return(
        <IntroFormCommunityList communityDetails = {modifiedCommunityList}
            communityList={this.props.communityDetails}
            dispatch={this.props.dispatch}
            communitySearchText={this.state.communitySearchText}
            setCommunitySearchTextState={this.setCommunitySearchTextState}
            submitDetails={this.props.submitDetails}
            showSubmitButton={this.props.showSubmitButton}
            loaderStatus={this.props.loaderStatus}
            userId={this.props.userId} 
            isMobile={this.props.isMobile} 
            newUserForm={this.props.newUserForm ? this.props.newUserForm : false} 
        />
    )

}

}

var mapStateToProps = (store) => {
    //console.log(store);
    return {
        communityDetails: store.appDataReducer.communityListState,
    };
}

export default  connect(mapStateToProps)(IntroFormCommunityController);