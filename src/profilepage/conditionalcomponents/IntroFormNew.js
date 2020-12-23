import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import InitialUserProfileFormNew from '../presentationalcomponents/InitialUserProfileFormNew';
import UserDetailForm from '../presentationalcomponents/UserDetailForm';
import IntroFormInterestsSelectController 
    from '../../profilepage/conditionalcomponents/IntroFormInterestsSelectController';
import IntroFormCommunityController 
    from '../../dashboardpage/conditionalcomponents/IntroFormCommunityController';
import { submitIntroForm, submitUserTypes, submitUserFormDetailsIntroForm } from './action';
import { getTagsList } from '../../dashboardpage/conditionalcomponents/action'
import { getParentTagsList } from '../../topicpage/conditionalcomponents/action'
import { getCommunityList } from '../../shared/Header/conditionalcomponents/action'
import { GAtiming, Event } from '../../actionTracking/actionTracking'

import { URL_TEXT, MEDIA_URL_TEXT, isMobileDevice, isXsDevice } from '../../GlobalConstants'
import TagParentImg from '../../images/tags/tagparent_default.png';


class IntroForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            isStudent: false,
            isEmployed: false,
            isUnemployed: false,   // no database field for this
            currentSectionIndex: 0,
            mobileNumber: '',
            loaderStatus: 0,
            submitFormStatus: 0,
            errorMessage: '',
            usertypes: [],
            selectedUserTypes: [],
            selectedUserTypeNames: [],
            selectedUserTypePhotos: [],
            showSubmitButton: false,
            inviteCommunityName: undefined,
            redirectUrl: undefined,
            redirectUrlMessage: ''
        }

        // Section:
        //     0 => Welcome
        //     1 => Interest
        //     2 => Community

        this.hasItemsInCart = false

        this.setShowInroForm = this.setShowInroForm.bind(this);
        this.initializeForm = this.initializeForm.bind(this);
        this.onTypeSelect = this.onTypeSelect.bind(this);
        this.changeSection = this.changeSection.bind(this);
        this.submitDetails = this.submitDetails.bind(this);
		this.getWriteAccess = this.getWriteAccess.bind(this);
        this.onClickedUserType = this.onClickedUserType.bind(this)
        this.submitUserDetails = this.submitUserDetails.bind(this)
    }


    componentWillMount() {
        this.currentTime = new Date().getMilliseconds()
        // this.setShowInroForm(true);  //Pass isShow Var to Set it
        this.props.dispatch(getTagsList())
        this.props.dispatch(getParentTagsList())
        this.props.dispatch(getCommunityList())

        let redirectUrl = this.props.location && this.props.location.state && this.props.location.state.redirectUrl
        // let redirectUrl = this.props.redirectUrl
        if(redirectUrl) {
            let urlArray = redirectUrl.split('/')
            if(redirectUrl.indexOf('getting') > -1) {                
                redirectUrl = '/userDashboard/'
            } else {
                redirectUrl = "/" + redirectUrl.slice(redirectUrl.indexOf('userDashboard'))
            }
            
            if(urlArray && urlArray.length > 4) {
                let urlPhrase = urlArray[4]
                let redirectUrlMessage = ''  

                if(urlPhrase.indexOf('webinar') > -1) {
                    redirectUrlMessage = 'Please provide the details before proceeding to the Webinar.'
                } else if (urlPhrase.indexOf('vids') > -1) {
                    redirectUrlMessage = 'Please provide the details before proceeding to your Video Content.'
                } else if (urlPhrase.indexOf('blog') > -1) {
                    redirectUrlMessage = 'Please provide the details before proceeding to the Blog.'
                } else if (urlPhrase.indexOf('topic') > -1) {
                    redirectUrlMessage = 'Please provide the details before proceeding to the Skill Content.'
                } else if (urlPhrase.indexOf('test') > -1) {
                    redirectUrlMessage = 'Please provide the details before proceeding to the Test.'
                } else if (urlPhrase.indexOf('discus') > -1) {
                    redirectUrlMessage = 'Please provide the details before proceeding to Discussion.'
                } else if (urlPhrase.indexOf('course') > -1) {
                    redirectUrlMessage = 'Please provide the details before proceeding to your Course.'
                } else if (urlPhrase.indexOf('document') > -1) {
                    redirectUrlMessage = 'Please provide the details before proceeding to the Document.'
                } else {
                    redirectUrlMessage = 'Please provide the details.'  
                }
                        
                this.setState({redirectUrl, redirectUrlMessage})
            } else {
                let redirectUrlMessage = 'Please provide the details.'  
                this.setState({redirectUrl, redirectUrlMessage})
            }
        } else {
            redirectUrl = '/userDashboard/'
            let redirectUrlMessage = 'Please provide the details.'  
            this.setState({redirectUrl, redirectUrlMessage})
        }

        console.log('redirecturl:: ', redirectUrl)
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
        // //console.log("IntroForm::componentWillReceiveProps::",this.fullname, nextProps.profileFields.isInitialSetupComplete)
        this.setShowInroForm(!nextProps.profileFields.isInitialSetupComplete);
    }

    componentDidMount() {
        GAtiming('PAGE_LOAD_TIME','Intro Page', new Date().getMilliseconds() - this.currentTime)
        this.hasItemsInCart = this.props.cartItems ? 
                                this.props.cartItems.length === 0 ?
                                    false :
                                    true
                                : false

        let storageHasItemsInCart = localStorage.getItem("hasItemsInCart")

        if(storageHasItemsInCart && storageHasItemsInCart === 'false')
            this.hasItemsInCart = false

        this.initializeForm(this.props);
        if (this.props.parentTags) {
            this.setState({usertypes:this.props.parentTags})
        }
    }

    componentWillReceiveProps(nextProps) {
        this.hasItemsInCart = nextProps.cartItems ? 
                                nextProps.cartItems.length === 0 ?
                                    false :
                                    true
                                : false
            
        let storageHasItemsInCart = localStorage.getItem("hasItemsInCart")

        if(storageHasItemsInCart && storageHasItemsInCart === 'false')
            this.hasItemsInCart = false

        this.initializeForm(nextProps);
        if (!this.props.parentTags) {
            if (nextProps.parentTags) {
                this.setState({usertypes: nextProps.parentTags})
            }
        }
        else {
            if (this.props.parentTags.length != nextProps.parentTags.length) {
                this.setState({usertypes: nextProps.parentTags})
            }
        }

        // nextProps.userProfileTags ?
        //     (Object.values(nextProps.userProfileTags.hobbies).length > 2 ?
        //         this.setState({
        //             currentSectionIndex: 2, 
        //         }) :
        //         null) :
        //     null
        
        if(nextProps.communityDetails) {
            for(let community of nextProps.communityDetails) {
                if(community.is_member) {
                    this.setState({
                        showSubmitButton: true,
                        inviteCommunityName: community.fields.entity_name
                    })
                } else if (community.request_status) {
                    this.setState({
                        showSubmitButton: true, 
                    })
                    return;
                }
            }
        }
    }
    
    getWriteAccess() {
        return true;
    }

    setShowInroForm(isShow) {
        this.setState({ showModal: isShow });
    }

    onTypeSelect(type) {
        if(type === "student")
            this.setState({
                isStudent: !this.state.isStudent,
                isEmployed: false,
                isUnemployed: false
            })
        else if(type === "employed")
            this.setState({
                isStudent: false,
                isEmployed: !this.state.isEmployed,
                isUnemployed: false
            })
        else {
            this.setState({
                isStudent: false,
                isEmployed: false,
                isUnemployed: !this.state.isUnemployed
            })
        }
    }

    onClickedUserType(clickedUserType, title, photo, self) {
        // console.log("onClickedUserType :: ",clickedUserType, self.state)
        let selectedUserTypes = self.state.selectedUserTypes
        let selectedUserTypeNames = self.state.selectedUserTypeNames
        let selectedUserTypePhotos = self.state.selectedUserTypePhotos
        for (let i = 0; i < selectedUserTypes.length; i++){
            if (selectedUserTypes[i] == clickedUserType)
            {
                selectedUserTypes.splice(i, 1)
                selectedUserTypeNames.splice(i,1)
                selectedUserTypePhotos.splice(i,1)
                self.setState({
                    selectedUserTypes: selectedUserTypes,
                    selectedUserTypeNames: selectedUserTypeNames,
                    selectedUserTypePhotos: selectedUserTypePhotos
                })
                return
                }
        }
        selectedUserTypes.push(clickedUserType)
        selectedUserTypeNames.push(title)
        selectedUserTypePhotos.push(photo)
        self.setState({
            selectedUserTypes: selectedUserTypes,
            selectedUserTypeNames:selectedUserTypeNames,
            selectedUserTypePhotos: selectedUserTypePhotos
        })
    }

    changeSection(section) {
        if(section === 0) {
            Event("INTRO_PAGE", "Select User Type", "Initiate: " + this.props.userId)
            let userTypePromise = this.props.dispatch(submitUserTypes(this.state.selectedUserTypes));
		    this.setState({ loaderStatus: 2 })               
            userTypePromise.then((resp) => {
                Event("INTRO_PAGE", "Select User Type", "Success: " + this.props.userId)
                this.props.dispatch(getTagsList())
                this.props.dispatch(getCommunityList())

                let status = 0

                if(typeof resp == "undefined")  status = -1;
                else if(resp === 1) status = 1;

                this.setState({ loaderStatus: status })             

                setTimeout(() => {
                    this.setState({ 
                        currentSectionIndex: 1,
                        loaderStatus: 0
                    })
                }, 1000)          
            })
        } else if (section === 1) {
            this.setState({currentSectionIndex: 2})
        } else if (section === 2) {
            this.setState({currentSectionIndex: 2})
        }
    }

    validateNumber() {
        if(isNaN(this.state.mobileNumber))
            return 'error';
        const length = this.state.mobileNumber.trim().length;
		if(length < 10) return 'null';
		else if(length === 10) return 'success';
		else if(length > 10) return 'error';
		return null;
    }
    
    submitDetails() {
        this.setState({ showSubmitButton: false })

        const mobileNumber = this.state.mobileNumber.trim();
        if(mobileNumber.length !== 0 && isNaN(mobileNumber)) {
            this.setState({ errorMessage: 'Please use only Numbers', showSubmitButton: true })
            return;
        } 
        else if(mobileNumber.length !== 0 && 
                (mobileNumber.length > 10 || 
                 mobileNumber.length < 10)) {
            this.setState({ errorMessage: 'Mobile Number should have 10 characters', showSubmitButton: true })
            return;
        } 
        else {
            let profiledata = {};
            let basicDetailsData = {
                mobilenumber: isNaN(mobileNumber) 
                                ? '' 
                                : mobileNumber.length === 10 || mobileNumber.length === 0 
                                    ? mobileNumber 
                                    : '' ,
                isStudent: this.state.isStudent || false
            }
            profiledata.data = basicDetailsData;
            profiledata.isComplete = true;
            profiledata.section = 1;
            let introPromise = this.props.dispatch(submitIntroForm(profiledata));
            this.setState({loaderStatus: 2})                           
            introPromise.then((resp) => {
                let status = 0
                if(resp === 1) {
                    status = 1;
                    Event("INTRO_PAGE", "Final Intro Form Submit", "Success: " + this.props.userId)
                    this.setState({
                        loaderStatus: status,
                        submitFormStatus: 1
                    })      
                    this.props.dispatch(getTagsList())
                    return;      
                }
                else if(typeof resp == "undefined")  status = -1;
                else status = 0;

                Event("INTRO_PAGE", "Final Intro Form Submit", "Error: " + this.props.userId)

                this.setState({ 
                    loaderStatus: status,
                    submitFormStatus: -1,
                    showSubmitButton: true
                })
            })
        }
    }

    submitUserDetails(profiledata, section) {
        Event("INTRO_PAGE", "User Form Submit", "Initiate: " + this.props.userId)
        let introPromise = this.props.dispatch(submitUserFormDetailsIntroForm(profiledata, section));
        this.setState({loaderStatus: 2})                           
        introPromise.then((resp) => {
            let status = 0

            if(resp === 1) {
                Event("INTRO_PAGE", "User Form Submit", "Success: " + this.props.userId)
                status = 1;
                this.setState({
                    loaderStatus: status,
                    showSubmitButton: true
                    // submitFormStatus: 1
                })      
                this.changeSection(1)
                return true;      
            }

            else if(typeof resp == "undefined")  status = -1;
            else status = 0;

            Event("INTRO_PAGE", "User Form Submit", "Error: " + this.props.userId)

            this.setState({ 
                loaderStatus: status,
                submitFormStatus: -1,
                showSubmitButton: true
            })
        })
    }

    introForms() {
        let checkboxList = []
        let self = this
        for (let i = 0; i < this.state.usertypes.length; i++) {
            let isSelected = this.state.selectedUserTypes.indexOf(this.state.usertypes[i].pk)
            checkboxList.push (
                <div key={i} className={isMobileDevice() || isXsDevice() 
                                            ? "col-xs-4 introform-cards-mobile" 
                                            : "introform-cards"} >
                    <div className={isSelected == -1 ? "refier_card" : "refier_card_selected"}
                        onClick={() => {
                            self.onClickedUserType(self.state.usertypes[i].pk,
                                self.state.usertypes[i].fields.title,
                                self.state.usertypes[i].fields.tagparent_photo,self)
                        }}>
                        <div className="refier_card_image">
                            <img src={this.props.parentTags[i].fields.tagparent_photo 
                                        ? (MEDIA_URL_TEXT + this.props.parentTags[i].fields.tagparent_photo) 
                                        : TagParentImg}
                            /> 
                        </div>
                        <div className="refier_card_title refier_card_title_white">
                            <p >
                                {this.props.parentTags[i].fields.title}</p>
                                {isSelected == -1 
                                    ? null 
                                    : <p>
                                        <span>Selected</span>
                                        <span style={{ paddingLeft: "5px" }}>
                                            <FontAwesome name="check" />
                                        </span>
                                    </p>}
                        </div>
                    </div>
                </div>
            )
        }

        let userType = isMobileDevice() || isXsDevice() ? 
            <Col xs={12} style={{marginBottom: '50px'}}>
                <form className="introform-tiles-mobile">
                    <div className="introform-cta-tile-mobile">
                        <div className="introform-cta-tile-header">
                            Hi! {this.firstname}
                        </div>
                        <div className="introform-cta-tile-sub-header">
                            Select 1 tile that describes you
                        </div>
                        {/* <div className="introform-cta-tile-sub-header">
                            ( Click at least 1 tile )
                        </div> */}
                    </div>
                    {checkboxList}
                </form>
            </Col> :
            <Col sm={10} smOffset={1} mdOffset={1} md={10} style={{ marginTop: "25px" }}>
                <form className="introform-tiles">
                    <div className="introform-cta-tile">
                        <div className="introform-cta-tile-header">
                            Hi! {this.firstname}
                        </div>
                        <div className="introform-cta-tile-sub-header">
                            Select 1 tile that describes you
                        </div>
                        {/* <div style={{opacity: '0.9', letterSpacing: '0.015em'}}  */}
                        {/* <div className="introform-cta-tile-sub-header">
                            ( Click at least 1 tile )
                        </div> */}
                    </div>
                    {checkboxList}
                </form>
            </Col>

        let userDetailForm = ( 
            <UserDetailForm {...this.props} 
                selectedUserTypeNames={this.state.selectedUserTypeNames}
                loaderStatus={this.state.loaderStatus}
                submitUserDetails={this.submitUserDetails}
            /> 
        )

        let interestSelection = (
            <IntroFormInterestsSelectController 
                userProfileData={this.props.hobbies}
                writeAccess={this.getWriteAccess} 
                objectPropName="hobbies"
                profileTags={this.props.userProfileTags ? this.props.userProfileTags.hobbies : ""}
                isTag={true} 
                isIntroForm={true}
                name={"Hey" +
                        (this.firstname ? (" " + this.firstname) : " User") +
                        ", Add at least 3 Learning Goals"
                }
                iconName="smile-o" 
                className="intro_form_modal_heading_title" 
                submitDetails={this.submitDetails}
                showSubmitButton={this.state.showSubmitButton} 
                isMobile={isMobileDevice() || isXsDevice()}
            />   
        )

        let communitySelect = (
            <IntroFormCommunityController
                userId={this.props.userId} 
                newUserForm={true}
                submitDetails={this.submitDetails}
                loaderStatus={this.state.loaderStatus}
                showSubmitButton={this.state.showSubmitButton}
                userName={this.firstname ? this.firstname : " User"} 
                isMobile={isMobileDevice() || isXsDevice()}
            /> 
        )

        let introFormArr = [
            // welcome
            {
                name: "Welcome " + this.firstname + "!",
                desc: "Help us to enrich your learning on Refier",
                value: userType,
                selectedOptions: this.state.selectedUserTypeNames,
                isShowButton: this.state.selectedUserTypes.length !== 0 ? true : false,
                showNav: true,
                buttonText: "Next",
                buttonAction: () => this.changeSection(0),
            },
            // user details form submit
            {
                name: "Welcome " + this.firstname + "!",
                desc: "Help us to enrich your learning on Refier",
                value: userDetailForm,
                selectedOptions: this.state.selectedUserTypeNames,
                isShowButton: this.state.selectedUserTypes.length !== 0 ? true : false,
                showNav: false,
                buttonText: "Next",
                buttonAction: () => this.changeSection(1),
            },
            // usertype interest select 
            {
                name: "Welcome " + this.firstname + "!",
                desc: "Help us to enrich your learning on Refier",
                value: interestSelection,
                selectedOptions: this.state.selectedUserTypeNames,
                isShowButton: this.state.selectedUserTypes.length !== 0 ? true : false,
                buttonText: "Submit",
                showNav: false,
                buttonAction: () => this.changeSection(1)
            },
            // community select
            // {
            //     name: "Welcome " + this.firstname + "!",
            //     desc: "Help us to enrich your learning on Refier",
            //     value: communitySelect,
            //     selectedOptions: this.state.selectedUserTypeNames,
            //     isShowButton: this.state.selectedUserTypes.length !== 0 ? true : false,
            //     buttonText: "Submit",
            //     buttonAction: () => this.changeSection(1)
            // }
        ]

        return introFormArr[this.state.currentSectionIndex];
    }

    render() {
        // console.log("IntroFormNew::", this.props, this.state)

        let introFormDiv = (
            <InitialUserProfileFormNew 
                inviteCommunityName={this.state.inviteCommunityName}
                currentSection={this.state.currentSectionIndex}
                userForm={this.introForms()}
                showModal={this.state.showModal}
                setShowInroForm={this.setShowInroForm}
                loaderStatus={this.state.loaderStatus}
                parentTags={this.props.parentTags}
                isMobile={isMobileDevice() || isXsDevice()}
                redirectUrlMessage={this.state.redirectUrlMessage}
            />
        );
        let isInitialSetupComplete =  this.props.profileFields && !this.props.profileFields.isInitialSetupComplete;
        let redirect =  (  <Redirect to={this.state.redirectUrl || "/userDashboard/"} /> ) ; 

        return (
            this.hasItemsInCart || this.state.submitFormStatus === 1 ? 
                redirect  : 
                (isInitialSetupComplete ? introFormDiv : redirect)
        )
    }

}

let mapStateToProps = (store) => {
    // console.log("IntroForm::connect", store);
    return {
        profileFields: store.userProfileReducer.profileFields,
        instituteAutoSuggestProps: store.communityPageDataReducer.instituteAutoSuggestState,
        parentTags: store.topicDataReducer.parentTags,
        userProfileTags: store.userProfileReducer.userProfileTags,
        communityDetails : store.appDataReducer.communityListState,
        userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
        cartItems: store.refierCartReducer.cartItems,
    }
};

export default connect(mapStateToProps)(IntroForm);