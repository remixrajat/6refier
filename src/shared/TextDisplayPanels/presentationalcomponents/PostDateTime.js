import React from 'react';
import {Grid,Col,Row} from 'react-bootstrap';
import {formatdatefunction} from '../../../HelperFunctions/formatDateFunction'
// import TimeAgo from 'react-timeago'

export default class PostDateTime extends React.Component{
    render(){

        let formattedPostDate = formatdatefunction(this.props.post_date , 'long');
        

        return(
            // <TimeAgo className="refier_text_on_light__4" date={this.props.post_date} />
            <span className="custom-list-sub-content">
        {formattedPostDate}
      </span>
        );
    }
}

