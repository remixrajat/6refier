import React, { Component } from 'react'
import SubscriptionPackageValidity from '../presentationalcomponents/SubscriptionPackageValidity'
import { purchase_service } from '../../SubscriptionsPage/conditionalcomponents/action'
import { connect } from 'react-redux';
import PaymentHomeController from '../../paymentPage/conditionalComponents/paymentHomeController';
import { addToCart } from '../../paymentPage/conditionalComponents/action';

class SubscriptionPackageValidityController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isProgressOnPayButton: false,
            payButtonId: -1,
            isPayment: "False",
            product_id: "",
            isInCart:false,
            amount:0,
            product_type:"",
        }
        this.setProgressOnPayButton = this.setProgressOnPayButton.bind(this)
        this.unsetProgressOnPayButton = this.unsetProgressOnPayButton.bind(this)
        this.onClickForPurchasingService = this.onClickForPurchasingService.bind(this)
        this.onClickToPaymentPage = this.onClickToPaymentPage.bind(this)
        this.setPayment = this.setPayment.bind(this)
        this.unsetPayment = this.unsetPayment.bind(this)
        this.setProductId = this.setProductId.bind(this)
        this.setProductType = this.setProductType.bind(this)
        this.setAmount = this.setAmount.bind(this)
        this.onPaymentDone = this.onPaymentDone.bind(this)
    }

    componentDidMount() {
        if (this.props.cartItems) {
            if (this.props.cartItems.length > 0) {
                let inCart = false
                for (let i = 0; i < this.props.cartItems.length; i++) {
                    if (this.props.available_package.pk ==
                        this.props.cartItems[i].fields.productValidityId) {
                        inCart = true
                    }
                }
                if (inCart) {
                    this.setIsInCart()
                }
                else {
                    this.unsetIsInCart()
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log("SubscriptionPackageValidityController::nextProps",nextProps,this.props)
        if (this.props.cartItems != undefined) {
            if (this.props.cartItems.length == nextProps.cartItems.legth) {
                return;
            }
        }
        if (nextProps.cartItems) {
            if (nextProps.cartItems.length >= 0) {
                let isChanged = false
                let inCart = false
                for (let i = 0; i < nextProps.cartItems.length; i++) {
                    if (nextProps.available_package.pk ==
                        nextProps.cartItems[i].fields.productValidityId) {
                            inCart = true
                    }
                }
                if (inCart) {
                    this.setIsInCart()
                }
                else {
                    this.unsetIsInCart()
                }
            }
        }
    }

    setPayButtonId(id) {
        this.setState({ payButtonId: id })
    }

    setProgressOnPayButton() {
        this.setState({ isProgressOnPayButton: true })
    }

    unsetProgressOnPayButton() {
        this.setState({ isProgressOnPayButton: false })
    }

    setPayment() {
        this.setState({ isPayment: "True" })
    }

    unsetPayment() {
        this.setState({ isPayment: "False" })
    }

    setIsInCart(){
        this.setState({isInCart:true})
    }

    unsetIsInCart(){
        this.setState({isInCart:false})
    }

    setProductId(id){
        this.setState({product_id:id})
    }

    setProductType(type){
        this.setState({product_type:type})
    }

    setAmount(amount){
        this.setState({amount:amount})
    }

    onClickForPurchasingService(product_id) {
        this.setProgressOnPayButton()
        this.setPayButtonId(product_id)
        let returnPromise = this.props.dispatch(purchase_service(product_id, this.props.product_type))
        returnPromise.then((response) => {
            console.log("SubscriptionPackageValidityController::onClickForPurchasingService", response)
            if (response.status == true) {
                this.unsetProgressOnPayButton()
                this.props.refresh()
                this.setIsInCart() 
            }
        })
    }

    onClickToPaymentPage(product_id, amount) {
        this.setAmount(amount)
        this.setProductId(product_id)
        this.setProductType(this.props.product_type)
        // this.setPayment()
        let returnPromise = this.props.dispatch(addToCart({ amount, product_id, product_type: this.props.product_type }))
        returnPromise.then((response) => {
            if (response && response.length > 0) {
                this.setIsInCart() 
            }
        })
    }

    onPaymentDone(){
        this.props.refresh();
        this.unsetPayment();
    }

    render() {
        // console.log("SubscriptionPackageValidityController::props", this.props, this.state);


        let body = <SubscriptionPackageValidity {...this.props}
            onClickForPurchasingService={this.onClickForPurchasingService}
            isProgressOnPayButton={this.state.isProgressOnPayButton}
            payButtonId={this.props.payButtonId}
            onClickToPaymentPage={this.onClickToPaymentPage}
            isInCart={this.state.isInCart}
        />

        return (
            <div>
                {body}
                {this.state.isPayment === "True" ?
                    <PaymentHomeController productInfo={this.state.product_id} 
                            amount={this.state.amount} product_type={this.state.product_type}
                            onPaymentDone = {this.onPaymentDone}
                            />
                    :
                    null}
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    return {
        cartItems : store.refierCartReducer.cartItems
    }
}

export default connect(mapStateToProps)(SubscriptionPackageValidityController);