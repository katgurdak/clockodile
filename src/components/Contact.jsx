'use strict';

import React from 'react';

export default class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 2
		};
	}
  render() {
    return (
      <div className="container">
      	<div className="text title">
    			Contact
    		</div>
        <div className="wrapper" style={{flexDirection: 'row'}}>
          <a href="https://linkedin.com/in/katgurdak/" target="_blank">
            <i className="fa fa-linkedin fa-3x" aria-hidden="true"></i>
          </a>
          <a href="http://github.com/katgurdak" target="_blank">
            <i className="fa fa-github fa-3x" aria-hidden="true"></i>
          </a>
          <a href="https://twitter.com/katgurdak" target="_blank">
            <i className="fa fa-twitter fa-3x"></i>
          </a>
        </div>
        <div className="navFiller"></div>
      </div>
    );
  }
}
