import React from 'react';
import Autosuggest from 'react-autosuggest';
import { FormControl } from 'react-bootstrap';
import { compareArrays } from '../../../HelperFunctions/compareArrays';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, inputArray) {
	if (!inputArray) {
		return [{ "label": "Fetching Suggestions", "value": "" }];
	}
	const escapedValue = escapeRegexCharacters(value.replace(/\s/g, ''));

	if (escapedValue === '') {
		return [];
	}

	const regex = new RegExp(escapedValue, 'i');
	let return_values = inputArray.filter(eachInput => regex.test(eachInput.label.replace(/\s/g, '')));

	return return_values;
}

export default class AutosuggestTextBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.defaultValue || '',
			suggestions: []
		};

		this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange = (event, { newValue, method }) => {
		if (method !== "click" && newValue != "" && newValue != null) {
			this.props.onchangeDynamicFetch(newValue);
		}
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value, reason }) => {
		this.setState({
			suggestions: getSuggestions(value, this.props.inputValue)
		});
	};

	componentWillReceiveProps(nextProps) {
		if (!compareArrays(nextProps.inputValue, this.props.inputValue)) {
			this.setState({
				suggestions: getSuggestions(this.state.value, nextProps.inputValue)
			});
		}
	}

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	getSuggestionValue(suggestion) {
		return suggestion.value;
	}

	renderSuggestion(suggestion) {
		return (
			<span>{suggestion.label}</span>
		);
	}

	onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
		console.log("autosuggest suggestionvalue", suggestion);
		if (this.props.doNotReset) {
			this.setState({ value: suggestion.value });
		}
		else {
			this.setState({ value: "" });
		}
		this.props.onSuggestionSelected(suggestion);
	}

	onBlur() {
		if (this.props.hasOwnProperty("valueOnBlur")) {
			if (this.props.valueOnBlur) {
				this.setState({ value: this.props.valueOnBlur.label });
			}
			else {
				this.setState({ value: "" });
			}
		}
	}


	render() {
		const { value, suggestions } = this.state;
		// console.log("AutosuggestTextBox :: value : suggestions : ", value, suggestions)
		const inputProps = {
			placeholder: this.props.placeholder,
			value,
			onChange: this.onChange,
			onBlur: this.onBlur
		};

		return (
			<div>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={this.getSuggestionValue}
					renderSuggestion={this.renderSuggestion}
					inputProps={inputProps}
					onSuggestionSelected={this.onSuggestionSelected} />
			</div>
		);
	}
}