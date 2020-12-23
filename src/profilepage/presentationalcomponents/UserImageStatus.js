import React from 'react';
import { Grid, Row, Col, Image, Glyphicon } from 'react-bootstrap';

import ProfileImageUpload from './ProfileImageUpload';

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'


class UserImageStatus extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isHover: false, isImageUpload: false, showModal: true }
		this.imageSize = { 
			width: "150px", height: "150px", borderRadius: "50%" 
		}
		this.smallImageSize = {
			width: "50px", height: "50px", borderRadius: "50%",
		}
		this.onHoverStyle = {
			width: "150px",
			height: "150px",
			display: "inline-block",
			backgroundColor: "rgba(0,0,0,.5)",
			zIndex: "10000",
			color: "#fff",
			transition: "all .3s ease",
			textDecoration: "none",
			position: "relative",
			top: "-150px",
			borderRadius: "50%",
			// border: "solid 1px #f2f2f2"
		}
		this.onSmallHoverStyle = {
			width: "50px",
			height: "50px",
			display: "inline-block",
			backgroundColor: "rgba(0,0,0,.5)",
			zIndex: "10000",
			color: "#fff",
			transition: "all .3s ease",
			textDecoration: "none",
			position: "relative",
			top: "-50px",
			borderRadius: "50%",
			// border: "solid 1px #f2f2f2"
		}
	}

	mouseOver() {
		if (!this.props.writeAccess()) {
			return;
		}
		this.setState({ isHover: true });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.imageUploadProgress !== this.props.imageUploadProgress) {
			if (nextProps.imageUploadProgress === 1 || 
				nextProps.imageUploadProgress === -1) {
				let self=this
				setTimeout(() => {
					self.setState({ showModal: false });  
					nextProps.imageUploadReset()
				}, 1000)
			}
		}
	}

	showImageUplaoder(e) {
		this.props.imageUploadReset()
		this.setState({ isImageUpload: !this.state.isImageUpload })
		this.setState({ showModal: true })
		this.setState({ isHover: false });
	}

	mouseOut() {
		this.setState({ isHover: false });
	}

	close() {
		this.setState({ showModal: false });
		this.setState({ isImageUpload: !this.state.isImageUpload })
	}

	render() {
		// console.log("User Image Status :: props :: ", this.props)

		return (
			<div style={{
				"textAlign": this.props.isRight ? "-webkit-right" : "-webkit-center",
				"marginTop": "10px", display: 'flex', justifyContent: 'center'
			}}>
				<div data-label="User Image" 
					style={this.props.isSmall? this.smallImageSize : this.imageSize}
					onMouseOver={this.mouseOver.bind(this)} 
					onMouseLeave={this.mouseOut.bind(this)}>
					<img 
						src={this.props.profile_photo ?
							(MEDIA_URL_TEXT + this.props.profile_photo) : this.props.defaultVal}
						 style={this.props.isSmall?this.smallImageSize:this.imageSize} />
					{this.state.isHover ?
						<div style={this.props.isSmall ? this.onSmallHoverStyle : this.onHoverStyle}
							onClick={this.showImageUplaoder.bind(this)}>
							<span style={this.props.isSmall ? 
								{
									paddingTop: "15px",
									paddingRight:"20px",
									display: "inline-block",
									fontSize: "12px"
								} : 
								{
									paddingTop: "70px",
									display: "inline-block",
									fontSize: "14px"
								}}>
								<Glyphicon glyph="pencil" />
							</span>
							{this.props.isSmall ? null:
								<span style={{ paddingLeft: "10px", fontSize: "12px" }}>
									Edit Image
								</span>
							}
						</div>
						: null
					}
					{this.state.isImageUpload ?
						<ProfileImageUpload showModal={this.state.showModal}
							onClose={this.close.bind(this)}
							submitProfilePicture={this.props.submitProfilePicture}
							imageUploadProgress={this.props.imageUploadProgress}
						/>
						:
						null
					}
				</div>

				{this.props.status ?
					<div>
						<br />
						<div className="refier_text_on_light__3" data-label="Status">
							<p><span>{this.props.status}</span></p>
						</div>
					</div>
					:
					null
				}

			</div>
		);
	}
};

export default UserImageStatus;