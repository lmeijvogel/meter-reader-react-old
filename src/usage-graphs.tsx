import * as React from 'react';
import {Component} from 'react';

import DayUsageDisplay from './day-usage-display';
import MonthUsageDisplay from './month-usage-display';
import YearUsageDisplay from './year-usage-display';
import NavigationButtons from './navigation-buttons';
import LocationBarParser from './location-bar-parser';

import { PeriodDescription, YearDescription, MonthDescription, DayDescription } from './period-description';

interface IState {
  loadingData: boolean;
  periodUsage: Array<any>;

  periodDescription?: PeriodDescription;
}

export default class UsageGraphs extends Component<{}, IState> {
  constructor(state) {
    super(state);
    this.state = {periodUsage: [], loadingData: true};
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
    var display;

    const periodDescription = this.state.periodDescription;

    if (periodDescription) {
      const title = <h1>{periodDescription.toTitle()}</h1>;

      if (periodDescription instanceof DayDescription) {
        display = <DayUsageDisplay usage={this.state.periodUsage} periodDescription={periodDescription} enabled={!this.state.loadingData} onSelect={() => {}} />
      } else if (periodDescription instanceof MonthDescription) {
        display = <MonthUsageDisplay usage={this.state.periodUsage} periodDescription={periodDescription} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />
      } else if (periodDescription instanceof YearDescription) {
        display = <YearUsageDisplay usage={this.state.periodUsage} periodDescription={periodDescription} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />;
      }

      return (
        <div>
          {title}
          {display}
          <NavigationButtons periodDescription={periodDescription} onSelect={this.periodSelected.bind(this)} enabled={!this.state.loadingData} />
        </div>
      );
    } else {
      return null;
    }
  }

  periodSelected(periodDescription: PeriodDescription, skipPushState = false) {
    const newLocation = periodDescription.toUrl();

    this.setState({loadingData: true});

    if (!skipPushState) {
      window.history.pushState({periodDescription: periodDescription}, newLocation, newLocation);
    }

    fetch("/api" + newLocation + ".json", { credentials: 'include' }).then( (response) => response.json()).then( (json) => {
      const newState = {periodUsage: json, periodDescription: periodDescription, loadingData: false};

      this.setState(newState);
    }).catch( (e) => { // No 'finally'?!?
      this.setState({periodUsage: [], periodDescription: periodDescription, loadingData: false});
    });
  }
}
