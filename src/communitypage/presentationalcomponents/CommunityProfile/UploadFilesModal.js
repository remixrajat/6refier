import React, { Component } from 'react';
import {
  Form, Col, ControlLabel, FormGroup, FormControl,
  Button, Grid, DropdownButton, InputGroup, MenuItem, SplitButton, Glyphicon, Row,FieldGroup
} from 'react-bootstrap';
import CommonModal from '../../../shared/CommonModal'
import FontAwesome from 'react-fontawesome';
import {URL_TEXT} from '../../../GlobalConstants'

class UploadFilesModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      isSubmitted:false,
      templateFile:null,
      templateFlag:null,
      errors:[]
    }
    this.classSectionUploadURL = "uploadclasssectionexcel/";
    this.detailsUploadURL = "uploaduserprofileexcel/";

  }

  handleFileSelect(event){
    //console.log("File Selected", event.target.files[0])
    this.setState({templateFile:event.target.files[0]})
  }

  handleDropdown(event){
    //console.log("Checkbox Selected", event.target.value)
    this.setState({templateFlag:event.target.value})
  }

  setErrorMsg(err){
        let errors = this.state.errors;
        if(errors.indexOf(err) === -1){
             errors.push(err);
        }else{
          return;
        }
        this.setState({errors:errors});
        
  }
  
  uploadStatus(response){
    //console.log("***uploadExcelTemplates",response);
    if(!response || !response.hasOwnProperty("status")){
      this.setErrorMsg("Failed to upload. Please try again!");
    }
    this.setState({isSubmitted: false});
    if(response.status === 200){
      this.setErrorMsg(response.data);
    }
  }


  uploadTemplate(event){
    let isError = false;
    if(this.state.templateFile === null ){
      this.setErrorMsg("Please choose excel template to be uploaded!");
      isError = true;
    }
    if(this.state.templateFlag === null || this.state.templateFlag == -1){
      this.setErrorMsg("Please select type of Excel Template");
      isError = true;
    }
    if(isError){
      return;
    }else{
      this.setState({errors:[]});
    }
    let url ;
    this.setState({isSubmitted: true});
    if(this.state.templateFlag=="classsection"){
      url= this.classSectionUploadURL;
    }else{
      url=this.detailsUploadURL;
    }
    let formData = new FormData();
    formData.append('flag',this.state.templateFlag)
    formData.append('file', this.state.templateFile)
    //console.log("***uploadExcelTemplates",formData,url)
    let status = this.props.uploadExcelTemplate(formData,url)
    if(status === null){
      this.setState({isSubmitted: false});
      this.setErrorMsg("Failed to upload. please try again!");
    }
    status.then(this.uploadStatus.bind(this))

  }

  render() {
    let files = [
        {"flag":"classsection",
         "template": "Class Section Details Template",
         "label": "Class Section Details"},
        {"flag":"studentdetails",
         "template": "Student Details Template",
         "label": "Student Details"},
        {"flag":"teacherdetails",
         "template": "Teacher Details Template",
         "label": "Teacher Details"}
    ]

    // let errors = ["Incorrect File Extension", 
    //               "Incorrect data format of Student Id",
    //               "Incorrect format of file"]

    let listFiles = []
    let listErrors = []
    let listDropDown=[]
    if (files != null) {
      for (let i = 0; i < files.length; i++) {
        listFiles.push(
          <Row>
            <Col xs={6}>
              <div className="refier_text_on_light__3"
                style={{ 'fontWeight': '700', "fontSize": "14px", "margin": "5px 0" ,"cursor": "default"}}>
                {files[i].template}</div>
            </Col>
            <Col xs={6} style={{ "textAlign": "left" }}>
              <a href={URL_TEXT+"downloadRefierTemplate/?flag="+files[i].flag}>
                <FontAwesome
                  name="download"
                  
                  style={{ color: "#999999",margin: "12px 0" }}
                />
              </a>
            </Col>
          </Row>
        )
        listDropDown.push(
          <option value={files[i].flag}>{files[i].label}</option>
        )
      }
    }

    if (this.state.errors !== null) {
      for (let i = 0; i < this.state.errors.length; i++) {
        listErrors.push(
          <Row>
            <Col xs={6}>
              <div className="refier_text_on_light__3"
                style={{ 'fontWeight': '500', "fontSize": "14px", "margin": "5px 0",
                          "color":"red", "fontStyle":"italic" }}>
                {this.state.errors[i]}</div>
            </Col>
          </Row>
        )
      }
    }

    let body =
      <Grid fluid>
        <Col>
          <div className="refier_custom_light_panel_title"
            style={{
              "border": "solid transparent 1px",
              "padding": "5px 10px", "marginBottom": "5px", "fontSize": "18px", "fontWeight": "700"
            }}
          >
            Templates
            </div>
        </Col>
        <Col xsOffset={1}>
          {listFiles}
        </Col>
        <Col>
          <div className="refier_custom_light_panel_title"
            style={{
              "border": "solid transparent 1px",
              "padding": "5px 10px", "marginBottom": "10px", "fontSize": "18px", "fontWeight": "700"
            }}
          >
            Upload
            </div>
            </Col>
            <Col xsOffset={0} xs={5}>
              {/* <select className="refier_text_on_light__3 "
                   style={{ 'fontWeight': '700', "fontSize": "14px", "margin": "5px 0" }}
                   onChange={this.handleDropdown}>
                
              </select> */}
              <FormControl componentClass="select"  onChange={this.handleDropdown.bind(this)}>
                <option value="-1">Select Template</option>
                {listDropDown}
              </FormControl>
            </Col>
            <Col xsOffset={0} xs={7}>
             <input type="file" 
                  accept = ".png, .jpg, .xls"
                   className="refier_text_on_light__3"
                   onChange={this.handleFileSelect.bind(this)} 
                   style={{ 'fontWeight': '700', "fontSize": "14px", "margin": "5px 0" }}/> 
            </Col>
             <Col xsOffset={8} xs={3} >
              <Button type="submit" onClick={this.uploadTemplate.bind(this)} disabled={this.state.isSubmitted}>
                Submit
              </Button>
            </Col>

            <Col xsOffset={1}>
              {listErrors}
            </Col>

      </Grid>

    return (
      <CommonModal close={this.props.close}
        showModal={this.props.showModal}
        modalHeading="Upload Data"
        modalBody={body} />
    )
  }
}
export default UploadFilesModal;