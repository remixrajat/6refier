import React, { Component } from 'react'
import ReactionsCounter from '../presentationalcomponents/ReactionsCounter'


export default class ReactionsCounterController extends Component{
    constructor(props) {
        super(props)
        this.state = {
            counters: [],
            likeCounter: 0,
            wowCounter: 0,
        }
    }

    componentDidMount() {
        if (this.props.counters) {
            this.setCounters(this.props.counters)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.counters) {
            this.setCounters(nextProps.counters)
        }
        else {
            if (nextProps.counters && nextProps.counters.length != this.props.counters.length) {
                this.setCounters(nextProps.counters)
            }
        }
    }

    setCounters(counters){
        if (counters) {
            if (counters.length > 0) {
                let likes = 0
                let wows = 0
                for (let i = 0; i < counters.length; i++){
                    switch (counters[i].emoji) {
                        case "like":
                            likes = likes + 1
                            continue;
                        case "wow":
                            wows = wows + 1
                            continue;
                        default:
                            continue;
                    }
                }
                this.setState({likeCounter:likes, wowCounter:wows})
            }
        }
    }

    render() {
        // console.log("ReactionsCounterController :: this.props :: ", this.props)

        return (
            <ReactionsCounter counters={this.state.counters}
                likeCount={this.state.likeCounter}
                wowCount={this.state.wowCounter}
                fromToolbar={ this.props.fromToolbar } 
            />
        )
    }
}