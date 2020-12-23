import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { Col, Grid } from 'react-bootstrap'


export default class DescriptionBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMore: false
        }

        this.setShowMore = this.setShowMore.bind(this)
        this.setShowLess = this.setShowLess.bind(this)
        this.toggleShowMore = this.toggleShowMore.bind(this)
    }

    setShowMore() {
        this.setState({ showMore: true })
    }

    setShowLess() {
        this.setState({
            showMore: false
        })
    }

    toggleShowMore() {
        let currentState = this.state.showMore
        this.setState({showMore: !currentState})
    }

    render() {
        // console.log("DescriptionBox::", this.props)

        let userData, userStatusPreview
        if (this.props.description) {
            if (this.props.description.length > 0) {
                userData = this.props.description;
                // console.log("DescriptionBox:::userStatus", userStatus)
                if (userData) {
                    userStatusPreview = userData.length > 200 ? userData.substring(0, 200) + "..." : userData
                }
            }
        }
        
        return (
            <div>
                <div>
                    <div className="refier_custom_panel_light_gray">
                        <span> <FontAwesome name="star-o" /></span>
                        <span style={{ marginLeft: "20px" }}>Academic/Career Summary</span>
                        <span> 
                            {!this.props.isReadOnly ?
                                <FontAwesome
                                    onClick={this.props.onOpenEditDescription}
                                    style={{float: "right", marginRight: "10px", marginTop: "3px", cursor: "pointer"}}                                
                                    name="pencil"
                                /> :
                                null
                            }
                        </span>                        
                    </div>
                    <div className="refier-card-style">
                        <Grid fluid>
                            <span className="custom-list-content" style={{"white-space": "pre-wrap"}}>
                                {userData ? 
                                    this.state.showMore ?
                                        userData
                                        :
                                        userStatusPreview
                                        :
                                        "Description not Present"}
                            </span>
                            {userData?
                                <div className="custom-list-sub-content-highlighted custom-link"
                                    style={{cursor:"pointer"}} onClick={this.toggleShowMore}>
                                    {this.state.showMore ? "Less" : "More"}
                                </div>
                                :
                                null
                            }
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
}