import React, { Component } from "react";
import { connect } from "react-redux";

import { getPackageInfo, getPackageUserAccess } from "./action"
import CourseInfo from '../presentationalcomponents/CourseInfo'
import EventApplicationForm from '../../user_servicepage/presentationcomponents/EventApplicationForm'
import { insertUserApplication, getAllPackageValidityMappingForEvents } from "../../user_servicepage/conditionalcomponents/action";
import RequestsToJoin from '../../communitypage/presentationalcomponents/CommunityProfile/RequestsToJoin'

import CommonModal from '../../shared/CommonModal'
import { addToCart } from '../../paymentPage/conditionalComponents/action';


class CourseInfoController extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addToCartProgress: false
        };

        this.getPackageInfo = this.getPackageInfo.bind(this)
        this.getPackageUserAccess = this.getPackageUserAccess.bind(this)
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        this.getPackageInfo(this.props.match.params.validityId)
        this.getPackageUserAccess(this.props.match.params.validityId)
    }

    getPackageInfo(validityId) {
        this.props.dispatch(getPackageInfo(validityId));
    }

    getPackageUserAccess(validityId) {
        this.props.dispatch(getPackageUserAccess(validityId));
    }

    addToCart(credits, packageValidityMappingId) {
        // console.log({credits, packageValidityMappingId})
        this.setState({addToCartProgress: true})

        let returnPromise = this.props.dispatch(addToCart({
            amount: credits,
            product_id: packageValidityMappingId,
            product_type: "User_Package"
        }))

        returnPromise.then((data) => {
            this.getPackageUserAccess(this.props.match.params.validityId)
            this.setState({addToCartProgress: false})
        })
    }


    render() {
        console.log("CourseInfoController :: this.props :: ", this.props)

        return (
            <div>
                <CourseInfo
                    validityId={this.props.match.params.validityId}
                    courseInfo={this.props.courseInfo}
                    courseInfoAccess={this.props.courseInfoAccess}
                    userId={this.props.userId}
                    addToCart={this.addToCart}
                    addToCartProgress={this.state.addToCartProgress}
                />
            </div>
        )
    }

}

var mapStateToProps = store => {
    return {
        courseInfo: store.courseDataReducer.courseInfo,
        courseInfoAccess: store.courseDataReducer.courseInfoAccess,
        userId: (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
        cartItems : store.refierCartReducer.cartItems
    };
};

export default connect(mapStateToProps)(CourseInfoController);