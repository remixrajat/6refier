import React, { Component } from 'react'
import SubEntityCompetencyReport from './SubEntityCompetencyReport'
import { Grid, Row, Col, Table, Button, FormGroup, FormControl, Form, ButtonToolbar } from 'react-bootstrap';


export default class MemberCompetencyReport extends Component{

    render(){
        console.log("MemberCompetencyReport :: props :: ", this.props)

        let body
        if (this.props.communityTreeStructureState) {
            let treeStructure = this.props.communityTreeStructureState
            body = []
            for (let i = 0; i < treeStructure.length; i++) {
                body.push(<SubEntityCompetencyReport details={treeStructure[i]} {...this.props}
                    objectPropName="entity_skill"/>)
            }
        }


        // console.log("AddCommunitySkillsToEntity :: props : ", this.props)
        return (
            <div style={{marginTop:"20px"}}>
                <Row>
                    <Col xsOffset={6} xs={2} style={{fontWeight:"500"}}>
                        Existing Compentency
                    </Col>
                    <Col xs={2} style={{fontWeight:"500"}}>
                            Target Compentency
                    </Col>
                    <Col xs={2} style={{fontWeight:"500"}}>
                        Achieved Compentency
                    </Col>
                </Row>
                <Row>
                {body}
                </Row>
                
                
            </div>)
    }
}