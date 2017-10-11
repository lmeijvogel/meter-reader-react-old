import * as React from 'react';
import {Component} from 'react';

import { PeriodDescription } from './period-description';
import DataShifter from './data-shifter';
import Chart from './chart';;

export interface IPeriodUsageDisplayProps {
  enabled: boolean;
  onSelect: (period: PeriodDescription) => void;
  usage: any;
}

export abstract class PeriodUsageDisplay<A extends IPeriodUsageDisplayProps, B> extends Component<A, B> {
  render() {
    const labels = this.labels();
    const dataShifter = new DataShifter();

    const data = dataShifter.call(this.props.usage, this.positionInData.bind(this));

    return (
      <div className={'period-usage-display' + (this.props.enabled ? '' : ' disabled')}>
        <Chart label="Gas" labels={labels} data={data} maxY={this.maxGasY()} fieldName="gas" color="#f0ad4e" onClick={this.onClick.bind(this)} tooltipLabelBuilder={this.tooltipLabel.bind(this)}></Chart>
        <Chart label="Stroom" labels={labels} data={data} maxY={this.maxStroomY()} fieldName="stroom_totaal" color="#428bca" onClick={this.onClick.bind(this)} tooltipLabelBuilder={this.tooltipLabel.bind(this)}></Chart>
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.enabled !== nextProps.enabled) || (this.props.usage !== nextProps.usage);
  }

  positionInData(element, dataset) {
    throw "Not Implemented";
  }

  // Used by subclasses
  range(start, end) : number[] {
    let result : number[] = [];

    for (let i: number = start ; i < end ; i++) {
      result.push(i);
    }

    return result;
  }

  onClick(index) {
    // Implemented by subclasses
  }

  abstract labels();
  abstract tooltipLabel(field);

  abstract maxGasY();

  abstract maxStroomY();
}
