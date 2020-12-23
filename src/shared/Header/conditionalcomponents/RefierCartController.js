import React, { Component } from 'react';
import 'redux'
import { connect } from 'react-redux'
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { getCartItem, getCartItems } from '../../../paymentPage/conditionalComponents/action'
import RefierCartHeader from '../presentationalcomponents/RefierCartHeader';
import CheckoutPageController from '../../../paymentPage/conditionalComponents/checkoutPageController';
import { changeCartModalState } from './action';
import { ComplementaryButton } from '../../RefierComponents/ComplementaryButton';


class RefierCartController extends Component {
    constructor(props) {
        super(props);

        this.showCartPage = this.showCartPage.bind(this);
        this.closeCartPage = this.closeCartPage.bind(this);
        this.closeCartPopover = this.closeCartPopover.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getCartItems());
    }

    componentDidMount() {
        if(this.refs.cart_nav)
            this.props.dispatch({type: 'cart_nav', data: this.refs.cart_nav.getBoundingClientRect()})
    }

    componentWillReceiveProps(nextProps) {
        // console.log('RefierCartController:: nextProps ', nextProps)
        if(nextProps.highlightCart === 'cart_nav') {
            this.refs.overlay.show()
        }
    }

    showCartPage() {
        // if(this.props.isCartModalOpen){
        //     return;
        // }()
        // console.log(this.props)
        this.props.dispatch(changeCartModalState(true))
        // this.setState({isShowCartPage:true})
    }

    closeCartPage() {
        // this.setState({isShowCartPage:false})
        this.props.dispatch(changeCartModalState(false))
    }

    closeCartPopover() {
        this.refs.overlay.hide()
        localStorage.setItem('hasItemsInCart', "false")
        this.props.dispatch({type: 'highlightCart', data: 'none'})
    }


    render() {
        // console.log("RefierCartController ::", this.props);

        let popover = (
            <Popover id="cart-popover" style={{zIndex: '1000'}}>
                <div className="custom-list-content"
                    style={{padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{marginRight: '10px'}}>You have items in your cart</div>
                    <ComplementaryButton buttonText="OK" onButtonClick={this.closeCartPopover} />
                </div>
            </Popover>
        )
        
        return (
            <div ref="cart_nav">
                <OverlayTrigger placement="bottom" overlay={ popover } ref="overlay">
                    <RefierCartHeader 
                        highlightCart={this.props.highlightCart && this.props.highlightCart === 'cart_nav'}
                        numberOfCartItems={this.props.cartItems ? this.props.cartItems.length : 0}
                        showCartPage={this.showCartPage} />
                </OverlayTrigger>
            </div>
        );
    }

}

let mapStateToProps = (store) => {
    // console.log("abhishek",store)
    return {
        cartItems: store.refierCartReducer.cartItems,
        isCartModalOpen: store.refierCartReducer.isCartModalOpen,
        highlightCart: store.stylesDataReducer.highlightCart
    }
}

export default connect(mapStateToProps)(RefierCartController)