import React, { Component } from 'react';
import { Grid, Row, Col, Table, Button, FormGroup, FormControl, Form, ButtonToolbar } from 'react-bootstrap';
// import AddElementToClsSecSubTreeModal from './AddElementToClsSecSubTreeModal'
// import EditElementOfClsSecSubTreeModal from './EditElementOfClsSecSubTreeModal'
import FontAwesome from 'react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import { PrimaryButton } from '../../../shared/RefierComponents/PrimaryButton';
import { NonPriorityWhiteButton } from '../../../shared/RefierComponents/NonPriorityWhiteButton';

export default class IndividualCompetencies extends Component {

    render() {
      
        let ExistingCompentency = [60, 70, 75, 65, 73]
        let TargetCompentency = [80, 80, 85, 90, 85]
        let AchievedCompentency = [78, 75, 80, 70, 78]

    console.log("IndividualCompetencies : details : ", this.props)

    let teacherLabel = null;
    let rightBtnCol = 6;
    let displayLabelCol = 12;
    let mainDisplayCol = 3;
    let tagDisplayCol = 3;


    let childComponent = this.props.isExpanded ?
      this.props.listItems : null

    let textLabel = <span
      className="custom-list-content">
      {this.props.details.label}</span>

    let arrowButton;

    if (this.props.details.children != null) {
      arrowButton = this.props.isExpanded ? <FontAwesome
        name="angle-down"
        
        style={{ "color": "#999999" }}
      />
        :
        <FontAwesome
          name="angle-right"
          
          style={{ "color": "#999999" }}
        />

      textLabel =
        this.props.isExpanded ?
          <span
            className=" refier_text_on_light__3"
            style={{ "marginLeft": "10px", "fontSize": "14px", "fontWeight": "800" }}>
            {this.props.details.label}</span>

          :
          <span
            className=" refier_text_on_light__3"
            style={{ "marginLeft": "10px", "fontSize": "14px", "fontWeight": "400" }}>
            {this.props.details.label}</span>
    }


        let rightButtons = null
        

        let numbers = []
        // for (let i = 0; i < this.props.numberOfTags.length; i++){

        //     let targetIndex = Math.floor(Math.random() * 4)
        //     let achievedIndex = Math.floor(Math.random() * 4)
        //     let existingIndex = Math.floor(Math.random() * 4)

        //     numbers.push(
        //         <Col xs={12}>
        //             <Col xs={4} style={{ marginTop: "10px" }}>
        //                         <div>
        //                             {ExistingCompentency[existingIndex]}%
        //                         </div>
        //                     </Col>
        //                     <Col xs={4} style={{ marginTop: "10px" }}>
        //                         <div>
        //                             {TargetCompentency[targetIndex]}%
        //                         </div>
        //                     </Col>
        //                     <Col xs={4} style={{ marginTop: "10px" }}>
        //                         <div>
        //                             {AchievedCompentency[achievedIndex]}%
        //                         </div>
        //                         </Col>
        //         </Col>
        //     )
        // }
        let targetIndex = Math.floor(Math.random() * 4)
        let achievedIndex = Math.floor(Math.random() * 4)
        let existingIndex = Math.floor(Math.random() * 4)


    return (
      <div style={{ "marginTop":"15px","marginLeft": "10px", "marginRight": "5px" }}>
        <div style={{ "marginBottom": "5px" }}>
            <Row style={{alignItems:"vertical"}}>
            <Col xs={displayLabelCol} style={{ "textAlign": "left" }} onClick={this.props.makeExpandable}>
                        <Col xs={mainDisplayCol} style={{ marginTop: "5px" }}>
                            <div>
                                {textLabel}
                            </div>
                            </Col>
                            <Col xs={tagDisplayCol} style={{ marginTop: "5px" }}>
                            <div>
                                {this.props.onShow()}
                                </div>
                        </Col>
                            <Col xs={6}>
                                <Col xs={4} style={{ marginTop: "10px" }}>
                                <div>
                                    {ExistingCompentency[existingIndex]}%
                                </div>
                            </Col>
                            <Col xs={4} style={{ marginTop: "10px" }}>
                                <div>
                                    {TargetCompentency[targetIndex]}%
                                </div>
                            </Col>
                            <Col xs={4} style={{ marginTop: "10px" }}>
                                <div>
                                    {AchievedCompentency[achievedIndex]}%
                                </div>
                                </Col>
                            </Col>
                        
            </Col>
            {rightButtons}
          </Row>
        </div>
        {childComponent}
      </div>
    );
  }
}
