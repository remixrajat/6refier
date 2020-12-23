import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import './StreamComponent.css';
import OvVideoComponent from './OvVideo';


export default class StreamComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { nickname: this.props.user.getNickname(), showForm: false, mutedSound: false, isFormValid: true };
        this.handleChange = this.handleChange.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
        this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
        this.toggleSound = this.toggleSound.bind(this);
        this.handleSubmitName = this.handleSubmitName.bind(this);
    }

    handleChange(event) {
        this.setState({ nickname: event.target.value });
        event.preventDefault();
    }

    toggleNicknameForm() {
        if (this.props.user.isLocal()) {
            this.setState({ showForm: !this.state.showForm });
        }
    }

    toggleSound() {
        this.setState({ mutedSound: !this.state.mutedSound });
    }

    handlePressKey(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
                this.props.handleNickname(this.state.nickname);
                this.toggleNicknameForm();
                this.setState({ isFormValid: true });
            } else {
                this.setState({ isFormValid: false });
            }
        }
    }

    handleSubmitName(event) {
        event.preventDefault();
        if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
            this.props.handleNickname(this.state.nickname);
            this.toggleNicknameForm();
            this.setState({ isFormValid: true });
        } else {
            this.setState({ isFormValid: false });
        }
    }

    render() {
        return (
            <div className="OT_widget-container">
                <div className="pointer nickname">
                    {this.state.showForm ? (
                        <form onSubmit={this.handleSubmitName}>
                            <Row style={{marginBottom: '10px'}}>
                                <Col xs={10}>
                                    <span className="conference-nickname">Nickname: </span>
                                </Col>
                                <Col xs={2} style={{textAlign: 'center'}}>
                                    <span className="conference-close-button">x</span>
                                </Col>
                            </Row>
                            <Row style={{marginBottom: '7px'}}>
                                <Col xs={10}>
                                    <input
                                        className="change-name-text-components"
                                        value={this.state.nickname}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Col>
                                <Col xs={2}>
                                    <input type="submit" value="Go" className="name-submit-button" />
                                </Col>
                            </Row>
                            <Row>
                                {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                                    <span id="name-error-text">Nickname is too short!</span>
                                )}
                                {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                                    <span id="name-error-text">Nickname is too long!</span>
                                )}
                            </Row>
                        </form>
                    ) : (
                        <div onClick={this.toggleNicknameForm}>
                            <span id="nickname">{this.props.user.getNickname()}</span>
                            {this.props.user.isLocal() && <span> (edit)</span>}
                        </div>
                    )}
                </div>

                {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
                    <div className="streamComponent">
                        <OvVideoComponent user={this.props.user} mutedSound={this.state.mutedSound} />
                    </div>
                ) : null}
            </div>
        );
    }
}
