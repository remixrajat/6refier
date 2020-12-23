import React,{Component} from 'react';
import MentorImg from '../../images/mentor_dashboard_page/avatardp.png';
import { Image } from 'react-bootstrap'
import {URL_TEXT, MEDIA_URL_TEXT} from '../../GlobalConstants'


export default class MentorCard extends Component{
    render(){
        //console.log("Mentor Details : ", this.props.mentorDetails.fields)
        let name=""
        if(this.props.mentorDetails.fields.last_name && 
            this.props.mentorDetails.fields.last_name!="Null" &&
            this.props.mentorDetails.fields.last_name!="None"){
            name = this.props.mentorDetails.fields.first_name + " " + 
                this.props.mentorDetails.fields.last_name
        }
        else{
            name = this.props.mentorDetails.fields.first_name
        }
        return(
            <div
             className='generic-post-card-dark' 
                style={{"textAlign" : "center","margin":"0px 10px", "height":"160px"}} 
                       >
                <div style={{"padding":"0px 0px"}}>
                <Image responsive 
                src={this.props.mentorDetails.fields.profile_photo? MEDIA_URL_TEXT+
                            this.props.mentorDetails.fields.profile_photo:MentorImg}
                 style={{"display":"inline", "height":"100%","width":"100%",
                            /*"border":"1px solid #b5a2d7"*/
                            }}  /> 
                    {/* <Image src= {MentorImg} style={{"display":"inline"}} 
                    thumbnail responsive/> */}
                    </div>
                <div className="generic-post-card-bottom-text"
                        style={{backgroundColor:"#049cdb"}}>  
                <h4 className="refier_text_on_light__carousel_card_text_title_light" 
                style={{ "marginTop":"10px","marginBottom":"20px",
                        "padding": "0px 10px", "textAlign": "left" }}>
                    {name}</h4>
                {/* <p className="refier_text_on_light__carousel_card_text_desc">{this.props.mentorDetails.fields.userstatus}</p> */}
                    </div>
                </div>

        );
    }
}
