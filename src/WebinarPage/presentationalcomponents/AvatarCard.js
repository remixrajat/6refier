import React, { Component } from 'react'
import { MEDIA_URL_TEXT } from '../../GlobalConstants';

export default class AvatarCard extends Component {
    render() {

        return (
            this.props.type === 'presenter' ?
                <div className={this.props.fromAttendeesList ? "card-container-presenter" : "card-container"}>
                    <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={this.props.profile ?
                        (MEDIA_URL_TEXT + this.props.profile) : this.props.defaultPhoto} />
                </div> :
                <div className="card-container"
                    style={this.props.fromAttendeesList ? { margin: '5px auto', textAlign: 'left' } : {}}>
                    <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={this.props.profile ?
                        (MEDIA_URL_TEXT + this.props.profile) : this.props.defaultPhoto} />
                    <div className="desc-card">
                        <div className="desc-text">
                            <p>{this.props.name}</p>
                            <p className="designation">{this.props.designation}</p>
                        </div>
                    </div>
                </div>
        )
    }
}
