import React, { Component } from 'react';
import Loader from 'react-loader-advanced';


export default class OvVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.switchMainPresenter = this.switchMainPresenter.bind(this);
        this.setVideoLayout = this.setVideoLayout.bind(this);
        this.populateVideos = this.populateVideos.bind(this);
        this.userChangedSignalHandler = this.userChangedSignalHandler.bind(this);
        this.streamDestroyedHandler = this.streamDestroyedHandler.bind(this);
        this.streamCreatedHandler = this.streamCreatedHandler.bind(this);
        this.state = {
            videoAspectRatio: 3 / 4,
            videoHeight: undefined,
            videoWidth: undefined,
            showVideoPreloader:true
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.setVideoLayout);
        this.populateVideos(this.props);
        console.log('OvVideoComponent :: componentDidMount() ');
        this.setVideoLayout();
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.user){
            return;
        }
        let currentStreamId = this.props.user ? this.props.user.getStreamManager().stream.streamId : null;
        let incomingStreamId = nextProps.user.getStreamManager().stream.streamId;
        if(  (!incomingStreamId || (currentStreamId === incomingStreamId ) )){
            console.log('OvVideoComponent :: componentWillReceiveProps :: rejecting video update ',currentStreamId , incomingStreamId);
            return;
        }
        console.log('OvVideoComponent :: componentWillReceiveProps :: not rejecting video update ',currentStreamId , incomingStreamId);
        this.populateVideos(nextProps);
    }

    setVideoLayout() {
        const videoContainer = document.getElementById('layout');
        const WIDTH = videoContainer.offsetWidth;
        const HEIGHT = videoContainer.offsetHeight;
        const availableRatio = HEIGHT / WIDTH;
        console.log('OvVideoComponent', { HEIGHT, WIDTH }, availableRatio)
        this.setState({
            videoAspectRatio: availableRatio,
            videoHeight: HEIGHT,
            videoWidth: WIDTH,
            showVideoPreloader:true
        });
        let self =this;
        setTimeout(()=>{

                self.setState({
                    showVideoPreloader:false
                })
            
        },1000)
        
    }


    populateVideos(param){
        if (param.user && param.user.streamManager && this.refs.conference_ref) {
            param.user.getStreamManager().addVideoElement(this.refs.conference_ref);
        }

        if (param.user && param.user.streamManager && param.user.streamManager.session && this.refs.conference_ref) {
            let self = this;
            param.user.streamManager.session.on('signal:userChanged', this.userChangedSignalHandler);            

            param.user.streamManager.session.on('streamDestroyed', this.streamDestroyedHandler);

            param.user.streamManager.session.on('streamCreated', this.streamCreatedHandler );
        }
    }

    userChangedSignalHandler(event) {
        if(!event){
            return;
        }
        console.log('OvVideoComponent :: signal:userChanged 1', event, this.props.user.getConnectionId());
        if(event.from.connectionId !== this.props.user.connectionId){
            return;
        }
        console.log('OvVideoComponent :: signal:userChanged 2', event, this.refs.conference_ref);
        let isVideoAdded = this.props.user.getStreamManager().addVideoElement(this.refs.conference_ref);
        this.setState({
            showVideoPreloader:true
        })
        setTimeout(()=>{
            this.setState({
                showVideoPreloader:false
            })
        },1000)
        
    }

    streamDestroyedHandler(event) {
          
        if(event.reason === "disconnect" ){
            console.log('StreamDestroyed Event thrown', event, event.stream.connection.connectionId);
            this.props.resetMainPresenter(event.stream.connection.connectionId);
        }else{
            console.log('StreamDestroyed Event thrown doing nothing', event.stream.connection.connectionId , this.props.user.connectionId);
        }
        
    }

    streamCreatedHandler(event){
        if(event.stream.connection.connectionId === this.props.user.getConnectionId()){
            console.log('StreamCreated Event thrown for current vid',event, this.props);
        }else{
            console.log('StreamCreated Event thrown for different vid',event, this.props);
        }
        // self.userChangedSignalHandler();
    }

    switchMainPresenter() {
        let connectionId = this.props.user.connectionId;
        this.props.switchMainPresenter(connectionId);
    }

    componentWillUnmount(){
        try{
            if(this.props.user && this.props.user.streamManager && this.props.user.streamManager.session){
                this.props.user.streamManager.session.off('signal:userChanged',this.userChangedSignalHandler);
            }
            
            this.props.user.streamManager.session.off('streamDestroyed', this.streamDestroyedHandler);
            this.props.user.streamManager.session.off('streamCreated', this.streamCreatedHandler);
        }catch(error){
            console.log(error);
        }   
    }
    


    render() {
        if(this.props.user && this.props.user.streamManager && this.props.user.streamManager.remote && this.refs.conference_ref){
            this.refs.conference_ref.muted = this.props.user.getStreamManager().remote ? false: true;
            console.log('OvVideoComponent ::video remote :: ',this.props.user.getStreamManager().remote , this.refs.conference_ref.muted );
        }
        console.log('OvVideoComponent::Props', this.props );
        let height = this.state.videoHeight; 
        let width = this.state.videoWidth;
        console.log('OvVideoComponent:: ', height, width ,this.state.videoHeight , this.state.videoWidth );
        let spinner = (<span className="dual-ring-preloader" style={{position:'relative', top:height/2}}></span>)
        return (
           
            <Loader show={this.state.showVideoPreloader} message={spinner}>
                <span className="nickname">{this.props.user.getNickname()  }</span>
                <video
                    // onClick={this.switchMainPresenter}
                    autoPlay={true}
                    id={'video-' + this.props.user.getStreamManager().stream.streamId}
                    ref="conference_ref"
                    className="conference-video"
                    style={this.props.fullScreenStatus ? 
                        {} : 
                        { height: height, width: width}
                    }
                />
            </Loader>
        );
    }
}