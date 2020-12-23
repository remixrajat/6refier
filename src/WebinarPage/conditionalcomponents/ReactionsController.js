import React from 'react'
import reactCSS from 'reactcss'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
// import { FacebookCounter, FacebookSelector } from 'react-reactions'
import icons from './Reactions/helpers/icons'

import { addReactionToEvent, getReactionsEvent } from './action'
import ReactionsCounterController from './ReactionsCounterController'
import SocketConnection from '../SocketConnection';


class ReactionsController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counters: [],
            user: "",
            emoji: '🗿',
            visible: false,
        }

        this.CHATEVENT = "chatConversation";

        this.hideEmoji = _.debounce(() => {
            this.setState({ visible: false })
        }, 3000)

        this.setCounters = this.setCounters.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleEmojiChange = this.handleEmojiChange.bind(this);
        this.sendChatMessage = this.sendChatMessage.bind(this);

        if(this.props.token) {
            this.ws = SocketConnection.getConnectionInstance(this.props.token);
        }
    }

    componentDidMount() {
        this.props.dispatch(getReactionsEvent(this.props.event_details.event_id))
        if (this.props.webinarInstantReaction) {
            this.setCounters(this.props.webinarInstantReaction)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.webinarInstantReaction) {
            this.setCounters(nextProps.webinarInstantReaction)
        }
        else {
            if (nextProps.webinarInstantReaction &&
                nextProps.webinarInstantReaction.length != this.props.webinarInstantReaction.length) {
                this.setCounters(nextProps.webinarInstantReaction)
            }
        }
    }

    sendChatMessage(message) {
        // console.log("ChatBoxComponent::sendChatMessage", this.ws, message);
        this.ws.emit(this.CHATEVENT, message);
    }

    setCounters(reactionCounters) {
        if (reactionCounters && reactionCounters.length > 0) {
            let counters = []
            for (let i = 0; i < reactionCounters.length; i++) {
                counters.push({
                    emoji: reactionCounters[i].fields.reaction,
                    by: reactionCounters[i].fields.first_name,
                })
            }
            this.setState({ counters: counters })
        }
    }

    handleAdd() {
        this.setState({ showSelector: true })
    }

    handleSelect(emoji) {
        const index = _.findIndex(this.state.counters, { by: this.state.user })
        if (index > -1) {
            this.setState({
                counters: [
                    ...this.state.counters.slice(0, index),
                    { emoji, by: this.state.user },
                    ...this.state.counters.slice(index + 1),
                ],
            })
        } else {
            this.setState({
                counters: [...this.state.counters, { emoji, by: this.state.user }],
            })
        }

        this.handleEmojiChange(icons.find('facebook', emoji))

        let message = '';
        
        if(emoji === 'like') {
            message = this.props.profileFields.first_name + " likes what you said"
        } else if (emoji === 'wow') {
            message = this.props.profileFields.first_name + " is wowed"
        }

        if(message.trim() !== '') {
            let msg = {
                id: "chat",
                senderName: this.props.profileFields.first_name,
                profile_photo: this.props.profileFields.profile_photo,
                text: message,
                senderId: this.props.profileFields.pk,
                eventid: this.props.eventid
            }
    
            this.sendChatMessage(JSON.stringify(msg));
        }

        if (this.props.event_details && this.props.event_details.event_id) {
            this.props.dispatch(addReactionToEvent(this.props.event_details.event_id, emoji))
        }
    }

    handleEmojiChange(emoji) {
        this.setState({ emoji, visible: true })
        this.hideEmoji()
    }

    render() {
        // console.log("ReactionsController :: props :: ", this.props, this.state)

        const styles = reactCSS({
            'default': {
                popup: {
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '14px',
                    lineHeight: '35px',
                    background: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.1)',
                    borderRadius: '4px',
                    transform: 'translateY(10px)',
                    opacity: '0',
                    transition: 'all 100ms ease-out',
                },
                image: {
                    width: '40px',
                    height: '40px',
                    backgroundImage: `url(${this.state.emoji})`,
                    backgroundSize: '100%',
                    marginTop: '25%',
                },
            },
            'visible': {
                popup: {
                    opacity: '1',
                    transform: 'translateY(0)',
                },
            },
        }, { 'visible': this.state.visible })


        return (
            this.props.fromToolbar ?
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* <FacebookSelector onSelect={this.handleSelect} reactions={["like", "wow"]} /> */}
                    {
                        this.state.visible ?
                            <ReactionsCounterController
                                fromToolbar={this.props.fromToolbar}
                                counters={this.state.counters}
                                user={this.state.user} />
                            : null
                    }
                </div>
                :
                <div style={{ marginTop: '20px', height: '35vh' }}>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col sm={4} style={{ display: 'flex', justifyContent: 'center' }}>
                            <p
                                style={{ position: 'relative', top: '15px' }}
                                className="custom-list-title-content">
                                Select Any: </p>
                        </Col>
                        <Col sm={8}>
                            {/* <FacebookSelector onSelect={this.handleSelect} reactions={["like", "wow"]} /> */}
                        </Col>
                    </Row>

                    <div style={{ backgroundColor: "white", padding: "5px", width: '80%', margin: '0 auto' }}>
                        <ReactionsCounterController counters={this.state.counters} user={this.state.user} />
                    </div>

                    <div style={styles.popup}>
                        {this.state.emoji.length < 5 ? this.state.emoji : (
                            <div>
                                <div style={styles.image} />
                                <div></div>
                            </div>
                        )}
                    </div>
                </div>
        )
    }
}

var mapStateToProps = (store) => {
    return {
        webinarInstantReaction: store.webinarPageReducer.webinarInstantReaction,
        token: store.webinarPageReducer.token,
        profileFields: store.userProfileReducer.profileFields,
    }
}


export default connect(mapStateToProps)(ReactionsController);