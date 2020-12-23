import React, { Component } from 'react'

import MyLearningModule from './MyLearningModule'
import MyLearningModuleController from "../conditionalcomponents/MyLearningModuleController"

import Preloader from "../../shared/Preloader/PreLoader"


export default class MyLearningModulesList extends Component{

    constructor(props) {
        super(props)
        this.communityPackages = null
    }

    componentDidMount() {
        let communityPackagesAsOwner
        if (this.props.communityPackagesAsOwner) {
            this.extractCommunityPackages(this.props.communityPackagesAsOwner)
        }
    }

    componentWillReceiveProps(nextProps) {
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
            // console.log("extractCommunityPackages:: i ", communityPackagesAsOwner[i])
            this.communityPackages.push (
                <div>
                    <MyLearningModuleController
                        communityPackage={communityPackagesAsOwner[i]}
                        userId={this.props.userId}
                        {...this.props}
                    />
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                {this.props.communityPackagesAsOwner ?
                    this.communityPackages ?
                        this.communityPackages.length > 0 ?
                            this.communityPackages :
                            <div style={{ textAlign: "center", margin: "20px" }}
                                className="custom-preloader-message">
                                No Learning Modules created yet. Contact Refier Support Team to create Learning Modules
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