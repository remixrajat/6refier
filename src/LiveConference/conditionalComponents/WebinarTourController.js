import React, { Component } from 'react';
import { connect } from 'react-redux';

import WebinarTour from '../presentationalComponents/WebinarTour';
import GetDevices from '../../WebinarPage/presentationalcomponents/GetDevices'


class WebinarTourController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: 'User',
            deviceList: {}
        }

        this.getDeviceListDropDown = this.getDeviceListDropDown.bind(this);
        this.enumerateDevices = this.enumerateDevices.bind(this);
    }

    componentWillMount() {
        this.enumerateDevices();
    }

    componentWillReceiveProps(nextProps) {
        // console.log("WebinarTourController:: nextProps", nextProps)

        if(nextProps.userprofiledata) {
            let name = nextProps.userprofiledata.first_name;
            if(nextProps.userprofiledata.last_name && 
                nextProps.userprofiledata.last_name.trim().length > 0) {
                    name = name + " " + nextProps.userprofiledata.last_name
            }

            this.setState({userName: name})
        }
    }

    getDeviceListDropDown(deviceList) {
        let self = this;
        
        if (!deviceList){
            return null;
        }

        let options = deviceList.map((device,i) => {
            if(i === 0) {
                return (
                    <option key={i}>{device.label}</option>
                )
            }
            return null;
           
        })

        return (
            <select className="form-control">
                {options}
            </select>
        )
 
    }

    enumerateDevices() {
        let self = this;
        GetDevices.getDevices()
            .then(function (data) {
                self.setState({deviceList: data})
            })
    }


    render() {
        console.log('WebinarTourController:: props', this.props);
        
        return (
            <WebinarTour 
                userName={this.state.userName}
                deviceList={this.state.deviceList}
                getDeviceListDropDown={this.getDeviceListDropDown}
                enumerateDevices={this.enumerateDevices}
                close={this.props.close}
            />
        );
    }
}


var mapStateToProps = (store) => {
    return {
    };
};


export default connect(mapStateToProps)(WebinarTourController);