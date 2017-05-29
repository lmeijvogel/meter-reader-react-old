import React from 'react';
import {Component} from 'react';

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

export default class UsageGraphs extends Component {
  constructor(state) {
    super(state);
    this.state = {periodUsage: [], period: "month"};
  }

  componentDidMount() {
    const date = new Date();

    this.periodSelected(date, "month");
  }

  render() {
    var title;
    var display;
    var buttons;

    switch (this.state.period) {
      case "year":
        title = <h1>{this.state.year}</h1>;

        display = <YearUsageDisplay usage={this.state.periodUsage} year={this.state.year} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />;
        buttons = <NavigationButtons period="year" year={this.state.year} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />;
        break;
      case "month":
        title = <h1>{this.state.year}-{this.state.month}</h1>

        display = <MonthUsageDisplay usage={this.state.periodUsage} year={this.state.year} month={this.state.month} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />
        buttons = <NavigationButtons period="month" year={this.state.year} month={this.state.month} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />
        break;
      case "day":
        const date = new Date(this.state.year, this.state.month-1, this.state.day);

        title = <h1>{DAYS_OF_WEEK[date.getDay()]} {this.state.year}-{this.state.month}-{this.state.day}</h1>;

        display = <DayUsageDisplay usage={this.state.periodUsage} year={this.state.year} month={this.state.month} day={this.state.day} enabled={!this.state.loadingData} />
        buttons = <NavigationButtons period="day" year={this.state.year} month={this.state.month} day={this.state.day} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />
        break;
    }

    return (
      <div>
        {title}
        {display}
        {buttons}
      </div>
    );

  }

  periodSelected(date, period) {
    let url;

    switch(period) {
      case 'day':
        url = '/day/'+ date.getFullYear() + '/' + this.padDatePart(date.getMonth()+1) + '/'+ this.padDatePart(date.getDate()) +'.json';
        break;
      case 'month':
        url = '/month/'+ date.getFullYear() + '/' + this.padDatePart(date.getMonth()+1) +'.json';
        break;
      case 'year':
        url = '/year/'+ date.getFullYear() + '.json';
        break;
    }

    this.setState({loadingData: true});

    fetch("/api" + url, { credentials: 'include' }).then( (response) => response.json()).then( (json) => {
      this.setState({periodUsage: json, period: period, year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), loadingData: false});
    }).catch( (e) => { // No 'finally'?!?
      console.error("Error fetching ", url, e);
      this.setState({periodUsage: [], period: period, year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), loadingData: false});
    });
  }

  padDatePart(part) {
    const stringPart = part.toString();

    switch(stringPart.length) {
      case 0:
        return '00';
        break;
      case 1:
        return '0'+stringPart;
        break;
      default:
        return stringPart;
        break
    }
  }
}
