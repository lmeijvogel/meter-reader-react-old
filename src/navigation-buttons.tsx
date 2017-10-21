import * as React from 'react';
import {Component} from 'react';

import ChangePeriodButton from './change-period-button';
import { PeriodDescription, YearDescription, MonthDescription, DayDescription } from './period-description';

interface IProps {
  enabled: boolean;

  periodDescription: PeriodDescription;

  onSelect: (any) => void;
}

interface NavigationButton {
  name : string;
  period: PeriodDescription;
}

interface NavigationButtonParams {
  previous: NavigationButton;
  next: NavigationButton;
  up?: NavigationButton;
}

export default class NavigationButtons extends Component<IProps, {}> {
  render() {
    const periodDescription = this.props.periodDescription;

    if (periodDescription instanceof YearDescription) {
      const yearDescription = periodDescription as YearDescription;

      return this.navigationButtons({
        previous: {name: 'Jaar terug', period: yearDescription.previous()},
        next: {name: 'Jaar vooruit', period: yearDescription.next()}
      });
    } else if (periodDescription instanceof MonthDescription) {
      const monthDescription = periodDescription as MonthDescription;

      return this.navigationButtons({
        previous: {name: 'Maand terug', period: monthDescription.previous()},
        next: {name: 'Maand vooruit', period: monthDescription.next()},
        up: {name: "Naar jaar", period: monthDescription.up()}
      });
    } else if (periodDescription instanceof DayDescription) {
      const dayDescription = periodDescription as DayDescription;

      return this.navigationButtons({
        previous: {name: "Dag terug", period: dayDescription.previous()},
        next: {name: "Dag vooruit", period: dayDescription.next()},
        up: {name: "Naar maand", period: dayDescription.up()}
      });
    }

    return <div />;
  }

  navigationButtons({previous, next, up} : NavigationButtonParams) : JSX.Element {
    const today = DayDescription.today();

    const todayButton = <ChangePeriodButton label="Today" onClick={() => this.newPeriod(today)} enabled={this.props.enabled} className="navigation-button" />

    return <div className="container">
             <div className="row">
               <div className="column column-md-50 column-sm-100">
                 <ChangePeriodButton label={"< "+ previous.name} onClick={() => this.newPeriod(previous.period)} enabled={this.props.enabled} className="navigation-button" />
               </div>
               <div className="column column-md-50 column-sm-100">
                 <ChangePeriodButton label={next.name + " >"} onClick={() => this.newPeriod(next.period)} enabled={this.props.enabled} className="navigation-button" />
               </div>
             </div>
             {up && <div className="row">
                      <div className="column column-100">
                        <ChangePeriodButton label={up.name} onClick={() => this.newPeriod(up.period)} enabled={this.props.enabled} className="navigation-button" />
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
