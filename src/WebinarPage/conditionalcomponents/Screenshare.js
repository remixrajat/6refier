


class Screenshare{
    constructor(){
        this.isShareScreenDisabled = true;
        this.videoURL = null;
        this.screen_constraints = null;
    }

    
    showChromeExtensionStatus() {
        let maxTries = 0;
        if(typeof window.getChromeExtensionStatus !== 'function') return;
        
        let gotResponse;
        window.getChromeExtensionStatus(function(status) {
            gotResponse = true;
            document.getElementById('chrome-extension-status').innerHTML = 'Chrome extension status is: <b>' + status + '</b>';
            console.info('getChromeExtensionStatus', status);
        });
        
        maxTries++;
        if(maxTries > 15) return;
        setTimeout(function() {
            if(!gotResponse) showChromeExtensionStatus();
        }, 1000);
    }

    streamEndHandler() {
        videouri = null;
        // document.querySelector('video').src = null;
        this.isShareScreenDisabled = false;
    }

    getStreamURL(stream) {
        // share this "MediaStream" object using RTCPeerConnection API

        // document.querySelector('video').src = URL.createObjectURL(stream);
        this.videoURL  = URL.createObjectURL(stream);

        stream.oninactive = stream.onended = this.streamEndHandler;

        // document.getElementById('capture-screen').disabled = false;
        this.isShareScreenDisabled = false;
    }

    getMediaStream(){
        let videouri ;

        navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
        navigator.getUserMedia(this.screen_constraints,this.getStreamURL , function(error) {
            console.error('getScreenId error', error);
            alert('Failed to capture your screen. Please check Chrome console logs for further information.');
        });
    }


    getScreenIDHandler(error, sourceId, screen_constraints) {
        // error    == null || 'permission-denied' || 'not-installed' || 'installed-disabled' || 'not-chrome'
        // sourceId == null || 'string' || 'firefox'
        // getUserMedia(screen_constraints, onSuccess, onFailure);

        this.isShareScreenDisabled = false;

        if (IsAndroidChrome) {
            screen_constraints = {
                mandatory: {
                    chromeMediaSource: 'screen'
                },
                optional: []
            };
            
            screen_constraints = {
                video: screen_constraints
            };

            error = null;
        }

        if(error == 'not-installed') {
            alert('Please install Chrome extension. See the link below.');
            return;
        }

        if(error == 'installed-disabled') {
            alert('Please install or enable Chrome extension. Please check "chrome://extensions" page.');
            return;
        }

        if(error == 'permission-denied') {
            alert('Please make sure you are using HTTPs. Because HTTPs is required.');
            return;
        }
        console.info('getScreenId callback \n(error, sourceId, screen_constraints) =>\n', error, sourceId, screen_constraints);
        this.isShareScreenDisabled = true;
        this.screen_constraints = screen_constraints;
        this.getMediaStream();
    }

    setShareScreenButtonStatus() {
        if(this.isShareScreenDisabled = true  && !this.videoURL ) {
            this.isShareScreenDisabled = false;
        }
    }

    shareScreenOnclickHandler = function() {
        this.isShareScreenDisabled = true;
        

        setTimeout(setShareScreenButtonStatus, 5000);

        window.getScreenId(this.getScreenIDHandler);
    }


}

export default Screenshare ; 