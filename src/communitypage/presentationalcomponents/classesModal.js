import React, { Component } from 'react';
import {Grid,Row,Col,Image,imageShapeInstance,getInitialState,imageResponsiveInstance,Modal,Button,Thumbnail} from 'react-bootstrap';
import counselimg from './u205.png';
import CommonModal from '../../shared/CommonModal'

class SchoolComponentsModal extends Component {


  render() {

    let sampleMoreGrades = ["12 - A,B,C","Nursery - A,B,C", "KG - A,B,C"]
    let moreGrades = []; 
    if(this.props.moreClass){
      for(var j = 0; j < this.props.moreClass.length ; j++) {
        moreGrades.push (
          <span className="marginbtn refier_custom_link_3" 
          style={{'fontFamily':'Roboto','fontSize':'14px','borderColor':'transparent',
                  'fontWeight':'700' }}>{this.props.moreClass[j]} <br/></span> 
        ) };
    }
    else{
      for(var j = 0; j < sampleMoreGrades.length ; j++) {
        moreGrades.push (
          <span className="marginbtn refier_custom_link_3" 
          style={{'fontFamily':'Roboto','fontSize':'14px','borderColor':'transparent',
                  'fontWeight':'700' }}>{sampleMoreGrades[j]} <br/></span> 
        ) };
    }
      

      return(
        <CommonModal close={this.props.close}
            showModal={this.props.showModal}
            modalHeading="Classes List" 
            modalBody={moreGrades} />
      )


}}
export default SchoolComponentsModal;