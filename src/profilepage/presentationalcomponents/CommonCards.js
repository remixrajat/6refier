import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ButtonToolbar, ControlLabel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
// import AutosuggestTextBox from '../../shared/AutosuggestInput/presentationalcomponents/autosuggestTextBox';
// import {formatdateFunction} from '../../HelperFunctions/formatDateFunction'

export default class CommonCards extends Component {
	constructor(props) {
		super(props);
		this.list3 = [];
	}

	createEditForms() {
		let list3 = [];
		if(this.props.userProfileData.length === undefined || this.props.userProfileData.length === 0 ){
			return;
		}
		for (let i = 0; i < this.props.userProfileData.length; i++) {
			if(this.props.userProfileData[i].is_dummy){
				break;
			}
			let formdata = this.props.userProfileData[i].formdata;
			if (!formdata) {
				continue;
			}
			let profileforms;
			let forms = [];
			for (let j = 0; j < formdata.length; j++) {

				if (!formdata[j].isShow) {
					continue;
				}
				if (formdata[j].isImage) {

					continue;
				} else if (formdata[j].isDate) {
					let dob = "";
					if (formdata[j].value) {
						let date = new Date(formdata[j].value);
						let day = date.getDate();
						let month = date.getMonth() + 1;
						let year = date.getFullYear();

						if (month < 10) month = "0" + month;
						if (day < 10) day = "0" + day;

						dob = year + "-" + month + "-" + day;
					}
					forms.push(

						<FormGroup style={{"margin": "5px 0" }}>
							<Row>
								<Col xs={4}>
									<ControlLabel 
									className="custom-list-content-gray"
									// className="refier_text_on_light__4"
									// style={{ 'fontWeight': '500', "fontSize": "14px", "margin":"5px 0px"}}
									>{formdata[j].label}</ControlLabel>
								</Col>
								<Col xs={6}>
									<FormControl type="date" 
									name={formdata[j].key} defaultValue={dob}
									className="custom-list-content"
									// className="refier_text_on_light__3"
									// style={{ 'fontWeight': '600', "fontSize": "14px"}} 
									placeholder={formdata[j].label} />

								</Col>
							</Row>
						</FormGroup>
					);
				} else if (formdata[j].isCheckbox) {
					forms.push(
						<FormGroup style={{"margin": "5px 0" }}>
							<ControlLabel
							className="refier_text_on_light__4"
									style={{ 'fontWeight': '500', "fontSize": "14px"}}
									>{formdata[j].label}</ControlLabel>
							<input type="checkbox" style={{"marginLeft":"10px"}}
							defaultChecked={formdata[j].value} name={formdata[j].key} />
						</FormGroup>
					);
				} 
				// else if(formdata[j].isAutosuggestInstitute){
				// 	<AutosuggestTextBox  placeholder="Institute Lookup..." 
                //             onchangeDynamicFetch = {this.onchangeDynamicFetchInstitutesName.bind(this)}
                //             inputValue = {this.props.instituteAutoSuggestProps}
                //             onSuggestionSelected ={this.onSuggestionSelected.bind(this)} doNotReset={true}
				// 			defaultValue = {formdata[j].value} 
                //              /> 
				// }
				else {
					forms.push(
						<FormGroup >
							<FormControl type="text" defaultValue={formdata[j].value} 
							name={formdata[j].key} placeholder={formdata[j].label}
							// className="refier_text_on_light__3"
									// style={{ 'fontWeight': '600', "fontSize": "14px"}} 
									className="custom-list-content"
									 />
						</FormGroup>
					);
				}

			}
			list3.push(
				<form ref={(formD) => { profileforms = formD }} >
					{forms}
				</form>
			)
			list3.push(<ButtonToolbar style={{ "marginBottom": "20px", "marginTop": "10px" }}>
				<Button bsStyle="primary" bsSize="small" className="refier_custom_button_save"
				onClick={() => { let idx = i; this.props.onSaveDetails(profileforms, this.props.userProfileData[idx]) }}>Save</Button>
				<Button bsStyle="danger"  bsSize="small" className="refier_custom_button_cancel"
				onClick={() => { let idx = i; this.props.delete(this.props.userProfileData[idx]) }}>Delete</Button>
			</ButtonToolbar>);
			//console.log("CommonCardsBlah::", this.props.userProfileData[i].formdata, list3);
		}
		return list3;
	}
	createAddDetailsForm() {
		//console.log("createAddDetailsForm::",this.props.userProfileData)
		let list3 = [];
		
		let formdata ;
		formdata = this.props.userProfileData[0].formdata;
		
		//console.log("CommonCardsBlah::createAddDetailsForm::", this.props.userProfileData[0].formdata, list3);
		if (formdata === undefined || formdata.length < 0 ) {
			return [];
		}
		if (!formdata){
			return [];
		}
		let profileforms;
		let forms = [];
		for (let j = 0; j < formdata.length; j++) {

			if (!formdata[j].isShow) {
				continue;
			}
			if (formdata[j].isImage) {
				continue;
			} else if (formdata[j].isDate) {
				forms.push(
					<FormGroup style={{"margin": "5px 0" }}>
							<Row>
								<Col xs={4}>
									<ControlLabel 
									className="custom-list-content-gray"
									// className="refier_text_on_light__4"
									// style={{ 'fontWeight': '500', "fontSize": "14px", "margin":"5px 0px"}}
									>{formdata[j].label}</ControlLabel>
								</Col>
								<Col xs={6}>
									<FormControl type="date" 
									name={formdata[j].key}
									className="custom-list-content"
									// className="refier_text_on_light__3"
									// style={{ 'fontWeight': '600', "fontSize": "14px"}} 
									placeholder={formdata[j].label} />

								</Col>
							</Row>
						</FormGroup>
				)
			} else if (formdata[j].isCheckbox) {
				forms.push(
					<FormGroup style={{"margin": "5px 0" }}>
							<ControlLabel
							// className="refier_text_on_light__4"
							// 		style={{ 'fontWeight': '500', "fontSize": "14px"}}
							className="custom-list-sub-content"
									>{formdata[j].label}</ControlLabel>
							<input type="checkbox" style={{"marginLeft":"10px"}}
							defaultChecked={formdata[j].value} name={formdata[j].key} />
							
						</FormGroup>
				);
			} else {
				forms.push(
					<FormGroup >
							<FormControl type="text" defaultValue={""} 
							name={formdata[j].key} placeholder={formdata[j].label} 
							// className="refier_text_on_light__3"
							// 		style={{ 'fontWeight': '600', "fontSize": "14px"}} 
							className="custom-list-content"
									/>
					</FormGroup>
				);
			}
			// this.props.userProfileData[i].model + this.props.userProfileData[i].pk

		}
		list3.push(
			<form ref={(formD) => { profileforms = formD }} >
				{forms}
			</form>
		)
		list3.push(<ButtonToolbar style={{ "marginBottom": "20px", "marginTop": "10px" }}>
			<Button bsStyle="primary" 
				className="refier_custom_button_save"
			 onClick={() => { this.props.onSave(profileforms) }} >Save</Button>
			<Button bsStyle="danger" className="refier_custom_button_cancel" 
				onClick={this.props.onCancel} >Cancel</Button>
		</ButtonToolbar>);
		//console.log("CommonCardsBlah::createAddDetailsForm::", this.props.userProfileData[0].formdata, list3);
		return list3;
	}

	createShowProfileDetails() {
		//console.log("createShowProfileDetails::");
		let listitems = [];
		if(this.props.userProfileData === undefined || this.props.userProfileData.length <=0 ){
			return;
		}

		for (let i = 0; i < this.props.userProfileData.length; i++) {
			if(this.props.userProfileData[i].is_dummy){
				continue;
			}
			let formdata = this.props.userProfileData[i].formdata;

			if (!formdata) {
				return [];
			}
			let temp = []
			for (let k = 0; k < formdata.length; k++) {
				//console.log("CommonCardsBlah::createShowProfileDetails::", this.props.userProfileData[i], formdata[k].isShow);
				if (!formdata[k].isShow) {
					continue;
				}
				let style = {}
				let applyClass = "";
				if (k === 0) {
					// style = { 'fontWeight': '700', "fontSize": "14px", "margin": "12px 0", "textAlign": "left" };
					// applyClass = "refier_text_on_light__3";
					style={'marginTop':'10px'}
					applyClass = "custom-list-content";
				} else {
					// style = { 'fontWeight': '700', "fontSize": "12px", "margin": "12px 0" };
					// applyClass = "refier_text_on_light__4";
					applyClass = "custom-list-sub-content";
				}
				if (formdata[k].isImage) {
					continue;
				} else if (formdata[k].isDate) {
					let dob ;
					if (!formdata[k].value){
						// dob= "Date of Completion/Leaving : --";
						dob = null
					}else{
						let monthArray = ["January" , "February", "March" , "April" , "May" , "June" , "July" , "August",
                        "September" , "October" , "November" , "December"];
						dob = new Date(formdata[k].value);
						// dob = dob.toDateString()
						dob = monthArray[dob.getMonth()] + " " + dob.getFullYear()
					}
					
					temp.push(
						<p style={style} key={k} className={applyClass}>{dob}</p>
					)
				} else if (formdata[k].isCheckbox) {
					let isTrue = formdata[k].value ? "Yes" : "No";
					if(formdata[k].value){
						temp.push(
							<p style={style} key={k} className={applyClass}>{formdata[k].label + ' ' + isTrue}</p>
						)
					}
				} else {
					temp.push(
						<p style={style} key={k} className={applyClass}>{formdata[k].value}</p>
					);
				}



			}
			listitems.push(
				<div key={i}>
					{temp}
				</div>
			);
		}
		return listitems;
	}

	render() {
		// console.log("CommonCards props", this.props);
		let showEditDiv = this.props.state.showEditDiv;
		let showAddDiv = this.props.state.showAddDiv;
		let showButtons = this.props.state.showButtons;
		// let objectPropName = this.props.objectPropName;

		// let listItems = [];
		// for(let k=0;k<this.props.userProfileData.length;k++)
		// {
		// 	listItems.push(<p key={this.props.userProfileData[k].pk}>{this.props.userProfileData[k].fields[objectPropName]}</p>)
		// }
		// this.list3 = this.createEditForms(false);

		return (
			<Grid fluid 
			data-label="Common Cards">
				<Row 
				 style={{
					/* "border": "solid transparent 1px", borderBottomColor: "#f2f2f2",
					"padding": "10px 0px", "margin": "0px 0px" */
				}} 
				className={this.props.className}>
					<Col xs={2} style={{ "textAlign": "left" }}>
						<FontAwesome
							name={this.props.iconName}
							
							style={{ "fontSize": "16px" }}
						/>
					</Col>
					<Col xs={7} style={{ "textAlign": "center" }}>
						<span
							style={{
								// "fontSize": "18px"
							}}>{this.props.name}</span>
					</Col>
					{showButtons ?
						<Col xs={3} style={{ "textAlign": "right" }}>
							{ 
								this.props.userProfileData.length > 1 || 
								this.props.userProfileData[0].fields ?
								<FontAwesome
									name="pencil"
									
									style={{  "fontSize": "16px","cursor":"pointer" }}
									onClick={this.props.onEditFunction}
								/> : ""
							}
							<FontAwesome
								name="plus"
								
								style={{ "fontSize": "16px", "marginLeft": "10px","cursor":"pointer"  }}
								onClick={this.props.onAddFunction}
							/>
						</Col>
						:
						null}
				</Row>
				<Row 
			className="refier-card-style">

				{showButtons ?
					<div style={{ "padding": "0px 20px" }}>
						<div className=" refier_text_on_light__3"
							style={{
								'fontWeight': '700', "fontSize": "14px", "margin": "12px 0"
							}}>
							{this.createShowProfileDetails()}
						</div>
					</div> : null
				}

				{!showButtons && !showEditDiv & !showAddDiv ? 
                    <div style={{"padding":"0px 20px"}}>
                        <div className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0"
                          }}>
                        {this.createShowProfileDetails()}
                        </div>
                    </div>
                :null
                
                }

				{showEditDiv ?
					<form style={{ "padding": "10px 20px" }}>
						<FormGroup controlId="formBasicText">
							{/* {list2} */}
							{this.createEditForms()}
							<ButtonToolbar style={{ "marginBottom": "10px", "marginTop": "10px" }}>
								{/* <Button bsStyle="primary" style={{"background-color":"rgba(72, 82, 140, 1)"}} onClick={this.props.onSave} >Save</Button> */}
								<Button bsStyle="danger" 
									className="refier_custom_button_cancel"
									 onClick={this.props.onCancel} >Cancel</Button>
							</ButtonToolbar>
						</FormGroup>

					</form> : null
				}
				{/* <form style={{"padding":"0px 20px"}}>
						<FormGroup controlId="formBasicText">
						<FormControl type="text" placeholder="Enter text" 
						onChange={this.props.onChangeAddTxtboxEvent} className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0"
                          }}/>
						<ButtonToolbar  style={{"marginBottom":"10px", "marginTop":"10px"}}>
						<Button bsStyle="primary" style={{"background-color":"rgba(72, 82, 140, 1)"}} onClick={this.props.onSave} >Save</Button>
						<Button bsStyle="danger"  onClick={this.props.onCancel} >Cancel</Button>
						</ButtonToolbar>
						</FormGroup>
					</form>  */}
				{showAddDiv ?
					<form style={{ "padding": "10px 20px" }}>
						{this.createAddDetailsForm()}
					</form>
					: null
				}
				</Row>
			</Grid>
		);
	}
}