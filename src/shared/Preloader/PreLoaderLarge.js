import React, {Component} from 'react'
import {Image} from 'react-bootstrap'
import loader from './loader_square_new.gif'

export default class PreLoaderLarge extends Component{
    render(){
        //console.log("Preloader loading")
        return(
            <Image 
                src={loader}/>
        )
    }
}