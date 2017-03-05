import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

import DayUsageDisplay from './day-usage-display.jsx';

class EnergyUsageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {periodUsage: []};
  }

  componentDidMount() {
    fetch('/data.json').then( (response) => response.json()).then( (json) => {
      this.setState({periodUsage: json});
    });
  }

  render() {
    return (
      <div>
        <DayUsageDisplay usage={this.state.periodUsage} />
      </div>
    )
  }
}

const appContainer = document.querySelector(".app-container");

ReactDOM.render(<EnergyUsageApp />, appContainer);
