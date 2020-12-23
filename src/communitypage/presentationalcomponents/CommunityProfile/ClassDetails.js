import React, {Component} from 'react';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

export default class ClassDetails extends Component{

  constructor(props)
  {
    super(props);
    this.state={expandedRows:[],subjectRows:[],call:true};
    this.handleRowClick=this.handleRowClick.bind(this);
  }   
  handleRowClick(id, e)
  {
    let row=id;
    let newRows=[];
    let subjectDetails={};
    let expandedRowsStateHolder = this.state.expandedRows; 
    if(this.state.expandedRows[row])
    {
      expandedRowsStateHolder[row] = false;
      this.setState({expandedRows:expandedRowsStateHolder});
    }
    else
    {
      expandedRowsStateHolder[row] = true;
      this.setState({expandedRows:expandedRowsStateHolder});
    }
    subjectDetails=this.props.communitySubjectDataState;
    for(var i=0;i<subjectDetails.length;i++)
    {
      var cls=subjectDetails[i].cls;
      newRows.push(
          <tr id={i} onClick={this.handleRowClick.bind(this,i)} >
            <td>{cls}</td>
            <td></td>
            <td>Edit</td>
          </tr>
        );
      if(this.state.expandedRows[i])
      {
        for(var j=0;j<subjectDetails[i].section.length;j++)
        {
          var sect=subjectDetails[i].section[j].name;
          var subjects="";
          var noOfSub=subjectDetails[i].section[j].subject.length;  
          for(var k=0;k<noOfSub-1;k++)
          {
            subjects=subjects.concat(subjectDetails[i].section[j].subject[k].name,", ");
          }
          if(noOfSub!=0)
          subjects=subjects.concat(subjectDetails[i].section[j].subject[noOfSub-1].name);
          newRows.push(
            <tr style={{"backgroundColor":"#e8eaed"}}>
              <td>{cls}{"-"}{sect}</td>
              <td>{subjects}</td>
              <td>Edit</td>
            </tr>
          );
        }
      } 
    }
    this.setState({subjectRows:newRows});
  }
  render()
  { 
    let classDetails={};
    const listItems = [];
    let subjectDetails={};
    if(this.props.communityClassDataState)
    {
      classDetails=this.props.communityClassDataState;
      var field="";
      for(var i=0;i<classDetails.length;i++)
      {
        
        for(var j=0;j<classDetails[i].section.length-1;j++)
        {
          field=field.concat(classDetails[i].section[j],", ");
        }
        field=field.concat(classDetails[i].section[classDetails[i].section.length-1]);
        listItems.push(
          <tr>
            <td>{classDetails[i].cls}</td>
            <td>{field}</td>
            <td>Edit</td>
          </tr>
        );
        field="";
      }
      
    }
    if(this.props.communitySubjectDataState && this.state.call)
    {
      subjectDetails=this.props.communitySubjectDataState;
      for(var i=0;i<subjectDetails.length;i++)
      {
        this.state.expandedRows.push(false);
        var cls=subjectDetails[i].cls;
        this.state.subjectRows.push(
          <tr id={i} onClick={this.handleRowClick.bind(this,i)}>
            <td>{cls}</td>
            <td></td>
            <td>Edit</td>
          </tr>
        );
      this.setState({call:false});
      }  
    }
    return (
          <div className="generic-post-card"  style={{"marginTop":"1em"}}>
            <div className="refier_custom_light_panel_title" 
             style={{ "border": "solid transparent 1px", borderBottomColor: "#CCCCCC",
             "padding":"10px 20px", "marginBottom":"20px","fontSize":"18px"}}>
              Class and Section Details
            </div>
            <div style={{"padding":"0px 20px"}}>
            <Table responsive bordered style={{"tableLayout":"fixed"}}>
              <thead className="custom_table_cell_header" >
                <tr>
                  <td style={{"background":"#F2f2f2"}}>Class</td>
                  <td style={{"background":"#F2f2f2"}}>Section</td>
                  <td style={{"background":"#F2f2f2"}}>Edit</td>
                </tr>
              </thead>
              <tbody style={{"textAlign":"center"}} className="refier_custom_table">
                {listItems}
              </tbody>
            </Table>
            <Grid fluid>
              <Row>
                <Col md={8} mdOffset={2}>
                  <Button bsStyle="primary" bsSize="small" 
                  className="refier_custom_button_new"
                  style={{"marginBottom":"20px"}}
                  block onClick={this.props.open1}>ADD CLASS</Button>
                </Col>
              </Row>
            </Grid>
            <Table responsive bordered style={{"tableLayout":"fixed"}} hover>
              <thead className="custom_table_cell_header" style={{"color":"black"}}>
                <tr>
                  <td style={{"background":"#F2f2f2"}}>Class-Section</td>
                  <td style={{"background":"#F2f2f2"}}>Subjects</td>
                  <td style={{"background":"#F2f2f2"}}>Edit</td>
                </tr>
              </thead>
              <tbody style={{"textAlign":"center"}} className="refier_custom_table" >
                {this.state.subjectRows}
              </tbody>
            </Table>
            <Grid fluid>
              <Row>
                <Col md={8} mdOffset={2}>
                  <Button bsStyle="primary" bsSize="small" 
                  className="refier_custom_button_new"
                  style={{ "marginBottom":"10px"}} 
                  block onClick={this.props.open2}>ADD SUBJECTS</Button>
                </Col>
              </Row>
            </Grid>
            </div>
          </div>
    );
  }
}
