import React from 'react';
import {Component} from 'react';

import ChangePeriodButton from './change-period-button.jsx';

export default class NavigationButtons extends Component {
  render() {
    switch (this.props.period) {
      case "year":
        const previousYear = new Date(this.props.year - 1, 1, 1);
        const nextYear = new Date(this.props.year + 1, 1, 1);

        return <div>
          <ChangePeriodButton label="Previous year" date={previousYear} onClick={() => this.newPeriod(this.toPeriod(previousYear, "year"))} enabled={this.props.enabled} className="column-50" />
          <ChangePeriodButton label="Next year" date={nextYear} onClick={() => this.newPeriod(this.toPeriod(nextYear, "year"))} enabled={this.props.enabled} className="column-50" />
        </div>;
        break;
      case "month":
        const previousMonth = new Date(this.props.year, this.props.month - 2, 1);
        const nextMonth = new Date(this.props.year, this.props.month, 1);
        const currentYear = new Date(this.props.year, 1, 1);

        return <div>
          <ChangePeriodButton label="Previous month" onClick={() => this.newPeriod(this.toPeriod(previousMonth, "month"))} enabled={this.props.enabled} className="column-50" />
          <ChangePeriodButton label="Next month" onClick={() => this.newPeriod(this.toPeriod(nextMonth, "month"))} enabled={this.props.enabled} className="column-50" />
          <br />
          <ChangePeriodButton label="Up to year" onClick={() => this.newPeriod(this.toPeriod(currentYear, "year"))} enabled={this.props.enabled} />
        </div>;
        break;
      case "day":
        const previousDate = new Date(this.props.year, this.props.month - 1, this.props.day - 1);
        const nextDate = new Date(this.props.year, this.props.month - 1, this.props.day + 1);
        const currentMonth = new Date(this.props.year, this.props.month - 1, 1);

        return <div className="container">
          <div className="row">
            <ChangePeriodButton label="Previous day" onClick={() => this.newPeriod(this.toPeriod(previousDate, "day"))} enabled={this.props.enabled} className="column column-sm-40" />
            <ChangePeriodButton label="Next day" onClick={() => this.newPeriod(this.toPeriod(nextDate, "day"))} enabled={this.props.enabled} className="column column-sm-40" />
          </div>
          <div className="row">
            <ChangePeriodButton label="Up to month" onClick={() => this.newPeriod(this.toPeriod(currentMonth, "month"))} enabled={this.props.enabled} className="column column-100" />
          </div>
        </div>;
        break;
    }

    return <div />;
  }

  toPeriod(date, period) {
    switch(period) {
      case "day":
        return {
          period: "day",
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        };
      case "month":
        return {
          period: "month",
          year: date.getFullYear(),
          month: date.getMonth() + 1
        };
      case "year":
        return {
          period: "year",
          year: date.getFullYear()
        };
      default:
        throw("Invalid period "+ period);
    }
  }

  newPeriod(period) {
    this.props.onSelect(period);
  }
}
