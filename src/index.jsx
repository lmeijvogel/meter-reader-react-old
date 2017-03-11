import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

import DayUsageDisplay from './day-usage-display.jsx';
import MonthUsageDisplay from './month-usage-display.jsx';
import YearUsageDisplay from './year-usage-display.jsx';
import NavigationButtons from './navigation-buttons.jsx';

const DAYS_OF_WEEK = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
}

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
    switch (this.state.period) {
      case "year":
      return (
        <div>
          <h1>{this.state.year}</h1>
          <YearUsageDisplay usage={this.state.periodUsage} year={this.state.year} onSelect={this.periodSelected.bind(this)} />
          <NavigationButtons period="year" year={this.state.year} onSelect={this.periodSelected.bind(this)} />
        </div>
      );
      break;
      case "month":
      return (
        <div>
          <h1>{this.state.year}-{this.state.month}</h1>
          <MonthUsageDisplay usage={this.state.periodUsage} year={this.state.year} month={this.state.month} onSelect={this.periodSelected.bind(this)} />
          <NavigationButtons period="month" year={this.state.year} month={this.state.month} onSelect={this.periodSelected.bind(this)} />
        </div>
      );
      break;
    case "day":
      const date = new Date(this.state.year, this.state.month-1, this.state.day);

      return (
        <div>
          <h1>{DAYS_OF_WEEK[date.getDay()]} {this.state.year}-{this.state.month}-{this.state.day}</h1>
          <DayUsageDisplay usage={this.state.periodUsage} />

          <NavigationButtons period="day" year={this.state.year} month={this.state.month} day={this.state.day} onSelect={this.periodSelected.bind(this)} />
        </div>
      );
      break;
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
      case 'year':
        url = '/year/'+ date.getFullYear() + '.json';
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
