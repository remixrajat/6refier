import React, { Component } from 'react'
import { Col, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import Preloader from '../../Preloader/PreLoader'
import { ComplementaryButton } from '../../RefierComponents/ComplementaryButton';
import { MEDIA_URL_TEXT } from '../../../GlobalConstants';

import accessImg from '../../../images/mentor_dashboard_page/access_time.svg'
import discussionImg from '../../../images/mentor_dashboard_page/learning_room.svg'
import avatar from '../../Header/presentationalcomponents/img/avatardp.png'


export default class Packagevalidity extends Component{
    constructor(props) {
        super(props)
        this.state = {
            addedToCart : false
        }
        this.setAddedToCart = this.setAddedToCart.bind(this)
        this.unsetAddedToCart = this.unsetAddedToCart.bind(this)
    }

    setAddedToCart() {
        this.setState({ addedToCart: true })
    }

    unsetAddedToCart() {
        this.setState({addedToCart: false})
    }

    componentDidMount() {
        if (this.props.isInCart) {
            this.setAddedToCart()
        }
        else {
            this.unsetAddedToCart()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isInCart != nextProps.isInCart) {
            if (nextProps.isInCart) {
                this.setAddedToCart()
            }
            else{
                this.unsetAddedToCart()
            }
        }
    }

    render() {
        // console.log("Packagevalidity :: this.props ", this.props.isInCart)

        const { available_package } = this.props

        let isCommunityMember = available_package['fields']['is_user_community_member']
        let communityName = available_package['fields']['pkg_community_entity_name']
        let communityPic = available_package['fields']['pkg_community_profile_photo'] 
                                ? MEDIA_URL_TEXT + available_package['fields']['pkg_community_profile_photo'] 
                                : avatar
        let communityDesc = available_package['fields']['pkg_community_description']

        let buttonText = this.props.total_credits >= this.props.available_package.fields.cost_of_package_in_credits ?
                            <span>Buy {this.props.available_package.fields.cost_of_package_in_credits-this.props.total_credits} Credits</span> :
            <span>Add To Cart</span>
        
        let button

        if (this.state.addedToCart) {
            button = <div style={{ fontStyle: "oblique", fontSize: '1em' }} 
                        className="custom-list-sub-content-highlighted">
                        Added to Cart. Please check your cart.</div>
        } else {
            // button = <Button
            //     onClick={this.props.onClickToPaymentPage.bind(this, this.props.available_package.pk, this.props.available_package.fields.cost_of_package_in_credits - this.props.total_credits, this.props.product_type)}
            //     className='refier_custom_button_new_selected_2'>{buttonText}
            // </Button>
            button = <ComplementaryButton buttonText={buttonText} 
                onButtonClick={this.props.onClickToPaymentPage.bind(this, this.props.available_package.pk, this.props.available_package.fields.cost_of_package_in_credits - this.props.total_credits, this.props.product_type)}
            />
        }

        return(
            <div className="custom-test-package">
                <div className="main-list-header" style={{ margin: "10px 0 15px 0" }}>
                    <div className="display-card-description" 
                        style={{marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span>
                            <img alt="community_picture"
                                style={{height:"35px", width: '35px', objectFit: 'contain'}}
                                className="refnaviconimg"
                                src={communityDesc} />
                        </span>
                        <span style={{marginLeft: '20px'}}>
                            <div className="display-card-description dark-description">
                                <b>{communityName}</b>
                            </div>
                        </span>
                    </div>
                    <div className="display-card-description" 
                        style={{marginBottom: '10px', textTransform: 'none', fontSize: '15px'}}>
                        This video is a part of <b>"{communityName}"</b> community.
                        {!isCommunityMember 
                            ? "Please join the community to view the video and enable many more benefits!"
                            : null
                        }
                    </div>
                    <div className="display-card-description" 
                        style={{marginBottom: '30px', textTransform: 'none', fontWeight: '400'}}>
                        {communityDesc}
                    </div>
                </div>
                {isCommunityMember
                    ? <div className="refier-asset-price-container" style={{margin: '30px auto'}}>
                        <div className="refier-asset-price-text">
                            Price : 
                            <span style={{marginRight: '5px', marginLeft: '15px', fontSize: '20px'}} 
                                className="refier-asset-price-text-raleway">
                                <FontAwesome name='inr' />
                            </span>
                            <span className="refier-asset-price-text-raleway">
                                {this.props.available_package.fields.cost_of_package_in_credits}
                            </span>
                        </div>

                        {this.props.total_credits >= this.props.available_package.fields.cost_of_package_in_credits ?
                            <div>
                                {this.props.available_package.fields.cost_of_package_in_credits === 0
                                    ? null
                                    : <div className="custom-list-sub-content-highlighted" 
                                        style={{fontSize: '1em', marginBottom: '10px'}}>
                                        You already have available Refier Credits to purchase.&nbsp;
                                        Go ahead and pay through your available Refier Credits
                                    </div>
                                }
                                <div style={{ textAlign:"center"}}>
                                {this.props.isProgressOnPayButton ?
                                    <Preloader loaderMessage="Task in Progress...Don't Refresh"/>
                                    :
                                    this.props.available_package.fields.cost_of_package_in_credits === 0
                                        ? <ComplementaryButton buttonText={"Subscribe and Watch the Free Video"} 
                                            onButtonClick={this.props.onClickForPurchasingService.bind(this,this.props.available_package.pk,this.props.product_type)}
                                        />
                                        : <ComplementaryButton buttonText={"Pay " + this.props.available_package.fields.cost_of_package_in_credits + " Credits"} 
                                            onButtonClick={this.props.onClickForPurchasingService.bind(this,this.props.available_package.pk,this.props.product_type)}
                                        />
                                } 
                                </div>
                            </div>
                            :
                            <div>
                                <div style={{ textAlign:"center"}}>
                                    {this.props.isProgressOnPayButton ?
                                        <Preloader loaderMessage="Please Don't Refresh..." />
                                        : button
                                    } 
                                </div>
                            </div>
                        }
                    </div>

                    : <div className="refier-asset-price-container" style={{margin: '30px auto'}}>
                        <div className="custom-list-sub-content-highlighted"
                            style={{display: 'flex', flexDirection: 'column'}}>
                            <span style={{marginBottom: '10px', fontSize: '14px'}}>
                                You need to be a part of this community to view the video.
                            </span>
                            {this.props.isProgressOnPayButton
                                ? <Preloader loaderMessage="Task in Progress...Don't Refresh"/>
                                : <ComplementaryButton buttonText={"Join this Community"} 
                                        onButtonClick={() => this.props.joinCommunity(this.props.available_package.fields.pkg_community_id)}
                                    />
                            } 
                        </div>
                    </div>
                }
                <div className="main-list-header" style={{ margin: "10px 0 15px 0" }}>
                    Other Perks Include:
                </div>
                <div className="refier-badges-wrapper-row" style={{marginBottom: '20px'}}>
                    <div className="refier-badges-wrapper-element">
                        <div className="refier-badge-container" style={{marginBottom: "15px"}}>
                            <img src={accessImg} className="refier-badge" />
                        </div>
                        <div className="refier-badge-text">
                            {this.props.available_package.fields.validity} Days full access
                        </div>
                    </div>
                    <div className="refier-badges-wrapper-element">
                        <div className="refier-badge-container" style={{marginBottom: "15px"}}>
                            <img src={discussionImg} className="refier-badge" />
                        </div>
                        <div className="refier-badge-text">Community Access with Discussion Rooms</div>
                    </div>
                </div>
                {/* <div>{this.props.available_package.fields.validity} Days full access</div> */}
            </div>
        )
    }
}