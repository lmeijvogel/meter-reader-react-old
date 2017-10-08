import * as React from 'react';
import {Component} from 'react';

import ChangePeriodButton from './change-period-button';

interface IProps {
  enabled: boolean;

  // TODO
  year?: number;
  month?: number;
  day?: number;
  // TODO
  period: any;

  onSelect: (any) => void;
}
export default class NavigationButtons extends Component<IProps, {}> {
  render() {
    const today = new Date();
    const todayButton = <ChangePeriodButton label="Today" onClick={() => this.newPeriod(this.toPeriod(today, "day"))} enabled={this.props.enabled} className="column column-100" />

    switch (this.props.period) {
      case "year":
        if (this.props.year == null) {
          throw "Props error: year: " + this.props.year + " is null";
        }

        const previousYear = new Date(this.props.year - 1, 1, 1);
        const nextYear = new Date(this.props.year + 1, 1, 1);

        return <div>
          <div className="row">
            <ChangePeriodButton label="Previous year" onClick={() => this.newPeriod(this.toPeriod(previousYear, "year"))} enabled={this.props.enabled} className="column-50" />
            <ChangePeriodButton label="Next year" onClick={() => this.newPeriod(this.toPeriod(nextYear, "year"))} enabled={this.props.enabled} className="column-50" />
          </div>
          <div className="row">
            {todayButton}
          </div>
        </div>;
      case "month":
        // TODO
        if (this.props.year == null || this.props.month == null) {
          throw "Props error: month: " + this.props.month + " is null";
        }

        const previousMonth = new Date(this.props.year, this.props.month - 2, 1);
        const nextMonth = new Date(this.props.year, this.props.month, 1);
        const currentYear = new Date(this.props.year, 1, 1);

        return <div>
          <div className="row">
            <ChangePeriodButton label="Previous month" onClick={() => this.newPeriod(this.toPeriod(previousMonth, "month"))} enabled={this.props.enabled} className="column-50" />
            <ChangePeriodButton label="Next month" onClick={() => this.newPeriod(this.toPeriod(nextMonth, "month"))} enabled={this.props.enabled} className="column-50" />
          </div>
          <div className="row">
            <ChangePeriodButton label="Up to year" onClick={() => this.newPeriod(this.toPeriod(currentYear, "year"))} enabled={this.props.enabled} />
          </div>
          <div className="row">
            {todayButton}
          </div>
        </div>;
      case "day":
        // TODO
        if (this.props.year == null || this.props.month == null || this.props.day == null) {
          throw "Props error: month: " + this.props.month + " or day " + this.props.day + " is null";
        }

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
          <div className="row">
            {todayButton}
          </div>
        </div>;
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
