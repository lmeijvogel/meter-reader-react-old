import React from 'react';
import {Component} from 'react';

import Chart from './chart.jsx';

export default class PeriodUsageDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const labels = this.labels();

    return (
      <div>
        <Chart label="Gas" labels={labels} data={this.props.usage} fieldName="gas" color="#f0ad4e" onClick={this.onClick.bind(this)} tooltipLabelBuilder={this.tooltipLabel.bind(this)}></Chart>
        <Chart label="Stroom" labels={labels} data={this.props.usage} fieldName="stroom_totaal" color="#428bca" onClick={this.onClick.bind(this)} tooltipLabelBuilder={this.tooltipLabel.bind(this)}></Chart>
      </div>
    );
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
