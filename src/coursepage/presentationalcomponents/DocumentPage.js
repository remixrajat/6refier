import React, {Component} from "react"
import { Thumbnail, Col } from "react-bootstrap";

import { URL_TEXT, MEDIA_URL_TEXT } from '../../GlobalConstants'
import dummyPoster from "../../images/mentor_dashboard_page/document.jpg"


export default class DocumentPage extends Component {
    render() {
        // console.log("DocumentPage:: props", this.props)

        return (
                <div>
                    <Thumbnail
                        src={this.props.document.poster_thumbnail ? 
                                MEDIA_URL_TEXT + this.props.document.poster_thumbnail : 
                                dummyPoster}
                        onClick={this.props.showDocumentModal} 
                        className="custom-thumbnail refier-card-style"
                        style={{cursor: "pointer"}}>
                        <div style={{ margin: "10px 0px" }}>
                            {this.props.document.title}
                        </div>
                        <div className="custom-list-sub-content">
                            {this.props.document.description}
                        </div>
                    </Thumbnail>
                </div>
        )
    }
}