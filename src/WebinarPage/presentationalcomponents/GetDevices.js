class GetDevices {
    constructor() {
        // super(props);
       

    }

    static getDevices() {
        if (!window.navigator.mediaDevices || !window.navigator.mediaDevices.enumerateDevices) {
            // console.log("enumerateDevices() not supported.");
            return false;
        }
        let _this = this;
        return window.navigator.mediaDevices.enumerateDevices()
            .then(function (devices) {
                let audioInputDevices = []
                let audioOutputDevices = []
                let videoInputDevices = []
                let miscDevices = []
                // console.log(devices);
                devices.forEach(device => {
                    if (device.kind === "audioinput") {
                        audioInputDevices.push(device);
                    } else if (device.kind === "audiooutput") {
                        audioOutputDevices.push(device);
                    } else if (device.kind === "videoinput") {
                        videoInputDevices.push(device);
                    }else{
                        miscDevices.push(device);
                    }
                });
                return {
                    audioInputDevices:  audioInputDevices,
                    audioOutputDevices: audioOutputDevices,
                    videoInputDevices: videoInputDevices,
                    miscDevices:miscDevices
                } 
            }).catch(function (error) {
                console.log("Error occurred during device enumeration", error);
            });

        
    }

    static getDeviceList(){
        return {
            audioInputDevices: this.audioInputDevices,
            audioOutputDevices: this.audioOutputDevices,
            videoInputDevices: this.videoInputDevices
        }
    }

    getInputAudioDevices() {
        return this.audioInputDevices;
    }

    getOutputAudioDevices() {
        return this.audioOutputDevices;
    }

    getVideoDevices() {
        return this.videoInputDevices;
    }
}

export default GetDevices;