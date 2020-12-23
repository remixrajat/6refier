import React, { Component } from 'react'
import { Grid, Row, Alert, Col, Tab, Tabs, Button } from 'react-bootstrap';
import StreamComponent from './StreamComponent'
import QuestionsController from '../conditionalcomponents/QuestionHolderController';
import AttendeesController from '../conditionalcomponents/AttendeesController';
import ChatBoxController from '../conditionalcomponents/ChatBoxController';
import Preloader from '../../shared/Preloader/PreLoaderLarge'
import Loader from 'react-loader-advanced';
import CheckScreenSharePlugin from '../conditionalcomponents/CheckScreenSharePlugin';
import WebinarBottomBar from './WebinarBottomBar';
import { isXsDevice, isMobileDevice, isSmDevice } from '../../GlobalConstants';
import WebinarMediaDevicesTestModal from './WebinarMediaDevicesTest';
import RaiseHandController from '../conditionalcomponents/RaiseHandController'
import { ComplementaryButton } from '../../shared/RefierComponents/ComplementaryButton';


export default class WebinarComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			temp :false,
			showSettingModal: false,
			
		}
		window.addEventListener("resize", ()=>{
			this.setState({temp: !this.state.temp});
		});

		this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
	}

	closeSettingsModal() {
		this.setState({ showSettingModal: false });
	}

	toggleSettingsModal() {
		this.setState({ showSettingModal: !this.state.showSettingModal });
	}


	render() {
		let loadingMessageWhileAuthenticating = "Presenter Not Available..."
		let loadingMessageAfterAuthenticating = "Presenter Available but Webinar Not Started..."
		let loadingMessageForPresenter = "If you are a Presenter, Please Wait while we are authenticating you."
		let loadingsubMessageForPresenter = "( Refresh the Page, if it is taking more than 1 minute ... )"

		let errorList = this.props.errorMsg.map((msg) => {
			return (
				<li >{msg}</li>
			)
		});

		let tip1 = "If you are a Presenter and getting a black screen after starting the session, Please make sure other application is not using your Webcam."
		let tip2 = "If you are unable to see the presenter or faces the difficulty in connection, Please refresh the Page."

		let loader = <div>
			<div style={{ }}><Preloader /></div>
			<div style={{ marginTop: "20px" }} className="custom-preloader-message">
				{!this.props.presenterAvailable() ?
					loadingMessageWhileAuthenticating : loadingMessageAfterAuthenticating}
			</div>
			<div style={{ marginTop: "10px" }} className="custom-preloader-sub-message">
				{!this.props.presenterAvailable() ?
					loadingMessageForPresenter : null}
			</div>
			<div style={{ marginTop: "5px" }} className="custom-preloader-sub-message-2">
				{!this.props.presenterAvailable() ?
					loadingsubMessageForPresenter : null}
			</div>
			<div style={{ marginTop: '20px' }}>
				<ComplementaryButton 
					buttonText="Check Webinar Compatibility"
					onButtonClick={this.toggleSettingsModal}
				/>
			</div>
		</div>

		let showLoader = !this.props.presenterAvailable() ? true : false

		return (
			<Grid fluid>
				<WebinarMediaDevicesTestModal
						close={this.closeSettingsModal.bind(this)}
						showSettingModal={this.state.showSettingModal}
						isPresenter={this.props.isPresenter}>
				</WebinarMediaDevicesTestModal>
				<Row className="show-grid"
				>
					<Col md={8} xs={12}>
						<Loader show={showLoader} message={loader} backgroundStyle={{ backgroundColor: '#fbfbfb' }}
								foregroundStyle={{ color: '#797979', "maxHeight": "90vh" }}>
							<Grid fluid className="router-content-panel">
								{this.props.errorMsg.length > 0 ?
									<Alert bsStyle="info" onDismiss={this.handleAlertDismiss} >
										<ul className="custom-status">{errorList}</ul>
									</Alert>
									: null
								}

								<div style={{ "maxHeight": "70vh" }}>
									<StreamComponent event_details={this.props.event_details} webcamstreamuri={this.props.webcamstreamuri}
										screensharestreamuri={this.props.screensharestreamuri}
										startOrStopSessionHandler={this.props.startOrStopSessionHandler}
										startOrStopScreenshareHandler={this.props.startOrStopScreenshareHandler}
										isLiveVideo={this.props.isLiveVideo} isScreenSharing={this.props.isScreenSharing}
										isPresenter={this.props.isPresenter}
										displayMsg={this.props.displayMsg}
										userprofiledata={this.props.userprofiledata}/>
								</div>
								{!this.props.isPresenter ?
									<div>
										<Alert bsStyle="info" onDismiss={this.handleAlertDismiss} >
											{!this.props.getIsWebinarStartedByPresenter() ?
												<div className="custom-status">Webinar not yet started</div> :
												<div className="custom-status">Webinar is Ongoing! If you are not able to see Webinar please refresh the page after 5 sec. Thanks.</div>}
											{/* </ul> */}
										</Alert>
									</div>
									
									: null
								}
								{
									this.props.isPresenter? 
										<Row>
											<Col xs={12} style={{"margin": "30px 0 40px 0"}}>
												<CheckScreenSharePlugin  /> 
											</Col>
										</Row> : 
										null
								}
								{/* {
									!showLoader && ( isXsDevice() || isMobileDevice() || isSmDevice()) ?
										null :
										<Row>
											<Col xs={12} xsHidden style={{ "marginBottom": "60px" }}>
												<div style={{ "maxHeight": "60vh" }}>
													<Tabs justified defaultActiveKey={1} className="webinar-tabs">
														<Tab eventKey={1}
															style={{ "fontSize": "16px", "background": "white" }} title={"Questions"}>
															<QuestionsController eventid={this.props.eventid} />
														</Tab>
														<Tab eventKey={2}
															style={{ "fontSize": "16px", "background": "white" }} title={"Surveys"}>
															<QuestionsController eventid={this.props.eventid} />
														</Tab>
													</Tabs>
												</div>
											</Col>
										</Row>
								} */}
							</Grid>
						</Loader>
					</Col>
					
					{!showLoader && ( isXsDevice() || isMobileDevice() || isSmDevice())?
						<WebinarBottomBar {...this.props} /> :
						<Col md={4} xs={12} xsHidden>
							<div style={{"width": "90%" }}>
								<RaiseHandController
									eventid={this.props.eventid}
									isPresenter={this.props.isPresenter}
									// isPresenter={false}
								/>
							</div>
							<div style={{ "maxHeight": "50vh", "width": "90%","marginTop": "10px" }}>
								<ChatBoxController 
									ws={this.props.ws}
									eventid={this.props.eventid}
									// sendChatMessage={this.props.sendChatMessage}
									// chatMessageHandler={this.props.chatMessageHandler} 
								/>
							</div>
							<Row style={{"width": "96.3%"}}>
								<Col xs={12} style={{"marginTop": "10px"}}>
									<AttendeesController eventid={this.props.eventid}
										sendAddedUserToEventGroup={this.props.sendAddedUserToEventGroup} />

								</Col>
							</Row>
						</Col>
					}
					
				</Row>
			</Grid>
		);
	}
}
