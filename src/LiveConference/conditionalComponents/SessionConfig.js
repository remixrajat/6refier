import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


class SessionConfig extends Component {
    render() {
        // console.log('SessionConfig:: props', this.props, this.ws);

        return (
            <Grid fluid style={{marginTop: '15px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <label style={{display: 'flex', flex: 0.5}}>Allow Raise Hand?</label>
                    <input style={{display: 'flex', flex: 0.5, alignSelf: 'baseline'}} 
                        type="checkbox" value={this.props.isRaiseHandAllowed} 
                        onChange={() => {
                            if(this.props.isRaiseHandAllowed) {
                                this.props.disallowRaiseHand();
                            } else {
                                this.props.allowRaiseHand();
                            }
                        }}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                    <label style={{display: 'flex', flex: 0.5}}>Max Participants Allowed to Speak</label>
                    <input style={{display: 'flex', flex: 0.5}} 
                        type="number" value={this.props.maxParticipantSpeak} 
                        onChange={(e) => this.props.setMaxParticipantSpeak(e.target.value)} />
                </div>
            </Grid>
        );
    }

}


var mapStateToProps = (store) => {
    return {
    };
};


export default connect(mapStateToProps)(SessionConfig);