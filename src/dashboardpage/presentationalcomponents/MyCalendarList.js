import React, { Component } from 'react';

import MyCalendarEventCardForList from './MyCalendarEventCardForList';
import Preloader from '../../shared/Preloader/PreLoader'


export default class MyCalendarList extends Component {

    render() {
        console.log("MyCalendarList::Props", this.props)

        let key = ["My Sessions", "Upcoming Sessions"]
        let eventList;

        if (this.props.fromMyCalendar) {
            if (!this.props.events) {
                return null;
            }
            eventList = []
            let key = ["today", "tomorrow", "dayAfter"]

            for (let j = 0; j < key.length; j++) {
                let eventDate = key[j] === "dayAfter" ? "Day After Tomorrow" : key[j]

                eventList.push(
                    <div className="custom-list-content"
                        style={{ marginTop: '20px', marginBottom: '10px', fontFamily: "Raleway" }}>
                        {eventDate.charAt(0).toUpperCase() + eventDate.slice(1)}
                    </div>
                )

                if (this.props.events[key[j]] && this.props.events[key[j]].length > 0) {
                    // console.log("MyCalendarList:this.props.events[key[j]]", key[j], this.props.events[key[j]])

                    for (let i = 0; i < this.props.events[key[j]].length; i++) {
                        if (this.props.events[key[j]][i].fields.session_id) {
                            // console.log("MyCalendarEventCardForList : here2", this.props.events[key[j]][i], this.props.userId);
                            // if (this.props.events[key[j]][i].fields.session_id.mentor_id.id === this.props.userId) {
                            // console.log("MyCalendarEventCardForList : here3");
                            eventList.push(<MyCalendarEventCardForList
                                index={i}
                                fromMyCalendar={true}
                                isToday={key[j] === 'today'}
                                key={i + "_" + j}
                                removeHighlight={this.props.removeHighlight}
                                eventDetail={this.props.events[key[j]][i].fields.session_id}
                                profileId={this.props.userId}
                                session_id={this.props.events[key[j]][i].fields.session_id.session_id} />)
                            // }
                            // else {

                            // }
                        } else {
                            // console.log("MyCalendarEventCardForList : here4");
                            eventList.push(
                                <MyCalendarEventCardForList
                                    index={i}
                                    fromMyCalendar={true}
                                    isToday={key[j] === 'today'}
                                    key={i + "_" + j}
                                    removeHighlight={this.props.removeHighlight}
                                    eventDetail={this.props.events[key[j]][i].fields}
                                    profileId={this.props.userId}
                                    session_id={this.props.events[key[j]][i].pk} />
                            );
                        }
                    }
                }
                if (eventList.length === 0) {
                    eventList.push(
                        <div className="custom-list-sub-content" style={{ margin: "20px auto" }}>
                            No upcoming sessions
                                </div>
                    )
                }

                eventList.push(
                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.1" }}></div>
                )
            }

        }
        else if (this.props.events) {
            eventList = []
            for (let j = 0; j < key.length; j++) {
                if (this.props.events[key[j]]) {
                    //console.log("MyCalendarList:this.props.events[key[j]]", this.props.events[key[j]])
                    for (let i = 0; i < this.props.events[key[j]].length; i++) {
                        if (this.props.events[key[j]][i].fields.session_id) {
                            if (this.props.events[key[j]][i].fields.session_id.mentor_id.id !=
                                this.props.userId) {
                                eventList.push(<MyCalendarEventCardForList
                                    index={i}
                                    key={i}
                                    removeHighlight={this.props.removeHighlight}
                                    eventDetail={this.props.events[key[j]][i].fields.session_id}
                                    profileId={this.props.userId}
                                    session_id={this.props.events[key[j]][i].fields.session_id.session_id} />)
                            }
                        }
                        else {
                            eventList.push(<MyCalendarEventCardForList
                                index={i}
                                key={i}
                                removeHighlight={this.props.removeHighlight}
                                eventDetail={this.props.events[key[j]][i].fields}
                                profileId={this.props.userId}
                                session_id={this.props.events[key[j]][i].pk} />)
                        }
                    }
                }
            }
        }

        return (
            <div style={{ backgroundColor: "white" }}>
                {!eventList ?
                    <div style={{ "textAlign": "center", marginTop: "30px" }}>
                        <Preloader copies={5} placeholder="short_card" shimmer={true} />
                    </div>
                    :
                    eventList.length == 0 ?
                        <div className="custom-list-content" style={{ marginTop: 20 }}>
                            No upcoming sessions
                        </div>
                        :
                        <div>
                            {eventList}
                        </div>}
            </div>
        )

    }
}
