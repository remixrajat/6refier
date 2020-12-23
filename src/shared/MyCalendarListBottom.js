import React from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';

import MyCalendarList from '../dashboardpage/presentationalcomponents/MyCalendarList'


class MyCalendarListBottomController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panelOpen: false,
            showUpcomingEventAlert: true,
        }
        this.getPanelState = this.getPanelState.bind(this)
        this.setPanelState = this.setPanelState.bind(this)
    }

    componentDidMount() {
        if(this.refs.calendar)
            this.props.dispatch({type: 'calendar', data: this.refs.calendar.getBoundingClientRect()})
    }

    getPanelState() {
        return this.state.panelOpen
    }

    setPanelState() {
        this.setState({panelOpen: !this.getPanelState()})
    }


    render() {
        console.log("MyCalendarListBottomController: Props", this.props, this.state);

        let eventsIn24Hours = this.props.eventsToday ? this.props.eventsToday["today"].length : 0;

        return (
            <div className={this.state.panelOpen ? 
                    "calendar-list-bottom-panel calendar-shadow-open" : 
                    "calendar-list-bottom-panel calendar-set-bottom-value calendar-shadow"
                }
                ref="calendar"
                style={
                    this.props.highlight === 'calendar' ? 
                    {zIndex: '10000'} : 
                    {}
                } >
                <div 
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                        this.setPanelState();
                        if(this.state.showUpcomingEventAlert)
                            setTimeout(() => this.setState({showUpcomingEventAlert: false}), 2000);
                    }}
                    className="calendar-list-bottom-header">
                    <h3 className="calendar-list-bottom-title">
                        {
                            eventsIn24Hours === 0 || !this.state.showUpcomingEventAlert ?
                                <FontAwesome
                                    name="calendar-check-o"
                                    style={{"marginRight": "5px"}}
                                    /> :
                                <span className="custom-nofication-alert" 
                                    style={{marginRight: "5px", position: 'relative', top: '-27px', right: '40px'}}>
                                    {eventsIn24Hours}
                                </span>
                        }
                        My Calendar</h3> 
                    <FontAwesome
                        className="calendar-list-bottom-up"
                        name={this.state.panelOpen ? "angle-up" : "angle-down"}
                    />
                </div>
                <Grid fluid className="calendar-list-bottom-list" style={this.state.panelOpen ? {} : {"height": "0"}}>
                    <MyCalendarList 
                        fromMyCalendar={true}
                        events={this.props.eventsToday}
                        userId={this.props.userId}
                        removeHighlight={this.state.panelOpen ? true : false} />
                </Grid>
            </div>
        );
    }
}

var mapStateToProps = (store) => {
    return {
        events: store.userServicePageReducer.upcomingEventData,
        eventsToday: store.userServicePageReducer.eventsToday,
        userId : (store.userProfileReducer.profileFields ? store.userProfileReducer.profileFields.pk : null),
        highlight: store.stylesDataReducer.highlight
    }
}

export default connect(mapStateToProps)(MyCalendarListBottomController);