import React, { Component } from 'react'

import { formatdatefunction } from '../../HelperFunctions/formatDateFunction'

export default class RoomDateTime extends Component{

    render() {
        let formattedPostDate = formatdatefunction(this.props.dateTime , 'long');

        return(
            <span className="custom-list-sub-content">
                {formattedPostDate}
            </span>
        );
    }
}