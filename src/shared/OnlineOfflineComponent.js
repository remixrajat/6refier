import React from 'react';
import FontAwesome from 'react-fontawesome';


class OnlineOfflineComponent extends React.Component {
    constructor(props) {
        super(props);

        this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
        this.state = {
            isbrowserOnline: window.navigator.onLine,
            isShowBanner: !window.navigator.onLine
        }
        this.onlineCheckId = null;
        this.offlineStartTime = null;
    }

    updateOnlineStatus(event) {
        // console.log('OnlineOfflineComponent ::', event);
        
        let self = this;
        if (event.type === "offline") {

            this.offlineStartTime = new Date().getTime();
            
            this.onlineCheckId = setInterval(() => {

                let currentTime = new Date().getTime();
                if (Math.abs(currentTime - self.offlineStartTime) >= 5000) {
                    self.setState({ isbrowserOnline: false, isShowBanner: true });
                    clearInterval(self.onlineCheckId);
                }
            }, 1000)
            return;
        }
        if (this.onlineCheckId !== null) {
            clearInterval(this.onlineCheckId);
            this.onlineCheckId = null;
        }
        this.setState({ isbrowserOnline: true });
        this.offlineStartTime = null;
        setTimeout(()=>{
            self.setState({ isShowBanner: false });
        },5000);
    }

    componentDidMount() {
        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
    }


    render() {

        let onlineBanner = (
            <div>
                <div data-phase="6" className="refier-offline-bar">
                    <div className="refier-offline-bar-content" >
                        {this.state.isbrowserOnline ?
                            <div>
                                <FontAwesome
                                    title="Disconnect"
                                    name="circle"
                                    style={{color:"green", marginRight: '1em',fontSize:'1.5em'}}
                                />
                                <span>Your device is connected to internet.</span>
                            </div>
                            :
                            <div>
                                <FontAwesome
                                    title="Disconnect"
                                    name="circle"
                                    style={{color:"red", marginRight: '1em',fontSize:'1.5em'}}
                                />
                                <span>Your device has lost its internet connection. Attempting to reconnect ...</span>
                            </div>
                        }
                    </div>

                </div>
            </div>
        );

        return (
            this.state.isShowBanner ? onlineBanner : null
        );

    }
}

export default OnlineOfflineComponent;