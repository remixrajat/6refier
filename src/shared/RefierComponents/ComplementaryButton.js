import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export const ComplementaryButton = (props) => {
    // console.log("ComplementaryButton:: props", props)

    return (
        props.redirect ?
            <Link
                to={props.redirectAddress}
                id={props.buttonId}
                className="btn refier_custom_button_new_selected_2"
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
                className="refier_custom_button_new_selected_2"
                disabled={props.disabled}
                style={props.style}
                block={props.isBlock}
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