import React from "react";
import Slider from 'react-slick';
import StreamController from '../presentationalComponents/StreamController';
import { Glyphicon, Button } from 'react-bootstrap';

function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
    <div
        className={className + ' custom-slick-next-prev'}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
    />
    );
}

function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
    <div
        className={className + ' custom-slick-next-prev'}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
    />
    );
}

class VideosComponentController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainPresenterId:null,
            mainPresenterUser:null
        }
        this.SETTINGS = {
            speed: 500,
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            infinite: false,
            responsive: [{
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            }],
            nextArrow: <CustomNextArrow />,
            prevArrow: <CustomPrevArrow />

        };
        this.slickSliderElement = null;

        this.switchMainPresenter = this.switchMainPresenter.bind(this);
        this.getMainPresenter = this.getMainPresenter.bind(this);
        this.getSecondaryVideoElementList = this.getSecondaryVideoElementList.bind(this);
        this.resetMainPresenter = this.resetMainPresenter.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.subscribers || nextProps.subscribers.length === 0  ) {
            this.slickSliderElement = null;
            this.setState({
                mainPresenterId:null,
                mainPresenterUser:null
            });
            return null;
        }
        this.getSecondaryVideoElementList(nextProps)
    }

    getSecondaryVideoElementList(props, connectionId){
        let self = this;
        let mainPresenterId = connectionId ? connectionId :this.state.mainPresenterId;
        this.slickSliderElement = null;

        let subscribedRemoteUsers = props.subscribers.map((subscriber, idx) => {
            if (subscriber.connectionId !== mainPresenterId){
                return (
                    <div>
                    <div key={idx + 1} className="conference-other-presenter123" id={"remoteUsers" + (idx + 1)}>
                        <StreamController
                            user={subscriber}
                            remoteUser={true}
                            switchMainPresenter={self.switchMainPresenter}
                            fullScreenStatus={props.fullScreenStatus}
                        />
                    </div>
                    </div>
                )
            }
        });
        console.log('VideosComponentController:: ', props.subscribers, mainPresenterId);
        if( props.localUser && mainPresenterId && props.localUser.connectionId !== mainPresenterId){

            let localUserSecondaryVid = (
                <div>
                <div key={subscribedRemoteUsers.length+1} className="conference-other-presenter" id={"remoteUsers" + (subscribedRemoteUsers.length+1)}>
                                            <StreamController
                                                user={props.localUser}
                                                remoteUser={true}
                                                switchMainPresenter={self.switchMainPresenter}
                                                fullScreenStatus={props.fullScreenStatus}
                                            />
                                        </div>
                                        </div>
            );
            subscribedRemoteUsers.push(localUserSecondaryVid);
            console.log('VideosComponentController:: adding local user to slick');
        }
        if (subscribedRemoteUsers && subscribedRemoteUsers.length > 0) {
            this.slickSliderElement = <Slider {...this.SETTINGS}>{subscribedRemoteUsers}</Slider>
            // this.slickSliderElement = subscribedRemoteUsers
        }
        if (!connectionId && mainPresenterId){
            this.setState({
                mainPresenterUser: this.getMainPresenter(mainPresenterId)
            });
        }
    }

    resetMainPresenter(connectionId){
        if (connectionId !== this.state.mainPresenterId){
            return;
        }
        this.state.mainPresenterId = null;
        this.state.mainPresenterUser = null;
        this.getSecondaryVideoElementList(this.props, null);
        this.setState({
            mainPresenterId: null,
            mainPresenterUser:   null
        })
    }



    switchMainPresenter(connectionId) {
        console.log('switchMainPresenter:: ', this.state.mainPresenterId, '\t', connectionId)
        if (this.state.mainPresenterId === connectionId) {
            return ;
        }
        let mainPresenterUser= this.getMainPresenter(connectionId);
        this.getSecondaryVideoElementList(this.props, connectionId);
        this.setState({
            mainPresenterId: connectionId,
            mainPresenterUser: mainPresenterUser
        })
        
    }

    getMainPresenter(mainPresenterId) {
        console.log('getMainPresenter:: ', mainPresenterId)
        let mainPresenter;
        if ( this.props.localUser && (this.props.subscribers.length === 0 || this.props.localUser.connectionId === mainPresenterId) ) {
            console.log('getMainPresenter::localUser ',  this.props.localUser)
            mainPresenter = this.props.localUser;
        } else {
            for (let i = 0; i < this.props.subscribers.length; i++) {
                if (this.props.subscribers[i].connectionId === mainPresenterId)
                    // console.log('getMainPresenter::remoteuser ', this.props.subscribers[i])
                    mainPresenter =  this.props.subscribers[i];
            }
        }
        return mainPresenter;

    }

    render() {
        console.log('VideosComponentController:: ', this.props, this.slickSliderElement, this.state);
        
        const mySessionId = this.props.mySessionId;
        const mySessionName = this.props.mySessionName;
        const localUser = this.props.localUser;        
        let isSubscribersPresent = this.props.subscribers && this.props.subscribers.length > 0;
        let fullScreenStatusClass = this.props.fullScreenStatus ? "conference-main-video-container  container-fullscreen" : "conference-main-video-container"; 

        return (
            <div style={{overflow: 'hidden' }}>
                <div className={ fullScreenStatusClass } id="layout" style={this.props.isLiveVideo?{background:'none'}:{}}>

                        <div className="conference-main-presenter">
                            <StreamController
                                user={this.state.mainPresenterUser || this.props.localUser}
                                switchMainPresenter={this.switchMainPresenter}
                                fullScreenStatus={this.props.fullScreenStatus}
                                resetMainPresenter={this.resetMainPresenter}
                            />
                        </div>

                    {!this.props.isLiveVideo ?
                        <div className="conference-control-button-start">
                            <Button 
                                onClick={this.props.joinSession}
                                className="refier_custom_button_new_selected_2" 
                                style={{position: 'relative', left: '-33%'}}
                            >Click here to Start Session
                            </Button>
                        </div> :
                        null
                    }
                </div>
                {/* {   this.slickSliderElement && this.slickSliderElement.length > 0 ? */}
                    <div className="conference-other-presenters">
                        {this.slickSliderElement}
                    </div>
                    {/* : null */}
                {/* } */}

            </div>
        );
    }
}

export default VideosComponentController;