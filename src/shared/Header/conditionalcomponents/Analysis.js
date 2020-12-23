import React, { Component } from 'react';
import '../../../../src/app.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Col, Row, Button, SplitButton, MenuItem, DropdownButton } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/dropdown';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { getData, getData1, getData2, getData3 } from "../../../actions/analysisActions";
import Datepicker from './Date';
import userServicePageReducer from '../../../reducers/userServicePageReducer';
// import { Prev } from 'react-bootstrap/lib/Pagination';
import Sidebar from '../presentationalcomponents/AnalysisSideBar';

class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: "sessionCount",
            num1: "userType",
            num2: "sessionCount",
            num3: "daysSinceLastSession",
            num4: "pageviewsPerSession",
            num5: "userAgeBracket",
            num6: "browser",
            num7: 4,
            num8: 4,
            num9: 4,
            
        }
        
    }
    options = {
        layout: {
          padding: {
            bottom: 0,
            top: 0
          }
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false
            },
          }],
          yAxes: [{
            stacked: true,
              }],
        },
            responsive: true,
              legend: {
                display: true,
                position: 'right',
                labels: {
                  fontColor: '#91929b',
                  padding: 20
                }
              }
            };

    render() {
        return (
            <div className="App">
                <div className="SideBar">
                    <ul>
                        <li onClick={()=> this.props.onChangeAvgSession(this.state.num7)}>Avg. Session Duration</li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                    </ul>
                </div>
                <div className={"btns-wrapper && Chart"}>
                {/* <div className="SideBar">
                    <ul>
                        <li onClick={()=> this.props.onChangeAvgSession(this.state.num7)}>Avg. Session Duration</li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                        <li><a href="">Link</a></li>
                    </ul>
                </div> */}
                {/* <Sidebar /> */}
                <DropdownButton bsStyle="success" title="Dropdown">
                    <MenuItem onClick={() => this.props.onChangeCounter(this.state.num)}>Page Details</MenuItem>
                </DropdownButton>
                    {this.props.state.loading && <p>Loading...</p>}
                </div>
                <div className={"Chart"}>
                    <Bar
                        data={this.props.state.data}
                        // data={this.props.state3.data}
                        // options={this.options}
                    />
                </div>

                {/* <div className={"btns-wrapper"}>
                <DropdownButton bsStyle="success" title="Dropdown">
                    <MenuItem onClick={() => this.props.onChangeCounter(this.state.num)}>Active link</MenuItem>
                    <MenuItem onClick={() => this.props.onChangeCounter(this.state.num1)}>Active link</MenuItem>
                    <MenuItem onClick={() => this.props.onChangeCounter(this.state.num2)}>Active link</MenuItem>
                    <MenuItem onClick={() => this.props.onChangeCounter(this.state.num3)}>Active link</MenuItem>
                </DropdownButton>
                    <button onClick={() => this.props.onChangeUser(this.state.num1)}>Show Analysis</button>
                    <input onChange={e => this.setState({num1: (e.target.value)})} />
                    {this.props.state1.loading && <p>Loading...</p>}
                </div>
                <div className={"chart-wrapper"}>
                    <Bar
                        data={this.props.state1.data}
                    />
                </div>

                <div className={"btns-wrapper"}>
                    <button onClick={() => this.props.onChangeUserTypes(this.state.num2)}>Show Analysis</button>
                    <input onChange={e => this.setState({num2: (e.target.value)})} />
                    {this.props.state2.loading && <p>Loading...</p>}
                </div>
                <div className={"chart-wrapper"}>
                    <Bar
                        data={this.props.state2.data}
                    />
                </div>

                <div className={"btns-wrapper"}>
                    <button onClick={() => this.props.onChangeAgeTypes(this.state.num3)}>Show Analysis</button>
                    <input onChange={e => this.setState({num3: (e.target.value)})} />
                    {this.props.state3.loading && <p>Loading...</p>}
                </div>
                <div className={"chart-wrapper"}>
                    <Bar
                        data={this.props.state3.data}
                    />
                </div>

                <div className={"btns-wrapper"}>
                    <button onClick={() => this.props.onChangeCounter(this.state.num4)}>Show Analysis</button>
                    <input onChange={e => this.setState({num4: (e.target.value)})} />
                    {this.props.state.loading && <p>Loading...</p>}
                </div>
                <div className={"chart-wrapper"}>
                    <Bar
                        data={this.props.state.data}
                    />
                </div>

                <div className={"btns-wrapper"}>
                    <button onClick={() => this.props.onChangeCounter(this.state.num5)}>Show Analysis</button>
                    <input onChange={e => this.setState({num5: (e.target.value)})} />
                    {this.props.state.loading && <p>Loading...</p>}
                </div>
                <div className={"chart-wrapper"}>
                    <Bar
                        data={this.props.state.data}
                    />
                </div>

                <div className={"btns-wrapper"}>
                    <button onClick={() => this.props.onChangeCounter(this.state.num6)}>Show Analysis</button>
                    <input onChange={e => this.setState({num6: (e.target.value)})} />
                    {this.props.state.loading && <p>Loading...</p>}
                </div>
                <div className={"chart-wrapper"}>
                    <Bar
                        data={this.props.state.data}
                    />
                </div>

                <div className={"btns-wrapper"}>
                    <button onClick={() => this.props.onChangeCounter(this.state.num7)}>Show Analysis</button>
                    <input onChange={e => this.setState({num7: (e.target.value)})} />
                    {this.props.state.loading && <p>Loading...</p>}
                </div>
                <div className={"chart-wrapper"}>
                    <Bar
                        data={this.props.state.data}
                    />
                </div>

                <div className={"btns-wrapper"}>
                    <button onClick={() => this.props.onChangeCounter(this.state.num8)}>Show Analysis</button>
                    <input onChange={e => this.setState({num8: (e.target.value)})} />
                    {this.props.state.loading && <p>Loading...</p>}
                </div>
                <div className={"chart-wrapper"}>
                    <Bar
                        data={this.props.state.data}
                    />
                </div>

                <div className={"btns-wrapper"}>
                    <button onClick={() => this.props.onChangeCounter(this.state.num9)}>Show Analysis</button>
                    <input onChange={e => this.setState({num9: (e.target.value)})} />
                    {this.props.state.loading && <p>Loading...</p>}
                </div>
                <div className={"chart-wrapper"}>
                    <Bar
                        data={this.props.state.data}
                    />
                </div> */}
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        // number: state.num
        state: state.analysisReducer,
        state1: state.useranalysisReducer,
        state2: state.usertypesReducer,
        state3: state.useragetypeReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeCounter: (num)=> dispatch(getData(num)),
        onChangeUser: (num)=> dispatch(getData1(num)),
        onChangeUserTypes: (num)=> dispatch(getData2(num)),
        onChangeAvgSession: (num)=> dispatch(getData3(num))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis);