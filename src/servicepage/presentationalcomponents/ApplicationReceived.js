import React,{Component} from "react";
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import { PrimaryButton } from "../../shared/RefierComponents/PrimaryButton";
import Preloader from '../../shared/Preloader/PreLoader'


class ApplicationReceived extends Component {
    render(){
        //console.log("ApplicationsReceived",this.props)
        let self = this
        let applicationId = this.props.applicationId
        return(
            <div style={{"margin":"5px 0px", "borderBottom":"1px solid #CCCCCC"}}>
                <div className="custom-list-content"
                    style={{"margin":"12px 0"
                    }}>
                    <Link to = {"/userDashboard/profile/" + this.props.application_id}>
                    {this.props.name}
                    </Link>
                    <br/>
                    <span className="custom-list-sub-content"
                        >{this.props.detailsText}</span>
                    {this.props.detailsText?<span  className="custom-list-sub-content">
                    <Link to = {"/userDashboard/profile/" + this.props.mentorId}>
                    {this.props.mentorName}
                    </Link></span>:null
                    }
                    <br/>
                    <span className="custom-list-sub-content"
                        >{ this.props.eventDate }  -  { this.props.eventTime }</span><br/>
                    <span className="custom-list-sub-content"
                       >{this.props.applicationMessage}</span>
                    <br/><br/>
                    {this.props.application.indexOf(this.props.applicationId)!=-1?
                        <Preloader/>
                        :
                        <PrimaryButton 
                            onButtonClick={() => self.props.onApprove(applicationId)}
                            buttonText="Approve"
                        />
                    } 
                </div>
            </div>
        );
    }
}

export default ApplicationReceived;
