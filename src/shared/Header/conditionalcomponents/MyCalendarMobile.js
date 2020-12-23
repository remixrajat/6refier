import React from 'react';
import { connect } from "react-redux";
import { OverlayTrigger, Popover, ListGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import MyCalendarList from '../../../dashboardpage/presentationalcomponents/MyCalendarList';
import CommonModal from '../../CommonModal'


class MyCalendarMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventsIn24Hours: 0,
            events: null,
            calendarModal: false
        }

        this.showCalendarModal = this.showCalendarModal.bind(this);
        this.closeCalendarModal = this.closeCalendarModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.eventsToday && nextProps.userId) {
            let eventsIn24Hours = nextProps.eventsToday["today"] ? 
                                    nextProps.eventsToday["today"].length : 0;
            
            let events = <MyCalendarList
                            fromMyCalendar={true}
                            events={nextProps.eventsToday}
                            userId={nextProps.userId} />
            
            this.setState({ eventsIn24Hours, events })
        }
    }

    showCalendarModal() {
        this.setState({ calendarModal: true })
    }

    closeCalendarModal() {
        this.setState({ calendarModal: false })
    }


    render() {

        return (
            <div title="Calendar" className="nav-button-container" onClick={() => this.showCalendarModal()}>
                <div className="refnavicon" >
                    <FontAwesome
                        name="calendar-check-o"
                        size='2x'
                        className="headerIcon"
                    />
                    {this.state.eventsIn24Hours === 0 ?
                        null :
                        <span className="custom-badge"
                            style={{
                                "position": "relative",
                                "top": "-10px",
                                "right": "10px"
                            }}
                        >{this.state.eventsIn24Hours}</span>
                    }
                </div>
                <div id="headerNav" style={this.state.eventsIn24Hours ? {marginLeft: '-7px'} : {}}>
                    <p>Calendar</p>
                </div>
                <CommonModal
                    showModal={this.state.calendarModal}
                    close={this.closeCalendarModal}
                    modalHeading="My Calendar"
                    modalBody={this.state.events}
                />
            </div>
        );
    }
}

var mapStateToProps = (store) => {
    return {
        eventsToday: store.userServicePageReducer.eventsToday,
        userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
        highlight: store.stylesDataReducer.highlight
    }
}

export default connect(mapStateToProps)(MyCalendarMobile);