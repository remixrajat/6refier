import React, { Component } from 'react';
import InitialUserProfileForm from '../presentationalcomponents/InitialUserProfileForm';
import {
    Button, Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel,
    ButtonToolbar, Table, InputGroup, Checkbox
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { submitIntroForm, fetchAutoSuggestInstitutesData } from './action';
import { getInstituteTreeStructure } from '../../communitypage/conditionalcomponents/action'
import AutosuggestTextBox from '../../shared/AutosuggestInput/presentationalcomponents/autosuggestTextBox';
import { getHierarchyStringOfSchool } from '../../HelperFunctions/getHierarchyStringOfSchool';
import { searchEntitiesInTree } from '../../HelperFunctions/searchEntititesInTree';
import { getTagsList } from '../../dashboardpage/conditionalcomponents/action'
import UserInterestFormController from './UserInterestFormController'

class IntroForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            errorMsg: [],
            isShowAcademics: false,
            teststate: true,
            selectedInterest: {}
        }

        this.SECTIONS = {
            'basic': 1,
            'academic': 2,
            'professional': 3,
            'hobbies': 4
        }

        this.addOrRemoveSelectedInterests = this.addOrRemoveSelectedInterests.bind(this);
        this.setShowInroForm = this.setShowInroForm.bind(this);
        this.initializeForm = this.initializeForm.bind(this);

    }


    componentWillMount() {
        // this.setShowInroForm(true);  //Pass isShow Var to Set it
        this.props.dispatch(getTagsList())
    }

    initializeForm(nextProps) {
        if (!nextProps.profileFields) {
            return;
        }
        this.fullname = nextProps.profileFields.last_name &&
            nextProps.profileFields.last_name != "None" &&
            nextProps.profileFields.last_name != "Null" ?
            nextProps.profileFields.first_name + " " + nextProps.profileFields.last_name
            :
            nextProps.profileFields.first_name;
        this.firstname = nextProps.profileFields.first_name;
        this.emailId = nextProps.profileFields.email;
        this.mobilenumber = nextProps.profileFields.mobile_number || ""
        this.setState({ teststate: !this.state.teststate })
        // //console.log("IntroForm::componentWillReceiveProps::",this.fullname, nextProps.profileFields.isInitialSetupComplete)
        this.setShowInroForm(!nextProps.profileFields.isInitialSetupComplete);
    }

    componentDidMount() {
        this.initializeForm(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // let prevprops = this.props.profileFields || "";
        // let nextprop = nextProps.profileFields.first_name || "-1"
        // if(nextprop === prevprops ){
        //     //console.log("IntroForm::componentWillReceiveProps::return", nextProps.profileFields.first_name)
        //     return
        // }
        // console.log("IntroForm::componentWillReceiveProps::", this.fullname, nextProps.profileFields.isInitialSetupComplete)
        this.initializeForm(nextProps);

    }

    addOrRemoveSelectedInterests(interest, isSelected) {
        // console.log("UserInterest::addOrRemoveSelectedInterests", interest, isSelected);
        if (isSelected) {
            this.setState((prevState) => {
                let _interests = {};
                _interests[interest[0]] = interest[1];
                return {

                    selectedInterest: Object.assign({}, prevState.selectedInterest, _interests)
                }
            });
        } else {
            this.setState((prevState) => {
                delete prevState.selectedInterest[interest[0]]
                return {
                    selectedInterest: Object.assign({}, prevState.selectedInterest)
                }
            });
        }
    }
    

    setShowInroForm(isShow) {
        // this.setState({ showModal: true });
        this.setState({ showModal: isShow });
    }
    onNameChange(e) {

        this.fullname = e.target.value;
        //console.log(this.fullname );
        this.setState({ teststate: !this.state.teststate })
    }
    onMobileNumberChange(e) {
        this.mobilenumber = e.target.value;
        this.setState({ teststate: !this.state.teststate })
    }
    onEmailIdChange(e) {
        this.emailId = e.target.value;
        this.setState({ teststate: !this.state.teststate })
    }

    onIsStudentChange(e) {
        this.isStudent = e.target.checked;
        this.setState({ isShowAcademics: this.isStudent })
    }

    onIsProfessionalChange(e) {
        this.isStudent = !e.target.checked;
        this.setState({ isShowAcademics: this.isStudent })
    }

    onInstituteNameChange(e) {
        this.instituteName = e.target.value;
        this.communityId = null;
    }

    onClassSecChange(e) {
        this.ClsSec = e.target.value;
    }

    onChangeSDate(e) {
        this.startingDate = e.target.value;
    }

    onChangeacadDesc(e) {
        this.acadDesc = e.target.value;
    }

    onChangeOrganisation(e) {
        this.organisation = e.target.value;
    }

    onChangeJobLocation(e) {
        this.jobLocation = e.target.value;
    }
    onChangeJoiningDate(e) {
        this.joiningDate = e.target.value;
    }

    onChangLeavingDate(e) {
        this.leavingDate = e.target.value;
    }

    onChangeCurrentlyWorking(e) {
        this.isCurrentlyWorking = e.target.checked;
        this.setState({ teststate: !this.state.teststate })
    }

    onChangeProffesionalDesc(e) {
        this.profDesc = e.target.profDesc;
    }

    setErrorMsg(err) {
        let errors = this.state.errorMsg;
        if (errors.indexOf(err) === -1) {
            errors.push(err);

        }
        this.setState({ errorMsg: errors });

    }

    submitDetails(section) {
        //console.log("submitclicked")
        let profiledata = {};
        let isError = false;
        // console.log("abhishek", this.SECTIONS.basic, section, this.SECTIONS.basic === section);
        let sec = "profile"
        if (this.SECTIONS.basic === section) {
            let basicDetailsData = {
                fullname: this.fullname || '',
                mobilenumber: this.mobilenumber || '',
                // emailId : this.emailId||'',
                isStudent: this.isStudent || false
            }
            if (basicDetailsData.fullname.trim().length < 1) {
                this.setErrorMsg("Name cannot be empty")
                isError = true;
            }
            if (basicDetailsData.mobilenumber.trim().length > 1 && basicDetailsData.mobilenumber.trim().length < 10) {
                this.setErrorMsg("Invalid Mobile Number");
                isError = true;
            }
            // if(basicDetailsData.emailId.trim().length <1 || basicDetailsData.emailId.indexOf('@') === -1){
            //     this.setErrorMsg("Invalid Email");
            //     isError=true;
            // }
            profiledata.data = basicDetailsData;
            profiledata.isComplete = false;
            //console.log("abhishek",basicDetailsData)
            sec = "profile";

        } else if (this.SECTIONS.academic === section) {
            //console.log("mycommid is", this.communityId);
            let academicDetailsData = {
                instituteName: this.instituteName || '',
                clsSec: this.ClsSec || '',
                startingDate: this.startingDate || '',
                acadDesc: this.acadDesc || '',
                communityId: this.communityId || '',
                clsSecId: this.ClsSecId || ''
            }
            if (academicDetailsData.instituteName.trim().length < 1) {
                this.setErrorMsg("Institute name cannot be empty")
                isError = true;
            }
            profiledata.data = academicDetailsData;
            profiledata.isComplete = false;
            //console.log("abhishek",academicDetailsData)
            sec = "education";
        } else if (this.SECTIONS.professional === section) {
            let professionalDetailsData = {
                organisation: this.organisation || '',
                communityId: this.communityId || '',
                jobLocation: this.jobLocation || '',
                joiningDate: this.joiningDate || '',
                leavingDate: this.leavingDate || '',
                isCurrentlyWorking: this.isCurrentlyWorking || false,
                profDesc: this.profDesc || ''
            }
            profiledata.data = professionalDetailsData;
            profiledata.isComplete = false;
            //console.log("abhishek",professionalDetailsData)
            sec = "professional";
        } else if (this.SECTIONS.hobbies === section) {
            console.log("this.SECTIONS.hobbies :: ", this.state.selectedInterest)
            profiledata.data = this.state.selectedInterest;
            profiledata.isComplete = true;

            sec = "hobbies";
        }
        profiledata.section = section;
        //console.log(profiledata);
        console.warn("Error:", this.state.errorMsg)
        if (!isError) {
            this.setState({ errorMsg: [] });
            this.props.dispatch(submitIntroForm(profiledata, sec));
        }
        return isError;
    }

    onSuggestionSelected(suggestionValue) {
        this.instituteName = suggestionValue.label;
        this.communityId = suggestionValue.id;
        let returnPromise = this.props.dispatch(getInstituteTreeStructure(this.communityId.split(".")[2], false));
        returnPromise.then((response) => {
            this.selectedTreeStructure = response;
            this.setState({ hierarchyString: getHierarchyStringOfSchool(this.selectedTreeStructure) });
        })
    }

    onProfessionalSuggestionSelected(suggestionValue) {
        // console.log("Intro Form::", suggestionValue);
        this.communityId = suggestionValue.id.split(".")[2];
        this.organisation = suggestionValue.label;
    }

    onchangeDynamicFetchProfessionalName(newValue) {
        if (newValue != null && newValue != "") {
            this.props.dispatch(fetchAutoSuggestInstitutesData(newValue));
        }
        this.organisation = newValue;
        this.communityId = null;
    }

    onchangeDynamicFetchInstitutesName(newValue) {
        if (newValue != null && newValue != "") {
            this.props.dispatch(fetchAutoSuggestInstitutesData(newValue));
        }
        this.instituteName = newValue;
        this.communityId = null;
    }

    onchangeDynamicFetchSubEntitiesName(newValue) {
        if (newValue != null && newValue != "") {
            let searchSet = searchEntitiesInTree(this.selectedTreeStructure, newValue);
            this.setState({ subEntitiesSuggestions: searchSet });
        }
        this.ClsSec = newValue;
        this.ClsSecId = null;
    }

    onSuggestionSelectedSubEntity(suggestionValue) {
        this.ClsSec = suggestionValue.label;
        this.ClsSecId = suggestionValue.id;
    }


    introforms() {
        let userDetails = (
            <Col sm={12} mdOffset={1} md={10} style={{ marginTop: "20px" }}>
                <form>
                    <FormGroup horizontal controlId="basicDetails">

                        <InputGroup style={{ "margin": "15px 0px 0px 0px" }}>
                            <InputGroup.Addon>
                                Name
                                </InputGroup.Addon>
                            <FormControl type="text" name="profileName" onChange={this.onNameChange.bind(this)} value={this.fullname} />
                        </InputGroup>
                        <div style={{marginTop:"10px"}}>
                            <Checkbox checked={this.isStudent} style={{display:"inline"}} onChange={this.onIsStudentChange.bind(this)}>
                                I am a Student
                            </Checkbox>
                            <Checkbox checked={!this.isStudent} style={{display:"inline",marginLeft:"45%"}} onChange={this.onIsProfessionalChange.bind(this)}>
                                I am a Working Professional
                            </Checkbox>
                        </div>
                        <InputGroup style={{ "margin": "15px 0px 0px 0px" }}>
                            <InputGroup.Addon>
                                Mobile Number
                                </InputGroup.Addon>
                            <FormControl type="text" name="mobile" onChange={this.onMobileNumberChange.bind(this)} value={this.mobilenumber} />
                        </InputGroup>

                        <InputGroup style={{ "margin": "15px 0px 0px 0px" }}>
                            <InputGroup.Addon >
                                Email ID
                                </InputGroup.Addon>
                            <FormControl type="email" name="email" value={this.emailId} readOnly={true} />
                        </InputGroup>
                    </FormGroup>
                </form>
            </Col>
        )
        let academicDetails =
            <Col sm={12} mdOffset={1} md={10} style={{ marginTop: "20px" }}>
                <div style={{ "margin": "15px 0px 0px 0px" }}>
                    <ControlLabel className=" refier_text_on_light__4">Institute</ControlLabel>
                    <AutosuggestTextBox placeholder="Institute Lookup..."
                        onchangeDynamicFetch={this.onchangeDynamicFetchInstitutesName.bind(this)}
                        inputValue={this.props.instituteAutoSuggestProps}
                        onSuggestionSelected={this.onSuggestionSelected.bind(this)} doNotReset={true}
                    />
                </div>

                {this.state.hierarchyString ?
                    <div style={{ "margin": "15px 0px 0px 0px" }}>
                        <ControlLabel className=" refier_text_on_light__4">
                            {this.state.hierarchyString}</ControlLabel>
                        <AutosuggestTextBox placeholder={this.state.hierarchyString + " Lookup..."}
                            onchangeDynamicFetch={this.onchangeDynamicFetchSubEntitiesName.bind(this)}
                            inputValue={this.state.subEntitiesSuggestions}
                            onSuggestionSelected={this.onSuggestionSelectedSubEntity.bind(this)} doNotReset={true}
                        />
                    </div>
                    :
                    <div style={{ "margin": "15px 0px 0px 0px" }}>
                        <ControlLabel className=" refier_text_on_light__4">Batch</ControlLabel>
                        <FormControl type="text" className=" refier_text_on_light__3"
                            name="Class-Section"
                            value={this.ClsSec} onChange={this.onClassSecChange.bind(this)} />
                    </div>
                }
                <div style={{ "margin": "15px 0px 0px 0px" }}>
                    <ControlLabel className=" refier_text_on_light__4">Starting Date</ControlLabel>
                    <FormControl type="date" className=" refier_text_on_light__3"
                        name="StartingYear"
                        value={this.startingDate} onChange={this.onChangeSDate.bind(this)} />
                </div>

                <div style={{ "margin": "15px 0px 0px 0px" }}>
                    <ControlLabel className=" refier_text_on_light__4">Brief Description</ControlLabel>
                    <FormControl componentClass="textarea" className=" refier_text_on_light__3"
                        name="BriefDescription"
                        value={this.acadDesc} onChange={this.onChangeacadDesc.bind(this)} />
                </div>
            </Col>

        let professionalDetails = (
            <Col sm={12} mdOffset={1} md={10} style={{ marginTop: "20px" }}>
                <InputGroup style={{ "margin": "15px 0px 0px 0px" }}>
                    <InputGroup.Addon>
                        Organisation
                        </InputGroup.Addon>
                    <AutosuggestTextBox placeholder="Institute Lookup..."
                        onchangeDynamicFetch={this.onchangeDynamicFetchProfessionalName.bind(this)}
                        inputValue={this.props.instituteAutoSuggestProps}
                        onSuggestionSelected={this.onProfessionalSuggestionSelected.bind(this)} doNotReset={true}
                    />
                    {/* <FormControl type="text" className=" refier_text_on_light__3"
                        name="organisation"
                        style={{
                            'fontWeight': '700', "fontSize": "14px"
                        }}
                        value={this.organisation} onChange={this.onChangeOrganisation.bind(this)}
                    /> */}
                </InputGroup>
                <InputGroup style={{ "margin": "15px 0px 0px 0px" }}>
                    <InputGroup.Addon>
                        Location&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </InputGroup.Addon>
                    <FormControl type="text" className="refier_text_on_light__3"
                        name="location"

                        value={this.jobLocation} onChange={this.onChangeJobLocation.bind(this)}
                    />
                </InputGroup>
                <Form style={{ "margin": "15px 0px 0px 0px" }}>
                    <Col sm={12} md={6} style={{ paddingLeft: "0px" }}>
                        <FormGroup controlId="formValidationError4" >
                            <InputGroup>
                                <InputGroup.Addon>Joining Date</InputGroup.Addon>
                                <FormControl type="date" value={this.joiningDate} onChange={this.onChangeJoiningDate.bind(this)} />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    {!this.isCurrentlyWorking ?

                        <FormGroup controlId="formValidationError4" >
                            <InputGroup>
                                <InputGroup.Addon>Leaving Date</InputGroup.Addon>
                                <FormControl type="date" value={this.leavingDate} onChange={this.onChangLeavingDate.bind(this)} />
                            </InputGroup>
                        </FormGroup>

                        : null
                    }
                </Form>
                <Col sm={12} md={12} style={{ paddingLeft: "0px" }}>
                    <Checkbox checked={this.isCurrentlyWorking} onChange={this.onChangeCurrentlyWorking.bind(this)}>
                        Currently Working
                        </Checkbox>
                </Col>
                <Col sm={12} md={12} style={{ paddingLeft: "0px" }}>
                    <ControlLabel className=" refier_text_on_light__4">Brief Description</ControlLabel>
                    <FormControl componentClass="textarea" className=" refier_text_on_light__3"
                        name="briefDescription"
                        value={this.profDesc} onChange={this.onChangeProffesionalDesc.bind(this)} />
                </Col>
            </Col>
        )

        let interestTab = (<UserInterestFormController addOrRemoveSelectedInterests={this.addOrRemoveSelectedInterests} />)


        let introFormArr = [
            {
                name: "Welcome " + this.firstname + " ! Please help us to enhance your experience on Refier",
                value: userDetails,
                isShow: true
            },
            {
                name: "Your Current Academics Details",
                value: academicDetails,
                isShow: this.state.isShowAcademics
            },
            {
                name: "Your Current Professional Details",
                value: professionalDetails,
                isShow: !this.state.isShowAcademics
            },
            // {
            //     name: "Your Area of Interests and Hobbies",
            //     value: interestTab,
            //     isShow: true
            // },
        ]

        return introFormArr;
    }

    render() {
        // console.log("IntroForm::", this.props)
        return (
            <InitialUserProfileForm userdetailsforms={this.introforms()}
                errorMsgs={this.state.errorMsg}
                showModal={this.state.showModal}
                setShowInroForm={this.setShowInroForm}
                submitDetails={this.submitDetails.bind(this)}
                sections={this.SECTIONS} />

        )
    }

}

let mapStateToProps = (store) => {
    // console.log("IntroForm::connect", store);
    return {
        profileFields: store.userProfileReducer.profileFields,
        instituteAutoSuggestProps: store.communityPageDataReducer.instituteAutoSuggestState
    }
};

export default connect(mapStateToProps)(IntroForm);