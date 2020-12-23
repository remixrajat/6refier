import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Grid, Row, Col, Button, ButtonGroup, Glyphicon, OverlayTrigger, Popover } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import Slider from 'material-ui/Slider'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FontAwesome from 'react-fontawesome';
import WebinarMediaDevicesTestModal from './WebinarMediaDevicesTest';

import ReactionsController from '../conditionalcomponents/ReactionsController'

import WebinarDetails from './WebinarDetails';

export default class StreamComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isplaying: true,
			ismuted: 0.5,
			isWide: false,
			isFullScreen: false,
			sessionStarted: false,
			screenShared: false,
			isDisable: false,
			showSettingModal: false,
			displayMsg: this.defaultMsg
		}
		this.switchTofullScreen = this.switchTofullScreen.bind(this)
		this.playpause = this.playpause.bind(this)
		this.muteme = this.muteme.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.changeWidth = this.changeWidth.bind(this)
		this.switchSessionState = this.switchSessionState.bind(this)
		this.switchScreenShare = this.switchScreenShare.bind(this)
		this.getSessionStartButtons = this.getSessionStartButtons.bind(this)
		this.getSessionControlButtons = this.getSessionControlButtons.bind(this)
		this.getPopover = this.getPopover.bind(this)
		this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isScreenSharing !== this.props.isScreenSharing) {
			//console.log("LiveBroadcast::aaa::StreamComponent::isScreenSharing", nextProps.isScreenSharing)
		}
		if (nextProps.isLiveVideo !== this.props.isLiveVideo) {
			//console.log("LiveBroadcast::aaa::StreamComponent::isLiveVideo", nextProps.isLiveVideo)
		}
		if (this.props.isPresenter) {
			this.setState({ ismuted: 0 })
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.isScreenSharing !== this.props.isScreenSharing) {
			//console.log("LiveBroadcast::aaa::StreamComponent::isScreenSharing", nextProps.isScreenSharing)
		}
		if (nextProps.isLiveVideo !== this.props.isLiveVideo) {
			//console.log("LiveBroadcast::aaa::StreamComponent::isLiveVideo", nextProps.isLiveVideo)
		}
	}



	playpause() {
		this.setState({ isplaying: !this.state.isplaying })
	}

	disableSessionStateBtn() {
		this.setState({ isDisable: false });
	}

	switchSessionState(e) {
		console.log("starting session");
		// this.setState({ sessionStarted: !this.state.sessionStarted })
		this.props.startOrStopSessionHandler(e);
		this.setState({ isDisable: true });
		setTimeout(this.disableSessionStateBtn.bind(this), 2000);
		// this.setState({displayMsg: this.defaultMsg})
	}

	switchScreenShare() {
		if (!this.props.isPresenter) {
			return;
		}
		// this.setState({displayMsg: this.screenshareStartMsg})
		this.props.startOrStopScreenshareHandler();

	}

	changeWidth() {
		this.setState({ isWide: !this.state.isWide })
	}

	switchTofullScreen() {
		//console.log("switching to full screen")
		this.setState({ isFullScreen: !this.state.isFullScreen });
	}

	handleChange(slider, value) {
		if (this.props.isPresenter) {
			return;
		}
		this.setState({ ismuted: value });
	}

	muteme() {
		if (this.props.isPresenter) {
			return;
		}
		this.setState({ ismuted: this.state.ismuted === 0 ? 1 : 0 })
	}

	fullScreenClickHandler() {
		this.switchTofullScreen();
		screenfull.request(findDOMNode(this.player));
		// this.player.requestFullScreen()
	}

	onLeavingFullScreen(e) {
		//console.log("Pressed : ", e)
		if (e.keyCode == 27) {
			this.switchTofullScreen();
		}
	}

	getSessionStartButtons() {
		return (<div style={{ "background": "black", "padding": "10px 0px", "textAlign": "center" }}>
			{this.props.isLiveVideo ?
				<Button bsStyle="primary"
					onClick={this.switchSessionState}
					bsSize="small"
					disabled={this.state.isDisable}
					className="refier_custom_button_black_border">
					<Glyphicon glyph="glyphicon glyphicon-stop" style={{ fontSize: "6.5em", padding: "0px 5px" }} /><br />
				</Button> :
				<Button bsStyle="primary"
					onClick={this.switchSessionState}
					bsSize="small"
					disabled={this.state.isDisable}
					className="refier_custom_button_black_border">
					<Glyphicon glyph="glyphicon glyphicon-play" style={{ fontSize: "6.5em", padding: "0px 5px" }} /><br />
				</Button>
			}
			{this.props.isPresenter ?
				this.props.isScreenSharing ?
					null :
					<div className="refier-custom_player_button_group">
						{/* <OverlayTrigger trigger={['hover']} placement="left" overlay={this.getPopover('Start Screen Sharing')}>
							<Button bsStyle="primary"
								onClick={this.switchScreenShare}
								bsSize="small"
								className="refier_custom_button_black_border"
								style={{"fontSize": "0.7em"}}
								disabled={!this.props.isLiveVideo}>
								<FontAwesome
									name="desktop"
									size='2x'
								/>
							</Button>
						</OverlayTrigger> */}
						<OverlayTrigger trigger={['hover']} placement="left" overlay={this.getPopover('Device Settings')}>
							<Button bsStyle="primary"
								onClick={this.toggleSettingsModal}
								bsSize="small"
								style={{"fontSize": "0.8em"}}
								className="refier_custom_button_orange_border">
								<FontAwesome
									name="cog"
									size='2x'
								/>
							</Button>
						</OverlayTrigger>
					</div>
				:
				<div className="refier-custom_player_button_group">
						<OverlayTrigger trigger={['hover']} placement="left" overlay={this.getPopover('Device Settings')}>
							<Button bsStyle="primary"
								onClick={this.toggleSettingsModal}
								bsSize="small"
								style={{"fontSize": "0.8em"}}
								className="refier_custom_button_orange_border">
								<FontAwesome
									name="cog"
									size='2x'
								/>
							</Button>
						</OverlayTrigger>
					</div>
			}


		</div>);
		// return (<div style={{ "background": "black", "padding": "10px 0px", "textAlign": "center" }}>
		// 	{this.props.isLiveVideo ?

		// 		<Button bsStyle="primary"
		// 			onClick={this.switchSessionState}
		// 			bsSize="small"
		// 			disabled={this.state.isDisable}
		// 			className="refier_custom_button_player">
		// 			<Glyphicon glyph="facetime-video" style={{ fontSize: "1.5em", padding: "0px 5px" }} /><br />
		// 			{this.props.isPresenter ? "Stop Session" : "Leave Session"}
		// 		</Button>
		// 		:
		// 		<Button bsStyle="primary"
		// 			onClick={this.switchSessionState}
		// 			bsSize="small"
		// 			disabled={this.state.isDisable}

		// 			/* style={{"background":"transparent","color":"white","borderColor":"white"}} */
		// 			className="refier_custom_button_player">
		// 			<Glyphicon glyph="facetime-video" style={{ fontSize: "1.5em", padding: "0px 5px" }} /><br />
		// 			{this.props.isPresenter ? "Start Session" : "Join Session"}
		// 		</Button>
		// 	}
		// 	{this.props.isPresenter ?
		// 		this.props.isScreenSharing ?
		// 			null
		// 			:
		// 			<div style={{"marginTop": "10px"}}>
		// 				<Button bsStyle="primary"
		// 					onClick={this.switchScreenShare}
		// 					bsSize="small"
		// 					className="refier_custom_button_player"
		// 					style={{ marginLeft: "5px", marginRight: "5px" }}
		// 					disabled={!this.props.isLiveVideo} title="Please click on Start Session.">
		// 					<FontAwesome
		// 						name="desktop"
		// 						size='2x'
		// 					/><br />
		// 					Start Screen Sharing
		// 				</Button>
		// 				<Button bsStyle="primary"
		// 					onClick={this.toggleSettingsModal}
		// 					bsSize="small"
		// 					className="refier_custom_button_player">
		// 					<FontAwesome
		// 						name="cog"
		// 						size='2x'
		// 					/>
		// 					<br />
		// 					Device Settings
		// 				</Button>
		// 			</div>
		// 		:
		// 		null
		// 	}
		// </div>);
	}

	closeSettingsModal() {
		this.setState({ showSettingModal: false });
	}

	toggleSettingsModal() {
		this.setState({ showSettingModal: !this.state.showSettingModal });
	}

	getPopover(text) {
		const popoverHoverFocus = (
			<Popover id="refier_custom_webinar_popover" title={text}></Popover>
		);
		return popoverHoverFocus;
	}


	getSessionControlButtons() {

		return (
			<div>
				<div style={{ position: "absolute", zIndex: "50", bottom: "0%", right: "20%" }}>
					<ReactionsController event_details={this.props.event_details}
					userprofiledata={this.props.userprofiledata}/>	
			</div>
				{
					this.props.webcamstreamuri ?
						<OverlayTrigger trigger={['hover']} placement="left" overlay={this.getPopover( this.props.isPresenter ? 'Click to End Session': 'Leave Session')}>
							<button className="button custom-video-option-button-red" onClick={this.switchSessionState} style={{ position: "absolute", zIndex: "50", bottom: "8%", right: "1%" }}>
								<FontAwesome
									name="stop-circle"
								/>
							</button>
						</OverlayTrigger>
						: null
				}
				{this.props.isPresenter ?
					<div>
						<OverlayTrigger trigger={['hover']} placement="left" overlay={this.getPopover('Click for Settings')}>
							<button className="button custom-video-option-button" onClick={this.toggleSettingsModal} style={{ position: "absolute", zIndex: "50", top: "20%", right: "1%" }}>
								<FontAwesome
									name="cog"
								/>
							</button>
						</OverlayTrigger>

						<OverlayTrigger trigger={['hover']} placement="left" overlay={this.getPopover('Click to Mute/Unmute')}>
							<button className="button custom-video-option-button" style={{ position: "absolute", zIndex: "50", bottom: "32%", right: "1%", display: "none" }}>
								<FontAwesome
									name="microphone"
								/>
							</button>
						</OverlayTrigger>

						<OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={this.getPopover('Click to Screenshare')}>
							<button className="button custom-video-option-button" onClick={this.switchScreenShare}
								disabled={this.props.isScreenSharing ? true : false}
								style={{ position: "absolute", zIndex: "50", top: "5%", right: "1%", display: this.props.isScreenSharing ? "none" : "" }} >
								<FontAwesome
									name="desktop"
								/>
							</button>
						</OverlayTrigger>
						<div style={{ position: "absolute", display: "inline-block", top: "1%", right: "1%", zIndex: 50 }}>
							<FontAwesome
								name="circle"
								style={{ color: "white", zIndex: 50, backgroundColor: "red", borderRadius: "9px", fontSize: "1.3em" }}
							/>
							<FontAwesome
								name="circle"
								style={{ color: "red", zIndex: 50, position: "absolute", top: "20%", left: "3.5px", fontSize: ".7em" }}
							/>
						</div>
					</div>
					: null}
			</div>
		);
	}

	render() {
		console.log("webcamstreamuri", this.props);
		let reactPlayer = (
			<div style={{ "background": "white", "margin": "0 0" }}>
				<div>

					<div style={{ "marginTop": "0px", "zIndex": "2", position: "relative", "background": "black", height: "65vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
						{/* <video src={this.props.webcamstreamuri} autoplay controls></video> */}

						{
							// this.props.displayMsg ?
							// 	// style={{display:"flex", position: "absolute",top: "50%", left: "38%",zIndex: "50", color: "#f0f0f0"}}
							// 	<div style={{ color: "#f0f0f0" }}>
							// 		{this.props.isPresenter ? this.props.displayMsg : "CLICK 'JOIN SESSION' TO JOIN WEBINAR"}
							// 	</div>
							// 	: null
						}
						<div>
							{!this.props.webcamstreamuri ? this.getSessionStartButtons() : this.getSessionControlButtons()
								// <button className="button custom-video-option-button" onClick={()=>{this.setState()}} style={{ position: "absolute", zIndex: "50", top: "70%", right: "1%" }}>...</button>
							}
						</div>


						{this.props.webcamstreamuri ?
							!this.props.isScreenSharing ?
								<ReactPlayer onClick={this.playpause}
									onKeyUp={this.onLeavingFullScreen.bind(this)}
									onKeyDown={this.onLeavingFullScreen.bind(this)}
									ref={player => { this.player = player }}
									controls={false}
									volume={this.state.ismuted}
									width={"100%"}
									height={"65vh"}
									url={this.props.webcamstreamuri}
									playing={true}
								/>
								:
								<div>
									<ReactPlayer onClick={this.playpause}
										onKeyUp={this.onLeavingFullScreen.bind(this)}
										onKeyDown={this.onLeavingFullScreen.bind(this)}
										ref={player => { this.player = player }}
										controls={false}
										volume={this.state.ismuted}
										width={"100%"}
										height={"65vh"}
										url={this.props.screensharestreamuri}
										playing={this.state.isplaying} />
								</div>

							: null}

					</div>
				</div>
			</div>
		)
		if (this.state.isWide) {
			return (
				<div>
					<WebinarMediaDevicesTestModal
						close={this.closeSettingsModal.bind(this)}
						showSettingModal={this.state.showSettingModal}
						isPresenter={this.props.isPresenter}>
					</WebinarMediaDevicesTestModal>

					<Col xs={12}
						style={{ "margin": "0px 0px", "padding": "0px 0px" }}>
						{reactPlayer}
					</Col>
				</div>
			)
		}
		else {
			return (
				<div>
					<WebinarMediaDevicesTestModal
						close={this.closeSettingsModal.bind(this)}
						showSettingModal={this.state.showSettingModal}
						isPresenter={this.props.isPresenter}>
					</WebinarMediaDevicesTestModal>
					<Col xs={12} md={12} style={{"background": "white", "padding": "10px"}}>
						<WebinarDetails event_details={this.props.event_details} />
					</Col>
					<Col xs={12} md={12} style={{ "margin": "0px 0px", "padding": "0px 0px" }}>
						{reactPlayer}
					</Col>
				</div>
			)
		}
	}

}

