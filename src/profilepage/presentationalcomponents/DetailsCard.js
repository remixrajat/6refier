import React,{Component} from 'react';
import { Button,Grid, Row, Col, FormGroup, FormControl, ControlLabel, ButtonToolbar } from 'react-bootstrap';


export default class DetailsCards extends Component{
    

    render(){
        const showEditDiv=this.props.state.showEditDiv;
        const showAddDiv=this.props.state.showAddDiv;
        const showButtons=this.props.state.showButtons;

        const listItems = this.props.userProfileData.map((item) => 
        <div className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0","textAlign":"left"
                          }}>
            {item.fields[this.props.title]}
            <br/>
            <span className=" refier_text_on_light__4"
                          style={{'fontWeight': '700', "fontSize":"12px", "margin":"12px 0"
                          }}>{item.fields[this.props.val1]}</span><br/>
            <span className=" refier_text_on_light__4"
                          style={{'fontWeight': '700', "fontSize":"12px", "margin":"12px 0"
                          }}>{item.fields[this.props.val2]}</span><br/>
            <span className=" refier_text_on_light__4"
                          style={{'fontWeight': '700', "fontSize":"12px", "margin":"12px 0"
                          }}>{item.fields[this.props.val3]}</span>
            <br/><br/>
          </div>
         );


        const list2 = [];
        for(var i=0;i<this.props.userProfileData.length;i++)
        {
            list2.push(
            <div>
                <ControlLabel type="text" className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0px 0px 0px"
                          }}>Institution {i+1}</ControlLabel>
                <FormControl type="text" className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0"
                          }}
                value={this.props.userProfileData[i].fields[this.props.title]} 
                onChange={this.props.onChangeInstitution}/>
                <FormControl type="text" className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0"
                          }}
                value={this.props.userProfileData[i].fields[this.props.val1]} 
                onChange={this.props.onChangeDesignation}/>
                <FormControl type="text" className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0"
                          }}
                value={this.props.userProfileData[i].fields[this.props.val2]} 
                onChange={this.props.onChangeYear}/>
                <FormControl componentClass="textarea" className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"12px 0"
                          }}
                value={this.props.userProfileData[i].fields[this.props.val3]} 
                onChange={this.props.onChangeDescription}/>
            </div>
            )
        }
        
        return (
            <div className=" generic-post-card"  style={{"marginTop":"1em"}} data-label="Details Cards">
                <div className="refier_custom_light_panel_title" 
             		style={{ "border": "solid transparent 1px", borderBottomColor: "#CCCCCC",
             			"padding":"10px 20px",
			 			"fontSize":"18px"}}>{this.props.name}</div>
                
                { showButtons ?
                    <div style={{"padding":"0px 20px"}}>
                        {listItems}
                        <Grid fluid>
                            <Row style={{"marginBottom":"10px", "marginTop":"10px"}}>
                                <Col xs={4} xsOffset={2}>
                                    <Button bsStyle="primary" bsSize="small" 
                    					className="refier_custom_button_new"  
                                    block onClick={this.props.onEditFunction}>Edit</Button>
                                </Col> 
                                <Col xs={4}>
                                    <Button 
                                   bsStyle="primary" bsSize="small" 
                    					className="refier_custom_button_new" 
                                    block onClick={this.props.onAddFunction}>Add</Button>
                                </Col>   
                            </Row>
                        </Grid>
                    </div> : null
                }
                { showEditDiv ?
                    <form style={{"padding":"0px 20px"}}>
                        <FormGroup controlId="formBasicText">
                        {list2}
                        <ButtonToolbar  style={{"marginBottom":"10px", "marginTop":"10px"}}>
                        <Button bsStyle="primary" style={{"backgroundColor":"rgba(72, 82, 140, 1)"}} onClick={this.props.onSave}>Save</Button>
                        <Button bsStyle="danger" onClick={this.props.onSave}>Cancel</Button>
                        </ButtonToolbar>
                        </FormGroup>
                    </form> : null
                }
                { showAddDiv ? 
                    <form style={{"padding":"0px 20px"}}>
                        <FormGroup controlId="formBasicText">
                        <ControlLabel className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"5px 0px 0px 0px"
                          }}>Institution</ControlLabel>
                        <FormControl type="text" className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"5px 0"
                          }} onChange={this.props.onAddInstitution}/>
                        <ControlLabel className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"5px 0px 0px 0px"
                          }}>Degree/Designation</ControlLabel>
                        <FormControl type="text" className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"5px 0"
                          }} onChange={this.props.onAddDesignation}/>
                        <ControlLabel className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"5px 0px 0px 0px"
                          }}>Year</ControlLabel>
                        <FormControl type="text" className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"5px 0"
                          }} onChange={this.props.onAddYear}/>
                        <ControlLabel className=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"5px 0px 0px 0px"
                          }}>Description</ControlLabel>
                        <FormControl componentClass="textarea" onChclassName=" refier_text_on_light__3"
                          style={{'fontWeight': '700', "fontSize":"14px", "margin":"5px 0"
                          }}ange={this.props.onAddDescription}/>
                        <ButtonToolbar  style={{"marginBottom":"10px", "marginTop":"10px"}}>
                        <Button bsStyle="primary" style={{"background-color":"rgba(72, 82, 140, 1)"}} onClick={this.props.onSave}>Add Detail</Button>
                        <Button bsStyle="danger" onClick={this.props.onSave}>Cancel</Button>
                        </ButtonToolbar>
                        </FormGroup>
                    </form> : null
                }
            </div>
        );
    }
}
