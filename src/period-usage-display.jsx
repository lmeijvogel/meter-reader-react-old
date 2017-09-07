import React from 'react';
import {Component} from 'react';

import DataShifter from './data-shifter'
import Chart from './chart.jsx';

export default class PeriodUsageDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const labels = this.labels();
    const dataShifter = new DataShifter();

    const data =  dataShifter.call(this.props.usage, this.positionInData.bind(this));

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
  range(start, end) {
    let result = [];

    for (let i = start ; i < end ; i++) {
      result.push(i);
    }

    return result;
  }

  onClick(index) {
    // Implemented by subclasses
  }
}
