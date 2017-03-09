import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

import DayUsageDisplay from './day-usage-display.jsx';
import MonthUsageDisplay from './month-usage-display.jsx';
import NavigationButtons from './navigation-buttons.jsx';

class EnergyUsageApp extends Component {
  constructor(state) {
    super(state);
    this.state = {periodUsage: [], period: "month"};
  }

  componentDidMount() {
    const date = new Date();

    this.periodSelected(date, "day");
  }

  render() {
    if (this.state.period == "month") {
      return (
        <div>
          <h1>{this.state.year}-{this.state.month}</h1>
          <MonthUsageDisplay usage={this.state.periodUsage} year="2017" month={this.state.month} onSelect={this.periodSelected.bind(this)} />
          <NavigationButtons period="month" year={this.state.year} month={this.state.month} onSelect={this.periodSelected.bind(this)} />
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.state.year}-{this.state.month}-{this.state.day}</h1>
          <DayUsageDisplay usage={this.state.periodUsage} />

          <NavigationButtons period="day" year={this.state.year} month={this.state.month} day={this.state.day} onSelect={this.periodSelected.bind(this)} />
        </div>
      )
    }
  }

  periodSelected(date, period) {
    let url;

    switch(period) {
      case 'day':
        url = '/day/'+ date.getFullYear() + '/' + (date.getMonth()+1) + '/'+ date.getDate() +'.json';
        break;
      case 'month':
        url = '/month/'+ date.getFullYear() + '/' + (date.getMonth()+1) +'.json';
        break;
    }

    fetch(url).then( (response) => response.json()).then( (json) => {
      this.setState({periodUsage: json, period: period, year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()});
    }).catch( () => { // No 'finally'?!?
      this.setState({periodUsage: [], period: period, year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()});
    });
  }
}

const appContainer = document.querySelector(".app-container");

ReactDOM.render(<EnergyUsageApp />, appContainer);
