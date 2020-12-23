import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { URL_TEXT } from './GlobalConstants';

var postFrontEndError = (message, source, lineno, colno, error) => {
    //console.log("LiveBroadcast::action::authenticateUser", userprofiledata);
    return (dispatch, getState) => {
        axios.get(URL_TEXT + "postFrontendUnhandledError/", { message: message, source, lineno, colno, stack: error.stack })
            .then(function (data) {
                return true;
            })
            .catch(function (error) {
                console.warn("ErrorHandler::error while posting uncaught error : ", message, " ; ", source, " ; ", lineno, " ; ", colno, " ; ", error);
            });
    }
}


class ErrorHandler extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let self = this;
        window.onerror = function (message, source, lineno, colno, error) {
            console.log("ErrorHandler :: ", error)
            try {
                self.props.dispatch(postFrontEndError(message, source, lineno, colno, error));
            } catch (err) {
                console.log("ErrorHandler ::error while dispatching error ", err)
            }

        }
    }

    render() {
        return null;
    }
}

var mapStateToProps = (store) => ({})

export default connect(mapStateToProps)(ErrorHandler);