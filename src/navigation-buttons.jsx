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
          <ChangePeriodButton label="Previous year" date={previousYear} period="year" onClick={this.newPeriod.bind(this)}  />
          <ChangePeriodButton label="Next year" date={nextYear} period="year" onClick={this.newPeriod.bind(this)} />
        </div>;
        break;
      case "month":
        const previousMonth = new Date(this.props.year, this.props.month - 2, 1);
        const nextMonth = new Date(this.props.year, this.props.month, 1);
        const currentYear = new Date(this.props.year, 1, 1);

        return <div>
          <ChangePeriodButton label="Previous month" date={previousMonth} period="month" onClick={this.newPeriod.bind(this)}  />
          <ChangePeriodButton label="Next month" date={nextMonth} period="month" onClick={this.newPeriod.bind(this)} />
          <ChangePeriodButton label="Up to year" date={currentYear} period="year" onClick={this.newPeriod.bind(this)} />
        </div>;
        break;
      case "day":
        const currentDate = new Date(this.props.year, this.props.month - 1, 1);
        const previousDate = new Date(this.props.year, this.props.month - 1, this.props.day - 1);
        const nextDate = new Date(this.props.year, this.props.month - 1, this.props.day + 1);

        return <div>
          <ChangePeriodButton label="Previous day" date={previousDate} period="day" onClick={this.newPeriod.bind(this)}/>
          <ChangePeriodButton label="Next day" date={nextDate} period="day" onClick={this.newPeriod.bind(this)} />
          <ChangePeriodButton label="Up to month" date={currentDate} period="month" onClick={this.newPeriod.bind(this)} />
        </div>;
        break;
    }

    return <div />;
  }

  newPeriod(date, period) {
    this.props.onSelect(date, period);
  }
}
