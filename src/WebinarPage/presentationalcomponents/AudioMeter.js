// https://github.com/cwilso/volume-meter/blob/master/main.js
import React, { Component } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class AudioMeter extends Component {
    constructor(props) {
        super(props);
        this.mediaStreamSource = null;
        this.audioContext = null;
        this.meter = null;
        var canvasContext = null;
        var WIDTH = 500;
        var HEIGHT = 50;
        this.rafID = null;
        // this.createAudioMeter = this.createAudioMeter.bind(this)
        // this.volumeAudioProcess = this.volumeAudioProcess.bind(this)
        this.gotStream = this.gotStream.bind(this)
        this.didntGetStream = this.didntGetStream.bind(this)
        this.audioMeter = this.audioMeter.bind(this)
        this.stopAudioTest = this.stopAudioTest.bind(this);
        this.isMicMuted = this.isMicMuted.bind(this);
        this.setErrorMsg = this.setErrorMsg.bind(this);
        this.state = { temp: false, isTestStarted: false, errMsg: [] }
    }

    createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
        let processor = audioContext.createScriptProcessor(512);
        processor.onaudioprocess = this.volumeAudioProcess.bind(this);
        processor.clipping = false;
        processor.lastClip = 0;
        processor.volume = 0;
        processor.clipLevel = clipLevel || 1;
        processor.averaging = averaging || 0.98;
        processor.clipLag = clipLag || 750;

        // this will have no effect, since we don't copy the input to the output,
        // but works around a current Chrome bug.
        processor.connect(audioContext.destination);

        processor.checkClipping =
            function () {
                if (!this.clipping)
                    return false;
                if ((this.lastClip + this.clipLag) < window.performance.now())
                    this.clipping = false;
                return this.clipping;
            };

        processor.shutdown =
            function () {
                this.disconnect();
                this.onaudioprocess = null;
            };
        // console.log("createAudioMeter:: ", this);

        return processor;
    }

    volumeAudioProcess(event) {
        // console.log("volumeAudioProcess:: ",this.meter.clipLevel);
        let buf = event.inputBuffer.getChannelData(0);
        let bufLength = buf.length;
        let sum = 0;
        let x;

        // Do a root-mean-square on the samples: sum up the squares...
        for (let i = 0; i < bufLength; i++) {
            x = buf[i];
            if (Math.abs(x) >= this.meter.meterclipLevel) {
                this.meter.meterclipping = true;
                this.meter.meterlastClip = window.performance.now();
            }
            sum += x * x;
        }

        // ... then take the square root of the sum.
        let rms = Math.sqrt(sum / bufLength);

        // Now smooth this out with the averaging factor applied
        // to the previous sample - take the max here because we
        // want "fast attack, slow release."
        this.meter.volume = Math.max(rms, this.meter.volume * this.meter.averaging);
        this.setState({ temp: !this.state.temp })
    }

    componentWillUnmount() {
        this.stopAudioTest();
    }

    stopAudioTest() {
        if (!this.meter) {
            return;
        }

        // console.log("Stopping Audio Test");
        this.meter.shutdown();
        this.meter.volume = 0;
        this.setState({ temp: !this.state.temp })
        if (this.mediaStreamSource && this.mediaStreamSource.mediaStream && this.mediaStreamSource.mediaStream.getAudioTracks().length > 0) {
            this.mediaStreamSource.mediaStream.getAudioTracks()[0].stop();
        }
        this.meter = null;
    }

    audioMeter() {
        this.setState({ isTestStarted: !this.state.isTestStarted })
        if (this.meter) {
            this.stopAudioTest();
            return;
        }

        // console.log("Starting Audio Test");
        this.setState({ errMsg: [] })
        // monkeypatch Web Audio
        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        // grab an audio context
        this.audioContext = new AudioContext();

        // Attempt to get audio input
        try {
            // monkeypatch getUserMedia
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;

            // ask for an audio input
            navigator.getUserMedia(
                {
                    "audio": {
                        "mandatory": {
                            "googEchoCancellation": "false",
                            "googAutoGainControl": "false",
                            "googNoiseSuppression": "false",
                            "googHighpassFilter": "false"
                        },
                        "optional": []
                    },
                }, this.gotStream, this.didntGetStream);
        } catch (e) {
            console.error('getUserMedia threw exception :' + e);
        }

    }


    didntGetStream() {
        // console.log('Stream generation failed.');
        this.setErrorMsg("Cannot access microphone(Mic.), microphone is being used by other Application. Please close that application.")
        return false;
    }

    setErrorMsg(msg) {
        let temp = this.state.errMsg;
        temp.push(msg);
        this.setState({ errMsg: this.state.errMsg });
    }

    getErrMsgDiv() {
        let msgs = this.state.errMsg.map((msg) => {
            return (<p>{msg}</p>);
        });
    }



    gotStream(stream) {
        // Create an AudioNode from the stream.
        // console.log('Stream generation gotStream().');
        this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
        // console.log('Stream generation gotStream().', this.mediaStreamSource);
        // Create a new volume meter and connect it.
        this.meter = this.createAudioMeter(this.audioContext);
        this.mediaStreamSource.connect(this.meter);
        this.props.enumerateDevices();
        // console.log("Meter value :: ", this.meter);
        // kick off the visual updating
        // drawLoop();
    }

    // drawLoop(time) {
    //     // clear the background
    //     canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

    //     // check if we're currently clipping
    //     if (this.meter.checkClipping())
    //         canvasContext.fillStyle = "red";
    //     else
    //         canvasContext.fillStyle = "green";

    //     // draw a bar based on the current volume
    //     canvasContext.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT);

    //     // set up the next visual callback
    //     rafID = window.requestAnimationFrame(drawLoop);
    // }

    isMicMuted() {
        if (this.mediaStreamSource && this.mediaStreamSource.mediaStream && this.mediaStreamSource.mediaStream.getAudioTracks().length > 0) {
            if (this.mediaStreamSource.mediaStream.getAudioTracks()[0].muted) {
                // console.log("isMicMuted ::", this.mediaStreamSource.mediaStream.getAudioTracks()[0].muted)
                return true
            }
            // console.log("isMicMuted ::", this.mediaStreamSource.mediaStream.getAudioTracks()[0].muted)
            return false;

        }
        return false;
    }



    render() {
        // console.log("AudioTest", this.props.audioInputDeviceList, this.props.audioOutputDeviceList);

        return (
            <div>
                {this.props.getDeviceListDropDown(this.props.audioInputDeviceList)}
                <div style={{
                    position: "relative", display: 'flex', flexDirection: 'row',
                    flexWrap: 'wrap', alignContent: 'space-between', justifyContent: 'center', marginTop: '50px'
                }}>

                    <meter style={{ width: "45%" }} value={this.meter ? this.meter.volume * 1.45 : 0}>{this.meter ? (this.meter.volume * 100) : 0}{" % "}</meter>


                    <FontAwesome
                        name={this.isMicMuted() ? "microphone-slash" : "microphone"}
                        style={{ color: this.isMicMuted() ? "red" : "black", marginLeft: '20px' }}
                        title={this.isMicMuted() ? "Mic is mute. Please Un-mute from sound settings of your system" : null}
                    />


                </div>
                <div style={{textAlign:'center'}}>
                    <Button style={{ fontSize: "10px", margin: '20px 0 20px 0' }}
                        className="refier_custom_button_new_selected_2"
                        onClick={this.audioMeter}>{this.state.isTestStarted ? "Stop Test" : "Test Microphone"}
                    </Button>

                    <div style={{ color: "red", fontSize: "12px" }}>
                        {this.isMicMuted() ? "Mic is mute. Please Un-mute from settings" : null}
                        {this.getErrMsgDiv()}
                    </div>
                </div>
            </div>
        )
    }
}