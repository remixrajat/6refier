import React, { Component } from "react";
import { Grid, Col, Row, FormControl, Tabs, Tab} from 'react-bootstrap'

import MarketPlacePackageList from './MarketPlacePackageList'


export default class MarketPlaceForCommunity extends Component {
    constructor(props) {
        super(props)
        this.state = {
           searchText: "" 
        }

        this.onEditSearch = this.onEditSearch.bind(this)
    }

    onEditSearch(e) {
        let value = e.target.value
        this.setState({searchText:value})
    }

    render() {
        // console.log("MarketPlaceForCommunity:: ", this.props)

        return (
            <Grid fluid>
                <Col xsOffset={2} xs={8} 
                    style={{marginTop: '30px'}}>
                    <div className="custom-search-area-wrapper">
                        <FormControl 
                            autofocus
                            componentClass="textarea"
                            placeholder="Search ..." 
                            className="custom-search-area"
                            onChange={this.onEditSearch}
                        />
                    </div>
                </Col>
                <Col xs={12} style={{marginTop: '50px', marginBottom: '70px'}}>
                    <div className="community-marketplace-tab-wrapper">
                        <Tabs id="community-marketplace-tab" defaultActiveKey="recommended" bsStyle='pills'>
                            <Tab eventKey="recommended" title="Community Defined Skills">
                                {
                                    this.props.communityPackagesMarketPlace ?
                                        <div style={{marginTop: '50px'}}>
                                            <MarketPlacePackageList 
                                                communityId={this.props.communityId}
                                                courses={this.props.communityPackagesMarketPlace['recommended']}
                                                searchText={this.state.searchText}
                                            /> 
                                        </div> :
                                        <div>Add Skills to Community by clicking "Define Company Skills"</div>
                                }
                            </Tab>
                            <Tab eventKey="all" title="Refier">
                            {
                                this.props.communityPackagesMarketPlace ?
                                    <div style={{marginTop: '50px'}}>
                                        <MarketPlacePackageList 
                                            communityId={this.props.communityId}
                                            courses={this.props.communityPackagesMarketPlace['other']}
                                            searchText={this.state.searchText}
                                        /> 
                                    </div> :
                                    <div>Add Skills to Community by clicking "Define Company Skills"</div>
                            }
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
            </Grid>
        )
    }
}