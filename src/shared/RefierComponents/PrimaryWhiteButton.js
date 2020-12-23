import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export const PrimaryWhiteButton = (props) => {
    // console.log("PrimaryWhiteButton:: props", props)

    return (
        props.redirect ?
            <Link
                to={props.redirectAddress}
                id={props.buttonId}
                className="btn refier_custom_button_answer"
                style={props.isBlock ? {display: 'block'} : {}}>
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
                className="refier_custom_button_answer"
                block={props.isBlock}
                disabled={props.disabled}
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