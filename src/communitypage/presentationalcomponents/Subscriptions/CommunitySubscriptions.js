import React, { Component } from 'react'
import Subscription from './Subscription'
import PreviousSubscription from './PreviousSubscription'
import { Row, Col, Grid } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import Preloader from '../../../shared/Preloader/PreLoader'

export default class CommunitySubscriptions extends Component {

    render() {
        // console.log("CommunitySubscriptions::this.props", this.props)
        let communitySubscriptions
        let currentSubscriptions, previousSubscriptions
        if (this.props.communitySubscriptions) {
            communitySubscriptions = this.props.communitySubscriptions
            currentSubscriptions = []
            previousSubscriptions = []
            for (let i = 0; i < communitySubscriptions.length; i++) {
                if(communitySubscriptions[i].fields.is_current){
                    currentSubscriptions.push(
                        <div>
                             <Subscription communitySubscription={communitySubscriptions[i]}
                            userId={this.props.userId}
                            {...this.props}
                             />
                        </div>
                       )
                }
                else{
                    previousSubscriptions.push(
                        <PreviousSubscription communitySubscription={communitySubscriptions[i]}
                            userId={this.props.userId}
                            {...this.props} />)
                }
            }
        }

        // console.log("currentSubscriptions :: ", currentSubscriptions);
        let statusText = this.props.communityOwnershipStateValue ?
            "There are no current active Subscriptions. Please contact our administrator." : 
            "Looks like there is no learning path set for you."
        return (
            <Grid fluid>
                {this.props.communityBasicDataState && this.props.communityOwnershipStateValue?
                    <Col xs={12} className="refier_custom_light_panel_title"
                        style={{ textAlign: "left", marginTop:"20px" }}>
                        <span>
                            <FontAwesome
                                name="star-o"
                                
                            />
                        </span><span style={{ marginLeft: "20px" }}>
                            {"Current Subscriptions of " + this.props.communityBasicDataState[0].fields.entity_name}
                        </span>
                    </Col>
                    :
                    null
                }
                <div>
                    {currentSubscriptions ? currentSubscriptions.length == 0 ?
                        <span className="custom-list-content" style={{ marginLeft: "20px" }}>
                            {statusText}
                        </span>
                        :
                        currentSubscriptions
                        :
                        <div style={{textAlign:"left", marginTop:"20px", marginLeft: "40px" }}>
                                <Preloader/>
                            </div>}
                </div>
                <div style={{marginTop: "20px"}}>
                    {(this.props.communityBasicDataState && this.props.communityOwnershipStateValue
                        && previousSubscriptions && 
                        previousSubscriptions.length>0)?
                    <Col xs={12}  className="refier_custom_light_panel_title"
                        style={{ textAlign: "left", marginTop:"40px" }}>
                        <span>
                            <FontAwesome
                                name="star-o"
                                
                            />
                        </span><span style={{ marginLeft: "20px" }}>
                            {"Previous Subscriptions of " + this.props.communityBasicDataState[0].fields.entity_name}
                        </span>
                    </Col>
                    :
                    null
                }
                </div>
                <div>
                    {this.props.communityOwnershipStateValue ?
                        previousSubscriptions ? previousSubscriptions.length > 0 ?
                        previousSubscriptions:
                        null:
                            null :
                        null}
                </div>
            </Grid>
        )
    }
}