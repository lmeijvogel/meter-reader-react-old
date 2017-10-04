import React from 'react';
import {Component} from 'react';

import DayUsageDisplay from './day-usage-display.jsx';
import MonthUsageDisplay from './month-usage-display.jsx';
import YearUsageDisplay from './year-usage-display.jsx';
import NavigationButtons from './navigation-buttons.jsx';
import LocationBarParser from './location-bar-parser.js';

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
    this.state = {periodUsage: []};
  }

  componentDidMount() {
    const locationBarParser = new LocationBarParser();

    const period = locationBarParser.parse(window.location.pathname);

    window.onpopstate = (event) => {
      if (event.state.period) {
        this.periodSelected(event.state.period, true);
      }
    }

    this.periodSelected(period);
  }

  render() {
    var title;
    var display;

    switch (this.state.period) {
      case "year":
        title = <h1>{this.state.year}</h1>;

        display = <YearUsageDisplay usage={this.state.periodUsage} year={this.state.year} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />;
        break;
      case "month":
        title = <h1>{this.state.year}-{this.state.month}</h1>

        display = <MonthUsageDisplay usage={this.state.periodUsage} year={this.state.year} month={this.state.month} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />
        break;
      case "day":
        const date = new Date(this.state.year, this.state.month-1, this.state.day);

        title = <h1>{DAYS_OF_WEEK[date.getDay()]} {this.state.year}-{this.state.month}-{this.state.day}</h1>;

        display = <DayUsageDisplay usage={this.state.periodUsage} year={this.state.year} month={this.state.month} day={this.state.day} enabled={!this.state.loadingData} />
        break;
    }

    return (
      <div>
        {title}
        {display}
        <NavigationButtons period={this.state.period} year={this.state.year} month={this.state.month} day={this.state.day} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />
      </div>
    );

  }

  periodSelected(period, skipPushState) {
    let newLocation;

    switch(period.period) {
      case 'day':
        newLocation = '/day/'+ period.year + '/' + this.padDatePart(period.month) + '/'+ this.padDatePart(period.day);
        break;
      case 'month':
        newLocation = '/month/'+ period.year + '/' + this.padDatePart(period.month);
        break;
      case 'year':
        newLocation = '/year/'+ period.year;
        break;
    }

    this.setState({loadingData: true});

    if (!skipPushState) {
      window.history.pushState({period: period}, newLocation, newLocation);
    }

    fetch("/api" + newLocation + ".json", { credentials: 'include' }).then( (response) => response.json()).then( (json) => {
      const newState = {periodUsage: json, period: period.period, year: period.year, month: period.month, day: period.day, loadingData: false};

      this.setState(newState);
    }).catch( (e) => { // No 'finally'?!?
      this.setState({periodUsage: [], period: period.period, year: period.year, month: period.month, day: period.day, loadingData: false});
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
