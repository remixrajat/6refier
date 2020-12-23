import React, {Component} from 'react';
import 'redux'
import { connect } from 'react-redux'
import ClassDetailsNew from '../../communitypage/presentationalcomponents/CommunityProfile/ClassDetailsNew';
import {getInstituteTreeStructure, refreshCommunityTreeStructures} from './action.js'

class ClassDetailsController extends Component{

  constructor(props)
  {
    super(props);
    this.state={showModal1:false, showModal2:false};
    this.close1=this.close1.bind(this);
    this.open1=this.open1.bind(this);
    this.close2=this.close2.bind(this);
    this.open2=this.open2.bind(this);
  }

  componentDidMount(){
    this.props.dispatch(getInstituteTreeStructure(this.props.match.params.communityId));
  }

  close1() {
      this.setState({ showModal1: false });
  }

  open1() {
      this.setState({ showModal1: true });
  }
  close2() {
      this.setState({ showModal2: false });
  }

  open2() {
      this.setState({ showModal2: true });
  }
  
  refreshTreeStructure(){
    this.props.dispatch(refreshCommunityTreeStructures(this.props.match.params.communityId));
  }
  render()
  {
    // console.log("ClassDetailsController :: props : ", this.props)
    
    let title = "Organisation Structure"

    return(
      <div>
        <ClassDetailsNew nodes={this.props.treeStructureJson}
                title={title} {...this.props} refreshTreeStructure={this.refreshTreeStructure.bind(this)}/>
      </div>
    );
  }
}

let mapStateToProps = (store) => {
  return {treeStructureJson : store.communityPageDataReducer.instituteTreeState}
}

export default connect(mapStateToProps)(ClassDetailsController);