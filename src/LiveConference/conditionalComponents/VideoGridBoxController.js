import React, { Component } from 'react';
import { connect } from 'react-redux';

import VideoGridBox from '../presentationalComponents/VideoGridBox';
import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';

import { isXsDevice, isMobileDevice } from '../../GlobalConstants';


const rowCol = {
    2 : {
        "row" : 1,
        "column": 2
    },
    3 : {
        "row" : 2,
        "column": 2
    },
    4 : {
        "row" : 2,
        "column": 2
    },
    5 : {
        "row" : 2,
        "column": 3
    },
    6 : {
        "row" : 2,
        "column": 3
    },
    7 : {
        "row" : 2,
        "column": 4
    },
    8 : {
        "row" : 2,
        "column": 4
    },
}


class VideoGridBoxController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sessionSubscriberList : [],
            participantList: [],
        }

        this.populateSubscribers = this.populateSubscribers.bind(this);
        this.populateParticipants = this.populateParticipants.bind(this);
    }

    componentWillMount() {
        this.setState({
            sessionSubscriberList: this.populateSubscribers(this.props),
            participantList: this.populateParticipants(this.props)
        })
    }

    componentWillReceiveProps(nextProps) {
        // console.log('VideoGridBoxController:: ', nextProps)
        this.setState({
            sessionSubscriberList: this.populateSubscribers(nextProps),
            participantList: this.populateParticipants(nextProps)
        })
    }

    populateParticipants(props) {
        if(!props.isLiveVideo) {
            return [];
        }

        let isSmallDevice = isXsDevice() || isMobileDevice()

        let count = props.presenterParticipants
        if(count === 0) 
            return 

        let result = [], i = 0;
        const participants = props.presenterParticipants

        if(props.isPresenter && props.localUser.getUserType() === 'presenter_participant' && !props.localUser.isVideoActive()) {
            result.push(
                <VideoGridBox
                    key={i++}
                    index={i}
                    user={props.localUser}
                    fullScreenStatus={props.fullScreenStatus}
                    isLocalUser={true}
                    isSubscriberPropsChanged={props.isSubscriberPropsChanged}
                    isParticipantPresenter={true}
                    isSmallDevice={isSmallDevice}
                />
            )
        }

        for(let participant of participants) {
            result.push(
                <VideoGridBox key={i++} 
                    index={i}
                    user={participant}
                    fullScreenStatus={props.fullScreenStatus}
                    isSubscriberPropsChanged={props.isSubscriberPropsChanged}
                    isParticipantPresenter={true}
                    isSmallDevice={isSmallDevice}
                /> 
            )
        }

        return result
    }

    populateSubscribers(props) {
        if(!props.isLiveVideo) {
            return;
        }
            
        let result = [];

        let count = props.subscribers ? props.subscribers.length : 0

        if((props.isPresenter && props.localUser.getUserType() === 'presenter') ||
            (props.isPresenter && props.localUser.getUserType() === 'presenter_participant' && props.localUser.isVideoActive())) {
            count++;
        }   

        if(count === 0) {
            return (
                <div className="video-grid-row" 
                    style={{background: '#797979', justifyContent: 'center', alignItems: 'center'}}>
                    <h4 style={{fontFamily: 'Arial', color: 'white', textAlign: 'center'}}>
                        The presenters will be joining the webinar shortly...Please Wait...
                    </h4>
                </div>
            )
        }

        if(count === 1 && ((props.isPresenter && props.localUser.getUserType() === 'presenter') ||
            (props.isPresenter && props.localUser.getUserType() === 'presenter_participant' && props.localUser.isVideoActive())) ) {
            let resultVid = []

            resultVid.push(
                <div key={100} className="video-grid-row">
                    <VideoGridBox
                        key={100}
                        index={1}
                        user={props.localUser}
                        fullScreenStatus={props.fullScreenStatus}
                        isLocalUser={true}
                        isSubscriberPropsChanged={props.isSubscriberPropsChanged}
                        subscriberCount={props.subscriberCount}                            
                    />
                </div>
            )

            return resultVid 
        } 
        else if (count === 1) {
            return (
                <div key={100} className="video-grid-row">
                    <VideoGridBox
                        index={1}
                        key={100}
                        user={props.subscribers[0]}
                        fullScreenStatus={props.fullScreenStatus}
                        subscriberCount={props.subscriberCount}
                        isSubscriberPropsChanged={props.isSubscriberPropsChanged}
                        browserDetails={this.props.browserDetails}
                    />
                </div>
            )
        }

        let isSmallDevice = isXsDevice() || isMobileDevice()

        if(isSmallDevice) {
            let countLength = props.subscribers.length, resultVid = []

            if((props.isPresenter && props.localUser.getUserType() === 'presenter') ||
                (props.isPresenter && props.localUser.getUserType() === 'presenter_participant' && props.localUser.isVideoActive())) {
                resultVid.push(
                    <VideoGridBox
                        key={-1}
                        index={100}
                        user={props.localUser}
                        fullScreenStatus={props.fullScreenStatus}
                        isSubscriberPropsChanged={props.isSubscriberPropsChanged}
                        subscriberCount={props.subscriberCount}
                        isLocalUser={true}
                    />
                )
            }
            
            for(let i = 0; i < countLength; i++) {
                resultVid.push(
                    <VideoGridBox key={i} 
                        index={i}
                        user={props.subscribers[i]}
                        fullScreenStatus={props.fullScreenStatus}
                        isSubscriberPropsChanged={props.isSubscriberPropsChanged}
                        subscriberCount={props.subscriberCount}
                        browserDetails={this.props.browserDetails}
                    /> 
                )
            }

            result.push(
                <div key={-1} style={{display: 'flex', flexDirection: 'column', overflowY: 'auto'}}
                    // className="video-grid-row"
                >
                    {resultVid}
                </div>
            )
            
        } else {
            let elCount = count, presenterAdd = 0, presenterAddFlag = 0, resultVid = [], row, column;
            const grid = rowCol[elCount];
    
            // console.log({grid})
    
            if(!grid) {
                row = Math.floor(count / 4);
                column = 4;
            } else {
                row = grid.row;
                column = grid.column;
            } 
    
            if((props.isPresenter && props.localUser.getUserType() === 'presenter') ||
                (props.isPresenter && props.localUser.getUserType() === 'presenter_participant' && props.localUser.isVideoActive()) ) {

                resultVid.push(
                    <VideoGridBox
                        key={-1}
                        index={100}
                        user={props.localUser}
                        fullScreenStatus={props.fullScreenStatus}
                        isSubscriberPropsChanged={props.isSubscriberPropsChanged}
                        subscriberCount={props.subscriberCount}
                        isLocalUser={true}
                    />
                )
                elCount--;
                presenterAdd = 1
                presenterAddFlag = 1
            }
    
            for(let i = 0; i < row; i++) {
                // let resultVid = []
    
                for(let j = (column * i) + presenterAdd; column * (i+1) - j > 0 && j <= elCount; j++) {
                    resultVid.push(
                        <VideoGridBox key={j - presenterAddFlag} 
                            index={j - presenterAddFlag}
                            user={props.subscribers[j - presenterAddFlag]}
                            fullScreenStatus={props.fullScreenStatus}
                            isSubscriberPropsChanged={props.isSubscriberPropsChanged}
                            subscriberCount={props.subscriberCount}
                            browserDetails={this.props.browserDetails}
                        /> 
                    )
                    // presenterAdd = 0
                }
    
                result.push (
                    <div className="video-grid-row" key={i}>
                        {resultVid}
                    </div>
                )

                presenterAdd = 0
                resultVid = []
            }
        }

        return result;
    }


    render() {
        // console.log('VideoGridBoxController:: props', this.props, this.state);

        let isSmallDevice = isXsDevice() || isMobileDevice()
        let subscriberCount = this.props.subscribers && this.props.subscribers.length || 0
        let partipantPresenterCount = this.props.presenterParticipants && this.props.presenterParticipants.length || 0
        if(this.props.isPresenter) subscriberCount++

        return (
            isSmallDevice ?
                <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <div style={partipantPresenterCount > 0 && subscriberCount > 1 ?
                        {height: '80%', display: 'flex', flexDirection: 'row'} :
                        {height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <div className="video-grid-wrapper" 
                            style={!this.props.isLiveVideo ? 
                                        {background: "#797979", width: '100%'} : 
                                        {width: '100%'}
                            }>
                            {this.state.sessionSubscriberList}
                            {!this.props.isLiveVideo ?
                                <div className="conference-control-button-start">
                                    <ComplementaryButton 
                                        disabled={this.props.joinSessionButtonDisabled}
                                        buttonId="ask_question_button"
                                        onButtonClick={this.props.joinSession}
                                        buttonText="Click here to Start Session"
                                    />
                                </div> :
                                null
                            }
                        </div>
                    </div>
                    {this.props.isLiveVideo && this.state.participantList && 
                    this.state.participantList.length > 0 ?
                        <div style={{marginTop: '10px', display: 'flex', flexDirection: 'row', 
                            alignItems: 'center', overflowX: 'auto', paddingTop: '5px', overflowY: 'hidden'}}>
                            {this.props.isLiveVideo ? this.state.participantList : null}
                        </div>
                        : null
                    }
                </div>

                :
                
                <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
                    <div className="video-grid-wrapper" 
                        style={!this.props.isLiveVideo ? 
                                    {background: "#797979", width: '100%'} : 
                                    this.state.participantList && 
                                    this.state.participantList.length > 0 ?
                                        {width: '90%'} :
                                        {width: '100%'}
                        }>
                        {this.state.sessionSubscriberList}
                        {!this.props.isLiveVideo ?
                            <div className="conference-control-button-start">
                                <ComplementaryButton 
                                    disabled={this.props.joinSessionButtonDisabled}
                                    buttonId="ask_question_button"
                                    onButtonClick={this.props.joinSession}
                                    buttonText="Click here to Start Session"
                                    subscriberCount={this.state.sessionSubscriberList && this.state.sessionSubscriberList.length}
                                />
                            </div> :
                            null
                        }
                    </div>
                    {this.props.isLiveVideo && this.state.participantList && 
                    this.state.participantList.length > 0 ?
                        <div style={{width: '10%', display: 'flex', flexDirection: 'column', 
                            alignItems: 'center', overflowY: 'auto'}}>
                            {this.props.isLiveVideo ? this.state.participantList : null}
                        </div>
                        : null
                    }
                </div>
        );
    }
}


var mapStateToProps = (store) => {
    return {
    };
};


export default connect(mapStateToProps)(VideoGridBoxController);