'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../theme/theme.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';

// For Material-UI Components
injectTapEventPlugin();

const countdownIcon = <FontIcon className="material-icons">restore</FontIcon>;
const eventIcon = <FontIcon className="material-icons">event</FontIcon>;
const contactIcon = <FontIcon className="material-icons">info</FontIcon>;

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1
    };
    this.reRoute = this.reRoute.bind(this);
  }

  componentWillMount() {
    this.props.route.childRoutes.forEach(route => {
      if (route.path === this.props.location.pathname) {
        this.select(route.data.index);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.select(nextProps.location.state.index);
  }

  select(index) {
    this.setState({
      selectedIndex: index
    });
  }

  reRoute(route, index){
    this.select(index);
    browserHistory.push({
      pathname: route,
      state: {
        index: index
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app">
          <canvas id="confetti" className="hide" width="1" height="1"></canvas>
          <div className="logo">
            <div className="logo-text">Clockodile</div>
          </div>
          <div className="main">
            {this.props.children}
          </div>
          <div className="nav">
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Create Event"
                icon={eventIcon}
                onTouchTap={() => this.reRoute('/event', 0)}
              />
              <BottomNavigationItem
                label="Countdown"
                icon={countdownIcon}
                onTouchTap={() => this.reRoute('/', 1)}
              />
              <BottomNavigationItem
                label="Contact"
                icon={contactIcon}
                onTouchTap={() => this.reRoute('/contact', 2)}
              />
            </BottomNavigation>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
