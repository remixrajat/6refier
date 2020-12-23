import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';

import { getPaymentHashValues, removeCartItem } from './action';
import PaymentHomeController from './paymentHomeController';
import CheckoutPage from '../presentationcomponents/checkoutPage';
import PaymentGatewayHomeController from './paymentHomeControllerNew';
import { getContentDetails, getContentAccess, getContentLikesDislikesMapping, getContentStats } 
    from '../../recordedContents/conditionalcomponents/actions';
import { getPackageList } from '../../SubscriptionsPage/conditionalcomponents/action';

import CommonModal from '../../shared/CommonModal'


const AFFILIATE_CODES = [
    "TECHNICALPAPAN",
    "NIDHISDIARY",
    "ROLISLIFESTYLE",
    "BHARATSWAMI",
    "NHRWA",
    "SWAPNILTHAKUR",
    "SANSKRUTISONKAR",
    "VIVEKYADAV",
    "SREERAM",
    "Anjaliak18",
    "VIJ05",
    "SDNSHU",
    "IWEB"
]


class CheckoutPageController extends Component{
    constructor(props) {
        super(props);
        this.state = {
            totalAmount : 0,
            discountAmount:0,
            totalPayableAmount : 0,
            initiatePayment : false,
            paymentConfirmMsg: '',
            isPaymentConfirmMsgModalOpen: false,
            affiliateLoader: false,
            discountCode: '',
            discountCodeApplied: 0
        }
        
        this.CREDIT_CONVERSION_MULTIPLIER = 1;
        
        this.onCheckoutHandler = this.onCheckoutHandler.bind(this);
        this.onDismissCheckoutHandler = this.onDismissCheckoutHandler.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.setTotalAmount = this.setTotalAmount.bind(this);
        this.setDiscountAmount = this.setDiscountAmount.bind(this);
        this.setTotalPayableAmount = this.setTotalPayableAmount.bind(this);
        this.onPaymentDone = this.onPaymentDone.bind(this);
        this.onDiscountHandler = this.onDiscountHandler.bind(this);
        this.setDiscountCode = this.setDiscountCode.bind(this);
        this.paymentConfirmMsgModalOpen = this.paymentConfirmMsgModalOpen.bind(this);
        this.paymentConfirmMsgModalClose = this.paymentConfirmMsgModalClose.bind(this);
    }

    componentDidMount() {
        this.setTotalPayableAmount(this.props.userCredits);
    }

    componentWillReceiveProps(nextProps) {
        this.setTotalPayableAmount(nextProps.userCredits)
    }

    paymentConfirmMsgModalOpen() {
        this.setState({isPaymentConfirmMsgModalOpen: true})
    }

    paymentConfirmMsgModalClose() {
        this.setState({isPaymentConfirmMsgModalOpen: false})
    }

    onCheckoutHandler(e) {
        this.setState({initiatePayment: true})
    }

    onDismissCheckoutHandler() {
        this.setState({initiatePayment:false}) 
    }

    setDiscountCode(discountCode) {
        this.setState({discountCode, discountCodeApplied: 0})
    }

    setTotalAmount(amount) {
        // console.log("setTotalAmount ::", amount);
        this.setState({totalAmount:amount}, this.setTotalPayableAmount)
    }

    setDiscountAmount(amount) {
        this.setState({discountAmount:amount}, this.setTotalPayableAmount)
    }

    setTotalPayableAmount(userCredits) {
        let availableCredits = 0 ;
        // console.log("setTotalAmount :: ", this.props  );
        if(userCredits && userCredits.length > 0 &&  userCredits[0].fields){
            availableCredits = userCredits[0].fields.total_credits
        }
        
        let total = this.state.totalAmount - this.state.discountAmount - (availableCredits * this.CREDIT_CONVERSION_MULTIPLIER)
        this.setState({totalPayableAmount: total});
    }

    removeFromCart(cart_id) {
        // console.log('removeFromCart :: ');
        this.props.dispatch(removeCartItem({item : cart_id}))
    }

    onDiscountHandler() {
        // console.log("AFFILIATE_CODES:: ", AFFILIATE_CODES.indexOf(this.state.discountCode))

        if(this.state.discountCode.trim() !== '') {
            if(AFFILIATE_CODES.indexOf(this.state.discountCode) > -1)
                this.setState({discountCodeApplied: 1})
            else
                this.setState({discountCodeApplied: -1})
        }
    }

    onPaymentDone(transactionMsg, order_id) {
        if(transactionMsg && transactionMsg.transaction_status) {
            if(transactionMsg.msg === "Transaction Successful") {
                let paymentConfirmMsg = (<div style={{padding: '50px'}}>
                    <div style={{padding: '10px', borderRadius: '3px', marginBottom: '20px'}} 
                        className="form-status-success">
                        Payment Successfully Done
                    </div>
                    <div className="custom-list-content" style={{marginBottom: '30px'}}>
                        Order ID: {order_id}
                    </div>
                    <div style={{marginBottom: '5px'}}>
                        <Link to={"/userDashboard/viewOrders/"}>
							<Button bsStyle="primary"
								bsSize="small" className="refier_custom_button_dark" block
								block>Click to see your Orders</Button>
						</Link>
                    </div>
                </div>)
                this.setState({paymentConfirmMsg})
            } else if (transactionMsg.msg === "Transaction Failed") {
                let paymentConfirmMsg = (
                    <div style={{padding: '50px'}}>
                        <span className="form-status-fail" 
                            style={{padding: '10px', borderRadius: '3px'}}>
                            Payment Failed.
                        </span>
                    </div>
                )
                this.setState({paymentConfirmMsg})
            } else {
                let msg = transactionMsg.msg;
                let paymentConfirmMsg = (<div style={{padding: '50px', display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginBottom: '15px', padding: '10px', borderRadius: '3px'}} 
                        className="form-status-success">Payment Successfully Done</div>
                    <div className="custom-list-content" style={{marginBottom: '5px'}}>
                        Order ID: {order_id}
                    </div>
                    <div className="custom-list-content" style={{marginBottom: '5px'}}>
                        <b>{msg} with the provided Order ID</b>
                    </div>
                    <div className="custom-list-content" style={{marginBottom: '30px'}}>
                        Email - info@refier.com
                    </div>
                    <div style={{marginBottom: '5px'}}>
                        <Link to={"/userDashboard/viewOrders/"}>
							<Button bsStyle="primary"
								bsSize="small" className="refier_custom_button_dark" block
								block>Click to see your Orders</Button>
						</Link>
                    </div>
                </div>)

                this.setState({paymentConfirmMsg})
            }
        } else {
            let paymentConfirmMsg = (<div style={{padding: '50px'}}>
                <span className="form-status-fail" 
                    style={{padding: '10px', borderRadius: '3px'}}>Payment Failed.</span>
            </div>)
            this.setState({paymentConfirmMsg})
        }
        this.paymentConfirmMsgModalOpen()

        this.props.dispatch(getContentDetails());
        this.props.dispatch(getContentAccess());
        this.props.dispatch(getContentLikesDislikesMapping())
        this.props.dispatch(getContentStats()) ;
        this.props.dispatch(getPackageList())
    }

    render() {
        // console.log("CheckoutPageController::props", this.props, this.state)

        return (
            <div>
                <CheckoutPage {...this.props}  {...this.state}
                    CREDIT_CONVERSION_MULTIPLIER={this.CREDIT_CONVERSION_MULTIPLIER }
                    onCheckoutHandler={this.onCheckoutHandler} 
                    setTotalAmount={this.setTotalAmount} 
                    setDiscountAmount={this.setDiscountAmount} 
                    removeFromCart={this.removeFromCart}
                    setDiscountCode={this.setDiscountCode}
                    onDiscountHandler={this.onDiscountHandler}
                />
                { this.state.initiatePayment && this.props.userDetails ? 
                    <PaymentGatewayHomeController 
                        name={this.props.userDetails.first_name + " " + this.props.userDetails.last_name} 
                        email={this.props.userDetails.email}
                        phone={this.props.userDetails.mobile_number}
                        description={"Refier Payment"} 
                        discountCodeApplied={this.state.discountCodeApplied}
                        amount={this.state.totalPayableAmount}
                        onPaymentDone={this.onPaymentDone}
                        modalDismiss={this.onDismissCheckoutHandler}
                        discountCode={this.state.discountCode.trim()}
                    />  // amount in Rs.
                    : null
                }
                <CommonModal close={this.paymentConfirmMsgModalClose}
                    showModal={this.state.isPaymentConfirmMsgModalOpen}
                    modalHeading="Payment Confirm Information"
                    modalBody={this.state.paymentConfirmMsg} />
            </div>
        );
    }
}


let mapStateToProps = (store) => {
    // console.log("CheckoutPageController :: store ::", store);
    return {
        cartItems : store.refierCartReducer.cartItems,
        userCredits: store.userProfileReducer.credits,
        userDetails: store.userProfileReducer.profileFields
    }
}

export default connect(mapStateToProps)(CheckoutPageController)