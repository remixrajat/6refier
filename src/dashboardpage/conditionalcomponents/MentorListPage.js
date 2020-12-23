import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";

import { setDashboardMentorDetails } from './action';
import MentorDetailedCard from "../presentationalcomponents/MentorDetailedCard";

class MentorListPage extends Component {
    componentDidMount() {
        this.props.dispatch(setDashboardMentorDetails());
    }

    renderList(item, i) {
        return <MentorDetailedCard key={i} data={item} />;
    }

    render() {
        // //console.log("mentor details from mentor list page", this.props.mentorDetails);
        return(
            <Grid fluid>
                <Row className="show-grid">
                    <Col smOffset={3} mdOffset={2} sm={9} md={9}>
                        { this.props.mentorDetails ? this.props.mentorDetails.map(this.renderList) : <h3>Loading</h3> }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

// const mapStateToProps = (store) => {
//     return {mentorDetails : store.dashboardDataReducer.mentorList};
// }

var mapStateToProps = (store) => {
    return {mentorDetails : store.dashboardDataReducer.mentorDetails};
}

export default connect(mapStateToProps)(MentorListPage);
