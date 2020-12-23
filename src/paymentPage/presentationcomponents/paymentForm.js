import React, { Component } from 'react';
import {URL_TEXT} from '../../GlobalConstants'

class PaymentForm extends Component {
    constructor(props){
        super(props);
        // this.transactionErrorHandler = this.transactionErrorHandler.bind(this);
        // this.transactionResonsehandler = this.transactionResonsehandler.bind(this);
    }
    
    getForm(){
        return (
            <form action={this.props.data.action} name="payuform" id="payuform" method="POST" >
                <input type="hidden" name="key" value={this.props.data.MERCHANT_KEY} />
                <input type="hidden" name="hash_string" value={this.props.data.hash_string} />
                <input type="hidden" name="hash" value={this.props.data.hashh} />
                <input type="hidden" name="txnid" value={this.props.data.txnid} />
                <table>
                    <tbody>
                        <tr>
                            <td><b>Mandatory Parameters</b></td>
                        </tr>
                        <tr>
                            <td>Amount: </td>
                            <td><input name="amount" value={this.props.data.amount} /></td>
                            <td>First Name: </td>
                            <td><input name="firstname" id="firstname" value={this.props.data.firstname} /></td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td><input name="email" id="email" value={this.props.data.email} /></td>
                            <td>Phone: </td>
                            <td><input name="phone" defaultValue={this.props.data.phone||8790909745} /></td>
                        </tr>
                        <tr>
                            <td>Product Info: </td>
                            <td colSpan="3"><textarea name="productinfo" value={this.props.data.productinfo}>  </textarea></td>
                        </tr>
                        <tr>
                            <td>Success URI: </td>
                            <td colSpan="3"><input name="surl" size="64" value={this.props.data.surl||URL_TEXT+"paymentSuccess/"} /></td>
                        </tr>
                        <tr>
                            <td>Failure URI: </td>
                            <td colSpan="3"><input name="furl" size="64" value={this.props.data.furl||URL_TEXT+"paymentFailure/"} /></td>
                        </tr>
                        <tr>
                            <td colSpan="3"><input type="hidden" name="service_provider" value="payu_paisa" /></td>
                        </tr>
                        <tr>
                            <td colSpan="4"><input type="submit" value="Submit" /></td>
                        </tr>
                    </tbody>
                </table>
            </form >
        );
    }

    // transactionResonsehandler(response){
    //     let resp = {
    //         product_type : this.props.product_type,
    //         response : response.response
    //     }
    //     if (!resp.response.hasOwnProperty("txnid")){
    //         resp.response.txnid =  this.props.data.txnid
    //     }
    //     console.log("PaymentHomeController::transactionResonsehandler",resp , this.props)
    //     let transactionUpdate = this.props.dispatch(this.props.sendPaymentResponse(resp))
    //     transactionUpdate.then(this.props.onPaymentDone);
    //  }

    // transactionErrorHandler(response){
        
    //     let resp = {
    //         product_type : this.props.product_type,
    //         response : response.response
    //     }
    //     if (!resp.response.hasOwnProperty("txnid")){
    //         resp.response.txnid =  this.props.data.txnid
    //     }
    //     console.log("PaymentHomeController::transactionErrorHandler",resp );
    //     let transactionUpdate = this.props.dispatch(this.props.sendFailurePaymentResponse(resp));
    //     transactionUpdate.then(this.props.onPaymentDone);
    // }
    //{"product_type":"Test_Single_Package","response":{"txnStatus":"CANCEL","txnMessage":"Overlay closed by consumer"}}

    /*
    // Success resp
    response":{"country":"","udf10":"","discount":"0.00","cardToken":"82ad83266b1327ae9693f",
    "mode":"CC","cardhash":"This field is no longer supported in postback params.","error_Message":"No Error",
    "state":"","bankcode":"CC","txnid":"f23b118be0500854f90d",
    "surl":"https://www.payumoney.com/sandbox/payments/guestcheckout/#/success/F68ABEF9F11CED9AD89B2FCE554C8417",
    "net_amount_debit":"5","lastname":"","zipcode":"","phone":"8790909745","productinfo":"ABCD Session",
    "hash":"16fffbff17639517c07a4802cb35d5e64aae34f1ea79deb87a1ab34626b6e4a03a9dd6cb56c7fbe362a37e719f010bdee4c22e6732519959465a430edee5a510",
    
    "status":"success",
    
    "firstname":"Ayush","city":"","error":"E000","addedon":"2018-01-14 18:03:28",
    "udf9":"","udf7":"","udf8":"","encryptedPaymentId":"F68ABEF9F11CED9AD89B2FCE554C8417",
    "bank_ref_num":"4487914031880140","key":"fMzoZSDR","email":"ayush.poddar20@gmail.com",
    "amount":"5.0","unmappedstatus":"captured","address2":"","payuMoneyId":"12681","address1":"",
    "udf5":"","mihpayid":"6981","udf6":"","udf3":"","udf4":"","udf1":"","udf2":"","field1":"80144551020",
    "cardnum":"512345XXXXXX2346","field7":"","field6":"",
    "furl":"https://www.payumoney.com/sandbox/payments/guestcheckout/#/failure/F68ABEF9F11CED9AD89B2FCE554C8417",
    "field9":"SUCCESS","field8":"","amount_split":"{\"PAYU\":\"5.0\"}","field3":"4487914031880140","field2":"999999",
    "field5":"","PG_TYPE":"HDFCPG","field4":"4487914031880140","name_on_card":"payu","txnStatus":"SUCCESS",
    "txnMessage":"Transaction Successful"}
    
    */

    launchOverlay(){
        if(!this.props.data){
            console.log("PaymentForm::this.props.data is null ",this.props.data );
            return null
        }
        window.bolt.launch(this.props.data,
            { responseHandler:this.props.transactionResonsehandler,
              catchException: this.props.transactionErrorHandler
            }            
        )
    }

    render() {
        console.log("PaymentForm::", this.props)
        return (
            <div>
                {this.launchOverlay()}
            </div>
            

        );
    }

}

export default PaymentForm;