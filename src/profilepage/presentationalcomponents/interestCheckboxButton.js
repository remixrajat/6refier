import React, {Component} from 'react';
import { Checkbox } from 'react-bootstrap';

class InterestTagCheckboxButtons extends Component{
    constructor(props){
        super(props)
        this.state = { is_checked :false}
        this.handleTagSelection = this.handleTagSelection.bind(this);
    }

    handleTagSelection(e){
        // console.log("interestTagCheckboxButtons::", this.state.is_checked,e.target.checked);
        let self = this;
        this.setState({is_checked:e.target.checked},
            ()=>{
                self.props.addOrRemoveSelectedInterests([self.props.tagId, self.props.label], self.state.is_checked);
            }
        );
    }

    render(){
        return(
            <Checkbox inline={true} hidden id="interestChkbox" 
                        checked={this.state.is_checked} 
                        className={this.state.is_checked ? "ghost-btn selected-ghost-btn" :"ghost-btn"} 
                        onChange={this.handleTagSelection} >{this.props.label}
            </Checkbox>
        );
    }
}

export default InterestTagCheckboxButtons;