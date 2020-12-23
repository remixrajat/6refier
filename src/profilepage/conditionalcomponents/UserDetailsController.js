import React from 'react';
import {connect} from 'react-redux';
import getProfilePageData from './action';
import UserDetails from '../presentationalcomponents/UserDetails'
import UserDetailsEditModal from '../presentationalcomponents/UserDetailsEditModal'
import PasswordChangeModal from '../presentationalcomponents/ChangePasswordModal'
import {changeUserDetailsTextBoxState} from './action'
import {setProfileDetails, saveChangedPassword} from './action'


class UserDetailsController extends React.Component{
    constructor(props) {
      super(props);
      this.state = { 
        showModal: false,
        changePasswordModal: false    
      };

      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.closeChangePasswordModal = this.closeChangePasswordModal.bind(this);
      this.openChangePasswordModal = this.openChangePasswordModal.bind(this);
      this.onTextInputStateChange = this.onTextInputStateChange.bind(this);
      this.onModalSave = this.onModalSave.bind(this);
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

    changeUserPassoword(passwordChangeData){
        this.props.dispatch(saveChangedPassword(saveChangedPassword))
    } 

    onTextInputStateChange(e) {
        let elementName = e.target.name;
        let elementValue = e.target.value;
        this.props.dispatch(changeUserDetailsTextBoxState(elementName,elementValue));
    }

    onModalSave(profileData) {
      //console.log(profileData);
      let params = {};
      params.action = "edit";
      for(let i=0;i<profileData.elements.length;i++){
        params[ profileData.elements[i].name ] =  profileData.elements[i].value;
      }
      params.objectPropName = "profile"; 
      this.props.dispatch(setProfileDetails(params))
      this.setState({ showModal: false });
    }

    render() {
        //console.log("UserDetailsController", this.props)

        return(
            <div style={{"marginTop":"10px"}}>
              <UserDetails userProfileData={this.props.userProfileData} 
                editClick={this.open} {...this.props}
                openChangePasswordModal={this.openChangePasswordModal} /> 
              <UserDetailsEditModal showModal={this.state.showModal} 
                close={this.close} onSave={this.onModalSave}
                userProfileData = {this.props.userProfileData} 
                onTextInputStateChange={this.onTextInputStateChange}/>
              <PasswordChangeModal showModal={this.state.changePasswordModal} 
                close={this.closeChangePasswordModal}
                changeUserPassoword={this.changeUserPassoword.bind(this)} {...this.props.passwordChangeStatus} />
            </div>
        );
    }
}

let mapStateToProps = (store) =>{
    //console.log("UserDetailsContMap" , store.profileDataReducer)
    return {passwordChangeStatus : store.appStatusMessageReducer.passwordChangeStatus }
}

export default connect(mapStateToProps)(UserDetailsController);