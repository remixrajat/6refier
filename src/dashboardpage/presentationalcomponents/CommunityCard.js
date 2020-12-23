import React, { Component } from 'react';
//import CommunityImg from '../../images/mentor_dashboard_page/community_placeholder-3_u237.png';
import CommunityImg from '../../images/mentor_dashboard_page/community_avatar.png';
import { Image } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import {URL_TEXT, MEDIA_URL_TEXT} from '../../GlobalConstants'


export default class CommunityCard extends Component {
    render() {
        return (
            <div
             className='generic-post-card-dark' 
                style={{"textAlign" : "center","margin":"0px 10px", "height":"160px"}} 
                       >
                <div style={{"padding":"0px 0px"}}>
                <Image responsive 
                src={this.props.communityDetails.fields.profile_photo? MEDIA_URL_TEXT+
                            this.props.communityDetails.fields.profile_photo:CommunityImg}
                 style={{"display":"inline", "height":"100%","width":"100%",
                            /* "border":"1px solid #b5a2d7" */
                            }}  />

                <div className="generic-post-card-bottom-text"
                        style={{backgroundColor:"#049cdb"}}>   
                      
                <h4 
                    className="refier_text_on_light__carousel_card_text_title_light"
                    style={{ "marginTop":"10px","marginBottom":"20px",
                        "padding": "0px 10px", "textAlign": "left" }}>
                    {this.props.communityDetails.fields.entity_name}</h4>
                    </div>
                 </div>
                 <div className="generic-post-card-top-right">
                 <FontAwesome
							name="star-o"
							
							style={{ "color": "8657DB", "fontSize": "16px" }}
						/>
                </div>
            </div>
        );
    }
}