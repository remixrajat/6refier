import React from 'react';
import { connect } from 'react-redux';

import UserDetailsNew from '../presentationalcomponents/UserDetailsNew'
import UserDetailsEditModal from '../presentationalcomponents/UserDetailsEditModal'
import PasswordChangeModal from '../presentationalcomponents/ChangePasswordModal'
import { changeUserDetailsTextBoxState } from './action'
import { setProfileDetails, saveChangedPassword, requestForSession } from './action'

import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import CommonModal from '../../shared/CommonModal'


class UserDetailsControllerNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      changePasswordModal: false,
      requestForSessionModal: false,
      changedPassword: 0,
      requestingForSession: 0,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeChangePasswordModal = this.closeChangePasswordModal.bind(this);
    this.openChangePasswordModal = this.openChangePasswordModal.bind(this);
    this.onTextInputStateChange = this.onTextInputStateChange.bind(this);
    this.onModalSave = this.onModalSave.bind(this);
    this.openRequestForSessionModal = this.openRequestForSessionModal.bind(this)
    this.closeRequestForSessionModal = this.closeRequestForSessionModal.bind(this)
    this.passwordChangeSuccess = this.passwordChangeSuccess.bind(this)
    this.passwordChangeFailed = this.passwordChangeFailed.bind(this)
    this.passwordChangeProgress = this.passwordChangeProgress.bind(this)
    this.sessionRequestedFailed = this.sessionRequestedFailed.bind(this)
    this.sessionRequestedProgress = this.sessionRequestedProgress.bind(this)
    this.sessionRequestedSuccess = this.sessionRequestedSuccess.bind(this)
  }

  close() {
    this.setState({ showModal: false });
  };

  open() {
    this.setState({ showModal: true });
  };

  closeChangePasswordModal() {
    this.setState({ changePasswordModal: false });
  };

  openChangePasswordModal() {
    this.setState({ changePasswordModal: true });
  };
  
  closeRequestForSessionModal() {
    this.setState({ requestForSessionModal: false });
  }

  openRequestForSessionModal() {
    this.setState({ requestForSessionModal: true });
  }

  passwordChangeSuccess() {
    this.setState({ changedPassword: 1 })
  }

  passwordChangeFailed() {
    this.setState({ changedPassword: -1 })
  }

  passwordChangeProgress() {
    this.setState({ changedPassword: 2 })
  }
  
  sessionRequestedSuccess() {
    this.setState({ requestingForSession: 1 })
  }

  sessionRequestedFailed() {
    this.setState({ requestingForSession: -1 })
  }

  sessionRequestedProgress() {
    this.setState({ requestingForSession: 2 })
  }

  changeUserPassoword(passwordChangeData) {
    this.passwordChangeProgress()
    let params = {};
    params.action = "edit";
    for (let i = 0; i < passwordChangeData.elements.length; i++) {
      params[passwordChangeData.elements[i].name] = passwordChangeData.elements[i].value;
    }
    params.objectPropName = "passwordChangeData";
    params.isLogoutAll = false;
    console.log("passwordChangeData  :: ", params)
    let returnPromise = this.props.dispatch(saveChangedPassword(params))
    returnPromise.then((response) => {
      if (response.toLowerCase() === "success") {
        this.passwordChangeSuccess()
      }
      else {
        this.passwordChangeFailed()
      }
    })
  }

  requestForSession() {
    let mentor_id, requested_date_time, requested_time_period, contact_number, application_text
    let returnPromise = this.props.dispatch(requestForSession((mentor_id, requested_date_time,
      requested_time_period, contact_number, application_text)))
    returnPromise.then((response) => {
      if (response.toLowerCase() === "success") {
        this.sessionRequestedSuccess()
      }
      else {
        this.sessionRequestedFailed()
      }
    })
  }

  onTextInputStateChange(e) {
    let elementName = e.target.name;
    let elementValue = e.target.value;
    this.props.dispatch(changeUserDetailsTextBoxState(elementName, elementValue));
  }

  onModalSave(profileData) {
    //console.log(profileData);
    let params = {};
    params.action = "edit";
    for (let i = 0; i < profileData.elements.length; i++) {
      params[profileData.elements[i].name] = profileData.elements[i].value;
    }
    params.objectPropName = "profile";
    this.props.dispatch(setProfileDetails(params))
    this.setState({ showModal: false });
  }


  render() {
    //console.log("UserDetailsController", this.props)

    return (
      <div style={{ marginTop: "10px" }}>
        <UserDetailsNew userProfileData={this.props.userProfileData} 
          editClick={this.open} {...this.props}
          openChangePasswordModal={this.openChangePasswordModal} 
        />
        <UserDetailsEditModal showModal={this.state.showModal} 
          close={this.close} onSave={this.onModalSave}
          userProfileData={this.props.userProfileData} 
          onTextInputStateChange={this.onTextInputStateChange} 
        />
        <PasswordChangeModal showModal={this.state.changePasswordModal}
          close={this.closeChangePasswordModal}
          changeUserPassoword={this.changeUserPassoword.bind(this)}
          {...this.props.passwordChangeStatus}
          changedPassword={this.state.changedPassword} 
        />
      </div>
    );
  }
}

let mapStateToProps = (store) => {
  // console.log("UserDetailsContMap" , store)
  return { passwordChangeStatus: store.appStatusMessageReducer.passwordChangeStatus }
}

export default connect(mapStateToProps)(UserDetailsControllerNew);