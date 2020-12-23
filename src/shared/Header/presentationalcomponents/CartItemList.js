import React, { Component } from 'react';
import { Image, Badge, OverlayTrigger, Popover, Button, ListGroup, ListGroupItem, Col, Glyphicon, Label } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class RefierCartHeader extends Component {


    render() {
        return (
            <div>
                <ListGroupItem>
                <Media>
                    <Media.Left>
                    <FontAwesome 
                        name='trophy'
                    />
                    </Media.Left>
                    <Media.Body>
                    <Media.Heading>{this.props.productLabel}</Media.Heading>
                        <div>desription</div>
                        <div>price</div>
                    </Media.Body>
                </Media>
                </ListGroupItem>
            </div>
        )
    }

}