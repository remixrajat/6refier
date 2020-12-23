import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import { Grid, Col, Row, Thumbnail } from 'react-bootstrap';

import SplashScreenMain from '../images/shared/splash_screen_main.png';


class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false}
    }
    
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                redirect: true,
            })
        }, 6000)
    }
    
    redirect(isInitialSetupComplete) {
        if(isInitialSetupComplete) {
            return <Redirect to="/userDashboard" />;
        } else {
            return <Redirect to="/userDashboard/getting-to-know-you" />;
        }
    }

    render() {
        // console.log("SplashScreen::props", this.props)

        if(this.state.redirect) {
            return this.props.profileFields && 
                    this.redirect(this.props.profileFields.isInitialSetupComplete)
        }

        return (
            <div className="refier-splash-screen">
                <img src={SplashScreenMain} />
                <div style={{width: '10em'}}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }
}


let mapStateToProps = (store) => {
    // console.log("IntroForm::connect", store);
    return {
        profileFields: store.userProfileReducer.profileFields,
    }
};

export default connect(mapStateToProps)(SplashScreen);