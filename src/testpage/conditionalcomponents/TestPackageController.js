import React, { Component } from 'react'
import TestPackage from '../presentationalcomponents/TestPackage'
import { purchase_service } from '../../SubscriptionsPage/conditionalcomponents/action'
import { connect } from 'react-redux';
import PaymentHomeController from '../../paymentPage/conditionalComponents/paymentHomeController';


class TestPackageController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isProgressOnPayButton: false,
            payButtonId: -1,
            isPayment: "False",
            product_id:"",
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
        this.onPaymentDone =this.onPaymentDone.bind(this)
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
    }

    setPayButtonId(id) {
        this.setState({ payButtonId: id })
    }

    setProgressOnPayButton() {
        this.setState({ isProgressOnPayButton: true })
    }

    unsetProgressOnPayButton() {
        this.setState({ isProgressOnPayButton: true })
    }

    setPayment() {
        this.setState({ isPayment: "True" })
    }

    unsetPayment() {
        this.setState({ isPayment: "False" })
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
        let returnPromise = this.props.dispatch(purchase_service(product_id, "Test_Single_Package"))
        returnPromise.then((response) => {
            console.log("FirstTestPageController::onClickForPurchasingService", response)
            if (response.status == true) {
                this.unsetProgressOnPayButton()
                this.props.refresh()
                // this.props.dispatch({ type: "testEnrollmentDetail", data: response });
            }
        })
    }

    onClickToPaymentPage(product_id, amount) {
        this.setAmount(amount)
        this.setProductId(product_id)
        this.setProductType("Test_Single_Package")
        this.setPayment()
    }

    onPaymentDone(){
        this.props.refresh();
        this.unsetPayment();
    }


    render() {


        let body = <TestPackage {...this.props}
            onClickForPurchasingService={this.onClickForPurchasingService}
            isProgressOnPayButton={this.state.isProgressOnPayButton}
            payButtonId={this.props.payButtonId}
            onClickToPaymentPage={this.onClickToPaymentPage}
        />

        return (
            <div>
                {body}
                {this.state.isPayment === "True" ?
                    <PaymentHomeController productInfo={this.state.product_id}  onPaymentDone={this.onPaymentDone}
                            amount={this.state.amount} product_type={this.state.product_type}/>
                    :
                    null}
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    return {
    }
}

export default connect(mapStateToProps)(TestPackageController);