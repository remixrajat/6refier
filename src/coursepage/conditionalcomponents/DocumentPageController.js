import React, {Component} from "react"
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";

import DocumentPage from "../presentationalcomponents/DocumentPage";
import DocumentPlayer from "../presentationalcomponents/DocumentPlayer";

import { submitDocumentViewStat } from '../../documents/conditionalcomponents/actions'


class DocumentPageController extends Component{
    constructor(props) {
        super(props)

        this.document = {
            title: 'Refier_Document',
            document_url: 'https://vimeo.com/349296196',
            poster_thumbnail: '',
            description: 'This is document description',
            documentId: 'something',
            author: {
                first_name: "Refier",
                last_name: "Man",
                id: 'dfaa5214-1228-470b-b764-e0971a6e9cf8'
            }
        }

        this.state = {
            documentModalState: false,
            nextPrevTimeAdd: 5
        }

        this.showDocumentModal = this.showDocumentModal.bind(this);
        this.closeDocumentModal = this.closeDocumentModal.bind(this);
        this.saveProgress = this.saveProgress.bind(this);
        this.openInNewTab = this.openInNewTab.bind(this);
    }

    saveProgress(contentProgressDetails, content_id){
        if(!content_id){
            return;
        }
        let statDetails= {
            contentProgressDetails,
            content_id
        }
        // console.log("saveProgress :: ",statDetails)
        this.props.dispatch(submitDocumentViewStat(statDetails))
    }

    showDocumentModal() {
        this.setState({documentModalState: true})
    }

    closeDocumentModal() {
        this.setState({documentModalState: false})
    }

    saveProgress(currentPosition, documentId) {
        console.log({currentPosition, documentId})
    }
    
    openInNewTab(contentUrl) {
        let url = contentUrl || this.props.content.document_url
        var win = window.open(url, '_blank');
        win.focus();
    }


    render() {
        // console.log("DocumentPageController:: props", this.props)

        let playerModal = (
            <DocumentPlayer {...this.props}
                showModal={this.state.documentModalState}
                nextPrevTimeAdd={this.state.nextPrevTimeAdd}
                onClose={this.closeDocumentModal}
                document={this.document}
                saveProgress={this.saveProgress}
                openInNewTab={this.openInNewTab}
                saveProgress={this.saveProgress}
            />
        )

        return (
            <div style={{textAlign:"center", margin:"20px"}}>
                <Col md={4} xs={6} xsOffset={3} mdOffset={4}>
                    <DocumentPage
                        document={this.document}
                        showDocumentModal={this.showDocumentModal}
                    />
                </Col>
                {
                    this.state.documentModalState ?
                        playerModal :
                        null
                }
            </div>
        )
    }
}

var mapStateToProps =  (store, ownProps) => {
    return {
    };
};

export default connect(mapStateToProps)(DocumentPageController);