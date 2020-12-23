import React, { Component } from 'react'
import { connect } from 'react-redux';

import PackageValidity from '../presentationalcomponents/PackageValidity'
import { addToCart } from '../../../paymentPage/conditionalComponents/action'
import { purchase_service } from '../../../SubscriptionsPage/conditionalcomponents/action'
import { submitJoinCommunityRequest } from '../../../communitypage/conditionalcomponents/action'
import { Event } from '../../../actionTracking/actionTracking'
import { getCommunityListMemberOnly } from '../../Header/conditionalcomponents/action'

class PackageValidityController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isProgressOnPayButton: false,
            payButtonId: -1,
            isPayment: "False",
            product_id:"",
            amount:0,
            product_type:"",
            isInCart:false,
            showModal: false,
            closeModal: false
        }
        this.setProgressOnPayButton = this.setProgressOnPayButton.bind(this)
        this.unsetProgressOnPayButton = this.unsetProgressOnPayButton.bind(this)
        this.onClickForPurchasingService = this.onClickForPurchasingService.bind(this)
        this.onClickToPaymentPage = this.onClickToPaymentPage.bind(this)
        // this.setPayment = this.setPayment.bind(this)
        this.unsetPayment = this.unsetPayment.bind(this)
        this.setProductId = this.setProductId.bind(this)
        this.setProductType = this.setProductType.bind(this)
        this.setAmount = this.setAmount.bind(this)
        this.onPaymentDone = this.onPaymentDone.bind(this)
        this.showModal = this.showModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.joinCommunity = this.joinCommunity.bind(this)
    }

    componentDidMount() {
        if (this.props.product_type) {
            this.setProductType(this.props.product_type)
        }
        if (this.props.cartItems) {
            if (this.props.cartItems.length > 0) {
                for (let i = 0; i < this.props.cartItems.length; i++) {
                    if (this.props.available_package.pk ==
                        this.props.cartItems[i].fields.productValidityId) {
                        this.setIsInCart()
                    }
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.cartItems != undefined) {
            if (this.props.cartItems.length == nextProps.cartItems.legth) {
                return;
            }
        }
        else {
            if (nextProps.cartItems) {
                if (nextProps.cartItems.length > 0) {
                    for (let i = 0; i < nextProps.cartItems.length; i++) {
                        if (nextProps.available_package.pk ==
                            nextProps.cartItems[i].fields.productValidityId) {
                            this.setIsInCart()
                        }
                    }
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

    onClickForPurchasingService(product_id, product_type) {
        Event("VIDEO_PAYMENT", "Video Added To Cart Initiate", "Product_id: " + product_id)
        this.setProgressOnPayButton()
        // let communityReturnPromise = this.props.dispatch(submitJoinCommunityRequest(
        //     this.props.communityBasicDataState[0].pk, member_type, desc));
        this.setPayButtonId(product_id)
        
        let payPromise = this.props.dispatch(purchase_service(product_id,product_type))
        payPromise.then((response) => {
            // console.log("onClickForPurchasingService:: resp", response)
            Event("VIDEO_PAYMENT", "Video Added To Cart Success", "Product_id: " + product_id)
            this.unsetProgressOnPayButton()
            this.props.refresh()
            // if (response.status == true) {
                // this.props.dispatch({ type: "testEnrollmentDetail", data: response });
            // }
        })
    }

    onClickToPaymentPage(product_id, amount, product_type) {
        Event("VIDEO_PAYMENT", "Pay Through Credit Initiate", "Product_id: " + product_id)
        this.setProgressOnPayButton()
        this.setAmount(amount)
        this.setProductId(product_id)
        this.setProductType(product_type)

        let addCartPromise = this.props.dispatch(addToCart({amount, product_id,product_type}))
        this.props.refresh()
        addCartPromise.then((response) => {
            this.unsetProgressOnPayButton()
            if (response && response.length > 0) {
                Event("VIDEO_PAYMENT", "Pay Through Credit Success", "Product_id: " + product_id)
                this.setIsInCart()
                // this.showModal();
                // setTimeout(() => {
                //         this.closeModal();
                //         this.props.closeModal();
				// }, 1000)  
            }
        })
        // this.setPayment()
    }

    joinCommunity(communityId) {
        this.setProgressOnPayButton()
        let communityPromise = this.props.dispatch(submitJoinCommunityRequest(
            communityId, 'student', ''));

        communityPromise.then((response) => {
            //console.log("RequestsToJoin:onSubmitRequest Promise", response)
            this.unsetProgressOnPayButton()
            this.props.dispatch(getCommunityListMemberOnly())
            this.props.refresh();
        })
    }

    onPaymentDone() {
        this.props.refresh();
        this.unsetPayment();
    }

    showModal() {
        this.setState({
            showModal: true,
            closeModal: false,
        })
    }

    closeModal() {
        this.setState({
            showModal: false,
            closeModal: true,
        })
    }


    render() {
        console.log("PackageValidityController :: props", this.props);

        let body = <PackageValidity {...this.props}
            onClickForPurchasingService={this.onClickForPurchasingService}
            isProgressOnPayButton={this.state.isProgressOnPayButton}
            payButtonId={this.props.payButtonId}
            onClickToPaymentPage={this.onClickToPaymentPage}
            joinCommunity={this.joinCommunity}
            isInCart={this.state.isInCart}
        />

        return (
            <div>{body}</div>
        )
    }
}

let mapStateToProps = (store) => {
    return {
        cartItems : store.refierCartReducer.cartItems,
        userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null)
    }
}

export default connect(mapStateToProps)(PackageValidityController);