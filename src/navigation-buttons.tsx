import * as React from 'react';
import {Component} from 'react';

import ChangePeriodButton from './change-period-button';
import { PeriodDescription, YearDescription, MonthDescription, DayDescription } from './period-description';

interface IProps {
  enabled: boolean;

  periodDescription: PeriodDescription;

  onSelect: (any) => void;
}
export default class NavigationButtons extends Component<IProps, {}> {
  render() {
    const periodDescription = this.props.periodDescription;
    const today = DayDescription.today();

    const todayButton = <ChangePeriodButton label="Today" onClick={() => this.newPeriod(today)} enabled={this.props.enabled} className="column column-100" />

    if (periodDescription instanceof YearDescription) {
      const yearDescription = periodDescription as YearDescription;

      const previousYear = yearDescription.previous();
      const nextYear = yearDescription.next();

      return <div>
        <div className="row">
          <ChangePeriodButton label="Previous year" onClick={() => this.newPeriod(previousYear)} enabled={this.props.enabled} className="column-50" />
          <ChangePeriodButton label="Next year" onClick={() => this.newPeriod(nextYear)} enabled={this.props.enabled} className="column-50" />
        </div>
        <div className="row">
          {todayButton}
        </div>
      </div>;
    } else if (periodDescription instanceof MonthDescription) {
      const monthDescription = periodDescription as MonthDescription;

      const previousMonth = monthDescription.previous();
      const nextMonth = monthDescription.next();
      const currentYear = monthDescription.up();

      return <div>
        <div className="row">
          <ChangePeriodButton label="Previous month" onClick={() => this.newPeriod(previousMonth)} enabled={this.props.enabled} className="column-50" />
          <ChangePeriodButton label="Next month" onClick={() => this.newPeriod(nextMonth)} enabled={this.props.enabled} className="column-50" />
        </div>
        <div className="row">
          <ChangePeriodButton label="Up to year" onClick={() => this.newPeriod(currentYear)} enabled={this.props.enabled} />
        </div>
        <div className="row">
          {todayButton}
        </div>
      </div>;
    } else if (periodDescription instanceof DayDescription) {
      const dayDescription = periodDescription as DayDescription;

      const previousDate = dayDescription.previous();
      const nextDate = dayDescription.next();
      const currentMonth = dayDescription.up();

      return <div className="container">
        <div className="row">
          <ChangePeriodButton label="Previous day" onClick={() => this.newPeriod(previousDate)} enabled={this.props.enabled} className="column column-sm-40" />
          <ChangePeriodButton label="Next day" onClick={() => this.newPeriod(nextDate)} enabled={this.props.enabled} className="column column-sm-40" />
        </div>
        <div className="row">
          <ChangePeriodButton label="Up to month" onClick={() => this.newPeriod(currentMonth)} enabled={this.props.enabled} className="column column-100" />
        </div>
        <div className="row">
          {todayButton}
        </div>
      </div>;
    }

    return <div />;
  }

  newPeriod(period : PeriodDescription) {
    this.props.onSelect(period);
  }
}
