import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Row, Col } from 'react-bootstrap'

import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'
import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'


export default class SessionCardForMarketPlace extends Component {
    render() {
        // console.log("SessionCardForMarketPlace:: ", this.props)

        let name = this.props.eventDetail['fields'].mentor_first_name ?
            (this.props.eventDetail['fields'].mentor_first_name + " ") +
            (this.props.eventDetail['fields'].mentor_last_name &&
            this.props.eventDetail['fields'].mentor_last_name != "Null" &&
            this.props.eventDetail['fields'].mentor_last_name != "None" ?
                this.props.eventDetail['fields'].mentor_last_name : " ")
            :
            null

        let topic = this.props.eventDetail['fields'].topic

        let date = this.props.eventDetail['fields'].start_date_time ?
            formatdatefunction(this.props.eventDetail['fields'].start_date_time, "long"):null
        let time = this.props.eventDetail['fields'].start_date_time ?
            formatdatefunction(this.props.eventDetail['fields'].start_date_time, "time"):null


        return (
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}
                className="vertical-align-col-components">
                <div className="custom-list-content">
                    <b>{topic}</b>
                </div>
                <div className="custom-list-sub-content-highlighted"
                    style={{ marginTop: '5px' }}>
                    By &nbsp;<b>{name}</b>
                </div>
                <div className="custom-list-sub-content" style={{marginTop: '5px'}}>
                    on &nbsp;{date} &nbsp;at &nbsp;{time}
                </div>
            </div>
        );
    }
}