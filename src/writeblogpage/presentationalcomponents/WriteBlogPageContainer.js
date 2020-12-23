import React from 'react';
import { Grid, Col, Row, FormControl } from 'react-bootstrap';

import TextEditorHolderAndOptions from '../../dashboardpage/presentationalcomponents/TextEditorHolderAndOptions';


export default class WriteBlogPageContainer extends React.Component {
    render() {

        return (
            <div className="router-content-panel ">
                <Col xs={12}>
                    <div className= "refier_custom_panel_title_gray">
                        Share Something - BLOG / NEWS / LEARNING </div>
                        <div style={{border:"1px solid #f2f2f2", borderBottomWidth:"0px", borderTopWidth:"0px"}}>
                            <FormControl 
                                // autofocus
                                // ref={(input) => { this.nameInput = input;input.focus() }} 
                                componentClass="textarea" placeholder="Write a catchy Blog/Notice/Learning Title" 
                                className="custom-edit-blog-title"
                                onChange={this.props.setBlogTitle}
                                value={ this.props.blogTitle }
                             />
                        </div>
                        <TextEditorHolderAndOptions {...this.props} editorHeight="50vh" shareEveryoneAllowed={true}/>
                </Col>
            </div>
        );
    }
}