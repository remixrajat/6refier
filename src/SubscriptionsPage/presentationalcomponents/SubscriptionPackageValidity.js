import React, {Component} from 'react'
import {Col, Button} from 'react-bootstrap'
import Preloader from '../../shared/Preloader/PreLoader'

export default class SubscriptionPackageValidity extends Component{

    constructor(props) {
        super(props)
        this.state = {
            addedToCart : false
        }
        this.setAddedToCart = this.setAddedToCart.bind(this)
        this.unsetAddedToCart = this.unsetAddedToCart.bind(this)
    }

    setAddedToCart() {
        this.setState({ addedToCart: true })
    }

    unsetAddedToCart() {
        this.setState({addedToCart: false})
    }

    componentDidMount() {
        if (this.props.isInCart) {
            this.setAddedToCart()
        }
        else {
            this.unsetAddedToCart()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isInCart != nextProps.isInCart) {
            if (nextProps.isInCart) {
                this.setAddedToCart()
            }
            else{
                this.unsetAddedToCart()
            }
        }
    }

    render(){
        let index = this.props.index?this.props.index:0
        let buttonText = this.props.total_credits >= this.props.available_package.fields.cost_of_package_in_credits ?
                            <span>Buy {this.props.available_package.fields.cost_of_package_in_credits-this.props.total_credits} Credits</span> :
            <span>Add To Cart</span>
        
        let button
        if (this.state.addedToCart) {
            button = <div style={{ marginTop: "10px", fontStyle: "oblique" }}>Added to Cart</div>
        } else {
            button = <Button style={{ marginTop: "10px", }}
                onClick={this.props.onClickToPaymentPage.bind(this, this.props.available_package.pk, this.props.available_package.fields.cost_of_package_in_credits - this.props.total_credits, this.props.product_type)}
                className='refier_custom_button_new_selected_2'>{buttonText}
            </Button>
        }

        return(
            <Col xs={12}
                style={{display: "inline-block", textAlign:"left" }}>
                <div className="custom-border custom-test-package">
                    <div>Validity - {this.props.available_package.fields.validity} Days</div>
                    <div style={{ marginTop: "10px" }}
                    >Cost - {this.props.available_package.fields.cost_of_package_in_credits} Credits</div>
                    <div style={{ marginTop: "10px" }}
                    >Your available Credits - {this.props.total_credits}</div>
                    <div style={{ marginTop: "20px" }}>
                        {this.props.total_credits>=this.props.available_package.fields.cost_of_package_in_credits?
                        <div>
                            <div>
                                Go ahead and Pay through your available Credits
                            </div>
                            <div style={{ textAlign:"left"}}>
                            {(this.props.isProgressOnPayButton)?
                            <Preloader loaderMessage="Payment in Progress... Don't Refresh"/>
                            :
                            <Button style={{ marginTop: "10px" }}
                                onClick={this.props.onClickForPurchasingService.bind(this,this.props.available_package.pk)}
                                className='refier_custom_button_dark'>Pay {this.props.available_package.fields.cost_of_package_in_credits} Credits
                            </Button>
                             } 
                            </div>
                        </div>
                        :
                        <div>
                            <div>
                                Looks like, you need to purchase {this.props.available_package.fields.cost_of_package_in_credits-this.props.total_credits} Credits
                            </div>
                        <div style={{ textAlign:"left"}}>
                        {( this.props.isProgressOnPayButton)?
                            <Preloader loaderMessage="Payment in Progress... Don't Refresh"/>
                            :
                        button
                         } 
                        </div>
                        </div>
                        }
                    </div>
                </div>
            </Col>
        )
    }
}