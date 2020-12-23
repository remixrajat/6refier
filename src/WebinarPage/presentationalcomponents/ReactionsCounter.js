import React, { Component } from 'react'

import icons from '../conditionalcomponents/Reactions/helpers/icons'


export default class ReactionsCounter extends Component{
    render() {
        // console.log("ReactionsCounter :: this.props :: ", this.props)

        let wowImage = icons.find('facebook', 'wow')
        let likeImage = icons.find('facebook', 'like')

        return (
            this.props.fromToolbar ?
                <div className="conference-toolbar-reactions">
                    {this.props.likeCount > 0 || this.props.wowCount > 0 ?
                        <div>
                            <div>
                                <img style={{
                                        width: '30px', height: '30px',backgroundSize: '100%',
                                    }} 
                                    src={likeImage}/>
                                <span className="custom-list-content"
                                    style={{ marginLeft: "20px" }}>{this.props.likeCount}</span>
                            </div>
                            <div>
                                <img style={{
                                        width: '30px', height: '30px', backgroundSize: '100%'
                                    }} 
                                    src={wowImage}/>
                                <span className="custom-list-content"
                                    style={{ marginLeft: "20px" }}>{this.props.wowCount}</span>
                            </div>
                        </div> :
                        <div>
                            <div className="custom-list-sub-content">0 Reactions</div>
                        </div>
                    }
                </div> :
                <div style={{ backgroundColor: "white" }}>
                    {this.props.likeCount > 0 || this.props.wowCount > 0 ?
                        <div>
                            <div>
                                <p className="custom-list-title-content">Count: </p>
                            </div>
                            <div>
                                <img style={{
                                        width: '30px', height: '30px',backgroundSize: '100%',
                                    }} 
                                    src={likeImage}/>
                                <span className="custom-list-content"
                                    style={{ marginLeft: "20px" }}>{this.props.likeCount}</span>
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <img style={{
                                        width: '30px', height: '30px', backgroundSize: '100%'
                                    }} 
                                    src={wowImage}/>
                                <span className="custom-list-content"
                                    style={{ marginLeft: "20px" }}>{this.props.wowCount}</span>
                            </div>
                        </div> :
                        <div>
                            <div className="custom-list-sub-content">0 Reactions</div>
                        </div>
                    }
                </div>
        )
    }
}