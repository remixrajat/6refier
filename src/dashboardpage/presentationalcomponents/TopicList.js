import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

import TopicCard from './TopicCard';
import Preloader from '../../shared/Preloader/PreLoader'


export default class TopicList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topicSearchText: "",
            previewCardId: ''
        }
        this.setTopicSearchTextState = this.setTopicSearchTextState.bind(this);
        this.expandCard = this.expandCard.bind(this);
        this.previewCard = this.previewCard.bind(this);
    }

    setTopicSearchTextState(e) {
        this.setState({ topicSearchText: e.target.value })
    }

    expandCard(id) {
        this.setState({previewCardId: id});
    }
    
    previewCard() {
        this.setState({previewCardId: ''});
    }

    render() {
        // console.log("TopicList::this.props ", this.props)

        let body = undefined;

        let modifiedTopicList = [], relevantTopicsToShow = [], otherTopicsToShow=[]
        if (this.props.topics) {

            if (this.state.topicSearchText == "") {
                modifiedTopicList = this.props.topics;
            }
            else {
                let searchText = this.state.topicSearchText.toLowerCase();
                for(let topic of this.props.topics){
                    let tag_name = topic.fields.tag_name.toLowerCase();
                    if( tag_name .indexOf(searchText) !== -1) {
                        modifiedTopicList.push(topic);
                    }
                }
            }

            for (let topic of modifiedTopicList) {
                if (topic.fields.is_relevant) {
                    relevantTopicsToShow.push(
                        <div
                            onMouseEnter={() => this.expandCard(topic.pk)}
                            onMouseLeave={this.previewCard}
                            key={topic.pk}
                            // className="custom-item-border"
                        >
                            {
                                this.state.previewCardId !== '' && this.state.previewCardId === topic.pk
                                    ? <TopicCard
                                        dispatch={this.props.dispatch}
                                        link={topic.pk}
                                        topicDetails={topic}
                                        previewCard={false}
                                        profileId={this.props.userId} />
                                    : <TopicCard
                                        dispatch={this.props.dispatch}
                                        link={topic.pk}
                                        topicDetails={topic}
                                        previewCard={true}
                                        profileId={this.props.userId} />
                            }
                        </div>)
                }
                else {
                    otherTopicsToShow.push(
                        <div
                            onMouseEnter={() => this.expandCard(topic.pk)}
                            onMouseLeave={this.previewCard}
                            key={topic.pk}
                            // className="custom-item-border"
                        >
                            {
                                this.state.previewCardId !== '' && this.state.previewCardId === topic.pk
                                    ? <TopicCard
                                        dispatch={this.props.dispatch}
                                        link={topic.pk}
                                        topicDetails={topic}
                                        previewCard={false}
                                        profileId={this.props.userId} />
                                    : <TopicCard
                                        dispatch={this.props.dispatch}
                                        link={topic.pk}
                                        topicDetails={topic}
                                        previewCard={true}
                                        profileId={this.props.userId} />
                            }
                        </div>)
                }
            }

            // body = topicsToShow;
        }

        return (
                <div style={{backgroundColor:"white"}}>
                    {!this.props.topics ?
                        <div style={{ "textAlign": "center", marginTop: "30px" }}>
                            <Preloader copies={5} placeholder="short_card" shimmer={true} />
                        </div> :
                        this.props.topics.length == 0 ?
                            <div className="custom-list-content">Sorry! We have no Topics as of now.</div> 
                            :
                            <Grid fluid>
                                <Row className="custom-list-content" style={{padding:"10px 10px"}}>
                                    <input type="text" onChange={(e) => this.setTopicSearchTextState(e)} 
                                        value={this.state.topicSearchText} placeholder="Search Topic"
                                        style={{width:"100%",paddingLeft:"5px"}}/>
                                </Row>
                                {relevantTopicsToShow.length > 0 ?
                                    <Row className="sub-list-header" style={{ margin: "10px 10px" }}>
                                        Suggested Topics
                                    </Row>
                                    :
                                    null
                                }
                                {relevantTopicsToShow}

                                {relevantTopicsToShow.length > 0 && otherTopicsToShow.length>0?
                                    <Row className="sub-list-header" style={{ margin: "10px 10px" }}>
                                        Other Topics
                                    </Row>
                                    :
                                    null
                                }
                                {otherTopicsToShow}
                            </Grid>
                    }
            </div>
        )

    }
}