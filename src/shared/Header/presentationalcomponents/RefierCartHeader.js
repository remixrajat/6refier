import React, { Component } from 'react';
import 'redux'
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';


export default class RefierCartHeader extends Component {
    render() {
        return (
            <Link to="/userDashboard/viewcart">    
                <div title="Cart" className={this.props.highlightCart ? 
                    "nav-button-container" : "nav-button-container"}
                    style={this.props.highlightCart ? 
                        {background: 'rgba(219, 67, 4, 0.05)', border: '1px solid rgba(219, 67, 4, 0.08)'}
                        : {}
                    }>
                    <div className="refnavicon">
                        <FontAwesome
                            name="shopping-cart"
                            className="headerIcon"
                        />
                        {this.props.numberOfCartItems !== 0 ?
                            <span className={this.props.highlightCart ? "blinking-cart custom-badge" : "custom-badge"}
                                style={{
                                    "position": "relative",
                                    "top": "-12px",
                                    "right": "10px",
                                    "backgroundColor": "#03a9f4"
                                }}>
                                <span style={{ "fontSize": "10px", "textAlign": "center" }}>
                                    { this.props.numberOfCartItems }
                                </span>
                            </span>
                            : null
                        }
                    </div>
                    <div id="headerNav" style={this.props.numberOfCartItems !== 0 ?
                        { "display": "flex", "alignItems": "center", "marginLeft": "-7px" } :
                        { "display": "flex", "alignItems": "center" }}>
                        <p>Cart</p>
                    </div>
                </div>
            </Link>
        )
    }

}