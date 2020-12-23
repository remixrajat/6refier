import React from 'react';
import { Grid, Col, Row, Tab, Tabs } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class EditCell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            value: this.props.marks
        };
        this.performanceArrayIndex = -1;
        this.enableEditState = this.enableEditState.bind(this)
        // this.disableEditState = this.disableEditState.bind(this)
        this.setValue = this.setValue.bind(this)
        this.setDefaultValue = this.setDefaultValue.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.marks != nextProps.marks){
          this.setState({value:nextProps.marks});
      }
    }

    // disableEditState() {
    //     this.setDefaultValue
    //     this.setState({isEdit: false })
    // }

    enableEditState() {
        this.setState({isEdit: true })
    }

    setValue(valueToSet){
        this.setState({value: valueToSet} ,
            ()=>{
                    this.props.cellData.Marks =  this.state.value;
                    this.props.cellData.action = "update";
                    this.performanceArrayIndex = this.props.addOrUpdatePerformanceList(this.props.cellData, false, this.performanceArrayIndex)
                } );
    }

    setDefaultValue(){
        this.setState({value: this.props.marks},
            ()=>{  
                    this.props.cellData.Marks =  this.state.value;
                    this.props.addOrUpdatePerformanceList(this.props.cellData, true, this.performanceArrayIndex)
                } );
    }

    onValueChange(changedValue){
        this.enableEditState()
        this.setValue(changedValue);
        
    }

    render() {

        let cell = <div>
            <span>
                <input
                    onChange={event => this.onValueChange(event.target.value)}
                    type="text"
                    defaultValue={this.state.value}
                    value= {this.state.value}
                    style={{ margin: "5px 5px", height: "30px" }}
                />
            </span>
            {this.state.isEdit?
            <span>
                <FontAwesome
                    name="undo"
                    
                    className="headerIcon"
                    onClick={this.setDefaultValue}
                    title = "Reset marks"
                    style={{color:"#a78284"}}
                />
            </span>:null
            }
        </div>

        return (
            <div>
                {cell}
            </div>
        );
    }
}

export default EditCell;