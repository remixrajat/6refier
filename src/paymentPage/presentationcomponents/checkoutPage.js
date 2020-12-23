import React, { Component } from 'react';
import { Col,  ListGroup, Grid, OverlayTrigger, Popover } from "react-bootstrap";
import FontAwesome from 'react-fontawesome';

import CartItemList from './CartItemList'

import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';
import { NonPriorityWhiteButton } from '../../shared/RefierComponents/NonPriorityWhiteButton';
import Preloader from '../../shared/Preloader/PreLoader';


class CheckoutPage extends Component {
    constructor(props) {
        super(props);

        this.cartItemDivList = null;
        this.createProductList = this.createProductList.bind(this);
        this.setCouponButton = this.setCouponButton.bind(this);
        this.addTaxToTotalAmount = this.addTaxToTotalAmount.bind(this);
    }

    createProductList() {
        if (!this.props.cartItems) {
            return null
        }
        let _this = this;

        // let cartItemDivList = this.props.cartItems.map((product) => {
        //     totalAmount = totalAmount + product.fields.cost
        //     return (
        //         <div>
        //             <CartItemList cartId={product.pk} product={product.fields} removeFromCart={_this.props.removeFromCart}/>
        //         </div>
        //     )
        // });

        return (
            <ListGroup>
                {this.cartItemDivList}
            </ListGroup>
        )
    }

    componentWillReceiveProps(nextProps) {
        // console.log("CheckoutPage :: 0")
        if (!nextProps.cartItems) {
            return;
        }
        // console.log("CheckoutPage :: 1")
        if (this.props.cartItems && (this.props.cartItems.length === nextProps.cartItems.length)) {
            return
        }
        // console.log("CheckoutPage :: 2")
        let totalAmount = 0;
        this.cartItemDivList = nextProps.cartItems.map((product,i) => {
            totalAmount = totalAmount + product.fields.cost
            return (
                <div key={i}>
                    <CartItemList cartId={product.pk} 
                        index={i}
                        product={product.fields} 
                        removeFromCart={nextProps.removeFromCart} 
                    />
                </div>
            )
        });
        // console.log("CheckoutPage :: ", this.cartItemDivList)
        nextProps.setTotalAmount(totalAmount);
    }

    componentDidMount(){
        if (!this.props.cartItems) {
            return;
        }

        let totalAmount = 0;
        let _this = this;
        this.cartItemDivList = this.props.cartItems.map((product,i) => {
            totalAmount = totalAmount + product.fields.cost
            return (
                <div key={i}>
                    <CartItemList cartId={product.pk} 
                        product={product.fields} 
                        index={i}
                        removeFromCart={_this.props.removeFromCart} 
                    />
                </div>
            )
        });
        // console.log("CheckoutPage :: ", this.cartItemDivList)
        this.props.setTotalAmount(totalAmount);
    }

    // getTotalAmount(){
    //     if(!this.props.cartItems){
    //         return;
    //     }
    //     this.props.cartItems.map((product)=>{})
    // }

    setCouponButton(code) {
        let text = "Apply"

        if(code === -1) {
            text = "Wrong Code"
        } else if (code === 1) {
            text = "Applied"
        } else {
            text = "Apply"
        }

        return (
            <NonPriorityWhiteButton
                style={code === 1 ? {boxShadow: "none"} : {}}
                onButtonClick={this.props.onDiscountHandler}
                buttonText={text}
            />
        )
    }

    addTaxToTotalAmount(total) {
        let gst = .18
        let totalWithTax = total + (total * gst) 
        return totalWithTax
    }


    render() {
        // console.log("CheckoutPage :: props", this.props)

        let availableCredits = 0;
        
        if (!this.props.cartItems) {
            return null;
        }

        if (this.props.userCredits 
            && this.props.userCredits.length > 0 
            && this.props.userCredits[0].fields) {
            availableCredits = this.props.userCredits[0].fields.total_credits
        }

        let discountInfo = (
            <Popover id="discount-popover">
                <div style={{padding: '10px'}} className="custom-list-sub-content">
                    <div>
                        <span style={{marginRight: '10px'}}>
                            You'll receive <b>5%</b> of the total amount back as Refier Credits
                        </span>
                    </div>
                </div>
            </Popover>
        )

        let popoverCredits = (
            <Popover id="credit-popover">
                <div style={{padding: '10px'}} className="custom-list-sub-content">
                    <div>
                        <span style={{marginRight: '10px'}}>Conversion:</span>
                        <span><b>1 credit = ₹{this.props.CREDIT_CONVERSION_MULTIPLIER}</b></span>
                    </div>
                </div>
            </Popover>
        )

        let popoverOrder = (
            <Popover id="order-popover">
                <div style={{padding: '10px'}} className="custom-list-sub-content">
                    <div>
                        When your order is placed, we'll send you an e-mail message acknowledging your order. 
                        If you choose to pay using an electronic payment method (credit card, debit card or net banking), you will be directed to your bank's website to complete your payment. 
                        Your contract to purchase an item will not be complete until we receive your electronic payment.
                    </div>
                </div>
            </Popover>
        )

        let orderSummary = (
            <div style={{background: 'white', borderRadius: '4px 4px 0 0', 
                border: '1px solid #ddd', paddingTop: '10px'}}>
                {this.props.initiatePayment ?
                    <div style={{ textAlign: "center", padding: '20px' }}>
                        <Preloader />
                    </div>
                    :
                    <div style={{padding: '20px'}}>
                        <PrimaryButton
                            onButtonClick={this.props.onCheckoutHandler}
                            buttonText="Make Payment"
                            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            isBlock={true}
                            showIcon={
                                <FontAwesome
                                    name="lock"
                                    style={{ marginRight: "5px", fontSize: '16px' }}
                                />    
                            }
                        />
                    </div>
                }
                {this.props.affiliateLoader ?
                    <div style={{ textAlign: "center", padding: '20px' }}>
                        <Preloader />
                    </div>
                    :
                    <div style={{padding: '20px'}}>
                        <div style={{marginBottom: '5px'}}>
                            <span className="custom-list-content" style={{fontWeight: '600'}}>
                                <span>Discount Coupon</span>
                                <OverlayTrigger 
                                    placement="top" 
                                    overlay={discountInfo} 
                                    rootClose>
                                    <FontAwesome name="info-circle" style={{marginLeft: '10px', fontSize: '14px'}} />
                                </OverlayTrigger>
                            </span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <input className="custom-list-content" 
                                style={{border: 'none', borderBottom: '1px solid rgba(0,0,0,0.4)', borderRadius: '4px'}}
                                value={this.props.discountCode} type="name" 
                                onChange={(e) => this.props.setDiscountCode(e.target.value)}
                            />
                            {this.setCouponButton(this.props.discountCodeApplied)}
                        </div>
                    </div>
                }
                <table className="table custom-list-content" style={{marginBottom: '15px'}}>
                    <tr>
                        <td style={{padding: '10px 20px'}}>
                            <span style={{fontWeight: '600'}} className="custom-list-content">Order Summary: </span>
                        </td>
                    </tr>
                    <tr className="custom-list-sub-content">
                        <td style={{paddingLeft: '20px'}}>
                            {'Total Price (' + this.props.cartItems.length + ' items)'}
                        </td>
                        <td style={{textAlign: 'right', paddingRight: '35px'}}>
                            ₹&nbsp;{this.props.totalAmount}
                        </td>
                    </tr>
                    <tr className="custom-list-sub-content">
                        <td style={{paddingTop: '5px', paddingLeft: '20px'}}>
                            {'GST:'}
                        </td>
                        <td style={{textAlign: 'right', paddingRight: '35px'}}>
                            18%
                        </td>
                    </tr>
                    <tr className="custom-list-sub-content">
                        <td style={{paddingTop: '5px', paddingLeft: '20px'}}>
                            Available Credits {" (" + availableCredits + ")"}
                            {/* <p><small style={{ marginLeft: "10px", color: "#a9a9a9" }}>
                                Note: 1 credit = ₹&nbsp;{this.props.CREDIT_CONVERSION_MULTIPLIER} </small>
                            </p> */}
                        </td>
                        <td style={{textAlign: 'right', paddingRight: '35px'}}>
                            {"-"}&nbsp;₹&nbsp;{availableCredits * this.props.CREDIT_CONVERSION_MULTIPLIER}
                        </td>
                    </tr>
                    {this.props.discountAmount > 0 ?
                        <tr className="custom-list-sub-content">
                            <td style={{paddingTop: '5px', paddingLeft: '20px'}}>
                                Discount
                            </td>
                            <td style={{textAlign: 'right', paddingRight: '35px'}}>
                                {"-"}&nbsp;₹&nbsp;{this.props.discountAmount}
                            </td>
                        </tr>
                        : null
                    }
                    <tr>
                        <td style={{ padding: '7px 20px' }}>
                            <div style={{borderTop: '1px solid rgba(0,0,0,0.1)'}}></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="custom-list-title-content" 
                            style={{fontWeight: '600', paddingLeft: '20px'}}> 
                            Order Total
                        </td>
                        <td className="custom-list-title-content" 
                            style={{fontWeight: '600', fontSize: '20px', textAlign: 'right', paddingRight: '35px'}}>
                            {/* ₹&nbsp;{this.props.totalPayableAmount} */}
                            ₹&nbsp;{this.addTaxToTotalAmount(this.props.totalPayableAmount)}
                        </td>
                    </tr>
                    {/* <tr>
                        <td >
                            <span className="custom-list-sub-content">
                                * Inclusive of all taxes
                            </span>
                        </td>
                    </tr> */}
                </table>
                <div style={{background: 'rgba(0,0,0,0.05)', padding: '20px', borderTop: '2px solid #ddd'}}>
                    {availableCredits !== 0 ?
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                            <span style={{fontWeight: '600'}} className="custom-list-content">
                                Your Savings: 
                            </span>
                            <span style={{textAlign: 'right', paddingRight: '15px'}} className="custom-list-content">
                                ₹{availableCredits * this.props.CREDIT_CONVERSION_MULTIPLIER}
                            </span>
                        </div>
                        : null
                    }
                    <div>
                        <span className="custom-list-content"
                            style={{display: 'flex', alignItems: 'center'}}>
                            <FontAwesome name="shield" style={{marginRight: '13px', fontSize: '18px'}} />
                            <span>Safe and Secure Payment</span>
                        </span>
                    </div>
                    <div>
                        <span className="custom-list-content"
                            style={{display: 'flex', alignItems: 'center'}}>
                            <FontAwesome name="clock-o" style={{marginRight: '10px', fontSize: '18px'}} />
                            <span>15-days money back guarantee</span> 
                        </span>
                    </div>
                    <div>
                        <OverlayTrigger 
                            placement="top" 
                            overlay={popoverCredits} 
                            rootClose>
                            <span className="custom-list-sub-content" 
                                style={{color: '#049cdb', cursor: 'pointer'}}>
                                How are credits calculated? 
                            </span>
                        </OverlayTrigger>
                    </div>
                    <div>
                        <OverlayTrigger 
                            placement="top" 
                            overlay={popoverOrder} 
                            rootClose>
                            <span className="custom-list-sub-content" 
                                style={{color: '#049cdb', cursor: 'pointer'}}>
                                What happens when order is placed? 
                            </span>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
        );

        return (
            <div style={{ maxHeight: "90vh", padding: "0px", marginTop: "50px" }}>
                {this.props.initiatePayment ? 
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Preloader loaderMessage="Processing Payment" />
                    </div> :
                    this.props.cartItems && this.props.cartItems.length > 0 ?
                        <Grid>
                            <Col sm={8} 
                                style={{background: 'white', border: '1px solid #ddd', padding: '10px'}}> 
                                <div className="custom-list-title-content"
                                    style={{fontWeight: '600', fontSize: '20px', 
                                        paddingLeft: '10px', letterSpacing: '0.0125em'}}>
                                    Review your Order
                                </div>
                                <div style={{marginTop: '20px'}}>{this.createProductList()}</div> 
                            </Col>
                            <Col sm={4} > {orderSummary}</Col>
                        </Grid>
                        :
                        <Grid>
                            <Col xs={12} >
                                <div className="custom-list-content"
                                    style={{ textAlign: 'center', background: 'white', padding: '10px',
                                        borderRadius: '3px' }}>
                                    <span>There are no items in the cart</span>
                                </div>
                            </Col>
                        </Grid>
                }
            </div>
        )
    }
}

export default CheckoutPage;