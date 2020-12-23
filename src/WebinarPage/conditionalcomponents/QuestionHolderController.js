import React,{Component} from 'react';
import {connect } from 'react-redux';
import QuestionsHolder from '../presentationalcomponents/QuestionsHolder.js';
import {getQuestionsEvent, setQuestionStatus } from './action.js'


class QuestionsController extends Component{
    constructor(props){
        super(props);

        this.REFRESHQUESTIONEVENT = "refreshquestion"
        this.setQuestionStatus = this.setQuestionStatus.bind(this)
    }
    
    componentWillMount() {
        //console.log("LiveBroadcast::action::getAllQuestionsOfEvent");
        if (this.props.eventid) {
            this.props.dispatch(getQuestionsEvent(this.props.eventid));
        }
    }

    setQuestionStatus(e) {
        if (this.props.eventid) {
            let setStatusPromise = this.props.dispatch(setQuestionStatus(this.props.eventid, e));
            setStatusPromise.then(resp => {
                this.props.ws.emit(this.REFRESHQUESTIONEVENT, JSON.stringify("refresh"))
            })
        }
    }
    
    render(){
        return (
            <QuestionsHolder {...this.props}
                setQuestionStatus={this.setQuestionStatus}/>
        );
        
    }
}

let mapStateToProps = (store) => {
    return {
        profileFields : store.userProfileReducer.profileFields,
        eventQueriesList: store.webinarPageReducer.eventQueries,
        webinarQuestionsList: store.webinarPageReducer.webinarQuestion,

    }
}

export default connect(mapStateToProps)(QuestionsController);
