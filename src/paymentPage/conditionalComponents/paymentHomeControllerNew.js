import React, { Component } from 'react';
import { connect } from 'react-redux';

import PaymentForm from '../presentationcomponents/paymentForm';
import { createAndGetPaymentOrderId, sendPaymentResponse } from './action';
import AppLogo from '../../shared/Header/presentationalcomponents/AppLogo';
import { changeCartModalState } from '../../shared/Header/conditionalcomponents/action';


class PaymentGatewayHomeController extends Component {
    constructor(props) {
        super(props);
        this.options = {
            // "key": ,
            "key": this.props.config ? this.props.config.payment_gateway_api_key : "rzp_test_wvka0Rx4vnREFT",
            "amount": 0, // 2000 paise = INR 20, amount in paisa
            "name": "REFIER",
            "description": "Purchase Description",
            "image": AppLogo,
            "theme": {
              "color": "#049cdb"
            }
        };
        // console.log("PaymentGatewayHomeController :: ", this.options);
        this.state = {orderId : null}
    }

    componentWillMount() {
        this.props.dispatch(createAndGetPaymentOrderId())
            .then((data)=>{
                if(!data){ return; }
                this.setState({orderId : data.order_id, amount: data.amount})
            })
    }
    componentDidMount(){
        // console.log("PaymentGatewayHomeController :: componentDidMount", this.props);
        this.options.key = this.props.config ? this.props.config.payment_gateway_api_key : "rzp_test_wvka0Rx4vnREFT";
        
    }

    openCheckoutModal() {
        let _this = this;
        this.options.amount = this.state.amount * 100;
        this.options.order_id = this.state.orderId
        this.options.description = this.props.description;
        this.options.prefill = {}
        this.options.prefill.name = this.props.name
        this.options.prefill.email = this.props.email
        this.options.prefill.contact = this.props.phone
        // console.log("razorpay_payment_id ::  this.options ::", this.options)
        this.options.handler = (response) => {
            // console.log("razorpay_payment_id :: response ::", response)
            if(this.props.discountCodeApplied === 1)
                response['discount_code'] = this.props.discountCode
            let transactionUpdate = _this.props.dispatch(sendPaymentResponse(response))
            transactionUpdate.then((data) => {
                console.log("transactionUpdate", data, response.razorpay_order_id)
                _this.props.onPaymentDone(data, response.razorpay_order_id)
                _this.props.dispatch(changeCartModalState(false))
                _this.props.modalDismiss();
            })
        }
        this.options.modal = {
            escape : false,
        }
        this.options.modal.ondismiss = () => {  
            _this.setState({orderId : null});_this.props.modalDismiss();
        }
        let rzp = new window.Razorpay(this.options);
        rzp.open();
    }

    render() {
        // console.log("PaymentGatewayHomeController :: ", this.props)

        if( !this.state.orderId  ||  !this.state.amount  ){
            return null;
        }

        this.openCheckoutModal()
        
        return null;
    }

}

let mapStateToProps = (store) => {
    return {
        config : store.appDataReducer.configs
    }
}

export default connect(mapStateToProps)(PaymentGatewayHomeController)