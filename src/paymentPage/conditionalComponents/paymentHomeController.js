import React, { Component } from 'react';
import PaymentForm from '../presentationcomponents/paymentForm';
import { getPaymentHashValues, sendPaymentResponse, sendFailurePaymentResponse, resetPaymentStore } from './action';
import { connect } from 'react-redux';
import { URL_TEXT } from '../../GlobalConstants';

class PaymentHomeController extends Component {
    constructor(props) {
        super(props);
        // amount|productinfo|firstname|email
        // this.state = {  "posted": {}, 
        //                 "hashh": "",
        //                 "MERCHANT_KEY": "",
        //                 "txnid": "",
        //                 "hash_string": "",
        //                 "action": ""
        //             }
        this.state = {
            showModal: false
        }
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        // console.log("PaymentHomeController::componentDidMount::")
        if (this.props.productInfo === undefined|| this.props.amount === undefined){
            console.warn( "**********Payment cat be done. invalid Props.")
            return;
        }
        let formVal = {
            productinfo: this.props.productInfo.toString() ,
            amount: this.props.amount 
        }
        let paymentHashValues = this.props.dispatch(getPaymentHashValues(formVal));
        let _this = this;
        paymentHashValues.then(function (data) {
            console.log("PaymentHomeController ::", _this.state, data);
            if (data) {
                // _this.setState(data, _this.submitForm);
                _this.setState({
                    key: data.MERCHANT_KEY,
                    txnid: data.txnid,
                    hash: data.hashh,
                    amount: data.posted.amount,
                    firstname: data.posted.firstname,
                    lastname: data.posted.lastname,
                    email: data.posted.email,
                    phone: data.posted.phone,
                    productinfo: data.posted.productinfo,
                    action: data.action,
                    surl: URL_TEXT + "paymentSuccess/",
                    furl: URL_TEXT + "paymentFailure/",
                    showModal: true
                }, _this.submitForm)
            }

        })
            .catch(function (e) {
                console.warn(e);
            });
    }

    submitForm() {
        // this.props.dispatch(updatePresentPaymenTransaction(this.state));
        console.log("PaymentHomeController ::submitForm()", this.state, this.props );
    }

    transactionResonsehandler(response){
        let resp = {
            product_type : this.props.product_type,
            response : response.response
        }
        // console.log("PaymentHomeController::transactionResonsehandler",resp , response)
        let transactionUpdate = this.props.dispatch(sendPaymentResponse(resp))
        transactionUpdate.then(this.props.onPaymentDone);
     }

    transactionErrorHandler(response){
        let resp = {
            product_type : this.props.product_type,
            response : response.response
        }
        let transactionUpdate = this.props.dispatch(sendFailurePaymentResponse(resp));
        transactionUpdate.then(this.props.onPaymentDone);
    }

    render() {
        return (
            <div>
                {
                    this.state.showModal ?
                        <PaymentForm {...this.props} data={this.state}
                            transactionResonsehandler={this.transactionResonsehandler.bind(this)}
                            transactionErrorHandler={this.transactionErrorHandler.bind(this)}
                        />
                        : null
                }
            </div>


        );
    }

}

let mapStateToProps = (store) => {
    return {
    }
}

export default connect(mapStateToProps)(PaymentHomeController)