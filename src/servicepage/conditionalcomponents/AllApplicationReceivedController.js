import React, { Component } from "react";
import { Col } from "react-bootstrap";
import ApplicationReceivedController from "./ApplicationReceivedController"

import PreLoader from "../../shared/Preloader/PreLoader"

export default class AllApplicationReceivedController extends Component {
    render() {
        if (typeof this.props.data === "undefined") {
            return <div>Loading</div>;
        }

        let membersApplied
        if (this.props.data != null) {
            membersApplied = []
            for (let i = 0; i < this.props.data.length; i++) {
                if (this.props.applicationsApproved.indexOf(this.props.data[i].fields.applicant_id.id) == -1) 
                {
                    membersApplied.push(
                        <ApplicationReceivedController
                            key={i}
                            application={this.props.application}
                            data={this.props.data[i]}
                            onApprove={this.props.onApprove} />
                    )
                }
            }
        }

        return (
            <div>
                {!membersApplied ?
                    <Col style={{ "textAlign": "center" }}>
                        <div style={{ "margin": "50px 20px" }}>
                            <PreLoader />
                        </div>
                    </Col>
                    :
                    membersApplied.length > 0 ?
                        membersApplied :
                        <Col>
                            <div className="custom-list-sub-content"
                                style={{ "textAlign": "center" }}> No Applications Received </div>
                        </Col>
                }
            </div>
        );
    }
}
