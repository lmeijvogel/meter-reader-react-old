import React from 'react';
import {Component} from 'react';

import {Bar} from 'react-chartjs-2';

import ArrayInterpolator from './array-interpolator.js';
import RelativeConverter from './relative-converter.js';

export default class Chart extends Component {

  render() {
    var tooltipLabelBuilder = this.props.tooltipLabelBuilder;

    var titleCallback = function (tooltipItems, data) {
      // Pick first xLabel for now
      var title = '';
      var labels = data.labels;
      var labelCount = labels ? labels.length : 0;

      if (tooltipItems.length > 0) {
        var item = tooltipItems[0];

        if (item.xLabel) {
          title = item.xLabel;
        } else if (labelCount > 0 && item.index < labelCount) {
          title = labels[item.index];
        }
      }

      return tooltipLabelBuilder.call(null, title);
    };

    return (
      <div>
        <div>{this.max() - this.min()}</div>
        <Bar data={this.chartData()} options={{onClick: this.onClick.bind(this), responsive: true, tooltips: { callbacks: { title: titleCallback } }}} />
      </div>
    );
  }

  chartData() {
    const interpolatedData = new ArrayInterpolator().call(this.dataForField());
    const relativeData = new RelativeConverter().convert(interpolatedData);

    return {
      labels: this.props.labels,
      datasets: [
        {
          label: this.props.label,
          data: relativeData,
          borderColor: this.props.color,
          backgroundColor: this.props.color
        }
      ]
    };
  }

  dataForField() {
    return this.props.data.map( (u) => u[this.props.fieldName] );
  }

  max() {
    return Math.max.apply(null, this.dataForField());
  }

  min() {
    return Math.min.apply(null, this.dataForField());
  }

  onClick(event, data) {
    if (data[0]) {
      this.props.onClick(data[0]._index);
    }
  }
}
