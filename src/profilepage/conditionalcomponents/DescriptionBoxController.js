import React, { Component } from 'react'
import { connect } from 'react-redux';

import DescriptionBox from '../presentationalcomponents/DescriptionBox';
import { updateUserDescription } from './action'

import CommonModal from '../../shared/CommonModal'


class DescriptionBoxController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            description: ''
        }
        this.onOpenEditDescription = this.onOpenEditDescription.bind(this);
        this.onEditDescription = this.onEditDescription.bind(this);
		this.closeDescriptionModal = this.closeDescriptionModal.bind(this);
		this.onSaveDescription = this.onSaveDescription.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.profileFields) {
            let userData;
            if (nextProps.profileFields.user_description) {
                if (nextProps.profileFields.user_description.length > 0) {
                    userData = nextProps.profileFields.user_description;
                    this.setState({ description: userData });
                }
            }
        }
    }

    closeDescriptionModal() {
        this.setState({showModal: false});
    }

    onOpenEditDescription() {
        this.setState({showModal: true});
    }

    onSaveDescription() {
        let profiledata = {}
        profiledata.user_description = this.state.description;
        this.props.dispatch(updateUserDescription(profiledata));
        this.setState({showModal: false});
    }

    onEditDescription(e) {
        let description = e.target.value;
        this.setState({ description })
    }

    render() {
        // console.log("DescriptionBoxController::props", this.props);
        let modalBody = <textarea onChange={this.onEditDescription} rows="12">{this.state.description}</textarea>

        return (
            <div>
                <DescriptionBox 
                    {...this.props} 
                    description={this.state.description} 
                    onOpenEditDescription={this.onOpenEditDescription} />
                <CommonModal
					showModal={this.state.showModal}
					close={this.closeDescriptionModal}
					modalHeading="EDIT ACADEMIC/CAREER SUMMARY"
                    modalBody={modalBody}
                    onSaveModal={this.onSaveDescription}
                    isSaveButton={true}
                    onEditDescription={this.onEditDescription}
				/>
            </div>
        )
    }
}

let mapStateToProps = (store) => {
	return {

	}
}

export default connect(mapStateToProps)(DescriptionBoxController);