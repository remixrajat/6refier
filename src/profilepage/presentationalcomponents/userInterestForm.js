import React, {Component} from 'react';
import InterestTagCheckboxButtons from './interestCheckboxButton';
import { Col } from 'react-bootstrap';

class UserInterestForm extends Component{
    constructor(props){
        super(props)
        this.createInterestButtons = this.createInterestButtons.bind(this);
    }
    

    createInterestButtons(){
        if (!this.props.tagList ){
            return null;
        }
        let self = this;
        let interestTagCheckboxButtons = this.props.tagList.map(function(interestTag,i){
            return (<InterestTagCheckboxButtons key={i} label={interestTag.fields.tag_name} 
                tagId={interestTag.pk}
                addOrRemoveSelectedInterests={self.props.addOrRemoveSelectedInterests}/>
            );
        });
        return interestTagCheckboxButtons;
    }
    
    render(){
        let _createInterestButtons = this.createInterestButtons()
;        return(
            <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10} 
            className="text-center" style={{margin:"auto 4%"}}>
                {_createInterestButtons}
            </Col>
        );
    }
}

export default UserInterestForm;