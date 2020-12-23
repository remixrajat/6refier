import React, { Component } from 'react';
import { connect } from "react-redux";

import RequestAccessFormModal from '../presentationalcomponents/RequestAccessForm';
import { requestToAccessContent, getPromoDetailsExpert } from './actions';


class RequestAccessFormController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appTextStatus : "",
            expertDetails: undefined
        }
    }

    componentWillMount() {
        let expertDetailsPromise = this.props.dispatch(getPromoDetailsExpert(this.props.expertId))
        expertDetailsPromise.then((resp) => {
            console.log('expertDetailsPromise :: data', resp)
            let user_details = resp['user_details']
            if(user_details && user_details['fields'])
                this.setState({expertDetails: user_details['fields']})
        })
    }

    onChangeTextField(e) {
        this.setState({appTextStatus:e.target.value})
    }

    submitApplicationRequest(e) {
        // console.log("submitApplicationRequest::submitApplicationRequest::", this.state.appTextStatus);
        let request_form = {
            content_id : this.props.contentId,
            message : this.state.appTextStatus
        }
        this.props.dispatch(requestToAccessContent(request_form));
    }

    render(){
        // console.log("RequestAccessFormController::props", this.props);

        return(
            <RequestAccessFormModal {...this.props}
                expertDetails={this.state.expertDetails}
                appTextStatus={this.state.appTextStatus}
                onChangeTextField={this.onChangeTextField.bind(this)}
                submitApplicationRequest={this.submitApplicationRequest.bind(this)}/>
        );
    }
}

export default connect()(RequestAccessFormController);
