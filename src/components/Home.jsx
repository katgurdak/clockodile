'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: this.setTime(),
      index: 1,
      eventCreated: false
		};
	}

	componentWillMount() {
	  let timeTrigger = () => {
  		return setInterval(() => {
				this.setState({
	      	time: this.setTime()
	      });
	    }, 1000);
  	};

    let countDownTrigger = () => {
      return setInterval(() => {
        this.setState({
          countDownTime: this.setCountDown()
        });
      }, 1000);
    }

    // setInterval returns a handle that you can use to clear it
    if (!!this.props.location.state && this.props.location.state.eventCreated) {
      this.setState(this.props.location.state);
      this.setState({trigger: countDownTrigger()});
    } else {
      this.setState({trigger: timeTrigger()});
    }
  }

  componentDidMount() {
    this.setState({greeting: this.renderText()});
  }

  componentWillUnmount() {
  	clearInterval(this.state.trigger);
    document.querySelector('#confetti').classList.add('hide');
  }

  setTime() {
  	let now = new Date();

    let seconds = now.getSeconds();
    let minutes = now.getMinutes();
    let hours = now.getHours();

    seconds = addZero(seconds);
    minutes = addZero(minutes);
    hours = addZero(hours);

    return `${hours}:${minutes}:${seconds}`;

    function addZero(time) {
    	return time.toString().length >= 2 ? time : "0" + time;
    }
  }

  setCountDown() {
    let date = `${this.state.eventDate} ${this.state.eventTime}`;
    let countDownDate = new Date(date).getTime();
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(this.state.trigger);
      this.renderConfetti();
      return "COMPLETE";
    }

    return `${days}d ${hours}h ${minutes}m ${seconds}s `;
  }

  renderClock() {
    return this.state.eventCreated ? this.state.countDownTime : this.state.time;
  }

  renderText() {
    let welcome = "Welcome! Here's the current time in your area - create an event below to start a count down!";
    let greeting;
    let type = this.state.eventType;
    let name = this.state.eventName;
    let date = this.state.eventDate;

    if (type === "Birthday") greeting = `A very special ${type} - ${name} - is coming up on ${date}! Get those candles ready!`;
    if (type === "Anniversary") greeting = `An ${type} - ${name} - is coming up on ${date}!`;
    if (type === "Meeting") greeting = `You have a ${type} - ${name} - on ${date}!`;
    if (type === "Outing") greeting = `Woo! Your ${type} - ${name} - is coming up on ${date}!`;
    if (type === "Holiday") greeting = `The ${type} - ${name} - is coming up on ${date}!`;

    return this.state.eventCreated ? greeting : welcome;
  }

  renderConfetti() {
    document.querySelector('#confetti').classList.remove('hide');

    let newGreeting = `Congratulations! Your ${this.state.eventType} - ${this.state.eventName} - has arrived!`;

    this.setState({greeting: newGreeting});
  }

  render() {
    return (
    	<div className="container">
    		<div className="wrapper space">
	    		<Paper zDepth={1}>
	    			<div className="clock">
				      {this.renderClock()}
				    </div>
		    	</Paper>
	    	</div>
	    	<div className="text">
    			{this.state.greeting}
    		</div>
        <div className="navFiller"></div>
    	</div>
    );
  }
}
