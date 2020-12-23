import React, {Component} from 'react'
import {Image} from 'react-bootstrap'
import loader from './loader_squares.gif'
import PostCard from './PostCard'
import LongCard from './LongCard';
import ShortCard from './ShortCard';
import Card from './Card';
import VideoCard from './VideoCard';


export default class PreLoader extends Component{
    constructor(props) {
        super(props);

        this.createPreloader = this.createPreloader.bind(this);
    }

    createPreloader(copies = 1, shape='card') {
        const list = [];

        if(shape === 'post_card') {
            for(let i= 0; i< copies; i++) {
                list.push( <PostCard key={i}/> )    
            }
        } else if (shape === 'long_card') {
            for(let i= 0; i< copies; i++) {
                list.push( <LongCard  key={i}/> )    
            }
        } else if (shape === 'short_card') {
            for(let i= 0; i< copies; i++) {
                list.push( <ShortCard  key={i} /> )    
            }
        } else if (shape === 'card') {
            for(let i= 0; i< copies; i++) {
                list.push( <Card  key={i} /> )    
            }
        } else if (shape === 'line') {
            for(let i= 0; i< copies; i++) {
                list.push(<div className="preloader-line-with-wrapper preloader-shimmer"></div>)    
            }
        } else if (shape === 'video_card') {
            for(let i= 0; i< copies; i++) {
                list.push(<VideoCard  key={i} />)    
            }
        } else if (shape === 'box_and_lines') {
            for(let i= 0; i< copies; i++) {
                list.push(
                    <div style={{display: 'flex', flexDirection: 'column'}} key={i}>
                        <div className="preloader-line-with-wrapper preloader-shimmer"></div>  
                        <div className="preloader-line-with-wrapper preloader-shimmer"></div>  
                        <div className="preloader-post-body preloader-shimmer"></div>
                    </div>)    
            }
        } else {
            list.push(<div></div>)
        }

        
        return list;
    }

    render() {  

        return(
            this.props.shimmer ?
                <div style={this.props.preloaderStyle}>
                    {this.createPreloader(this.props.copies, this.props.placeholder)} 
                </div> :
                <div>
                    <div>
                        <Image src={loader}/>
                    </div>
                    {this.props.loaderMessage ?
                        <div className="custom-preloader-message" style={{marginTop: '10px'}}>
                            {this.props.loaderMessage}
                        </div>
                        : null
                    }
                </div>
        )
    }
}