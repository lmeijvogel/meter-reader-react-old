import * as React from 'react';
import {Component} from 'react';

import ChangePeriodButton from './change-period-button';
import { PeriodDescription, YearDescription, MonthDescription, DayDescription } from './period-description';

interface IProps {
  enabled: boolean;

  periodDescription: PeriodDescription;

  onSelect: (any) => void;
}

interface NavigationButtonParams {
  previous: PeriodDescription;
  next: PeriodDescription;
  up?: PeriodDescription;
}

export default class NavigationButtons extends Component<IProps, {}> {
  render() {
    const periodDescription = this.props.periodDescription;

    if (periodDescription instanceof YearDescription) {
      const yearDescription = periodDescription as YearDescription;

      return this.navigationButtons({
        previous: yearDescription.previous(),
        next: yearDescription.next()
      });
    } else if (periodDescription instanceof MonthDescription) {
      const monthDescription = periodDescription as MonthDescription;

      return this.navigationButtons({
        previous: monthDescription.previous(),
        next: monthDescription.next(),
        up: monthDescription.up()
      });
    } else if (periodDescription instanceof DayDescription) {
      const dayDescription = periodDescription as DayDescription;

      return this.navigationButtons({
        previous: dayDescription.previous(),
        next: dayDescription.next(),
        up: dayDescription.up()
      });
    }

    return <div />;
  }

  navigationButtons({previous, next, up} : NavigationButtonParams) : JSX.Element {
    const today = DayDescription.today();

    const todayButton = <ChangePeriodButton label="Today" onClick={() => this.newPeriod(today)} enabled={this.props.enabled} />

    return <div className="container">
             <div className="row">
               <div className="column column-md-50 column-sm-100">
                 <ChangePeriodButton label={"< "+ previous.toShortTitle()} onClick={() => this.newPeriod(previous)} enabled={this.props.enabled} />
               </div>
               <div className="column column-md-50 column-sm-100">
                 <ChangePeriodButton label={next.toShortTitle() + " >"} onClick={() => this.newPeriod(next)} enabled={this.props.enabled} />
               </div>
             </div>
             {up && <div className="row">
                      <div className="column column-100">
                        <ChangePeriodButton label={up.toShortTitle()} onClick={() => this.newPeriod(up)} enabled={this.props.enabled} />
                      </div>
                    </div>}

             <div className="row">
               <div className="column column-100">
                 {todayButton}
               </div>
             </div>
           </div>;
  }

  newPeriod(period : PeriodDescription) {
    this.props.onSelect(period);
  }
}
