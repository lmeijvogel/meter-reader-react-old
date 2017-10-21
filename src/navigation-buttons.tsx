import * as React from 'react';
import {Component} from 'react';

import ChangePeriodButton from './change-period-button';
import { PeriodDescription, DayDescription } from './period-description';

interface IProps {
  enabled: boolean;

  periodDescription: PeriodDescription;

  onSelect: (any) => void;
}

export default class NavigationButtons extends Component<IProps, {}> {
  render() {
    const periodDescription = this.props.periodDescription;

    const today = DayDescription.today();
    const previous = periodDescription.previous();
    const next = periodDescription.next();
    const up = periodDescription.up();

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
