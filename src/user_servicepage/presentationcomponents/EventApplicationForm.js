import React,{Component} from 'react';
import {Button} from 'react-bootstrap'

import Preloader from '../../shared/Preloader/PreLoader'
import { PrimaryButton } from '../../shared/RefierComponents/PrimaryButton';


export default class EventApplicationForm extends Component{
    render(){
        return(
            <div>
                <textarea type = "text" value = {this.props.appTextStatus} 
                            onChange={this.props.onChange} 
                            style={{"padding":"5px","marginTop":"10px", borderColor:"#f2f2f2"}} 
                            className="refier_text_on_light__3"/>
                { this.props.inProgress == 0?
                    <Preloader style={{"margin":"10px 0px"}}/>
                    :
                    this.props.inProgress == 1?
                        <div style={{"padding":"5px","marginTop":"10px"}} 
                            className="refier_text_on_light__3">
                            Application Sent
                        </div>
                        :
                        <PrimaryButton
                            onButtonClick={this.props.submitApplicationText}
                            buttonText="Submit Request"
                        />
                }
            </div>
        )
    }
}