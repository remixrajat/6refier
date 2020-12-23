import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";

import { setDashboardCommunityDetails } from './action';
import CommunityDetailedCard from "../presentationalcomponents/CommunityDetailedCard";

class CommunityListPage extends Component {
    componentDidMount() {
        this.props.dispatch(setDashboardCommunityDetails());
    }

    renderList(item, i) {
        return <CommunityDetailedCard key={i} data={item} />;
    }

    render() {
        return(
            <Grid fluid>
                <Row className="show-grid">
                    <Col smOffset={3} mdOffset={2} sm={9} md={9}>
                        { this.props.communityDetails ? this.props.communityDetails.map(this.renderList) : <h3>Loading</h3> }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

// const mapStateToProps = (store) => {
//     //console.log("store map commy", store);
//     return {communityDetails : store.dashboardDataReducer.communityList};
// }

var mapStateToProps = (store) => {
    //console.log(store);
    return {communityDetails : store.appDataReducer.communityListState};
}

export default connect(mapStateToProps)(CommunityListPage);
