import React from 'react';
import FontAwesome from 'react-fontawesome';

import { markQuestionResolved } from '../conditionalcomponents/action'

import CommonModal from '../../CommonModal'
import Preloader from '../../Preloader/PreLoader'
import spinner from '../../Preloader/loader_spinner.gif'


export default class IsQuestionResolved extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showInfoModal: false,
            modalBodyText: undefined,
            loaderStatus: 0
        }

        this.showInfoModal = this.showInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.markAsResolved = this.markAsResolved.bind(this);
    }

    showInfoModal() {
        this.setState({ showInfoModal: true })
    }

    closeInfoModal() {
        this.setState({ showInfoModal: false, modalBodyText: undefined })
    }

    markAsResolved(postId) {
        let {timeline, sortOrder, filterPostType} = this.props;
        this.setState({loaderStatus: 2})
        if(this.props.onViewPost !== undefined) {
            let resolvePromise = this.props.dispatch(markQuestionResolved(postId, timeline, sortOrder, filterPostType, false))
            resolvePromise.then((response) => {
                this.props.refreshPost();
                let status = 0

                if(typeof response == "undefined")  status = -1;
                else if(response) status = 1;

                this.setState({ loaderStatus: status })             
            })
        }
        else {
            let resolvePromise = this.props.dispatch(markQuestionResolved(postId, timeline, sortOrder, filterPostType, true))
            resolvePromise.then((response) => {
                let status = 0

                if(typeof response == "undefined")  status = -1;
                else if(response) status = 1;

                this.setState({ loaderStatus: status })             
            })
        } 
    }


    render() {
        // console.log("IsQuestionResolved:: props==============", this.props);

        let modalBody = (
            <div className="query-resolve-information">
                <p>Mark a question as resolved if: </p>
                <p>1) You are satisfied with one or more answers given by our experts</p>
                <p>2) Do not want to continue questioning further </p>
            </div>
        )
        
        return (
            this.props.isResolved ?
                <div className="query-resolved-container query-resolved-true">
                    <p style={{flex: 0.3}}>Resolved</p>                    
                    <div style={{flex: 0.5}}></div>
                    <div style={{flex: 0.2, display: 'flex', justifyContent: 'center'}}>
                        <FontAwesome 
                            name="check" 
                            title="resolved"
                            className="query-resolved-true-check" />
                    </div>
                </div> :
                this.props.communityOwnerOrMentor ?
                    <div className="query-resolved-container">
                        <p style={{flex: 0.4}}>
                            {
                                this.props.commentsCount > 0 ?
                                "Unresolved by user" :
                                "Unanswered question"
                            }
                        </p>                    
                        <div style={{flex: 0.6}}></div>
                    </div> :
                    <div className="query-resolved-container">
                        <p style={{flex: 0.4}}>Is your question resolved?</p>
                        <div style={{flex: 0.4}}>
                        {
                            this.state.loaderStatus === 2 ?
                                <img src={spinner} className="query-resolved-icons" /> :
                                <FontAwesome 
                                    onClick={() => this.markAsResolved(this.props.postId)}
                                    title="Click to mark this question resolved"
                                    name="check" 
                                    className="query-resolved-icons query-resolved-check" />
                        }
                        </div>
                        <div style={{flex: 0.2, display: 'flex', justifyContent: 'center'}}>
                            <FontAwesome 
                                onClick={() => this.showInfoModal()}
                                title="Click to get more info"
                                name="info" 
                                className="query-resolved-icons query-resolved-info" />
                        </div>
                        <CommonModal
                            showModal={this.state.showInfoModal}
                            modalHeading="Resolve a Question"
                            modalBody={this.state.modalBodyText || modalBody}
                            close={this.closeInfoModal}
                        />
                    </div>
        )
    }
}