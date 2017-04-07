'use strict';

import React from 'react';
import { browserHistory, Link } from 'react-router';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  underlineFocusStyle: { borderColor: '#32936F' },
  floatingLabelStyle: { color: 'black' },
  floatingLabelFocusStyle: { color: '#32936F' }
};

const types = [
  <MenuItem key={1} value={"Birthday"} primaryText="Birthday" />,
  <MenuItem key={2} value={"Anniversary"} primaryText="Anniversary" />,
  <MenuItem key={3} value={"Meeting"} primaryText="Meeting" />,
  <MenuItem key={4} value={"Outing"} primaryText="Outing" />,
  <MenuItem key={5} value={"Holiday"} primaryText="Holiday" />,
];

export default class Event extends React.Component {
	constructor(props) {
		super(props);
		const today = new Date();
		this.state = {
			minDate: today,
			index: 0,
			eventName: "",
			eventType: null,
			eventDate: null,
			eventTime: null,
			errorText: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.sendData = this.sendData.bind(this);
	}

	handleChange(prop, event, value, typeValue) {
		let newState = {};
		let newValue;

		if (prop === 'eventName') newValue = value;
		if (prop === 'eventType') newValue = typeValue;
		if (prop === 'eventDate') newValue = value.toDateString();
		if (prop === 'eventTime') newValue = value.toTimeString().slice(0, 8);

		newState[prop] = newValue;

		this.setState(newState);
	}

	validate() {
		let errors = {};
		let fields = ['eventName', 'eventType', 'eventDate', 'eventTime'];

		fields.forEach(field => {
			if (!this.state[field]) errors[field] = "This field is required.";
		});

		return errors;
	}

	sendData() {
		let errors = this.validate();

		if (Object.keys(errors).length === 0) {
			browserHistory.push({
	      pathname: '/',
	      state: {
	        index: 1,
	        eventCreated: true,
	        eventName: this.state.eventName,
	        eventType: this.state.eventType,
	        eventDate: this.state.eventDate,
	        eventTime: this.state.eventTime
	      }
    	});
		} else {
			this.setState({ errorText: errors });
		}
  }

	render(){
		return (
			<div className="container">
				<div className="text title">
	  			Event
	  		</div>
	  		<div className="wrapper">
	  			<TextField
	  			  autoFocus
	  				onChange={this.handleChange.bind(this, 'eventName')}
			      hintText="Anchore Meeting"
			      floatingLabelText="Event Name"
			      errorText={this.state.errorText.eventName}
			      floatingLabelStyle={styles.floatingLabelStyle}
			      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
			      underlineFocusStyle={styles.underlineFocusStyle}
			    />
			    <SelectField
	          value={this.state.eventType}
	          onChange={this.handleChange.bind(this, 'eventType')}
	          floatingLabelText="Event Type"
	          errorText={this.state.errorText.eventType}
	          floatingLabelStyle={styles.floatingLabelStyle}
	          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
			      underlineFocusStyle={styles.underlineFocusStyle}
			      listStyle={{backgroundColor: '#fff'}}
			      selectedMenuItemStyle={{color: '#32936F'}}
	        >
	          {types}
	        </SelectField>
			    <DatePicker
			      onChange={this.handleChange.bind(this, 'eventDate')}
			      floatingLabelText="Date"
			      hintText="2018-11-07"
			      errorText={this.state.errorText.eventDate}
			      floatingLabelStyle={styles.floatingLabelStyle}
			      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
			      underlineFocusStyle={styles.underlineFocusStyle}
			      firstDayOfWeek={0}
			      minDate={this.state.minDate}
			      dialogContainerStyle={{backgroundColor: 'white'}}
			    />
			    <TimePicker
			      onChange={this.handleChange.bind(this, 'eventTime')}
			      floatingLabelText="Time"
			      errorText={this.state.errorText.eventTime}
			      floatingLabelStyle={styles.floatingLabelStyle}
			      dialogBodyStyle={{backgroundColor: 'white'}}
			      pedantic={true}
			    />
	  		</div>
	  		<div className="wrapper space">
	  			<RaisedButton
	  			 	label="Submit Event"
	  			 	onTouchTap={() => this.sendData()}
	  			/>
	  		</div>
				<div className="navFiller"></div>
	  	</div>
		);
	}
}