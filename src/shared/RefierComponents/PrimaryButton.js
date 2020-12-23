import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export const PrimaryButton = (props) => {
    // console.log("PrimaryButton:: props", props)

    return (
        props.redirect ?
            <Link
                to={props.redirectAddress}
                id={props.buttonId}
                className="btn refier_custom_button_save"
                style={props.isBlock ? {display: 'block'} : props.style}>
                {
                    props.showIcon ?
                        <span style={{ "marginRight": "10px" }}>
                            {props.showIcon}
                        </span> :
                        null
                }
                <span>{props.buttonText}</span>
            </Link> :
            <Button
                id={props.buttonId}
                className="refier_custom_button_save"
                disabled={props.disabled}
                block={props.isBlock}
                style={props.style}
                onClick={props.onButtonClick}>
                {
                    props.showIcon ?
                        <span style={{ "marginRight": "10px" }}>
                            {props.showIcon}
                        </span> :
                        null
                }
                <span>{props.buttonText}</span>
            </Button>
    )
}