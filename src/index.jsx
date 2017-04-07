'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// Import routing components
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// Import custom components
import Main from './components/Main.jsx';
import Home from './components/Home.jsx';
import Event from './components/Event.jsx';
import Contact from './components/Contact.jsx';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
	    <IndexRoute component={Home} data={{index: 1}}/>
	    <Route path="/event" component={Event} data={{index: 0}}/>
	    <Route path="/contact" component={Contact} data={{index: 2}}/>
	    <Route path="*" component={Home} data={{index: 1}}/>
	  </Route>
  </Router>,
  document.getElementById('app')
);