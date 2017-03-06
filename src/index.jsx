import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

import DayUsageDisplay from './day-usage-display.jsx';
import MonthUsageDisplay from './month-usage-display.jsx';
import ChangePeriodButton from './change-period-button.jsx';

class EnergyUsageApp extends Component {
  constructor(state) {
    super(state);
    this.state = {periodUsage: []};
  }

  componentDidMount() {
    const date = new Date();

    this.newPeriod(date, "month");
  }

  render() {
    //const type="day"
    const type="month"

    if (type == "month") {
      const previousMonth = new Date(this.state.year, this.state.month - 2, 1);
      const nextMonth = new Date(this.state.year, this.state.month, 1);

      return (
        <div>
          <MonthUsageDisplay usage={this.state.periodUsage} year="2017" month={this.state.month} />
          <ChangePeriodButton label="Previous month" date={previousMonth} period="month" onClick={this.newPeriod.bind(this)}  />
          <ChangePeriodButton label="Next month" date={nextMonth} period="month" onClick={this.newPeriod.bind(this)} />
        </div>
      )
    } else {
      const previousDate = new Date(this.state.year, this.state.month - 1, this.state.day - 1);
      const nextDate = new Date(this.state.year, this.state.month - 1, this.state.day + 1);

      return (
        <div>
          <DayUsageDisplay usage={this.state.periodUsage} />
          <ChangePeriodButton label="Previous day" date={previousDate} period="day" onClick={this.newPeriod.bind(this)}/>
          <ChangePeriodButton label="Next day" date={nextDate} period="day" onClick={this.newPeriod.bind(this)} />
        </div>
      )
    }
  }

  newPeriod(date, period) {
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
      this.setState({periodUsage: json, year: date.getFullYear(), month: date.getMonth() + 1});
    }).catch( () => { // No 'finally'?!?
      this.setState({periodUsage: [], year: date.getFullYear(), month: date.getMonth() + 1});
    });
  }
}

const appContainer = document.querySelector(".app-container");

ReactDOM.render(<EnergyUsageApp />, appContainer);
