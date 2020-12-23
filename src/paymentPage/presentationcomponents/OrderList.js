import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Grid, Row, Col } from 'react-bootstrap';

import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import { MEDIA_URL_TEXT } from '../../GlobalConstants'


export default class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.transactionListing = this.transactionListing.bind(this)
    }

    transactionListing(transactions) {
        if(transactions === undefined 
          || transactions && transactions.length === 0)
          return (
            <div className="custom-list-content">
              <span>No Transactions Yet</span>
              <span style={{marginLeft: "30px"}} className="btn refier_custom_button_save">
                <a href="/marketplace/" style={{color: 'white'}}>
                  Click Here To Explore More Offerings
                </a>
              </span>
            </div>
          )
          
        let transactionList = []
        let index = 0;
    
        for(let transaction of transactions) {
          const info = transaction['fields'] 
          const productDetails = info['product_details']
          let productDetailsList = []

          for(let product of productDetails) {
            const session = product['fields']['session_id']
            let sessionUrl = '/userDashboard/webinarinfo/' + session['session_id']
            let sessionTopic = session['topic']
            let mentorFirstName = session['mentor_id']['first_name']

            let productDetail = (
                <Col xs={12} key={product.pk} 
                  style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                    <Col xs={3} sm={4} md={3}>
                        <FontAwesome className={"custom-color-" + (index++ % 4)}
                          style={{fontSize: '56px'}} name="laptop" />
                    </Col>
                    <Col xs={9} sm={8} md={9}>
                        <div className="custom-list-content">
                            {sessionTopic} by {mentorFirstName}
                        </div>
                        <Link to={sessionUrl}>
                            <span className="custom-list-sub-content">
                                Click for more info
                            </span>
                        </Link>
                    </Col>
                </Col>
            )

            productDetailsList.push(productDetail)
          }
    
          transactionList.push (
            <Grid fluid key={transaction.pk} 
              style={{marginBottom: '20px', border: '1px solid rgba(0, 0, 0, 0.1)', 
                      borderRadius: '3px', padding: '0px'}}>
              <Col sm={12} xsHidden className="custom-list-title-content" 
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '10px', background: 'rgba(0, 0, 0, 0.1)'}}>
                <span>Order ID: <b>{transaction.pk}</b></span>
                <span style={{width: '25px'}}></span>
                <span><span className="custom-list-content-dark">Status:&nbsp;&nbsp;</span>
                      <span><b>{info.transaction_status.charAt(0).toUpperCase() 
                                      + info.transaction_status.slice(1)}</b></span>
                </span>
              </Col>
              <Col xs={12} smHidden mdHidden lgHidden className="custom-list-title-content" 
                style={{padding: '10px', background: 'rgba(0, 0, 0, 0.1)'}}>
                <span>Order ID: <b>{transaction.pk}</b></span>
              </Col>
              <Col xs={12} smHidden mdHidden lgHidden style={{marginTop: '20px'}}
                className="custom-list-title-content"> 
                <span><span className="custom-list-content-dark">Status:&nbsp;&nbsp;</span>
                      <span><b>{info.transaction_status.charAt(0).toUpperCase() 
                                      + info.transaction_status.slice(1)}</b></span>
                </span>
              </Col>
              <Col xs={12} sm={6} className="custom-list-content" 
                style={{display: 'flex', flexDirection: 'column', padding: '20px'}}>
                <span>Paid: <b>&#8377; {info.amount/100}</b></span>
                {/* <span>Order ID: <b>{transaction.pk}</b></span> */}
                <span>On: <b>{formatdatefunction(info.transaction_time, 'long')}</b></span>
                <span>Through: {info.service_provider}</span>
                <span style={{marginTop: '5px'}} className="custom-list-sub-content">
                  * Invoice will be generated in 24 - 48 hours
                </span>
              </Col>
              <Col xs={12} sm={6} className="custom-list-content" style={{padding: '20px'}}>
                  {productDetailsList}
              </Col>
            </Grid>
          )  
        }
    
        return transactionList;
    }


    render() {
        // console.log("OrderList:: ", this.props)

        return (
            <div>
                { this.transactionListing(this.props.transactionList) }
            </div>
        )
    }
}
