import React from 'react';


export default class PostPrivacy extends React.Component {
    render() {
        return (
            <span className="refier_custom_paragraph1">
                <label
                    style={{display: 'flex', alignItems: 'center'}}
                    className="custom-checkbox-card">
                    <input type="checkbox" name="anonymousCheck"
                        onChange={this.props.changePostPrivacy}
                        checked={this.props.postPrivacyCheckBoxStatus}
                        className="custom-checkbox-radio" />Private
                </label>
            </span>
        );
    }
}