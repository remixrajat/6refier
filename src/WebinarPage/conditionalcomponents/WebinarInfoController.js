import React, { Component } from "react";
import { connect } from "react-redux";

import { getEventInfo, getEventInfoAccess } from "./action"

import WebinarInfo from "../presentationalcomponents/WebinarInfo"
import EventApplicationForm from '../../user_servicepage/presentationcomponents/EventApplicationForm'
import { insertUserApplication, getAllPackageValidityMappingForEvents } from "../../user_servicepage/conditionalcomponents/action";
import RequestsToJoin from '../../communitypage/presentationalcomponents/CommunityProfile/RequestsToJoin'

import CommonModal from '../../shared/CommonModal'
import { addToCart } from '../../paymentPage/conditionalComponents/action';


class WebinarInfoController extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            showRequestToJoinModal: false,
            appTextStatus: "Hi, I am interested for this event !",
            eventId: "",
            inProgress: -1,
            communityBasicDataState: null,
            addToCartProgress: false
        };

        this.openApplyModal = this.openApplyModal.bind(this)
        this.closeApplyModal = this.closeApplyModal.bind(this)
        this.changeApplicationText = this.changeApplicationText.bind(this)
        this.submitApplicationText = this.submitApplicationText.bind(this)
        this.setInProgress = this.setInProgress.bind(this)
        this.unsetInProgress = this.unsetInProgress.bind(this)
        this.completedProgress = this.completedProgress.bind(this)

        this.getEventInfo = this.getEventInfo.bind(this)
        this.getEventInfoAccess = this.getEventInfoAccess.bind(this)


        this.closeRequestToJoinModal = this.closeRequestToJoinModal.bind(this);
        this.openRequestToJoin = this.openRequestToJoin.bind(this)
        this.addSessionToCart = this.addSessionToCart.bind(this);

    }

    componentDidMount() {
        this.getEventInfo(this.props.match.params.eventId)
        this.getEventInfoAccess(this.props.match.params.eventId)
    }

    getEventInfo(event_id) {
        this.props.dispatch(getEventInfo(event_id));
        this.props.dispatch(getAllPackageValidityMappingForEvents());
    }

    getEventInfoAccess(event_id) {
        this.props.dispatch(getEventInfoAccess(event_id));
    }

    openApplyModal(eventId) {
        this.setState({
            eventId,
            showModal: true
        })
    }

    closeApplyModal() {
        this.setState({ showModal: false })
    }

    closeRequestToJoinModal() {
        this.setState({ showRequestToJoinModal: false })
        this.getEventInfoAccess(this.props.match.params.eventId)
    }

    openRequestToJoin(communityData) {
        this.setState({ showRequestToJoinModal: true, communityBasicDataState: communityData })
    }

    changeApplicationText(e) {
        this.setState({ appTextStatus: e.target.value })
    }

    submitApplicationText() {
        this.setInProgress()
        let applicationText = this.state.appTextStatus;
        // console.log("Sending Request", this.state.eventId, applicationText)
        let returnPromise = this.props.dispatch(insertUserApplication(this.state.eventId, applicationText))
        returnPromise.then((response) => {
            // let eventData = setEventDataStateUser(data);
            this.completedProgress()
            this.props.dispatch({ type: "setUpcomingEvent", data: response });
            this.closeApplyModal()
        })
    }

    setInProgress() {
        this.setState({ inProgress: 0 })
    }

    unsetInProgress() {
        this.setState({ inProgress: -1 })
    }

    completedProgress() {
        this.setState({ inProgress: 1 })
    }

    addSessionToCart(credits, packageValidityMappingId) {
        this.setState({addToCartProgress: true})

        let returnPromise = this.props.dispatch(addToCart({
            amount: credits,
            product_id: packageValidityMappingId,
            product_type: "EVENT_ACTIVITY"
        }))

        returnPromise.then((data) => {
            this.setState({addToCartProgress: false})
        })
    }


    render() {
        // console.log("WebinarInfoController :: this.props :: ", this.props)

        let cartItemsValidityIds = [];

        if(this.props.cartItems) {
            for(let item of this.props.cartItems) {
                cartItemsValidityIds.push(item['fields']['productValidityId'])
            }
        }

        let modalBodyState = <EventApplicationForm
            onChange={this.changeApplicationText}
            appTextStatus={this.state.appTextStatus}
            submitApplicationText={this.submitApplicationText}
            inProgress={this.state.inProgress} />

        let credits, is_purchased;
        
        return (
            <div>
                <WebinarInfo
                    eventInfo={this.props.eventInfo}
                    eventId={this.props.match.params.eventId}
                    eventInfoAccess={this.props.eventInfoAccess}
                    userId={this.props.userId}
                    inProgress={this.state.inProgress}
                    openApplyModal={this.openApplyModal}
                    openRequestToJoin={this.openRequestToJoin}
                    packageValiditymappingForEvents={this.props.packageValiditymappingForEvents}
                    addSessionToCart={this.addSessionToCart}
                    cartItemsValidityIds={cartItemsValidityIds}
                    addToCartProgress={this.state.addToCartProgress}
                />
                <CommonModal
                    showModal={this.state.showModal}
                    close={this.closeApplyModal}
                    modalHeading={"Apply for an Event or Session"}
                    modalBody={modalBodyState} />
                <RequestsToJoin
                    {...this.props}
                    close={this.closeRequestToJoinModal}
                    showModal={this.state.showRequestToJoinModal}
                    communityBasicDataState={this.state.communityBasicDataState} />
            </div>
        )
    }

}
var mapStateToProps = store => {
    return {
        eventInfo: store.webinarPageReducer.webinarInfo,
        eventInfoAccess: store.webinarPageReducer.webinarInfoAccess,
        userId: (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
        packageValiditymappingForEvents: store.userServicePageReducer.packageValiditymappingForEvents,
        communityDetails: store.appDataReducer.communityListState,
        cartItems : store.refierCartReducer.cartItems
    };
};

export default connect(mapStateToProps)(WebinarInfoController);