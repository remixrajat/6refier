import React, { Component } from 'react'

import MyTrackingCourseController from "./MyTrackingCourseController"
import Preloader from "../../shared/Preloader/PreLoader"


export default class MyTrackingCourseList extends Component{
    constructor(props) {
        super(props)
        this.communityPackages = null
    }

    componentDidMount() {
        // console.log("MyTrackingCourseList :: componentDidMount :: this.props : ", this.props)
        
        let communityPackagesAsOwner
        if (this.props.communityPackagesAsOwner) {
            this.extractCommunityPackages(this.props.communityPackagesAsOwner)
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log("MyTrackingCourseList :: componentWillReceiveProps :: nextProps : ", nextProps)

        if (!this.props.communityPackagesAsOwner) {
            if (nextProps.communityPackagesAsOwner) {
                this.extractCommunityPackages(nextProps.communityPackagesAsOwner)
                return
            }
        }
        if (nextProps.communityPackagesAsOwner) {
            if (!this.props.communityPackagesAsOwner && nextProps.communityPackagesAsOwner) {
                this.extractCommunityPackages(nextProps.communityPackagesAsOwner)
                return
            }
            if (this.props.communityPackagesAsOwner.length != nextProps.communityPackagesAsOwner.length) {
                this.extractCommunityPackages(nextProps.communityPackagesAsOwner)
                return
            }
        }
    }

    extractCommunityPackages(communityPackagesAsOwner) {
        this.communityPackages = []
        for (let i = 0; i < communityPackagesAsOwner.length; i++) {
            // console.log("MyTrackingCourseList :: extractCommunityPackages:: i ", communityPackagesAsOwner[i])

            this.communityPackages.push(
                <div>
                    <MyTrackingCourseController
                        communityPackage={communityPackagesAsOwner[i]}
                        userId={this.props.userId}
                        {...this.props}
                    />
                </div>
            )
        }
    }


    render() {
        // console.log("MyTrackingCourseList ::  this.communityPackages : ", this.communityPackages)

        return (
            <div>
                {this.props.communityPackagesAsOwner ?
                    this.communityPackages ?
                        this.communityPackages.length > 0 ?
                        this.communityPackages :
                            <div style={{ textAlign: "center", margin: "20px" }}
                                className="custom-preloader-message">No Courses have been assigned to monitor.
                            </div> :
                            <div style={{ textAlign: "center", margin: "20px" }}>
                                <Preloader loaderMessage="Loading Modules..."/>
                            </div> :
                        <div style={{ textAlign: "center", margin: "20px" }}>
                            <Preloader loaderMessage="Loading Modules..."/>
                        </div>
                }
            </div>
        )
    }
}