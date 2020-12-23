import React, {Component} from 'react'
import {Col, Button} from 'react-bootstrap'
import Preloader from '../../shared/Preloader/PreLoader'

export default class TestPackage extends Component{
    render(){
        let buttonText = this.props.total_credits >= this.props.available_package.fields.cost_of_package_in_credits ?
                            <span>Buy {this.props.available_package.fields.cost_of_package_in_credits-this.props.total_credits} Credits</span> :
                            <span>Add To Cart</span>

        return(
            <Col xs={12} sm={5} md={3}
                style={{display: "inline-block", textAlign:"left" }}>
                <div className="custom-border custom-test-package">
                    <div>Validity - {this.props.available_package.fields.validity} Days</div>
                    <div style={{ marginTop: "10px" }}
                    >Cost - {this.props.available_package.fields.cost_of_package_in_credits} Credits</div>
                    <div style={{ marginTop: "10px" }}
                    >Your Credits - {this.props.total_credits}</div>
                    <div style={{ marginTop: "20px" }}>
                        {this.props.total_credits>=this.props.available_package.fields.cost_of_package_in_credits?
                        <div>
                            <div>
                                Go ahead and Pay through your available Credits
                            </div>
                            <div style={{ textAlign:"center"}}>
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
                        <div style={{ textAlign:"center"}}>
                        {( this.props.isProgressOnPayButton)?
                            <Preloader loaderMessage="Payment in Progress... Don't Refresh"/>
                            :
                        <Button  style={{ marginTop: "10px",  }}
                        onClick={this.props.onClickToPaymentPage.bind(this,this.props.available_package.pk,this.props.available_package.fields.cost_of_package_in_credits-this.props.total_credits)}
                            className='refier_custom_button_dark'>{ buttonText }
                        </Button>
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