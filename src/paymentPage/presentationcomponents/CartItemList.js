import React, { Component } from 'react';
import { ListGroupItem, Media } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


export default class CartItemList extends Component {
    render() {
        // console.log("CartItemList :: ", this.props)

        let _this = this;

        return (
            <div style={{margin:'5px'}}>
                <ListGroupItem style={{border: '1px solid rgba(0,0,0,0.05)'}}>
                    <Media>
                        <Media.Left>
                        {this.props.product.product_type === "EVENT_ACTIVITY" ?
                            <FontAwesome 
                                name='laptop'
                                className={"custom-color-" + (this.props.index % 4)}
                                style={{fontSize:' 5rem', marginRight: '20px'}}
                            /> 
                            : <FontAwesome 
                                name='trophy'
                                style={{fontSize:' 5rem', marginRight: '20px', color:"#797979"}}
                            />
                        }
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading className="custom-list-title-content">
                                {this.props.product.productName}
                            </Media.Heading>
                            <div className="custom-list-sub-content" style={{marginTop:"10px"}}>
                                {this.props.product.productDescription}
                            </div>
                            <div style={{
                                fontSize: '1.2em', fontWeight: '500',
                                color: '#797979',marginTop:"10px"
                            }}>₹&nbsp;<b>{this.props.product.cost}</b></div>
                        </Media.Body>
                        <Media.Right>
                            <FontAwesome 
                                name='trash'
                                    style={{
                                        fontSize: ' 2rem', position: 'absolute', right: '10px',
                                        cursor: 'pointer',  color:"#797979"
                                    }}
                                title="Remove from cart"
                                onClick={()=>{_this.props.removeFromCart(_this.props.cartId)}}
                            />
                        </Media.Right>
                    </Media>
                </ListGroupItem>
            </div>
        )
    }

}

