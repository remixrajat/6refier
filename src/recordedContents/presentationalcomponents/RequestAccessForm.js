import React, { Component } from "react";
import { Media, Col, Button } from "react-bootstrap";
import FontAwesome from 'react-fontawesome';

import avatar from '../../shared/Header/presentationalcomponents/img/avatardp.png'
import CommonModal from '../../shared/CommonModal';


class RequestAccessFormModal extends Component{
    constructor(props){
        super(props);
        this.render_access_form = this.render_access_form.bind(this);
    }

    render_access_form() {
        let request_form = (<div> 
            {!this.props.isSingleVid ?
                <div>
                    <div className="main-list-header" style={{ margin: "10px 10px 0 10px" }}>
                        What you will Learn!
                    </div>
                    <div style={{margin: '5px 10px 0 10px', textAlign: 'center'}} 
                        className="request-form-modal-description">
                        {this.props.contentDescription}
                    </div>
                </div>
                : null
            }
            
            <div style={this.props.isSingleVid 
                            ? {margin: "0 10px 0 10px"}
                            : {margin: "25px 10px 0 10px"}}>
                {this.props.purchase_packages}
            </div> 

            {this.props.expertDetails ? 
                <div>
                    <div className="main-list-header" style={{ margin: "10px" }}>
                        About the Expert
                    </div>
                    <div style={{margin: '10px', display: 'flex', flexWrap: 'wrap'}}>
                        <div style={{flex: '0.3', textAlign: 'center'}}>
                            <img className="avatar-display" 
                                src={this.props.expertDetails.user_id && this.props.expertDetails.user_id.profile_photo 
                                    && this.props.expertDetails.user_id.profile_photo.trim() !== ''
                                ? this.props.expertDetails.user_id.profile_photo 
                                : avatar} />
                        </div>
                        <div style={{flex: '0.7'}} className="request-form-modal-description">
                            <div style={{marginBottom: '10px'}}>
                                {this.props.expertDetails.user_id.first_name}&nbsp;{this.props.expertDetails.user_id.last_name}
                            </div>
                            <div style={{marginBottom: '10px'}}>
                                <b>Over {this.props.expertDetails.experience} years</b> experience
                            </div>
                            {this.props.expertDetails.trainings_undertaken > 0 ?
                                <div style={{marginBottom: '10px'}}>
                                    <b>over {this.props.expertDetails.trainings_undertaken} trainings</b> done
                                </div> 
                                : null
                            }
                        </div>
                    </div>
                </div>
                : null
            }
            
        </div> );
        
        return request_form;
    }

    render() {
        return (
            <CommonModal close={this.props.onClose}
                showModal={this.props.showModal}
                dialogClassName="request-form-modal"
                modalHeading={this.props.contentHeading}
                modalBody={this.render_access_form()} modalSize={"large"} />
        )
    }
}

export default RequestAccessFormModal;