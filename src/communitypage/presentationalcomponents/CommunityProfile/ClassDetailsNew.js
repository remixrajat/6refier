import React, { Component } from 'react';
import { Grid, Row, Col, Table, Button, Accordion, Panel } from 'react-bootstrap';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckboxTree from 'react-checkbox-tree'
import FontAwesome from 'react-fontawesome';
import ClassSectionExpandableRowController from 
        '../../conditionalcomponents/ClassSectionExpandableRowController.js'

export default class ClassDetailsNew extends Component {

  render() {
    
    let listItems = [];
    if(this.props.nodes!=null && this.props.nodes!=[]){
      //console.log("classdetailstree2", this.props.nodes)
        for(var i=0;i<this.props.nodes["student_list"].length;i++)
        {
          listItems.push(
            <ClassSectionExpandableRowController {...this.props} details={this.props.nodes["student_list"][i]}/>
          )
        }
    }

    return (
      <div>
        <div className="refier_custom_panel_title_gray">
          {this.props.title}
          <FontAwesome
          name="refresh"
          
          style={{ "color": "#999999", marginLeft:"20px" }}
          title="Click to refresh institute tree structure"
          onClick={this.props.refreshTreeStructure}
          />
        </div>
        <div  className="refier-card-style" style={{"padding":"10px 20px"}}>
            {listItems}
        </div>
      </div>
    );
  }
}
