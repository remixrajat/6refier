import React, { Component } from 'react'
import CommunitySkillMappingList from './CommunitySkillMappingList';

export default class AddCommunitySkillsToEntity extends Component{


    render() {
        let body
        if (this.props.communityTreeStructureState) {
            let treeStructure = this.props.communityTreeStructureState
            body = []
            for (let i = 0; i < treeStructure.length; i++) {
                body.push(<CommunitySkillMappingList details={treeStructure[i]} {...this.props}
                    objectPropName="entity_skill"/>)
            }
        }


        // console.log("AddCommunitySkillsToEntity :: props : ", this.props)
        return (
            <div>
                {body}
            </div>)
    }
}