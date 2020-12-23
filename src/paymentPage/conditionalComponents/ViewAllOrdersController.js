import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import OrderList from '../presentationcomponents/OrderList'

import { getTransactionHistory } from '../../shared/TextDisplayPanels/conditionalcomponents/action'


class ViewAllOrdersController extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
		  this.props.dispatch(getTransactionHistory())
    }


    render() {
        console.log("ViewAllOrdersController:: props", this.props)

        let userCredits = 0

        if(this.props.credits) {
            userCredits = this.props.credits[0]['fields'].total_credits
        }

        return (
            <div style={{background: 'white', minHeight: '100vh', marginTop: '-80px'}}>
                <Grid fluid style={{paddingTop: '100px'}}>
                    <Col sm={10} md={8} mdOffset={2} smOffset={1} style={{marginBottom: '50px'}}>
                        <div className="custom-list-title-content" style={{marginBottom: '50px'}}>
                            <span>Your Available Credits:</span>&nbsp;&nbsp;
                            <span>{userCredits}</span>
                        </div>
                        <OrderList transactionList={this.props.myTransactionHistory} />
                    </Col>
                </Grid>
            </div>
        );
    }
}


let mapStateToProps = (store) => {
    return {
        credits: store.userProfileReducer.credits,
        myTransactionHistory: store.appDataReducer.myTransactionHistory,
    }
}

export default connect(mapStateToProps)(ViewAllOrdersController)