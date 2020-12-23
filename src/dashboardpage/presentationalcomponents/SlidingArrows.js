import React, { Component } from 'react';
// import '../customStyle.css';
import {Grid, Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class SlidingArrows extends Component{
    render(){
        let arrowImg = null;
        let arrowClass = null;
        if(this.props.direction ==="left"){
            arrowImg = "home";//leftArrowImg;
            //arrowClass = "slick-prev";
            arrowClass = "slick-arrow slick-prev";
        }
        else if(this.props.direction==="right"){
            arrowImg = "home";//rightArrowImg;
            arrowClass = "slick-next";
        }
        return(
            <span className={arrowClass}>
                {/*<FontAwesome
                    className={arrowClass}
                    name={arrowImg}
                    size='2x'
                    onClick={this.props.onClick}
                    style={{"color":"black"}}
                />*/}
                {/*<img src={arrowImg} onClick={this.props.onClick} className={arrowClass} />*/}
            
            </span>
        );
    }
}

export default SlidingArrows;